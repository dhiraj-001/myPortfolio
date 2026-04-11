import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const AnimatedTextLines = ({ text, className }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  useGSAP(() => {
    if (lineRefs.current.length > 0) {
      gsap.from(lineRefs.current, {
        y: 40, // Reduced from 100 so the animation isn't overly dramatic on mobile
        opacity: 0,
        duration: 1,
        stagger: 0.15, // Slightly faster stagger for a tighter sequence
        ease: "power3.out", // Smoother reveal than back.out for text
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Ensures it triggers slightly before it hits the center
          once: true, // Prevents it from re-animating every time you scroll up and down
        },
      });
    }
  });

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => (lineRefs.current[index] = el)}
          // Added responsive text sizing here (text-sm for mobile -> text-lg for desktop)
          className="block text-[20px] sm:text-base md:text-lg leading-relaxed tracking-wide text-pretty"
        >
          {line}
        </span>
      ))}
    </div>
  );
};