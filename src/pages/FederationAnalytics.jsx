import { useState } from "react";
import Button from "../components/Button";

const DEMAND_FORECASTS = [
  { category: "Deep Home Cleaning & Painting", surgeExpected: "+64%", peakDates: "Sept 15 - Oct 25", recommendedWorkers: 180, currentSupply: 142, alert: "Supply Shortage Expected" },
  { category: "Salon & Personal Care", surgeExpected: "+42%", peakDates: "Weekend Evenings", recommendedWorkers: 110, currentSupply: 115, alert: "Balanced" },
  { category: "Appliance & AC Winter Overhaul", surgeExpected: "+28%", peakDates: "Oct 01 - Nov 15", recommendedWorkers: 85, currentSupply: 90, alert: "Balanced" },
  { category: "Electrician & Smart Switch", surgeExpected: "+19%", peakDates: "Mon - Thu", recommendedWorkers: 60, currentSupply: 58, alert: "Balanced" },
];

export default function FederationAnalytics() {
  const [timeframe, setTimeframe] = useState("30D");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">AI Demand &amp; Workforce Analytics</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Machine learning demand prediction, supply-demand balancing, and cooperative welfare distribution indices
          </p>
        </div>
        <div className="flex items-center gap-2">
          {["7D", "30D", "90D"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded-lg font-label-md text-status-badge font-bold transition-colors ${
                timeframe === t ? "bg-brand-purple text-white" : "bg-surface-container-high text-on-surface-variant"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* AI Demand Pulse Card */}
      <div className="bg-gradient-to-br from-brand-purple via-[#582b82] to-[#2e1065] text-white rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-status-badge font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[16px] text-amber-300 fill">psychology</span>
            AI Predictive Demand Intelligence
          </div>
          <h2 className="font-headline-sm text-headline-sm font-bold mb-2">
            Festival Surge Approaching: Deep Cleaning Demand Up +64%
          </h2>
          <p className="font-body-md text-body-md text-white/80 mb-4">
            SevaSetu recommends mobilizing 38 additional cross-cooperative cleaning partners in Mumbai Central and Western zones to maintain zero-wait dispatch times.
          </p>
          <Button variant="outline" className="bg-white text-brand-purple font-bold hover:bg-white/90">
            Automate Cross-Cooperative Dispatch
          </Button>
        </div>
      </div>

      {/* Demand Matrix */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-sm">
        <h3 className="font-label-lg text-label-lg font-bold text-on-surface mb-4">
          Category-wise AI Demand Projections ({timeframe})
        </h3>
        <div className="divide-y divide-outline-variant">
          {DEMAND_FORECASTS.map((item, idx) => (
            <div key={idx} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="font-label-md text-label-md font-bold text-on-surface">{item.category}</p>
                <p className="font-status-badge text-status-badge text-on-surface-variant">
                  Peak Window: {item.peakDates} · Projected Surge: <strong className="text-brand-purple">{item.surgeExpected}</strong>
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="font-label-md font-bold text-on-surface">
                    {item.currentSupply} / {item.recommendedWorkers}
                  </span>
                  <p className="font-status-badge text-status-badge text-on-surface-variant">
                    Supply / Req. Workers
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-status-badge font-bold font-status-badge ${
                    item.alert === "Supply Shortage Expected"
                      ? "bg-amber-50 text-amber-800 border border-amber-200"
                      : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  {item.alert}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fair Pricing & Worker Welfare Distribution Index */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-full bg-emerald-50 text-brand-success flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
            </span>
            <h3 className="font-label-lg text-label-lg font-bold text-on-surface">Fair Price Benchmark Index</h3>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">
            Unlike corporate gig platforms that take 30-35% commission, SevaSetu guarantees minimum 85% worker take-home on every service order.
          </p>
          <div className="space-y-3 font-status-badge text-status-badge">
            <div>
              <div className="flex justify-between font-bold text-on-surface mb-1">
                <span>Worker Take-Home Share</span>
                <span className="text-brand-success font-bold">85% Guaranteed</span>
              </div>
              <div className="w-full bg-outline-variant h-2 rounded-full overflow-hidden">
                <div className="bg-brand-success h-full rounded-full" style={{ width: "85%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-bold text-on-surface mb-1">
                <span>Cooperative Dividend &amp; Welfare Pool</span>
                <span className="text-brand-purple font-bold">10%</span>
              </div>
              <div className="w-full bg-outline-variant h-2 rounded-full overflow-hidden">
                <div className="bg-brand-purple h-full rounded-full" style={{ width: "10%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-bold text-on-surface mb-1">
                <span>Platform Server &amp; Gateway Ops</span>
                <span className="text-on-surface-variant">5%</span>
              </div>
              <div className="w-full bg-outline-variant h-2 rounded-full overflow-hidden">
                <div className="bg-on-surface-variant h-full rounded-full" style={{ width: "5%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </span>
              <h3 className="font-label-lg text-label-lg font-bold text-on-surface">Federation Quality &amp; Trust Score</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Real-time sentiment analysis from over 12,400+ verified customer reviews across Maharashtra.
            </p>
            <div className="text-center py-4 bg-surface-container-low/60 rounded-xl">
              <span className="font-headline-lg text-headline-lg font-bold text-on-surface">4.92 / 5.0</span>
              <p className="font-status-badge text-status-badge text-brand-success font-bold mt-1">
                99.1% Positive Customer Sentiment
              </p>
            </div>
          </div>
          <Button variant="purple" className="w-full justify-center mt-4">
            Export Federation Quarterly Report (PDF)
          </Button>
        </div>
      </div>
    </div>
  );
}
