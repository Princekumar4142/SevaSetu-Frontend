import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import Input from "../components/Input";
import Button from "../components/Button";
import { ErrorBanner } from "../components/Feedback";

export default function ForgotPassword() {
  const navigate = useNavigate();

  // Steps: 1 = Email, 2 = Verify OTP, 3 = New Password, 4 = Success
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [devOtp, setDevOtp] = useState(null);

  // Resend cooldown timer
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  // Auto-redirect on step 4
  useEffect(() => {
    if (step === 4) {
      const redirectTimer = setTimeout(() => {
        navigate("/login");
      }, 3500);
      return () => clearTimeout(redirectTimer);
    }
  }, [step, navigate]);

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await authService.forgotPasswordSendOtp(email.trim().toLowerCase());
      if (res.data?.devOtp) {
        setDevOtp(res.data.devOtp);
      }
      setStep(2);
      setCooldown(30);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send verification code. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    if (!otp.trim() || otp.trim().length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await authService.forgotPasswordVerifyOtp(email.trim().toLowerCase(), otp.trim());
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset & Update Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please re-check.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await authService.resetPassword({
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        newPassword,
      });
      setStep(4);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password. Please try requesting a new OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 sm:py-14 relative overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-indigo-50/40">
      {/* Background ambient glows */}
      <div className="hidden md:block absolute -top-24 -left-24 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md sm:max-w-xl lg:max-w-2xl relative z-10">
        <div className="bg-white border border-slate-200/90 rounded-3xl shadow-2xl shadow-slate-200/70 p-6 sm:p-10 md:p-12 transition-all">
          
          {/* Header & Back Button */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-brand-purple transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Login</span>
            </Link>
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-brand-purple bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              Account Recovery
            </span>
          </div>

          {/* Stepper Progress Bar */}
          {step < 4 && (
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span className={step >= 1 ? "text-brand-purple font-extrabold" : ""}>1. Email</span>
                <span className={step >= 2 ? "text-brand-purple font-extrabold" : ""}>2. Verify Code</span>
                <span className={step >= 3 ? "text-brand-purple font-extrabold" : ""}>3. New Password</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-primary to-brand-purple transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════
              STEP 1: Enter Email
             ══════════════════════════════════════════════ */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Forgot Password?
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                  Enter your registered email address below. We'll send you a 6-digit OTP code to reset your password.
                </p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4 sm:space-y-5">
                <ErrorBanner message={error} />

                <Input
                  label="Registered Email Address"
                  type="email"
                  placeholder="e.g. user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="py-2.5 sm:py-3 text-sm sm:text-base"
                />

                <Button
                  type="submit"
                  loading={loading}
                  variant="purple"
                  className="w-full py-3.5 sm:py-4 text-base font-bold shadow-lg shadow-brand-purple/25 mt-2"
                >
                  <span>Send Verification Code</span>
                  <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
                </Button>
              </form>
            </div>
          )}

          {/* ══════════════════════════════════════════════
              STEP 2: Enter 6-digit OTP
             ══════════════════════════════════════════════ */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Verify Verification Code
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                  We've sent a 6-digit OTP to{" "}
                  <strong className="text-slate-800 font-bold">{email}</strong>.
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setError("");
                    }}
                    className="ml-2 text-brand-purple underline font-semibold text-xs"
                  >
                    Change Email
                  </button>
                </p>
              </div>

              {devOtp && (
                <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-600 text-[20px]">mark_email_read</span>
                    <span>
                      Dev Mode Code: <strong className="font-mono text-sm tracking-widest">{devOtp}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOtp(devOtp)}
                    className="px-2.5 py-1 rounded-lg bg-amber-200/80 hover:bg-amber-300 font-bold text-[11px] transition-colors"
                  >
                    Auto-fill
                  </button>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-4 sm:space-y-5">
                <ErrorBanner message={error} />

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                    Enter 6-Digit OTP Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    className="w-full px-4 py-3 sm:py-3.5 rounded-2xl border border-slate-300 text-center tracking-[0.4em] font-mono font-bold text-xl sm:text-2xl focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                    required
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Didn't receive the code?</span>
                  <button
                    type="button"
                    disabled={cooldown > 0 || loading}
                    onClick={handleSendOtp}
                    className="font-bold text-brand-purple hover:underline disabled:opacity-50 disabled:no-underline"
                  >
                    {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend Code"}
                  </button>
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  variant="purple"
                  className="w-full py-3.5 sm:py-4 text-base font-bold shadow-lg shadow-brand-purple/25 mt-2"
                >
                  <span>Verify &amp; Continue</span>
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </Button>
              </form>
            </div>
          )}

          {/* ══════════════════════════════════════════════
              STEP 3: Set New Password
             ══════════════════════════════════════════════ */}
          {step === 3 && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Set New Password
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                  Choose a secure password for your account (minimum 6 characters).
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4 sm:space-y-5">
                <ErrorBanner message={error} />

                <div className="relative">
                  <Input
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="py-2.5 sm:py-3 text-sm sm:text-base pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>

                <Input
                  label="Confirm New Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="py-2.5 sm:py-3 text-sm sm:text-base"
                />

                <Button
                  type="submit"
                  loading={loading}
                  variant="purple"
                  className="w-full py-3.5 sm:py-4 text-base font-bold shadow-lg shadow-brand-purple/25 mt-2"
                >
                  <span>Update Password</span>
                  <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                </Button>
              </form>
            </div>
          )}

          {/* ══════════════════════════════════════════════
              STEP 4: Success Screen
             ══════════════════════════════════════════════ */}
          {step === 4 && (
            <div className="text-center py-6 sm:py-8 space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <span className="material-symbols-outlined text-4xl sm:text-5xl">check_circle</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Password Reset Successful!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                Your password has been securely updated. You can now log in using your new credentials.
              </p>
              <div className="pt-4">
                <Button
                  variant="purple"
                  onClick={() => navigate("/login")}
                  className="w-full py-3.5 sm:py-4 text-base font-bold shadow-lg shadow-brand-purple/25"
                >
                  <span>Proceed to Login</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Button>
                <p className="text-xs text-slate-400 mt-2">Auto-redirecting in a few seconds…</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
