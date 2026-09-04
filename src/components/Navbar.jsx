import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-outline-variant">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-margin-mobile md:px-margin-desktop py-md">
        <Link to="/" className="flex items-center gap-2 group">
          <Logo size={32} className="transition-transform group-hover:scale-105" />
          <span className="text-headline-md font-headline-md font-bold text-primary tracking-tight">SevaSetu</span>
        </Link>

        <div className="hidden md:flex items-center gap-lg">
          <a className="text-on-surface-variant font-label-md text-label-md hover:text-secondary transition-colors" href="#find-work">Find Work</a>
          <a className="text-on-surface-variant font-label-md text-label-md hover:text-secondary transition-colors" href="#hire-workers">Hire Workers</a>
          <a className="text-on-surface-variant font-label-md text-label-md hover:text-secondary transition-colors" href="#cooperatives">Cooperatives</a>
        </div>

        <div className="flex items-center gap-md">
          <Link to="/login" className="hidden sm:block text-primary font-label-md text-label-md hover:text-secondary transition-colors">
            Login
          </Link>
          <Link
            to="/register/customer"
            className="bg-primary text-white font-label-md text-label-md px-lg py-sm rounded-lg hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
