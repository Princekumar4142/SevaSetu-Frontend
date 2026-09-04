import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/* ── 3D-Styled Vector Icons (Rich gradients, bevels, depth & specular glints) ── */

function Icon3DAC() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ac-body" x1="6" y1="12" x2="42" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="40%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id="ac-vent" x1="12" y1="28" x2="36" y2="33" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="ac-spark" x1="20" y1="4" x2="28" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <filter id="ac-shadow" x="2" y="8" width="44" height="34" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0284C7" floodOpacity="0.25" />
        </filter>
      </defs>
      {/* 3D Main AC Unit Shell */}
      <g filter="url(#ac-shadow)">
        <rect x="5" y="13" width="38" height="22" rx="6" fill="url(#ac-body)" stroke="#FFFFFF" strokeWidth="1.5" />
        {/* Gloss highlight on top */}
        <path d="M7 15 C7 15 18 17 41 15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        {/* Front Vents */}
        <rect x="9" y="27" width="30" height="4" rx="2" fill="url(#ac-vent)" />
        <line x1="13" y1="29" x2="35" y2="29" stroke="#E0F2FE" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        {/* Digital display LED */}
        <rect x="33" y="17" width="6" height="4" rx="1.5" fill="#0369A1" />
        <circle cx="36" cy="19" r="1" fill="#34D399" />
      </g>
      {/* 3D Floating Ice Frost Diamond */}
      <path d="M24 3 L27 8 L32 9 L28 13 L29 18 L24 15 L19 18 L20 13 L16 9 L21 8 Z" fill="url(#ac-spark)" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="24" cy="11" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

function Icon3DElectrician() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bolt-front" x1="14" y1="6" x2="34" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="30%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="bolt-bevel" x1="14" y1="6" x2="28" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        <filter id="bolt-shadow" x="6" y="2" width="36" height="44" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#EA580C" floodOpacity="0.35" />
        </filter>
      </defs>
      {/* 3D Power Bolt Body with Bevel Layer */}
      <g filter="url(#bolt-shadow)">
        {/* Base 3D Extrusion */}
        <path
          d="M27 4 L13 24 L23 24 L19 44 L35 22 L24 22 L27 4 Z"
          fill="#C2410C"
          transform="translate(1.5, 2)"
        />
        {/* Front Face */}
        <path
          d="M27 4 L13 24 L23 24 L19 44 L35 22 L24 22 L27 4 Z"
          fill="url(#bolt-front)"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
        {/* Top-left specular shine */}
        <path d="M26 6 L16 23 L23 23" stroke="url(#bolt-bevel)" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      {/* Energy Sparks */}
      <circle cx="37" cy="12" r="2" fill="#FDE047" />
      <circle cx="9" cy="34" r="1.5" fill="#F97316" />
    </svg>
  );
}

function Icon3DPlumber() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wrench-metal" x1="8" y1="8" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="40%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="drop-grad" x1="26" y1="18" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <filter id="plumber-shadow" x="4" y="4" width="40" height="40" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#plumber-shadow)">
        {/* 3D Metallic Pipe / Wrench Handle */}
        <path
          d="M12 36 L26 22 L31 27 L17 41 C15 43 12 43 10 41 C8 39 8 36 10 34 L12 36 Z"
          fill="url(#wrench-metal)"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
        {/* Wrench Jaw */}
        <path
          d="M24 20 L20 16 C17 19 12 18 10 14 C8 10 11 5 15 4 C19 3 23 6 24 10 L28 14 L24 20 Z"
          fill="url(#wrench-metal)"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
      </g>
      {/* 3D Glossy Water Drop */}
      <path
        d="M34 16 C34 16 42 27 42 32 C42 36.4 38.4 40 34 40 C29.6 40 26 36.4 26 32 C26 27 34 16 34 16 Z"
        fill="url(#drop-grad)"
        stroke="#FFFFFF"
        strokeWidth="1.2"
      />
      {/* Water Drop Specular Glint */}
      <ellipse cx="32" cy="30" rx="2" ry="4" transform="rotate(-25 32 30)" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

function Icon3DCleaning() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bottle-body" x1="14" y1="16" x2="34" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="50%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="spray-head" x1="16" y1="6" x2="36" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="sparkle-grad" x1="28" y1="4" x2="44" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <filter id="clean-shadow" x="6" y="4" width="38" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#059669" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#clean-shadow)">
        {/* Spray Head */}
        <path d="M22 14 L22 10 L16 8 L16 6 L28 6 L28 10 L26 14 Z" fill="url(#spray-head)" stroke="#FFFFFF" strokeWidth="1" />
        <path d="M16 8 L10 10 L12 12 L16 11 Z" fill="#0284C7" />
        {/* Main Bottle Body */}
        <path
          d="M20 14 C18 16 16 20 16 24 L16 38 C16 41 18 43 21 43 L31 43 C34 43 36 41 36 38 L36 24 C36 20 34 16 32 14 Z"
          fill="url(#bottle-body)"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
        {/* Specular Highlight Streak */}
        <path d="M20 22 L20 38" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </g>
      {/* 3D Big Magic Sparkle */}
      <path
        d="M38 4 C38.5 8 40 9.5 44 10 C40 10.5 38.5 12 38 16 C37.5 12 36 10.5 32 10 C36 9.5 37.5 8 38 4 Z"
        fill="url(#sparkle-grad)"
        stroke="#FFFFFF"
        strokeWidth="1"
      />
      <circle cx="10" cy="24" r="2" fill="#67E8F9" opacity="0.8" />
    </svg>
  );
}

