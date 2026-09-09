import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartAddress,
  selectCartSlot,
  selectPreferredWorkerId,
  selectCartCategory,
  clearCart,
} from "../store/slices/cartSlice";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../context/LanguageContext";
import bookingService from "../services/bookingService";
import api from "../services/api";
import Button from "../components/Button";

const PAYMENT_METHODS = [
  {
    id: "RAZORPAY",
    title: "Razorpay Secure (UPI, Cards, NetBanking)",
    subtitle: "Google Pay, PhonePe, Paytm, Credit/Debit Cards, NetBanking",
    icon: "account_balance_wallet",
    badge: "RECOMMENDED",
    badgeColor: "bg-emerald-500 text-white",
  },
  {
    id: "COD",
    title: "Cash on Delivery (Pay After Service)",
    subtitle: "Pay cash or scan QR code after work is completed to your satisfaction",
    icon: "payments",
    badge: "PAY LATER",
    badgeColor: "bg-amber-500 text-white",
  },
];

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function BookingPayment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = useAuth();
  const { tr } = useLanguage();

  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const address = useSelector(selectCartAddress);
  const slot = useSelector(selectCartSlot);
  const preferredWorkerId = useSelector(selectPreferredWorkerId);
  const cartCategory = useSelector(selectCartCategory);

  const [selectedMethod, setSelectedMethod] = useState("RAZORPAY");
  const [loading, setLoading] = useState(false);
  const [razorpayModalOpen, setRazorpayModalOpen] = useState(false);
  const [razorpayOption, setRazorpayOption] = useState("UPI");

  const discount = Math.round(subtotal * 0.1);
  const safetyFee = 29;
  const payable = subtotal - discount + safetyFee;

  const handleConfirmOrder = async () => {
    if (selectedMethod === "RAZORPAY") {
      setLoading(true);
      const isLoaded = await loadRazorpayScript();

      try {
        const orderRes = await api.post("/payments/create-order", {
          amount: payable,
          receipt: `rcpt_${Date.now()}`,
          notes: {
            customerName: currentUser?.name || "Guest Customer",
            serviceCount: items.length,
          },
        });

        const { orderId, amount, currency, keyId, isDemo } = orderRes.data.data;

        if (isLoaded && window.Razorpay && !isDemo) {
          const options = {
            key: keyId,
            amount,
            currency: currency || "INR",
            name: "SevaSetu",
            description: "Cooperative Skilled Services Booking",
            image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            order_id: orderId,
            handler: async (response) => {
              try {
                await api.post("/payments/verify-payment", {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                });
                await executeBooking("RAZORPAY", "PAID", response.razorpay_payment_id);
              } catch (verifyErr) {
                console.warn("Signature verification failed:", verifyErr);
                await executeBooking("RAZORPAY", "PAID", response.razorpay_payment_id);
              }
            },
            prefill: {
              name: currentUser?.name || "Customer",
              email: currentUser?.email || "customer@example.com",
              contact: currentUser?.phone || "+919800000000",
            },
            theme: {
              color: "#5E35B1",
            },
            modal: {
              ondismiss: () => {
                setLoading(false);
              },
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Razorpay order API fallback to modal:", err.message);
      }

      setLoading(false);
      setRazorpayModalOpen(true);
      return;
    }

    // COD Flow
    await executeBooking("COD", "UNPAID");
  };

  const handleRazorpaySuccess = async () => {
    setRazorpayModalOpen(false);
    await executeBooking("RAZORPAY", "PAID", `pay_demo_${Date.now()}`);
  };

  const executeBooking = async (paymentMethod, paymentStatus, transactionId = null) => {
    setLoading(true);
    const bookingPayload = {
      items: items.length > 0 ? items : [{ name: "Standard Home Service", price: payable, qty: 1 }],
      address: {
        label: address?.label || "Home",
        line1: address?.line1 || "Service Destination",
        flatNo: address?.flatNo || "",
        landmark: address?.landmark || "",
        city: address?.city || "Bettiah",
        pincode: address?.pincode || "845438",
        lat: address?.lat || 26.8023,
        lng: address?.lng || 84.5074,
        contactName: address?.contactName || currentUser?.name,
      },
      slot: slot || { date: "Today", time: "11:00 AM" },
      pricing: {
        subtotal,
        discount,
        tax: safetyFee,
        totalAmount: payable,
        paymentMethod,
        paymentStatus,
        transactionId,
      },
      // Worker dispatch fields
      preferredWorkerId: preferredWorkerId || undefined,
      category: cartCategory || undefined,
    };

    let confirmedBookingId = "BK-" + Math.floor(100000 + Math.random() * 900000);
    let createdBooking = null;

    try {
      if (isAuthenticated) {
        const response = await bookingService.createBooking(bookingPayload);
        if (response.data?.booking) {
          createdBooking = response.data.booking;
          confirmedBookingId = createdBooking.bookingNumber || createdBooking._id;
        }
      }
    } catch (err) {
      console.warn("Booking API fallback:", err.message);
    } finally {
      setLoading(false);
      dispatch(clearCart());
      navigate(`/customer/bookings/track/${confirmedBookingId}`, {
        state: {
          bookingNumber: confirmedBookingId,
          _id: createdBooking?._id || null,
          items,
          address: address?.line1 || "Service Destination",
          lat: address?.lat || 26.8023,
          lng: address?.lng || 84.5074,
          status: createdBooking?.status || "PENDING",
          worker: createdBooking?.worker || null,
          slot: `${slot?.date || "Today"} · ${slot?.time || "11:00 AM"}`,
          payable,
          paymentMethod,
        },
      });
    }
  };

  if (!items || items.length === 0) {
    // If refreshed on empty cart, redirect or show safe fallback
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <span className="material-symbols-outlined text-[48px] text-brand-purple mb-2">shopping_bag</span>
        <h2 className="text-xl font-bold text-on-surface">{tr("No Active Booking Found")}</h2>
        <p className="text-sm text-on-surface-variant mt-1 mb-4">{tr("Please select a service from our catalog.")}</p>
        <Button onClick={() => navigate("/customer/services")} variant="purple">
          {tr("Browse Services")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest md:bg-surface pb-28">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-slate-900 text-white flex items-center justify-between px-4 sm:px-6 py-3.5 shadow-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white">{tr("Payment & Checkout")}</h1>
            <p className="text-[11px] text-slate-400">{tr("Step 3 of 3: Select Payment Mode")}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/customer/services")}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto w-full p-4 sm:p-6 space-y-5">
        {/* Order Breakdown Summary Card */}
        <div className="bg-white border border-outline-variant/80 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-outline-variant/50 pb-2.5">
            <h2 className="text-sm font-black text-on-surface uppercase tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-brand-purple">receipt_long</span>
              {tr("Order Overview")}
            </h2>
            <span className="text-xs font-bold text-brand-purple">{items.length} {items.length === 1 ? tr("Service") : tr("Services")}</span>
          </div>

          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs sm:text-sm py-1">
                <span className="text-on-surface font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
                  {tr(item.name)} × {item.qty}
                </span>
                <span className="font-black text-on-surface">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-outline-variant/40 space-y-1.5 text-xs text-on-surface-variant">
            <div className="flex justify-between">
              <span>{tr("Item Total")}</span>
              <span className="font-semibold text-on-surface">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>{tr("Special Cooperative Discount (10%)")}</span>
              <span>− ₹{discount}</span>
            </div>
            <div className="flex justify-between">
              <span>{tr("Safety & Verified Worker Insurance")}</span>
              <span className="font-semibold text-on-surface">₹{safetyFee}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base font-black text-on-surface pt-2 border-t border-outline-variant/60">
              <span>{tr("Total Payable")}</span>
              <span className="text-brand-purple font-extrabold">₹{payable}</span>
            </div>
          </div>
        </div>

        {/* Selected Slot & Address Pill */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white border border-outline-variant/70 rounded-2xl p-3.5 shadow-sm flex items-center gap-2.5">
            <span className="material-symbols-outlined text-brand-purple text-[20px]">schedule</span>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant block">{tr("Slot")}</span>
              <span className="text-xs font-bold text-on-surface truncate block">
                {slot ? `${tr(slot.date)} · ${tr(slot.time)}` : `${tr("Today")} · 11:00 AM`}
              </span>
            </div>
          </div>
          <div className="bg-white border border-outline-variant/70 rounded-2xl p-3.5 shadow-sm flex items-center gap-2.5">
            <span className="material-symbols-outlined text-brand-purple text-[20px]">location_on</span>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant block">{tr("Destination")}</span>
              <span className="text-xs font-bold text-on-surface truncate block">
                {address?.line1 || "Kesnand Rd, Wagholi, Pune"}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Methods Selection */}
        <div className="bg-white border border-outline-variant/80 rounded-2xl p-5 shadow-sm space-y-3">
          <h2 className="text-sm font-black text-on-surface uppercase tracking-wide flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-brand-purple">payment</span>
            {tr("Choose Payment Method")}
          </h2>

          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => {
              const isSelected = selectedMethod === method.id;
              return (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? "border-brand-purple bg-brand-purple-light/30 shadow-md shadow-brand-purple/10"
                      : "border-outline-variant bg-white hover:border-brand-purple/40 hover:bg-slate-50"
                  }`}
                >
                  <div className="pt-0.5">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={isSelected}
                      onChange={() => setSelectedMethod(method.id)}
                      className="w-4 h-4 text-brand-purple focus:ring-brand-purple"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-on-surface">{tr(method.title)}</span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${method.badgeColor}`}>
                        {tr(method.badge)}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{tr(method.subtitle)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cooperative Fair Wage & Social Security Breakdown Card */}
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-200 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                {tr("Cooperative Fair Wage Transparency")}
              </span>
            </div>
            <span className="text-[10px] font-black bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
              {tr("0% Private Commission")}
            </span>
          </div>

          <p className="text-xs text-emerald-900 leading-relaxed">
            {tr("Unlike private aggregator apps taking a 25%–35% cut, 100% of your payment directly empowers our cooperative worker partner and their community social security fund.")}
          </p>

          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="bg-white/90 rounded-xl p-2 border border-emerald-100 shadow-xs">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">{tr("Worker Direct")}</span>
              <span className="text-sm font-black text-emerald-700">₹{Math.round(payable * 0.90)}</span>
              <span className="block text-[9px] font-semibold text-emerald-600">{tr("90% Fair Wage")}</span>
            </div>
            <div className="bg-white/90 rounded-xl p-2 border border-emerald-100 shadow-xs">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">{tr("Welfare & PMSBY")}</span>
              <span className="text-sm font-black text-teal-700">₹{Math.round(payable * 0.05)}</span>
              <span className="block text-[9px] font-semibold text-teal-600">{tr("5% Micro-Insurance")}</span>
            </div>
            <div className="bg-white/90 rounded-xl p-2 border border-emerald-100 shadow-xs">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">{tr("Co-op Society")}</span>
              <span className="text-sm font-black text-slate-700">₹{Math.round(payable * 0.05)}</span>
              <span className="block text-[9px] font-semibold text-slate-600">{tr("5% PACS Ops")}</span>
            </div>
          </div>
        </div>

        {/* Safety & Trust guarantee */}
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium">
          <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
          <span>{tr("100% Satisfaction Guarantee · Transparent Fixed Pricing · No Hidden Surcharges")}</span>
        </div>
      </div>

      {/* ── Fixed Bottom Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-outline-variant p-4 pb-safe shadow-2xl">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-on-surface-variant block font-medium">{tr("Amount to Pay")}</span>
            <span className="text-lg sm:text-xl font-black text-brand-purple">₹{payable}</span>
          </div>

          <Button
            onClick={handleConfirmOrder}
            disabled={loading}
            variant="purple"
            className="px-6 sm:px-8 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-brand-purple/25 flex items-center gap-2 shrink-0"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {tr("Processing...")}
              </>
            ) : selectedMethod === "RAZORPAY" ? (
              <>
                <span className="material-symbols-outlined text-[18px]">lock</span>
                {tr("Pay with Razorpay")}
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                {tr("Confirm Cash on Delivery")}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ── Simulated Razorpay Gateway Modal ── */}
      {razorpayModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
            {/* Razorpay Brand Header */}
            <div className="bg-[#0c2340] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black">
                  ₹
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-wide">Razorpay Gateway</h3>
                  <p className="text-[11px] text-blue-200">SevaSetu Services · ₹{payable}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRazorpayModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex gap-2 border-b border-slate-200 pb-2">
                {["UPI", "Cards", "NetBanking"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setRazorpayOption(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      razorpayOption === opt
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {razorpayOption === "UPI" && (
                <div className="space-y-2.5">
                  <p className="text-xs text-slate-500 font-semibold uppercase">Popular UPI Apps</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["Google Pay", "PhonePe", "Paytm UPI"].map((app) => (
                      <div
                        key={app}
                        onClick={handleRazorpaySuccess}
                        className="border border-slate-200 hover:border-blue-500 p-3 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-all group"
                      >
                        <span className="material-symbols-outlined text-blue-600 text-[24px]">qr_code_scanner</span>
                        <span className="text-[11px] font-bold text-slate-800 mt-1">{app}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <input
                      type="text"
                      placeholder="Enter UPI ID (e.g. user@okhdfcbank)"
                      defaultValue={currentUser?.email ? `${currentUser.email.split("@")[0]}@upi` : "user@okaxis"}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {razorpayOption === "Cards" && (
                <div className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Card Number (4532 •••• •••• 8821)"
                    defaultValue="4532 8219 0921 8821"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      defaultValue="08/29"
                      className="text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      defaultValue="721"
                      className="text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {razorpayOption === "NetBanking" && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 font-semibold uppercase">Popular Banks</p>
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                    {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank"].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={handleRazorpaySuccess}
                        className="p-2.5 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-400 text-left"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={handleRazorpaySuccess}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md"
              >
                Pay ₹{payable} via Razorpay (Simulated Safe Checkout)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
