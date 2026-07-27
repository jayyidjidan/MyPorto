import Button from "../common/button";

export default function Hero({ children }) {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center px-12">
      {/* everything else centered in the remaining space */}

      <div className="flex w-full max-w-[1800px] items-center justify-between"> 
        <h4 className="w-[460px] text-h4">Fullstack Developer & <br/> UI UX Designer</h4>
    
        <div className="flex flex-col items-center gap-6 pt-18">
            <img src="/assets/My Photo.webp" alt="Jayyid Jidan" className="absolute left-1/2 top-1/2 z-20 w-[224px] h-[320px] -translate-x-1/2 -translate-y-1/2"/>

            <h1 className="text-display-1 w-[560px]">HI, I’AM JAYYID JIDAN</h1>
            <div className="flex gap-1">
                <Button variant="primary">See More</Button>
                <Button variant="secondary">Download CV</Button>
            </div>
        </div>

        <p className="w-[460px] text-body text-right text-[#111]/50 ">Graduated from Brawijaya University, currently specializing in UI/UX and Fullstack Development, and pursuing studies to become a future AI Engineer.</p>
      </div>
    </section>
  );
}