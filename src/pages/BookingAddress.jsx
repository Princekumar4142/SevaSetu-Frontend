import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, selectCartAddress } from "../store/slices/cartSlice";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../context/LanguageContext";
import MapLocationPicker from "../components/MapLocationPicker";
import Input from "../components/Input";
import Button from "../components/Button";

export default function BookingAddress() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { tr } = useLanguage();
  const cartAddress = useSelector(selectCartAddress);

  const [addressLine, setAddressLine] = useState(
    cartAddress?.line1 || "Locating address via GPS..."
  );
  const [flatNo, setFlatNo] = useState(cartAddress?.flatNo || "");
  const [landmark, setLandmark] = useState(cartAddress?.landmark || "");
  const [addressType, setAddressType] = useState(cartAddress?.label || "Home");
  const [coords, setCoords] = useState(
    cartAddress?.lat && cartAddress?.lng
      ? { lat: cartAddress.lat, lng: cartAddress.lng }
      : null
  );
  const [city, setCity] = useState(cartAddress?.city || "Pune");
  const [pincode, setPincode] = useState(cartAddress?.pincode || "");

  const handleSave = () => {
    const fullAddress = flatNo ? `${flatNo}, ${landmark ? landmark + ", " : ""}${addressLine}` : addressLine;
    dispatch(
      setAddress({
        label: addressType,
        line1: fullAddress,
        flatNo,
        landmark,
        city: city || "Bettiah",
        pincode: pincode || "845438",
        lat: coords?.lat || 26.8023,
        lng: coords?.lng || 84.5074,
        contactName: currentUser?.name || "Customer",
      })
    );
    navigate("/customer/checkout/slot");
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest md:bg-surface">
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
            <h1 className="text-sm sm:text-base font-bold text-white">{tr("Select Service Location")}</h1>
            <p className="text-[11px] text-slate-400">{tr("Step 1 of 3: Delivery Address & Map")}</p>
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

      <div className="max-w-3xl mx-auto w-full p-4 sm:p-6 space-y-5 pb-24">
        {/* Interactive Map */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-brand-purple">map</span>
              {tr("Pinpoint on Map")}
            </span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {tr("Verified Worker Available in Area")}
            </span>
          </div>

          <MapLocationPicker
            initialAddress={addressLine}
            initialCoords={coords}
            height="290px"
            onLocationSelect={(loc) => {
              if (loc.address) setAddressLine(loc.address);
              if (loc.lat && loc.lng) setCoords({ lat: loc.lat, lng: loc.lng });
              if (loc.city) setCity(loc.city);
              if (loc.pincode) setPincode(loc.pincode);
            }}
          />
        </div>

        {/* Address Input Form */}
        <div className="bg-white border border-outline-variant/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-start justify-between border-b border-outline-variant/50 pb-3.5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-purple-light text-brand-purple flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase">{tr("Current Area")}</p>
                <p className="text-sm font-bold text-on-surface leading-snug">{addressLine}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const newAdd = prompt(tr("Enter complete address or street:"), addressLine);
                if (newAdd) setAddressLine(newAdd);
              }}
              className="text-xs font-bold text-brand-purple hover:underline px-2.5 py-1 rounded-lg bg-brand-purple-light shrink-0"
            >
              {tr("Change Area")}
            </button>
          </div>

          {/* Address Type Selector */}
          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1.5">{tr("Address Type")}</label>
            <div className="flex gap-2">
              {["Home", "Office", "Shop / Other"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAddressType(type)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    addressType === type
                      ? "border-brand-purple bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                      : "border-outline-variant bg-white text-on-surface hover:border-brand-purple/40"
                  }`}
                >
                  {tr(type)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label={tr("House / Flat / Block No.")}
              placeholder={tr("e.g. Flat 402, Sunshine Heights")}
              value={flatNo}
              onChange={(e) => setFlatNo(e.target.value)}
              required
            />
            <Input
              label={tr("Nearby Landmark")}
              placeholder={tr("e.g. Near Ayurvedic College")}
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button onClick={handleSave} variant="purple" className="w-full justify-center py-3.5 text-base shadow-lg shadow-brand-purple/25">
            <span>{tr("Save Address & Proceed to Slots")}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

