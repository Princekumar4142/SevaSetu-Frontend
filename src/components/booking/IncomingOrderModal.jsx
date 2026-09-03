import { useEffect, useState, useCallback } from "react";

const ACCEPT_TIMEOUT_SECS = 30;

/**
 * IncomingOrderModal
 * Full-screen animated popup shown to a worker when a matching order comes in.
 *
 * Props:
 *   order    {object}   — incoming_order socket payload
 *   workerId {string}   — this worker's MongoDB _id
 *   onAccept {function} — called when Accept pressed
 *   onReject {function} — called when Reject pressed or timer expires
 *   onClose  {function} — dismiss without explicit action
 */
export default function IncomingOrderModal({ order, workerId, onAccept, onReject, onClose }) {
  const [timeLeft, setTimeLeft] = useState(ACCEPT_TIMEOUT_SECS);
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (accepted || rejected) return;
    if (timeLeft <= 0) {
      handleReject("timeout");
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, accepted, rejected]);

  const handleAccept = useCallback(() => {
    setAccepted(true);
    onAccept({ orderId: order.orderId, workerId });
  }, [order, workerId, onAccept]);

  const handleReject = useCallback(
    (reason = "manual") => {
      setRejected(true);
      onReject({
        orderId: order.orderId,
        workerId,
        nextWorkerIds: order.matchedWorkerIds || [],
        orderPayload: order,
        reason,
      });
    },
    [order, workerId, onReject]
  );

  const progress = ((ACCEPT_TIMEOUT_SECS - timeLeft) / ACCEPT_TIMEOUT_SECS) * 100;
  const urgent = timeLeft <= 10;

  const totalItems = (order.items || []).reduce((s, i) => s + (i.qty || 1), 0);
  const serviceNames = (order.items || []).map((i) => i.name).join(", ");
  const amount = order.totalAmount || 0;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={accepted || rejected ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 ${
          accepted ? "scale-95 opacity-80" : "scale-100 opacity-100"
        }`}
      >
        {/* Pulsing ring outer glow */}
        {!accepted && !rejected && (
          <div
            className={`absolute -inset-1 rounded-3xl ${
              urgent ? "animate-ping bg-red-500/30" : "animate-pulse bg-brand-purple/20"
            }`}
            style={{ animationDuration: urgent ? "0.8s" : "1.5s" }}
          />
        )}

        {/* ── Header ── */}
        <div
          className={`relative px-6 pt-6 pb-5 text-white ${
            accepted
              ? "bg-gradient-to-br from-emerald-600 to-emerald-500"
              : rejected
              ? "bg-gradient-to-br from-slate-700 to-slate-600"
              : urgent
              ? "bg-gradient-to-br from-red-600 to-orange-500"
              : "bg-gradient-to-br from-primary to-brand-purple"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {/* Animated bell icon */}
              <span
                className={`text-3xl ${accepted || rejected ? "" : "animate-bounce"}`}
                style={{ animationDuration: "0.6s" }}
              >
                {accepted ? "✅" : rejected ? "❌" : "🔔"}
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/70">
                  {accepted ? "Order Accepted" : rejected ? "Order Skipped" : "New Order Request"}
                </p>
                <p className="text-lg font-black leading-tight">
                  {accepted
                    ? "You're on the job!"
                    : rejected
                    ? "Looking for next partner"
                    : "Incoming Service Request"}
                </p>
              </div>
            </div>

            {/* Close X */}
            {(accepted || rejected) && (
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Timer bar (only visible while pending) */}
          {!accepted && !rejected && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white/80">Auto-expires in</span>
                <span className={urgent ? "text-amber-300 text-base font-black" : "text-white"}>
                  {timeLeft}s
                </span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    urgent ? "bg-amber-400" : "bg-white"
                  }`}
                  style={{ width: `${100 - progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="bg-white px-6 py-5 space-y-4">
          {/* Booking number */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Booking No.
            </span>
            <span className="text-sm font-black text-on-surface tracking-widest">
              #{order.bookingNumber || "—"}
            </span>
          </div>

          {/* Services */}
          <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
              Services Requested
            </p>
            {(order.items || []).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[16px] text-brand-purple shrink-0">
                    {item.icon || "handyman"}
                  </span>
                  <span className="text-xs font-semibold text-on-surface truncate">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-on-surface shrink-0">
                  ×{item.qty || 1}
                </span>
              </div>
            ))}
          </div>

          {/* Address & Slot */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-brand-purple-light rounded-xl p-3 space-y-0.5">
              <p className="text-[9px] font-bold uppercase tracking-wider text-brand-purple">Location</p>
              <p className="text-xs font-bold text-on-surface leading-snug line-clamp-2">
                {order.address?.line1 || "—"}
              </p>
              <p className="text-[10px] text-on-surface-variant font-medium">
                {order.address?.city || ""}
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-0.5">
              <p className="text-[9px] font-bold uppercase tracking-wider text-amber-700">Slot</p>
              <p className="text-xs font-bold text-on-surface leading-snug">{order.slot?.date || "—"}</p>
              <p className="text-[10px] text-amber-700 font-medium">{order.slot?.time || ""}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Total Earnings
              </p>
              <p className="text-xl font-black text-emerald-700">₹{amount.toLocaleString()}</p>
            </div>
            <span className="material-symbols-outlined text-[28px] text-emerald-500">payments</span>
          </div>

          {/* Action Buttons */}
          {!accepted && !rejected && (
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleReject("manual")}
                className="flex-1 py-3.5 rounded-2xl border-2 border-outline-variant bg-white text-sm font-black text-slate-600 hover:border-red-400 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
              >
                ✕ Skip
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="flex-2 flex-grow-[2] py-3.5 rounded-2xl bg-gradient-to-r from-primary to-brand-purple text-white text-sm font-black shadow-lg shadow-brand-purple/30 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Accept Order
              </button>
            </div>
          )}

          {/* Success message after accept */}
          {accepted && (
            <div className="text-center py-2">
              <p className="text-sm font-bold text-emerald-700">
                Great! Head to the customer's location. Check your bookings for full details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
