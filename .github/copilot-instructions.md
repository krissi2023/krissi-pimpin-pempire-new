# GitHub Copilot Instructions for Krissi Pimpin' Pimpire

## 🏗 Project Architecture

This is a monorepo-style workspace combining a comic store and arcade gaming platform.

- **Root**: Orchestration, shared game logic (`SourceCode/`), and AI services (`gemini-service.js`).
- **Diamondz Playhouse (`diamondz-playhouse/`)**: The main web application.
  - **Frontend (`frontend/`)**: React + Vite + Phaser.js for arcade games.
  - **Backend (`backend/`)**: Node.js + Express + MongoDB + Stripe.

## 🚀 Critical Workflows

- **Startup**: ALWAYS use `.\start-dev.ps1` to boot MongoDB, Backend (Port 5000), and Frontend (Port 3000).
- **Frontend Dev**: `cd diamondz-playhouse/frontend` -> `npm run dev` (Vite).
- **Backend Dev**: `cd diamondz-playhouse/backend` -> `npm run dev` (Nodemon).
- **Testing**:
  - Backend: `npm test` (Jest) in `diamondz-playhouse/backend`.
  - Frontend: `npm test` (Vitest) in `diamondz-playhouse/frontend`.

## 🧩 Key Patterns & Conventions

- **Game Logic Separation**:
  - Core rules/logic often reside in `SourceCode/` (e.g., `Blackjack.js`).
  - Visual implementation uses Phaser.js in `diamondz-playhouse/frontend/src/games/`.
- **Graphics System**:
  - Strictly follow `diamondz-playhouse/docs/GRAPHICS_OVERVIEW.md`.
  - Use `scripts/generate-placeholders.sh` for missing assets.
- **Data & State**:
  - **Dual Currency**: Respect the distinction between "Pimpin Paul Credits" (PPC) and "Gold Coins".
  - **Stories**: Content is driven by Markdown files in `Stories/`.

## 🛠 Tech Stack Specifics

- **Database**: MongoDB with Mongoose schemas in `backend/models/`.
- **Styling**: CSS3 with specific neon/arcade themes (see `DESIGN_SYSTEM.md`).
- **Payments**: Stripe integration with webhooks (see `WEBHOOK_SETUP_GUIDE.md`).

## ⚠️ Common Pitfalls

- **Port Conflicts**: Root `server.js` and Frontend `simple-server.js` both default to 3001. Check which one is intended.
- **Asset Paths**: Ensure assets are placed in `diamondz-playhouse/assets/` and referenced correctly in React/Phaser.
