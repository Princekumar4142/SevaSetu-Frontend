const VARIANTS = {
  primary: "bg-primary text-on-primary hover:bg-primary-container",
  secondary: "bg-secondary text-on-secondary hover:bg-secondary/90",
  outline: "bg-transparent border border-primary text-primary hover:bg-primary/5",
  error: "bg-error text-on-error hover:bg-error/90",
  ghost: "bg-transparent text-primary hover:bg-surface-variant",
  // Added for the booking flow (Figma) — additive, existing variants untouched.
  purple: "bg-brand-purple text-white hover:bg-brand-purple-dark",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  icon,
  loading = false,
  disabled = false,
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-sm font-label-md text-label-md font-bold px-lg py-[12px] rounded-lg transition-colors shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
      ) : icon ? (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
