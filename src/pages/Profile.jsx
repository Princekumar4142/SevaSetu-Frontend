import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../store/slices/authSlice";
import userService from "../services/userService";
import Badge from "../components/Badge";
import Input from "../components/Input";
import Button from "../components/Button";
import ProfilePhotoUploader from "../components/ProfilePhotoUploader";
import { ErrorBanner } from "../components/Feedback";

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    email: currentUser?.email || "",
    language: currentUser?.language || "HI",
    address: currentUser?.address || "",
    city: currentUser?.city || "",
    state: currentUser?.state || "",
    pincode: currentUser?.pincode || "",
  });

  const [profilePhoto, setProfilePhoto] = useState(currentUser?.profilePhoto || "");
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [savingDetails, setSavingDetails] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!currentUser) return null;

  const handleFieldChange = (key) => (e) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSavePhoto = async (newPhoto) => {
    setProfilePhoto(newPhoto);
    setSavingPhoto(true);
    setMessage("");
    setError("");
    try {
      const res = await userService.updateProfile({ profilePhoto: newPhoto });
      dispatch(updateCurrentUser(res.data.user));
      setMessage("Profile photo updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile photo");
    } finally {
      setSavingPhoto(false);
    }
  };

  const handleSaveDetails = async (e) => {
    if (e) e.preventDefault();
    setSavingDetails(true);
    setMessage("");
    setError("");

    // Validate phone number format (10 digits)
    const cleanPhone = formData.phone.trim().replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit Indian phone number.");
      setSavingDetails(false);
      return;
    }

    try {
      const res = await userService.updateProfile({
        name: formData.name.trim(),
        phone: cleanPhone,
        email: formData.email.trim(),
        language: formData.language,
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
      });

      dispatch(updateCurrentUser(res.data.user));
      setMessage("Your profile details have been successfully updated!");
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile details");
    } finally {
      setSavingDetails(false);
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      if (currentUser.role === "WORKER") navigate("/worker");
      else if (currentUser.role === "PLATFORM_ADMIN") navigate("/admin");
      else if (currentUser.role === "COOPERATIVE_ADMIN") navigate("/cooperative");
      else navigate("/customer");
    }
  };

  return (
    <div className="bg-white border border-outline-variant/80 rounded-3xl p-6 sm:p-8 shadow-sm max-w-2xl mx-auto my-6 sm:my-8 space-y-6">
      {/* ── Top Header with Back Navigation ── */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 flex items-center justify-center text-slate-800 transition-colors shrink-0"
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Your Account Profile</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your personal information, contact numbers, and delivery address
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentUser.role === "WORKER" && (
            <Badge
              tone={currentUser.isVerified ? "verified" : "pending"}
              icon={currentUser.isVerified ? "verified" : "hourglass_empty"}
            >
              {currentUser.isVerified ? "Verified Worker" : "Verification Pending"}
            </Badge>
          )}
          {currentUser.role === "PLATFORM_ADMIN" && (
            <Badge tone="verified" icon="shield_person">Platform Admin</Badge>
          )}
          {currentUser.role === "COOPERATIVE_ADMIN" && (
            <Badge tone="info" icon="storefront">Cooperative Admin</Badge>
          )}
        </div>
      </div>

      {error && <ErrorBanner message={error} />}
      {message && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-emerald-600 fill">check_circle</span>
          {message}
        </div>
      )}

      {/* ── Profile Photo Section ── */}
      <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <ProfilePhotoUploader
          value={profilePhoto}
          onChange={handleSavePhoto}
          name={currentUser.name}
        />
        <div className="text-center sm:text-right">
          <p className="text-xs font-bold text-slate-700">Account Type</p>
          <p className="text-sm font-black text-brand-purple capitalize">
            {currentUser.role?.replace(/_/g, " ").toLowerCase()}
          </p>
          {savingPhoto && <p className="text-[11px] text-brand-purple animate-pulse mt-1">Uploading new photo...</p>}
        </div>
      </div>

      {/* ── Worker Professional Profile Callout (if Worker) ── */}
      {currentUser.role === "WORKER" && (
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-amber-50 border border-indigo-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">handyman</span>
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-950">Worker Trade &amp; Skills Profile</p>
              <p className="text-[11px] text-slate-600">
                Update your trade categories, skills, experience, and hourly rates
              </p>
            </div>
          </div>
          <Link
            to="/worker/profile"
            className="inline-flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shrink-0"
          >
            <span>Edit Skills &amp; Trade</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      )}

      {/* ── Details Edit or View Section ── */}
      {isEditing ? (
        <form onSubmit={handleSaveDetails} className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
              Edit Account Information
            </h2>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: currentUser.name || "",
                  phone: currentUser.phone || "",
                  email: currentUser.email || "",
                  language: currentUser.language || "HI",
                  address: currentUser.address || "",
                  city: currentUser.city || "",
                  state: currentUser.state || "",
                  pincode: currentUser.pincode || "",
                });
                setIsEditing(false);
                setError("");
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name *"
              value={formData.name}
              onChange={handleFieldChange("name")}
              placeholder="Your full name"
              required
            />
            <Input
              label="Phone Number (10 digits) *"
              value={formData.phone}
              onChange={handleFieldChange("phone")}
              placeholder="e.g. 9876543210"
              maxLength={10}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleFieldChange("email")}
              placeholder="name@example.com"
            />
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Preferred Language</label>
              <select
                value={formData.language}
                onChange={handleFieldChange("language")}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="HI">Hindi (हिंदी)</option>
                <option value="EN">English</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs font-bold text-slate-700 mb-2">Service / Delivery Address</p>
            <Input
              label="Street Address / House No."
              value={formData.address}
              onChange={handleFieldChange("address")}
              placeholder="Flat 402, Sunshine Heights, MG Road"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="City"
              value={formData.city}
              onChange={handleFieldChange("city")}
              placeholder="Bettiah / Pune"
            />
            <Input
              label="State"
              value={formData.state}
              onChange={handleFieldChange("state")}
              placeholder="Bihar / Maharashtra"
            />
            <Input
              label="Pincode"
              value={formData.pincode}
              onChange={handleFieldChange("pincode")}
              placeholder="845438"
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <Button
              type="submit"
              variant="purple"
              disabled={savingDetails}
              className="flex-1 py-2.5 font-bold text-sm shadow-md"
            >
              {savingDetails ? "Saving Profile..." : "Save Profile Details"}
            </Button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Profile Details
            </h2>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-purple hover:text-brand-purple-dark hover:underline cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">edit</span>
              Edit Details
            </button>
          </div>

          <dl className="flex flex-col gap-1 divide-y divide-slate-100">
            <Row label="Full Name" value={currentUser.name} />
            <Row label="Phone Number" value={currentUser.phone} />
            <Row label="Email Address" value={currentUser.email || "—"} />
            <Row label="Account Role" value={currentUser.role?.replace(/_/g, " ")} />
            <Row label="Preferred Language" value={currentUser.language === "HI" ? "Hindi (हिंदी)" : "English"} />

            <div className="py-3">
              <div className="flex items-center justify-between mb-1">
                <dt className="text-xs font-semibold text-slate-500">Delivery / Service Address</dt>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-bold text-brand-purple hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">edit</span>
                  Edit
                </button>
              </div>
              <dd className="text-xs font-bold text-slate-800">
                {currentUser.address ? (
                  <span>
                    {currentUser.address}
                    {currentUser.city ? `, ${currentUser.city}` : ""}
                    {currentUser.state ? `, ${currentUser.state}` : ""}
                    {currentUser.pincode ? ` - ${currentUser.pincode}` : ""}
                  </span>
                ) : (
                  <span className="text-slate-400 font-normal italic">No address provided yet</span>
                )}
              </dd>
            </div>
          </dl>

          <div className="pt-2">
            <Button
              variant="purple"
              onClick={() => setIsEditing(true)}
              className="w-full py-2.5 font-bold text-xs"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Edit Profile Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-3">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className="text-xs font-bold text-slate-800 capitalize">{value}</dd>
    </div>
  );
}
