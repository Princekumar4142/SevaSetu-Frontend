import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";

const ESSENTIAL_LINKS = [
  { label: "Services", href: "/customer/services/electrical-plumbing" },
  { label: "My Bookings", href: "/customer/bookings" },
  { label: "Verified Workers", href: "/customer/workers" },
  { label: "SevaSetu Plus", href: "/customer/plus" },
  { label: "Join as Worker", href: "/register/worker" },
];

export default function Footer() {
  const { tr } = useLanguage();

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden border-t border-slate-800/80">
      {/* Top subtle accent gradient */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400" />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-8 py-8 sm:py-10 pb-28 md:pb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 max-w-md">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="bg-white rounded-xl p-1 shadow-lg">
                <Logo size={44} className="transition-transform group-hover:scale-105" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">SevaSetu</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {tr("India's cooperative home & personal service network. 0% worker commission, upfront fixed prices.")}
            </p>
          </div>

          {/* 4-5 Essential Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {ESSENTIAL_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-indigo-600/20 text-slate-300 hover:text-white border border-slate-800 hover:border-indigo-500/40 text-xs font-semibold transition-all duration-200"
              >
                {tr(link.label)}
              </Link>
            ))}
          </nav>

          {/* Quick Support Touchpoint */}
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 border border-slate-800/80 px-3.5 py-2 rounded-xl">
            <span className="material-symbols-outlined text-[16px] text-indigo-400">mail</span>
            <span>{tr("Support:")}</span>
            <a
              href="mailto:princebth1988@gmail.com"
              className="text-indigo-300 hover:text-white font-medium transition-colors"
            >
              princebth1988@gmail.com
            </a>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-6 mt-6 border-t border-slate-900 text-xs text-slate-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} SevaSetu. {tr("All rights reserved.")}</p>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>हर हुनर को काम, हर काम को विश्वास</span>
            <span>•</span>
            <span>Made with ❤️ in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
