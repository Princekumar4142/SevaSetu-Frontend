import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import bookingService from "../services/bookingService";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { LoadingState, EmptyState } from "../components/Feedback";
import { useSocket } from "../context/SocketContext";

const MOCK_CUSTOMER_BOOKINGS = [
  {
    _id: "mock-1",
    bookingNumber: "BK-948210",
    status: "ON_THE_WAY",
    items: [
      { id: "1", name: "Intense Bathroom Cleaning", qty: 1, price: 599, durationMins: 60, icon: "cleaning_services" },
      { id: "2", name: "Fan & Switchboard Deep Dusting", qty: 2, price: 199, durationMins: 30, icon: "power" },
    ],
    slot: { date: "Today", time: "11:30 AM" },
    address: { label: "Home", line1: "Flat 402, Sunshine Heights, Andheri West", city: "Mumbai" },
    pricing: { subtotal: 997, discount: 100, totalAmount: 897, paymentMethod: "ONLINE", paymentStatus: "PAID" },
    worker: {
      user: { name: "Ramesh Pawar", phone: "+91 98201 44321", profilePhoto: "" },
      rating: 4.9,
      cooperative: { name: "Mumbai Urban Workers Co-op" },
    },
    statusHistory: [
      { status: "PENDING", note: "Booking placed", timestamp: "10:15 AM" },
      { status: "ASSIGNED", note: "Assigned to Ramesh Pawar", timestamp: "10:20 AM" },
      { status: "ON_THE_WAY", note: "Worker is on the way (Est. 12 mins away)", timestamp: "11:05 AM" },
    ],
  },
  {
    _id: "mock-2",
    bookingNumber: "BK-829104",
    status: "COMPLETED",
    items: [
      { id: "3", name: "Salon Classic Pedicure & Glow Cleanup", qty: 1, price: 849, durationMins: 75, icon: "spa" },
    ],
    slot: { date: "28 Aug 2026", time: "02:00 PM" },
    address: { label: "Home", line1: "Flat 402, Sunshine Heights, Andheri West", city: "Mumbai" },
    pricing: { subtotal: 849, discount: 85, totalAmount: 764, paymentMethod: "ONLINE", paymentStatus: "PAID" },
    worker: {
      user: { name: "Pooja Sharma", phone: "+91 98332 99182" },
      rating: 4.95,
      cooperative: { name: "Shakti Women Artisans Cooperative" },
    },
    statusHistory: [
      { status: "COMPLETED", note: "Service successfully completed", timestamp: "28 Aug, 03:20 PM" },
    ],
    rating: { score: 5, review: "Pooja was extremely polite and professional. Great service!" },
  },
];

const STATUS_CONFIG = {
  PENDING: { label: "Searching Partner", variant: "warning", icon: "hourglass_empty", step: 1 },
  ASSIGNED: { label: "Partner Assigned", variant: "info", icon: "person_check", step: 2 },
  ACCEPTED: { label: "Partner Assigned", variant: "info", icon: "person_check", step: 2 },
  ON_THE_WAY: { label: "On The Way", variant: "primary", icon: "directions_car", step: 3 },
  ARRIVED: { label: "Arrived at Doorstep", variant: "warning", icon: "doorbell", step: 4 },
  IN_PROGRESS: { label: "In Progress", variant: "primary", icon: "handyman", step: 5 },
  COMPLETED: { label: "Completed", variant: "success", icon: "check_circle", step: 6 },
  CANCELLED: { label: "Cancelled", variant: "danger", icon: "cancel", step: 0 },
};

