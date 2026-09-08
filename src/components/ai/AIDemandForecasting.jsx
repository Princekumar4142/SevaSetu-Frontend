import { useState } from "react";

const SEASONS = [
  {
    id: "kharif-harvest",
    name: "🌾 Kharif Harvesting & Storage (Current Peak)",
    months: "Oct – Nov",
    description: "Peak harvest for Paddy, Maize & Soyabean. Grain Mandis & Cold Storages operating at 100% capacity.",
    demandMultiplier: "1.85x",
    topSkillsNeeded: ["Combine Harvester Operator", "Mandi Grain Sorter & Bagging", "Cold Storage Chiller Tech"],
    projectedGigs: 1420,
    activeWorkforce: 1180,
    gap: -240,
  },
  {
    id: "rabi-sowing",
    name: "🚜 Rabi Sowing & Soil Preparation",
    months: "Nov – Dec",
    description: "Wheat, Mustard & Gram sowing across river basins. Heavy tractor, rotavator and seed drill usage.",
    demandMultiplier: "1.65x",
    topSkillsNeeded: ["Tractor Operator (Rotavator)", "Laser Land Leveller", "Agri-Drone Nano Urea Pilot"],
    projectedGigs: 1150,
    activeWorkforce: 1050,
    gap: -100,
  },
  {
    id: "summer-irrigation",
    name: "☀️ Summer Peak Irrigation & Solar Tech",
    months: "Mar – May",
    description: "High ground-water draw, intensive solar pump utilization, and tube-well motor burnout repairs.",
    demandMultiplier: "1.70x",
    topSkillsNeeded: ["Solar Pump Tech", "Tube-Well Motor Rewinder", "Drip Micro-Irrigation Mechanic"],
    projectedGigs: 980,
    activeWorkforce: 920,
    gap: -60,
  },
  {
    id: "monsoon-drainage",
    name: "🌧️ Monsoon & Panchayat Sanitation",
    months: "Jul – Aug",
    description: "Gram Panchayat drainage desilting, standing crop flood diversion, and Jal Jeevan pipeline repairs.",
    demandMultiplier: "1.50x",
    topSkillsNeeded: ["Panchayat Cleanliness Squad", "Water Pipeline Welder", "Biogas Digester Mason"],
    projectedGigs: 850,
    activeWorkforce: 900,
    gap: +50,
  },
];

const BLOCK_HEATMAP = [
  { block: "Bettiah Rural", demandScore: 94, status: "Critical Shortage", needed: "Harvester Ops (+14)", allocated: 48, efficiency: "98%" },
  { block: "Narkatiaganj", demandScore: 91, status: "High Demand", needed: "Cold Storage Tech (+8)", allocated: 36, efficiency: "95%" },
  { block: "Bagaha Cluster", demandScore: 78, status: "Optimal", needed: "Balanced Fleet", allocated: 54, efficiency: "92%" },
  { block: "Majhaulia", demandScore: 68, status: "Surplus Workers", needed: "Transfer to Bettiah (+10)", allocated: 42, efficiency: "86%" },
  { block: "Chanpatia Mandi", demandScore: 88, status: "High Demand", needed: "Grain Sorters (+12)", allocated: 39, efficiency: "96%" },
];

