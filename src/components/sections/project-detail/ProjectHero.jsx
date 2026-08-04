import Button from "../../common/Button";

export default function ProjectHero(){
    return (
        <section className="flex flex-col min-h-screen w-full justify-between lg:justify-start gap-6 lg:gap-14 px-4 py-12 lg:py-12 lg:px-32">
            
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-0 justify-between w-full">
                <div className="flex flex-col gap-2 items-start">
                    <h1 className="text-h1 text-black-400">Project Title</h1>
                    <h4 className="text-h5 text-black-400/50">this text is only for project description</h4>
                </div>
                
                <div className="flex gap-2">
                    <Button variant="secondary">See Source</Button>
                    <Button variant="primary">See Preview</Button>
                </div>
            </div>

            <div className="bg-gray-400 w-full h-[600px] rounded-4xl"></div>
        
        </section>
    );
}