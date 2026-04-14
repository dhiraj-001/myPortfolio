import { useMemo, useRef, useState } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { projects } from "../constants";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Footer from "../components/Footer";

// Derive unique domain filters from the data
const getFilters = (data) => ["All", ...Array.from(new Set(data.map((p) => p.domain)))];

const Projects = () => {
    const filters = getFilters(projects);
    const [activeFilter, setActiveFilter] = useState("All");
    const sectionRef = useRef(null);
    const cardsRef = useRef(null);
    const location = useLocation();
    const backTo = location.state?.from || "/";

    const roles = ["Web Development", "App Development", "AI / ML"];

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

    const filteredProjects = useMemo(() => {
        if (activeFilter === "All") return projects;
        return projects.filter((p) => p.domain === activeFilter);
    }, [activeFilter]);

    // 1. Initial Page Load Animation for the Header
    useGSAP(() => {
        gsap.from(".header-element", {
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            delay: 0.1,
        });
    }, { scope: sectionRef }); // Runs only once on mount

    // 2. Filter Animation for the Cards
    useGSAP(() => {
        if (!cardsRef.current) return;
        const cards = Array.from(cardsRef.current.children);

        // Reset and animate cards every time the filter changes
        gsap.killTweensOf(cards);
        gsap.set(cards, { clearProps: "all" });
        gsap.from(cards, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "all", // Cleans up inline styles after animating
        });
    }, { dependencies: [activeFilter], scope: sectionRef });

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="min-h-screen rounded-b-[2.5rem] bg-white text-black"
        >
            {/* Custom Animated Header Section */}
            <div className="flex flex-col items-center justify-center px-4 pb-16 pt-32 text-center sm:px-6 md:px-10 lg:pt-40">
                <div className="mx-auto max-w-5xl">
                    {/* Roles Badges */}
                    <div className="header-element mb-6 flex flex-wrap justify-center gap-3">
                        {roles.map((role, i) => (
                            <span
                                key={i}
                                className="group relative overflow-hidden rounded-full border border-black/15 bg-white/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black/70 shadow-[0_0_0_1px_rgba(255,255,255,0.18)_inset,0_0_18px_rgba(255,255,255,0.08)] backdrop-blur-sm"
                            >
                                {/* Soft glow */}
                                <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)] opacity-80" />

                                {/* Noisy texture */}
                                <span
                                    className="pointer-events-none absolute inset-0 rounded-full opacity-[0.08] mix-blend-overlay"
                                    style={{
                                        backgroundImage:
                                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                                        backgroundSize: "140px 140px",
                                    }}
                                />

                                {/* Inner highlight */}
                                <span className="pointer-events-none absolute inset-[1px] rounded-full border border-white/35" />

                                <span className="relative z-10">{role}</span>
                            </span>
                        ))}
                    </div>

                    {/* Massive Title */}
                    <h1 className="header-element text-6xl font-black uppercase tracking-tighter text-black sm:text-8xl md:text-9xl lg:text-[10rem] lg:leading-[0.85]">
                        Projects
                    </h1>

                    {/* Description */}
                    <p className="header-element mx-auto mt-8 max-w-2xl text-base font-medium leading-relaxed text-black/60 sm:text-lg md:text-xl">
                        A collection of web, application, and AI/ML projects built to solve real-world problems.
                    </p>
                </div>
            </div>

            {/* Marquee Separator */}
            <div className="mt-8 border-y border-black/10 bg-black py-3 sm:mt-12 md:mt-16">
                <Marquee
                    items={topMarqueeItems}
                    className="bg-transparent text-white"
                    iconClassName="text-white/20"
                />
            </div>

            <div className="px-4 py-14 sm:px-6 md:px-10 lg:px-12 lg:py-20">
                <div className="mx-auto max-w-7xl">

                    {/* Filter buttons */}
                    <div className="mb-12 flex flex-wrap justify-center gap-3 md:justify-start">
                        {filters.map((filter) => {
                            const isActive = activeFilter === filter;
                            return (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`rounded-full border px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${isActive
                                        ? "border-black bg-black text-white shadow-md shadow-black/20"
                                        : "border-black/10 bg-white text-black/50 hover:border-black/30 hover:bg-black/5 hover:text-black"
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
                                className="group relative overflow-hidden rounded-[1.5rem] border border-black/10 bg-neutral-50 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:bg-black hover:text-white hover:shadow-xl hover:shadow-black/20"
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
                                    <div className="relative h-52 w-full overflow-hidden rounded-t-[1.5rem] sm:h-56 bg-black/5">
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
                                                "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 75%)",
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
                                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 transition-colors duration-300 group-hover:text-white/50">
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
                                                    className="text-black/30 transition-all duration-300 hover:scale-110 hover:text-black group-hover:text-white/40 group-hover:hover:text-white"
                                                    aria-label="GitHub"
                                                >
                                                    <Icon icon="mdi:github" className="h-5 w-5" />
                                                </a>
                                            )}
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-black/30 transition-all duration-300 hover:scale-110 hover:text-black group-hover:text-white/40 group-hover:hover:text-white"
                                                    aria-label="Live site"
                                                >
                                                    <Icon icon="lucide:arrow-up-right" className="h-5 w-5" />
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
                                    <h3 className="mt-4 text-2xl font-medium tracking-tight transition-colors duration-300 group-hover:text-white">
                                        {project.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="mt-3 text-sm leading-relaxed text-black/60 transition-colors duration-300 group-hover:text-white/65">
                                        {project.description}
                                    </p>

                                    {/* Framework pills */}
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {project.frameworks?.map((fw) => (
                                            <span
                                                key={fw.id}
                                                className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-black/60 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/5 group-hover:text-white/70"
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

            {/* Back Button */}
            <div className="mb-20 mt-0 flex justify-center">
          <Link
            to={backTo}
            state={{ from: "/projects" }}
            className="group relative overflow-hidden rounded-full border border-white/10 bg-white/10 shadow-md shadow-gray-300 0 px-8 py-4 text-xs font-bold uppercase tracking-widest text-black backdrop-blur-md transition-all duration-500 hover:border-black/20 hover:bg-black hover:text-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] md:text-sm"
          >
            {/* Glass highlight */}
            <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.08)_45%,transparent_70%)] opacity-80" />

            {/* Inner shine */}
            <span className="pointer-events-none absolute inset-[1px] rounded-full border border-white/40" />

            <span className="relative z-10 flex items-center gap-3">
              
              <Icon
                icon="lucide:arrow-left"
                className="text-lg transition-transform duration-500 group-hover:-translate-x-1"
              />Home Page
            </span>
          </Link>
        </div>

            {/* Bottom Marquee */}
            {/* <div className="mx-auto mt-4 max-w-[1600px] border-t border-black/10 pt-3">
                <Marquee
                    items={bottomMarqueeItems}
                    reverse={true}
                    className="bg-transparent text-black"
                    iconClassName="text-black/20"
                    icon="material-symbols-light:square"
                />
            </div> */}
            <div className="mt-auto mb-0">



          <Footer/>
            
            </div>
        </section>
    );
};

export default Projects;