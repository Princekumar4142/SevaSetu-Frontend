import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import BottomTabBar from "../components/booking/BottomTabBar";
import Logo from "../components/Logo";
import AddressModal from "../components/AddressModal";
import Footer from "../components/Footer";
import Avatar from "../components/Avatar";

const NAV_LINKS = [
  { label: "Services", href: "/customer/services" },
  { label: "Workers", href: "/customer/workers" },
  { label: "My Bookings", href: "/customer/bookings" },
];

export default function CustomerLayout() {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  const isCheckoutOrTracking =
    location.pathname.includes("/checkout/") ||
    location.pathname.includes("/bookings/track/");

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  const addressSummary = currentUser?.address
    ? `${currentUser.address}${currentUser.city ? `, ${currentUser.city}` : ""}`
    : "Add your service address";

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* ── Desktop/Tablet Top Navbar ── */}
      <header className="hidden md:block sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-outline-variant shadow-sm transition-all">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-6 px-margin-desktop h-16">
          {/* Left: Logo & Dynamic Address (when logged in) */}
          <div className="flex items-center gap-5">
            <Link to={isAuthenticated ? "/customer" : "/"} className="flex items-center gap-2.5 shrink-0 group">
              <Logo size={36} className="transition-transform group-hover:scale-105" />
              <span className="font-headline-md text-headline-md font-extrabold text-primary tracking-tight">
                SevaSetu AI
              </span>
            </Link>

            {/* Dynamic Address Pill — Only when user is logged in */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => setAddressModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200/90 transition-all text-left group max-w-sm"
                title="Click to view or change your delivery address"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                </div>
                <div className="min-w-0 pr-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Service Address
                    </span>
                    <span className="material-symbols-outlined text-[13px] text-slate-400">expand_more</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 truncate max-w-[210px]">
                    {addressSummary}
                  </p>
                </div>
              </button>
            )}
          </div>

          {/* Right: Nav links & Auth actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <nav className="hidden lg:flex items-center gap-md mr-2">
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

            {isAuthenticated ? (
              <div className="flex items-center gap-sm">
                <Link
                  to="/customer/profile"
                  className="flex items-center gap-sm px-2 py-1 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <Avatar src={currentUser?.profilePhoto} name={currentUser?.name} size="sm" />
                  <span className="font-label-md text-label-md text-slate-800 hidden lg:block font-bold">
                    {currentUser?.name?.split(" ")[0]}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors px-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="font-label-md text-label-md text-primary font-semibold hover:text-brand-purple-dark transition-colors px-md py-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register/customer"
                  className="bg-brand-purple text-white font-label-md text-label-md font-semibold px-lg py-sm rounded-full hover:bg-brand-purple-dark transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile Top Bar ── */}
      <header className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-outline-variant flex items-center justify-between gap-sm px-margin-mobile py-2.5">
        <Link to={isAuthenticated ? "/customer" : "/"} className="flex items-center gap-1.5 shrink-0">
          <Logo size={28} />
          <span className="font-label-md text-label-md font-bold text-primary">SevaSetu AI</span>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => setAddressModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-left min-w-0 max-w-[170px]"
            >
              <span className="material-symbols-outlined text-indigo-600 text-[15px] shrink-0">location_on</span>
              <span className="text-xs font-semibold text-slate-800 truncate">
                {currentUser?.city || currentUser?.address?.split(",")[0] || "Set address"}
              </span>
              <span className="material-symbols-outlined text-slate-400 text-[13px] shrink-0">expand_more</span>
            </button>
            <Link
              to="/customer/profile"
              className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm"
            >
              {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="font-label-md text-label-md text-brand-purple font-bold px-2 py-1">
              Login
            </Link>
            <Link
              to="/register/customer"
              className="font-label-md text-xs bg-brand-purple text-white font-semibold px-3 py-1.5 rounded-full shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        )}
      </header>

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
