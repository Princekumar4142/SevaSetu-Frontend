import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../context/LanguageContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import shoppingAssistantImg from "../../assets/services/shopping-assistant.jpg";
import cityGuideImg from "../../assets/services/city-guide.jpg";
import { SERVICE_IMAGES, getServiceImage } from "../../constants/serviceImages";
import {
  HOME_SERVICES,
  PERSONAL_SERVICES,
  TRENDING_SERVICES,
  PROFESSIONAL_SERVICES,
  HEALTH_WELLNESS_SERVICES,
  EVENT_SERVICES,
} from "../../constants/bookingCatalog";

const WORKER_BENEFITS = [
  { icon: "trending_up", text: "Guaranteed Fair Payout: ₹25k – ₹50k/mo" },
  { icon: "school", text: "Free Skill & Agri-Tech Certification" },
  { icon: "health_and_safety", text: "Accidental Insurance & Health Cover" },
  { icon: "diversity_3", text: "Cooperative Ownership & Dividend Share" },
  { icon: "calendar_month", text: "Flexible Gigs & Local Work Shifts" },
  { icon: "verified", text: "Federation & PACS Verified Worker Badge" },
];

const EXTRA_SERVICE_TABS = [
  { id: "home", label: "🏠 Home & Maintenance", items: HOME_SERVICES },
  { id: "personal", label: "✨ Salon & Personal Care", items: PERSONAL_SERVICES },
  { id: "professional", label: "💼 CA, Tax & Legal", items: PROFESSIONAL_SERVICES },
  { id: "health", label: "🏥 Health & Elder Care", items: HEALTH_WELLNESS_SERVICES },
  { id: "events", label: "🎉 Events & Sound", items: EVENT_SERVICES },
  { id: "trending", label: "🔥 Trending Gigs", items: TRENDING_SERVICES },
];