export default function AIDemandForecasting() {
  const [selectedSeason, setSelectedSeason] = useState(SEASONS[0]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedStatus, setOptimizedStatus] = useState(false);

  const handleRunOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimizedStatus(true);
    }, 1200);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            AI Demand Forecasting &amp; Fair Allocation Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Cooperative Seasonal Workforce Intelligence
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Predicts agricultural labor demand across crop seasons and prevents worker starvation using cooperative fair-share allocation algorithms.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRunOptimization}
          disabled={isOptimizing}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 shrink-0 cursor-pointer disabled:opacity-60"
        >
          {isOptimizing ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Running Neural Optimizer...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              Run Fair-Share Allocation
            </>
          )}
        </button>
      </div>

      {/* ── Notification Banner on Optimization ── */}
      {optimizedStatus && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-600 text-2xl">verified</span>
            <div>
              <p className="text-xs sm:text-sm font-black text-emerald-900">
                AI Fair-Share Allocation Applied Across 5 Cooperative Blocks
              </p>
              <p className="text-[11px] text-emerald-700">
                10 surplus workers from Majhaulia auto-assigned to Bettiah Rural. Guaranteed minimum 5 gigs/week per cooperative member achieved (Gini Index: 0.11).
              </p>
            </div>
          </div>
          <button
            onClick={() => setOptimizedStatus(false)}
            className="text-xs font-bold text-emerald-700 hover:underline shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ── Season Selector Tabs ── */}
      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
          Select Crop Season &amp; Demand Period:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SEASONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedSeason(s)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedSeason.id === s.id
                  ? "bg-emerald-50/80 border-emerald-600 shadow-md shadow-emerald-100 scale-[1.02]"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-500">{s.months}</span>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  {s.demandMultiplier}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1">{s.name}</h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{s.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Active Season Deep-Dive Metrics ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Projected Bookings</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">{selectedSeason.projectedGigs}</span>
            <span className="text-xs font-bold text-emerald-600">+{selectedSeason.demandMultiplier} surge</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Calculated from historical agricultural harvest yields and weather alerts.</p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Cooperative Workforce Pool</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-indigo-900">{selectedSeason.activeWorkforce}</span>
            <span className="text-xs font-bold text-slate-600">Verified Members</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Active PACS members ready with valid certifications &amp; Aadhaar e-KYC.</p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Workforce Balance (Gap)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-2xl font-black ${selectedSeason.gap < 0 ? "text-amber-700" : "text-emerald-700"}`}>
              {selectedSeason.gap > 0 ? `+${selectedSeason.gap}` : selectedSeason.gap} Workers
            </span>
            <span className="text-xs font-bold text-slate-700">
              {selectedSeason.gap < 0 ? "Inter-block mobilization needed" : "Surplus buffer"}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mt-2">
            Top Priority: {selectedSeason.topSkillsNeeded[0]}
          </p>
        </div>
      </div>

      {/* ── Block-Level Demand vs Supply Heatmap ── */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">travel_explore</span>
            Block-Level Demand Heatmap (West Champaran Federation)
          </h3>
          <span className="text-xs text-slate-500">Live Geo-Spatial AI Sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold">
                <th className="py-3 px-3">Cooperative Block</th>
                <th className="py-3 px-3">Demand Index</th>
                <th className="py-3 px-3">Current Status</th>
                <th className="py-3 px-3">Workforce Allocation</th>
                <th className="py-3 px-3">AI Action Recommendation</th>
                <th className="py-3 px-3 text-right">Fairness Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {BLOCK_HEATMAP.map((b) => (
                <tr key={b.block} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-900">{b.block}</td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            b.demandScore > 90 ? "bg-rose-500" : b.demandScore > 80 ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${b.demandScore}%` }}
                        />
                      </div>
                      <span className="font-bold">{b.demandScore}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        b.status === "Critical Shortage"
                          ? "bg-rose-100 text-rose-800"
                          : b.status === "High Demand"
                          ? "bg-amber-100 text-amber-800"
                          : b.status === "Surplus Workers"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-semibold">{b.allocated} Active Workers</td>
                  <td className="py-3.5 px-3 text-slate-600 font-bold">{b.needed}</td>
                  <td className="py-3.5 px-3 text-right font-black text-emerald-700">{b.efficiency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Cooperative Fair-Share Formula Highlights ── */}
      <div className="bg-gradient-to-r from-indigo-50/60 via-purple-50/40 to-slate-50 rounded-2xl p-4 sm:p-5 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">balance</span>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-slate-900">
              Cooperative Fair-Share Allocation Standard
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Unlike private platforms where algorithms favor top 5% gig workers, SevaSetu rotates farm calls evenly so every verified cooperative member receives sustainable living wages.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-center shrink-0">
          <div className="bg-white px-3 py-1.5 rounded-xl border border-indigo-100 shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Gini Equality</span>
            <span className="text-sm font-black text-indigo-700">0.11 (Ideal)</span>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-xl border border-indigo-100 shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Min Gigs / Wk</span>
            <span className="text-sm font-black text-emerald-700">5+ Gigs Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
