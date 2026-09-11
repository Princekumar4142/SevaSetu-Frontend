import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const GRIEVANCE_CATEGORIES = [
  { id: "quality", label: "Service Quality / Incomplete Work", icon: "handyman" },
  { id: "overcharging", label: "Billing & Overcharging Dispute", icon: "receipt_long" },
  { id: "no_show", label: "Technician No-Show / Late Arrival", icon: "person_off" },
  { id: "behavior", label: "Misbehavior / Conduct Issue", icon: "sentiment_dissatisfied" },
  { id: "damage", label: "Property / Crop / Equipment Damage", icon: "broken_image" },
  { id: "other", label: "Other Cooperative Grievance", icon: "help" },
];

export default function GrievanceModal({ booking, onClose }) {
  const { tr } = useLanguage();
  const [category, setCategory] = useState("quality");
  const [priority, setPriority] = useState("MEDIUM");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ticketResult, setTicketResult] = useState(null);

  const bookingRef = booking?.bookingNumber || "BK-948210";
  const workerName = booking?.worker?.user?.name || "Assigned Worker";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const ticketNo = "GRV-" + Math.floor(100000 + Math.random() * 900000);
      const newTicket = {
        id: ticketNo,
        bookingRef,
        workerName,
        category: GRIEVANCE_CATEGORIES.find((c) => c.id === category)?.label || category,
        priority,
        description,
        status: "OPEN",
        submittedBy: "Customer",
        createdAt: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
        resolutionDeadline: "48 Hours (SLA Guarantee)"
      };

      try {
        const stored = JSON.parse(localStorage.getItem("sevasetu_grievances") || "[]");
        localStorage.setItem("sevasetu_grievances", JSON.stringify([newTicket, ...stored]));
      } catch (err) {
        console.error("Failed to save grievance locally:", err);
      }

      setTicketResult({
        ticketNo,
        createdAt: newTicket.createdAt,
        category: newTicket.category,
        priority,
        status: "OPEN · ASSIGNED TO DISTRICT COOPERATIVE INSPECTOR",
      });
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-400 text-xl">gavel</span>
            <div>
              <h3 className="text-sm font-black tracking-wide uppercase">{tr("Cooperative Grievance Redressal Cell")}</h3>
              <p className="text-[10px] text-slate-400">Fair Arbitration under Cooperative Federation Guidelines</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {ticketResult ? (
          /* Ticket Success View */
          <div className="p-6 sm:p-8 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>

            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Ticket Registered Successfully
              </span>
              <h4 className="text-2xl font-black text-slate-900 mt-2 font-mono">{ticketResult.ticketNo}</h4>
              <p className="text-xs text-slate-500 mt-1">
                Booking Reference: <span className="font-bold text-slate-700">#{bookingRef}</span> ({workerName})
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Category:</span>
                <span className="font-bold text-slate-800">{ticketResult.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Priority Level:</span>
                <span className="font-bold text-rose-600">{ticketResult.priority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Filed On:</span>
                <span className="font-medium text-slate-700">{ticketResult.createdAt}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-start gap-1.5 text-emerald-700 font-bold text-[11px]">
                <span className="material-symbols-outlined text-[15px] shrink-0 mt-0.5">verified_user</span>
                <span>Assigned to District Cooperative Dispute Redressal Officer. Resolution SLA: 24 Hours.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Done &amp; Close
            </button>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Context banner */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
              <span className="material-symbols-outlined text-amber-600 text-lg shrink-0 mt-0.5">info</span>
              <div>
                <p className="font-bold">Filing Grievance for Booking #{bookingRef}</p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Cooperative Federation guarantees 100% mediation, fair refund or free re-work if service standards are not met.
                </p>
              </div>
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Issue Category *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GRIEVANCE_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      category === c.id
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{c.icon}</span>
                    <span className="truncate">{tr(c.label)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Priority Level
              </label>
              <div className="flex items-center gap-2">
                {["LOW", "MEDIUM", "HIGH / TATKAL"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      priority === p
                        ? "bg-rose-50 border-rose-400 text-rose-700 shadow-2xs"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Describe the Issue in Detail *
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={tr("Please explain what went wrong (e.g. electrical fitting tripped, technician didn't arrive, asked for extra cash, etc.)")}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 resize-none font-medium"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !description.trim()}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-black shadow-md shadow-rose-600/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Filing Grievance...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    <span>Submit Dispute Ticket</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
