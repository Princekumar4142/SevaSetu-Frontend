import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { registerWorker, clearAuthError } from "../store/slices/authSlice";
import { ROLE_HOME } from "../constants/roles";
import { validateWorkerForm } from "../utils/validators";
import Input from "../components/Input";
import Button from "../components/Button";
import EmailOtpVerifier from "../components/EmailOtpVerifier";
import MapLocationPicker from "../components/MapLocationPicker";
import ProfilePhotoUploader from "../components/ProfilePhotoUploader";
import { fileToBase64 } from "../utils/imageUtils";
import { ErrorBanner } from "../components/Feedback";

const TRADE_CATEGORIES = [
  { id: "electrician-plumber", name: "Electrician, Plumber & Appliances", icon: "bolt", defaultSkills: ["Electrician", "Plumber", "Switchboard Wiring", "Pipe Leakage Repair"] },
  { id: "ac-appliance", name: "AC & Large Appliance Repair", icon: "ac_unit", defaultSkills: ["AC Servicing", "AC Gas Refill", "Washing Machine Repair", "Refrigerator Repair"] },
  { id: "cleaning-pest", name: "Cleaning & Pest Control", icon: "cleaning_services", defaultSkills: ["Deep Home Cleaning", "Bathroom Cleaning", "Sofa Cleaning", "Pest Control"] },
  { id: "home-painting", name: "Home Painting & Waterproofing", icon: "format_paint", defaultSkills: ["Wall Painting", "Waterproofing", "Texture Painting", "Wood Polishing"] },
  { id: "women-salon", name: "Salon & Spa for Women", icon: "spa", defaultSkills: ["Facial & Cleanup", "Waxing", "Hair Styling", "Pedicure / Manicure"] },
  { id: "men-salon", name: "Men's Grooming & Salon", icon: "content_cut", defaultSkills: ["Haircut & Styling", "Beard Grooming", "Head Massage", "De-tan Pack"] },
  { id: "carpenter-mason", name: "Carpentry & Masonry", icon: "carpenter", defaultSkills: ["Furniture Repair", "Lock Repair", "Tile & Masonry Work", "Drill & Hang"] },
  { id: "custom-services", name: "Custom Trade & Services", icon: "handyman", defaultSkills: ["General Handyman", "Bazaar Assistant", "Appliance Setup"] },
];

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  profilePhoto: "",
  address: "Kesnand Rd, Wagholi, Pune",
  city: "Pune",
  state: "Maharashtra",
  pincode: "411014",
  serviceCategory: "electrician-plumber",
  skills: ["Electrician", "Switchboard Wiring"],
  experienceYears: "3",
  hourlyRate: "299",
  aadharNumber: "",
  aadharImage: "",
  hasShop: false,
  shopName: "",
  shopImage: "",
  shopAddress: "",
  location: { lat: 18.5793, lng: 73.9787, address: "Kesnand Rd, Wagholi, Pune" },
};

