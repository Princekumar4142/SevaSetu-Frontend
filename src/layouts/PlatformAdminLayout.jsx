import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../hooks/useAuth";

const NAV_ITEMS = [
  { label: "Overview", icon: "dashboard", href: "/admin", end: true },
  { label: "Users", icon: "group", href: "/admin/users" },
  { label: "Workers", icon: "engineering", href: "/admin/workers" },
  { label: "Cooperatives", icon: "add_business", href: "/admin/cooperatives" },
  { label: "My Profile", icon: "person", href: "/admin/profile" },
];

export default function PlatformAdminLayout() {
  const { currentUser } = useAuth();
  return (
    <DashboardLayout
      title="Admin Portal"
      subtitle="Platform Level"
      navItems={NAV_ITEMS}
      user={currentUser ? { name: currentUser.name } : null}
      showEmergencySOS
    />
  );
}
