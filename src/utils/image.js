const isCloudinary = (url) =>
  typeof url === "string" &&
  url.includes("res.cloudinary.com") &&
  url.includes("/upload/");

// true if the URL already has a transformation (f_auto, w_800, ...)
const hasTransform = (url) => {
  const first = url.split("/upload/")[1]?.split("/")[0] || "";
  return /^[a-z]{1,3}_/.test(first);
};

// Ask Cloudinary for a modern format (WebP/AVIF) at a sensible width.
// c_limit = never upscale. Non-Cloudinary URLs are returned unchanged.
export function optimizeImage(url, width = 1440) {
  if (!isCloudinary(url) || hasTransform(url)) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
}

// srcset so phones download small versions and big screens get larger ones.
export function srcSetFor(url, widths = [640, 960, 1440, 1920]) {
  if (!isCloudinary(url) || hasTransform(url)) return undefined;
  return widths.map((w) => `${optimizeImage(url, w)} ${w}w`).join(", ");
}