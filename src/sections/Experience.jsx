import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { workExperiences } from "../constants/index.js";

const Experience = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (containerRef.current) {
      const rows = gsap.utils.toArray(".experience-row");
      
      rows.forEach((row, i) => {
        gsap.from(row, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            once: true,
          },
        });
      });
    }
  }, []);

  return (
    <section
      id="experience"
      className="relative z-10 rounded-b-[2.5rem] bg-white pb-16 text-black shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
    >
      <AnimatedHeaderSection
        roles={["Experience", "Career", "Journey"]}
        title="Work Experience"
        text="A look back at my professional journey and the roles that shaped my expertise."
        textColor="text-black"
        withScrollTrigger={true}
      />

      <div className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-8 md:px-12 lg:px-20 lg:pt-12">
        <div ref={containerRef} className="flex flex-col">
          {workExperiences.map((item, index) => (
            <div
              key={index}
              className="experience-row flex flex-col gap-4 border-t border-black/10 py-8 md:flex-row md:gap-12 lg:py-10"
            >
              {/* Left Side: Sticky Company & Duration */}
              <div className="md:w-[35%] lg:w-[30%] shrink-0">
                <div className="md:sticky md:top-24">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/5 text-[9px] font-bold text-black/40">
                      0{index + 1}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                      {item.duration}
                    </span>
                  </div>
                  <h3 className="text-3xl font-semibold tracking-tighter text-black lg:text-4xl">
                    {item.pos}
                  </h3>
                </div>
              </div>

              {/* Right Side: Role & Details */}
              <div className="flex flex-col justify-start md:w-[65%] lg:w-[70%] md:pt-2">
                <h4 className="mb-4 text-xl font-medium tracking-tight text-black/80 lg:text-2xl">
                  {item.name}
                </h4>
                
                {/* Description */}
                <div className="prose prose-lg max-w-none text-black/60">
                  <p className="whitespace-pre-line text-sm leading-relaxed lg:text-base lg:leading-[1.7]">
                    {item.title}
                  </p>
                </div>

                {/* Tags / Frameworks placeholder if they ever add it to workExperiences */}
                {item.frameworks && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.frameworks.map((fw, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-black/60 transition-colors hover:border-black/30 hover:bg-black/5 hover:text-black"
                      >
                        {fw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
