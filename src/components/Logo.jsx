/**
 * Premium SevaSetu AI Brand Logo.
 * Features an elegant architectural bridge (Setu) uniting two communities,
 * crowned by a glowing 4-point AI nexus spark with modern indigo-violet & amber gradients.
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
      aria-label="SevaSetu AI logo"
    >
      <defs>
        {/* Main Background Gradient */}
        <linearGradient id="ss-bg-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B1528" />
          <stop offset="45%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#4338CA" />
        </linearGradient>

        {/* Primary Bridge Arch Gradient */}
        <linearGradient id="ss-bridge-grad" x1="8" y1="36" x2="40" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>

        {/* Supporting Arc Gradient */}
        <linearGradient id="ss-support-grad" x1="12" y1="38" x2="36" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.8" />
        </linearGradient>

        {/* Golden AI Spark Glow */}
        <radialGradient id="ss-spark-glow" cx="24" cy="14" r="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </radialGradient>

        {/* AI Spark Solid */}
        <linearGradient id="ss-spark-grad" x1="21" y1="11" x2="27" y2="17" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        {/* Subtle Outer Border Stroke */}
        <linearGradient id="ss-border-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Squircle Badge Container */}
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="13"
        fill="url(#ss-bg-grad)"
        stroke="url(#ss-border-grad)"
        strokeWidth="1.5"
      />

      {/* Decorative Subtle Grid Lines / Tech Dots */}
      <circle cx="12" cy="12" r="1" fill="#818CF8" fillOpacity="0.3" />
      <circle cx="36" cy="12" r="1" fill="#C084FC" fillOpacity="0.3" />

      {/* Lower Foundation Cable / Foundation Wave */}
      <path
        d="M10 35 C16 30 20 30 24 33 C28 36 32 36 38 31"
        stroke="url(#ss-support-grad)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Main Bridge Cable (Rising to meet at center apex) */}
      <path
        d="M9 32 C15 22 20 18 24 18 C28 18 33 22 39 32"
        stroke="url(#ss-bridge-grad)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Left & Right Bridge Suspension Pillars */}
      <line x1="16" y1="24.5" x2="16" y2="33" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
      <line x1="32" y1="24.5" x2="32" y2="33" stroke="#D8B4FE" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />

      {/* Node Dots on Deck */}
      <circle cx="9" cy="32" r="2" fill="#60A5FA" />
      <circle cx="39" cy="32" r="2" fill="#C084FC" />

      {/* Radiant Glow Behind the AI Spark */}
      <circle cx="24" cy="14" r="8" fill="url(#ss-spark-glow)" />

      {/* 4-Point AI Nexus Spark at Bridge Summit */}
      <path
        d="M24 8.5 C24.4 12 25.5 13.5 29 14 C25.5 14.5 24.4 16 24 19.5 C23.6 16 22.5 14.5 19 14 C22.5 13.5 23.6 12 24 8.5 Z"
        fill="url(#ss-spark-grad)"
      />

      {/* Center Core Dot of Spark */}
      <circle cx="24" cy="14" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

