import { useState, useEffect } from "react";
import { getProjects, getImageUrl } from "../../api/projects";
import ProjectCard from "../common/ProjectCard";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const displayed = showAll ? projects : projects.slice(0, 3);
  const hasMore = projects.length > 3;

  return (
    <section
      id="project"
      className="flex min-h-screen w-full flex-col items-center justify-start gap-8 lg:gap-18 px-4 py-12 lg:py-30 lg:px-12"
    >
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-body text-black-400/50">Project</p>
          <h1 className="w-100 lg-[424px] text-h1 text-gradient-black-1">
            See My Newest Project Case
          </h1>
        </div>

        {hasMore && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="text-body text-black-400/60 underline underline-offset-4 hover:text-black-400 transition-colors duration-200"
          >
            See More Projects
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex w-full items-center justify-center py-20">
          <p className="text-body text-black-400/50">Loading projects…</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex w-full items-center justify-center py-20">
          <p className="text-body text-black-400/50">No projects yet.</p>
        </div>
      ) : (
        <div
          className={
            showAll && projects.length > 3
              ? "flex w-full max-w-[1700px] flex-wrap items-start justify-center gap-12"
              : "flex w-full max-w-[1700px] flex-col items-center gap-6 lg:gap-14 lg:h-[660px] lg:flex-row lg:justify-between"
          }
        >
          {displayed.map((project, i) => (
            <div
              key={project._id}
              className={
                showAll && projects.length > 3
                  ? "flex"
                  : "flex flex-col lg:flex-row items-center w-full lg:flex-1 gap-6 lg:gap-14 lg:h-full"
              }
            >
              {/* Divider (only in 3-column view, not first item) */}
              {!showAll && i > 0 && (
                <div className="h-[1px] w-full bg-black-400/10 lg:h-full lg:w-[1px] flex-shrink-0" />
              )}

              <ProjectCard
                title={project.hero?.title}
                description={project.overview?.description}
                tags={(project.overview?.categories || []).map((c) => `#${c}`)}
                image={getImageUrl(project.hero?.coverImage)}
                href={`/projects/${project.slug}`}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}