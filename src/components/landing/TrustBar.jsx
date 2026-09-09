import { useScrollReveal, useCountUp } from "../../hooks/useScrollReveal";
import { useLanguage } from "../../context/LanguageContext";

const STATS = [
  { icon: "groups", value: 50000, suffix: "+", label: "Happy Customers" },
  { icon: "engineering", value: 10000, suffix: "+", label: "Verified Workers" },
  { icon: "location_city", value: 500, suffix: "+", label: "Cities Covered" },
  { icon: "star", value: 4.8, suffix: "★", label: "Average Rating", isDecimal: true },
];

function CounterItem({ stat, isRevealed }) {
  const { tr } = useLanguage();
  const count = useCountUp(
    stat.isDecimal ? 48 : stat.value, // for 4.8, count to 48 then divide
    2000,
    isRevealed
  );
  const displayValue = stat.isDecimal ? (count / 10).toFixed(1) : count.toLocaleString();

  return (
    <div className="flex items-center gap-4 px-6 py-4 md:py-0">
      <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-brand-purple text-[24px] fill">{stat.icon}</span>
      </div>
      <div>
        <div className="text-2xl md:text-3xl font-black text-on-surface">
          {displayValue}<span className="text-brand-purple">{stat.suffix}</span>
        </div>
        <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">{tr(stat.label)}</div>
      </div>
    </div>
  );
}

export default function TrustBar() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="bg-white border-b border-outline-variant py-8 md:py-6 relative overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/[0.02] via-transparent to-secondary/[0.02]" />

      <div className="relative max-w-screen-xl mx-auto px-[16px] md:px-[64px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-outline-variant">
          {STATS.map((stat) => (
            <CounterItem key={stat.label} stat={stat} isRevealed={isRevealed} />
          ))}
        </div>
      </div>
    </section>
  );
}
