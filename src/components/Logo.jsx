/**
 * Reusable SevaSetu branded logo component.
 * Renders an SVG "SS" monogram with a service-connector design.
 */
export default function Logo({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SevaSetu logo"
    >
      {/* Background circle */}
      <rect width="48" height="48" rx="12" fill="url(#logo-gradient)" />

      {/* Bridge / Setu shape */}
      <path
        d="M8 32 C8 32 14 18 24 18 C34 18 40 32 40 32"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />

      {/* Pillars */}
      <line x1="16" y1="25" x2="16" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <line x1="32" y1="25" x2="32" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />

      {/* Top connection dot — represents Seva (service) */}
      <circle cx="24" cy="14" r="3.5" fill="white" opacity="0.95" />

      {/* Small decorative dots on bridge */}
      <circle cx="16" cy="24.5" r="2" fill="white" opacity="0.8" />
      <circle cx="32" cy="24.5" r="2" fill="white" opacity="0.8" />

      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1a365d" />
          <stop offset="50%" stopColor="#2d476f" />
          <stop offset="100%" stopColor="#5E35B1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
