---
id: PORT-DEV-005
title: "Technical Design: DOM Transitions & Easing Mechanics"
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Development
---

## Technical Design: DOM Transitions & Easing Mechanics — Lightoxy (minyu.my)

## 1. Overview & Motion Objective

To deliver a high-precision, tactile native application feel (matching Tubik 2026, Linear, and Raycast benchmarks), all DOM transitions, scroll-driven visual transformations, and interactive UI micro-states across **Lightoxy's Official Engineering Portal** (`minyu.my`) are governed by hardware-accelerated spring physics and predictable timing tokens.

---

## 2. Traceability & System References

| Reference Target                     | Document ID                                            | Relative Path                            | Relationship Type | Relevance / Description                                             |
| ------------------------------------ | ------------------------------------------------------ | ---------------------------------------- | ----------------- | ------------------------------------------------------------------- |
| Software Architecture Document (SAD) | [PORT-ARCH-001](../03-architecture/sad.md)             | `../03-architecture/sad.md`              | Contextualizes    | Continuous visual narrative principle, module map, and power gating |
| Low-Level Design (LLD)               | [PORT-ARCH-004](../03-architecture/lld.md)             | `../03-architecture/lld.md`              | Refines           | Concrete implementation mechanics for accordion, marquee, and spine |
| Component Data Flow                  | [PORT-ARCH-005](../03-architecture/data-flow.md)       | `../03-architecture/data-flow.md`        | Informs           | State hydration, event propagation, and DOM mutation lifecycle      |
| Design System Specifications         | [PORT-DES-001](../04-design/design-system.md)          | `../04-design/design-system.md`          | Implements        | Visual tokens, 7 motion principles, and color palettes              |
| Responsive Breakpoints Standards     | [PORT-DES-004](../04-design/responsive-breakpoints.md) | `../04-design/responsive-breakpoints.md` | Governs           | Fluid clamp scaling, Zero-Rigid-Pixels rules, and media queries     |
| Coding Standards & Style Guide       | [PORT-DEV-001](coding-standards.md)                    | `coding-standards.md`                    | Directs           | CSS-first Tailwind tokens and vanilla JavaScript execution hygiene  |

---

## 3. Transition Timing, Spring Curves & Core Motion Tokens

All dynamic states utilize the Tubik 2026 unified spring physics curve:

$$\text{CSS Spring Token} = \text{cubic-bezier}(0.16,\, 1,\, 0.3,\, 1)$$

### 3.1 Timing Token Specification

- **Macro Structural Transitions (`500ms`):** Accordion deck expansion/compression, mobile drawer slide, and theme palette cross-fades.
- **Micro-Interactions (`200ms`):** Button hover fills, badge border glows, and focus rings.
- **Staggered Content Reveals (`150ms` delay):** Sub-labels, technology badges, and case study links inside expanding cards.

---

## 4. Zone 3: Horizontal Expanding Accordion Implementation

In `src/style/main.css`:

```css
.deck-card {
  flex: 1 1 0%;
  height: 100%;
  min-height: clamp(26rem, 55vh, 36rem);
  transition:
    flex 500ms cubic-bezier(0.16, 1, 0.3, 1),
    background 300ms ease,
    border-color 300ms ease;
  will-change: flex;
  overflow: hidden;
}

.deck-card.is-active,
.deck-card:hover {
  flex: 3.5 1 0%;
}

.deck-card .card-details {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 300ms ease 150ms,
    transform 300ms ease 150ms;
}

.deck-card.is-active .card-details,
.deck-card:hover .card-details {
  opacity: 1;
  transform: translateY(0);
}
```

### Architectural Guarantees

1. **GPU Compositor Execution:** Zero JavaScript calculations on mouse moves; executed natively by the browser layout engine.
2. **Proportional Expansion:** Sibling cards yield horizontal space evenly without vertical layout shift (`CLS = 0`).
3. **Mobile Vertical Stack (`< md`):** Container transitions to `flex-col w-full` with auto-height to eliminate card truncation on narrow touchscreens.

---

## 5. Zone 4: Asymmetric Bento Grid Interactive Stack Inspector

Clicking a skill badge updates the context panel synchronously within a single animation frame (< 16ms):

```javascript
function inspectSkill(category, key) {
  const categoryData = SKILL_DATA[category];
  if (!categoryData) return;
  const data = categoryData[key];
  if (!data) return;

  const panel = document.getElementById(`bento-${category}-panel`);
  if (!panel) return;

  const linkEl = panel.querySelector(".bento-project-link");
  if (linkEl) {
    linkEl.href = data.url;
    linkEl.innerHTML = `<span>${data.name}</span> <span aria-hidden="true">→</span>`;
  }
}
```

### Layout Stability

- The context panel enforces `min-height: 2.75rem` with concise `Applied in: [Project →]` links to prevent Cumulative Layout Shift during rapid badge switching.

---

## 6. The Architectural Guide Spine & Continuous Scroll Progression

Continuous scroll tracking is executed via a passive `requestAnimationFrame` loop that drives a GPU-accelerated CSS custom property:

```javascript
let ticking = false;

export function initScrollSpine() {
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min(Math.max(scrollY / (maxScroll || 1), 0), 1);

          // Update GPU-accelerated CSS variable
          document.documentElement.style.setProperty(
            "--scroll-progress",
            progress.toFixed(4),
          );
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );
}
```

---

## 7. Theme Switching & Synchronous FOUC Prevention

To prevent Flash of Unstyled Content (FOUC), the theme is resolved inline in `<head>` before any DOM elements are painted:

```html
<script>
  (function () {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.setAttribute("data-theme", savedTheme);
  })();
</script>
```

Subsequent theme clicks toggle `data-theme` between `dark` and `light` and update `localStorage.setItem('theme', newTheme)` with sub-16ms synchronous response.

---

## 8. PRMS Component-Driven Scroll Choreography & Pinned Lifecycle (`src/script/prms.js`)

Governed by [ADR-008](../03-architecture/adr/adr-008-prms-component-scroll-choreography.md):

- **Zero-WebGL Component Focus:** `pages/prms.html` excludes Three.js completely (eliminating `529 kB` of WebGL payload) so foreground engineering components animate directly without background occlusion.
- **Section Datum & Wing Choreography:** Horizontal divider rules draw continuously (`scaleX: 0 -> 1`), Hero copy and metric cards separate at two parallax speeds, Before vs. After wings converge symmetrically from opposite horizontal axes on desktop (`x: -64` / `x: +64` with `rotateY: +/-6deg`), and Blueprint/Portal/Defense frames elevate smoothly out of subtle perspective tilts.
- **Directional Pinned Lifecycle:** GSAP ScrollTrigger pins Section 4 (`pin: true, scrub: 0.5`) across 4 sequential stages (`Draft` -> `Sign Pad` -> `SHA-256` -> `Ingest`), sliding cards directionally forward or backward with inner column stagger and an elastic emerald lock pulse upon sealing the SHA-256 digest.
- **Interactive Staggered Transitions:** Switching actor tabs in the 3-Role Portal Hub and schematic tabs in the Blueprint Matrix executes crisp GSAP stagger and scale-fade transitions, all bypassed cleanly under `@media (prefers-reduced-motion: reduce)`.
