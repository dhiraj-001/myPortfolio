import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react/dist/iconify.js";

const Skills = () => {
  const text = `Bridging the gap between robust full stack architecture and intelligent data science solutions with a production-first mindset.`;

  const skillsIntroduction = `Currently a Computer Science undergraduate at Assam University, I specialize in the MERN stack while actively building ML systems using NLP and anomaly detection. My toolkit ranges from JavaScript frameworks to Python-based data processing and Linux server deployment.`;

  const skillCategories = [
    {
      title: "Core Languages",
      icon: "lucide:code-2",
      skills: ["JavaScript", "Python","C", "C++",  "SQL", "Bash"],
      description: "Strong foundation in programming, problem solving, and system-level thinking.",
    },
    {
      title: "Data Science & ML",
      icon: "lucide:brain-circuit",
      skills: ["Python", "NumPy", "Pandas", "Scikit-learn", "XGBoost", "Matplotlib", "Seaborn"],
      description: "Building predictive models, fraud detection systems, and anomaly detection pipelines.",
    },
    {
      title: "Web & App Dev",
      icon: "lucide:layers-3",
      skills: ["React", "React Native", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL"],
      description: "Developing scalable production-level web applications and cross-platform mobile apps.",
    },
    {
      title: "DevOps & Tools",
      icon: "lucide:server",
      skills: ["Linux", "Nginx", "PM2", "VPS", "Git/GitHub", "Postman"],
      description: "Managing server environments, production debugging, and deployment workflows.",
    },
  ];

  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        scale: 0.985,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 85%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".skill-card-item",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen rounded-b-4xl bg-black"
    >
      <AnimatedHeaderSection
        subTitle={"Software Developer | Data Science Aspirant | ML Enthusiast"}
        title={"Technical Stack"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      <div className="px-4 pb-20 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* <div className="mb-16 max-w-4xl text-white/70">
            <div className="text-base font-light leading-relaxed tracking-wide sm:text-lg md:text-xl">
              <AnimatedTextLines text={skillsIntroduction} className="w-full" />
            </div>
          </div> */}

          <div
            ref={contentRef}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {skillCategories.map((category, index) => (
              <div
  key={category.title}
  className="skill-card-item relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.05]"
>
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white/80">
                      <Icon icon={category.icon} className="text-2xl" />
                    </div>
                    <span className="pointer-events-none absolute top-2 right-4 select-none text-[96px] font-bold leading-none tracking-[-4px] text-white/[0.04]">
    0{index + 1}
  </span>
                  </div>

                  <h3 className="mb-3 text-lg font-medium tracking-tight text-white">
                    {category.title}
                  </h3>

                  <p className="mb-6 text-sm leading-relaxed text-white/50">
                    {category.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;