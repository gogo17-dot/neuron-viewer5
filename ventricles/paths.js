/** Flat deploy — GLBs next to index.html */
export function modelUrl(filename, _folder) {
  return new URL(
    String(filename).split("/").map(encodeURIComponent).join("/"),
    import.meta.url,
  ).href;
}
