---
id: PORT-REQ-001
title: Software Requirements Specification (SRS) & SEO Requirements
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Requirements
---

## Software Requirements Specification (SRS) & SEO Requirements — Lightoxy (minyu.my)

## 1. Overview & System Purpose

This specification defines the complete set of functional, non-functional, and search engine optimization (SEO) requirements for **Lightoxy's Official Engineering Portal** (`minyu.my` / `MinYuOuO.github.io`).

The portal serves as the authoritative portfolio and technical showcase for **Loh Min Yu (MinYuOuO)** under his personal brand identity, **Lightoxy**. It must deliver a high-craft, modern experience combining contemporary developer-tool aesthetics with rigorous systems architecture documentation.

---

## 2. Traceability & System References

| Reference Target                     | Document ID                                            | Relative Path                            | Relationship Type | Relevance / Description                                     |
| ------------------------------------ | ------------------------------------------------------ | ---------------------------------------- | ----------------- | ----------------------------------------------------------- |
| Product Requirements Document (PRD)  | [PORT-PLAN-002](../01-planning/prd.md)                 | `../01-planning/prd.md`                  | Contextualizes    | Upstream product capabilities, brand vision, and SEO goals  |
| Scope Specification                  | [PORT-PLAN-003](../01-planning/scope.md)               | `../01-planning/scope.md`                | Delimits          | Authoritative feature boundaries and SEO deliverables       |
| User Stories & Personas              | [PORT-REQ-002](user-stories.md)                        | `user-stories.md`                        | Contextualizes    | User motivations and acceptance criteria by persona         |
| System Use Cases                     | [PORT-REQ-003](use-cases.md)                           | `use-cases.md`                           | Explains          | Step-by-step visitor interaction workflows                  |
| Acceptance Criteria & Quality Gates  | [PORT-REQ-004](acceptance-criteria.md)                 | `acceptance-criteria.md`                 | Verifies          | Concrete release criteria and verification matrices         |
| Software Architecture Document (SAD) | [PORT-ARCH-001](../03-architecture/sad.md)             | `../03-architecture/sad.md`              | Informs           | Architecture mapping for functional and SEO implementations |
| Responsive Breakpoints Standard      | [PORT-DES-004](../04-design/responsive-breakpoints.md) | `../04-design/responsive-breakpoints.md` | Governs           | Multi-device fluid scaling and Zero-Rigid-Pixels compliance |

---

## 3. Prioritization Framework & Functional Requirements

### 3.1 Priority Classification Standard

To avoid the anti-pattern where everything is marked critical, all requirements and quality gates are classified under a disciplined 4-tier hierarchy:

| Priority | Classification | Release Impact | Definition                                                                             |
| -------- | -------------- | -------------- | -------------------------------------------------------------------------------------- |
| **P0**   | **Critical**   | Blocker        | Must-have for system survival. The site cannot build, deploy, or launch without these. |
| **P1**   | **High**       | Core Scope     | Key experience pillars, primary interactive components, and essential discoverability. |
| **P2**   | **Medium**     | Polish         | Visual refinements, performance optimizations, and secondary interactive enhancements. |
| **P3**   | **Low**        | Future         | Progressive enhancements, experimental features, and future iteration candidates.      |

---

### 3.2 Global Brand & Identity Governance

| Req ID       | Component          | Priority | Specification Description                                                                                                     | Verification Method |
| ------------ | ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `FR-BRAND.1` | Brand Attribution  | **P0**   | The portal must represent **Lightoxy** strictly as Loh Min Yu's crafted personal brand identity, not a corporate agency.      | Copy Review         |
| `FR-BRAND.2` | Identity Cohesion  | **P0**   | Author metadata, footers, and page titles must consistently attribute **Loh Min Yu (MinYuOuO)** and **Lightoxy**.             | Automated Linting   |
| `FR-BRAND.3` | Philosophical Core | **P2**   | Include the foundational Simone Weil anchor quote (_"Attention is the rarest and purest form of generosity."_) in the footer. | Visual Inspection   |

### 3.3 Responsive Architecture & Zero-Rigid-Pixels Mandate

| Req ID      | Component          | Priority | Specification Description                                                                                                    | Verification Method |
| ----------- | ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `FR-RESP.1` | Fluid CSS Units    | **P0**   | All layout containers, heights, and margins must reject hardcoded `px` in favor of `rem`, `%`, `vw`, `dvh`, and `clamp()`.   | CSS Rule Audit      |
| `FR-RESP.2` | Viewport Height    | **P1**   | Full-height views must use dynamic viewport units (`min-h-[calc(100dvh-5rem)]`) to absorb mobile browser address bar shifts. | Mobile Device Test  |
| `FR-RESP.3` | Fluid Typography   | **P1**   | Major display headings must use CSS mathematical clamping (e.g. `clamp(2.25rem, 5.5vw + 0.5rem, 4.5rem)`) for smooth scale.  | Responsive Audit    |
| `FR-RESP.4` | Elastic Containers | **P1**   | Page wrapper must span `w-full max-w-[clamp(72rem,90vw,88rem)]` with fluid padding `px-[clamp(1rem,4vw,3rem)]`.              | DOM Measurement     |

