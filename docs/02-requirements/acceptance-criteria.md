---
id: PORT-REQ-004
title: Acceptance Criteria & Quality Gates
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Requirements
---

## Acceptance Criteria & Quality Gates — Lightoxy (minyu.my)

## 1. Overview & Gate Governance

Before any commit is merged or deployed to production at `https://minyu.my/`, the portal must satisfy all quality gates outlined in this specification.

Failures at any P0 gate halt release pipelines immediately.

---

## 2. Traceability & System References

| Reference Target                          | Document ID                                | Relative Path               | Relationship Type | Relevance / Description                                            |
| ----------------------------------------- | ------------------------------------------ | --------------------------- | ----------------- | ------------------------------------------------------------------ |
| Product Requirements Document (PRD)       | [PORT-PLAN-002](../01-planning/prd.md)     | `../01-planning/prd.md`     | Contextualizes    | Upstream product capabilities, brand requirements, and SEO targets |
| Scope Specification                       | [PORT-PLAN-003](../01-planning/scope.md)   | `../01-planning/scope.md`   | Delimits          | Authoritative feature boundaries and non-goals                     |
| Software Requirements Specification (SRS) | [PORT-REQ-001](srs.md)                     | `srs.md`                    | Verifies          | Functional requirements and NFRs verified by each gate             |
| User Stories & Stakeholder Personas       | [PORT-REQ-002](user-stories.md)            | `user-stories.md`           | Validates         | Personas and user expectations validated against acceptance gates  |
| Software Architecture Document (SAD)      | [PORT-ARCH-001](../03-architecture/sad.md) | `../03-architecture/sad.md` | Informs           | Architecture constraints and quality attribute thresholds          |

---

## 3. Release Quality Gate Matrix

| Gate ID        | Category              | Priority | Quality Gate Condition / Threshold                                                                                                          | Verification Method                    |
| -------------- | --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `QG-BUILD-1`   | Build Integrity       | **P0**   | Vite MPA + Tailwind CSS v4 minified build completes in `<= 400ms` with 0 compiler errors.                                                   | `npm run build` execution timer        |
| `QG-ID-1`      | Identity Consistency  | **P0**   | Author and brand attribution across all pages strictly reference **Loh Min Yu (MinYuOuO)** and **Lightoxy**.                                | Content Audit Script                   |
| `QG-DATA-1`    | Verified Tech Focus   | **P0**   | PRMS displays Laravel 12, PostgreSQL, Docker, RBAC, SHA-256 Lock; Senai displays K8S + DeepSeek RAG (no fake ms/offline).                   | Content Verification Script            |
| `QG-SEO-1`     | Sitemap Validity      | **P0**   | `sitemap.xml` contains all active routes with 0 dead links or missing routes.                                                               | Sitemapper / Link Checker              |
| `QG-RESP-1`    | Mobile Layout Safety  | **P0**   | Zero horizontal overflow/scroll across any viewport width from `320px` to `3840px`.                                                         | Multi-Device DOM Check                 |
| `QG-DECK-1`    | Flagship Showcase     | **P0**   | Exactly 4 flagship cards rendered: PRMS, Traces of Senai, JiuXi Mindscape, Colorella.                                                       | DOM Query Audit                        |
| `QG-DOCS-1`    | Docs Compliance       | **P0**   | All documentation files under `docs/` conform to `PORT-GOV-001` with valid YAML frontmatter and unique IDs.                                 | `validate_docs.js` Audit Script        |
| `QG-HERO-1`    | Hero Balance          | **P1**   | Hero text bounded by `w-full max-w-[min(100%,48rem)]` with `min-h-[calc(100dvh-5rem)]`; zero unbalanced left void.                          | Multi-Device Visual Inspection         |
| `QG-SPINE-1`   | Continuous Spine      | **P1**   | Scroll-driven guide filament updates `--scroll-progress` on GPU without layout shift (CLS = 0, 60fps).                                      | DevTools Performance Trace             |
| `QG-DECK-2`    | Accordion Fluidity    | **P1**   | Desktop deck height spans `min-h-[clamp(26rem,55vh,36rem)]`; mobile (`< md`) transitions to fluid vertical stack.                           | Responsive Breakpoint Emulation        |
| `QG-BENTO-1`   | Bento Skill Matrix    | **P1**   | 12-col asymmetric grid displays 4 stack layers; Interactive Stack Inspector updates instantly with CLS = 0 and full keyboard accessibility. | DOM Interaction & Multi-Screen Test    |
| `QG-MARQUEE-1` | Marquee Performance   | **P1**   | Infinite Marquee renders at steady 60fps, pauses on hover/focus, and respects `prefers-reduced-motion: reduce`.                             | DevTools Trace & A11y Audit            |
| `QG-PERF-1`    | Core Web Vitals (LCP) | **P1**   | Largest Contentful Paint `<= 2.5s` on mobile 4G throttled audit.                                                                            | Google Lighthouse / PageSpeed          |
| `QG-A11Y-1`    | Color Contrast        | **P1**   | Text elements meet WCAG 2.1 AA (`>= 4.5:1` normal text, `>= 3:1` large text) in both dark and light modes.                                  | axe Accessibility Engine               |
| `QG-SEO-2`     | Schema.org Graph      | **P1**   | Valid JSON-LD graph linking `Organization` (Lightoxy), `Person` (Loh Min Yu), and `SoftwareApplication` without warnings.                   | Google Rich Results Test               |
| `QG-SEO-3`     | Social Meta Tags      | **P1**   | All pages output complete Open Graph and Twitter Card tags with working absolute image assets.                                              | Twitter Card Validator / OpenGraph.xyz |
| `QG-BRAND-1`   | Lightoxy Identity     | **P1**   | Lightoxy represented as Loh Min Yu's crafted personal brand identity across hero copy and metadata.                                         | Content & Metadata Audit               |
| `QG-HERO-2`    | 3D Orb Performance    | **P2**   | When scrolled out of the hero viewport, CPU consumption is `<= 0.5%` via `IntersectionObserver` pause.                                      | Chrome Task Manager / Profiler         |
| `QG-PERF-2`    | Layout Shift (CLS)    | **P2**   | Cumulative Layout Shift `<= 0.1` across all transitions and theme toggles.                                                                  | Chrome Performance Trace               |
| `QG-A11Y-2`    | Keyboard Navigation   | **P2**   | Full site navigable via `Tab`, `Shift+Tab`, `Enter`, and `Escape` with visible focus indicators.                                            | Manual Keyboard Walkthrough            |
| `QG-BRAND-2`   | Philosophical Banner  | **P2**   | Simone Weil quote rendered cleanly in site footer with newsreader/serif accent styling.                                                     | Visual Review Check                    |

---

## 4. Automated Verification Checklist

```powershell
# 1. Verify brand & author consistency
node scratch/check_identity.js

# 2. Build Tailwind CSS v4 assets (target: < 200ms)
npm run build

# 3. Verify all HTML pages, internal links, and asset paths
node scratch/verify_pages.js

# 4. Validate documentation standard, YAML frontmatter, and unique IDs
node scratch/validate_docs.js
```
