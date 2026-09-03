import { Outlet, Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Minimal top bar — just logo + home link, no heavy navbar */}
      <div className="flex items-center gap-2 px-6 py-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo size={28} />
          <span className="text-lg font-bold text-primary tracking-tight">SevaSetu AI</span>
        </Link>
      </div>

      <main className="flex-1 flex items-start justify-center">
        <Outlet />
      </main>

      {/* Simple minimal footer */}
      <div className="text-center py-4 text-xs text-on-surface-variant/60">
        © {new Date().getFullYear()} SevaSetu AI · Made with ❤️ in India 🇮🇳
      </div>
    </div>
  );
}
