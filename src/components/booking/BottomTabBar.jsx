import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const TABS = [
  { key: "uc", label: "Home", icon: "storefront", paths: ["/", "/customer", "/customer/services"] },
  { key: "bookings", label: "Bookings", icon: "receipt_long", paths: ["/customer/bookings"] },
  { key: "workers", label: "Workers", icon: "engineering", paths: ["/customer/workers"] },
  { key: "plus", label: "Plus", icon: "diamond", paths: ["/customer/plus"] },
  { key: "account", label: "Account", icon: "person", paths: ["/customer/profile"] },
];

export default function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isActive = (tab) =>
    tab.paths.some((p) => location.pathname === p || location.pathname.startsWith(p + "/"));

  const handleClick = (tab) => {
    if (tab.key === "uc") navigate(isAuthenticated ? "/customer" : "/");
    else if (tab.key === "bookings") navigate("/customer/bookings");
    else if (tab.key === "workers") navigate(isAuthenticated ? "/customer/workers" : "/login");
    else if (tab.key === "plus") navigate(isAuthenticated ? "/customer/plus" : "/customer/plus");
    else if (tab.key === "account") navigate(isAuthenticated ? "/customer/profile" : "/login");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-outline-variant flex items-stretch justify-around px-xs pt-2 pb-safe pb-3 z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
      {TABS.map((tab) => {
        const active = isActive(tab);
        return (
          <button
            type="button"
            key={tab.key}
            onClick={() => handleClick(tab)}
            className="flex flex-col items-center gap-0.5 flex-1 py-1 relative"
          >
            {active && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-purple rounded-full" />
            )}
            <span className={`material-symbols-outlined text-[22px] transition-colors ${active ? "fill text-brand-purple" : "text-on-surface-variant"}`}>
              {tab.icon}
            </span>
            <span className={`font-status-badge text-status-badge transition-colors ${active ? "text-brand-purple font-bold" : "text-on-surface-variant"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
