import { useMemo, useRef, useState, useEffect } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { projects as staticProjects } from "../constants";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

// Derive unique domain filters from the data
const getFilters = (data) => ["All", ...Array.from(new Set(data.map((p) => p.domain)))];

const Projects = () => {
    const [projectsList, setProjectsList] = useState([]);
    const [activeFilter, setActiveFilter] = useState("All");
    const [loading, setLoading] = useState(true);
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

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

    useEffect(() => {
        const fetchProjects = async () => {
            const startTime = Date.now();
            try {
                const response = await fetch(`${API_BASE_URL}/projects`);
                let data = [];
                if (response.ok) {
                    data = await response.json();
                }

                // Guarantee a minimum display of 800ms to allow skeletons to animate cleanly
                const elapsed = Date.now() - startTime;
                const delay = Math.max(0, 800 - elapsed);
                await new Promise((resolve) => setTimeout(resolve, delay));

                if (data && data.length > 0) {
                    const mappedData = data.map((p, idx) => ({
                        ...p,
                        id: p._id || p.id || idx,
                        frameworks: p.frameworks ? p.frameworks.map((fw, fidx) => ({
                            id: fw._id || fidx,
                            name: fw.name
                        })) : []
                    }));
                    setProjectsList(mappedData);
                } else {
                    setProjectsList(staticProjects);
                }
            } catch (err) {
                console.error("Failed to fetch projects for page:", err);
                const elapsed = Date.now() - startTime;
                const delay = Math.max(0, 800 - elapsed);
                await new Promise((resolve) => setTimeout(resolve, delay));
                setProjectsList(staticProjects);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filters = useMemo(() => {
        return getFilters(projectsList);
    }, [projectsList]);

    const filteredProjects = useMemo(() => {
        if (activeFilter === "All") return projectsList;
        return projectsList.filter((p) => p.domain === activeFilter);
    }, [projectsList, activeFilter]);

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
        if (loading || !cardsRef.current) return;
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
    }, { dependencies: [activeFilter, filteredProjects, loading], scope: sectionRef });

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="min-h-screen rounded-b-[2.5rem] bg-white text-black"
        >
            <Helmet>
                <title>Projects - Dhiraj Gogoi</title>
                <meta name="description" content="A collection of web, application, and AI/ML projects built by Dhiraj Gogoi." />
            </Helmet>
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

                    {/* Cards grid / Skeletons */}
                    {loading ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {[1, 2, 3, 4].map((n, i) => (
                                <div
                                    key={i}
                                    className="rounded-[1.5rem] border border-black/10 bg-neutral-50 p-6 flex flex-col gap-4 animate-pulse"
                                >
                                    <div className="h-52 w-full bg-black/5 rounded-[1rem]" />
                                    <div className="h-4 w-20 bg-black/10 rounded" />
                                    <div className="h-8 w-2/3 bg-black/10 rounded mt-2" />
                                    <div className="h-12 w-full bg-black/10 rounded" />
                                    <div className="flex gap-2 mt-4">
                                        <div className="h-6 w-16 bg-black/10 rounded-full" />
                                        <div className="h-6 w-16 bg-black/10 rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
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
                                                    className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-105 ${
                                                        project.domain === "App Development" ? "object-contain py-2" : "object-cover"
                                                    }`}
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
                    )}
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

            <div className="mt-auto mb-0">
                <Footer/>
            </div>
        </section>
    );
};

export default Projects;