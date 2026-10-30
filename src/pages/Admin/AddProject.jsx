import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import FormHero from "../../components/sections/project-form/FormHero";
import SectionsEditor from "../../components/Admin/SectionsEditor";
import Button from "../../components/common/Button";
import { createProject } from "../../api/projects";

const input =
  "w-full rounded-xl border border-grey-100 bg-white px-4 py-2.5 text-sm text-black-400 outline-none transition focus:border-black-400/40 focus:ring-2 focus:ring-black-400/10";
const label =
  "block text-xs font-semibold uppercase tracking-wider text-black-400/50 mb-1";

const defaultMeta = {
  title: "",
  slug: "",
  category: "",
  scope: "",   // comma-separated string → split on submit
  duration: "",
};

export default function AddProject() {
  const navigate = useNavigate();

  const [meta, setMeta] = useState(defaultMeta);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [sections, setSections] = useState([]);
  const [blockFiles, setBlockFiles] = useState({}); // { fileKey: File }

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const coverRef = useRef();

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleMeta = (e) => {
    const { name, value } = e.target;
    setMeta((prev) => {
      const next = { ...prev, [name]: value };
      // Auto-generate slug from title
      if (name === "title") {
        next.slug = value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
      }
      return next;
    });
  };

  const handleCoverFile = (file) => {
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  // Called by BlockEditor when a file is selected for a block image
  const handleBlockFile = (fileKey, file) => {
    setBlockFiles((prev) => ({ ...prev, [fileKey]: file }));
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const projectData = {
        slug: meta.slug || meta.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        title: meta.title,
        category: meta.category,
        scope: meta.scope
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        duration: meta.duration,
        coverImage: "",
        sections: sections.map((s, i) => ({ ...s, order: i })),
      };

      const fd = new FormData();
      fd.append("projectData", JSON.stringify(projectData));
      if (coverFile) fd.append("coverImage", coverFile);

      // Block image files
      Object.entries(blockFiles).forEach(([key, file]) => {
        if (file) fd.append(key, file);
      });

      await createProject(fd);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Failed to create project.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col gap-1 bg-[#e6e6e6]">
      <FormHero />

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
                placeholder="e.g. Furnitura"
                className={input}
              />
            </div>

            {/* Slug (auto) */}
            <div className="lg:col-span-2">
              <label className={label}>Slug (auto-generated)</label>
              <input
                name="slug"
                value={meta.slug}
                onChange={handleMeta}
                placeholder="furnitura"
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
                placeholder="UX Research, UI Design, Prototype"
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
              <label className={label}>Cover Image (optional)</label>
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
                {coverFile ? "Replace cover image" : "Upload cover image"}
              </button>
            </div>
          </div>
        </section>

        {/* ── Sections ───────────────────────────────────────────────────── */}
        <section className="rounded-3xl bg-white p-10">
          <h2 className="mb-2 text-lg font-semibold text-black-400">
            Content Sections
          </h2>
          <p className="mb-6 text-sm text-black-400/50">
            Add sections and fill them with content blocks (text, images, carousels, grids, buttons).
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
              {submitting ? "Saving…" : "Save Project"}
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}