/**
 * Shared SEO / social meta helpers for NEYRON pages.
 * Call after <title> in static HTML, or leave meta tags inline (preferred for crawlers).
 */
export const SITE = {
  name: 'NEYRON',
  url: 'https://gogo17-dot.github.io/neuron-viewer5',
  themeColorNight: '#020810',
  themeColorDay: '#faf8f4',
};

/** Default Open Graph image path (absolute when SITE.url is set). */
export function absoluteUrl(path) {
  if (!path) return SITE.url + '/';
  if (/^https?:\/\//i.test(path)) return path;
  return SITE.url.replace(/\/$/, '') + '/' + String(path).replace(/^\//, '');
}
