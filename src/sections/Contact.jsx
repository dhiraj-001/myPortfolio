import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Contact = () => {
  const containerRef = useRef(null);
  
  const text = `Have a question, idea, or opportunity? I'm always open to connecting and working on meaningful projects.`;
  const items = [
    "Say Hello",
    "Start A Project",
    "Open For Work",
    "Let's Chat",
    "Get In Touch",
  ];

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
          {/* Grid Layout for Medium+ Screens */}
          <div className="grid grid-cols-1 gap-14 border-t border-white/15 pt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 lg:pt-16">
            
            {/* Email Block */}
            <div className="contact-block flex flex-col gap-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2rem] text-white/40">
                E-mail
              </h2>
              <a 
                href="mailto:gogoidhiraj207@gmail.com"
                className="group relative inline-block w-fit text-xl font-light tracking-wide text-white transition-colors hover:text-white/80 sm:text-2xl lg:text-3xl"
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
                className="group relative inline-block w-fit text-xl font-light tracking-wide text-white transition-colors hover:text-white/80 sm:text-2xl lg:text-3xl"
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
        </div>
      </div>

      <div className="mt-auto">
        {/* Footer Marquee */}
        <div className="border-t border-white/10 py-4">
          <Marquee items={items} className="bg-transparent text-white" />
        </div>

        {/* Sub-Footer: Copyright & Source Code Link */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 px-6 py-6 sm:flex-row md:px-10 lg:px-12">
          <p className="text-[10px] font-medium uppercase tracking-[0.2rem] text-white/30">
            &copy; {new Date().getFullYear()} Dhiraj Gogoi.
          </p>
          
          <a
            href="https://github.com/dhiraj-001/YOUR_REPO_NAME" // Make sure to replace YOUR_REPO_NAME with the actual repo name
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2rem] text-white/30 transition-colors hover:text-white"
          >
            <Icon icon="mdi:github" className="text-sm" />
            <span>View Source Code</span>
            <Icon 
              icon="lucide:arrow-up-right" 
              className="text-sm transition-transform group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" 
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;