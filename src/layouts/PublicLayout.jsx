import { Outlet, Link } from "react-router-dom";
import Logo from "../components/Logo";
import LanguageSelector from "../components/LanguageSelector";
import ThemeSelector from "../components/ThemeSelector";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Minimal top bar — logo + home link + theme selector + language selector */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo size={38} />
          <span className="text-lg font-bold text-primary dark:text-white tracking-tight">SevaSetu</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <LanguageSelector />
        </div>
      </div>

      <main className="flex-1 flex items-start justify-center">
        <Outlet />
      </main>

      {/* Simple minimal footer */}
      <div className="text-center py-4 text-xs text-on-surface-variant/60">
        © {new Date().getFullYear()} SevaSetu · Made with ❤️ in India 🇮🇳
      </div>
    </div>
  );
}
