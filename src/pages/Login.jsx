import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { login, clearAuthError } from "../store/slices/authSlice";
import { ROLE_HOME } from "../constants/roles";
import Input from "../components/Input";
import Button from "../components/Button";
import { ErrorBanner } from "../components/Feedback";

export default function Login() {
  const { dispatch, loading, error, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: "", password: "" });

  useEffect(() => {
    if (isAuthenticated && role) navigate(ROLE_HOME[role] || "/", { replace: true });
  }, [isAuthenticated, role, navigate]);

  useEffect(() => () => dispatch(clearAuthError()), [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 bg-surface-container-lowest md:bg-surface">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left / Main Card: Login Form */}
        <div className="lg:col-span-7 bg-white border border-outline-variant/80 rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-brand-purple bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                Secure Account Access
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Portal
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Welcome back</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
              Log in to your SevaSetu AI customer, worker, or cooperative account.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <ErrorBanner message={error} />

              <Input
                label="Phone Number or Email"
                placeholder="e.g. 9876543210 or user@example.com"
                value={form.identifier}
                onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />

              <Button
                type="submit"
                loading={loading}
                variant="purple"
                className="w-full py-3.5 text-base font-bold shadow-lg shadow-brand-purple/25 mt-2"
              >
                <span>Login to Dashboard</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Button>
            </form>
          </div>

          {/* Customer Signup Link */}
          <div className="pt-6 mt-6 border-t border-slate-100 text-center text-xs text-slate-500">
            Need home or skilled services?{" "}
            <Link to="/register/customer" className="text-brand-purple font-bold hover:underline">
              Create Customer Account
            </Link>
          </div>
        </div>

        {/* Right Card: Dedicated "Register as a Worker / Partner" Banner */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#1c1236] to-brand-purple rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[11px] font-black uppercase tracking-wider">
              <span className="material-symbols-outlined text-[15px] fill">handyman</span>
              For Skilled Professionals &amp; Local Shops
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Join as a Worker Partner or Register Your Local Shop
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              Earn directly with <strong>0% middleman commission</strong>. Get verified with Aadhaar, list your shop or trade, and start receiving real-time booking requests from customers nearby.
            </p>

            {/* Worker Benefits List */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">
                  verified
                </span>
                <span>
                  <strong>Aadhaar Verified Badge:</strong> Instant credibility &amp; customer trust.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <span className="material-symbols-outlined text-amber-400 text-[18px] shrink-0 mt-0.5">
                  storefront
                </span>
                <span>
                  <strong>Free Digital Shop Listing:</strong> Add your workshop photo &amp; GPS location.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <span className="material-symbols-outlined text-purple-300 text-[18px] shrink-0 mt-0.5">
                  payments
                </span>
                <span>
                  <strong>Daily Direct Earnings:</strong> Instant UPI &amp; Cash payments with zero deduction.
                </span>
              </div>
            </div>
          </div>

          {/* Direct CTA button to Worker Registration */}
          <div className="relative z-10 pt-6">
            <Link
              to="/register/worker"
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[20px]">badge</span>
              <span>Register as a Worker / Partner</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
