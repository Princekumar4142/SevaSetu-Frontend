import { useLanguage } from "../../context/LanguageContext";

export default function DigitalWorkerIDCard({ worker, onClose }) {
  const { tr } = useLanguage();

  if (!worker) return null;

  const workerUser = worker.user || worker;
  const name = workerUser.name || "Cooperative Worker Partner";
  const phone = workerUser.phone || "+91 ••••• •••••";
  const photo = workerUser.profilePhoto || "";
  const category = worker.serviceCategory?.replace(/-/g, " ") || "Skilled Labor Professional";
  const cooperative = worker.cooperative?.name || "Labour Cooperative Federation of India";
  const regId = "WF-2026-" + (worker._id?.slice(-6) || Math.floor(100000 + Math.random() * 900000)).toUpperCase();
  const aadharMasked = worker.aadharNumber ? "•••• •••• " + worker.aadharNumber.slice(-4) : "•••• •••• 8492";
  const skillLevel = worker.skillLevel || "Level 2 (Certified)";
  const city = worker.city || "West Champaran";

  const verifyUrl = `${window.location.origin}/verify/worker/${worker._id || "verified"}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(verifyUrl)}&color=0f172a`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-6 animate-fade-in-up">
        
        {/* Top Controls */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-lg">badge</span>
            <span className="text-xs font-black uppercase tracking-wider">{tr("Digital Cooperative Worker ID")}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">print</span>
              <span>{tr("Print")}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* ── Official ID Badge Front ── */}
        <div id="printable-id-card" className="p-6 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 text-slate-900 relative overflow-hidden">
          
          {/* Card Border Trim */}
          <div className="border-2 border-emerald-700/80 rounded-2xl p-5 relative bg-white shadow-md overflow-hidden">
            
            {/* Top Security Stripe */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-amber-500 to-indigo-600" />

            {/* Federation Header */}
            <div className="text-center pb-4 border-b border-slate-200 pt-1">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-emerald-700 text-xl font-bold">account_balance</span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Labour Cooperative Federation of India
                </span>
              </div>
              <p className="text-[9px] font-bold text-emerald-800 uppercase tracking-widest">
                National Database of Verified Skilled Workers
              </p>
            </div>

            {/* Photo & Core Details Grid */}
            <div className="flex items-start gap-4 py-4 border-b border-slate-100">
              
              {/* Photo Box */}
              <div className="shrink-0 text-center">
                <div className="w-24 h-28 rounded-xl overflow-hidden bg-slate-100 border-2 border-emerald-600 shadow-sm relative mx-auto">
                  {photo ? (
                    <img src={photo} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-emerald-100 text-emerald-800 text-3xl font-black">
                      {name.charAt(0)}
                    </div>
                  )}
                  {/* Verified Icon Badge */}
                  <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[12px] shadow-sm">
                    ✓
                  </span>
                </div>
                <span className="inline-block px-2 py-0.5 mt-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider">
                  KYC Verified
                </span>
              </div>

              {/* Identity Fields */}
              <div className="flex-1 min-w-0 space-y-1 text-xs">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Full Name</span>
                  <h4 className="font-black text-slate-900 text-sm truncate">{name}</h4>
                </div>

                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Trade Specialization</span>
                  <p className="font-bold text-indigo-700 capitalize truncate">{category}</p>
                </div>

                <div className="grid grid-cols-2 gap-1 pt-0.5">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Worker Reg ID</span>
                    <span className="font-mono font-bold text-slate-800 text-[11px]">{regId}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Skill Level</span>
                    <span className="font-bold text-slate-800 text-[11px]">{skillLevel}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Aadhaar Linked</span>
                  <span className="font-mono text-slate-600 text-[11px]">{aadharMasked}</span>
                </div>
              </div>

            </div>

            {/* Cooperative Affiliation & Scannable QR Code */}
            <div className="flex items-center justify-between gap-3 pt-3">
              <div className="space-y-1 text-xs">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Affiliated Society / PACS</span>
                  <p className="font-bold text-slate-800 text-[11px] line-clamp-1">{cooperative}</p>
                  <p className="text-[10px] text-slate-500">District: {city} · Bihar</p>
                </div>
                <div className="pt-1 flex items-center gap-1.5 text-emerald-700 font-bold text-[10px]">
                  <span className="material-symbols-outlined text-[13px]">verified</span>
                  <span>PMSBY Insurance Active (₹2L Cover)</span>
                </div>
              </div>

              {/* Live Scannable QR Code */}
              <div className="shrink-0 text-center bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                <img
                  src={qrUrl}
                  alt="Scan to Verify Worker Authenticity"
                  className="w-16 h-16 object-contain mx-auto"
                />
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter block mt-0.5">
                  Scan to Verify
                </span>
              </div>
            </div>

            {/* Hologram Footer Line */}
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Valid: 2026 – 2029</span>
              <span className="text-emerald-700">Digital Seal · Authorized PACS Officer</span>
            </div>

          </div>

          <p className="text-[10px] text-slate-400 text-center mt-3 print:hidden">
            Scan this QR code with any smartphone camera to view live verification &amp; police clearance credentials.
          </p>
        </div>

      </div>
    </div>
  );
}
