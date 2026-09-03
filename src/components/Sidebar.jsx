import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

/**
 * Shared sidebar shell used by every dashboard layout. Pass `navItems` and
 * `title`/`subtitle` to adapt it per role, matching the Stitch admin/worker
 * sidebar patterns.
 */
export default function Sidebar({ title, subtitle, navItems, user, showEmergencySOS = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="hidden md:flex flex-col bg-surface-container-low border-r border-outline-variant fixed left-0 top-0 h-full w-64 z-40 py-lg px-md">
      <div className="mb-lg px-sm">
        <h1 className="font-headline-md text-headline-md font-bold text-primary">{title}</h1>
        {subtitle && <p className="font-status-badge text-status-badge text-on-surface-variant mt-xs">{subtitle}</p>}
      </div>

      {user && (
        <div className="flex flex-col items-center py-md border-b border-outline-variant mb-md px-sm">
          <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed text-headline-md font-headline-md mb-sm border-2 border-primary-container">
            {user.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <h2 className="font-label-md text-label-md text-primary text-center">{user.name}</h2>
          {user.badge}
        </div>
      )}

      <ul className="flex flex-col gap-xs flex-1 mt-md">
        {navItems.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.href}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-md px-md py-3 rounded-lg font-label-md text-label-md transition-all ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-bold"
                    : "text-on-surface-variant hover:bg-surface-variant/50"
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
        <button
          onClick={handleLogout}
          className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg font-label-md text-label-md transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </nav>
  );
}
