/** Resolve GLB URLs for GitHub Pages flat layout (GLBs at repo root). */
export function modelUrl(filename) {
  return new URL(filename, import.meta.url).href;
}