import { useEffect, useState, useCallback, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../hooks/useAuth";
import Avatar from "./Avatar";
import api from "../services/api";

const ACCEPT_TIMEOUT_SECS = 30;

// Shared global AudioContext instance unlocked on first user interaction
let globalAudioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!globalAudioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      globalAudioCtx = new AudioContextClass();
    }
  }
  if (globalAudioCtx && globalAudioCtx.state === "suspended") {
    globalAudioCtx.resume().catch(() => {});
  }
  return globalAudioCtx;
}

// Unlock audio on initial user interaction (click, touch, keydown)
if (typeof window !== "undefined") {
  const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
  };
  window.addEventListener("click", unlockAudio);
  window.addEventListener("touchstart", unlockAudio);
  window.addEventListener("keydown", unlockAudio);
}

// Realistic dual-tone telephone call ringtone synthesizer (440Hz + 480Hz)
function playRingtone() {
  const ctx = getAudioContext();
  if (!ctx) return () => {};

  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  let isPlaying = true;

  const ringPulse = () => {
    if (!isPlaying) return;
    try {
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "sine";
      osc1.frequency.setValueAtTime(440, now);
      osc2.frequency.setValueAtTime(480, now);

      // Telephone ring pulse envelope (1.3 seconds tone, 0.9s pause)
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
      gain.gain.setValueAtTime(0.25, now + 1.25);
      gain.gain.linearRampToValueAtTime(0, now + 1.3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.3);
      osc2.stop(now + 1.3);
    } catch (e) {
      console.warn("[Ringtone] Playback exception:", e);
    }
  };

  ringPulse();
  const interval = setInterval(() => {
    if (isPlaying) ringPulse();
  }, 2200);

  return () => {
    isPlaying = false;
    clearInterval(interval);
  };
}

// Trigger browser system native notification (phone alert)
function triggerSystemNotification(data) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission === "granted") {
    try {
      const customerName = data.customer?.name || "Customer";
      const notif = new Notification("📞 INCOMING BOOKING CALL!", {
        body: `${customerName} is calling for booking! Payout: ₹${data.totalAmount || 599}. Tap to accept booking.`,
        icon: data.customer?.profilePhoto || "/favicon.ico",
        tag: `order-call-${data.orderId}`,
        requireInteraction: true,
        vibrate: [400, 150, 400, 150, 400],
      });
      notif.onclick = () => {
        window.focus();
        notif.close();
      };
    } catch (err) {
      console.warn("[Notification] System alert error:", err);
    }
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission();
  }
}

