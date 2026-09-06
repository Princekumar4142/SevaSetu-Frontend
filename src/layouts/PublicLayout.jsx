import { Outlet, Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Minimal top bar — logo + home link */}
      <div className="flex items-center px-4 sm:px-6 py-3.5 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo size={40} />
          <span className="text-lg font-bold text-primary tracking-tight">SevaSetu</span>
        </Link>
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
