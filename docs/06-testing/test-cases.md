---
id: PORT-TEST-002
title: "Functional, Responsive & SEO Test Cases"
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Testing
---

## Functional, Responsive & SEO Test Cases — Lightoxy (minyu.my)

## 1. Test Cases

| Case ID      | Component          | Scenario / Action                                               | Expected Outcome                                                                      | Status |
| ------------ | ------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------ |
| `TC-HERO-1`  | Three.js Hero      | Load `index.html` on desktop                                    | 3D wireframe orb renders smoothly in `#hero-canvas-container` at 60fps.               | PASS   |
| `TC-HERO-2`  | Hero Power Gate    | Scroll page down past hero section                              | `IntersectionObserver` triggers `isIntersecting: false`; requestAnimationFrame halts. | PASS   |
| `TC-DECK-1`  | Accordion Hover    | Hover cursor over PRMS card in `#deck-container`                | PRMS card expands to `flex: 3.5`; siblings compress; height conforms to fluid clamp.  | PASS   |
| `TC-DECK-2`  | Tech Focus Badges  | Inspect PRMS card details                                       | Focus grid displays: Laravel 12, Role-Based Access Control, Docker, System Design.    | PASS   |
| `TC-DECK-3`  | Senai Focus        | Inspect Traces of Senai card                                    | Displays: K8S hosting, DeepSeek + CosyVoice TTS RAG (zero latency ms, zero offline)   | PASS   |
| `TC-DECK-4`  | JiuXi Identity     | Inspect JiuXi card                                              | Displays: JiuXi Mindscape — AI Conversation Service (Raffles Graduation Show 2025).   | PASS   |
| `TC-BENTO-1` | Bento Skill Panel  | Click backend skill pills in 12-column grid                     | Context inspector updates with skill details and applied project link in < 16ms.      | PASS   |
| `TC-NAV-1`   | Theme Switcher     | Click theme toggle button in navbar                             | `<html>` class toggles between `dark` and `light`; `localStorage` updates instantly.  | PASS   |
| `TC-NAV-2`   | Mobile Drawer      | Click hamburger toggle on viewport `< 768px`                    | Mobile drawer slides in smoothly; backdrop overlays screen.                           | PASS   |
| `TC-ARCH-1`  | Archives Registry  | Open `archives.html` and count project cards                    | Complete project catalog rendered with working links and tech badges.                 | PASS   |
| `TC-PRMS-1`  | PRMS Scroll Motion | Scroll through all 6 sections of `pages/prms.html`              | Datum rules draw (`scaleX`), Before/After wings converge, cards lift smoothly.        | PASS   |
| `TC-PRMS-2`  | PRMS Bundle Scope  | Inspect built `dist/pages/prms.html` script/preload tags        | Zero Three.js bundle imported; lightweight `prms-*.js` + GSAP only.                   | PASS   |
| `TC-PRMS-3`  | PRMS Reduced Mot.  | Enable `prefers-reduced-motion: reduce` on `pages/prms.html`    | GSAP scrub and sticky pinning cleanly bypass; static layout remains accessible.       | PASS   |
| `TC-PRMS-4`  | PRMS Portal Hub    | Click Candidate, Supervisor, and Dean tabs in `#prms-portals`   | Corresponding role console mounts with staggered GSAP card transitions.               | PASS   |
| `TC-PRMS-5`  | PRMS Pinned Cycle  | Scroll through pinned Section 4 (Supervision & Audit Lifecycle) | Viewport pins cleanly; 4 stages slide directionally with active step indicator.       | PASS   |
| `TC-PRMS-6`  | PRMS Canvas Pad    | Draw signature on HTML5 canvas in Stage 02 and click Seal       | Strokes capture cleanly; SHA-256 digest computes; elastic emerald lock pulse fires.   | PASS   |
| `TC-PRMS-7`  | PRMS Blueprint Pan | Click blueprint card in Section 5; use zoom & pan controls      | High-res schematic zooms 100%–300%; drag-to-pan moves image smoothly in viewport.     | PASS   |
| `TC-EMOJI-1` | Zero-Emoji Check   | Run automated regex scan for emoji Unicode codepoints           | 0 emojis found across HTML, CSS, and JS; only precision inline SVGs used.             | PASS   |
| `TC-SEO-1`   | Sitemap Integrity  | Inspect `sitemap.xml`                                           | Valid XML with all active pages (no dead links, no stellarEchoes.html).               | PASS   |
| `TC-SEO-2`   | Schema.org JSON-LD | Run Google Rich Results test on `index.html`                    | Valid `Organization` (Lightoxy), `Person`, and `WebSite` structured data.             | PASS   |
| `TC-SEO-3`   | Open Graph Tags    | Inspect `<head>` of all showcase pages                          | `og:title`, `og:description`, `og:image`, `og:url` properly populated.                | PASS   |
