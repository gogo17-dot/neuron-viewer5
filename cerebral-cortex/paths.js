/** Resolve GLB URLs for flat layout (GLBs next to this module). */
export function modelUrl(filename, _folder) {
  return new URL(
    String(filename).split('/').map(encodeURIComponent).join('/'),
    import.meta.url,
  ).href;
}
