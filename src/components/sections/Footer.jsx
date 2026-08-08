import NavLink from "../common/NavLink";
import Navbar from "../layout/Navbar";

export default function Footer() {
  return (
    <section className="flex w-full min-h-screen justify-between flex-col items-center  gap-18 px-4 py-16 lg:py-12 lg:py-8 lg:px-12 bg-black-400 rounded-t-4xl lg:rounded-t-[72px]">
        <div className="flex flex-col lg:flex-row justify-between items-center   gap-8 lg:gap-0 w-full">
            <h4 className="text-h4 text-center lg:text-left text-white-1 w-[300px] lg:w-[373px]">Developed the Visioner product to enhance human interaction.</h4>
            <div className="flex items-start gap-4">
               <a href="https://dribbble.com/jayyidjidan" className="flex justify-center items-center bg-white-1 p-3 rounded-full">
                    <img src="/assets/Dribble.png"  className="w-6 h-6" alt="" />
               </a>
               <a href="https://www.linkedin.com/in/jayyidjidan14/" className="flex justify-center items-center bg-white-1 p-3 rounded-full">
                    <img src="/assets/Linkeldin.png"  className="w-6 h-6" alt="" />
               </a>
               <a href="https://github.com/jayyidjidan" className="flex justify-center items-center bg-white-1 p-3 rounded-full">
                    <img src="/assets/Github.png"  className="w-6 h-6" alt="" />
               </a>
            </div>
        </div>
        <div className="flex justify-center items-center gap-2.5 w-full">
            <h1 className="text-white-1 font-extrabold text-[clamp(48px,14vw,260px)] leading-none">JAYY</h1>
            <img src="/assets/Footer.png" alt="" className="w-[clamp(90px,18vw,350px)] h-auto shrink-0"/>
            <h1 className="text-white-1 font-extrabold text-[clamp(48px,14vw,260px)] leading-none">ID</h1>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 pt-6 justify-between items-center w-full border-t-[0.4px] border-white/50">
            <p className="text-body text-white/50">©2026 Jayyid Jidan, All Right Reserved</p>
            <p className="text-body text-white/50">Made in Jakarta, indonesia</p>
        </div>

    </section>
  )
}