export default function ProjectProcess(){
    return(
        <section className="flex w-full flex-col min-h-screen items-start gap-14 lg:gap-30 px-4 py-12 lg:py-12 lg:px-32">
            <div className="flex gap-1">
                <h2 className="text-h2 text-black-400"> Process</h2>
            </div>

            {/* timeline */}
            <div className="flex items-center justify-center gap-12 w-full">
                <div className="flex flex-col gap-2 pr-4 border-r-1 border-[#c9c9c9] w-full">
                    <h3 className="text-h3 text-black-400">1.Research</h3>
                    <h5 className="text-h5 text-black-400/50 w-full">Conducting research to understand users' needs, behaviors, and challenges when purchasing furniture online.</h5>
                </div>

                <div className="flex items-start pt-12 w-full">
                    <div className="flex flex-col gap-2 pr-4 border-r-1 border-[#c9c9c9] w-full">
                        <h3 className="text-h3 text-black-400">2.Design</h3>
                        <h5 className="text-h5 text-black-400/50 w-full">Conducting research to understand users' needs, behaviors, and challenges when purchasing furniture online.</h5>
                    </div>
                </div>

                <div className="flex items-start pt-24 w-full">
                    <div className="flex flex-col gap-2 pr-4 border-r-1 border-[#c9c9c9] w-full">
                        <h3 className="text-h3 text-black-400">3.Protoyping</h3>
                        <h5 className="text-h5 text-black-400/50 w-full">Conducting research to understand users' needs, behaviors, and challenges when purchasing furniture online.</h5>
                    </div>
                </div>

                <div className="flex items-start pt-36 w-full">
                    <div className="flex flex-col gap-2 pr-4 border-r-1 border-[#c9c9c9]  w-full">
                        <h3 className="text-h3 text-black-400">4.Testing</h3>
                        <h5 className="text-h5 text-black-400/50 w-full">Conducting research to understand users' needs, behaviors, and challenges when purchasing furniture online.</h5>
                    </div>
                </div>
            </div>

            {/* image */}
            <div className="flex flex-col w-full gap-6 m">
                <div className="flex w-full h-[500px] lg:h-[500px] items-center justify-center gap-4">
                    <div className="bg-gray-400 w-full h-full rounded-4xl"></div>
                    <div className="bg-gray-400 w-[900px] h-full rounded-4xl"></div>
                </div>
                <div className="flex w-full h-[500px] lg:h-[500px] items-center justify-center gap-4">
                    <div className="bg-gray-400 w-[900px] h-full rounded-4xl"></div>
                    <div className="bg-gray-400 w-full h-full rounded-4xl"></div>
                </div>
            </div>        
        </section>
    );
}