import { useSelector } from "react-redux";
import { selectCartCount, selectCartSubtotal } from "../../store/slices/cartSlice";

export default function CartBar({ buttonLabel = "Proceed", onProceed, disabled = false }) {
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartSubtotal);

  if (count === 0) return null;

  return (
    <div className="fixed bottom-[58px] md:bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-outline-variant shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 py-3 z-30">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div>
          <p className="font-label-md text-label-md text-on-surface font-bold text-base">₹{subtotal}</p>
          <p className="font-status-badge text-status-badge text-on-surface-variant">{count} item{count > 1 ? "s" : ""}</p>
        </div>
        <button
          type="button"
          disabled={disabled}
          onClick={onProceed}
          className="bg-brand-purple text-white font-label-md text-label-md font-bold px-6 py-2.5 rounded-xl hover:bg-brand-purple-dark transition-colors disabled:opacity-50 shadow-md shadow-brand-purple/20 cursor-pointer"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
