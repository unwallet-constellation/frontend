# Unwallet – Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![TypeScript](https://img.shields.io/badge/Typescript-blue)
![Next.js](https://img.shields.io/badge/Next.js-gray)
![Tailwind](https://img.shields.io/badge/Tailwind-pink)

This is the frontend of the _Unwallet_ hackathon project at [Chainlink Constellation 2023](https://chain.link/hackathon). The repository was scaffolded with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

> **Pre-requisites:**
>
> - Setup Node.js v18+ (recommended via [nvm](https://github.com/nvm-sh/nvm) with `nvm install 18`)
> - Install [pnpm](https://pnpm.io/installation) (recommended via [Node.js Corepack](https://nodejs.org/api/corepack.html) or `npm i -g pnpm`)
> - Clone this repository

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy & fill environments
cp .env.local.example .env.local
```

## Development

> [!INFO]  
> For the best development experience, install all recommended VSCode workspace plugins listed in `.vscode/extensions.json`.

```bash
# Start development server
pnpm run dev

# Build production frontend & start server
pnpm run build
pnpm run start
```
