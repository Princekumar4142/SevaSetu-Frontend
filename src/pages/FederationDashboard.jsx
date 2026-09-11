import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const INITIAL_GRIEVANCES = [
  {
    id: "GRV-812049",
    bookingRef: "BK-789012",
    workerName: "Rameshwar Prasad (Electrician)",
    submittedBy: "Vikram Malhotra (Customer)",
    category: "Service Quality / Incomplete Work",
    priority: "HIGH",
    description: "Main circuit breaker wiring was replaced but secondary inverter connection was left loose, causing tripping.",
    status: "OPEN",
    createdAt: "10 Sep 2026, 03:45 PM",
    resolutionDeadline: "12 Sep 2026 (SLA: 48h)",
  },
  {
    id: "GRV-654120",
    bookingRef: "BK-442190",
    workerName: "Suman Devi (Caregiver)",
    submittedBy: "Sunita Deshmukh (Customer)",
    category: "Billing & Overcharging Dispute",
    priority: "MEDIUM",
    description: "Customer was charged for 4 overtime hours despite service completing within scheduled shift.",
    status: "IN_ARBITRATION",
    createdAt: "09 Sep 2026, 11:20 AM",
    resolutionDeadline: "11 Sep 2026 (SLA: 48h)",
  },
  {
    id: "GRV-319802",
    bookingRef: "BK-220119",
    workerName: "Deepak Kumar (Carpenter)",
    submittedBy: "Deepak Kumar (Worker)",
    category: "Customer Conduct / Unsafe Worksite",
    priority: "MEDIUM",
    description: "Worksite had unshielded 440V live industrial wire near the wooden cabinet installation area. Customer refused inspection delay.",
    status: "RESOLVED",
    createdAt: "07 Sep 2026, 04:15 PM",
    resolutionDeadline: "Resolved via PACS Inspector",
  },
];

const COOPERATIVE_SOCIETIES = [
  {
    id: "coop-1",
    name: "Adarsh Shramik Sahakari Samiti Maryadit",
    district: "Bhopal Central / Arera",
    workersCount: 420,
    activeBookings: 38,
    complianceScore: "98%",
    pmsbyCovered: "100%",
  },
  {
    id: "coop-2",
    name: "Gramin Vikas Shramik Cooperative Union",
    district: "Indore Rural & Industrial Zone",
    workersCount: 512,
    activeBookings: 47,
    complianceScore: "94%",
    pmsbyCovered: "96%",
  },
  {
    id: "coop-3",
    name: "Kalyan Labour Welfare Cooperative Federation",
    district: "Jabalpur Division",
    workersCount: 378,
    activeBookings: 29,
    complianceScore: "96%",
    pmsbyCovered: "98%",
  },
];

