import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("===========================================");
  console.log("Deploying GovernedVault system");
  console.log("Network:", network.name, "| ChainId:", network.chainId.toString());
  console.log("Deployer:", deployer.address);
  console.log("Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "DOT");
  console.log("===========================================\n");

  // ── Step 1: Deploy VaultToken (ERC20Votes) ──────────────────────────────
  console.log("1/7 Deploying VaultToken...");
  const VaultToken = await ethers.getContractFactory("VaultToken");
  const vaultToken = await VaultToken.deploy();
  await vaultToken.waitForDeployment();
  const vaultTokenAddress = await vaultToken.getAddress();
  console.log("   VaultToken deployed:", vaultTokenAddress);

  // ── Step 2: Deploy MockStrategyA (5.2% APY) ─────────────────────────────
  console.log("2/7 Deploying MockStrategyA...");
  const MockStrategyA = await ethers.getContractFactory("MockStrategyA");
  const strategyA = await MockStrategyA.deploy();
  await strategyA.waitForDeployment();
  const strategyAAddress = await strategyA.getAddress();
  console.log("   MockStrategyA deployed:", strategyAAddress);

  // ── Step 3: Deploy MockStrategyB (8.1% APY) ─────────────────────────────
  console.log("3/7 Deploying MockStrategyB...");
  const MockStrategyB = await ethers.getContractFactory("MockStrategyB");
  const strategyB = await MockStrategyB.deploy();
  await strategyB.waitForDeployment();
  const strategyBAddress = await strategyB.getAddress();
  console.log("   MockStrategyB deployed:", strategyBAddress);

  // ── Step 4: Deploy VaultTimelock (admin = deployer, to be renounced) ─────
  console.log("4/7 Deploying VaultTimelock...");
  const VaultTimelock = await ethers.getContractFactory("VaultTimelock");
  const vaultTimelock = await VaultTimelock.deploy(
    172800,                           // 48h min delay
    [],                               // proposers — granted to Governor after deploy
    [ethers.ZeroAddress],             // executors — open execution
    deployer.address                  // admin — will be renounced in step 7
  );
  await vaultTimelock.waitForDeployment();
  const vaultTimelockAddress = await vaultTimelock.getAddress();
  console.log("   VaultTimelock deployed:", vaultTimelockAddress);

  // ── Step 5: Deploy VaultGovernor ────────────────────────────────────────
  console.log("5/7 Deploying VaultGovernor...");
  const VaultGovernor = await ethers.getContractFactory("VaultGovernor");
  const vaultGovernor = await VaultGovernor.deploy(
    vaultTokenAddress,
    vaultTimelockAddress
  );
  await vaultGovernor.waitForDeployment();
  const vaultGovernorAddress = await vaultGovernor.getAddress();
  console.log("   VaultGovernor deployed:", vaultGovernorAddress);

  // ── Step 6: Deploy GovernedVault (ERC4626) ───────────────────────────────
  console.log("6/7 Deploying GovernedVault...");
  const guardianAddress = process.env.GUARDIAN_ADDRESS || deployer.address;
  const GovernedVault = await ethers.getContractFactory("GovernedVault");
  const governedVault = await GovernedVault.deploy(
    strategyAAddress,       // initial asset token
    vaultTimelockAddress,
    guardianAddress,
    strategyAAddress        // initial active strategy
  );
  await governedVault.waitForDeployment();
  const governedVaultAddress = await governedVault.getAddress();
  console.log("   GovernedVault deployed:", governedVaultAddress);

  // ── Step 7: Wire VaultToken to vault ────────────────────────────────────
  console.log("7/7 Wiring roles and renouncing admin...");

  const setVaultTx = await vaultToken.setVault(governedVaultAddress);
  await setVaultTx.wait();
  console.log("   VaultToken vault set to GovernedVault");

  // Grant PROPOSER_ROLE on Timelock to Governor
  const PROPOSER_ROLE = await vaultTimelock.PROPOSER_ROLE();
  const grantProposerTx = await vaultTimelock.grantRole(PROPOSER_ROLE, vaultGovernorAddress);
  await grantProposerTx.wait();
  console.log("   PROPOSER_ROLE granted to VaultGovernor");

  // CRITICAL: Renounce TIMELOCK_ADMIN_ROLE
  const ADMIN_ROLE = await vaultTimelock.DEFAULT_ADMIN_ROLE();
  const renounceAdminTx = await vaultTimelock.renounceRole(ADMIN_ROLE, deployer.address);
  await renounceAdminTx.wait();
  console.log("   TIMELOCK_ADMIN_ROLE renounced — fully decentralized");

  // ── Write deployment manifest ────────────────────────────────────────────
  const deployments = {
    network: network.name,
    chainId: network.chainId.toString(),
    deployedAt: new Date().toISOString(),
    deployerAddress: deployer.address,
    contracts: {
      VaultToken:     vaultTokenAddress,
      VaultTimelock:  vaultTimelockAddress,
      VaultGovernor:  vaultGovernorAddress,
      GovernedVault:  governedVaultAddress,
      MockStrategyA:  strategyAAddress,
      MockStrategyB:  strategyBAddress,
    },
  };

  const outDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "polkadotHubTestnet.json");
  fs.writeFileSync(outFile, JSON.stringify(deployments, null, 2));
  console.log("\n   Deployment manifest written to:", outFile);

  console.log("\n===========================================");
  console.log("DEPLOYMENT COMPLETE");
  console.log("===========================================");
}

main().catch((error) => {
  console.error("\nDEPLOYMENT FAILED:", error);
  process.exitCode = 1;
});
