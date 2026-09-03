// Purely decorative to match the reference screenshots — the source design
// doesn't show what this opens, so it's a visual-only element for now.
export default function MenuPill() {
  return (
    <div className="flex justify-center py-sm">
      <button
        type="button"
        className="flex items-center gap-xs bg-on-surface text-white text-status-badge font-status-badge px-md py-2 rounded-full shadow-sm"
      >
        <span className="material-symbols-outlined text-[16px]">menu</span>
        Menu
      </button>
    </div>
  );
}
