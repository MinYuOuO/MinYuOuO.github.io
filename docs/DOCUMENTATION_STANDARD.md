---
id: PORT-GOV-001
title: Documentation Standards & File Structure Template
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Governance
---

## Documentation Standards & File Structure Template — Lightoxy (minyu.my)

## 1. Overview & Purpose

This standard defines the universal documentation governance, metadata schema, identifier conventions, section profiles, cross-referencing rules, visual styling, revision history, and validation criteria for all documentation files across the **Lightoxy Engineering Ecosystem** (`docs/`).

### 1.1 Brand Identity: Lightoxy

**Lightoxy** is the personal brand identity and creative project banner created by Loh Min Yu (MinYuOuO) to anchor and showcase his diverse software engineering projects, system architectures, and digital explorations under a cohesive brand identity rather than relying solely on a personal name:

1. **Data Sovereignty & Local-First Intelligence:** Prioritizing on-device privacy, local-first storage, and Bring-Your-Own-AI (BYOAI) capabilities across tools like Lightoxy's Meet Act.
2. **Architectural Rigor:** Building resilient platforms utilizing modern full-stack architectures (Laravel 12, PHP 8.4, PostgreSQL, Docker, Vue.js, Tailwind CSS).
3. **Modern, Polished Digital Craft:** Delivering sleek, contemporary web experiences with Three.js WebGL visual computing and sub-150ms builds.
4. **Discoverability & Search Excellence (SEO):** Native optimization for web crawlers, social graph previews, and AI answer engines.

---

## 2. Traceability & System References

| Reference Target               | Document ID                                        | Relative Path                        | Relationship Type | Relevance / Description                                                                   |
| ------------------------------ | -------------------------------------------------- | ------------------------------------ | ----------------- | ----------------------------------------------------------------------------------------- |
| Product Requirements Document  | [PORT-PLAN-002](01-planning/prd.md)                | `01-planning/prd.md`                 | Contextualizes    | Upstream functional, non-functional, and SEO requirements for Lightoxy                    |
| Software Architecture Document | [PORT-ARCH-001](03-architecture/sad.md)            | `03-architecture/sad.md`             | Contextualizes    | Overall system design, static architecture, Three.js WebGL graphics, and performance      |
| Coding Standards               | [PORT-DEV-001](05-development/coding-standards.md) | `05-development/coding-standards.md` | Complements       | HTML5 semantics, Tailwind CSS v4 conventions, vanilla JavaScript guidelines               |
| Git Workflow                   | [PORT-DEV-003](05-development/git-workflow.md)     | `05-development/git-workflow.md`     | Governs           | Commit message conventions, PR documentation validation, and release changelog generation |

---

## 3. Metadata Standard & Frontmatter Specification

Every Markdown document within `docs/` MUST begin with a structured YAML frontmatter block enclosed between triple-hyphen dividers (`---`).

### 3.1 YAML Frontmatter Fields

| Field      | Type   | Mandatory? | Allowed Values / Format                                                                                                   | Description                                                                                                |
| ---------- | ------ | ---------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `id`       | String | **Yes**    | `PORT-[CATEGORY]-[NUMBER]`                                                                                                | Permanent unique document identifier (e.g., `PORT-ARCH-001`). Must be unique across the entire repository. |
| `title`    | String | **Yes**    | String (Plain text)                                                                                                       | Formal title of the document matching the subsequent H1 header.                                            |
| `status`   | Enum   | **Yes**    | `DRAFT`, `IN REVIEW`, `APPROVED`, `DEPRECATED`, `SUPERSEDED`                                                              | Current document lifecycle state. (Must be set to `IN REVIEW` upon agent edit).                            |
| `date`     | Date   | **Yes**    | `YYYY-MM-DD` (ISO-8601)                                                                                                   | Date of document creation or last substantive modification.                                                |
| `version`  | String | **Yes**    | SemVer format: `X.Y` or `X.Y.Z`                                                                                           | Document version matching commit baseline rules.                                                           |
| `author`   | String | **Yes**    | String                                                                                                                    | Author name and role (e.g., `Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)`).                        |
| `owner`    | String | **Yes**    | String                                                                                                                    | Role or person responsible for ongoing accuracy (e.g., `Lightoxy / Min Yu (MinYuOuO)`).                    |
| `category` | Enum   | **Yes**    | `Governance`, `Planning`, `Requirements`, `Architecture`, `Design`, `Development`, `Testing`, `Deployment`, `Maintenance` | Primary functional classification.                                                                         |

