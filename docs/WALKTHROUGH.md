# Walkthrough — Milestone 1 (`v0.1.1`): Olívia's Coffee Beans Storefront

## Summary

Milestone 1 (`v0.1.1`) expands **Olívia's Coffee Beans** from a single-SKU Figma prototype (`v0.1`) into a complete, bilingual (`EN` / `PT-BR`) direct-to-consumer specialty coffee storefront built with zero-build HTML5, CSS3, and vanilla ES6 JavaScript for GitHub Pages.

---

## Changes Made

### 1. Git Baseline Sync & Release Tagging
- Reconciled local `main` with `origin/main` (`9c38a41`, preserving `.github/workflows/static.yml` and `.github/workflows/jekyll-gh-pages.yml`) and committed the `v0.1` desktop checkout spacing polish (`8b60948`, tagged **`v0.1`**).
- Committed all verified `v0.1.1` additions and updates locally at **`aea2a3b`** (`"Release v0.1.1: bilingual 5-SKU DTC storefront, configurator, and cart drawer"`) and created annotated tag **`v0.1.1`** (local `main` is 2 commits ahead of `origin/main`, ready to push).

### 2. Bespoke Studio Product Photography (`assets/`)
Generated 4 cohesive `1024×1024` studio product PNGs on warm ivory (`#FFF2E6`) backdrops alongside the 24 preserved Figma assets (`28` total files in `assets/`):
- `assets/product-cerrado-gold.png` — **Cerrado Gold Espresso**
- `assets/product-serra-verde.png` — **Serra Verde Single-Origin**
- `assets/product-chapada-decaf.png` — **Chapada Honey Decaf**
- `assets/product-discovery-flight.png` — **Roaster's Discovery Flight (3×150g)**

### 3. Bilingual Data & Localization Engine (`data/`)
- **[data/products.js](../data/products.js)** (`window.OCB_CATALOG`):
  - **5 Brazilian Specialty SKUs**: `starter-pack`, `cerrado-gold`, `serra-verde`, `chapada-decaf`, and `discovery-flight`, complete with roast levels (`1–5`), origins, altitudes, processes, bilingual tasting notes, descriptions, and direct-trade lot metadata (`farm`, `harvestDate`, `roastDate`, `wagePremiumPct`, `co2OffsetKg`).
  - **Options & Pricing Rules**: Bag sizes (`250g`, `500g` at `1.85×`, `1kg` at `3.4×`), 4 grinds (`Whole Bean`, `Espresso`, `Pour-Over`, `French Press`), purchase cadences (`One-Time`, `Every 2 Weeks — Save 15%`, `Every 4 Weeks — Save 15%`), promo codes (`OLIVIA15`, `BEMVINDO15`, `FREESHIP`), and free carbon-neutral shipping rules (orders ≥ `$50.00` / `R$ 240,00` or any subscription item).
  - **Editorial & Trust Content**: 3 bilingual beginner brewing guides, 3 verified buyer reviews, and 5 FAQs.
- **[data/i18n.js](../data/i18n.js)** (`window.OCB_I18N`, `window.OCB_FORMAT_PRICE`):
  - Full `en` (`$`) and `pt-BR` (`R$`) dictionary across `231` parity-verified leaf keys per language.

### 4. Storefront UI, Styles & State (`index.html`, `styles.css`, `app.js`)
- **Persistent Navigation & Language Switch**: Added `ROASTS` (`#shop`), live `EN | PT` toggle pill across desktop header and `#FEC51B` mobile drawer, and `CART (n)` drawer trigger.
- **Expanded `#home` Landing Page**: Preserved the Figma hero above the fold inside `.home-hero-band`, followed by Featured Roasts, Built for Busy Mornings benefits, Beginner 3-Step Brewing Guide (interactive tabs), Verified Reviews, FAQ accordion, and shared Site Footer.
- **Curated Shop (`#shop`) & Product Configurator Modal (`#product-modal`)**: Roast category filters (`All Roasts`, `Espresso`, `Single-Origin`, `Decaf`, `Bundles`), sort selector, lot traceability summary, size/grind pills, Subscribe & Save `15%` cards, and live dynamic pricing.
- **Slide-Out Cart Drawer (`#cart-drawer`) & `localStorage` Persistence (`ocb_state_v1`)**: Multi-item cart with 4-tuple deduplication (`productId`, `size`, `grind`, `cadence`), Free Carbon-Neutral Shipping progress bar, promo code validation, and reload persistence.
- **Multi-Item Checkout (`#cart`) & Dynamic Receipt (`#confirmation`)**: Upgraded checkout summary for all configured items and added order reference (`#OCB-XXXX`), itemized totals, and CO₂ offset impact summary on confirmation.

