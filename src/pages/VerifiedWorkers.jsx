import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import workerService from "../services/workerService";
import Badge from "../components/Badge";
import { LoadingState, ErrorBanner } from "../components/Feedback";

export default function VerifiedWorkers() {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async (value = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await workerService.getVerifiedWorkers({ search: value });
      setWorkers(res.data.workers || []);
    } catch (e) {
      setError(e.response?.data?.message || "Could not load verified workers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero header */}
      <div className="bg-gradient-to-r from-primary to-brand-purple px-margin-mobile md:px-margin-desktop py-xl">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <button
              type="button"
              onClick={() => {
                if (window.history.length > 1) navigate(-1);
                else navigate("/customer");
              }}
              className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 active:bg-white/40 flex items-center justify-center text-white transition-colors shrink-0"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <p className="font-status-badge text-status-badge text-secondary-fixed uppercase tracking-widest">Trusted Network</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-md">Verified Workers</h1>
          <p className="font-body-md text-body-md text-white/80 max-w-lg mb-lg">
            Only professionals approved by our admin team are shown here. Every worker is background-verified.
          </p>

          {/* Search */}
          <div className="flex gap-sm max-w-2xl bg-white/10 backdrop-blur-md rounded-xl p-sm border border-white/20">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/60 text-[20px]">search</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && load(search)}
                placeholder="Search name, skill or city…"
                className="w-full pl-xl pr-md py-sm rounded-lg bg-white/10 text-white placeholder-white/50 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button
              onClick={() => load(search)}
              className="px-lg rounded-lg bg-white text-brand-purple font-label-md text-label-md font-bold hover:bg-surface-container-low transition-colors shrink-0"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-margin-mobile md:px-margin-desktop py-lg">
        <ErrorBanner message={error} />

        {loading ? (
          <LoadingState label="Finding verified workers…" />
        ) : workers.length === 0 ? (
          <div className="py-2xl text-center bg-surface-container-lowest border border-outline-variant rounded-2xl mt-lg">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant">person_search</span>
            <h3 className="font-headline-md text-headline-md mt-md text-on-surface">No verified workers found</h3>
            <p className="text-on-surface-variant mt-xs font-body-md text-body-md">Try another name, skill or city.</p>
          </div>
        ) : (
          <>
            <p className="font-label-md text-label-md text-on-surface-variant mb-lg">
              {workers.length} verified worker{workers.length !== 1 ? "s" : ""} available
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-lg">
              {workers.map((w) => (
                <WorkerCard key={w._id} worker={w} onView={() => navigate(`/customer/workers/${w._id}`)} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function WorkerCard({ worker, onView }) {
  const statusColors = {
    AVAILABLE: "bg-green-100 text-green-700",
    BUSY: "bg-orange-100 text-orange-700",
    OFFLINE: "bg-gray-100 text-gray-500",
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      {/* Gradient top strip */}
      <div className="h-2 bg-gradient-to-r from-brand-purple to-primary" />

      <div className="p-lg">
        {/* Header */}
        <div className="flex items-start gap-md mb-md">
          <div className="w-14 h-14 rounded-full bg-primary-container border-2 border-outline-variant flex items-center justify-center overflow-hidden shrink-0">
            {worker.user?.profilePhoto ? (
              <img src={worker.user.profilePhoto} className="w-full h-full object-cover" alt={worker.user.name} />
            ) : (
              <span className="material-symbols-outlined text-primary text-2xl">person</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-label-md text-label-md font-bold text-on-surface truncate">{worker.user?.name}</h3>
            <p className="text-sm text-on-surface-variant">
              {worker.city || "Location not listed"}
            </p>
            <div className="flex items-center gap-xs mt-xs">
              {worker.status && (
                <span className={`text-xs font-bold px-xs py-0.5 rounded-full ${statusColors[worker.status] || statusColors.OFFLINE}`}>
                  {worker.status}
                </span>
              )}
            </div>
          </div>
          <div className="shrink-0">
            <Badge tone="verified" icon="verified">Verified</Badge>
          </div>
        </div>

        {/* Rating + jobs */}
        <div className="flex items-center gap-md mb-md">
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-brand-orange text-[16px] fill">star</span>
            <span className="font-label-md text-label-md text-on-surface">{Number(worker.rating || 5).toFixed(1)}</span>
          </div>
          <span className="text-outline-variant">·</span>
          <span className="font-status-badge text-status-badge text-on-surface-variant">{worker.totalJobs || 0} jobs completed</span>
          <span className="text-outline-variant">·</span>
          <span className="font-status-badge text-status-badge text-on-surface-variant">{worker.experienceYears || 0} yrs exp</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-xs mb-lg">
          {(worker.skills || []).slice(0, 3).map((s) => (
            <span key={s} className="text-xs px-sm py-0.5 rounded-full bg-brand-purple-light text-brand-purple capitalize font-medium">
              {s.replaceAll("_", " ")}
            </span>
          ))}
          {(worker.skills || []).length > 3 && (
            <span className="text-xs px-sm py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">
              +{worker.skills.length - 3} more
            </span>
          )}
        </div>

        {/* Cooperative */}
        {worker.cooperative?.name && (
          <p className="flex items-center gap-xs text-xs text-on-surface-variant mb-md">
            <span className="material-symbols-outlined text-[14px]">corporate_fare</span>
            {worker.cooperative.name}
          </p>
        )}

        {/* Action */}
        <button
          onClick={onView}
          className="w-full flex items-center justify-center gap-xs py-sm rounded-xl border-2 border-brand-purple text-brand-purple font-label-md text-label-md font-bold hover:bg-brand-purple hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">person</span>
          View Full Profile
        </button>
      </div>
    </div>
  );
}
