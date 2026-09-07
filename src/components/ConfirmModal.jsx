import { useState } from "react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Profile",
  message = "Are you sure you want to permanently delete this profile? This action cannot be undone.",
  targetName = "",
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
  loading = false,
  danger = true,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant overflow-hidden">
        {/* Top Warning Banner */}
        <div className={`p-5 flex items-start gap-3.5 ${danger ? "bg-red-50/80 border-b border-red-100" : "bg-brand-purple-light border-b border-brand-purple/15"}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${danger ? "bg-red-100 text-red-600" : "bg-brand-purple text-white"}`}>
            <span className="material-symbols-outlined text-[24px]">
              {danger ? "delete_forever" : "warning"}
            </span>
          </div>
          <div>
            <h3 className={`text-base font-bold ${danger ? "text-red-950" : "text-brand-purple"}`}>
              {title}
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Administrative action requires your confirmation
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {targetName && (
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-purple text-white font-bold flex items-center justify-center text-sm">
                {targetName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">Target Profile</p>
                <p className="text-sm font-bold text-on-surface truncate">{targetName}</p>
              </div>
            </div>
          )}

          <p className="text-sm text-on-surface leading-relaxed">
            {message}
          </p>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <span className="material-symbols-outlined text-amber-600 text-[18px] shrink-0 mt-0.5">info</span>
            <span>
              <strong>Note:</strong> Associated records, bookings, and permissions for this profile will be purged or cancelled.
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-surface-container-low/60 border-t border-outline-variant flex items-center justify-end gap-2.5">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl font-label-md text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl font-label-md text-sm font-bold text-white flex items-center gap-1.5 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
              danger
                ? "bg-red-600 hover:bg-red-700 shadow-red-600/20"
                : "bg-brand-purple hover:bg-brand-purple-dark shadow-brand-purple/20"
            }`}
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                <span>Deleting…</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">
                  {danger ? "delete" : "check"}
                </span>
                <span>{confirmText}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
