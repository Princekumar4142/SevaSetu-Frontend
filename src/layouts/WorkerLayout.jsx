import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../hooks/useAuth";
import Badge from "../components/Badge";

const NAV_ITEMS = [
  { label: "Dashboard", icon: "dashboard", href: "/worker", end: true },
  { label: "Active Bookings", icon: "work", href: "/worker/bookings" },
  { label: "Earnings", icon: "payments", href: "/worker/earnings" },
  { label: "Skills Training", icon: "school", href: "/worker/training" },
  { label: "Profile", icon: "person", href: "/worker/profile" },
];

export default function WorkerLayout() {
  const { currentUser } = useAuth();
  const badge = currentUser?.isVerified ? (
    <Badge tone="verified" icon="verified">Verified Worker</Badge>
  ) : (
    <Badge tone="pending" icon="hourglass_empty">Verification Pending</Badge>
  );

  return (
    <DashboardLayout
      title="SevaSetu"
      subtitle="Worker Portal"
      navItems={NAV_ITEMS}
      user={currentUser ? { name: currentUser.name, profilePhoto: currentUser.profilePhoto, badge } : null}
      showEmergencySOS={false}
    />
  );
}
