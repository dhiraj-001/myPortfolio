import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { socials } from "../constants";
import gsap from "gsap";
import { useRef, useState } from "react";
import Footer from "../components/Footer";

const Contact = () => {
  const containerRef = useRef(null);
  
  const text = `Have a question, idea, or opportunity? I'm always open to connecting and working on meaningful projects.`;

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: "Thank you! Your message has been sent successfully." });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", message: data.message || "Failed to send message. Please try again." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Could not connect to the server. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  useGSAP(() => {
    gsap.from(".contact-block", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
    });
  }, []);

  return (
    <section
      id="contact"
      className="flex min-h-screen flex-col justify-between bg-black"
    >
      <div className="flex-1">
        <AnimatedHeaderSection
          roles={["Let's Connect", "Open for work", "Say Hello"]} 
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        
        <div 
          ref={containerRef}
          className="mx-auto mt-12 max-w-[1400px] px-6 pb-20 sm:mt-20 md:px-10 lg:px-12"
        >
          {/* Responsive Layout Grid */}
          <div className="grid grid-cols-1 gap-14 border-t border-white/15 pt-12 lg:grid-cols-5 lg:gap-16 lg:pt-16">
            
            {/* Info Column (Left) */}
            <div className="flex flex-col gap-10 lg:col-span-2">
              {/* Email Block */}
              <div className="contact-block flex flex-col gap-4">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2rem] text-white/40">
                  E-mail
                </h2>
                <a 
                  href="mailto:gogoidhiraj207@gmail.com"
                  className="group relative inline-block w-fit text-xl font-light tracking-wide text-white transition-colors hover:text-white/80 sm:text-2xl"
                >
                  gogoidhiraj207@gmail.com
                  <span className="absolute -bottom-2 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>

              {/* Phone Block */}
              <div className="contact-block flex flex-col gap-4">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2rem] text-white/40">
                  Phone
                </h2>
                <a 
                  href="tel:+916001428898"
                  className="group relative inline-block w-fit text-xl font-light tracking-wide text-white transition-colors hover:text-white/80 sm:text-2xl"
                >
                  +91 6001428898
                  <span className="absolute -bottom-2 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>

              {/* Socials Block */}
              <div className="contact-block flex flex-col gap-4">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2rem] text-white/40">
                  Social Media
                </h2>
                <div className="flex flex-wrap gap-3 pt-1">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/20 bg-white/[0.02] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.15rem] text-white/80 transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:text-white"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Column (Right) */}
            <div className="contact-block lg:col-span-3">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm sm:p-10">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-light text-white sm:text-2xl">Send a Message</h3>
                  <p className="text-xs text-white/50">Fill out the form below and I will get back to you as soon as possible.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.1rem] text-white/40">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all focus:border-white/30 focus:bg-white/[0.05] focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.1rem] text-white/40">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all focus:border-white/30 focus:bg-white/[0.05] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-[0.1rem] text-white/40">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Collaboration, job inquiry, etc."
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all focus:border-white/30 focus:bg-white/[0.05] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.1rem] text-white/40">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all focus:border-white/30 focus:bg-white/[0.05] focus:outline-none"
                  ></textarea>
                </div>

                {status.message && (
                  <div className={`rounded-lg px-4 py-3 text-xs font-medium ${
                    status.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white text-[11px] font-bold uppercase tracking-[0.15rem] text-black transition-all duration-300 hover:bg-black hover:text-white hover:border-white/40 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer/>
      </div>
    </section>
  );
};

export default Contact;