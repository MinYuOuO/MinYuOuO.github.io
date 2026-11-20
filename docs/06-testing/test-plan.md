---
id: PORT-TEST-001
title: Master Test Plan
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Testing
---

## Master Test Plan — Lightoxy (minyu.my)

## 1. Purpose & Scope

This Master Test Plan governs quality verification across the **Lightoxy Engineering Portal** (`minyu.my`) and its flagship project showcases, including the **PRMS (Postgraduate Research Progress Monitoring System)** case study. Testing encompasses visual layout verification, responsive breakpoints, WebGL lifecycle gating, GSAP ScrollTrigger performance, Core Web Vitals, and WCAG accessibility.

---

## 2. Testing Levels

1. **Static Validation & Build Checks:**
   - Multi-page Vite 8 compilation verification (`npm run build`).
   - Tailwind CSS v4 design token and utility resolution.
   - Markdown frontmatter and link integrity checks across `docs/` (`PORT-GOV-001`).
   - Zero-Emoji automated regex audit across all HTML and client scripts.
2. **Visual & Responsive Testing:**
   - Desktop viewports: 1920×1080, 1440×900, 1280×720.
   - Tablet viewports: 768px – 1024px.
   - Mobile viewports: 375px – 414px (iPhone, Pixel).
   - Fluid typography and layout scaling (`clamp()`, `rem`, `%`).
3. **Performance & Energy Testing:**
   - Hero WebGL icosahedron orb render loop suspension via `IntersectionObserver` (0% idle CPU).
   - Zero-Three.js payload verification on `pages/prms.html` (`prms.js` lightweight GSAP-only bundle).
   - Smooth 60fps scroll scrubbing with GSAP ScrollTrigger without layout jank or memory leaks.
   - Sub-1000ms production multi-page build budget.
4. **Interactive Component Verification:**
   - Horizontal expanding accordion deck expansion and hover mechanics.
   - 12-column Bento Grid skill matrix context switching (< 16ms, CLS = 0).
   - PRMS 3-Role Cybernetic Portal Hub tab switching (Candidate, Supervisor, Dean/Admin).
   - PRMS Pinned 4-Stage Supervision & Audit Lifecycle scroll scrub.
   - PRMS HTML5 Canvas vector signature capture pad (touch/stylus/mouse, single-dot handling).
   - PRMS High-Resolution Blueprint Modal Viewer (100%–300% zoom and drag-to-pan physics).
5. **Accessibility (A11y) & SEO:**
   - WCAG 2.1 AA color contrast compliance in dark and light modes.
   - Semantic HTML elements (`<header>`, `<main>`, `<section>`, `<nav>`, `<button>`).
   - Schema.org JSON-LD structured data and XML sitemap validation.
