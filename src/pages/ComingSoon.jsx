export default function ComingSoon({ title, description }) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl flex flex-col items-center text-center gap-sm min-h-[240px] justify-center">
      <span className="material-symbols-outlined text-outline-variant text-[40px]">construction</span>
      <h2 className="font-headline-md text-headline-md text-on-surface">{title}</h2>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
        {description || "This part of the platform is planned for a later phase and isn't built yet."}
      </p>
    </div>
  );
}
