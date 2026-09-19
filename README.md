# CELL CARE — Tech Stack & Credits

Comprehensive technical documentation, dependency index, open-source attributions, and architecture credits for the **CELL CARE** website project.

---

## Overview

- **Project**: CELL CARE — Independent Apple iPhone & iPad Specialist Repair Lab
- **Location**: Madurai, Tamil Nadu, India (Established in 2000)
- **Architecture**: Zero-build, pure client-side static web application (Vanilla HTML5, CSS3, JavaScript ES6+, WebGL 1.0 / GLSL).
- **Core Aesthetic**: Minimalist Obsidian Black & Monochrome luxury theme inspired by Apple Pro hardware, Swiss typography, and architectural glassmorphism.
- **Key Feature**: Real-time interactive WebGL Liquid Metal Apple Logo reacting to cursor physics and touch ripples without heavy 3D rendering engines.

---

## Tech Stack

| Layer | Technology | Version / Distribution | Integration Method | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Markup** | HTML5 | Living Standard | Native files (`index.html`, etc.) | Semantic structure, accessibility (`aria-*`), SEO metadata. |
| **Styling** | CSS3 / PostCSS | CSS Variables + Backdrop Filter | `css/style.css` | Custom glassmorphism, physics transitions, layout polish. |
| **CSS Utility** | Tailwind CSS | v3 (Play CDN) | `<script src="https://cdn.tailwindcss.com">` | Rapid utility layout, responsive breakpoints, flex/grid. |
| **Typography** | Inter | Weights 300–800 | Google Fonts CDN via `@import` | Primary brand sans-serif font stack. |
| **Iconography** | Lucide Icons | Latest | `<script src="https://unpkg.com/lucide@latest">` | Clean line icons, rendered via `lucide.createIcons()`. |
| **Graphics** | WebGL 1.0 / GLSL | OpenGL ES Shading Language 1.00 | Native `<canvas>` context in `js/liquid-logo.js` | Interactive 60fps liquid metal fluid dynamics shader. |
| **Scripting** | JavaScript (ES6+) | Vanilla (No Framework) | `js/main.js`, `js/liquid-logo.js` | Navigation, live business hours engine, FAQ accordion. |

---

## External Repos & Licenses

