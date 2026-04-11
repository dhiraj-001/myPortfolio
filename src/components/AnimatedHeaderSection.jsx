import React, { useMemo, useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AnimatedHeaderSection = ({
  subTitle = "",
  title = "",
  text = "",
  textColor = "text-black",
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);

  const titleParts = useMemo(() => {
    return title.trim().split(/\s+/);
  }, [title]);

  const subtitleParts = useMemo(() => {
    return subTitle
      .split("|")
      .map((part) => part.trim())
      .filter(Boolean);
  }, [subTitle]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: withScrollTrigger
          ? {
              trigger: contextRef.current,
              start: "top 85%",
            }
          : undefined,
      });

      tl.from(contextRef.current, {
        y: 120,
        opacity: 0,
        duration: 1,
      }).from(
        headerRef.current,
        {
          y: 80,
          opacity: 0,
          duration: 0.9,
        },
        "-=0.55"
      );
    }, contextRef);

    return () => ctx.revert();
  }, [withScrollTrigger]);

  return (
    <div ref={contextRef} className="relative z-10">
      <div className="overflow-hidden">
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-8 pt-16 sm:gap-10 sm:pt-20 md:gap-12"
        >
          <div className="px-2 sm:px-4 md:px-6">
            <div className="flex flex-wrap items-center gap-3">
              {subtitleParts.map((part, index) => (
                <span
                  key={`${part}-${index}`}
                  className={`rounded-full border border-current/30  px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2rem] backdrop-blur-sm ${textColor}`}
                >
                  {part}
                </span>
              ))}
            </div>
          </div>

          <div className="px-2 sm:px-4 md:px-6">
            <h1
              className={`banner-text-responsive uppercase leading-[0.9] whitespace-nowrap ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span key={`${part}-${index}`} className="inline-block mr-3">
                  {part}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>

      <div className={`relative px-2 sm:px-4 md:px-6 ${textColor}`}>
        <div className="absolute inset-x-0 top-0 border-t border-black/20" />

        <div className="flex justify-end py-10 sm:py-12 md:py-16">
          <div className="max-w-xs sm:max-w-md md:max-w-4xl">
            <AnimatedTextLines
              text={text}
              className={`value-text-responsive font-light uppercase leading-relaxed tracking-wide text-right ${textColor}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;