### 3.4 Navigation & Minimal Header

| Req ID     | Component        | Priority | Specification Description                                                                                                           | Verification Method |
| ---------- | ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `FR-NAV.1` | Minimal Navbar   | **P0**   | Streamlined header with Lightoxy branding, direct Resume [PDF] button, and theme switcher (omits redundant links to avoid clutter). | Inspection / CSS    |
| `FR-NAV.2` | Vector Logo      | **P1**   | Lightoxy vector logo rendering SVG on light mode and dark-mode asset automatically based on active theme.                           | Theme Swap Test     |
| `FR-NAV.3` | Spine Navigator  | **P1**   | Pinned left spine waypoint indicator dynamically highlighting active sections with pin offset compensation and flight lock.         | Interaction Audit   |
| `FR-NAV.4` | Theme Switcher   | **P1**   | Accessible sun/moon icon button toggling `data-theme` attribute between `dark` and `light` with `localStorage` persistence.         | State Audit         |
| `FR-NAV.5` | Frosted Backdrop | **P2**   | Glassmorphic frosted surface (`backdrop-blur-md bg-theme-bg/85`) with subtle hairline border.                                       | Visual Review       |

### 3.5 Zone 1 — Hero Section & Three.js WebGL Orb

| Req ID      | Component           | Priority | Specification Description                                                                                                        | Verification Method |
| ----------- | ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `FR-HERO.1` | Core Typography     | **P0**   | Hero renders status badge, eyebrow, authoritative H1 title, concise description, and primary CTA buttons.                        | Visual Inspection   |
| `FR-HERO.2` | Left-Space Balance  | **P1**   | Content width bounded by `w-full max-w-[min(100%,48rem)]` to eliminate the unbalanced left-side dead space.                      | Visual Layout Audit |
| `FR-HERO.3` | Fluid 3D Orb Sizing | **P1**   | Three.js wireframe icosahedron sized dynamically via `w-[clamp(18rem,45vw,36rem)] aspect-square`.                                | Responsive Test     |
| `FR-HERO.4` | Multi-Device Orb    | **P1**   | 3D orb renders as an atmospheric background depth glow on mobile/tablet (`< 1024px`) and beside content on desktop (`≥ 1024px`). | Multi-Screen Audit  |
| `FR-HERO.5` | Power Conservation  | **P2**   | `IntersectionObserver` halts Three.js `requestAnimationFrame` loop completely when hero scrolls out of view (0% idle CPU).       | CPU Profiler Audit  |
| `FR-HERO.6` | Cursor Interaction  | **P3**   | Interactive mouse drag/tilt or particle interaction on the 3D orb.                                                               | Interactive Test    |

### 3.6 Zone 2 — About Me & Infinite Hardware Tech Marquee

| Req ID         | Component            | Priority | Specification Description                                                                                                                                                     | Verification Method    |
| -------------- | -------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `FR-ABOUT.1`   | 3 Perspective Cards  | **P0**   | Structured perspective cards: Pragmatic Problem Solving, Analytical & Reflective Mindset, and Literature / Tea / Collaboration.                                               | Content Audit          |
| `FR-MARQUEE.1` | Continuous Marquee   | **P1**   | Hardware-accelerated CSS marquee (`transform: translateX()`) scrolling active stack badges (Laravel 12, PostgreSQL, Docker, DeepSeek, Three.js, Tailwind v4) at steady 60fps. | Chrome DevTools Trace  |
| `FR-MARQUEE.2` | Motion Accessibility | **P1**   | Marquee pauses on cursor hover or keyboard focus, and converts to a static wrap layout under `@media (prefers-reduced-motion: reduce)` to satisfy accessibility norms.        | A11y & Emulation Audit |

### 3.7 Zone 3 — Horizontal Expanding Accordion Deck (`#deck-container`)

