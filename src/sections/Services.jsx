import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Services = () => {
  const text = `My work spans full stack development, backend engineering, deployment, and applied machine learning projects.`;

  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" });

  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="services"
      className="min-h-screen rounded-t-4xl bg-black text-white"
    >
      <AnimatedHeaderSection
        subTitle={"Full Stack Development | ML Systems | Deployment"}
        title={"What I Build"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      {servicesData.map((service, index) => (
        <div
          ref={(el) => (serviceRefs.current[index] = el)}
          key={index}
          className="sticky border-t border-white/20 bg-black px-4 pt-6 pb-10 text-white sm:px-4 md:px-6 lg:px-8"
          style={
            isDesktop
              ? {
                  top: `calc(8vh + ${index * 4}rem)`,
                  marginBottom: `${(servicesData.length - index - 1) * 4}rem`,
                }
              : { top: 0 }
          }
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex max-w-5xl flex-col gap-4 md:gap-6">
              <h2 className="text-3xl font-light uppercase leading-tight sm:text-4xl lg:text-5xl">
                {service.title}
              </h2>

              <p className="max-w-3xl text-base leading-relaxed tracking-wide text-white/60 sm:text-lg lg:text-xl">
                {service.description}
              </p>

              <div className="flex flex-col gap-2 text-lg text-white/80 sm:gap-3 sm:text-xl lg:text-2xl">
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`} className="w-full">
                    <h3 className="flex w-full items-start">
                      <span className="mr-6 w-8 flex-shrink-0 text-sm text-white/30 sm:mr-8">
                        0{itemIndex + 1}
                      </span>
                      <span className="flex-1">{item.title}</span>
                    </h3>

                    {itemIndex < service.items.length - 1 && (
                      <div className="my-2 h-px w-full bg-white/15" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;