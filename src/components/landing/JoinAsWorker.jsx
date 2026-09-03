import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const BENEFITS = [
  { icon: "trending_up", text: "Earn ₹25,000 – ₹50,000/month" },
  { icon: "school", text: "Free skill training programs" },
  { icon: "health_and_safety", text: "Insurance & health benefits" },
  { icon: "diversity_3", text: "Join a worker cooperative" },
  { icon: "calendar_month", text: "Flexible working hours" },
  { icon: "verified", text: "Verified badge on your profile" },
];

export default function JoinAsWorker() {
  const navigate = useNavigate();
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 gradient-mesh relative overflow-hidden">
      <div ref={ref} className="max-w-screen-xl mx-auto px-[16px] md:px-[64px]">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Left — Content */}
          <div className={`flex-1 ${isRevealed ? "animate-fade-in-left" : "opacity-0"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-success/10 text-brand-success text-xs font-bold uppercase tracking-widest mb-4">
              For Professionals
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-on-surface mb-4">
              Join India's Largest<br /><span className="text-gradient">Worker Network</span>
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg max-w-lg mb-8">
              Become a SevaSetu worker and earn a fair, dignified income. We invest in your skills, provide insurance, and give you ownership through our cooperative model.
            </p>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {BENEFITS.map((b) => (
                <div key={b.text} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-outline-variant/50 card-hover">
                  <span className="w-8 h-8 rounded-lg bg-brand-success/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-brand-success text-[18px] fill">{b.icon}</span>
                  </span>
                  <span className="text-sm font-medium text-on-surface">{b.text}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate("/register/worker")}
              className="inline-flex items-center gap-2 bg-brand-purple text-white font-bold text-base px-8 py-4 rounded-2xl hover:bg-brand-purple-dark transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-brand-purple/25 group"
            >
              Register as Worker
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          {/* Right — Visual */}
          <div className={`hidden md:block shrink-0 ${isRevealed ? "animate-fade-in-right" : "opacity-0"}`}>
            <div className="relative">
              {/* Main card */}
              <div className="w-80 bg-white rounded-3xl p-8 shadow-2xl border border-outline-variant/50">
                <div className="w-20 h-20 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-brand-purple text-[40px] fill">person_add</span>
                </div>
                <h3 className="text-center text-xl font-bold text-on-surface mb-2">Start Earning Today</h3>
                <p className="text-center text-sm text-on-surface-variant mb-6">Join 10,000+ verified professionals</p>

                <div className="space-y-3">
                  {["Complete Registration", "Upload Documents", "Get Verified", "Start Working"].map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-brand-purple text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-on-surface">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-brand-success text-white rounded-2xl px-4 py-2 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] fill">verified</span>
                  <span className="text-sm font-bold">Verified</span>
                </div>
              </div>

              {/* Earnings badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-outline-variant/50 animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-xs text-on-surface-variant font-semibold mb-1">This month</div>
                <div className="text-lg font-black text-brand-success">₹32,450</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
