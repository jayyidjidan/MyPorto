export default function ProjectResult() {
  return (
    <section className="flex w-full flex-col min-h-screen items-start gap-8 lg:gap-16 px-4 py-12 lg:py-12 lg:px-32">

      <div className="flex gap-1">
        <h2 className="text-h2 text-black-400">Process</h2>
      </div>

      <div className="flex flex-col lg:flex-row w-full items-center h-auto lg:h-[500px] gap-8 lg:gap-16 justify-center">

        {/* Features */}
        <div className="flex flex-col w-full">

          <div className="flex flex-col gap-6 py-8 w-full border-b border-[#c9c9c9]">
            <h2 className="text-h2 text-black-400">
              Feature 1
            </h2>

            <h5 className="text-h5 text-black-400/50 w-full">
              Description of Feature 1
            </h5>
          </div>

          <div className="flex flex-col gap-6 py-8 w-full border-b border-[#c9c9c9] opacity-50">
            <h2 className="text-h2 text-black-400">
              Feature 2
            </h2>

            <h5 className="text-h5 text-black-400/50 w-full">
              Description of Feature 2
            </h5>
          </div>

          <div className="flex flex-col gap-6 py-8 w-full opacity-50">
            <h2 className="text-h2 text-black-400">
              Feature 3
            </h2>

            <h5 className="text-h5 text-black-400/50 w-full">
              Description of Feature 3
            </h5>
          </div>

        </div>

        {/* Image */}
        <img
          src="/assets/your-image.png"
          className="w-full h-64 sm:h-80 lg:h-[500px] object-cover rounded-4xl bg-gray-400"
        />

      </div>

    </section>
  );
}