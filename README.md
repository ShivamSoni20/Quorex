# GovernedVault: Trustless AI-Powered DeFi on Polkadot Hub

**GovernedVault** is a decentralized yield aggregator built for the **Polkadot Solidity Hackathon 2026**. It solves the "Admin Key Risk" in DeFi by enforcing strategy changes through on-chain DAO governance and a mandatory 48-hour Polkadot Timelock.

---

## 🏆 Hackathon Alignment

### Track 1: EVM Smart Contract Track
- **DeFi & Stablecoin-Ready**: High-efficiency vault for DOT and stablecoins (USDT/USDC via Asset Hub) on Polkadot Hub.
- **AI-Powered Dapp**: Features an integrated **AI Strategy Analyst** (Polkadot Agent Kit based) that provides real-time risk/yield analysis for every proposal.

### Track 2: Polkadot Virtual Machine (PVM)
- **PVM Integration Concept**: Demonstrates a "PVM Safety Proof" module, experimenting with calling Rust security libraries via PVM precompiles to validate EVM calldata integrity.
- **Native Interoperability**: Built-in **XCM Bridge Dashboard** for seamless liquidity transit from Polkadot Asset Hub.

---

## 🚀 Core Features

- **Governance-Locked Strategies**: Strategies CANNOT be changed by any admin. Changes require a 51% DAO vote.
- **48-Hour Timelock Enforcement**: After a vote passes, a 48-hour delay is enforced by the `VaultTimelock` contract, allowing users to exit if they disagree with the new strategy.
- **AI-Driven Voting**: Every proposal includes a risk analysis scorecard to help the community make informed decisions.
- **Responsive Web3 UX**: A premium, mobile-first interface designed for retail and whale users alike.

---

## 🛠 Tech Stack

- **Contracts**: Solidity (OpenZeppelin Governor, Timelock, ERC20).
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS v4.
- **Web3 Layer**: wagmi v2, viem v2, @tanstack/react-query.
- **Network**: Polkadot Hub Testnet (EVM-compatible).

---

## 📦 Setting Up Part 1: Deployment

1. **Configure Hardhat**:
   Edit `governed-vault-hardhat/.env` with your `DEPLOYER_PRIVATE_KEY`.
2. **Deploy Pipeline**:
   ```bash
   cd governed-vault-hardhat
   npx hardhat run scripts/deploy.ts --network polkadotHubTestnet
   ```
3. **Save Manifest**: Contract addresses are exported to `deployments/polkadotHubTestnet.json`.

## 💻 Setting Up Part 2: Frontend

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```
2. **Environment Setup**:
   Copy `.env.local` and add the deployed contract addresses.
3. **Run Dev**:
   ```bash
   pnpm dev
   ```

---

## 🏛 Architecture

- `GovernedVault.sol`: Core vault logic and strategy management.
- `VaultGovernor.sol`: On-chain DAO controller.
- `VaultTimelock.sol`: Enforcement layer for all strategic actions.
- `src/components/governance/AIAnalysis.tsx`: AI-powered risk scoring UI.
- `src/components/vault/XCMBridge.tsx`: Cross-chain interoperability interface.

---

## 🛡 Security Narratives
GovernedVault addresses the **$3.1B stolen from DeFi vaults** by removing trust from the equation and replacing it with **Polkadot's shared security** and contract-level governance.

Built with pride for **OpenGuild** and the **Web3 Foundation**. 
**March 2026**
