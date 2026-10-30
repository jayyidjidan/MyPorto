// Pastikan VITE_API_URL diakhiri "/api", contoh: https://api.domainkamu.com/api
const API = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

/**
 * Returns the full URL for a stored image path.
 * Handles both relative paths (/uploads/...) and full URLs.
 */
export const getImageUrl = (path) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${API.replace(/\/api$/, "")}${path}`;
};

/**
 * Helper request: memastikan respons berupa JSON dan memberi pesan error jelas.
 */
async function request(path, options) {
  let res;

  try {
    res = await fetch(`${API}${path}`, options);
  } catch {
    throw new Error(
      `Tidak dapat terhubung ke server (${API}). Cek apakah backend berjalan dan VITE_API_URL benar.`
    );
  }

  const contentType = res.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      `Server membalas ${res.status} dengan format bukan JSON (${res.url}). Cek VITE_API_URL dan route backend.`
    );
  }

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || `Request gagal (${res.status}).`);
  }

  return data;
}

export async function getProjects() {
  const data = await request("/projects");
  return data.data;
}

export async function getProjectBySlug(slug) {
  const data = await request(`/projects/${slug}`);
  return data.data;
}

/**
 * Create a new project.
 * @param {FormData} formData - Must contain 'projectData' (JSON string) + image files.
 * Jangan set header Content-Type manual; browser mengisinya sendiri.
 */
export async function createProject(formData) {
  const data = await request("/projects", {
    method: "POST",
    body: formData,
  });
  return data.data;
}

/**
 * Update an existing project.
 * @param {string} id - MongoDB _id of the project.
 * @param {FormData} formData - Same structure as createProject.
 */
export async function updateProject(id, formData) {
  const data = await request(`/projects/${id}`, {
    method: "PUT",
    body: formData,
  });
  return data.data;
}

export async function deleteProject(id) {
  return request(`/projects/${id}`, { method: "DELETE" });
}