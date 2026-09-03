import { useState, useEffect, useRef } from "react";
import authService from "../services/authService";
import Input from "./Input";
import Button from "./Button";

const RESEND_COOLDOWN = 30;

/**
 * Handles the send-code / enter-code / verify round trip for email
 * verification before registration. Calls onVerified(email) once the
 * backend confirms the code is correct — the parent form should not allow
 * final submission until that fires.
 */
export default function EmailOtpVerifier({ email, onEmailChange, verified, onVerified }) {
  const [stage, setStage] = useState("enter-email"); // enter-email | enter-otp | verified
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [devOtp, setDevOtp] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (verified) setStage("verified");
  }, [verified]);

  useEffect(() => {
    if (cooldown <= 0) return;
    timerRef.current = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [cooldown]);

  const handleSendOtp = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address first");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await authService.sendOtp(email);
      setStage("enter-otp");
      setCooldown(RESEND_COOLDOWN);
      // Only present when the backend has no SMTP configured (dev-mode
      // fallback) — shown here so local development works without real
      // email credentials. Never present once real SMTP is configured.
      setDevOtp(res.data?.devOtp || null);
    } catch (err) {
      setError(err.response?.data?.message || "Could not send verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6-digit code");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await authService.verifyOtp(email, otp);
      setStage("verified");
      onVerified(email);
    } catch (err) {
      setError(err.response?.data?.message || "Incorrect or expired code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-sm">
      <div className="flex items-end gap-sm">
        <div className="flex-1">
          <Input
            label="Email"
            type="email"
            value={email}
            disabled={stage === "verified"}
            onChange={(e) => {
              onEmailChange(e.target.value);
              if (stage !== "enter-email") setStage("enter-email"); // email changed — must re-verify
            }}
            required
          />
        </div>
        {stage !== "verified" && (
          <Button type="button" variant="outline" loading={loading && stage === "enter-email"} onClick={handleSendOtp} disabled={cooldown > 0}>
            {cooldown > 0 ? `Resend in ${cooldown}s` : stage === "enter-otp" ? "Resend" : "Send OTP"}
          </Button>
        )}
      </div>

      {stage === "verified" && (
        <p className="font-status-badge text-status-badge text-brand-success flex items-center gap-xs">
          <span className="material-symbols-outlined text-[16px] fill">check_circle</span>
          Email verified
        </p>
      )}

      {stage === "enter-otp" && (
        <div className="flex items-end gap-sm">
          <div className="flex-1">
            <Input
              label="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              inputMode="numeric"
            />
          </div>
          <Button type="button" loading={loading} onClick={handleVerify}>
            Verify
          </Button>
        </div>
      )}

      {devOtp && stage === "enter-otp" && (
        <p className="font-status-badge text-status-badge text-brand-orange">
          Dev mode (no SMTP configured): your code is <strong>{devOtp}</strong>
        </p>
      )}

      {error && <p className="font-status-badge text-status-badge text-error">{error}</p>}
    </div>
  );
}
