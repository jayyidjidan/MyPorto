import { getProjectBySlug } from "../api/projects";

// Same key Project.jsx uses for the landing-page list cache
const LIST_CACHE_KEY = "projects-cache-v2";
const detailKey = (slug) => `project-detail-v1:${slug}`;

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full / blocked: ignore
  }
}

/**
 * Best data we already have for a project, without any network:
 *  - full detail from an earlier visit/prefetch  -> { partial: false }
 *  - or the light card data from the landing list -> { partial: true }
 */
export function readCachedProject(slug) {
  const full = read(detailKey(slug));
  if (full) return { project: full, partial: false };

  const list = read(LIST_CACHE_KEY);
  const hit = Array.isArray(list) ? list.find((p) => p.slug === slug) : null;
  return { project: hit || null, partial: Boolean(hit) };
}

export function cacheProject(slug, project) {
  write(detailKey(slug), project);
}

// Start loading a project's full data before the user clicks (hover / focus / touch)
const lastPrefetch = new Map();
export function prefetchProject(slug) {
  if (!slug) return;
  const now = Date.now();
  if (now - (lastPrefetch.get(slug) || 0) < 60_000) return;
  lastPrefetch.set(slug, now);

  getProjectBySlug(slug)
    .then((data) => cacheProject(slug, data))
    .catch(() => {});
}