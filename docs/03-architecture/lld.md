---
id: PORT-ARCH-004
title: "Low-Level Design (LLD): Component Engines & Client Architecture"
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Architecture
---

## Low-Level Design (LLD): Component Engines & Client Architecture — Lightoxy (minyu.my)

## 1. Traceability & System References

| Reference Target                          | Document ID                                                           | Relative Path                                      | Relationship Type | Relevance / Description                                             |
| ----------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------- | ----------------- | ------------------------------------------------------------------- |
| High-Level Design (HLD)                   | [PORT-ARCH-003](hld.md)                                               | `hld.md`                                           | Refines           | Concrete implementation mechanics for high-level client subsystems  |
| Software Architecture Document (SAD)      | [PORT-ARCH-001](sad.md)                                               | `sad.md`                                           | Contextualizes    | Upstream principles: static-first, zero-rigid-pixels, power gating  |
| Component Data Flow                       | [PORT-ARCH-005](data-flow.md)                                         | `data-flow.md`                                     | Implements        | Event sequences, state mutations, and observer lifecycles           |
| Software Requirements Specification (SRS) | [PORT-REQ-001](../02-requirements/srs.md)                             | `../02-requirements/srs.md`                        | Realizes          | Functional and non-functional requirements implemented in code      |
| Modern Tooling ADR                        | [PORT-ARCH-ADR-006](adr/adr-006-modern-tooling-vite-tailwind.md)      | `adr/adr-006-modern-tooling-vite-tailwind.md`      | Governed By       | Vite bundler, @tailwindcss/vite, and Three.js ES module patterns    |
| Scroll-Driven Animation ADR               | [PORT-ARCH-ADR-007](adr/adr-007-scroll-driven-animation-gsap.md)      | `adr/adr-007-scroll-driven-animation-gsap.md`      | Governed By       | GSAP ScrollTrigger, pin compensation, and WebGL motif evolution     |
| PRMS Scroll Choreography ADR              | [PORT-ARCH-ADR-008](adr/adr-008-prms-component-scroll-choreography.md) | `adr/adr-008-prms-component-scroll-choreography.md` | Governed By       | Component-driven GSAP scroll choreography vs. background WebGL canvas |

---

## 2. Zone 1: Three.js WebGL Hero Orb Engine

### 1.1 ES Module Import & Object Hierarchy

The Hero Orb initializes inside `#hero-orb-container` via `initHeroOrb()`, importing Three.js directly via npm ES modules:

```javascript
import * as THREE from "three";

let scene, camera, renderer, outerMesh, innerMesh;
let targetMouseX = 0,
  targetMouseY = 0;
let isVisible = true;

export function initHeroOrb(containerId = "hero-orb-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
  camera.position.z = 4.8;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Outer Geodesic Wireframe
  const outerGeo = new THREE.IcosahedronGeometry(2.3, 2);
  const outerMat = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    color:
      document.documentElement.getAttribute("data-theme") === "dark"
        ? 0x38bdf8
        : 0x0284c7,
  });
  outerMesh = new THREE.Mesh(outerGeo, outerMat);
  scene.add(outerMesh);

  // Inner Counter-Rotating Core
  const innerGeo = new THREE.IcosahedronGeometry(1.2, 1);
  const innerMat = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    color:
      document.documentElement.getAttribute("data-theme") === "dark"
        ? 0x38bdf8
        : 0x0284c7,
  });
  innerMesh = new THREE.Mesh(innerGeo, innerMat);
  scene.add(innerMesh);

  setupParallaxAndPowerGating(container);
}
```

### 1.2 Cursor Parallax & Power Gating

```javascript
function setupParallaxAndPowerGating(container) {
  // Cursor Parallax Listener
  window.addEventListener(
    "mousemove",
    (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.8;
    },
    { passive: true },
  );

  // Power Gating via IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) requestAnimationFrame(renderLoop);
      });
    },
    { threshold: 0.05 },
  );
  observer.observe(container);

  function renderLoop() {
    if (!isVisible) return; // Strict 0% CPU consumption offscreen
    requestAnimationFrame(renderLoop);

    // Continuous Dual Rotation
    outerMesh.rotation.x += 0.002;
    outerMesh.rotation.y += 0.003;
    innerMesh.rotation.x -= 0.001;
    innerMesh.rotation.y -= 0.002;

    // Linear Interpolation (Lerp) for smooth cursor response
    outerMesh.rotation.y += (targetMouseX - outerMesh.rotation.y) * 0.05;
    outerMesh.rotation.x += (targetMouseY - outerMesh.rotation.x) * 0.05;

    renderer.render(scene, camera);
  }
}
```

---

## 3. Zone 2: Infinite Hardware-Accelerated Marquee Engine

### 2.1 CSS-First Animation Architecture

The marquee operates entirely on the GPU compositor thread without running JavaScript loops:

```css
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: marquee 28s linear infinite;
}

.marquee-container:hover .marquee-track,
.marquee-container:focus-within .marquee-track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
    transform: none;
    flex-wrap: wrap;
    justify-content: center;
  }
}
```

