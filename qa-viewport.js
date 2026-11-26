/* TODO(v1.0): Delete this file and remove its <script> tag from index.html before v1.0 release. */
(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  if (window.self !== window.top || params.get('qa-embed') === '1') {
    return;
  }

  var COLLAPSE_KEY = 'ocb_qa_bar_collapsed';
  var PRESETS = {
    full: { key: 'full', label: 'Full', badge: 'Full', width: null },
    tablet: { key: 'tablet', label: 'Tablet', badge: 'Tablet \u00b7 768px', width: 768 },
    mobile: { key: 'mobile', label: 'Mobile', badge: 'Mobile \u00b7 402px', width: 402 }
  };

  var state = {
    mode: 'full',
    collapsed: false,
    stageEl: null,
    bezelEl: null,
    frameEl: null,
    bezelTitleEl: null,
    barEl: null,
    dimBadgeEl: null,
    collapseBtnEl: null,
    lastLocalSnapshot: null
  };

  try {
    state.collapsed = window.sessionStorage.getItem(COLLAPSE_KEY) === '1';
  } catch (_) {}

  function snapshotStorage() {
    try {
      return window.localStorage.getItem('ocb_state_v1') || '';
    } catch (_) {
      return '';
    }
  }

  function injectStyles() {
    if (document.getElementById('ocb-qa-viewport-styles')) return;
    var style = document.createElement('style');
    style.id = 'ocb-qa-viewport-styles';
    style.textContent = [
      '#ocb-qa-stage{position:fixed;inset:0;z-index:99990;background:#13221a;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 16px 76px;box-sizing:border-box;}',
      '#ocb-qa-stage[hidden]{display:none !important;}',
      '.ocb-qa-bezel{display:flex;flex-direction:column;background:#1e3526;border:1px solid rgba(231,219,207,0.28);border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,0.5);overflow:hidden;max-width:100%;max-height:100%;}',
      '.ocb-qa-bezel-top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 16px;background:rgba(15,28,20,0.92);border-bottom:1px solid rgba(231,219,207,0.16);font-family:Lato,sans-serif;font-size:13px;font-weight:700;color:#E7DBCF;}',
      '.ocb-qa-bezel-dots{display:inline-flex;align-items:center;gap:6px;}',
      '.ocb-qa-dot{width:8px;height:8px;border-radius:50%;background:rgba(231,219,207,0.3);}',
      '.ocb-qa-dot--gold{background:#FEC51B;}',
      '.ocb-qa-bezel-back{border:1px solid rgba(231,219,207,0.32);background:transparent;color:#FEC51B;border-radius:999px;padding:4px 10px;font-family:Lato,sans-serif;font-size:12px;font-weight:700;cursor:pointer;}',
      '.ocb-qa-bezel-back:hover{background:rgba(254,197,27,0.14);}',
      '.ocb-qa-frame-wrap{background:#111d16;display:flex;justify-content:center;overflow:hidden;}',
      '#ocb-qa-frame{border:0;display:block;background:#1E3526;transition:width 0.22s ease,height 0.22s ease;}',
      '#ocb-qa-frame.is-tablet{width:768px;max-width:calc(100vw - 48px);height:min(1024px,calc(100vh - 144px));}',
      '#ocb-qa-frame.is-mobile{width:402px;max-width:calc(100vw - 48px);height:min(874px,calc(100vh - 144px));}',
      '#ocb-qa-bar{position:fixed;bottom:16px;left:16px;z-index:99999;display:inline-flex;align-items:center;gap:6px;padding:6px 8px;border-radius:999px;background:rgba(30,53,38,0.96);border:1px solid rgba(231,219,207,0.28);box-shadow:0 10px 28px rgba(0,0,0,0.34);backdrop-filter:blur(8px);font-family:Lato,sans-serif;color:#E7DBCF;}',
      '#ocb-qa-bar.is-collapsed .ocb-qa-controls,#ocb-qa-bar.is-collapsed .ocb-qa-dim{display:none;}',
      '.ocb-qa-tag{display:inline-flex;align-items:center;justify-content:center;padding:4px 8px;border-radius:999px;background:rgba(78,238,166,0.16);color:#4EEEA6;font-size:11px;font-weight:900;letter-spacing:0.06em;text-transform:uppercase;user-select:none;}',
      '.ocb-qa-controls{display:inline-flex;align-items:center;gap:4px;}',
      '.ocb-qa-btn{border:0;border-radius:999px;padding:6px 12px;background:transparent;color:#E7DBCF;font-family:Lato,sans-serif;font-size:12px;font-weight:700;cursor:pointer;transition:background-color 0.15s ease,color 0.15s ease;}',
      '.ocb-qa-btn:hover{background:rgba(231,219,207,0.14);}',
      '.ocb-qa-btn.is-active{background:#FEC51B;color:#1E3526;}',
      '.ocb-qa-dim{padding:0 6px;font-size:12px;font-weight:700;color:rgba(231,219,207,0.8);white-space:nowrap;}',
      '.ocb-qa-collapse{width:26px;height:26px;border:1px solid rgba(231,219,207,0.24);border-radius:50%;background:transparent;color:#E7DBCF;font-size:14px;line-height:1;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;}',
      '.ocb-qa-collapse:hover{background:rgba(231,219,207,0.14);}',
      '@media (max-width:480px){#ocb-qa-bar{bottom:10px;left:10px;padding:5px 6px;}.ocb-qa-btn{padding:5px 9px;font-size:11px;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function buildEmbedUrl() {
    var url = new URL(window.location.href);
    url.searchParams.set('qa-embed', '1');
    return url.toString();
  }

  function ensureStage() {
    if (state.stageEl) return;

    var stage = document.createElement('div');
    stage.id = 'ocb-qa-stage';
    stage.hidden = true;

    var bezel = document.createElement('div');
    bezel.className = 'ocb-qa-bezel';

    var topBar = document.createElement('div');
    topBar.className = 'ocb-qa-bezel-top';

    var leftGroup = document.createElement('div');
    leftGroup.className = 'ocb-qa-bezel-dots';
    leftGroup.innerHTML = '<span class="ocb-qa-dot ocb-qa-dot--gold"></span><span class="ocb-qa-dot"></span><span class="ocb-qa-dot"></span>';

    var title = document.createElement('span');
    title.className = 'ocb-qa-bezel-title';
    leftGroup.appendChild(title);

    var backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'ocb-qa-bezel-back';
    backBtn.textContent = 'Back to Full';
    backBtn.addEventListener('click', function () {
      setMode('full');
    });

    topBar.appendChild(leftGroup);
    topBar.appendChild(backBtn);

    var frameWrap = document.createElement('div');
    frameWrap.className = 'ocb-qa-frame-wrap';

    var frame = document.createElement('iframe');
    frame.id = 'ocb-qa-frame';
    frame.title = 'QA Device Viewport Preview';

    frameWrap.appendChild(frame);
    bezel.appendChild(topBar);
    bezel.appendChild(frameWrap);
    stage.appendChild(bezel);
    document.body.appendChild(stage);

    state.stageEl = stage;
    state.bezelEl = bezel;
    state.frameEl = frame;
    state.bezelTitleEl = title;
  }

  function syncButtons() {
    if (!state.barEl) return;
    var btns = state.barEl.querySelectorAll('.ocb-qa-btn');
    for (var i = 0; i < btns.length; i++) {
      var isActive = btns[i].getAttribute('data-qa-mode') === state.mode;
      btns[i].classList.toggle('is-active', isActive);
      btns[i].setAttribute('aria-pressed', String(isActive));
    }
    if (state.dimBadgeEl) {
      state.dimBadgeEl.textContent = PRESETS[state.mode].badge;
    }
  }

  function setMode(nextMode) {
    if (!PRESETS[nextMode]) nextMode = 'full';
    if (nextMode === state.mode) return;

    var prevMode = state.mode;
    state.mode = nextMode;

    if (nextMode === 'full') {
      if (state.frameEl) {
        try {
          var embedHash = state.frameEl.contentWindow.location.hash;
          if (embedHash && embedHash !== window.location.hash) {
            window.location.hash = embedHash;
          }
        } catch (_) {}
      }
      if (state.stageEl) {
        state.stageEl.hidden = true;
      }
      if (state.frameEl) {
        state.frameEl.removeAttribute('src');
        state.frameEl.className = '';
      }
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      syncButtons();

      if (prevMode !== 'full' && snapshotStorage() !== state.lastLocalSnapshot) {
        window.location.reload();
      }
      return;
    }

    ensureStage();
    if (prevMode === 'full') {
      state.lastLocalSnapshot = snapshotStorage();
      state.frameEl.src = buildEmbedUrl();
    }

    state.frameEl.className = nextMode === 'tablet' ? 'is-tablet' : 'is-mobile';
    state.bezelTitleEl.textContent = PRESETS[nextMode].badge;
    state.stageEl.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    syncButtons();
  }

  function buildToolbar() {
    var bar = document.createElement('div');
    bar.id = 'ocb-qa-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'QA Viewport Switcher');
    if (state.collapsed) bar.classList.add('is-collapsed');

    var tag = document.createElement('span');
    tag.className = 'ocb-qa-tag';
    tag.textContent = 'QA';
    tag.title = 'QA Viewport Switcher — remove before v1.0';

    var controls = document.createElement('div');
    controls.className = 'ocb-qa-controls';

    ['full', 'tablet', 'mobile'].forEach(function (key) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ocb-qa-btn';
      btn.setAttribute('data-qa-mode', key);
      btn.textContent = PRESETS[key].label;
      btn.addEventListener('click', function () {
        setMode(key);
      });
      controls.appendChild(btn);
    });

    var dim = document.createElement('span');
    dim.className = 'ocb-qa-dim';

    var collapseBtn = document.createElement('button');
    collapseBtn.type = 'button';
    collapseBtn.className = 'ocb-qa-collapse';
    collapseBtn.setAttribute('aria-label', state.collapsed ? 'Expand QA viewport toolbar' : 'Collapse QA viewport toolbar');
    collapseBtn.textContent = state.collapsed ? '+' : '\u2212';
    collapseBtn.addEventListener('click', function () {
      state.collapsed = !state.collapsed;
      bar.classList.toggle('is-collapsed', state.collapsed);
      collapseBtn.textContent = state.collapsed ? '+' : '\u2212';
      collapseBtn.setAttribute('aria-label', state.collapsed ? 'Expand QA viewport toolbar' : 'Collapse QA viewport toolbar');
      try {
        window.sessionStorage.setItem(COLLAPSE_KEY, state.collapsed ? '1' : '0');
      } catch (_) {}
    });

    bar.appendChild(tag);
    bar.appendChild(controls);
    bar.appendChild(dim);
    bar.appendChild(collapseBtn);
    document.body.appendChild(bar);

    state.barEl = bar;
    state.dimBadgeEl = dim;
    state.collapseBtnEl = collapseBtn;
    syncButtons();
  }

  function init() {
    injectStyles();
    buildToolbar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
