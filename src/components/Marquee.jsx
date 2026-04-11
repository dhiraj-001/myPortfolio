import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "./ui/scroll-based-velocity";

const Marquee = ({
  items,
  className = "text-white bg-black",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
}) => {
  return (
    <ScrollVelocityContainer className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center marquee-text-responsive font-light uppercase ${className}`}>
      <ScrollVelocityRow 
        baseVelocity={5} 
        direction={reverse ? -1 : 1}
        className="flex items-center"
      >
        {items.map((text, index) => (
          <React.Fragment key={index}>
            <span className="px-1 sm:px-1 md:px-4 lg:px-12 ultra-small-screen">
              {text}
            </span>
            <Icon icon={icon} className={`${iconClassName} mx-1.5 sm:mx-1.5 md:mx-5 lg:mx-12`} />
          </React.Fragment>
        ))}
      </ScrollVelocityRow>
    </ScrollVelocityContainer>
  );
};

export default Marquee;