---

## 4. Zone 3: Horizontal Expanding Accordion Deck Engine

### 3.1 Spring Physics & Proportional Flex Mechanics

The `#deck-container` expands the active card while compressing siblings with natural physical mass:

```css
.deck-card {
  flex: 1 1 0%;
  height: 100%;
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

### 3.2 Mobile Fallback (`< md`)

On viewports `< 768px`, media queries transition `#deck-container` to `flex-direction: column` with auto-height, preserving full readability and eliminating card clipping.

---

## 5. Zone 4: Asymmetric 12-Column Bento Grid Engine (Skill Matrix)

### 4.1 Declarative Skill Context Dictionary

```javascript
export const SKILL_DATA = {
  backend: {
    laravel: {
      project: "● APPLIED IN: PRMS",
      metric: "3 Portals · Clean Service Architecture",
      desc: "Institutional postgraduate governance engine with custom service providers, queued jobs, and automated GoT progression scoring.",
    },
    postgres: {
      project: "● APPLIED IN: PRMS",
      metric: "Relational Integrity · Audit Triggers",
      desc: "Engineered strict relational constraints, automated milestone audit trails, and complex milestone score triggers.",
    },
    "docker-be": {
      project: "● APPLIED IN: PRMS & Senai",
      metric: "Multi-Container Compose · Alpine Base",
      desc: "Containerized PHP 8.4 runtime, PostgreSQL 16, and pgAdmin with volume isolation and zero local host pollution.",
    },
    rbac: {
      project: "● APPLIED IN: PRMS",
      metric: "Candidate · Supervisor · Dean · SHA-256",
      desc: "Multi-tier authorization boundaries with cryptographic SHA-256 digital signature canvas locks protecting formal evaluation submissions.",
    },
    sqlite: {
      project: "● APPLIED IN: ReMind",
      metric: "Local-First · Zero Cloud Telemetry",
      desc: "Offline-first, on-device SQLite database storing contact records and relationship history with absolute privacy.",
    },
  },
  devops: {
    k8s: {
      project: "● APPLIED IN: Traces of Senai",
      desc: "Deployed multi-pod Kubernetes cluster hosting DeepSeek RAG inference engine and CosyVoice neural voice worker with health checks.",
    },
    docker: {
      project: "● APPLIED IN: PRMS & Senai",
      desc: "Production multi-stage Alpine images for reproducible, portable execution across staging and production.",
    },
    cicd: {
      project: "● APPLIED IN: Lightoxy Ecosystem",
      desc: "Sub-300ms Vite build pipeline with automated GitHub Actions static analysis and deployment to minyu.my.",
    },
  },
  ai: {
    deepseek: {
      project: "● APPLIED IN: Traces of Senai",
      desc: "Contextual folklore preservation RAG pipeline with verified historical embeddings, eliminating AI hallucination.",
    },
    cosyvoice: {
      project: "● APPLIED IN: Traces of Senai & JiuXi",
      desc: "Zero-shot neural voice cloning and real-time bilingual speech synthesis delivering interactive vocal avatars.",
    },
    xgboost: {
      project: "● APPLIED IN: Telecom Customer Churn",
      desc: "Supervised predictive pipeline evaluating 7,000+ subscriber records with SMOTE class balancing and feature curves.",
    },
  },
  frontend: {
    threejs: {
      project: "● APPLIED IN: Lightoxy Hero & JiuXi",
      desc: "Dual-mesh wireframe icosahedron with cursor parallax interpolation and IntersectionObserver power gating (0% idle CPU).",
    },
    tailwind: {
      project: "● APPLIED IN: Design System",
      desc: "CSS-first design token architecture, sub-300ms compilation, and Zero-Rigid-Pixels fluid responsive scaling.",
    },
    spring: {
      project: "● APPLIED IN: Accordion Deck",
      desc: "Physics-based kinetic expansion engine governed by cubic-bezier(0.16, 1, 0.3, 1) with staggered internal metadata reveal.",
    },
    vanilla: {
      project: "● APPLIED IN: Portal Core",
      desc: "Zero-framework modular JavaScript with synchronous head theme execution and accessible focus traps.",
    },
  },
};
```

### 4.2 State Management & Performance Guarantees

- **Zero Cumulative Layout Shift (CLS = 0):** The detail panel maintains an explicit fluid minimum height (`min-h-[clamp(6rem,12vh,8rem)]`).
- **Sub-16ms Synchronous Updates:** Clicking a badge updates DOM `innerText` synchronously within a single animation frame.
- **Accessibility:** Semantic `<button>` elements with `aria-pressed="true/false"` provide full keyboard navigability via `Tab` and `Enter`.

---

## 6. Zone 5 & Zone 6: Milestones & Contact Architecture

- **Zone 5 (Milestones & Track Record):** Chronological timeline (`#experience`) charting academic achievements, IoT engineering, and system releases.
- **Zone 6 (Contact & Grounded Footer):** Direct communication hub (`#contact`) providing Email, LinkedIn, GitHub, and WhatsApp links, anchored by tea philosophy and mindfulness in the footer.
- **Dedicated Historical Archives:** Comprehensive standalone repository directory at [archives.html](../../pages/archives.html).

