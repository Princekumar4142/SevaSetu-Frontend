import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryDetails } from "../constants/bookingCatalog";
import { addItem, incrementItem, decrementItem, selectCartItems } from "../store/slices/cartSlice";
import CollapsibleSection from "../components/booking/CollapsibleSection";
import ServiceListItem from "../components/booking/ServiceListItem";
import QuantityStepper from "../components/booking/QuantityStepper";
import CartBar from "../components/booking/CartBar";
import MenuPill from "../components/booking/MenuPill";
import { EmptyState } from "../components/Feedback";

function PackageCard({ pkg }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const inCart = items.find((i) => i.id === pkg.id);

  return (
    <div className="border border-outline-variant rounded-xl p-md mb-lg bg-surface-container-lowest shadow-sm hover:shadow transition-all">
      <div className="flex justify-between items-start gap-md mb-sm">
        <div className="w-10 h-10 rounded-lg bg-brand-purple-light flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-brand-purple text-[20px]">{pkg.icon || "bookmark"}</span>
        </div>
        <div className="flex-1">
          {pkg.badge && (
            <span className="inline-block bg-brand-orange/15 text-brand-orange font-status-badge text-status-badge px-2 py-0.5 rounded mb-1 font-bold">
              {pkg.badge}
            </span>
          )}
          <p className="font-label-md text-label-md text-on-surface font-bold">{pkg.name}</p>
          <div className="flex items-center gap-xs mt-0.5">
            <span className="material-symbols-outlined text-brand-orange text-[14px] fill">star</span>
            <span className="font-status-badge text-status-badge text-on-surface-variant">
              {pkg.rating} ({pkg.ratingCount}) · {pkg.durationMins} mins
            </span>
          </div>
          <p className="font-status-badge text-status-badge text-brand-purple font-bold mt-0.5">Customise</p>
          <p className="font-body-md text-body-md text-on-surface mt-1 font-bold">
            {pkg.originalPrice && (
              <span className="text-on-surface-variant line-through mr-1 font-normal font-status-badge">
                ₹{pkg.originalPrice}
              </span>
            )}
            ₹{pkg.price}
          </p>
        </div>
        {inCart ? (
          <QuantityStepper
            qty={inCart.qty}
            onIncrement={() => dispatch(incrementItem(pkg.id))}
            onDecrement={() => dispatch(decrementItem(pkg.id))}
          />
        ) : (
          <button
            type="button"
            onClick={() =>
              dispatch(
                addItem({
                  id: pkg.id,
                  name: pkg.name,
                  price: pkg.price,
                  durationMins: pkg.durationMins,
                  icon: pkg.icon,
                  meta: "customise",
                  originalPrice: pkg.originalPrice,
                  includes: pkg.includes,
                })
              )
            }
            className="border border-brand-purple text-brand-purple font-label-md text-label-md font-bold px-md py-xs rounded-md hover:bg-brand-purple-light transition-colors shrink-0"
          >
            Add
          </button>
        )}
      </div>
      {pkg.includes && (
        <ul className="pl-md list-disc font-status-badge text-status-badge text-on-surface-variant">
          {pkg.includes.map((i) => (
            <li key={i.label}>
              {i.label} – ₹{i.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function BookingPackage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = getCategoryDetails(categoryId);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState(category?.tabs?.[0] || "Bestsellers");

  if (!category) {
    return <EmptyState icon="search_off" title="Category not found" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="flex items-center gap-sm px-margin-mobile pt-4 pb-2">
          <button
            type="button"
            onClick={() => navigate(`/customer/services/${category.id}`)}
            className="text-on-surface hover:text-brand-purple transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-label-md text-label-md text-on-surface font-bold">
            Custom Package: {category.name}
          </h1>
        </div>

        <div className="px-margin-mobile flex flex-col gap-md">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-xl pr-md py-sm rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-brand-purple font-body-md text-body-md"
              placeholder={`Search in ${category.name}...`}
            />
          </div>

          {category.tabs && (
            <div className="flex gap-lg border-b border-outline-variant overflow-x-auto">
              {category.tabs.map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-sm shrink-0 font-label-md text-label-md transition-colors ${
                    activeTab === tab
                      ? "text-brand-purple border-b-2 border-brand-purple font-bold"
                      : "text-on-surface-variant"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          {category.packages &&
            category.packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}

          {category.sections.map((section) => (
            <CollapsibleSection
              key={section.id}
              title={section.title}
              defaultOpen={section.defaultOpen !== false}
            >
              {section.services
                .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
                .map((service) => (
                  <ServiceListItem key={service.id} service={service} />
                ))}
            </CollapsibleSection>
          ))}
        </div>

        <MenuPill />
      </div>

      <CartBar buttonLabel="Review Cart" onProceed={() => navigate("/customer/checkout/address")} />
    </div>
  );
}
