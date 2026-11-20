---
id: PORT-DEV-001
title: Coding Standards & Style Guide
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Development
---

## Coding Standards & Style Guide — Lightoxy (minyu.my)

## 1. Overview & Architectural Quality Mandate

All source code authored for **Lightoxy's Official Engineering Portal** (`minyu.my` / `MinYuOuO.github.io`) must adhere to strict craftsmanship standards: modern semantic HTML5, CSS-first design token architecture, high-performance vanilla ES6+ JavaScript, fluid responsive geometry, and total accessibility compliance (WCAG 2.1 AA).

---

## 2. Traceability & System References

| Reference Target                          | Document ID                                                                         | Relative Path                                                    | Relationship Type | Relevance / Description                                            |
| ----------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------ |
| Documentation Standards                   | [PORT-GOV-001](../DOCUMENTATION_STANDARD.md)                                        | `../DOCUMENTATION_STANDARD.md`                                   | Governed By       | Universal governance, frontmatter schema, and brand identity rules |
| Software Requirements Specification (SRS) | [PORT-REQ-001](../02-requirements/srs.md)                                           | `../02-requirements/srs.md`                                      | Implements        | Functional requirements, performance NFRs, and accessibility gates |
| Software Architecture Document (SAD)      | [PORT-ARCH-001](../03-architecture/sad.md)                                          | `../03-architecture/sad.md`                                      | Informs           | Static delivery architecture, WebGL power gating, and module map   |
| Low-Level Design (LLD)                    | [PORT-ARCH-004](../03-architecture/lld.md)                                          | `../03-architecture/lld.md`                                      | Realizes          | Component engines, spring physics, and skill dictionary structures |
| Modern Tooling ADR                        | [PORT-ARCH-ADR-006](../03-architecture/adr/adr-006-modern-tooling-vite-tailwind.md) | `../03-architecture/adr/adr-006-modern-tooling-vite-tailwind.md` | Governed By       | Vite MPA bundler, Tailwind v4 plugin, and ES module bundling       |
| Design System Specifications              | [PORT-DES-001](../04-design/design-system.md)                                       | `../04-design/design-system.md`                                  | Directs           | Visual design tokens, color palette, and 7 motion principles       |

---

## 3. HTML5 & Semantic Structure Standards

1. **Semantic Elements:** Structure pages using native landmark elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`). Avoid unsemantic nested `<div>` soup.
2. **Heading Hierarchy:** Maintain strictly one `<h1>` per page matching title metadata, followed by logical descending `<h2>` and `<h3>` tags.
3. **Accessibility Attributes:** All interactive buttons and anchor links must provide descriptive labels (`aria-label` or accessible text) and focus indicators (`focus-visible:ring-2`).
4. **Imagery & Media:** Always provide descriptive, keyword-rich `alt` text, explicit aspect ratios (`aspect-square`, `aspect-video`), and `loading="lazy"` on below-the-fold media.
5. **Head Optimization:** Include canonical tags, Open Graph / Twitter Card social previews, and Schema.org JSON-LD structured data on all pages.

---

## 4. CSS, Tailwind CSS v4 & Zero-Rigid-Pixels Mandate

1. **Zero-Rigid-Pixels Rule:** Hardcoded pixel dimensions (`px`) are strictly forbidden for layout containers, component heights, and structural padding. Use fluid units exclusively:
   - Relative scaling: `rem`, `em`, `%`.
   - Dynamic viewport sizing: `vw`, `dvh` (accommodates mobile browser chrome).
   - Mathematical clamping: `clamp(min, preferred, max)`.
2. **CSS-First Token Architecture:** Tailwind CSS v4 design tokens are configured in `src/style/main.css` via `@theme` directives without JavaScript config wrappers.
3. **Performance Compilation:** The stylesheet compiles via `@tailwindcss/vite` natively during `npm run build` in `< 300ms`. Do not manually edit compiled assets.
4. **Compositor-Only Animations:** Scroll, hover, and expansion animations must mutate only GPU-composited properties (`transform`, `opacity`, `flex-grow`).

---

## 5. JavaScript & ES Modules Standards

1. **Pure Modular Vanilla JS:** Native ES6+ modules (`import` / `export`) bundled via Vite. Zero heavy client-side framework runtimes (no React, Vue, or Angular SPA hydration overhead).
2. **Local npm Dependencies:** Three.js is imported directly from the local package (`import * as THREE from 'three'`). Zero reliance on third-party CDNs (CDNJS, JSDelivr).
3. **Sub-16ms State Mutations:** Interactive controls (such as the Bento Grid Skill Inspector) must update DOM text and badge states in `< 16ms` with Cumulative Layout Shift `CLS = 0`.
4. **Resource Power-Gating:** All WebGL loops must observe their bounding container via `IntersectionObserver` and immediately halt `requestAnimationFrame` when scrolled offscreen (0% idle CPU).
5. **Lifecycle Management:** Remove event listeners on teardown and use passive scroll listeners (`{ passive: true }`) for high-frequency events.

---

## 6. Brand Sovereignty & Code Hygiene

1. **Brand Identity:** Consistently attribute **Lightoxy** as Loh Min Yu's crafted personal brand banner, never as a corporate agency or studio.
2. **Zero-Moniker Rule:** Any legacy or retired personal aliases are permanently deprecated. They are strictly forbidden anywhere in comments, variable names, classes, or commit logs (enforced via automated linting).
3. **Formatting & Quality:** Standard 2-space indentation, semicolons, and clean code comments explaining architectural intent.
