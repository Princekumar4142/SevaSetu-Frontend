import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../context/LanguageContext";
import shoppingAssistantImg from "../assets/services/shopping-assistant.jpg";
import cityGuideImg from "../assets/services/city-guide.jpg";

export default function VerifiedWorkers() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { tr } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* ── Top Hero Header ── */}
      <div className="bg-gradient-to-r from-primary via-indigo-900 to-brand-purple text-white py-8 sm:py-12 px-4 sm:px-8 shadow-md">
        <div className="max-w-screen-xl mx-auto">
          {/* Back button & Tag */}
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => {
                if (window.history.length > 1) navigate(-1);
                else navigate("/customer");
              }}
              className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 active:scale-95 flex items-center justify-center text-white transition-all shrink-0 backdrop-blur-sm border border-white/20"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Direct Assisted Companion Services
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-3">
            Personal Shopping &amp; Market Assistants
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
            Hire a respectful, background-verified local companion to carry heavy bags for your elderly family members, or guide you through the best wholesale markets if you are new to the city.
          </p>

          {/* Quick Stat Badges */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-6 pt-5 border-t border-white/15 text-xs sm:text-sm font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
              100% Aadhaar Verified
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-amber-400 text-[18px]">schedule</span>
              Hourly &amp; Half-Day Booking
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-purple-300 text-[18px]">home_pin</span>
              Doorstep or Market Pickup
            </span>
          </div>
        </div>
      </div>

      {/* ── Main 2 Core Services Showcase ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 -mt-6 sm:-mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* ── SERVICE 1: Market & Heavy Bag Shopping Assistant (Elder Care) ── */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col justify-between hover:border-indigo-300 transition-all group">
            <div>
              {/* Image Banner */}
              <div className="relative h-60 sm:h-72 overflow-hidden bg-slate-100">
                <img
                  src={shoppingAssistantImg}
                  alt="Market & Heavy Bag Shopping Assistant for Elders and Families"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-brand-purple border border-purple-100 shadow-sm flex items-center gap-1">
                  <span>🛍️</span>
                  <span>Elder &amp; Family Care</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-amber-400 border border-slate-700 shadow-sm">
                  Starting at ₹149/hr
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-7 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-amber-500 font-bold text-xs sm:text-sm flex items-center gap-0.5">
                      ★ 4.96 (18k+ happy families)
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                    Market &amp; Heavy Bag Assistant <br className="hidden sm:inline" />
                    <span className="text-brand-purple text-lg sm:text-xl font-bold">(Elder &amp; Bazaar Shopping Companion)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Designed for senior citizens, mothers, and busy families who want to shop at local bazaars or supermarkets without the pain of carrying heavy vegetable/grocery bags.
                  </p>
                </div>

                {/* Benefits / Feature Bullets */}
                <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">fitness_center</span>
                    <span><strong>Carries Heavy Bags:</strong> Lifts up to 25kg+ groceries, fruits, vegetables, and shopping parcels with care.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-brand-purple text-[18px] shrink-0 mt-0.5">elderly</span>
                    <span><strong>Gentle Elder Accompaniment:</strong> Walks with patience, assists through busy crowds, and ensures safety.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">local_taxi</span>
                    <span><strong>Doorstep Transport Helper:</strong> Hails auto/cab, loads luggage, and delivers bags right inside the home.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bottom */}
            <div className="p-5 sm:p-7 pt-0">
              <button
                type="button"
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/login");
                  } else {
                    navigate("/customer/services/shopping-bag-assistant");
                  }
                }}
                className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-primary to-brand-purple hover:opacity-95 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
              >
                <span>Book Market Assistant Now</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* ── SERVICE 2: New City Shopping Guide & Market Navigator ── */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col justify-between hover:border-indigo-300 transition-all group">
            <div>
              {/* Image Banner */}
              <div className="relative h-60 sm:h-72 overflow-hidden bg-slate-100">
                <img
                  src={cityGuideImg}
                  alt="New City Shopping Guide and Wholesale Market Navigator"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-emerald-700 border border-emerald-100 shadow-sm flex items-center gap-1">
                  <span>🗺️</span>
                  <span>New In City &amp; Explorer</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-amber-400 border border-slate-700 shadow-sm">
                  Starting at ₹199/hr
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-7 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-amber-500 font-bold text-xs sm:text-sm flex items-center gap-0.5">
                      ★ 4.94 (14k+ city shoppers)
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                    New City Shopping Guide <br className="hidden sm:inline" />
                    <span className="text-emerald-600 text-lg sm:text-xl font-bold">(Local Market Navigator &amp; Bargaining Expert)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    New to the city or looking for authentic wholesale deals? Hire a smart local insider who knows every market lane, authentic shops, and local language.
                  </p>
                </div>

                {/* Benefits / Feature Bullets */}
                <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">store</span>
                    <span><strong>Direct Wholesale Market Access:</strong> Clothes, electronics, home decor, spices, and utensils at actual wholesale rates.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-amber-600 text-[18px] shrink-0 mt-0.5">handshake</span>
                    <span><strong>Price Bargaining &amp; Local Language:</strong> Overcomes language gaps and negotiates the best fair rate for you.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-indigo-600 text-[18px] shrink-0 mt-0.5">route</span>
                    <span><strong>Custom Shopping Route:</strong> Saves 3-4 hours of wandering by taking you straight to tested, trusted merchants.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bottom */}
            <div className="p-5 sm:p-7 pt-0">
              <button
                type="button"
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/login");
                  } else {
                    navigate("/customer/services/city-shopping-guide");
                  }
                }}
                className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
              >
                <span>Hire City Shopping Guide</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── 3-Step Simple Process ── */}
        <div className="mt-12 sm:mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-brand-purple bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              How It Works
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Book in 3 Simple Steps
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Affordable, transparent hourly rates with zero hidden platform fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-100 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto text-xl font-black">
                1
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">Choose Companion Type</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pick between a <strong>Market Bag Assistant</strong> for heavy lifting, or a <strong>City Guide</strong> for wholesale market exploration.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-100 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto text-xl font-black">
                2
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">Set Meeting Location</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your assistant meets you at your home doorstep or directly at the market/mall entrance as per your convenience.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-100 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-black">
                3
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">Stress-Free Shopping</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Shop with ease, save time and money, and pay only for the exact hours used. Safe, dignified, and reliable.
              </p>
            </div>
          </div>
        </div>

        {/* ── Partner Registration Callout Banner ── */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-amber-400 text-xs font-black uppercase tracking-wider">
              Earn Daily with SevaSetu
            </span>
            <h4 className="text-lg sm:text-xl font-black">
              Want to work as a Market Companion or City Guide?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Are you polite, energetic, and familiar with local city markets? Earn ₹800 to ₹1,500 daily with direct, instant payouts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/register/worker")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shrink-0 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            Register as a Worker Partner →
          </button>
        </div>
      </div>
    </div>
  );
}
