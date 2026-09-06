import { useParams, useNavigate, Link } from "react-router-dom";
import {
  PERSONAL_SERVICES,
  HOME_SERVICES,
  TRENDING_SERVICES,
  PROFESSIONAL_SERVICES,
  HEALTH_WELLNESS_SERVICES,
  EVENT_SERVICES,
} from "../constants/bookingCatalog";

import personalImg from "../assets/services/personal-services.jpg";
import homeImg from "../assets/services/ac-repair.jpg";
import trendingImg from "../assets/services/trending-services.jpg";
import professionalImg from "../assets/services/professional-services.jpg";
import healthImg from "../assets/services/health-wellness.jpg";
import eventImg from "../assets/services/event-services.jpg";
import salonWomenImg from "../assets/services/salon-women.jpg";
import spaWomenImg from "../assets/services/spa-women.jpg";
import cleaningImg from "../assets/services/cleaning-pest.jpg";
import electricalImg from "../assets/services/electrical-plumbing.jpg";
import paintingImg from "../assets/services/home-painting.jpg";

const SERVICE_IMG_MAP = {
  "salon-women": salonWomenImg,
  "spa-women": spaWomenImg,
  "cleaning-pest-1": cleaningImg,
  "electrical-plumbing": electricalImg,
  "home-painting": paintingImg,
  "ac-repair": homeImg,
};

const CATEGORY_CONFIG = {
  personal: {
    id: "personal",
    label: "Personal Services",
    emoji: "✨",
    desc: "Premium beauty & grooming services at your doorstep by certified professionals.",
    image: personalImg,
    gradient: "from-pink-600 to-rose-600",
    lightBg: "bg-pink-50",
    border: "border-pink-200",
    textColor: "text-pink-600",
    badgeBg: "bg-pink-100",
    items: PERSONAL_SERVICES,
  },
  home: {
    id: "home",
    label: "Home Services",
    emoji: "🏠",
    desc: "Trusted home maintenance & repair services with transparent fixed pricing.",
    image: homeImg,
    gradient: "from-blue-600 to-indigo-600",
    lightBg: "bg-blue-50",
    border: "border-blue-200",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-100",
    items: HOME_SERVICES,
  },
  trending: {
    id: "trending",
    label: "Trending Services",
    emoji: "🔥",
    desc: "Most booked services this week — affordable, fast, and highly rated.",
    image: trendingImg,
    gradient: "from-orange-500 to-amber-500",
    lightBg: "bg-orange-50",
    border: "border-orange-200",
    textColor: "text-orange-600",
    badgeBg: "bg-orange-100",
    items: TRENDING_SERVICES,
  },
  professional: {
    id: "professional",
    label: "Professional Services",
    emoji: "💼",
    desc: "Expert CA, legal, tax, and business services from certified professionals.",
    image: professionalImg,
    gradient: "from-violet-600 to-purple-700",
    lightBg: "bg-violet-50",
    border: "border-violet-200",
    textColor: "text-violet-600",
    badgeBg: "bg-violet-100",
    items: PROFESSIONAL_SERVICES,
  },
  health: {
    id: "health",
    label: "Health & Wellness",
    emoji: "🏥",
    desc: "Compassionate home healthcare, physiotherapy & wellness support.",
    image: healthImg,
    gradient: "from-emerald-600 to-teal-600",
    lightBg: "bg-emerald-50",
    border: "border-emerald-200",
    textColor: "text-emerald-600",
    badgeBg: "bg-emerald-100",
    items: HEALTH_WELLNESS_SERVICES,
  },
  events: {
    id: "events",
    label: "Event Services",
    emoji: "🎉",
    desc: "Make every celebration unforgettable with our event & catering experts.",
    image: eventImg,
    gradient: "from-fuchsia-600 to-pink-600",
    lightBg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    textColor: "text-fuchsia-600",
    badgeBg: "bg-fuchsia-100",
    items: EVENT_SERVICES,
  },
};

export default function CategoryServicesPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const cat = CATEGORY_CONFIG[categoryId];

  if (!cat) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <span className="text-5xl">🔍</span>
        <h2 className="text-xl font-bold text-slate-700">Category not found</h2>
        <Link to="/" className="text-indigo-600 font-semibold hover:underline">← Go Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero Banner ── */}
      <div className={`relative bg-gradient-to-r ${cat.gradient} overflow-hidden`}>
        {/* Background image overlay */}
        <img
          src={cat.image}
          alt={cat.label}
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back</span>
            </button>
            <span>/</span>
            <span className="text-white font-semibold">{cat.label}</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Category image circle */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl shrink-0">
              <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl">{cat.emoji}</span>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {cat.label}
                </h1>
              </div>
              <p className="text-white/80 text-sm sm:text-base max-w-xl">{cat.desc}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {cat.items.length} Services
                </span>
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                  ⚡ Fixed Pricing
                </span>
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                  ✓ Verified Pros
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <h2 className="text-lg font-extrabold text-slate-800 mb-6">
          All Services in {cat.label}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {cat.items.map((item) => {
            const img = SERVICE_IMG_MAP[item.id];
            return (
              <button
                key={item.id + item.label}
                type="button"
                onClick={() => navigate(`/customer/services/${item.id}`)}
                className={`group bg-white rounded-2xl border ${cat.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden text-left relative`}
              >
                {/* Badge */}
                {item.badge && (
                  <span className="absolute top-2 right-2 z-10 text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-white shadow">
                    {item.badge}
                  </span>
                )}

                {/* Image or Icon area */}
                <div className={`w-full h-32 sm:h-36 ${cat.lightBg} flex items-center justify-center overflow-hidden`}>
                  {img ? (
                    <img
                      src={img}
                      alt={item.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className={`w-16 h-16 rounded-2xl bg-white border ${cat.border} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      <span className={`material-symbols-outlined text-[32px] ${cat.textColor}`}>
                        {item.icon}
                      </span>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="p-3">
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight">
                    {item.label}
                  </h3>
                  <p className={`text-xs font-semibold mt-1 ${cat.textColor} flex items-center gap-1`}>
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
