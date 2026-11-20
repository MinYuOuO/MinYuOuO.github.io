---
id: PORT-ARCH-ADR-005
title: "ADR-005: Dedicated Static Showcase Pages vs Modal Overlays"
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Architecture
---

## ADR-005: Dedicated Static Showcase Pages vs Modal Overlays — Lightoxy (minyu.my)

## 1. Context & Problem Statement

Previously, project details were stored in a monolithic JavaScript file (`projects-data.js`) and rendered dynamically inside modal drawers or uniform templates. This created identical-looking project layouts and prevented specialized architectural diagrams for different systems.

## 2. Decision

We deprecated `projects-data.js` and dynamic modal popups in favor of **Dedicated Static Showcase Pages** (`prms.html`, `senai.html`, `jiuxi.html`, `colorella.html`, `mamak-analytics.html`, `telco-churn.html`).

## 3. Rationale & Benefits

- **Specialized Architectural Layouts:** Each system displays a structure tailored to its design:
  - PRMS displays 3-role portal architecture (Candidate, Supervisor, Dean), MySQL 8 relational schema with ReBAC policy scoping, SHA-256 canvas signature locking, and component-driven GSAP scroll choreography.
  - Traces of Senai displays the K8S architecture, DeepSeek RAG, and CosyVoice TTS pipeline.
  - JiuXi Mindscape highlights the conversational interface and Raffles Graduation Show context.
- **Permanent, Shareable URLs:** Direct deep-linking allows recruiters and visitors to link directly to a specific project.
- **Superior SEO & Crawlability:** Dedicated static pages are directly indexable by search engines and AI crawlers with full metadata.

## 4. Consequences

- Content updates for a specific showcase are edited directly within that page's HTML file rather than a centralized JSON store.
