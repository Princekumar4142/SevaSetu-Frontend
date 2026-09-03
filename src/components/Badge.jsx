const STYLES = {
  verified: "bg-tertiary-fixed-dim/20 text-tertiary-container",
  pending: "bg-secondary-container/20 text-secondary",
  rejected: "bg-error-container text-on-error-container",
  active: "bg-tertiary-fixed-dim/20 text-tertiary-container",
  offline: "bg-surface-container-high text-on-surface-variant",
};

export default function Badge({ tone = "pending", icon, children }) {
  return (
    <span
      className={`inline-flex items-center gap-xs px-2 py-1 rounded-full font-status-badge text-status-badge ${STYLES[tone] || STYLES.pending}`}
    >
      {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
      {children}
    </span>
  );
}
