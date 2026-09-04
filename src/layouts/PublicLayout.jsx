import { Outlet, Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function PublicLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Minimal top bar — back arrow + logo + home link */}
      <div className="flex items-center gap-2.5 px-4 sm:px-6 py-3.5 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) navigate(-1);
            else navigate("/");
          }}
          className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors shrink-0"
          aria-label="Back"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>

        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo size={28} />
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
