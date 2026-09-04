import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import workerService from "../services/workerService";
import userService from "../services/userService";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../store/slices/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import ProfilePhotoUploader from "../components/ProfilePhotoUploader";
import { LoadingState, ErrorBanner } from "../components/Feedback";

const CATEGORIES = [
  { id: "electrician-plumber", label: "⚡ Electrician & Plumbing" },
  { id: "ac-appliance", label: "❄️ AC & Appliance Repair" },
  { id: "cleaning-pest", label: "🧹 Cleaning & Pest Control" },
  { id: "salon-women", label: "💄 Women's Salon & Spa" },
  { id: "spa-women", label: "💆 Spa for Women" },
  { id: "home-painting", label: "🎨 Painting & Waterproofing" },
  { id: "custom-services", label: "🛠️ General Local Services" },
];

const SKILLS = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "Mason",
  "Cleaner",
  "Gardener",
  "AC Technician",
  "Appliance Repair",
  "Bazaar Assistant",
  "Driver",
  "Caregiver",
  "Technician",
];

export default function WorkerProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [worker, setWorker] = useState(null);
  const [form, setForm] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const r = await workerService.getProfile();
      const w = r.data.worker;
      setWorker(w);
      setProfilePhoto(w.user?.profilePhoto || "");
      setForm({
        name: w.user?.name || "",
        phone: w.user?.phone || "",
        email: w.user?.email || "",
        serviceCategory: w.serviceCategory || "electrician-plumber",
        hourlyRate: w.hourlyRate || 299,
        experienceYears: w.experienceYears || 0,
        bio: w.bio || "",
        skills: w.skills || [],
        status: w.status || "AVAILABLE",
        address: w.address || "",
        city: w.city || "",
        state: w.state || "",
        pincode: w.pincode || "",
        hasShop: Boolean(w.hasShop),
        shopName: w.shopName || "",
        shopAddress: w.shopAddress || "",
      });
    } catch (e) {
      setError(e.response?.data?.message || "Could not load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const set = (k) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [k]: val }));
  };

  const toggle = (skill) => {
    const normalizedSkill = skill.toLowerCase();
    setForm((prev) => {
      const exists = prev.skills.some((s) => s.toLowerCase() === normalizedSkill);
      return {
        ...prev,
        skills: exists
          ? prev.skills.filter((s) => s.toLowerCase() !== normalizedSkill)
          : [...prev.skills, skill],
      };
    });
  };

  const handleSavePhoto = async (newPhoto) => {
    setProfilePhoto(newPhoto);
    try {
      const userRes = await userService.updateProfile({ profilePhoto: newPhoto });
      dispatch(updateCurrentUser(userRes.data.user));
    } catch (e) {
      setError("Failed to save profile photo");
    }
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    // Validate phone number
    const cleanPhone = (form.phone || "").trim().replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit Indian phone number.");
      setSaving(false);
      return;
    }

    try {
      // 1. Update basic user details (Name, Phone, Email, Photo)
      const userRes = await userService.updateProfile({
        name: form.name.trim(),
        phone: cleanPhone,
        email: (form.email || "").trim(),
        profilePhoto,
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
      });
      dispatch(updateCurrentUser(userRes.data.user));

      // 2. Update worker-specific details (Category, Rate, Skills, Shop, Experience, Status)
      const r = await workerService.updateProfile({
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
        serviceCategory: form.serviceCategory,
        hourlyRate: Number(form.hourlyRate) || 299,
        experienceYears: Number(form.experienceYears) || 0,
        bio: (form.bio || "").trim(),
        skills: form.skills,
        status: form.status,
        hasShop: Boolean(form.hasShop),
        shopName: form.hasShop ? (form.shopName || "").trim() : "",
        shopAddress: form.hasShop ? (form.shopAddress || "").trim() : "",
      });

      setWorker(r.data.worker);
      setMessage("Your worker profile and contact details have been updated successfully!");
    } catch (e) {
      setError(e.response?.data?.message || "Could not update worker profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState label="Loading your profile…" />;
  if (!form) return <ErrorBanner message={error} />;

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      {/* ── Top Header with Back Button ── */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) navigate(-1);
            else navigate("/worker");
          }}
          className="w-9 h-9 rounded-xl bg-surface-container-low hover:bg-surface-container-high active:bg-surface-variant flex items-center justify-center text-primary transition-colors shrink-0"
          aria-label="Back"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <div>
          <p className="text-xs font-bold text-brand-purple uppercase tracking-wider">WORKER PROFILE</p>
          <h1 className="text-2xl font-black text-slate-900">Professional &amp; Account Details</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Update your contact info, trade categories, pricing, and service address
          </p>
        </div>
      </div>

      <ErrorBanner message={error} />
      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-emerald-600 fill">check_circle</span>
          {message}
        </div>
      )}

      {/* ── Header Summary Card ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm">
        <Avatar src={profilePhoto} name={form.name || worker.user?.name} size="2xl" className="shadow-md" />
        <div className="flex-1">
          <h2 className="text-xl font-extrabold text-slate-900">{form.name || worker.user?.name}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {form.phone || worker.user?.phone} · {form.email || worker.user?.email || "No email"}
          </p>
          <p className="text-xs font-bold text-brand-purple mt-1 uppercase">
            {form.serviceCategory?.replace(/-/g, " ")} · ₹{form.hourlyRate}/visit
          </p>
        </div>
        <Badge
          tone={
            worker.verificationStatus === "VERIFIED"
              ? "verified"
              : worker.verificationStatus === "REJECTED"
              ? "rejected"
              : "pending"
          }
        >
          {worker.verificationStatus}
        </Badge>
      </div>

      {/* ── Photo Uploader Card ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Profile Photo</h3>
        <ProfilePhotoUploader
          value={profilePhoto}
          onChange={handleSavePhoto}
          name={form.name || worker.user?.name}
        />
      </div>

      {/* ── Main Edit Form ── */}
      <form onSubmit={save} className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
        {/* Section 1: Personal & Contact Information */}
        <div>
          <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-2 mb-4">
            1. Personal &amp; Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Full Name *"
              value={form.name}
              onChange={set("name")}
              placeholder="Your full name"
              required
            />
            <Input
              label="Phone Number (10 digits) *"
              value={form.phone}
              onChange={set("phone")}
              placeholder="10-digit number"
              maxLength={10}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="worker@example.com"
            />
          </div>
        </div>

        {/* Section 2: Trade & Pricing */}
        <div>
          <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-2 mb-4">
            2. Service Category &amp; Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary Trade Category *</label>
              <select
                value={form.serviceCategory}
                onChange={set("serviceCategory")}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-purple"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Starting / Visiting Charge (₹)"
              type="number"
              min="49"
              value={form.hourlyRate}
              onChange={set("hourlyRate")}
              placeholder="299"
            />

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Availability Status</label>
              <select
                value={form.status}
                onChange={set("status")}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-purple"
              >
                <option value="AVAILABLE">AVAILABLE (Accepting job orders)</option>
                <option value="BUSY">BUSY (Currently on a job)</option>
                <option value="OFFLINE">OFFLINE (Not accepting bookings)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              label="Work Experience (in years)"
              type="number"
              min="0"
              value={form.experienceYears}
              onChange={set("experienceYears")}
            />
            <Input
              label="Brief Bio / Intro"
              value={form.bio}
              onChange={set("bio")}
              placeholder="e.g. 5+ years experienced electrician in domestic & commercial wiring"
            />
          </div>
        </div>

        {/* Section 3: Skills selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">Trade Skills Tags (Select all that apply)</label>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => {
              const active = form.skills.some((x) => x.toLowerCase() === s.toLowerCase());
              return (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggle(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-brand-purple text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {active ? `✓ ${s}` : `+ ${s}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Physical Shop / Workshop (Optional) */}
        <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80">
          <label className="flex items-center gap-2 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={form.hasShop}
              onChange={set("hasShop")}
              className="w-4 h-4 rounded text-brand-purple accent-brand-purple"
            />
            <span className="text-xs font-bold text-slate-800">
              I also own a physical shop / hardware workshop
            </span>
          </label>
          {form.hasShop && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Input
                label="Shop / Workshop Name"
                value={form.shopName}
                onChange={set("shopName")}
                placeholder="e.g. Verma Electricals & Hardware"
              />
              <Input
                label="Shop Address"
                value={form.shopAddress}
                onChange={set("shopAddress")}
                placeholder="Shop No. 4, Main Bazaar"
              />
            </div>
          )}
        </div>

        {/* Section 5: Service Location & Address */}
        <div>
          <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-2 mb-4">
            3. Operational Location &amp; Address
          </h2>
          <Input label="Street Address" value={form.address} onChange={set("address")} placeholder="Local area or street" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input label="City" value={form.city} onChange={set("city")} placeholder="Bettiah / Pune" />
            <Input label="State" value={form.state} onChange={set("state")} placeholder="Bihar" />
            <Input label="Pincode" value={form.pincode} onChange={set("pincode")} placeholder="845438" />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
          <Button
            type="submit"
            variant="purple"
            disabled={saving}
            className="flex-1 py-3 font-bold text-sm shadow-md"
          >
            {saving ? "Saving Changes..." : "Save Worker Profile Details"}
          </Button>
          <button
            type="button"
            onClick={() => navigate("/worker")}
            className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
