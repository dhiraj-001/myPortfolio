import { useMemo, useRef, useState } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { projects } from "../constants";

// Derive unique domain filters from the data
const getFilters = (data) => ["All", ...Array.from(new Set(data.map((p) => p.domain)))];

const Projects = () => {
    const filters = getFilters(projects);
    const [activeFilter, setActiveFilter] = useState("All");
    const cardsRef = useRef(null);

    const topMarqueeItems = [
        "Web Development",
        "App Development",
        "AI / ML",
        "Real-World Projects",
        "Scalable Systems",
    ];

    const bottomMarqueeItems = [
        "Dhiraj Gogoi",
        "Projects",
        "Web Apps",
        "AI Systems",
        "Problem Solving",
    ];

    const headerText =
        "A collection of web, application, and AI/ML projects built to solve real-world problems.";

    const filteredProjects = useMemo(() => {
        if (activeFilter === "All") return projects;
        return projects.filter((p) => p.domain === activeFilter);
    }, [activeFilter]);

    useGSAP(() => {
        if (!cardsRef.current) return;
        const cards = Array.from(cardsRef.current.children);
        gsap.killTweensOf(cards);
        gsap.set(cards, { clearProps: "all" });
        gsap.from(cards, {
            y: 30,
            opacity: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all",
        });
    }, [activeFilter]);

    return (
        <section
            id="projects"
            className="min-h-screen rounded-b-[2.5rem] bg-white pb-12 text-black"
        >
            <AnimatedHeaderSection
                roles={["Web Development", "App Development", "AI / ML"]}
                title="Projects"
                text={headerText}
                textColor="text-black"
                withScrollTrigger={true}
            />

            <div className="mt-8 border-y border-black/10 bg-black py-3 sm:mt-12 md:mt-16">
                <Marquee
                    items={topMarqueeItems}
                    className="bg-transparent text-white"
                    iconClassName="text-white/20"
                />
            </div>

            <div className="px-4 py-14 sm:px-6 md:px-10 lg:px-12 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 max-w-3xl">
                        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
                            Selected Work
                        </h2>
                        <p className="mt-4 text-base leading-8 text-black/70 sm:text-lg">
                            Explore my projects across web development, app development, and
                            AI/ML systems.
                        </p>
                    </div>

                    {/* Filter buttons */}
                    <div className="mb-10 flex flex-wrap gap-3">
                        {filters.map((filter) => {
                            const isActive = activeFilter === filter;
                            return (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`rounded-full border px-5 py-2 text-sm transition-all duration-300 ${isActive
                                            ? "border-black bg-black text-white"
                                            : "border-black/10 bg-white text-black/70 hover:border-black/20 hover:text-black"
                                        }`}
                                >
                                    {filter}
                                </button>
                            );
                        })}
                    </div>

                    {/* Cards grid */}
                    <div
                        ref={cardsRef}
                        className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="group relative overflow-hidden rounded-[1.5rem] border border-black/10 bg-neutral-50 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-black/20"
                            >
                                {/* Glass sheen overlay */}
                                <div
                                    className="pointer-events-none absolute inset-0 z-10 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    style={{
                                        background:
                                            "radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.08) 0%, transparent 60%)",
                                    }}
                                />

                                {/* Dot-grid texture overlay */}
                                <div
                                    className="pointer-events-none absolute inset-0 z-10 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    style={{
                                        backgroundImage:
                                            "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)",
                                        backgroundSize: "20px 20px",
                                    }}
                                />

                                {/* Project image */}
                                {project.image && (
                                    <div className="relative h-52 w-full overflow-hidden rounded-t-[1.5rem] sm:h-56">
                                        <img
                                            src={project.image}
                                            alt={project.name}
                                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />

                                    </div>
                                )}

                                {/* Card body */}
                                <div className="relative z-10 p-6">
                                    {/* Fading project number — default dark, hover white */}
                                    <div
                                        className="pointer-events-none absolute right-6 top-1 select-none font-black leading-none"
                                        style={{
                                            fontSize: "clamp(4.5rem, 8vw, 7rem)",
                                            backgroundImage:
                                                "linear-gradient(to bottom, rgba(0,0,0,0.07) 0%, rgba(0,0,0,0) 75%)",
                                            WebkitBackgroundClip: "text",
                                            backgroundClip: "text",
                                            color: "transparent",
                                        }}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    {/* Hover-state number (white) */}
                                    <div
                                        className="pointer-events-none absolute right-6 top-1 select-none font-black leading-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        style={{
                                            fontSize: "clamp(4.5rem, 8vw, 7rem)",
                                            backgroundImage:
                                                "linear-gradient(to bottom, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 75%)",
                                            WebkitBackgroundClip: "text",
                                            backgroundClip: "text",
                                            color: "transparent",
                                        }}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    {/* Domain + links row */}
                                    <div className="flex items-start justify-between gap-4">
                                        <p className="text-sm uppercase tracking-[0.18em] text-black/40 transition-colors duration-300 group-hover:text-white/50">
                                            {project.domain}
                                        </p>

                                        {/* GitHub / Live icons */}
                                        <div className="flex items-center gap-3">
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-black/30 transition-colors duration-200 hover:text-black group-hover:text-white/40 group-hover:hover:text-white"
                                                    aria-label="GitHub"
                                                >
                                                    {/* GitHub icon */}
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="h-4 w-4"
                                                    >
                                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                                    </svg>
                                                </a>
                                            )}
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-black/30 transition-colors duration-200 hover:text-black group-hover:text-white/40 group-hover:hover:text-white"
                                                    aria-label="Live site"
                                                >
                                                    <span className="text-lg leading-none">↗</span>
                                                </a>
                                            )}
                                            {/* Fallback arrow if no links */}
                                            {!project.github && !project.live && (
                                                <span className="text-xl text-black/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/40">
                                                    ↗
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Project name */}
                                    <h3 className="mt-3 text-2xl font-medium tracking-tight transition-colors duration-300 group-hover:text-white">
                                        {project.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="mt-4 text-sm leading-7 text-black/60 transition-colors duration-300 group-hover:text-white/65 sm:text-base">
                                        {project.description}
                                    </p>

                                    {/* Framework pills */}
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {project.frameworks.map((fw) => (
                                            <span
                                                key={fw.id}
                                                className="rounded-full border border-black/10 px-3 py-1 text-xs tracking-wide text-black/55 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/65"
                                            >
                                                {fw.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

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

export default Projects;