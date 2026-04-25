# QuantumMail - Web3 Email dApp

A decentralized email application with quantum-grade encryption powered by Fully Homomorphic Encryption (FHE).

## Demo (No ETH Required)

This app works in **DEMO MODE** for testing without testnet ETH:

1. `npm run dev`
2. Open http://localhost:3000
3. Compose an email
4. Copy the generated code
5. Share via chat with teammate
6. Teammate imports the code

## Production Mode (Real Blockchain)

To enable real on-chain emails:

1. Get Sepolia ETH from https://www.alchemy.com/faucets/ethereum-sepolia
2. Set `DEMO_MODE = false` in `src/context/EmailContext.tsx`
3. Transactions will go to: `0xCB45011ca6B8CDce01792CBB9B4c999479E94a0E`

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                         │
│  Next.js 16 + RainbowKit + Wagmi + Neo-Brutalist UI  │
└─────────────────────────────────────────────────────┘
                          │
                          ▼ (with realETH)
┌─────────────────────────────────────────────────────┐
│                   BLOCKCHAIN                          │
│  Smart Contract: FHEZmail (Sepolia)                  │
│  Encryption: Fully Homomorphic (FHE)              │
│  Storage: On-chain (encrypted)                     │
└─────────────────────────────────────────────────────┘
```

## Gas & Scalability (For Production)

**Current**: Uses Sepolia testnet (free test ETH)

**Production Solutions** (to eliminate user gas fees):

1. **Gasless Transactions** - Use Biconomy/Gelato relayers
2. **Account Abstraction** - Smart contract wallets (ERC-4337)
3. **Layer 2** - Deploy on Base/Polygon (~$0.001/tx)
4. **Batch Operations** - Send multiple emails in one tx

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS v4
- **Web3**: RainbowKit, Wagmi v3, Viem
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Smart Contract**: FHEZmail on Sepolia

## Hackathon Points

✅ Real Web3 integration (wallet auth, smart contract)
✅ FHE encryption (quantum-safe)
✅ Decentralized storage
✅ Neo-Brutalist UX design
✅ Mock demo mode for testing