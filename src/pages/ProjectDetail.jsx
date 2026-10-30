import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectBySlug } from "../api/projects";

import Navbar from "../components/layout/Navbar";
import ProjectHero from "../components/sections/project-detail/ProjectHero";
import SectionRenderer from "../components/sections/project-detail/SectionRenderer";
import Footer from "../components/sections/Footer";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProjectBySlug(slug)
      .then((data) => setProject(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-body text-black-400/50">Loading project…</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-body text-black-400/50">Project not found.</p>
      </div>
    );
  }

  const sections = [...(project.sections || [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  return (
    <div className="min-h-screen bg-white-1">
      {/* Navbar — centered at top */}
      <header className="flex w-full justify-center px-4 pt-6 pb-2">
        <Navbar />
      </header>

      <main>
        {/* Dark hero header */}
        <ProjectHero project={project} />

        {/* Cover image (if set) */}
        {project.coverImage && (
          <div className="px-4 pb-6 lg:px-8">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full rounded-3xl object-cover"
              style={{ maxHeight: "560px" }}
              loading="lazy"
            />
          </div>
        )}

        {/* Dynamic sections */}
        {sections.map((section) => (
          <SectionRenderer key={section.id || section._id} section={section} />
        ))}
      </main>

      <Footer />
    </div>
  );
}