export default function FederationDashboard() {
  const { tr } = useLanguage();
  const [activeTab, setActiveTab] = useState("grievance"); // 'grievance' | 'cooperatives' | 'welfare'
  const [grievances, setGrievances] = useState(INITIAL_GRIEVANCES);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [actionSuccess, setActionSuccess] = useState("");

  // Load any user-filed grievances from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("sevasetu_grievances") || "[]");
      if (Array.isArray(stored) && stored.length > 0) {
        // Merge with initial, avoid duplicates
        const combined = [...stored];
        INITIAL_GRIEVANCES.forEach((init) => {
          if (!combined.some((g) => g.id === init.id)) {
            combined.push(init);
          }
        });
        setGrievances(combined);
      }
    } catch {
      // fallback
    }
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    const updated = grievances.map((g) => (g.id === id ? { ...g, status: newStatus } : g));
    setGrievances(updated);
    try {
      localStorage.setItem("sevasetu_grievances", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setActionSuccess(`Ticket ${id} status updated to ${newStatus}`);
    setTimeout(() => setActionSuccess(""), 3000);
  };

  const filteredGrievances = grievances.filter((g) => {
    if (filterStatus === "ALL") return true;
    return g.status === filterStatus;
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-teal-900/40">
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-widest mb-1.5">
              <span className="material-symbols-outlined text-[18px]">assured_workload</span>
              Apex State Labour Cooperative Federation
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Federation Command Center & Grievance Cell
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Cooperative dispute redressal, multi-society labor pool monitoring, and social security welfare compliance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Federation Network
            </span>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
          {actionSuccess}
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Affiliated Co-ops</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">domain</span>
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">18 Societies</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">3 Apex Regional Federations</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Workforce</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">groups</span>
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">1,310 Workers</p>
          <p className="text-[11px] text-teal-700 font-semibold mt-1">100% KYC & Trade Certified</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Welfare Pool</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">savings</span>
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">₹4,82,450</p>
          <p className="text-[11px] text-purple-700 font-semibold mt-1">5% Cess Reserve + PMSBY</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Grievance SLA</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">gavel</span>
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">96.8% Resolved</p>
          <p className="text-[11px] text-amber-700 font-semibold mt-1">Under 48h Resolution Rule</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("grievance")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
            activeTab === "grievance"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">gavel</span>
          <span>Dispute Redressal Cell ({grievances.filter((g) => g.status === "OPEN").length} Open)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cooperatives")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
            activeTab === "cooperatives"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">domain</span>
          <span>Affiliated Societies ({COOPERATIVE_SOCIETIES.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("welfare")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
            activeTab === "welfare"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">shield</span>
          <span>Social Security & PMSBY</span>
        </button>
      </div>

      {/* Tab 1: Grievance Redressal Cell */}
      {activeTab === "grievance" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Consumer & Worker Arbitration Registry</h3>
              <p className="text-xs text-slate-500">
                Official grievance portal mandated by Cooperative Societies Act.
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {["ALL", "OPEN", "IN_ARBITRATION", "RESOLVED"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    filterStatus === st
                      ? "bg-teal-700 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {st.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredGrievances.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500">
                <span className="material-symbols-outlined text-4xl text-slate-300">verified</span>
                <p className="mt-2 font-bold text-sm">No complaints found in this category.</p>
              </div>
            ) : (
              filteredGrievances.map((g) => (
                <div
                  key={g.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-slate-900 text-xs px-2 py-1 bg-slate-100 rounded-lg">
                        {g.id}
                      </span>
                      <span className="text-xs text-slate-500">Booking: <strong className="text-slate-800">{g.bookingRef}</strong></span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{g.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          g.priority === "CRITICAL"
                            ? "bg-rose-100 text-rose-700 border border-rose-200"
                            : g.priority === "HIGH"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-blue-100 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {g.priority} Priority
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                          g.status === "RESOLVED"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : g.status === "IN_ARBITRATION"
                            ? "bg-purple-100 text-purple-800 border border-purple-200"
                            : "bg-rose-100 text-rose-800 border border-rose-200"
                        }`}
                      >
                        {g.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Grievance Nature</span>
                      <p className="font-bold text-slate-800 mt-0.5">{g.category}</p>
                      <p className="text-[11px] text-slate-500 mt-1">Submitted by: <strong className="text-slate-700">{g.submittedBy}</strong></p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Assigned Technician</span>
                      <p className="font-bold text-slate-800 mt-0.5">{g.workerName}</p>
                      <p className="text-[11px] text-slate-500 mt-1">SLA: <span className="text-amber-700 font-medium">{g.resolutionDeadline}</span></p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Details / Description</span>
                      <p className="text-slate-700 mt-0.5 italic">"{g.description}"</p>
                    </div>
                  </div>

                  {/* Federation Actions */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span className="material-symbols-outlined text-[16px] text-teal-700">policy</span>
                      Arbitration overseen by Cooperative Society Inspector
                    </div>

                    <div className="flex items-center gap-2">
                      {g.status !== "IN_ARBITRATION" && g.status !== "RESOLVED" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(g.id, "IN_ARBITRATION")}
                          className="px-3 py-1.5 rounded-lg border border-purple-300 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Mark In Arbitration
                        </button>
                      )}
                      {g.status !== "RESOLVED" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(g.id, "RESOLVED")}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[16px]">check</span>
                          Resolve & Close Dispute
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Affiliated Cooperative Societies */}
      {activeTab === "cooperatives" && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base">Federated Member Primary Societies (PACS / LCMS)</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Primary Labour Cooperative Societies contributing verified technicians to the SevaSetu network.
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              {COOPERATIVE_SOCIETIES.map((coop) => (
                <div key={coop.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold mb-3">
                    <span className="material-symbols-outlined text-2xl">account_balance</span>
                  </div>
                  <h4 className="font-black text-slate-900 text-sm">{coop.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    {coop.district}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Workforce</span>
                      <strong className="text-slate-900">{coop.workersCount} Members</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Live Dispatches</span>
                      <strong className="text-teal-700">{coop.activeBookings} Active</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Compliance</span>
                      <strong className="text-emerald-700">{coop.complianceScore}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">PMSBY Cover</span>
                      <strong className="text-indigo-700">{coop.pmsbyCovered}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Social Security & Welfare Fund Pool */}
      {activeTab === "welfare" && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Cooperative Social Security & Insurance Ledger</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Statutory 5% welfare cess accumulation and Pradhan Mantri Suraksha Bima Yojana (PMSBY) audit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wide">Accumulated Cess (FY 26-27)</span>
                <p className="text-xl font-black text-teal-950 mt-1">₹4,82,450</p>
                <p className="text-[11px] text-teal-700 mt-1">Held in State Cooperative Apex Bank</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">PMSBY Policy Enrolled</span>
                <p className="text-xl font-black text-emerald-950 mt-1">1,240 Workers</p>
                <p className="text-[11px] text-emerald-700 mt-1">₹2,00,000 Death & Disability Cover</p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wide">Claims Settled YTD</span>
                <p className="text-xl font-black text-purple-950 mt-1">₹1,18,000</p>
                <p className="text-[11px] text-purple-700 mt-1">14 Medical & Tool Kit Subsidies</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
                Annual Cooperative Patronage Dividend Forecast
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                In compliance with Section 43 of the Multi-State Cooperative Societies Act, 25% of net operational surplus is transferred to the General Reserve, and the remaining surplus is distributed annually among verified member technicians proportional to completed jobs.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
