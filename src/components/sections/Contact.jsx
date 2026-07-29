import Button from "../common/Button";

export default function Gallery() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-start gap-8 lg:gap-14 px-4 py-12 lg:py-30 lg:px-42">

        <div className="flex items-end justify-between w-full p-12 rounded-4xl bg-black-400">
            <h1 className="text-h1 text-gradient-white-1 text-left w-[320px]">Message Me For More</h1>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center p-3 bg-white-1 rounded-full"><img className="w-6 h-6" src="/assets/Call.png" alt="" /></div>
                    <h5 className="text-h5 text-white">+62 857 2573 6546</h5>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center p-3 bg-white-1 rounded-full"><img className="w-6 h-6" src="/assets/Email.png" alt="" /></div>
                    <h5 className="text-h5 text-white-1">jayyidjidan14@gmail.com</h5>
                </div>
            </div>
        </div>

        <form action="" className="flex flex-col items-start w-full gap-8">

        <div className="flex items-start gap-6 w-full">
            <div className="flex flex-col flex-1 items-start gap-8">
            <div className="flex flex-col items-start gap-2.5 w-full">
                <label htmlFor="fullname" className="text-body text-black-400">Full Name<span className="text-red-500">*</span></label>
                <input id="fullname" type="text" placeholder="Enter Your Name" className="flex items-center w-full p-4 h-14 rounded-2xl bg-grey-100" />
            </div>

            <div className="flex flex-col items-start gap-2.5 w-full">
                <label htmlFor="email" className="text-body text-black-400">Email Address<span className="text-red-500">*</span></label>
                <input id="email" type="email" placeholder="Enter Your Email" className="flex items-center w-full p-4 h-14 rounded-2xl bg-grey-100" />
            </div>

            <div className="flex flex-col items-start gap-2.5 w-full">
                <label htmlFor="help" className="text-body text-black-400">What I Can Help You With<span className="text-red-500">*</span></label>
                <input id="help" type="text" placeholder="Select..." className="flex items-center w-full p-4 h-14 rounded-2xl bg-grey-100" />
            </div>
            </div>

            <div className="flex flex-1 flex-col items-start gap-2.5 self-stretch">
            <label htmlFor="details" className="text-body text-black-400">Details<span className="text-red-500">*</span></label>
            <textarea id="details" placeholder="Enter Your Details" className="w-full flex-1 resize-none p-4 rounded-2xl bg-grey-100" />
            </div>
        </div>

        <Button variant="primary">Send Message</Button>
        </form>


    </section>
  );
}