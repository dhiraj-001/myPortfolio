import { Icon } from "@iconify/react/dist/iconify.js";
import { socials } from "../constants";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 bg-black px-6 py-6 sm:flex-row md:px-10 lg:px-12">
      {/* Left: Copyright */}
      <p className="text-[10px] font-medium uppercase tracking-[0.2rem] text-white/40 sm:w-1/3 sm:text-left">
        &copy; {new Date().getFullYear()} Dhiraj Gogoi.
      </p>

      {/* Center: Social Icons */}
      <div className="flex items-center gap-6 sm:w-1/3 sm:justify-center">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.name}
            className="text-white/40 transition-all duration-300 hover:scale-110 hover:text-white"
          >
            <Icon icon={social.icon} className="text-xl" />
          </a>
        ))}
      </div>

      {/* Right: Source Code Link */}
      <div className="flex sm:w-1/3 sm:justify-end">
        <a
          href="https://github.com/dhiraj-001/myPortfolio"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2rem] text-white/40 transition-colors hover:text-white"
        >
          <Icon icon="mdi:github" className="text-sm" />
          <span>View Source Code</span>
          <Icon
            icon="lucide:arrow-up-right"
            className="text-sm transition-transform group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;