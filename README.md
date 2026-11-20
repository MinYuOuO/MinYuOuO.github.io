# ⚡ Lightoxy Engineering Portal — Loh Min Yu (MinYuOuO)

<div align="center">

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r182-black?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=flat&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-minyu.my-emerald)](https://minyu.my)

**Official Personal Engineering Portal & Technical Portfolio for Loh Min Yu (Lightoxy)**  

[Explore Live Portal (minyu.my)](https://minyu.my) • [View Architecture Docs](docs/03-architecture/sad.md) • [Browse Project Archives](pages/archives.html)

</div>

---

## 📖 Overview

Welcome to the **Lightoxy Engineering Portal** (`minyu.my` / `MinYuOuO.github.io`). This repository houses the complete source code, design system, WebGL graphical scenes, and engineering documentation for Loh Min Yu's personal portfolio website.

### About Loh Min Yu (Lightoxy)

I hold a Bachelor of Information Technology with a strong focus on **software engineering**, **game development**, and **artificial intelligence systems**. I enjoy solving complex problems through pragmatic thinking and structured logic, whether designing IoT systems, producing games, or programming in **Python**, **C++**, or **C#**.

- **Analytical & Reflective Mindset:** Learning from failures, iterating on design decisions, and asking why systems are built the way they are.
- **Philosophical Grounding:** Exploring existential questions and striking a healthy balance between personal meaning and technical mastery.
- **Outside of Tech:** An appreciation for literature and the art of tea—disciplines that nurture patience, mindfulness, and inner clarity.
- **Open to Collaboration:** Excited to build meaningful software, AI applications, educational tools, and creative digital media.

---

## 🧭 The 6-Section Narrative Experience

The landing page (`index.html`) is structured into 6 sequential sections connected by a continuous scroll-driven visual journey and a pinned left waypoint navigator:

```Flow
[01 // Home] --------> [02 // About] --------> [03 // Projects]
  • 3D WebGL Orb         • Pragmatic Mindset     • Pinned Card Deck
  • Role Introduction    • Tea & Literature      • Flagship Systems
  • Quick Links          • Tech Marquee          • Deep-Dive Links
       |                      |                       |
       v                      v                       v
[04 // Skills] -------> [05 // Milestones] ----> [06 // Contact]
  • Interactive Bento    • Academic Degrees      • Communication Hub
  • Stack by Layer       • IoT Research          • Social Links
  • Production Proofs    • Career Growth         • Tea Philosophy
```

1. **`01 // Home` (`#hero`):**
   - Clean, confident typography with fluid clamp sizing.
   - Dynamic Three.js WebGL geometric orb responding gently to cursor parallax.
   - Direct call-to-action buttons (`Explore Featured Work`, `Read Background & Mindset`).

2. **`02 // About` (`#about`):**
   - Three structured perspective cards:
     - **Pragmatic Problem Solving:** Structured logic, full-stack systems, game engineering, IoT, and languages.
     - **Analytical & Reflective Mindset:** Iterating from failures, strategic adjustments, and philosophical grounding.
     - **Literature, Tea & Collaboration:** Mindfulness, patience, and welcoming collaborative engineering projects.
   - Smooth 60fps hardware-accelerated tech marquee showcasing active technical proficiencies.

3. **`03 // Projects` (`#projects`):**
   - Pinned and scrubbed interactive showcase deck powered by GSAP ScrollTrigger.
   - Features 4 flagship projects with direct links to dedicated architectural deep dives:
     - **PRMS (Postgraduate Research Progress Monitoring System):** Laravel 12, PHP 8.2+, MySQL 8, Docker, ReBAC (Relationship-Based Access Control), cryptographic SHA-256 canvas signature locking, and component-driven GSAP scroll choreography.
     - **Traces of Senai (仙迹):** Kubernetes, DeepSeek LLM + CosyVoice TTS RAG, Cultural Heritage AI.
     - **JiuXi Mindscape (九夕心境):** Three.js WebGL, Interactive Wellbeing, Nanao IP.
     - **Colorella:** Accessible WCAG Color Palette & Contrast Utility.
   - Header shortcut to the comprehensive standalone archives (`pages/archives.html`).

4. **`04 // Skills` (`#stack`):**
   - 12-column asymmetric Bento Grid organized by stack layer:
     - Backend & Data Architecture (`Laravel`, `PostgreSQL`, `Docker`, `RBAC`, `SQLite`).
     - DevOps & Cloud Infrastructure (`Kubernetes`, `CI/CD Pipelines`, `Docker Engine`).
     - AI & Machine Learning (`DeepSeek RAG`, `CosyVoice TTS`, `XGBoost ML`).
     - Frontend Engineering & WebGL (`Three.js`, `Tailwind v4`, `GSAP Motion`, `Vanilla ES6+`).
   - Interactive badge inspector displaying real-world system context with zero layout shift (`CLS = 0`).

5. **`05 // Milestones` (`#experience`):**
   - Chronological track record highlighting Industry Learning internship at ITWin Technology Sdn Bhd (CabNet Holdings Berhad), the completed PRMS Final Year Project, and leadership achievements.

6. **`06 // Contact` (`#contact`):**
   - Clean communication portal offering direct contact via Email, LinkedIn, GitHub, and WhatsApp.
   - Architectural footer grounded in patient reflection and tea philosophy.

7. **Dedicated Project Archives (`pages/archives.html`):**
   - Complete, standalone historical directory documenting 20+ engineering projects, academic research works, and tools with domain filtering.

---

## ⚙️ Architecture & Technical Highlights

### 1. Bidirectional Scroll-Driven Animation (GSAP)

- Driven by **GSAP ScrollTrigger** and **ScrollToPlugin**.
- Scrolling down naturally advances animations; scrolling up smoothly reverses them.
- Avoids rigid one-time IntersectionObserver triggers for core narrative pacing.

### 2. Pin-Compensated Waypoint Navigation

- Floating left spine navigator tracks the active section in real time.
- Dynamic geometric compensation factors in GSAP sticky pinned sections (`#projects`), ensuring waypoint highlights never jump or desynchronize.
- Integrated flight lock prevents automated smooth-scroll clicks from fighting with user-driven scrolling.

### 3. Evolving Three.js Visual Motif

- Central Three.js canvas transitions its geometric layout as the user progresses through sections:
  - **Hero:** Geometric wireframe orb with subtle rotational inertia.
  - **About:** Transitions into dispersed floating coordinate points.
  - **Projects:** Forms a delicate spatial frame around the active project card.
  - **Skills:** Realigns into a structured geometric matrix.
  - **Milestones:** Flows along the timeline axis.
  - **Contact:** Converges cleanly into a final focal composition.
- **Power Gating:** Automatically pauses the render loop when canvas is off-screen, maintaining **0% idle CPU** consumption.

### 4. Zero-Rigid-Pixels Fluid Layout

- Pure fluid design using `rem`, `%`, `vw`, `dvh`, and CSS `clamp()`.
- Flawlessly adapts from compact mobile viewports (320px) to ultra-wide displays (3840px) without horizontal overflow or awkward layout breaks.

### 5. Minimal Frosted Header

- Streamlined glass header featuring the Lightoxy vector logo, Resume [PDF] download button, and a theme switcher.
- Navigation remains intuitive via the spine waypoint indicator, eliminating redundant clutter in the top bar.

---

## 🛠️ Technology Stack

| Layer                    | Technology                                  | Purpose                                                                    |
| :----------------------- | :------------------------------------------ | :------------------------------------------------------------------------- |
| **Bundler & Build Tool** | [Vite 8.3 MPA](https://vitejs.dev/)         | Sub-second bundling, fast HMR, and multi-page HTML optimization.           |
| **Styling & CSS**        | [Tailwind CSS v4](https://tailwindcss.com/) | CSS-first configuration via `@tailwindcss/vite`, dynamic color tokens.     |
| **3D Graphics**          | [Three.js r182](https://threejs.org/)       | Local ES module import; low-overhead 3D geometric visual narrative.        |
| **Animation Engine**     | [GSAP 3.12](https://greensock.com/gsap/)    | ScrollTrigger scrub control, ScrollToPlugin smooth waypoint navigation.    |
| **Client Scripting**     | Vanilla ES6+ Modules                        | Lightweight, native JavaScript without heavy front-end framework overhead. |
| **Static Hosting**       | [GitHub Pages](https://pages.github.com/)   | Edge CDN static delivery via automated GitHub Actions pipeline.            |
| **Domain & DNS**         | Cloudflare / Custom DNS                     | HTTPS, SSL termination, and canonical apex routing (`minyu.my`).           |

---

## 📁 Repository Structure

```File Structure
MinYuOuO.github.io/
├── index.html                   # 6-zone landing page entry point
├── package.json                 # npm scripts and core dependencies
├── vite.config.js               # Multi-Page Application (MPA) configuration
├── public/                      # Static assets, fonts, icons, resume PDF
│   ├── favicon.svg              # Site favicon
│   ├── Lightoxy.svg             # Lightoxy brand vector logo
│   └── MinYu_Resume.pdf         # Curated technical resume
├── pages/                       # Dedicated deep-dive architectural showcases
│   ├── archives.html            # Standalone 20+ project historical catalog
│   ├── prms.html                # PRMS postgraduate research progress monitoring showcase
│   ├── senai.html               # Traces of Senai (仙迹) cultural heritage AI
│   ├── jiuxi.html               # JiuXi Mindscape interactive wellbeing platform
│   ├── colorella.html           # Colorella WCAG contrast & color utility
│   ├── mamak-analytics.html     # F&B operations & logistics analytics
│   ├── telco-churn.html         # Telecom customer churn predictive ML
│   └── remind.html              # ReMind mobile health architecture
├── src/
│   ├── script/
│   │   ├── main.js              # Application bootstrap, GSAP & waypoint controller
│   │   ├── prms.js              # PRMS component scroll choreography & pinned lifecycle
│   │   ├── hero-orb.js          # Three.js 3D geometric motif & visual engine
│   │   ├── accordion.js         # Interactive project deck spring mechanics
│   │   ├── bento.js             # Interactive skill matrix & layer inspector
│   │   ├── theme.js             # Zero-flicker dark/light mode coordinator
│   │   └── archives.js          # Project catalog filtering & search logic
│   └── style/
│       └── main.css             # Tailwind CSS v4 design tokens & theme layers
└── docs/                        # Complete engineering documentation suite
    ├── 01-planning/             # PRD, project proposal, and scope specifications
    ├── 02-requirements/         # SRS, use cases, user stories, acceptance criteria
    ├── 03-architecture/         # SAD, HLD, LLD, data flow, system context & ADRs
    │   └── adr/                 # Architectural Decision Records (ADR-001 to ADR-007)
    ├── 04-design/               # Design system, responsive breakpoints, user flow
    ├── 05-development/          # Coding standards, git workflow, licensing
    ├── 06-testing/              # Test plans, test cases, and quality reports
    ├── 07-deployment/           # CI/CD pipeline, custom DNS setup, rollback plan
    └── 08-maintenance/          # Changelog, release notes, and technical manual
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)

### Installation

Clone the repository and install the development dependencies:

```bash
git clone https://github.com/MinYuOuO/MinYuOuO.github.io.git
cd MinYuOuO.github.io
npm install
```

### Local Development

Start the local Vite development server with instant Hot Module Replacement (HMR):

```bash
npm run dev
```

Visit the local server address displayed in your terminal (typically `http://localhost:5173/`).

### Production Build & Preview

Compile the optimized static distribution bundle into `./dist`:

```bash
npm run build
```

Preview the compiled production bundle locally:

```bash
npm run preview
```

---

## 🧪 Quality Assurance & Build Verification

The project enforces build integrity, asset link validation, and zero-error compilation:

```bash
# Compile and validate production bundle
npm run build

# Preview the compiled static production build locally
npm run preview
```

---

## 📬 Connect & Collaborate

- **Personal Domain:** [minyu.my](https://minyu.my)
- **GitHub:** [@MinYuOuO](https://github.com/MinYuOuO)
- **LinkedIn:** [linkedin.com/in/loh-min-yu](https://www.linkedin.com/in/loh-min-yu)
- **Email:** [lohminyu1104@gmail.com](mailto:lohminyu1104@gmail.com)
- **WhatsApp:** [+60 11-5551 2289](https://wa.me/601155512289)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Design concepts, logos, and personal biographical content are copyright © Loh Min Yu.
