import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import LiveTrackingMap from "../components/LiveTrackingMap";
import Button from "../components/Button";
import { useSocket } from "../context/SocketContext";
import bookingService from "../services/bookingService";

export default function BookingTracking() {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { socket } = useSocket();

  // Check initial state from route
  const navState = location.state || {};
  const isInitiallyAssigned =
    Boolean(navState.worker) ||
    (navState.status && navState.status !== "PENDING");

  const [workerAssigned, setWorkerAssigned] = useState(isInitiallyAssigned);
  const [bookingStatus, setBookingStatus] = useState(navState.status || (isInitiallyAssigned ? "ON_THE_WAY" : "PENDING"));
  const [searchingDots, setSearchingDots] = useState(".");
  const [callAlert, setCallAlert] = useState(false);
  const [dismissedBanner, setDismissedBanner] = useState(false);
  const [assignedToast, setAssignedToast] = useState(false);
  const [startOtp] = useState(Math.floor(1000 + Math.random() * 9000));

  const [bookingData, setBookingData] = useState({
    bookingNumber: navState.bookingNumber || bookingId || "BK-948210",
    _id: navState._id || null,
    address: navState.address || "Service Destination",
    lat: navState.lat || 18.5793,
    lng: navState.lng || 73.9787,
    slot: navState.slot || "Today · 11:00 AM",
    payable: navState.payable || 599,
    paymentMethod: navState.paymentMethod || "ONLINE",
  });

  const [workerInfo, setWorkerInfo] = useState(
    navState.worker
      ? {
          name: navState.worker.user?.name || "Ramesh Pawar",
          phone: navState.worker.user?.phone || "+91 98201 44321",
          vehicle: "Hero Electric · MH 12 EQ 4410",
          rating: navState.worker.rating || 4.9,
          cooperative: navState.worker.cooperative?.name || "Pune Urban Co-op",
        }
      : {
          name: "Ramesh Pawar",
          phone: "+91 98201 44321",
          vehicle: "Hero Electric · MH 12 EQ 4410",
          rating: 4.9,
          cooperative: "Pune Urban Co-op",
        }
  );

  // Fetch real booking from backend by bookingId or bookingNumber
  useEffect(() => {
    let isMounted = true;
    async function loadBooking() {
      if (!bookingId) return;
      try {
        const res = await bookingService.getBookingById(bookingId);
        const b = res.data?.booking;
        if (b && isMounted) {
          const isAssigned = b.status !== "PENDING" || Boolean(b.worker);
          setWorkerAssigned(isAssigned);
          setBookingStatus(b.status || "ASSIGNED");

          setBookingData((prev) => ({
            ...prev,
            bookingNumber: b.bookingNumber || prev.bookingNumber,
            _id: b._id || prev._id,
            address: b.address?.line1 || prev.address,
            lat: b.address?.lat || prev.lat,
            lng: b.address?.lng || prev.lng,
            slot: `${b.slot?.date} · ${b.slot?.time}`,
            payable: b.pricing?.totalAmount || prev.payable,
            paymentMethod: b.pricing?.paymentMethod || prev.paymentMethod,
          }));

          if (b.worker) {
            setWorkerInfo({
              name: b.worker.user?.name || "Ramesh Pawar",
              phone: b.worker.user?.phone || "+91 98201 44321",
              vehicle: "Hero Electric · MH 12 EQ 4410",
              rating: b.worker.rating || 4.9,
              cooperative: b.cooperative?.name || "Pune Urban Co-op",
            });
          }
        }
      } catch (err) {
        console.warn("Could not fetch real-time booking via ID, using state/default:", err.message);
      }
    }

    loadBooking();
    return () => {
      isMounted = false;
    };
  }, [bookingId]);

  // Listen for worker_assigned socket event
  useEffect(() => {
    if (!socket) return;

    const handleWorkerAssigned = (data) => {
      console.log("[Customer UI] Worker assigned event received:", data);
      setWorkerAssigned(true);
      setBookingStatus("ASSIGNED");
      setAssignedToast(true);

      if (data.worker) {
        setWorkerInfo({
          name: data.worker.user?.name || "Verified Partner",
          phone: data.worker.user?.phone || "+91 98201 44321",
          vehicle: "Hero Electric · MH 12 EQ 4410",
          rating: data.worker.rating || 4.9,
          cooperative: "Pune Urban Co-op",
        });
      }

      setTimeout(() => setAssignedToast(false), 4000);
    };

    socket.on("worker_assigned", handleWorkerAssigned);

    return () => {
      socket.off("worker_assigned", handleWorkerAssigned);
    };
  }, [socket]);

  // Animated dots for searching state
  useEffect(() => {
    if (workerAssigned) return;
    const timer = setInterval(() => {
      setSearchingDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 500);
    return () => clearInterval(timer);
  }, [workerAssigned]);

  // Generate dynamic timeline steps based on bookingStatus
  const getTimelineSteps = () => {
    const isPending = !workerAssigned && bookingStatus === "PENDING";
    return [
      { id: 1, title: "Order Confirmed", desc: "Booking received and verified", completed: true, time: "Just now" },
      {
        id: 2,
        title: "Partner Assigned",
        desc: isPending ? "Matching nearby certified worker..." : `Assigned to ${workerInfo.name}`,
        completed: !isPending,
        current: isPending,
        time: isPending ? "Searching" : "Assigned",
      },
      {
        id: 3,
        title: "On The Way",
        desc: `${workerInfo.name} is traveling to your location`,
        completed: ["IN_PROGRESS", "COMPLETED"].includes(bookingStatus),
        current: ["ASSIGNED", "ACCEPTED", "ON_THE_WAY"].includes(bookingStatus) && !isPending,
        time: "Live GPS",
      },
      {
        id: 4,
        title: "Arrived at Doorstep",
        desc: "Share start OTP to begin service",
        completed: ["IN_PROGRESS", "COMPLETED"].includes(bookingStatus),
        current: bookingStatus === "ARRIVED",
        time: "Est. 12 mins",
      },
      {
        id: 5,
        title: "Service in Progress",
        desc: "Work being completed professionally",
        completed: bookingStatus === "COMPLETED",
        current: bookingStatus === "IN_PROGRESS",
        time: bookingStatus === "IN_PROGRESS" ? "Active" : "Pending",
      },
      {
        id: 6,
        title: "Completed & Feedback",
        desc: "Review partner and pay (if COD)",
        completed: bookingStatus === "COMPLETED",
        time: bookingStatus === "COMPLETED" ? "Done" : "Pending",
      },
    ];
  };

  const timelineSteps = getTimelineSteps();

  return (
    <div className="min-h-screen bg-surface-container-lowest md:bg-surface pb-24">
      {/* Searching for Worker Banner - ONLY shown when searching & not yet assigned */}
      {!workerAssigned && bookingStatus === "PENDING" && !dismissedBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-800 via-brand-purple to-indigo-800 text-white text-center py-2.5 px-4 text-xs sm:text-sm font-semibold shadow-xl flex items-center justify-between gap-3 animate-slide-down">
          <div className="flex items-center justify-center gap-2.5 flex-1">
            <svg className="w-4 h-4 animate-spin shrink-0 text-amber-300" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Searching for nearby verified workers{searchingDots} Please wait.</span>
          </div>
          <button
            type="button"
            onClick={() => setDismissedBanner(true)}
            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xs transition-colors shrink-0"
            title="Dismiss banner"
          >
            ✕
          </button>
        </div>
      )}

      {/* Worker Assigned Success Notification Toast */}
      {assignedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[24px]">verified</span>
          <div>
            <p className="text-sm font-bold">Worker Partner Assigned!</p>
            <p className="text-xs text-emerald-100">{workerInfo.name} is on the way to your location.</p>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-slate-900 text-white flex items-center justify-between px-4 sm:px-6 py-3.5 shadow-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/customer/bookings")}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Live Order Tracking</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h1>
            <p className="text-[11px] text-slate-400">Booking #{bookingData.bookingNumber}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/customer")}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-5">
        {/* Live Map */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-brand-purple text-[18px]">near_me</span>
              Live GPS Navigation
            </span>
            <span className="text-xs text-brand-purple font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
              Tracking Active
            </span>
          </div>

          <LiveTrackingMap
            userLocation={{
              lat: bookingData.lat || 18.5793,
              lng: bookingData.lng || 73.9787,
              address: bookingData.address,
            }}
            workerInfo={workerInfo}
            height="360px"
            status={bookingStatus}
          />
        </div>

        {/* Worker Card */}
        <div className="bg-white border border-outline-variant/80 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-purple to-primary text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                {workerInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2) || "RP"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-on-surface">{workerInfo.name}</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px] fill">verified</span>
                    Verified Worker
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant flex items-center gap-2 mt-0.5">
                  <span className="text-amber-500 font-bold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px] fill">star</span>
                    {workerInfo.rating}
                  </span>
                  <span>•</span>
                  <span>140+ completed jobs</span>
                  <span>•</span>
                  <span className="text-brand-purple font-semibold">{workerInfo.cooperative}</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">two_wheeler</span>
                  Vehicle: {workerInfo.vehicle}
                </p>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex items-center gap-2 sm:self-center">
              <button
                type="button"
                onClick={() => setCallAlert(true)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                Call Worker
              </button>
              <button
                type="button"
                onClick={() => alert("Connecting to SevaSetu Support representative...")}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
              >
                <span className="material-symbols-outlined text-[16px]">support_agent</span>
                Support
              </button>
            </div>
          </div>

          {callAlert && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
              <span>
                Calling {workerInfo.name} at <strong>{workerInfo.phone}</strong>...
              </span>
              <button type="button" onClick={() => setCallAlert(false)} className="font-bold underline">
                Dismiss
              </button>
            </div>
          )}
        </div>

        {/* Start OTP Card */}
        <div className="bg-gradient-to-r from-brand-purple-light/80 via-purple-50 to-indigo-50 border border-brand-purple/30 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-purple text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">pin</span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-brand-purple tracking-wider">
                Service Start OTP
              </span>
              <p className="text-xs text-slate-600">
                Share this code with {workerInfo.name.split(" ")[0]} upon arrival to begin work
              </p>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-brand-purple tracking-widest bg-white px-4 py-1.5 rounded-xl border border-brand-purple/30 shadow-inner">
            {startOtp}
          </div>
        </div>

        {/* Live Timeline Stepper */}
        <div className="bg-white border border-outline-variant/80 rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-black text-on-surface uppercase tracking-wide flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-brand-purple">timeline</span>
            Service Progress Timeline
          </h2>

          <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {timelineSteps.map((step) => (
              <div key={step.id} className="relative flex items-start gap-3.5 pl-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-[12px] font-bold ${
                    step.completed
                      ? "bg-emerald-500 text-white"
                      : step.current
                      ? "bg-brand-purple text-white ring-4 ring-purple-100"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step.completed ? (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  ) : (
                    step.id
                  )}
                </div>
                <div className="flex-1 flex items-start justify-between">
                  <div>
                    <h4
                      className={`text-xs sm:text-sm font-bold ${
                        step.current ? "text-brand-purple" : "text-on-surface"
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant">{step.desc}</p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold ${
                      step.current ? "text-brand-purple" : "text-slate-400"
                    }`}
                  >
                    {step.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="purple"
            className="flex-1 justify-center py-3"
            onClick={() => navigate("/customer/bookings")}
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            View in My Bookings
          </Button>
          <Button
            variant="outline"
            className="flex-1 justify-center py-3"
            onClick={() => navigate("/customer")}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