| Project / Component | Source URL | Author / Maintainer | License | How It Was Used |
| :--- | :--- | :--- | :--- | :--- |
| **Liquid Logo WebGL Engine** | [github.com/collidingScopes/liquid-logo](https://github.com/collidingScopes/liquid-logo) | collidingScopes | **MIT License** | Core WebGL vector field animation and logo edge-detection pipeline. Adapted in `js/liquid-logo.js` into an Obsidian Black liquid metal shader with custom specular reflections and mouse ripple physics. |
| **Liquid Glass JS** | [github.com/dashersw/liquid-glass-js](https://github.com/dashersw/liquid-glass-js) | Şerif Ceylan (@dashersw) | **MIT License** | Design reference for fluid optical glass distortion and refractions. Re-engineered into native CSS3 backdrop blur filters (`backdrop-filter: blur(20px) saturate(180%)`) for lightweight browser performance. |
| **Simplex 3D Noise GLSL** | Included in shader source | Ian McEwan, Ashima Arts, Stefan Gustavson | **MIT License** | WebGL GLSL procedural 3D noise functions used to generate natural fluid turbulence across the liquid metal logo. |
| **Lucide Icons** | [github.com/lucide-icons/lucide](https://github.com/lucide-icons/lucide) | Lucide Project | **ISC License** | SVG iconography (phone, navigation, award, calendar, shield, etc.). |
| **Inter Font Family** | [github.com/rsms/inter](https://github.com/rsms/inter) | Rasmus Andersson (@rsms) | **SIL Open Font License 1.1** | Clean grotesque typographic hierarchy across all pages. |
| **Tailwind CSS** | [github.com/tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) | Tailwind Labs Inc. | **MIT License** | On-the-fly utility CSS styling via client-side script tag. |

---

## APIs & Services

| Service | Endpoint / URL | Purpose | Tracking / Privacy Impact |
| :--- | :--- | :--- | :--- |
| **WhatsApp Direct Link** | `https://wa.me/919715253113` | Instant customer consultation chat | No third-party tracking scripts loaded; standard URL protocol. |
| **Google Maps Link** | `https://maps.app.goo.gl/5zSLt64Udb9EwrMt9` | Navigation to South Veli Street storefront | Direct hyperlink redirect; no embedded iframes or API keys. |
| **Telephone Protocol** | `tel:+919715253113` | One-touch direct phone calling | Native OS / browser protocol. |
| **Analytics & Telemetry** | *None* | Zero trackers, zero analytics pixels | 100% private, zero telemetry, GDPR/DPDP compliant by default. |

---

## AI Tools

- **Google Antigravity (Advanced Agentic AI)**:
  - Architecture planning and directory scaffolding.
  - GLSL fragment shader development: converted collidingScopes preset into an obsidian black liquid metal shader with specular highlights and rim lighting.
  - Responsive Golden Ratio hero layout integration.
  - Tamil script storefront signboard integration (`செல் கேர்`).
  - Strict compliance with Apple trademark disclaimers and Indian Digital Personal Data Protection (DPDP) Act legal pages.

---

## Legal Notes

1. **Open Source Compliance**:
   - All third-party libraries and code used (collidingScopes, Ashima Arts noise, Lucide, Tailwind, Inter) are licensed under permissive open-source licenses (**MIT**, **ISC**, **SIL OFL 1.1**).
   - Commercial use and redistribution are fully permitted.

2. **Apple Trademark Notice**:
   - "Apple", "iPhone", "iPad", "True Tone", and "Face ID" are registered trademarks of Apple Inc.
   - The site operates as an independent third-party laboratory and explicitly displays a mandatory legal trademark disclaimer in the footer to ensure trademark compliance.

3. **Confidentiality & Privacy Checklist (Before Sharing Publicly)**:
   - **No Secrets / No API Keys**: The codebase contains zero tokens, secrets, or database credentials.
   - **Business Data**: Contains real business details for CELL CARE:
     - Phone / WhatsApp: `+91 9715253113`
     - Physical Address: `21, S Veli St, South Gate, Periyar, Madurai Main, Madurai, Tamil Nadu 625001`
     - Google Maps: `https://maps.app.goo.gl/5zSLt64Udb9EwrMt9`
   - *Tip if forking as a template*: Replace the phone number and address with placeholders before publishing to public GitHub repositories if you do not own the business.

4. **Code Provenance**:
   - **AI-Generated / AI-Architected**: GLSL fragment shader adaptations, CSS glassmorphism styles, live dynamic operating hours algorithm, responsive markup structure.
   - **User-Directed**: Storefront signboard photo references, working hours timetable (Sunday holiday), verified phone numbers, Google Maps shortlink.

---

## Shareable Summary (Short version for friends)

> **CELL CARE Web Project — Tech Stack at a Glance**
>
> • **Frontend**: Vanilla HTML5 + CSS3 + Modern ES6+ JavaScript (Zero build step, 100% static).
> • **Interactive Emblem**: Custom WebGL 1.0 GLSL shader creating an interactive Obsidian Liquid Black Apple Logo with procedural Simplex 3D noise and mouse wave dynamics (adapted from `collidingScopes/liquid-logo`, MIT).
> • **Styling**: Tailwind CSS (CDN) + Custom Liquid Glassmorphism CSS (`backdrop-filter`).
> • **Typography & Icons**: Inter Font (Google Fonts, OFL) + Lucide Icons (ISC).
> • **Color Theory**: Minimalist Obsidian Black (`#111113`) & Platinum Monochrome with subtle champagne gold provenance accents.
> • **Zero Backend / Zero Trackers**: No database, no tracking cookies, pure instant client-side performance.
> • **Built with**: Pair-programmed using Google Antigravity.
