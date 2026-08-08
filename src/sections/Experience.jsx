import { useRef, useState, useEffect } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workExperiences as staticExperiences } from "../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef(null);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchExperiences = async () => {
      const startTime = Date.now();
      try {
        const response = await fetch(`${API_BASE_URL}/experiences`);
        let data = [];
        if (response.ok) {
          data = await response.json();
        }

        // Guarantee a minimum display of 800ms to allow skeletons to animate cleanly
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, 800 - elapsed);
        await new Promise((resolve) => setTimeout(resolve, delay));

        if (data && data.length > 0) {
          setExperiences(data);
        } else {
          setExperiences(staticExperiences);
        }
      } catch (err) {
        console.error("Failed to fetch experiences from backend:", err);
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, 800 - elapsed);
        await new Promise((resolve) => setTimeout(resolve, delay));
        setExperiences(staticExperiences);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  useGSAP(() => {
    if (loading || experiences.length === 0) return;
    if (containerRef.current) {
      const rows = gsap.utils.toArray(".experience-row");
      
      rows.forEach((row, i) => {
        gsap.fromTo(row,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // Recalculate ScrollTrigger positions after layout has finished settling
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      return () => clearTimeout(refreshTimeout);
    }
  }, [experiences, loading]);

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
        {loading ? (
          /* Experience Loading Skeletons */
          <div className="flex flex-col gap-8 w-full">
            {[1, 2].map((n) => (
              <div key={n} className="flex flex-col gap-6 border-t border-black/10 py-8 md:flex-row md:gap-12 lg:py-10 animate-pulse">
                <div className="md:w-[35%] lg:w-[30%] shrink-0 flex flex-col gap-3">
                  <div className="h-4 w-24 bg-black/10 rounded" />
                  <div className="h-8 w-3/4 bg-black/10 rounded mt-1" />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="h-6 w-1/3 bg-black/10 rounded" />
                  <div className="h-16 w-full bg-black/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div ref={containerRef} className="flex flex-col">
            {experiences.map((item, index) => (
              <div
                key={item._id || index}
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

                  {/* Tags / Frameworks placeholder */}
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
        )}
      </div>
    </section>
  );
};

export default Experience;
