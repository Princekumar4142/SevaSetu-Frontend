import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../hooks/useAuth";

const NAV_ITEMS = [
  { label: "Dashboard", icon: "dashboard", href: "/cooperative", end: true },
  { label: "Workers", icon: "group", href: "/cooperative/workers" },
  { label: "Verification Queue", icon: "verified_user", href: "/cooperative/verification" },
  { label: "Jobs", icon: "work", href: "/cooperative/jobs" },
];

export default function CooperativeLayout() {
  const { currentUser } = useAuth();
  return (
    <DashboardLayout
      title="Cooperative Portal"
      subtitle="Cooperative Admin"
      navItems={NAV_ITEMS}
      user={currentUser ? { name: currentUser.name } : null}
      showEmergencySOS
    />
  );
}
