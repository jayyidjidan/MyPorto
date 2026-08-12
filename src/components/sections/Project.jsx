import { useState, useEffect, useRef } from "react";
import { getProjects, getImageUrl } from "../../api/projects";
import ProjectCard from "../common/ProjectCard";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const displayed = showAll ? projects : projects.slice(0, 3);
  const hasMore = projects.length > 3;

  return (
    <section
      ref={sectionRef}
      id="project"
      className="flex min-h-screen w-full flex-col items-center justify-start gap-8 px-4 py-12 lg:gap-18 lg:px-12 lg:py-30"
    >
      {/* Header */}
      <div
        className={`flex w-full flex-col items-center justify-center gap-6 ${
          isVisible
            ? "animate-fade-up"
            : "animate-hidden"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-body text-black-400/50">
            Project
          </p>

          <h1 className="text-h1 text-gradient-black-1 lg:w-[424px]">
            See My Newest Project Case
          </h1>
        </div>

        {hasMore && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="text-body text-black-400/60 underline underline-offset-4 transition-colors duration-200 hover:text-black-400"
          >
            See More Projects
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex w-full items-center justify-center py-20">
          <p className="text-body text-black-400/50">
            Loading projects…
          </p>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex w-full items-center justify-center py-20">
          <p className="text-body text-black-400/50">
            No projects yet.
          </p>
        </div>
      ) : (
        <div
          className={
            showAll && projects.length > 3
              ? "flex w-full max-w-[1700px] flex-wrap items-start justify-center gap-12"
              : "flex w-full max-w-[1700px] flex-col items-center gap-6 lg:h-[660px] lg:flex-row lg:justify-between lg:gap-14"
          }
        >
          {displayed.map((project, i) => (
            <div
              key={project._id}
              className={
                showAll && projects.length > 3
                  ? `flex ${
                      isVisible
                        ? "animate-fade-up"
                        : "animate-hidden"
                    }`
                  : `flex w-full flex-col items-center gap-6 lg:h-full lg:flex-1 lg:flex-row lg:gap-14 ${
                      isVisible
                        ? "animate-fade-up"
                        : "animate-hidden"
                    }`
              }
              style={{
                animationDelay: `${200 + i * 150}ms`,
              }}
            >
              {/* Divider */}
              {!showAll && i > 0 && (
                <div className="h-[1px] w-full flex-shrink-0 bg-black-400/10 lg:h-full lg:w-[1px]" />
              )}

              <ProjectCard
                title={project.hero?.title}
                description={project.overview?.description}
                tags={(project.overview?.categories || []).map(
                  (c) => `#${c}`
                )}
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