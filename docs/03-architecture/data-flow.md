---
id: PORT-ARCH-005
title: Component Data Flow & State Hydration
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Architecture
---

## Component Data Flow & State Hydration — Lightoxy (minyu.my)

## 1. Traceability & System References

| Reference Target                          | Document ID                               | Relative Path               | Relationship Type | Relevance / Description                                        |
| ----------------------------------------- | ----------------------------------------- | --------------------------- | ----------------- | -------------------------------------------------------------- |
| Software Architecture Document (SAD)      | [PORT-ARCH-001](sad.md)                   | `sad.md`                    | Contextualizes    | Upstream principles: continuous visual narrative, power gating |
| High-Level Design (HLD)                   | [PORT-ARCH-003](hld.md)                   | `hld.md`                    | Refines           | Subsystem interactions and component data boundaries           |
| Low-Level Design (LLD)                    | [PORT-ARCH-004](lld.md)                   | `lld.md`                    | Details           | Component engines, event handlers, and DOM mutation logic      |
| Software Requirements Specification (SRS) | [PORT-REQ-001](../02-requirements/srs.md) | `../02-requirements/srs.md` | Realizes          | Functional and performance requirements realized in data flow  |

---

## 2. Lifecycle Data Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as Visitor / Recruiter
    participant DOM as Document Object Model
    participant LS as Browser localStorage
    participant TM as Theme Manager
    participant Orb as WebGL Hero Orb
    participant Spine as Architectural Spine Engine
    participant Deck as Accordion Deck
    participant Bento as Bento Skill Inspector

    User->>DOM: Loads minyu.my
    DOM->>LS: Reads "theme" key
    LS-->>TM: Returns "dark" or "light" (or system pref)
    TM->>DOM: Sets class "dark" / "light" on <html>
    DOM->>Orb: initHeroOrb()
    Orb->>DOM: Attaches WebGL Canvas
    DOM->>Spine: Registers passive scroll observer
    DOM->>Deck: Initializes Accordion Event Listeners
    DOM->>Bento: Initializes Skill Matrix & default active badges

    User->>DOM: Scrolls page down
    DOM->>Spine: Passive scroll event fires
    Spine->>DOM: Updates --scroll-progress and guide filament
    DOM->>Orb: IntersectionObserver triggers (isIntersecting: false)
    Orb->>Orb: Pauses requestAnimationFrame loop (0% CPU)

    User->>Deck: Hovers over Card (PRMS)
    Deck->>Deck: Expands card to flex-[3.5] via cubic-bezier(0.16, 1, 0.3, 1)

    User->>Bento: Clicks Skill Badge (e.g. "PostgreSQL")
    Bento->>Bento: Updates active badge state and cross-fades context (<16ms, CLS=0)

    User->>TM: Clicks Theme Toggle Button
    TM->>LS: Writes updated "theme"
    TM->>DOM: Toggles class on <html>
    TM->>Orb: Updates wireframe material colors
```

---

## 3. State Invariants

1. **Theme Invariant:** `document.documentElement` must always contain exactly one theme class (`dark` or `light`).
2. **WebGL Context Invariant:** A single WebGL context is initialized per page to prevent GPU memory leaks.
3. **Route Invariant:** All navigation links point to existing static `.html` files or anchor targets.
