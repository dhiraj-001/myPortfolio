import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);

  const topMarqueeItems = [
    "Machine Learning",
    "Full Stack Web",
    "Data Pipelines",
    "API Architecture",
    "Scalable Systems",
  ];

  const bottomMarqueeItems = [
    "Dhiraj Gogoi",
    "Software Developer",
    "ML Enthusiast",
    "Problem Solver",
    "Backend Systems",
  ];

  const headerText =
    "Machine Learning, Data Science, and full-stack development focused on real-world applications.";

  const techStack = [
    "Python & C++",
    "React & React Native",
    "Node.js & Express",
    "Data Engineering",
    "Machine Learning",
    "NLP & Deep Learning"
  ];

  useGSAP(() => {
    // Image reveal animation
    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      scale: 1.1,
    });

    gsap.to(imgRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      scale: 1,
      duration: 1.4,
      ease: "power4.out",
      scrollTrigger: {
        trigger: imgWrapRef.current,
        start: "top 85%",
        once: true,
      },
    });

    // Staggered text content reveal
    gsap.from(".reveal-item", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen rounded-b-[2.5rem] bg-white pb-12 text-black"
    >
      <AnimatedHeaderSection
        roles={["Software Developer", "Data Science Aspirant", "ML Enthusiast"]}
        title="About me"
        text={headerText}
        textColor="text-black"
        withScrollTrigger={true}
      />

      {/* Solid Black Banner Marquee */}
      <div className="mt-8 bg-black py-4 sm:mt-12 md:mt-16">
        <Marquee
          items={topMarqueeItems}
          className="bg-transparent text-white"
          iconClassName="text-white/20"
        />
      </div>

      <div className="px-4 py-16 sm:px-6 md:px-10 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          
          {/* Left: Framed Image */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:pl-4">
            {/* Decorative back-plate for depth with a permanent soft "glow" shadow */}
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-[#F7F7F7] shadow-[0_0_40px_rgba(0,0,0,0.06)] sm:-inset-6" />
            <div
              ref={imgWrapRef}
              className="relative overflow-hidden rounded-[2rem] bg-black/5"
            >
              <img
                ref={imgRef}
                src="images/image.jpg"
                alt="Dhiraj Gogoi"
                // Removed the grayscale hover dependencies, kept a subtle scale on hover
                className="h-[420px] w-full object-cover object-center transition-transform duration-700 hover:scale-105 sm:h-[500px] lg:h-[600px]"
              />
            </div>
          </div>

          {/* Right: Typography & Content */}
          <div ref={contentRef} className="flex max-w-2xl flex-col gap-8">
            
            <h2 className="reveal-item text-4xl font-light tracking-tighter text-black sm:text-5xl md:text-6xl">
              Hi, I’m Dhiraj.
            </h2>

            <div className="flex flex-col gap-6 text-base font-light leading-relaxed tracking-wide text-black/60 sm:text-lg">
              <p className="reveal-item">
                I am a Computer Science undergraduate working at the intersection of{" "}
                <strong className="font-medium text-black">Machine Learning</strong> and{" "}
                <strong className="font-medium text-black">Software Engineering</strong>. 
                My focus is on transforming theoretical models into robust, real-world systems.
              </p>

              <p className="reveal-item">
                I specialize in building intelligent applications—from engineering anomaly detection 
                and fraud classification models using Isolation Forest, TF-IDF, and XGBoost, 
                to deploying them inside scalable, full-stack environments.
              </p>

              <p className="reveal-item">
                Alongside data science, I have deep hands-on experience with the MERN stack. 
                I design RESTful APIs, manage databases, and configure production servers, ensuring 
                that the intelligence of a model is matched by the reliability of its backend.
              </p>
            </div>

            {/* Technical Arsenal (Replaces traditional bullet list) */}
            <div className="reveal-item mt-4 pt-6 border-t border-black/10">
              <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2rem] text-black/40">
                Technical Arsenal
              </h3>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-black/10 bg-black/[0.02] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1rem] text-black/70 transition-colors hover:border-black/30 hover:bg-black/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Subtle Marquee */}
      <div className="mx-auto mt-4 max-w-[1600px] border-t border-black/10 pt-3">
        <Marquee
          items={bottomMarqueeItems}
          reverse={true}
          className="bg-transparent text-black"
          iconClassName="text-black/20"
          icon="material-symbols-light:square"
        />
      </div>
    </section>
  );
};

export default About;