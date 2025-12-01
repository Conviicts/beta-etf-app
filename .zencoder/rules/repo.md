---
description: Repository Information Overview
alwaysApply: true
---

# Helios Portal Information

## Summary

**Helios Portal** is the official entry point to the Helios Blockchain, providing a seamless interface for cross-chain bridging, staking, delegation, governance voting, and portfolio management. The platform integrates EVM wallets and Cosmos-based tools while operating entirely on Helios Node RPC, eliminating reliance on centralized APIs or backend services.

## Structure

- **app/** – Next.js pages and route handlers organized by feature (bridge, delegations, governance, validators, token-deployer, etf-creator, dashboard)
- **components/** – Reusable React components (UI elements, charts, modals, inputs, etc.)
- **config/** – Application configuration files (chain config, RPC endpoints, app settings, contract constants)
- **context/** – React Context providers for global state (RecentETFs, RecentTokens, VotingHistory)
- **hooks/** – Custom React hooks for data fetching, blockchain interactions, and state management
- **lib/** – Utility libraries for API calls and metadata handling
- **types/** – TypeScript type definitions for API responses, blockchain entities, transactions
- **utils/** – Utility functions for formatting, calculations, storage, and asset handling
- **styles/** – SCSS stylesheets with color variables, mixins, and responsive design
- **stores/** – Zustand state management stores (app state, user state)
- **public/** – Static assets (fonts, images)

## Language & Runtime

**Language**: TypeScript  
**Language Version**: ^5  
**Runtime**: Node.js (Next.js)  
**Framework**: React ^19.0.0  
**Build System**: Next.js 15.2.1  
**Package Manager**: npm (pnpm-lock.yaml and yarn.lock also present)

## Dependencies

**Main Dependencies**:
- `@reown/appkit` & `@reown/appkit-adapter-wagmi` – Web3 wallet connection framework
- `wagmi` & `@wagmi/core` – React hooks for Ethereum
- `viem` – Ethereum client library
- `ethers` – Blockchain interaction library
- `web3` – Web3.js library for blockchain connectivity
- `@tanstack/react-query` – Server state management and caching
- `zustand` – Lightweight state management
- `axios` – HTTP client for API requests
- `recharts` – React charting library
- `react-toastify` & `sonner` – Toast notifications
- `zod` – TypeScript-first schema validation
- `swiper` – Touch slider carousel
- `date-fns` & `moment` – Date utilities
- `bignumber.js` – Large number arithmetic
- `@iconify/react` – Icon library
- `@radix-ui/react-tooltip` – Accessible tooltip component
- `react-icons` – Icon set
- `sass` – SCSS compiler
- `clsx` – Conditional className utility

**Development Dependencies**:
- `eslint` ^9
- `typescript` ^5
- `@types/node` ^20, `@types/react` ^19, `@types/react-dom` ^19
- `eslint-config-next` – Next.js ESLint configuration

## Build & Installation

**Install dependencies:**
```bash
npm install
```

**Development server:**
```bash
npm run dev
```
Runs on `http://localhost:3000`

**Production build:**
```bash
npm run build
```

**Start production server:**
```bash
npm start
```

**Linting:**
```bash
npm lint
```

## Configuration Files

**TypeScript** (`tsconfig.json`):
- Target: ES2020
- Strict mode enabled
- Path alias: `@/*` maps to project root
- Next.js plugin integration

**Next.js** (`next.config.ts`):
- Remote image patterns configured for Helios CDN, Coingecko, and testnet RPC endpoints
- Image optimization enabled

**ESLint** (`eslint.config.mjs`):
- Extends Next.js core web vitals and TypeScript presets
- Disables `@typescript-eslint/no-explicit-any` rule

**Prettier** (`.prettierrc`):
- Tab width: 2 spaces
- No semicolons
- Double quotes
- No trailing commas
- Prose wrap: never

## Environment Variables

**Configuration** (`env.ts`):
- `NEXT_PUBLIC_NODE_ENV` – Environment (development/production/test)
- `NEXT_PUBLIC_BASE_URL` – Application base URL (defaults to `http://localhost:3000`)
- `NEXT_PUBLIC_INFURA_KEY` – Infura API key
- `NEXT_PUBLIC_PROJECT_ID` – Reown AppKit project ID

All public variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Main Entry Points

- **app/layout.tsx** – Root layout with global providers (Context, Wrapper, styling)
- **app/** – Feature-based routes (bridge, delegations, governance, validators, token-deployer, etf-creator)
- **app/(components)/** – Shared layout components (header, navigation, modals)
- **config/wagmi.ts** – Wagmi configuration for wallet and chain setup

## Testing

**No testing framework is configured** in this project. No test files (`.test.*`, `.spec.*`) or test configurations found.

## Code Quality

**Linting**: ESLint with Next.js config  
**Formatting**: Prettier (enforced via configuration)  
**Type Checking**: TypeScript with strict mode  
**Validation**: Zod for environment variable validation
