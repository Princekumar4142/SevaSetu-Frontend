import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Badge from "../components/Badge";

const COURSES = [
  {
    id: "course-1",
    title: "5-Star Customer Etiquette & Service Protocols",
    category: "Soft Skills & Hygiene",
    duration: "45 mins",
    modules: 4,
    progress: 100,
    status: "COMPLETED",
    badge: "5-Star Service Certified",
    icon: "verified_user",
    description: "Master customer greeting, hygiene sanitization standards, and conflict resolution.",
  },
  {
    id: "course-2",
    title: "Electrical Circuit Diagnostics & ISO-9001 Safety",
    category: "Technical Skill",
    duration: "2.5 hours",
    modules: 8,
    progress: 65,
    status: "IN_PROGRESS",
    badge: "Safety Pro Badge",
    icon: "bolt",
    description: "Advanced multi-meter diagnostics, load calculation, MCB replacements, and earth grounding.",
  },
  {
    id: "course-3",
    title: "Inverter AC & Gas Leakage Diagnostic Masterclass",
    category: "Technical Skill",
    duration: "3 hours",
    modules: 6,
    progress: 0,
    status: "NOT_STARTED",
    badge: "HVAC Master Certified",
    icon: "ac_unit",
    description: "PCB troubleshooting, R32 & R410A refrigeration cycle diagnostics, and jet pump cleaning.",
  },
  {
    id: "course-4",
    title: "Smart Home IoT Devices & Smart Switch Installation",
    category: "Emerging Tech",
    duration: "1.5 hours",
    modules: 5,
    progress: 0,
    status: "LOCKED",
    badge: "IoT Smart Home Specialist",
    icon: "nest_remote_comfort",
    description: "Installation of Tuya & Sonoff smart relays, digital locks, and Alexa/Google Home voice pairing.",
  },
];

