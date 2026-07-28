import Chip from "../common/Chip";

export default function Skill() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-start gap-18 px-4 py-12 lg:py-30 lg:px-12">
        <div className="w-full flex flex-col justify-center items-start gap-6 ">
            <div className="flex flex-col justify-center items-start gap-1">
                <p className="text-body text-black-400/50">Skill</p>
                <h1 className=" w-[300px] lg:w-[424px] text-h1 text-gradient-black-1 text-left">See My Newest Project Case</h1>
            </div>
        </div>

        <div className="flex flex-col items-start self-stretch">
            <div className="flex flex-col justify-between items-end  gap-6 self-stretch py-12 border-b-1 border-[#c9c9c9] lg:flex-row lg:items-center lg:gap-0">
                <div className="flex items-start gap-4 w-full">
                    <h4 className="text-h4">1</h4>
                    <h1 className="text-h1">Fullstack Dev</h1>
                </div>
                <div className="flex flex-col items-end gap-2 lg:flex-row lg:items-start">
                    <Chip variant="medium">Frontend</Chip>
                    <Chip variant="medium">Backend</Chip>
                    <Chip variant="medium">Database</Chip>
                </div>
            </div>

            <div className="flex flex-col justify-between items-end gap-6 self-stretch py-12 border-b-1 border-[#c9c9c9] lg:flex-row lg:items-center lg:gap-0">
                <div className="flex items-start gap-4 w-full">
                    <h4 className="text-h4">2</h4>
                    <h1 className="text-h1">AI Development</h1>
                </div>
                <div className="flex flex-col items-end gap-2 lg:flex-row lg:items-start">
                    <Chip variant="medium">Chatbot</Chip>
                    <Chip variant="medium">Automation</Chip>
                    <Chip variant="medium">Generative_AI</Chip>
                </div>
            </div>
            

            <div className="flex flex-col justify-between items-end gap-6 self-stretch py-12 lg:flex-row lg:items-center lg:gap-0">
                <div className="flex items-start gap-4 w-full">
                    <h4 className="text-h4">3</h4>
                    <h1 className="text-h1">UI/UX Designer</h1>
                </div>
                <div className="flex flex-col items-end gap-2 lg:flex-row lg:items-start">
                    <Chip variant="medium">UX_Research</Chip>
                    <Chip variant="medium">UI_Design</Chip>
                    <Chip variant="medium">Prototyping</Chip>
                </div>
            </div>
        </div>
    </section>
  );
}