---

## Verification Results

### Static & Parity Checks
- **Assets**: `28/28` files in `assets/` verified non-empty; `0` temporary Figma URLs remain; `28/28` referenced assets resolve on disk.
- **i18n & Syntax**: `231/231` key parity between `en` and `pt-BR` (`0` missing keys, `0` empty strings); `162` HTML `data-i18n*` attributes and `64` JS `t()` calls verified; CSS delimiter balance `550/550` braces.

### Live Browser QA (`1440×900` Desktop & `402×874` Mobile)
Verified against an uncached local server (`http://127.0.0.1:8767/`) in headless Chromium:
- **Console & Network**: `0` console errors, `0` page exceptions, `0` failed HTTP requests, `0` broken images (after adding `assets/logo-green.svg` favicon and increasing scrolled `#home` header contrast).
- **Layout & Responsiveness**: `0` horizontal overflow across `#home`, `#shop`, `#features`, `#cart`, and `#confirmation` on both Desktop and Mobile.
- **Interactive Flows Verified**:
  - `EN` ↔ `PT-BR` & `$` ↔ `R$` live switching across `#home`, `#shop`, and Cart Drawer (`$24.00` ↔ `R$ 119,00`; `$34.60` ↔ `R$ 171,40`).
  - `#shop` roast filtering (`all=5`, `espresso=2`, `single-origin=1`, `decaf=1`, `bundle=1`) and Product Configurator (`Cerrado Gold Espresso`, `500g`, `Espresso`, `Every 2 Weeks -15%` = `$34.60`).
  - Cart Drawer free-shipping bar, `OLIVIA15` promo code (`-$5.19` → `$29.41`), and `localStorage` persistence across hard reload.
  - `#features` 4 story bands + non-overlapping `ADD TO CART` toast, `#cart` multi-item summary + CVC click tooltip + empty-form validation styling, and `#confirmation` dynamic receipt.

---

## Milestone 2 (`v0.1.2`) — Coffee Match Quiz, Origin Impact Tracker & UX/UI Case Study

Committed locally at **`4b86c67`** (`"Release v0.1.2: Coffee Match Quiz, Origin Impact Tracker, and UX/UI Case Study"`, annotated tag **`v0.1.2`**).

### Changes Made in `v0.1.2`
1. **Bilingual Milestone 2 Data & Expanded i18n ([data/m2-data.js](../data/m2-data.js), [data/i18n.js](../data/i18n.js))**:
   - Added `window.OCB_M2` with a 3-step deterministic Coffee Match Quiz (`64` combinations mapped across all 5 SKUs), 5 lot-level Impact Tracker dossiers (`farmerPct` + `roastingPackPct` + `communityFundPct` = `100%`, clean water liters, school hours, and farmer earnings), and full bilingual Case Study content (Chloe persona, Pain → Solution → KPI matrix, `v0.1 → v0.1.1 → v0.1.2` evolution, Figma color tokens, and typography specimens).
   - Expanded `window.OCB_I18N` by `+86` keys per language (`317` keys in `en`, `317` keys in `pt-BR`, `100%` parity) and updated footer version strings to `v0.1.2`.
2. **Interactive Quiz, Impact Tracker & Case Study UI ([index.html](../index.html), [app.js](../app.js), [m2-features.js](../m2-features.js), [m2-styles.css](../m2-styles.css))**:
   - **3-Step Coffee Match Quiz (`#quiz-modal`)**: Launched from new Quiz CTA banners on `#home` and `#shop` (or `#quiz` hash); recommends a tailored roast, grind, size, and cadence with one-click `ADD MATCH TO CART` into `#cart-drawer` or `CUSTOMIZE FURTHER` in `#product-modal`.
   - **Farm-to-Cup Origin & Impact Tracker (`#impact-tracker` inside `#view-features`)**: Interactive 5-lot selector pills, 3-segment price breakdown bar, and `1–12` bags/year slider updating CO₂e offset, extra farmer income (`$`/`R$`), clean water liters, and rural school hours live.
   - **UX/UI Case Study (`#view-case-study` via `CASE STUDY` nav link)**: Presents the original Figma brief, Chloe persona, Pain Points Solved cards, interactive `v0.1 → v0.1.1 → v0.1.2` evolution cards, click-to-copy hex swatches, typography scale, and component state chips.
   - **Pre-`v1.0` QA Viewport Switcher ([qa-viewport.js](../qa-viewport.js))**: Removable bottom-left `Full / Tablet (768px) / Mobile (402px)` preview toolbar.

