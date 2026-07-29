import NavLink from "../common/NavLink";
import Navbar from "../layout/Navbar";

export default function Footer() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-18 px-4 py-12 lg:py-14 lg:px-12 bg-black-400 rounded-t-[72px]">
        <div className="flex justify-between items-center w-full">
            <h4 className="text-h4 text-white-1 w-[373px]">Developed the Visioner product to enhance human interaction.</h4>
            <Navbar variant="white"/>
        </div>
        <div className="flex justify-center items-center gap-2.5">
            <h1 className="text-white-1 font-extrabold text-[260px]">JAYY</h1>
            <img src="/assets/Footer.png" alt=""  className="w-[350px] h-[381px]"/>
            <h1 className="text-white-1 font-extrabold text-[260px]">ID</h1>
        </div>
        
        <div className="flex pt-6 justify-between items-center w-full border-t-[0.4px] border-white">
            <p className="text-body text-white">©2026 Jayyid Jidan, All Right Reserved</p>
            <div className="flex items-start gap-4">
               <a href="#" className="flex justify-center items-center bg-white-1 p-3 rounded-full">
                    <img src="/assets/Dribble.png"  className="w-6 h-6" alt="" />
               </a>
               <a href="#" className="flex justify-center items-center bg-white-1 p-3 rounded-full">
                    <img src="/assets/Linkeldin.png"  className="w-6 h-6" alt="" />
               </a>
               <a href="#" className="flex justify-center items-center bg-white-1 p-3 rounded-full">
                    <img src="/assets/Github.png"  className="w-6 h-6" alt="" />
               </a>
            </div>
        </div>

    </section>
  )
}