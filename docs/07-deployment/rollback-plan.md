---
id: PORT-DEP-004
title: Deployment Rollback Protocol
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Deployment
---

## Deployment Rollback Protocol — Lightoxy (minyu.my)

## 1. Rollback Triggers

A rollback is initiated if any of the following critical conditions are detected in production:

1. **Broken Visual Layout:** Catastrophic CSS regression or build failure in Vite multi-page compilation (`dist/assets/main-*.css`).
2. **Broken Navigation:** 404 errors preventing access to `/pages/archives.html` or dedicated showcase pages (`pages/*.html`).
3. **Severe Performance Degrade:** Home page WebGL Hero orb causing mobile browser crash, GPU hang, or tab freeze.
4. **Build Pipeline Breakage:** GitHub Actions `deploy.yml` failure on `main` branch.

---

## 2. Execution Procedures

### 2.1 Fast Git Revert

```bash
# 1. Identify previous stable commit SHA
git log --oneline -n 5

# 2. Revert the problematic commit
git revert HEAD --no-edit

# 3. Verify clean Vite build locally
npm run build

# 4. Push to main to trigger instantaneous GitHub Actions deployment
git push origin main
```

### 2.2 Post-Rollback Triage

1. Inspect commit diff to isolate faulty CSS class, script modification, or asset reference.
2. Run local preview (`npm run preview`) to reproduce and resolve bug before redeploying.
