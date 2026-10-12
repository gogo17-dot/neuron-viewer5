import { initTheme, getTheme } from './theme.js';
import { initInfoPanel, showInfoPanel, hideInfoPanel, setInfoPanelLang } from './infoPanel.js?v=6';
import { CerebralCortexScene } from './CerebralCortexScene.js?v=5';

const TIP_KEY = 'atlas-viewer-tip-v1';

const loadingEl = document.getElementById('loading-banner');
const listEl = document.getElementById('structure-list');
const searchEl = document.getElementById('structure-search');
const explodeSlider = document.getElementById('explode-slider');
const explodeValue = document.getElementById('explode-value');
const labelEl = document.getElementById('structure-label');
const resetBtn = document.getElementById('reset-view');
const tipEl = document.getElementById('viewer-tip');
const tipDismiss = document.getElementById('tip-dismiss');
const browserEl = document.getElementById('structure-browser');
const browserToggle = document.getElementById('structure-browser-toggle');
const browserClose = document.getElementById('structure-browser-close');

let scene = null;
let catalog = [];

function setBrowserOpen(open) {
  if (!browserEl || !browserToggle) return;
  browserEl.hidden = !open;
  browserToggle.hidden = open;
  browserToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (open) {
    try {
      searchEl?.focus({ preventScroll: true });
    } catch {
      searchEl?.focus?.();
    }
  }
}

function updateLoading(loaded, total, done = false, failed = 0) {
  if (!loadingEl) return;

  if (done) {
    if (failed >= total || loaded === 0) {
      loadingEl.hidden = false;
      loadingEl.textContent =
        'Could not load 3D models. Ensure GLB files are present next to this page.';
      return;
    }
    loadingEl.hidden = true;
    return;
  }

  loadingEl.hidden = false;
  loadingEl.textContent = `Loading anatomical models… ${loaded}/${total}`;
}

function dismissTip(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (tipEl) {
    tipEl.hidden = true;
    tipEl.classList.remove('is-visible');
  }
  try {
    localStorage.setItem(TIP_KEY, '1');
  } catch {
    /* ignore */
  }
}

function maybeShowTip() {
  if (!tipEl) return;
  try {
    if (localStorage.getItem(TIP_KEY) === '1') return;
  } catch {
    /* ignore */
  }
  tipEl.hidden = false;
  tipEl.classList.add('is-visible');
}

function renderStructureList(filter = '') {
  if (!listEl) return;

  const q = filter.trim().toLowerCase();
  const filtered = catalog.filter((item) => {
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.key.toLowerCase().includes(q) ||
      item.groupLabel.toLowerCase().includes(q)
    );
  });

  listEl.replaceChildren();

  if (!filtered.length) {
    const empty = document.createElement('p');
    empty.className = 'structure-browser__empty';
    empty.textContent = 'No matching structures.';
    listEl.appendChild(empty);
    return;
  }

  let currentGroup = null;
  const selected = scene?.selectedName ?? null;

  for (const item of filtered) {
    if (item.groupId !== currentGroup) {
      currentGroup = item.groupId;
      const group = document.createElement('div');
      group.className = 'structure-group';
      const label = document.createElement('div');
      label.className = 'structure-group__label';
      label.textContent = item.groupLabel;
      group.appendChild(label);
      listEl.appendChild(group);
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'structure-item';
    btn.dataset.key = item.key;
    btn.textContent = item.title;
    if (item.key === selected) btn.classList.add('is-active');
    btn.addEventListener('click', () => {
      scene?.selectStructure(item.key, { frame: true, emit: true });
    });

    const lastGroup = listEl.lastElementChild;
    if (lastGroup?.classList.contains('structure-group')) {
      lastGroup.appendChild(btn);
    } else {
      listEl.appendChild(btn);
    }
  }
}

function syncListSelection(selectedName) {
  if (!listEl) return;
  for (const btn of listEl.querySelectorAll('.structure-item')) {
    btn.classList.toggle('is-active', btn.dataset.key === selectedName);
  }
  if (!selectedName) hideInfoPanel();
}

function syncExplodeUi(amount = 0) {
  const pct = Math.round(amount * 100);
  if (explodeSlider) {
    explodeSlider.value = String(pct);
    explodeSlider.setAttribute('aria-valuenow', String(pct));
  }
  if (explodeValue) explodeValue.textContent = `${pct}%`;
}

function bindBrowserUi() {
  searchEl?.addEventListener('input', () => {
    renderStructureList(searchEl.value);
  });

  browserToggle?.addEventListener('click', () => setBrowserOpen(true));
  browserClose?.addEventListener('click', () => setBrowserOpen(false));

  explodeSlider?.addEventListener('input', () => {
    const pct = Number(explodeSlider.value) || 0;
    if (explodeValue) explodeValue.textContent = `${pct}%`;
    explodeSlider.setAttribute('aria-valuenow', String(pct));
    scene?.setExplodeAmount(pct / 100);
  });

  resetBtn?.addEventListener('click', () => {
    scene?.resetView();
    syncExplodeUi(0);
    hideInfoPanel();
    syncListSelection(null);
  });

  tipDismiss?.addEventListener('click', dismissTip);
  tipDismiss?.addEventListener('pointerup', dismissTip);
}

initTheme((theme) => {
  scene?.setTheme(theme);
});

initInfoPanel({
  onClose: () => scene?.clearSelection(),
  onRelatedSelect: (key) => {
    scene?.selectStructure(key, { frame: true, emit: true });
  },
});

bindBrowserUi();

scene = new CerebralCortexScene(document.getElementById('scene'), {
  theme: getTheme(),
  onSelect: (data) => showInfoPanel(data),
  onLoadProgress: updateLoading,
  onSelectionChange: (name) => syncListSelection(name),
  onReady: (items) => {
    catalog = items;
    renderStructureList(searchEl?.value ?? '');
    maybeShowTip();

    // Deep-link from scans.html (?structure=…)
    try {
      const key = new URLSearchParams(window.location.search).get('structure');
      if (key && catalog.some((c) => c.key === key)) {
        scene?.selectStructure(key, { frame: true, emit: true });
      }
    } catch {
      /* ignore */
    }
  },
});

scene.setLabelElement(labelEl);

window.__cortexScene = scene;

window.addEventListener('error', (event) => {
  if (!loadingEl) return;
  loadingEl.hidden = false;
  loadingEl.textContent = `Failed to start viewer: ${event.message}`;
});


window.__neyronAfterSetLang = function (lang) {
  if (typeof setInfoPanelLang === 'function') setInfoPanelLang(lang);
  if (searchEl) {
    const ph =
      lang === 'az'
        ? searchEl.getAttribute('data-az-placeholder')
        : searchEl.getAttribute('data-en-placeholder');
    if (ph != null) searchEl.setAttribute('placeholder', ph);
  }
};

window.__neyronAfterSetLang(document.documentElement.lang === 'az' ? 'az' : 'en');
