import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  AGRI_MECHANIZATION_SERVICES,
  FOODTECH_PROCESSING_SERVICES,
  RURAL_INFRASTRUCTURE_SERVICES,
  DAIRY_LIVESTOCK_SERVICES,
  RURAL_EMERGENCY_SERVICES,
  INSTITUTIONAL_BULK_SERVICES,
  PERSONAL_SERVICES,
  HOME_SERVICES,
  TRENDING_SERVICES,
  PROFESSIONAL_SERVICES,
  HEALTH_WELLNESS_SERVICES,
  EVENT_SERVICES,
} from "../constants/bookingCatalog";
import { SERVICE_IMAGES } from "../constants/serviceImages";

const CATEGORY_CONFIG = {
  "agri-mechanization": {
    id: "agri-mechanization",
    label: "Agri & Farm Mechanization",
    emoji: "🚜",
    gradient: "from-emerald-700 to-green-600",
    lightBg: "bg-emerald-50",
    border: "border-emerald-200",
    textColor: "text-emerald-700",
    items: AGRI_MECHANIZATION_SERVICES,
  },
  "foodtech-processing": {
    id: "foodtech-processing",
    label: "FoodTech & Agro-Processing",
    emoji: "🌾",
    gradient: "from-amber-600 to-yellow-600",
    lightBg: "bg-amber-50",
    border: "border-amber-200",
    textColor: "text-amber-700",
    items: FOODTECH_PROCESSING_SERVICES,
  },
  "rural-infrastructure": {
    id: "rural-infrastructure",
    label: "Rural & Panchayat Infrastructure",
    emoji: "🏡",
    gradient: "from-sky-700 to-blue-600",
    lightBg: "bg-sky-50",
    border: "border-sky-200",
    textColor: "text-sky-700",
    items: RURAL_INFRASTRUCTURE_SERVICES,
  },
  "dairy-livestock": {
    id: "dairy-livestock",
    label: "Dairy, Livestock & Paravet",
    emoji: "🐄",
    gradient: "from-teal-700 to-emerald-600",
    lightBg: "bg-teal-50",
    border: "border-teal-200",
    textColor: "text-teal-700",
    items: DAIRY_LIVESTOCK_SERVICES,
  },
  "rural-emergency": {
    id: "rural-emergency",
    label: "Tatkal Farm Breakdown (45-Min)",
    emoji: "⚡",
    gradient: "from-rose-600 to-red-600",
    lightBg: "bg-rose-50",
    border: "border-rose-200",
    textColor: "text-rose-700",
    items: RURAL_EMERGENCY_SERVICES,
  },
  "institutional-bulk": {
    id: "institutional-bulk",
    label: "FPO & Institutional Bulk Squads",
    emoji: "🏢",
    gradient: "from-indigo-700 to-violet-600",
    lightBg: "bg-indigo-50",
    border: "border-indigo-200",
    textColor: "text-indigo-700",
    items: INSTITUTIONAL_BULK_SERVICES,
  },

  personal: {
    id: "personal",
    label: "Personal Services",
    emoji: "✨",
    gradient: "from-pink-600 to-rose-500",
    lightBg: "bg-pink-50",
    border: "border-pink-200",
    textColor: "text-pink-600",
    items: PERSONAL_SERVICES,
  },
  home: {
    id: "home",
    label: "Home Services",
    emoji: "🏠",
    gradient: "from-blue-600 to-indigo-500",
    lightBg: "bg-blue-50",
    border: "border-blue-200",
    textColor: "text-blue-600",
    items: HOME_SERVICES,
  },
  trending: {
    id: "trending",
    label: "Trending Services",
    emoji: "🔥",
    gradient: "from-orange-500 to-amber-400",
    lightBg: "bg-orange-50",
    border: "border-orange-200",
    textColor: "text-orange-600",
    items: TRENDING_SERVICES,
  },
  professional: {
    id: "professional",
    label: "Professional Services",
    emoji: "💼",
    gradient: "from-violet-600 to-purple-500",
    lightBg: "bg-violet-50",
    border: "border-violet-200",
    textColor: "text-violet-600",
    items: PROFESSIONAL_SERVICES,
  },
  health: {
    id: "health",
    label: "Health & Wellness",
    emoji: "🏥",
    gradient: "from-emerald-600 to-teal-500",
    lightBg: "bg-emerald-50",
    border: "border-emerald-200",
    textColor: "text-emerald-600",
    items: HEALTH_WELLNESS_SERVICES,
  },
  events: {
    id: "events",
    label: "Event Services",
    emoji: "🎉",
    gradient: "from-fuchsia-600 to-pink-500",
    lightBg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    textColor: "text-fuchsia-600",
    items: EVENT_SERVICES,
  },
};

