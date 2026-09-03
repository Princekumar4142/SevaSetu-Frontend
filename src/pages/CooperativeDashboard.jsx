import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cooperativeService from "../services/cooperativeService";
import workerService from "../services/workerService";
import { useAuth } from "../hooks/useAuth";
import { LoadingState, ErrorBanner } from "../components/Feedback";

export default function CooperativeDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [data, setData] = useState(null);
  const [pendingCount, setPendingCount] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      cooperativeService.getProfile(),
      workerService.getVerificationQueue("PENDING"),
    ])
      .then(([coopRes, pendingRes]) => {
        setData(coopRes.data);
        setPendingCount(pendingRes.data?.workers?.length ?? 0);
      })
      .catch((err) => setError(err.response?.data?.message || "Could not load cooperative data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState label="Loading cooperative overview…" />;
  if (error) return <ErrorBanner message={error} />;

  return (
    <div className="flex flex-col gap-lg">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary to-brand-purple rounded-2xl p-lg text-white">
        <p className="font-status-badge text-status-badge text-white/70 uppercase tracking-widest mb-xs">Cooperative Admin</p>
        <h1 className="font-headline-lg text-headline-lg mb-xs">{data.cooperative.name}</h1>
        <p className="font-body-md text-body-md text-white/80">
          Manage your cooperative's workers and verification queue.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-md">
        <StatCard
          label="Total Workers"
          value={data.totalWorkers}
          icon="engineering"
          color="text-primary"
          bgColor="bg-primary-container/50 border-primary/20"
        />
        <StatCard
          label="Verified Workers"
          value={data.verifiedWorkers}
          icon="verified"
          color="text-green-600"
          bgColor="bg-green-50 border-green-200"
        />
        <StatCard
          label="Pending Review"
          value={pendingCount ?? "—"}
          icon="hourglass_top"
          color="text-brand-orange"
          bgColor="bg-orange-50 border-orange-200"
          urgent={pendingCount > 0}
        />
      </div>

      {/* Welfare fund */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm">
        <div className="flex items-center gap-sm mb-sm">
          <span className="material-symbols-outlined text-brand-purple text-[22px]">savings</span>
          <h3 className="font-headline-md text-headline-md text-on-surface">Welfare Fund</h3>
        </div>
        <p className="text-3xl font-bold text-primary">₹{data.cooperative.welfareFundBalance}</p>
        <p className="font-status-badge text-status-badge text-on-surface-variant mt-xs">Current balance</p>
      </div>

      {/* Quick action — review workers */}
      {pendingCount > 0 && (
        <button
          onClick={() => navigate("/cooperative/verification")}
          className="flex items-center justify-between bg-orange-50 border-2 border-brand-orange rounded-2xl p-lg hover:bg-orange-100 transition-colors text-left group"
        >
          <div className="flex items-start gap-md">
            <span className="material-symbols-outlined text-brand-orange text-[28px] mt-0.5">pending_actions</span>
            <div>
              <h3 className="font-label-md text-label-md text-on-surface font-bold">
                {pendingCount} Worker{pendingCount !== 1 ? "s" : ""} Awaiting Approval
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Review their profiles and approve or reject their verification requests.
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-brand-orange text-[24px] group-hover:translate-x-1 transition-transform shrink-0">
            arrow_forward
          </span>
        </button>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color, bgColor, urgent }) {
  return (
    <div className={`relative bg-surface-container-lowest border rounded-2xl p-lg shadow-sm ${bgColor}`}>
      {urgent && <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-brand-orange animate-pulse" />}
      <span className={`material-symbols-outlined text-[24px] fill mb-sm ${color}`}>{icon}</span>
      <p className="text-3xl font-bold text-on-surface mb-xs">{value}</p>
      <p className="font-label-md text-label-md text-on-surface-variant">{label}</p>
    </div>
  );
}
