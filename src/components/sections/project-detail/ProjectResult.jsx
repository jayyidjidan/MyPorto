export default function ProjectResult(){
    return(
        <section className="flex w-full flex-col min-h-screen items-start justify-center gap-14 lg:gap-16 px-4 py-12 lg:py-12 lg:px-32">
            <div className="flex gap-1">
                <h2 className="text-h2 text-black-400"> Process</h2>
            </div>

            <div className="flex w-full items-center h-[500px] gap-16 justify-center">
                <div className="flex flex-col w-full">
                    <div className="flex flex-col gap-6 py-8 w-full border-b-1 border-[#c9c9c9]">
                        <h2 className="text-h2 text-black-400">Feature 1</h2>
                        <h5 className="text-h5 text-black-400/50 w-full">Description of Feature 1</h5>
                    </div>
                    <div className="flex flex-col gap-6 py-8 w-full border-b-1 border-[#c9c9c9] opacity-50">
                        <h2 className="text-h2 text-black-400">Feature 2</h2>
                        <h5 className="text-h5 text-black-400/50 w-full">Description of Feature 2</h5>
                    </div>
                    <div className="flex flex-col gap-6 py-8 w-full opacity-50 ">
                        <h2 className="text-h2 text-black-400">Feature 3</h2>
                        <h5 className="text-h5 text-black-400/50 w-full">Description of Feature 3</h5>
                    </div>
                </div>

                <img src=""className="flex w-full h-full bg-gray-400 rounded-4xl"/>
            </div>
        </section>

    );
}