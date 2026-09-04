/**
 * Premium SevaSetu AI Brand Logo.
 * Features an elegant architectural bridge (Setu) uniting communities,
 * crowned by a glowing 4-point AI nexus spark with modern indigo-violet & amber gradients.
 * Uses robust CSS gradient container with crisp vector geometry that renders 100% reliably
 * across all mobile devices, webviews, and desktop browsers without SVG gradient URL bugs.
 */
export default function Logo({ size = 32, className = "" }) {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`relative shrink-0 rounded-[28%] bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4f46e5] p-[12%] flex items-center justify-center shadow-sm border border-indigo-400/40 overflow-hidden ${className}`}
      aria-label="SevaSetu AI logo"
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Supporting Arc */}
        <path
          d="M8 29 C14 24 18 24 20 26 C22 28 26 28 32 24"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />

        {/* Main Golden/Cyan Bridge Cable */}
        <path
          d="M6 26 C12 16 16 12 20 12 C24 12 28 16 34 26"
          stroke="#818CF8"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Suspension Vertical Pillars */}
        <line x1="13" y1="18" x2="13" y2="26" stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
        <line x1="27" y1="18" x2="27" y2="26" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />

        {/* Deck node dots */}
        <circle cx="6" cy="26" r="2" fill="#60A5FA" />
        <circle cx="34" cy="26" r="2" fill="#C084FC" />

        {/* AI Nexus Glow */}
        <circle cx="20" cy="8" r="6" fill="#F59E0B" fillOpacity="0.5" />

        {/* 4-Point AI Nexus Spark at Bridge Summit */}
        <path
          d="M20 3 C20.4 6 21.5 7.5 24.5 8 C21.5 8.5 20.4 10 20 13 C19.6 10 18.5 8.5 15.5 8 C18.5 7.5 19.6 6 20 3 Z"
          fill="#FDE047"
        />
        <circle cx="20" cy="8" r="1.3" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
