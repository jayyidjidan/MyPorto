import Button from "../common/Button";

export default function Experience() {
  return (
    <section className="flex w-full min-h-screen lg:min-h-0 flex-col items-center justify-start gap-18 px-4 py-12 lg:py-25 lg:px-12 bg-black-400 rounded-[48px]">
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-body text-white-2">Experience</p>
          <h1 className="w-[200px] lg:w-[424px] text-h1 text-gradient-white-1">Explore My Exprience</h1>
        </div>

        {/* Desktop layout — original horizontal version */}
        <div className="hidden lg:flex flex-col items-start self-stretch w-full gap-6">
            <div className="flex w-full justify-between items-end self-stretch">
                <div className="flex flex-col gap-2.5 justify-center items-center">
                    <h4 className="text-h4 text-white-2">My Previous Exprience</h4>
                    <img src="/assets/Polygon.png" className="w-5 h-4.75" alt="" />
                </div>
                <div className="flex flex-col items-center gap-2.5">
                    <h4 className="text-h4 text-white-2">Plainthing Studio</h4>
                    <h4 className="text-h4 text-white/50">Intern UI Designer</h4>
                    <p className="text-body text-white/50">2025 - 2026</p>
                    <img src="/assets/Polygon.png" className="w-5 h-4.75" alt="" />
                </div>
                <div className="flex flex-col gap-2.5 justify-center items-center">
                    <h4 className="text-h4 text-white-2">My Future Exprience</h4>
                    <img src="/assets/Polygon.png" className="w-5 h-4.75" alt="" />
                </div>
            </div>

            <div className="flex pl-[120px] pr-[100px] items-center justify-center w-full">
                <div className="w-6 h-6 shrink-0 bg-white/5 rounded-full"></div>
                <div className="flex-1 h-1 bg-white-gradient"></div>
                <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-full border-2 border-white">
                    <div className="w-8 h-8 rounded-full bg-white"></div>
                </div>
                <div className="flex-1 h-1 bg-white"></div>
                <div className="w-6 h-6 shrink-0 bg-white rounded-full"></div>
            </div>
        </div>

       {/* Mobile layout — text centered, rotated arrow beside text, vertical line right */}
    <div className="flex lg:hidden w-full flex-1 min-h-0 items-stretch gap-6">
        <div className="flex flex-1 flex-col items-center justify-between gap-8 py-2">
            <div className="flex items-center gap-2.5">
                <h4 className="text-h4 text-white-2 text-center">My Previous Exprience</h4>
                <img src="/assets/Polygon.png" className="w-4.75 h-5 rotate-[-90deg]" alt="" />
            </div>
            <div className="flex justify-center items-center gap-2.5">
                <div className="flex flex-col items-center gap-2.5 text-center">
                    <h4 className="text-h4 text-white-2">Plainthing Studio</h4>
                    <h4 className="text-h4 text-white/50">Intern UI Designer</h4>
                    <p className="text-body text-white/50">2025 - 2026</p>
                </div>
                <img src="/assets/Polygon.png" className="w-4.75 h-5 rotate-[-90deg]" alt="" />
            </div>
            <div className="flex items-center gap-2.5">
                <h4 className="text-h4 text-white-2 text-center">My Future Exprience</h4>
                <img src="/assets/Polygon.png" className="w-4.75 h-5 rotate-[-90deg]" alt="" />
            </div>
        </div>

        <div className="flex flex-col items-center justify-between py-2">
            <div className="w-6 h-6 shrink-0 bg-white/5 rounded-full"></div>
            <div className="flex-1 w-1 bg-white-gradient"></div>
            <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-full border-2 border-white">
                <div className="w-8 h-8 rounded-full bg-white"></div>
            </div>
            <div className="flex-1 w-1 bg-white"></div>
            <div className="w-6 h-6 shrink-0 bg-white rounded-full"></div>
        </div>
    </div>

        <Button variant="secondary">Know More</Button>
    </section>
  );
}