---

## 4. Document Identification Convention

Identifiers follow the stable pattern:

$$
\text{PORT}-\text{[CATEGORY]}-\text{[NUMBER]}
$$

Categories:

- `GOV`: Governance standards, contributor guides (`docs/DOCUMENTATION_STANDARD.md`).
- `PLAN`: Product proposals, PRD, scopes, and roadmaps (`01-planning/`).
- `REQ`: Product requirements, SRS, user stories, use cases, SEO requirements, acceptance criteria (`02-requirements/`).
- `ARCH`: Software Architecture Document (SAD), system context, HLD, LLD, WebGL architecture, and ADRs (`03-architecture/`).
- `DES`: Design systems, modern UI tokens, user flows, UX research (`04-design/`).
- `DEV`: Technical design, coding standards, environment configs, licensing (`05-development/`).
- `TEST`: Master test plan, test cases, test reports, UAT (`06-testing/`).
- `DEP`: Infrastructure, deployment guides, DNS configurations, rollback plans (`07-deployment/`).
- `MAINT`: Technical maintenance manuals, release notes, changelogs (`08-maintenance/`).

---

## 5. Initial Document ID Registry

| Document ID         | Relative Path                                                           | Canonical Title                                                    | Category     |
| ------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------ |
| `PORT-GOV-001`      | `docs/DOCUMENTATION_STANDARD.md`                                        | Documentation Standards & File Structure Template                  | Governance   |
| `PORT-PLAN-001`     | `docs/01-planning/project-proposal.md`                                  | Lightoxy Brand Vision & Portfolio Proposal                         | Planning     |
| `PORT-PLAN-002`     | `docs/01-planning/prd.md`                                               | Product Requirements Document (PRD)                                | Planning     |
| `PORT-PLAN-003`     | `docs/01-planning/scope.md`                                             | Project Scope & Boundary Specification                             | Planning     |
| `PORT-REQ-001`      | `docs/02-requirements/srs.md`                                           | Software Requirements Specification (SRS) & SEO Requirements       | Requirements |
| `PORT-REQ-002`      | `docs/02-requirements/user-stories.md`                                  | User Stories & Recruiter Personas                                  | Requirements |
| `PORT-REQ-003`      | `docs/02-requirements/use-cases.md`                                     | System Use Cases                                                   | Requirements |
| `PORT-REQ-004`      | `docs/02-requirements/acceptance-criteria.md`                           | Acceptance Criteria & Quality Gates                                | Requirements |
| `PORT-ARCH-001`     | `docs/03-architecture/sad.md`                                           | Software Architecture Document (SAD)                               | Architecture |
| `PORT-ARCH-002`     | `docs/03-architecture/system-context.md`                                | System Context & Hosting Boundaries                                | Architecture |
| `PORT-ARCH-003`     | `docs/03-architecture/hld.md`                                           | High-Level Design (HLD)                                            | Architecture |
| `PORT-ARCH-004`     | `docs/03-architecture/lld.md`                                           | Low-Level Design (LLD): Component Engines & Client Architecture    | Architecture |
| `PORT-ARCH-005`     | `docs/03-architecture/data-flow.md`                                     | Component Data Flow & State Hydration                              | Architecture |
| `PORT-ARCH-ADR-001` | `docs/03-architecture/adr/adr-001-static-vanilla-stack.md`              | ADR-001: Static HTML5 + Vanilla JS Stack Selection                 | Architecture |
| `PORT-ARCH-ADR-002` | `docs/03-architecture/adr/adr-002-tailwind-v4.md`                       | ADR-002: Tailwind CSS v4 CSS-First Architecture                    | Architecture |
| `PORT-ARCH-ADR-003` | `docs/03-architecture/adr/adr-003-threejs-webgl-hero.md`                | ADR-003: Three.js WebGL Hero Orb with IntersectionObserver         | Architecture |
| `PORT-ARCH-ADR-004` | `docs/03-architecture/adr/adr-004-horizontal-accordion.md`              | ADR-004: Horizontal Expanding Accordion Deck Interaction           | Architecture |
| `PORT-ARCH-ADR-005` | `docs/03-architecture/adr/adr-005-dedicated-showcase-pages.md`          | ADR-005: Dedicated Static Showcase Pages vs Modal Overlays         | Architecture |
| `PORT-ARCH-ADR-006` | `docs/03-architecture/adr/adr-006-modern-tooling-vite-tailwind.md`      | ADR-006: Modern Tooling with Vite, Tailwind CSS v4 & ES Modules    | Architecture |
| `PORT-ARCH-ADR-007` | `docs/03-architecture/adr/adr-007-scroll-driven-animation-gsap.md`      | ADR-007: Scroll-Driven Animation & GSAP ScrollTrigger Integration  | Architecture |
| `PORT-ARCH-ADR-008` | `docs/03-architecture/adr/adr-008-prms-component-scroll-choreography.md` | ADR-008: PRMS Component-Driven Scroll Choreography vs. Background WebGL Canvas | Architecture |
| `PORT-DES-001`      | `docs/04-design/design-system.md`                                       | Design System Specifications & Modern Design Tokens                | Design       |
| `PORT-DES-002`      | `docs/04-design/user-flow.md`                                           | User Flow & Navigation Architectures                               | Design       |
| `PORT-DES-003`      | `docs/04-design/ux-research.md`                                         | UX Research & Recruiter Behavioral Patterns                        | Design       |
| `PORT-DES-004`      | `docs/04-design/responsive-breakpoints.md`                              | Responsive Breakpoints & Fluid Scaling Standards                   | Design       |
| `PORT-DEV-001`      | `docs/05-development/coding-standards.md`                               | Coding Standards & Style Guide                                     | Development  |
| `PORT-DEV-002`      | `docs/05-development/environment-config.md`                             | Environment Configuration & Build Tooling                          | Development  |
| `PORT-DEV-003`      | `docs/05-development/git-workflow.md`                                   | Git Workflow & CI/CD Release Protocol                              | Development  |
| `PORT-DEV-004`      | `docs/05-development/licensing-policy.md`                               | Licensing Policy & Open-Source Attribution                         | Development  |
| `PORT-DEV-005`      | `docs/05-development/technical-design.md`                               | Technical Design: DOM Transitions & Easing Mechanics               | Development  |
| `PORT-TEST-001`     | `docs/06-testing/test-plan.md`                                          | Master Test Plan                                                   | Testing      |
| `PORT-TEST-002`     | `docs/06-testing/test-cases.md`                                         | Functional, Responsive & Visual Test Cases                         | Testing      |
| `PORT-TEST-003`     | `docs/06-testing/test-report.md`                                        | Test Execution Report & Health Verification                        | Testing      |
| `PORT-TEST-004`     | `docs/06-testing/uat.md`                                                | User Acceptance Testing (UAT) Protocol                             | Testing      |
| `PORT-DEP-001`      | `docs/07-deployment/deployment-guide.md`                                | GitHub Pages Deployment Guide                                      | Deployment   |
| `PORT-DEP-002`      | `docs/07-deployment/custom-domain-dns.md`                               | Custom Domain (minyu.my) DNS & SSL Configuration                   | Deployment   |
| `PORT-DEP-003`      | `docs/07-deployment/ci-cd.md`                                           | CI/CD Pipeline & GitHub Pages Automated Deployment                 | Deployment   |
| `PORT-DEP-004`      | `docs/07-deployment/rollback-plan.md`                                   | Deployment Rollback Protocol                                       | Deployment   |
| `PORT-MAINT-001`    | `docs/08-maintenance/technical-manual.md`                               | Technical Maintenance Manual (Adding Showcases & Projects)         | Maintenance  |
| `PORT-MAINT-002`    | `docs/08-maintenance/release-notes.md`                                  | Release Notes: Portfolio Revamp Baseline                           | Maintenance  |
| `PORT-MAINT-003`    | `docs/08-maintenance/changelog.md`                                      | Changelog Specification                                            | Maintenance  |
