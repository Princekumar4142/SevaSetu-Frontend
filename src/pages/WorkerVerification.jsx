import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import workerService from "../services/workerService";
import Badge from "../components/Badge";
import Button from "../components/Button";
import { LoadingState, ErrorBanner } from "../components/Feedback";

import Avatar from "../components/Avatar";
import ConfirmModal from "../components/ConfirmModal";

export default function WorkerVerification() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState(params.get("status") || "PENDING");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reason, setReason] = useState("");


  const load = async () => {
    setLoading(true); setError("");
    try {
      const res = await workerService.getVerificationQueue(status);
      setWorkers(res.data.workers || []);
      if (selected) {
        const refreshed = (res.data.workers || []).find((w) => w._id === selected._id);
        setSelected(refreshed || null);
      }
    } catch (e) { setError(e.response?.data?.message || "Could not load verification queue"); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [status]);

  const selectWorker = async (worker) => {
    setError("");
    try { const res = await workerService.getVerificationWorker(worker._id); setSelected(res.data.worker); }
    catch (e) { setError(e.response?.data?.message || "Could not load worker details"); }
  };

  const act = async (type) => {
    if (!selected) return;
    if (type === "reject" && !reason.trim()) { setError("Please add a rejection reason."); return; }
    setActionLoading(true); setError("");
    try {
      if (type === "verify") await workerService.verifyWorker(selected._id);
      else await workerService.rejectWorker(selected._id, reason.trim());
      setReason(""); setSelected(null); await load();
    } catch (e) { setError(e.response?.data?.message || "Action failed"); }
    finally { setActionLoading(false); }
  };

  const handleDeleteWorker = async () => {
    if (!selected) return;
    setDeleteLoading(true);
    setError("");
    try {
      await workerService.deleteWorker(selected._id);
      setSuccess(`Worker profile for ${selected.user?.name || "Worker"} deleted permanently.`);
      setTimeout(() => setSuccess(""), 4000);
      setSelected(null);
      setShowDeleteModal(false);
      await load();
    } catch (e) {
      setError(e.response?.data?.message || "Failed to delete worker profile");
    } finally {
      setDeleteLoading(false);
    }
  };

  return <div className="flex flex-col gap-lg">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) navigate(-1);
            else navigate("/");
          }}
          className="w-9 h-9 rounded-xl bg-surface-container-low hover:bg-surface-container-high active:bg-surface-variant flex items-center justify-center text-primary transition-colors shrink-0"
          aria-label="Back"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <div>
          <p className="font-status-badge text-status-badge text-primary font-bold">ADMIN CONTROL</p>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Worker Verification</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Review worker profiles before they become visible to customers.</p>
        </div>
      </div>
      <div className="flex gap-xs bg-surface-container-low p-1 rounded-lg border border-outline-variant">
        {["PENDING","VERIFIED","REJECTED"].map((s) => <button key={s} onClick={() => { setStatus(s); setSelected(null); }} className={`px-md py-xs rounded-md font-label-md text-label-md ${status === s ? "bg-primary text-on-primary" : "text-on-surface-variant"}`}>{s}</button>)}
      </div>
    </div>
    {success && (
      <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2 font-label-md font-medium">
        <span className="material-symbols-outlined text-[20px] text-emerald-600">check_circle</span>
        {success}
      </div>
    )}
    <ErrorBanner message={error} />
    {loading ? <LoadingState label="Loading workers…" /> : <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-lg min-h-[520px]">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        <div className="p-md border-b border-outline-variant flex justify-between"><span className="font-label-md text-label-md text-on-surface">{status} WORKERS</span><span className="font-label-md text-label-md text-primary">{workers.length}</span></div>
        <div className="max-h-[650px] overflow-auto divide-y divide-outline-variant">
          {workers.length === 0 ? <div className="p-xl text-center text-on-surface-variant"><span className="material-symbols-outlined text-4xl">group_off</span><p className="mt-sm">No {status.toLowerCase()} workers.</p></div> : workers.map((w) => <button key={w._id} onClick={() => selectWorker(w)} className={`w-full text-left p-md hover:bg-surface-container-low transition ${selected?._id === w._id ? "bg-primary-container" : ""}`}>
            <div className="flex items-center gap-sm"><Avatar src={w.user?.profilePhoto} name={w.user?.name} size="md" /><div className="min-w-0 flex-1"><p className="font-label-md text-label-md text-on-surface font-bold truncate">{w.user?.name || "Unnamed worker"}</p><p className="font-status-badge text-status-badge text-on-surface-variant truncate">{w.skills?.slice(0,2).join(" • ") || "Skills not added"}</p></div><Badge tone={w.verificationStatus === "VERIFIED" ? "verified" : w.verificationStatus === "REJECTED" ? "rejected" : "pending"}>{w.verificationStatus}</Badge></div>
          </button>)}
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
        {!selected ? <div className="h-full min-h-[420px] flex flex-col items-center justify-center text-center text-on-surface-variant"><span className="material-symbols-outlined text-5xl">fact_check</span><h3 className="font-headline-md text-headline-md text-on-surface mt-md">Select a worker</h3><p className="font-body-md text-body-md max-w-md mt-xs">Review their profile, skills and location here before taking an action.</p></div> : <div className="flex flex-col gap-lg">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-md">
            <div className="flex items-center gap-md">
              <Avatar src={selected.user?.profilePhoto} name={selected.user?.name} size="xl" />
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface">{selected.user?.name}</h2>
                <p className="text-on-surface-variant">{selected.user?.email} · {selected.user?.phone}</p>
                <div className="mt-xs">
                  <Badge tone={selected.verificationStatus === "VERIFIED" ? "verified" : selected.verificationStatus === "REJECTED" ? "rejected" : "pending"}>{selected.verificationStatus}</Badge>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-red-50 text-red-700 hover:bg-red-600 hover:text-white border border-red-200 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 self-start"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              <span>Delete Worker Profile</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <Info title="Experience" value={`${selected.experienceYears || 0} years`} icon="work_history" />
            <Info title="Skill Level" value={selected.skillLevel || "Level 1"} icon="workspace_premium" />
            <Info title="Location" value={[selected.city, selected.state, selected.pincode].filter(Boolean).join(", ") || "Not provided"} icon="location_on" />
            <Info title="Cooperative" value={selected.cooperative?.name || "Not assigned"} icon="corporate_fare" />
          </div>
          <section><h3 className="font-label-md text-label-md text-on-surface mb-sm">Skills</h3><div className="flex flex-wrap gap-xs">{(selected.skills || []).map(s => <span key={s} className="px-sm py-xs rounded-full bg-primary-container text-on-primary-container text-sm capitalize">{s.replaceAll("_", " ")}</span>)}{!selected.skills?.length && <span className="text-on-surface-variant">No skills added.</span>}</div></section>
          <section><h3 className="font-label-md text-label-md text-on-surface mb-sm">Address</h3><p className="text-on-surface-variant">{selected.address || "Not provided"}</p></section>
          {selected.rejectionReason && <div className="p-md rounded-lg bg-error-container text-on-error-container"><b>Rejection reason:</b> {selected.rejectionReason}</div>}
          {selected.verificationStatus === "PENDING" && <div className="border-t border-outline-variant pt-lg"><label className="font-label-md text-label-md text-on-surface block mb-xs">Rejection reason (only required if rejecting)</label><textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} placeholder="Explain what the worker needs to correct…" className="w-full rounded-lg border border-outline-variant bg-surface px-md py-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"/><div className="flex flex-col sm:flex-row gap-sm mt-md"><Button onClick={() => act("verify")} loading={actionLoading} className="flex-1"><span className="material-symbols-outlined text-[18px] mr-1">verified</span> Approve Worker</Button><Button onClick={() => act("reject")} loading={actionLoading} variant="secondary" className="flex-1"><span className="material-symbols-outlined text-[18px] mr-1">cancel</span> Reject</Button></div></div>}
        </div>}
      </div>
    </div>}

    <ConfirmModal
      isOpen={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      onConfirm={handleDeleteWorker}
      loading={deleteLoading}
      title="Delete Worker Profile?"
      targetName={selected?.user?.name}
      message={`Are you sure you want to permanently delete the profile of "${selected?.user?.name}"? This will delete their worker profile and completely remove their user account from the platform.`}
      confirmText="Yes, Delete Worker"
      cancelText="Cancel"
    />
  </div>;
}
function Info({title,value,icon}) { return <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant"><div className="flex items-center gap-xs text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">{icon}</span><span className="font-status-badge text-status-badge">{title}</span></div><p className="font-label-md text-label-md text-on-surface font-bold mt-xs capitalize">{value}</p></div>; }

