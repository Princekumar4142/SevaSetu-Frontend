import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const HERO_CATEGORIES = [
  { id: "ac-repair", label: "AC Repair", icon: "ac_unit", color: "from-blue-500/20 to-sky-500/10 text-sky-400 border-sky-500/30" },
  { id: "electrical-plumbing", label: "Electrician", icon: "bolt", color: "from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30" },
  { id: "electrical-plumbing", label: "Plumber", icon: "plumbing", color: "from-cyan-500/20 to-teal-500/10 text-cyan-400 border-cyan-500/30" },
  { id: "cleaning-pest-1", label: "Deep Cleaning", icon: "cleaning_services", color: "from-emerald-500/20 to-green-500/10 text-emerald-400 border-emerald-500/30" },
  { id: "salon-women", label: "Salon at Home", icon: "spa", color: "from-pink-500/20 to-rose-500/10 text-pink-400 border-pink-500/30" },
  { id: "home-painting", label: "Painting", icon: "format_paint", color: "from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30" },
];

const POPULAR_TAGS = [
  { label: "Split AC Service", id: "ac-repair" },
  { label: "Tap Leakage", id: "electrical-plumbing" },
  { label: "Switchboard Fix", id: "electrical-plumbing" },
  { label: "Bathroom Cleaning", id: "cleaning-pest-1" },
  { label: "Hair Spa", id: "salon-women" },
];

const FEATURED_BOOKINGS = [
  {
    id: "ac-repair",
    title: "Split AC Deep Jet Cleaning",
    rating: "4.91",
    reviews: "32k",
    price: "₹449",
    originalPrice: "₹599",
    time: "45 mins",
    icon: "ac_unit",
  },
  {
    id: "cleaning-pest-1",
    title: "Bathroom Deep Scrubbing",
    rating: "4.88",
    reviews: "19k",
    price: "₹499",
    originalPrice: "₹650",
    time: "60 mins",
    icon: "cleaning_services",
  },
  {
    id: "electrical-plumbing",
    title: "Switchboard & Wiring Repair",
    rating: "4.94",
    reviews: "41k",
    price: "₹149",
    originalPrice: "₹199",
    time: "30 mins",
    icon: "bolt",
  },
];

export default function LandingHero() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const firstName = currentUser?.name?.split(" ")[0] || "";

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      navigate(`/customer/services/${encodeURIComponent(query)}`);
    } else {
      navigate("/customer/services/electrical-plumbing");
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-[#0B1528] to-slate-950 text-white py-12 md:py-16 overflow-hidden border-b border-slate-800/80">
      {/* Subtle radial lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[450px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Authentic Marketplace Headline & Category Grid */}
          <div className="lg:col-span-7 space-y-6">

            {/* Quality & Trust Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-slate-200">
                Verified Local Cooperative Workers · Standard Transparent Rates
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              {isAuthenticated ? (
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                    Welcome back
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-amber-200">{firstName}</span>.
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 max-w-xl pt-1">
                    What service can our verified professionals take care of for you today?
                  </p>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Quality home services, <br className="hidden sm:block" />
                    delivered at your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100">doorstep.</span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 max-w-xl pt-2">
                    Book background-checked cooperative workers for repair, cleaning, salon and maintenance with fixed upfront pricing.
                  </p>
                </div>
              )}
            </div>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="relative max-w-xl">
              <div className="flex items-center bg-white rounded-2xl p-1.5 sm:p-2 shadow-xl border border-slate-200">
                <span className="material-symbols-outlined text-slate-400 ml-3 text-[22px]">search</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search services (e.g. AC repair, plumber, bathroom cleaning)..."
                  className="flex-1 py-2 sm:py-2.5 px-3 focus:outline-none text-slate-900 text-sm sm:text-base placeholder:text-slate-400 bg-transparent font-medium"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-indigo-600/30 flex items-center gap-1 shrink-0"
                >
                  <span>Search</span>
                  <span className="material-symbols-outlined text-[16px] hidden sm:inline">arrow_forward</span>
                </button>
              </div>
            </form>

            {/* Quick Popular Suggestions */}
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
              <span className="font-semibold text-slate-400">Popular:</span>
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => navigate(`/customer/services/${tag.id}`)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 hover:border-white/20 transition-all font-medium"
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Direct Service Category Quick-Tiles */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Quick Service Categories
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {HERO_CATEGORIES.map((cat) => (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => navigate(`/customer/services/${cat.id}`)}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/25 transition-all text-center group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[22px] text-indigo-300 group-hover:text-amber-300 transition-colors">
                        {cat.icon}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white leading-tight">
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Guarantees Bar */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-[20px]">verified</span>
                <span className="text-xs font-medium text-slate-300">Aadhaar &amp; Skill Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-[20px]">price_check</span>
                <span className="text-xs font-medium text-slate-300">Upfront Fixed Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400 text-[20px]">schedule</span>
                <span className="text-xs font-medium text-slate-300">On-Time Arrival</span>
              </div>
            </div>

          </div>

          {/* Right Column: Trending Bookings & SevaSetu Plus Member Card */}
          <div className="lg:col-span-5 space-y-4">

            {/* SevaSetu Plus Card */}
            <div
              onClick={() => navigate("/customer/plus")}
              className="bg-gradient-to-br from-amber-500/15 via-slate-900 to-indigo-950/80 border border-amber-400/30 hover:border-amber-400/60 rounded-2xl p-4 sm:p-5 shadow-xl cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
                    <span className="material-symbols-outlined text-[20px] fill">bolt</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase">
                      Membership Perk
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                      Save 15% on Every Booking
                    </h3>
                  </div>
                </div>
                <span className="material-symbols-outlined text-amber-300 text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-1">
                Zero cancellation fees, priority dispatch &amp; exclusive member rates on AC, Plumbing, and Cleaning.
              </p>
            </div>

            {/* Trending Services with Real Upfront Rates */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Frequently Booked Services
                  </span>
                </div>
                <span className="text-[11px] text-indigo-400 font-semibold">Fixed Rates</span>
              </div>

              <div className="space-y-2.5">
                {FEATURED_BOOKINGS.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => navigate(`/customer/services/${item.id}`)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-300 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors truncate">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span className="text-amber-300 font-bold flex items-center gap-0.5">
                            ★ {item.rating}
                          </span>
                          <span>•</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 pl-2">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="text-xs text-slate-500 line-through">{item.originalPrice}</span>
                        <span className="text-sm font-bold text-amber-300">{item.price}</span>
                      </div>
                      <span className="text-[10px] text-indigo-400 font-semibold group-hover:underline">
                        Book →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

