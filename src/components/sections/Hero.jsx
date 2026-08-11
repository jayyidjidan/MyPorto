import Button from "../common/Button";

export default function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-screen w-full flex-col items-center justify-center gap-8 px-6 lg:flex-row lg:justify-between lg:gap-0 lg:px-12"
    >
      {/* Center group */}
      <div className="max-w-[1800px] contents lg:order-2 lg:flex lg:flex-col lg:items-center lg:gap-6 lg:pt-18">
        
        {/* Title */}
        <h1
          className="
            order-1 w-full text-center text-display-1
            lg:order-none lg:w-[560px]
            animate-fade-in
          "
        >
          HI, I’AM JAYYID JIDAN
        </h1>

        {/* Photo */}
        <img
          src="/assets/My Photo.webp"
          alt="Jayyid Jidan"
          className="
            shadow-xl absolute left-1/2 top-[300px] z-20
            h-[170px] w-[119px] -translate-x-1/2
            animate-fade-in delay-100

            lg:left-1/2 lg:top-1/2
            lg:h-[320px] lg:w-[224px]
            lg:-translate-y-1/2
          "
        />

        {/* Buttons */}
        <div
          className="
            order-3 flex gap-1
            lg:order-none
            animate-fade-in delay-400
          "
        >
          <Button variant="primary">See More</Button>
          <Button variant="secondary">Download CV</Button>
        </div>
      </div>

      {/* Role + Description */}
      <div className="order-2 flex w-full flex-col items-center gap-4 text-center lg:contents">
        
        {/* Role */}
        <h4
          className="
            text-h4
            lg:order-1 lg:w-[460px] lg:text-left
            animate-fade-in delay-200
          "
        >
          Fullstack Developer & <br className="hidden lg:inline" />
          UI UX Designer
        </h4>

        {/* Description */}
        <p
          className="
            w-full text-body text-black-400/50
            lg:order-3 lg:w-[460px] lg:text-right
            animate-fade-in delay-300
          "
        >
          Hi Iam Jayyid Jidan, Currenlty Graduated from Brawijaya University,
          currently specializing in UI/UX and Fullstack Development, and
          pursuing studies to become a future AI Engineer.
        </p>
      </div>
    </section>
  );
}