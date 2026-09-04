import { useState } from "react";
import { SERVICE_IMAGES, getServiceImage } from "../../constants/serviceImages";

export default function CategoryIconGrid({ title, items, onSelect, exploreLink }) {
  const [imgErrors, setImgErrors] = useState({});

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl text-on-surface font-extrabold tracking-tight">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
        {items.map((item) => {
          const serviceImg = SERVICE_IMAGES[item.id];
          const hasImgError = imgErrors[item.id];

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onSelect?.(item)}
              className="group bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-brand-purple/50 rounded-2xl p-3.5 flex flex-col items-center text-center transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Badge */}
              {item.badge && (
                <span
                  className={`absolute top-2.5 right-2.5 text-[9px] font-black px-1.5 py-0.5 rounded-full z-10 shadow-sm ${
                    item.badge === "SALE"
                      ? "bg-rose-500 text-white"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Image or Icon Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden mb-2.5 flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 group-hover:scale-105 transition-transform duration-300">
                {serviceImg && !hasImgError ? (
                  <img
                    src={serviceImg}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={() => setImgErrors((prev) => ({ ...prev, [item.id]: true }))}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-purple">
                    <span className="material-symbols-outlined text-[32px] sm:text-[36px]">
                      {item.icon || "handyman"}
                    </span>
                  </div>
                )}
              </div>

              {/* Service Label */}
              <span className="text-xs sm:text-sm font-bold text-on-surface group-hover:text-brand-purple transition-colors leading-tight line-clamp-2">
                {item.label}
              </span>

              <span className="text-[11px] text-slate-400 font-medium mt-1 flex items-center gap-0.5 group-hover:text-brand-purple transition-colors">
                Book now <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              </span>
            </button>
          );
        })}
      </div>

      {exploreLink && (
        <div className="text-right mt-3">
          <button
            type="button"
            onClick={exploreLink.onClick}
            className="text-xs sm:text-sm text-brand-purple hover:text-brand-purple-dark font-bold inline-flex items-center gap-1 hover:underline"
          >
            {exploreLink.label}
          </button>
        </div>
      )}
    </div>
  );
}
