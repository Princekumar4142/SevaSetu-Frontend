import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../context/LanguageContext";
import { login, clearAuthError } from "../store/slices/authSlice";
import { ROLE_HOME } from "../constants/roles";
import Input from "../components/Input";
import Button from "../components/Button";
import { ErrorBanner } from "../components/Feedback";

export default function Login() {
  const { dispatch, loading, error, isAuthenticated, role } = useAuth();
  const { tr } = useLanguage();
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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 sm:py-14 relative overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-indigo-50/40">
      {/* Background ambient glows for a premium desktop experience */}
      <div className="hidden md:block absolute -top-24 -left-24 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Responsive Card Container: compact on mobile, spacious and prominent on laptop */}
      <div className="w-full max-w-md sm:max-w-xl lg:max-w-2xl relative z-10">
        <div className="bg-white border border-slate-200/90 rounded-3xl shadow-2xl shadow-slate-200/70 p-6 sm:p-10 md:p-12 transition-all">
          {/* Header Badges */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-brand-purple bg-purple-50 px-3.5 py-1 rounded-full border border-purple-100">
              {tr("Secure Account Access")}
            </span>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {tr("Live Portal")}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {tr("Welcome back")}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-1.5 mb-6 sm:mb-8">
            {tr("Log in to your SevaSetu customer, worker, or cooperative account.")}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
            <ErrorBanner message={error} />

            <Input
              label={tr("Phone Number or Email")}
              placeholder={tr("e.g. 9876543210 or user@example.com")}
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              required
              className="py-2.5 sm:py-3 text-sm sm:text-base"
            />

            <Input
              label={tr("Password")}
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="py-2.5 sm:py-3 text-sm sm:text-base"
            />

            <div className="flex items-center justify-end -mt-1 sm:-mt-2">
              <Link
                to="/forgot-password"
                className="text-xs sm:text-sm font-bold text-brand-purple hover:text-brand-purple-dark hover:underline transition-colors"
              >
                {tr("Forgot password?")}
              </Link>
            </div>

            <Button
              type="submit"
              loading={loading}
              variant="purple"
              className="w-full py-3.5 sm:py-4 text-base font-bold shadow-lg shadow-brand-purple/25 mt-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>{loading ? tr("Signing in...") : tr("Sign in")}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Button>
          </form>

          {/* Signup Link */}
          <div className="pt-6 sm:pt-7 mt-6 sm:mt-8 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-500">
            {tr("Don't have an account?")}{" "}
            <Link to="/register" className="text-brand-purple font-bold hover:underline">
              {tr("Create one now")}
            </Link>
          </div>

          {/* Security & Trust Footer */}
          <div className="mt-4 pt-3 border-t border-slate-50 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-emerald-600">lock</span>
              256-bit SSL Secure
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-indigo-600">verified_user</span>
              Official SevaSetu Access
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
