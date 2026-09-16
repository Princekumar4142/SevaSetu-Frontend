import { useState } from "react";
import { SERVICE_IMAGES, getServiceImage, getServiceFallbackImage } from "../../constants/serviceImages";
import { useLanguage } from "../../context/LanguageContext";

export default function CategoryIconGrid({ title, items, onSelect, exploreLink }) {
  const [fallbacks, setFallbacks] = useState({});
  const [imgErrors, setImgErrors] = useState({});
  const { tr } = useLanguage();

  const handleImageError = (item) => {
    // If not yet tried local guaranteed fallback, try it first
    if (!fallbacks[item.id]) {
      const fallbackUrl = getServiceFallbackImage(item.id, item.label);
      setFallbacks((prev) => ({ ...prev, [item.id]: fallbackUrl }));
    } else {
      // If even local asset failed (virtually impossible), flag error
      setImgErrors((prev) => ({ ...prev, [item.id]: true }));
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl text-on-surface dark:text-white font-extrabold tracking-tight">
          {tr(title)}
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
        {items.map((item) => {
          const initialImg = SERVICE_IMAGES[item.id] || getServiceImage(item.id, item.label);
          const serviceImg = fallbacks[item.id] || initialImg;
          const hasImgError = imgErrors[item.id];

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onSelect?.(item)}
              className="group bg-white dark:bg-[#111726] hover:bg-slate-50 dark:hover:bg-[#162035] border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500/60 rounded-3xl p-3 flex flex-col items-center text-center transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-indigo-950/20 hover:-translate-y-1 relative overflow-hidden cursor-pointer"
            >
              {/* Badge */}
              {item.badge && (
                <span
                  className={`absolute top-2.5 right-2.5 text-[9px] font-black px-2 py-0.5 rounded-full z-10 shadow-sm tracking-wider uppercase ${
                    item.badge === "TATKAL" || item.badge === "EMERGENCY"
                      ? "bg-rose-600 text-white"
                      : item.badge === "AI TECH"
                      ? "bg-indigo-600 text-white"
                      : item.badge === "POPULAR"
                      ? "bg-emerald-600 text-white"
                      : item.badge === "CO-OP"
                      ? "bg-amber-600 text-white"
                      : "bg-slate-800 text-white"
                  }`}
                >
                  {tr(item.badge)}
                </span>
              )}

              {/* Image or Visual Logo Container */}
              <div className="w-full h-24 sm:h-28 rounded-2xl overflow-hidden mb-2.5 flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 group-hover:scale-[1.02] transition-transform duration-300 relative shadow-inner">
                {serviceImg && !hasImgError ? (
                  <img
                    src={serviceImg}
                    alt={tr(item.label)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={() => handleImageError(item)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 text-emerald-700 dark:text-emerald-400">
                    <span className="material-symbols-outlined text-[36px]">
                      {item.icon || "agriculture"}
                    </span>
                  </div>
                )}
                {/* Subtle soft bottom shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Service Label */}
              <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-tight line-clamp-2 px-1">
                {tr(item.label)}
              </span>

              <span className="text-[11px] text-slate-400 dark:text-slate-400 font-bold mt-1.5 flex items-center gap-0.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                {tr("Book now")} <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
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
            {tr(exploreLink.label)}
          </button>
        </div>
      )}
    </div>
  );
}
