import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useLanguage } from "../../context/LanguageContext";

const STEPS = [
  {
    step: "01",
    icon: "search",
    title: "Search Services",
    desc: "Browse 100+ service categories or search for what you need. From AC repair to yoga trainers — we've got it all.",
    color: "bg-brand-purple",
  },
  {
    step: "02",
    icon: "calendar_month",
    title: "Book a Slot",
    desc: "Pick a date and time that works for you. Choose your preferred service package and add-ons.",
    color: "bg-secondary",
  },
  {
    step: "03",
    icon: "engineering",
    title: "Get Served",
    desc: "A verified, trained professional arrives at your doorstep on time. Track them in real-time.",
    color: "bg-brand-success",
  },
  {
    step: "04",
    icon: "star",
    title: "Rate & Review",
    desc: "Rate the service and help the community. Your feedback helps workers grow and earn more.",
    color: "bg-brand-orange",
  },
];

export default function HowItWorks() {
  const { ref, isRevealed } = useScrollReveal();
  const { tr } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-primary/[0.03] to-white relative overflow-hidden">
      <div ref={ref} className="max-w-screen-xl mx-auto px-[16px] md:px-[64px]">
        {/* Section header */}
        <div className={`text-center mb-16 ${isRevealed ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-success/10 text-brand-success text-xs font-bold uppercase tracking-widest mb-4">
            {tr("Simple Process")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-on-surface mb-4">
            {tr("How It Works")}
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto">
            {tr("Getting professional help has never been easier. Just 4 simple steps.")}
          </p>
        </div>

        {/* Steps */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative stagger-children ${isRevealed ? "revealed" : ""}`}>
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-purple via-secondary to-brand-success" />

          {STEPS.map((step, i) => (
            <div key={step.step} className="relative flex flex-col items-center text-center group">
              {/* Step number circle */}
              <div className={`relative w-28 h-28 rounded-full ${step.color} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <span className="material-symbols-outlined text-white text-[40px] fill">{step.icon}</span>
                {/* Step badge */}
                <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-xs font-black text-on-surface border-2 border-outline-variant">
                  {step.step}
                </span>
              </div>

              {/* Mobile connector arrow */}
              {i < STEPS.length - 1 && (
                <div className="md:hidden flex justify-center my-2">
                  <span className="material-symbols-outlined text-outline text-[24px]">arrow_downward</span>
                </div>
              )}

              <h3 className="text-lg font-bold text-on-surface mb-2">{tr(step.title)}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed max-w-xs">{tr(step.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
