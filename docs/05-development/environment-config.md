---
id: PORT-DEV-002
title: Environment Configuration & Build Tooling
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Development
---

## Environment Configuration & Build Tooling — Lightoxy (minyu.my)

## 1. Prerequisites

- **Node.js:** v20.0.0 or higher (v20+ LTS recommended).
- **npm:** v10.0.0 or higher.
- **Git:** Standard git CLI.

---

## 2. Traceability & System References

| Reference Target                      | Document ID                                                                         | Relative Path                                                    | Relationship Type | Relevance / Description                                              |
| ------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------- |
| System Context & Hosting Boundaries   | [PORT-ARCH-002](../03-architecture/system-context.md)                               | `../03-architecture/system-context.md`                           | Contextualizes    | External runtime boundaries, npm registry, and edge CDN delivery     |
| High-Level Design (HLD)               | [PORT-ARCH-003](../03-architecture/hld.md)                                          | `../03-architecture/hld.md`                                      | Refines           | Build & CI/CD subsystem specifications and Vite bundler topology     |
| Modern Tooling ADR                    | [PORT-ARCH-ADR-006](../03-architecture/adr/adr-006-modern-tooling-vite-tailwind.md) | `../03-architecture/adr/adr-006-modern-tooling-vite-tailwind.md` | Governed By       | Tooling selection rationale: Vite MPA, Tailwind v4, ES modules       |
| Coding Standards & Style Guide        | [PORT-DEV-001](coding-standards.md)                                                 | `coding-standards.md`                                            | Directs           | Development conventions, Zero-Rigid-Pixels mandate, and code hygiene |
| Git Workflow & CI/CD Release Protocol | [PORT-DEV-003](git-workflow.md)                                                     | `git-workflow.md`                                                | Complements       | Pre-commit verification scripts and automated GitHub Actions flow    |
| CI/CD Pipeline Specification          | [PORT-DEP-003](../07-deployment/ci-cd.md)                                           | `../07-deployment/ci-cd.md`                                      | Realizes          | Runner environment, automated build execution, and edge staging      |

---

## 3. Package Configuration (`package.json`)

```json
{
  "name": "minyuouo.github.io",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "build:css": "tailwindcss -i ./src/style/main.css -o ./src/style/output.css --minify"
  },
  "devDependencies": {
    "@tailwindcss/cli": "^4.1.18",
    "@tailwindcss/vite": "^4.3.5",
    "tailwindcss": "^4.1.18",
    "three": "^0.187.0",
    "vite": "^8.3.8"
  }
}
```

---

## 4. Local Development Commands

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Launch Local Development Server with HMR:**

   ```bash
   npm run dev
   ```

   Starts the high-speed Vite development server with instantaneous Hot Module Replacement.

3. **Compile Production Bundle (< 300ms):**

   ```bash
   npm run build
   ```

   Executes multi-page Rollup compilation via Vite, outputting optimized static assets into `./dist`.

4. **Preview Production Build Locally:**

   ```bash
   npm run preview
   ```

   Serves the generated `./dist` static output locally to verify bundle integrity prior to git push.

---

## 5. Multi-Page Configuration (`vite.config.js`)

All 9 HTML entry points are configured in `vite.config.js`:

- `index.html` (Landing Page)
- `pages/prms.html`, `pages/senai.html`, `pages/jiuxi.html`, `pages/colorella.html`, `pages/remind.html`, `pages/mamak-analytics.html`, `pages/telco-churn.html`
- `pages/archives.html` (Historical Directory)
