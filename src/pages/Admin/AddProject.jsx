import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormHero from "../../components/sections/project-form/FormHero";
import ProjectHeroOverview from "../../components/sections/project-form/ProjectHeroOverview";
import ProjectProblem from "../../components/sections/project-form/ProjectProblem";
import ProjectProcess from "../../components/sections/project-form/ProjectProcess";
import Projectresult from "../../components/sections/project-form/Projectresult";
import ProjectGallery from "../../components/sections/project-form/ProjectGallery";
import ProjectTech from "../../components/sections/project-form/ProjectTech";
import Button from "../../components/common/Button";
import { createProject } from "../../api/projects";

const defaultFormData = {
  title: "",
  showSource: false,
  showPreview: false,
  coverImage: null,
  previewUrl: "",
  sourceUrl: "",
  overview: "",
  duration: "",
  problem: "",
  solution: "",
  image1: null,
  image2: null,
  process1: "",
  process2: "",
  process3: "",
  process4: "",
  process1description: "",
  process2description: "",
  process3description: "",
  process4description: "",
  process1image: null,
  process2image: null,
  process3image: null,
  process4image: null,
  technologies: [],
  result1: "",
  result2: "",
  result3: "",
  result1description: "",
  result2description: "",
  result3description: "",
  result1image: null,
  result2image: null,
  result3image: null,
  gallery1: null,
  gallery2: null,
  gallery3: null,
  gallery4: null,
  gallery5: null,
  gallery6: null,
  gallery7: null,
  gallery8: null,
  gallery9: null,
  categories: [],
};

export default function AddProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultFormData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Auto-generate slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      // Build the nested MongoDB document
      const projectData = {
        slug,
        hero: {
          title: formData.title,
          showSource: formData.showSource,
          showPreview: formData.showPreview,
          previewUrl: formData.previewUrl,
          sourceUrl: formData.sourceUrl,
          coverImage: "",
        },
        overview: {
          description: formData.overview,
          duration: formData.duration,
          categories: formData.categories,
        },
        problem: {
          problem: formData.problem,
          solution: formData.solution,
          images: [],
        },
        processes: [
          { title: formData.process1, description: formData.process1description, images: [] },
          { title: formData.process2, description: formData.process2description, images: [] },
          { title: formData.process3, description: formData.process3description, images: [] },
          { title: formData.process4, description: formData.process4description, images: [] },
        ].filter((p) => p.title.trim()),
        technologies: formData.technologies,
        results: [
          { title: formData.result1, description: formData.result1description, images: [] },
          { title: formData.result2, description: formData.result2description, images: [] },
          { title: formData.result3, description: formData.result3description, images: [] },
        ].filter((r) => r.title.trim()),
        gallery: [],
      };

      // Build multipart form data
      const fd = new FormData();
      fd.append("projectData", JSON.stringify(projectData));

      // Image files
      if (formData.coverImage) fd.append("coverImage", formData.coverImage);
      if (formData.image1) fd.append("image1", formData.image1);
      if (formData.image2) fd.append("image2", formData.image2);
      for (let i = 1; i <= 4; i++) {
        if (formData[`process${i}image`]) fd.append(`process${i}image`, formData[`process${i}image`]);
      }
      for (let i = 1; i <= 3; i++) {
        if (formData[`result${i}image`]) fd.append(`result${i}image`, formData[`result${i}image`]);
      }
      for (let i = 1; i <= 9; i++) {
        if (formData[`gallery${i}`]) fd.append(`gallery${i}`, formData[`gallery${i}`]);
      }

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

        <Projectresult
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
              {submitting ? "Saving…" : "Save Project"}
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}