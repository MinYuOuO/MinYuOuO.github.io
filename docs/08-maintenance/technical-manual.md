---
id: PORT-MAINT-001
title: Technical Maintenance Manual (Adding Showcases & Projects)
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Maintenance
---

## Technical Maintenance Manual (Adding Showcases & Projects) — Lightoxy (minyu.my)

## 1. Overview

This manual details the standard operating procedures for maintaining the portfolio, adding new flagship showcases, and updating the historical archives catalog within the **Lightoxy Engineering Ecosystem**.

---

## 2. Standard Procedures

### 2.1 Adding a New Historical Project to `pages/archives.html`

1. Open `pages/archives.html`.
2. Locate the project catalog list or data container.
3. Insert a new project card element adhering to the established card structure:
   - Project Title & Category Badge.
   - Development Period / Year.
   - Architecture & Tech Stack tags.
   - Live URL or GitHub Repository link.
4. Run `npm run build` to verify multi-page bundling and Tailwind CSS v4 class generation.

### 2.2 Adding a Dedicated Project Showcase Page

1. Duplicate a reference showcase page (e.g. `pages/senai.html` or `pages/prms.html`).
2. Save file as `pages/<project-id>.html` in the `pages/` directory (per `.iderules`, never place showcase pages in the project root).
3. Register the new page in `vite.config.js` under `build.rollupOptions.input`:

   ```javascript
   '<project-id>': resolve(__dirname, 'pages/<project-id>.html')
   ```

4. Update metadata in the new HTML file:
   - `<title>` and `<meta name="description">`.
   - Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`).
   - Standard navigation header and breadcrumbs linking back to `../index.html#projects`.
5. Construct tailored architectural sections:
   - Hero Viewport & Project Brief.
   - Business Problem & Transformation Comparison.
   - Technical Architecture, Role Matrix, or Interactive Canvas.
   - Database / Model Specifications & Security Guardrails.
   - Production Deployment & Verification Metrics.
6. Register the new route in `public/sitemap.xml`:

   ```xml
   <url>
     <loc>https://minyu.my/pages/<project-id>.html</loc>
     <changefreq>monthly</changefreq>
     <priority>0.8</priority>
   </url>
   ```

7. Add cross-links in `index.html` (e.g. in the accordion deck or bento grid) and `pages/archives.html`.
8. Run `npm run build` and `npm run preview` to verify zero build errors, zero CLS shifts, and proper power gating on any WebGL canvases.
