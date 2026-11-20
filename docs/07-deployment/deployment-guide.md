---
id: PORT-DEP-001
title: GitHub Pages Deployment Guide
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Deployment
---

## GitHub Pages Deployment Guide — Lightoxy (minyu.my)

## 1. Overview

The portal is deployed as a high-performance static Multi-Page Application (MPA) via **GitHub Actions** to **GitHub Pages**, mapped to the custom apex domain `minyu.my` with automated SSL/TLS provisioning.

---

## 2. Deployment Architecture & Procedure

### 2.1 Automated CI/CD Deployment (Recommended)

Pushing to the protected `main` branch automatically triggers `.github/workflows/deploy.yml`:

1. Checks out repository source.
2. Installs locked dependencies via `npm ci`.
3. Runs Vite 8 multi-page compilation (`npm run build`), bundling HTML showcases, Tailwind CSS v4 design tokens, and ES modules into `./dist`.
4. Statically copies assets from `public/` (including `CNAME`, `.nojekyll`, `robots.txt`, and `sitemap.xml`) to `./dist`.
5. Uploads `./dist` and atomically deploys to GitHub Pages via `actions/deploy-pages@v4`.

### 2.2 Local Production Build Verification

Before pushing changes, verify the production build locally:

```bash
# 1. Run multi-page production build
npm run build

# 2. Preview the compiled production distribution locally
npm run preview
```

### 2.3 Static Asset Governance

All public static configuration files reside in `public/`:

- `public/CNAME`: Binds GitHub Pages to apex domain `minyu.my`.
- `public/.nojekyll`: Instructs GitHub Pages to serve files without Jekyll processing.
- `public/robots.txt`: Search engine crawling directives.
- `public/sitemap.xml`: XML sitemap cataloging all canonical routes.

Vite automatically packages the contents of `public/` into the root of `dist/` upon build.

---

## 3. Post-Deployment Verification

1. Inspect GitHub Actions workflow run for green status.
2. Confirm live responses on `https://minyu.my`.
3. Verify HTTPS enforcement and custom domain SSL certificate validity.
