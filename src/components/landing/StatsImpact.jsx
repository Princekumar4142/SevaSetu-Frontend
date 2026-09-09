import { useScrollReveal, useCountUp } from "../../hooks/useScrollReveal";
import { useLanguage } from "../../context/LanguageContext";

const IMPACT_STATS = [
  { icon: "currency_rupee", value: 25, suffix: "Cr+", label: "Worker Earnings Generated", desc: "Direct income to skilled workers" },
  { icon: "family_restroom", value: 100000, suffix: "+", label: "Families Served", desc: "Across 500+ cities in India" },
  { icon: "school", value: 5000, suffix: "+", label: "Workers Trained", desc: "Skill development programs" },
  { icon: "handshake", value: 200, suffix: "+", label: "Cooperatives Formed", desc: "Worker-owned organizations" },
];

function ImpactCounter({ stat, isRevealed, delay }) {
  const { tr } = useLanguage();
  const count = useCountUp(stat.value, 2500, isRevealed);
  const displayValue = stat.value > 9999
    ? `${Math.floor(count / 1000)}K`
    : count.toLocaleString();

  return (
    <div
      className="text-center group"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-white/20 transition-colors duration-300 group-hover:scale-110 transform">
        <span className="material-symbols-outlined text-white text-[36px] fill">{stat.icon}</span>
      </div>
      <div className="text-4xl md:text-5xl font-black text-white mb-2">
        {displayValue}<span className="text-secondary">{stat.suffix}</span>
      </div>
      <div className="text-sm font-bold text-white/90 mb-1">{tr(stat.label)}</div>
      <div className="text-xs text-white/50">{tr(stat.desc)}</div>
    </div>
  );
}

export default function StatsImpact() {
  const { ref, isRevealed } = useScrollReveal();
  const { tr } = useLanguage();

  return (
    <section className="py-20 md:py-28 hero-gradient relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-10 right-20 w-40 h-40 rounded-full bg-brand-purple/20 blur-3xl animate-float" />
      <div className="absolute bottom-10 left-20 w-60 h-60 rounded-full bg-secondary/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div ref={ref} className="relative max-w-screen-xl mx-auto px-[16px] md:px-[64px]">
        {/* Section header */}
        <div className={`text-center mb-16 ${isRevealed ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
            {tr("Our Impact")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            {tr("Making a Real")} <span className="text-secondary">{tr("Difference")}</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            {tr("SevaSetu is more than a service platform — it's a movement to empower India's skilled workforce and build sustainable livelihoods.")}
          </p>
        </div>

        {/* Stats grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-10 stagger-children ${isRevealed ? "revealed" : ""}`}>
          {IMPACT_STATS.map((stat, i) => (
            <ImpactCounter key={stat.label} stat={stat} isRevealed={isRevealed} delay={i * 0.15} />
          ))}
        </div>

        {/* Quote */}
        <div className={`mt-16 text-center ${isRevealed ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.6s" }}>
          <div className="inline-block bg-white/5 border border-white/10 rounded-3xl px-8 py-6 max-w-2xl">
            <p className="text-white/80 text-lg italic leading-relaxed">
              "हर हुनर को काम, हर काम को विश्वास"
            </p>
            <p className="text-white/40 text-sm mt-2">
              — Every skill deserves work, every work deserves trust
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
