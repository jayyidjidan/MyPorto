import { useState, useEffect, useRef } from "react";
import { getProjects, getImageUrl } from "../../api/projects";
import ProjectCard from "../common/ProjectCard";

// v2: bump so old-shaped cached data is ignored
const CACHE_KEY = "projects-cache-v2";

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // storage penuh / diblokir: abaikan
  }
}

// Minta versi gambar yang lebih kecil & modern kalau hostingnya Cloudinary.
// URL lain dikembalikan apa adanya.
function optimizeImage(url, width = 800) {
  if (!url) return url;
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}

// coverImage is already a full URL; only use getImageUrl for relative paths
function resolveImage(path) {
  if (!path) return "";
  return /^https?:\/\//.test(path) ? path : getImageUrl(path);
}

function ProjectSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col gap-4" aria-hidden="true">
      <div className="h-10 w-3/4 rounded-xl bg-black-400/10" />
      <div className="flex gap-2">
        <div className="h-8 w-20 rounded-full bg-black-400/10" />
        <div className="h-8 w-24 rounded-full bg-black-400/10" />
        <div className="h-8 w-16 rounded-full bg-black-400/10" />
      </div>
      <div className="aspect-[4/3] w-full rounded-3xl bg-black-400/10" />
    </div>
  );
}

export default function Project() {
  const [projects, setProjects] = useState(readCache);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(projects.length === 0);
  const [error, setError] = useState(false);

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getProjects()
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : data?.projects ?? [];
        setProjects(list);
        writeCache(list);
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
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
          <p className="text-body text-black-400/70">Project</p>

          <h2 className="text-center text-h1 text-gradient-black-1 lg:w-[424px]">
            See My Newest Project Case
          </h2>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid w-full max-w-[1700px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex w-full items-center justify-center py-20">
          <p className="text-body text-black-400/70">
            {error
              ? "Couldn't load projects. Please refresh the page."
              : "No projects yet."}
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
                  isVisible ? "animate-fade-up" : "animate-hidden"
                }`}
                style={{
                  animationDelay: `${100 + i * 100}ms`,
                }}
              >
                <ProjectCard
                  title={project.title}
                  tags={project.category ? [`#${project.category}`] : []}
                  image={optimizeImage(resolveImage(project.coverImage))}
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
                text-black-400/70
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