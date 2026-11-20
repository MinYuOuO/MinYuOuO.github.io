---
id: PORT-ARCH-ADR-007
title: ADR 007 — Cohesive Scroll-Driven Animation & WebGL Narrative Architecture
status: APPROVED
date: 2026-11-17
version: 1.0
author: Loh Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Loh Min Yu (MinYuOuO)
category: Architecture Decision Records
---

## ADR 007: Cohesive Scroll-Driven Animation & WebGL Narrative Architecture

## 1. Context & Problem Statement

The portfolio requires a cohesive, scroll-driven visual journey connecting the user's progress through the entire site. The previous implementation suffered from several architectural deficiencies:

1. **Disjointed Transitions:** Animations were isolated reveal triggers (`IntersectionObserver`) without bidirectional scrubbing or connected visual continuity.
2. **Smooth-Scroll Coordinate Drift:** Browser-native smooth scrolling (`html { scroll-behavior: smooth }`) calculated target coordinates against static initial layouts. When scrolling passed pinned sections (`pin: true`), dynamic pin-spacers expanded the document height by up to 220vh, causing native smooth scroll animations to undershoot or overshoot by hundreds of pixels.
3. **Intermediate Waypoint Flashing:** Long-distance jumps (e.g. Hero $\to$ Stack) triggered intermediate scroll events during flight, causing the waypoint indicator to rapidly flicker.
4. **Premature Activation Inside Pinned Sequences:** Proportional focal lines ($Y + 0.40 \times \text{innerHeight}$) caused the next section's waypoint to illuminate prematurely while the user was still scrubbing through earlier cards in a pinned section.
5. **Continuous WebGL Render Overhead:** Continuous requestAnimationFrame loops drained battery and CPU even when stationary.

---

## 2. Decision Drivers

- **Continuous Bidirectional Scrubbing:** Scrolling down advances the animation; scrolling up smoothly reverses it.
- **Selective Pinning (Storytelling Priority):** Pin and scrub only where meaningful (Featured Projects deck and Technical Capabilities matrix); retain natural scrolling elsewhere.
- **Pin-Compensated Waypoint Navigation:** Programmatic scrolling must hit exact section coordinates regardless of pin-spacer heights.
- **Zero Idle CPU Guarantee:** WebGL rendering loop must sleep when progress and cursor deltas settle (0% CPU at rest).
- **Graceful Mobile & Accessibility Fallbacks:** Pinned sequences must seamlessly unpin on mobile screens (`< 768px`) and honor `prefers-reduced-motion: reduce`.

---

## 3. Decision

We implemented a unified hybrid architecture combining:

1. **GSAP ScrollTrigger & ScrollToPlugin:**
   - Registers dedicated triggers across all narrative zones (`hero`, `about`, `projects`, `stack`, `experience`, `contact`, `footer-anchor`).
   - All target coordinates are resolved via `st.start` directly from GSAP's layout engine, fully pin-compensated (`getZoneScrollTarget()`).
   - Browser-native CSS smooth scrolling (`scroll-behavior: smooth`) is removed completely from CSS.
   - Programmatic navigation uses `gsap.to(window, { scrollTo: { y: targetY, autoKill: true } })`.
   - Navigation flight lock (`isNavigating = true`) prevents intermediate waypoint flashing during scroll tweening.
2. **Sequential Pinned-Duration Range Mapping:**
   - Active waypoint evaluation strictly bounds pinned sections within their actual `[st.start, st.end]` range:
     - `projects` remains firmly active throughout the entire 4-card scrub.
     - `stack` remains firmly active throughout the 3D matrix assembly and pill illumination.
3. **Connected 6-Stage WebGL Visual Narrative:**
   - A single background Three.js canvas (`#scroll-canvas`) renders a dual-mesh wireframe icosahedron and a 216-node coordinate particle system.
   - Morph targets interpolate across 6 narrative stages based on document scroll progress:
     - Stage 1 (Hero): Central geometric orb with cursor parallax.
     - Stage 2 (About / Marquee): Transitioning particle coordinates.
     - Stage 3 (Projects): Coordinate particles form a visual framing perimeter.
     - Stage 4 (Matrix): Perspective lattice grid aligning behind the bento cards.
     - Stage 5 (Milestones): Dispersed ambient coordinate dust.
     - Stage 6 (Grounding): Converged tight orbit at the Simone Weil beacon.
   - On-demand rendering loop: `requestAnimationFrame` runs only during active scrolling or mouse movement, halting immediately when values settle (0% idle CPU).
4. **Mobile & Reduced Motion Gating:**
   - Desktop pinning is scoped via `gsap.matchMedia("(min-width: 768px)")`.
   - On screens `< 768px` and under `prefers-reduced-motion: reduce`, sections unpin into standard vertical layouts and WebGL heavy canvas is hidden or bypassed.

---

## 4. Consequences & Trade-offs

### Positive

- **Deterministic Navigation:** Clicking any waypoint dot smoothly navigates to the exact pin start coordinate with zero overshoot or drift.
- **Visual Sophistication:** Continuous bidirectional scrubbing creates an interconnected, high-craft editorial feel.
- **Power Efficiency:** Strict dirty-flag render gating ensures 0% CPU consumption when idle.
- **No Layout Shift:** Dynamic pin-spacers are managed by GSAP with zero Cumulative Layout Shift ($\text{CLS} = 0$).

### Negative / Trade-offs

- **Bundle Size:** Adds GSAP core, ScrollTrigger, and ScrollToPlugin chunks (~45KB gzipped), optimized via Rollup manual chunks in `vite.config.js`.
- **MatchMedia State Management:** Requires clean disposal hooks (`return () => { delete sectionTriggers[id]; }`) to handle responsive orientation changes.
