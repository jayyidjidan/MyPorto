import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormHero from "../../components/sections/project-form/FormHero";
import ProjectHeroOverview from "../../components/sections/project-form/ProjectHeroOverview";
import ProjectProblem from "../../components/sections/project-form/ProjectProblem";
import ProjectProcess from "../../components/sections/project-form/ProjectProcess";
import ProjectResult from "../../components/sections/project-form/ProjectResult";
import ProjectGallery from "../../components/sections/project-form/ProjectGallery";
import ProjectTech from "../../components/sections/project-form/ProjectTech";
import Button from "../../components/common/Button";
import { getProjectBySlug, updateProject } from "../../api/projects";

export default function EditProject() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [projectId, setProjectId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ── Load existing project and pre-fill the form ──────────────
  useEffect(() => {
    getProjectBySlug(slug)
      .then((project) => {
        setProjectId(project._id);

        const p = project.processes || [];
        const r = project.results || [];

        setFormData({
          // Hero
          title: project.hero?.title || "",
          showSource: project.hero?.showSource || false,
          showPreview: project.hero?.showPreview || false,
          coverImage: null, // can't pre-fill file input; existing URL preserved via existingCoverImage
          existingCoverImage: project.hero?.coverImage || "",
          previewUrl: project.hero?.previewUrl || "",
          sourceUrl: project.hero?.sourceUrl || "",

          // Overview
          overview: project.overview?.description || "",
          duration: project.overview?.duration || "",
          categories: project.overview?.categories || [],

          // Problem
          problem: project.problem?.problem || "",
          solution: project.problem?.solution || "",
          image1: null,
          image2: null,
          existingImage1: project.problem?.images?.[0] || "",
          existingImage2: project.problem?.images?.[1] || "",

          // Processes (up to 4)
          process1: p[0]?.title || "",
          process1description: p[0]?.description || "",
          process1image: null,
          existingProcess1image: p[0]?.images?.[0] || "",

          process2: p[1]?.title || "",
          process2description: p[1]?.description || "",
          process2image: null,
          existingProcess2image: p[1]?.images?.[0] || "",

          process3: p[2]?.title || "",
          process3description: p[2]?.description || "",
          process3image: null,
          existingProcess3image: p[2]?.images?.[0] || "",

          process4: p[3]?.title || "",
          process4description: p[3]?.description || "",
          process4image: null,
          existingProcess4image: p[3]?.images?.[0] || "",

          // Technologies
          technologies: project.technologies || [],

          // Results (up to 3)
          result1: r[0]?.title || "",
          result1description: r[0]?.description || "",
          result1image: null,
          existingResult1image: r[0]?.images?.[0] || "",

          result2: r[1]?.title || "",
          result2description: r[1]?.description || "",
          result2image: null,
          existingResult2image: r[1]?.images?.[0] || "",

          result3: r[2]?.title || "",
          result3description: r[2]?.description || "",
          result3image: null,
          existingResult3image: r[2]?.images?.[0] || "",

          // Gallery
          gallery1: null, gallery2: null, gallery3: null,
          gallery4: null, gallery5: null, gallery6: null,
          gallery7: null, gallery8: null, gallery9: null,
          existingGallery: project.gallery || [],
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Build nested MongoDB document — use existing image URLs where no new file is selected
      const projectData = {
        slug: slug, // keep existing slug
        hero: {
          title: formData.title,
          showSource: formData.showSource,
          showPreview: formData.showPreview,
          previewUrl: formData.previewUrl,
          sourceUrl: formData.sourceUrl,
          coverImage: formData.existingCoverImage, // backend will override if new file uploaded
        },
        overview: {
          description: formData.overview,
          duration: formData.duration,
          categories: formData.categories,
        },
        problem: {
          problem: formData.problem,
          solution: formData.solution,
          images: [formData.existingImage1, formData.existingImage2].filter(Boolean),
        },
        processes: [
          { title: formData.process1, description: formData.process1description, images: [formData.existingProcess1image].filter(Boolean) },
          { title: formData.process2, description: formData.process2description, images: [formData.existingProcess2image].filter(Boolean) },
          { title: formData.process3, description: formData.process3description, images: [formData.existingProcess3image].filter(Boolean) },
          { title: formData.process4, description: formData.process4description, images: [formData.existingProcess4image].filter(Boolean) },
        ].filter((p) => p.title.trim()),
        technologies: formData.technologies,
        results: [
          { title: formData.result1, description: formData.result1description, images: [formData.existingResult1image].filter(Boolean) },
          { title: formData.result2, description: formData.result2description, images: [formData.existingResult2image].filter(Boolean) },
          { title: formData.result3, description: formData.result3description, images: [formData.existingResult3image].filter(Boolean) },
        ].filter((r) => r.title.trim()),
        gallery: formData.existingGallery,
      };

      const fd = new FormData();
      fd.append("projectData", JSON.stringify(projectData));

      // New files — backend only overrides existing URL when a new file is present
      if (formData.coverImage) fd.append("coverImage", formData.coverImage);
      if (formData.image1) fd.append("image1", formData.image1);
      if (formData.image2) fd.append("image2", formData.image2);
      for (let i = 1; i <= 4; i++) {
        if (formData[`process${i}image`]) fd.append(`process${i}image`, formData[`process${i}image`]);
      }
      for (let i = 1; i <= 3; i++) {
        if (formData[`result${i}image`]) fd.append(`result${i}image`, formData[`result${i}image`]);
      }
      // Gallery: new files are appended on top of existing ones in the backend
      for (let i = 1; i <= 9; i++) {
        if (formData[`gallery${i}`]) fd.append(`gallery${i}`, formData[`gallery${i}`]);
      }

      await updateProject(projectId, fd);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Failed to update project.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#e6e6e6]">
        <p className="text-body text-black-400/50">Loading project…</p>
      </div>
    );
  }

  if (error && !formData) {
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
        <ProjectHeroOverview
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />

        <ProjectProblem
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />

        <ProjectProcess
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />

        <ProjectTech
          formData={formData}
          setFormData={setFormData}
        />

        <ProjectResult
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />

        <ProjectGallery
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />

        {/* Submit area */}
        <div className="flex flex-col items-end gap-4 rounded-3xl bg-white p-12">
          {/* Existing image info */}
          {formData?.existingCoverImage && (
            <p className="text-body text-black-400/50 text-sm">
              ℹ️ Leave image fields blank to keep existing images.
            </p>
          )}

          {error && (
            <p className="text-body text-red-500">{error}</p>
          )}

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
