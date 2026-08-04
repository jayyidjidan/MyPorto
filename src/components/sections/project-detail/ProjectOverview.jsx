import Chip from "../../common/Chip";

export default function ProjectOverview(){
    return(
        <section className="flex flex-col lg:flex-row w-full items-start gap-12 lg:gap-14 px-4 py-12 lg:py-12 lg:px-32">
            <div className="flex flex-col gap-6 items-start w-full">
                <h3 className="text-h2 text-black-400">Overview</h3>
                <h5 className="text-h5 text-black-400/50 w-full lg:w-[536px]">
                    this is your project overview you can explain anything in here but not to long this is your project overview you can explain anything in here but not to long
                </h5>
            </div>

            <div className="flex flex-col gap-6 justify-center items-start w-full h-full">

                {/* project time */}
                <div className="flex flex-col gap-6 items-start">
                    <h5 className="text-h5 text-black-400/50">Time</h5>
                    <h3 className="text-h3 text-black-400">1 Month</h3>
                </div>

                {/* project categories */}
                <div className="flex flex-col gap-6 items-start">
                    <h5 className="text-h5 text-black-400/50">Categories</h5>
                    {/* chip wrapper */}
                    <div className="flex gap-4">
                         <Chip variant="medium">UI UX</Chip>
                         <Chip variant="medium">Shopping App</Chip>
                    </div>
                </div>

            </div>
        </section>
    );
}