import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useScrollReveal } from "../hooks/useScrollReveal";
import CategoryIconGrid from "../components/booking/CategoryIconGrid";
import {
  AGRI_MECHANIZATION_SERVICES,
  FOODTECH_PROCESSING_SERVICES,
  RURAL_INFRASTRUCTURE_SERVICES,
  DAIRY_LIVESTOCK_SERVICES,
  RURAL_EMERGENCY_SERVICES,
  INSTITUTIONAL_BULK_SERVICES,
} from "../constants/bookingCatalog";

import LandingHero from "../components/landing/LandingHero";
import HowItWorks from "../components/landing/HowItWorks";
import JoinAsWorker from "../components/landing/JoinAsWorker";

/** Wrapper that applies scroll-reveal to each service section. */
function ServiceSection({ title, items, onSelect, exploreLink, bgClass = "bg-white", badge = null }) {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <div ref={ref} className={`border-b border-outline-variant/30 py-12 md:py-16 ${bgClass}`}>
      <div className={`px-[16px] md:px-[64px] max-w-screen-xl mx-auto section-reveal ${isRevealed ? "revealed" : ""}`}>
        {badge && (
          <div className="mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              {badge}
            </span>
          </div>
        )}
        <CategoryIconGrid title={title} items={items} onSelect={onSelect} exploreLink={exploreLink} />
      </div>
    </div>
  );
}

export default function BookingHome() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();

  const handleSelectService = (item) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (item && item.id) {
      navigate(`/customer/services/${item.id}`);
    } else {
      navigate("/customer/services/agri-mechanization");
    }
  };

  return (
    <div className="flex flex-col">
      {/* ═══════════════════════════════════════════════════════
          SECTION 1: Hero
       ═══════════════════════════════════════════════════════ */}
      <LandingHero />

      {/* ═══════════════════════════════════════════════════════
          EMERGENCY / TATKAL RURAL BANNER
       ═══════════════════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white py-3 px-4 sm:px-8 shadow-md">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <span className="material-symbols-outlined text-amber-200 text-2xl animate-bounce">electric_bolt</span>
            <div>
              <p className="text-xs sm:text-sm font-black tracking-wide uppercase">
                ⚡ Tatkal Farm Emergency Dispatch (45-Minute Arrival)
              </p>
              <p className="text-[11px] sm:text-xs text-rose-100 font-medium">
                Burnt tube-well pump motor, electrical field starter failure, or critical livestock aid across rural blocks.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (!isAuthenticated) navigate("/login");
              else navigate("/customer/services/rural-emergency");
            }}
            className="shrink-0 bg-white text-rose-700 hover:bg-rose-50 font-black text-xs px-4 py-2 rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Book Emergency Tech</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          PRIMARY SECTIONS: Agriculture, FoodTech & Rural Development
       ═══════════════════════════════════════════════════════ */}
      <div className="flex-1">
        <ServiceSection
          title="🚜 Agri & Farm Mechanization Services"
          badge="Cooperative Fleet · Tractor, Solar Pump & Agri-Drone"
          items={AGRI_MECHANIZATION_SERVICES}
          onSelect={handleSelectService}
          bgClass="bg-white"
        />

        <ServiceSection
          title="🌾 FoodTech, Agro-Processing & Storage"
          badge="Value Addition · Cold Storage, Grain Sorters & Mills"
          items={FOODTECH_PROCESSING_SERVICES}
          onSelect={handleSelectService}
          bgClass="bg-slate-50/80"
        />

        <ServiceSection
          title="🏡 Rural Infrastructure & Panchayat Services"
          badge="Gram Panchayat & Jal Jeevan Mission Skilled Labor"
          items={RURAL_INFRASTRUCTURE_SERVICES}
          onSelect={handleSelectService}
          bgClass="bg-white"
        />

        <ServiceSection
          title="🐄 Dairy, Livestock & Paravet Services"
          badge="Certified Paravets, Pashu Sakhis & Milking Tech"
          items={DAIRY_LIVESTOCK_SERVICES}
          onSelect={handleSelectService}
          bgClass="bg-slate-50/80"
        />

        <ServiceSection
          title="⚡ Tatkal Rural & Farm Breakdown Services"
          badge="45-Min Guaranteed Emergency Dispatch"
          items={RURAL_EMERGENCY_SERVICES}
          onSelect={handleSelectService}
          bgClass="bg-white"
        />

        <ServiceSection
          title="🏢 FPO & Institutional Bulk Squads"
          badge="B2B & Panchayat Contracts · 5-15 Member Teams"
          items={INSTITUTIONAL_BULK_SERVICES}
          onSelect={handleSelectService}
          bgClass="bg-emerald-50/40"
        />
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION: How It Works
       ═══════════════════════════════════════════════════════ */}
      <HowItWorks />

      {/* ═══════════════════════════════════════════════════════
          SECTION: Join as Worker CTA
       ═══════════════════════════════════════════════════════ */}
      <JoinAsWorker />
    </div>
  );
}
