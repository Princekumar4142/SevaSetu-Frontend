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
import HowItWorks from "../components/landing/HowItWorks";
import JoinAsWorker from "../components/landing/JoinAsWorker";

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
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
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
