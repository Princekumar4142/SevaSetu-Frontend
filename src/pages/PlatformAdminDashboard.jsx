import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import workerService from "../services/workerService";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../context/LanguageContext";

export default function PlatformAdminDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { tr } = useLanguage();
  const [pendingCount, setPendingCount] = useState(null);
  const [verifiedCount, setVerifiedCount] = useState(null);
  const [rejectedCount, setRejectedCount] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [pending, verified, rejected] = await Promise.all([
          workerService.getVerificationQueue("PENDING"),
          workerService.getVerificationQueue("VERIFIED"),
          workerService.getVerificationQueue("REJECTED"),
        ]);
        setPendingCount(pending.data?.workers?.length ?? 0);
        setVerifiedCount(verified.data?.workers?.length ?? 0);
        setRejectedCount(rejected.data?.workers?.length ?? 0);
      } catch {
        setPendingCount(0); setVerifiedCount(0); setRejectedCount(0);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="flex flex-col gap-lg">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary to-brand-purple rounded-2xl p-lg text-white">
        <p className="font-status-badge text-status-badge text-white/70 uppercase tracking-widest mb-xs">{tr("Platform Admin")}</p>
        <h1 className="font-headline-lg text-headline-lg mb-xs">{tr("Welcome back")}, {currentUser?.name?.split(" ")[0] || tr("Admin")} 👋</h1>
        <p className="font-body-md text-body-md text-white/80">
          {tr("Manage workers, users, and the platform from your control center.")}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
        <StatCard
          label={tr("Pending Review")}
          value={loadingStats ? "—" : pendingCount}
          icon="hourglass_top"
          color="text-brand-orange"
          bgColor="bg-orange-50 border-orange-200"
          onClick={() => navigate("/admin/workers?status=PENDING")}
          urgent={pendingCount > 0}
        />
        <StatCard
          label={tr("Verified Workers")}
          value={loadingStats ? "—" : verifiedCount}
          icon="verified"
          color="text-green-600"
          bgColor="bg-green-50 border-green-200"
          onClick={() => navigate("/admin/workers?status=VERIFIED")}
        />
        <StatCard
          label={tr("Rejected")}
          value={loadingStats ? "—" : rejectedCount}
          icon="cancel"
          color="text-error"
          bgColor="bg-red-50 border-red-200"
          onClick={() => navigate("/admin/workers?status=REJECTED")}
        />
        <StatCard
          label={tr("Total Workers")}
          value={loadingStats ? "—" : (pendingCount ?? 0) + (verifiedCount ?? 0) + (rejectedCount ?? 0)}
          icon="engineering"
          color="text-primary"
          bgColor="bg-primary-container/50 border-primary/20"
          onClick={() => navigate("/admin/workers")}
        />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-sm">
          <span className="material-symbols-outlined text-brand-purple text-[22px]">bolt</span>
          {tr("Quick Actions")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
          <ActionCard
            icon="fact_check"
            title={tr("Review Pending Workers")}
            desc={`${loadingStats ? "..." : pendingCount} ${tr("workers awaiting approval")}`}
            accent="bg-orange-500"
            onClick={() => navigate("/admin/workers")}
            badge={pendingCount > 0 ? pendingCount : null}
            goText={tr("Go")}
          />
          <ActionCard
            icon="group"
            title={tr("Manage Users")}
            desc={tr("View and manage all platform users")}
            accent="bg-primary"
            onClick={() => navigate("/admin/users")}
            goText={tr("Go")}
          />
          <ActionCard
            icon="add_business"
            title={tr("Cooperatives")}
            desc={tr("Onboard and manage cooperatives")}
            accent="bg-brand-purple"
            onClick={() => navigate("/admin/cooperatives")}
            goText={tr("Go")}
          />
        </div>
      </div>

      {/* Info note */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg flex items-start gap-md">
        <span className="material-symbols-outlined text-primary mt-0.5">info</span>
        <div>
          <h4 className="font-label-md text-label-md text-on-surface mb-xs">{tr("Phase 1 Active")}</h4>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {tr("Full platform management — user administration, fraud detection, and analytics — are built in later phases. Your PLATFORM_ADMIN role and full-access permissions are already active.")}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, bgColor, onClick, urgent }) {
  return (
    <button
      onClick={onClick}
      className={`relative bg-surface-container-lowest border rounded-2xl p-lg shadow-sm text-left hover:shadow-md transition-all group ${
        urgent ? "ring-2 ring-brand-orange ring-offset-2" : ""
      } ${bgColor}`}
    >
      {urgent && (
        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
      )}
      <span className={`material-symbols-outlined text-[28px] fill mb-md ${color}`}>{icon}</span>
      <p className="text-3xl font-bold text-on-surface mb-xs">{value}</p>
      <p className="font-label-md text-label-md text-on-surface-variant">{label}</p>
      <span className="absolute bottom-3 right-3 material-symbols-outlined text-[16px] text-outline-variant group-hover:text-primary transition-colors">arrow_forward</span>
    </button>
  );
}

function ActionCard({ icon, title, desc, accent, onClick, badge, goText = "Go" }) {
  return (
    <button
      onClick={onClick}
      className="relative bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm text-left hover:shadow-md transition-all group overflow-hidden"
    >
      {/* Accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${accent}`} />

      <div className={`w-10 h-10 rounded-xl ${accent} flex items-center justify-center mb-md`}>
        <span className="material-symbols-outlined text-white text-[20px]">{icon}</span>
      </div>

      {badge != null && badge > 0 && (
        <span className="absolute top-4 right-4 bg-brand-orange text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
          {badge > 99 ? "99+" : badge}
        </span>
      )}

      <h3 className="font-label-md text-label-md text-on-surface font-bold mb-xs">{title}</h3>
      <p className="font-status-badge text-status-badge text-on-surface-variant">{desc}</p>

      <div className="flex items-center gap-xs mt-md font-label-md text-label-md text-primary group-hover:gap-sm transition-all">
        {goText} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
      </div>
    </button>
  );
}