export default function WorkerTraining() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(COURSES);
  const [activeCourseModal, setActiveCourseModal] = useState(null);
  const [quizScore, setQuizScore] = useState(null);

  const handleStartLesson = (course) => {
    setActiveCourseModal(course);
    setQuizScore(null);
  };

  const handlePassQuiz = () => {
    setQuizScore(100);
    setCourses((prev) =>
      prev.map((c) =>
        c.id === activeCourseModal.id
          ? { ...c, progress: 100, status: "COMPLETED" }
          : c
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) navigate(-1);
              else navigate("/worker");
            }}
            className="w-9 h-9 rounded-xl bg-surface-container-low hover:bg-surface-container-high active:bg-surface-variant flex items-center justify-center text-primary transition-colors shrink-0"
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold">Skills Training &amp; Upskilling</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Level up your trade certifications to unlock high-ticket jobs and boost your cooperative payout rate
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-brand-purple-light text-brand-purple px-4 py-2 rounded-xl font-label-md font-bold self-start sm:self-auto">
          <span className="material-symbols-outlined text-[20px] fill">workspace_premium</span>
          Current Tier: Level 2 Master
        </div>
      </div>

      {/* Badges Earned */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-sm">
        <h2 className="font-label-lg text-label-lg font-bold text-on-surface mb-4">
          Your Earned Certifications &amp; Badges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface-container-low/60 rounded-xl p-4 flex items-center gap-3 border border-emerald-200">
            <span className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-success flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px] fill">verified</span>
            </span>
            <div>
              <p className="font-label-md text-label-md font-bold text-on-surface">5-Star Service Certified</p>
              <p className="font-status-badge text-status-badge text-brand-success font-medium">Issued by SevaSetu</p>
            </div>
          </div>

          <div className="bg-surface-container-low/60 rounded-xl p-4 flex items-center gap-3 border border-brand-purple/30">
            <span className="w-12 h-12 rounded-xl bg-brand-purple-light text-brand-purple flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px] fill">verified_user</span>
            </span>
            <div>
              <p className="font-label-md text-label-md font-bold text-on-surface">Co-op Master Plumber</p>
              <p className="font-status-badge text-status-badge text-brand-purple font-medium">National Federation</p>
            </div>
          </div>

          <div className="bg-surface-container-low/60 rounded-xl p-4 flex items-center gap-3 border border-amber-300">
            <span className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px] fill">military_tech</span>
            </span>
            <div>
              <p className="font-label-md text-label-md font-bold text-on-surface">+12% Higher Payout Tier</p>
              <p className="font-status-badge text-status-badge text-amber-700 font-medium">Top Quality Multiplier</p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        <h2 className="font-label-lg text-label-lg font-bold text-on-surface">
          Recommended Upskilling Programs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-brand-purple-light text-brand-purple flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[22px]">{course.icon}</span>
                  </span>
                  <Badge
                    variant={
                      course.status === "COMPLETED"
                        ? "success"
                        : course.status === "IN_PROGRESS"
                        ? "primary"
                        : course.status === "LOCKED"
                        ? "danger"
                        : "warning"
                    }
                  >
                    {course.status.replace("_", " ")}
                  </Badge>
                </div>

                <h3 className="font-label-lg text-label-lg font-bold text-on-surface mb-1">{course.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">{course.description}</p>
              </div>

              <div>
                <div className="flex items-center justify-between font-status-badge text-status-badge text-on-surface-variant mb-1.5 font-medium">
                  <span>Progress ({course.progress}%)</span>
                  <span>{course.duration} · {course.modules} Modules</span>
                </div>
                <div className="w-full bg-outline-variant/60 h-2 rounded-full overflow-hidden mb-4">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      course.status === "COMPLETED" ? "bg-brand-success" : "bg-brand-purple"
                    }`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-outline-variant">
                  <span className="font-status-badge text-status-badge text-brand-purple font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">stars</span>
                    Earn: {course.badge}
                  </span>
                  <Button
                    variant={course.status === "COMPLETED" ? "outline" : "purple"}
                    size="sm"
                    disabled={course.status === "LOCKED"}
                    onClick={() => handleStartLesson(course)}
                  >
                    {course.status === "COMPLETED"
                      ? "Review Course"
                      : course.status === "IN_PROGRESS"
                      ? "Continue Lesson"
                      : course.status === "LOCKED"
                      ? "Locked (Level 3)"
                      : "Start Learning"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lesson / Certification Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-fade-in border border-outline-variant">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
              <div>
                <h3 className="font-label-lg text-label-lg font-bold text-on-surface">
                  {activeCourseModal.title}
                </h3>
                <p className="font-status-badge text-status-badge text-on-surface-variant">
                  Cooperative Skill Certification Assessment
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveCourseModal(null)}
                className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div className="aspect-video bg-neutral-900 rounded-xl flex flex-col items-center justify-center text-white relative overflow-hidden shadow-inner">
                <span className="material-symbols-outlined text-[48px] text-brand-purple animate-pulse">play_circle</span>
                <p className="font-label-md font-bold mt-2">Interactive Video Training Module</p>
                <p className="font-status-badge text-neutral-400">Duration: {activeCourseModal.duration}</p>
              </div>

              <div className="bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant">
                <p className="font-label-md font-bold text-on-surface mb-2">Knowledge Check Question:</p>
                <p className="font-body-md text-on-surface-variant mb-3">
                  What is the first safety procedure before touching an air conditioner outdoor condenser unit?
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-brand-purple bg-brand-purple-light/20 text-body-md font-medium text-on-surface cursor-pointer">
                    <input type="radio" name="quiz" defaultChecked className="accent-brand-purple" />
                    <span>Turn off main isolator MCB and discharge capacitor safely</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-body-md font-medium text-on-surface cursor-pointer">
                    <input type="radio" name="quiz" className="accent-brand-purple" />
                    <span>Immediately wash coils with pressurized water jet</span>
                  </label>
                </div>
              </div>

              {quizScore && (
                <div className="p-3.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2 font-label-md font-bold">
                  <span className="material-symbols-outlined text-[22px] text-brand-success fill">verified</span>
                  Assessment Passed 100%! {activeCourseModal.badge} is now active on your public profile.
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-outline-variant flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => setActiveCourseModal(null)}>
                Close
              </Button>
              <Button variant="purple" onClick={handlePassQuiz}>
                Submit Assessment &amp; Certify
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
