import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../context/LanguageContext";

import personalImg from "../../assets/services/personal-services.jpg";
import homeImg from "../../assets/services/ac-repair.jpg";
import trendingImg from "../../assets/services/trending-services.jpg";
import professionalImg from "../../assets/services/professional-services.jpg";
import healthImg from "../../assets/services/health-wellness.jpg";
import eventImg from "../../assets/services/event-services.jpg";
import workflowImg from "../../assets/sevasetu_workflow.jpg";

import agriMechanizationImg from "../../assets/services/agri-mechanization.jpg";
import foodtechProcessingImg from "../../assets/services/foodtech-processing.jpg";
import ruralInfrastructureImg from "../../assets/services/rural-infrastructure.jpg";
import dairyLivestockImg from "../../assets/services/dairy-livestock.jpg";
import ruralEmergencyImg from "../../assets/services/rural-emergency.jpg";
import institutionalBulkImg from "../../assets/services/institutional-bulk.jpg";
import electricalPlumbingImg from "../../assets/services/electrical-plumbing.jpg";
import homePaintingImg from "../../assets/services/home-painting.jpg";
import cleaningPestImg from "../../assets/services/cleaning-pest.jpg";

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

const ROOT_CATEGORIES = [
  { id: "electricians",         label: "Electricians & Tech",        emoji: "⚡", image: electricalPlumbingImg, bg: "from-amber-50 to-orange-50",   border: "hover:border-amber-500",    shadow: "hover:shadow-amber-100" },
  { id: "plumbers",             label: "Plumbers & Carpenters",       emoji: "🔧", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80", bg: "from-sky-50 to-blue-50", border: "hover:border-sky-500", shadow: "hover:shadow-sky-100" },
  { id: "domestic-helpers",     label: "Domestic Help & Cleaners",    emoji: "🏡", image: cleaningPestImg,       bg: "from-emerald-50 to-teal-50",   border: "hover:border-emerald-500",  shadow: "hover:shadow-emerald-100" },
  { id: "caregivers",           label: "Caregivers & Drivers",        emoji: "❤️", image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=500&q=80", bg: "from-rose-50 to-pink-50", border: "hover:border-rose-500", shadow: "hover:shadow-rose-100" },
  { id: "painters",             label: "Painters & Gardeners",        emoji: "🎨", image: homePaintingImg,       bg: "from-purple-50 to-violet-50",  border: "hover:border-purple-500",   shadow: "hover:shadow-purple-100" },
  { id: "agri-mechanization",   label: "Agri & Farm Mechanization",   emoji: "🚜", image: agriMechanizationImg,  bg: "from-green-50 to-emerald-50",  border: "hover:border-green-500",    shadow: "hover:shadow-green-100" },
];

const POPULAR_TAGS = [
  { label: "Electricians", id: "electricians", emoji: "⚡" },
  { label: "Plumbers", id: "plumbers", emoji: "🔧" },
  { label: "Carpenters", id: "carpenters", emoji: "🪚" },
  { label: "Painters", id: "painters", emoji: "🎨" },
  { label: "Domestic Helpers", id: "domestic-helpers", emoji: "🏡" },
  { label: "Caregivers", id: "caregivers", emoji: "❤️" },
  { label: "Drivers", id: "drivers", emoji: "🚗" },
  { label: "Gardeners", id: "gardeners", emoji: "🌿" },
  { label: "Cleaners", id: "cleaners", emoji: "🧹" },
  { label: "Technicians", id: "technicians", emoji: "🧰" },
];

const POPULAR_BOOKINGS = [
  {
    id: "agri-mechanization",
    title: "Certified Tractor Sowing Operator",
    rating: "4.94",
    reviews: "18k",
    price: "₹799",
    originalPrice: "₹999",
    time: "Full Day",
    icon: "agriculture",
  },
  {
    id: "agri-mechanization",
    title: "Solar Submersible Pump Servicing",
    rating: "4.96",
    reviews: "21k",
    price: "₹499",
    originalPrice: "₹699",
    time: "90 mins",
    icon: "solar_power",
  },
  {
    id: "foodtech-processing",
    title: "Cold Storage Ammonia Chiller Tech",
    rating: "4.93",
    reviews: "11k",
    price: "₹699",
    originalPrice: "₹899",
    time: "120 mins",
    icon: "ac_unit",
  },
];

export default function LandingHero() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const { tr } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const firstName = currentUser?.name?.split(" ")[0] || "";

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const q = searchTerm.trim();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (q) {
      navigate(`/customer/services/${encodeURIComponent(q)}`);
    } else {
      navigate("/customer/services/agri-mechanization");
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-emerald-50/40 via-white to-slate-50 py-10 sm:py-14 lg:py-16 border-b border-slate-200/80 overflow-hidden">
      {/* Soft background ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── Left Column: Headline, Search & 3D Category Tiles ── */}
          <div className="lg:col-span-7 space-y-6">

            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200/80 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-900 tracking-wide">
                {tr("Labour Cooperative Federation · Skilled Trades & Rural Services")}
              </span>
            </div>

            {/* Main Headline */}
            <div>
              {isAuthenticated ? (
                <div className="space-y-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                    {tr("Welcome Back · Cooperative Member Portal")}
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                    {tr("Hello,")} <span className="text-emerald-700">{firstName}</span>.
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 max-w-xl pt-1">
                    {tr("Book verified cooperative electricians, plumbers, carpenters, domestic helpers, caregivers, technicians and farm operators.")}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                    {tr("Cooperative Services for")} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-700">
                      {tr("Households & Rural Bharat.")}
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 max-w-xl pt-1 leading-relaxed">
                    {tr("Connecting Labour Cooperative Federations with households & enterprises for verified electricians, plumbers, carpenters, painters, domestic helpers, caregivers, drivers, gardeners, cleaners & technicians.")}
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
                  placeholder={tr("Search for services...")}
                  className="min-w-0 w-full flex-1 py-2 sm:py-2.5 px-2 sm:px-3 focus:outline-none text-slate-800 text-sm sm:text-base placeholder:text-slate-400 bg-transparent font-medium"
                />

                {/* Voice Booking Trigger Button */}
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-voice-assistant"))}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 flex items-center gap-1.5 shrink-0 mr-1.5 group active:scale-95 cursor-pointer"
                  title={tr("Voice Booking")}
                >
                  <span className="material-symbols-outlined text-[18px] text-amber-300 group-hover:scale-110 transition-transform">
                    mic
                  </span>
                  <span className="hidden sm:inline font-bold">{tr("Voice Booking")}</span>
                </button>

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 flex items-center gap-1 shrink-0"
                >
                  <span>{tr("Search")}</span>
                  <span className="material-symbols-outlined text-[16px] hidden sm:inline">arrow_forward</span>
                </button>
              </div>
            </form>

            {/* Quick Skilled Trade Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none pt-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 shrink-0 mr-1">
                {tr("Quick Book:")}
              </span>
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => navigate(`/customer/services/${tag.id}`)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 text-slate-700 hover:text-emerald-800 transition-all shrink-0 shadow-sm cursor-pointer"
                >
                  <span className="text-xs">{tag.emoji}</span>
                  <span>{tr(tag.label)}</span>
                </button>
              ))}
            </div>


            {/* ── Root Category Image Tiles ── */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                {tr("Explore Services with 1-Tap Booking")}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
                {ROOT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => navigate(`/customer/services/${cat.id}`)}
                    className={`group flex flex-col items-center bg-gradient-to-b ${cat.bg} border border-slate-200/80 ${cat.border} rounded-2xl overflow-hidden hover:shadow-lg ${cat.shadow} hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer`}
                  >
                    {/* Image */}
                    <div className="w-full h-20 sm:h-24 overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    {/* Label */}
                    <div className="px-2 py-2.5 flex flex-col items-center">
                      <span className="text-lg leading-none mb-1">{cat.emoji}</span>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 leading-tight">
                        {tr(cat.label)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right Column: Live Showcase & Plus Banner (Light Theme) ── */}
          <div className="lg:col-span-5 space-y-4">

            {/* ── SevaSetu Workflow & Social Impact Card ── */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xl shadow-slate-200/60 relative overflow-hidden group">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    {tr("How SevaSetu Agri-Coop Works")}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  {tr("Fair & Transparent")}
                </span>
              </div>

              {/* Dynamic Multilingual Workflow Showcase Card — 100% Translated in all Languages */}
              <div className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-amber-50/40 via-white to-emerald-50/40 p-3 sm:p-4 shadow-sm space-y-3">
                {/* Infographic Main Title Banner */}
                <div className="text-center pb-2 border-b border-slate-100">
                  <h4 className="text-xs sm:text-sm font-black text-amber-900 tracking-tight leading-snug">
                    <span className="text-brand-purple">SevaSetu: </span>
                    {tr("Connecting Rural Communities, Empowering Cooperative Families")}
                  </h4>
                </div>

                {/* 4 Illustrated Step Storyboard Panels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Step 1: Farmer Booking */}
                  <div className="p-3 rounded-xl bg-white border border-emerald-200/80 shadow-xs hover:border-emerald-400 transition-all flex flex-col justify-between gap-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">1</span>
                      <span className="text-xl">📱🌾</span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-700 leading-snug">
                      <strong className="text-slate-900 font-bold block mb-0.5">{tr("Book Farm Service")}</strong>
                      {tr("Indian rural farmer booking agricultural and solar pump services on smartphone app.")}
                    </p>
                  </div>

                  {/* Step 2: Verified Technician Arrival */}
                  <div className="p-3 rounded-xl bg-white border border-indigo-200/80 shadow-xs hover:border-indigo-400 transition-all flex flex-col justify-between gap-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">2</span>
                      <span className="text-xl">🛵🔧</span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-700 leading-snug">
                      <strong className="text-slate-900 font-bold block mb-0.5">{tr("Verified Arrival")}</strong>
                      {tr("Verified friendly cooperative technician arriving at farm on motorcycle with tool kit.")}
                    </p>
                  </div>

                  {/* Step 3: Quality Field Repair */}
                  <div className="p-3 rounded-xl bg-white border border-amber-200/80 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between gap-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-xs">3</span>
                      <span className="text-xs font-black text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span>★</span> 5.0 Rating
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-700 leading-snug">
                      <strong className="text-slate-900 font-bold block mb-0.5">{tr("5-Star Field Service")}</strong>
                      {tr("Quality agricultural repair service: technician servicing solar water pump and checking tractor with 5 star rating badge.")}
                    </p>
                  </div>

                  {/* Step 4: Fair Wage & Instant Payout */}
                  <div className="p-3 rounded-xl bg-white border border-emerald-300 shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between gap-2 bg-gradient-to-br from-white to-emerald-50/60">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center shadow-xs">4</span>
                      <div className="text-right">
                        <span className="text-xs font-black text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-lg border border-emerald-300 block">
                          ₹ 2,450.00
                        </span>
                        <span className="text-[9px] font-extrabold text-emerald-700 uppercase">
                          {tr("Received - Instant Earnings")}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-700 leading-snug">
                      <strong className="text-slate-900 font-bold block mb-0.5">{tr("Direct Earnings")}</strong>
                      {tr("Instant digital earnings on mobile phone showing fair wage received with happy cooperative worker family.")}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Connected Step Sequence with Arrow Indicators (1 → 2 → 3 → 4) */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between px-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <span>{tr("Farm-to-Doorstep Flow")}</span>
                  <span>1 → 2 → 3 → 4</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 transition-colors flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">1</span>
                    <div className="min-w-0">
                      <h5 className="text-[11px] font-bold text-slate-900 leading-tight">{tr("Book Farm Service")}</h5>
                      <p className="text-[10px] text-slate-500 truncate">{tr("Tractor, pump & tech in 2 mins")}</p>
                    </div>
                  </div>

                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/80 transition-colors flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">2</span>
                    <div className="min-w-0">
                      <h5 className="text-[11px] font-bold text-slate-900 leading-tight">{tr("Verified Arrival")}</h5>
                      <p className="text-[10px] text-slate-500 truncate">{tr("PACS & certified technician")}</p>
                    </div>
                  </div>

                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200/80 transition-colors flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">3</span>
                    <div className="min-w-0">
                      <h5 className="text-[11px] font-bold text-slate-900 leading-tight">{tr("5-Star Field Service")}</h5>
                      <p className="text-[10px] text-slate-500 truncate">{tr("Quality harvest & repair output")}</p>
                    </div>
                  </div>

                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200/80 transition-colors flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">4</span>
                    <div className="min-w-0">
                      <h5 className="text-[11px] font-bold text-slate-900 leading-tight">{tr("Direct Earnings")}</h5>
                      <p className="text-[10px] text-slate-500 truncate">{tr("Fair income & dignity")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Impact Strip */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs">
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  {tr("100% Direct Payouts")}
                </span>
                <span className="font-semibold text-slate-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {tr("Social Impact 🌱")}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
