import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { registerCustomer, clearAuthError } from "../store/slices/authSlice";
import { ROLE_HOME } from "../constants/roles";
import { validateCustomerForm } from "../utils/validators";
import Input from "../components/Input";
import Button from "../components/Button";
import EmailOtpVerifier from "../components/EmailOtpVerifier";
import ProfilePhotoUploader from "../components/ProfilePhotoUploader";
import { ErrorBanner } from "../components/Feedback";
import VoiceFormAgent from "../components/VoiceFormAgent";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";

// ── AI Voice Agent Field Configuration (Customer) ──
// Now built inside component to be language-reactive
const EMPTY = {
  name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  profilePhoto: "",
};

export default function RegisterCustomer() {
  const { dispatch, loading, error, isAuthenticated, role } = useAuth();
  const { tr } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [emailVerified, setEmailVerified] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState("");

  // Build language-reactive field prompts
  const customerVoiceFields = [
    { key: "name",    label: "Full Name",    type: "text",    prompt: tr("cust_name"),    confirmMessage: (v) => `✅ "${v}"`, minLength: 2 },
    { key: "phone",   label: "Phone Number", type: "phone",   prompt: tr("cust_phone"),   confirmMessage: (v) => `✅ ${v}`, minLength: 10, maxLength: 10 },
    { key: "address", label: "Address",      type: "text",    prompt: tr("cust_address"), confirmMessage: (v) => `✅ "${v}"`, minLength: 5 },
    { key: "city",    label: "City",          type: "text",    prompt: tr("cust_city"),    confirmMessage: (v) => `✅ ${v}`, minLength: 2 },
    { key: "state",   label: "State",         type: "text",    prompt: tr("cust_state"),   confirmMessage: (v) => `✅ ${v}`, minLength: 2 },
    { key: "pincode", label: "Pincode",       type: "pincode", prompt: tr("cust_pincode"), confirmMessage: (v) => `✅ ${v}`, minLength: 6, maxLength: 6 },
  ];

  useEffect(() => {
    if (isAuthenticated && role) navigate(ROLE_HOME[role] || "/", { replace: true });
  }, [isAuthenticated, role, navigate]);

  useEffect(() => () => dispatch(clearAuthError()), [dispatch]);

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: null }));
  };

  // ── AI Voice Agent field filler ──
  const handleVoiceFieldFill = useCallback((fieldKey, value) => {
    setForm((prev) => ({ ...prev, [fieldKey]: value }));
    setFieldErrors((prev) => ({ ...prev, [fieldKey]: null }));
  }, []);

  const handleAutoDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser");
      return;
    }
    setLocating(true);
    setLocError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await api.get("/geocode/reverse", {
            params: { lat: latitude, lng: longitude },
          });
          if (res.data?.success && res.data?.data) {
            const data = res.data.data;
            setForm((prev) => ({
              ...prev,
              address: data.address || prev.address,
              city: data.city || prev.city,
              state: data.state || prev.state,
              pincode: data.pincode || prev.pincode,
            }));
            setFieldErrors((prev) => ({
              ...prev,
              address: null,
              city: null,
              pincode: null,
            }));
          }
        } catch (err) {
          setLocError("Could not determine address automatically. Please enter manually.");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        setLocError("Location permission denied or unavailable. Please type your address.");
      },
      { timeout: 10000 }
    );
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
      if (typeof message === "string" && /verify your email/i.test(message)) {
        setEmailVerified(false);
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-margin-mobile py-xl">
      <div className="w-full max-w-lg bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm p-6 sm:p-8">
        <h1 className="font-headline-lg text-headline-lg font-bold text-primary mb-xs">Create your account</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6">
          Book verified cooperative workers for home, personal care &amp; everyday services.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <ErrorBanner message={error} />
          
          <Input
            label="Full Name"
            placeholder="e.g. Rahul Sharma"
            value={form.name}
            onChange={set("name")}
            error={fieldErrors.name}
            required
          />
          
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

          {/* Profile Photo Uploader */}
          <ProfilePhotoUploader
            value={form.profilePhoto}
            onChange={(photo) => setForm((prev) => ({ ...prev, profilePhoto: photo }))}
            name={form.name}
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

          {/* ── Delivery / Service Address Section ── */}
          <div className="mt-2 pt-4 border-t border-outline-variant/60">
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="font-label-md text-label-md font-bold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-brand-purple">location_on</span>
                  Delivery / Service Address
                </label>
                <p className="text-xs text-on-surface-variant">Where should workers arrive for your bookings?</p>
              </div>
              <button
                type="button"
                onClick={handleAutoDetectLocation}
                disabled={locating}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-brand-purple/10 text-brand-purple hover:bg-brand-purple/20 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {locating ? "sync" : "my_location"}
                </span>
                <span>{locating ? "Locating…" : "Auto-detect"}</span>
              </button>
            </div>

            {locError && (
              <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2 mb-3 border border-amber-200">
                {locError}
              </p>
            )}

            <div className="space-y-3">
              <Input
                label="House / Flat / Street / Area"
                placeholder="e.g. Flat 402, Sunshine Heights, MG Road"
                value={form.address}
                onChange={set("address")}
                error={fieldErrors.address}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="City"
                  placeholder="e.g. Pune / Mumbai"
                  value={form.city}
                  onChange={set("city")}
                  error={fieldErrors.city}
                  required
                />
                <Input
                  label="State (Optional)"
                  placeholder="e.g. Maharashtra"
                  value={form.state}
                  onChange={set("state")}
                  error={fieldErrors.state}
                />
              </div>

              <Input
                label="Pincode"
                placeholder="e.g. 411014"
                value={form.pincode}
                onChange={set("pincode")}
                error={fieldErrors.pincode}
                inputMode="numeric"
                maxLength={6}
                required
              />
            </div>
          </div>

          <div className="mt-2 pt-4 border-t border-outline-variant/60 space-y-3">
            <Input
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={set("password")}
              error={fieldErrors.password}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={set("confirmPassword")}
              error={fieldErrors.confirmPassword}
              required
            />
          </div>

          <Button type="submit" loading={loading} disabled={!emailVerified} className="w-full mt-4">
            {emailVerified ? "Create Account" : "Verify your email to continue"}
          </Button>
        </form>

        {/* ── AI Voice Form Agent ── */}
        <VoiceFormAgent
          fields={customerVoiceFields}
          onFieldFill={handleVoiceFieldFill}
          formType="customer"
        />

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
