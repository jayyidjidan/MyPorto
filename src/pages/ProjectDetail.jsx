import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectBySlug } from "../api/projects";
import { readCachedProject, cacheProject } from "../utils/projectCache";
import { optimizeImage, srcSetFor } from "../utils/image";

import Navbar from "../components/layout/Navbar";
import ProjectHero from "../components/sections/project-detail/ProjectHero";
import SectionRenderer from "../components/sections/project-detail/SectionRenderer";
import Footer from "../components/sections/Footer";

function SectionsSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-[1440px] animate-pulse px-4 py-8 lg:px-8 lg:py-12"
      aria-hidden="true"
    >
      <div className="h-24 w-full rounded-[28px] bg-black-400/10 lg:h-36 lg:rounded-[40px]" />
      <div className="mt-10 flex flex-col gap-4">
        <div className="h-4 w-full max-w-[720px] rounded bg-black-400/10" />
        <div className="h-4 w-full max-w-[600px] rounded bg-black-400/10" />
        <div className="h-4 w-full max-w-[660px] rounded bg-black-400/10" />
      </div>
      <div className="mt-8 aspect-[16/9] w-full rounded-3xl bg-black-400/10" />
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();

  // Start from whatever is already cached so the page can paint immediately
  const [{ project, partial }, setState] = useState(() =>
    readCachedProject(slug)
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setState(readCachedProject(slug));

    // Always refresh in the background so edits show up
    getProjectBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        cacheProject(slug, data);
        setState({ project: data, partial: false });
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load project.");
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Nothing cached and the request failed
  if (!project && error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-body text-black-400/50">Project not found.</p>
      </div>
    );
  }

  // Nothing cached yet: show the page frame instead of a blank screen
  if (!project) {
    return (
      <div className="min-h-screen bg-white-1">
        <header className="flex w-full justify-center px-4 pt-6 pb-2">
          <Navbar />
        </header>
        <main>
          <div className="px-4 pb-6 lg:px-8">
            <div className="mx-auto h-[280px] w-full max-w-[1440px] animate-pulse rounded-[28px] bg-black-400/10 lg:h-[380px] lg:rounded-[40px]" />
          </div>
          <SectionsSkeleton />
        </main>
        <Footer />
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
        {/* Dark hero header — stays full width */}
        <ProjectHero project={project} />

        {/* Cover image — first thing on screen, so load it with priority */}
        {project.coverImage && (
          <div className="mx-auto w-full max-w-[1440px] px-4 pb-6 lg:px-8">
            <img
              src={optimizeImage(project.coverImage, 1440)}
              srcSet={srcSetFor(project.coverImage)}
              sizes="(min-width: 1440px) 1376px, 100vw"
              alt={project.title}
              className="h-auto w-full rounded-3xl object-cover"
              style={{ maxHeight: "560px" }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        )}

        {/* Sections: skeleton while only the light card data is available */}
        {partial ? (
          error ? (
            <p className="px-4 py-12 text-center text-body text-black-400/50">
              Couldn't load the rest of this project. Please refresh the page.
            </p>
          ) : (
            <SectionsSkeleton />
          )
        ) : (
          sections.map((section) => (
            <SectionRenderer
              key={section.id || section._id}
              section={section}
            />
          ))
        )}
      </main>

      <Footer />
    </div>
  );
}