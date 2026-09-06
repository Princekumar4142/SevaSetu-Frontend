/**
 * Official SevaSetu Brand Logo Component.
 * Uses the official oval logo with bridge, human figures, and brand tagline.
 * Responsive: works perfectly on both mobile and desktop views.
 */
import sevaSetuLogo from "../assets/sevasetu_logo.jpg";

export default function Logo({ size = 32, className = "" }) {
  return (
    <img
      src={sevaSetuLogo}
      alt="SevaSetu - Seva Samman Saath Sahabhagi"
      width={size * 3}
      height={size * 2.25}
      className={`shrink-0 object-contain drop-shadow-sm ${className}`}
      style={{
        width: "auto",
        height: size,
        maxHeight: size,
        minHeight: size,
      }}
      aria-label="SevaSetu official logo"
    />
  );
}
