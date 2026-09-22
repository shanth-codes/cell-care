# 🔬 CELL CARE — Apple Specialist Repair Lab

[![Live Website](https://img.shields.io/badge/Website-Live%20on%20Vercel-black?style=for-the-badge&logo=vercel)](https://cell-care-shanth-codes.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-Vanilla%20HTML5%20%7C%20CSS3%20%7C%20WebGL-blue?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/WebGL)
[![License: MIT](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)](LICENSE)
[![Zero Trackers](https://img.shields.io/badge/Privacy-100%25%20Zero%20Telemetry-green?style=for-the-badge)](#privacy--telemetry)

> **Established in 1998**, CELL CARE is Madurai's pioneer mobile service centre and an independent specialist laboratory dedicated exclusively to precision **Apple iPhone, iPad, and Apple Watch hardware repair**. Located on South Veli Street, CELL CARE delivers microscopic chip-level diagnostics, True Tone display calibration, Face ID restoration, and certified battery replacements.

---

## 🌐 Live Experience

- **Production URL**: [https://cell-care-shanth-codes.vercel.app](https://cell-care-shanth-codes.vercel.app)
- **Storefront Location**: 21, South Veli Street, South Gate, Periyar, Madurai Main, Tamil Nadu 625001
- **Direct Consultation**: [WhatsApp Chat](https://wa.me/919715253113) · [Call: +91 9715253113](tel:+919715253113)

---

## 📖 About CELL CARE

CELL CARE was founded in 1998 as one of South Tamil Nadu's earliest dedicated mobile hardware service centers. Over more than 25 years of continuous bench operation, the lab has evolved into a specialized hardware engineering facility focusing on Apple devices:

- **Micro-Soldering & Logic Board Diagnostics**: Repairing short circuits, blown capacitors, PMIC failures, and audio IC loops under high-power stereo microscopes.
- **Display & True Tone Restoration**: OEM-grade OLED and LCD panel replacements with EEPROM serial reprogramming to retain True Tone and ambient light sensor functionality.
- **Face ID & Biometric Sensor Repair**: Laser realignment and dot projector flex cable micro-soldering to restore true Face ID biometric authentication.
- **Battery Health Calibration**: Bumper-safe battery cell replacements programmed to avoid battery health warning loops.
- **Water Damage Recovery**: Multi-stage ultrasonic cleaning and board corrosion neutralization.

---

## 🎨 Web Architecture & Design Highlights

The website is engineered with a **zero-build, pure client-side static architecture** that combines high-performance rendering with Apple Pro luxury aesthetics:

1. **Interactive WebGL Liquid Metal Emblem (`js/liquid-logo.js`)**:
   - Custom WebGL 1.0 / GLSL fragment shader rendering a dynamic, liquid-metal Apple emblem.
   - Reacts smoothly to cursor trajectory, acceleration, and mobile touch ripples at 60 FPS using Simplex 3D noise fluid turbulence.
   - Built natively on HTML5 `<canvas>` with zero heavy 3D engine overhead (e.g., no Three.js bundle penalty).

2. **Obsidian Black & Platinum Monochrome Theme**:
   - Designed around Apple Pro dark mode aesthetics (`#111113` obsidian surface, `#1d1d1f` charcoal elevation, platinum typography).
   - Architectural glassmorphism using native CSS3 `backdrop-filter: blur(20px) saturate(180%)`.

3. **Live Operating Hours Engine (`js/main.js`)**:
   - Real-time client clock engine that computes current store status (Open, Closing Soon, Closed, Sunday Holiday) against Madurai local time (IST).
   - Automatically updates badges and status indicators across the interface.

4. **100% Zero Telemetry & Instant Load**:
   - Zero tracking scripts, zero third-party analytics pixels, zero external cookies.
   - Instant first contentful paint (FCP) and full compliance with the Indian Digital Personal Data Protection (DPDP) Act.

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technology | Version / Distribution | Integration Method | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Markup** | HTML5 | Living Standard | Native files (`index.html`, etc.) | Semantic structure, accessibility (`aria-*`), SEO metadata. |
| **Styling** | CSS3 / PostCSS | CSS Variables + Backdrop Filter | `css/style.css` | Custom glassmorphism, physics transitions, layout polish. |
| **CSS Utility** | Tailwind CSS | v3 (Play CDN) | `<script src="https://cdn.tailwindcss.com">` | Rapid utility layout, responsive breakpoints, flex/grid. |
| **Typography** | Inter | Weights 300–800 | Google Fonts CDN via `@import` | Primary brand sans-serif font stack. |
| **Iconography** | Lucide Icons | Latest | `<script src="https://unpkg.com/lucide@latest">` | Clean line icons, rendered via `lucide.createIcons()`. |
| **Graphics** | WebGL 1.0 / GLSL | OpenGL ES Shading Language 1.00 | Native `<canvas>` in `js/liquid-logo.js` | Interactive 60fps liquid metal fluid dynamics shader. |
| **Scripting** | JavaScript (ES6+) | Vanilla (No Framework) | `js/main.js`, `js/liquid-logo.js` | Navigation, live business hours engine, FAQ accordion. |

---

## 📂 Project Structure

```
cell-care/
├── index.html              # Primary storefront & service catalog
├── 404.html                # Custom error page
├── privacy.html            # Privacy Policy (DPDP / GDPR compliant)
├── terms.html              # Terms of Service & repair warranty policies
├── refund.html             # Refund & cancellation policy
├── cookie-policy.html      # Cookie disclaimer (Zero tracking cookies)
├── css/
│   └── style.css           # Glassmorphism, animations, & custom styles
├── js/
│   ├── main.js             # Navigation, dynamic operating hours, FAQs
│   └── liquid-logo.js      # WebGL GLSL liquid metal shader engine
├── assets/                 # Storefront signboards, device graphics
├── favicon.svg             # Minimalist monochrome favicon
└── README.md               # Documentation & repository guide
```

---

## ⚖️ Open-Source Attributions & Licenses

| Project / Component | Source URL | Author / Maintainer | License | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Liquid Logo WebGL Engine** | [github.com/collidingScopes/liquid-logo](https://github.com/collidingScopes/liquid-logo) | collidingScopes | **MIT License** | Core WebGL vector field animation pipeline, adapted into an Obsidian Black liquid metal shader with custom specular reflections and mouse ripple physics. |
| **Liquid Glass JS** | [github.com/dashersw/liquid-glass-js](https://github.com/dashersw/liquid-glass-js) | Şerif Ceylan (@dashersw) | **MIT License** | Design reference for fluid optical glass distortion and refractions. |
| **Simplex 3D Noise GLSL** | Included in shader source | Ian McEwan, Ashima Arts, Stefan Gustavson | **MIT License** | WebGL GLSL procedural 3D noise functions generating fluid turbulence across the liquid metal logo. |
| **Lucide Icons** | [github.com/lucide-icons/lucide](https://github.com/lucide-icons/lucide) | Lucide Project | **ISC License** | SVG iconography (phone, navigation, award, calendar, shield, etc.). |
| **Inter Font Family** | [github.com/rsms/inter](https://github.com/rsms/inter) | Rasmus Andersson (@rsms) | **SIL OFL 1.1** | Grotesque typographic hierarchy across all pages. |
| **Tailwind CSS** | [github.com/tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) | Tailwind Labs Inc. | **MIT License** | Client-side utility CSS styling. |

---

## 🔒 Legal & Trademark Disclaimers

1. **Independent Service Provider**:
   - CELL CARE is an independent repair lab and is **not affiliated with, authorized by, or endorsed by Apple Inc.**
   - "Apple", "iPhone", "iPad", "Apple Watch", "True Tone", and "Face ID" are registered trademarks of Apple Inc. All trademarks belong to their respective owners and are used strictly for device identification purposes.

2. **Privacy by Design**:
   - The site operates without databases, user tracking, or advertising scripts. Contact links utilize direct protocols (`tel:`, `wa.me:`, and Google Maps links).

---

## 🚀 Quick Start (Local Preview)

Since this project has **zero build dependencies**, you can run it directly:

```bash
# Clone the repository
git clone https://github.com/shanth-codes/cell-care.git
cd cell-care

# Serve locally with any static web server (e.g. VS Code Live Server, or Python)
python -m http.server 8080
```

Then open `http://localhost:8080` in any modern web browser.
