---
id: PORT-PLAN-002
title: Product Requirements Document (PRD)
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Software Engineer & Creator)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Planning
---

## Product Requirements Document (PRD) — Lightoxy (minyu.my)

## 1. Product Overview & Personal Brand Context

The **Lightoxy Engineering Portal** (`minyu.my` / `MinYuOuO.github.io`) is the central portfolio and technical showcase for Loh Min Yu (MinYuOuO), unified under his personal brand identity, **Lightoxy**.

Instead of relying solely on a personal name, **Lightoxy** serves as an umbrella identity attached across Min Yu's diverse software systems, full-stack architectures, conversational AI runtimes, and creative explorations.

---

## 2. Traceability & System References

| Reference Target                          | Document ID                                | Relative Path               | Relationship Type | Relevance / Description                                              |
| ----------------------------------------- | ------------------------------------------ | --------------------------- | ----------------- | -------------------------------------------------------------------- |
| Project Proposal                          | [PORT-PLAN-001](project-proposal.md)       | `project-proposal.md`       | Contextualizes    | Upstream vision and Lightoxy brand identity                          |
| Scope Specification                       | [PORT-PLAN-003](scope.md)                  | `scope.md`                  | Delimits          | Delimits included showcase systems and SEO deliverables              |
| Software Requirements Specification (SRS) | [PORT-REQ-001](../02-requirements/srs.md)  | `../02-requirements/srs.md` | Informs           | Granular functional, non-functional, and SEO requirements            |
| Software Architecture Document (SAD)      | [PORT-ARCH-001](../03-architecture/sad.md) | `../03-architecture/sad.md` | Informs           | Architectural design, Three.js integration, and static site topology |

---

## 3. Core Feature Requirements & Fluid Responsive Mandate

### 3.1 Zero-Rigid-Pixels Responsive Mandate

All components, containers, and typography across the portal MUST reject rigid, hardcoded pixel dimensions (`px`) in favor of fluid, dynamic CSS units:

- **Relative Units:** `rem`, `em`, percentages (`%`).
- **Dynamic Viewport Units:** `vw`, `dvh` (dynamic viewport height) ensuring seamless behavior when mobile browser chrome/address bars expand or collapse.
- **Mathematical Clamping:** Fluid scaling via `clamp(min, preferred, max)` for typography, component heights, and container widths.
- **Proportional Geometry:** Explicit aspect ratios (`aspect-square`, `aspect-video`) maintaining visual balance across arbitrary display geometries.

### 3.2 Component Specifications (The 6-Section Landing Architecture)

1. **Zone 0 — Minimal Header:**
   - Prominent Lightoxy vector logo with dark/light mode asset switching.
   - Purposefully minimalist navigation: includes only the Lightoxy brand logo, Resume [PDF] direct access button, and theme switcher.
   - Eliminates redundant top navigation links in favor of the floating spine waypoint indicator, maximizing screen real estate and content immersion.
   - Fluid container padding (`px-[clamp(1rem,3vw,2rem)]`) and blurred frosted surface (`backdrop-blur-md bg-theme-bg/85`).
2. **Zone 1 — Hero Section (`#hero`):**
   - Clean, confident typography with fluid clamp sizing (`text-[clamp(2.25rem,5.5vw+0.5rem,4.5rem)]`).
   - Sizing governed by `min-h-[calc(100dvh-5rem)]` for exact, responsive full-height framing.
   - **Fluid 3D WebGL Orb:** Wireframe icosahedron sized via `w-[clamp(18rem,45vw,36rem)] aspect-square` responding gently to cursor parallax.
   - **Power Conservation:** `IntersectionObserver` halts the WebGL render loop when hero scrolls offscreen (0% idle CPU).
