---
id: PORT-ARCH-ADR-008
title: "ADR-008: PRMS Component-Driven Scroll Choreography vs. Background WebGL Canvas"
status: IN REVIEW
date: 2026-11-18
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Architecture
---

# ADR-008: PRMS Component-Driven Scroll Choreography vs. Background WebGL Canvas

## 1. Context & Problem Statement

During the redesign of the flagship **Postgraduate Research Progress Monitoring System (PRMS)** showcase (`pages/prms.html`), an initial prototype implemented a persistent fixed-position Three.js WebGL background canvas (`#prms-scroll-canvas`) behind the page sections.

User evaluation revealed two fundamental visual and ergonomic flaws with that approach on an information-dense technical case study:

1. **Visual Disconnection & Occlusion:** Because the PRMS showcase relies on dense interactive UI modules (Before vs. After transformation panels, 3-Role Cybernetic Portal console, Pinned 4-Stage Supervision Lifecycle with an HTML5 signature canvas, high-resolution Blueprint Matrix, and embedded FYP defense slides), a fixed 3D scene behind the page felt visually detached — the background behaved as decorative wallpaper occluded behind foreground components rather than enhancing comprehension.
2. **Unnecessary Bundle & GPU Overhead:** Importing `three` on `pages/prms.html` added a `~529 kB` JavaScript chunk (`~131 kB` gzipped) and GPU context initialization solely for background geometry that foreground panels routinely covered.

---

## 2. Decision

We **removed the fixed 3D WebGL background canvas** from `pages/prms.html` and adopted **Component-Driven GSAP Scroll Choreography** (`src/script/prms.js`) powered exclusively by GSAP `ScrollTrigger` and `ScrollToPlugin`.

Instead of decorating behind cards, the **foreground UI components themselves** serve as the choreographed kinetic instruments across all 6 showcase sections:

1. **Section 1 (Hero Staging & Multi-Layer Parallax):** Staggered load-in entrance across badges, typography, CTAs, and metric cards, transitioning into a two-speed scrubbed parallax exit as the visitor scrolls downward.
2. **Universal Section Datum Draws (`.prms-section-head` & `.prms-divider-line`):** Every section header glides cleanly into view while its horizontal border rule draws continuously from `scaleX(0)` to `scaleX(1)` synchronized to scroll position.
3. **Section 2 (Before vs. After Opposing Wing Convergence):** On desktop (`>= 768px`), the Legacy Manual Process wing sweeps inward from the left (`x: -64, rotateY: 6deg`) while the PRMS Single Source of Truth wing converges from the right (`x: +64, rotateY: -6deg`), followed by a paired row-by-row cascade matching each legacy failure against its PRMS solution.
4. **Section 3 (Interactive 3-Role Portal Hub):** Role tab pills cascade sequentially, the console card rises out of a 3D perspective tilt (`rotateX: 9deg -> 0deg`), and clicking between Candidate, Supervisor, and Dean roles triggers crisp staggered entrances across the dynamically mounted stepper and 4 subsystem cards.
5. **Section 4 (Pinned 4-Stage Supervision Lifecycle):** Sticky scroll pinning (`pin: true, scrub: 0.5`) drives directional kinetic stage slides (advancing forward or rewinding backward according to scroll direction) with inner column stagger, plus an elastic emerald lock pulse on `#lifecycle-deck-card` when clicking **Cryptographically Seal (SHA-256)**.
6. **Section 5 (Technical Blueprint Matrix):** Schematic tabs cascade horizontally, the blueprint frame elevates smoothly while the diagram image performs a subtle drafting zoom-settle (`scale: 1.07 -> 1.0`), and tab switches animate with a scale-and-fade cross-transition.
7. **Section 6 (Academic Defense & Outcomes):** The presentation deck frame elevates out of perspective tilt, followed by a staggered 3-card cascade across Quality Assurance, Simulation & Seeding, and Faculty Commendation pillars.

---

## 3. Architectural Consequences

### Positive Consequences
- **Cohesive Component Experience:** Motion is 100% unified with the content the reader is actively inspecting, matching modern engineering benchmark showcases (Linear, Stripe, Apple) without background distraction.
- **Massive Payload Reduction:** Eliminated the `529 kB` Three.js dependency from `pages/prms.html`, reducing `prms.js` down to `~34.8 kB` (`~10.3 kB` gzipped).
- **Zero GPU Contention:** Eliminates WebGL context overhead alongside the live HTML5 2D vector signature pad and embedded PDF defense viewer.
- **Strict Accessibility Compliance:** All GSAP choreography short-circuits cleanly when `@media (prefers-reduced-motion: reduce)` is active.

### Trade-offs & Scope Boundaries
- The persistent Three.js WebGL motif remains exclusively on the landing page (`index.html`, governed by `ADR-003` and `ADR-007`), where open atmospheric editorial whitespace naturally frames the 3D icosahedron orb.
- Dedicated dense technical case studies (`pages/prms.html`) prioritize component choreography, tactile interactive simulations, and instant readability over background WebGL scenes.
