import { useSelector } from "react-redux";
import { selectCartCount, selectCartSubtotal } from "../../store/slices/cartSlice";

export default function CartBar({ buttonLabel = "Proceed", onProceed, disabled = false }) {
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartSubtotal);

  if (count === 0) return null;

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-outline-variant shadow-[0_-2px_10px_rgba(0,0,0,0.06)] px-margin-mobile py-md">
      <div className="flex items-center justify-between gap-md">
        <div>
          <p className="font-label-md text-label-md text-on-surface font-bold">₹{subtotal}</p>
          <p className="font-status-badge text-status-badge text-on-surface-variant">{count} item{count > 1 ? "s" : ""}</p>
        </div>
        <button
          type="button"
          disabled={disabled}
          onClick={onProceed}
          className="bg-brand-purple text-white font-label-md text-label-md font-bold px-xl py-sm rounded-lg hover:bg-brand-purple-dark transition-colors disabled:opacity-50"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
