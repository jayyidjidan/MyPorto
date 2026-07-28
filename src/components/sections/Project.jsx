import Button from "../common/Button";
import Chip from "../common/Chip";

export default function Project() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-start gap-8 lg:gap-18 px-4 py-12 lg:py-30 lg:px-12">

      <div className="flex w-full flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-body text-black-400/50">Project</p>
          <h1 className="w-100 lg-[424px] text-h1 text-gradient-black-1">See My Newest Project Case</h1>
        </div>

        <Button variant="primary">See All</Button>
      </div>

        <div className="flex w-full max-w-[1700px] flex-col items-center gap-6 lg:gap-14 lg:h-[660px] lg:flex-row lg:justify-between">

            <div className="flex h-full w-full max-w-[397px] flex-col items-start justify-between gap-8 py-8 opacity-50 lg:flex-1 lg:gap-0">
                <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-start gap-2">
                        <h2 className="text-h2">Furnitura</h2>
                        <p>This is your card description it can be long or just short ur it can be 2 sentence</p>
                        </div>

                        <div className="flex items-start gap-1">
                        <Chip>#Mobile App</Chip>
                        <Chip>UI UX</Chip>
                        </div>
                </div>

                <div className="flex h-[240px] w-full items-center justify-center rounded-4xl bg-[url(/assets/Furnitura.webp)] bg-cover bg-center"></div>
            </div>

            {/* divider — horizontal on mobile, vertical on desktop */}
            <div className="h-[1px] w-full bg-black-400/10 lg:h-full lg:w-[1px]"></div>

            <div className="flex h-full w-full max-w-[397px] flex-col items-start justify-between gap-8 py-8 lg:flex-1 lg:gap-0">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-start gap-2">
                    <h2 className="text-h2">Furnitura</h2>
                    <p>This is your card description it can be long or just short ur it can be 2 sentence</p>
                    </div>

                    <div className="flex items-start gap-1">
                        <Chip>#Mobile App</Chip>
                        <Chip>UI UX</Chip>
                    </div>
                </div>

                <div className="flex h-[240px] w-full items-center justify-center rounded-4xl bg-[url(/assets/Furnitura.webp)] bg-cover bg-center">
                    <Button variant="primary">View Project</Button>
                </div>
            </div>

            {/* divider — horizontal on mobile, vertical on desktop */}
            <div className="h-[1px] w-full bg-black-400/10 lg:h-full lg:w-[1px]"></div>

            <div className="flex h-full w-full max-w-[397px] flex-col items-start justify-between gap-8 py-8 opacity-50 lg:flex-1 lg:gap-0">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-start gap-2">
                    <h2 className="text-h2">Furnitura</h2>
                    <p>This is your card description it can be long or just short ur it can be 2 sentence</p>
                    </div>

                    <div className="flex items-start gap-1">
                    <Chip>#Mobile App</Chip>
                    <Chip>UI UX</Chip>
                    </div>
                </div>

                <div className="flex h-[240px] w-full items-center justify-center rounded-4xl bg-[url(/assets/Furnitura.webp)] bg-cover bg-center"></div>
            </div>

        </div>
    </section>
  );
}