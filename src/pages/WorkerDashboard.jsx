import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import workerService from "../services/workerService";
import { LoadingState, ErrorBanner } from "../components/Feedback";
import Badge from "../components/Badge";
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
    <div className="flex flex-col gap-lg">
      {/* Real-time incoming order notification – only for verified workers */}
      {isVerified && <IncomingOrderModal />}

      {/* ── Welcome banner ── */}
      <div className={`rounded-2xl p-lg border ${
        isVerified
          ? "bg-green-50 border-green-200"
          : isRejected
          ? "bg-red-50 border-red-200"
          : "bg-primary-container border-primary/30"
      }`}>
        <div className="flex items-start gap-md">
          <span className={`material-symbols-outlined text-2xl mt-0.5 fill ${
            isVerified ? "text-green-600" : isRejected ? "text-error" : "text-primary"
          }`}>
            {isVerified ? "verified" : isRejected ? "cancel" : "hourglass_top"}
          </span>
          <div>
            <h2 className={`font-headline-md text-headline-md mb-xs ${
              isVerified ? "text-green-800" : isRejected ? "text-error" : "text-on-primary-container"
            }`}>
              {isVerified
                ? "You're verified and ready!"
                : isRejected
                ? "Profile Needs Updates"
                : "Verification in Progress"}
            </h2>
            <p className={`font-body-md text-body-md ${
              isVerified ? "text-green-700" : isRejected ? "text-on-error-container" : "text-on-primary-container/80"
            }`}>
              {isVerified
                ? "Customers can now see your profile and book your services. Keep your profile updated to get more bookings!"
                : isRejected
                ? `Rejection reason: ${worker?.rejectionReason || "Please review your profile details and resubmit."}`
                : "Your profile is under review. Once approved by an admin, you'll appear in customer searches automatically."}
            </p>
            {!isVerified && (
              <button
                onClick={() => navigate("/worker/profile")}
                className="mt-md inline-flex items-center gap-xs font-label-md text-label-md text-primary font-bold hover:underline"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                Update My Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Approval Flow Steps ── */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm">
        <h3 className="font-label-md text-label-md text-on-surface font-bold mb-lg uppercase tracking-wider">
          Your Approval Journey
        </h3>
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-outline-variant" />
          <div
            className="absolute left-5 top-5 w-0.5 bg-primary transition-all duration-700"
            style={{ height: `${(stepIndex / (STEPS.length - 1)) * 100}%` }}
          />

          <div className="flex flex-col gap-lg relative">
            {STEPS.map((step, i) => {
              const isDone = i < stepIndex;
              const isCurrent = i === stepIndex && !isRejected;
              const isRejectedStep = i === 1 && isRejected;

              return (
                <div key={step.key} className="flex items-start gap-md">
                  {/* Circle */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 z-10 transition-all ${
                    isRejectedStep
                      ? "bg-error border-error"
                      : isDone
                      ? "bg-primary border-primary"
                      : isCurrent
                      ? "bg-white border-primary shadow-md"
                      : "bg-white border-outline-variant"
                  }`}>
                    <span className={`material-symbols-outlined text-[18px] ${
                      isRejectedStep ? "text-white fill" : isDone ? "text-white fill" : isCurrent ? "text-primary" : "text-outline-variant"
                    }`}>
                      {isRejectedStep ? "cancel" : isDone ? "check_circle" : step.icon}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="pt-1 min-w-0">
                    <p className={`font-label-md text-label-md font-bold ${
                      isRejectedStep ? "text-error" : isDone || isCurrent ? "text-on-surface" : "text-on-surface-variant"
                    }`}>
                      {step.label}
                      {isCurrent && !isRejected && (
                        <span className="ml-sm text-xs bg-brand-purple text-white px-xs py-0.5 rounded-full font-normal">
                          Current
                        </span>
                      )}
                    </p>
                    <p className="font-status-badge text-status-badge text-on-surface-variant mt-0.5">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        {/* Verification Status Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-sm">
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
            <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
              Your cooperative admin will review your documents and skills. This usually takes 24–48 hours.
            </p>
          )}
          {isVerified && worker?.verifiedAt && (
            <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
              Verified on {new Date(worker.verifiedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}
        </div>

        {/* Earnings Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-sm">
            <span className="material-symbols-outlined text-brand-purple text-[22px]">payments</span>
            Earnings
          </h3>
          <div className="grid grid-cols-3 gap-sm text-center">
            <div>
              <p className="text-2xl font-bold text-primary">₹{worker?.earnings?.gross || 0}</p>
              <p className="font-status-badge text-status-badge text-on-surface-variant">Gross</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">₹{worker?.earnings?.net || 0}</p>
              <p className="font-status-badge text-status-badge text-on-surface-variant">Net</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">₹{worker?.earnings?.welfareContribution || 0}</p>
              <p className="font-status-badge text-status-badge text-on-surface-variant">Welfare</p>
            </div>
          </div>
        </div>

        {/* Skill Passport */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm md:col-span-2">
          <div className="flex items-center justify-between mb-md">
            <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
              <span className="material-symbols-outlined text-brand-purple text-[22px]">workspace_premium</span>
              Skill Passport
            </h3>
            <button
              onClick={() => navigate("/worker/profile")}
              className="flex items-center gap-xs font-label-md text-label-md text-brand-purple hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Edit Skills
            </button>
          </div>
          <div className="flex flex-wrap gap-sm">
            {(!worker?.skills || worker.skills.length === 0) && (
              <p className="font-body-md text-body-md text-on-surface-variant">
                No skills added yet.{" "}
                <button onClick={() => navigate("/worker/profile")} className="text-primary font-bold hover:underline">
                  Add skills to your profile →
                </button>
              </p>
            )}
            {(worker?.skills || []).map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-xs px-md py-xs bg-brand-purple-light rounded-full border border-brand-purple/20"
              >
                <span className="material-symbols-outlined text-brand-purple text-[14px]">check_circle</span>
                <span className="font-label-md text-label-md text-brand-purple capitalize">{skill.replace(/_/g, " ")}</span>
              </span>
            ))}
          </div>
          <p className="font-status-badge text-status-badge text-on-surface-variant mt-md pt-md border-t border-outline-variant">
            Skill level: <strong>{worker?.skillLevel || "Level 1"}</strong> · {worker?.experienceYears || 0} years experience
          </p>
        </div>
      </div>

      {/* Fair Work Allocation notice */}
      <div className="bg-primary-container border border-primary/20 rounded-2xl p-md flex items-start gap-md">
        <span className="material-symbols-outlined text-primary mt-0.5">handshake</span>
        <div>
          <h4 className="font-label-md text-label-md text-on-primary-container mb-xs">Fair Work Allocation</h4>
          <p className="font-body-md text-body-md text-on-primary-container/90">
            Job matching and the fair-allocation engine arrive in Phase 2. Your account and cooperative membership are already set up and ready.
          </p>
        </div>
      </div>
    </div>
  );
}
