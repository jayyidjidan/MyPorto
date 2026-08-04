import Button from "../common/Button";

export default function Gallery() {
  return (
    <section id="gallery" className="flex min-h-screen w-full flex-col items-center justify-start gap-8 lg:gap-18 px-4 py-12 lg:py-30 lg:px-12">

      <div className="flex w-full flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-body text-black-400/50">Gallery</p>
          <h1 className="w-[250px] lg:w-[350px] text-h1 text-gradient-black-1">Gallery From My Project</h1>
        </div>

        <Button variant="primary">See All</Button>
      </div>

        <div className="flex flex-col items-center gap-6 self-stretch lg:flex-row">

            <div className="flex w-full flex-col items-start gap-6 lg:flex-1">
                <div className="flex h-[200px] p-6 self-stretch rounded-4xl bg-gray-1 lg:h-[253px]"></div>
                <div className="flex h-[280px] p-6 self-stretch rounded-4xl bg-gray-1 lg:h-[561px]"></div>
                <div className="flex h-[220px] p-6 self-stretch rounded-4xl bg-gray-1 lg:h-[431px]"></div>
            </div>

            <div className="flex w-full flex-col items-start gap-6 lg:flex-1">
                <div className="flex h-[260px] p-6 self-stretch rounded-4xl bg-gray-1 lg:h-[503.567px]"></div>
                <div className="flex h-[260px] p-6 self-stretch rounded-4xl bg-gray-1 lg:h-[503.567px]"></div>
                <div className="flex h-[200px] p-6 self-stretch rounded-4xl bg-gray-1 lg:h-[389px]"></div>
            </div>

            <div className="flex w-full flex-col items-start gap-6 lg:flex-1">
                <div className="flex h-[220px] p-6 self-stretch rounded-4xl bg-gray-1 lg:h-[431px]"></div>
                <div className="flex h-[200px] p-6 self-stretch rounded-4xl bg-gray-1 lg:h-[253px]"></div>
                <div className="flex h-[280px] p-6 self-stretch rounded-4xl bg-gray-1 lg:h-[561px]"></div>
            </div>
        </div>

    </section>
  );
}