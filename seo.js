/**
 * Shared SEO / social meta helpers for AXON pages.
 * Call after <title> in static HTML, or leave meta tags inline (preferred for crawlers).
 */
export const SITE = {
  name: 'AXON',
  url: 'https://axon.az',
  themeColorNight: '#020810',
  themeColorDay: '#faf8f4',
};

/** Default Open Graph image path (absolute when SITE.url is set). */
export function absoluteUrl(path) {
  if (!path) return SITE.url + '/';
  if (/^https?:\/\//i.test(path)) return path;
  return SITE.url.replace(/\/$/, '') + '/' + String(path).replace(/^\//, '');
}
