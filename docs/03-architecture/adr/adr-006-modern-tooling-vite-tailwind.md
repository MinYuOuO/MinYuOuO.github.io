---
id: PORT-ARCH-ADR-006
title: "ADR-006: Modern Tooling with Vite, Tailwind CSS v4 & ES Modules"
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Architecture
---

## ADR-006: Modern Tooling with Vite, Tailwind CSS v4 & ES Modules — Lightoxy (minyu.my)

## 1. Context & Problem Statement

The portfolio previously relied on loose script tags, external CDN links for Three.js (`cdnjs.cloudflare.com`), and a standalone Tailwind CLI compiler. While functional, this created minor vulnerabilities:

- Reliance on external CDN availability and network latency for Three.js.
- Lack of local development hot-module replacement (HMR).
- Absence of automated Rollup tree-shaking for modern JavaScript modules.

## 2. Decision

We adopted **Vite** as the primary build tool and development server, paired with the official **`@tailwindcss/vite`** plugin, local **`three`** npm package integration, and a GitHub Actions workflow deploying `dist/` to GitHub Pages (`minyu.my`).

## 3. Rationale & Benefits

1. **Instant Developer Ergonomics (HMR):** `npm run dev` provides instant local server startup with live hot-module replacement for CSS and HTML changes.
2. **Local Three.js Dependency & Tree-Shaking:** Three.js is bundled directly from npm, eliminating external third-party CDN dependencies and subresource integrity risks.
3. **Multi-Page Application (MPA) Support:** `vite.config.js` defines all 9 HTML showcase pages as explicit Rollup inputs, compiling the entire static site in under 400ms.
4. **Zero Client Runtime Overhead:** Vite compiles to pure, optimized static HTML, CSS, and vanilla JavaScript in `dist/`. There is zero React/Vue framework runtime overhead.
5. **Automated CI/CD:** `.github/workflows/deploy.yml` builds and deploys `dist/` directly to GitHub Pages on every push to `main`.

## 4. Consequences

- Development executes via `npm run dev`.
- Production builds execute via `npm run build` targeting `dist/`.
- Local previews execute via `npm run preview`.
