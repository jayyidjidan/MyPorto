import Button from "../common/Button";
import ProjectCard from "../common/ProjectCard";

export default function Project() {
  return (
    <section id="project" className="flex min-h-screen w-full flex-col items-center justify-start gap-8 lg:gap-18 px-4 py-12 lg:py-30 lg:px-12">

      <div className="flex w-full flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-body text-black-400/50">Project</p>
          <h1 className="w-100 lg-[424px] text-h1 text-gradient-black-1">See My Newest Project Case</h1>
        </div>

        <Button variant="primary">See All</Button>
      </div>

      <div className="flex w-full max-w-[1700px] flex-col items-center gap-6 lg:gap-14 lg:h-[660px] lg:flex-row lg:justify-between">

        <ProjectCard
          title="Furnitura"
          description="This is your card description it can be long or just short ur it can be 2 sentence"
          tags={["#Mobile App", "UI UX"]}
          image="/assets/Furnitura.webp"
          href="/projects/furnitura"
        />

        <div className="h-[1px] w-full bg-black-400/10 lg:h-full lg:w-[1px]"></div>

        <ProjectCard
          title="Furnitura"
          description="This is your card description it can be long or just short ur it can be 2 sentence"
          tags={["#Mobile App", "UI UX"]}
          image="/assets/Furnitura.webp"
          href="/projects/furnitura-2"
        />

        <div className="h-[1px] w-full bg-black-400/10 lg:h-full lg:w-[1px]"></div>

        <ProjectCard
          title="Furnitura"
          description="This is your card description it can be long or just short ur it can be 2 sentence"
          tags={["#Mobile App", "UI UX"]}
          image="/assets/Furnitura.webp"
          href="/projects/furnitura-3"
        />

      </div>
    </section>
  );
}