function Icon3DSalon() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mirror-rim" x1="10" y1="6" x2="38" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#9D174D" />
        </linearGradient>
        <linearGradient id="mirror-glass" x1="14" y1="10" x2="34" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDF2F8" />
          <stop offset="50%" stopColor="#FCE7F3" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
        <filter id="salon-shadow" x="6" y="4" width="36" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#DB2777" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#salon-shadow)">
        {/* Mirror Handle */}
        <path d="M22 32 L22 43 C22 44.5 26 44.5 26 43 L26 32 Z" fill="#9D174D" stroke="#FFFFFF" strokeWidth="1" />
        {/* Mirror Frame */}
        <circle cx="24" cy="20" r="14" fill="url(#mirror-rim)" stroke="#FFFFFF" strokeWidth="1.5" />
        {/* Mirror Glass with Reflection */}
        <circle cx="24" cy="20" r="10.5" fill="url(#mirror-glass)" />
        <ellipse cx="21" cy="17" rx="3" ry="6" transform="rotate(-30 21 17)" fill="#FFFFFF" opacity="0.75" />
      </g>
      {/* 3D Beauty Flower/Star Accent */}
      <circle cx="34" cy="9" r="4" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="34" cy="9" r="1.5" fill="#FEF08A" />
    </svg>
  );
}

function Icon3DPainting() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="roller-cylinder" x1="12" y1="8" x2="36" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
        <linearGradient id="roller-arm" x1="18" y1="16" x2="28" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
        <filter id="paint-shadow" x="6" y="6" width="36" height="40" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#6D28D9" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#paint-shadow)">
        {/* Paint Roller Cylinder */}
        <rect x="12" y="8" width="24" height="11" rx="4" fill="url(#roller-cylinder)" stroke="#FFFFFF" strokeWidth="1.2" />
        {/* Roller Cap Highlights */}
        <ellipse cx="12" cy="13.5" rx="1.5" ry="4" fill="#DDD6FE" />
        <ellipse cx="36" cy="13.5" rx="1.5" ry="4" fill="#5B21B6" />
        {/* Metal Arm */}
        <path d="M36 13.5 L40 13.5 L40 25 L26 25 L26 33" stroke="url(#roller-arm)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Wooden Handle */}
        <rect x="23" y="33" width="6" height="11" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
      </g>
      {/* Fresh Wet Paint Drip */}
      <path d="M16 19 C16 23 18 25 18 27 C18 28.5 17 29 16 29 C15 29 14 28.5 14 27 C14 25 16 23 16 19 Z" fill="#A855F7" />
    </svg>
  );
}

const CATEGORY_TILES = [
  { id: "ac-repair", label: "AC Repair", badge: "Popular", component: <Icon3DAC />, bg: "from-sky-50 to-blue-50/50 hover:border-sky-300" },
  { id: "electrical-plumbing", label: "Electrician", badge: "Fast", component: <Icon3DElectrician />, bg: "from-amber-50 to-yellow-50/50 hover:border-amber-300" },
  { id: "electrical-plumbing", label: "Plumber", badge: null, component: <Icon3DPlumber />, bg: "from-cyan-50 to-teal-50/50 hover:border-cyan-300" },
  { id: "cleaning-pest-1", label: "Deep Cleaning", badge: "Top Rated", component: <Icon3DCleaning />, bg: "from-emerald-50 to-green-50/50 hover:border-emerald-300" },
  { id: "salon-women", label: "Salon at Home", badge: "For Women", component: <Icon3DSalon />, bg: "from-pink-50 to-rose-50/50 hover:border-pink-300" },
  { id: "home-painting", label: "Painting", badge: null, component: <Icon3DPainting />, bg: "from-purple-50 to-violet-50/50 hover:border-purple-300" },
];

const POPULAR_TAGS = [
  { label: "Split AC Service", id: "ac-repair" },
  { label: "Tap / Mixer Fix", id: "electrical-plumbing" },
  { label: "Switchboard Wiring", id: "electrical-plumbing" },
  { label: "Bathroom Scrubbing", id: "cleaning-pest-1" },
  { label: "Salon at Home", id: "salon-women" },
];