| Req ID      | Component         | Priority | Specification Description                                                                                                                                                        | Verification Method |
| ----------- | ----------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `FR-DECK.1` | 4 Flagship Cards  | **P0**   | Display 4 flagship cards: `PRMS`, `Traces of Senai (仙迹)`, `JiuXi Mindscape (九夕心境)`, and `Colorella`.                                                                       | Inspection          |
| `FR-DECK.2` | PRMS Focus Specs  | **P0**   | PRMS card must explicitly display: `Laravel 12`, `PHP 8.2+`, `MySQL 8`, `Docker`, `3 Portals (Candidate, Supervisor, Dean)`, `ReBAC`, `SHA-256 Lock`, `GoT Nightly Risk Engine`. | Content Audit       |
| `FR-DECK.3` | Senai Focus Specs | **P0**   | Senai card must display: `K8S hosting`, `DeepSeek + CosyVoice TTS RAG`, Cultural Heritage AI (Zero fabricated latency/offline).                                                  | Content Audit       |
| `FR-DECK.4` | Fluid Dimensions  | **P1**   | Desktop container height fluidly governed by `min-h-[clamp(26rem,55vh,36rem)]`, eliminating rigid pixel constraints.                                                             | Computed CSS Audit  |
| `FR-DECK.5` | Spring Expansion  | **P1**   | Hover/click expands target card to `flex-[3.5]` while compressing siblings to `flex-1` with spring curve `cubic-bezier(0.16, 1, 0.3, 1)`.                                        | Transition Trace    |
| `FR-DECK.6` | Mobile Stack      | **P1**   | On viewports `< md`, accordion transitions automatically to a fluid vertical stack (`flex-col w-full`) without truncation.                                                       | Mobile Emulation    |

### 3.8 Zone 4 — Asymmetric 12-Column Bento Grid (Interactive Skill Matrix)

| Req ID       | Component              | Priority | Specification Description                                                                                                                                                        | Verification Method  |
| ------------ | ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `FR-BENTO.1` | 12-Col Responsive      | **P1**   | 12-column CSS grid (`grid-cols-12`) on desktop viewports collapsing to single-column (`grid-cols-1`) on mobile viewports `< md`.                                                 | Responsive Test      |
| `FR-BENTO.2` | Backend & Data Layer   | **P1**   | Cell 1 (8-col desktop): Interactive pills (`Laravel 12`, `PostgreSQL`, `Docker`, `RBAC`, `SQLite`) with dynamic panel revealing production architectures in _PRMS_ and _ReMind_. | DOM Interaction Test |
| `FR-BENTO.3` | DevOps & Cloud Layer   | **P1**   | Cell 2 (4-col desktop): Interactive pills (`Kubernetes`, `Docker Containers`, `CI/CD`) revealing container orchestration, multi-pod routing, and automated pipelines.            | DOM Interaction Test |
| `FR-BENTO.4` | AI & ML Layer          | **P1**   | Cell 3 (5-col desktop): Interactive pills (`DeepSeek RAG`, `CosyVoice TTS`, `XGBoost ML`) revealing RAG pipelines and predictive modeling.                                       | DOM Interaction Test |
| `FR-BENTO.5` | Frontend & WebGL Layer | **P1**   | Cell 4 (7-col desktop): Interactive pills (`Three.js WebGL`, `Tailwind v4`, `GSAP Motion`, `Vanilla JS`) revealing 60fps graphics and fluid geometry.                            | DOM Interaction Test |

### 3.9 Zone 5 — Milestones & Track Record (`#experience`)

| Req ID     | Component          | Priority | Specification Description                                                                                                     | Verification Method |
| ---------- | ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `FR-EXP.1` | Timeline Journey   | **P0**   | Chronological progression highlighting academic qualifications, IoT research achievements, and software engineering releases. | Content Audit       |
| `FR-EXP.2` | Fluid Line Graphic | **P1**   | Adaptive vertical guideline scaling dynamically across mobile and desktop viewports.                                          | Visual Audit        |

### 3.10 Zone 6 — Contact, Dedicated Showcases & Historical Archives

| Req ID      | Component           | Priority | Specification Description                                                                                                           | Verification Method |
| ----------- | ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `FR-CONT.1` | Direct Channels     | **P0**   | Direct contact links for Email, LinkedIn, GitHub, and WhatsApp with instant copy/external link actions.                             | Functional Test     |
| `FR-PAGE.1` | Dedicated Showcases | **P0**   | Standalone deep-dive pages (`prms.html`, `senai.html`, `jiuxi.html`, `colorella.html`, `mamak-analytics.html`, `telco-churn.html`). | Route & Link Audit  |
| `FR-PAGE.2` | Specialized Layouts | **P1**   | Showcase pages must feature tailored architecture diagrams, technical focus matrices, and interactive preview modals.               | Design Review       |
| `FR-ARCH.1` | Historical Catalog  | **P0**   | Standalone `pages/archives.html` renders all 20+ historical software engineering systems with GitHub repository links.              | Catalog Audit       |
| `FR-ARCH.2` | Category Filters    | **P2**   | Client-side tag filtering across Enterprise Systems, AI & Speech Runtimes, Creative WebGL, and Data Science.                        | Functional Test     |

---

## 4. Search Engine Optimization (SEO) & Discoverability Requirements