### `v0.1.2` Verification Results
- **Static & Parity Checks**: `28/28` assets present, `0` temp Figma URLs, `317/317` `en`/`pt-BR` i18n keys verified (`0` missing HTML or JS keys), `0` syntax errors across all 6 JS files, balanced CSS (`451` rules in `styles.css`, `228` rules in `m2-styles.css`).
- **Live Chromium QA (`1440×900`, `1024×768`, `402×874`)**:
  - Verified Quiz 3-step completion → Cart Drawer add, live `EN` ↔ `PT-BR` & `$` ↔ `R$` switching across Quiz/Impact/Case Study, Impact Tracker slider & zero overlap with floating `#features` CTA bar, Case Study swatch copy feedback + zero horizontal overflow, and `#ocb-qa-bar` Full/Tablet/Mobile switching (`0` uncaught exceptions, `0` JS errors, `0` local network failures).

---

## `v0.1.3` — Figma Components (`103:57`) & Style Guides (`68:5`) Alignment

Committed locally on `main` at **`4b93ffe`** (`"Release v0.1.3: Align UI primitives to Figma Components (103:57) and Style Guides (68:5)"`, annotated tag **`v0.1.3`**).

### Changes Made in `v0.1.3`
1. **13 New Figma `103:57` SVG Component Assets (`assets/`)**:
   - `switch-off.svg`, `switch-on.svg`, `star-empty.svg`, `star-half.svg`, `star-full.svg`, `checkbox-primary-on.svg`, `checkbox-secondary-on.svg`, `checkbox-accent-on.svg`, `checkbox-primary-outline-on.svg`, `checkbox-secondary-outline-on.svg`, `checkbox-accent-outline-on.svg`, `logo-accent.svg`, `logo-white.svg` (`41/41` total assets in `assets/`).
2. **Full Style Guides (`68:5`) Tokens & Figma Component Alignment ([styles.css](../styles.css), [m2-styles.css](../m2-styles.css))**:
   - Expanded `:root` with all `15` Figma `68:5` palette tokens (`--ocb-secondary-2`, `--ocb-accent-3`, `--ocb-gray-200`, `--ocb-gray-400`, `--ocb-gray-600`, radii & shadows).
   - Aligned **Button** (`116:112` solid/outline color & size classes), **Switch** (`116:64`), **Checkbox** (`117:514`), **Star** (`117:260`), **Text Field** (`118:614` including disabled state & promo/newsletter inputs), **Product Card** (`141:1687` / `147:686` `#E7DBCF` cards on `#FFF2E6` with `#1E3526` media box & centered `#216756` title), **ReviewCard** (`121:124` light/dark surfaces with `85×85` avatar & `5.0` star rating row), **Logo** (`121:48` 5 variants), and **Nav Drawer** (`124:1190`).
3. **Interactive Controls & Case Study Component Showcase ([index.html](../index.html), [app.js](../app.js), [m2-features.js](../m2-features.js), [data/i18n.js](../data/i18n.js), [data/m2-data.js](../data/m2-data.js))**:
   - Wired Figma `Switch` (`#pm-sub-switch`) for Subscribe & Save `15%`, Figma `Checkbox` into Delivery Cadences, Quiz Options, and Checkout optional composting card (`#field-compost-card`), `323/323` EN/PT-BR key parity, `15` Style Guide swatches, and live interactive Figma component specimens inside `#view-case-study`.

### `v0.1.3` Verification Results
- **Static & Parity Checks**: `41/41` assets present and non-empty, `0` temp Figma URLs, `323/323` `en`/`pt-BR` i18n keys (`190/190` HTML `data-i18n*` keys resolved), `qa-viewport.js` intact, balanced CSS (`598/598` braces in `styles.css`, `289/289` braces in `m2-styles.css`), `0` JS parse errors.
- **Live Chromium QA (`1440×900`, `1024×768`, `402×874`)**: Verified `#home`, `#shop`, `#features`, `#case-study`, `#cart`, `#product-modal` (`#pm-sub-switch` `$24.00 -> $20.40`), `#quiz-modal` → `#cart-drawer` (`OLIVIA15` `$40.80 -> $34.68`), Impact Tracker non-overlap, Case Study `15` swatches + interactive Figma specimens, `EN` ↔ `PT-BR` toggle, and `#ocb-qa-bar` with `0` console errors, `0` failed local requests, `0` broken images, and `0` horizontal overflow.



---

## `v0.2` — 1:1 Figma Product Card, Primary 1 Mobile Drawer & Updated LanguageToggle

Committed locally on `main` at **`d1cbe29`** (`"Release v0.2: 1:1 Figma Product Card, Primary 1 mobile drawer, and LanguageToggle colors"`, annotated tag **`v0.2`**).

