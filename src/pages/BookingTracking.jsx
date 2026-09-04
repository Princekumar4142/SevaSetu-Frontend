import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import LiveTrackingMap from "../components/LiveTrackingMap";
import Button from "../components/Button";
import { useSocket } from "../context/SocketContext";
import bookingService from "../services/bookingService";
import Avatar from "../components/Avatar";

export default function BookingTracking() {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { socket } = useSocket();

  // Check initial state from route navigation
  const navState = location.state || {};
  const isInitiallyAssigned =
    Boolean(navState.worker) ||
    (navState.status && navState.status !== "PENDING");

  const [workerAssigned, setWorkerAssigned] = useState(isInitiallyAssigned);
  const [bookingStatus, setBookingStatus] = useState(
    navState.status || (isInitiallyAssigned ? "ON_THE_WAY" : "PENDING")
  );
  const [searchingDots, setSearchingDots] = useState(".");
  const [callAlert, setCallAlert] = useState(false);
  const [dismissedBanner, setDismissedBanner] = useState(false);
  const [assignedToast, setAssignedToast] = useState(false);

  const [bookingData, setBookingData] = useState({
    bookingNumber: navState.bookingNumber || bookingId || "BK-" + Math.floor(100000 + Math.random() * 900000),
    _id: navState._id || null,
    address: navState.address || "Service Destination Address",
    lat: navState.lat || 18.5793,
    lng: navState.lng || 73.9787,
    slot: navState.slot || "Today · 11:00 AM",
    payable: navState.payable || 599,
    paymentMethod: navState.paymentMethod || "ONLINE",
  });

  const [workerInfo, setWorkerInfo] = useState(
    navState.worker
      ? {
          name: navState.worker.user?.name || "Verified Worker Partner",
          phone: navState.worker.user?.phone || "",
          profilePhoto: navState.worker.user?.profilePhoto || "",
          vehicle: "Service Vehicle",
          rating: navState.worker.rating || 4.9,
          cooperative: navState.worker.cooperative?.name || "Cooperative Network",
        }
      : null
  );

  // Fetch real booking status from backend by bookingId or bookingNumber with 3s polling until assigned
  useEffect(() => {
    let isMounted = true;
    async function loadBooking() {
      if (!bookingId) return;
      try {
        const res = await bookingService.getBookingById(bookingId);
        const b = res.data?.booking;
        if (b && isMounted) {
          const isAssigned = b.status !== "PENDING" || Boolean(b.worker);
          if (isAssigned) {
            setWorkerAssigned(true);
            setBookingStatus(b.status || "ASSIGNED");
          }

          setBookingData((prev) => ({
            ...prev,
            bookingNumber: b.bookingNumber || prev.bookingNumber,
            _id: b._id || prev._id,
            address: b.address?.line1 || prev.address,
            lat: b.address?.lat || prev.lat,
            lng: b.address?.lng || prev.lng,
            slot: b.slot ? `${b.slot.date} · ${b.slot.time}` : prev.slot,
            payable: b.pricing?.totalAmount || prev.payable,
            paymentMethod: b.pricing?.paymentMethod || prev.paymentMethod,
          }));

          if (b.worker) {
            setWorkerInfo({
              name: b.worker.user?.name || "Verified Partner",
              phone: b.worker.user?.phone || "",
              profilePhoto: b.worker.user?.profilePhoto || "",
              vehicle: "Service Vehicle",
              rating: b.worker.rating || 4.9,
              cooperative: b.cooperative?.name || "Cooperative Network",
            });
          }
        }
      } catch (err) {
        console.warn("Could not fetch real-time booking via ID:", err.message);
      }
    }

    loadBooking();
    const pollInterval = setInterval(() => {
      loadBooking();
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, [bookingId]);

  // Listen for real-time worker_assigned, booking_updated, and status_updated socket events
  useEffect(() => {
    if (!socket) return;

    const handleWorkerAssigned = (data) => {
      console.log("[Customer UI] Worker assigned event received via Socket:", data);
      setWorkerAssigned(true);
      setBookingStatus("ASSIGNED");
      setAssignedToast(true);

      if (data.worker) {
        setWorkerInfo({
          name: data.worker.user?.name || "Verified Partner",
          phone: data.worker.user?.phone || "",
          profilePhoto: data.worker.user?.profilePhoto || "",
          vehicle: "Service Vehicle",
          rating: data.worker.rating || 4.9,
          cooperative: data.worker.cooperative?.name || "Cooperative Network",
        });
      }

      setTimeout(() => setAssignedToast(false), 5000);
    };

    const handleBookingUpdated = (data) => {
      console.log("[Customer UI] Live booking status updated via Socket:", data);
      if (
        data.orderId === bookingId ||
        data.bookingNumber === bookingData.bookingNumber ||
        data.orderId === bookingData._id
      ) {
        if (data.status) {
          setBookingStatus(data.status);
          if (data.status !== "PENDING") {
            setWorkerAssigned(true);
          }
        }
        if (data.booking?.worker) {
          const w = data.booking.worker;
          setWorkerInfo({
            name: w.user?.name || "Verified Partner",
            phone: w.user?.phone || "",
            profilePhoto: w.user?.profilePhoto || "",
            vehicle: "Service Vehicle",
            rating: w.rating || 4.9,
            cooperative: w.cooperative?.name || "Cooperative Network",
          });
        }
      }
    };

    socket.on("worker_assigned", handleWorkerAssigned);
    socket.on("booking_updated", handleBookingUpdated);
    socket.on("status_updated", handleBookingUpdated);

    return () => {
      socket.off("worker_assigned", handleWorkerAssigned);
      socket.off("booking_updated", handleBookingUpdated);
      socket.off("status_updated", handleBookingUpdated);
    };
  }, [socket, bookingId, bookingData.bookingNumber, bookingData._id]);

  // Animated searching dots when waiting for worker assignment
  useEffect(() => {
    if (workerAssigned) return;
    const timer = setInterval(() => {
      setSearchingDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 500);
    return () => clearInterval(timer);
  }, [workerAssigned]);

  // Generate dynamic timeline steps based on real bookingStatus & workerInfo
  const getTimelineSteps = () => {
    const isPending = !workerAssigned && bookingStatus === "PENDING";
    const workerName = workerInfo?.name || "Worker Partner";

    return [
      { id: 1, title: "Order Confirmed", desc: "Booking received and broadcasted", completed: true, time: "Just now" },
      {
        id: 2,
        title: "Partner Assigned",
        desc: isPending ? "Broadcasting to nearby certified workers..." : `Accepted by ${workerName}`,
        completed: !isPending,
        current: isPending,
        time: isPending ? "Broadcasting" : "Assigned",
      },
      {
        id: 3,
        title: "On The Way",
        desc: isPending ? "Waiting for worker to accept" : `${workerName} is traveling to your location`,
        completed: ["IN_PROGRESS", "COMPLETED"].includes(bookingStatus),
        current: ["ASSIGNED", "ACCEPTED", "ON_THE_WAY"].includes(bookingStatus) && !isPending,
        time: isPending ? "Pending" : "Live GPS",
      },
      {
        id: 4,
        title: "Arrived at Doorstep",
        desc: "Worker has arrived at your service location",
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
        desc: "Review partner and complete payment",
        completed: bookingStatus === "COMPLETED",
        time: bookingStatus === "COMPLETED" ? "Done" : "Pending",
      },
    ];
  };

  const timelineSteps = getTimelineSteps();

  return (
    <div className="min-h-screen bg-surface-container-lowest md:bg-surface pb-24">
      {/* Top Navigation Header */}
      <div className="sticky top-0 z-40 bg-slate-900 text-white flex items-center justify-between px-4 sm:px-6 py-3.5 shadow-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/customer/bookings")}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
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
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      {/* Searching for Worker Alert Bar (Only shown when status is PENDING) */}
      {!workerAssigned && bookingStatus === "PENDING" && !dismissedBanner && (
        <div className="bg-gradient-to-r from-purple-800 via-brand-purple to-indigo-800 text-white text-center py-2.5 px-4 text-xs sm:text-sm font-semibold shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center justify-center gap-2.5 flex-1 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping shrink-0" />
            <span className="truncate">Broadcasting booking to nearby workers{searchingDots} Please wait.</span>
          </div>
          <button
            type="button"
            onClick={() => setDismissedBanner(true)}
            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xs transition-colors shrink-0 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Real-time Worker Accepted Toast Notification */}
      {assignedToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce max-w-[90vw]">
          <span className="material-symbols-outlined text-[24px] shrink-0">verified</span>
          <div>
            <p className="text-sm font-bold">Worker Accepted Your Booking!</p>
            <p className="text-xs text-emerald-100">{workerInfo?.name} accepted and is preparing for your job.</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-5">
        {/* Live GPS Map Container */}
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
            workerInfo={workerInfo || { name: "Searching Partner", phone: "", rating: 4.9 }}
            height="360px"
            status={bookingStatus}
          />
        </div>

        {/* ── Dynamic Worker Status Card ── */}
        {workerAssigned && workerInfo ? (
          /* Case A: Worker Has Accepted — Show Real Worker Card & Call Info */
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <Avatar src={workerInfo.profilePhoto} name={workerInfo.name} size="xl" className="shadow-md" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{workerInfo.name}</h3>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px] fill">verified</span>
                      Accepted Job
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span className="text-amber-500 font-bold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px] fill">star</span>
                      {workerInfo.rating || 4.9}
                    </span>
                    <span>•</span>
                    <span className="text-brand-purple font-semibold">{workerInfo.cooperative}</span>
                  </p>
                  {workerInfo.phone && (
                    <p className="text-xs font-semibold text-slate-700 mt-1">
                      Mobile: {workerInfo.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="flex items-center gap-2 sm:self-center">
                {workerInfo.phone && (
                  <a
                    href={`tel:${workerInfo.phone}`}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer no-underline"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    Call Worker
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => alert("Connecting to SevaSetu Support representative...")}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">support_agent</span>
                  Support
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Case B: Searching for Worker — No Worker Assigned Yet */
          <div className="bg-white border border-purple-100 rounded-2xl p-6 shadow-sm text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-brand-purple flex items-center justify-center mx-auto shadow-inner border border-purple-200">
              <span className="material-symbols-outlined text-[32px] animate-spin">sync</span>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Broadcasting Request to Nearby Workers...</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                Your order request is live. When a nearby verified worker accepts your booking, their photo, name, and phone contact will update here in real-time.
              </p>
            </div>
          </div>
        )}

        {/* Live Timeline Stepper */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
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
                        step.current ? "text-brand-purple" : "text-slate-900"
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">{step.desc}</p>
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

        {/* Bottom Action Buttons */}
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
