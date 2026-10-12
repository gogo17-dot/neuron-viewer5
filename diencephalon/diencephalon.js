import { initTheme, getTheme } from './theme.js';
import { initInfoPanel, showInfoPanel, hideInfoPanel, setInfoPanelLang } from './infoPanel.js';
import { DiencephalonScene } from './DiencephalonScene.js?v=2';

const TIP_KEY = 'diencephalon-viewer-tip-v1';

const loadingEl = document.getElementById('loading-banner');
const labelEl = document.getElementById('structure-label');
const tipEl = document.getElementById('viewer-tip');
const tipDismiss = document.getElementById('tip-dismiss');

let scene = null;

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

tipDismiss?.addEventListener('click', dismissTip);
tipDismiss?.addEventListener('pointerup', dismissTip);

initTheme((theme) => {
  scene?.setTheme(theme);
});

initInfoPanel({
  onClose: () => scene?.clearSelection(),
  onRelatedSelect: (key) => {
    scene?.selectStructure(key, { frame: true, emit: true });
  },
});

scene = new DiencephalonScene(document.getElementById('scene'), {
  theme: getTheme(),
  onSelect: (data) => showInfoPanel(data),
  onLoadProgress: updateLoading,
  onSelectionChange: (name) => {
    if (!name) hideInfoPanel();
  },
  onReady: () => {
    maybeShowTip();
  },
});

scene.setLabelElement(labelEl);

window.__diencephalonScene = scene;

window.addEventListener('error', (event) => {
  if (!loadingEl) return;
  loadingEl.hidden = false;
  loadingEl.textContent = `Failed to start viewer: ${event.message}`;
});

window.__neyronAfterSetLang = function (lang) {
  if (typeof setInfoPanelLang === 'function') setInfoPanelLang(lang);
};

