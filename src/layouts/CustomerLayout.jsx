import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import BottomTabBar from "../components/booking/BottomTabBar";
import Logo from "../components/Logo";

import Footer from "../components/Footer";

const NAV_LINKS = [
  { label: "Services", href: "/customer/services" },
  { label: "Workers", href: "/customer/workers" },
  { label: "My Bookings", href: "/customer/bookings" },
];

export default function CustomerLayout() {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* ── Desktop/Tablet Top Navbar ── */}
      <header className="hidden md:block sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-outline-variant shadow-sm">
        <div className="max-w-screen-xl mx-auto flex items-center gap-lg px-margin-desktop h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? "/customer" : "/"} className="flex items-center gap-2 shrink-0 group">
            <Logo size={36} className="transition-transform group-hover:scale-105" />
            <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">SevaSetu AI</span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-lg relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input
              className="w-full pl-xl pr-md py-2 rounded-full border border-outline-variant bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-brand-purple text-body-md font-body-md"
              placeholder="Search services, workers..."
            />
          </div>

          {/* Nav links */}
          {isAuthenticated && (
            <nav className="hidden lg:flex items-center gap-md">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Auth actions */}
          <div className="ml-auto flex items-center gap-sm shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-sm">
                <Link to="/customer/profile" className="flex items-center gap-sm px-sm py-1 rounded-full hover:bg-surface-container-low transition-colors">
                  <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-white text-sm font-bold">
                    {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="font-label-md text-label-md text-on-surface hidden lg:block">{currentUser?.name?.split(" ")[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors px-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="font-label-md text-label-md text-primary hover:text-brand-purple-dark transition-colors px-md py-sm">
                  Login
                </Link>
                <Link
                  to="/register/customer"
                  className="bg-brand-purple text-white font-label-md text-label-md px-lg py-sm rounded-full hover:bg-brand-purple-dark transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile Top Bar ── */}
      <header className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-outline-variant flex items-center gap-sm px-margin-mobile py-3">
        <Link to={isAuthenticated ? "/customer" : "/"} className="flex items-center gap-1.5 shrink-0">
          <Logo size={26} />
          <span className="font-label-md text-label-md font-bold text-primary">SevaSetu AI</span>
        </Link>

        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
          <input
            className="w-full pl-9 pr-sm py-1.5 rounded-full border border-outline-variant bg-surface-container-low focus:outline-none text-sm"
            placeholder="Search services..."
          />
        </div>

        {isAuthenticated ? (
          <Link to="/customer/profile" className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-white text-sm font-bold shrink-0">
            {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
          </Link>
        ) : (
          <Link to="/login" className="font-label-md text-label-md text-brand-purple font-bold shrink-0">
            Login
          </Link>
        )}
      </header>

      {/* ── Page Content ── */}
      <main className="flex-1 pb-16 md:pb-0 w-full">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Mobile Bottom Tab Bar (hidden on desktop) ── */}
      <div className="md:hidden">
        <BottomTabBar />
      </div>
    </div>
  );
}
