---
id: PORT-DES-004
title: Responsive Breakpoints & Fluid Scaling Standards
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Design
---

## Responsive Breakpoints & Fluid Scaling Standards — Lightoxy (minyu.my)

## 1. Overview & Purpose

This standard defines the **Zero-Rigid-Pixels Mandate** and multi-device fluid responsiveness across **Lightoxy's Official Engineering Portal** (`minyu.my`).

Every interface element—from the hero stage and 3D WebGL orb to the Horizontal Expanding Accordion Deck—must adapt dynamically to arbitrary viewport dimensions without horizontal overflow, awkward empty voids, or truncated technical metadata.

---

## 2. Traceability & System References

| Reference Target                          | Document ID                                | Relative Path               | Relationship Type | Relevance / Description                                        |
| ----------------------------------------- | ------------------------------------------ | --------------------------- | ----------------- | -------------------------------------------------------------- |
| Product Requirements Document (PRD)       | [PORT-PLAN-002](../01-planning/prd.md)     | `../01-planning/prd.md`     | Contextualizes    | Upstream fluid responsive requirements & feature specs         |
| Software Requirements Specification (SRS) | [PORT-REQ-001](../02-requirements/srs.md)  | `../02-requirements/srs.md` | Governs           | Formal functional requirements `FR-RESP.1` through `FR-RESP.4` |
| Software Architecture Document (SAD)      | [PORT-ARCH-001](../03-architecture/sad.md) | `../03-architecture/sad.md` | Informs           | Zero-Rigid-Pixels principle and static delivery topology       |
| Low-Level Design (LLD)                    | [PORT-ARCH-004](../03-architecture/lld.md) | `../03-architecture/lld.md` | Implements        | CSS properties, spring bezier curves, and clamp formulas       |
| Design System Specifications              | [PORT-DES-001](design-system.md)           | `design-system.md`          | Complements       | Design tokens, typography hierarchy, and color palettes        |
| User Flow & Navigation Architectures      | [PORT-DES-002](user-flow.md)               | `user-flow.md`              | Realizes          | Viewport-specific navigation states and continuous narrative   |

---

## 3. Responsive Breakpoint Matrix

Tailwind CSS v4 media queries define the foundational responsive tiers:

| Breakpoint Tier         | Min Width | Target Devices / Viewports                   | Layout Characteristics & Behavior                                                   |
| ----------------------- | --------- | -------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Mobile (`< sm`)**     | `< 640px` | Smart phones (iPhone, Pixel, Galaxy)         | Single-column vertical flow, fluid auto-height, stacked navigation drawer.          |
| **Tablet (`sm`–`md`)**  | `640px`   | Small tablets, phablets, portrait iPads      | Balanced vertical stack, expanded touch targets, adaptive card padding.             |
| **Laptop (`md`–`lg`)**  | `768px`   | iPads landscape, small laptops (13")         | Horizontal Accordion Deck active, side-by-side hero text and 3D orb.                |
| **Desktop (`lg`–`xl`)** | `1024px`  | Standard desktop displays (1080p, 1440p)     | Full multi-column layout, elastic container boundaries, maximum breathing room.     |
| **Ultrawide (`2xl`)**   | `1536px`  | 4K monitors, ultrawide gaming & productivity | Fluid container clamped at `max-w-[clamp(72rem,90vw,88rem)]` with center-alignment. |

---

## 4. Fluid Scaling Formulas (Zero Rigid Pixels)

### 4.1 Typography Fluidity

Rigid font jumps (`text-4xl md:text-7xl`) are replaced by CSS mathematical clamping:

$$\text{H1 Headline} = \text{clamp}(2.25\text{rem}, 5.5\text{vw} + 0.5\text{rem}, 4.5\text{rem})$$

$$\text{Body Text} = \text{clamp}(1\text{rem}, 1.25\text{vw} + 0.5\text{rem}, 1.25\text{rem})$$

$$\text{Metadata / Code} = \text{clamp}(0.75\text{rem}, 0.9\text{vw} + 0.2\text{rem}, 0.875\text{rem})$$

### 4.2 Hero Section Geometry

- **Container Width:** `w-full max-w-[min(100%,48rem)]` eliminating the left-side dead space while maintaining optimal reading line lengths.
- **Viewport Height:** `min-h-[calc(100dvh-5rem)]` guaranteeing consistent full-screen presence on mobile browsers with expanding/collapsing navigation bars.
- **3D WebGL Orb:** `w-[clamp(18rem,45vw,36rem)] aspect-square`. Placed as a depth backdrop on mobile/tablet `< 1024px` and beside content on desktop `≥ 1024px`.

### 4.3 Horizontal Expanding Accordion Deck

- **Desktop Dimensions (`≥ md`):**
  - Height: `min-h-[clamp(26rem,55vh,36rem)]` (adapting fluidly to the user's viewport height).
  - Width Ratio: Active card `flex-[3.5]`, compressed siblings `flex-1`.
  - Motion: `transition: all 500ms cubic-bezier(0.16, 1, 0.3, 1)`.
- **Mobile Stack (`< md`):**
  - Container transitions from `flex-row` to `flex-col w-full gap-3`.
  - Cards take full width with fluid auto-height, ensuring rich technical specifications and links remain accessible without truncation.

### 4.4 Zone 4 Asymmetric 12-Column Bento Grid (Interactive Skill Matrix)

- **Desktop Grid (`≥ md`):** `grid grid-cols-12 gap-[clamp(1rem,2vw,1.5rem)]`.
  - Cell 1 (Backend & Data): `md:col-span-8`
  - Cell 2 (DevOps & Cloud): `md:col-span-4`
  - Cell 3 (AI & Machine Learning): `md:col-span-5`
  - Cell 4 (Frontend & WebGL): `md:col-span-7`
- **Mobile Stack (`< md`):**
  - Grid collapses into a fluid single-column layout (`grid-cols-1 gap-4`).
- **Context Inspector Stability:**
  - Context panels enforce an explicit fluid floor `min-h-[clamp(6rem,12vh,8rem)]` across all viewports, guaranteeing Cumulative Layout Shift `CLS = 0` during live skill pill clicks.

### 4.5 The Architectural Guide Spine

- **Dynamic Progression:** Vertical guide filament driven by GPU CSS custom property `--scroll-progress` via a passive scroll listener.
- **Continuous Alignment:** Maintains uninterrupted optical thread connecting Hero Orb, Tech Marquee, Accordion Deck, Bento Grid, and Footer without horizontal drift across any screen size.
