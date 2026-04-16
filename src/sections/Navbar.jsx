import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/dhiraj-gogoi-330008274/" },
  { name: "GitHub", href: "https://github.com/dhiraj-001/" },
  { name: "Twitter", href: "https://x.com/DhirajG01" },
];

const Navbar = () => {
  const overlayRef = useRef(null);
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);

  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);

  const tl = useRef(null);
  const iconTl = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  useGSAP(() => {
    // Initial setups
    gsap.set(overlayRef.current, { autoAlpha: 0 });
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      y: 20, // Slide up instead of sliding right
    });

    // Menu Timeline
    tl.current = gsap
      .timeline({ paused: true })
      .to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        navRef.current,
        {
          xPercent: 0,
          duration: 0.8,
          ease: "expo.out", // More premium easing
        },
        "<" // Start at the same time as the overlay
      )
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );

    // Burger Icon Timeline
    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.5,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.5,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Keep burger visible when navbar is open, otherwise hide/show based on scroll direction
      setShowBurger(isOpen || currentScrollY <= lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    if (isOpen) toggleMenu();
  };

  return (
    <>
      {/* Background Overlay (Click to close) */}
      <div
        ref={overlayRef}
        onClick={closeMenu}
        className="fixed inset-0 z-40 hidden bg-black/40 backdrop-blur-sm md:block"
      />

      {/* Slide-in Navigation Panel */}
      <nav
        ref={navRef}
        className="fixed right-0 top-0 z-50 flex min-h-[100dvh] w-full flex-col justify-between bg-[#0a0a0a] px-6 py-24 text-white sm:w-[400px] md:w-[480px] md:px-12 lg:w-[500px]"
      >
        {/* Navigation Links */}
        <div className="flex flex-col gap-y-4">
          {["home", "services", "skills", "works", "achievements", "about", "contact"].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)} className="overflow-hidden">
                <Link
                  className="group inline-block cursor-pointer text-4xl font-light uppercase tracking-tighter text-white/70 transition-colors hover:text-white sm:text-5xl lg:text-6xl"
                  to={`${section}`}
                  smooth
                  offset={0}
                  duration={1500}
                  onClick={closeMenu} // Close menu when a link is clicked
                >
                  <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-4">
                    {section}
                  </span>
                </Link>
              </div>
            )
          )}
        </div>

        {/* Footer / Contact Info */}
        <div
          ref={contactRef}
          className="flex flex-col gap-8 border-t border-white/10 pt-8 mt-8"
        >
          <div className="font-light">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2rem] text-white/30">
              E-mail
            </p>
            <a
              href="mailto:gogoidhiraj207@gmail.com"
              className="text-sm font-light tracking-widest text-white/80 transition-colors hover:text-white sm:text-base"
            >
              gogoidhiraj207@gmail.com
            </a>
          </div>

          <div className="font-light">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2rem] text-white/30">
              Social Media
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15rem] text-white/70 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Burger Button */}
      <button
        className="fixed right-4 top-4 z-50 flex h-14 w-14 flex-col items-center justify-center gap-[5px] rounded-full border border-gray-400 bg-white/40 backdrop-blur-md shadow-lg transition-all cursor-pointer duration-500 hover:scale-105 hover:bg-white/20 sm:right-6 sm:top-6 md:h-16 md:w-16 lg:right-10 lg:top-10"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)", opacity: 1, pointerEvents: "auto" }
            : { clipPath: "circle(0% at 50% 50%)", opacity: 0, pointerEvents: "none" }
        }
        aria-label="Toggle Menu"
      >
        <span
          ref={topLineRef}
          className="block h-[1.5px] w-6 origin-center rounded-full bg-gray-400 md:w-7 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        ></span>
        <span
          ref={bottomLineRef}
          className="block h-[1.5px] w-6 origin-center rounded-full bg-gray-400 md:w-7 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        ></span>
      </button>
    </>
  );
};

export default Navbar;