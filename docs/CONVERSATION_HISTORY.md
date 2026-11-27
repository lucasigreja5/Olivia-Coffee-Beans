# Conversation & Release History — Olívia's Coffee Beans

Chronological summary of design alignment, feature milestones, generated media assets, and browser QA verification from initial Figma build through `v0.3`.

---

## `v0.1` — Initial Figma Prototype & Git Baseline (`9c38a41`, `8b60948`)
- Built the initial single-SKU storefront from the **Olívia's Coffee Beans Ecom v1** Figma file with `#view-home`, `#view-features`, `#view-cart`, and `#view-confirmation`, preserving `.github/workflows/static.yml` and `.github/workflows/jekyll-gh-pages.yml`.
- Polished desktop checkout spacing (`8b60948`, tagged `v0.1`).

## `v0.1.1` — Milestone 1: Multi-SKU Bilingual Storefront (`aea2a3b`)
- Expanded the catalog to 5 Brazilian specialty coffee SKUs (`starter-pack`, `cerrado-gold`, `serra-verde`, `chapada-decaf`, `discovery-flight`) with custom `1024x1024` pouch renders (`assets/product-*.png`).
- Added full `EN` (`$`) and `PT-BR` (`R$`) i18n dictionary (`data/i18n.js`, `231` keys/language), `#shop` roast category filters & sorting, Product Configurator modal (`250g`/`500g`/`1kg`, 4 grinds, one-time vs. 15% off subscription), slide-out Cart Drawer (`#cart-drawer`), `OLIVIA15`/`BEMVINDO15`/`FREESHIP` promo codes, and `localStorage` persistence (`ocb_state_v1`).

## `v0.1.2` — Milestone 2: Coffee Match Quiz, Impact Tracker & Case Study (`d555459`, `4b86c67`)
- Added removable pre-`v1.0` `qa-viewport.js` switcher (`Full / Tablet / Mobile`).
- Implemented the 3-step **Find Your Perfect Roast** Coffee Match Quiz (`#quiz-modal`), **Origin & Impact Tracker** (`#impact-tracker` slider + lot allocation telemetry inside `#view-features`), and **UX/UI Case Study** (`#view-case-study`), expanding i18n to `317` keys per language.

## `v0.1.3` — Figma Components (`103:57`) & Style Guides (`68:5`) (`4b93ffe`)
- Imported 13 component SVG primitives (`switch-*`, `star-*`, `checkbox-*`, `logo-*`) and expanded `:root` CSS tokens in `styles.css` to match Figma Style Guides (`68:5`).
- Wired Figma `Switch` & `Checkbox` components into `#product-modal`, `#quiz-modal`, and `#view-cart` (`323` EN/PT-BR i18n keys).

## `v0.2` — 1:1 Figma Product Card, Primary 1 Drawer & LanguageToggle (`a1c1b84`, `d1cbe29`)
- Updated branded kraft ziplock pouch photography and restored the original Figma hero (`a1c1b84`).
- Refactored `buildProductCardHtml(p)` in `app.js` to match Figma `ProductCard` (`141:1687`): clickable `#E7DBCF` card (`8px` radius, subtle shadow, inset `#1E3526` media frame, centered `#216756` uppercase title and description, price/button/tags removed from card face).
- Updated `#mobile-drawer` text and close icon (`assets/icon-close-green.svg`) to Primary 1 (`#216756`) and aligned `.lang-toggle` colors (`#216756` track, `#1E3526` active thumb, `#E7DBCF` text) per Figma `485:1473`.

## `v0.2.1` – `v0.2.3` — Section Refinements, 6th SKU & Newsletter Removal (included in `ea01269`)
- **`v0.2.1`:** Cleaned **Featured Roasts** subtitles, displayed all roasts directly on desktop, renamed CTA to **Learn More About Our Roasts**, and generated coffee warehouse hero photography (`assets/quiz-banner-coffee-warehouse.jpg`).
- **`v0.2.2`:** Updated **Brewing Social Equity** (`#view-home` benefits section) with a full-bleed aerial Brazilian solar coffee farm photograph (`assets/benefits-farm-aerial.jpg`), removed `"Why Olívia"` eyebrow, styled the 3 pillars (`100% Traceable Lots`, `Carbon-Neutral Roasting`, `Community Reinvestment`) as floating translucent liquid-glass cards, and made **Read Full Impact Story** a large solid CTA.
- **`v0.2.3`:** Converted **Find Your Perfect Roast** into an oversized clickable banner card inside Featured Roasts & Shop (`#shop`), launched 6th SKU **Mantiqueira Morning Bloom** (`assets/product-mantiqueira-bloom.jpg`) positioned after **Chapada Honey Decaf** (with **Roaster's Discovery Flight** last), showed all 6 products across Desktop/Tablet/Mobile, aligned **Featured Roasts** heading styling with **Brewing Social Equity** (`#216756`), and removed the newsletter signup UI and assets (`assets/newsletter-beans-bg.png`, `assets/newsletter-glass.png`).

## `v0.3` — Archive Review Sections, White Backgrounds & Customer Portraits (`ea01269`)
- **Archived for `v1.0` Decision:** Commented out / preserved **Beginner Brewing Guides**, **Frequently Asked Questions**, and **UX/UI Case Study** (plus `#case-study` route fallback and nav/drawer/footer links) under explicit `TODO(v1.0)` markers in `index.html` and `app.js` rather than deleting underlying code/data.
- **White Backgrounds:** Set `.featured-section`, `.reviews-section`, `.view--shop`, `body[data-view="shop"]`, and inactive `.filter-pill` backgrounds to `#FFFFFF`.
- **Loved by Home Baristas Cleanup & Card Match:** Removed `"COMMUNITY VOICES"` eyebrow and subtitle from `.reviews-section`; restyled `.review-card` to match `.product-card` (`#E7DBCF`, `8px` radius, `0 4px 4px rgba(0,0,0,0.25)` shadow, `#216756` Primary 1 ink, hover lift, `border-top: none` removing internal divider lines).
- **Customer Portraits:** Generated three `1024x1024` natural-light editorial portraits (`assets/reviewer-camila.jpg`, `assets/reviewer-marcus.jpg`, `assets/reviewer-sofia-rafael.jpg`), wired into `rev-1`–`rev-3` (`data/products.js`, `app.js`), and removed the `.review-verified` pill.
- **Browser QA (`localhost:8765`, Desktop `1440x900` EN & PT-BR, Tablet `768x1024`, Mobile `402x874`):** Verified `rgb(255, 255, 255)` section/view backgrounds, `reviewsEyebrowCount=0`, `reviewsSubtitleCount=0`, `verifiedPillCount=0`, `rgb(231, 219, 207)` / `8px` / `borderTopWidth=0px` review cards, `3/3` loaded `1024x1024` portraits, `overflow=false`, `broken=[]`, `0` console errors, and `0` failed local requests.
