import { useTheme, THEME_MODES } from "../context/ThemeContext";

/**
 * DayNightSwitch Component
 * Exact visual recreation of the animated Day/Night toggle switch from Abacus Club screenshots.
 * Light mode: Sky blue background with soft clouds and glowing yellow sun on the left.
 * Dark mode: Deep midnight sky with stars and cratered moon on the right.
 */
export default function DayNightSwitch({ className = "" }) {
  const { themeMode, resolvedTheme, setThemeMode } = useTheme();
  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    // If currently dark, switch to light; if currently light or system, toggle appropriately
    if (isDark) {
      setThemeMode(THEME_MODES.LIGHT);
    } else {
      setThemeMode(THEME_MODES.DARK);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      role="switch"
      aria-checked={isDark}
      title={`Current: ${resolvedTheme} mode (Click to toggle)`}
      className={`relative w-[68px] h-[34px] rounded-full p-1 cursor-pointer transition-colors duration-500 overflow-hidden shadow-inner focus:outline-none select-none shrink-0 ${
        isDark ? "bg-[#181a20] border border-slate-700/80" : "bg-[#38bdf8] border border-sky-400/60"
      } ${className}`}
    >
      {/* ── Light Mode Scene: Clouds ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Soft clouds on bottom right */}
        <div className="absolute -bottom-1.5 right-1 w-6 h-6 rounded-full bg-white/90" />
        <div className="absolute -bottom-2.5 right-4 w-7 h-7 rounded-full bg-white/80" />
        <div className="absolute bottom-0 right-8 w-4 h-4 rounded-full bg-white/70" />
      </div>

      {/* ── Dark Mode Scene: Stars ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Twinkling star dots on the left */}
        <span className="absolute top-2 left-2 text-[8px] text-white/90 animate-pulse">✦</span>
        <span className="absolute bottom-2.5 left-4 text-[6px] text-white/70">★</span>
        <span className="absolute top-4 left-6 text-[5px] text-white/80">✦</span>
        <span className="absolute top-1.5 left-8 text-[4px] text-white/50">★</span>
      </div>

      {/* ── Sliding Thumb: Sun / Moon ── */}
      <div
        className={`relative z-10 w-[26px] h-[26px] rounded-full transition-transform duration-500 ease-in-out flex items-center justify-center shadow-md ${
          isDark
            ? "translate-x-[34px] bg-[#eef2f6] shadow-black/40"
            : "translate-x-0 bg-[#fde047] shadow-amber-500/50"
        }`}
      >
        {isDark ? (
          // Moon craters
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#cbd5e1]" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-[#cbd5e1]" />
            <div className="absolute top-3 right-2 w-1 h-1 rounded-full bg-[#cbd5e1]" />
          </div>
        ) : (
          // Sun glow center
          <div className="w-2.5 h-2.5 rounded-full bg-[#eab308] opacity-60" />
        )}
      </div>
    </button>
  );
}
