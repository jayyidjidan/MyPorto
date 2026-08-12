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
          isVisible ? "animate-fade-up" : "animate-hidden"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-body text-black-400/50">
            Project
          </p>

          <h1 className="text-center text-h1 text-gradient-black-1 lg:w-[424px]">
            See My Newest Project Case
          </h1>
        </div>
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
        <>
          {/* Project Grid */}
          <div
            className="
              grid
              w-full
              max-w-[1700px]
              grid-cols-1
              gap-8
              md:grid-cols-2
              lg:grid-cols-3
              lg:gap-14
            "
          >
            {displayed.map((project, i) => (
              <div
                key={project._id}
                className={`w-full ${
                  isVisible
                    ? "animate-fade-up"
                    : "animate-hidden"
                }`}
                style={{
                  animationDelay: `${200 + i * 150}ms`,
                }}
              >
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

          {/* See More Button */}
          {hasMore && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="
                text-body
                text-black-400/60
                underline
                underline-offset-4
                transition-colors
                duration-200
                hover:text-black-400
              "
            >
              See More Projects
            </button>
          )}
        </>
      )}
    </section>
  );
}