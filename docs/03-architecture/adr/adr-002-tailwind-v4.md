---
id: PORT-ARCH-ADR-002
title: "ADR-002: Tailwind CSS v4 CSS-First Architecture"
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Architecture
---

## ADR-002: Tailwind CSS v4 CSS-First Architecture — Lightoxy (minyu.my)

## 1. Context & Problem Statement

Tailwind CSS historically required a JavaScript configuration file (`tailwind.config.js`) and PostCSS processing plugins. With the release of Tailwind CSS v4, the engine shifted to a native CSS-first architecture.

## 2. Decision

We adopted **Tailwind CSS v4** integrated natively with Vite via `@tailwindcss/vite` and a CSS-first design token configuration located in `./src/style/main.css`.

## 3. Rationale & Benefits

- **Sub-150ms Builds:** Native Rust-based oxide engine compiles the minified CSS bundle in ~130ms.
- **Zero Config Overhead:** No complex PostCSS, Webpack, or Babel toolchains. A single clean npm script (`npm run build`) handles complete compilation.
- **Modern CSS Features:** Native support for `@theme`, CSS variables, and modern color spaces.

## 4. Consequences

- Utility classes are imported and configured directly within `src/style/main.css`.
