import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../store/slices/authSlice";
import userService from "../services/userService";
import api from "../services/api";

export default function AddressModal({ isOpen, onClose, currentUser }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [saving, setSaving] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setForm({
        address: currentUser.address || "",
        city: currentUser.city || "",
        state: currentUser.state || "",
        pincode: currentUser.pincode || "",
      });
      setError("");
      setSuccess("");
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    setLocating(true);
    setError("");
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
          }
        } catch (err) {
          setError("Could not determine address automatically. Please type manually.");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        setError("Location permission denied. Please enter address manually.");
      },
      { timeout: 10000 }
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.address.trim()) {
      setError("Address is required");
      return;
    }
    if (!form.city.trim()) {
      setError("City is required");
      return;
    }
    if (!/^\d{6}$/.test(form.pincode.trim())) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const res = await userService.updateProfile({
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
      });
      const updated = res.data?.user || res.data;
      dispatch(updateCurrentUser(updated));
      setSuccess("Address updated successfully!");
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update address. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-[22px]">location_on</span>
            <h3 className="font-bold text-lg">Your Service Location</h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="flex items-center justify-between bg-indigo-50/70 border border-indigo-100 rounded-xl p-3">
            <div className="text-xs text-indigo-900">
              <p className="font-semibold">Auto-detect GPS location</p>
              <p className="text-indigo-700">Fetch current location and fill address fields</p>
            </div>
            <button
              type="button"
              onClick={handleAutoDetect}
              disabled={locating}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50 shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">
                {locating ? "sync" : "my_location"}
              </span>
              <span>{locating ? "Detecting…" : "Use GPS"}</span>
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-medium flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              {success}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                House / Flat / Street / Area *
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="e.g. Flat 302, Royal Palms, Link Road"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="e.g. Pune"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  placeholder="e.g. Maharashtra"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pincode *</label>
              <input
                type="text"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                placeholder="e.g. 411014"
                maxLength={6}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md hover:shadow-indigo-500/20 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Location"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
