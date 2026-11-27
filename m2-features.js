(function () {
  'use strict';

  var CATALOG = window.OCB_CATALOG || {};
  var M2 = window.OCB_M2 || {};
  var I18N = window.OCB_I18N || {};

  var formatPrice = window.OCB_FORMAT_PRICE || function (usd, brl, lang) {
    return String(lang || 'en').indexOf('pt') === 0
      ? 'R$ ' + Number(brl || 0).toFixed(2).replace('.', ',')
      : '$' + Number(usd || 0).toFixed(2);
  };

  function getApp() {
    return window.OCB_APP || null;
  }

  function getLang() {
    var app = getApp();
    if (app && typeof app.getLang === 'function') {
      return app.getLang();
    }
    return document.documentElement.lang === 'pt-BR' ? 'pt-BR' : 'en';
  }

  function t(path, fallback) {
    var app = getApp();
    if (app && typeof app.t === 'function') {
      var val = app.t(path, fallback);
      if (val !== undefined && val !== '') return val;
    }
    var lang = getLang();
    var dict = I18N[lang] || I18N.en || {};
    var parts = String(path || '').split('.');
    var cur = dict;
    for (var i = 0; i < parts.length; i += 1) {
      if (cur == null || typeof cur !== 'object') {
        cur = undefined;
        break;
      }
      cur = cur[parts[i]];
    }
    return cur !== undefined ? cur : (fallback || '');
  }

  function pickLoc(obj) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    var lang = getLang();
    return obj[lang] !== undefined ? obj[lang] : (obj.en !== undefined ? obj.en : '');
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function round2(n) {
    return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
  }

  function round1(n) {
    return Math.round((Number(n) + Number.EPSILON) * 10) / 10;
  }

  function formatNumber(n, decimals) {
    var lang = getLang();
    var num = Number(n) || 0;
    var fixed = num.toFixed(decimals || 0);
    if (lang.indexOf('pt') === 0) {
      var pts = fixed.split('.');
      pts[0] = pts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return pts.length > 1 ? pts[0] + ',' + pts[1] : pts[0];
    }
    var enPts = fixed.split('.');
    enPts[0] = enPts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return enPts.length > 1 ? enPts[0] + '.' + enPts[1] : enPts[0];
  }

  function findById(list, id) {
    if (!Array.isArray(list)) return null;
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].id === id) return list[i];
    }
    return list[0] || null;
  }

  function getProductById(id) {
    var products = CATALOG.products || [];
    for (var i = 0; i < products.length; i += 1) {
      if (products[i].id === id) return products[i];
    }
    return products[0] || null;
  }

  // --------------------------------------------------------------------------
  // Inline SVG Icons for Quiz Options
  // --------------------------------------------------------------------------
  function getQuizIconSvg(name) {
    var paths = {
      espresso: '<path d="M4 10h12v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-5z"/><path d="M16 11h2a2 2 0 0 1 0 4h-2"/><path d="M8 4v3M12 4v3"/>',
      'pour-over': '<path d="M5 5h14l-5 8v5H10v-5L5 5z"/><path d="M7 19h10"/>',
      'french-press': '<path d="M7 6h10v13H7z"/><path d="M12 3v9M9 3h6M17 8h2a2 2 0 0 1 0 4h-2"/><path d="M7 14h10"/>',
      compass: '<circle cx="12" cy="12" r="9"/><polygon points="15 9 13 13 9 15 11 11 15 9"/>',
      cocoa: '<path d="M12 3c4.5 2.5 6 6.5 6 9.5S15.5 20 12 21c-3.5-1-6-5.5-6-8.5S7.5 5.5 12 3z"/><path d="M12 3v18"/>',
      citrus: '<circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7"/>',
      moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
      sparkles: '<path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z"/><path d="M18.5 15.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8.8-1.7z"/>',
      cup: '<path d="M5 8h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8z"/><path d="M16 9h2a2 2 0 0 1 0 4h-2"/>',
      users: '<circle cx="9" cy="8" r="3"/><path d="M4 19a5 5 0 0 1 10 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 19a4 4 0 0 1 5-3.8"/>',
      leaf: '<path d="M19 5c-7 0-12 4-12 11 0 1.5.5 2.5 1 3 1-5 4-8 10-10-4 4-6 7-6 10 5 0 9-4 9-11 0-1.2-.5-2.2-2-3z"/>',
      bag: '<path d="M6 8h12l1 12H5L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'
    };
    var body = paths[name] || paths.cup;
    return (
      '<svg class="quiz-option-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        body +
      '</svg>'
    );
  }

  // --------------------------------------------------------------------------
  // FEATURE 1: 3-Step Coffee Match Quiz Modal
  // --------------------------------------------------------------------------
  var quizModal = document.getElementById('quiz-modal');
  var quizModalBody = document.getElementById('quiz-modal-body');
  var quizCloseBtn = document.getElementById('quiz-close-btn');

  var quizState = {
    isOpen: false,
    stepIndex: 0,
    showResult: false,
    answers: {
      brewMethod: null,
      flavorProfile: null,
      morningCadence: null
    }
  };

  function computeMatchedPricing(product, sizeId, cadenceId) {
    if (!product) return { unitUsd: 0, unitBrl: 0 };
    var sizeMultiplier = 1.0;
    if (!product.fixedSize) {
      var sz = findById(CATALOG.sizes, sizeId);
      sizeMultiplier = sz ? sz.multiplier : 1.0;
    }
    var cad = findById(CATALOG.cadences, cadenceId);
    var discountPct = cad && cad.discountPct ? cad.discountPct : 0;
    var factor = 1 - discountPct / 100;
    return {
      unitUsd: round2(product.priceUsd * sizeMultiplier * factor),
      unitBrl: round2(product.priceBrl * sizeMultiplier * factor)
    };
  }

  function getMatchedSizeLabel(product, sizeId) {
    if (product && product.fixedSize && product.fixedSizeLabel) {
      return pickLoc(product.fixedSizeLabel);
    }
    var sz = findById(CATALOG.sizes, sizeId);
    return sz ? pickLoc(sz.label) : sizeId;
  }

  function renderQuizModal() {
    if (!quizModalBody) return;
    var quizData = M2.quiz || {};
    var steps = quizData.steps || [];
    if (!steps.length) return;

    var lang = getLang();

    if (!quizState.showResult) {
      var step = steps[quizState.stepIndex] || steps[0];
      var selectedVal = quizState.answers[step.id];
      var pct = Math.round(((quizState.stepIndex + 1) / steps.length) * 100);
      var isLastStep = quizState.stepIndex === steps.length - 1;
      var stepLabelText = t('quiz.stepLabel', 'Step') + ' ' + (quizState.stepIndex + 1) + ' ' + t('quiz.ofLabel', 'of') + ' ' + steps.length;

      var optionsHtml = (step.options || []).map(function (opt) {
        var active = selectedVal === opt.id;
        return (
          '<button type="button" class="quiz-option-card' + (active ? ' is-selected' : '') + '" data-quiz-option="' + escapeHtml(opt.id) + '" aria-pressed="' + String(active) + '">' +
            '<span class="quiz-option-icon">' + getQuizIconSvg(opt.icon) + '</span>' +
            '<span class="quiz-option-text">' +
              '<strong class="quiz-option-label">' + escapeHtml(pickLoc(opt.label)) + '</strong>' +
              '<span class="quiz-option-hint">' + escapeHtml(pickLoc(opt.hint)) + '</span>' +
            '</span>' +
            '<span class="ocb-checkbox ocb-checkbox--primary ocb-checkbox--sm' + (active ? ' is-checked' : '') + '" aria-hidden="true">' +
              (active ? '<img src="assets/checkbox-primary-on.svg" width="24" height="24" alt="">' : '') +
            '</span>' +
          '</button>'
        );
      }).join('');

      quizModalBody.innerHTML =
        '<div class="quiz-progress">' +
          '<div class="quiz-progress-meta">' +
            '<span class="quiz-step-count">' + escapeHtml(stepLabelText) + '</span>' +
            '<span class="quiz-step-pct">' + pct + '%</span>' +
          '</div>' +
          '<div class="quiz-progress-track" role="progressbar" aria-label="' + escapeHtml(t('quiz.progressAria', 'Quiz progress')) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '">' +
            '<div class="quiz-progress-fill" style="width:' + pct + '%"></div>' +
          '</div>' +
        '</div>' +
        '<div class="quiz-step-stage">' +
          '<h3 class="quiz-question">' + escapeHtml(pickLoc(step.question)) + '</h3>' +
          '<p class="quiz-subtitle">' + escapeHtml(pickLoc(step.subtitle)) + '</p>' +
          '<div class="quiz-options-grid">' + optionsHtml + '</div>' +
        '</div>' +
        '<div class="quiz-nav-row">' +
          '<button type="button" class="btn btn--secondary btn--xs quiz-back-btn" id="quiz-back-btn"' + (quizState.stepIndex === 0 ? ' disabled' : '') + '>' +
            escapeHtml(t('quiz.backBtn', 'Back')) +
          '</button>' +
          '<button type="button" class="btn btn--primary btn--xs quiz-next-btn" id="quiz-next-btn"' + (!selectedVal ? ' disabled' : '') + '>' +
            escapeHtml(isLastStep ? t('quiz.seeMatchBtn', 'SEE MY MATCH') : t('quiz.nextBtn', 'Next Step')) +
          '</button>' +
        '</div>';
      return;
    }

    // Match Result View
    var rec = typeof quizData.recommend === 'function'
      ? quizData.recommend(quizState.answers)
      : { productId: 'starter-pack', grind: 'espresso', size: '250g', cadence: 'monthly', reason: { en: '', 'pt-BR': '' } };

    var product = getProductById(rec.productId);
    if (!product) return;

    var pricing = computeMatchedPricing(product, rec.size, rec.cadence);
    var priceStr = formatPrice(pricing.unitUsd, pricing.unitBrl, lang);
    var sizeLabel = getMatchedSizeLabel(product, rec.size);
    var grindObj = findById(CATALOG.grinds, rec.grind);
    var cadenceObj = findById(CATALOG.cadences, rec.cadence);
    var notes = (product.tastingNotes && (product.tastingNotes[lang] || product.tastingNotes.en)) || [];
    var badge = pickLoc(product.badge);

    var tagsHtml = notes.map(function (n) {
      return '<span class="tasting-tag">' + escapeHtml(n) + '</span>';
    }).join('');

    quizModalBody.innerHTML =
      '<div class="quiz-progress">' +
        '<div class="quiz-progress-meta">' +
          '<span class="quiz-step-count">' + escapeHtml(t('quiz.matchEyebrow', 'YOUR CURATED OLÍVIA MATCH')) + '</span>' +
          '<span class="quiz-step-pct">100%</span>' +
        '</div>' +
        '<div class="quiz-progress-track" role="progressbar" aria-label="' + escapeHtml(t('quiz.progressAria', 'Quiz progress')) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100">' +
          '<div class="quiz-progress-fill" style="width:100%"></div>' +
        '</div>' +
      '</div>' +
      '<div class="quiz-result">' +
        '<div class="quiz-result-card">' +
          '<div class="quiz-result-media' + (product.isKraftOverlay ? ' is-kraft' : '') + '">' +
            '<img class="quiz-result-img" src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(pickLoc(product.name)) + '">' +
            (product.isKraftOverlay ? '<img class="quiz-result-kraft-logo" src="assets/logo-green.svg" width="96" height="32" alt="">' : '') +
            (badge ? '<span class="quiz-result-badge">' + escapeHtml(badge) + '</span>' : '') +
          '</div>' +
          '<div class="quiz-result-details">' +
            '<p class="quiz-result-eyebrow">' + escapeHtml(t('quiz.matchHeading', 'We found your ideal morning cup')) + '</p>' +
            '<div class="quiz-result-title-row">' +
              '<h3 class="quiz-result-title">' + escapeHtml(pickLoc(product.name)) + '</h3>' +
              '<strong class="quiz-result-price">' + escapeHtml(priceStr) + '</strong>' +
            '</div>' +
            '<div class="quiz-result-tags">' + tagsHtml + '</div>' +
            '<dl class="quiz-result-specs">' +
              '<div class="quiz-spec-item"><dt>' + escapeHtml(t('quiz.recommendedSizeLabel', 'Bag Size')) + '</dt><dd>' + escapeHtml(sizeLabel) + '</dd></div>' +
              '<div class="quiz-spec-item"><dt>' + escapeHtml(t('quiz.recommendedGrindLabel', 'Grind')) + '</dt><dd>' + escapeHtml(pickLoc(grindObj && grindObj.label)) + '</dd></div>' +
              '<div class="quiz-spec-item"><dt>' + escapeHtml(t('quiz.recommendedCadenceLabel', 'Delivery')) + '</dt><dd>' + escapeHtml(pickLoc(cadenceObj && cadenceObj.label)) + '</dd></div>' +
            '</dl>' +
            '<div class="quiz-result-reason">' +
              '<strong class="quiz-reason-label">' + escapeHtml(t('quiz.whyMatchLabel', 'Why this fits you')) + ':</strong> ' +
              '<span>' + escapeHtml(pickLoc(rec.reason)) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="quiz-result-actions">' +
          '<button type="button" class="btn btn--primary btn--sm quiz-add-match-btn" id="quiz-add-match-btn">' +
            escapeHtml(t('quiz.addMatchBtn', 'ADD MATCH TO CART')) +
          '</button>' +
          '<button type="button" class="btn btn--outline-primary btn--xs quiz-customize-btn" id="quiz-customize-btn">' +
            escapeHtml(t('quiz.openConfiguratorBtn', 'Customize Further')) +
          '</button>' +
          '<button type="button" class="quiz-retake-btn" id="quiz-retake-btn">' +
            escapeHtml(t('quiz.retakeBtn', 'Retake Quiz')) +
          '</button>' +
        '</div>' +
      '</div>';
  }

  function openQuizModal() {
    if (!quizModal) return;
    quizState.isOpen = true;
    renderQuizModal();
    quizModal.hidden = false;
    quizModal.setAttribute('aria-hidden', 'false');
    if (quizCloseBtn) {
      setTimeout(function () { quizCloseBtn.focus(); }, 40);
    }
  }

  function closeQuizModal() {
    if (!quizModal || quizModal.hidden) return;
    quizState.isOpen = false;
    quizModal.hidden = true;
    quizModal.setAttribute('aria-hidden', 'true');
    if (window.location.hash.replace(/^#/, '').toLowerCase() === 'quiz') {
      var app = getApp();
      var fallbackView = document.body.dataset.view || 'home';
      if (app && typeof app.setView === 'function') {
        try {
          window.history.replaceState(null, '', '#' + fallbackView);
        } catch (_) {
          // Ignore file:// history errors
        }
      }
    }
  }

  if (quizModalBody) {
    quizModalBody.addEventListener('click', function (e) {
      var optBtn = e.target.closest('[data-quiz-option]');
      if (optBtn) {
        var steps = (M2.quiz && M2.quiz.steps) || [];
        var step = steps[quizState.stepIndex];
        if (step) {
          quizState.answers[step.id] = optBtn.dataset.quizOption;
          renderQuizModal();
        }
        return;
      }

      if (e.target.closest('#quiz-back-btn')) {
        if (quizState.stepIndex > 0) {
          quizState.stepIndex -= 1;
          renderQuizModal();
        }
        return;
      }

      if (e.target.closest('#quiz-next-btn')) {
        var allSteps = (M2.quiz && M2.quiz.steps) || [];
        var curStep = allSteps[quizState.stepIndex];
        if (!curStep || !quizState.answers[curStep.id]) return;
        if (quizState.stepIndex < allSteps.length - 1) {
          quizState.stepIndex += 1;
        } else {
          quizState.showResult = true;
        }
        renderQuizModal();
        return;
      }

      if (e.target.closest('#quiz-retake-btn')) {
        quizState.stepIndex = 0;
        quizState.showResult = false;
        quizState.answers = {
          brewMethod: null,
          flavorProfile: null,
          morningCadence: null
        };
        renderQuizModal();
        return;
      }

      if (e.target.closest('#quiz-add-match-btn')) {
        var app = getApp();
        var rec = M2.quiz && typeof M2.quiz.recommend === 'function'
          ? M2.quiz.recommend(quizState.answers)
          : null;
        if (app && rec) {
          app.addToCart(rec.productId, rec.size, rec.grind, rec.cadence, 1);
          closeQuizModal();
          app.openCartDrawer();
        }
        return;
      }

      if (e.target.closest('#quiz-customize-btn')) {
        var appCust = getApp();
        var recCust = M2.quiz && typeof M2.quiz.recommend === 'function'
          ? M2.quiz.recommend(quizState.answers)
          : null;
        if (appCust && recCust) {
          closeQuizModal();
          appCust.openProductModal(recCust.productId);
        }
      }
    });
  }

  window.addEventListener('ocb:open-quiz', openQuizModal);
  window.addEventListener('ocb:close-quiz', closeQuizModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && quizModal && !quizModal.hidden) {
      closeQuizModal();
    }
  });

  // --------------------------------------------------------------------------
  // FEATURE 2: Interactive Farm-to-Cup Origin & Impact Tracker
  // --------------------------------------------------------------------------
  var impactContentEl = document.getElementById('impact-tracker-content');
  var impactState = {
    selectedLotId: 'starter-pack',
    bagsPerYear: 6
  };

  function updateImpactMetricsInPlace() {
    var product = getProductById(impactState.selectedLotId);
    var lotMap = M2.impactTracker || {};
    var lot = lotMap[impactState.selectedLotId];
    if (!product || !lot) return;

    var bags = Math.min(12, Math.max(1, parseInt(impactState.bagsPerYear, 10) || 6));
    var lang = getLang();
    var co2PerBag = (product.lotMetadata && product.lotMetadata.co2OffsetKg) || 1.2;

    var totalCo2 = round1(co2PerBag * bags);
    var totalUsd = round2((lot.extraFarmerUsdPerBag || 0) * bags);
    var totalBrl = round2((lot.extraFarmerBrlPerBag || 0) * bags);
    var totalWater = Math.round((lot.cleanWaterLitersPerBag || 0) * bags);
    var totalSchool = round1((lot.schoolHoursPerBag || 0) * bags);

    var bagsValEl = document.getElementById('impact-bags-val');
    var summaryCountEl = document.getElementById('impact-summary-bags');
    var co2El = document.getElementById('impact-metric-co2');
    var incomeEl = document.getElementById('impact-metric-income');
    var waterEl = document.getElementById('impact-metric-water');
    var schoolEl = document.getElementById('impact-metric-school');

    if (bagsValEl) bagsValEl.textContent = String(bags);
    if (summaryCountEl) summaryCountEl.textContent = String(bags);
    if (co2El) co2El.textContent = formatNumber(totalCo2, 1) + ' kg CO₂e';
    if (incomeEl) incomeEl.textContent = formatPrice(totalUsd, totalBrl, lang);
    if (waterEl) waterEl.textContent = formatNumber(totalWater, 0) + ' ' + t('impact.cleanWaterUnit', 'Liters');
    if (schoolEl) schoolEl.textContent = formatNumber(totalSchool, 1) + ' ' + t('impact.schoolHoursUnit', 'Hours');
  }

  function renderImpactTracker() {
    if (!impactContentEl) return;
    var products = CATALOG.products || [];
    var lotMap = M2.impactTracker || {};
    if (!products.length) return;

    if (!lotMap[impactState.selectedLotId]) {
      impactState.selectedLotId = products[0].id;
    }

    var product = getProductById(impactState.selectedLotId);
    var lot = lotMap[impactState.selectedLotId] || {};
    var meta = product.lotMetadata || {};
    var breakdown = lot.priceBreakdown || { farmerPct: 48, roastingPackPct: 34, communityFundPct: 18 };
    var bags = impactState.bagsPerYear;

    var pillsHtml = products.map(function (p) {
      var pLot = lotMap[p.id] || {};
      var active = p.id === impactState.selectedLotId;
      return (
        '<button type="button" class="impact-lot-pill' + (active ? ' is-active' : '') + '" data-impact-lot="' + escapeHtml(p.id) + '" aria-pressed="' + String(active) + '">' +
          '<span class="impact-pill-code">' + escapeHtml(pLot.lotCode || p.sku) + '</span>' +
          '<span class="impact-pill-name">' + escapeHtml(pickLoc(p.name)) + '</span>' +
        '</button>'
      );
    }).join('');

    impactContentEl.innerHTML =
      '<div class="impact-lot-selector">' +
        '<span class="impact-selector-label">' + escapeHtml(t('impact.selectLotLabel', 'Select a Coffee Lot')) + '</span>' +
        '<div class="impact-lot-pills" role="group" aria-label="' + escapeHtml(t('impact.selectLotLabel', 'Select a Coffee Lot')) + '">' +
          pillsHtml +
        '</div>' +
      '</div>' +
      '<div class="impact-grid">' +
        '<article class="impact-dossier-card">' +
          '<div class="impact-dossier-head">' +
            '<div>' +
              '<span class="impact-lot-code">' + escapeHtml(t('impact.lotCodeLabel', 'Lot Code')) + ': ' + escapeHtml(lot.lotCode || '') + '</span>' +
              '<h3 class="impact-dossier-title">' + escapeHtml(pickLoc(product.name)) + '</h3>' +
            '</div>' +
            '<span class="impact-premium-badge">+' + escapeHtml(meta.wagePremiumPct || 0) + '% ' + escapeHtml(t('impact.wagePremiumLabel', 'Wage Premium')) + '</span>' +
          '</div>' +
          '<dl class="impact-meta-grid">' +
            '<div class="impact-meta-item"><dt>' + escapeHtml(t('impact.farmLabel', 'Partner Farm')) + '</dt><dd>' + escapeHtml(lot.farm || meta.farm || '') + '</dd></div>' +
            '<div class="impact-meta-item"><dt>' + escapeHtml(t('impact.regionLabel', 'Growing Region')) + '</dt><dd>' + escapeHtml(pickLoc(lot.region)) + '</dd></div>' +
            '<div class="impact-meta-item"><dt>' + escapeHtml(t('impact.harvestLabel', 'Harvest')) + '</dt><dd>' + escapeHtml(lot.harvestDate || meta.harvestDate || '') + '</dd></div>' +
            '<div class="impact-meta-item"><dt>' + escapeHtml(t('impact.roastDateLabel', 'Roast Date')) + '</dt><dd>' + escapeHtml(lot.roastDate || meta.roastDate || '') + '</dd></div>' +
          '</dl>' +
          '<div class="impact-story-block">' +
            '<h4 class="impact-block-heading">' + escapeHtml(t('impact.farmerStoryHeading', 'Producer Story')) + '</h4>' +
            '<p class="impact-story-text">' + escapeHtml(pickLoc(lot.farmerStory)) + '</p>' +
          '</div>' +
          '<div class="impact-breakdown-block">' +
            '<h4 class="impact-block-heading">' + escapeHtml(t('impact.priceBreakdownHeading', 'Where Your Bag Price Goes')) + '</h4>' +
            '<div class="impact-breakdown-bar" role="img" aria-label="' + escapeHtml(t('impact.priceBreakdownHeading', 'Where Your Bag Price Goes')) + '">' +
              '<span class="impact-seg impact-seg--farmer" style="width:' + breakdown.farmerPct + '%">' + breakdown.farmerPct + '%</span>' +
              '<span class="impact-seg impact-seg--roasting" style="width:' + breakdown.roastingPackPct + '%">' + breakdown.roastingPackPct + '%</span>' +
              '<span class="impact-seg impact-seg--community" style="width:' + breakdown.communityFundPct + '%">' + breakdown.communityFundPct + '%</span>' +
            '</div>' +
            '<ul class="impact-breakdown-legend">' +
              '<li class="impact-legend-item"><span class="impact-swatch impact-swatch--farmer"></span><span>' + escapeHtml(t('impact.farmerShareLabel', 'Direct to Farmer')) + ' (' + breakdown.farmerPct + '%)</span></li>' +
              '<li class="impact-legend-item"><span class="impact-swatch impact-swatch--roasting"></span><span>' + escapeHtml(t('impact.roastingPackShareLabel', 'Solar Roasting & Compostable Pack')) + ' (' + breakdown.roastingPackPct + '%)</span></li>' +
              '<li class="impact-legend-item"><span class="impact-swatch impact-swatch--community"></span><span>' + escapeHtml(t('impact.communityFundShareLabel', 'Rural Water & School Fund')) + ' (' + breakdown.communityFundPct + '%)</span></li>' +
            '</ul>' +
          '</div>' +
          '<div class="impact-dossier-actions">' +
            '<button type="button" class="btn btn--accent impact-shop-btn" data-impact-shop="' + escapeHtml(product.id) + '">' +
              escapeHtml(t('impact.shopThisLotBtn', 'SHOP THIS LOT')) +
            '</button>' +
          '</div>' +
        '</article>' +
        '<aside class="impact-simulator-card">' +
          '<h3 class="impact-sim-title">' + escapeHtml(t('impact.calculatorTitle', 'Simulate Your Annual Household Impact')) + '</h3>' +
          '<div class="impact-slider-wrap">' +
            '<div class="impact-slider-head">' +
              '<label for="impact-bags-slider" class="impact-slider-label">' + escapeHtml(t('impact.calculatorBagsLabel', 'Bags per year')) + '</label>' +
              '<strong class="impact-bags-badge"><span id="impact-bags-val">' + bags + '</span></strong>' +
            '</div>' +
            '<input type="range" id="impact-bags-slider" class="impact-slider" min="1" max="12" step="1" value="' + bags + '">' +
            '<div class="impact-slider-scale" aria-hidden="true"><span>1</span><span>6</span><span>12</span></div>' +
          '</div>' +
          '<p class="impact-sim-summary">' +
            escapeHtml(t('impact.calculatorSummaryPrefix', 'Your annual order funds')) + ' (<strong id="impact-summary-bags">' + bags + '</strong> ' + escapeHtml(t('impact.calculatorBagsLabel', 'Bags per year').toLowerCase()) + '):' +
          '</p>' +
          '<div class="impact-metrics-grid">' +
            '<div class="impact-metric-card">' +
              '<span class="impact-metric-label">' + escapeHtml(t('impact.co2OffsetLabel', 'CO₂ Offset')) + '</span>' +
              '<strong class="impact-metric-value" id="impact-metric-co2"></strong>' +
            '</div>' +
            '<div class="impact-metric-card">' +
              '<span class="impact-metric-label">' + escapeHtml(t('impact.extraIncomeLabel', 'Extra Farmer Income vs. Commodity')) + '</span>' +
              '<strong class="impact-metric-value" id="impact-metric-income"></strong>' +
            '</div>' +
            '<div class="impact-metric-card">' +
              '<span class="impact-metric-label">' + escapeHtml(t('impact.cleanWaterLabel', 'Clean Water Filtered')) + '</span>' +
              '<strong class="impact-metric-value" id="impact-metric-water"></strong>' +
            '</div>' +
            '<div class="impact-metric-card">' +
              '<span class="impact-metric-label">' + escapeHtml(t('impact.schoolHoursLabel', 'Rural School Funding')) + '</span>' +
              '<strong class="impact-metric-value" id="impact-metric-school"></strong>' +
            '</div>' +
          '</div>' +
        '</aside>' +
      '</div>';

    updateImpactMetricsInPlace();
  }

  if (impactContentEl) {
    impactContentEl.addEventListener('click', function (e) {
      var pill = e.target.closest('[data-impact-lot]');
      if (pill) {
        impactState.selectedLotId = pill.dataset.impactLot;
        renderImpactTracker();
        return;
      }
      var shopBtn = e.target.closest('[data-impact-shop]');
      if (shopBtn) {
        var app = getApp();
        if (app && typeof app.openProductModal === 'function') {
          app.openProductModal(shopBtn.dataset.impactShop);
        }
      }
    });

    impactContentEl.addEventListener('input', function (e) {
      if (e.target && e.target.id === 'impact-bags-slider') {
        impactState.bagsPerYear = Math.min(12, Math.max(1, parseInt(e.target.value, 10) || 1));
        updateImpactMetricsInPlace();
      }
    });
  }

  // --------------------------------------------------------------------------
  // FEATURE 3: UX/UI Case Study Page (#view-case-study)
  // --------------------------------------------------------------------------
  var caseStudyContentEl = document.getElementById('case-study-content');
  var copyFeedbackTimer = null;
  var lastCopiedHex = null;
  var csSpecimenState = {
    switchOn: true,
    checkboxes: {
      primary: true,
      secondary: false,
      accent: false
    }
  };

  function buildSpecimenCheckboxHtml(variant, label) {
    var checked = Boolean(csSpecimenState.checkboxes[variant]);
    var asset = 'assets/checkbox-' + variant + '-on.svg';
    return (
      '<button type="button" class="ocb-checkbox ocb-checkbox--' + variant + (checked ? ' is-checked' : '') + '" ' +
        'data-cs-checkbox="' + variant + '" aria-pressed="' + String(checked) + '" aria-label="' + escapeHtml(label) + '" title="' + escapeHtml(label) + '" style="padding:0;cursor:pointer">' +
        (checked ? '<img src="' + asset + '" width="30" height="30" alt="">' : '') +
      '</button>'
    );
  }

  function buildSpecimenTextFieldHtml(opts) {
    var fieldClass = 'form-field' + (opts.stateClass ? ' ' + opts.stateClass : '');
    return (
      '<div class="' + fieldClass + '">' +
        '<label for="' + escapeHtml(opts.id) + '" class="field-label">' + escapeHtml(opts.label) + '</label>' +
        '<input id="' + escapeHtml(opts.id) + '" type="' + escapeHtml(opts.type || 'text') + '" class="field-input" ' +
          (opts.value ? 'value="' + escapeHtml(opts.value) + '" ' : '') +
          (opts.placeholder ? 'placeholder="' + escapeHtml(opts.placeholder) + '" ' : '') +
          (opts.disabled ? 'disabled ' : '') +
        '>' +
        (opts.error ? '<span class="field-error">' + escapeHtml(opts.error) + '</span>' : '') +
      '</div>'
    );
  }

  function buildSpecimenReviewCardHtml(opts) {
    var starsHtml = '';
    for (var s = 0; s < 5; s += 1) {
      starsHtml += '<img class="ocb-star" src="assets/star-full.svg" width="26" height="23" alt="">';
    }
    return (
      '<article class="review-card review-card--' + escapeHtml(opts.theme) + '">' +
        '<div class="review-card-header">' +
          '<div class="review-avatar" aria-hidden="true"><span>' + escapeHtml(opts.initials) + '</span></div>' +
          '<div class="review-header-info">' +
            '<h4 class="review-author-name">' + escapeHtml(opts.author.toUpperCase()) + '</h4>' +
            '<div class="review-rating-row" aria-label="5.0">' +
              starsHtml +
              '<span class="review-rating-num">5.0</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<p class="review-quote">“' + escapeHtml(opts.quote) + '”</p>' +
        '<footer class="review-footer">' +
          '<span class="review-meta">' + escapeHtml(opts.meta) + '</span>' +
          '<span class="review-verified">' + escapeHtml(opts.verified) + '</span>' +
        '</footer>' +
      '</article>'
    );
  }

  function fallbackCopyText(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (_) {
      // Ignore copy fallback failure
    }
    document.body.removeChild(ta);
  }

  function copyHexToken(hex, btnEl) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(hex).catch(function () {
        fallbackCopyText(hex);
      });
    } else {
      fallbackCopyText(hex);
    }

    lastCopiedHex = hex;
    clearTimeout(copyFeedbackTimer);

    var cards = caseStudyContentEl ? caseStudyContentEl.querySelectorAll('.cs-swatch-card') : [];
    cards.forEach(function (c) {
      var isTarget = c === btnEl;
      c.classList.toggle('is-copied', isTarget);
      var statusEl = c.querySelector('.cs-swatch-copy-status');
      if (statusEl) {
        var lang = getLang();
        if (isTarget) {
          statusEl.textContent = lang === 'pt-BR' ? 'Copiado: ' + hex : 'Copied: ' + hex;
        } else {
          statusEl.textContent = lang === 'pt-BR' ? 'Copiar hex' : 'Copy hex';
        }
      }
    });

    copyFeedbackTimer = setTimeout(function () {
      lastCopiedHex = null;
      if (!caseStudyContentEl) return;
      var lang = getLang();
      caseStudyContentEl.querySelectorAll('.cs-swatch-card').forEach(function (c) {
        c.classList.remove('is-copied');
        var statusEl = c.querySelector('.cs-swatch-copy-status');
        if (statusEl) {
          statusEl.textContent = lang === 'pt-BR' ? 'Copiar hex' : 'Copy hex';
        }
      });
    }, 1800);
  }

  function renderCaseStudy() {
    if (!caseStudyContentEl) return;
    var cs = M2.caseStudy;
    if (!cs) return;

    var lang = getLang();
    var meta = cs.meta || {};
    var brief = cs.brief || {};
    var persona = cs.chloePersona || {};
    var painSolutions = cs.painSolutions || [];
    var evolution = cs.evolution || [];
    var tokens = cs.designTokens || [];
    var typography = cs.typographySpecimens || [];

    var deliverablesList = (meta.deliverables && (meta.deliverables[lang] || meta.deliverables.en)) || [];
    var stackList = meta.stack || [];
    var goals = (persona.goals && (persona.goals[lang] || persona.goals.en)) || [];
    var frustrations = (persona.frustrations && (persona.frustrations[lang] || persona.frustrations.en)) || [];

    var metaStripHtml =
      '<section class="cs-section cs-meta-strip" aria-label="' + escapeHtml(t('caseStudy.metaHeading', 'Project Snapshot')) + '">' +
        '<div class="cs-meta-grid">' +
          '<div class="cs-meta-item"><span class="cs-meta-label">' + escapeHtml(t('caseStudy.roleLabel', 'Role')) + '</span><strong class="cs-meta-val">' + escapeHtml(pickLoc(meta.role)) + '</strong></div>' +
          '<div class="cs-meta-item"><span class="cs-meta-label">' + escapeHtml(t('caseStudy.timelineLabel', 'Timeline')) + '</span><strong class="cs-meta-val">' + escapeHtml(pickLoc(meta.timeline)) + '</strong></div>' +
          '<div class="cs-meta-item"><span class="cs-meta-label">' + escapeHtml(t('caseStudy.versionLabel', 'Current Build')) + '</span><strong class="cs-meta-val cs-version-pill">' + escapeHtml(meta.version || 'v0.2') + '</strong></div>' +
        '</div>' +
        '<div class="cs-meta-tags-row">' +
          '<div class="cs-meta-tag-group"><span class="cs-meta-label">' + escapeHtml(t('caseStudy.deliverablesLabel', 'Deliverables')) + ':</span><div class="cs-chip-list">' +
            deliverablesList.map(function (d) { return '<span class="cs-chip">' + escapeHtml(d) + '</span>'; }).join('') +
          '</div></div>' +
          '<div class="cs-meta-tag-group"><span class="cs-meta-label">' + escapeHtml(t('caseStudy.stackLabel', 'Tech Stack')) + ':</span><div class="cs-chip-list">' +
            stackList.map(function (s) { return '<span class="cs-chip cs-chip--dark">' + escapeHtml(s) + '</span>'; }).join('') +
          '</div></div>' +
        '</div>' +
      '</section>';

    var briefHtml =
      '<section class="cs-section cs-brief-section">' +
        '<div class="cs-brief-card">' +
          '<p class="cs-section-eyebrow">' + escapeHtml(pickLoc(brief.eyebrow)) + '</p>' +
          '<h2 class="cs-section-title">' + escapeHtml(pickLoc(brief.title)) + '</h2>' +
          '<p class="cs-brief-summary">' + escapeHtml(pickLoc(brief.summary)) + '</p>' +
          '<div class="cs-brief-grid">' +
            '<div class="cs-brief-box"><h3>' + escapeHtml(t('caseStudy.challengeLabel', 'Core Challenge')) + '</h3><p>' + escapeHtml(pickLoc(brief.challenge)) + '</p></div>' +
            '<div class="cs-brief-box cs-brief-box--accent"><h3>' + escapeHtml(t('caseStudy.outcomeLabel', 'Outcome')) + '</h3><p>' + escapeHtml(pickLoc(brief.outcome)) + '</p></div>' +
          '</div>' +
        '</div>' +
      '</section>';

    var personaHtml =
      '<section class="cs-section cs-persona-section">' +
        '<div class="cs-section-head">' +
          '<p class="cs-section-eyebrow">' + escapeHtml(t('caseStudy.personaEyebrow', 'PRIMARY USER PERSONA')) + '</p>' +
          '<h2 class="cs-section-title">' + escapeHtml(t('caseStudy.personaHeading', 'Designing for Chloe')) + '</h2>' +
        '</div>' +
        '<article class="cs-persona-card">' +
          '<div class="cs-persona-header">' +
            '<div class="cs-persona-avatar" aria-hidden="true">C</div>' +
            '<div class="cs-persona-identity">' +
              '<h3 class="cs-persona-name">' + escapeHtml(persona.name || 'Chloe') + '</h3>' +
              '<p class="cs-persona-role">' + escapeHtml(pickLoc(persona.occupation)) + ' · ' + escapeHtml(pickLoc(persona.location)) + '</p>' +
            '</div>' +
            '<span class="cs-persona-badge">' + escapeHtml(pickLoc(persona.buyerStage)) + '</span>' +
          '</div>' +
          '<dl class="cs-persona-facts">' +
            '<div class="cs-fact"><dt>' + escapeHtml(t('caseStudy.ageLabel', 'Age')) + '</dt><dd>' + escapeHtml(pickLoc(persona.age)) + '</dd></div>' +
            '<div class="cs-fact"><dt>' + escapeHtml(t('caseStudy.locationLabel', 'Location')) + '</dt><dd>' + escapeHtml(pickLoc(persona.location)) + '</dd></div>' +
            '<div class="cs-fact"><dt>' + escapeHtml(t('caseStudy.occupationLabel', 'Role')) + '</dt><dd>' + escapeHtml(pickLoc(persona.occupation)) + '</dd></div>' +
            '<div class="cs-fact"><dt>' + escapeHtml(t('caseStudy.householdLabel', 'Household')) + '</dt><dd>' + escapeHtml(pickLoc(persona.household)) + '</dd></div>' +
          '</dl>' +
          '<blockquote class="cs-persona-quote">' + escapeHtml(pickLoc(persona.quote)) + '</blockquote>' +
          '<div class="cs-persona-lists">' +
            '<div class="cs-persona-col"><h4>' + escapeHtml(t('caseStudy.goalsLabel', 'Key Goals')) + '</h4><ul>' +
              goals.map(function (g) { return '<li>' + escapeHtml(g) + '</li>'; }).join('') +
            '</ul></div>' +
            '<div class="cs-persona-col cs-persona-col--friction"><h4>' + escapeHtml(t('caseStudy.frustrationsLabel', 'Pain Points')) + '</h4><ul>' +
              frustrations.map(function (f) { return '<li>' + escapeHtml(f) + '</li>'; }).join('') +
            '</ul></div>' +
          '</div>' +
        '</article>' +
      '</section>';

    var painSolutionsHtml =
      '<section class="cs-section cs-solutions-section">' +
        '<div class="cs-section-head">' +
          '<p class="cs-section-eyebrow">' + escapeHtml(t('caseStudy.painSolutionsEyebrow', 'FROM INSIGHT TO INTERFACE')) + '</p>' +
          '<h2 class="cs-section-title">' + escapeHtml(t('caseStudy.painSolutionsHeading', 'Pain Points Solved & Impact')) + '</h2>' +
        '</div>' +
        '<div class="cs-pain-grid">' +
          painSolutions.map(function (item) {
            return (
              '<article class="cs-pain-card">' +
                '<div class="cs-pain-block"><span class="cs-card-tag cs-card-tag--pain">' + escapeHtml(t('caseStudy.painLabel', 'Buyer Friction')) + '</span><p>' + escapeHtml(pickLoc(item.pain)) + '</p></div>' +
                '<div class="cs-solution-block"><span class="cs-card-tag cs-card-tag--solution">' + escapeHtml(t('caseStudy.solutionLabel', 'Design Solution')) + '</span><p>' + escapeHtml(pickLoc(item.solution)) + '</p></div>' +
                '<div class="cs-kpi-block"><span class="cs-card-tag cs-card-tag--kpi">' + escapeHtml(t('caseStudy.kpiLabel', 'Result')) + '</span><strong>' + escapeHtml(pickLoc(item.kpi)) + '</strong></div>' +
              '</article>'
            );
          }).join('') +
        '</div>' +
      '</section>';

    var evolutionHtml =
      '<section class="cs-section cs-evolution-section">' +
        '<div class="cs-section-head">' +
          '<p class="cs-section-eyebrow">' + escapeHtml(t('caseStudy.evolutionEyebrow', 'ITERATIVE SHIP LOG')) + '</p>' +
          '<h2 class="cs-section-title">' + escapeHtml(t('caseStudy.evolutionHeading', 'Product Evolution (v0.1 -> v0.2)')) + '</h2>' +
        '</div>' +
        '<div class="cs-evolution-grid">' +
          evolution.map(function (evo) {
            var highlights = (evo.highlights && (evo.highlights[lang] || evo.highlights.en)) || [];
            return (
              '<article class="cs-evo-card">' +
                '<div class="cs-evo-top"><span class="cs-evo-version">' + escapeHtml(evo.version) + '</span><h3 class="cs-evo-title">' + escapeHtml(pickLoc(evo.title)) + '</h3></div>' +
                '<p class="cs-evo-summary">' + escapeHtml(pickLoc(evo.summary)) + '</p>' +
                '<ul class="cs-evo-highlights">' +
                  highlights.map(function (h) { return '<li>' + escapeHtml(h) + '</li>'; }).join('') +
                '</ul>' +
                '<button type="button" class="btn btn--primary cs-evo-jump-btn" data-cs-jump="' + escapeHtml(evo.jumpTarget) + '">' +
                  escapeHtml(pickLoc(evo.ctaLabel)) + ' →' +
                '</button>' +
              '</article>'
            );
          }).join('') +
        '</div>' +
      '</section>';

    var copyIdleLabel = lang === 'pt-BR' ? 'Copiar hex' : 'Copy hex';
    var copyActivePrefix = lang === 'pt-BR' ? 'Copiado: ' : 'Copied: ';

    var swatchesHtml = tokens.map(function (tok) {
      var isCopied = lastCopiedHex === tok.hex;
      var hexUpper = String(tok.hex || '').toUpperCase();
      var lightSwatch = ['#FFF2E6', '#E7DBCF', '#C0AE90', '#FEC51B', '#FACD66', '#4EEEA6', '#F0F0F0', '#D2D2D2', '#BEBEBE'].indexOf(hexUpper) !== -1;
      return (
        '<button type="button" class="cs-swatch-card' + (isCopied ? ' is-copied' : '') + '" data-copy-hex="' + escapeHtml(tok.hex) + '">' +
          '<span class="cs-swatch-color' + (lightSwatch ? ' is-light' : '') + '" style="background-color:' + escapeHtml(tok.hex) + '">' +
            '<span class="cs-swatch-hex">' + escapeHtml(tok.hex) + '</span>' +
          '</span>' +
          '<span class="cs-swatch-info">' +
            '<strong class="cs-swatch-name">' + escapeHtml(pickLoc(tok.name)) + '</strong>' +
            '<code class="cs-swatch-token">' + escapeHtml(tok.token) + '</code>' +
            '<span class="cs-swatch-role">' + escapeHtml(pickLoc(tok.role)) + '</span>' +
            '<span class="cs-swatch-copy-status">' + escapeHtml(isCopied ? copyActivePrefix + tok.hex : copyIdleLabel) + '</span>' +
          '</span>' +
        '</button>'
      );
    }).join('');

    var typographyHtml = typography.map(function (spec) {
      return (
        '<article class="cs-type-card">' +
          '<div class="cs-type-meta">' +
            '<strong class="cs-type-family">' + escapeHtml(spec.family) + '</strong>' +
            '<span class="cs-type-weight">' + escapeHtml(spec.weightLabel) + '</span>' +
          '</div>' +
          '<p class="cs-type-sample" style="font-family:\'' + escapeHtml(spec.family) + '\', sans-serif">' + escapeHtml(pickLoc(spec.sample)) + '</p>' +
          '<p class="cs-type-role">' + escapeHtml(pickLoc(spec.role)) + '</p>' +
        '</article>'
      );
    }).join('');

    var isPt = lang === 'pt-BR';
    var componentHeading = t('caseStudy.componentsHeading', 'Figma 103:57 Component Specimens');
    var componentSubtitle = t('caseStudy.componentsSubtitle', 'Live interactive primitives aligned directly to the Figma Components & Style Guides pages.');
    var switchOn = csSpecimenState.switchOn;

    var logosSpec = [
      { file: 'logo-green.svg', label: 'Primary', dark: false },
      { file: 'logo-dark.svg', label: 'Dark', dark: false },
      { file: 'logo-cream.svg', label: 'Secondary', dark: true },
      { file: 'logo-accent.svg', label: 'Accent', dark: true },
      { file: 'logo-white.svg', label: 'White', dark: true }
    ];

    var stateChipsHtml =
      '<div class="cs-components-preview">' +
        '<h3 class="cs-sub-heading">' + escapeHtml(componentHeading) + '</h3>' +
        '<p class="cs-components-sub">' + escapeHtml(componentSubtitle) + '</p>' +
        '<div class="cs-figma-grid">' +
          '<div class="cs-specimen-card">' +
            '<span class="cs-specimen-title">' + escapeHtml(isPt ? 'Button (116:112) — Sólido & Outline' : 'Button (116:112) — Solid & Outline') + '</span>' +
            '<div class="cs-specimen-row">' +
              '<button type="button" class="btn btn--primary btn--xs" data-nav="shop">' + escapeHtml(isPt ? 'Primário' : 'Primary') + '</button>' +
              '<button type="button" class="btn btn--secondary btn--xs" data-nav="features">' + escapeHtml(isPt ? 'Secundário' : 'Secondary') + '</button>' +
              '<button type="button" class="btn btn--accent btn--xs" data-action="open-quiz">' + escapeHtml(isPt ? 'Destaque' : 'Accent') + '</button>' +
              '<button type="button" class="btn btn--outline-primary btn--xs" data-nav="cart">' + escapeHtml(isPt ? 'Outline Primário' : 'Primary Outline') + '</button>' +
            '</div>' +
            '<div class="cs-dark-surface">' +
              '<button type="button" class="btn btn--outline-secondary btn--xs" data-nav="features">' + escapeHtml(isPt ? 'Outline Secundário' : 'Secondary Outline') + '</button>' +
              '<button type="button" class="btn btn--outline-accent btn--xs" data-action="open-quiz">' + escapeHtml(isPt ? 'Outline Destaque' : 'Accent Outline') + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="cs-specimen-card">' +
            '<span class="cs-specimen-title">' + escapeHtml(isPt ? 'Switch (116:64), Checkbox (117:514), Star (117:260) & LanguageToggle (485:1473)' : 'Switch (116:64), Checkbox (117:514), Star (117:260) & LanguageToggle (485:1473)') + '</span>' +
            '<div class="cs-specimen-row">' +
              '<button type="button" class="ocb-switch' + (switchOn ? ' is-on' : '') + '" data-cs-switch role="switch" aria-checked="' + String(switchOn) + '" aria-label="' + escapeHtml(isPt ? 'Alternar assinatura' : 'Toggle subscription') + '">' +
                '<img class="ocb-switch-img" src="assets/switch-' + (switchOn ? 'on' : 'off') + '.svg" width="36" height="17" alt="">' +
              '</button>' +
              buildSpecimenCheckboxHtml('primary', isPt ? 'Checkbox Primário' : 'Primary Checkbox') +
              buildSpecimenCheckboxHtml('secondary', isPt ? 'Checkbox Secundário' : 'Secondary Checkbox') +
              buildSpecimenCheckboxHtml('accent', isPt ? 'Checkbox Destaque' : 'Accent Checkbox') +
            '</div>' +
            '<div class="cs-specimen-row" style="margin-top:14px; justify-content:space-between; flex-wrap:wrap; gap:14px">' +
              '<div class="cs-specimen-row">' +
                '<img class="ocb-star" src="assets/star-full.svg" width="26" height="23" alt="' + escapeHtml(isPt ? 'Estrela cheia' : 'Full star') + '">' +
                '<img class="ocb-star" src="assets/star-half.svg" width="26" height="23" alt="' + escapeHtml(isPt ? 'Meia estrela' : 'Half star') + '">' +
                '<img class="ocb-star" src="assets/star-empty.svg" width="26" height="23" alt="' + escapeHtml(isPt ? 'Estrela vazia' : 'Empty star') + '">' +
              '</div>' +
              '<div class="lang-toggle lang-toggle--figma" role="group" aria-label="' + escapeHtml(t('common.languageToggleAria', 'Switch language between English and Brazilian Portuguese')) + '">' +
                '<button type="button" class="lang-btn' + (!isPt ? ' is-active' : '') + '" data-cs-lang="en" aria-pressed="' + String(!isPt) + '">EN</button>' +
                '<button type="button" class="lang-btn' + (isPt ? ' is-active' : '') + '" data-cs-lang="pt-BR" aria-pressed="' + String(isPt) + '">PT</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="cs-specimen-card cs-specimen-card--full">' +
            '<span class="cs-specimen-title">' + escapeHtml(isPt ? 'Text Field (118:614) — Estados' : 'Text Field (118:614) — States') + '</span>' +
            '<div class="cs-textfield-grid">' +
              buildSpecimenTextFieldHtml({ id: 'cs-tf-default', label: isPt ? 'Padrão' : 'Default', placeholder: isPt ? 'nome@email.com' : 'name@email.com' }) +
              buildSpecimenTextFieldHtml({ id: 'cs-tf-active', label: isPt ? 'Ativo / Válido' : 'Active / Valid', value: 'chloe@oliviacoffee.com', stateClass: 'is-valid' }) +
              buildSpecimenTextFieldHtml({ id: 'cs-tf-disabled', label: isPt ? 'Desabilitado' : 'Disabled', value: isPt ? 'Campo bloqueado' : 'Locked value', stateClass: 'is-disabled', disabled: true }) +
              buildSpecimenTextFieldHtml({ id: 'cs-tf-error', label: isPt ? 'Erro' : 'Error', value: 'chloe@invalid', stateClass: 'is-error', error: isPt ? 'Informe um e-mail válido.' : 'Enter a valid email address.' }) +
            '</div>' +
          '</div>' +
          '<div class="cs-specimen-card cs-specimen-card--full">' +
            '<span class="cs-specimen-title">' + escapeHtml(isPt ? 'ReviewCard (121:124) — Claro & Escuro' : 'ReviewCard (121:124) — Light & Dark Modes') + '</span>' +
            '<div class="cs-review-pair">' +
              buildSpecimenReviewCardHtml({
                theme: 'light',
                initials: 'CA',
                author: 'Camila Andrade',
                quote: isPt ? 'Crema de avelã densa toda manhã e pacote 100% compostável.' : 'Thick hazelnut crema every morning and a 100% compostable pouch.',
                meta: 'Belo Horizonte, MG · DarkMode Card',
                verified: t('reviews.verifiedBadge', 'Verified Buyer')
              }) +
              buildSpecimenReviewCardHtml({
                theme: 'dark',
                initials: 'MV',
                author: 'Marcus Vance',
                quote: isPt ? 'Acidez cítrica limpa na V60 e rastreabilidade exemplar da fazenda.' : 'Clean citrus clarity on V60 and transparent farm traceability.',
                meta: 'Portland, OR · LightMode Card',
                verified: t('reviews.verifiedBadge', 'Verified Buyer')
              }) +
            '</div>' +
          '</div>' +
          '<div class="cs-specimen-card cs-specimen-card--full">' +
            '<span class="cs-specimen-title">' + escapeHtml(isPt ? 'Logo (121:48) — 5 Variantes' : 'Logo (121:48) — 5 Brand Variants') + '</span>' +
            '<div class="cs-logo-grid">' +
              logosSpec.map(function (lg) {
                return (
                  '<div class="cs-logo-tile' + (lg.dark ? ' cs-logo-tile--dark' : '') + '">' +
                    '<img src="assets/' + lg.file + '" width="175" height="57" alt="Olívia Coffee Beans ' + escapeHtml(lg.label) + ' Logo">' +
                    '<span>' + escapeHtml(lg.label) + '</span>' +
                  '</div>'
                );
              }).join('') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    var designSystemHtml =
      '<section class="cs-section cs-design-system-section">' +
        '<div class="cs-section-head">' +
          '<p class="cs-section-eyebrow">' + escapeHtml(t('caseStudy.tokensEyebrow', 'FIGMA DESIGN SYSTEM')) + '</p>' +
          '<h2 class="cs-section-title">' + escapeHtml(t('caseStudy.tokensHeading', 'Color Tokens & Typography')) + '</h2>' +
        '</div>' +
        '<div class="cs-ds-block">' +
          '<h3 class="cs-sub-heading">' + escapeHtml(t('caseStudy.colorsSubheading', 'Semantic Palette')) + '</h3>' +
          '<div class="cs-colors-grid">' + swatchesHtml + '</div>' +
        '</div>' +
        '<div class="cs-ds-block">' +
          '<h3 class="cs-sub-heading">' + escapeHtml(t('caseStudy.typographySubheading', 'Type Hierarchy')) + '</h3>' +
          '<div class="cs-type-grid">' + typographyHtml + '</div>' +
        '</div>' +
        stateChipsHtml +
      '</section>';

    caseStudyContentEl.innerHTML =
      metaStripHtml +
      briefHtml +
      personaHtml +
      painSolutionsHtml +
      evolutionHtml +
      designSystemHtml;
  }

  if (caseStudyContentEl) {
    caseStudyContentEl.addEventListener('click', function (e) {
      var switchBtn = e.target.closest('[data-cs-switch]');
      if (switchBtn) {
        csSpecimenState.switchOn = !csSpecimenState.switchOn;
        var nextOn = csSpecimenState.switchOn;
        switchBtn.setAttribute('aria-checked', String(nextOn));
        switchBtn.classList.toggle('is-on', nextOn);
        var switchImg = switchBtn.querySelector('.ocb-switch-img');
        if (switchImg) {
          switchImg.src = nextOn ? 'assets/switch-on.svg' : 'assets/switch-off.svg';
        }
        return;
      }

      var checkBtn = e.target.closest('[data-cs-checkbox]');
      if (checkBtn) {
        var variant = checkBtn.dataset.csCheckbox;
        if (variant && Object.prototype.hasOwnProperty.call(csSpecimenState.checkboxes, variant)) {
          var nextChecked = !csSpecimenState.checkboxes[variant];
          csSpecimenState.checkboxes[variant] = nextChecked;
          checkBtn.setAttribute('aria-pressed', String(nextChecked));
          checkBtn.classList.toggle('is-checked', nextChecked);
          checkBtn.innerHTML = nextChecked
            ? '<img src="assets/checkbox-' + variant + '-on.svg" width="30" height="30" alt="">'
            : '';
        }
        return;
      }

      var csLangBtn = e.target.closest('[data-cs-lang]');
      if (csLangBtn) {
        var nextLang = csLangBtn.dataset.csLang;
        var headerLangBtn = nextLang ? document.querySelector('.lang-btn[data-lang="' + nextLang + '"]') : null;
        if (headerLangBtn) headerLangBtn.click();
        return;
      }

      var swatchBtn = e.target.closest('[data-copy-hex]');
      if (swatchBtn) {
        copyHexToken(swatchBtn.dataset.copyHex, swatchBtn);
        return;
      }

      var jumpBtn = e.target.closest('[data-cs-jump]');
      if (jumpBtn) {
        var target = jumpBtn.dataset.csJump;
        var app = getApp();
        if (target === 'open-quiz') {
          openQuizModal();
        } else if (target && target.charAt(0) === '#' && app && typeof app.setView === 'function') {
          app.setView(target.slice(1), true);
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // Reactive Bilingual Sync & Initial Render
  // --------------------------------------------------------------------------
  function renderAllM2() {
    renderImpactTracker();
    renderCaseStudy();
    if (quizState.isOpen) {
      renderQuizModal();
    }
  }

  window.addEventListener('ocb:langchange', renderAllM2);

  renderAllM2();
  if (window.location.hash.replace(/^#/, '').toLowerCase() === 'quiz') {
    openQuizModal();
  }
})();
