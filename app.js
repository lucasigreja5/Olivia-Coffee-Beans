(function () {
  'use strict';

  const UNIT_PRICE = 24.0;
  const SHIPPING_PRICE = 0.0;
  const VALID_VIEWS = ['home', 'features', 'cart', 'confirmation'];

  const state = {
    view: 'home',
    quantity: 1,
    toastTimer: null,
    isSubmitting: false
  };

  // DOM References
  const views = document.querySelectorAll('.view');
  const navLinks = document.querySelectorAll('[data-nav]');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  const navCartCount = document.getElementById('nav-cart-count');
  const drawerCartCount = document.getElementById('drawer-cart-count');

  const addToCartBtn = document.getElementById('add-to-cart-btn');
  const cartToast = document.getElementById('cart-toast');
  const toastCloseBtn = document.getElementById('toast-close-btn');
  const toastSubtitle = document.getElementById('toast-subtitle');

  const qtyDecreaseBtn = document.getElementById('qty-decrease');
  const qtyIncreaseBtn = document.getElementById('qty-increase');
  const qtyValueEl = document.getElementById('qty-value');
  const cartQtyLabel = document.getElementById('cart-qty-label');
  const cartItemPrice = document.getElementById('cart-item-price');
  const subtotalEls = document.querySelectorAll('.js-subtotal');
  const cartFinalPrice = document.getElementById('cart-final-price');

  const checkoutForm = document.getElementById('checkout-form');
  const emailInput = document.getElementById('field-email');
  const addressInput = document.getElementById('field-address');
  const cardNameInput = document.getElementById('field-card-name');
  const cardNumberInput = document.getElementById('field-card-number');
  const expiryInput = document.getElementById('field-expiry');
  const cvcInput = document.getElementById('field-cvc');

  const cvcInfoBtn = document.getElementById('cvc-info-btn');
  const cvcTooltip = document.getElementById('cvc-tooltip');

  const purchaseAnimation = document.getElementById('purchase-animation');
  const packStage = document.getElementById('pack-stage');

  const socialShareBtn = document.getElementById('social-share-btn');
  const shareFeedback = document.getElementById('share-feedback');

  const newsletterModal = document.getElementById('newsletter-modal');
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterError = document.getElementById('newsletter-error');
  const newsletterSuccess = document.getElementById('newsletter-success');

  function formatMoney(amount) {
    return amount.toFixed(2);
  }

  // --------------------------------------------------------------------------
  // View Routing
  // --------------------------------------------------------------------------
  function getHashView() {
    const raw = window.location.hash.replace(/^#/, '').toLowerCase();
    return VALID_VIEWS.includes(raw) ? raw : 'home';
  }

  function setView(viewName, updateHash) {
    if (!VALID_VIEWS.includes(viewName)) {
      viewName = 'home';
    }
    state.view = viewName;
    document.body.dataset.view = viewName;

    views.forEach((section) => {
      const match = section.dataset.view === viewName;
      section.classList.toggle('is-active', match);
      section.hidden = !match;
    });

    navLinks.forEach((link) => {
      const target = link.dataset.nav;
      if (link.classList.contains('nav-link') || link.classList.contains('drawer-link')) {
        link.classList.toggle('is-active', target === viewName);
      }
    });

    if (updateHash) {
      const nextHash = `#${viewName}`;
      if (window.location.hash !== nextHash) {
        window.location.hash = nextHash;
      }
    }

    closeMobileDrawer();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  window.addEventListener('hashchange', () => {
    setView(getHashView(), false);
  });

  // --------------------------------------------------------------------------
  // Mobile Drawer
  // --------------------------------------------------------------------------
  function openMobileDrawer() {
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop.hidden = false;
    requestAnimationFrame(() => drawerBackdrop.classList.add('is-open'));
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    drawerBackdrop.classList.remove('is-open');
    setTimeout(() => {
      if (!mobileDrawer.classList.contains('is-open')) {
        drawerBackdrop.hidden = true;
      }
    }, 260);
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  mobileMenuBtn.addEventListener('click', openMobileDrawer);
  drawerCloseBtn.addEventListener('click', closeMobileDrawer);
  drawerBackdrop.addEventListener('click', closeMobileDrawer);

  // --------------------------------------------------------------------------
  // Cart State & Toast
  // --------------------------------------------------------------------------
  function syncCartUI() {
    const subtotal = state.quantity * UNIT_PRICE;
    const total = subtotal + SHIPPING_PRICE;
    const formattedSubtotal = formatMoney(subtotal);
    const formattedTotal = formatMoney(total);

    qtyValueEl.textContent = String(state.quantity);
    cartQtyLabel.textContent = String(state.quantity);
    cartItemPrice.textContent = formattedSubtotal;
    subtotalEls.forEach((el) => {
      el.textContent = formattedSubtotal;
    });
    cartFinalPrice.textContent = formattedTotal;

    const countText = `(${state.quantity})`;
    navCartCount.textContent = countText;
    drawerCartCount.textContent = countText;
    navCartCount.hidden = state.quantity <= 0;
    drawerCartCount.hidden = state.quantity <= 0;

    toastSubtitle.textContent = `${state.quantity}x Olivia’s Coffee Beans (250g) - $${formattedSubtotal}`;
  }

  function showCartToast() {
    clearTimeout(state.toastTimer);
    cartToast.hidden = false;
    state.toastTimer = setTimeout(() => {
      cartToast.hidden = true;
    }, 5000);
  }

  function hideCartToast() {
    clearTimeout(state.toastTimer);
    cartToast.hidden = true;
  }

  addToCartBtn.addEventListener('click', () => {
    state.quantity += 1;
    syncCartUI();
    showCartToast();
  });

  toastCloseBtn.addEventListener('click', hideCartToast);

  qtyDecreaseBtn.addEventListener('click', () => {
    if (state.quantity > 1) {
      state.quantity -= 1;
      syncCartUI();
    }
  });

  qtyIncreaseBtn.addEventListener('click', () => {
    if (state.quantity < 99) {
      state.quantity += 1;
      syncCartUI();
    }
  });

  // --------------------------------------------------------------------------
  // Global Navigation & Action Delegates
  // --------------------------------------------------------------------------
  document.addEventListener('click', (event) => {
    const navTrigger = event.target.closest('[data-nav]');
    if (navTrigger) {
      event.preventDefault();
      const targetView = navTrigger.dataset.nav;
      setView(targetView, true);
      return;
    }

    const actionTrigger = event.target.closest('[data-action]');
    if (actionTrigger) {
      const action = actionTrigger.dataset.action;
      if (action === 'buy-now') {
        state.quantity = Math.max(1, state.quantity);
        syncCartUI();
        setView('cart', true);
      } else if (action === 'return-home') {
        setView('home', true);
      } else if (action === 'open-newsletter') {
        closeMobileDrawer();
        openNewsletterModal();
      } else if (action === 'close-newsletter') {
        closeNewsletterModal();
      }
      return;
    }

    const scrollBtn = event.target.closest('[data-scroll-target]');
    if (scrollBtn) {
      const targetEl = document.getElementById(scrollBtn.dataset.scrollTarget);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // --------------------------------------------------------------------------
  // Checkout Form Formatting & Validation
  // --------------------------------------------------------------------------
  function setFieldState(fieldName, isValid, errorMsg) {
    const wrapper = checkoutForm.querySelector(`[data-field="${fieldName}"]`);
    const errorEl = document.getElementById(`error-${fieldName}`);
    if (!wrapper || !errorEl) return;

    wrapper.classList.toggle('is-valid', isValid);
    wrapper.classList.toggle('is-error', !isValid);
    errorEl.textContent = isValid ? '' : errorMsg;
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function validateField(name) {
    switch (name) {
      case 'email': {
        const ok = validateEmail(emailInput.value);
        setFieldState('email', ok, 'Enter a valid email address.');
        return ok;
      }
      case 'address': {
        const ok = addressInput.value.trim().length >= 5;
        setFieldState('address', ok, 'Enter your shipping address.');
        return ok;
      }
      case 'cardName': {
        const ok = cardNameInput.value.trim().length >= 3;
        setFieldState('cardName', ok, 'Enter the name on your card.');
        return ok;
      }
      case 'cardNumber': {
        const digits = cardNumberInput.value.replace(/\D/g, '');
        const ok = digits.length >= 13 && digits.length <= 19;
        setFieldState('cardNumber', ok, 'Enter a valid 16-digit card number.');
        return ok;
      }
      case 'expiry': {
        const val = expiryInput.value.trim();
        const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(val);
        const ok = Boolean(match);
        setFieldState('expiry', ok, 'Use MM/YY format.');
        return ok;
      }
      case 'cvc': {
        const digits = cvcInput.value.replace(/\D/g, '');
        const ok = digits.length >= 3 && digits.length <= 4;
        setFieldState('cvc', ok, 'Enter 3 or 4 digits.');
        return ok;
      }
      default:
        return true;
    }
  }

  cardNumberInput.addEventListener('input', () => {
    const digits = cardNumberInput.value.replace(/\D/g, '').slice(0, 16);
    cardNumberInput.value = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (cardNumberInput.closest('.form-field').classList.contains('is-error')) {
      validateField('cardNumber');
    }
  });

  expiryInput.addEventListener('input', () => {
    const digits = expiryInput.value.replace(/\D/g, '').slice(0, 4);
    expiryInput.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    if (expiryInput.closest('.form-field').classList.contains('is-error')) {
      validateField('expiry');
    }
  });

  cvcInput.addEventListener('input', () => {
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
  ].forEach(([name, inputEl]) => {
    inputEl.addEventListener('blur', () => {
      if (inputEl.value.trim() !== '') {
        validateField(name);
      }
    });
  });

  // CVC Tooltip
  let cvcPinned = false;

  function toggleCvcTooltip(show) {
    const next = typeof show === 'boolean' ? show : cvcTooltip.hidden;
    cvcTooltip.hidden = !next;
    cvcInfoBtn.setAttribute('aria-expanded', String(next));
  }

  cvcInfoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cvcPinned = !cvcPinned;
    toggleCvcTooltip(cvcPinned);
  });
  cvcInfoBtn.addEventListener('mouseenter', () => {
    if (!cvcPinned) toggleCvcTooltip(true);
  });
  cvcInfoBtn.addEventListener('mouseleave', () => {
    if (!cvcPinned) toggleCvcTooltip(false);
  });
  cvcInfoBtn.addEventListener('blur', () => {
    if (!cvcPinned) toggleCvcTooltip(false);
  });

  document.addEventListener('click', (e) => {
    if (!cvcTooltip.hidden && !e.target.closest('.cvc-tip-anchor')) {
      cvcPinned = false;
      toggleCvcTooltip(false);
    }
  });

  // --------------------------------------------------------------------------
  // Checkout Submit & 4-Step Box Packing Animation
  // --------------------------------------------------------------------------
  function runPurchaseAnimation() {
    state.isSubmitting = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      state.isSubmitting = false;
      setView('confirmation', true);
      return;
    }

    packStage.className = 'pack-stage';
    purchaseAnimation.hidden = false;
    purchaseAnimation.setAttribute('aria-hidden', 'false');

    requestAnimationFrame(() => {
      packStage.classList.add('is-step-1');
    });

    setTimeout(() => {
      packStage.classList.remove('is-step-1');
      packStage.classList.add('is-step-2');
    }, 360);

    setTimeout(() => {
      packStage.classList.remove('is-step-2');
      packStage.classList.add('is-step-3');
    }, 900);

    setTimeout(() => {
      packStage.classList.remove('is-step-3');
      packStage.classList.add('is-step-4');
    }, 1500);

    setTimeout(() => {
      purchaseAnimation.hidden = true;
      purchaseAnimation.setAttribute('aria-hidden', 'true');
      packStage.className = 'pack-stage';
      state.isSubmitting = false;
      setView('confirmation', true);
    }, 2080);
  }

  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.isSubmitting) return;

    const fieldNames = ['email', 'address', 'cardName', 'cardNumber', 'expiry', 'cvc'];
    const results = fieldNames.map((name) => validateField(name));
    const firstInvalidIndex = results.indexOf(false);

    if (firstInvalidIndex !== -1) {
      const invalidField = checkoutForm.querySelector(`[data-field="${fieldNames[firstInvalidIndex]}"] input`);
      if (invalidField) invalidField.focus();
      return;
    }

    runPurchaseAnimation();
  });

  // --------------------------------------------------------------------------
  // Confirmation Share Button
  // --------------------------------------------------------------------------
  socialShareBtn.addEventListener('click', async () => {
    const shareText = "I just ordered Olívia's Coffee Beans — Eco-First Espresso!";
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Olívia's Coffee Beans",
          text: shareText,
          url: window.location.href
        });
        shareFeedback.textContent = 'Thanks for sharing!';
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        shareFeedback.textContent = 'Invite link copied to clipboard!';
      } else {
        shareFeedback.textContent = 'Ready to share with friends!';
      }
    } catch (_) {
      shareFeedback.textContent = 'Invite link ready to share!';
    }
  });

  // --------------------------------------------------------------------------
  // Newsletter Modal
  // --------------------------------------------------------------------------
  function openNewsletterModal() {
    newsletterModal.hidden = false;
    newsletterModal.setAttribute('aria-hidden', 'false');
    newsletterError.textContent = '';
    newsletterSuccess.hidden = true;
    setTimeout(() => newsletterEmail.focus(), 40);
  }

  function closeNewsletterModal() {
    newsletterModal.hidden = true;
    newsletterModal.setAttribute('aria-hidden', 'true');
  }

  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateEmail(newsletterEmail.value)) {
      newsletterError.textContent = 'Please enter a valid email address.';
      newsletterSuccess.hidden = true;
      newsletterEmail.focus();
      return;
    }
    newsletterError.textContent = '';
    newsletterSuccess.hidden = false;
    newsletterForm.reset();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (!newsletterModal.hidden) closeNewsletterModal();
      if (mobileDrawer.classList.contains('is-open')) closeMobileDrawer();
      if (!cvcTooltip.hidden) {
        cvcPinned = false;
        toggleCvcTooltip(false);
      }
    }
  });

  // Initialize
  syncCartUI();
  setView(getHashView(), false);
})();
