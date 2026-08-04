export default function ProjectGallery() {
  return (
    <section className="flex w-full flex-col items-start justify-center gap-8 lg:gap-14 py-12 lg:py-12 ">
      <div className="flex w-full items-center justify-start gap-1 px-4 lg:px-32">
        <h2 className="text-h2 text-black-400">Gallery</h2>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="flex w-max gap-6">
          <img
            src=""
            alt=""
            className="w-[273px] h-[180px] lg:h-[300px] lg:w-[456px] shrink-0 rounded-4xl bg-gray-400"
          />
          <img
            src=""
            alt=""
            className="w-[273px] h-[180px] lg:h-[300px] lg:w-[456px] shrink-0 rounded-4xl bg-gray-400"
          />
          <img
            src=""
            alt=""
            className="w-[273px] h-[180px] lg:h-[300px] lg:w-[456px] shrink-0 rounded-4xl bg-gray-400"
          />
          <img
            src=""
            alt=""
            className="w-[273px] h-[180px] lg:h-[300px] lg:w-[456px] shrink-0 rounded-4xl bg-gray-400"
          />
          <img
            src=""
            alt=""
            className="w-[273px] h-[180px] lg:h-[300px] lg:w-[456px] shrink-0 rounded-4xl bg-gray-400"
          />
        </div>
      </div>
    </section>
  );
}