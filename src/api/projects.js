const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Returns the full URL for a stored image path.
 * Handles both relative paths (/uploads/...) and full URLs.
 */
export const getImageUrl = (path) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${API.replace("/api", "")}${path}`;
};

export async function getProjects() {
  const res = await fetch(`${API}/projects`);

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
}

export async function getProjectBySlug(slug) {
  const res = await fetch(`${API}/projects/${slug}`);

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
}

/**
 * Create a new project.
 * @param {FormData} formData - Must contain 'projectData' (JSON string) + image files.
 */
export async function createProject(formData) {
  const res = await fetch(`${API}/projects`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
}

/**
 * Update an existing project.
 * @param {string} id - MongoDB _id of the project.
 * @param {FormData} formData - Same structure as createProject.
 */
export async function updateProject(id, formData) {
  const res = await fetch(`${API}/projects/${id}`, {
    method: "PUT",
    body: formData,
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
}

export async function deleteProject(id) {
  const res = await fetch(`${API}/projects/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
}