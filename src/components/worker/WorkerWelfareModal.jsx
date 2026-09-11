import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const WELFARE_PROGRAMS = [
  { id: "medical", label: "Medical Emergency Assistance", maxAmount: "₹25,000", desc: "Emergency hospitalization aid for worker or direct family." },
  { id: "tools", label: "Skilled Tools & Equipment Grant", maxAmount: "₹10,000", desc: "50% grant for modern electrical, plumbing or farm repair tools." },
  { id: "education", label: "Children Skill Scholarship", maxAmount: "₹15,000", desc: "Annual merit scholarship for worker's school/college children." },
  { id: "maternity", label: "Maternity & Family Support", maxAmount: "₹12,000", desc: "Special assistance for women cooperative artisans and spouses." },
];

export default function WorkerWelfareModal({ worker, onClose }) {
  const { tr } = useLanguage();
  const [selectedProgram, setSelectedProgram] = useState("medical");
  const [requestedAmount, setRequestedAmount] = useState("5000");
  const [claimReason, setClaimReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(null);

  const welfareBalance = worker?.earnings?.welfareContribution ? worker.earnings.welfareContribution + 1850 : 2450;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!claimReason.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setClaimSuccess({
        claimId: "WLF-CLM-" + Math.floor(100000 + Math.random() * 900000),
        program: WELFARE_PROGRAMS.find((p) => p.id === selectedProgram)?.label || selectedProgram,
        amount: requestedAmount,
        status: "UNDER REVIEW BY SOCIETY WELFARE COMMITTEE",
        submittedAt: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-950 text-white">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-xl">volunteer_activism</span>
            <div>
              <h3 className="text-sm font-black tracking-wide uppercase">{tr("Cooperative Worker Welfare Fund")}</h3>
              <p className="text-[10px] text-emerald-300">Direct Social Security from Federation Reserve</p>
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

        {claimSuccess ? (
          /* Claim Submitted Success View */
          <div className="p-6 sm:p-8 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>

            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Claim Application Submitted
              </span>
              <h4 className="text-2xl font-black text-slate-900 mt-2 font-mono">{claimSuccess.claimId}</h4>
              <p className="text-xs text-slate-500 mt-1">
                Requested Grant: <span className="font-bold text-slate-900">₹{Number(claimSuccess.amount).toLocaleString()}</span>
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Program:</span>
                <span className="font-bold text-slate-800">{claimSuccess.program}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Submission Date:</span>
                <span className="font-medium text-slate-700">{claimSuccess.submittedAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Review Stage:</span>
                <span className="font-bold text-indigo-700">{claimSuccess.status}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 text-emerald-700 font-bold text-[11px] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>The cooperative secretary will disburse funds directly to your linked bank account upon verification.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Done &amp; Return
            </button>
          </div>
        ) : (
          /* Claim Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider block">
                  Your Accumulated Welfare Reserve
                </span>
                <span className="text-2xl font-black text-white">₹{welfareBalance.toLocaleString()}</span>
                <p className="text-[10px] text-emerald-200 mt-0.5">Accrued automatically from ₹20/job welfare share</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-amber-300">
                <span className="material-symbols-outlined text-[28px]">shield</span>
              </div>
            </div>

            {/* Select Program */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Welfare Claim Category *
              </label>
              <div className="space-y-2">
                {WELFARE_PROGRAMS.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProgram(p.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      selectedProgram === p.id
                        ? "bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-200 text-slate-900 shadow-2xs"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <div>
                      <p className="font-black text-xs">{p.label}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{p.desc}</p>
                    </div>
                    <span className="text-[11px] font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full shrink-0">
                      Up to {p.maxAmount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requested Amount */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Requested Aid Amount (₹) *
              </label>
              <input
                type="number"
                min="500"
                max="25000"
                required
                value={requestedAmount}
                onChange={(e) => setRequestedAmount(e.target.value)}
                className="w-full text-sm font-bold p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-slate-900 bg-slate-50/50"
              />
            </div>

            {/* Explanation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Reason &amp; Documentation Details *
              </label>
              <textarea
                rows={2}
                required
                value={claimReason}
                onChange={(e) => setClaimReason(e.target.value)}
                placeholder="Briefly state patient name, school name or tools required for your trade..."
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 resize-none"
              />
            </div>

            {/* Action Buttons */}
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
                disabled={isSubmitting || !claimReason.trim()}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-black shadow-md shadow-emerald-700/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Claim...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
                    <span>Submit Welfare Application</span>
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
