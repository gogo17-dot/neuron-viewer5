import { initTheme, getTheme } from './theme.js';
import { initPopup, showPopup, hidePopup, setPopupLang } from './popup.js';
import { BasalGangliaScene } from './BasalGangliaScene.js';

const loadingEl = document.getElementById('loading-banner');

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

initTheme((theme) => {
  scene?.setTheme(theme);
});

initPopup(() => {
  scene?.clearSelection();
});

scene = new BasalGangliaScene(document.getElementById('scene'), {
  theme: getTheme(),
  onSelect: (data) => {
    showPopup(data);
  },
  onLoadProgress: updateLoading,
});

window.addEventListener('error', (event) => {
  if (!loadingEl) return;
  loadingEl.hidden = false;
  loadingEl.textContent = `Failed to start viewer: ${event.message}`;
});

window.__neyronAfterSetLang = function (lang) {
  if (typeof setPopupLang === 'function') setPopupLang(lang);
};
