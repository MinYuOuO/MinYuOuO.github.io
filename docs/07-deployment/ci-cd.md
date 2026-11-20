---
id: PORT-DEP-003
title: CI/CD Pipeline & GitHub Pages Automated Deployment
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Deployment
---

## CI/CD Pipeline & GitHub Pages Automated Deployment — Lightoxy (minyu.my)

## 1. Automated GitHub Actions Pipeline (`deploy.yml`)

The repository utilizes **GitHub Actions** (`.github/workflows/deploy.yml`) to automatically build and deploy production static assets on every push to the `main` branch:

```yaml
name: Deploy Lightoxy Portfolio to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build with Vite & Tailwind v4
        run: npm run build

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 2. Build Pipeline Stages

1. **Clean Installation (`npm ci`):** Installs exact dependency tree from `package-lock.json`.
2. **Vite MPA Compilation (`npm run build`):**
   - Ingests all 9 HTML showcase pages.
   - Compiles Tailwind CSS v4 design tokens via `@tailwindcss/vite`.
   - Bundles and tree-shakes Three.js ES modules.
   - Outputs optimized production bundle into `./dist` in `< 400ms`.
3. **Artifact Staging & Pages Deployment:**
   - Packages `./dist` as a GitHub Pages artifact via `actions/upload-pages-artifact@v3`.
   - Deploys atomically to custom domain `https://minyu.my/` via `actions/deploy-pages@v4` with zero downtime.