export default function RegisterWorker() {
  const { dispatch, loading, error, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [emailVerified, setEmailVerified] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Image Previews
  const [aadharPreview, setAadharPreview] = useState(null);
  const [shopImagePreview, setShopImagePreview] = useState(null);

  const [customSkillInput, setCustomSkillInput] = useState("");

  useEffect(() => {
    if (isAuthenticated && role) navigate(ROLE_HOME[role] || "/", { replace: true });
  }, [isAuthenticated, role, navigate]);

  useEffect(() => () => dispatch(clearAuthError()), [dispatch]);

  const set = (field) => (e) => {
    let val = e.target.value;
    if (field === "aadharNumber") {
      const digits = val.replace(/\D/g, "").slice(0, 12);
      val = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    }
    setForm((prev) => ({ ...prev, [field]: val }));
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleCategoryChange = (catId) => {
    const matched = TRADE_CATEGORIES.find((c) => c.id === catId);
    const allDefaultSkills = TRADE_CATEGORIES.flatMap((c) => c.defaultSkills);
    const userCustomSkills = form.skills.filter((s) => !allDefaultSkills.includes(s));

    setForm((prev) => ({
      ...prev,
      serviceCategory: catId,
      skills: [...(matched ? matched.defaultSkills : []), ...userCustomSkills],
    }));
  };

  const toggleSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleAddCustomSkill = () => {
    const trimmed = customSkillInput.trim();
    if (!trimmed) return;
    if (!form.skills.includes(trimmed)) {
      setForm((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }));
    }
    setCustomSkillInput("");
  };

  const handleCustomSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleAddCustomSkill();
    }
  };

  const handleRemoveCustomSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleAadharUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file, 600, 0.85);
      setAadharPreview(base64);
      setForm((prev) => ({ ...prev, aadharImage: base64 }));
      if (fieldErrors.aadharImage) setFieldErrors((prev) => ({ ...prev, aadharImage: null }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleShopImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file, 600, 0.85);
      setShopImagePreview(base64);
      setForm((prev) => ({ ...prev, shopImage: base64 }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailVerified) return;

    const errors = validateWorkerForm(form);
    if (!form.aadharNumber || form.aadharNumber.replace(/\s+/g, "").length !== 12) {
      errors.aadharNumber = "Valid 12-digit Aadhaar number is mandatory";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setFieldErrors({});

    try {
      await dispatch(
        registerWorker({
          ...form,
          aadharNumber: form.aadharNumber.replace(/\s+/g, ""),
          experienceYears: Number(form.experienceYears) || 0,
          hourlyRate: Number(form.hourlyRate) || 299,
        })
      ).unwrap();
    } catch (message) {
      if (typeof message === "string" && /verify your email/i.test(message)) {
        setEmailVerified(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest md:bg-surface py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-slate-900 via-brand-purple to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[11px] font-black uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[15px] fill">verified</span>
              Direct Co-op Workforce Registration
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Join as a Certified Worker Partner</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Create your worker profile, register your trade or local shop, get verified with Aadhaar, and start receiving direct customer leads with <strong>0% commission</strong>!
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <ErrorBanner message={error} />

          {/* Section 1: Personal & Login Details */}
          <div className="bg-white border border-outline-variant/80 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
            <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="material-symbols-outlined text-brand-purple text-[20px]">person</span>
              1. Personal &amp; Account Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name (as per Aadhaar)"
                placeholder="e.g. Ramesh Shankar Pawar"
                value={form.name}
                onChange={set("name")}
                error={fieldErrors.name}
                required
              />
              <Input
                label="Mobile Phone Number"
                placeholder="e.g. 9820144321"
                value={form.phone}
                onChange={set("phone")}
                error={fieldErrors.phone}
                inputMode="numeric"
                maxLength={10}
                required
              />
            </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={set("password")}
                error={fieldErrors.password}
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={set("confirmPassword")}
                error={fieldErrors.confirmPassword}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input label="City" value={form.city} onChange={set("city")} error={fieldErrors.city} required />
              <Input label="State" value={form.state} onChange={set("state")} error={fieldErrors.state} required />
              <Input
                label="Pincode"
                value={form.pincode}
                onChange={set("pincode")}
                error={fieldErrors.pincode}
                inputMode="numeric"
                maxLength={6}
                required
              />
            </div>
            <Input
              label="Full Residential / Service Area Address"
              placeholder="e.g. Kesnand Rd, opp. Ayurvedic college, Wagholi, Pune"
              value={form.address}
              onChange={set("address")}
              error={fieldErrors.address}
              required
            />
          </div>

          {/* Section 2: Trade & Skills Selection */}
          <div className="bg-white border border-outline-variant/80 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
            <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="material-symbols-outlined text-brand-purple text-[20px]">construction</span>
              2. Trade, Category &amp; Pricing
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Select Your Primary Trade Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRADE_CATEGORIES.map((cat) => {
                  const selected = form.serviceCategory === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        selected
                          ? "border-brand-purple bg-purple-50/70 text-brand-purple shadow-md shadow-brand-purple/10 ring-2 ring-brand-purple/30"
                          : "border-slate-200 bg-white text-slate-700 hover:border-brand-purple/40"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${selected ? "bg-brand-purple text-white" : "bg-slate-100 text-slate-600"}`}>
                        <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-snug">{cat.name}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{cat.defaultSkills.slice(0, 2).join(", ")}...</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills Pills & Custom Services */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Specific Services You Offer (Click to select/unselect)
                </label>
                <div className="flex flex-wrap gap-2">
                  {TRADE_CATEGORIES.find((c) => c.id === form.serviceCategory)?.defaultSkills.map((skill) => (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        form.skills.includes(skill)
                          ? "bg-brand-purple text-white border-brand-purple shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-brand-purple/40"
                      }`}
                    >
                      {form.skills.includes(skill) ? "✓ " : "+ "}
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Added Custom Services Badges */}
              {(() => {
                const allDefaultSkills = TRADE_CATEGORIES.flatMap((c) => c.defaultSkills);
                const customSkills = form.skills.filter((s) => !allDefaultSkills.includes(s));
                if (customSkills.length === 0) return null;

                return (
                  <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-brand-purple uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">stars</span>
                        Your Custom Added Services ({customSkills.length})
                      </span>
                      <span className="text-[10px] text-slate-400">Click ✕ to remove</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {customSkills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-white text-brand-purple border border-purple-300 shadow-sm animate-fade-in"
                        >
                          <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomSkill(skill)}
                            className="w-4 h-4 rounded-full bg-purple-100 hover:bg-red-100 hover:text-red-600 text-purple-700 flex items-center justify-center transition-colors ml-0.5 cursor-pointer"
                            title="Remove service"
                          >
                            <span className="material-symbols-outlined text-[12px]">close</span>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Add Custom / Unlisted Service Input Box (Optional) */}
              <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-brand-purple">add_circle</span>
                    Add Custom / Other Service (Not listed above)
                  </label>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider bg-slate-200/70 px-2 py-0.5 rounded-md">
                    Optional
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Offer a specialized skill or service not in the list above? Type it below and click <strong>Add Service</strong>.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                      handyman
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. RO Filter Repair, Submersible Wiring..."
                      value={customSkillInput}
                      onChange={(e) => setCustomSkillInput(e.target.value)}
                      onKeyDown={handleCustomSkillKeyDown}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple/40 shadow-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCustomSkill}
                    disabled={!customSkillInput.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-brand-purple hover:opacity-95 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1 shrink-0 active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    Add Service
                  </button>
                </div>
              </div>

              {fieldErrors.skills && <p className="text-xs text-red-500 mt-1">{fieldErrors.skills}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Experience in Trade (Years)"
                type="number"
                min="0"
                placeholder="e.g. 5"
                value={form.experienceYears}
                onChange={set("experienceYears")}
              />
              <Input
                label="Standard Starting / Hourly Rate (₹)"
                type="number"
                min="99"
                placeholder="e.g. 299"
                value={form.hourlyRate}
                onChange={set("hourlyRate")}
              />
            </div>
          </div>

          {/* Section 3: Mandatory Aadhaar Verification */}
          <div className="bg-white border-2 border-brand-purple/40 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-[22px] fill">shield</span>
                3. Aadhaar Verification <span className="text-red-500 text-xs">(MANDATORY)</span>
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                100% Encrypted &amp; Secure
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Govt. regulations and cooperative safety standards require Aadhaar verification for all skilled partners before connecting with customer homes.
            </p>

            <Input
              label="12-Digit Aadhaar Card Number"
              placeholder="e.g. 5421 8902 4431"
              value={form.aadharNumber}
              onChange={set("aadharNumber")}
              error={fieldErrors.aadharNumber}
              maxLength={14}
              required
            />

            {/* Aadhaar Photo Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Upload Aadhaar Card Photo (Front or Back) <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-slate-300 hover:border-brand-purple rounded-2xl p-4 text-center transition-colors bg-slate-50/50">
                {aadharPreview ? (
                  <div className="relative inline-block">
                    <img
                      src={aadharPreview}
                      alt="Aadhaar Card Preview"
                      className="max-h-44 rounded-xl border border-slate-200 shadow-md object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setAadharPreview(null);
                        setForm((prev) => ({ ...prev, aadharImage: "" }));
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow-md cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <span className="material-symbols-outlined text-[36px] text-brand-purple mb-1">
                      cloud_upload
                    </span>
                    <p className="text-xs font-bold text-slate-800">Click to upload Aadhaar Photo / Document</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Supports PNG, JPG, JPEG (Max 5MB)</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAadharUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Optional Shop / Establishment Details */}
          <div className="bg-white border border-outline-variant/80 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500 text-[22px]">storefront</span>
                4. Shop / Establishment Details <span className="text-slate-400 text-xs font-normal">(OPTIONAL)</span>
              </h2>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-xs font-bold text-slate-700">I have a shop</span>
                <input
                  type="checkbox"
                  checked={form.hasShop}
                  onChange={(e) => setForm((prev) => ({ ...prev, hasShop: e.target.checked }))}
                  className="w-4 h-4 text-brand-purple rounded focus:ring-brand-purple"
                />
              </label>
            </div>

            {form.hasShop && (
              <div className="space-y-4 animate-fade-in">
                <Input
                  label="Shop / Workshop / Studio Name"
                  placeholder="e.g. Pawar Electricals &amp; AC Service Centre"
                  value={form.shopName}
                  onChange={set("shopName")}
                />

                <Input
                  label="Shop Complete Address / Landmark"
                  placeholder="e.g. Shop 4, Ground Floor, Sai Plaza, Wagholi"
                  value={form.shopAddress}
                  onChange={set("shopAddress")}
                />

                {/* Shop Photo Upload */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Shop / Workshop Front Photo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-2xl p-4 text-center transition-colors bg-amber-50/20">
                    {shopImagePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={shopImagePreview}
                          alt="Shop Preview"
                          className="max-h-44 rounded-xl border border-slate-200 shadow-md object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setShopImagePreview(null);
                            setForm((prev) => ({ ...prev, shopImage: "" }));
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow-md cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <span className="material-symbols-outlined text-[36px] text-amber-500 mb-1">
                          add_photo_alternate
                        </span>
                        <p className="text-xs font-bold text-slate-800">Upload Shop Board / Front Photo</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Customers can see your shop photo on search</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleShopImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Optional Shop / Working GPS Location */}
          <div className="bg-white border border-outline-variant/80 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
            <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="material-symbols-outlined text-brand-purple text-[22px]">near_me</span>
              5. Pinpoint Shop / Base Service Location <span className="text-slate-400 text-xs font-normal">(OPTIONAL)</span>
            </h2>

            <p className="text-xs text-slate-500">
              Pin your shop or working hub location on the map. Nearby customers booking services in this category will see your profile and distance!
            </p>

            <MapLocationPicker
              initialAddress={form.address}
              initialCoords={form.location}
              height="260px"
              onLocationSelect={(loc) => {
                setForm((prev) => ({
                  ...prev,
                  address: loc.address || prev.address,
                  city: loc.city || prev.city,
                  state: loc.state || prev.state,
                  pincode: loc.pincode || prev.pincode,
                  location: {
                    lat: loc.lat,
                    lng: loc.lng,
                    address: loc.address || prev.address,
                  },
                }));
              }}
            />
          </div>

          {/* Action Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              loading={loading}
              disabled={!emailVerified}
              variant="purple"
              className="w-full py-4 text-base font-black shadow-xl shadow-brand-purple/25 rounded-2xl cursor-pointer"
            >
              {emailVerified ? (
                <>
                  <span>Complete Worker &amp; Shop Registration</span>
                  <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                </>
              ) : (
                "Verify your email above to complete registration"
              )}
            </Button>
          </div>
        </form>

        <p className="text-xs text-slate-500 text-center pb-8">
          Already registered as a partner?{" "}
          <Link to="/login" className="text-brand-purple font-bold hover:underline">
            Log in to Worker Portal
          </Link>
        </p>
      </div>
    </div>
  );
}
