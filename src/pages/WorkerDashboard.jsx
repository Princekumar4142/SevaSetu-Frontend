import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import workerService from "../services/workerService";
import { LoadingState, ErrorBanner } from "../components/Feedback";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import { useLanguage } from "../context/LanguageContext";

const RAW_STEPS = [
  { key: "registered", labelKey: "Registered", icon: "how_to_reg", descKey: "Account created successfully" },
  { key: "pending", labelKey: "Under Review", icon: "manage_search", descKey: "Admin is reviewing your profile" },
  { key: "approved", labelKey: "Approved", icon: "verified", descKey: "Profile approved by admin" },
  { key: "visible", labelKey: "Visible to Customers", icon: "people", descKey: "Customers can book you now" },
];

function getStepIndex(status) {
  if (status === "VERIFIED") return 3;
  if (status === "REJECTED") return 1; // stays at step 1 with error state
  return 1; // PENDING
}

export default function WorkerDashboard() {
  const navigate = useNavigate();
  const { tr } = useLanguage();
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

  if (loading) return <LoadingState label={tr("Loading your dashboard…") || "Loading your dashboard…"} />;
  if (error) return <ErrorBanner message={error} />;

  const STEPS = RAW_STEPS.map((s) => ({
    key: s.key,
    label: tr(s.labelKey),
    icon: s.icon,
    desc: tr(s.descKey),
  }));

  const stepIndex = getStepIndex(worker?.verificationStatus);
  const isVerified = worker?.verificationStatus === "VERIFIED";
  const isRejected = worker?.verificationStatus === "REJECTED";
  const isPending = worker?.verificationStatus === "PENDING";

  return (
    <div className="flex flex-col gap-5">
      {/* ── Top Back Navigation Row ── */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) navigate(-1);
            else navigate("/");
          }}
          className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:bg-slate-50 active:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors shrink-0"
          aria-label="Back"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{tr("Worker Portal")}</span>
      </div>

      {/* ── Top Worker Profile Card ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar src={worker?.user?.profilePhoto} name={worker?.user?.name} size="2xl" className="shadow-md" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-slate-900">{worker?.user?.name || "Worker Partner"}</h2>
              <Badge tone={isVerified ? "verified" : isRejected ? "rejected" : "pending"}>
                {tr(worker?.verificationStatus || "PENDING")}
              </Badge>
            </div>
            <p className="text-xs font-semibold text-brand-purple mt-0.5 uppercase tracking-wider">
              {tr(worker?.serviceCategory?.replace(/-/g, " ") || "SKILLED SERVICE PROFESSIONAL")} · {worker?.city || "Pune"}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Phone: {worker?.user?.phone} · Email: {worker?.user?.email || "—"}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/worker/profile")}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all border border-slate-200 shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] text-brand-purple">edit</span>
          {tr("Edit Profile & Photo")}
        </button>
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
                  ? tr("You're verified and ready!")
                  : isRejected
                  ? tr("Profile Needs Updates")
                  : tr("Verification in Progress")}
              </h2>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                isVerified ? "bg-emerald-200/80 text-emerald-900" : isRejected ? "bg-rose-200/80 text-rose-900" : "bg-amber-200/90 text-amber-950 border border-amber-300"
              }`}>
                {isVerified ? tr("Live Profile") : isRejected ? tr("Action Required") : tr("Under Admin Review")}
              </span>
            </div>

            <p className="text-xs font-medium mt-1 leading-relaxed opacity-90 max-w-2xl">
              {isVerified
                ? tr("Customers can now see your profile and book your services. Keep your profile updated to get more bookings!")
                : isRejected
                ? `${tr("Rejection reason")}: ${worker?.rejectionReason || tr("Please review your profile details and resubmit.")}`
                : tr("Your profile is under review by cooperative admins. Once approved by an admin, you'll appear in customer search results automatically.")}
            </p>

            {!isVerified && (
              <button
                onClick={() => navigate("/worker/profile")}
                className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-200/70 hover:bg-amber-200 text-amber-950 font-extrabold text-xs transition-all border border-amber-300/80 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">edit</span>
                {tr("Update Profile Details")}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Approval Flow Steps ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-sm">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
          {tr("Your Approval Journey")}
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
                          {tr("Current")}
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
            {tr("Verification Status")}
          </h3>
          <Badge
            tone={isVerified ? "verified" : isRejected ? "rejected" : "pending"}
            icon={isVerified ? "verified" : isRejected ? "cancel" : "hourglass_empty"}
          >
            {tr(worker?.verificationStatus)}
          </Badge>
          {isPending && (
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              {tr("Your cooperative admin will review your documents and skills. Verification usually takes 24–48 hours.") || "Your cooperative admin will review your documents and skills. Verification usually takes 24–48 hours."}
            </p>
          )}
          {isVerified && worker?.verifiedAt && (
            <p className="text-xs text-slate-500 mt-3">
              {tr("Verified on")} {new Date(worker.verifiedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}
        </div>

        {/* Earnings Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-purple text-[22px]">payments</span>
            {tr("Earnings")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-lg sm:text-xl font-black text-slate-900">₹{worker?.earnings?.gross || 0}</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">{tr("Gross") || "Gross"}</p>
            </div>
            <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-100">
              <p className="text-lg sm:text-xl font-black text-brand-purple">₹{worker?.earnings?.net || 0}</p>
              <p className="text-[11px] font-bold text-brand-purple uppercase mt-0.5">{tr("Net") || "Net"}</p>
            </div>
            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-100">
              <p className="text-lg sm:text-xl font-black text-amber-700">₹{worker?.earnings?.welfareContribution || 0}</p>
              <p className="text-[11px] font-bold text-amber-700 uppercase mt-0.5">{tr("Welfare") || "Welfare"}</p>
            </div>
          </div>
        </div>

        {/* Skill Passport */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-purple text-[22px]">workspace_premium</span>
              {tr("Skill Passport")}
            </h3>
            <button
              onClick={() => navigate("/worker/profile")}
              className="flex items-center gap-1 text-xs font-bold text-brand-purple hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              {tr("Edit Skills")}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(!worker?.skills || worker.skills.length === 0) && (
              <p className="text-xs text-slate-500">
                {tr("No skills added yet.")}{" "}
                <button onClick={() => navigate("/worker/profile")} className="text-brand-purple font-bold hover:underline">
                  {tr("Add skills to your profile →")}
                </button>
              </p>
            )}
            {(worker?.skills || []).map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 rounded-xl border border-purple-200 text-xs font-bold text-brand-purple"
              >
                <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
                <span className="capitalize">{tr(skill.replace(/_/g, " "))}</span>
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
            {tr("Skill level")}: <strong className="text-slate-800">{worker?.skillLevel || "Level 1"}</strong> · {worker?.experienceYears || 0} {tr("years experience")}
          </p>
        </div>
      </div>

      {/* ── Cooperative Digital Worker ID & Social Security Card ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Digital ID Card */}
        <div className="lg:col-span-7 bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
          {/* Subtle watermark background */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-8 translate-y-8">
            <span className="material-symbols-outlined text-[160px]">diversity_3</span>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-white/15">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/30 border border-emerald-400/50 flex items-center justify-center text-emerald-300">
                <span className="material-symbols-outlined text-[18px]">badge</span>
              </span>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-300">
                  {tr("सहकारी श्रमिक पहचान पत्र · Digital Worker ID")}
                </h4>
                <p className="text-[10px] text-white/70">{tr("Labour Cooperative Federation of India")}</p>
              </div>
            </div>
            <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
              {tr("Verified Member")}
            </span>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-bold uppercase text-white/50 block">{tr("Worker Name")}</span>
                <span className="text-lg font-black text-white">{worker?.user?.name || "Cooperative Partner"}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-left">
                <div>
                  <span className="text-[10px] font-bold uppercase text-white/50 block">{tr("Member ID")}</span>
                  <span className="text-xs font-mono font-bold text-emerald-300">
                    COOP-BR-{worker?._id?.slice(-6).toUpperCase() || "845438"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-white/50 block">{tr("Skill Certification")}</span>
                  <span className="text-xs font-bold text-white">Skill India / PMKVY</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-white/50 block">{tr("Affiliated Cooperative")}</span>
                <span className="text-xs font-semibold text-white/90">
                  {tr("Bettiah Primary Agricultural Credit Society (PACS)")}
                </span>
              </div>
            </div>

            {/* QR Code Simulation */}
            <div className="bg-white p-2.5 rounded-2xl shadow-md text-center shrink-0">
              <div className="w-24 h-24 bg-slate-900 rounded-lg flex flex-col items-center justify-center text-white p-1 relative overflow-hidden">
                {/* QR pattern graphic simulation */}
                <div className="grid grid-cols-4 gap-1 w-full h-full p-1 opacity-90">
                  <div className="bg-white rounded-xs" />
                  <div className="bg-emerald-400 rounded-xs" />
                  <div className="bg-white rounded-xs" />
                  <div className="bg-white rounded-xs" />
                  <div className="bg-white rounded-xs" />
                  <div className="bg-slate-900 rounded-xs" />
                  <div className="bg-white rounded-xs" />
                  <div className="bg-emerald-400 rounded-xs" />
                  <div className="bg-emerald-400 rounded-xs" />
                  <div className="bg-white rounded-xs" />
                  <div className="bg-slate-900 rounded-xs" />
                  <div className="bg-white rounded-xs" />
                  <div className="bg-white rounded-xs" />
                  <div className="bg-emerald-400 rounded-xs" />
                  <div className="bg-white rounded-xs" />
                  <div className="bg-white rounded-xs" />
                </div>
              </div>
              <span className="text-[9px] font-bold text-slate-600 block mt-1">{tr("Scan to Verify")}</span>
            </div>
          </div>
        </div>

        {/* Social Security & Insurance Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-xl">health_and_safety</span>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  {tr("Social Security & Welfare")}
                </h4>
              </div>
              <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {tr("Active Cover")}
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{tr("PMSBY Accidental Insurance")}</h5>
                  <p className="text-[10px] text-slate-500">Pradhan Mantri Suraksha Bima Yojana</p>
                </div>
                <span className="text-xs font-black text-emerald-700">₹2,00,000 Cover</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{tr("Cooperative Welfare Fund")}</h5>
                  <p className="text-[10px] text-slate-500">{tr("Emergency medical & children scholarship")}</p>
                </div>
                <span className="text-xs font-black text-indigo-700">{tr("Active Claimable")}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{tr("On-Duty Emergency SOS")}</h5>
                  <p className="text-[10px] text-slate-500">{tr("24/7 Cooperative rapid safety network")}</p>
                </div>
                <span className="material-symbols-outlined text-rose-600 text-[18px]">e911_emergency</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert(tr("Emergency assistance request sent to your local Cooperative Society Admin."))}
            className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">emergency</span>
            {tr("On-Duty Emergency Accident SOS")}
          </button>
        </div>
      </div>
    </div>
  );
}
