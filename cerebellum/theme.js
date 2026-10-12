const STORAGE_KEY = 'neyron_theme';

/** Scene palette key: 'dark' | 'light' (used by MeningesScene). */
export function getTheme() {
  return document.documentElement.dataset.theme === 'day' ? 'light' : 'dark';
}

/** Page theme: 'night' | 'day' (NEYRON site shell). */
export function getPageTheme() {
  return document.documentElement.dataset.theme === 'day' ? 'day' : 'night';
}

export function setTheme(theme) {
  const page = theme === 'day' || theme === 'light' ? 'day' : 'night';
  document.documentElement.dataset.theme = page;
  localStorage.setItem(STORAGE_KEY, page);
}

/**
 * Sync scene to site-shell theme changes. Toggle UI is owned by site-shell.js.
 */
export function initTheme(onChange) {
  const notify = () => onChange?.(getTheme());

  window.__neyronApplyViewTheme = () => {
    notify();
  };

  notify();
}

export const THEME_COLORS = {
  // Match synapse / neuron night & day backgrounds
  dark: { scene: 0x020810, fog: 0x020810 },
  light: { scene: 0xfaf8f4, fog: 0xfaf8f4 },
};