const POPULAR_BOOKINGS = [
  {
    id: "ac-repair",
    title: "Split AC Deep Foam Cleaning",
    rating: "4.91",
    reviews: "32k",
    price: "₹249",
    originalPrice: "₹349",
    time: "45 mins",
    icon: "ac_unit",
  },
  {
    id: "cleaning-pest-1",
    title: "Bathroom Deep Scrubbing",
    rating: "4.88",
    reviews: "19k",
    price: "₹249",
    originalPrice: "₹299",
    time: "60 mins",
    icon: "cleaning_services",
  },
  {
    id: "electrical-plumbing",
    title: "Switchboard & Wiring Repair",
    rating: "4.94",
    reviews: "41k",
    price: "₹149",
    originalPrice: "₹199",
    time: "30 mins",
    icon: "bolt",
  },
];

export default function LandingHero() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const firstName = currentUser?.name?.split(" ")[0] || "";

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const q = searchTerm.trim();
    if (q) {
      navigate(`/customer/services/${encodeURIComponent(q)}`);
    } else {
      navigate("/customer/services/electrical-plumbing");
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-indigo-50/60 via-white to-slate-50 py-10 sm:py-14 lg:py-16 border-b border-slate-200/80 overflow-hidden">
      {/* Soft background ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── Left Column: Headline, Search & 3D Category Tiles ── */}
          <div className="lg:col-span-7 space-y-6">

            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-indigo-900 tracking-wide">
                Cooperative-Owned Professionals · 0% Worker Commission
              </span>
            </div>

            {/* Main Headline */}
            <div>
              {isAuthenticated ? (
                <div className="space-y-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                    Welcome Back
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                    Hello, <span className="text-indigo-600">{firstName}</span>.
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 max-w-xl pt-1">
                    What service can our verified professionals take care of for you today?
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                    Expert Home Services, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                      Right At Your Doorstep.
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 max-w-xl pt-1 leading-relaxed">
                    Book verified local cooperative workers for repair, cleaning, salon, and plumbing with standard fixed pricing.
                  </p>
                </div>
              )}
            </div>

            {/* Elevated Light Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-xl">
              <div className="flex items-center bg-white rounded-2xl p-1.5 sm:p-2 shadow-lg shadow-indigo-100/60 border border-slate-200/90 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100 transition-all overflow-hidden w-full">
                <span className="material-symbols-outlined text-indigo-500 ml-2 sm:ml-3 text-[20px] sm:text-[22px] shrink-0">search</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for services..."
                  className="min-w-0 w-full flex-1 py-2 sm:py-2.5 px-2 sm:px-3 focus:outline-none text-slate-800 text-sm sm:text-base placeholder:text-slate-400 bg-transparent font-medium"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 flex items-center gap-1 shrink-0"
                >
                  <span>Search</span>
                  <span className="material-symbols-outlined text-[16px] hidden sm:inline">arrow_forward</span>
                </button>
              </div>
            </form>

            {/* Popular Search Suggestions */}
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Popular:</span>
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => navigate(`/customer/services/${tag.id}`)}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200/80 hover:border-indigo-200 shadow-2xs transition-all font-medium"
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* ── 3D Quick Category Tiles ── */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Explore Services with 1-Tap Booking
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
                {CATEGORY_TILES.map((cat) => (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => navigate(`/customer/services/${cat.id}`)}
                    className={`flex flex-col items-center justify-center p-3.5 sm:p-3 rounded-2xl bg-gradient-to-b ${cat.bg} border border-slate-200/80 hover:shadow-md hover:-translate-y-1 transition-all text-center group cursor-pointer relative overflow-hidden`}
                  >
                    {cat.badge && (
                      <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] sm:text-[9px] font-bold tracking-tight">
                        {cat.badge}
                      </span>
                    )}
                    <div className="w-14 h-14 sm:w-12 sm:h-12 flex items-center justify-center mb-1.5 sm:mb-1 group-hover:scale-110 transition-transform">
                      {cat.component}
                    </div>
                    <span className="text-xs sm:text-xs font-bold text-slate-800 group-hover:text-indigo-600 leading-tight">
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right Column: Live Showcase & Plus Banner (Light Theme) ── */}
          <div className="lg:col-span-5 space-y-4">

            {/* Frequently Booked Services Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xl shadow-slate-200/60">
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Frequently Booked Today
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  45-min arrival
                </span>
              </div>

              <div className="space-y-2.5">
                {POPULAR_BOOKINGS.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => navigate(`/customer/services/${item.id}`)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 hover:bg-indigo-50/50 border border-slate-200/80 hover:border-indigo-200 transition-all cursor-pointer group gap-2.5 sm:gap-3"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="text-amber-500 font-bold flex items-center gap-0.5">
                            ★ {item.rating}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stacked Pricing & Modern Book CTA */}
                    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 pl-1">
                      <div className="text-right">
                        <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                          {item.price}
                        </div>
                        <div className="text-[10px] text-slate-400 line-through font-medium leading-tight">
                          {item.originalPrice}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 sm:py-1.5 rounded-lg bg-indigo-600 text-white text-[11px] font-bold shadow-xs shadow-indigo-600/20 group-hover:bg-indigo-700 transition-all flex items-center gap-0.5">
                        <span>Book</span>
                        <span className="material-symbols-outlined text-[13px] leading-none">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