export default function CustomerBookings() {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [liveToast, setLiveToast] = useState("");

  const loadBookings = useCallback(async () => {
    try {
      const res = await bookingService.getMyBookings();
      setBookings(res.data?.bookings || []);
    } catch (err) {
      console.warn("Could not load bookings:", err.message);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
    const interval = setInterval(loadBookings, 6000);
    return () => clearInterval(interval);
  }, [loadBookings]);

  // Live Socket.io updates for worker acceptance, journey status, arrival, progress
  useEffect(() => {
    if (!socket) return;

    const handleWorkerAssigned = (data) => {
      console.log("[CustomerBookings] Worker assigned via socket:", data);
      const workerName = data.worker?.user?.name || "Verified Partner";
      setLiveToast(`Partner Assigned: ${workerName} accepted your order!`);
      setTimeout(() => setLiveToast(""), 5000);
      loadBookings();
    };

    const handleBookingUpdated = (data) => {
      console.log("[CustomerBookings] Booking updated via socket:", data);
      if (data?.status === "ARRIVED") {
        setLiveToast("Ding dong! Your worker partner has arrived at your doorstep.");
        setTimeout(() => setLiveToast(""), 6000);
      } else if (data?.status === "ON_THE_WAY") {
        setLiveToast("Your worker partner is on the way to your location!");
        setTimeout(() => setLiveToast(""), 5000);
      } else if (data?.status === "COMPLETED") {
        setLiveToast("Service completed! Thank you for choosing SevaSetu.");
        setTimeout(() => setLiveToast(""), 5000);
      }
      loadBookings();
    };

    socket.on("worker_assigned", handleWorkerAssigned);
    socket.on("booking_updated", handleBookingUpdated);
    socket.on("status_updated", handleBookingUpdated);

    return () => {
      socket.off("worker_assigned", handleWorkerAssigned);
      socket.off("booking_updated", handleBookingUpdated);
      socket.off("status_updated", handleBookingUpdated);
    };
  }, [socket, loadBookings]);

  const activeBookings = bookings.filter((b) =>
    ["PENDING", "ASSIGNED", "ACCEPTED", "ON_THE_WAY", "ARRIVED", "IN_PROGRESS"].includes(b.status)
  );
  const pastBookings = bookings.filter((b) => b.status === "COMPLETED");
  const cancelledBookings = bookings.filter((b) => b.status === "CANCELLED");

  const displayedList =
    activeTab === "ACTIVE" ? activeBookings : activeTab === "PAST" ? pastBookings : cancelledBookings;

  return (
    <div className="min-h-screen bg-surface-container-lowest md:bg-surface pb-24 md:pb-12">
      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (window.history.length > 1) navigate(-1);
                else navigate("/customer");
              }}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 flex items-center justify-center text-slate-800 transition-colors shrink-0"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div>
              <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">My Bookings</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Track live service orders and view booking receipts
              </p>
            </div>
          </div>
          <Button variant="purple" onClick={() => navigate("/customer/services")} className="hidden sm:inline-flex">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Book New Service
          </Button>
        </div>

        {/* Live Real-Time Toast Notification */}
        {liveToast && (
          <div className="mb-4 p-4 rounded-2xl bg-brand-purple text-white shadow-lg shadow-brand-purple/25 flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[22px] text-amber-300 animate-bounce">
                notifications_active
              </span>
              <span className="text-sm font-bold">{liveToast}</span>
            </div>
            <button
              type="button"
              onClick={() => setLiveToast("")}
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xs text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab Filters */}
        <div className="flex border-b border-outline-variant gap-1 sm:gap-2 mb-6 overflow-x-auto scrollbar-none">
          {[
            { key: "ACTIVE", label: "Active & Upcoming", count: activeBookings.length },
            { key: "PAST", label: "Completed", count: pastBookings.length },
            { key: "CANCELLED", label: "Cancelled", count: cancelledBookings.length },
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
          <LoadingState message="Loading your bookings..." />
        ) : displayedList.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-8 my-6">
            <EmptyState
              icon="receipt_long"
              title={`No ${activeTab.toLowerCase()} bookings`}
              description="Browse our catalog to schedule services with cooperative-verified professionals."
              actionLabel="Explore Services"
              onAction={() => navigate("/customer/services")}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {displayedList.map((booking) => {
              const statusCfg = STATUS_CONFIG[booking.status] || STATUS_CONFIG.PENDING;
              return (
                <div
                  key={booking._id}
                  className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm hover:shadow-md transition-all"
                >
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-outline-variant">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-purple-light flex items-center justify-center text-brand-purple font-bold">
                        <span className="material-symbols-outlined text-[20px]">{booking.items[0]?.icon || "spa"}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-on-surface font-bold">
                            #{booking.bookingNumber}
                          </span>
                          <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                        </div>
                        <p className="font-status-badge text-status-badge text-on-surface-variant flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                          {booking.slot?.date} · {booking.slot?.time}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        ₹{booking.pricing?.totalAmount}
                      </span>
                      <p className="font-status-badge text-status-badge text-brand-success font-medium">
                        {booking.pricing?.paymentStatus || "PAID"}
                      </p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="py-4">
                    <h4 className="font-status-badge text-status-badge text-on-surface-variant uppercase font-bold tracking-wider mb-2">
                      Services Booked
                    </h4>
                    <div className="flex flex-col gap-2">
                      {booking.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-body-md text-on-surface">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
                            <span className="font-medium">{item.name}</span>
                            <span className="text-on-surface-variant text-status-badge font-status-badge">
                              × {item.qty || 1}
                            </span>
                          </div>
                          <span className="font-medium">₹{item.price * (item.qty || 1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assigned Worker / Cooperative Info */}
                  {booking.worker && (
                    <div className="bg-surface-container-low/60 rounded-xl p-3.5 flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-brand-purple text-white flex items-center justify-center font-bold text-sm">
                          {booking.worker.user?.name?.charAt(0) || "W"}
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-1">
                            {booking.worker.user?.name}
                            <span className="material-symbols-outlined text-brand-success text-[16px] fill">verified</span>
                          </p>
                          <p className="font-status-badge text-status-badge text-on-surface-variant">
                            {booking.worker.cooperative?.name || "Verified Cooperative Partner"} · ⭐ {booking.worker.rating || "4.9"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${booking.worker.user?.phone || "+919800000000"}`}
                          className="w-9 h-9 rounded-full bg-emerald-50 text-brand-success flex items-center justify-center hover:bg-emerald-100 transition-colors"
                          title="Call Professional"
                        >
                          <span className="material-symbols-outlined text-[18px]">call</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Status Progress Bar for active bookings */}
                  {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
                    <div className="mb-4 bg-brand-purple-light/40 rounded-xl p-3.5">
                      <div className="flex items-center justify-between text-status-badge font-status-badge text-brand-purple font-bold mb-2">
                        <span>Live Status: {statusCfg.label}</span>
                        <span>Step {statusCfg.step} of 5</span>
                      </div>
                      <div className="w-full bg-outline-variant/50 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-purple h-full rounded-full transition-all duration-500"
                          style={{ width: `${(statusCfg.step / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-outline-variant">
                    <span className="font-status-badge text-status-badge text-on-surface-variant flex items-center gap-1 truncate max-w-full sm:max-w-xs">
                      <span className="material-symbols-outlined text-[16px] shrink-0">location_on</span>
                      <span className="truncate">{booking.address?.line1}</span>
                    </span>
                    <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                      {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
                        <Button
                          variant="purple"
                          size="sm"
                          onClick={() =>
                            navigate(`/customer/bookings/track/${booking.bookingNumber}`, {
                              state: {
                                bookingNumber: booking.bookingNumber,
                                _id: booking._id,
                                status: booking.status,
                                worker: booking.worker,
                                items: booking.items,
                                address: booking.address?.line1,
                                lat: booking.address?.lat,
                                lng: booking.address?.lng,
                                slot: `${booking.slot?.date} · ${booking.slot?.time}`,
                                payable: booking.pricing?.totalAmount,
                                paymentMethod: booking.pricing?.paymentMethod,
                              },
                            })
                          }
                          className="flex items-center gap-1 shadow-sm flex-1 sm:flex-initial justify-center"
                        >
                          <span className="material-symbols-outlined text-[16px]">near_me</span>
                          Track on Map
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedBooking(booking)}
                        className="flex-1 sm:flex-initial justify-center"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Full Booking Details */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-fade-in border border-outline-variant">
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Booking #{selectedBooking.bookingNumber}
                  </h3>
                  <p className="font-status-badge text-status-badge text-on-surface-variant">
                    Placed on {selectedBooking.slot?.date}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {/* Timeline History */}
              <div className="py-4 border-b border-outline-variant">
                <h4 className="font-label-md text-label-md text-on-surface font-bold mb-3">Status Timeline</h4>
                <div className="flex flex-col gap-3">
                  {selectedBooking.statusHistory?.map((h, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-purple mt-1.5 shrink-0" />
                      <div>
                        <p className="font-body-md text-body-md text-on-surface font-semibold">{h.status}</p>
                        <p className="font-status-badge text-status-badge text-on-surface-variant">
                          {h.note} · {h.timestamp ? new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="py-4 border-b border-outline-variant">
                <h4 className="font-label-md text-label-md text-on-surface font-bold mb-3">Payment Summary</h4>
                <div className="flex justify-between text-body-md text-on-surface-variant py-1">
                  <span>Subtotal</span>
                  <span>₹{selectedBooking.pricing?.subtotal}</span>
                </div>
                <div className="flex justify-between text-body-md text-brand-success py-1">
                  <span>Cooperative Discount</span>
                  <span>− ₹{selectedBooking.pricing?.discount || 0}</span>
                </div>
                <div className="flex justify-between text-label-md font-bold text-on-surface pt-2 border-t border-outline-variant">
                  <span>Total Paid</span>
                  <span>₹{selectedBooking.pricing?.totalAmount}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="purple" onClick={() => setSelectedBooking(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
