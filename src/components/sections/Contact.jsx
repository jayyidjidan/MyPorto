import { useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "../common/Button";
import CustomSelect from "../common/Select";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    service: "",
    details: "",
  });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("success");
        setFormData({ fullname: "", email: "", service: "", details: "" });
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  };

  return (
    <section id="contact" className="flex min-h-screen w-full flex-col items-center justify-start gap-8 lg:gap-14 px-4 py-12 lg:py-30 lg:px-42">

        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-between w-full p-8 lg:p-12 rounded-4xl bg-black-400 gap-8 lg:gap-0">
            <h1 className="text-h1 text-gradient-white-1 text-center lg:text-left w-[250px] lg:w-[320px]">Message Me For More</h1>

            <div className="flex flex-col lg:flex-row items-center gap-6">
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

        <form onSubmit={handleSubmit} className="flex flex-col items-start w-full gap-8">

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-6 w-full">
            <div className="flex flex-col flex-1 items-start gap-8 w-full">
                <div className="flex flex-col items-start gap-2.5 w-full">
                    <label htmlFor="fullname" className="text-body text-black-400">Full Name<span className="text-red-500">*</span></label>
                    <input id="fullname" name="fullname" type="text" placeholder="Enter Your Name" value={formData.fullname} onChange={handleChange} required className="flex items-center w-full p-4 h-14 rounded-2xl bg-grey-100" />
                </div>

                <div className="flex flex-col items-start gap-2.5 w-full">
                    <label htmlFor="email" className="text-body text-black-400">Email Address<span className="text-red-500">*</span></label>
                    <input id="email" name="email" type="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} required className="flex items-center w-full p-4 h-14 rounded-2xl bg-grey-100" />
                </div>

                <div className="flex w-full flex-col items-start gap-2.5">
                    <label htmlFor="help" className="text-body text-black-400">
                        What I Can Help You With<span className="text-red-500">*</span>
                    </label>

                    <CustomSelect
                        placeholder="Select a service"
                        options={[
                        { value: "uiux", label: "UI/UX Design" },
                        { value: "frontend", label: "Frontend Development" },
                        { value: "fullstack", label: "Fullstack Development" },
                        { value: "website", label: "Website Development" },
                        { value: "mobile", label: "Mobile App Design" },
                        { value: "other", label: "Other" },
                        ]}
                        value={formData.service}
                        onChange={(val) => setFormData({ ...formData, service: val })}
                    />
                </div>
            </div>

            <div className="flex flex-1 flex-col items-start gap-2.5 self-stretch w-full">
                <label htmlFor="details" className="text-body text-black-400">Details<span className="text-red-500">*</span></label>
                <textarea id="details" name="details" placeholder="Enter Your Details" value={formData.details} onChange={handleChange} required className="w-full flex-1 resize-none p-4 rounded-2xl bg-grey-100" />
            </div>
        </div>

        <Button type="submit" variant="primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Message"}
        </Button>

        {status === "success" && <p className="text-body text-green-600">Message sent — thanks!</p>}
        {status === "error" && <p className="text-body text-red-500">Something went wrong. Please try again.</p>}
        </form>


    </section>
  );
}