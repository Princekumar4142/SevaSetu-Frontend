import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const PERKS = [
  {
    icon: "percent",
    title: "15% Off Every Booking",
    desc: "Instant savings up to ₹150 per booking on salon, cleaning, and repairs with no limit on bookings.",
  },
  {
    icon: "verified_user",
    title: "Top 5% Cooperative Masters",
    desc: "Priority assignment to master-tier verified cooperative workers with 4.9+ customer ratings.",
  },
  {
    icon: "event_busy",
    title: "Zero Cancellation Fees",
    desc: "Free cancellation & instant reschedule up to 60 minutes before your scheduled appointment slot.",
  },
  {
    icon: "shield_with_heart",
    title: "₹10,000 Damage Cover",
    desc: "Complimentary cooperative insurance protecting appliances and home property during every job.",
  },
  {
    icon: "support_agent",
    title: "VIP 24x7 Concierge Support",
    desc: "Direct access to dedicated priority support helpline with under 30-second average response time.",
  },
];

const PLANS = [
  {
    id: "6m",
    name: "6 Months",
    price: 299,
    originalPrice: 499,
    savingsText: "Save ₹200",
    monthlyBreakdown: "₹49/mo",
    popular: false,
  },
  {
    id: "12m",
    name: "12 Months",
    price: 499,
    originalPrice: 999,
    savingsText: "Save 50% · Best Value",
    monthlyBreakdown: "₹41/mo",
    popular: true,
  },
];

export default function SevaSetuPlus() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("12m");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = () => {
    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setIsSubscribed(true);
    }, 1200);
  };

  const activePlanObj = PLANS.find((p) => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-surface-container-lowest md:bg-surface pb-24 md:pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-brand-purple via-[#582b82] to-[#2e1065] text-white py-12 px-margin-mobile md:px-margin-desktop relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => {
                if (window.history.length > 1) navigate(-1);
                else navigate("/customer");
              }}
              className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 active:bg-white/40 flex items-center justify-center text-white transition-colors shrink-0"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/15 backdrop-blur-md rounded-full text-status-badge font-bold uppercase tracking-wider border border-white/20">
              <span className="material-symbols-outlined text-[16px] text-amber-300 fill">diamond</span>
              SevaSetu Plus VIP
            </div>
          </div>

          <h1 className="font-headline-lg text-headline-lg font-bold mb-3">
            Save more on every service. Enjoy VIP privileges.
          </h1>
          <p className="font-body-lg text-body-lg text-white/80 max-w-xl">
            Join over 45,000+ members who save an average of ₹2,800 every year with SevaSetu Plus.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop -mt-6">
        {/* Membership Status or Plan Selector */}
        {isSubscribed ? (
          <div className="bg-surface-container-lowest rounded-2xl border border-emerald-200 p-6 md:p-8 shadow-xl text-center mb-8 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-brand-success flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[36px] fill">verified</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              You are a SevaSetu Plus Member!
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mt-2">
              Your 15% discount and VIP cooperative priority benefits are active across all categories.
            </p>
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-full font-label-md font-bold">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              Valid through September 2027
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="purple" onClick={() => navigate("/customer/services")}>
                Book with 15% VIP Discount
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 md:p-8 shadow-xl mb-8">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold text-center mb-2">
              Choose your Plus membership
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant text-center mb-6">
              Guaranteed return on investment within just 2 bookings
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {PLANS.map((plan) => {
                const selected = selectedPlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`cursor-pointer rounded-2xl border-2 p-5 transition-all relative flex flex-col justify-between ${
                      selected
                        ? "border-brand-purple bg-brand-purple-light/20 shadow-md ring-2 ring-brand-purple/20"
                        : "border-outline-variant bg-surface-container-low/40 hover:border-brand-purple/50"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 right-4 bg-brand-purple text-white font-status-badge text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                        {plan.savingsText}
                      </span>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-label-lg text-label-lg text-on-surface font-bold">{plan.name}</h3>
                        <p className="font-status-badge text-status-badge text-brand-purple font-medium">
                          {plan.monthlyBreakdown}
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selected ? "border-brand-purple bg-brand-purple text-white" : "border-outline-variant"
                        }`}
                      >
                        {selected && <span className="material-symbols-outlined text-[16px]">check</span>}
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="font-headline-md text-headline-md text-on-surface font-bold">
                        ₹{plan.price}
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant line-through">
                        ₹{plan.originalPrice}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              variant="purple"
              size="lg"
              className="w-full justify-center py-4 font-bold shadow-lg shadow-brand-purple/20"
              onClick={handleSubscribe}
              disabled={subscribing}
            >
              {subscribing ? (
                "Activating Plus Membership..."
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                  Get SevaSetu Plus for ₹{activePlanObj?.price}
                </>
              )}
            </Button>
            <p className="font-status-badge text-status-badge text-on-surface-variant text-center mt-3">
              Instant activation · Cancel or auto-renew anytime with 1-click
            </p>
          </div>
        )}

        {/* Benefits Grid */}
        <div className="mb-10">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-6">
            Exclusive SevaSetu Plus Privileges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PERKS.map((perk, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 flex items-start gap-4 hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-purple-light text-brand-purple flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px] fill">{perk.icon}</span>
                </div>
                <div>
                  <h3 className="font-label-lg text-label-lg text-on-surface font-bold mb-1">{perk.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Calculator Callout */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-300/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px] fill">savings</span>
            </span>
            <div>
              <h4 className="font-label-lg text-label-lg text-on-surface font-bold">
                Average Member Savings: ₹3,450 / Year
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Based on typical household usage of 4 salon, 2 cleaning, and 2 repair visits yearly.
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/customer/services")} className="shrink-0">
            Browse Services
          </Button>
        </div>
      </div>
    </div>
  );
}
