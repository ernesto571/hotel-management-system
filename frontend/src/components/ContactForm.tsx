import emailjs from "emailjs-com";
import { useState } from "react";

function ContactForm(){

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const messageContent = `
        Name: ${formData.name}
        Email: ${formData.email}

        💬 Message:
        ${formData.message}
        `;

        // console.log("Sending contact form:", {
        // name: formData.name,
        // email: formData.email,
        // message: formData.message,
        // formatted: messageContent,
        // });

        emailjs
            .send(
                SERVICE_ID, // 🔹 your EmailJS service ID
                TEMPLATE_ID, // 🔹 your EmailJS template ID
                {
                name: formData.name,
                email: formData.email,
                message: messageContent,
                },
                PUBLIC_KEY // 🔹 your EmailJS public key
            )
            .then(
                (response) => {
                console.log("SUCCESS!", response.status, response.text);
                // toast.success(" Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
                setIsSubmitting(false);
                },
                (error) => {
                console.log("FAILED...", error);
                // toast.error(` Failed to send: ${error.text || "Please try again."}`);
                setIsSubmitting(false);
                }
            );
        };
    return (
        <section>
             <div className="bg-[#f2fcf4] p-5 md:p-10 rounded-lg shadow-sm font-[50] text-[#121212]">
            <h3 className="text-[1.7rem] md:text-[2.2rem] font-serif tracking-wide font-extralight ">
              Send Us A Message
            </h3>
            <p className="pt-3 md:py-2 text-sm text-gray-700">Have a question or ready to book? Send us a message and we'll respond promptly.</p>

            <form className="space-y-6 mt-7 "  onSubmit={handleSubmit}>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-10 font-serif">
                    <div>
                        <label
                        htmlFor="name"
                        className="block  font-medium mb-2   "
                        >
                        Your Name
                        </label>
                        <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-9 py-4 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#76be81] font-sans"
                        placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label
                        htmlFor="email"
                        className="block  font-medium mb-2 ">
                            Your Email
                        </label>
                        <input type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-9 py-4 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#76be81] font-sans font-extralight"
                        placeholder="Your Email"
                        />
                    </div>
                </section>
              

              <div >
                <label
                  htmlFor="message"
                  className="block font-medium my-3 font-serif"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-9 py-4 h-[150px] rounded-md bg-white  focus:outline-none focus:ring-2 focus:ring-[#76be81] "
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#76be81] hover:bg-black active:scale-95 text-white font-semibold py-4 px-3 md:px-6 rounded-md ease-in-out transition-all duration-300 w-full md:w-[50%] lg:w-[30%] flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>
    )
}
export default ContactForm