import { useScrollReveal } from "../../hooks/useScrollReveal";

const FEATURES = [
  {
    icon: "verified_user",
    title: "Admin Verified Workers",
    desc: "Every worker is background-checked and approved by our admin team before they can serve you.",
    gradient: "from-blue-500 to-brand-purple",
  },
  {
    icon: "schedule",
    title: "On-Time Guarantee",
    desc: "Punctual professionals every time. If they're late, you get a discount on your next booking.",
    gradient: "from-brand-purple to-purple-600",
  },
  {
    icon: "payments",
    title: "Transparent Pricing",
    desc: "No hidden charges. See exact prices before you book. Fair wages for workers, fair prices for you.",
    gradient: "from-brand-orange to-amber-500",
  },
  {
    icon: "shield",
    title: "100% Safe & Secure",
    desc: "Insured services, verified IDs, and real-time tracking for your complete peace of mind.",
    gradient: "from-brand-success to-emerald-500",
  },
  {
    icon: "diversity_3",
    title: "Cooperative Powered",
    desc: "Built on the cooperative model — workers own a share of the platform and earn fair wages.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: "smart_toy",
    title: "AI-Powered Matching",
    desc: "Our AI matches you with the best available professional based on skills, ratings, and proximity.",
    gradient: "from-pink-500 to-rose-500",
  },
];

export default function WhyChooseUs() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-surface to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-purple/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />

      <div ref={ref} className="max-w-screen-xl mx-auto px-[16px] md:px-[64px] relative">
        {/* Section header */}
        <div className={`text-center mb-16 ${isRevealed ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-widest mb-4">
            Why SevaSetu
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-on-surface mb-4">
            Why Customers <span className="text-gradient">Love Us</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto">
            We're not just another service platform. We're a movement to empower India's skilled workforce while delivering the best experience to you.
          </p>
        </div>

        {/* Feature grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${isRevealed ? "revealed" : ""}`}>
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="card-hover group bg-white rounded-3xl p-8 border border-outline-variant/50 relative overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="material-symbols-outlined text-white text-[28px] fill">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-3">{feature.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
