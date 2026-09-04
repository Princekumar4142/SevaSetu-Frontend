import { useEffect, useState } from "react";
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

const SKILLS = [
  "electrician",
  "plumber",
  "carpenter",
  "painter",
  "mason",
  "labour",
  "cleaner",
  "gardener",
  "ac_technician",
  "bazaar_assistant",
  "shopping_companion",
  "driver",
  "caregiver",
  "technician",
];

export default function WorkerProfile() {
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
        address: w.address || "",
        city: w.city || "",
        state: w.state || "",
        pincode: w.pincode || "",
        experienceYears: w.experienceYears || 0,
        bio: w.bio || "",
        skills: w.skills || [],
        status: w.status || "OFFLINE",
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

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const toggle = (skill) =>
    setForm({
      ...form,
      skills: form.skills.includes(skill)
        ? form.skills.filter((x) => x !== skill)
        : [...form.skills, skill],
    });

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
    try {
      if (profilePhoto !== (worker?.user?.profilePhoto || "")) {
        const userRes = await userService.updateProfile({ profilePhoto });
        dispatch(updateCurrentUser(userRes.data.user));
      }
      const r = await workerService.updateProfile({
        ...form,
        experienceYears: Number(form.experienceYears) || 0,
      });
      setWorker(r.data.worker);
      setMessage("Worker profile details saved successfully.");
    } catch (e) {
      setError(e.response?.data?.message || "Could not update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState label="Loading your profile…" />;
  if (!form) return <ErrorBanner message={error} />;

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div>
        <p className="text-xs font-bold text-brand-purple uppercase tracking-wider">WORKER PROFILE</p>
        <h1 className="text-2xl font-black text-slate-900">Build your professional profile</h1>
        <p className="text-xs text-slate-500 mt-1">
          Keep your photo, skills, and experience up to date. Admin approval controls when customers can see you.
        </p>
      </div>

      <ErrorBanner message={error} />
      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          {message}
        </div>
      )}

      {/* Header Profile Summary */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm">
        <Avatar src={profilePhoto} name={worker.user?.name} size="2xl" className="shadow-md" />
        <div className="flex-1">
          <h2 className="text-xl font-extrabold text-slate-900">{worker.user?.name}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {worker.user?.email || "—"} · {worker.user?.phone}
          </p>
          <p className="text-xs font-bold text-brand-purple mt-1 uppercase">
            {worker.serviceCategory?.replace(/-/g, " ")}
          </p>
        </div>
        <Badge tone={worker.verificationStatus === "VERIFIED" ? "verified" : worker.verificationStatus === "REJECTED" ? "rejected" : "pending"}>
          {worker.verificationStatus}
        </Badge>
      </div>

      {/* Profile Photo Uploader */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
        <ProfilePhotoUploader
          value={profilePhoto}
          onChange={handleSavePhoto}
          name={worker.user?.name}
        />
      </div>

      <form onSubmit={save} className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
        <h2 className="text-lg font-black text-slate-900">Professional Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Experience (years)"
            type="number"
            min="0"
            value={form.experienceYears}
            onChange={set("experienceYears")}
          />
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Availability Status</label>
            <select
              value={form.status}
              onChange={set("status")}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800"
            >
              <option value="AVAILABLE">AVAILABLE (Online for bookings)</option>
              <option value="BUSY">BUSY (On a job)</option>
              <option value="OFFLINE">OFFLINE (Not accepting bookings)</option>
            </select>
          </div>
        </div>

        <Input label="Address" value={form.address} onChange={set("address")} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="City" value={form.city} onChange={set("city")} />
          <Input label="State" value={form.state} onChange={set("state")} />
          <Input label="Pincode" value={form.pincode} onChange={set("pincode")} />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">Trade Skills</label>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => toggle(s)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold capitalize transition-all ${
                  form.skills.includes(s)
                    ? "bg-brand-purple border-brand-purple text-white shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-brand-purple/40"
                }`}
              >
                {s.replaceAll("_", " ")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">About You (Bio)</label>
          <textarea
            rows="4"
            maxLength="500"
            value={form.bio}
            onChange={set("bio")}
            placeholder="Tell customers about your experience, shop, and quality of service…"
            className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-brand-purple/40"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" loading={saving} variant="purple">
            Save Profile Details
          </Button>
        </div>
      </form>
    </div>
  );
}
