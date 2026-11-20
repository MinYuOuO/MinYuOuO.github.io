---
id: PORT-MAINT-002
title: "Release Notes: Lightoxy Engineering Portal Baseline"
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Maintenance
---

## Release Notes: Lightoxy Engineering Portal Baseline — minyu.my

This document provides release notes for **Lightoxy's Official Engineering Portal** (`minyu.my`). Following `PORT-GOV-001`, all release documentation references the commit baseline (`1.0.0`).

---

## Active Development & Unreleased Enhancements

### 1. PRMS Flagship Architecture Redesign & Component-Driven Scroll Choreography

- **Component-Driven Scroll Choreography (`src/script/prms.js`):**
  - Replaced background WebGL canvas decoration with tactile GSAP `ScrollTrigger` component choreography across all 6 showcase sections (formally codified in ADR-008).
  - Eliminated the `529 kB` Three.js dependency from `pages/prms.html`, reducing the PRMS script bundle to `34.81 kB` (`10.34 kB` gzipped) with zero GPU contention.
  - Features two-layer Hero parallax, continuous horizontal datum line draws (`scaleX: 0 -> 1`), opposing Before/After wing convergence with paired row cascades, perspective card elevations, and blueprint drafting zoom-settle.
- **Pinned 4-Stage Supervision & Audit Lifecycle:**
  - Sticky pinned sequence with directional kinetic stage slides and inner column stagger driven by continuous scroll scrub or direct stage navigation:
    - **Stage 01:** Candidate Submission & Event Notification (`SupervisionLogSubmitted`).
    - **Stage 02:** Faculty Review & Live Vector Signature Pad (touch/stylus/mouse HTML5 Canvas with single-dot support and DPR compensation).
    - **Stage 03:** SHA-256 Serialization & Write-Once State Locking (`is_locked = true`) with tactile elastic emerald lock pulse.
    - **Stage 04:** Compliance Stream Ingestion & Automated Risk Clearance.
- **Interactive 3-Role Cybernetic Portal Hub:**
  - Direct tab switching with staggered GSAP entrances to inspect PRMS through 3 distinct user roles: **Candidate** (milestone stepper & logs), **Supervisor** (ReBAC advisee roster & 11-point rubric), and **Dean / Faculty Admin** (macro metrics & at-risk queue).
- **Enhanced Blueprint Inspector with Zoom & Pan:**
  - Integrated modal viewer for all 6 high-resolution engineering schematics with animated tab transitions, 100%–300% zoom controls, zoom level readouts, and drag-to-pan viewport support.
- **Zero-Emoji Precision SVG Design:**
  - Eradicated all amateur emoji glyphs, replacing them with sharp, professional inline SVGs matching the digital engineering aesthetic.

### 2. Cohesive Scroll-Driven Animation System (Home Page)

- **GSAP ScrollTrigger & ScrollToPlugin:** Continuous, bidirectional scrubbing across all sections.
- **Pin Compensation & Flight Lock:** Waypoint tracking dynamically accounts for sticky pinned spacer heights, eliminating scroll drift (formally codified in ADR-007).
- **6-Phase WebGL Visual Motif:** Three.js geometric scene evolves across sections (Hero orb $\to$ About particles $\to$ Projects framing $\to$ Skills matrix $\to$ Milestones path $\to$ Contact convergence) with 0% idle CPU power gating.
- **Dedicated About Section (`#about`):** 3 structured perspective cards showcasing Loh Min Yu's authentic background (Bachelor of IT, pragmatic software/game/AI engineering, Python/C++/C#, analytical/reflective mindset, literature, and the art of tea).

### 3. Career Milestones & Experience Refinements

- **Current Internship Milestone:** Documented active Industry Learning internship at **ITWin Technology Sdn Bhd** (a wholly-owned subsidiary of **CabNet Holdings Berhad**) for 1 Sep – 30 Nov 2026.
- **PRMS Final Year Project Status:** Marked as completed before September 2026.
- **Direct Project Links in Skills Matrix:** Replaced verbose multi-line description paragraphs in the Bento grid with concise `Applied in: [Project Name →]` elements linking directly to corresponding project showcases.
- **Fixed AI Microphone SVG Icon:** Restored the missing top capsule path segment (`V5a3 3 0 116 0v6a3 3 0 01-3 3z`).
- **Footer Cleanup:** Pruned redundant philosophical phrase from the footer, retaining the clean Simone Weil inscription and signature bar.

---

## Release Summary — Version 1.0.0 (2026-11-16)

This release establishes the baseline for **Lightoxy's Official Engineering Portal**, transitioning the identity to the **Lightoxy** brand vision, modernizing the visual design to contemporary standards, integrating comprehensive SEO specifications, and retiring legacy lab pages.

### Key Baseline Features

1. **Lightoxy Brand Vision & Governance:** Positioned Lightoxy as the primary brand, emphasizing data sovereignty, local-first intelligence, and full-stack rigor. Authoritative documentation standard (`PORT-GOV-001`) with full metadata schema.
2. **Contemporary Visual Overhaul:** Sleek, modern dark mode (obsidian `#09090b`) with refined glassmorphism and subtle ambient lighting.
3. **Comprehensive Search Engine Optimization (SEO):** Valid XML Sitemap (`sitemap.xml`) updated for all active routes; Schema.org JSON-LD structured data; Open Graph and Twitter Card metadata.
4. **Horizontal Expanding Accordion Deck:** Compact desktop height with smooth cubic-bezier easing showcasing 4 flagship systems (PRMS, Senai, JiuXi, Colorella).
5. **Legacy Cleanup:** Retired `stellarEchoes.html` and eliminated archaic sepia parchment styling.
