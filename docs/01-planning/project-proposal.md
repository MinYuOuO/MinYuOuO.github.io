---
id: PORT-PLAN-001
title: Lightoxy Brand Identity & Portfolio Proposal
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Software Engineer & Creator)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Planning
---

## Lightoxy Brand Identity & Portfolio Proposal — minyu.my

> _"Attention is the rarest and purest form of generosity."_
> — Simone Weil

## 1. Executive Summary & Brand Identity

**Lightoxy** (`@lightoxy_onyxx` / `minyu.my`) is the personal brand identity and creative banner created by **Loh Min Yu (MinYuOuO)**.

Rather than presenting projects under just a personal name or posing as a corporate agency, **Lightoxy** serves as a cohesive, crafted personal brand identity attached across Min Yu's software engineering systems, academic projects, AI experiments, and creative works.

### 1.1 Core Personal Ethos

- **The Philosophy:** _Thinking clearly in an age built by technology, without being owned by it._
- **The Guiding Line:** _Drawn to the noise, but lost in the silence of it all._
- **The Purpose:** _Lightoxy exists to make clear thinking feel like oxygen — invisible, essential, and available to anyone willing to pause and breathe it in._

Attaching this brand identity across different projects provides a recognizable signature of craftsmanship, architectural clarity, and thoughtful restraint.

---

## 2. Core Pillars of the Lightoxy Brand

1. **Pillar 1 — Tech × Society (Architecture & Sovereignty):**
   - Approaching software as thoughtful behavioral architecture rather than disposable code.
   - Building data-sovereign systems (e.g., Lightoxy's Meet Act, PRMS) that protect user privacy, support local-first storage, and offer Bring-Your-Own-AI (BYOAI) freedom.
2. **Pillar 2 — Modern Materialism (Sovereign Infrastructure):**
   - Examining the material infrastructure of modern data and algorithms.
   - Prioritizing on-device AI runtimes and efficient local computing to minimize lock-in to centralized cloud monopolies.
3. **Pillar 3 — Methodology (Rigorous Systems Thinking):**
   - Grounding digital craft in first principles and solid engineering fundamentals: Laravel 12, PostgreSQL, Docker, and modern WebGL.

---

## 3. Digital Presence & Showcase Portal

This portal (`minyu.my` / `MinYuOuO.github.io`) is the primary showcase anchoring Min Yu's work under the Lightoxy identity, engineered as a unified, continuous visual narrative across a 6-Zone landing page architecture:

- **Calm, Breathable Aesthetics & Zero-Rigid-Pixels:** Deep obsidian surfaces, generous whitespace, and cool azure accents governed strictly by fluid units (`rem`, `%`, `vw`, `dvh`, `clamp()`).
- **Zone 0 — Minimal Header:** Frosted glass navbar (`backdrop-blur-md bg-theme-bg/85`), Lightoxy vector logo, Resume [PDF] button, and zero-flash theme switching.
- **Zone 1 — Hero Stage & Three.js WebGL Orb:** Fluid bounds (`w-full max-w-[min(100%,48rem)]` with `min-h-[calc(100dvh-5rem)]`) and wireframe icosahedron with cursor parallax and power-gated render loop (`IntersectionObserver` 0% idle CPU).
- **The Architectural Guide Spine:** Continuous scroll-driven visual thread connecting Zones 1 through 6 via a dynamic guide filament and pin-compensated waypoints.
- **Zone 2 — About Me & Tech Marquee:** Pragmatic problem solving, analytical/reflective mindset, literature & tea philosophy, alongside an infinite hardware-accelerated tech marquee.
- **Zone 3 — Featured Projects Showcase Deck:** Fluid height (`min-h-[clamp(26rem,55vh,36rem)]`) pinned interactive deck presenting 4 flagship systems (PRMS, Traces of Senai, JiuXi Mindscape, Colorella) with direct access to dedicated deep dives.
- **Zone 4 — Asymmetric 12-Column Bento Grid (Interactive Skill Matrix):** Interactive Stack Inspector organized by technical domain (Backend, DevOps, AI/ML, Frontend/Creative) with clickable pills updating context in < 16ms with CLS = 0.
- **Zone 5 — Milestones & Track Record:** Chronological progression of academic degrees, IoT engineering, and career achievements.
- **Zone 6 — Contact Hub & Grounded Footer:** Direct communication channels (Email, LinkedIn, GitHub, WhatsApp) and grounded tea philosophy.
- **Dedicated Project Archives:** Standalone directory (`pages/archives.html`) cataloging 20+ engineering projects and repositories.
- **Search & AI Discoverability (SEO/GEO):** Structured JSON-LD metadata, sitemaps, and semantic passages ensuring work is discoverable by search engines and AI answer engines.

---

## 4. Traceability & System References

| Reference Target                     | Document ID                                   | Relative Path                   | Relationship Type | Relevance / Description                                            |
| ------------------------------------ | --------------------------------------------- | ------------------------------- | ----------------- | ------------------------------------------------------------------ |
| Product Requirements Document (PRD)  | [PORT-PLAN-002](prd.md)                       | `prd.md`                        | Contextualizes    | Upstream functional, non-functional, and SEO requirements          |
| Scope Specification                  | [PORT-PLAN-003](scope.md)                     | `scope.md`                      | Delimits          | Authoritative project showcase inventory and SEO boundaries        |
| Design System Specifications         | [PORT-DES-001](../04-design/design-system.md) | `../04-design/design-system.md` | Informs           | Visual tokens, typography, and calm architectural voice            |
| Software Architecture Document (SAD) | [PORT-ARCH-001](../03-architecture/sad.md)    | `../03-architecture/sad.md`     | Informs           | Static site topology, asset pipeline, and interaction state models |
