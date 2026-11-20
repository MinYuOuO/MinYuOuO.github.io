---
id: PORT-PLAN-003
title: Project Scope & Boundary Specification
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Planning
---

## Project Scope & Boundary Specification — Lightoxy (minyu.my)

## 1. Executive Scope Overview

This specification establishes the explicit boundaries, system deliverables, and out-of-scope declarations for **Lightoxy's Official Engineering Portal** (`minyu.my` / `MinYuOuO.github.io`).

---

## 2. In-Scope Deliverables

1. **Lightoxy Brand Presentation (`index.html`) — The 6-Section Continuous Architecture:**
   - **Zone 0 (Header):** Minimal glass navigation with official Lightoxy SVG logo, synchronous theme switcher, and direct PDF resume button (omitting redundant links in favor of the spine navigator).
   - **Zone 1 (Hero):** Clean headline with fluid bounds (`w-full max-w-[min(100%,48rem)]`) and interactive Three.js WebGL hero orb (`w-[clamp(18rem,45vw,36rem)] aspect-square`) with power-gated render loop (`IntersectionObserver` pause).
   - **The Architectural Guide Spine:** Continuous scroll-driven visual thread connecting Sections 1 through 6 via pin-compensated waypoints and GSAP ScrollTrigger.
   - **Zone 2 (About & Marquee):** Pragmatic engineering, analytical/reflective mindset, literature and tea philosophy, accompanied by an infinite hardware-accelerated tech marquee.
   - **Zone 3 (Featured Projects):** Pinned and scrubbed flagship project showcase featuring the Horizontal Expanding Accordion Deck with fluid responsive height (`min-h-[clamp(26rem,55vh,36rem)]` on desktop, fluid vertical stack on mobile), featuring PRMS, Traces of Senai, JiuXi Mindscape, and Colorella.
   - **Zone 4 (Bento Grid — Interactive Skill Matrix):** Asymmetric 12-Column Bento Grid as an Interactive Engineering Skill Matrix by Stack Layer (Backend, DevOps, AI/ML, Frontend/Creative) with clickable pills updating context in < 16ms with CLS = 0.
   - **Zone 5 (Milestones):** Chronological track record highlighting academic degrees, IoT research, and career growth.
   - **Zone 6 (Contact & Footer):** Communication channels (Email, LinkedIn, GitHub, WhatsApp) and grounded tea philosophy.
   - **Zero-Rigid-Pixels Mandate:** Fluid layout using `rem`, `%`, `vw`, `dvh`, and `clamp()` dynamic architecture across all sections.
2. **Dedicated Project Deep-Dives:**
   - `prms.html`: Postgraduate Research Progress Monitoring System (Laravel 12, PHP 8.2+, MySQL 8, Docker, System Design, Candidate / Supervisor / Dean portals, ReBAC data scoping, SHA-256 Lock & tamper-proof signature seal, GoT automated nightly risk engine, and component-driven GSAP scroll choreography).
   - `senai.html`: Traces of Senai (K8S hosting, DeepSeek + CosyVoice TTS RAG, Cultural Heritage AI — zero fabricated latency or offline claims).
   - `jiuxi.html`: JiuXi Mindscape (九夕心境) — AI Conversation Service (Raffles Graduation Show 2025, Nanao IP, WebGL / Three.js).
   - `colorella.html`: Colorella Digital Coloring & Art Platform (WCAG contrast testing & color theory utility).
   - `mamak-analytics.html`: Real-time restaurant logistics & POS dashboard.
   - `telco-churn.html`: Machine learning predictive modeling pipeline.
3. **Historical Catalog (`archives.html`):**
   - Comprehensive listing of historical software engineering projects.
4. **Comprehensive SEO & Web Discoverability Package:**
   - Valid XML Sitemap (`sitemap.xml`) referencing all active routes.
   - Standard `robots.txt` configuration for search and AI crawlers.
   - Complete Schema.org JSON-LD structured data (`Organization`, `Person`, `SoftwareApplication`).
   - Canonical URL links and Open Graph / Twitter Card social metadata.
5. **Site Governance & Documentation (`docs/`):**
   - Authoritative documentation standard (`PORT-GOV-001`) and full system profiles.

---

## 3. Explicit Out-of-Scope Boundaries (Non-Goals)

- **No Heavy Client Hydration:** No React, Angular, or Vue SPA runtime overhead; clean semantic HTML5 with Tailwind CSS v4 and modular vanilla JS bundled via Vite 8.3 into static `dist/`.
- **No Dynamic Backend Server or Database:** Pure static delivery via GitHub Pages edge network on custom domain `minyu.my` with zero runtime database or server-side execution.
- **No Third-Party Telemetry:** Zero tracking pixels, third-party analytics scripts, or invasive cookies.

---

## 4. Traceability & System References

| Reference Target                          | Document ID                                | Relative Path               | Relationship Type | Relevance / Description                                            |
| ----------------------------------------- | ------------------------------------------ | --------------------------- | ----------------- | ------------------------------------------------------------------ |
| Project Proposal                          | [PORT-PLAN-001](project-proposal.md)       | `project-proposal.md`       | Refines           | Core brand pillars and architectural vision                        |
| Product Requirements Document (PRD)       | [PORT-PLAN-002](prd.md)                    | `prd.md`                    | Details           | Full functional, non-functional, and SEO requirements              |
| Software Requirements Specification (SRS) | [PORT-REQ-001](../02-requirements/srs.md)  | `../02-requirements/srs.md` | Governs           | Verification parameters and acceptance criteria for scoped systems |
| Software Architecture Document (SAD)      | [PORT-ARCH-001](../03-architecture/sad.md) | `../03-architecture/sad.md` | Informs           | Static site topology, asset pipeline, and interaction state models |
| High-Level Design (HLD)                   | [PORT-ARCH-003](../03-architecture/hld.md) | `../03-architecture/hld.md` | Realizes          | Subsystem decomposition and build boundary specifications          |
