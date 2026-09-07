import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSlot, setCategory, selectCartAddress, selectCartCategory } from "../store/slices/cartSlice";
import Button from "../components/Button";
import WorkerPreviewSection from "../components/booking/WorkerPreviewSection";

const generateNextDays = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const result = [];
  const today = new Date();

  for (let i = 0; i < 5; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    result.push({
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : days[d.getDay()],
      subLabel: `${d.getDate()} ${months[d.getMonth()]}`,
      day: d.getDate(),
      fullDate: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
      isToday: i === 0,
    });
  }
  return result;
};

const DATES = generateNextDays();

const TIME_SLOTS = [
  { time: "08:00 AM", period: "Morning" },
  { time: "09:00 AM", period: "Morning", popular: true },
  { time: "10:00 AM", period: "Morning" },
  { time: "11:00 AM", period: "Morning" },
  { time: "12:00 PM", period: "Afternoon" },
  { time: "01:30 PM", period: "Afternoon" },
  { time: "03:00 PM", period: "Afternoon" },
  { time: "04:30 PM", period: "Evening" },
  { time: "05:30 PM", period: "Evening", popular: true },
  { time: "06:30 PM", period: "Evening" },
  { time: "07:30 PM", period: "Evening" },
  { time: "08:30 PM", period: "Night" },
];

/**
 * Converts formatted 12-hour time (e.g. "05:30 PM") into minutes since midnight.
 */
const getSlotMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [time, modifier] = timeStr.trim().split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

