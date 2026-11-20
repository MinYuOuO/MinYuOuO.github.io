---
id: PORT-ARCH-ADR-003
title: "ADR-003: Three.js WebGL Hero Orb with IntersectionObserver"
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Architecture
---

## ADR-003: Three.js WebGL Hero Orb with IntersectionObserver — Lightoxy (minyu.my)

## 1. Context & Problem Statement

A visually distinctive hero section benefits from interactive 3D WebGL elements. However, continuously running a WebGL `requestAnimationFrame` loop consumes substantial laptop and mobile CPU/GPU power even when the user has scrolled past the hero.

## 2. Decision

We integrated **Three.js** via the local npm package (`three`) with ES module bundling in Vite 8.3 to render a dual-shell icosahedron wireframe orb, coupled strictly to an **IntersectionObserver** that suspends the render loop whenever the hero canvas container is out of the browser viewport.

## 3. Rationale & Benefits

- **Zero Idle CPU Drain:** CPU utilization drops to `< 0.1%` as soon as the user scrolls down to inspect projects.
- **Zero External CDN Vulnerability:** Bundled directly via Vite and Rollup tree-shaking, eliminating external CDN dependencies (such as CDNJS or JSDelivr).
- **Visual Impact:** Provides a high-tech, distinctive aesthetic that sets the engineering portfolio apart.
- **Graceful Fallback:** If WebGL is unavailable or disabled, the canvas silently fails without interrupting page functionality.

## 4. Consequences

- Three.js is imported via standard ES modules (`import * as THREE from 'three'`) and compiled into static `./dist/assets`.
