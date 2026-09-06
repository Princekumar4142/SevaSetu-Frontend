import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import sevaSetuLogo from "../assets/sevasetu_logo.jpg";

export default function RegisterChoose() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-orange-50/30 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-2.5 px-4 sm:px-8 py-4 border-b border-slate-100/80 bg-white/80 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo size={42} />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 sm:py-16">
        {/* Header */}
        <div className="text-center mb-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-semibold text-indigo-700 tracking-wide">Join SevaSetu</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            How would you like to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">join us?</span>
          </h1>
          <p className="mt-3 text-slate-500 text-base sm:text-lg">
            Choose your role to get started — it only takes 2 minutes
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
          
          {/* ── Customer Card ── */}
          <Link
            to="/register/customer"
            id="register-as-customer"
            className="group relative bg-white rounded-3xl border-2 border-slate-100 hover:border-indigo-400 shadow-sm hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 overflow-hidden p-7 flex flex-col gap-5 cursor-pointer hover:-translate-y-1"
          >
            {/* Card glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />

            {/* Icon */}
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <span className="material-symbols-outlined text-white text-[32px]">person</span>
            </div>

            {/* Badge */}
            <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              Customer
            </div>

            <div className="relative flex flex-col gap-2 flex-1">
              <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors">
                Sign Up as User
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Book verified workers for home services, repairs, cleaning, salon & more at fixed prices.
              </p>
            </div>

            {/* Feature list */}
            <ul className="relative space-y-2 text-xs text-slate-600">
              {[
                "Book services at fixed prices",
                "Track workers in real-time",
                "Verified & background-checked workers",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-indigo-600 text-[12px]">check</span>
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="relative flex items-center justify-between mt-1">
              <span className="text-sm font-bold text-indigo-600 group-hover:text-indigo-700">
                Get Started
              </span>
              <div className="w-9 h-9 rounded-xl bg-indigo-600 group-hover:bg-indigo-700 flex items-center justify-center shadow-md group-hover:translate-x-1 transition-transform duration-200">
                <span className="material-symbols-outlined text-white text-[18px]">arrow_forward</span>
              </div>
            </div>
          </Link>

          {/* ── Worker Card ── */}
          <Link
            to="/register/worker"
            id="register-as-worker"
            className="group relative bg-white rounded-3xl border-2 border-slate-100 hover:border-orange-400 shadow-sm hover:shadow-xl hover:shadow-orange-100 transition-all duration-300 overflow-hidden p-7 flex flex-col gap-5 cursor-pointer hover:-translate-y-1"
          >
            {/* Card glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />

            {/* Icon */}
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-200 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <span className="material-symbols-outlined text-white text-[32px]">handyman</span>
            </div>

            {/* Badge */}
            <div className="absolute top-4 right-4 bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              Worker
            </div>

            <div className="relative flex flex-col gap-2 flex-1">
              <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                Sign Up as Worker
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Register your skills, get bookings from nearby customers & earn with 0% commission.
              </p>
            </div>

            {/* Feature list */}
            <ul className="relative space-y-2 text-xs text-slate-600">
              {[
                "0% commission — keep all earnings",
                "Flexible working hours",
                "Training & certification support",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-orange-600 text-[12px]">check</span>
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="relative flex items-center justify-between mt-1">
              <span className="text-sm font-bold text-orange-600 group-hover:text-orange-700">
                Start Earning
              </span>
              <div className="w-9 h-9 rounded-xl bg-orange-500 group-hover:bg-orange-600 flex items-center justify-center shadow-md group-hover:translate-x-1 transition-transform duration-200">
                <span className="material-symbols-outlined text-white text-[18px]">arrow_forward</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom login link */}
        <p className="mt-8 text-sm text-slate-500 text-center">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">
            Log In
          </Link>
        </p>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {[
            { icon: "verified_user", label: "100% Verified Workers" },
            { icon: "lock", label: "Secure & Private" },
            { icon: "support_agent", label: "24/7 Support" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
              <span className="material-symbols-outlined text-slate-300 text-[16px]">{b.icon}</span>
              {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-xs text-slate-400">
        © {new Date().getFullYear()} SevaSetu · Made with ❤️ in India 🇮🇳
      </div>
    </div>
  );
}
