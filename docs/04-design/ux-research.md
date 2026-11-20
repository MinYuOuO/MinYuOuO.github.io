---
id: PORT-DES-003
title: UX Research & Recruiter Behavioral Patterns
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Design
---

## UX Research & Recruiter Behavioral Patterns — Lightoxy (minyu.my)

## 1. Key Behavioral Insights

UX research and technical recruiter screening studies indicate:

1. **The 30-Second Screening Window:** Technical recruiters spend an average of 15 to 30 seconds on initial candidate portfolio visits. Key proficiencies (Laravel 12, PostgreSQL, Docker, DeepSeek RAG, Three.js WebGL, Tailwind v4) must be immediately visible in the above-the-fold hero, marquee, and flagship cards.
2. **Preference for Verified Proof over Self-Ratings:** Hiring managers value direct links to real GitHub code repositories, architectural diagrams, and functional live demos over vague self-rating progress bars (e.g. "90% Python").
3. **Card Fatigue & Cognitive Overload:** Long uniform grids where every project card looks identical induce cognitive fatigue. Interactive expanding decks that highlight 4 flagship projects create a memorable focal point.
4. **Contrast and Legibility Standards:** Low-contrast gray-on-dark text is a leading cause of portfolio abandonment. High-contrast typography (`#f8fafc` on `#09090b` in dark mode, `#0f172a` on `#ffffff` in light mode) guarantees instant legibility meeting WCAG 2.1 AA (`>= 4.5:1`).
5. **Continuous Visual Momentum:** Evaluators find disconnected per-section entrance animations jarring. A continuous visual narrative guided by an optical thread ("The Architectural Spine") maintains cognitive momentum and conveys modern product polish (matching Linear, Raycast, and Tubik 2026 standards).

---

## 2. Traceability & System References

| Reference Target                     | Document ID                                         | Relative Path                        | Relationship Type | Relevance / Description                                              |
| ------------------------------------ | --------------------------------------------------- | ------------------------------------ | ----------------- | -------------------------------------------------------------------- |
| Project Proposal                     | [PORT-PLAN-001](../01-planning/project-proposal.md) | `../01-planning/project-proposal.md` | Contextualizes    | Brand philosophy, core pillars, and high-level portal mission        |
| Product Requirements Document (PRD)  | [PORT-PLAN-002](../01-planning/prd.md)              | `../01-planning/prd.md`              | Informs           | User requirements, persona pain points, and component specifications |
| User Stories & Personas              | [PORT-REQ-002](../02-requirements/user-stories.md)  | `../02-requirements/user-stories.md` | Directs           | Recruiter (David), AI Lead (Dr. Elena), and Designer (Sophie) needs  |
| Design System Specifications         | [PORT-DES-001](design-system.md)                    | `design-system.md`                   | Realizes          | Visual design tokens, spring physics curves, and UI components       |
| User Flow & Navigation Architectures | [PORT-DES-002](user-flow.md)                        | `user-flow.md`                       | Realizes          | 6-zone navigation flow and deep-dive transition ergonomics           |
| Responsive Breakpoints Standards     | [PORT-DES-004](responsive-breakpoints.md)           | `responsive-breakpoints.md`          | Governs           | Zero-Rigid-Pixels responsive scaling across recruiter devices        |

---

## 3. Design Solutions Implemented

1. **Continuous Visual Narrative & The Architectural Guide Spine:**
   - Unifies the landing experience from the 3D Hero Orb down to the footer anchor.
   - Eliminates card fatigue by guiding recruiter attention through a choreographed optical path.
2. **Horizontal Expanding Accordion Deck (Zone 3):**
   - Consolidates 4 flagship applications (PRMS, Traces of Senai, JiuXi Mindscape, Colorella) within a fluid viewport boundary (`min-h-[clamp(26rem,55vh,36rem)]`), eliminating endless scrolling while respecting the Zero-Rigid-Pixels Mandate.
   - Smooth spring expansion (`flex-[3.5]` vs `flex-1`, `cubic-bezier(0.16, 1, 0.3, 1)`) provides engaging exploration.
3. **Interactive Engineering Skill Matrix by Stack Layer (Zone 4):**
   - Directly solves the "Verified Proof" requirement: replaces artificial self-rating bars with clickable stack pills (Backend, DevOps, AI/ML, Frontend) that cross-fade real production system architecture context in `< 16ms` with `CLS = 0`.
4. **Accurate Architectural Focus Badges:**
   - Real, uninflated focus badges (e.g. `Laravel 12`, `PostgreSQL`, `Docker`, `RBAC: 3 Portals`, `SHA-256 Lock`, `K8S`, `DeepSeek RAG`, `Three.js WebGL`).
5. **Dedicated Architecture Deep-Dives:**
   - Standalone architectural showcase pages (`prms.html`, `senai.html`, `jiuxi.html`, etc.) for engineering leads conducting deep technical due diligence.
6. **Power-Gated Visual Computing:**
   - `IntersectionObserver` halts Three.js WebGL rendering (0% CPU) when scrolled offscreen, demonstrating systems-level resource consciousness.
