/**
 * LanguageSelector — Compact globe button with language dropdown
 * Used in Navbar. Shows flag + current lang name + dropdown list.
 */
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSelector() {
  const { lang, setLanguage, LANGUAGES } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* ── Trigger Button ── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200
          bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold
          transition-all shadow-sm hover:shadow-md cursor-pointer select-none"
        aria-label="Select language"
      >
        <span className="text-base leading-none">{lang.flag}</span>
        <span className="hidden sm:inline">{lang.nativeName}</span>
        <span className="material-symbols-outlined text-[14px] text-slate-400 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          expand_more
        </span>
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div className="absolute right-0 top-full mt-2 z-[200]
          w-48 rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60
          overflow-hidden animate-[fadeIn_0.15s_ease-out]">

          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">language</span>
              Select Language
            </p>
          </div>

          <div className="py-1 max-h-72 overflow-y-auto">
            {LANGUAGES.map((l) => {
              const active = l.code === lang.code;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => { setLanguage(l.code); setOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs
                    transition-colors cursor-pointer ${
                    active
                      ? "bg-purple-50 text-purple-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base leading-none">{l.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold leading-none">{l.nativeName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{l.label}</p>
                  </div>
                  {active && (
                    <span className="material-symbols-outlined text-[16px] text-purple-600 shrink-0">
                      check
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