---

## 7. Continuous Scroll-Driven Journey & Pin-Compensated Waypoint Engine

The client scroll engine is powered by **GSAP ScrollTrigger** and **ScrollToPlugin** (detailed in [ADR-007](adr/adr-007-scroll-driven-animation-gsap.md)), combined with geometric pin compensation for the spine navigator:

```javascript
// Pin-compensated active section detection
function updateActiveWaypoint() {
  if (isNavigating) return;
  const scrollY = window.scrollY || window.pageYOffset;
  const pinSpacer = document.querySelector(".pin-spacer");
  const pinnedExtra = pinSpacer
    ? pinSpacer.offsetHeight - window.innerHeight
    : 0;

  // Evaluate section thresholds sequentially with pin offset compensation
  let activeId = "hero";
  if (contactEl && scrollY >= contactEl.offsetTop + pinnedExtra - 300) {
    activeId = "contact";
  } else if (
    experienceEl &&
    scrollY >= experienceEl.offsetTop + pinnedExtra - 300
  ) {
    activeId = "experience";
  } else if (stackEl && scrollY >= stackEl.offsetTop + pinnedExtra - 300) {
    activeId = "stack";
  } else if (projectsEl && scrollY >= projectsEl.offsetTop - 200) {
    activeId = "projects";
  } else if (aboutEl && scrollY >= aboutEl.offsetTop - 200) {
    activeId = "about";
  }

  // Update DOM active classes smoothly
  waypointLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.target === activeId);
  });
}
```

---

## 8. Client-Side Theme & FOUC Prevention

Executed synchronously in `<head>` prior to DOM rendering:

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

Subsequent toggle interactions update `data-theme` and persist the new value into `localStorage`.

---

## 9. PRMS Component-Driven Scroll Choreography Engine (`src/script/prms.js`)

Governed by [ADR-008](adr/adr-008-prms-component-scroll-choreography.md), `pages/prms.html` excludes Three.js completely (eliminating the `529 kB` WebGL bundle) and animates the UI components directly using GSAP `ScrollTrigger` and `ScrollToPlugin`.

### 9.1 Module Decomposition

| Module | Function | Responsibility |
| :--- | :--- | :--- |
| **Theme Coordinator** | `initTheme()` | Synchronizes light/dark mode and redraws the HTML5 vector signature canvas stroke color on toggle. |
| **Reading Spine** | `initSectionTriggers()`, `initScrollSpine()` | Pin-compensated 6-waypoint reading spine with smooth flight-locked `ScrollToPlugin` navigation. |
| **Scroll Choreography** | `initScrollScrubbing()` | Continuous scrubbed animations across Hero parallax, section datum line draws, opposing Before/After wing convergence, perspective card elevations, and blueprint drafting zoom. |
| **Pinned Lifecycle** | `initPinnedLifecycle()` | Desktop pinned 4-stage supervision workflow (`pin: true, scrub: 0.5`) with directional kinetic slide transitions and column stagger. |
| **Cryptographic Pad** | `initSignatureCanvas()` | DPR-aware HTML5 2D vector signature capture pad, Web Crypto API `SHA-256` serialization, write-once lock state, and elastic lock pulse animation. |
| **Portal Hub** | `initPortalSwitcher()` | Instant tabbed switching across Candidate, Supervisor, and Dean/Admin portals with GSAP staggered entrances on stepper and feature cards. |
| **Blueprint Matrix** | `initBlueprintMatrix()` | 6-diagram architectural switcher with animated scale-and-fade transitions and fullscreen 100%–300% zoom/pan modal viewer. |

### 9.2 Opposing Split-Screen Convergence & Datum Line Draws

```javascript
// Horizontal architectural datum line draw on every section header
gsap.fromTo(divider, { scaleX: 0 }, {
  scrollTrigger: { trigger: head, start: 'top 88%', end: 'top 50%', scrub: 0.6 },
  scaleX: 1,
  ease: 'power2.out'
});

// Desktop Before vs After opposing wing convergence
gsap.fromTo(legacyWing, { x: -64, rotateY: 6, opacity: 0.15, transformPerspective: 1100 }, {
  scrollTrigger: { trigger: '#prms-transformation', start: 'top 84%', end: 'top 32%', scrub: 0.6 },
  x: 0, rotateY: 0, opacity: 1, ease: 'power2.out'
});
```

### 9.3 Directional Pinned Lifecycle & Reduced-Motion Guard

- `setActiveStage(index)` compares `activeIndex` against `prevIndex` (`dir = activeIndex >= prevIndex ? 1 : -1`) to slide incoming stages cleanly forward or backward along the scroll direction while staggering inner payload/pad columns.
- Both `initScrollScrubbing()` and `initPinnedLifecycle()` inspect `window.matchMedia('(prefers-reduced-motion: reduce)').matches` to immediately bypass scroll-scrubbed transforms and pinning for accessibility compliance.
