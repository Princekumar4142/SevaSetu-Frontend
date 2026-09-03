import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Logo from "./Logo";

const SERVICE_LINKS = [
  { name: "AC Repair", id: "ac-repair" },
  { name: "Plumbing", id: "electrical-plumbing" },
  { name: "Electrician", id: "electrical-plumbing" },
  { name: "Salon at Home", id: "salon-women" },
  { name: "Home Cleaning", id: "cleaning-pest-1" },
  { name: "Painting", id: "home-painting" },
  { name: "Pest Control", id: "cleaning-pest-1" },
  { name: "Carpentry", id: "home-repairs" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Blog", href: "#blog" },
  { label: "Press", href: "#press" },
  { label: "Partner with Us", href: "#partner" },
];

const SUPPORT_LINKS = [
  { label: "Help Center", href: "#help" },
  { label: "Safety Policy", href: "#safety" },
  { label: "Worker Rights", href: "#rights" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact Us", href: "#contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Cookie Policy", href: "#cookies" },
  { label: "Refund Policy", href: "#refund" },
];

const SOCIAL_ICONS = [
  { name: "Twitter / X", icon: "tag", href: "#twitter" },
  { name: "Instagram", icon: "photo_camera", href: "#instagram" },
  { name: "LinkedIn", icon: "work", href: "#linkedin" },
  { name: "YouTube", icon: "play_circle", href: "#youtube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }

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
        message: res.data?.message || "Subscribed successfully! Confirmation email sent with exclusive updates.",
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
    <footer className="bg-primary relative overflow-hidden">
      {/* Top gradient accent */}
      <div className="h-1 bg-gradient-to-r from-brand-purple via-secondary to-brand-success" />

      {/* Decorative background orbs */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-brand-purple/5 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative max-w-screen-xl mx-auto px-[16px] md:px-[64px] py-16">
        {/* Newsletter section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 pb-16 border-b border-white/10">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-white/70 text-sm">
              Get instant updates on new services, exclusive offers, discounts, and verified worker alerts directly to your inbox.
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
                placeholder="Enter your email"
                disabled={loading}
                className="px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-purple text-sm md:w-72 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-brand-purple text-white font-semibold text-sm rounded-xl hover:bg-brand-purple-dark transition-all shadow-lg hover:shadow-brand-purple/30 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
            {status && (
              <p
                className={`text-xs mt-2.5 font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
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

        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <Logo size={32} className="transition-transform group-hover:scale-105" />
              <span className="text-xl font-bold text-white">SevaSetu AI</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Empowering India&apos;s skilled workforce through technology, trust, and cooperative ownership.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_ICONS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  title={social.name}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:border-white/30 transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-white/60 text-[18px]">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Services</h4>
            <ul className="flex flex-col gap-3">
              {SERVICE_LINKS.map((s) => (
                <li key={s.name}>
                  <Link
                    to={`/customer/services/${s.id}`}
                    className="text-sm text-white/40 hover:text-white transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Company</h4>
            <ul className="flex flex-col gap-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <a className="text-sm text-white/40 hover:text-white transition-colors" href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Support</h4>
            <ul className="flex flex-col gap-3">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.label}>
                  <a className="text-sm text-white/40 hover:text-white transition-colors" href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Legal</h4>
            <ul className="flex flex-col gap-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.label}>
                  <a className="text-sm text-white/40 hover:text-white transition-colors" href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} SevaSetu AI. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-white/30 text-xs">Har Hunar Ko Kaam, Har Kaam Ko Vishwas</span>
            <span className="text-white/20">•</span>
            <span className="text-white/40 text-xs">Made with ❤️ in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
