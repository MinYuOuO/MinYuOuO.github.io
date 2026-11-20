---
id: PORT-ARCH-ADR-004
title: "ADR-004: Horizontal Expanding Accordion Deck Interaction"
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Architecture
---

## ADR-004: Horizontal Expanding Accordion Deck Interaction — Lightoxy (minyu.my)

## 1. Context & Problem Statement

Traditional portfolio grids display uniform cards that all look identical, wasting vertical screen space while hiding architectural details. We needed an interaction pattern that allows seamless browsing ("navigate to card") with a smooth, expanding preview.

## 2. Decision

We designed a **Horizontal Expanding Accordion Deck** (`#deck-container`) with fluid responsive scaling (`min-h-[clamp(26rem,55vh,36rem)]`) on desktop viewports pursuant to the Zero-Rigid-Pixels Mandate:

- Default state: all cards evenly sized (`flex: 1`).
- Hovered/Active state: active card smoothly expands to `flex: 3.5` using spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`), revealing architectural focus badges, system design specs, and direct deep-dive actions.
- Neighbor cards gracefully compress without vertical layout jumping.

## 3. Rationale & Benefits

- **Zero-Rigid-Pixels Compliance:** Eliminates hardcoded pixel heights in favor of mathematical clamping (`min-h-[clamp(26rem,55vh,36rem)]`), preventing layout blowouts across ultrawide monitors and laptops.
- **Intuitive Exploration:** Recruiters or engineering leads can hover across all 4 flagship systems in seconds without click-waiting or modal popups.
- **Kinetic Physics:** Spring easing curve provides tactile, modern feedback matching Linear and Raycast desktop standards.

## 4. Consequences

- On mobile viewports (`< md`), the container transitions into a fluid vertical stack (`flex-col w-full`) with auto-height expansion to guarantee readability without clipping.
