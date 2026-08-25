# Web3 Wallet-Connect dApp

> A minimal dApp that connects an EVM wallet (MetaMask / WalletConnect), reads
> the connected account + native balance, and signs a message — the foundation
> every Web3 frontend needs.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)]()

## Problem
Web3 frontends repeat the same fragile wallet-connect + balance-read + sign
flow in every project. Getting it wrong means users can't connect at all.

## Approach
A clean React + ethers.js v6 frontend with a typed `useWallet` hook,
WalletConnect + injected-provider support, and a safe sign-message flow with
clear error states (no wallet, wrong network, user rejection).

## What's inside
- `useWallet` hook (connect / disconnect / account / chainId / balance)
- Injected provider + WalletConnect fallback
- Network switch helper (Ethereum mainnet / testnet)
- Sign-message demo with rejection handling

## Stack
React · TypeScript · ethers.js v6 · WalletConnect · Vite

## Run
```bash
npm i && npm run dev
# optional: set VITE_WALLETCONNECT_PROJECT_ID in .env (see .env.example)
```
> No private keys — read-only until the user signs with their own wallet.

## Topics
`web3` · `ethers` · `walletconnect` · `dapp` · `evm` · `react` · `blockchain`