export default function BookingSlot() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const address = useSelector(selectCartAddress);
  const cartCategory = useSelector(selectCartCategory);
  const activeCategory = categoryId || cartCategory || "custom-services";

  const [currentTime, setCurrentTime] = useState(() => new Date());

  // Periodically refresh current time every 30 seconds to keep slot expiration fresh
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const currentMinutes = useMemo(() => {
    return currentTime.getHours() * 60 + currentTime.getMinutes();
  }, [currentTime]);

  const availableTodaySlots = useMemo(() => {
    return TIME_SLOTS.filter((slot) => getSlotMinutes(slot.time) > currentMinutes);
  }, [currentMinutes]);

  const hasTodaySlots = availableTodaySlots.length > 0;

  // Initialize selectedDate (default to Today if slots left, else Tomorrow)
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();
    const canBookToday = TIME_SLOTS.some((s) => getSlotMinutes(s.time) > nowMins);
    return canBookToday ? DATES[0] : (DATES[1] || DATES[0]);
  });

  // Initialize selectedTime to first upcoming slot
  const [selectedTime, setSelectedTime] = useState(() => {
    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();
    const firstAvailable = TIME_SLOTS.find((s) => getSlotMinutes(s.time) > nowMins);
    return firstAvailable ? firstAvailable.time : TIME_SLOTS[1].time;
  });

  const handleDateSelect = (d) => {
    setSelectedDate(d);
    if (d.isToday) {
      const isCurrentPast = !selectedTime || getSlotMinutes(selectedTime) <= currentMinutes;
      if (isCurrentPast) {
        const nextAvail = availableTodaySlots[0];
        setSelectedTime(nextAvail ? nextAvail.time : "");
      }
    } else {
      // If switching to future day and nothing selected, default to 9:00 AM
      if (!selectedTime) {
        setSelectedTime(TIME_SLOTS[1].time);
      }
    }
  };

  const isCurrentSelectionPast = selectedDate?.isToday && (!selectedTime || getSlotMinutes(selectedTime) <= currentMinutes);
  const canProceed = Boolean(selectedTime) && !isCurrentSelectionPast;

  const handleProceed = () => {
    if (!canProceed) return;
    dispatch(setSlot({ date: selectedDate.fullDate, time: selectedTime }));
    if (activeCategory) dispatch(setCategory(activeCategory));
    navigate("/customer/checkout/payment");
  };

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
            <h1 className="text-sm sm:text-base font-bold text-white">Select Date &amp; Time Slot</h1>
            <p className="text-[11px] text-slate-400">Step 2 of 3: Preferred Arrival Time</p>
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
        {/* Address summary pill */}
        <div className="bg-white border border-outline-variant/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-purple-light text-brand-purple flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">location_on</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-purple bg-brand-purple-light px-2 py-0.5 rounded">
                {address?.label || "Home"}
              </span>
              <span className="text-xs text-on-surface-variant">Service Address</span>
            </div>
            <p className="text-sm font-bold text-on-surface truncate mt-0.5">
              {address?.line1 || "Kesnand Rd, Wagholi, Pune"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/customer/checkout/address")}
            className="text-xs font-bold text-brand-purple hover:underline px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 shrink-0"
          >
            Edit
          </button>
        </div>

        {/* ── Available Workers in Your Area ── */}
        <WorkerPreviewSection
          city={address?.city || ""}
          category={activeCategory}
        />

        {/* Date Selector */}
        <div className="bg-white border border-outline-variant/80 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-on-surface uppercase tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-brand-purple">calendar_month</span>
              1. Select Date of Service
            </h2>
            {hasTodaySlots ? (
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Same Day Available
              </span>
            ) : (
              <span className="text-xs text-amber-700 font-semibold bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                Next Day Booking Open
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 pt-1">
            {DATES.map((d) => {
              const isSelected = selectedDate.day === d.day;
              const isTodayClosed = d.isToday && !hasTodaySlots;

              return (
                <button
                  type="button"
                  key={d.day}
                  onClick={() => handleDateSelect(d)}
                  className={`flex flex-col items-center py-3 px-2 rounded-2xl border transition-all text-center relative ${
                    isSelected
                      ? "border-brand-purple bg-brand-purple text-white shadow-md shadow-brand-purple/25 scale-[1.02]"
                      : "border-outline-variant bg-white text-on-surface hover:border-brand-purple/40 hover:bg-slate-50"
                  }`}
                >
                  <span className={`text-[11px] font-bold ${isSelected ? "text-amber-300" : "text-on-surface-variant"}`}>
                    {d.label}
                  </span>
                  <span className="text-lg font-black mt-0.5 leading-tight">{d.day}</span>
                  <span className={`text-[10px] font-medium ${isSelected ? "text-white/80" : "text-on-surface-variant/70"}`}>
                    {d.subLabel.split(" ")[1]}
                  </span>
                  {isTodayClosed && (
                    <span className="absolute -top-1.5 -right-1 text-[8px] bg-rose-500 text-white font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-tight shadow-sm">
                      Closed
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Free Cancellation Note */}
        <div className="bg-amber-500/10 border border-amber-300/40 rounded-2xl p-3.5 flex items-center gap-3">
          <span className="material-symbols-outlined text-amber-600 text-[20px] shrink-0">verified_user</span>
          <p className="text-xs text-amber-900 font-medium">
            <strong>Free Cancellation:</strong> You can reschedule or cancel for free up to 2 hours before the booked slot.
          </p>
        </div>

        {/* Time Slots Selector */}
        <div className="bg-white border border-outline-variant/80 rounded-2xl p-5 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-on-surface uppercase tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-brand-purple">schedule</span>
              2. Select Arrival Time Slot
            </h2>
            <span className="text-xs text-on-surface-variant font-medium">45-min arrival window</span>
          </div>

          {/* Guidance Banner for Today's Expired Slots */}
          {selectedDate?.isToday && hasTodaySlots && (
            <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-2.5 sm:p-3 flex items-start gap-2.5 text-xs text-amber-900">
              <span className="material-symbols-outlined text-amber-600 text-[18px] shrink-0 mt-0.5">info</span>
              <div>
                <p className="font-bold">Present time se pehle ke slots book nahi kiye ja sakte (✕)</p>
                <p className="text-amber-800 text-[11px] mt-0.5 leading-relaxed">
                  Aap sirf aane wale (upcoming) active slots hi select kar sakte hain. Beete hue samay ke slots par cross (✕) laga hai.
                </p>
              </div>
            </div>
          )}

          {/* All Slots Closed Alert if user views Today after hours */}
          {selectedDate?.isToday && !hasTodaySlots && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-rose-900">
              <span className="material-symbols-outlined text-rose-600 text-[22px] shrink-0">event_busy</span>
              <div className="flex-1">
                <p className="font-black text-sm text-rose-800">Aaj ke sabhi time slots complete ho chuke hain</p>
                <p className="text-rose-700 text-xs mt-1 leading-relaxed">
                  Present time ke baad aaj koi slot uplabdh nahi hai. Agle din ke liye booking karne ke liye kripya <strong>"Tomorrow"</strong> select karein.
                </p>
                <button
                  type="button"
                  onClick={() => handleDateSelect(DATES[1])}
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-purple hover:bg-brand-purple-dark px-3.5 py-1.5 rounded-lg shadow-sm transition-all"
                >
                  <span>Select Tomorrow</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* Slots Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-1">
            {TIME_SLOTS.map((slot) => {
              const isPast = Boolean(selectedDate?.isToday) && getSlotMinutes(slot.time) <= currentMinutes;
              const isSelected = selectedTime === slot.time && !isPast;

              return (
                <button
                  type="button"
                  key={slot.time}
                  disabled={isPast}
                  onClick={() => !isPast && setSelectedTime(slot.time)}
                  className={`relative py-3 px-2 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all flex flex-col items-center justify-center min-h-[56px] ${
                    isPast
                      ? "border-slate-200 bg-slate-100/90 text-slate-400 cursor-not-allowed opacity-75 select-none"
                      : isSelected
                      ? "border-brand-purple bg-brand-purple text-white shadow-md shadow-brand-purple/20 scale-[1.02]"
                      : "border-outline-variant bg-white text-on-surface hover:border-brand-purple/40 hover:bg-slate-50 active:scale-95"
                  }`}
                >
                  {isPast ? (
                    <>
                      {/* Crossed-out Time */}
                      <span className="line-through text-slate-400 text-xs sm:text-sm font-semibold">
                        {slot.time}
                      </span>
                      {/* Cross status indicator */}
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-black text-rose-500 uppercase tracking-tight mt-0.5">
                        <span className="material-symbols-outlined text-[13px] leading-none">close</span>
                        <span>Closed</span>
                      </span>
                      {/* Corner Cross Badge */}
                      <span
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-black shadow-sm"
                        title="This time slot has already passed"
                      >
                        ✕
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{slot.time}</span>
                      {slot.popular && (
                        <span
                          className={`absolute -top-2 right-1 text-[8px] px-1.5 py-0.2 rounded-full font-black uppercase ${
                            isSelected ? "bg-amber-400 text-slate-900" : "bg-brand-orange text-white"
                          }`}
                        >
                          Popular
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Fixed Bottom Sticky Action Bar (Always Visible!) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-outline-variant p-4 pb-safe shadow-2xl">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-on-surface-variant block font-medium">Selected Slot</span>
            <span className="text-sm sm:text-base font-black text-on-surface">
              {canProceed
                ? `${selectedDate.label}, ${selectedDate.day} · ${selectedTime}`
                : selectedDate?.isToday && !hasTodaySlots
                ? "Please choose Tomorrow or a future date"
                : "Please choose an upcoming slot"}
            </span>
          </div>

          <Button
            onClick={handleProceed}
            variant="purple"
            disabled={!canProceed}
            className={`px-6 sm:px-8 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-brand-purple/25 flex items-center gap-2 shrink-0 ${
              !canProceed ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
            }`}
          >
            <span>Proceed to Payment</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Button>
        </div>
      </div>
    </div>
  );
}