export default function CategoryServicesPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const cat = CATEGORY_CONFIG[categoryId];

  if (!cat) {
    // Automatically redirect to full booking & ordering catalog
    return <Navigate to={`/customer/services/${categoryId || "electricians"}`} replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Professional Floating Hero Banner Card (Spaced down from navbar) ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6">
        <div
          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r ${cat.gradient} p-4 sm:p-6 md:p-7 shadow-lg text-white`}
        >
          {/* Subtle decorative glow for premium feel */}
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute right-24 -bottom-10 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  if (window.history.length > 1) navigate(-1);
                  else navigate("/");
                }}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/20 hover:bg-white/30 active:scale-95 text-white backdrop-blur-md flex items-center justify-center transition-all shrink-0 shadow-sm border border-white/20"
                aria-label="Go back"
                title="Go back"
              >
                <span className="material-symbols-outlined text-[22px]">arrow_back</span>
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl shrink-0">{cat.emoji}</span>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-sm">
                    {cat.label}
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-white/90 font-medium mt-0.5 flex items-center gap-2">
                  <span>{cat.items.length} verified services</span>
                  <span>•</span>
                  <span>Trusted & Guaranteed</span>
                </p>
              </div>
            </div>

            {/* Instant booking pill badge */}
            <div className="hidden sm:flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Instant Booking Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 pt-6 pb-12 sm:pb-16">
        <h2 className="text-lg font-extrabold text-slate-800 mb-5">
          All Services in {cat.label}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {cat.items.map((item) => {
            const img = SERVICE_IMAGES[item.id];

            return (
              <button
                key={item.id + item.label}
                type="button"
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/login");
                  } else {
                    navigate(`/customer/services/${item.id}`);
                  }
                }}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden text-left relative"
              >
                {/* Badge */}
                {item.badge && (
                  <span className="absolute top-2 right-2 z-10 text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-white shadow">
                    {item.badge}
                  </span>
                )}

                {/* Image or Icon */}
                <div className={`w-full h-32 sm:h-36 ${cat.lightBg} flex items-center justify-center overflow-hidden`}>
                  {img ? (
                    <img
                      src={img}
                      alt={item.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  {/* Fallback icon — always rendered, hidden when image loads */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-white border ${cat.border} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${img ? "hidden" : "flex"}`}
                  >
                    <span className={`material-symbols-outlined text-[32px] ${cat.textColor}`}>
                      {item.icon}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="p-3">
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight">
                    {item.label}
                  </h3>
                  <p className={`text-xs font-semibold mt-1 ${cat.textColor} flex items-center gap-0.5`}>
                    Book now
                    <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Other Categories */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-base font-extrabold text-slate-700 mb-4">Explore Other Categories</h3>
          <div className="flex flex-wrap gap-3">
            {Object.values(CATEGORY_CONFIG)
              .filter((c) => c.id !== cat.id)
              .map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => navigate(`/customer/category/${c.id}`)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${c.border} ${c.lightBg} ${c.textColor} text-sm font-bold hover:shadow-sm transition-all`}
                >
                  <span>{c.emoji}</span>
                  {c.label}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
