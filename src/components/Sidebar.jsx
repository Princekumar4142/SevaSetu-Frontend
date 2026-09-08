import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";

/**
 * Shared sidebar shell used by every dashboard layout. Pass `navItems` and
 * `title`/`subtitle` to adapt it per role.
 *
 * Mobile: renders as a slide-in drawer with backdrop overlay.
 * Desktop: fixed sidebar as before.
 */
export default function Sidebar({ title, subtitle, navItems, user, showEmergencySOS = false, mobileOpen = false, onMobileClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  const handleNavClick = () => {
    // Close mobile drawer when a nav item is clicked
    if (onMobileClose) onMobileClose();
  };

  const sidebarContent = (
    <>
      <div className="mb-lg px-sm flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo size={40} className="transition-transform group-hover:scale-105 shrink-0" />
          <div>
            <h1 className="font-headline-md text-headline-md font-extrabold text-primary leading-tight">SevaSetu</h1>
            {subtitle ? (
              <p className="font-status-badge text-status-badge text-on-surface-variant font-semibold">{subtitle}</p>
            ) : (
              title && title !== "SevaSetu" && (
                <p className="font-status-badge text-status-badge text-on-surface-variant font-semibold">{title}</p>
              )
            )}
          </div>
        </Link>
        {/* Close button visible only on mobile */}
        <button
          type="button"
          onClick={onMobileClose}
          className="md:hidden w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors"
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {user && (
        <div className="flex flex-col items-center py-md border-b border-outline-variant mb-md px-sm">
          <Avatar src={user.profilePhoto} name={user.name} size="xl" className="mb-sm shadow-md" />
          <h2 className="font-label-md text-label-md text-slate-900 text-center font-bold">{user.name}</h2>
          <div className="mt-1">{user.badge}</div>
        </div>
      )}

      <ul className="flex flex-col gap-xs flex-1 mt-md">
        {navItems.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.href}
              end={item.end}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-md px-md py-3 rounded-xl font-label-md text-label-md transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-100/90 via-purple-100/60 to-indigo-50 text-indigo-950 font-extrabold border border-indigo-200/80 shadow-sm"
                    : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 font-medium"
                }`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-md pt-md border-t border-outline-variant">
        {showEmergencySOS && (
          <button className="bg-error text-on-error py-sm rounded-lg font-bold flex items-center justify-center gap-sm shadow-md hover:bg-error/90 transition-colors">
            <span className="material-symbols-outlined">emergency</span>
            Emergency SOS
          </button>
        )}
        <div className="px-1 py-0.5">
          <LanguageSelector />
        </div>
        <button
          onClick={() => {
            handleLogout();
            handleNavClick();
          }}
          className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg font-label-md text-label-md transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ── Desktop Sidebar (fixed, always visible) ── */}
      <nav className="hidden md:flex flex-col bg-surface-container-low border-r border-outline-variant fixed left-0 top-0 h-full w-64 z-40 py-lg px-md">
        {sidebarContent}
      </nav>

      {/* ── Mobile Sidebar Drawer (overlay) ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          {/* Slide-in Panel */}
          <nav
            className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col py-lg px-md overflow-y-auto"
            style={{ animation: "slideInFromLeft 0.25s ease-out" }}
          >
            {sidebarContent}
          </nav>
        </div>
      )}
    </>
  );
}
