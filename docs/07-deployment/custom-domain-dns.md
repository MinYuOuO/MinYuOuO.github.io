---
id: PORT-DEP-002
title: "Custom Domain (minyu.my) DNS & SSL Configuration"
status: APPROVED
date: 2026-11-16
version: 1.0
author: Min Yu (MinYuOuO) (Lead Systems Engineer & Founder)
owner: Lightoxy / Min Yu (MinYuOuO)
category: Deployment
---

## Custom Domain (minyu.my) DNS & SSL Configuration — Lightoxy (minyu.my)

## 1. Domain Configuration

The personal portfolio is bound to the apex domain `minyu.my` and subdomain `www.minyu.my`.

---

## 2. DNS Record Specifications

| Type    | Name  | Value                 | TTL  | Purpose           |
| ------- | ----- | --------------------- | ---- | ----------------- |
| `A`     | `@`   | `185.199.108.153`     | Auto | GitHub Pages IP 1 |
| `A`     | `@`   | `185.199.109.153`     | Auto | GitHub Pages IP 2 |
| `A`     | `@`   | `185.199.110.153`     | Auto | GitHub Pages IP 3 |
| `A`     | `@`   | `185.199.111.153`     | Auto | GitHub Pages IP 4 |
| `CNAME` | `www` | `minyuouo.github.io.` | Auto | Subdomain routing |

---

## 3. SSL / TLS Security

- GitHub Pages provisions an automated Let's Encrypt SSL certificate.
- Enforce HTTPS is checked in repository settings, redirecting all insecure HTTP traffic to HTTPS.
