import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavigationDrawer from "./NavigationDrawer";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { tr } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-xs border-b border-outline-variant">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-margin-mobile md:px-margin-desktop py-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <Logo size={42} className="transition-transform group-hover:scale-105" />
            <span className="text-headline-md font-headline-md font-extrabold text-primary dark:text-white tracking-tight">SevaSetu</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#find-work">{tr("nav_findWork")}</a>
            <a className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#hire-workers">{tr("nav_hireWorkers")}</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {tr("nav_login")}
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-xl transition-all shadow-sm shadow-blue-600/20 whitespace-nowrap"
            >
              {tr("nav_signUp")}
            </Link>

            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              className="w-10 h-10 rounded-xl bg-slate-100/90 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border border-slate-200/80 dark:border-slate-700 active:scale-95 group"
            >
              <span className="w-5 h-0.5 bg-current rounded-full transition-all group-hover:w-5.5" />
              <span className="w-5 h-0.5 bg-current rounded-full transition-all" />
              <span className="w-3.5 h-0.5 bg-current rounded-full self-start ml-2.5 transition-all group-hover:w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-out Navigation Drawer */}
      <NavigationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

