---
id: PORT-MAINT-003
title: Changelog Specification
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Maintenance
---

## Changelog Specification — Lightoxy (minyu.my)

All notable changes to this project are documented in this file following the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format. Versioning references the baseline commit (`1.0.0`) per `PORT-GOV-001`.

---

## [Unreleased]

### Added

- **PRMS Flagship Showcase Redesign:** Redesigned `pages/prms.html` into an enterprise case study with a clean editorial engineering aesthetic and component-driven scroll choreography.
- **PRMS Component-Driven Scroll Choreography (`src/script/prms.js`):** Lightweight GSAP `ScrollTrigger` & `ScrollToPlugin` choreography animating the actual UI components directly (two-layer Hero parallax, horizontal datum rule draws, opposing Before/After wing convergence with paired row cascades, perspective card elevations, directional pinned stage slides, and blueprint drafting zoom) with zero Three.js overhead (`-529 kB` bundle reduction, formally codified in ADR-008).
- **Pinned 4-Stage Supervision & Audit Lifecycle:** Sticky scroll sequence advancing directionally through candidate submission, vector signature capture on an HTML5 canvas, cryptographic SHA-256 state locking with elastic emerald lock pulse, and append-only audit stream ingestion.
- **Interactive 3-Role Cybernetic Portal Hub:** Instant tabbed switching with staggered GSAP entrances between Candidate (milestone stepper & logs), Supervisor (ReBAC advisee roster & 11-point rubric grading), and Dean/IPSRE Admin (macro completion metrics & at-risk queue).
- **High-Resolution Blueprint Modal Viewer:** Integrated zoomable modal (100%–300%) with drag-to-pan physics and animated tab transitions for all 6 architectural schematics, including the 13,500px ERD.
- **Administrative Transformation Matrix:** High-contrast Before vs. After comparison with opposing wing convergence highlighting the operational transition from fragmented Excel/emails to a centralized single source of truth.
- **Cohesive Scroll-Driven Animation System:** Integrated GSAP ScrollTrigger and ScrollToPlugin providing continuous, bidirectional scrubbed animations synchronized with natural scroll velocity.
- **Pin Compensation & Flight Lock:** Dynamic calculation of sticky pin spacer heights ensures spine waypoint navigation highlights remain perfectly accurate; flight lock prevents click-driven navigation from fighting with user scroll events.
- **6-Phase WebGL Visual Motif on Home Page:** Three.js geometric scene evolves across sections (Hero orb -> About particles -> Projects framing -> Skills matrix -> Milestones path -> Contact convergence) with power gating (0% idle CPU when offscreen).
- **Dedicated About Section (`#about`):** Added 3 structured perspective cards showcasing Loh Min Yu's authentic background (Bachelor of IT, pragmatic software/game/AI engineering, Python/C++/C#, analytical/reflective mindset, literature, and the art of tea).
- **Industry Learning Milestone:** Documented current internship at ITWin Technology Sdn Bhd (a wholly-owned subsidiary of CabNet Holdings Berhad) from 1 Sep – 30 Nov 2026.
- **Direct Project Links in Skills Matrix:** Replaced verbose multi-line description paragraphs in the Bento grid with concise `Applied in: [Project Name →]` elements linking directly to corresponding project showcases.
- **Architectural Decision Records:** Added ADR-007 (Scroll-Driven Animation Architecture) and ADR-008 (PRMS Component-Driven Scroll Choreography vs. Background WebGL Canvas).

### Changed

- **Zero-Emoji Compliance:** Eradicated all emoji characters across HTML, scripts, and portal configurations, replacing them with crisp, precision inline SVG icons (Heroicons style).
- **Streamlined Narrative Focus:** Completely removed the superfluous Code Workstation section, consolidating the page structure to 6 high-impact architectural zones mapped 1:1 to spine waypoints.
- **PRMS Final Year Project Status:** Updated timeline to reflect that PRMS was completed before September 2026.
- **Fixed AI Microphone SVG Icon:** Restored the missing top capsule path segment (`V5a3 3 0 116 0v6a3 3 0 01-3 3z`), resolving the icon display glitch.
- **Plain English Tone Alignment:** Replaced overly complex, archaic, or theatrical phrasing across the entire website with clear, humble, and professional language.
- **Minimal Frosted Header:** Streamlined top header to include only the Lightoxy vector logo, direct Resume [PDF] access button, and theme toggle, delegating section navigation to the floating spine indicator.
- **Updated Tech Marquee:** Added active technologies including Python ML, C++ / C#, IoT Systems, and Game Production.
- **Refined Project Deck:** Project showcase pinned sequence cleanly highlights 4 flagship systems with direct links to dedicated deep-dive pages.

### Removed

- **Footer Text Pruning:** Deleted the redundant philosophical phrase (`"Finding balance between technical problem-solving, philosophy, and the mindful art of tea."`) from the footer, retaining the clean Simone Weil inscription and signature bar.
- **Landing Page Catalog Pruning:** Removed redundant `#catalog` section from `index.html` to tighten the core story into 6 clean sections; preserved the complete 20+ project historical directory at dedicated `pages/archives.html`.

---

## [1.0.0] - 2026-11-16

### Added

- Created `docs/` governance directory with documentation standard `PORT-GOV-001`.
- Added Horizontal Expanding Accordion Deck (`#deck-container`) with smooth cubic-bezier easing and 450px height.
- Added dedicated static showcase pages (`prms.html`, `senai.html`, `jiuxi.html`, etc.).
- Restored `/archives.html` with historical project catalog.
- Elevated **Lightoxy** Brand Vision across all governance and architecture specifications.
- Explicit, comprehensive SEO requirements (`FR-SEO.1` through `FR-SEO.8`, Core Web Vitals, Schema.org JSON-LD).
- Added contemporary dark mode tokens and refined glassmorphic surfaces.

### Removed

- Retired `stellarEchoes.html` from sitemap, project routing, and documentation.
- Removed `feasibility-study.md` (`PORT-PLAN-003`) as unnecessary per project directives.
- Removed archaic 1990s sepia parchment background and retro dotted matrix patterns.
