---
id: PORT-ARCH-ADR-001
title: "ADR-001: Static HTML5 + Vanilla JS Stack Selection"
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Architecture
---

## ADR-001: Static HTML5 + Vanilla JS Stack Selection — Lightoxy (minyu.my)

## 1. Context & Problem Statement

When rebuilding the personal portfolio, we evaluated whether to adopt modern heavy SPA/SSR frameworks (Next.js, Astro, Nuxt) or retain a pure static HTML5 + Vanilla JavaScript architecture.

## 2. Decision

We decided to adopt a pure **Static HTML5 + Vanilla JavaScript** stack with zero client-side hydration frameworks.

## 3. Rationale & Benefits

- **Zero Hydration Overhead:** 0kb JavaScript framework payload. TTFB and FCP are instantaneous.
- **Flawless Hosting & Zero Costs:** Directly hostable on GitHub Pages edge network without Node.js server dependencies or serverless function billing.
- **Maximum Longevity:** Plain HTML and vanilla JS scripts remain maintainable for decades without broken npm dependency trees.

## 4. Consequences

- Page transitions must be handled cleanly via semantic HTML navigation and standard CSS transitions rather than client-side router caches.
