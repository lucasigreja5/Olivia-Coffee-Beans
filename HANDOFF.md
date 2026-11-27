# Olívia's Coffee Beans — Cross-Machine Handoff (`v0.3`)

- **Project:** Olívia's Coffee Beans E-Commerce Storefront
- **Current Version:** `v0.3`
- **Branch / Origin:** `main` (`https://github.com/lucasigreja5/Olivia-Coffee-Beans.git`)
- **Primary Figma Design:** [Olívia's Coffee Beans Ecom v1](https://www.figma.com/design/V78KcA8hZVRIvB6y1Hh7T4/Ol%C3%ADvia-s-Coffee-Beans-Ecom-v1) (`ProductCard`: `141:1687`, `LanguageToggle`: `485:1473`)
- **Architecture:** Zero-build static storefront (`HTML5` + `CSS3` + vanilla ES6 `JavaScript`) configured for GitHub Pages deployment.

---

## 1. File & Folder Manifest

| Path | Purpose |
| :--- | :--- |
| `index.html` | Multi-view SPA shell (`#view-home`, `#view-shop`, `#view-features`, `#view-cart`, `#view-confirmation`), `#product-modal`, `#quiz-modal`, `#cart-drawer`, and archived `TODO(v1.0)` sections |
| `styles.css` | Core Figma Style Guides tokens (`:root`), responsive typography/grids, Featured Roasts, white section/view backgrounds (`#FFFFFF`), `1:1` Product Card & Review Card styling, modals, drawer, and footer |
| `m2-styles.css` | Styles for Coffee Match Quiz, Brew Social Equity liquid-glass farm banner, Farm-to-Cup Origin Impact Tracker, and archived Case Study components |
| `app.js` | Hash routing, state persistence (`localStorage` key `ocb_state_v1`), `EN` / `PT-BR` i18n renderer, 6-SKU catalog & filter/sort rendering, product configurator, cart drawer, promo logic, checkout, and customer review cards |
| `m2-features.js` | Coffee Match Quiz (`#quiz-modal`), Origin & Impact Tracker (`#impact-tracker` slider + lot breakdown), and Case Study specimen hooks |
| `data/products.js` | `window.OCB_CATALOG`: 6 Brazilian specialty coffee SKUs (`starter-pack`, `cerrado-gold`, `serra-verde`, `chapada-decaf`, `mantiqueira-bloom`, `discovery-flight`), bag/grind/cadence rules, customer reviews (`rev-1`..`rev-3` with portraits), plus archived FAQ & brewing guide data |
| `data/i18n.js` | `window.OCB_I18N` and `window.OCB_FORMAT_PRICE` (`en` USD `$` and `pt-BR` BRL `R$`) |
| `data/m2-data.js` | `window.OCB_M2` deterministic quiz recommendations and 5-lot impact telemetry |
| `qa-viewport.js` | Pre-`v1.0` floating `QA Full / Tablet (768px) / Mobile (402px)` preview toolbar (`TODO(v1.0)` removal) |
| `assets/` | `47` images/SVGs (Figma UI icons, switches, checkboxes, stars, logos, branded kraft coffee pouch photos, roastery quiz banner, aerial solar farm hero, and 3 customer portrait `.jpg` files) |
| `.github/workflows/` | GitHub Pages CI/CD workflows (`static.yml`, `jekyll-gh-pages.yml`) |
| `HANDOFF.md` | This cross-machine handoff guide |
| `docs/CONVERSATION_HISTORY.md` | Chronological release & decision log (`v0.1` -> `v0.3`) |
| `docs/WALKTHROUGH.md` | Sanitized milestone & verification walkthrough |
| `docs/history/conversation_log.json` | Sanitized `USER_INPUT` / `PLANNER_RESPONSE` conversation transcript |
| `skills/` *(ZIP bundle only)* | Custom Antigravity skills (`prepare-handoff/SKILL.md`) for restoration on the target machine |

---

## 2. Technical Invariants

1. **Zero-Build Runtime:** No `package.json`, bundler, or compile step is required or desired; serve directly over any static HTTP server (`http://localhost:<port>/`). Always test via HTTP (not `file://`), using `Cache-Control: no-store` during QA.
2. **Bilingual Parity (`EN` / `PT-BR`):** Every user-facing string must remain localized in both `en` (`$`) and `pt-BR` (`R$`) across `data/i18n.js`, `data/products.js`, and `data/m2-data.js`.
3. **Cart Persistence:** Cart items, language preference, promo code, and checkout state persist in `localStorage` under `ocb_state_v1`.
4. **Figma Visual Parity (`103:57` & `68:5`):**
   - Primary 1 (`#216756`), Primary 2 (`#1E3526`), Secondary 1 (`#E7DBCF`), Accent 1 (`#FEC51B`).
   - Product Cards & Customer Review Cards share `#E7DBCF`, `8px` radius, `0 4px 4px rgba(0,0,0,0.25)` shadow, `#216756` ink, hover lift, and no internal divider lines.
   - Page backgrounds on **Featured Roasts**, **Loved by Home Baristas**, and **Our Roasts & Flights (`#shop`)** use `#FFFFFF`.

---

## 3. Explicit `TODO(v1.0)` Decision & Cleanup Checklist

Before shipping **`v1.0`**, review and decide on these intentionally preserved items:

- [ ] **Beginner Brewing Guides** (`.brew-guide-section` in `index.html`, tab handlers in `app.js`, guide items in `data/products.js`): decide whether to restore to `#home` or delete permanently.
- [ ] **Frequently Asked Questions** (`.faq-section` in `index.html`, accordion renderer in `app.js`, FAQ items in `data/products.js`): decide whether to restore to `#home` or delete permanently.
- [ ] **UX/UI Case Study** (`#view-case-study`, `data-nav="case-study"` nav/drawer/footer links, `#case-study` route fallback in `app.js`, `.review-card--dark` specimen CSS): decide whether to restore or permanently remove.
- [ ] **Remove QA Viewport Switcher:** Remove `<script src="qa-viewport.js">` from `index.html` and delete `qa-viewport.js` prior to public `v1.0` release.

---

## 4. Rebuild & Resume on Another Computer

1. **Extract ZIP or Clone Repo:**
   ```bash
   git clone https://github.com/lucasigreja5/Olivia-Coffee-Beans.git
   cd "Olivia-Coffee-Beans"
   git checkout main
   ```
   *(If extracting from `olivia-coffee-v0.3-<ddmmyy>-<hhmm>.zip`, the full `.git/` history is already included inside `olivia-coffee-v0.3/`.)*

2. **Restore Custom Antigravity Skills:**
   Copy the bundled `skills/` folder into your Antigravity user skills directory on the target machine:
   - **Windows (PowerShell):**
     ```powershell
     New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.gemini\config\skills" | Out-Null
     Copy-Item -Recurse -Force ".\skills\*" "$env:USERPROFILE\.gemini\config\skills\"
     ```
   - **macOS / Linux:**
     ```bash
     mkdir -p ~/.gemini/config/skills
     cp -R ./skills/* ~/.gemini/config/skills/
     ```

3. **Plugins Required (if continuing with Antigravity):**
   Ensure the **`figma`** and **`gdrive`** Marketplace plugins are installed and authenticated in Antigravity Plugin Manager.

4. **Run Local Preview Server:**
   ```bash
   python -m http.server 8765
   ```
   Open `http://localhost:8765/#home` in Chrome/Edge/Firefox to inspect Desktop, Tablet (`768px`), and Mobile (`402px`) layouts (or use the bottom-left QA pill).
