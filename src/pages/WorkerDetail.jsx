import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import workerService from "../services/workerService";
import Badge from "../components/Badge";
import { LoadingState, ErrorBanner } from "../components/Feedback";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartSlice";

// Maps skill names (like "Electrician") -> categoryId (like "electrical-plumbing")
const SKILL_ALIAS = {
  electrician: "electrical-plumbing",
  electrical: "electrical-plumbing",
  plumber: "electrical-plumbing",
  plumbing: "electrical-plumbing",
  carpenter: "home-repairs",
  carpentry: "home-repairs",
  painter: "home-painting",
  painting: "home-painting",
  cleaner: "cleaning-pest-1",
  cleaning: "cleaning-pest-1",
  "pest control": "cleaning-pest-1",
  "ac repair": "ac-repair",
  "appliance repair": "ac-repair",
  mason: "home-repairs",
  driver: "home-repairs",
  "salon for women": "salon-women",
  beauty: "salon-women",
  "salon for men": "salon-men",
  barber: "salon-men",
  physiotherapy: "physiotherapy",
  nursing: "nursing-care",
  yoga: "yoga-trainer",
  photographer: "photography",
  catering: "catering",
  decoration: "decoration",
};

export default function WorkerDetail() {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Derive categoryId from worker's primary skill
  const getWorkerCategoryId = (w) => {
    const skill = (w?.skills?.[0] || w?.primarySkill || "").toLowerCase().trim();
    return SKILL_ALIAS[skill] || "electrical-plumbing";
  };

  const handleBookWorker = () => {
    if (!worker) return;
    const categoryId = getWorkerCategoryId(worker);
    navigate(`/customer/services/${categoryId}`, {
      state: { workerName: worker.user?.name, workerId: worker._id }
    });
  };

  useEffect(() => {
    setLoading(true);
    workerService
      .getVerifiedWorkerById(workerId)
      .then((res) => setWorker(res.data.worker))
      .catch((e) => setError(e.response?.data?.message || "Could not load worker profile"))
      .finally(() => setLoading(false));
  }, [workerId]);

  if (loading) return <div className="px-margin-mobile md:px-margin-desktop py-xl"><LoadingState label="Loading worker profile…" /></div>;
  if (error) return <div className="px-margin-mobile md:px-margin-desktop py-xl"><ErrorBanner message={error} /></div>;
  if (!worker) return null;

  const statusColor = {
    AVAILABLE: "bg-green-100 text-green-700",
    BUSY: "bg-orange-100 text-orange-700",
    OFFLINE: "bg-gray-100 text-gray-500",
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Back button */}
      <div className="px-margin-mobile md:px-margin-desktop pt-lg">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-xs font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Back to Workers
        </button>
      </div>

      <div className="px-margin-mobile md:px-margin-desktop py-lg max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">

          {/* ── Left: Profile Card ── */}
          <div className="lg:col-span-1">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
              {/* Cover gradient */}
              <div className="h-24 bg-gradient-to-br from-brand-purple to-primary"></div>

              {/* Avatar */}
              <div className="-mt-12 flex flex-col items-center px-lg pb-lg">
                <div className="w-24 h-24 rounded-full bg-primary-container border-4 border-white flex items-center justify-center overflow-hidden shadow-lg">
                  {worker.user?.profilePhoto ? (
                    <img src={worker.user.profilePhoto} className="w-full h-full object-cover" alt={worker.user.name} />
                  ) : (
                    <span className="material-symbols-outlined text-primary text-4xl">person</span>
                  )}
                </div>

                <h1 className="font-headline-md text-headline-md text-on-surface mt-md text-center">{worker.user?.name}</h1>

                {/* Status pill */}
                <span className={`mt-xs text-xs font-bold px-sm py-1 rounded-full ${statusColor[worker.status] || statusColor.OFFLINE}`}>
                  {worker.status}
                </span>

                <div className="mt-sm">
                  <Badge tone="verified" icon="verified">Verified Worker</Badge>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-xs mt-md">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`material-symbols-outlined text-[18px] ${s <= Math.round(worker.rating || 5) ? "fill text-brand-orange" : "text-outline-variant"}`}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="font-label-md text-label-md text-on-surface">{Number(worker.rating || 5).toFixed(1)}</span>
                  <span className="font-status-badge text-status-badge text-on-surface-variant">({worker.totalJobs || 0} jobs)</span>
                </div>

                {/* Location */}
                {(worker.city || worker.state) && (
                  <div className="flex items-center gap-xs mt-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span className="font-status-badge text-status-badge">
                      {[worker.city, worker.state].filter(Boolean).join(", ")}
                    </span>
                  </div>
                )}

                {/* Cooperative */}
                {worker.cooperative?.name && (
                  <div className="flex items-center gap-xs mt-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">corporate_fare</span>
                    <span className="font-status-badge text-status-badge">{worker.cooperative.name}</span>
                  </div>
                )}

                {/* Book CTA */}
                <button
                  onClick={handleBookWorker}
                  className="mt-lg w-full bg-brand-purple text-white font-label-md text-label-md py-sm rounded-xl hover:bg-brand-purple-dark transition-colors shadow flex items-center justify-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                  Book This Worker
                </button>
              </div>
            </div>

            {/* Stats card */}
            <div className="mt-lg bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm">
              <h3 className="font-label-md text-label-md text-on-surface font-bold mb-md uppercase tracking-wider">Quick Stats</h3>
              <div className="grid grid-cols-3 gap-sm text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{worker.totalJobs || 0}</p>
                  <p className="font-status-badge text-status-badge text-on-surface-variant">Jobs Done</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{worker.experienceYears || 0}</p>
                  <p className="font-status-badge text-status-badge text-on-surface-variant">Yrs Exp.</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{Number(worker.rating || 5).toFixed(1)}</p>
                  <p className="font-status-badge text-status-badge text-on-surface-variant">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Details ── */}
          <div className="lg:col-span-2 flex flex-col gap-lg">

            {/* About / Bio */}
            {worker.bio && (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm">
                <h2 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-sm">
                  <span className="material-symbols-outlined text-brand-purple text-[22px]">info</span>
                  About
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{worker.bio}</p>
              </div>
            )}

            {/* Skills */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-sm">
                <span className="material-symbols-outlined text-brand-purple text-[22px]">workspace_premium</span>
                Skills & Expertise
              </h2>

              <div className="flex flex-wrap gap-sm mb-md">
                {(worker.skills || []).length === 0 ? (
                  <p className="text-on-surface-variant font-body-md text-body-md">No skills listed.</p>
                ) : (
                  (worker.skills || []).map((skill) => (
                    <span
                      key={skill}
                      className="px-md py-xs rounded-full bg-brand-purple-light text-brand-purple font-label-md text-label-md capitalize border border-brand-purple/20"
                    >
                      {skill.replaceAll("_", " ")}
                    </span>
                  ))
                )}
              </div>

              <div className="flex items-center gap-md pt-md border-t border-outline-variant">
                <div className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">grade</span>
                  <span className="font-label-md text-label-md text-on-surface">
                    Skill Level: <strong>{worker.skillLevel || "Level 1"}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">work_history</span>
                  <span className="font-label-md text-label-md text-on-surface">
                    <strong>{worker.experienceYears || 0}</strong> years experience
                  </span>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-sm">
                <span className="material-symbols-outlined text-brand-purple text-[22px]">badge</span>
                Professional Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                <InfoTile icon="location_on" label="Location" value={[worker.city, worker.state, worker.pincode].filter(Boolean).join(", ") || "Not provided"} />
                <InfoTile icon="corporate_fare" label="Cooperative" value={worker.cooperative?.name || "Independent"} />
                <InfoTile icon="work_history" label="Experience" value={`${worker.experienceYears || 0} years`} />
                <InfoTile icon="workspace_premium" label="Skill Level" value={worker.skillLevel || "Level 1"} />
                <InfoTile icon="handshake" label="Total Jobs" value={`${worker.totalJobs || 0} completed`} />
                <InfoTile icon="star" label="Rating" value={`${Number(worker.rating || 5).toFixed(1)} / 5.0`} />
              </div>
            </div>

            {/* Booking CTA banner */}
            <div className="bg-gradient-to-r from-brand-purple to-primary rounded-2xl p-lg text-white flex flex-col sm:flex-row sm:items-center justify-between gap-md">
              <div>
                <h3 className="font-headline-md text-headline-md mb-xs">Ready to book {worker.user?.name?.split(" ")[0]}?</h3>
                <p className="font-body-md text-body-md text-white/80">Choose a service and schedule your appointment.</p>
              </div>
              <button
                onClick={handleBookWorker}
                className="shrink-0 bg-white text-brand-purple font-label-md text-label-md px-lg py-sm rounded-xl hover:bg-surface-container-lowest transition-colors shadow font-bold"
              >
                Browse Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoTile({ icon, label, value }) {
  return (
    <div className="flex items-start gap-md p-md rounded-xl bg-surface-container-low border border-outline-variant">
      <span className="material-symbols-outlined text-brand-purple text-[20px] mt-0.5">{icon}</span>
      <div>
        <p className="font-status-badge text-status-badge text-on-surface-variant uppercase tracking-wider">{label}</p>
        <p className="font-label-md text-label-md text-on-surface font-bold capitalize mt-0.5">{value}</p>
      </div>
    </div>
  );
}