export default function IncomingOrderModal() {
  const { socket } = useSocket();
  const { currentUser } = useAuth();
  const [incomingOrder, setIncomingOrder] = useState(null);
  const [timeLeft, setTimeLeft] = useState(ACCEPT_TIMEOUT_SECS);
  const [phase, setPhase] = useState("idle"); // idle | ringing | accepted | rejected
  const timerRef = useRef(null);
  const stopAudioRef = useRef(null);
  const rejectedOrdersRef = useRef(new Set());

  // Ask for notification permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Ringtone controls
  const stopRinging = useCallback(() => {
    if (stopAudioRef.current) {
      stopAudioRef.current();
      stopAudioRef.current = null;
    }
  }, []);

  const startRinging = useCallback(() => {
    stopRinging();
    stopAudioRef.current = playRingtone();
  }, [stopRinging]);

  // Countdown timer controls
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

  const triggerIncomingOrder = useCallback(
    (data) => {
      if (!data || !data.orderId) return;
      if (rejectedOrdersRef.current.has(data.orderId.toString())) return;

      setIncomingOrder(data);
      setPhase("ringing");
      startCountdown();
      startRinging();
      triggerSystemNotification(data);
    },
    [startCountdown, startRinging]
  );

  // Auto-reject on timeout
  useEffect(() => {
    if (phase === "ringing" && timeLeft === 0) {
      handleReject({ reason: "timeout" });
    }
  }, [timeLeft, phase]);

  // Handle Socket events
  useEffect(() => {
    if (socket) {
      const handleIncomingOrder = (data) => {
        console.log("[Worker UI] Socket incoming_order:", data);
        triggerIncomingOrder(data);
      };

      const handleOrderAcceptedByOther = (data) => {
        setIncomingOrder((prev) => {
          if (prev && prev.orderId?.toString() === data.orderId?.toString()) {
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
      };
    }
  }, [socket, triggerIncomingOrder, stopRinging, clearCountdown]);

  // Check pending booking from backend (so call appears whether worker was online or offline when customer ordered)
  const checkPendingAlert = useCallback(async () => {
    if (phase === "ringing" || phase === "accepted") return;
    try {
      const res = await api.get("/bookings/pending-alert");
      const booking = res.data?.data?.booking;

      if (booking && booking._id) {
        if (rejectedOrdersRef.current.has(booking._id.toString())) return;

        const payload = {
          orderId: booking._id,
          bookingNumber: booking.bookingNumber,
          items: booking.items,
          address: booking.address,
          slot: booking.slot,
          totalAmount: booking.pricing?.totalAmount || booking.totalAmount || 599,
          customer: {
            name: booking.customer?.name || "Customer",
            phone: booking.customer?.phone || "+91 98000 00000",
            profilePhoto: booking.customer?.profilePhoto || "",
          },
        };
        triggerIncomingOrder(payload);
      }
    } catch (err) {
      // ignore unauthenticated or background poll errors
    }
  }, [phase, triggerIncomingOrder]);

  // Poll for pending alerts periodically & on tab focus/mount
  useEffect(() => {
    checkPendingAlert();

    const interval = setInterval(checkPendingAlert, 4000);
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        checkPendingAlert();
      }
    };

    window.addEventListener("focus", checkPendingAlert);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", checkPendingAlert);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [checkPendingAlert]);

  // Listen for custom window event (for UI testing)
  useEffect(() => {
    const handleSimulate = (e) => {
      const demoPayload = e.detail || {
        orderId: `demo-${Date.now()}`,
        bookingNumber: "BK-" + Math.floor(100000 + Math.random() * 900000),
        customer: {
          name: "Rahul Sharma (Customer)",
          phone: "+91 98765 43210",
          profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
        },
        items: [
          { name: "Intense AC Service & Gas Refill", qty: 1, icon: "ac_unit" },
          { name: "Switchboard Inspection", qty: 1, icon: "bolt" },
        ],
        address: {
          line1: "Flat 402, Sunshine Heights, Wagholi",
          city: "Pune",
          pincode: "411014",
        },
        slot: { date: "Today", time: "04:30 PM" },
        totalAmount: 599,
      };
      triggerIncomingOrder(demoPayload);
    };

    window.addEventListener("simulate_incoming_order", handleSimulate);
    return () => window.removeEventListener("simulate_incoming_order", handleSimulate);
  }, [triggerIncomingOrder]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRinging();
      clearCountdown();
    };
  }, [stopRinging, clearCountdown]);

  // Actions
  const handleAccept = useCallback(async () => {
    if (!incomingOrder) return;
    stopRinging();
    clearCountdown();
    setPhase("accepted");

    const workerId = currentUser?._id || "worker-partner";
    if (socket) {
      socket.emit("accept_order", { orderId: incomingOrder.orderId, workerId });
    }

    try {
      if (incomingOrder.orderId && !incomingOrder.orderId.startsWith("demo-")) {
        await api.patch(`/bookings/${incomingOrder.orderId}/status`, { status: "ASSIGNED" });
      }
    } catch (err) {
      console.error("[Socket] Accept API error:", err.message);
    }

    setTimeout(() => {
      setIncomingOrder(null);
      setPhase("idle");
    }, 3000);
  }, [incomingOrder, socket, currentUser, stopRinging, clearCountdown]);

  const handleReject = useCallback(
    ({ reason = "manual" } = {}) => {
      if (!incomingOrder) return;
      if (incomingOrder.orderId) {
        rejectedOrdersRef.current.add(incomingOrder.orderId.toString());
      }
      stopRinging();
      clearCountdown();
      setPhase("rejected");

      const workerId = currentUser?._id || "worker-partner";
      if (socket) {
        socket.emit("reject_order", {
          orderId: incomingOrder.orderId,
          workerId,
          reason,
        });
      }

      setTimeout(() => {
        setIncomingOrder(null);
        setPhase("idle");
      }, 1500);
    },
    [incomingOrder, socket, currentUser, stopRinging, clearCountdown]
  );

  if (!incomingOrder || phase === "idle") return null;

  const amount = incomingOrder.totalAmount || 599;
  const urgent = timeLeft <= 10 && phase === "ringing";
  const progress = ((ACCEPT_TIMEOUT_SECS - timeLeft) / ACCEPT_TIMEOUT_SECS) * 100;
  const customerName = incomingOrder.customer?.name || "Customer";
  const customerPhone = incomingOrder.customer?.phone || "+91 98000 00000";

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Dark backdrop with ambient glow */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={phase === "accepted" || phase === "rejected" ? () => { setIncomingOrder(null); setPhase("idle"); } : undefined}
      />

      {/* Pulsing ring visualizer */}
      {phase === "ringing" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[360px] h-[360px] rounded-full border-4 border-emerald-500/30 animate-ping" />
          <div className="w-[480px] h-[480px] rounded-full border-2 border-purple-500/20 animate-pulse" />
        </div>
      )}

      {/* Incoming Call Alert Modal */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200 animate-scale-in">
        {/* ── Top Call Header ── */}
        <div
          className={`px-6 pt-6 pb-5 text-white relative transition-colors ${
            phase === "accepted"
              ? "bg-gradient-to-r from-emerald-600 to-teal-700"
              : phase === "rejected"
              ? "bg-gradient-to-r from-slate-800 to-slate-700"
              : urgent
              ? "bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 animate-pulse"
              : "bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-300">
                {phase === "accepted" ? "BOOKING CONFIRMED" : phase === "rejected" ? "DECLINED" : "INCOMING CALL REQUEST"}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-300">#{incomingOrder.bookingNumber}</span>
          </div>

          <h2 className="text-xl font-black text-white leading-tight">
            {phase === "accepted"
              ? "Job Accepted! Get Ready"
              : phase === "rejected"
              ? "Skipped Request"
              : "New Customer Booking"}
          </h2>

          {/* 30-Second Countdown Progress Bar */}
          {phase === "ringing" && (
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] animate-spin">timer</span>
                  Response Timer
                </span>
                <span className={urgent ? "text-amber-300 text-sm font-black animate-bounce" : "text-white font-extrabold"}>
                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft} sec
                </span>
              </div>
              <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden p-0.5 border border-white/30">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                    urgent ? "bg-amber-400" : "bg-gradient-to-r from-emerald-400 to-teal-300"
                  }`}
                  style={{ width: `${100 - progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Customer Details Section ── */}
        <div className="p-5 space-y-4">
          {/* Customer Profile Row */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm">
            <Avatar src={incomingOrder.customer?.profilePhoto} name={customerName} size="lg" className="shadow-md" />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-extrabold text-slate-900 truncate">{customerName}</h3>
              <p className="text-xs font-semibold text-purple-700 flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[14px]">call</span>
                {customerPhone}
              </p>
            </div>
            <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
              Customer
            </span>
          </div>

          {/* Services Items */}
          <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 border border-slate-200/80">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
              Required Services ({incomingOrder.items?.length || 1})
            </span>
            {(incomingOrder.items || []).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 min-w-0 font-bold text-slate-800">
                  <span className="material-symbols-outlined text-purple-700 text-[16px] shrink-0">
                    {item.icon || "handyman"}
                  </span>
                  <span className="truncate">{item.name}</span>
                </div>
                <span className="font-extrabold text-slate-900 shrink-0">×{item.qty || 1}</span>
              </div>
            ))}
          </div>

          {/* Address & Slot */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 block">Address</span>
              <p className="text-xs font-bold text-slate-900 truncate">
                {incomingOrder.address?.line1 || incomingOrder.address?.address || "Customer Address"}
              </p>
              <p className="text-[10px] font-semibold text-slate-500 truncate">
                {incomingOrder.address?.city || "Pune"}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 block">Time Slot</span>
              <p className="text-xs font-bold text-slate-900">{incomingOrder.slot?.date || "Today"}</p>
              <p className="text-[10px] font-semibold text-amber-700">{incomingOrder.slot?.time || "Immediate"}</p>
            </div>
          </div>

          {/* Earnings Money Box */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/90 shadow-sm">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">Net Payout (Earnings)</span>
              <span className="text-2xl font-black text-emerald-700">₹{amount}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[24px]">payments</span>
            </div>
          </div>

          {/* ── Accept / Reject Buttons ── */}
          {phase === "ringing" && (
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleReject({ reason: "manual" })}
                className="flex-1 py-3.5 rounded-2xl border-2 border-slate-200 hover:border-red-400 bg-white hover:bg-red-50 text-red-600 text-xs font-black transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
                Decline
              </button>

              <button
                type="button"
                onClick={handleAccept}
                className="flex-[2] py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:opacity-95 text-white text-sm font-black shadow-xl shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 animate-pulse"
              >
                <span className="material-symbols-outlined text-[20px] text-amber-300 fill">bolt</span>
                <span>ACCEPT BOOKING</span>
              </button>
            </div>
          )}

          {phase === "accepted" && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl text-center">
              <p className="text-xs font-black text-emerald-950 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Order Assigned! Opening active job tracking…
              </p>
            </div>
          )}

          {phase === "rejected" && (
            <div className="p-3 bg-slate-100 border border-slate-300 rounded-2xl text-center">
              <p className="text-xs font-bold text-slate-700">Request declined. Looking for other partners…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

