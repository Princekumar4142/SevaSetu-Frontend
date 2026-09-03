import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../Logo";

const POPULAR_QUICK_TAGS = [
  { label: "AC Repair", id: "ac-repair" },
  { label: "Plumber", id: "electrical-plumbing" },
  { label: "Salon at Home", id: "salon-women" },
  { label: "Deep Cleaning", id: "cleaning-pest-1" },
  { label: "Electrician", id: "electrical-plumbing" },
];

export default function LandingHero() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const firstName = currentUser?.name?.split(" ")[0] || "there";

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/customer/services/${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/customer/services/electrical-plumbing");
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-[#081a33] via-[#0e274a] to-[#122e56] text-white py-12 md:py-20 overflow-hidden">
      {/* Subtle background glow accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Search & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide uppercase text-amber-300">
                Cooperative-Owned Skilled Workforce
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              {isAuthenticated ? (
                <div>
                  <p className="text-sm md:text-base font-semibold text-blue-200 uppercase tracking-wider">
                    Welcome back
                  </p>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
                    Namaste, {firstName}! 🙏
                  </h1>
                </div>
              ) : (
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
                  Expert Home &amp; Personal Services, <span className="text-amber-300">Simplified.</span>
                </h1>
              )}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed pt-1">
                Book verified professionals with fixed transparent rates. Empowering local cooperative workers while delivering 5-star service at your doorstep.
              </p>
            </div>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="relative max-w-xl">
              <div className="flex items-center bg-white rounded-2xl p-1.5 sm:p-2 shadow-2xl border border-slate-200">
                <span className="material-symbols-outlined text-slate-400 ml-3 text-[22px]">search</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for plumbing, salon, cleaning, AC service..."
                  className="flex-1 py-2.5 sm:py-3 px-3 focus:outline-none text-slate-800 text-sm sm:text-base placeholder:text-slate-400 bg-transparent"
                />
                <button
                  type="submit"
                  className="bg-brand-purple hover:bg-brand-purple-dark text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-brand-purple/30 flex items-center gap-1 shrink-0"
                >
                  <span>Search</span>
                  <span className="material-symbols-outlined text-[16px] hidden sm:inline">arrow_forward</span>
                </button>
              </div>
            </form>

            {/* Quick Popular Tags */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-xs font-semibold text-slate-400">Popular:</span>
              {POPULAR_QUICK_TAGS.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => navigate(`/customer/services/${tag.id}`)}
                  className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors"
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Human-Centric Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">50,000+</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Happy Homes Served</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-300">4.88 ★</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Verified Reviews</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Transparent Rates</div>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* SevaSetu Plus Card */}
            <div
              onClick={() => navigate("/customer/plus")}
              className="bg-gradient-to-br from-amber-500/20 via-slate-800/80 to-slate-900/90 border border-amber-400/30 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-xl cursor-pointer hover:border-amber-400/60 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-black shadow-md">
                    <span className="material-symbols-outlined text-[24px] fill">bolt</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold tracking-wider text-amber-300 uppercase">
                      SevaSetu Plus
                    </span>
                    <h3 className="text-lg font-black text-white group-hover:text-amber-200 transition-colors">
                      Save 15% on every booking
                    </h3>
                  </div>
                </div>
                <span className="material-symbols-outlined text-amber-300 text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Enjoy priority dispatch, zero cancellation fee &amp; member discounts on Salon, Cleaning, AC and Plumbing.
              </p>
            </div>

            {/* Quick Service Shortcuts */}
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Frequently Booked Today
                  </span>
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold">45-min arrival</span>
              </div>

              <div className="space-y-2">
                {[
                  { id: "ac-repair", name: "Split AC Foam Service", price: "₹449", icon: "ac_unit" },
                  { id: "cleaning-pest-1", name: "Bathroom Deep Scrubbing", price: "₹499", icon: "cleaning_services" },
                  { id: "electrical-plumbing", name: "Tap / Mixer Leakage Fix", price: "₹149", icon: "plumbing" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => navigate(`/customer/services/${s.id}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-purple/30 text-brand-purple-light flex items-center justify-center group-hover:bg-brand-purple group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
                        {s.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-amber-300">{s.price}</span>
                      <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:translate-x-0.5 transition-transform">
                        chevron_right
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
