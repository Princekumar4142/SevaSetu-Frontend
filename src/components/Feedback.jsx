export function LoadingState({ label = "Loading…" }) {
  return (
    <div className="flex items-center justify-center gap-sm py-xl text-on-surface-variant">
      <span className="material-symbols-outlined animate-spin">progress_activity</span>
      <span className="font-body-md text-body-md">{label}</span>
    </div>
  );
}

export function EmptyState({ icon = "inbox", title, description }) {
  return (
    <div className="flex flex-col items-center justify-center gap-sm py-xl text-center">
      <span className="material-symbols-outlined text-outline-variant text-[40px]">{icon}</span>
      <p className="font-label-md text-label-md text-on-surface">{title}</p>
      {description && <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">{description}</p>}
    </div>
  );
}

export function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="bg-error-container text-on-error-container rounded-lg p-sm flex items-center gap-sm font-body-md text-body-md">
      <span className="material-symbols-outlined text-[18px]">error</span>
      {message}
    </div>
  );
}
