import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROLE_HOME } from "../constants/roles";

/**
 * Guards a subtree of routes:
 *  - Unauthenticated users are redirected to /login.
 *  - Authenticated users whose role isn't in `allowedRoles` are redirected
 *    to their own dashboard rather than seeing another role's UI.
 * Backend routes independently re-check the JWT + role — this is a UX
 * convenience, not the security boundary (Phase 1 Spec §9).
 */
export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, role, booting } = useAuth();

  if (booting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="font-body-md text-body-md text-on-surface-variant">Loading your session…</p>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={ROLE_HOME[role] || "/"} replace />;
  }

  return <Outlet />;
}
