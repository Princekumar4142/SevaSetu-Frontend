/**
 * Official SevaSetu Brand Logo Component.
 * Uses the official oval logo with bridge, human figures, and brand tagline.
 * Responsive: works perfectly on both mobile and desktop views.
 */
import sevaSetuLogo from "../assets/sevasetu_logo.jpg";

export default function Logo({ size = 32, className = "" }) {
  return (
    <div
      className={`shrink-0 inline-flex items-center justify-center rounded-xl bg-white p-0.5 shadow-xs border border-slate-200/60 dark:border-slate-700/60 ${className}`}
      style={{
        height: size + 6,
      }}
    >
      <img
        src={sevaSetuLogo}
        alt="SevaSetu - Seva Samman Saath Sahabhagi"
        width={size * 3}
        height={size * 2.25}
        className="object-contain rounded-lg"
        style={{
          width: "auto",
          height: size,
          maxHeight: size,
          minHeight: size,
        }}
        aria-label="SevaSetu official logo"
      />
    </div>
  );
}
