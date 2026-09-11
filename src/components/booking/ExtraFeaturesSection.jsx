import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { SERVICE_IMAGES, getServiceImage } from "../../constants/serviceImages";
import {
  COOP_SKILLED_SERVICES,
  HOME_SERVICES,
  PERSONAL_SERVICES,
  PROFESSIONAL_SERVICES,
  HEALTH_WELLNESS_SERVICES,
  EVENT_SERVICES,
  TRENDING_SERVICES,
} from "../../constants/bookingCatalog";

const EXTRA_SERVICE_TABS = [
  { id: "home", label: "🏠 Home & Maintenance", items: HOME_SERVICES },
  { id: "skilled", label: "🛠️ Skilled Trades", items: COOP_SKILLED_SERVICES },
  { id: "personal", label: "✨ Salon & Personal Care", items: PERSONAL_SERVICES },
  { id: "professional", label: "💼 CA, Tax & Legal", items: PROFESSIONAL_SERVICES },
  { id: "health", label: "🏥 Health & Elder Care", items: HEALTH_WELLNESS_SERVICES },
  { id: "events", label: "🎉 Events & Sound", items: EVENT_SERVICES },
  { id: "trending", label: "🔥 Trending Gigs", items: TRENDING_SERVICES },
];

export default function ExtraFeaturesSection() {
  const navigate = useNavigate();
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
    <section ref={ref} className="border-b border-outline-variant/30 py-12 md:py-16 bg-white">
      <div className={`px-[16px] md:px-[64px] max-w-screen-xl mx-auto section-reveal ${isRevealed ? "revealed" : ""}`}>
        
        {/* Section Header */}
        <div className="mb-6">
          <div className="mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              {tr("Federation Verified Pool · Core Trades & Additional Services")}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>✨</span>
            <span>{tr("Extra Features")}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {tr("Direct verified cooperative workforce for skilled trades, household repairs, wellness and specialized support services")}
          </p>
        </div>

        {/* ── Specialized Services Catalog (Tabs & Visual Grid) ── */}
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
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 shrink-0 cursor-pointer"
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
                    <span className={`absolute top-2 right-2 text-[9px] font-black px-2 py-0.5 rounded-full z-10 uppercase tracking-wider shadow-sm ${
                      item.badge === "SALE" 
                        ? "bg-blue-600 text-white" 
                        : item.badge === "POPULAR" 
                        ? "bg-emerald-600 text-white" 
                        : "bg-indigo-600 text-white"
                    }`}>
                      {tr(item.badge)}
                    </span>
                  )}

                  {/* Image Container */}
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
    </section>
  );
}