3. **Zone 2 — About Me & Philosophy (`#about`):**
   - Incorporates Loh Min Yu's authentic engineering and personal background across 3 cards:
     - **Pragmatic Problem Solving:** Structured logic, full-stack systems, game engineering, IoT, and languages (Python, C++, C#).
     - **Analytical & Reflective Mindset:** Learning from failures, strategic adjustments, and philosophical balance.
     - **Literature, Tea & Collaboration:** Mindfulness, patience, and welcoming collaborative engineering projects.
   - **Infinite Hardware Tech Marquee:** Hardware-accelerated CSS marquee (`transform: translateX()`) scrolling active core technologies at steady 60fps, pausing on cursor hover/focus and supporting reduced motion.
4. **Zone 3 — Featured Projects Showcase (`#projects`):**
   - Pinned, scroll-driven interactive card deck powered by GSAP ScrollTrigger.
   - Features 4 flagship systems:
     - **PRMS:** `Laravel 12`, `PHP 8.2+`, `MySQL 8`, `Docker`, `System Design`, `ReBAC: 3 Portals (Candidate, Supervisor, Dean)`, `Audit Security (SHA-256 Lock / Tamper-proof signature seal)`, `Risk Automation (GoT Engine / Automated milestone scoring)`, `Component-Driven GSAP Scroll Choreography`.
     - **Traces of Senai (仙迹):** `Kubernetes hosting`, `DeepSeek + CosyVoice TTS RAG`, `Cultural Heritage AI`.
     - **JiuXi Mindscape (九夕心境):** `WebGL / Three.js`, `Interactive Wellbeing`, `Nanao IP`.
     - **Colorella:** `WCAG Contrast & Color Utility`.
   - **Desktop Fluid Dimensions:** Fluid height governed by `min-h-[clamp(26rem,55vh,36rem)]`.
   - Direct link to the comprehensive historical directory (`pages/archives.html`).
5. **Zone 4 — Technical Capabilities & Skills Bento Matrix (`#stack`):**
   - **Cell 1 (8 columns desktop, full width mobile):** Backend & Data Architecture — interactive skill pills (`Laravel 12`, `PostgreSQL`, `Docker`, `RBAC`, `SQLite`) mapping to production governance.
   - **Cell 2 (4 columns desktop, full width mobile):** DevOps & Cloud Infrastructure — interactive skill pills (`Kubernetes`, `Docker Containers`, `CI/CD`) mapping to multi-pod deployment and automated build pipelines.
   - **Cell 3 (5 columns desktop, full width mobile):** AI & Machine Learning — interactive skill pills (`DeepSeek RAG`, `CosyVoice TTS`, `XGBoost ML`) mapping to multi-modal RAG and predictive modeling.
   - **Cell 4 (7 columns desktop, full width mobile):** Frontend Engineering & WebGL — interactive skill pills (`Three.js WebGL`, `Tailwind v4`, `GSAP Motion`, `Vanilla JS`) mapping to 60fps graphics and accessible motion engines.
6. **Zone 5 — Milestones & Track Record (`#experience`):**
   - Chronological track record highlighting academic milestones, research achievements, IoT innovations, and system releases.
7. **Zone 6 — Contact & Connect (`#contact`) + Footer:**
   - Direct communication channels (Email, LinkedIn, GitHub, WhatsApp).
   - Architectural footer featuring Loh Min Yu's personal brand identity, social links, and tea & mindfulness philosophy.
8. **Dedicated Project Archives (`pages/archives.html`):**
   - Complete, standalone historical directory documenting 20+ engineering projects, academic research works, and tools with domain filtering and search.
9. **Accessible Dark / Light Mode:**
   - Modern dark mode (deep obsidian `#09090b`) and crisp light mode (pure white/slate).
   - Zero-flicker theme persistence via `localStorage` and system `prefers-color-scheme`.

---

## 4. Search Engine Optimization (SEO) & Discoverability Requirements

1. **Technical SEO:**
   - Valid XML Sitemap (`sitemap.xml`) updated with all active routes, `<lastmod>`, `<changefreq>`, and `<priority>`.
   - `robots.txt` granting explicit crawler access to all indexable pages while protecting internal assets.
   - Canonical URL tags (`<link rel="canonical" href="https://minyu.my/..." />`) on every page to prevent duplicate content penalties.
2. **On-Page Metadata & Social Previews:**
   - Unique, keyword-rich `<title>` and `<meta name="description">` tailored to each individual showcase page.
   - Full Open Graph Protocol tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type: website`) for Twitter/X, LinkedIn, Discord, and Telegram unfurls.
3. **Structured Data & Semantic Markup:**
   - Schema.org JSON-LD structured data on all pages:
     - `Brand` / `Organization` (Lightoxy) linked directly to founder `Person` (Loh Min Yu).
     - `Person` (Loh Min Yu) with `knowsAbout`, `alumniOf`, and social profiles.
     - `SoftwareApplication` markup on dedicated showcase pages.
4. **Core Web Vitals & Search Ranking Factors:**
   - Largest Contentful Paint (LCP) `<= 2.5s`.
   - First Input Delay (FID) / Interaction to Next Paint (INP) `<= 200ms`.
   - Cumulative Layout Shift (CLS) `<= 0.1`.
5. **Generative Engine Optimization (GEO):**
   - Semantic passage structure with definition sentences and keyword clarity for citation eligibility in AI answer engines (Perplexity, ChatGPT, Claude).
