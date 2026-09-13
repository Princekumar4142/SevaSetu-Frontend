import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../context/LanguageContext";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import DayNightSwitch from "./DayNightSwitch";
import LanguageSelector from "./LanguageSelector";
import InstallPWAButton from "./InstallPWAButton";
import Avatar from "./Avatar";

/**
 * NavigationDrawer Component
 * Recreated from the user's reference screenshots (Abacus Club style navigation drawer).
 * Features:
 * - Minimalist, modern slide-out drawer from the right
 * - Clean uppercase navigation links
 * - "TOGGLE THEME" card with animated Day/Night switch
 * - Full-width action button ("JOIN NOW" or User Account/Logout)
 * - Tucked-in Language & PWA actions to keep the main navbar completely uncluttered!
 */
export default function NavigationDrawer({ isOpen, onClose }) {
  const { isAuthenticated, currentUser } = useAuth();
  const { tr } = useLanguage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Close drawer on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    onClose();
    await dispatch(logout());
    navigate("/login");
  };

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "SERVICES", href: "/customer/services" },
    { label: "VERIFIED WORKERS", href: "/customer/workers" },
    ...(isAuthenticated ? [{ label: "MY BOOKINGS", href: "/customer/bookings" }] : []),
    { label: "TATKAL EMERGENCY", href: "/customer/services/rural-emergency" },
    { label: "SEVASETU PLUS", href: "/customer/plus" },
    { label: "JOIN AS WORKER", href: "/register/worker" },
    { label: "ABOUT US", href: "/#why-choose-us" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in" role="dialog" aria-modal="true">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div
          className="w-[58vw] min-w-[215px] max-w-[245px] sm:w-[260px] bg-white dark:bg-[#0c1017] shadow-2xl border-l border-slate-200/90 dark:border-slate-800/80 flex flex-col justify-between p-3.5 sm:p-4 overflow-y-auto"
          style={{ animation: "slideInFromRight 0.28s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* ── Top Header: NAVIGATION & Close Button ── */}
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase">
                NAVIGATION
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* ── Navigation Links (Matching Screenshot Typography) ── */}
            <nav className="flex flex-col gap-2.5 pt-3.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={onClose}
                  className="text-[11px] sm:text-xs font-black tracking-wider text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase select-none flex items-center justify-between group py-0.5"
                >
                  <span>{tr(link.label)}</span>
                  <span className="material-symbols-outlined text-[13px] text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all">
                    arrow_forward
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Bottom Section: Theme Toggle & Main Actions ── */}
          <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
            {/* TOGGLE THEME Card (Exact Look from Reference Screenshot) */}
            <div className="bg-slate-50 dark:bg-[#121824] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-2.5 flex items-center justify-between shadow-xs">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.14em] text-slate-700 dark:text-slate-200 uppercase">
                TOGGLE THEME
              </span>
              <DayNightSwitch />
            </div>

            {/* User Logged In state vs Guest "JOIN NOW" button */}
            {isAuthenticated ? (
              <div className="space-y-2.5 pt-0.5">
                {/* User Info Bar */}
                <Link
                  to="/customer/profile"
                  onClick={onClose}
                  className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 transition-colors group"
                >
                  <Avatar src={currentUser?.profilePhoto} name={currentUser?.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {currentUser?.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {currentUser?.phone || currentUser?.email || "Customer Account"}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
                </Link>

                {/* Profile and Logout Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    to="/customer/profile"
                    onClick={onClose}
                    className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] tracking-wider uppercase text-center shadow-md shadow-blue-600/20 transition-all"
                  >
                    MY ACCOUNT
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="py-2 px-3 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-[11px] font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer"
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 pt-0.5">
                <Link
                  to="/register"
                  onClick={onClose}
                  className="w-full py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-black text-xs tracking-widest uppercase text-center block shadow-md shadow-blue-600/25 transition-all"
                >
                  JOIN NOW
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                  <span>Already have an account?</span>
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            )}

            {/* Language & PWA Install Utility Row */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <LanguageSelector />
              </div>
              <InstallPWAButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
