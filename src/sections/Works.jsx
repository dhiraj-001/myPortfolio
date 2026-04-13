import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const sectionRef = useRef(null);
  const overlayRefs = useRef([]);
  const imageRefs = useRef([]);

  const text = `Projects across machine learning, backend systems, and full stack development, built to solve practical real-world problems.`;

const groupedProjects = useMemo(() => {
    return projects.reduce((acc, project) => {
      if (!acc[project.domain]) acc[project.domain] = [];
      
      // Only push the project if the domain array has fewer than 2 items
      if (acc[project.domain].length < 2) {
        acc[project.domain].push(project);
      }
      
      return acc;
    }, {});
  }, []); // Note: No need to pass 'projects' into dependency array if it's imported as a constant

  const flatProjects = useMemo(() => {
    return Object.values(groupedProjects).flat();
  }, [groupedProjects]);

  
  useGSAP(
    () => {
      gsap.from(".domain-header", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      document.querySelectorAll(".project-row").forEach((row, i) => {
        gsap.from(row, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.04,
          ease: "power4.out",
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            once: true,
          },
        });
      });

      document.querySelectorAll(".domain-line").forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [flatProjects] }
  );

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    const overlay = overlayRefs.current[index];
    const img = imageRefs.current[index];
    if (overlay) {
      gsap.to(overlay, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.55,
        ease: "power4.out",
      });
    }
    if (img) {
      gsap.to(img, { scale: 1.03, duration: 0.6, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    const overlay = overlayRefs.current[index];
    const img = imageRefs.current[index];
    if (overlay) {
      gsap.to(overlay, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 0.45,
        ease: "power4.in",
      });
    }
    if (img) {
      gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
    }
  };

  const handleMouseMove = (e, index) => {
    if (window.innerWidth < 768) return;
    const img = imageRefs.current[index];
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -4;
    gsap.to(img, {
      rotateY: x,
      rotateX: y,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleMouseLeaveImg = (index) => {
    const img = imageRefs.current[index];
    if (!img) return;
    gsap.to(img, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  let globalIndex = 0;

  return (
    <section
      id="works"
      ref={sectionRef}
      className="flex min-h-screen flex-col bg-[#F9F9F9]"
    >
      <AnimatedHeaderSection
        roles={["ML Systems", "Scalable Web", "API Design"]}
        title={"My Works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      <div className="px-4 pb-32 sm:px-8 md:px-12">
        <div className="mx-auto max-w-7xl">
          {Object.entries(groupedProjects).map(([domain, domainProjects]) => (
            <div key={domain} className="domain-header mt-28 first:mt-10">
              <div className="mb-14 flex items-end justify-between pb-5">
                <h2 className="text-4xl font-bold uppercase tracking-tighter text-black md:text-6xl">
                  {domain}
                </h2>
                <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.25rem] text-black/25">
                  {domainProjects.length} Projects
                </span>
              </div>
              <div className="domain-line mb-0 h-px w-full origin-left bg-black/10" />

              <div className="flex flex-col">
                {domainProjects.map((project) => {
                  const currentIndex = globalIndex++;
                  const num =
                    currentIndex + 1 < 10
                      ? `0${currentIndex + 1}`
                      : `${currentIndex + 1}`;

                  return (
                    <div
                      key={project.id}
                      className="project-row group relative cursor-pointer border-b border-black/10 py-10 last:border-none"
                      onMouseEnter={() => handleMouseEnter(currentIndex)}
                      onMouseLeave={() => {
                        handleMouseLeave(currentIndex);
                        handleMouseLeaveImg(currentIndex);
                      }}
                    >
                      <div
                        ref={(el) => (overlayRefs.current[currentIndex] = el)}
                        className="pointer-events-none absolute inset-0 -z-10 bg-black"
                        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
                      />

                      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.6fr_1fr] md:items-center md:px-6">
                        <div className="flex flex-col gap-5">
                          <div className="flex items-start gap-6">
                            <span className="mt-1 min-w-[28px] text-[20px] font-bold tabular-nums text-black/20 transition-colors duration-500 md:group-hover:text-white/20">
                              {num}
                            </span>

                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4">
                                <h3 className="text-3xl font-medium tracking-tight text-black transition-colors duration-500 md:group-hover:text-white md:text-4xl">
                                  {project.name}
                                </h3>
                                <Icon
                                  icon="lucide:arrow-up-right"
                                  className="mt-1 size-6 shrink-0 -translate-x-1 translate-y-1 text-white opacity-0 transition-all duration-500 md:group-hover:translate-x-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                                />
                              </div>

                              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-black/50 transition-colors duration-500 md:group-hover:text-white/55">
                                {project.description}
                              </p>
                            </div>
                          </div>

                          <div className="ml-[52px] flex flex-wrap gap-2">
                            {project.frameworks.map((fw) => (
                              <span
                                key={fw.id}
                                className="rounded-full border border-black/[0.06] bg-black/[0.04] px-3 py-[5px] text-[10px] font-semibold uppercase tracking-widest text-black/50 transition-all duration-500 md:group-hover:border-white/10 md:group-hover:bg-white/[0.06] md:group-hover:text-white/65"
                              >
                                {fw.name}
                              </span>
                            ))}
                          </div>

                          {/* Upgraded Buttons Section */}
                          <div className="ml-[52px] mt-2 flex items-center gap-4">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black/70 transition-all duration-300 hover:border-black hover:bg-black hover:text-white md:group-hover:border-white/20 md:group-hover:text-white/70 md:group-hover:hover:border-white md:group-hover:hover:bg-white md:group-hover:hover:text-black"
                              >
                                <Icon 
                                  icon="mdi:github" 
                                  className="text-sm transition-transform duration-300 group-hover/btn:-rotate-12 group-hover/btn:scale-110" 
                                />
                                <span>Source</span>
                              </a>
                            )}
                            {project.live && (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black/70 transition-all duration-300 hover:border-black hover:bg-black hover:text-white md:group-hover:border-white/20 md:group-hover:text-white/70 md:group-hover:hover:border-white md:group-hover:hover:bg-white md:group-hover:hover:text-black"
                              >
                                <span>Live</span>
                                <Icon 
                                  icon="lucide:arrow-up-right" 
                                  className="text-sm transition-transform duration-300 group-hover/btn:-translate-y-[2px] group-hover/btn:translate-x-[2px]" 
                                />
                              </a>
                            )}
                          </div>
                        </div>

                        <div
                          ref={(el) => (imageRefs.current[currentIndex] = el)}
                          className="relative aspect-video overflow-hidden rounded-2xl bg-black/[0.04]"
                          style={{ transformStyle: "preserve-3d" }}
                          onMouseMove={(e) => handleMouseMove(e, currentIndex)}
                        >
                          <img
                            src={project.bgImage}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 h-full w-full object-cover opacity-15 grayscale transition-all duration-700 md:group-hover:opacity-35 md:group-hover:grayscale-0"
                          />
                          <img
                            src={project.image}
                            alt={project.name}
                            className="absolute inset-0 h-full w-full scale-[0.88] object-contain transition-transform duration-700 ease-out md:group-hover:scale-[0.96]"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 transition-all duration-500 md:group-hover:ring-white/10" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Separate Projects Page Link */}
        <div className="mt-24 flex justify-center">
          <Link 
            to="/projects" 
            className="group flex items-center gap-3 rounded-full border border-black/20 px-8 py-4 text-xs font-bold uppercase tracking-widest text-black transition-all duration-500 hover:border-black hover:bg-black hover:text-white md:text-sm"
          >
            View All Projects
            <Icon icon="lucide:arrow-right" className="text-lg transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Works;