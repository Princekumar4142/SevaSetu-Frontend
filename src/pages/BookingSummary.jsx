import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartAddress,
  selectCartSlot,
  incrementItem,
  decrementItem,
  clearCart,
  addItem,
} from "../store/slices/cartSlice";
import { FRUITS_CLEANUP, MANVI_PACKAGE } from "../constants/bookingCatalog";
import QuantityStepper from "../components/booking/QuantityStepper";
import Button from "../components/Button";
import { EmptyState } from "../components/Feedback";
import bookingService from "../services/bookingService";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../context/LanguageContext";

const FLAT_DISCOUNT = 0.1; // illustrative — a real coupon/discount engine is a later-phase concern

export default function BookingSummary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { tr } = useLanguage();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const address = useSelector(selectCartAddress);
  const slot = useSelector(selectCartSlot);
  const [loading, setLoading] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);

  // Seed the cart with the two items shown in the reference screenshot on
  // first arrival, so this screen isn't empty by default when demoing.
  // Guarded with a ref (not just items.length) because React StrictMode
  // double-invokes effects in development, which would otherwise dispatch
  // addItem twice and double the quantities.
  const seededRef = useRef(false);
  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;
    if (items.length === 0 && !createdBooking) {
      dispatch(addItem({ id: FRUITS_CLEANUP.id, name: FRUITS_CLEANUP.name, price: FRUITS_CLEANUP.price, durationMins: FRUITS_CLEANUP.durationMins, icon: FRUITS_CLEANUP.icon, meta: "edit" }));
      dispatch(addItem({ id: MANVI_PACKAGE.id, name: MANVI_PACKAGE.name, price: MANVI_PACKAGE.price, durationMins: MANVI_PACKAGE.durationMins, icon: MANVI_PACKAGE.icon, meta: "customise", originalPrice: MANVI_PACKAGE.originalPrice, includes: MANVI_PACKAGE.includes }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const discount = Math.round(subtotal * FLAT_DISCOUNT);
  const payable = subtotal - discount;

  const handlePay = async () => {
    setLoading(true);
    const bookingPayload = {
      items,
      address: address || { label: "Home", line1: "102, Green Valley Apartments", city: "Mumbai", pincode: "400001" },
      slot: slot || { date: "Tomorrow, 10:00 AM", time: "10:00 AM" },
      pricing: {
        subtotal,
        discount,
        tax: 0,
        totalAmount: payable,
        paymentMethod: "ONLINE",
        paymentStatus: "PAID",
      },
    };

    try {
      if (isAuthenticated) {
        const response = await bookingService.createBooking(bookingPayload);
        setCreatedBooking(response.data?.booking || { bookingNumber: "BK-" + Math.floor(100000 + Math.random() * 900000) });
      } else {
        // Guest simulation
        setCreatedBooking({
          bookingNumber: "BK-" + Math.floor(100000 + Math.random() * 900000),
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn("Backend booking API fallback:", err.message);
      // Seamlessly fallback with local simulated booking record
      setCreatedBooking({
        bookingNumber: "BK-" + Math.floor(100000 + Math.random() * 900000),
        createdAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
      dispatch(clearCart());
    }
  };

  if (createdBooking) {
    return (
      <div className="flex flex-col items-center text-center gap-md py-xl px-margin-mobile min-h-screen justify-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-brand-success flex items-center justify-center mb-2 shadow-sm animate-bounce">
          <span className="material-symbols-outlined text-[36px] fill">verified</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-purple-light/70 text-brand-purple rounded-full text-status-badge font-bold font-status-badge">
          <span className="material-symbols-outlined text-[16px]">receipt</span>
          {tr("Booking")} #{createdBooking.bookingNumber || "BK-829104"}
        </div>
        <h1 className="font-headline-md text-headline-md text-on-surface font-bold">{tr("Booking Confirmed!")}</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
          {tr("A verified cooperative professional will arrive at your selected slot. You can track real-time status and worker updates.")}
        </p>

        <div className="flex flex-col gap-sm w-full mt-4">
          <Button
            variant="purple"
            className="w-full justify-center py-3 shadow-md shadow-brand-purple/25 flex items-center gap-2"
            onClick={() =>
              navigate(`/customer/bookings/track/${createdBooking.bookingNumber || "BK-829104"}`, {
                state: {
                  bookingNumber: createdBooking.bookingNumber || "BK-829104",
                  address: address?.line1 || "Kesnand Rd, Wagholi, Pune",
                  slot: `${slot?.date || "Today"} · ${slot?.time || "11:00 AM"}`,
                  payable,
                  paymentMethod: "ONLINE",
                },
              })
            }
          >
            <span className="material-symbols-outlined text-[18px]">near_me</span>
            {tr("Track Worker Live on Map")}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-center py-2.5"
            onClick={() => navigate("/customer/bookings")}
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            {tr("View in My Bookings")}
          </Button>
          <button
            type="button"
            className="text-xs font-semibold text-on-surface-variant hover:text-brand-purple py-1 mt-1"
            onClick={() => navigate("/customer")}
          >
            {tr("Return to Home")}
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-margin-mobile">
        <EmptyState icon="shopping_cart" title={tr("Your cart is empty")} description={tr("Browse services from the home screen to build your order.")} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="flex items-center gap-sm px-margin-mobile pt-4 pb-3">
          <button type="button" onClick={() => navigate(-1)} className="text-on-surface">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-label-md text-label-md text-on-surface font-bold">{tr("Summary")}</h1>
        </div>

        <div className="px-margin-mobile flex flex-col gap-md">
          <button type="button" className="flex items-center gap-sm bg-brand-purple-light rounded-lg px-md py-sm text-left">
            <span className="w-7 h-7 rounded-full bg-brand-purple flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-[14px] fill">bolt</span>
            </span>
            <div className="flex-1">
              <p className="font-label-md text-label-md text-on-surface font-bold">{tr("Save 15% on every service")}</p>
              <p className="font-status-badge text-status-badge text-brand-purple">{tr("Select your plan")}</p>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </button>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
            <h2 className="font-label-md text-label-md text-on-surface font-bold mb-md">{tr("Your orders")}</h2>
            <div className="flex flex-col divide-y divide-outline-variant">
              {items.map((item) => (
                <div key={item.id} className="py-sm">
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-lg bg-brand-purple-light flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-brand-purple text-[20px]">{item.icon || "spa"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-label-md text-label-md text-on-surface truncate">{tr(item.name)}</p>
                      {item.durationMins && (
                        <p className="font-status-badge text-status-badge text-on-surface-variant">{item.durationMins} {tr("mins")}</p>
                      )}
                    </div>
                    <QuantityStepper
                      qty={item.qty}
                      onIncrement={() => dispatch(incrementItem(item.id))}
                      onDecrement={() => dispatch(decrementItem(item.id))}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 pl-16">
                    <span className="font-status-badge text-status-badge text-brand-purple font-bold">
                      {item.meta === "edit" ? tr("Edit") : item.meta === "customise" ? tr("Customise") : ""}
                    </span>
                    <span className="font-label-md text-label-md text-on-surface">
                      {item.originalPrice && (
                        <span className="text-on-surface-variant line-through mr-1 font-status-badge">₹{item.originalPrice}</span>
                      )}
                      ₹{item.price * item.qty}
                    </span>
                  </div>
                  {item.includes && (
                    <ul className="pl-16 mt-1 list-disc font-status-badge text-status-badge text-on-surface-variant">
                      {item.includes.map((i) => (
                        <li key={i.label}>{tr(i.label)} – ₹{i.price}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex items-center justify-between">
            <span className="flex items-center gap-sm font-label-md text-label-md text-on-surface font-bold">
              <span className="material-symbols-outlined text-brand-success text-[18px] fill">sell</span>
              {tr("Coupons and offers")}
            </span>
            <span className="flex items-center gap-1 font-body-md text-body-md text-brand-purple">
              5 {tr("offers")}
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </span>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
            <h2 className="font-label-md text-label-md text-on-surface font-bold mb-md">{tr("Payment summary")}</h2>
            <Row label={tr("Item total")} value={`₹${subtotal}`} />
            <Row label={tr("Item discount")} value={`− ₹${discount}`} valueClass="text-brand-success" />

            <div className="flex items-center gap-sm py-sm border-t border-outline-variant mt-sm">
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">home</span>
              <span className="font-body-md text-body-md text-on-surface flex-1 truncate">
                {address ? `${tr(address.label)} - ${address.line1}` : tr("No address selected")}
              </span>
              <span className="material-symbols-outlined text-on-surface-variant text-[16px]">edit</span>
            </div>
            <div className="flex items-center gap-sm py-sm">
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">schedule</span>
              <span className="font-body-md text-body-md text-on-surface flex-1 truncate">
                {slot ? `${tr(slot.date)} · ${tr(slot.time)}` : tr("No time slot selected")}
              </span>
              <span className="material-symbols-outlined text-on-surface-variant text-[16px]">edit</span>
            </div>

            <Button variant="purple" className="w-full mt-md" onClick={handlePay} disabled={!address || !slot}>
              {tr("Pay")} ₹{payable}
            </Button>
            <p className="font-status-badge text-status-badge text-on-surface-variant mt-sm text-center">
              {tr("By proceeding, you agree to our T&C, Privacy, and Cancellation policy")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass = "text-on-surface" }) {
  return (
    <div className="flex justify-between py-1">
      <span className="font-body-md text-body-md text-on-surface-variant">{label}</span>
      <span className={`font-body-md text-body-md ${valueClass}`}>{value}</span>
    </div>
  );
}
