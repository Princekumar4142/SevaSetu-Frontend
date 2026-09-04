import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryDetails } from "../constants/bookingCatalog";
import { addItem, incrementItem, decrementItem, selectCartItems } from "../store/slices/cartSlice";
import CartBar from "../components/booking/CartBar";
import QuantityStepper from "../components/booking/QuantityStepper";
import { EmptyState } from "../components/Feedback";
import api from "../services/api";

export default function BookingCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const category = useMemo(() => getCategoryDetails(categoryId), [categoryId]);
  const [activeChip, setActiveChip] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Category-specific registered workers and local shops
  const [categoryWorkers, setCategoryWorkers] = useState([]);
  const [loadingWorkers, setLoadingWorkers] = useState(false);

  // Custom Service Form State
  const [customTitle, setCustomTitle] = useState("");
  const [customPrice, setCustomPrice] = useState("199");
  const [customDuration, setCustomDuration] = useState("45");
  const [customDesc, setCustomDesc] = useState("");
  const [customImages, setCustomImages] = useState([]); // [{ file, preview }]
  const [uploadingImages, setUploadingImages] = useState(false);
  const [customFeedback, setCustomFeedback] = useState(null);

  useEffect(() => {
    setActiveChip(null);
    setSearchQuery("");
    setCustomTitle("");
    setCustomImages([]);
    setCustomFeedback(null);

    // Fetch verified workers & local shops registered in this category from MongoDB
    async function loadCategoryWorkers() {
      setLoadingWorkers(true);
      try {
        const res = await api.get(`/workers/verified?category=${categoryId}`);
        if (res.data?.data?.workers && res.data.data.workers.length > 0) {
          setCategoryWorkers(res.data.data.workers);
        } else {
          // If no worker is registered for this specific category, load all verified workers in system
          const allRes = await api.get(`/workers/verified`);
          setCategoryWorkers(allRes.data?.data?.workers || []);
        }
      } catch (err) {
        console.warn("Could not load category workers:", err.message);
        setCategoryWorkers([]);
      } finally {
        setLoadingWorkers(false);
      }
    }

    loadCategoryWorkers();
  }, [categoryId]);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (customImages.length + files.length > 3) {
      alert("You can upload a maximum of 3 photos.");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setCustomImages((prev) => [...prev, ...newImages].slice(0, 3));
    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    setCustomImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddCustomService = async () => {
    if (!customTitle.trim()) {
      alert("Please enter a service name or requirement.");
      return;
    }
    const id = `custom-${Date.now()}`;
    const price = Number(customPrice) > 0 ? Number(customPrice) : 199;
    const duration = Number(customDuration) > 0 ? Number(customDuration) : 45;
    
    let uploadedUrls = [];
    if (customImages.length > 0) {
      setUploadingImages(true);
      try {
        const formData = new FormData();
        customImages.forEach((img) => formData.append("images", img.file));
        const res = await api.post("/upload/images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data?.data?.urls) {
          uploadedUrls = res.data.data.urls;
        }
      } catch (err) {
        console.warn("Using local image previews as fallback:", err.message);
        uploadedUrls = customImages.map((img) => img.preview);
      } finally {
        setUploadingImages(false);
      }
    }

    dispatch(
      addItem({
        id,
        name: customTitle.trim(),
        price,
        durationMins: duration,
        desc: customDesc.trim() || `Custom service requirement in ${category.name}`,
        icon: "edit_note",
        isCustom: true,
        images: uploadedUrls,
      })
    );

    setCustomFeedback(`Added "${customTitle.trim()}" with ${uploadedUrls.length} photo(s) to booking cart!`);
    setCustomTitle("");
    setCustomDesc("");
    setCustomImages([]);
    setTimeout(() => setCustomFeedback(null), 4000);
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <EmptyState
          icon="search_off"
          title="Category Not Found"
          description="Browse available services from our home screen."
          actionLabel="Go to Home"
          onAction={() => navigate("/")}
        />
      </div>
    );
  }

  // Filter sections & services
  const filteredSections = category.sections
    .map((section) => {
      const services = section.services.filter((s) => {
        const matchesChip = !activeChip || section.id.toLowerCase().includes(activeChip.toLowerCase()) || s.name.toLowerCase().includes(activeChip.toLowerCase());
        const matchesSearch = !searchQuery.trim() || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || (s.desc && s.desc.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesChip && matchesSearch;
      });
      return { ...section, services };
    })
    .filter((section) => section.services.length > 0);

  return (
    <div className="min-h-screen bg-surface-container-lowest md:bg-surface pb-32">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-outline-variant/60">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-brand-purple-light hover:text-brand-purple transition-all"
              title="Back"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div>
              <h1 className="font-label-lg text-label-lg font-bold text-on-surface truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                {category.name}
              </h1>
              <p className="font-status-badge text-[11px] text-on-surface-variant flex items-center gap-1">
                <span>{category.categoryType || "Services"}</span>
                <span>•</span>
                <span className="text-brand-success font-semibold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px] fill">verified</span>
                  {category.tag || "Verified Professionals"}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/customer/bookings")}
            className="text-on-surface-variant hover:text-brand-purple flex items-center gap-1 text-status-badge font-bold font-status-badge px-3 py-1.5 rounded-full bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            <span className="hidden sm:inline">My Bookings</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-4 space-y-5">
        {/* Category Hero Summary Card */}
        <div className="bg-gradient-to-br from-brand-purple via-[#53267d] to-[#2b0d4e] rounded-2xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/20 shadow-inner">
                <span className="material-symbols-outlined text-[32px]">{category.icon || "handyman"}</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  {category.categoryType || "Verified Co-op Service"}
                </span>
                <h2 className="text-xl md:text-2xl font-black">{category.name}</h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-white/90">
                  <span className="flex items-center gap-1 font-bold bg-white/20 px-2 py-0.5 rounded-md text-xs">
                    <span className="material-symbols-outlined text-[14px] text-amber-300 fill">star</span>
                    {category.rating || "4.85"}
                  </span>
                  <span>({category.ratingCount || "100k+"} reviews)</span>
                  <span>•</span>
                  <span className="text-emerald-300 font-semibold">100% Fixed Pricing</span>
                </div>
              </div>
            </div>

            <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-white/15">
              <p className="text-xs text-white/70">Need instant assistance?</p>
              <p className="text-sm font-bold text-white">45-min arrival guarantee</p>
            </div>
          </div>
        </div>

        {/* Search & Subcategory Filters */}
        <div className="space-y-3">
          {/* In-page Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${category.name} (e.g. tap, clean, massage, repair)...`}
              className="w-full bg-white border border-outline-variant rounded-xl pl-10 pr-4 py-2.5 text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Sub-Category Pills */}
          {category.chips && category.chips.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveChip(null)}
                className={`px-4 py-2 rounded-xl text-status-badge font-bold shrink-0 transition-all ${
                  activeChip === null
                    ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                    : "bg-white border border-outline-variant text-on-surface hover:border-brand-purple/50"
                }`}
              >
                All Services
              </button>
              {category.chips.map((chip) => {
                const selected = activeChip === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setActiveChip(selected ? null : chip.id)}
                    className={`px-3.5 py-2 rounded-xl text-status-badge font-bold shrink-0 flex items-center gap-1.5 transition-all ${
                      selected
                        ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                        : "bg-white border border-outline-variant text-on-surface hover:border-brand-purple/50"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{chip.icon}</span>
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Nearby Verified Workers & Local Shops Section */}
        {categoryWorkers.length > 0 && (
          <div className="bg-white border border-outline-variant/80 rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-purple bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                  Live Area Network
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-purple text-[20px]">storefront</span>
                  Nearby Verified Workers &amp; Local Shops
                </h3>
              </div>
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                {categoryWorkers.length} Active in Your Area
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoryWorkers.map((worker) => {
                const workerName = worker.user?.name || "Verified Professional";
                const initials = workerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2);

                return (
                  <div
                    key={worker._id}
                    className="border border-slate-200/80 hover:border-brand-purple/50 rounded-2xl p-4 bg-gradient-to-b from-slate-50/50 to-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Shop Photo if available */}
                      {worker.hasShop && worker.shopImage && (
                        <div className="relative w-full h-28 rounded-xl overflow-hidden mb-3 border border-slate-200">
                          <img
                            src={worker.shopImage}
                            alt={worker.shopName || "Shop Front"}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px] text-amber-400">store</span>
                            Local Shop
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-purple to-indigo-700 text-white flex items-center justify-center font-black text-base shrink-0 shadow-md">
                          {initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-sm font-bold text-slate-900 truncate">{workerName}</h4>
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[12px] fill">verified</span>
                              Aadhaar Verified
                            </span>
                          </div>

                          {worker.hasShop && worker.shopName && (
                            <p className="text-xs font-bold text-brand-purple truncate mt-0.5 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">storefront</span>
                              {worker.shopName}
                            </p>
                          )}

                          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                            <span className="text-amber-500 font-bold flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[13px] fill">star</span>
                              {worker.rating || "4.9"}
                            </span>
                            <span>•</span>
                            <span>{worker.experienceYears || 4}+ yrs exp</span>
                            <span>•</span>
                            <span className="text-slate-600 truncate">{worker.location?.address || "Nearby"}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase block">Starting Rate</span>
                        <span className="text-sm font-black text-slate-900">₹{worker.hourlyRate || 299}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const firstService = category.sections[0]?.services[0];
                          if (firstService) {
                            dispatch(addItem(firstService));
                            navigate("/customer/checkout/address");
                          } else {
                            navigate(`/customer/checkout/address`);
                          }
                        }}
                        className="px-4 py-2 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-xl text-xs font-bold shadow-md shadow-brand-purple/20 transition-all flex items-center gap-1"
                      >
                        <span>Book Partner</span>
                        <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Services List */}
        {filteredSections.length === 0 ? (
          <div className="bg-white rounded-2xl border border-outline-variant p-8 my-6 text-center">
            <span className="material-symbols-outlined text-[40px] text-on-surface-variant mb-2">search_off</span>
            <h3 className="font-label-lg font-bold text-on-surface">No services match your search</h3>
            <p className="font-body-md text-on-surface-variant mt-1">Try searching with a different term or clear filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveChip(null);
              }}
              className="mt-4 px-4 py-2 bg-brand-purple-light text-brand-purple font-bold rounded-xl text-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredSections.map((section) => (
              <div key={section.id} className="space-y-3">
                <div className="flex items-center justify-between border-b border-outline-variant/60 pb-2">
                  <h3 className="font-label-lg text-label-lg font-black text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-purple" />
                    {section.title}
                  </h3>
                  <span className="font-status-badge text-[12px] text-on-surface-variant font-medium">
                    {section.services.length} {section.services.length === 1 ? "Option" : "Options"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {section.services.map((service) => {
                    const cartItem = cartItems.find((i) => i.id === service.id);
                    const qty = cartItem ? cartItem.qty : 0;

                    return (
                      <div
                        key={service.id}
                        className="bg-white rounded-2xl border border-outline-variant/80 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="font-label-lg text-label-lg font-bold text-on-surface leading-snug">
                                {service.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="flex items-center gap-0.5 text-xs font-bold text-on-surface bg-surface-container-low px-2 py-0.5 rounded">
                                  <span className="material-symbols-outlined text-[13px] text-amber-500 fill">star</span>
                                  {service.rating} ({service.ratingCount})
                                </span>
                                <span className="text-xs text-on-surface-variant flex items-center gap-0.5">
                                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                                  {service.durationMins} mins
                                </span>
                              </div>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-brand-purple-light/70 text-brand-purple flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-[22px]">
                                {service.icon || category.icon || "spa"}
                              </span>
                            </div>
                          </div>

                          {service.desc && (
                            <p className="font-body-md text-[13px] text-on-surface-variant mt-2.5 line-clamp-2 leading-relaxed">
                              {service.desc}
                            </p>
                          )}
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between pt-4 mt-3 border-t border-outline-variant/50">
                          <div>
                            <span className="text-xs text-on-surface-variant font-medium block">Service Fee</span>
                            <span className="text-lg font-black text-on-surface">
                              ₹{service.price}
                            </span>
                          </div>

                          {qty > 0 ? (
                            <QuantityStepper
                              qty={qty}
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
                                    icon: service.icon || category.icon,
                                  })
                                )
                              }
                              className="px-5 py-2 rounded-xl bg-brand-purple text-white font-bold text-sm hover:bg-brand-purple-dark transition-all shadow-md shadow-brand-purple/20 flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-[16px]">add</span>
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Custom Service Request Box ── */}
        <div className="bg-gradient-to-br from-white via-surface-container-lowest to-surface-container-low rounded-2xl border-2 border-dashed border-brand-purple/40 p-5 md:p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-purple text-white flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[24px]">edit_note</span>
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-black tracking-wider uppercase text-brand-purple bg-brand-purple-light px-2.5 py-0.5 rounded-md inline-block mb-1">
                Custom Requirement
              </span>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                Need something else in {category.name}?
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Type your custom task or unique repair requirement below. Our verified cooperative professional will assist accordingly.
              </p>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Service Name / Requirement <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder={`e.g. Custom repair, multiple fittings, specific requirement...`}
                    className="w-full bg-white border border-outline-variant rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Estimated Inspection / Base Fee (₹)
                    </label>
                    <input
                      type="number"
                      min="99"
                      step="50"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      placeholder="199"
                      className="w-full bg-white border border-outline-variant rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Estimated Time (Mins)
                    </label>
                    <input
                      type="number"
                      min="15"
                      step="15"
                      value={customDuration}
                      onChange={(e) => setCustomDuration(e.target.value)}
                      placeholder="45"
                      className="w-full bg-white border border-outline-variant rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Special Instructions / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={customDesc}
                    onChange={(e) => setCustomDesc(e.target.value)}
                    placeholder="Describe parts needed, room location, urgency, or specific tool requirement..."
                    className="w-full bg-white border border-outline-variant rounded-xl px-4 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 shadow-sm resize-none"
                  />
                </div>

                {/* ── Optional Problem Photos Upload (1-3 images) ── */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-brand-purple">add_a_photo</span>
                      Upload Photos of Problem / Area (Optional)
                    </label>
                    <span className="text-[11px] text-on-surface-variant font-medium">
                      {customImages.length} / 3 photos
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Image Preview Thumbnails */}
                    {customImages.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-brand-purple shadow-sm group">
                        <img src={img.preview} alt={`upload-${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md hover:bg-rose-700 transition-colors"
                          title="Remove photo"
                        >
                          <span className="material-symbols-outlined text-[12px]">close</span>
                        </button>
                      </div>
                    ))}

                    {/* Upload Trigger Button */}
                    {customImages.length < 3 && (
                      <label className="w-20 h-20 rounded-xl border-2 border-dashed border-brand-purple/50 bg-white hover:bg-purple-50 flex flex-col items-center justify-center cursor-pointer transition-colors text-brand-purple group shadow-sm">
                        <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                          photo_camera
                        </span>
                        <span className="text-[10px] font-bold mt-1">Add Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageSelect}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-1.5">
                    Clear photos of the leakage, switchboard, wall, or area help the cooperative worker bring exact parts &amp; tools.
                  </p>
                </div>

                {customFeedback && (
                  <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                    {customFeedback}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleAddCustomService}
                  disabled={uploadingImages}
                  className="w-full sm:w-auto px-6 py-2.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-brand-purple/20 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {uploadingImages ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading Photos...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">add_task</span>
                      Add Custom Service to Booking
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Cart Bar */}
      <CartBar buttonLabel="Proceed to Booking" onProceed={() => navigate("/customer/checkout/address")} />
    </div>
  );
}