### Changes Made in `v0.2`
1. **1:1 Figma Product Card (`147:686` / `141:1686` / `121:153`)**:
   - Refactored `buildProductCardHtml(p)` in [app.js](../app.js) to render each card as a `<button type="button" class="product-card">` containing only the inset `#1E3526` media box, centered `#216756` uppercase title, and centered `#216756` description on `#E7DBCF` (`8px` radius, `0 4px 4px rgba(0,0,0,0.25)` shadow), removing badges, origin/roast dots, tasting tags, footer price, and the `CONFIGURE BAG` button. Clicking anywhere on the card opens `#product-modal`.
   - Added button reset & hover styling in [styles.css](../styles.css).
2. **Slide-Out Hamburger Menu (`#mobile-drawer`) in OCB Primary 1 (`#216756`)**:
   - Added [icon-close-green.svg](../assets/icon-close-green.svg) from Figma `Nav` (`124:1190`) and updated `#drawer-close-btn` and `.drawer-logo` in [index.html](../index.html).
   - Updated `.drawer-link` and `.drawer-newsletter-btn` in [styles.css](../styles.css) to `var(--ocb-primary-1)` (`#216756`).
3. **Updated Figma `LanguageToggle` (`485:1473` / `485:1514`) Colors**:
   - Updated `.lang-toggle`, `.lang-btn`, `.lang-toggle--drawer`, and `.lang-toggle--figma` in [styles.css](../styles.css) to `#216756` (`OCB - Primary 1`) track, `#1E3526` (`OCB - Primary 2`) active pill, and `#E7DBCF` (`OCB - Secondary 1`) `EN`/`PT` labels, removing the old `#E7DBCF`-track drawer/cart overrides.
4. **Version Bump to `v0.2`**:
   - Updated footer, case study evolution timeline, and EN/PT-BR strings in [index.html](../index.html), [m2-features.js](../m2-features.js), [data/i18n.js](../data/i18n.js), and [data/m2-data.js](../data/m2-data.js).

### `v0.2` Verification Results
- **Headless Chromium QA (`1440×900` Desktop & `402×874` Mobile)**:
  - `DESKTOP_CHECK`: `overflow=false (1425/1440)`, `broken=[]`
  - `MOBILE_CHECK`: `overflow=false (402/402)`, `broken=[]`
  - `PT_TEST`: `pt-BR|PROJETANDO A OLÍVIA COFFEE BEANS`
  - `CONSOLE_ERRORS`: none; `LOCAL_FAILED`: none.
  - Visually inspected screenshots (`v13-desktop-featured.png`, `v13-desktop-shop.png`, `v13-mobile-drawer-lang.png`, `v13-mobile-featured.png`, `v13-desktop-lang-pt.png`) confirming exact Figma Product Card layout, `#216756` mobile drawer text/icons, and updated `#216756`/`#1E3526`/`#E7DBCF` LanguageToggle.

---

## `v0.3` — Streamlined Live Storefront (Pre-`v1.0` Holdover Archive)

### Changes Made in `v0.3`
1. **Archived Live Sections Without Deleting Underlying Build**:
   - Commented out **Beginner Brewing Guides** (`.brew-guide-section`), **Frequently Asked Questions** (`.faq-section`), and **Case Study** (`#view-case-study` + desktop nav, mobile drawer, and footer links) in [index.html](../index.html) with explicit `TODO(v1.0)` markers.
   - Removed `'case-study'` from `VALID_VIEWS` in [app.js](../app.js) so direct `#case-study` hashes fall back cleanly to `#home`.
   - Kept all JS renderers (`renderBrewGuide()`, `renderFaqs()`, `renderCaseStudy()`), CSS rules, and data (`brewGuides`, `faqs`, `caseStudy`) intact for easy restoration.
2. **Version `v0.3` Metadata**:
   - Updated footer, i18n, and evolution data across [index.html](../index.html), [data/i18n.js](../data/i18n.js), [data/m2-data.js](../data/m2-data.js), and [m2-features.js](../m2-features.js).

> [!IMPORTANT]
> **Pre-`v1.0` Decision Checklist (`TODO(v1.0)`)**
> Before shipping **`v1.0`**, review and decide:
> 1. **Restore vs. Permanently Delete**: Decide whether to restore or permanently strip out **Beginner Brewing Guides**, **Frequently Asked Questions**, and **Case Study** (all currently commented out with `TODO(v1.0)` in `index.html` and `app.js`).
> 2. **QA Toolbar**: Remove `qa-viewport.js` and its `<script>` tag from `index.html`.
