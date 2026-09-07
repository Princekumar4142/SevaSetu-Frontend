import { useState, useEffect } from "react";
import workerService from "../services/workerService";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Input from "../components/Input";
import { LoadingState } from "../components/Feedback";
import ConfirmModal from "../components/ConfirmModal";


const MOCK_COOP_WORKERS = [
  {
    _id: "w-1",
    user: { name: "Ramesh Pawar", phone: "+91 98201 44321", email: "ramesh.pawar@example.com", isVerified: true },
    skills: ["Cleaning", "Disinfection", "Deep Scrubbing"],
    skillLevel: "Level 2",
    status: "AVAILABLE",
    verificationStatus: "VERIFIED",
    rating: 4.9,
    totalJobs: 142,
    jobsThisWeek: 8,
    earnings: { gross: 98400, net: 83640, welfareContribution: 1968 },
  },
  {
    _id: "w-2",
    user: { name: "Pooja Sharma", phone: "+91 98332 99182", email: "pooja.sharma@example.com", isVerified: true },
    skills: ["Salon & Spa", "Facials", "Manicure"],
    skillLevel: "Level 3",
    status: "BUSY",
    verificationStatus: "VERIFIED",
    rating: 4.95,
    totalJobs: 215,
    jobsThisWeek: 12,
    earnings: { gross: 164000, net: 139400, welfareContribution: 3280 },
  },
  {
    _id: "w-3",
    user: { name: "Sunil Gaikwad", phone: "+91 98111 22334", email: "sunil.gaikwad@example.com", isVerified: true },
    skills: ["Electrician", "AC Repair", "Appliance"],
    skillLevel: "Level 2",
    status: "OFFLINE",
    verificationStatus: "VERIFIED",
    rating: 4.8,
    totalJobs: 89,
    jobsThisWeek: 4,
    earnings: { gross: 62000, net: 52700, welfareContribution: 1240 },
  },
  {
    _id: "w-4",
    user: { name: "Kavita Yadav", phone: "+91 98990 11223", email: "kavita.yadav@example.com", isVerified: false },
    skills: ["Cleaning", "Kitchen Deep Clean"],
    skillLevel: "Level 1",
    status: "OFFLINE",
    verificationStatus: "PENDING",
    rating: 5.0,
    totalJobs: 0,
    jobsThisWeek: 0,
    earnings: { gross: 0, net: 0, welfareContribution: 0 },
  },
];