| Req ID     | Domain               | Priority | Specification Description                                                                                                | Enforcement Standard  |
| ---------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `FR-SEO.1` | XML Sitemap          | **P0**   | Maintain a valid `sitemap.xml` at root containing all active routes with accurate `<lastmod>`, frequency, and priority.  | Sitemaps.org 0.9 XML  |
| `FR-SEO.2` | Canonical URLs       | **P0**   | Explicit `<link rel="canonical" href="https://minyu.my/...">` on each page to avoid canonical duplication penalties.     | Google Search Central |
| `FR-SEO.3` | Heading Structure    | **P0**   | Strictly one semantic `<h1>` per page matching title metadata, followed by strict hierarchical `<h2>` and `<h3>`.        | HTML5 Living Standard |
| `FR-SEO.4` | Structured Data      | **P1**   | Schema.org JSON-LD graph linking `Brand` (Lightoxy), `Person` (Loh Min Yu), `SoftwareApplication`, and `WebSite`.        | Schema.org / Google   |
| `FR-SEO.5` | Social Meta Tags     | **P1**   | Open Graph (`og:*`) and Twitter Card (`twitter:card: summary_large_image`) tags present on every page with previews.     | Open Graph Protocol   |
| `FR-SEO.6` | Robots Control       | **P1**   | `robots.txt` declares sitemap URI and permits crawl access to Googlebot, Bingbot, PerplexityBot, and ClaudeBot.          | RFC 9309              |
| `FR-SEO.7` | Image Optimization   | **P2**   | Descriptive keyword-rich `alt` text on all images; modern formats (`.svg`, `.webp`, `.png`) with width/height hints.     | WCAG 2.1 / Image SEO  |
| `FR-SEO.8` | BreadcrumbList       | **P2**   | Structured `BreadcrumbList` JSON-LD on subpages establishing clear hierarchy (`Home > Projects > PRMS`).                 | Schema.org            |
| `FR-SEO.9` | AI Engine Citability | **P3**   | Key sections formatted with definition blocks and semantic keywords to maximize citation eligibility in AI Search (GEO). | GEO Guidelines        |

---

## 5. Non-Functional Requirements (NFR)

### 5.1 Performance & Runtime Efficiency

| NFR ID       | Target Metric                                                                                       | Enforcement Tool                  |
| ------------ | --------------------------------------------------------------------------------------------------- | --------------------------------- |
| `NFR-PERF.1` | Tailwind CSS v4 compilation completes in `< 150ms`.                                                 | CLI build timer (`npm run build`) |
| `NFR-PERF.2` | Steady 60fps animation frame rate for Three.js WebGL and accordion transitions on standard devices. | Chrome DevTools Performance Trace |
| `NFR-PERF.3` | Largest Contentful Paint (LCP) `<= 2.5s` on mobile (4G throttled) and desktop audits.               | Google PageSpeed / Lighthouse     |
| `NFR-PERF.4` | Cumulative Layout Shift (CLS) `<= 0.1` during theme switches and font loading.                      | Core Web Vitals Audit             |
| `NFR-PERF.5` | Interaction to Next Paint (INP) `<= 200ms` for all interactive buttons and filters.                 | Lighthouse Performance            |

### 5.2 Accessibility & Usability (WCAG 2.1 AA)

| NFR ID       | Target Metric                                                                                   | Enforcement Tool                        |
| ------------ | ----------------------------------------------------------------------------------------------- | --------------------------------------- |
| `NFR-A11Y.1` | Color contrast ratio `>= 4.5:1` for normal text and `>= 3:1` for large text across both themes. | axe DevTools / Lighthouse Accessibility |
| `NFR-A11Y.2` | Full keyboard navigability (`Tab`, `Enter`, `Escape`) across navigation, modals, and accordion. | Manual Keyboard Audit                   |
| `NFR-A11Y.3` | Visible high-contrast focus rings (`focus-visible:ring-2`) on all interactive controls.         | Visual Accessibility Test               |
| `NFR-A11Y.4` | Screen-reader accessible ARIA attributes (`aria-label`, `aria-expanded`, `aria-hidden`).        | Screen Reader Emulation                 |

### 5.3 Security, Privacy & Integrity

| NFR ID      | Target Metric                                                                            | Enforcement Tool          |
| ----------- | ---------------------------------------------------------------------------------------- | ------------------------- |
| `NFR-SEC.1` | Zero third-party telemetry, tracking pixels, or intrusive tracking cookies.              | Network Request Audit     |
| `NFR-SEC.2` | Zero runtime `eval()`, zero unsanitized `innerHTML` insertions from external parameters. | Static Code Security Scan |
| `NFR-SEC.3` | Enforce HTTPS-only delivery via GitHub Pages custom domain routing (`minyu.my`).         | SSL Labs Test (A+ target) |
