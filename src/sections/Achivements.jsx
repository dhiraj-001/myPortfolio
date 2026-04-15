import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react/dist/iconify.js";

const achievements = [
  {
    title: "1st Place – CP War (Yantraksh 2026)",
    description:
      "Secured first place in a competitive programming contest by solving complex algorithmic problems under time constraints, demonstrating strong problem-solving and coding skills.",
  },
  {
    title: "Amazon ML Challenge Participant",
    description:
      "Developed a LightGBM regression model for large-scale data, achieving an SMPE score of 48.6 through feature engineering and model tuning.",
  },
];

const Achievements = () => {
  const listRef = useRef(null);

  const topMarqueeItems = [
    "Achievements",
    "Machine Learning",
    "Full Stack Development",
    "Data Science",
    "Real-World Projects",
  ];

  useGSAP(() => {
    if (listRef.current) {
      gsap.from(Array.from(listRef.current.children), {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }
  }, []);

  return (
    <section
      id="achievements"
      className="min-h-screen rounded-b-[2.5rem] bg-white pb-12 text-black"
    >
      <AnimatedHeaderSection
        roles={["Achievements", "Milestones", "Highlights"]}
        title="Achievements"
        text="A few milestones and highlights from my journey in machine learning, data science, and full-stack development."
        textColor="text-black"
        withScrollTrigger={true}
      />

      {/* <div className="mt-8 border-y border-black/10 bg-black py-3 sm:mt-12 md:mt-16">
        <Marquee
          items={topMarqueeItems}
          className="bg-transparent text-white"
          iconClassName="text-white/20"
        />
      </div> */}

      <div className="w-full pt-14 lg:pt-20">
        <div ref={listRef} className="flex flex-col border-t border-black/10">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden border-b border-black/10"
            >
              {/* --- THE CUSTOM HOVER BACKGROUND --- */}
              {/* This scales up from the bottom edge using a premium easing curve */}
              <div className="absolute inset-0 z-0 origin-bottom scale-y-0 bg-black transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-y-100">
                {/* Subtle dot-grid texture inside the black fill */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                  }}
                />
              </div>

              {/* All content must be wrapped in relative z-10 to sit above the animated background */}
              <div className="relative z-10">
                {/* Visible Row */}
                <div className="flex w-full cursor-pointer items-center justify-between px-4 py-8 sm:px-8 md:px-16 lg:px-24">
                  <div className="flex items-center gap-6 md:gap-12 lg:gap-20">
                    <span className="text-sm font-bold tracking-[0.2em] text-black/30 transition-colors duration-500 group-hover:text-white/40 md:text-base">
                      0{index + 1}
                    </span>
                    <h3 className="text-2xl font-medium tracking-tight text-black transition-colors duration-500 group-hover:text-white md:text-4xl lg:text-5xl">
                      {item.title}
                    </h3>
                  </div>

                  <Icon
                    icon="lucide:plus"
                    className="text-3xl text-black/30 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:rotate-[135deg] group-hover:text-white"
                  />
                </div>

                {/* Expandable Description Area */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="pl-4 pr-4 pb-10 sm:pl-8 sm:pr-8 md:pl-[120px] md:pr-16 lg:pl-[160px] lg:pr-24">
                      <p className="max-w-4xl text-base leading-relaxed text-white/70 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100 sm:text-lg md:text-xl">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;