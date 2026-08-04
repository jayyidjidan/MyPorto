export default function ProjectProblem(){
    return(
        <section className="flex w-full flex-col min-h-screen items-center gap-14 lg:gap-30 px-4 py-12 lg:py-12 lg:px-32">
                <div className="flex flex-col lg:flex-row justify-center w-full items-center gap-12 lg:gap-21">
                    <div className="flex flex-col w-full gap-6">
                        <h2 className="text-h2 text-black-400">Problem</h2>
                        <h5 className="text-h5 text-black-400/50 w-full lg:w-[536px]">Purchasing furniture online often leaves users uncertain because they cannot visualize how the furniture's size, color, and placement will look in their living space. As a result, users struggle to make confident purchasing decisions.</h5>
                    </div>
                    <div className="flex flex-col items-end lg:items-start w-full gap-6 pt-0 lg:pt-14">
                        <h2 className="text-h2 text-black-400 ">Solution</h2>
                        <h5 className="text-h5 text-black-400/50 text-right lg:text-left w-full lg:w-[536px]">Purchasing furniture online often leaves users uncertain because they cannot visualize how the furniture's size, color, and placement will look in their living space. As a result, users struggle to make confident purchasing decisions.</h5>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row w-full h-[700px] lg:h-[500px] items-center justify-center gap-4">
                    <div className="bg-gray-400 w-full h-full rounded-4xl"></div>
                    <div className="bg-gray-400 w-full h-full rounded-4xl"></div>
                </div>
        </section>
    );
}