export default function JoinAsWorker() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { tr } = useLanguage();
  const { ref, isRevealed } = useScrollReveal();
  const [activeTab, setActiveTab] = useState("home");
  const [imgErrors, setImgErrors] = useState({});

  const handleServiceClick = (service) => {
    if (service && service.id) {
      navigate(`/customer/services/${service.id}`);
    } else {
      navigate("/customer");
    }
  };

  const currentTabObj = EXTRA_SERVICE_TABS.find((t) => t.id === activeTab) || EXTRA_SERVICE_TABS[0];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 border-t border-slate-200 relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div ref={ref} className="max-w-screen-xl mx-auto px-[16px] md:px-[64px] relative z-10">

        {/* ═══════════════════════════════════════════════════════════════════
            PART 1: VERIFIED WORKER SERVICES & COMPANION CARE SHOWCASE
        ═══════════════════════════════════════════════════════════════════ */}
        <div className={`mb-16 ${isRevealed ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-wider mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              {tr("Verified Worker Network & Additional Services")}
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {tr("Labour Cooperative Workforce & Specialized Support Services")}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              {tr("In addition to farm mechanization, our federation deploys verified cooperative workers for direct assisted shopping, elder accompaniment, and specialized household needs.")}
            </p>
          </div>

          {/* ── The 2 Core Direct Assisted Companion Services ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            
            {/* Companion Service 1 */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col justify-between hover:border-indigo-300 transition-all group">
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                <img
                  src={shoppingAssistantImg}
                  alt={tr("Market & Heavy Bag Shopping Assistant")}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-brand-purple border border-purple-100 shadow-sm flex items-center gap-1.5">
                  <span>🛍️</span>
                  <span>{tr("Elder & Family Care")}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-amber-400 border border-slate-700 shadow-sm">
                  {tr("Starting at")} ₹149/hr
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-amber-500 font-bold text-xs sm:text-sm flex items-center gap-0.5">
                      ★ 4.96 (18k+ reviews)
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-700 font-bold text-xs">{tr("100% Verified Workers")}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                    {tr("Market & Heavy Bag Shopping Assistant")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {tr("A respectful, background-verified local companion to carry heavy vegetable or grocery bags, accompany elders gently, and assist with transport from crowded local bazaars.")}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase block">{tr("Pricing")}</span>
                    <span className="text-lg font-black text-slate-900">₹149 <span className="text-xs font-medium text-slate-500">/ hour</span></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/customer/services/shopping-bag-assistant")}
                    className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{tr("Book Assistant")}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Companion Service 2 */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col justify-between hover:border-indigo-300 transition-all group">
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                <img
                  src={cityGuideImg}
                  alt={tr("City Wholesale Market & Discovery Guide")}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-emerald-700 border border-emerald-100 shadow-sm flex items-center gap-1.5">
                  <span>🗺️</span>
                  <span>{tr("New In City & Wholesale")}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-amber-400 border border-slate-700 shadow-sm">
                  {tr("Starting at")} ₹199/hr
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-amber-500 font-bold text-xs sm:text-sm flex items-center gap-0.5">
                      ★ 4.94 (14k+ reviews)
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-700 font-bold text-xs">{tr("100% Verified Workers")}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                    {tr("City Wholesale Market & Discovery Guide")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {tr("New to the city or planning bulk purchases? Hire an experienced local guide to explore wholesale textile, spice, or electronics markets and negotiate authentic prices.")}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase block">{tr("Pricing")}</span>
                    <span className="text-lg font-black text-slate-900">₹199 <span className="text-xs font-medium text-slate-500">/ hour</span></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/customer/services/city-shopping-guide")}
                    className="px-6 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-700/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{tr("Book Guide")}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* ── Additional Specialized Services Catalog (Tabs & Visual Grid) ── */}
          <div className="bg-slate-50/90 rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  {tr("Browse More Cooperative Household & Urban Services")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {tr("Select a category to view verified technicians and service providers")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/customer/workers")}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 shrink-0"
              >
                <span>{tr("View Full Worker Directory")}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
              {EXTRA_SERVICE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105"
                      : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  {tr(tab.label)}
                </button>
              ))}
            </div>

            {/* Services Visual Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {currentTabObj.items.map((item) => {
                const img = SERVICE_IMAGES[item.id] || getServiceImage(item.id, item.label);
                const hasError = imgErrors[item.id];

                return (
                  <div
                    key={item.id}
                    onClick={() => handleServiceClick(item)}
                    className="group bg-white rounded-2xl p-3 border border-slate-200/90 hover:border-indigo-400 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center cursor-pointer relative overflow-hidden"
                  >
                    {item.badge && (
                      <span className="absolute top-2 right-2 text-[9px] font-black px-2 py-0.5 rounded-full z-10 bg-indigo-600 text-white uppercase tracking-wider shadow-sm">
                        {tr(item.badge)}
                      </span>
                    )}

                    {/* Image / Logo Container */}
                    <div className="w-full h-24 sm:h-28 rounded-xl overflow-hidden mb-2.5 bg-slate-100 border border-slate-200/80 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center relative shadow-inner">
                      {img && !hasError ? (
                        <img
                          src={img}
                          alt={tr(item.label)}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={() => setImgErrors((prev) => ({ ...prev, [item.id]: true }))}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600">
                          <span className="material-symbols-outlined text-[32px]">{item.icon || "build"}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                      {tr(item.label)}
                    </span>

                    <span className="text-[11px] text-indigo-600 font-bold mt-2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {tr("Book Service")} <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            PART 2: WORKER REGISTRATION & FEDERATION MEMBERSHIP CTA
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="pt-8 border-t border-slate-200/80">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Content */}
            <div className="flex-1">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest mb-3">
                {tr("For Skilled Workers & Technicians")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                {tr("Join India's Largest Labour Cooperative Network")}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mb-6 leading-relaxed">
                {tr("Become an authorized SevaSetu worker. Earn dignified, transparent wages without private middlemen commission. Benefit from accident insurance, cooperative pension, and government skill training.")}
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {WORKER_BENEFITS.map((b) => (
                  <div
                    key={b.text}
                    className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-slate-200/80 shadow-sm hover:border-emerald-300 transition-colors"
                  >
                    <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">{b.icon}</span>
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{tr(b.text)}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/register/worker")}
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-slate-900/20 active:scale-95 group cursor-pointer"
                >
                  <span>{tr("Register as Cooperative Worker")}</span>
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/customer/workers")}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm sm:text-base px-6 py-4 rounded-2xl border border-slate-200 transition-all cursor-pointer"
                >
                  <span>{tr("Browse Worker Profiles")}</span>
                </button>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="shrink-0 w-full max-w-sm">
              <div className="relative">
                {/* Main Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4 text-emerald-700">
                    <span className="material-symbols-outlined text-[36px]">engineering</span>
                  </div>

                  <h4 className="text-center text-lg font-black text-slate-900">{tr("Start Working Today")}</h4>
                  <p className="text-center text-xs text-slate-500 mb-6">{tr("Join 15,000+ verified cooperative members")}</p>

                  <div className="space-y-3 mb-6">
                    {[
                      { step: "Aadhaar / ID Verification", desc: "Digital KYC in 5 minutes" },
                      { step: "Skill / Trade Selection", desc: "Select tractor, solar, salon, etc." },
                      { step: "PACS & Society Approval", desc: "Certified by cooperative body" },
                      { step: "Start Receiving Direct Bookings", desc: "Instant payout to your bank" },
                    ].map((item, idx) => (
                      <div key={item.step} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-slate-800 block leading-tight">{tr(item.step)}</span>
                          <span className="text-[11px] text-slate-400">{tr(item.desc)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Security Badge */}
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center gap-2 text-xs font-bold text-emerald-800">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    <span>{tr("100% Commission-Free Earnings")}</span>
                  </div>
                </div>

                {/* Floating Earning Badge */}
                <div className="absolute -bottom-4 -left-4 bg-slate-900 text-white rounded-2xl px-4 py-2.5 shadow-xl border border-slate-800 z-20 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-xs">
                    ₹
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Average Monthly</span>
                    <span className="text-sm font-black text-emerald-400">₹32,500 Direct</span>
                  </div>
                </div>

                {/* Floating Rating Badge */}
                <div className="absolute -top-3 -right-3 bg-amber-400 text-slate-950 rounded-2xl px-3 py-1.5 shadow-lg font-black text-xs z-20 flex items-center gap-1">
                  <span>★</span>
                  <span>4.94 Trust Score</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
