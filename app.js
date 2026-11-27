(function () {
  'use strict';

  var STORAGE_KEY = 'ocb_state_v1';
  var VALID_VIEWS = ['home', 'shop', 'features', 'case-study', 'cart', 'confirmation'];

  var CATALOG = window.OCB_CATALOG || {};
  var I18N = window.OCB_I18N || {};
  var formatPrice = window.OCB_FORMAT_PRICE || function (usd, brl, lang) {
    return String(lang || 'en').indexOf('pt') === 0
      ? 'R$ ' + Number(brl || 0).toFixed(2).replace('.', ',')
      : '$' + Number(usd || 0).toFixed(2);
  };

  var state = {
    view: 'home',
    lang: 'en',
    cart: [],
    promoCode: null,
    lastOrder: null,
    shopCategory: 'all',
    shopSort: 'featured',
    activeBrewId: 'espresso',
    userEmptiedCart: false,
    modal: {
      productId: null,
      sizeId: '250g',
      grindId: 'espresso',
      cadenceId: 'one-time',
      qty: 1
    },
    toastTimer: null,
    isSubmitting: false
  };

  // DOM References
  var views = document.querySelectorAll('.view');
  var mobileMenuBtn = document.getElementById('mobile-menu-btn');
  var mobileDrawer = document.getElementById('mobile-drawer');
  var drawerBackdrop = document.getElementById('drawer-backdrop');
  var drawerCloseBtn = document.getElementById('drawer-close-btn');

  var navCartCount = document.getElementById('nav-cart-count');
  var drawerCartCount = document.getElementById('drawer-cart-count');
  var langButtons = document.querySelectorAll('.lang-btn[data-lang]');

  // Home dynamic containers
  var featuredGrid = document.getElementById('featured-products-grid');
  var brewTabsEl = document.getElementById('brew-tabs');
  var brewPanelEl = document.getElementById('brew-guide-panel');
  var reviewsGrid = document.getElementById('reviews-grid');
  var faqList = document.getElementById('faq-list');

  // Shop DOM
  var shopFiltersEl = document.getElementById('shop-filters');
  var shopSortEl = document.getElementById('shop-sort');
  var shopResultsCount = document.getElementById('shop-results-count');
  var shopGrid = document.getElementById('shop-products-grid');
  var shopEmpty = document.getElementById('shop-empty');
  var shopResetBtn = document.getElementById('shop-reset-btn');

  // Product Modal DOM
  var productModal = document.getElementById('product-modal');
  var pmImage = document.getElementById('pm-image');
  var pmKraftLogo = document.getElementById('pm-kraft-logo');
  var pmLotCard = document.getElementById('pm-lot-card');
  var pmOrigin = document.getElementById('pm-origin');
  var pmRoast = document.getElementById('pm-roast');
  var pmTitle = document.getElementById('pm-title');
  var pmDescription = document.getElementById('pm-description');
  var pmTastingTags = document.getElementById('pm-tasting-tags');
  var pmSizes = document.getElementById('pm-sizes');
  var pmFixedSizeNote = document.getElementById('pm-fixed-size-note');
  var pmGrinds = document.getElementById('pm-grinds');
  var pmSubSwitch = document.getElementById('pm-sub-switch');
  var pmSubSwitchImg = document.getElementById('pm-sub-switch-img');
  var pmCadences = document.getElementById('pm-cadences');
  var pmQtyDec = document.getElementById('pm-qty-dec');
  var pmQtyVal = document.getElementById('pm-qty-val');
  var pmQtyInc = document.getElementById('pm-qty-inc');
  var pmPrice = document.getElementById('pm-price');
  var pmAddBtn = document.getElementById('pm-add-btn');

  // Cart Drawer DOM
  var cartDrawer = document.getElementById('cart-drawer');
  var cartDrawerBackdrop = document.getElementById('cart-drawer-backdrop');
  var cdShippingText = document.getElementById('cd-shipping-text');
  var cdShippingFill = document.getElementById('cd-shipping-fill');
  var cdItemsEl = document.getElementById('cd-items');
  var cdEmptyEl = document.getElementById('cd-empty');
  var cdBrowseBtn = document.getElementById('cd-browse-btn');
  var cdFooterEl = document.getElementById('cd-footer');
  var cdPromoForm = document.getElementById('cd-promo-form');
  var cdPromoInput = document.getElementById('cd-promo-input');
  var cdPromoFeedback = document.getElementById('cd-promo-feedback');
  var cdPromoChip = document.getElementById('cd-promo-chip');
  var cdPromoChipText = document.getElementById('cd-promo-chip-text');
  var cdPromoRemoveBtn = document.getElementById('cd-promo-remove-btn');
  var cdSubtotal = document.getElementById('cd-subtotal');
  var cdDiscountRow = document.getElementById('cd-discount-row');
  var cdDiscount = document.getElementById('cd-discount');
  var cdShippingVal = document.getElementById('cd-shipping-val');
  var cdTotal = document.getElementById('cd-total');
  var cdCheckoutBtn = document.getElementById('cd-checkout-btn');

  // Features Toast DOM
  var addToCartBtn = document.getElementById('add-to-cart-btn');
  var cartToast = document.getElementById('cart-toast');
  var toastCloseBtn = document.getElementById('toast-close-btn');
  var toastSubtitle = document.getElementById('toast-subtitle');

  // Checkout DOM
  var checkoutItemsList = document.getElementById('checkout-items-list');
  var checkoutEmptyNotice = document.getElementById('checkout-empty-notice');
  var checkoutBreakdown = document.getElementById('checkout-breakdown');
  var checkoutSubtotal = document.getElementById('checkout-subtotal');
  var checkoutDiscountRow = document.getElementById('checkout-discount-row');
  var checkoutDiscount = document.getElementById('checkout-discount');
  var checkoutShipping = document.getElementById('checkout-shipping');
  var cartFinalPrice = document.getElementById('cart-final-price');
  var checkoutForm = document.getElementById('checkout-form');
  var purchaseBtn = document.getElementById('purchase-btn');
  var emailInput = document.getElementById('field-email');
  var addressInput = document.getElementById('field-address');
  var cardNameInput = document.getElementById('field-card-name');
  var cardNumberInput = document.getElementById('field-card-number');
  var expiryInput = document.getElementById('field-expiry');
  var cvcInput = document.getElementById('field-cvc');
  var compostCardInput = document.getElementById('field-compost-card');
  var cvcInfoBtn = document.getElementById('cvc-info-btn');
  var cvcTooltip = document.getElementById('cvc-tooltip');

  // Animation & Confirmation DOM
  var purchaseAnimation = document.getElementById('purchase-animation');
  var packStage = document.getElementById('pack-stage');
  var confirmOrderId = document.getElementById('confirm-order-id');
  var confirmOrderSummary = document.getElementById('confirm-order-summary');
  var confirmImpactNote = document.getElementById('confirm-impact-note');
  var socialShareBtn = document.getElementById('social-share-btn');
  var shareFeedback = document.getElementById('share-feedback');

  // Newsletter Modal DOM
  var newsletterModal = document.getElementById('newsletter-modal');
  var newsletterForm = document.getElementById('newsletter-form');
  var newsletterEmail = document.getElementById('newsletter-email');
  var newsletterError = document.getElementById('newsletter-error');
  var newsletterSuccess = document.getElementById('newsletter-success');

  // --------------------------------------------------------------------------
  // Helpers & Catalog Lookups
  // --------------------------------------------------------------------------
  function round2(n) {
    return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getAuthorInitials(name) {
    var words = String(name || '')
      .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (words.length === 0) return 'OC';
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    var secondIdx = words.length > 2 && words[words.length - 1].length === 1 ? 1 : words.length - 1;
    return (words[0].charAt(0) + words[secondIdx].charAt(0)).toUpperCase();
  }

  function buildStarsHtml(rating) {
    var val = Math.max(0, Math.min(5, Number(rating || 5)));
    var html = '';
    for (var s = 1; s <= 5; s += 1) {
      var src = val >= s
        ? 'assets/star-full.svg'
        : (val >= s - 0.5 ? 'assets/star-half.svg' : 'assets/star-empty.svg');
      html += '<img class="ocb-star" src="' + src + '" width="26" height="23" alt="">';
    }
    return html;
  }

  function getDict() {
    return I18N[state.lang] || I18N.en || {};
  }

  function getByPath(obj, path) {
    var parts = String(path || '').split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i += 1) {
      if (cur == null || typeof cur !== 'object') return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function t(path, fallback) {
    var val = getByPath(getDict(), path);
    if (val !== undefined) return val;
    var enVal = getByPath(I18N.en || {}, path);
    return enVal !== undefined ? enVal : (fallback || '');
  }

  function pickLoc(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[state.lang] !== undefined ? obj[state.lang] : (obj.en || '');
  }

  function getProduct(id) {
    var list = CATALOG.products || [];
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].id === id) return list[i];
    }
    return list[0] || null;
  }

  function getSize(id) {
    var list = CATALOG.sizes || [];
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].id === id) return list[i];
    }
    return list[0] || { id: '250g', multiplier: 1.0, label: { en: '250g', 'pt-BR': '250g' } };
  }

  function getGrind(id) {
    var list = CATALOG.grinds || [];
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].id === id) return list[i];
    }
    return list[0] || { id: 'espresso', label: { en: 'Espresso', 'pt-BR': 'Espresso' } };
  }

  function getCadence(id) {
    var list = CATALOG.cadences || [];
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].id === id) return list[i];
    }
    return list[0] || { id: 'one-time', discountPct: 0, isSubscription: false, label: { en: 'One-Time Purchase', 'pt-BR': 'Compra Única' } };
  }

  function getPromo(code) {
    if (!code || !CATALOG.promos) return null;
    var upper = String(code).trim().toUpperCase();
    return CATALOG.promos[upper] || null;
  }

  function getItemPricing(product, sizeId, cadenceId, qty) {
    if (!product) {
      return { unitUsd: 0, unitBrl: 0, lineUsd: 0, lineBrl: 0 };
    }
    var sizeMultiplier = product.fixedSize ? 1.0 : getSize(sizeId).multiplier;
    var cadence = getCadence(cadenceId);
    var discountFactor = 1 - (cadence.discountPct || 0) / 100;
    var unitUsd = round2(product.priceUsd * sizeMultiplier * discountFactor);
    var unitBrl = round2(product.priceBrl * sizeMultiplier * discountFactor);
    var q = Math.max(1, Number(qty) || 1);
    return {
      unitUsd: unitUsd,
      unitBrl: unitBrl,
      lineUsd: round2(unitUsd * q),
      lineBrl: round2(unitBrl * q)
    };
  }

  function getSizeDisplayLabel(product, sizeId) {
    if (product && product.fixedSize && product.fixedSizeLabel) {
      return pickLoc(product.fixedSizeLabel);
    }
    return pickLoc(getSize(sizeId).label);
  }

  function calculateTotals() {
    var subtotalUsd = 0;
    var subtotalBrl = 0;
    var totalQty = 0;
    var hasSubscription = false;
    var co2OffsetKg = 0;

    state.cart.forEach(function (item) {
      var p = getProduct(item.productId);
      if (!p) return;
      var pricing = getItemPricing(p, item.sizeId, item.cadenceId, item.qty);
      subtotalUsd = round2(subtotalUsd + pricing.lineUsd);
      subtotalBrl = round2(subtotalBrl + pricing.lineBrl);
      totalQty += item.qty;
      if (getCadence(item.cadenceId).isSubscription) {
        hasSubscription = true;
      }
      if (p.lotMetadata && p.lotMetadata.co2OffsetKg) {
        co2OffsetKg += p.lotMetadata.co2OffsetKg * item.qty;
      }
    });

    var promo = getPromo(state.promoCode);
    var discountUsd = 0;
    var discountBrl = 0;
    if (promo && promo.type === 'percent' && promo.discountPct > 0) {
      discountUsd = round2(subtotalUsd * (promo.discountPct / 100));
      discountBrl = round2(subtotalBrl * (promo.discountPct / 100));
    }

    var afterDiscountUsd = Math.max(0, round2(subtotalUsd - discountUsd));
    var afterDiscountBrl = Math.max(0, round2(subtotalBrl - discountBrl));
    var shipCfg = CATALOG.shipping || {
      freeThresholdUsd: 50,
      freeThresholdBrl: 240,
      standardUsd: 5.9,
      standardBrl: 24.9,
      freeOnSubscription: true
    };

    var promoFreeShip = Boolean(promo && promo.freeShipping);
    var subFreeShip = Boolean(hasSubscription && shipCfg.freeOnSubscription);

    var isFreeUsd = state.cart.length === 0 || subFreeShip || promoFreeShip || afterDiscountUsd >= shipCfg.freeThresholdUsd;
    var isFreeBrl = state.cart.length === 0 || subFreeShip || promoFreeShip || afterDiscountBrl >= shipCfg.freeThresholdBrl;

    var shippingUsd = isFreeUsd ? 0 : shipCfg.standardUsd;
    var shippingBrl = isFreeBrl ? 0 : shipCfg.standardBrl;

    return {
      totalQty: totalQty,
      subtotalUsd: subtotalUsd,
      subtotalBrl: subtotalBrl,
      discountUsd: discountUsd,
      discountBrl: discountBrl,
      afterDiscountUsd: afterDiscountUsd,
      afterDiscountBrl: afterDiscountBrl,
      shippingUsd: shippingUsd,
      shippingBrl: shippingBrl,
      totalUsd: round2(afterDiscountUsd + shippingUsd),
      totalBrl: round2(afterDiscountBrl + shippingBrl),
      hasSubscription: hasSubscription,
      subFreeShip: subFreeShip,
      promoFreeShip: promoFreeShip,
      promo: promo,
      shipCfg: shipCfg,
      co2OffsetKg: round2(co2OffsetKg)
    };
  }

  // --------------------------------------------------------------------------
  // Persistence
  // --------------------------------------------------------------------------
  function saveState() {
    try {
      var payload = {
        lang: state.lang,
        cart: state.cart,
        promoCode: state.promoCode,
        lastOrder: state.lastOrder
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (_) {
      // Ignore storage quota or private mode restrictions
    }
  }

  function loadState() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var parsed = JSON.parse(raw);
      if (parsed && (parsed.lang === 'en' || parsed.lang === 'pt-BR')) {
        state.lang = parsed.lang;
      }
      if (parsed && Array.isArray(parsed.cart)) {
        state.cart = parsed.cart
          .filter(function (item) {
            return item && typeof item.productId === 'string' && getProduct(item.productId);
          })
          .map(function (item) {
            var p = getProduct(item.productId);
            return {
              productId: p.id,
              sizeId: p.fixedSize ? p.defaultSize : (item.sizeId || p.defaultSize || '250g'),
              grindId: item.grindId || 'espresso',
              cadenceId: item.cadenceId || 'one-time',
              qty: Math.min(99, Math.max(1, parseInt(item.qty, 10) || 1))
            };
          });
      }
      if (parsed && typeof parsed.promoCode === 'string' && getPromo(parsed.promoCode)) {
        state.promoCode = parsed.promoCode.toUpperCase();
      }
      if (parsed && parsed.lastOrder && typeof parsed.lastOrder === 'object') {
        state.lastOrder = parsed.lastOrder;
      }
    } catch (_) {
      // Ignore malformed JSON
    }
  }

  function ensureCheckoutSeedIfNeeded() {
    if (state.cart.length === 0 && !state.userEmptiedCart) {
      state.cart.push({
        productId: 'starter-pack',
        sizeId: '250g',
        grindId: 'espresso',
        cadenceId: 'one-time',
        qty: 1
      });
      saveState();
    }
  }

  // --------------------------------------------------------------------------
  // Cart Operations (with 4-tuple deduplication)
  // --------------------------------------------------------------------------
  function addToCart(productId, sizeId, grindId, cadenceId, qty) {
    var product = getProduct(productId);
    if (!product) return null;

    var resolvedSize = product.fixedSize ? product.defaultSize : (sizeId || product.defaultSize || '250g');
    var resolvedGrind = grindId || 'espresso';
    var resolvedCadence = cadenceId || 'one-time';
    var addQty = Math.max(1, parseInt(qty, 10) || 1);

    state.userEmptiedCart = false;

    var matchedItem = null;
    for (var i = 0; i < state.cart.length; i += 1) {
      var cur = state.cart[i];
      if (
        cur.productId === product.id &&
        cur.sizeId === resolvedSize &&
        cur.grindId === resolvedGrind &&
        cur.cadenceId === resolvedCadence
      ) {
        cur.qty = Math.min(99, cur.qty + addQty);
        matchedItem = cur;
        break;
      }
    }

    if (!matchedItem) {
      matchedItem = {
        productId: product.id,
        sizeId: resolvedSize,
        grindId: resolvedGrind,
        cadenceId: resolvedCadence,
        qty: Math.min(99, addQty)
      };
      state.cart.push(matchedItem);
    }

    saveState();
    syncAllCartUI();
    return matchedItem;
  }

  function updateCartItemQty(index, delta) {
    var item = state.cart[index];
    if (!item) return;
    var nextQty = item.qty + delta;
    if (nextQty <= 0) {
      removeCartItem(index);
      return;
    }
    item.qty = Math.min(99, nextQty);
    saveState();
    syncAllCartUI();
  }

  function removeCartItem(index) {
    if (index < 0 || index >= state.cart.length) return;
    state.cart.splice(index, 1);
    if (state.cart.length === 0) {
      state.userEmptiedCart = true;
    }
    saveState();
    syncAllCartUI();
  }

  // --------------------------------------------------------------------------
  // View Routing
  // --------------------------------------------------------------------------
  function getHashView() {
    var raw = window.location.hash.replace(/^#/, '').toLowerCase();
    return VALID_VIEWS.indexOf(raw) !== -1 ? raw : 'home';
  }

  function setView(viewName, updateHash) {
    if (VALID_VIEWS.indexOf(viewName) === -1) {
      viewName = 'home';
    }

    if (viewName === 'cart') {
      ensureCheckoutSeedIfNeeded();
    }

    state.view = viewName;
    document.body.dataset.view = viewName;

    views.forEach(function (section) {
      var match = section.dataset.view === viewName;
      section.classList.toggle('is-active', match);
      section.hidden = !match;
    });

    document.querySelectorAll('[data-nav]').forEach(function (link) {
      if (link.classList.contains('nav-link') || link.classList.contains('drawer-link')) {
        link.classList.toggle('is-active', link.dataset.nav === viewName);
      }
    });

    if (updateHash) {
      var nextHash = '#' + viewName;
      if (window.location.hash !== nextHash) {
        window.location.hash = nextHash;
      }
    }

    if (viewName === 'cart') {
      renderCheckoutItems();
    } else if (viewName === 'confirmation') {
      renderConfirmationReceipt();
    } else if (viewName === 'shop') {
      renderShopGrid();
    }

    closeMobileDrawer();
    closeCartDrawer();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  window.addEventListener('hashchange', function () {
    var rawHash = window.location.hash.replace(/^#/, '').toLowerCase();
    if (rawHash === 'quiz') {
      window.dispatchEvent(new CustomEvent('ocb:open-quiz'));
      return;
    }
    setView(getHashView(), false);
  });

  // --------------------------------------------------------------------------
  // Drawers & Modals
  // --------------------------------------------------------------------------
  function openMobileDrawer() {
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop.hidden = false;
    requestAnimationFrame(function () {
      drawerBackdrop.classList.add('is-open');
    });
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    drawerBackdrop.classList.remove('is-open');
    setTimeout(function () {
      if (!mobileDrawer.classList.contains('is-open')) {
        drawerBackdrop.hidden = true;
      }
    }, 260);
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  function openCartDrawer() {
    closeMobileDrawer();
    renderCartDrawer();
    cartDrawer.hidden = false;
    cartDrawerBackdrop.hidden = false;
    requestAnimationFrame(function () {
      cartDrawer.classList.add('is-open');
      cartDrawerBackdrop.classList.add('is-open');
    });
    cartDrawer.setAttribute('aria-hidden', 'false');
    var closeBtn = document.getElementById('cd-close-btn');
    if (closeBtn) {
      setTimeout(function () { closeBtn.focus(); }, 60);
    }
  }

  function closeCartDrawer() {
    if (cartDrawer.hidden) return;
    cartDrawer.classList.remove('is-open');
    cartDrawerBackdrop.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    setTimeout(function () {
      if (!cartDrawer.classList.contains('is-open')) {
        cartDrawer.hidden = true;
        cartDrawerBackdrop.hidden = true;
      }
    }, 260);
  }

  function openProductModal(productId) {
    var product = getProduct(productId);
    if (!product) return;

    state.modal.productId = product.id;
    state.modal.sizeId = product.fixedSize ? product.defaultSize : '250g';
    state.modal.grindId = 'espresso';
    state.modal.cadenceId = 'one-time';
    state.modal.qty = 1;

    renderProductModal();
    productModal.hidden = false;
    productModal.setAttribute('aria-hidden', 'false');
    var closeBtn = document.getElementById('pm-close-btn');
    if (closeBtn) {
      setTimeout(function () { closeBtn.focus(); }, 40);
    }
  }

  function closeProductModal() {
    if (productModal.hidden) return;
    productModal.hidden = true;
    productModal.setAttribute('aria-hidden', 'true');
    state.modal.productId = null;
  }

  function openNewsletterModal() {
    newsletterModal.hidden = false;
    newsletterModal.setAttribute('aria-hidden', 'false');
    newsletterError.textContent = '';
    newsletterSuccess.hidden = true;
    setTimeout(function () { newsletterEmail.focus(); }, 40);
  }

  function closeNewsletterModal() {
    newsletterModal.hidden = true;
    newsletterModal.setAttribute('aria-hidden', 'true');
  }

  mobileMenuBtn.addEventListener('click', openMobileDrawer);
  drawerCloseBtn.addEventListener('click', closeMobileDrawer);
  drawerBackdrop.addEventListener('click', closeMobileDrawer);

  // --------------------------------------------------------------------------
  // Rendering: Product Cards, Home Sections, Shop
  // --------------------------------------------------------------------------
  function buildProductCardHtml(p) {
    var name = pickLoc(p.name);
    var shortDesc = pickLoc(p.shortDescription);
    var btnLabel = t('shop.configureBtn', 'CONFIGURE BAG');

    return (
      '<button type="button" class="product-card" data-product-id="' + escapeHtml(p.id) + '" data-open-product="' + escapeHtml(p.id) + '" aria-label="' + escapeHtml(name + ' — ' + btnLabel) + '">' +
        '<div class="product-card-media">' +
          '<img class="product-card-img" src="' + escapeHtml(p.image) + '" alt="' + escapeHtml(name) + '" loading="lazy">' +
        '</div>' +
        '<div class="product-card-body">' +
          '<h3 class="product-card-title">' + escapeHtml(name) + '</h3>' +
          '<p class="product-card-desc">' + escapeHtml(shortDesc) + '</p>' +
        '</div>' +
      '</button>'
    );
  }

  function renderFeaturedProducts() {
    if (!featuredGrid) return;
    var featured = (CATALOG.products || []).filter(function (p) { return p.featured; });
    featuredGrid.innerHTML = featured.map(buildProductCardHtml).join('');
  }

  function renderBrewGuide() {
    if (!brewTabsEl || !brewPanelEl) return;
    var guides = CATALOG.brewGuides || [];
    if (!guides.length) return;

    var activeGuide = guides[0];
    for (var i = 0; i < guides.length; i += 1) {
      if (guides[i].id === state.activeBrewId) {
        activeGuide = guides[i];
        break;
      }
    }
    state.activeBrewId = activeGuide.id;

    brewTabsEl.innerHTML = guides.map(function (g) {
      var active = g.id === activeGuide.id;
      return (
        '<button type="button" class="brew-tab' + (active ? ' is-active' : '') + '" ' +
        'role="tab" aria-selected="' + String(active) + '" data-brew="' + escapeHtml(g.id) + '">' +
        escapeHtml(pickLoc(g.method)) +
        '</button>'
      );
    }).join('');

    var steps = (activeGuide.steps && (activeGuide.steps[state.lang] || activeGuide.steps.en)) || [];
    var recProduct = getProduct(activeGuide.recommendedSku);

    var stepsHtml = steps.map(function (step, idx) {
      return (
        '<li class="brew-step-item">' +
          '<span class="brew-step-num">' + (idx + 1) + '</span>' +
          '<span class="brew-step-text">' + escapeHtml(step) + '</span>' +
        '</li>'
      );
    }).join('');

    brewPanelEl.innerHTML =
      '<div class="brew-panel-grid">' +
        '<div class="brew-panel-overview">' +
          '<h3 class="brew-panel-title">' + escapeHtml(pickLoc(activeGuide.method)) + '</h3>' +
          '<p class="brew-panel-tagline">' + escapeHtml(pickLoc(activeGuide.tagline)) + '</p>' +
          '<dl class="brew-specs">' +
            '<div class="brew-spec"><dt>' + escapeHtml(t('brewing.doseLabel', 'Dose & Ratio')) + '</dt><dd>' + escapeHtml(pickLoc(activeGuide.dose)) + '</dd></div>' +
            '<div class="brew-spec"><dt>' + escapeHtml(t('brewing.grindLabel', 'Grind Size')) + '</dt><dd>' + escapeHtml(pickLoc(activeGuide.grind)) + '</dd></div>' +
            '<div class="brew-spec"><dt>' + escapeHtml(t('brewing.tempLabel', 'Water Temp')) + '</dt><dd>' + escapeHtml(pickLoc(activeGuide.temp)) + '</dd></div>' +
            '<div class="brew-spec"><dt>' + escapeHtml(t('brewing.timeLabel', 'Brew Time')) + '</dt><dd>' + escapeHtml(pickLoc(activeGuide.time)) + '</dd></div>' +
          '</dl>' +
          (recProduct
            ? '<div class="brew-recommended">' +
                '<span class="brew-rec-label">' + escapeHtml(t('brewing.recommendedLabel', 'Recommended Roast')) + ':</span> ' +
                '<button type="button" class="brew-rec-btn" data-open-product="' + escapeHtml(recProduct.id) + '">' +
                  escapeHtml(pickLoc(recProduct.name)) + ' →' +
                '</button>' +
              '</div>'
            : '') +
        '</div>' +
        '<div class="brew-panel-steps">' +
          '<h4 class="brew-steps-heading">' + escapeHtml(t('brewing.stepsHeading', '3 Simple Steps')) + '</h4>' +
          '<ol class="brew-steps-list">' + stepsHtml + '</ol>' +
        '</div>' +
      '</div>';
  }

  function renderReviews() {
    if (!reviewsGrid) return;
    var reviews = CATALOG.reviews || [];
    var ratingAria = t('reviews.ratingAria', '5 out of 5 stars');
    var verifiedBadge = t('reviews.verifiedBadge', 'Verified Buyer');

    reviewsGrid.innerHTML = reviews.map(function (r) {
      var ratingVal = Number(r.rating || 5);
      var initials = getAuthorInitials(r.author);
      var authorUpper = String(r.author || '').toUpperCase();
      var starsHtml = buildStarsHtml(ratingVal);

      return (
        '<article class="review-card review-card--light">' +
          '<div class="review-card-header">' +
            '<div class="review-avatar" aria-hidden="true"><span>' + escapeHtml(initials) + '</span></div>' +
            '<div class="review-header-info">' +
              '<h3 class="review-author-name">' + escapeHtml(authorUpper) + '</h3>' +
              '<div class="review-rating-row" aria-label="' + escapeHtml(ratingAria) + '">' +
                starsHtml +
                '<span class="review-rating-num">' + escapeHtml(ratingVal.toFixed(1)) + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<p class="review-quote">“' + escapeHtml(pickLoc(r.quote)) + '”</p>' +
          '<footer class="review-footer">' +
            '<span class="review-meta">' + escapeHtml(r.location) + ' · ' + escapeHtml(pickLoc(r.productName)) + '</span>' +
            (r.verified ? '<span class="review-verified">' + escapeHtml(verifiedBadge) + '</span>' : '') +
          '</footer>' +
        '</article>'
      );
    }).join('');
  }

  function renderFaqs() {
    if (!faqList) return;
    var openIds = {};
    faqList.querySelectorAll('details.faq-item[open]').forEach(function (el) {
      if (el.dataset.faqId) openIds[el.dataset.faqId] = true;
    });

    var faqs = CATALOG.faqs || [];
    faqList.innerHTML = faqs.map(function (f) {
      var isOpen = Boolean(openIds[f.id]);
      return (
        '<details class="faq-item" data-faq-id="' + escapeHtml(f.id) + '"' + (isOpen ? ' open' : '') + '>' +
          '<summary class="faq-question">' +
            '<span>' + escapeHtml(pickLoc(f.question)) + '</span>' +
            '<span class="faq-chevron" aria-hidden="true">+</span>' +
          '</summary>' +
          '<div class="faq-answer">' +
            '<p>' + escapeHtml(pickLoc(f.answer)) + '</p>' +
          '</div>' +
        '</details>'
      );
    }).join('');
  }

  function renderShopGrid() {
    if (!shopGrid) return;
    var items = (CATALOG.products || []).slice();

    if (state.shopCategory !== 'all') {
      items = items.filter(function (p) {
        return p.category === state.shopCategory;
      });
    }

    if (state.shopSort === 'price-asc') {
      items.sort(function (a, b) { return a.priceUsd - b.priceUsd; });
    } else if (state.shopSort === 'price-desc') {
      items.sort(function (a, b) { return b.priceUsd - a.priceUsd; });
    }

    if (shopFiltersEl) {
      shopFiltersEl.querySelectorAll('.filter-pill').forEach(function (btn) {
        var active = btn.dataset.category === state.shopCategory;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
    }

    if (shopResultsCount) {
      shopResultsCount.textContent = items.length + ' ' + t('shop.resultsCount', 'roasts shown');
    }

    if (items.length === 0) {
      shopGrid.innerHTML = '';
      shopGrid.hidden = true;
      if (shopEmpty) shopEmpty.hidden = false;
    } else {
      shopGrid.hidden = false;
      if (shopEmpty) shopEmpty.hidden = true;
      shopGrid.innerHTML = items.map(buildProductCardHtml).join('');
    }
  }

  if (shopFiltersEl) {
    shopFiltersEl.addEventListener('click', function (e) {
      var pill = e.target.closest('.filter-pill[data-category]');
      if (!pill) return;
      state.shopCategory = pill.dataset.category;
      renderShopGrid();
    });
  }

  if (shopSortEl) {
    shopSortEl.addEventListener('change', function () {
      state.shopSort = shopSortEl.value;
      renderShopGrid();
    });
  }

  if (shopResetBtn) {
    shopResetBtn.addEventListener('click', function () {
      state.shopCategory = 'all';
      state.shopSort = 'featured';
      if (shopSortEl) shopSortEl.value = 'featured';
      renderShopGrid();
    });
  }

  if (brewTabsEl) {
    brewTabsEl.addEventListener('click', function (e) {
      var tab = e.target.closest('.brew-tab[data-brew]');
      if (!tab) return;
      state.activeBrewId = tab.dataset.brew;
      renderBrewGuide();
    });
  }

  // --------------------------------------------------------------------------
  // Rendering: Product Configurator Modal
  // --------------------------------------------------------------------------
  function renderProductModal() {
    var p = getProduct(state.modal.productId);
    if (!p) return;

    var name = pickLoc(p.name);
    pmImage.src = p.image;
    pmImage.alt = name;
    pmKraftLogo.hidden = !p.isKraftOverlay;

    pmOrigin.textContent = pickLoc(p.origin);
    pmRoast.textContent = t('common.roastLevelLabel', 'Roast Level') + ': ' + pickLoc(p.roastLabel) + ' (' + p.roastLevel + '/5)';
    pmTitle.textContent = name;
    pmDescription.textContent = pickLoc(p.description);

    var notes = (p.tastingNotes && (p.tastingNotes[state.lang] || p.tastingNotes.en)) || [];
    pmTastingTags.innerHTML = notes.map(function (n) {
      return '<span class="tasting-tag">' + escapeHtml(n) + '</span>';
    }).join('');

    var lot = p.lotMetadata || {};
    pmLotCard.innerHTML =
      '<h3 class="pm-lot-title">' + escapeHtml(t('common.traceabilityTitle', 'Lot Traceability')) + '</h3>' +
      '<dl class="pm-lot-grid">' +
        '<div class="pm-lot-row"><dt>' + escapeHtml(t('common.farmLabel', 'Partner Farm')) + '</dt><dd>' + escapeHtml(lot.farm || '') + '</dd></div>' +
        '<div class="pm-lot-row"><dt>' + escapeHtml(t('common.altitudeLabel', 'Altitude')) + '</dt><dd>' + escapeHtml(p.altitude || '') + '</dd></div>' +
        '<div class="pm-lot-row"><dt>' + escapeHtml(t('common.processLabel', 'Process')) + '</dt><dd>' + escapeHtml(pickLoc(p.process)) + '</dd></div>' +
        '<div class="pm-lot-row"><dt>' + escapeHtml(t('common.harvestLabel', 'Harvest')) + '</dt><dd>' + escapeHtml(lot.harvestDate || '') + '</dd></div>' +
        '<div class="pm-lot-row"><dt>' + escapeHtml(t('common.roastDateLabel', 'Latest Roast')) + '</dt><dd>' + escapeHtml(lot.roastDate || '') + '</dd></div>' +
        '<div class="pm-lot-row"><dt>' + escapeHtml(t('common.wagePremiumLabel', 'Farmer Wage Premium')) + '</dt><dd>+' + escapeHtml(lot.wagePremiumPct || 0) + '%</dd></div>' +
        '<div class="pm-lot-row"><dt>' + escapeHtml(t('common.co2OffsetLabel', 'CO₂ Offset per Bag')) + '</dt><dd>' + escapeHtml(lot.co2OffsetKg || 0) + ' kg</dd></div>' +
      '</dl>';

    // Bag Sizes
    if (p.fixedSize) {
      pmSizes.innerHTML =
        '<button type="button" class="pm-pill is-active" data-pm-size="' + escapeHtml(p.defaultSize) + '" disabled>' +
          '<span>' + escapeHtml(pickLoc(p.fixedSizeLabel)) + '</span>' +
        '</button>';
      pmFixedSizeNote.hidden = false;
    } else {
      pmFixedSizeNote.hidden = true;
      pmSizes.innerHTML = (CATALOG.sizes || []).map(function (s) {
        var active = s.id === state.modal.sizeId;
        return (
          '<button type="button" class="pm-pill' + (active ? ' is-active' : '') + '" data-pm-size="' + escapeHtml(s.id) + '" aria-pressed="' + String(active) + '">' +
            '<span>' + escapeHtml(pickLoc(s.label)) + '</span>' +
            '<small>' + escapeHtml(pickLoc(s.sublabel)) + '</small>' +
          '</button>'
        );
      }).join('');
    }

    // Grinds
    pmGrinds.innerHTML = (CATALOG.grinds || []).map(function (g) {
      var active = g.id === state.modal.grindId;
      return (
        '<button type="button" class="pm-pill' + (active ? ' is-active' : '') + '" data-pm-grind="' + escapeHtml(g.id) + '" aria-pressed="' + String(active) + '" title="' + escapeHtml(pickLoc(g.hint)) + '">' +
          '<span>' + escapeHtml(pickLoc(g.label)) + '</span>' +
        '</button>'
      );
    }).join('');

    // Subscription Switch & Cadences
    var isSub = Boolean(getCadence(state.modal.cadenceId).isSubscription);
    if (pmSubSwitch) {
      pmSubSwitch.setAttribute('aria-checked', String(isSub));
      pmSubSwitch.classList.toggle('is-on', isSub);
    }
    if (pmSubSwitchImg) {
      pmSubSwitchImg.src = isSub ? 'assets/switch-on.svg' : 'assets/switch-off.svg';
    }

    pmCadences.innerHTML = (CATALOG.cadences || []).map(function (c) {
      var active = c.id === state.modal.cadenceId;
      var unitPricing = getItemPricing(p, state.modal.sizeId, c.id, 1);
      var unitPriceStr = formatPrice(unitPricing.unitUsd, unitPricing.unitBrl, state.lang);
      return (
        '<button type="button" class="pm-cadence-card' + (active ? ' is-active' : '') + (c.isSubscription ? ' is-subscription' : '') + '" data-pm-cadence="' + escapeHtml(c.id) + '" aria-pressed="' + String(active) + '">' +
          '<span class="ocb-checkbox ocb-checkbox--primary ocb-checkbox--sm' + (active ? ' is-checked' : '') + '" aria-hidden="true">' +
            (active ? '<img src="assets/checkbox-primary-on.svg" width="24" height="24" alt="">' : '') +
          '</span>' +
          '<span class="pm-cadence-main">' +
            '<strong class="pm-cadence-name">' + escapeHtml(pickLoc(c.label)) + '</strong>' +
            (c.badge ? '<span class="pm-cadence-badge">' + escapeHtml(pickLoc(c.badge)) + '</span>' : '') +
          '</span>' +
          '<span class="pm-cadence-price">' + escapeHtml(unitPriceStr) + '</span>' +
        '</button>'
      );
    }).join('');

    pmQtyVal.textContent = String(state.modal.qty);
    var totalPricing = getItemPricing(p, state.modal.sizeId, state.modal.cadenceId, state.modal.qty);
    pmPrice.textContent = formatPrice(totalPricing.lineUsd, totalPricing.lineBrl, state.lang);
  }

  if (pmSubSwitch) {
    pmSubSwitch.addEventListener('click', function () {
      var isSub = Boolean(getCadence(state.modal.cadenceId).isSubscription);
      state.modal.cadenceId = isSub ? 'one-time' : 'monthly';
      renderProductModal();
    });
  }

  pmSizes.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-pm-size]');
    if (!btn || btn.disabled) return;
    state.modal.sizeId = btn.dataset.pmSize;
    renderProductModal();
  });

  pmGrinds.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-pm-grind]');
    if (!btn) return;
    state.modal.grindId = btn.dataset.pmGrind;
    renderProductModal();
  });

  pmCadences.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-pm-cadence]');
    if (!btn) return;
    state.modal.cadenceId = btn.dataset.pmCadence;
    renderProductModal();
  });

  pmQtyDec.addEventListener('click', function () {
    if (state.modal.qty > 1) {
      state.modal.qty -= 1;
      renderProductModal();
    }
  });

  pmQtyInc.addEventListener('click', function () {
    if (state.modal.qty < 99) {
      state.modal.qty += 1;
      renderProductModal();
    }
  });

  pmAddBtn.addEventListener('click', function () {
    if (!state.modal.productId) return;
    addToCart(
      state.modal.productId,
      state.modal.sizeId,
      state.modal.grindId,
      state.modal.cadenceId,
      state.modal.qty
    );
    closeProductModal();
    openCartDrawer();
  });

  // --------------------------------------------------------------------------
  // Rendering: Cart Drawer, Header Badges, Features Toast, Checkout
  // --------------------------------------------------------------------------
  function syncNavBadges(totalQty) {
    var countText = '(' + totalQty + ')';
    navCartCount.textContent = countText;
    drawerCartCount.textContent = countText;
    navCartCount.hidden = totalQty <= 0;
    drawerCartCount.hidden = totalQty <= 0;
  }

  function renderCartDrawer() {
    var totals = calculateTotals();
    var hasItems = state.cart.length > 0;

    // Free shipping progress bar
    if (totals.subFreeShip) {
      cdShippingText.textContent = t('cartDrawer.freeShipSubNote', 'Free shipping active via subscription item!');
      cdShippingFill.style.width = '100%';
    } else if (totals.promoFreeShip) {
      cdShippingText.textContent = t('cartDrawer.freeShipUnlocked', 'You unlocked FREE carbon-neutral shipping!');
      cdShippingFill.style.width = '100%';
    } else if (state.lang === 'pt-BR') {
      var thrBrl = totals.shipCfg.freeThresholdBrl;
      var remBrl = Math.max(0, round2(thrBrl - totals.afterDiscountBrl));
      if (remBrl <= 0 && hasItems) {
        cdShippingText.textContent = t('cartDrawer.freeShipUnlocked', 'You unlocked FREE carbon-neutral shipping!');
        cdShippingFill.style.width = '100%';
      } else {
        var pctBrl = hasItems ? Math.min(100, Math.round((totals.afterDiscountBrl / thrBrl) * 100)) : 0;
        cdShippingText.textContent =
          t('cartDrawer.freeShipRemainingPrefix', 'Faltam') + ' ' +
          formatPrice(0, remBrl, 'pt-BR') + ' ' +
          t('cartDrawer.freeShipRemainingSuffix', 'para ganhar FRETE GRÁTIS carbono neutro');
        cdShippingFill.style.width = pctBrl + '%';
      }
    } else {
      var thrUsd = totals.shipCfg.freeThresholdUsd;
      var remUsd = Math.max(0, round2(thrUsd - totals.afterDiscountUsd));
      if (remUsd <= 0 && hasItems) {
        cdShippingText.textContent = t('cartDrawer.freeShipUnlocked', 'You unlocked FREE carbon-neutral shipping!');
        cdShippingFill.style.width = '100%';
      } else {
        var pctUsd = hasItems ? Math.min(100, Math.round((totals.afterDiscountUsd / thrUsd) * 100)) : 0;
        cdShippingText.textContent =
          t('cartDrawer.freeShipRemainingPrefix', 'Add') + ' ' +
          formatPrice(remUsd, 0, 'en') + ' ' +
          t('cartDrawer.freeShipRemainingSuffix', 'more for FREE carbon-neutral shipping');
        cdShippingFill.style.width = pctUsd + '%';
      }
    }

    cdItemsEl.hidden = !hasItems;
    cdEmptyEl.hidden = hasItems;
    cdFooterEl.hidden = !hasItems;

    if (!hasItems) {
      cdItemsEl.innerHTML = '';
    } else {
      var removeAria = t('cartDrawer.removeItemAria', 'Remove item from cart');
      var decAria = t('modal.decreaseQtyAria', 'Decrease quantity');
      var incAria = t('modal.increaseQtyAria', 'Increase quantity');

      cdItemsEl.innerHTML = state.cart.map(function (item, idx) {
        var p = getProduct(item.productId);
        if (!p) return '';
        var pricing = getItemPricing(p, item.sizeId, item.cadenceId, item.qty);
        var cadence = getCadence(item.cadenceId);
        var sizeLabel = getSizeDisplayLabel(p, item.sizeId);
        var grindLabel = pickLoc(getGrind(item.grindId).label);
        var cadenceLabel = pickLoc(cadence.label);
        var lineTotalStr = formatPrice(pricing.lineUsd, pricing.lineBrl, state.lang);

        return (
          '<div class="cd-item" data-item-index="' + idx + '">' +
            '<div class="cd-item-thumb' + (p.isKraftOverlay ? ' is-kraft' : '') + '">' +
              '<img class="cd-item-img" src="' + escapeHtml(p.image) + '" alt="' + escapeHtml(pickLoc(p.name)) + '">' +
              (p.isKraftOverlay ? '<img class="cd-item-kraft-logo" src="assets/logo-green.svg" width="48" height="16" alt="">' : '') +
            '</div>' +
            '<div class="cd-item-info">' +
              '<div class="cd-item-head">' +
                '<h3 class="cd-item-title">' + escapeHtml(pickLoc(p.name)) + '</h3>' +
                '<button type="button" class="cd-item-remove" data-cart-remove="' + idx + '" aria-label="' + escapeHtml(removeAria) + '">×</button>' +
              '</div>' +
              '<p class="cd-item-meta">' + escapeHtml(sizeLabel) + ' · ' + escapeHtml(grindLabel) + '</p>' +
              '<span class="cd-item-cadence' + (cadence.isSubscription ? ' is-sub' : '') + '">' + escapeHtml(cadenceLabel) + '</span>' +
              '<div class="cd-item-bottom">' +
                '<div class="cart-qty-controls">' +
                  '<button type="button" class="qty-btn" data-cart-dec="' + idx + '" aria-label="' + escapeHtml(decAria) + '">−</button>' +
                  '<span class="qty-value">' + item.qty + '</span>' +
                  '<button type="button" class="qty-btn" data-cart-inc="' + idx + '" aria-label="' + escapeHtml(incAria) + '">+</button>' +
                '</div>' +
                '<strong class="cd-item-price">' + escapeHtml(lineTotalStr) + '</strong>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      }).join('');
    }

    // Promo chip
    if (totals.promo) {
      cdPromoChip.hidden = false;
      cdPromoChipText.textContent =
        t('cartDrawer.promoAppliedPrefix', 'Applied:') + ' ' +
        totals.promo.code + ' — ' + pickLoc(totals.promo.label);
    } else {
      cdPromoChip.hidden = true;
      cdPromoChipText.textContent = '';
    }

    // Totals
    cdSubtotal.textContent = formatPrice(totals.subtotalUsd, totals.subtotalBrl, state.lang);
    if (totals.discountUsd > 0 || totals.discountBrl > 0) {
      cdDiscountRow.hidden = false;
      cdDiscount.textContent = '-' + formatPrice(totals.discountUsd, totals.discountBrl, state.lang);
    } else {
      cdDiscountRow.hidden = true;
    }
    cdShippingVal.textContent = (totals.shippingUsd === 0 && totals.shippingBrl === 0)
      ? t('common.free', 'FREE')
      : formatPrice(totals.shippingUsd, totals.shippingBrl, state.lang);
    cdTotal.textContent = formatPrice(totals.totalUsd, totals.totalBrl, state.lang);
  }

  function renderCheckoutItems() {
    var totals = calculateTotals();
    var hasItems = state.cart.length > 0;

    checkoutItemsList.hidden = !hasItems;
    checkoutEmptyNotice.hidden = hasItems;
    checkoutBreakdown.hidden = !hasItems;
    if (purchaseBtn) {
      purchaseBtn.disabled = !hasItems;
    }

    if (!hasItems) {
      checkoutItemsList.innerHTML = '';
    } else {
      var removeLabel = t('cartDrawer.removeBtn', 'Remove');
      var decAria = t('modal.decreaseQtyAria', 'Decrease quantity');
      var incAria = t('modal.increaseQtyAria', 'Increase quantity');

      checkoutItemsList.innerHTML = state.cart.map(function (item, idx) {
        var p = getProduct(item.productId);
        if (!p) return '';
        var pricing = getItemPricing(p, item.sizeId, item.cadenceId, item.qty);
        var cadence = getCadence(item.cadenceId);
        var sizeLabel = getSizeDisplayLabel(p, item.sizeId);
        var grindLabel = pickLoc(getGrind(item.grindId).label);
        var cadenceLabel = pickLoc(cadence.label);
        var lineTotalStr = formatPrice(pricing.lineUsd, pricing.lineBrl, state.lang);

        return (
          '<div class="checkout-item-row" data-item-index="' + idx + '">' +
            '<div class="checkout-item-thumb' + (p.isKraftOverlay ? ' is-kraft' : '') + '">' +
              '<img class="checkout-item-img" src="' + escapeHtml(p.image) + '" alt="' + escapeHtml(pickLoc(p.name)) + '">' +
              (p.isKraftOverlay ? '<img class="checkout-item-kraft-logo" src="assets/logo-green.svg" width="80" height="27" alt="">' : '') +
            '</div>' +
            '<div class="checkout-item-info">' +
              '<div class="checkout-item-head">' +
                '<p class="cart-item-title">' + item.qty + '× ' + escapeHtml(pickLoc(p.name)) + ' (' + escapeHtml(sizeLabel) + ') — ' + escapeHtml(lineTotalStr) + '</p>' +
                '<button type="button" class="checkout-item-remove" data-cart-remove="' + idx + '">' + escapeHtml(removeLabel) + '</button>' +
              '</div>' +
              '<p class="checkout-item-meta">' +
                escapeHtml(grindLabel) + ' · ' +
                '<span class="checkout-cadence-pill' + (cadence.isSubscription ? ' is-sub' : '') + '">' + escapeHtml(cadenceLabel) + '</span>' +
              '</p>' +
              '<div class="cart-qty-controls" aria-label="Quantity controls">' +
                '<button type="button" class="qty-btn" data-cart-dec="' + idx + '" aria-label="' + escapeHtml(decAria) + '">−</button>' +
                '<span class="qty-value">' + item.qty + '</span>' +
                '<button type="button" class="qty-btn" data-cart-inc="' + idx + '" aria-label="' + escapeHtml(incAria) + '">+</button>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      }).join('');
    }

    checkoutSubtotal.textContent = formatPrice(totals.subtotalUsd, totals.subtotalBrl, state.lang);
    if (totals.discountUsd > 0 || totals.discountBrl > 0) {
      checkoutDiscountRow.hidden = false;
      checkoutDiscount.textContent = '-' + formatPrice(totals.discountUsd, totals.discountBrl, state.lang);
    } else {
      checkoutDiscountRow.hidden = true;
    }
    checkoutShipping.textContent = (totals.shippingUsd === 0 && totals.shippingBrl === 0)
      ? t('common.free', 'FREE')
      : formatPrice(totals.shippingUsd, totals.shippingBrl, state.lang);
    cartFinalPrice.textContent = formatPrice(totals.totalUsd, totals.totalBrl, state.lang);
  }

  function syncToastSubtitle() {
    if (!toastSubtitle) return;
    var starter = getProduct('starter-pack');
    if (!starter) return;
    var starterQty = 0;
    state.cart.forEach(function (item) {
      if (item.productId === 'starter-pack') {
        starterQty += item.qty;
      }
    });
    var displayQty = Math.max(1, starterQty);
    var pricing = getItemPricing(starter, '250g', 'one-time', displayQty);
    toastSubtitle.textContent =
      displayQty + '× ' + pickLoc(starter.name) + ' (250g) - ' +
      formatPrice(pricing.lineUsd, pricing.lineBrl, state.lang);
  }

  function syncAllCartUI() {
    var totals = calculateTotals();
    syncNavBadges(totals.totalQty);
    renderCartDrawer();
    renderCheckoutItems();
    syncToastSubtitle();
  }

  // Delegate cart item qty / remove clicks in both drawer and checkout
  document.addEventListener('click', function (e) {
    var decBtn = e.target.closest('[data-cart-dec]');
    if (decBtn) {
      updateCartItemQty(parseInt(decBtn.dataset.cartDec, 10), -1);
      return;
    }
    var incBtn = e.target.closest('[data-cart-inc]');
    if (incBtn) {
      updateCartItemQty(parseInt(incBtn.dataset.cartInc, 10), 1);
      return;
    }
    var remBtn = e.target.closest('[data-cart-remove]');
    if (remBtn) {
      removeCartItem(parseInt(remBtn.dataset.cartRemove, 10));
      return;
    }
    var openProdBtn = e.target.closest('[data-open-product]');
    if (openProdBtn) {
      openProductModal(openProdBtn.dataset.openProduct);
    }
  });

  // Promo form handlers
  if (cdPromoForm) {
    cdPromoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var raw = (cdPromoInput.value || '').trim().toUpperCase();
      if (!raw) {
        cdPromoFeedback.textContent = t('cartDrawer.promoEmptyError', 'Enter a promo code first.');
        cdPromoFeedback.className = 'cd-promo-feedback is-error';
        return;
      }
      var promo = getPromo(raw);
      if (!promo) {
        cdPromoFeedback.textContent = t('cartDrawer.promoInvalidError', 'Code not recognized. Try OLIVIA15, BEMVINDO15, or FREESHIP.');
        cdPromoFeedback.className = 'cd-promo-feedback is-error';
        return;
      }
      state.promoCode = promo.code;
      cdPromoInput.value = '';
      cdPromoFeedback.textContent = '';
      cdPromoFeedback.className = 'cd-promo-feedback';
      saveState();
      syncAllCartUI();
    });
  }

  if (cdPromoRemoveBtn) {
    cdPromoRemoveBtn.addEventListener('click', function () {
      state.promoCode = null;
      cdPromoFeedback.textContent = '';
      saveState();
      syncAllCartUI();
    });
  }

  if (cdBrowseBtn) {
    cdBrowseBtn.addEventListener('click', function () {
      closeCartDrawer();
      setView('shop', true);
    });
  }

  if (cdCheckoutBtn) {
    cdCheckoutBtn.addEventListener('click', function () {
      closeCartDrawer();
    });
  }

  // --------------------------------------------------------------------------
  // Features Toast
  // --------------------------------------------------------------------------
  function showCartToast() {
    clearTimeout(state.toastTimer);
    syncToastSubtitle();
    cartToast.hidden = false;
    state.toastTimer = setTimeout(function () {
      cartToast.hidden = true;
    }, 5000);
  }

  function hideCartToast() {
    clearTimeout(state.toastTimer);
    cartToast.hidden = true;
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function () {
      addToCart('starter-pack', '250g', 'espresso', 'one-time', 1);
      showCartToast();
    });
  }

  if (toastCloseBtn) {
    toastCloseBtn.addEventListener('click', hideCartToast);
  }

  // --------------------------------------------------------------------------
  // Global Navigation & Action Delegates
  // --------------------------------------------------------------------------
  document.addEventListener('click', function (event) {
    var navTrigger = event.target.closest('[data-nav]');
    if (navTrigger) {
      event.preventDefault();
      setView(navTrigger.dataset.nav, true);
      return;
    }

    var actionTrigger = event.target.closest('[data-action]');
    if (actionTrigger) {
      var action = actionTrigger.dataset.action;
      if (action === 'buy-now') {
        setView('shop', true);
      } else if (action === 'return-home') {
        setView('home', true);
      } else if (action === 'open-newsletter') {
        closeMobileDrawer();
        openNewsletterModal();
      } else if (action === 'close-newsletter') {
        closeNewsletterModal();
      } else if (action === 'open-cart-drawer') {
        openCartDrawer();
      } else if (action === 'close-cart-drawer') {
        closeCartDrawer();
      } else if (action === 'close-product-modal') {
        closeProductModal();
      } else if (action === 'open-quiz') {
        closeMobileDrawer();
        window.dispatchEvent(new CustomEvent('ocb:open-quiz'));
      } else if (action === 'close-quiz') {
        window.dispatchEvent(new CustomEvent('ocb:close-quiz'));
      }
      return;
    }

    var scrollBtn = event.target.closest('[data-scroll-target]');
    if (scrollBtn) {
      var targetEl = document.getElementById(scrollBtn.dataset.scrollTarget);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // --------------------------------------------------------------------------
  // Language Switching (EN <-> PT-BR)
  // --------------------------------------------------------------------------
  function applyLanguage(lang) {
    state.lang = lang === 'pt-BR' ? 'pt-BR' : 'en';
    document.documentElement.lang = state.lang;

    var title = t('meta.title');
    if (title) document.title = title;
    var desc = t('meta.description');
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && desc) metaDesc.setAttribute('content', desc);

    langButtons.forEach(function (btn) {
      var active = btn.dataset.lang === state.lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = t(el.dataset.i18n);
      if (typeof val === 'string') {
        el.textContent = val;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var val = t(el.dataset.i18nPlaceholder);
      if (typeof val === 'string') {
        el.setAttribute('placeholder', val);
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var val = t(el.dataset.i18nAria);
      if (typeof val === 'string') {
        el.setAttribute('aria-label', val);
      }
    });

    // Re-render dynamic blocks
    renderFeaturedProducts();
    renderBrewGuide();
    renderReviews();
    renderFaqs();
    renderShopGrid();
    if (!productModal.hidden && state.modal.productId) {
      renderProductModal();
    }
    syncAllCartUI();
    renderConfirmationReceipt();

    // Refresh any currently visible form error strings
    if (checkoutForm) {
      ['email', 'address', 'cardName', 'cardNumber', 'expiry', 'cvc'].forEach(function (field) {
        var wrap = checkoutForm.querySelector('[data-field="' + field + '"]');
        if (wrap && wrap.classList.contains('is-error')) {
          validateField(field);
        }
      });
    }

    saveState();
    window.dispatchEvent(new CustomEvent('ocb:langchange', { detail: { lang: state.lang } }));
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.dataset.lang);
    });
  });

  // --------------------------------------------------------------------------
  // Checkout Form Formatting & Validation
  // --------------------------------------------------------------------------
  function setFieldState(fieldName, isValid, errorMsg) {
    var wrapper = checkoutForm.querySelector('[data-field="' + fieldName + '"]');
    var errorEl = document.getElementById('error-' + fieldName);
    if (!wrapper || !errorEl) return;

    wrapper.classList.toggle('is-valid', isValid);
    wrapper.classList.toggle('is-error', !isValid);
    errorEl.textContent = isValid ? '' : errorMsg;
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
  }

  function validateField(name) {
    switch (name) {
      case 'email': {
        var ok = validateEmail(emailInput.value);
        setFieldState('email', ok, t('validation.email', 'Enter a valid email address.'));
        return ok;
      }
      case 'address': {
        var okAddr = addressInput.value.trim().length >= 5;
        setFieldState('address', okAddr, t('validation.address', 'Enter your complete shipping address.'));
        return okAddr;
      }
      case 'cardName': {
        var okName = cardNameInput.value.trim().length >= 3;
        setFieldState('cardName', okName, t('validation.cardName', 'Enter the full name shown on your card.'));
        return okName;
      }
      case 'cardNumber': {
        var digits = cardNumberInput.value.replace(/\D/g, '');
        var okNum = digits.length >= 13 && digits.length <= 19;
        setFieldState('cardNumber', okNum, t('validation.cardNumber', 'Enter a valid 13 to 19-digit card number.'));
        return okNum;
      }
      case 'expiry': {
        var val = expiryInput.value.trim();
        var okExp = /^(0[1-9]|1[0-2])\/(\d{2})$/.test(val);
        setFieldState('expiry', okExp, t('validation.expiry', 'Use valid MM/YY format.'));
        return okExp;
      }
      case 'cvc': {
        var cvcDigits = cvcInput.value.replace(/\D/g, '');
        var okCvc = cvcDigits.length >= 3 && cvcDigits.length <= 4;
        setFieldState('cvc', okCvc, t('validation.cvc', 'Enter 3 or 4 security digits.'));
        return okCvc;
      }
      default:
        return true;
    }
  }

  cardNumberInput.addEventListener('input', function () {
    var digits = cardNumberInput.value.replace(/\D/g, '').slice(0, 16);
    cardNumberInput.value = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (cardNumberInput.closest('.form-field').classList.contains('is-error')) {
      validateField('cardNumber');
    }
  });

  expiryInput.addEventListener('input', function () {
    var digits = expiryInput.value.replace(/\D/g, '').slice(0, 4);
    expiryInput.value = digits.length > 2 ? digits.slice(0, 2) + '/' + digits.slice(2) : digits;
    if (expiryInput.closest('.form-field').classList.contains('is-error')) {
      validateField('expiry');
    }
  });

  cvcInput.addEventListener('input', function () {
    cvcInput.value = cvcInput.value.replace(/\D/g, '').slice(0, 4);
    if (cvcInput.closest('.form-field').classList.contains('is-error')) {
      validateField('cvc');
    }
  });

  [
    ['email', emailInput],
    ['address', addressInput],
    ['cardName', cardNameInput],
    ['cardNumber', cardNumberInput],
    ['expiry', expiryInput],
    ['cvc', cvcInput]
  ].forEach(function (pair) {
    pair[1].addEventListener('blur', function () {
      if (pair[1].value.trim() !== '') {
        validateField(pair[0]);
      }
    });
  });

  // CVC Tooltip
  var cvcPinned = false;

  function toggleCvcTooltip(show) {
    var next = typeof show === 'boolean' ? show : cvcTooltip.hidden;
    cvcTooltip.hidden = !next;
    cvcInfoBtn.setAttribute('aria-expanded', String(next));
  }

  cvcInfoBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    cvcPinned = !cvcPinned;
    toggleCvcTooltip(cvcPinned);
  });
  cvcInfoBtn.addEventListener('mouseenter', function () {
    if (!cvcPinned) toggleCvcTooltip(true);
  });
  cvcInfoBtn.addEventListener('mouseleave', function () {
    if (!cvcPinned) toggleCvcTooltip(false);
  });
  cvcInfoBtn.addEventListener('blur', function () {
    if (!cvcPinned) toggleCvcTooltip(false);
  });

  document.addEventListener('click', function (e) {
    if (!cvcTooltip.hidden && !e.target.closest('.cvc-tip-anchor')) {
      cvcPinned = false;
      toggleCvcTooltip(false);
    }
  });

  // --------------------------------------------------------------------------
  // Checkout Submit, Order Receipt & 4-Step Box Packing Animation
  // --------------------------------------------------------------------------
  function buildOrderRecord() {
    var totals = calculateTotals();
    var randomDigits = Math.floor(1000 + Math.random() * 9000);
    var itemsSnapshot = state.cart.map(function (item) {
      var p = getProduct(item.productId);
      var pricing = getItemPricing(p, item.sizeId, item.cadenceId, item.qty);
      return {
        productId: item.productId,
        sizeId: item.sizeId,
        grindId: item.grindId,
        cadenceId: item.cadenceId,
        qty: item.qty,
        lineUsd: pricing.lineUsd,
        lineBrl: pricing.lineBrl
      };
    });

    return {
      orderId: '#OCB-' + randomDigits,
      createdAt: new Date().toISOString(),
      compostCard: Boolean(compostCardInput && compostCardInput.checked),
      items: itemsSnapshot,
      totals: {
        subtotalUsd: totals.subtotalUsd,
        subtotalBrl: totals.subtotalBrl,
        discountUsd: totals.discountUsd,
        discountBrl: totals.discountBrl,
        shippingUsd: totals.shippingUsd,
        shippingBrl: totals.shippingBrl,
        totalUsd: totals.totalUsd,
        totalBrl: totals.totalBrl,
        promoCode: totals.promo ? totals.promo.code : null
      },
      co2OffsetKg: Math.max(1.2, totals.co2OffsetKg)
    };
  }

  function renderConfirmationReceipt() {
    if (!confirmOrderId || !confirmOrderSummary || !confirmImpactNote) return;

    var order = state.lastOrder;
    if (!order) {
      // Fallback receipt if user visits #confirmation directly
      var starter = getProduct('starter-pack');
      order = {
        orderId: '#OCB-1024',
        items: starter ? [{
          productId: starter.id,
          sizeId: '250g',
          grindId: 'espresso',
          cadenceId: 'one-time',
          qty: 1,
          lineUsd: starter.priceUsd,
          lineBrl: starter.priceBrl
        }] : [],
        totals: {
          subtotalUsd: starter ? starter.priceUsd : 24,
          subtotalBrl: starter ? starter.priceBrl : 119,
          discountUsd: 0,
          discountBrl: 0,
          shippingUsd: 0,
          shippingBrl: 0,
          totalUsd: starter ? starter.priceUsd : 24,
          totalBrl: starter ? starter.priceBrl : 119
        },
        co2OffsetKg: 1.4
      };
    }

    confirmOrderId.textContent = order.orderId;

    var itemsHtml = (order.items || []).map(function (item) {
      var p = getProduct(item.productId);
      if (!p) return '';
      var sizeLabel = getSizeDisplayLabel(p, item.sizeId);
      var grindLabel = pickLoc(getGrind(item.grindId).label);
      var cadenceLabel = pickLoc(getCadence(item.cadenceId).label);
      var lineStr = formatPrice(item.lineUsd, item.lineBrl, state.lang);
      return (
        '<li class="confirm-item-row">' +
          '<span>' + item.qty + '× ' + escapeHtml(pickLoc(p.name)) + ' (' + escapeHtml(sizeLabel) + ', ' + escapeHtml(grindLabel) + ', ' + escapeHtml(cadenceLabel) + ')</span>' +
          '<strong>' + escapeHtml(lineStr) + '</strong>' +
        '</li>'
      );
    }).join('');

    var tot = order.totals || {};
    var hasDiscount = (tot.discountUsd > 0 || tot.discountBrl > 0);
    var shipStr = (tot.shippingUsd === 0 && tot.shippingBrl === 0)
      ? t('common.free', 'FREE')
      : formatPrice(tot.shippingUsd, tot.shippingBrl, state.lang);

    confirmOrderSummary.innerHTML =
      '<ul class="confirm-items-list">' + itemsHtml + '</ul>' +
      '<div class="confirm-totals">' +
        '<div class="confirm-total-row"><span>' + escapeHtml(t('confirmation.subtotalLabel', 'Subtotal')) + '</span><span>' + escapeHtml(formatPrice(tot.subtotalUsd, tot.subtotalBrl, state.lang)) + '</span></div>' +
        (hasDiscount
          ? '<div class="confirm-total-row"><span>' + escapeHtml(t('confirmation.discountLabel', 'Discount')) + '</span><span>-' + escapeHtml(formatPrice(tot.discountUsd, tot.discountBrl, state.lang)) + '</span></div>'
          : '') +
        '<div class="confirm-total-row"><span>' + escapeHtml(t('confirmation.shippingLabel', 'Shipping')) + '</span><span>' + escapeHtml(shipStr) + '</span></div>' +
        '<div class="confirm-total-row confirm-total-row--final"><strong>' + escapeHtml(t('confirmation.totalPaidLabel', 'Total Paid')) + '</strong><strong>' + escapeHtml(formatPrice(tot.totalUsd, tot.totalBrl, state.lang)) + '</strong></div>' +
      '</div>';

    confirmImpactNote.textContent =
      t('confirmation.impactNoteLabel', 'Eco Impact') + ': ' +
      t('confirmation.impactNoteValue', '100% carbon-neutral delivery & direct-trade farmer premium applied.') +
      ' (' + Number(order.co2OffsetKg || 1.4).toFixed(1) + ' kg CO₂e)';
  }

  function runPurchaseAnimation() {
    state.isSubmitting = true;
    purchaseBtn.textContent = t('checkout.processingBtn', 'PACKING YOUR ORDER...');

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      state.isSubmitting = false;
      purchaseBtn.textContent = t('checkout.purchaseBtn', 'PURCHASE');
      setView('confirmation', true);
      return;
    }

    packStage.className = 'pack-stage';
    purchaseAnimation.hidden = false;
    purchaseAnimation.setAttribute('aria-hidden', 'false');

    requestAnimationFrame(function () {
      packStage.classList.add('is-step-1');
    });

    setTimeout(function () {
      packStage.classList.remove('is-step-1');
      packStage.classList.add('is-step-2');
    }, 360);

    setTimeout(function () {
      packStage.classList.remove('is-step-2');
      packStage.classList.add('is-step-3');
    }, 900);

    setTimeout(function () {
      packStage.classList.remove('is-step-3');
      packStage.classList.add('is-step-4');
    }, 1500);

    setTimeout(function () {
      purchaseAnimation.hidden = true;
      purchaseAnimation.setAttribute('aria-hidden', 'true');
      packStage.className = 'pack-stage';
      state.isSubmitting = false;
      purchaseBtn.textContent = t('checkout.purchaseBtn', 'PURCHASE');
      setView('confirmation', true);
    }, 2080);
  }

  checkoutForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (state.isSubmitting) return;

    if (state.cart.length === 0) {
      checkoutEmptyNotice.hidden = false;
      return;
    }

    var fieldNames = ['email', 'address', 'cardName', 'cardNumber', 'expiry', 'cvc'];
    var results = fieldNames.map(function (name) { return validateField(name); });
    var firstInvalidIndex = results.indexOf(false);

    if (firstInvalidIndex !== -1) {
      var invalidField = checkoutForm.querySelector('[data-field="' + fieldNames[firstInvalidIndex] + '"] input');
      if (invalidField) invalidField.focus();
      return;
    }

    state.lastOrder = buildOrderRecord();
    state.cart = [];
    state.promoCode = null;
    state.userEmptiedCart = false;
    saveState();
    syncAllCartUI();
    checkoutForm.reset();
    checkoutForm.querySelectorAll('.form-field').forEach(function (f) {
      f.classList.remove('is-valid', 'is-error');
    });

    runPurchaseAnimation();
  });

  // --------------------------------------------------------------------------
  // Confirmation Share Button
  // --------------------------------------------------------------------------
  socialShareBtn.addEventListener('click', async function () {
    var shareText = t('confirmation.shareText', "I just ordered Olívia's Coffee Beans — Eco-First Brazilian Specialty Coffee!");
    try {
      if (navigator.share) {
        await navigator.share({
          title: t('common.brandName', 'Olívia Coffee Beans'),
          text: shareText,
          url: window.location.href
        });
        shareFeedback.textContent = t('confirmation.shareThanks', 'Thanks for sharing!');
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText + ' ' + window.location.href);
        shareFeedback.textContent = t('confirmation.shareCopied', 'Invite link copied to clipboard!');
      } else {
        shareFeedback.textContent = t('confirmation.shareReady', 'Ready to share with friends!');
      }
    } catch (_) {
      shareFeedback.textContent = t('confirmation.shareReady', 'Invite link ready to share!');
    }
  });

  // --------------------------------------------------------------------------
  // Newsletter Form & Global Escape Key
  // --------------------------------------------------------------------------
  newsletterForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validateEmail(newsletterEmail.value)) {
      newsletterError.textContent = t('validation.newsletterEmail', 'Please enter a valid email address.');
      newsletterSuccess.hidden = true;
      newsletterEmail.focus();
      return;
    }
    newsletterError.textContent = '';
    newsletterSuccess.hidden = false;
    newsletterForm.reset();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (!productModal.hidden) closeProductModal();
      if (!cartDrawer.hidden) closeCartDrawer();
      if (!newsletterModal.hidden) closeNewsletterModal();
      if (mobileDrawer.classList.contains('is-open')) closeMobileDrawer();
      if (!cvcTooltip.hidden) {
        cvcPinned = false;
        toggleCvcTooltip(false);
      }
    }
  });

  // --------------------------------------------------------------------------
  // Public Bridge for Milestone 2 Features
  // --------------------------------------------------------------------------
  window.OCB_APP = {
    getLang: function () { return state.lang; },
    setView: setView,
    openProductModal: openProductModal,
    addToCart: addToCart,
    openCartDrawer: openCartDrawer,
    t: t,
    getCartTotals: calculateTotals
  };

  // --------------------------------------------------------------------------
  // Initialize
  // --------------------------------------------------------------------------
  loadState();
  var initialHash = window.location.hash.replace(/^#/, '').toLowerCase();
  var initialView = getHashView();
  if (initialView === 'cart') {
    ensureCheckoutSeedIfNeeded();
  }
  applyLanguage(state.lang);
  setView(initialView, false);
  if (initialHash === 'quiz') {
    window.dispatchEvent(new CustomEvent('ocb:open-quiz'));
  }
})();
