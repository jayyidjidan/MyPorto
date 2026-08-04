import ReactIcon from '@iconify-react/logos/react';

export default function ProjectTech(){
    return(
        <section className="flex w-full overflow-hidden flex-col items-center justify-center gap-10 lg:gap-14 px-4 py-12 lg:py-12 lg:px-32">
                <h2 className="text-h2 text-black-400">Tech Used</h2>
            
            <div className="flex items-center justify-center gap-6 lg:gap-18">
                <div className="flex bg-black-400/50 rounded-full px-12 py-6 gap-6 items-center justify-center">
                    <h2 className="text-h4 text-white-2 whitespace-nowrap">React JS</h2>
                </div>

                <div className="flex flex-nowrap bg-black-400 rounded-full px-12 py-6 gap-6 items-center justify-center shadow-2xl">
                    <ReactIcon className="shrink-0  w-6 h-6 lg:h-11 lg:w-11" />
                    <h2 className="text-h4 lg:text-[40px] text-white-2 whitespace-nowrap">React JS</h2>
                </div>

                <div className="flex bg-black-400/50 rounded-full px-12 py-6 gap-6 items-center justify-center">
                    <h2 className="text-h4 text-white-2 whitespace-nowrap">React JS</h2>
                </div>
            </div>
        </section>
    );
}