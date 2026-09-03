import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ title, subtitle, navItems, user, showEmergencySOS }) {
  return (
    <div className="min-h-screen bg-surface-container-lowest flex">
      <Sidebar title={title} subtitle={subtitle} navItems={navItems} user={user} showEmergencySOS={showEmergencySOS} />

      {/* Mobile top bar (sidebar is hidden below md breakpoint) */}
      <header className="md:hidden fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-margin-mobile py-4">
        <span className="font-headline-md text-headline-md font-bold text-primary">{title}</span>
        <span className="material-symbols-outlined text-primary">menu</span>
      </header>

      <main className="flex-1 md:ml-64 pt-20 md:pt-0 px-margin-mobile md:px-margin-desktop py-lg w-full max-w-screen-2xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
