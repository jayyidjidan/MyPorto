import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormHero from "../../components/sections/project-form/FormHero";
import SectionsEditor from "../../components/Admin/SectionsEditor";
import Button from "../../components/common/Button";
import { getProjectBySlug, updateProject } from "../../api/projects";

const input =
  "w-full rounded-xl border border-grey-100 bg-white px-4 py-2.5 text-sm text-black-400 outline-none transition focus:border-black-400/40 focus:ring-2 focus:ring-black-400/10";
const label =
  "block text-xs font-semibold uppercase tracking-wider text-black-400/50 mb-1";

export default function EditProject() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [projectId, setProjectId] = useState(null);
  const [meta, setMeta] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [sections, setSections] = useState([]);
  const [blockFiles, setBlockFiles] = useState({});

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const coverRef = useRef();

  // ── Load existing project ────────────────────────────────────────────────────
  useEffect(() => {
    getProjectBySlug(slug)
      .then((project) => {
        setProjectId(project._id);
        setMeta({
          title: project.title || "",
          slug: project.slug || "",
          category: project.category || "",
          scope: (project.scope || []).join(", "),
          duration: project.duration || "",
          existingCoverImage: project.coverImage || "",
        });
        setCoverPreview(project.coverImage || "");
        setSections(
          [...(project.sections || [])].sort(
            (a, b) => (a.order ?? 0) - (b.order ?? 0)
          )
        );
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleMeta = (e) => {
    const { name, value } = e.target;
    setMeta((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverFile = (file) => {
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleBlockFile = (fileKey, file) => {
    setBlockFiles((prev) => ({ ...prev, [fileKey]: file }));
  };

  // ── Submit ────────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const projectData = {
        slug: meta.slug,
        title: meta.title,
        category: meta.category,
        scope: meta.scope
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        duration: meta.duration,
        coverImage: meta.existingCoverImage, // backend will override if new file
        sections: sections.map((s, i) => ({ ...s, order: i })),
      };

      const fd = new FormData();
      fd.append("projectData", JSON.stringify(projectData));
      if (coverFile) fd.append("coverImage", coverFile);
      Object.entries(blockFiles).forEach(([key, file]) => {
        if (file) fd.append(key, file);
      });

      await updateProject(projectId, fd);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Failed to update project.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading/error states ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#e6e6e6]">
        <p className="text-body text-black-400/50">Loading project…</p>
      </div>
    );
  }

  if (error && !meta) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#e6e6e6]">
        <p className="text-body text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col gap-1 bg-[#e6e6e6]">
      <FormHero title="Edit Project" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        {/* ── Fixed metadata ─────────────────────────────────────────────── */}
        <section className="rounded-3xl bg-white p-10">
          <h2 className="mb-6 text-lg font-semibold text-black-400">
            Project Info
          </h2>

          <div className="grid gap-5 lg:grid-cols-2">
            {/* Title */}
            <div className="lg:col-span-2">
              <label className={label}>Title *</label>
              <input
                required
                name="title"
                value={meta.title}
                onChange={handleMeta}
                className={input}
              />
            </div>

            {/* Slug */}
            <div className="lg:col-span-2">
              <label className={label}>Slug</label>
              <input
                name="slug"
                value={meta.slug}
                onChange={handleMeta}
                className={`${input} font-mono text-xs`}
              />
            </div>

            {/* Category */}
            <div>
              <label className={label}>Category</label>
              <input
                name="category"
                value={meta.category}
                onChange={handleMeta}
                placeholder="e.g. Mobile App"
                className={input}
              />
            </div>

            {/* Duration */}
            <div>
              <label className={label}>Duration</label>
              <input
                name="duration"
                value={meta.duration}
                onChange={handleMeta}
                placeholder="e.g. 2 Month"
                className={input}
              />
            </div>

            {/* Scope */}
            <div className="lg:col-span-2">
              <label className={label}>Scope (comma-separated)</label>
              <input
                name="scope"
                value={meta.scope}
                onChange={handleMeta}
                className={input}
              />
              {meta.scope && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {meta.scope
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-grey-100 px-3 py-1 text-xs font-medium text-black-400/70"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Cover image */}
            <div className="lg:col-span-2">
              <label className={label}>Cover Image</label>
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="mb-3 h-40 w-full rounded-2xl object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                ref={coverRef}
                className="hidden"
                onChange={(e) => handleCoverFile(e.target.files[0])}
              />
              <button
                type="button"
                onClick={() => coverRef.current?.click()}
                className="flex items-center gap-2 rounded-xl border border-dashed border-grey-100 px-4 py-3 text-sm text-black-400/60 transition hover:border-black-400/30 hover:text-black-400"
              >
                {meta.existingCoverImage ? "Replace cover image" : "Upload cover image"}
              </button>
              {meta.existingCoverImage && !coverFile && (
                <p className="mt-1.5 text-xs text-black-400/40">
                  Leave empty to keep current image.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── Sections ───────────────────────────────────────────────────── */}
        <section className="rounded-3xl bg-white p-10">
          <h2 className="mb-2 text-lg font-semibold text-black-400">
            Content Sections
          </h2>
          <p className="mb-6 text-sm text-black-400/50">
            Reorder, edit, add, or remove sections and their content blocks.
          </p>

          <SectionsEditor
            sections={sections}
            onChange={setSections}
            onFile={handleBlockFile}
          />
        </section>

        {/* ── Submit ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-end gap-4 rounded-3xl bg-white p-10">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/admin")}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Saving…" : "Update Project"}
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}
