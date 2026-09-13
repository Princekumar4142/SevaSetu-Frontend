import { useState, useRef, useEffect } from "react";
import { useTheme, THEME_MODES } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

/**
 * ThemeSelector Component
 * Supports two variants:
 * 1. "compact" (default): Dropdown popover button suitable for headers, navbars & sidebar.
 * 2. "cards": Visual segmented cards suitable for settings and Profile page.
 */
export default function ThemeSelector({ variant = "compact", className = "" }) {
  const { themeMode, resolvedTheme, setThemeMode } = useTheme();
  const { tr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Options configuration
  const themeOptions = [
    {
      id: THEME_MODES.LIGHT,
      label: tr("theme_light") || "Light",
      desc: tr("theme_light_desc") || "Clean and bright interface",
      icon: "light_mode",
      iconColor: "text-amber-500",
      bgPreview: "bg-white border-slate-200 text-slate-900",
    },
    {
      id: THEME_MODES.DARK,
      label: tr("theme_dark") || "Dark",
      desc: tr("theme_dark_desc") || "Easy on the eyes in low light",
      icon: "dark_mode",
      iconColor: "text-indigo-400",
      bgPreview: "bg-slate-900 border-slate-700 text-white",
    },
    {
      id: THEME_MODES.SYSTEM,
      label: tr("theme_system") || "System",
      desc: tr("theme_system_desc") || "Follows your device settings",
      icon: "brightness_auto",
      iconColor: "text-emerald-500",
      bgPreview: "bg-gradient-to-r from-white to-slate-900 border-slate-400 text-slate-800",
    },
  ];

  // Helper for current mode icon
  const getCurrentIcon = () => {
    if (themeMode === THEME_MODES.LIGHT) return { icon: "light_mode", color: "text-amber-500" };
    if (themeMode === THEME_MODES.DARK) return { icon: "dark_mode", color: "text-indigo-400" };
    return { icon: "brightness_auto", color: "text-emerald-500" };
  };

  const current = getCurrentIcon();

  // ── Variant: Cards (used in Profile pages) ──────────────────────────
  if (variant === "cards") {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className={`material-symbols-outlined text-[20px] ${current.color}`}>
                {current.icon}
              </span>
              {tr("theme_appearance") || "Appearance & Theme"}
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {tr("theme_label") || "Theme"}:{" "}
              <span className="font-semibold capitalize text-slate-700 dark:text-slate-300">
                {themeMode}
              </span>{" "}
              {themeMode === THEME_MODES.SYSTEM && `(${resolvedTheme})`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {themeOptions.map((opt) => {
            const isSelected = themeMode === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setThemeMode(opt.id)}
                className={`relative p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-brand-purple bg-purple-50/50 dark:bg-purple-950/30 ring-2 ring-brand-purple/20 shadow-sm"
                    : "border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50/80 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700/70 flex items-center justify-center">
                    <span className={`material-symbols-outlined text-[19px] ${opt.iconColor}`}>
                      {opt.icon}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-brand-purple text-white flex items-center justify-center text-[12px]">
                      <span className="material-symbols-outlined text-[13px]">check</span>
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    {opt.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    {opt.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Variant: Compact Popover (used in Navbars, Headers, Sidebar) ──
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
        title={`Theme: ${themeMode} (${resolvedTheme})`}
        className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100/90 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-xs active:scale-95"
      >
        <span className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${isOpen ? "rotate-45" : ""} ${current.color}`}>
          {current.icon}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl py-1.5 z-50 animate-fade-in backdrop-blur-md">
          <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {tr("theme_label") || "Theme"}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 capitalize font-medium">
              {resolvedTheme}
            </span>
          </div>

          <div className="p-1 space-y-0.5">
            {themeOptions.map((opt) => {
              const isSelected = themeMode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setThemeMode(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-purple-50 dark:bg-purple-950/40 text-brand-purple dark:text-purple-300 font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[18px] ${opt.iconColor}`}>
                      {opt.icon}
                    </span>
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[16px] text-brand-purple dark:text-purple-400">
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
