import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Logo from "../components/Logo";

export default function DashboardLayout({ title, subtitle, navItems, user, showEmergencySOS }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex">
      <Sidebar
        title={title}
        subtitle={subtitle}
        navItems={navItems}
        user={user}
        showEmergencySOS={showEmergencySOS}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Mobile top bar (sidebar is hidden below md breakpoint) */}
      <header className="md:hidden fixed top-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-margin-mobile py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={handleBack}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 flex items-center justify-center text-slate-800 transition-colors shrink-0"
            aria-label="Go back"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <Logo size={38} />
          <span className="font-headline-md text-base sm:text-headline-md font-bold text-primary truncate">
            {title}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors shrink-0"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>
      </header>

      <main className="flex-1 md:ml-64 pt-16 md:pt-0 px-3 sm:px-margin-mobile md:px-margin-desktop py-4 md:py-lg w-full max-w-screen-2xl mx-auto overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
