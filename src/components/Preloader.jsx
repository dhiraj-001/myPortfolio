import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ progress, isLoaded }) => {
  const containerRef = useRef(null);
  const curtainTopRef = useRef(null);
  const curtainBottomRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressNumRef = useRef(null);
  const wordRefs = useRef([]);
  const [displayProgress, setDisplayProgress] = useState(0);
  const hasExited = useRef(false);

  // Animate displayed number smoothly
  useEffect(() => {
    gsap.to({ val: displayProgress }, {
      val: progress,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: function () {
        setDisplayProgress(Math.floor(this.targets()[0].val));
      },
    });
  }, [progress]);

  // Progress bar fill
  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        scaleX: progress / 100,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [progress]);

  // Entry animation
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(wordRefs.current, {
      y: 60,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power4.out",
    });

    tl.from(
      progressBarRef.current?.parentElement,
      {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }, []);

  // Exit animation when loaded
  useEffect(() => {
    if (!isLoaded || hasExited.current) return;
    hasExited.current = true;

    const tl = gsap.timeline();

    // Fade out text + number
    tl.to([wordRefs.current, progressNumRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.05,
      ease: "power3.in",
    });

    // Split curtains apart
    tl.to(
      curtainTopRef.current,
      {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
      },
      "-=0.1"
    );

    tl.to(
      curtainBottomRef.current,
      {
        yPercent: 100,
        duration: 0.85,
        ease: "power4.inOut",
      },
      "<"
    );

    // Hide container after exit
    tl.set(containerRef.current, { display: "none" });
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden"
      aria-label="Loading"
      role="status"
    >
      {/* Top curtain */}
      <div
        ref={curtainTopRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#050505]"
      />

      {/* Bottom curtain */}
      <div
        ref={curtainBottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050505]"
      />

      {/* Center content — sits between both curtains */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-12 bg-[#050505]">

        {/* Wordmark / headline */}
        <div className="overflow-hidden">
          <div className="flex flex-col items-center gap-1 text-center">
            {["Portfolio", "Loading"].map((word, i) => (
              <span
                key={word}
                ref={(el) => (wordRefs.current[i] = el)}
                className={`block font-bold uppercase leading-none tracking-tighter text-white ${
                  i === 0
                    ? "text-[13vw] sm:text-[11vw] md:text-[9vw]"
                    : "text-[5vw] sm:text-[4vw] md:text-[3vw] text-white/20"
                }`}
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Progress bar + number */}
        <div className="flex w-full max-w-xs flex-col items-center gap-3 px-6 sm:max-w-sm md:max-w-md">
          {/* Bar track */}
          <div className="relative h-px w-full bg-white/10">
            <div
              ref={progressBarRef}
              className="absolute inset-y-0 left-0 origin-left bg-white"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          {/* Number */}
          <div
            ref={progressNumRef}
            className="flex w-full items-center justify-between"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
              Initializing
            </span>
            <span
              className="tabular-nums text-[11px] font-medium text-white/40"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {String(displayProgress).padStart(3, "0")}
            </span>
          </div>
        </div>

        {/* Decorative corner marks */}
        <div className="pointer-events-none absolute inset-4 sm:inset-8">
          {[
            "top-0 left-0 border-t border-l",
            "top-0 right-0 border-t border-r",
            "bottom-0 left-0 border-b border-l",
            "bottom-0 right-0 border-b border-r",
          ].map((cls, i) => (
            <div
              key={i}
              className={`absolute h-5 w-5 border-white/10 ${cls}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;