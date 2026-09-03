import { useDispatch, useSelector } from "react-redux";
import { addItem, incrementItem, decrementItem, selectCartItems } from "../../store/slices/cartSlice";
import QuantityStepper from "./QuantityStepper";

export default function ServiceListItem({ service }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const inCart = items.find((i) => i.id === service.id);

  return (
    <div className="flex items-center gap-md py-md border-b border-outline-variant last:border-b-0">
      <div className="w-14 h-14 rounded-lg bg-brand-purple-light flex items-center justify-center shrink-0 overflow-hidden">
        <span className="material-symbols-outlined text-brand-purple">{service.icon || "spa"}</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-label-md text-label-md text-on-surface truncate">{service.name}</p>
        <div className="flex items-center gap-xs mt-0.5">
          <span className="material-symbols-outlined text-brand-orange text-[14px] fill">star</span>
          <span className="font-status-badge text-status-badge text-on-surface-variant">
            {service.rating} ({service.ratingCount}) · {service.durationMins} mins
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface mt-0.5">₹{service.price}</p>
      </div>

      {inCart ? (
        <QuantityStepper
          qty={inCart.qty}
          onIncrement={() => dispatch(incrementItem(service.id))}
          onDecrement={() => dispatch(decrementItem(service.id))}
        />
      ) : (
        <button
          type="button"
          onClick={() =>
            dispatch(
              addItem({
                id: service.id,
                name: service.name,
                price: service.price,
                durationMins: service.durationMins,
                icon: service.icon,
              })
            )
          }
          className="border border-brand-purple text-brand-purple font-label-md text-label-md font-bold px-md py-xs rounded-md hover:bg-brand-purple-light transition-colors"
        >
          Add
        </button>
      )}
    </div>
  );
}
