export const uid = () =>
  `f_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

/**
 * Pastikan setiap block & gambar punya `fid` (dipakai untuk memetakan file).
 * Panggil ini saat memuat project yang sudah ada (halaman edit).
 */
export function ensureFids(sections = []) {
  return sections.map((section) => ({
    ...section,
    blocks: (section.blocks || []).map((block) => ({
      ...block,
      fid: block.fid || uid(),
      images: block.images
        ? block.images.map((img) => ({ ...img, fid: img.fid || uid() }))
        : block.images,
    })),
  }));
}

/**
 * Bersihkan field khusus UI (fid, _preview) dan susun daftar file
 * dengan key yang sesuai backend: s{sIdx}_b{bIdx}_img{iIdx}.
 *
 * @param sections  state sections dari editor
 * @param files     { [fid]: File }
 * @returns { sections, entries: [[key, File], ...] }
 */
export function prepareSections(sections, files) {
  const entries = [];

  const cleaned = sections.map((section, sIdx) => ({
    ...section,
    order: sIdx,
    blocks: (section.blocks || []).map((block, bIdx) => {
      const { fid, _preview, ...rest } = block;

      if (block.type === "image") {
        if (files[fid]) entries.push([`s${sIdx}_b${bIdx}_img0`, files[fid]]);
        return rest;
      }

      if (block.type === "carousel" || block.type === "grid") {
        // buang slot kosong (tanpa url dan tanpa file baru)
        const kept = (block.images || []).filter(
          (img) => img.url || files[img.fid]
        );

        const images = kept.map((img, iIdx) => {
          const { fid: imgFid, _preview: imgPreview, ...imgRest } = img;
          if (files[imgFid]) {
            entries.push([`s${sIdx}_b${bIdx}_img${iIdx}`, files[imgFid]]);
          }
          return imgRest;
        });

        return { ...rest, images };
      }

      return rest;
    }),
  }));

  return { sections: cleaned, entries };
}