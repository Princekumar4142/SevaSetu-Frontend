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
      <div className="w-full max-w-md">
        {/* Main Card: Clean Login Form */}
        <div className="bg-white border border-outline-variant/80 rounded-3xl shadow-xl p-6 sm:p-8">
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
            Log in to your SevaSetu account.
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

          {/* Signup Link */}
          <div className="pt-6 mt-6 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have an account?{" "}
            <Link to="/register/choose" className="text-brand-purple font-bold hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
