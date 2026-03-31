# 🌟 Stellar Payment dApp

Build beautiful payment dashboards on the Stellar blockchain!

*A full-stack Web3 application built for the **Stellar Journey to Mastery – White Belt Submission**.*

## 🎯 What's This?
This is a sleek, modern payment dApp built on the Stellar Testnet. It demonstrates:
🎓 Learning Stellar blockchain development
🚀 Creating a real Web3 payment interface
💼 Securely signing transactions via Freighter
🏆 Successfully completing the Stellar White Belt challenge

---

## ✨ Features

✅ **Wallet Connection** - Connect and disconnect securely using the latest Freighter API.
✅ **Balance Display** - Real-time fetching of native XLM balances from the Stellar Testnet.
✅ **Unfunded Account Handling** - Graceful fallback UI linking directly to the Stellar Friendbot if your account is unfunded.
✅ **Send Payments** - Send XLM to any Stellar address in seconds with full transaction simulation.
✅ **Transaction Status** - View the transaction result with clickable links to the Stellar Expert block explorer.
✅ **Responsive Design** - Fully responsive, accessible, dark-mode ready interface built with Tailwind CSS.
✅ **Error Handling** - User-friendly error messages for failed transactions or invalid addresses.
✅ **TypeScript** - Full type safety across all components and API calls.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Chromium-based browser with the [Freighter Wallet](https://www.freighter.app/) extension installed.
- Freighter set to **Testnet** mode.

### Installation

```bash
# Clone the repository
git clone https://github.com/SyedMaazz/stellar-payment-dapp.git
cd stellar-payment-dapp

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Get Testnet XLM
1. Connect your wallet using the **Connect** button.
2. If your balance is `0.00`, click the Friendbot link in the warning box.
3. Paste your public address in the Stellar Laboratory and fund it.
4. Refresh your dApp to see your balance jump to 10,000 XLM!

---

## 📁 Project Structure
```text
stellar-payment-dapp/
├── app/
│   ├── globals.css          # Global Tailwind styles
│   ├── layout.tsx           # Root Layout
│   └── page.tsx             # Main dashboard assembly
├── components/
│   ├── WalletConnect.tsx    # Wallet connect/disconnect UI
│   ├── BalancePanel.tsx     # Shows XLM balance & Friendbot warning
│   ├── SendForm.tsx         # Payment form logic & Freighter signing
│   └── TxStatus.tsx         # Success/Failure transaction UI
├── hooks/
│   └── useWallet.ts         # Custom React hook for wallet state
├── lib/
│   ├── freighter.ts         # Freighter API abstractions
│   └── stellar.ts           # Blockchain logic (Horizon, TxBuilder)
└── screenshots/             # Submission screenshots
```

---

## 📦 Tech Stack
| Technology | Purpose |
| ---------- | ------- |
| **Next.js** | React Framework *(App Router)* |
| **TypeScript** | Strict Type Safety |
| **Tailwind CSS** | Styling |
| **Stellar SDK** | Blockchain Operations (`@stellar/stellar-sdk`) |
| **Freighter API** | Wallet Connections (`@stellar/freighter-api`) |

---

## 📸 Application Screenshots

### 1. Wallet connected state
![Wallet Connected](./screenshots/wallet-connected.jpeg)

### 2. Balance displayed
![Balance Displayed](./screenshots/balance-displayed.jpeg)

### 3. Successful testnet transaction
![Testnet Transaction](./screenshots/testnet-transaction.jpeg)

### 4. The transaction result is shown to the user
![Transaction Result](./screenshots/transaction-result.jpeg)

---

## 🆘 Troubleshooting

**Wallet won't connect?**
- Make sure you have the Freighter wallet extension installed and unlocked.
- Check if you're on the Testnet network inside Freighter settings.

**Transaction fails?**
- Check if you have enough XLM (keep at least 1 XLM as a reserve minimum).
- Verify the recipient address is valid.
- Make sure you are not trying to send XLM from an account to itself!

---

## 🤝 Submission Details

This project is submitted as part of the **Stellar Journey to Mastery** program.
- **Author:** Syed Maaz
- **Level:** White Belt
- **Network Used:** Stellar Testnet

Made with ❤️ for the Stellar Community. Happy Building! 🚀✨
