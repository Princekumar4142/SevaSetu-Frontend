import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../hooks/useAuth";

const NAV_ITEMS = [
  { label: "Command Center", icon: "dashboard", href: "/federation", end: true },
  { label: "Cooperatives", icon: "add_business", href: "/federation/cooperatives" },
  { label: "Workforce", icon: "group", href: "/federation/workforce" },
  { label: "Analytics", icon: "monitoring", href: "/federation/analytics" },
];

export default function FederationLayout() {
  const { currentUser } = useAuth();
  return (
    <DashboardLayout
      title="Federation Portal"
      subtitle="Federation Level"
      navItems={NAV_ITEMS}
      user={currentUser ? { name: currentUser.name } : null}
      showEmergencySOS
    />
  );
}
