export default function QuantityStepper({ qty, onIncrement, onDecrement, size = "sm" }) {
  const pad = size === "sm" ? "px-2 py-1" : "px-3 py-1.5";
  return (
    <div className={`inline-flex items-center gap-2 border border-brand-purple rounded-md ${pad} text-brand-purple`}>
      <button
        type="button"
        onClick={onDecrement}
        className="font-bold w-4 text-center leading-none"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="font-label-md text-label-md min-w-[14px] text-center">{qty}</span>
      <button
        type="button"
        onClick={onIncrement}
        className="font-bold w-4 text-center leading-none"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