export default function CooperativeWorkers() {
  const [workers, setWorkers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState("ALL");
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [workerToDelete, setWorkerToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [actionSuccess, setActionSuccess] = useState("");
  const [actionError, setActionError] = useState("");


  useEffect(() => {
    async function fetchWorkers() {
      try {
        const res = await workerService.getVerifiedWorkers();
        if (res.data?.workers && res.data.workers.length > 0) {
          setWorkers(res.data.workers);
        } else {
          setWorkers(MOCK_COOP_WORKERS);
        }
      } catch (err) {
        console.warn("Using mock workers fallback:", err.message);
        setWorkers(MOCK_COOP_WORKERS);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkers();
  }, []);

  const filtered = workers.filter((w) => {
    const nameMatch = w.user?.name?.toLowerCase().includes(search.toLowerCase()) || false;
    const phoneMatch = w.user?.phone?.includes(search) || false;
    const skillMatch = skillFilter === "ALL" || (w.skills && w.skills.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase())));
    return (nameMatch || phoneMatch) && skillMatch;
  });

  const handleDeleteWorker = async () => {
    if (!workerToDelete) return;
    setDeleting(true);
    setActionError("");
    try {
      await workerService.deleteWorker(workerToDelete._id);
      setWorkers((prev) => prev.filter((w) => w._id !== workerToDelete._id));
      setActionSuccess(`Worker profile for "${workerToDelete.user?.name || "Worker"}" was permanently deleted.`);
      setTimeout(() => setActionSuccess(""), 4500);
      if (selectedWorker?._id === workerToDelete._id) {
        setSelectedWorker(null);
      }
      setWorkerToDelete(null);
    } catch (err) {
      setActionError(err.response?.data?.message || "Failed to delete worker profile.");
      setTimeout(() => setActionError(""), 5000);
      setWorkerToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">Cooperative Workforce</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage your registered cooperative members, skill certifications, and welfare contributions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-status-badge text-status-badge px-3 py-1.5 rounded-full bg-brand-purple-light text-brand-purple font-bold">
            Total Members: {workers.length}
          </span>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2 font-label-md font-medium">
          <span className="material-symbols-outlined text-[20px] text-emerald-600">check_circle</span>
          {actionSuccess}
        </div>
      )}

      {actionError && (
        <div className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-200 flex items-center gap-2 font-label-md font-medium">
          <span className="material-symbols-outlined text-[20px] text-red-600">error</span>
          {actionError}
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm">
        <div className="flex-1 w-full">
          <Input
            placeholder="Search workers by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          {["ALL", "Cleaning", "Salon", "Electrician"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSkillFilter(s)}
              className={`px-3 py-1.5 rounded-lg font-label-md text-status-badge font-bold transition-colors ${
                skillFilter === s
                  ? "bg-brand-purple text-white"
                  : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingState message="Loading cooperative workers..." />
      ) : (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low/50 font-status-badge text-status-badge uppercase tracking-wider text-on-surface-variant">
                  <th className="py-3.5 px-4 font-bold">Worker</th>
                  <th className="py-3.5 px-4 font-bold">Skills &amp; Level</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold">Rating</th>
                  <th className="py-3.5 px-4 font-bold">Completed Jobs</th>
                  <th className="py-3.5 px-4 font-bold">Welfare Reserve</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-body-md text-on-surface">
                {filtered.map((worker) => (
                  <tr key={worker._id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-purple text-white font-bold flex items-center justify-center text-sm">
                          {worker.user?.name?.charAt(0) || "W"}
                        </div>
                        <div>
                          <p className="font-label-md font-bold text-on-surface">{worker.user?.name}</p>
                          <p className="font-status-badge text-status-badge text-on-surface-variant">{worker.user?.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {worker.skills?.slice(0, 2).map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-brand-purple-light/70 text-brand-purple font-status-badge text-[11px] font-bold">
                            {s}
                          </span>
                        ))}
                      </div>
                      <span className="text-[11px] text-on-surface-variant font-medium mt-0.5 block">{worker.skillLevel}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          worker.status === "AVAILABLE"
                            ? "success"
                            : worker.status === "BUSY"
                            ? "warning"
                            : "neutral"
                        }
                      >
                        {worker.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 font-bold">
                      ⭐ {worker.rating || "5.0"}
                    </td>
                    <td className="py-4 px-4 font-medium">
                      {worker.totalJobs} jobs
                    </td>
                    <td className="py-4 px-4 font-bold text-blue-700">
                      ₹{worker.earnings?.welfareContribution || 0}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedWorker(worker)}
                        >
                          Details
                        </Button>
                        <button
                          type="button"
                          onClick={() => setWorkerToDelete(worker)}
                          title="Delete Worker Profile"
                          className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-700 hover:bg-red-600 hover:text-white border border-red-200 transition-all flex items-center gap-1 active:scale-95 shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[15px]">delete</span>
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl animate-fade-in border border-outline-variant">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <h3 className="font-label-lg text-label-lg font-bold text-on-surface">Worker Profile</h3>
              <button
                type="button"
                onClick={() => setSelectedWorker(null)}
                className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="py-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-purple text-white font-bold flex items-center justify-center text-lg">
                  {selectedWorker.user?.name?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-label-lg font-bold text-on-surface">{selectedWorker.user?.name}</h4>
                  <p className="font-status-badge text-status-badge text-on-surface-variant">{selectedWorker.user?.email}</p>
                </div>
              </div>

              <div className="bg-surface-container-low/60 p-3.5 rounded-xl space-y-1.5 font-body-md text-on-surface">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Phone:</span>
                  <span className="font-semibold">{selectedWorker.user?.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Skill Tier:</span>
                  <span className="font-semibold">{selectedWorker.skillLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Verification Status:</span>
                  <span className="font-semibold text-brand-success">{selectedWorker.verificationStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Lifetime Gross:</span>
                  <span className="font-semibold">₹{selectedWorker.earnings?.gross || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Welfare Reserve:</span>
                  <span className="font-semibold text-blue-700">₹{selectedWorker.earnings?.welfareContribution || 0}</span>
                </div>
              </div>
            </div>
            <div className="pt-3 flex items-center justify-between border-t border-outline-variant">
              <button
                type="button"
                onClick={() => setWorkerToDelete(selectedWorker)}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-red-50 text-red-700 hover:bg-red-600 hover:text-white border border-red-200 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">delete</span>
                <span>Delete Profile</span>
              </button>
              <Button variant="purple" onClick={() => setSelectedWorker(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(workerToDelete)}
        onClose={() => setWorkerToDelete(null)}
        onConfirm={handleDeleteWorker}
        loading={deleting}
        title="Delete Worker Profile?"
        targetName={workerToDelete?.user?.name}
        message={`Are you sure you want to permanently delete the profile for "${workerToDelete?.user?.name}"? This will remove their worker profile and delete their associated user account from the platform.`}
        confirmText="Yes, Delete Worker"
        cancelText="Cancel"
      />
    </div>
  );
}

