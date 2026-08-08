import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectBySlug } from "../api/projects";

import ProjectHero from "../components/sections/project-detail/ProjectHero";
import ProjectOverview from "../components/sections/project-detail/ProjectOverview";
import ProjectProblem from "../components/sections/project-detail/ProjectProblem";
import ProjectProcess from "../components/sections/project-detail/ProjectProcess";
import ProjectTech from "../components/sections/project-detail/ProjectTech";
import ProjectResult from "../components/sections/project-detail/ProjectResult";
import ProjectGallery from "../components/sections/project-detail/ProjectGallery";

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

  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectProblem project={project} />
      <ProjectProcess project={project} />
      <ProjectTech project={project} />
      <ProjectResult project={project} />
      <ProjectGallery project={project} />
    </>
  );
}