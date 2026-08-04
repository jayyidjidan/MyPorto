import ProjectHero from "../components/sections/project-detail/ProjectHero";
import ProjectOverview from "../components/sections/project-detail/ProjectOverview";
import ProjectProblem from "../components/sections/project-detail/ProjectProblem";
import ProjectProcess from "../components/sections/project-detail/ProjectProcess";
import ProjectTech from "../components/sections/project-detail/ProjectTech";
import ProjectResult from "../components/sections/project-detail/ProjectResult";
import ProjectGallery from "../components/sections/project-detail/ProjectGallery";

export default function ProjectDetail() {
  return (
    <>
      <ProjectHero />
      <ProjectOverview />
      <ProjectProblem />
      <ProjectProcess />
      <ProjectTech />
      <ProjectResult />
      <ProjectGallery />
    </>
  );
}