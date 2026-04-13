import React, { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
// import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
// import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import { useProgress } from "@react-three/drei";
import Skills from "./sections/Skills";
import Projects from "./pages/Projects";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const { progress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add a slight delay when hitting 100% so it doesn't jarringly snap away
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <ReactLenis root className="relative w-full min-h-screen overflow-x-hidden bg-[#050505]">
      <main className="relative w-full max-w-[100vw] min-h-[100dvh] overflow-x-clip">
      {/* Premium Pre-loader */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isLoaded
            ? "pointer-events-none -translate-y-8 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {/* Large Minimalist Percentage */}
          <div className="overflow-hidden">
            <h1 className="text-5xl font-light tracking-tighter text-white md:text-7xl">
              {Math.floor(progress)}<span className="text-white/20">%</span>
            </h1>
          </div>

          {/* 1px Sleek Progress Line */}
          <div className="relative h-[1px] w-64 overflow-hidden bg-white/10 md:w-80">
            <div
              className="absolute left-0 top-0 h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Branding Subtitle */}
          <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.3rem] text-white/30">
            Dhiraj Gogoi &copy; 2026
          </p>
        </div>
      </div>
      <Router>
        <Navbar />
        {/* Main Content Reveal */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Services />
                <Skills />
                <Works />
                <About />
                <Contact />
              </>
            } />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </Router>
      </main>
    </ReactLenis>
  );
};

export default App;