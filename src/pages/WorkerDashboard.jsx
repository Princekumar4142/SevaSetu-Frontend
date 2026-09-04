import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import workerService from "../services/workerService";
import { LoadingState, ErrorBanner } from "../components/Feedback";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import IncomingOrderModal from "../components/IncomingOrderModal";

const STEPS = [
  { key: "registered", label: "Registered", icon: "how_to_reg", desc: "Account created successfully" },
  { key: "pending", label: "Under Review", icon: "manage_search", desc: "Admin is reviewing your profile" },
  { key: "approved", label: "Approved", icon: "verified", desc: "Profile approved by admin" },
  { key: "visible", label: "Visible to Customers", icon: "people", desc: "Customers can book you now" },
];

function getStepIndex(status) {
  if (status === "VERIFIED") return 3;
  if (status === "REJECTED") return 1; // stays at step 1 with error state
  return 1; // PENDING
}

export default function WorkerDashboard() {
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    workerService
      .getProfile()
      .then((res) => setWorker(res.data.worker))
      .catch((err) => setError(err.response?.data?.message || "Could not load your worker profile"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState label="Loading your dashboard…" />;
  if (error) return <ErrorBanner message={error} />;

  const stepIndex = getStepIndex(worker?.verificationStatus);
  const isVerified = worker?.verificationStatus === "VERIFIED";
  const isRejected = worker?.verificationStatus === "REJECTED";
  const isPending = worker?.verificationStatus === "PENDING";

  return (
    <div className="flex flex-col gap-6">
      {/* Real-time incoming order notification popup */}
      <IncomingOrderModal />

      {/* ── Top Worker Profile Card ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar src={worker?.user?.profilePhoto} name={worker?.user?.name} size="2xl" className="shadow-md" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-slate-900">{worker?.user?.name || "Worker Partner"}</h2>
              <Badge tone={isVerified ? "verified" : isRejected ? "rejected" : "pending"}>
                {worker?.verificationStatus || "PENDING"}
              </Badge>
            </div>
            <p className="text-xs font-semibold text-brand-purple mt-0.5 uppercase tracking-wider">
              {worker?.serviceCategory?.replace(/-/g, " ") || "SKILLED SERVICE PROFESSIONAL"} · {worker?.city || "Pune"}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Phone: {worker?.user?.phone} · Email: {worker?.user?.email || "—"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("simulate_incoming_order"))}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-md hover:opacity-95 transition-all cursor-pointer animate-pulse"
            title="Click to preview Rapido-style incoming booking call alert with ringtone"
          >
            <span className="material-symbols-outlined text-[16px] text-amber-300">ring_volume</span>
            Test Rapido Call Alert (30s)
          </button>
          <button
            onClick={() => navigate("/worker/profile")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all border border-slate-200 shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-brand-purple">edit</span>
            Edit Profile &amp; Photo
          </button>
        </div>
      </div>

      {/* ── Status Banner (Clean Light Theme) ── */}
      <div
        className={`rounded-2xl p-6 border shadow-sm transition-all ${
          isVerified
            ? "bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-50 border-emerald-200 text-emerald-950"
            : isRejected
            ? "bg-gradient-to-r from-rose-50 via-red-50/50 to-orange-50/50 border-rose-200 text-rose-950"
            : "bg-gradient-to-r from-amber-50 via-orange-50/40 to-indigo-50/40 border-amber-200/90 text-amber-950"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
              isVerified
                ? "bg-emerald-100 text-emerald-700"
                : isRejected
                ? "bg-rose-100 text-rose-700"
                : "bg-amber-100 text-amber-800 border border-amber-200"
            }`}
          >
            <span className="material-symbols-outlined text-2xl fill">
              {isVerified ? "verified" : isRejected ? "gpp_bad" : "hourglass_top"}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-black tracking-tight">
                {isVerified
                  ? "You're verified and ready!"
                  : isRejected
                  ? "Profile Needs Updates"
                  : "Verification in Progress"}
              </h2>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                isVerified ? "bg-emerald-200/80 text-emerald-900" : isRejected ? "bg-rose-200/80 text-rose-900" : "bg-amber-200/90 text-amber-950 border border-amber-300"
              }`}>
                {isVerified ? "Live Profile" : isRejected ? "Action Required" : "Under Admin Review"}
              </span>
            </div>

            <p className="text-xs font-medium mt-1 leading-relaxed opacity-90 max-w-2xl">
              {isVerified
                ? "Customers can now see your profile and book your services. Keep your profile updated to get more bookings!"
                : isRejected
                ? `Rejection reason: ${worker?.rejectionReason || "Please review your profile details and resubmit."}`
                : "Your profile is under review by cooperative admins. Once approved by an admin, you'll appear in customer search results automatically."}
            </p>

            {!isVerified && (
              <button
                onClick={() => navigate("/worker/profile")}
                className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-200/70 hover:bg-amber-200 text-amber-950 font-extrabold text-xs transition-all border border-amber-300/80 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">edit</span>
                Update Profile Details
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Approval Flow Steps ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
          Your Approval Journey
        </h3>
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-slate-200" />
          <div
            className="absolute left-5 top-5 w-0.5 bg-brand-purple transition-all duration-700"
            style={{ height: `${(stepIndex / (STEPS.length - 1)) * 100}%` }}
          />

          <div className="flex flex-col gap-6 relative">
            {STEPS.map((step, i) => {
              const isDone = i < stepIndex;
              const isCurrent = i === stepIndex && !isRejected;
              const isRejectedStep = i === 1 && isRejected;

              return (
                <div key={step.key} className="flex items-start gap-4">
                  {/* Circle */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 z-10 transition-all ${
                    isRejectedStep
                      ? "bg-rose-600 border-rose-600 shadow-sm"
                      : isDone
                      ? "bg-brand-purple border-brand-purple shadow-sm"
                      : isCurrent
                      ? "bg-white border-brand-purple shadow-md ring-4 ring-purple-100"
                      : "bg-white border-slate-300"
                  }`}>
                    <span className={`material-symbols-outlined text-[18px] ${
                      isRejectedStep ? "text-white fill" : isDone ? "text-white fill" : isCurrent ? "text-brand-purple" : "text-slate-400"
                    }`}>
                      {isRejectedStep ? "cancel" : isDone ? "check_circle" : step.icon}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="pt-1 min-w-0">
                    <p className={`text-sm font-bold ${
                      isRejectedStep ? "text-rose-600" : isDone || isCurrent ? "text-slate-900" : "text-slate-400"
                    }`}>
                      {step.label}
                      {isCurrent && !isRejected && (
                        <span className="ml-2 text-[10px] bg-brand-purple text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Current
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isRejectedStep ? (worker?.rejectionReason || "Profile needs correction") : step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification Status Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-purple text-[22px]">verified_user</span>
            Verification Status
          </h3>
          <Badge
            tone={isVerified ? "verified" : isRejected ? "rejected" : "pending"}
            icon={isVerified ? "verified" : isRejected ? "cancel" : "hourglass_empty"}
          >
            {worker?.verificationStatus}
          </Badge>
          {isPending && (
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Your cooperative admin will review your documents and skills. Verification usually takes 24–48 hours.
            </p>
          )}
          {isVerified && worker?.verifiedAt && (
            <p className="text-xs text-slate-500 mt-3">
              Verified on {new Date(worker.verifiedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}
        </div>

        {/* Earnings Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-purple text-[22px]">payments</span>
            Earnings
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-xl font-black text-slate-900">₹{worker?.earnings?.gross || 0}</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">Gross</p>
            </div>
            <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-100">
              <p className="text-xl font-black text-brand-purple">₹{worker?.earnings?.net || 0}</p>
              <p className="text-[11px] font-bold text-brand-purple uppercase mt-0.5">Net</p>
            </div>
            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-100">
              <p className="text-xl font-black text-amber-700">₹{worker?.earnings?.welfareContribution || 0}</p>
              <p className="text-[11px] font-bold text-amber-700 uppercase mt-0.5">Welfare</p>
            </div>
          </div>
        </div>

        {/* Skill Passport */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-purple text-[22px]">workspace_premium</span>
              Skill Passport
            </h3>
            <button
              onClick={() => navigate("/worker/profile")}
              className="flex items-center gap-1 text-xs font-bold text-brand-purple hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Edit Skills
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(!worker?.skills || worker.skills.length === 0) && (
              <p className="text-xs text-slate-500">
                No skills added yet.{" "}
                <button onClick={() => navigate("/worker/profile")} className="text-brand-purple font-bold hover:underline">
                  Add skills to your profile →
                </button>
              </p>
            )}
            {(worker?.skills || []).map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 rounded-xl border border-purple-200 text-xs font-bold text-brand-purple"
              >
                <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
                <span className="capitalize">{skill.replace(/_/g, " ")}</span>
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
            Skill level: <strong className="text-slate-800">{worker?.skillLevel || "Level 1"}</strong> · {worker?.experienceYears || 0} years experience
          </p>
        </div>
      </div>

      {/* Fair Work Allocation notice */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50/50 to-indigo-50 border border-indigo-200/80 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">handshake</span>
        </div>
        <div>
          <h4 className="text-xs font-bold text-indigo-950 mb-0.5">Fair Work Allocation</h4>
          <p className="text-xs text-indigo-900/80 leading-relaxed">
            Job matching and the fair-allocation engine arrive in Phase 2. Your account and cooperative membership are already set up and ready.
          </p>
        </div>
      </div>
    </div>
  );
}
