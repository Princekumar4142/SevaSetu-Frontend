import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPreferredWorker, selectPreferredWorkerId } from "../../store/slices/cartSlice";
import api from "../../services/api";

/**
 * WorkerPreviewSection
 * Shows verified workers available in the customer's city for a given service category.
 * Allows the customer to "prefer" a specific worker — this preference is sent with the booking.
 *
 * Props:
 *   city     {string} — from cart address (e.g., "Pune")
 *   category {string} — service category ID (e.g., "plumbing")
 *   compact  {boolean} — show in a 2-col horizontal scroll (for smaller spaces)
 */
export default function WorkerPreviewSection({ city, category, compact = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const preferredWorkerId = useSelector(selectPreferredWorkerId);

  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city && !category) return;
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (city) params.set("city", city);

    api
      .get(`/workers/verified?${params.toString()}`)
      .then((res) => {
        const list = res.data?.data?.workers || [];
        setWorkers(list.slice(0, 8)); // max 8 cards
      })
      .catch(() => setError("Could not load partners"))
      .finally(() => setLoading(false));
  }, [city, category]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-3 px-1">
        <span className="w-4 h-4 border-2 border-brand-purple border-t-transparent rounded-full animate-spin shrink-0" />
        <span className="text-xs text-on-surface-variant">Loading available partners in {city || "your area"}…</span>
      </div>
    );
  }

  if (error || workers.length === 0) return null;

  return (
    <div className="bg-white border border-outline-variant/80 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[16px]">verified</span>
          </span>
          <div>
            <h3 className="text-sm font-black text-on-surface leading-tight">
              Verified Partners Near You
            </h3>
            <p className="text-[11px] text-on-surface-variant">
              {workers.length} professionals in {city || "your area"} · Tap to prefer one
            </p>
          </div>
        </div>
        {preferredWorkerId && (
          <button
            type="button"
            onClick={() => dispatch(setPreferredWorker(null))}
            className="text-[10px] font-bold text-brand-orange bg-orange-50 border border-orange-200 px-2 py-1 rounded-lg hover:bg-orange-100 transition-colors"
          >
            Clear Pref
          </button>
        )}
      </div>

      {/* Worker Cards */}
      <div
        className={
          compact
            ? "flex gap-3 overflow-x-auto pb-1 scrollbar-hide"
            : "grid grid-cols-1 sm:grid-cols-2 gap-3"
        }
      >
        {workers.map((worker) => {
          const isPreferred = preferredWorkerId === worker._id;
          const isAvailable = worker.status === "AVAILABLE";

          return (
            <WorkerCard
              key={worker._id}
              worker={worker}
              isPreferred={isPreferred}
              isAvailable={isAvailable}
              compact={compact}
              onPrefer={() => dispatch(setPreferredWorker(worker._id))}
              onViewProfile={() => navigate(`/customer/workers/${worker._id}`)}
            />
          );
        })}
      </div>

      {/* Legend */}
      <p className="text-[10px] text-on-surface-variant text-center pt-1">
        <span className="material-symbols-outlined text-[12px] align-middle mr-0.5 text-emerald-600">info</span>
        Selecting a partner sends your request to them first — system auto-assigns if unavailable.
      </p>
    </div>
  );
}

function WorkerCard({ worker, isPreferred, isAvailable, compact, onPrefer, onViewProfile }) {
  const name = worker.user?.name || "Professional";
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const skills = (worker.skills || []).slice(0, 3);
  const rating = typeof worker.rating === "number" ? worker.rating.toFixed(1) : "4.9";
  const jobs = worker.totalJobs || 0;
  const exp = worker.experienceYears || 0;
  const cooperative = worker.cooperative?.name || "";

  return (
    <div
      className={`relative flex flex-col gap-3 rounded-2xl border p-4 transition-all duration-200 cursor-pointer select-none group ${
        compact ? "min-w-[210px] max-w-[230px]" : "w-full"
      } ${
        isPreferred
          ? "border-brand-purple bg-brand-purple-light shadow-md shadow-brand-purple/20 ring-2 ring-brand-purple ring-offset-1"
          : "border-outline-variant bg-white hover:border-brand-purple/50 hover:shadow-sm"
      }`}
      onClick={onPrefer}
    >
      {/* Preferred Badge */}
      {isPreferred && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand-purple text-white text-[9px] font-black px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-sm tracking-wider uppercase">
          ✓ Your Preferred Partner
        </div>
      )}

      {/* Top Row: Avatar + Status + Availability */}
      <div className="flex items-start gap-3">
        {worker.user?.profilePhoto ? (
          <img
            src={worker.user.profilePhoto}
            alt={name}
            className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-white shadow"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-brand-purple flex items-center justify-center text-white font-black text-sm shrink-0 shadow">
            {initials}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="text-sm font-black text-on-surface truncate">{name}</p>
            <span
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide shrink-0 ${
                isAvailable
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}
              />
              {isAvailable ? "Available" : "Busy"}
            </span>
          </div>

          {/* Cooperative */}
          {cooperative && (
            <p className="text-[10px] text-brand-purple font-semibold mt-0.5 truncate">
              🏢 {cooperative}
            </p>
          )}

          {/* Stats Row */}
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-0.5 text-[11px] text-amber-600 font-bold">
              <span className="material-symbols-outlined text-[12px] fill">star</span>
              {rating}
            </span>
            <span className="text-[10px] text-on-surface-variant">{jobs} jobs</span>
            {exp > 0 && (
              <span className="text-[10px] text-on-surface-variant">{exp}yr exp</span>
            )}
          </div>
        </div>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewProfile();
          }}
          className="flex-1 text-[11px] font-bold text-brand-purple border border-brand-purple/30 bg-brand-purple-light hover:bg-brand-purple hover:text-white rounded-xl py-1.5 transition-all"
        >
          View Profile
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrefer();
          }}
          className={`flex-1 text-[11px] font-bold rounded-xl py-1.5 transition-all ${
            isPreferred
              ? "bg-brand-purple text-white border border-brand-purple"
              : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-brand-purple/40 hover:bg-brand-purple-light hover:text-brand-purple"
          }`}
        >
          {isPreferred ? "✓ Preferred" : "Prefer"}
        </button>
      </div>
    </div>
  );
}
