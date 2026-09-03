import { useState } from "react";

export default function CollapsibleSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-outline-variant">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-md"
      >
        <span className="font-label-md text-label-md text-on-surface font-bold">{title}</span>
        <span className="material-symbols-outlined text-on-surface-variant">
          {open ? "expand_less" : "expand_more"}
        </span>
      </button>
      {open && <div className="pb-sm">{children}</div>}
    </div>
  );
}
