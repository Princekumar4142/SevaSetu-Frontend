import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { registerCustomer, clearAuthError } from "../store/slices/authSlice";
import { ROLE_HOME } from "../constants/roles";
import { validateCustomerForm } from "../utils/validators";
import Input from "../components/Input";
import Button from "../components/Button";
import EmailOtpVerifier from "../components/EmailOtpVerifier";
import { ErrorBanner } from "../components/Feedback";

const EMPTY = { name: "", phone: "", email: "", password: "", confirmPassword: "" };

export default function RegisterCustomer() {
  const { dispatch, loading, error, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [emailVerified, setEmailVerified] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated && role) navigate(ROLE_HOME[role] || "/", { replace: true });
  }, [isAuthenticated, role, navigate]);

  useEffect(() => () => dispatch(clearAuthError()), [dispatch]);

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: null })); // clear as they retype
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailVerified) return;
    const errors = validateCustomerForm(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    try {
      await dispatch(registerCustomer(form)).unwrap();
    } catch (message) {
      // If the backend rejected because the verified-email record expired
      // or was already used (e.g. a previous failed attempt further back,
      // or just waiting too long between verifying and submitting), the
      // OTP UI needs to reset so the person can see they must re-verify —
      // otherwise the form just silently keeps failing with no visible
      // reason, since "Email verified ✓" would still be showing.
      if (typeof message === "string" && /verify your email/i.test(message)) {
        setEmailVerified(false);
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-margin-mobile py-xl">
      <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-xl">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-xs">Create your account</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
          Book verified cooperative workers for home, construction &amp; everyday needs.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-md" noValidate>
          <ErrorBanner message={error} />
          <Input label="Full Name" value={form.name} onChange={set("name")} error={fieldErrors.name} required />
          <Input
            label="Phone Number"
            placeholder="9876543210"
            value={form.phone}
            onChange={set("phone")}
            error={fieldErrors.phone}
            inputMode="numeric"
            maxLength={10}
            required
          />

          <EmailOtpVerifier
            email={form.email}
            onEmailChange={(email) => {
              setForm((f) => ({ ...f, email }));
              setEmailVerified(false);
            }}
            verified={emailVerified}
            onVerified={() => setEmailVerified(true)}
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={set("password")}
            error={fieldErrors.password}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={set("confirmPassword")}
            error={fieldErrors.confirmPassword}
            required
          />
          <Button type="submit" loading={loading} disabled={!emailVerified} className="w-full mt-sm">
            {emailVerified ? "Sign Up" : "Verify your email to continue"}
          </Button>
        </form>

        <p className="font-body-md text-body-md text-on-surface-variant mt-lg text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Log in
          </Link>
          <br />
          Are you a worker?{" "}
          <Link to="/register/worker" className="text-primary font-bold hover:underline">
            Register as a worker
          </Link>
        </p>
      </div>
    </div>
  );
}
