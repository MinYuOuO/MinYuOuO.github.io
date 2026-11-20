---
id: PORT-DEV-004
title: Licensing Policy & Open-Source Attribution
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Development
---

## Licensing Policy & Open-Source Attribution — Lightoxy (minyu.my)

## 1. Primary Repository License

The codebase, design token architectures, build configurations, and markup templates across this repository are licensed under the permissive **MIT License**. You are free to inspect, fork, reference, and adapt the underlying implementation patterns for your own projects with appropriate author attribution.

---

## 2. Traceability & System References

| Reference Target                    | Document ID                                         | Relative Path                        | Relationship Type | Relevance / Description                                             |
| ----------------------------------- | --------------------------------------------------- | ------------------------------------ | ----------------- | ------------------------------------------------------------------- |
| Documentation Standards             | [PORT-GOV-001](../DOCUMENTATION_STANDARD.md)        | `../DOCUMENTATION_STANDARD.md`       | Governed By       | Universal governance, copyright rules, and brand ownership          |
| Project Proposal                    | [PORT-PLAN-001](../01-planning/project-proposal.md) | `../01-planning/project-proposal.md` | Informs           | Lightoxy brand identity, founder attribution, and mission           |
| Coding Standards & Style Guide      | [PORT-DEV-001](coding-standards.md)                 | `coding-standards.md`                | Complements       | Code hygiene, open-source attribution, and third-party dependencies |
| Environment Configuration & Tooling | [PORT-DEV-002](environment-config.md)               | `environment-config.md`              | Details           | Package dependencies declared in `package.json`                     |

---

## 3. Brand Sovereignty, Personal Content & Intellectual Property

1. **Lightoxy Brand Identity:** **Lightoxy** is the personal brand identity and creative banner crafted by **Loh Min Yu (MinYuOuO)**. The Lightoxy name, vector logo assets, design language, and custom domain (`minyu.my`) remain the exclusive personal intellectual property of Loh Min Yu.
2. **Project Case Studies & Systems:** Architectural write-ups, custom system designs, diagrams, evaluation submissions, and partner-related materials (e.g., PRMS postgraduate governance, Traces of Senai cultural heritage project, Nanao IP, and Raffles University coursework) remain the property of their respective creators and institutional partners.
3. **Simone Weil Anchor Quote:** Quoted editorial excerpt (_"Attention is the rarest and purest form of generosity."_) is cited under fair use for philosophical and educational framing.

---

## 4. Third-Party Open-Source Software & Typography

All runtime and build-time software dependencies utilized in this project are permissible under standard open-source licenses:

| Software / Package                        | License     | Distribution Mode  | Architectural Role in Lightoxy                                                              |
| :---------------------------------------- | :---------- | :----------------- | :------------------------------------------------------------------------------------------ |
| **Vite**                                  | MIT License | npm devDependency  | Next-generation Multi-Page Application (MPA) bundler and local development server with HMR. |
| **Tailwind CSS v4** (`@tailwindcss/vite`) | MIT License | npm devDependency  | CSS-first utility compiler and design token architecture.                                   |
| **Three.js**                              | MIT License | npm dependency     | 3D WebGL dual-mesh hero orb visual computing engine.                                        |
| **Space Grotesk**                         | SIL OFL 1.1 | Local Font (`ttf`) | Geometric display typeface used for authoritative headings.                                 |
| **JetBrains Mono**                        | SIL OFL 1.1 | Local Font (`ttf`) | High-legibility monospaced typeface for technical metadata, stack tags, and ports.          |
