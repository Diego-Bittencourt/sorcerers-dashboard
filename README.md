# Tibia Insights Platform

A **monorepo** powered by [Turborepo](https://turbo.build/repo), containing both frontend and backend applications, as well as shared packages.  
The platform provides **data-driven insights, charts, and statistics** for players of the online RPG **Tibia**.

---

## 📂 Repository Structure

    .
    ├── apps
    │   ├── web    # Nuxt.js application (frontend)
    │   └── api    # Nest.js application (backend)
    │
    ├── packages
    │   ├── types          # Shared TypeScript types
    │   ├── utils          # Utility functions shared across apps
    │   ├── eslint-config  # Shared ESLint configuration
    │   └── tsconfig       # Shared TypeScript configurations
    │
    └── turbo.json         # Turborepo configuration

---

## 🚀 Applications

### **Web (Nuxt.js)**
- Located in `apps/web`
- Provides the **frontend interface** for Tibia players
- Displays charts, statistics, and insights about the game

### **API (Nest.js)**
- Located in `apps/api`
- Handles **data collection, processing, and serving**
- Exposes endpoints consumed by the `web` app

---

## 📦 Shared Packages

- **types** → Shared TypeScript type definitions  
- **utils** → General-purpose utility functions  
- **eslint-config** → Standardized ESLint rules for consistent code style  
- **tsconfig** → Centralized TypeScript configuration

---

## 🛠️ Development

### Prerequisites
- **Node.js** (>= 18.x)
- **pnpm** (recommended) or `yarn`/`npm`
- **Turborepo** (optional; `pnpm dlx turbo` works)

### Install Dependencies

    pnpm install

### Run Development Servers

Start both frontend (`web`) and backend (`api`) simultaneously:

    pnpm dev

Or run individually:

    # Web (Nuxt)
    pnpm --filter web dev

    # API (Nest)
    pnpm --filter api start:dev

---

## 📊 Features

- **Nuxt.js frontend** with modern SSR/SPA features  
- **Nest.js backend** with modular architecture  
- **Turborepo-powered monorepo** for efficient builds and caching  
- **Charts and analytics** providing player insights into the Tibia universe  
- **Reusable packages** (types, utils, linting, configs)  
