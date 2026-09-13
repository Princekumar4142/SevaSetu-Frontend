import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useLanguage } from "../context/LanguageContext";
import BottomTabBar from "../components/booking/BottomTabBar";
import Logo from "../components/Logo";
import AddressModal from "../components/AddressModal";
import Footer from "../components/Footer";
import Avatar from "../components/Avatar";
import LanguageSelector from "../components/LanguageSelector";
import ThemeSelector from "../components/ThemeSelector";
import InstallPWAButton from "../components/InstallPWAButton";
import NavigationDrawer from "../components/NavigationDrawer";

const PUBLIC_NAV_LINKS = [
  { label: "Services", href: "/customer/services" },
  { label: "Workers", href: "/customer/workers" },
];

const AUTH_NAV_LINKS = [
  { label: "Services", href: "/customer/services" },
  { label: "Workers", href: "/customer/workers" },
  { label: "My Bookings", href: "/customer/bookings" },
];

export default function CustomerLayout() {
  const { isAuthenticated, currentUser } = useAuth();
  const { tr } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const isCheckoutOrTracking =
    location.pathname.includes("/checkout/") ||
    location.pathname.includes("/bookings/track/");

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  const addressSummary = currentUser?.address
    ? `${currentUser.address}${currentUser.city ? `, ${currentUser.city}` : ""}`
    : tr("Add your service address");

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* ── Desktop/Tablet Top Navbar (Clean, Uncluttered & Modern) ── */}
      <header className="hidden md:block sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-outline-variant shadow-xs transition-all">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-6 px-margin-desktop h-16">
          {/* Left: Logo & Dynamic Address */}
          <div className="flex items-center gap-4">
            <Link to={isAuthenticated ? "/customer" : "/"} className="flex items-center gap-2.5 shrink-0 group">
              <Logo size={44} className="transition-transform group-hover:scale-105" />
              <span className="font-headline-md text-headline-md font-extrabold text-primary dark:text-white tracking-tight">
                SevaSetu
              </span>
            </Link>

            {/* Compact Address Badge */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => setAddressModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 border border-slate-200/80 dark:border-slate-700 transition-all text-left cursor-pointer group max-w-xs"
                title="Click to change your delivery address"
              >
                <span className="material-symbols-outlined text-[16px] text-indigo-600 dark:text-indigo-400 shrink-0">location_on</span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[160px]">
                  {currentUser?.city || currentUser?.address?.split(",")[0] || tr("Service Address")}
                </span>
                <span className="material-symbols-outlined text-[13px] text-slate-400">expand_more</span>
              </button>
            )}
          </div>

          {/* Right: Quick links, User/Auth & Hamburger Menu Button */}
          <div className="flex items-center gap-3">
            <nav className="hidden lg:flex items-center gap-4 mr-1">
              <Link
                to="/customer/services"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {tr("Services")}
              </Link>
              <Link
                to="/customer/workers"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {tr("Workers")}
              </Link>
            </nav>

            {isAuthenticated ? (
              <Link
                to="/customer/profile"
                className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/70 dark:border-slate-700 transition-colors"
              >
                <Avatar src={currentUser?.profilePhoto} name={currentUser?.name} size="xs" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                  {currentUser?.name?.split(" ")[0]}
                </span>
              </Link>
            ) : (
              <Link
                to="/register"
                className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-sm"
              >
                {tr("Sign Up")}
              </Link>
            )}

            {/* ── Modern Hamburger Menu Button (=) ── */}
            <button
              type="button"
              onClick={() => setNavDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              title="Navigation Menu"
              className="w-10 h-10 rounded-xl bg-slate-100/90 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95 group border border-slate-200/80 dark:border-slate-700"
            >
              <span className="w-5 h-0.5 bg-current rounded-full transition-all group-hover:w-5.5" />
              <span className="w-5 h-0.5 bg-current rounded-full transition-all" />
              <span className="w-3.5 h-0.5 bg-current rounded-full self-start ml-2.5 transition-all group-hover:w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Top Bar (Ultra Clean like Image 4) ── */}
      <header className="md:hidden sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-outline-variant flex items-center justify-between px-margin-mobile py-2.5">
        <Link to={isAuthenticated ? "/customer" : "/"} className="flex items-center gap-2 shrink-0">
          <Logo size={36} />
          <span className="font-headline-md text-base font-bold text-primary dark:text-white">SevaSetu</span>
        </Link>

        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => setAddressModalOpen(true)}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 max-w-[130px] truncate"
            >
              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[14px]">location_on</span>
              <span className="truncate">{currentUser?.city || "Location"}</span>
            </button>
          )}

          {/* Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setNavDrawerOpen(true)}
            aria-label="Open Navigation Menu"
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border border-slate-200/80 dark:border-slate-700 active:scale-95 group"
          >
            <span className="w-4.5 h-0.5 bg-current rounded-full" />
            <span className="w-4.5 h-0.5 bg-current rounded-full" />
            <span className="w-3 h-0.5 bg-current rounded-full self-start ml-2 group-hover:w-4.5 transition-all" />
          </button>
        </div>
      </header>

      {/* ── Abacus-Style Navigation Drawer (Images 2 & 3) ── */}
      <NavigationDrawer
        isOpen={navDrawerOpen}
        onClose={() => setNavDrawerOpen(false)}
      />

      {/* Address Management Modal */}
      <AddressModal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        currentUser={currentUser}
      />

      {/* ── Page Content ── */}
      <main className={`flex-1 w-full ${isCheckoutOrTracking ? "pb-0" : "pb-16 md:pb-0"}`}>
        <Outlet />
      </main>

      {/* ── Footer (hidden in checkout & tracking for clean focused UX) ── */}
      {!isCheckoutOrTracking && <Footer />}

      {/* ── Mobile Bottom Tab Bar (hidden on desktop and checkout/tracking) ── */}
      {!isCheckoutOrTracking && (
        <div className="md:hidden">
          <BottomTabBar />
        </div>
      )}
    </div>
  );
}
