import { initTheme, getTheme } from './theme.js';
import {
  initInfoPanel,
  showInfoPanel,
  hideInfoPanel,
  setInfoPanelLang,
  getLang,
} from './infoPanel.js';
import { MeningesScene } from './MeningesScene.js?v=2';

const TIP_KEY = 'meninges-viewer-tip-v1';

const loadingEl = document.getElementById('loading-banner');
const labelEl = document.getElementById('structure-label');
const tipEl = document.getElementById('viewer-tip');
const tipDismiss = document.getElementById('tip-dismiss');

let scene = null;
let lastLoadProgress = { loaded: 0, total: 0, done: false, failed: 0 };

const LOADING = {
  en: {
    progress: (loaded, total) => `Loading anatomical models… ${loaded}/${total}`,
    fail: 'Could not load 3D models. Ensure meninges GLB files are present next to this page.',
    startFail: (msg) => `Failed to start viewer: ${msg}`,
  },
  az: {
    progress: (loaded, total) => `Anatomik modellər yüklənir… ${loaded}/${total}`,
    fail: '3D modellər yüklənmədi. Meninges GLB fayllarının bu səhifənin yanında olduğundan əmin olun.',
    startFail: (msg) => `Baxış başladıla bilmədi: ${msg}`,
  },
};

function updateLoading(loaded, total, done = false, failed = 0) {
  lastLoadProgress = { loaded, total, done, failed };
  if (!loadingEl) return;
  const lang = getLang();
  const copy = LOADING[lang] || LOADING.en;

  if (done) {
    if (failed >= total || loaded === 0) {
      loadingEl.hidden = false;
      loadingEl.textContent = copy.fail;
      return;
    }
    loadingEl.hidden = true;
    return;
  }

  loadingEl.hidden = false;
  loadingEl.textContent = copy.progress(loaded, total);
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

scene = new MeningesScene(document.getElementById('scene'), {
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

window.__meningesScene = scene;

window.__neyronAfterSetLang = function (lang) {
  setInfoPanelLang(lang);
  updateLoading(
    lastLoadProgress.loaded,
    lastLoadProgress.total,
    lastLoadProgress.done,
    lastLoadProgress.failed,
  );
};

window.addEventListener('error', (event) => {
  if (!loadingEl) return;
  const copy = LOADING[getLang()] || LOADING.en;
  loadingEl.hidden = false;
  loadingEl.textContent = copy.startFail(event.message);
});
