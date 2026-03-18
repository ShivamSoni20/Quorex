# 🪙 Quorex: The Un-Ruggable DeFi Vault

**Built for the Polkadot Solidity Hackathon 2026**  
*Competing in: EVM Smart Contract Track | OpenZeppelin Sponsor Track*

---

## 🚀 Overview
**Quorex** is a high-assurance DeFi yield vault deployed on the **Polkadot Hub Testnet**. Unlike traditional vaults that rely on administrator multisigs or off-chain "promises," Quorex enforces its entire security model via immutable smart contract code and decentralized governance.

### The Problem
In 2024 alone, billions were lost to "admin key" compromises and malicious strategy updates in yield aggregators.

### The Quorex Solution
- **Zero Admin Control**: No human has the key to change strategies.
- **DAO Enforcement**: Any yield strategy rotation must be proposed, voted upon by $QX holders, and passed via the `QuorexGovernor`.
- **Enforced Delay**: All approved actions go through a **48-hour timelock**, giving users time to withdraw if they disagree with a new direction.

---

## 🛠 Tech Stack
- **Smart Contracts**: Solidity (0.8.26), OpenZeppelin Governor, Timelock, and Vault standards.
- **Blockchain**: Polkadot Hub (EVM-compatible parachain).
- **Frontend**: React 18, Vite, Tailwind CSS (Custom "Midnight Sapphire" theme).
- **Web3 Entry**: Wagmi v2, Viem v2, injected connectors (MetaMask).
- **AI Integration**: AI-powered risk scoring and yield sentiment analysis for each proposal.

---

## 🔗 Live Deployment (Polkadot Hub Testnet)

| Component | Contract Address |
| :--- | :--- |
| **Quorex Vault** | `0x8d5F49d27A63de5024FAbAA6780C33e90198d517` |
| **Quorex Governor** | `0xBd756ccCDa138EaB3C3E640a313D8D1758c798D5` |
| **Quorex Timelock** | `0x36903E42B7eBb8332fDfeebDa50a74B9b59fC7d2` |
| **Quorex Token ($QX)** | `0x6704377C9cEf610Ad53624855584A3BCcae94667` |

---

## 🚶 Walkthrough

### 1. Landing & Discovery
Visit the landing page to see real-time TVL and APY metrics. Click **"Launch App"** to be automatically redirected to the secure dashboard if your wallet is connected.

### 2. Vault Operations
- **Deposit**: Lock DOT into the vault to receive interest-bearing shares.
- **Withdraw**: Burn shares to retrieve DOT + earned yield.
- **XCM Bridge**: Pre-architected interface for cross-chain DOT transit via Polkadot Asset Hub.

### 3. Governance Lifecycle
1. **Propose**: Any user can propose a rotation to a new yield strategy (e.g., rotating from Acala to Moonbeam yield).
2. **AI Analysis**: Every proposal features an automated AI Insight module that scores the strategy for risk and performance.
3. **Vote**: $QX holders cast their votes on-chain.
4. **Queue**: If passed, the action is queued in the Timelock.
5. **Execute**: After 48 hours, the vault automatically rotates to the new strategy.

---

## 🛡 Security Highlights (OpenZeppelin Track)
- Uses **OpenZeppelin 5.0** core contracts.
- **Cancun EVM** compatibility enabled for advanced memory operations.
- **ERC-4626** standard implementation for the vault logic.
- **PVM Safety Proofs**: Integrated visualization to monitor cross-chain execution safety.

---

## 👨‍💻 Developer Team
**Developed by Shivam Soni**
GitHub: [ShivamSoni20](https://github.com/ShivamSoni20)

---

*This project is submitted for the Polkadot Solidity Hackathon 2026. All code is open-source under the MIT License.*
