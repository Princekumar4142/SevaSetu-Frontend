import { useEffect, useState, useCallback, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

const ACCEPT_TIMEOUT_SECS = 30;

/**
 * IncomingOrderModal (self-contained)
 * Listens to socket events internally. Drop it once inside WorkerDashboard
 * for verified workers — no props needed. Handles:
 *   incoming_order        → show popup
 *   order_accepted_by_other → dismiss popup
 *   30s auto-reject countdown
 */
export default function IncomingOrderModal() {
  const { socket } = useSocket();
  const { currentUser } = useAuth();
  const [incomingOrder, setIncomingOrder] = useState(null);
  const [timeLeft, setTimeLeft] = useState(ACCEPT_TIMEOUT_SECS);
  const [phase, setPhase] = useState("idle"); // idle | ringing | accepted | rejected
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  // ── Audio helpers ────────────────────────────────────────────────────
  const stopRinging = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, []);

  const startRinging = useCallback(() => {
    try {
      const audio = new Audio(
        "https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=telephone-ring-04-45214.mp3"
      );
      audio.loop = true;
      audioRef.current = audio;
      audio.play().catch(() => {});
    } catch {}
  }, []);

  // ── Countdown timer ──────────────────────────────────────────────────
  const clearCountdown = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startCountdown = useCallback(() => {
    clearCountdown();
    setTimeLeft(ACCEPT_TIMEOUT_SECS);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearCountdown]);

  // Auto-reject when timer hits 0
  useEffect(() => {
    if (phase === "ringing" && timeLeft === 0) {
      handleReject({ reason: "timeout" });
    }
  }, [timeLeft, phase]);

  // ── Socket listeners ─────────────────────────────────────────────────
  useEffect(() => {
    if (!socket) return;

    const handleIncomingOrder = (data) => {
      console.log("[Worker UI] Incoming Order Received:", data);
      setIncomingOrder(data);
      setPhase("ringing");
      startCountdown();
      startRinging();
    };

    const handleOrderAcceptedByOther = (data) => {
      setIncomingOrder((prev) => {
        if (prev && (prev.orderId?.toString() === data.orderId?.toString())) {
          stopRinging();
          clearCountdown();
          setPhase("idle");
          return null;
        }
        return prev;
      });
    };

    socket.on("incoming_order", handleIncomingOrder);
    socket.on("order_accepted_by_other", handleOrderAcceptedByOther);

    return () => {
      socket.off("incoming_order", handleIncomingOrder);
      socket.off("order_accepted_by_other", handleOrderAcceptedByOther);
      stopRinging();
      clearCountdown();
    };
  }, [socket, startCountdown, startRinging, stopRinging, clearCountdown]);

  // ── Actions ──────────────────────────────────────────────────────────
  const handleAccept = useCallback(async () => {
    if (!incomingOrder || !socket) return;
    stopRinging();
    clearCountdown();
    setPhase("accepted");

    const workerId = currentUser?._id || socket.id;
    socket.emit("accept_order", { orderId: incomingOrder.orderId, workerId });

    // Also update booking status via API
    try {
      await api.patch(`/bookings/${incomingOrder.orderId}/status`, { status: "ASSIGNED" });
    } catch (err) {
      console.error("[Socket] Accept API error:", err.message);
    }

    // Auto-close after 3s
    setTimeout(() => {
      setIncomingOrder(null);
      setPhase("idle");
    }, 3000);
  }, [incomingOrder, socket, currentUser, stopRinging, clearCountdown]);

  const handleReject = useCallback(
    ({ reason = "manual" } = {}) => {
      if (!incomingOrder || !socket) return;
      stopRinging();
      clearCountdown();
      setPhase("rejected");

      const workerId = currentUser?._id || socket.id;
      socket.emit("reject_order", {
        orderId: incomingOrder.orderId,
        workerId,
        nextWorkerIds: incomingOrder.matchedWorkerIds || [],
        orderPayload: incomingOrder,
        reason,
      });

      // Auto-close after 1.5s
      setTimeout(() => {
        setIncomingOrder(null);
        setPhase("idle");
      }, 1500);
    },
    [incomingOrder, socket, currentUser, stopRinging, clearCountdown]
  );

  // ── Nothing to show ──────────────────────────────────────────────────
  if (!incomingOrder || phase === "idle") return null;

  const amount = incomingOrder.totalAmount || 0;
  const urgent = timeLeft <= 10 && phase === "ringing";
  const progress = ((ACCEPT_TIMEOUT_SECS - timeLeft) / ACCEPT_TIMEOUT_SECS) * 100;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={phase === "accepted" || phase === "rejected" ? () => { setIncomingOrder(null); setPhase("idle"); } : undefined}
      />

      {/* Pulsing outer glow */}
      {phase === "ringing" && (
        <div
          className={`absolute w-[340px] h-[540px] rounded-3xl ${urgent ? "bg-red-500/25 animate-ping" : "bg-brand-purple/15 animate-pulse"}`}
          style={{ animationDuration: urgent ? "0.7s" : "1.4s" }}
        />
      )}

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl">

        {/* ── Header ── */}
        <div
          className={`px-6 pt-6 pb-5 text-white ${
            phase === "accepted"
              ? "bg-gradient-to-br from-emerald-600 to-emerald-500"
              : phase === "rejected"
              ? "bg-gradient-to-br from-slate-700 to-slate-500"
              : urgent
              ? "bg-gradient-to-br from-red-600 to-orange-500"
              : "bg-gradient-to-br from-primary to-brand-purple"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-3xl ${phase === "ringing" ? "animate-bounce" : ""}`} style={{ animationDuration: "0.5s" }}>
              {phase === "accepted" ? "✅" : phase === "rejected" ? "❌" : "🔔"}
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/70">
                {phase === "accepted"
                  ? "Order Accepted"
                  : phase === "rejected"
                  ? "Order Skipped"
                  : "New Order Request"}
              </p>
              <p className="text-lg font-black leading-tight">
                {phase === "accepted"
                  ? "You're on the job!"
                  : phase === "rejected"
                  ? "Looking for next partner…"
                  : "Incoming Service Request"}
              </p>
            </div>
          </div>

          {/* Countdown bar */}
          {phase === "ringing" && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white/80">Auto-expires in</span>
                <span className={urgent ? "text-amber-300 text-base font-black" : "text-white"}>
                  {timeLeft}s
                </span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-linear ${urgent ? "bg-amber-400" : "bg-white"}`}
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
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Booking No.</span>
            <span className="text-sm font-black text-on-surface tracking-widest">
              #{incomingOrder.bookingNumber || "—"}
            </span>
          </div>

          {/* Services */}
          <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">Services Requested</p>
            {(incomingOrder.items || []).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[15px] text-brand-purple shrink-0">
                    {item.icon || "handyman"}
                  </span>
                  <span className="text-xs font-semibold text-on-surface truncate">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-on-surface shrink-0">×{item.qty || 1}</span>
              </div>
            ))}
          </div>

          {/* Location + Slot grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-brand-purple-light rounded-xl p-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-brand-purple mb-0.5">Location</p>
              <p className="text-xs font-bold text-on-surface line-clamp-2 leading-snug">
                {incomingOrder.address?.line1 || "—"}
              </p>
              <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">
                {incomingOrder.address?.city || ""}
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-amber-700 mb-0.5">Slot</p>
              <p className="text-xs font-bold text-on-surface leading-snug">{incomingOrder.slot?.date || "—"}</p>
              <p className="text-[10px] text-amber-700 font-medium">{incomingOrder.slot?.time || ""}</p>
            </div>
          </div>

          {/* Earnings */}
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Total Earnings</p>
              <p className="text-2xl font-black text-emerald-700">₹{amount.toLocaleString()}</p>
            </div>
            <span className="material-symbols-outlined text-[30px] text-emerald-500">payments</span>
          </div>

          {/* Action buttons */}
          {phase === "ringing" && (
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleReject({ reason: "manual" })}
                className="flex-1 py-3.5 rounded-2xl border-2 border-outline-variant bg-white text-sm font-black text-slate-600 hover:border-red-400 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
              >
                ✕ Skip
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="flex-[2] py-3.5 rounded-2xl bg-gradient-to-r from-primary to-brand-purple text-white text-sm font-black shadow-lg shadow-brand-purple/30 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Accept Order
              </button>
            </div>
          )}

          {phase === "accepted" && (
            <p className="text-sm font-bold text-emerald-700 text-center py-2">
              Head to the customer's location. Your Bookings page has full details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
