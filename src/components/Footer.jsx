import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Logo from "./Logo";

const SERVICE_LINKS = [
  { name: "AC & Appliance Repair", id: "ac-repair" },
  { name: "Electrical & Plumbing", id: "electrical-plumbing" },
  { name: "Cleaning & Pest Control", id: "cleaning-pest-1" },
  { name: "Salon at Home", id: "salon-women" },
  { name: "Home Painting", id: "home-painting" },
  { name: "Carpentry & Repairs", id: "home-repairs" },
];

const CUSTOMER_LINKS = [
  { label: "My Bookings", href: "/customer/bookings" },
  { label: "SevaSetu Plus (Save 15%)", href: "/customer/plus" },
  { label: "Verified Workers Directory", href: "/customer/workers" },
  { label: "Customer Profile", href: "/customer/profile" },
  { label: "Create Customer Account", href: "/register/customer" },
];

const PARTNER_LINKS = [
  { label: "Join as Worker (0% Commission)", href: "/register/worker" },
  { label: "Worker Dashboard Login", href: "/login" },
  { label: "Cooperative Admin Portal", href: "/login" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await api.post("/subscribers", { email: email.trim() });
      setStatus({
        type: "success",
        message: res.data?.message || "Subscribed successfully! You'll receive updates on service discounts & new arrivals.",
      });
      setEmail("");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to subscribe. Please try again later.";
      setStatus({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Top subtle accent */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400" />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12 py-14">
        {/* Newsletter section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 mb-12 border-b border-slate-800">
          <div className="max-w-md">
            <h3 className="text-xl font-bold text-white mb-1">Get Exclusive Service Offers</h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Subscribe for verified professional availability, discount coupons, and seasonal service reminders.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status) setStatus(null);
                }}
                placeholder="Enter your email address"
                disabled={loading}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:w-72 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-600/30 disabled:opacity-60 shrink-0"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {status && (
              <p
                className={`text-xs mt-2 font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                  status.type === "success"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  {status.type === "success" ? "check_circle" : "error"}
                </span>
                {status.message}
              </p>
            )}
          </div>
        </div>

        {/* Main working footer columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <Logo size={32} className="transition-transform group-hover:scale-105" />
              <span className="text-lg font-bold text-white tracking-tight">SevaSetu AI</span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              India&apos;s cooperative-backed on-demand home and personal service network. Fair wages for verified workers, upfront fixed prices for customers.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>0% Middleman Commission</span>
            </div>
          </div>

          {/* Popular Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-indigo-300">
              Popular Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((s) => (
                <li key={s.name}>
                  <Link
                    to={`/customer/services/${s.id}`}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Customers & Bookings */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-indigo-300">
              Customer Portals
            </h4>
            <ul className="space-y-2.5">
              {CUSTOMER_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners & Contact Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-indigo-300">
              Partners &amp; Support
            </h4>
            <ul className="space-y-2.5 mb-5">
              {PARTNER_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
              <p className="text-xs font-semibold text-slate-300">Helpline &amp; Support</p>
              <a
                href="mailto:support@sevasetu.ai"
                className="text-xs text-indigo-400 hover:underline block truncate"
              >
                support@sevasetu.ai
              </a>
              <p className="text-[11px] text-slate-500">
                Mon – Sun · 8:00 AM – 9:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-900 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SevaSetu AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>हर हुनर को काम, हर काम को विश्वास</span>
            <span>•</span>
            <span className="text-slate-400">Made with ❤️ in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

