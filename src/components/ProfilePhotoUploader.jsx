import { useState } from "react";
import Avatar from "./Avatar";
import { fileToBase64 } from "../utils/imageUtils";

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=250&q=80",
];

export default function ProfilePhotoUploader({ value, onChange, name = "" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const base64 = await fileToBase64(file);
      onChange(base64);
    } catch (err) {
      setError(err.message || "Failed to process photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
        Profile Picture / Photo <span className="text-slate-400 font-normal capitalize">(Optional)</span>
      </label>

      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
        <Avatar src={value} name={name} size="xl" className="shadow-md" />

        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-purple text-white text-xs font-bold shadow-sm hover:bg-brand-purple-dark transition-all active:scale-95">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              {loading ? "Processing..." : "Upload Photo"}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={loading}
              />
            </label>

            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="px-3 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-500">
            Upload your photo or choose a preset below. High quality photos build higher customer trust!
          </p>

          {/* Presets */}
          <div className="pt-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Or Pick a Preset:</span>
            <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
              {PRESET_AVATARS.map((url, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => onChange(url)}
                  className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-transform hover:scale-110 ${
                    value === url ? "border-brand-purple ring-2 ring-brand-purple/40" : "border-slate-300"
                  }`}
                >
                  <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
