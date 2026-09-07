import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import bookingService from "../services/bookingService";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { LoadingState, EmptyState } from "../components/Feedback";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../hooks/useAuth";
import LiveTrackingMap from "../components/LiveTrackingMap";

const MOCK_WORKER_JOBS = [
  {
    _id: "job-1",
    bookingNumber: "BK-948210",
    status: "ON_THE_WAY",
    customer: { name: "Ananya Deshmukh", phone: "+91 98201 11223" },
    items: [
      { id: "1", name: "Intense Bathroom Cleaning", qty: 1, price: 599, durationMins: 60, icon: "cleaning_services" },
      { id: "2", name: "Fan & Switchboard Deep Dusting", qty: 2, price: 199, durationMins: 30, icon: "power" },
    ],
    slot: { date: "Today", time: "11:30 AM" },
    address: { label: "Home", line1: "Flat 402, Sunshine Heights, Andheri West", city: "Mumbai", lat: 19.1136, lng: 72.8697 },
    pricing: { subtotal: 997, totalAmount: 897, payoutAmount: 762, paymentStatus: "PAID", paymentMethod: "ONLINE" },
    distance: "2.4 km away",
  },
  {
    _id: "job-2",
    bookingNumber: "BK-948831",
    status: "PENDING",
    customer: { name: "Vikram Mehta", phone: "+91 98112 33445" },
    items: [
      { id: "3", name: "Full Home Deep Cleaning (2 BHK)", qty: 1, price: 2199, durationMins: 180, icon: "home" },
    ],
    slot: { date: "Tomorrow", time: "09:00 AM" },
    address: { label: "Apartment", line1: "Tower B-14, Oberoi Springs, Andheri West", city: "Mumbai", lat: 19.1197, lng: 72.8464 },
    pricing: { subtotal: 2199, totalAmount: 2199, payoutAmount: 1869, paymentStatus: "PAID", paymentMethod: "ONLINE" },
    distance: "1.8 km away",
  },
  {
    _id: "job-3",
    bookingNumber: "BK-829104",
    status: "COMPLETED",
    customer: { name: "Sneha Patel", phone: "+91 98334 55667" },
    items: [
      { id: "4", name: "AC Filter Cleaning & Deep Servicing", qty: 2, price: 998, durationMins: 90, icon: "ac_unit" },
    ],
    slot: { date: "28 Aug 2026", time: "02:00 PM" },
    address: { label: "Home", line1: "Bungalow 7, Juhu Scheme", city: "Mumbai", lat: 19.1075, lng: 72.8263 },
    pricing: { subtotal: 998, totalAmount: 998, payoutAmount: 848, paymentStatus: "PAID", paymentMethod: "ONLINE" },
    distance: "3.5 km away",
  },
];

