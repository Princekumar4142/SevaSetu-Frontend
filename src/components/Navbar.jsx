import { Link } from "react-router-dom";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";
import InstallPWAButton from "./InstallPWAButton";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { tr } = useLanguage();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-outline-variant">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-margin-mobile md:px-margin-desktop py-md">
        <Link to="/" className="flex items-center gap-2 group">
          <Logo size={44} className="transition-transform group-hover:scale-105" />
          <span className="text-headline-md font-headline-md font-bold text-primary tracking-tight">SevaSetu</span>
        </Link>

        <div className="hidden md:flex items-center gap-lg">
          <a className="text-on-surface-variant font-label-md text-label-md hover:text-secondary transition-colors" href="#find-work">{tr("nav_findWork")}</a>
          <a className="text-on-surface-variant font-label-md text-label-md hover:text-secondary transition-colors" href="#hire-workers">{tr("nav_hireWorkers")}</a>
        </div>

        <div className="flex items-center gap-2 md:gap-md">
          {/* PWA App Install Button */}
          <InstallPWAButton />

          {/* Language Selector */}
          <LanguageSelector />

          <Link to="/login" className="hidden sm:block text-primary font-label-md text-label-md hover:text-secondary transition-colors">
            {tr("nav_login")}
          </Link>
          <Link
            to="/register"
            className="bg-primary text-white font-label-md text-label-md px-lg py-sm rounded-lg hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap"
          >
            {tr("nav_signUp")}
          </Link>
        </div>
      </div>
    </nav>
  );
}

