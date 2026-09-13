import { useState, useRef, useEffect } from "react";
import { useTheme, THEME_MODES } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

/**
 * Enhanced ThemeSelector Component
 * Supports 3 variants:
 * 1. "segmented" (default for desktop nav): Direct 3-pill toggle [☀️ Light | 💻 Auto | 🌙 Dark] with 1-click switch.
 * 2. "compact" (for mobile bar & compact spaces): Sleek icon button with popover.
 * 3. "cards" (for Profile page): Luxury macOS/Linear-style UI preview cards.
 */
export default function ThemeSelector({ variant = "segmented", className = "" }) {
  const { themeMode, resolvedTheme, setThemeMode } = useTheme();
  const { tr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const themeOptions = [
    {
      id: THEME_MODES.LIGHT,
      label: tr("theme_light") || "Light",
      shortLabel: "Light",
      desc: tr("theme_light_desc") || "Clean and crisp daytime interface",
      icon: "light_mode",
      iconColor: "text-amber-500",
    },
    {
      id: THEME_MODES.SYSTEM,
      label: tr("theme_system") || "System",
      shortLabel: "Auto",
      desc: tr("theme_system_desc") || "Syncs automatically with your device theme",
      icon: "brightness_auto",
      iconColor: "text-indigo-400",
    },
    {
      id: THEME_MODES.DARK,
      label: tr("theme_dark") || "Dark",
      shortLabel: "Dark",
      desc: tr("theme_dark_desc") || "Deep midnight contrast, easy on the eyes",
      icon: "dark_mode",
      iconColor: "text-purple-400",
    },
  ];

  // ── VARIANT 1: Segmented Pill (Desktop Nav) ──────────────────────────
  if (variant === "segmented") {
    return (
      <div
        className={`inline-flex items-center bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-inner ${className}`}
        role="group"
        aria-label="Select color theme"
      >
        {themeOptions.map((opt) => {
          const isSelected = themeMode === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setThemeMode(opt.id)}
              title={`${opt.label} (${opt.desc})`}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? "bg-white dark:bg-slate-900 text-brand-purple dark:text-purple-300 shadow-sm border border-slate-200/60 dark:border-slate-700/60 scale-[1.02]"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/40 dark:hover:bg-slate-700/40"
              }`}
            >
              <span className={`material-symbols-outlined text-[16px] ${isSelected ? opt.iconColor : ""}`}>
                {opt.icon}
              </span>
              <span className="hidden lg:inline">{opt.shortLabel}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // ── VARIANT 2: Cards (Profile Page) ──────────────────────────────────
  if (variant === "cards") {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-purple text-[20px]">palette</span>
              {tr("theme_appearance") || "Appearance & Theme"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Customize how SevaSetu looks on this device. Current:{" "}
              <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">
                {themeMode}
              </span>{" "}
              {themeMode === THEME_MODES.SYSTEM && `(Active: ${resolvedTheme})`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Card 1: Light Theme */}
          <button
            type="button"
            onClick={() => setThemeMode(THEME_MODES.LIGHT)}
            className={`group relative p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
              themeMode === THEME_MODES.LIGHT
                ? "border-brand-purple bg-purple-50/60 dark:bg-purple-950/40 ring-2 ring-brand-purple/20 shadow-md"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm"
            }`}
          >
            {/* Visual Mini Mockup */}
            <div className="w-full h-20 rounded-xl bg-slate-100 border border-slate-200 p-2 flex flex-col gap-1.5 mb-3 overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="ml-auto w-12 h-1.5 bg-slate-200 rounded-full" />
              </div>
              <div className="flex-1 bg-white rounded-lg p-1.5 border border-slate-200/80 flex flex-col gap-1 shadow-xs">
                <div className="w-2/3 h-2 bg-slate-300 rounded-full" />
                <div className="w-1/2 h-1.5 bg-slate-200 rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-amber-500">light_mode</span>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                  {tr("theme_light") || "Light"}
                </span>
              </div>
              {themeMode === THEME_MODES.LIGHT && (
                <span className="w-5 h-5 rounded-full bg-brand-purple text-white flex items-center justify-center text-[12px] shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              {tr("theme_light_desc") || "Clean and crisp daytime interface"}
            </p>
          </button>

          {/* Card 2: Dark Theme */}
          <button
            type="button"
            onClick={() => setThemeMode(THEME_MODES.DARK)}
            className={`group relative p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
              themeMode === THEME_MODES.DARK
                ? "border-brand-purple bg-purple-50/60 dark:bg-purple-950/40 ring-2 ring-brand-purple/20 shadow-md"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm"
            }`}
          >
            {/* Visual Mini Mockup */}
            <div className="w-full h-20 rounded-xl bg-slate-950 border border-slate-800 p-2 flex flex-col gap-1.5 mb-3 overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-1.5 border-b border-slate-800 pb-1">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="ml-auto w-12 h-1.5 bg-slate-800 rounded-full" />
              </div>
              <div className="flex-1 bg-slate-900 rounded-lg p-1.5 border border-slate-800 flex flex-col gap-1 shadow-xs">
                <div className="w-2/3 h-2 bg-indigo-400 rounded-full" />
                <div className="w-1/2 h-1.5 bg-slate-700 rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-purple-400">dark_mode</span>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                  {tr("theme_dark") || "Dark"}
                </span>
              </div>
              {themeMode === THEME_MODES.DARK && (
                <span className="w-5 h-5 rounded-full bg-brand-purple text-white flex items-center justify-center text-[12px] shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              {tr("theme_dark_desc") || "Deep midnight contrast, easy on the eyes"}
            </p>
          </button>

          {/* Card 3: System Theme */}
          <button
            type="button"
            onClick={() => setThemeMode(THEME_MODES.SYSTEM)}
            className={`group relative p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
              themeMode === THEME_MODES.SYSTEM
                ? "border-brand-purple bg-purple-50/60 dark:bg-purple-950/40 ring-2 ring-brand-purple/20 shadow-md"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm"
            }`}
          >
            {/* Visual Mini Mockup (Split Light / Dark) */}
            <div className="w-full h-20 rounded-xl bg-gradient-to-r from-slate-100 to-slate-950 border border-slate-200 dark:border-slate-800 p-2 flex flex-col gap-1.5 mb-3 overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform relative">
              <div className="flex items-center gap-1.5 pb-1 z-10">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="ml-auto text-[9px] font-bold text-slate-400">AUTO</div>
              </div>
              <div className="flex-1 bg-gradient-to-r from-white to-slate-900 rounded-lg p-1.5 border border-slate-300/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-brand-purple">devices</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-indigo-400">brightness_auto</span>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                  {tr("theme_system") || "System Auto"}
                </span>
              </div>
              {themeMode === THEME_MODES.SYSTEM && (
                <span className="w-5 h-5 rounded-full bg-brand-purple text-white flex items-center justify-center text-[12px] shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              {tr("theme_system_desc") || "Syncs automatically with your device theme"}
            </p>
          </button>
        </div>
      </div>
    );
  }

  // ── VARIANT 3: Compact Popover (Mobile top bar & small spaces) ─────
  const currentIcon =
    themeMode === THEME_MODES.LIGHT
      ? "light_mode"
      : themeMode === THEME_MODES.DARK
      ? "dark_mode"
      : "brightness_auto";

  const currentColor =
    themeMode === THEME_MODES.LIGHT
      ? "text-amber-500"
      : themeMode === THEME_MODES.DARK
      ? "text-purple-400"
      : "text-indigo-400";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
        title={`Theme: ${themeMode} (${resolvedTheme})`}
        className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100/90 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-xs active:scale-95"
      >
        <span className={`material-symbols-outlined text-[20px] ${currentColor}`}>
          {currentIcon}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl p-1.5 z-50 animate-fade-in backdrop-blur-md">
          <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {tr("theme_label") || "Theme"}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 capitalize font-medium">
              {resolvedTheme}
            </span>
          </div>

          <div className="space-y-0.5">
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
                    <span className={`material-symbols-outlined text-[17px] ${opt.iconColor}`}>
                      {opt.icon}
                    </span>
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[15px] text-brand-purple dark:text-purple-400">
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
