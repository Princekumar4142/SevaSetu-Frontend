import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useScrollReveal } from "../hooks/useScrollReveal";
import CategoryIconGrid from "../components/booking/CategoryIconGrid";
import {
  PERSONAL_SERVICES,
  HOME_SERVICES,
  TRENDING_SERVICES,
  PROFESSIONAL_SERVICES,
  HEALTH_WELLNESS_SERVICES,
  EVENT_SERVICES,
} from "../constants/bookingCatalog";

import LandingHero from "../components/landing/LandingHero";
import TrustBar from "../components/landing/TrustBar";
import WhyChooseUs from "../components/landing/WhyChooseUs";
import HowItWorks from "../components/landing/HowItWorks";
import Testimonials from "../components/landing/Testimonials";
import StatsImpact from "../components/landing/StatsImpact";
import JoinAsWorker from "../components/landing/JoinAsWorker";
import DownloadApp from "../components/landing/DownloadApp";

/** Wrapper that applies scroll-reveal to each service section. */
function ServiceSection({ title, items, onSelect, exploreLink, bgClass = "bg-white" }) {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <div ref={ref} className={`border-b border-outline-variant/30 py-12 md:py-16 ${bgClass}`}>
      <div className={`px-[16px] md:px-[64px] max-w-screen-xl mx-auto section-reveal ${isRevealed ? "revealed" : ""}`}>
        <CategoryIconGrid title={title} items={items} onSelect={onSelect} exploreLink={exploreLink} />
      </div>
    </div>
  );
}

export default function BookingHome() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();

  const handleSelectService = (item) => {
    if (item && item.id) {
      navigate(`/customer/services/${item.id}`);
    } else {
      navigate("/customer/services/salon-classic");
    }
  };

  return (
    <div className="flex flex-col">
      {/* ═══════════════════════════════════════════════════════
          SECTION 1: Hero
       ═══════════════════════════════════════════════════════ */}
      <LandingHero />

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: Trust Bar (animated counters)
       ═══════════════════════════════════════════════════════ */}
      <TrustBar />

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: Mobile Location Bar + Plus Banner
       ═══════════════════════════════════════════════════════ */}
      <div className="md:hidden px-[16px] py-3 flex flex-col gap-2 border-b border-outline-variant bg-white">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-indigo-600 text-[18px]">location_on</span>
          <span className="text-sm font-medium text-on-surface truncate flex-1">
            {currentUser?.address
              ? `${currentUser.address}${currentUser.city ? `, ${currentUser.city}` : ""}`
              : (isAuthenticated ? "Tap to add your delivery address" : "Explore verified services near you")}
          </span>
          <span className="material-symbols-outlined text-on-surface-variant text-[18px]">expand_more</span>
        </div>
        <button
          type="button"
          onClick={() => navigate("/customer/plus")}
          className="flex items-center gap-2 py-1 text-left"
        >
          <span className="w-6 h-6 rounded-full bg-brand-purple flex items-center justify-center text-white text-[14px]">
            <span className="material-symbols-outlined text-[14px] fill">bolt</span>
          </span>
          <span className="text-xs font-bold text-brand-purple">plus</span>
          <span className="text-sm text-on-surface flex-1">Save 15% on every service</span>
          <span className="material-symbols-outlined text-on-surface-variant text-[18px]">chevron_right</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4-9: Service Category Grids
       ═══════════════════════════════════════════════════════ */}
      <div className="flex-1">
        <ServiceSection
          title="✨ Personal Services"
          items={PERSONAL_SERVICES}
          onSelect={handleSelectService}
        />

        <ServiceSection
          title="🏠 Home Services"
          items={HOME_SERVICES}
          onSelect={handleSelectService}
          bgClass="bg-surface"
        />

        <ServiceSection
          title="🔥 Trending Services"
          items={TRENDING_SERVICES}
          onSelect={handleSelectService}
          exploreLink={{
            label: "Explore All Trending Services →",
            onClick: () => navigate("/customer/services/ac-repair"),
          }}
        />

        <ServiceSection
          title="💼 Professional Services"
          items={PROFESSIONAL_SERVICES}
          onSelect={handleSelectService}
          bgClass="bg-surface"
        />

        <ServiceSection
          title="🏥 Health & Wellness"
          items={HEALTH_WELLNESS_SERVICES}
          onSelect={handleSelectService}
        />

        <ServiceSection
          title="🎉 Event Services"
          items={EVENT_SERVICES}
          onSelect={handleSelectService}
          bgClass="bg-surface"
          exploreLink={{
            label: "View All Services →",
            onClick: () => navigate("/customer/services/electrical-plumbing"),
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 10: Why Choose SevaSetu
       ═══════════════════════════════════════════════════════ */}
      <WhyChooseUs />

      {/* ═══════════════════════════════════════════════════════
          SECTION 11: How It Works
       ═══════════════════════════════════════════════════════ */}
      <HowItWorks />

      {/* ═══════════════════════════════════════════════════════
          SECTION 12: Customer Testimonials
       ═══════════════════════════════════════════════════════ */}
      <Testimonials />

      {/* ═══════════════════════════════════════════════════════
          SECTION 13: Stats & Social Impact
       ═══════════════════════════════════════════════════════ */}
      <StatsImpact />

      {/* ═══════════════════════════════════════════════════════
          SECTION 14: Join as Worker CTA
       ═══════════════════════════════════════════════════════ */}
      <JoinAsWorker />

      {/* ═══════════════════════════════════════════════════════
          SECTION 15: Download App CTA
       ═══════════════════════════════════════════════════════ */}
      <DownloadApp />
    </div>
  );
}