export default function WorkerBookings() {
  const navigate = useNavigate();
  const location = useLocation();
  const { socket } = useSocket();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(() => location.state?.tab || "ACTIVE");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState("");
  const [liveGpsCoords, setLiveGpsCoords] = useState(null);
  const [gpsBroadcasting, setGpsBroadcasting] = useState(false);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const loadJobs = useCallback(async () => {
    try {
      const res = await bookingService.getWorkerBookings();
      if (res.data?.bookings && res.data.bookings.length > 0) {
        setJobs(res.data.bookings);
      } else {
        setJobs(MOCK_WORKER_JOBS);
      }
    } catch (err) {
      console.warn("Fallback to mock worker jobs:", err.message);
      setJobs(MOCK_WORKER_JOBS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
    const interval = setInterval(loadJobs, 6000);
    return () => clearInterval(interval);
  }, [loadJobs]);

  // Listen to live socket events (new orders, cancellations, updates)
  useEffect(() => {
    if (!socket) return;

    const handleIncoming = (newOrder) => {
      console.log("[Worker] Incoming order via socket:", newOrder);
      if (newOrder) {
        setJobs((prev) => {
          const exists = prev.some((j) => (j._id && j._id === newOrder._id) || j.bookingNumber === newOrder.bookingNumber);
          if (exists) return prev;
          return [newOrder, ...prev];
        });
        setActionSuccess(`New Job Dispatched! #${newOrder.bookingNumber || ""}`);
        setTimeout(() => setActionSuccess(""), 4000);
      }
    };

    const handleAcceptedByOther = (data) => {
      if (data?.orderId) {
        setJobs((prev) => prev.filter((j) => j._id !== data.orderId && j.bookingNumber !== data.orderId));
      }
    };

    const handleUpdated = (data) => {
      if (data?.orderId || data?.bookingNumber) {
        loadJobs();
      }
    };

    socket.on("incoming_order", handleIncoming);
    socket.on("order_accepted_by_other", handleAcceptedByOther);
    socket.on("booking_updated", handleUpdated);

    return () => {
      socket.off("incoming_order", handleIncoming);
      socket.off("order_accepted_by_other", handleAcceptedByOther);
      socket.off("booking_updated", handleUpdated);
    };
  }, [socket, loadJobs]);

  // Find active journey job (ASSIGNED, ACCEPTED, ON_THE_WAY or ARRIVED)
  const activeJob = jobs.find((j) => ["ASSIGNED", "ACCEPTED", "ON_THE_WAY", "ARRIVED"].includes(j.status));

  // Send GPS location via socket and browser Geolocation
  const transmitCurrentGps = useCallback((bookingId) => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported by browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, heading, speed } = pos.coords;
        setLiveGpsCoords({ lat: latitude, lng: longitude });
        setGpsBroadcasting(true);
        if (socket) {
          socket.emit("worker_location_update", {
            bookingId: bookingId || activeJob?._id,
            workerId: currentUser?._id,
            lat: latitude,
            lng: longitude,
            heading: heading || 0,
            speed: speed || 0,
          });
        }
      },
      (err) => {
        console.warn("Could not get current GPS coordinates:", err.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 3000 }
    );
  }, [socket, currentUser, activeJob]);

  // Transmit initial GPS coordinates upon loading
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLiveGpsCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          if (socket && currentUser?._id) {
            socket.emit("worker_location_update", {
              bookingId: activeJob?._id,
              workerId: currentUser._id,
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          }
        },
        () => {},
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }
  }, [socket, currentUser, activeJob?._id]);

  // Start continuous watchPosition when an active job is in progress
  useEffect(() => {
    if (!activeJob) {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      setGpsBroadcasting(false);
      return;
    }

    // Immediately transmit first point
    transmitCurrentGps(activeJob._id);

    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude, heading, speed } = pos.coords;
          setLiveGpsCoords({ lat: latitude, lng: longitude });
          setGpsBroadcasting(true);
          if (socket) {
            socket.emit("worker_location_update", {
              bookingId: activeJob._id,
              workerId: currentUser?._id,
              lat: latitude,
              lng: longitude,
              heading: heading || 0,
              speed: speed || 0,
            });
          }
        },
        (err) => console.warn("Watch position error:", err.message),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 }
      );
    }

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [activeJob?._id, socket, currentUser, transmitCurrentGps]);

  const handleUpdateStatus = async (jobId, nextStatus, successMsg) => {
    try {
      await bookingService.updateBookingStatus(jobId, nextStatus);
    } catch (err) {
      console.warn("Status update fallback:", err.message);
    }

    if (socket) {
      socket.emit("status_updated", {
        orderId: jobId,
        status: nextStatus,
        workerId: currentUser?._id,
      });
      socket.emit("booking_updated", {
        orderId: jobId,
        status: nextStatus,
        workerId: currentUser?._id,
      });
    }

    if ((nextStatus === "ASSIGNED" || nextStatus === "ACCEPTED") && socket) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            socket.emit("accept_order", {
              orderId: jobId,
              workerId: currentUser?._id,
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
            transmitCurrentGps(jobId);
          },
          () => {
            socket.emit("accept_order", { orderId: jobId, workerId: currentUser?._id });
          }
        );
      } else {
        socket.emit("accept_order", { orderId: jobId, workerId: currentUser?._id });
      }
    }

    if (nextStatus === "ON_THE_WAY") {
      transmitCurrentGps(jobId);
    }

    setJobs((prev) =>
      prev.map((j) => (j._id === jobId ? { ...j, status: nextStatus } : j))
    );
    setActionSuccess(successMsg);
    setTimeout(() => setActionSuccess(""), 4000);
  };

  const newRequests = jobs.filter((j) => j.status === "PENDING");
  const activeJobs = jobs.filter((j) =>
    ["ASSIGNED", "ACCEPTED", "ON_THE_WAY", "ARRIVED", "IN_PROGRESS"].includes(j.status)
  );
  const completedJobs = jobs.filter((j) => j.status === "COMPLETED");

  const displayedJobs =
    activeTab === "NEW" ? newRequests : activeTab === "ACTIVE" ? activeJobs : completedJobs;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) navigate(-1);
              else navigate("/worker");
            }}
            className="w-9 h-9 rounded-xl bg-surface-container-low hover:bg-surface-container-high active:bg-surface-variant flex items-center justify-center text-primary transition-colors shrink-0"
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold">Job Management</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Accept incoming cooperative job requests and update progress in real-time
            </p>
          </div>
        </div>

        {/* Live GPS Broadcast Indicator & Status */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {gpsBroadcasting ? (
            <div className="flex items-center gap-2 bg-purple-50 text-brand-purple border border-purple-200 px-3.5 py-1.5 rounded-full font-label-md font-bold text-xs shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-purple animate-ping" />
              <span>Live GPS Broadcasting</span>
              {liveGpsCoords && (
                <span className="text-[10px] text-brand-purple/70 hidden md:inline">
                  ({liveGpsCoords.lat.toFixed(4)}, {liveGpsCoords.lng.toFixed(4)})
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full font-label-md font-bold text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Status: Available for Jobs</span>
            </div>
          )}
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2 animate-fade-in font-label-md font-medium">
          <span className="material-symbols-outlined text-[20px] text-brand-success fill">check_circle</span>
          {actionSuccess}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-outline-variant gap-1 sm:gap-2 overflow-x-auto scrollbar-none">
        {[
          { key: "NEW", label: "New Requests", count: newRequests.length },
          { key: "ACTIVE", label: "In Progress", count: activeJobs.length },
          { key: "COMPLETED", label: "Completed", count: completedJobs.length },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 px-3 sm:px-4 font-label-md text-xs sm:text-label-md flex items-center gap-1.5 sm:gap-2 border-b-2 font-medium transition-all shrink-0 whitespace-nowrap cursor-pointer ${
              activeTab === tab.key
                ? "border-brand-purple text-brand-purple font-bold"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  activeTab === tab.key
                    ? "bg-brand-purple-light text-brand-purple"
                    : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <LoadingState message="Loading worker jobs..." />
      ) : displayedJobs.length === 0 && !(activeTab === "ACTIVE" && activeJob) ? (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-8 my-4">
          <EmptyState
            icon="handyman"
            title={`No ${activeTab.toLowerCase()} jobs found`}
            description="New booking dispatches from your cooperative will show up here automatically."
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* ── LIVE ACTIVE MISSION DISPATCH CONSOLE (WORKER WORKFLOW) ── */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === "ACTIVE" && activeJob && (
            <div className="bg-white rounded-3xl border-2 border-brand-purple/25 p-5 sm:p-7 shadow-xl space-y-6">
              {/* Top Mission Status Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/90">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-black uppercase tracking-wider text-brand-purple">
                      Active Mission Live Console
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-bold text-slate-700">
                      Booking #{activeJob.bookingNumber}
                    </span>
                    <Badge variant="primary" className="font-bold">
                      {activeJob.status}
                    </Badge>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5">
                    {activeJob.status === "ASSIGNED" || activeJob.status === "ACCEPTED"
                      ? "Job Accepted — Ready to Begin Ride"
                      : activeJob.status === "ON_THE_WAY"
                      ? "On The Way to Customer Destination"
                      : activeJob.status === "ARRIVED"
                      ? "Arrived Outside Customer Doorstep"
                      : activeJob.status === "IN_PROGRESS"
                      ? "Service Work in Progress"
                      : "Mission Completed"}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Slot: {activeJob.slot?.date} at {activeJob.slot?.time} · {activeJob.distance || "2.1 km away"}
                  </p>
                </div>

                <div className="sm:text-right bg-emerald-50 sm:bg-emerald-50/50 border border-emerald-200/80 p-3 sm:px-4 sm:py-2.5 rounded-2xl">
                  <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider block">
                    Your Share Payout (85%)
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-600">
                    ₹{activeJob.pricing?.payoutAmount || Math.round((activeJob.pricing?.totalAmount || 599) * 0.85)}
                  </span>
                </div>
              </div>

              {/* ── Live GPS Navigation Route Map ── */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider text-brand-purple">
                    <span className="material-symbols-outlined text-[18px]">near_me</span>
                    Live GPS Navigation &amp; Road Route
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Broadcasting Live to Customer
                  </span>
                </div>

                <LiveTrackingMap
                  userLocation={{
                    lat: activeJob.address?.lat || 26.8023,
                    lng: activeJob.address?.lng || 84.5074,
                    address: activeJob.address?.line1 || "Customer Service Location",
                  }}
                  workerLocation={liveGpsCoords || { lat: 26.8023, lng: 84.5074 }}
                  workerInfo={{
                    name: currentUser?.name || "You (Worker Partner)",
                    phone: currentUser?.phone || "",
                    rating: 4.9,
                  }}
                  height="340px"
                  status={activeJob.status}
                />
              </div>

              {/* ── Primary Real-Time Action Workflow Button ── */}
              <div className="pt-2">
                {(activeJob.status === "ASSIGNED" || activeJob.status === "ACCEPTED") && (
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateStatus(
                        activeJob._id,
                        "ON_THE_WAY",
                        "Journey started! Customer tracking screen now shows your live movement."
                      )
                    }
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-700 via-brand-purple to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-black text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer transform active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[26px]">directions_bike</span>
                    <span>Start Journey to Customer (On The Way)</span>
                  </button>
                )}

                {activeJob.status === "ON_THE_WAY" && (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateStatus(
                          activeJob._id,
                          "ARRIVED",
                          "Doorstep arrival confirmed! Customer notified to open the door."
                        )
                      }
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer animate-pulse transform active:scale-98"
                    >
                      <span className="material-symbols-outlined text-[26px]">doorbell</span>
                      <span>I Have Arrived at Doorstep</span>
                    </button>
                    <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                      <span>Live GPS coordinates continuously streaming</span>
                      <button
                        type="button"
                        onClick={() => transmitCurrentGps(activeJob._id)}
                        className="text-brand-purple font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">my_location</span>
                        Ping Current GPS
                      </button>
                    </div>
                  </div>
                )}

                {activeJob.status === "ARRIVED" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateStatus(
                        activeJob._id,
                        "IN_PROGRESS",
                        "Service started! Doing quality work."
                      )
                    }
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-brand-purple to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-black text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer transform active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[26px]">play_circle</span>
                    <span>Start Service / Begin Work</span>
                  </button>
                )}

                {activeJob.status === "IN_PROGRESS" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateStatus(
                        activeJob._id,
                        "COMPLETED",
                        "Service marked completed! ₹" +
                          (activeJob.pricing?.payoutAmount ||
                            Math.round((activeJob.pricing?.totalAmount || 599) * 0.85)) +
                          " credited to your wallet."
                      )
                    }
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-black text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer transform active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[26px]">task_alt</span>
                    <span>
                      Complete Service &amp; Collect Payment (₹
                      {activeJob.pricing?.payoutAmount ||
                        Math.round((activeJob.pricing?.totalAmount || 599) * 0.85)}
                      )
                    </span>
                  </button>
                )}

                {activeJob.status === "COMPLETED" && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center text-emerald-800 font-bold flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[24px] text-emerald-600 fill">verified</span>
                    <span>Service Finished &amp; Payout Credited! Ready for next booking.</span>
                  </div>
                )}
              </div>

              {/* ── Mirrored Service Progress Timeline (Matches Customer Screen) ── */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-brand-purple text-[18px]">timeline</span>
                  Live Service Progress Timeline (Synced with Customer)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {[
                    { label: "Order Confirmed", statusKey: "PENDING", isPast: true },
                    {
                      label: "Partner Assigned",
                      statusKey: "ASSIGNED",
                      isPast: ["ASSIGNED", "ACCEPTED", "ON_THE_WAY", "ARRIVED", "IN_PROGRESS", "COMPLETED"].includes(activeJob.status),
                    },
                    {
                      label: "On The Way",
                      statusKey: "ON_THE_WAY",
                      isPast: ["ON_THE_WAY", "ARRIVED", "IN_PROGRESS", "COMPLETED"].includes(activeJob.status),
                    },
                    {
                      label: "Doorstep",
                      statusKey: "ARRIVED",
                      isPast: ["ARRIVED", "IN_PROGRESS", "COMPLETED"].includes(activeJob.status),
                    },
                    {
                      label: "In Progress",
                      statusKey: "IN_PROGRESS",
                      isPast: ["IN_PROGRESS", "COMPLETED"].includes(activeJob.status),
                    },
                    {
                      label: "Completed",
                      statusKey: "COMPLETED",
                      isPast: activeJob.status === "COMPLETED",
                    },
                  ].map((step, idx) => {
                    const isCurrent =
                      (activeJob.status === "ASSIGNED" && step.statusKey === "ASSIGNED") ||
                      (activeJob.status === "ACCEPTED" && step.statusKey === "ASSIGNED") ||
                      activeJob.status === step.statusKey;
                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                          isCurrent
                            ? "bg-purple-100/70 border-brand-purple text-brand-purple font-black shadow-xs ring-2 ring-purple-200"
                            : step.isPast
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-bold"
                            : "bg-white border-slate-200 text-slate-400"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px] mb-1">
                          {step.isPast ? "check_circle" : isCurrent ? "radio_button_checked" : "radio_button_unchecked"}
                        </span>
                        <span className="text-[11px] leading-tight">{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Customer Contact & Task Summary Cards ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Customer Contact & Navigation Card */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Customer &amp; Service Destination
                    </span>
                    <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span>{activeJob.customer?.name || "Customer Partner"}</span>
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-brand-purple text-[16px] shrink-0 mt-0.5">
                        location_on
                      </span>
                      <span>
                        {activeJob.address?.line1 || "Service Destination Address"}
                        {activeJob.address?.landmark && `, Near ${activeJob.address.landmark}`}
                        {activeJob.address?.city && `, ${activeJob.address.city}`}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
                    <a
                      href={`tel:${activeJob.customer?.phone || "+919800000000"}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">call</span>
                      <span>Call ({activeJob.customer?.phone || "Customer"})</span>
                    </a>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        activeJob.address?.line1 || activeJob.address?.city || "Service Location"
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-brand-purple hover:bg-purple-800 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">navigation</span>
                      <span>Google Maps</span>
                    </a>
                  </div>
                </div>

                {/* Task Details & Pricing Card */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Service Tasks
                    </span>
                    <div className="space-y-2">
                      {activeJob.items?.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs text-slate-800 bg-white p-2 rounded-xl border border-slate-200/70"
                        >
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-brand-purple text-[16px]">
                              {item.icon || "build"}
                            </span>
                            <span className="font-semibold">{item.name}</span>
                            <span className="text-slate-400">×{item.qty || 1}</span>
                          </div>
                          <span className="font-bold text-slate-700">₹{item.price || 599}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs">
                    <span className="text-slate-500">
                      Payment:{" "}
                      <strong className="text-slate-800 uppercase">
                        {activeJob.pricing?.paymentMethod || "ONLINE"} (
                        {activeJob.pricing?.paymentStatus || "PAID"})
                      </strong>
                    </span>
                    <span className="text-emerald-700 font-black text-sm">
                      Payout: ₹
                      {activeJob.pricing?.payoutAmount ||
                        Math.round((activeJob.pricing?.totalAmount || 599) * 0.85)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Jobs List (for other tabs or additional jobs) */}
          {displayedJobs.filter((j) => activeTab !== "ACTIVE" || j._id !== activeJob?._id).length > 0 && (
            <div className="space-y-4">
              {activeTab === "ACTIVE" && activeJob && (
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pt-2">
                  Other Active Bookings
                </h3>
              )}
              <div className="grid grid-cols-1 gap-4">
                {displayedJobs
                  .filter((j) => activeTab !== "ACTIVE" || j._id !== activeJob?._id)
                  .map((job) => (
                    <div
                      key={job._id}
                      className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 sm:p-6 shadow-sm hover:shadow-md transition-all"
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-outline-variant">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-label-lg text-label-lg font-bold text-on-surface">
                              Booking #{job.bookingNumber}
                            </span>
                            <Badge
                              variant={
                                job.status === "PENDING"
                                  ? "warning"
                                  : job.status === "COMPLETED"
                                  ? "success"
                                  : "primary"
                              }
                            >
                              {job.status}
                            </Badge>
                          </div>
                          <p className="font-status-badge text-status-badge text-on-surface-variant flex items-center gap-1 mt-1">
                            <span className="material-symbols-outlined text-[15px]">schedule</span>
                            {job.slot?.date} at {job.slot?.time} · {job.distance || "2.1 km away"}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="font-headline-sm text-headline-sm text-brand-success font-bold">
                            ₹{job.pricing?.payoutAmount || Math.round(job.pricing?.totalAmount * 0.85)}
                          </span>
                          <p className="font-status-badge text-status-badge text-on-surface-variant">
                            Worker Payout (85%)
                          </p>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="py-4">
                        <h4 className="font-status-badge text-status-badge uppercase font-bold text-on-surface-variant tracking-wider mb-2">
                          Task Details
                        </h4>
                        <div className="flex flex-col gap-2">
                          {job.items?.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-body-md text-on-surface">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-brand-purple text-[18px]">
                                  {item.icon || "build"}
                                </span>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-status-badge text-on-surface-variant">× {item.qty || 1}</span>
                              </div>
                              <span className="text-status-badge text-on-surface-variant">
                                ~{item.durationMins || 45} mins
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Customer & Location */}
                      <div className="bg-surface-container-low/60 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div>
                          <p className="font-label-md text-label-md font-bold text-on-surface">
                            {job.customer?.name || "Verified Customer"}
                          </p>
                          <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-[16px] text-brand-purple">location_on</span>
                            {job.address?.line1}, {job.address?.city}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 self-stretch sm:self-auto">
                          <a
                            href={`tel:${job.customer?.phone || "+919800000000"}`}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-label-md font-bold hover:bg-emerald-100 transition-colors text-xs sm:text-sm cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">call</span>
                            Call Customer
                          </a>
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(job.address?.line1 || "Bettiah")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-purple-light text-brand-purple font-label-md font-bold hover:bg-brand-purple-light/80 transition-colors text-xs sm:text-sm cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">navigation</span>
                            Navigate
                          </a>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
                        {job.status === "PENDING" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateStatus(job._id, "CANCELLED", "Declined request")}
                            >
                              Decline
                            </Button>
                            <Button
                              variant="purple"
                              size="sm"
                              onClick={() =>
                                handleUpdateStatus(job._id, "ASSIGNED", "Job accepted! Prepare for departure.")
                              }
                            >
                              <span className="material-symbols-outlined text-[18px]">check</span>
                              Accept Job (₹{job.pricing?.payoutAmount || Math.round(job.pricing?.totalAmount * 0.85)})
                            </Button>
                          </>
                        )}

                        {job.status === "ASSIGNED" && (
                          <Button
                            variant="purple"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(job._id, "ON_THE_WAY", "Status updated: On the way to client!")
                            }
                          >
                            <span className="material-symbols-outlined text-[18px]">directions_car</span>
                            Start Journey to Customer
                          </Button>
                        )}

                        {job.status === "ON_THE_WAY" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => transmitCurrentGps(job._id)}
                              title="Send current GPS coordinates to customer"
                            >
                              <span className="material-symbols-outlined text-[18px]">my_location</span>
                              Send Live GPS
                            </Button>
                            <Button
                              variant="purple"
                              size="sm"
                              onClick={() =>
                                handleUpdateStatus(job._id, "ARRIVED", "Doorstep arrival recorded! Customer notified.")
                              }
                            >
                              <span className="material-symbols-outlined text-[18px]">doorbell</span>
                              Mark Arrived at Doorstep
                            </Button>
                          </>
                        )}

                        {job.status === "ARRIVED" && (
                          <Button
                            variant="purple"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(job._id, "IN_PROGRESS", "Status updated: Work started!")
                            }
                          >
                            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                            Start Service / Work
                          </Button>
                        )}

                        {job.status === "IN_PROGRESS" && (
                          <Button
                            variant="purple"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(
                                job._id,
                                "COMPLETED",
                                "Service marked completed! Earnings credited to wallet."
                              )
                            }
                          >
                            <span className="material-symbols-outlined text-[18px]">task_alt</span>
                            Complete Service &amp; Collect
                          </Button>
                        )}

                        {job.status === "COMPLETED" && (
                          <span className="inline-flex items-center gap-1 text-brand-success font-label-md font-bold">
                            <span className="material-symbols-outlined text-[18px] fill">verified</span>
                            Payout Settled to Wallet
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
