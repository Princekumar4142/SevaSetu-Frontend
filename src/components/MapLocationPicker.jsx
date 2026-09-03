import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import api from "../services/api";

// Default coordinates (Bettiah / Pune / Central India fallback)
const DEFAULT_LAT = 26.8023;
const DEFAULT_LNG = 84.5074;

export default function MapLocationPicker({
  initialAddress = "",
  initialCoords = null,
  onLocationSelect,
  height = "320px",
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const [coords, setCoords] = useState(
    initialCoords || { lat: DEFAULT_LAT, lng: DEFAULT_LNG }
  );
  const [addressText, setAddressText] = useState(initialAddress || "Locating your address...");
  const [locating, setLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [isSearchingOpen, setIsSearchingOpen] = useState(false);
  const [gpsStatus, setGpsStatus] = useState(null); // feedback message

  // ── Reverse Geocode (Backend API with Photon/Nominatim fallback) ────
  const reverseGeocode = useCallback(
    async (lat, lng) => {
      try {
        // Try our backend proxy first
        const res = await api.get(`/geocode/reverse?lat=${lat}&lng=${lng}`).catch(() => null);
        if (res?.data?.success && res.data.data?.address) {
          const d = res.data.data;
          setAddressText(d.address);
          onLocationSelect?.({
            lat,
            lng,
            address: d.address,
            city: d.city || "Bettiah",
            pincode: d.pincode || "",
            state: d.state || "Bihar",
          });
          return d.address;
        }

        // Direct fallback to Nominatim if backend route not reached
        const fallbackRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        ).then((r) => r.json());

        const addr = fallbackRes.address || {};
        const street = addr.road || addr.suburb || addr.neighbourhood || addr.residential || "";
        const city = addr.city || addr.town || addr.village || addr.county || "Bettiah";
        const state = addr.state || "Bihar";
        const pincode = addr.postcode || "";

        let formatted = fallbackRes.display_name;
        if (street || city) {
          formatted = [street, city, state, pincode].filter(Boolean).join(", ");
        }

        setAddressText(formatted);
        onLocationSelect?.({ lat, lng, address: formatted, city, pincode, state });
        return formatted;
      } catch (err) {
        console.warn("Reverse geocode fallback:", err.message);
        const fallback = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
        setAddressText(fallback);
        onLocationSelect?.({ lat, lng, address: fallback });
        return fallback;
      }
    },
    [onLocationSelect]
  );

  // ── Update Single Marker Position on Map ──────────────────────────
  const updateMarkerPosition = useCallback((lat, lng, label = "") => {
    setCoords({ lat, lng });

    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([lat, lng], 16);
    }

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
      if (label) {
        markerRef.current
          .bindPopup(`<b>${label}</b><br/><span style="font-size:11px;color:#666">Drag pin or click map to move</span>`)
          .openPopup();
      }
    }
  }, []);

  // ── Initialize Map with Google Maps Tiles ──────────────────────────
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Single sleek Google-Maps style location pin
    const pinIcon = L.divIcon({
      className: "custom-single-pin",
      html: `
        <div style="position:relative;display:flex;flex-direction:column;align-items:center;cursor:grab;">
          <div style="background:linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%);color:white;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(124,58,237,0.55);border:3px solid #ffffff;">
            <span class="material-symbols-outlined" style="font-size:24px;">storefront</span>
          </div>
          <div style="width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:11px solid #4F46E5;margin-top:-2px;filter:drop-shadow(0 3px 3px rgba(0,0,0,0.2));"></div>
        </div>
      `,
      iconSize: [44, 55],
      iconAnchor: [22, 55],
      popupAnchor: [0, -55],
    });

    const initLat = coords.lat;
    const initLng = coords.lng;

    const map = L.map(mapContainerRef.current, {
      center: [initLat, initLng],
      zoom: 15,
      zoomControl: false,
      attributionControl: false, // removes any watermark
    });

    // ── Official Google Maps Roadmap Tiles (No API key, No watermark, 100% Google Maps) ──
    L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(map);

    // Zoom buttons placed at top-right
    L.control.zoom({ position: "topright" }).addTo(map);

    // ONLY ONE SINGLE PIN: Worker's Shop / Service Base Location
    const marker = L.marker([initLat, initLng], {
      icon: pinIcon,
      draggable: true,
    }).addTo(map);

    marker
      .bindPopup("<b>Your Shop / Working Location</b><br/><span style=\"font-size:11px;color:#666\">Drag pin to adjust</span>")
      .openPopup();

    marker.on("dragend", async (e) => {
      const pos = e.target.getLatLng();
      updateMarkerPosition(pos.lat, pos.lng);
      await reverseGeocode(pos.lat, pos.lng);
    });

    // Move marker when map is clicked
    map.on("click", async (e) => {
      updateMarkerPosition(e.latlng.lat, e.latlng.lng);
      await reverseGeocode(e.latlng.lat, e.latlng.lng);
    });

    mapInstanceRef.current = map;
    markerRef.current = marker;

    // Auto-detect location on load if no custom address/coords given
    if (!initialCoords && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 16);
          updateMarkerPosition(latitude, longitude, "Your Live Location");
          await reverseGeocode(latitude, longitude);
        },
        async () => {
          // Fallback to IP geolocation if browser GPS not available
          try {
            const ipRes = await fetch("https://freeipapi.com/api/json").then((r) => r.json());
            if (ipRes?.latitude && ipRes?.longitude) {
              map.setView([ipRes.latitude, ipRes.longitude], 15);
              updateMarkerPosition(ipRes.latitude, ipRes.longitude, ipRes.cityName || "Detected Location");
              await reverseGeocode(ipRes.latitude, ipRes.longitude);
            }
          } catch {}
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
      );
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── "Detect GPS" Button Handler (Works on both Mobile & PC/Laptop) ────
  const handleLocateMe = () => {
    setLocating(true);
    setGpsStatus("Detecting your location…");

    const applyLocation = async (lat, lng, label) => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([lat, lng], 16, { duration: 1.2 });
      }
      updateMarkerPosition(lat, lng, label);
      const addr = await reverseGeocode(lat, lng);
      setGpsStatus(`✓ Located: ${label || addr}`);
      setTimeout(() => setGpsStatus(null), 4000);
      setLocating(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          applyLocation(latitude, longitude, "Live GPS Position");
        },
        async (error) => {
          console.warn("Browser GPS unavailable or timed out, trying IP geolocate:", error.message);
          // Automatic IP fallback for laptops/desktops without GPS chip
          try {
            const ipData = await fetch("https://freeipapi.com/api/json").then((r) => r.json());
            if (ipData?.latitude && ipData?.longitude) {
              const label = [ipData.cityName, ipData.regionName].filter(Boolean).join(", ");
              applyLocation(ipData.latitude, ipData.longitude, label || "Detected Network Location");
              return;
            }
          } catch (ipErr) {
            console.warn("IP geolocation also failed:", ipErr.message);
          }

          setGpsStatus("Could not detect GPS. Please search your locality above.");
          setTimeout(() => setGpsStatus(null), 4000);
          setLocating(false);
        },
        { enableHighAccuracy: false, timeout: 6000, maximumAge: 60000 }
      );
    } else {
      // Direct IP fallback
      fetch("https://freeipapi.com/api/json")
        .then((r) => r.json())
        .then((ipData) => {
          if (ipData?.latitude && ipData?.longitude) {
            applyLocation(ipData.latitude, ipData.longitude, ipData.cityName || "Detected Location");
          } else {
            setLocating(false);
          }
        })
        .catch(() => setLocating(false));
    }
  };

  // ── Smart Place Search (Backend + Photon Query Relaxation) ─────────
  const handleSearchPlaces = async () => {
    const raw = searchQuery.trim();
    if (!raw) return;

    setSearching(true);
    setIsSearchingOpen(true);
    setSearchResults([]);

    try {
      // 1. First attempt: call our backend geocode endpoint
      const res = await api.get(`/geocode/search?q=${encodeURIComponent(raw)}`).catch(() => null);
      if (res?.data?.success && res.data.results?.length > 0) {
        setSearchResults(res.data.results);
        setSearching(false);
        return;
      }

      // 2. Client-side fallback with strict state consistency & city resolution
      const INDIAN_STATES = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
        "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
        "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
        "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh"
      ];
      const lowerRaw = raw.toLowerCase();
      const detectedState = INDIAN_STATES.find((s) => lowerRaw.includes(s.toLowerCase()));

      const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);

      // If multi-part query (e.g. "kali bagh mandir, Bettiah, west champaran, Bihar"),
      // resolve the city/district within that state directly
      if (parts.length > 1) {
        const cityQuery = parts.slice(1).join(" ");
        const cityNomUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
          cityQuery
        )}&countrycodes=in&limit=4&addressdetails=1`;
        
        const cityNomRes = await fetch(cityNomUrl).then((r) => r.json()).catch(() => []);
        if (Array.isArray(cityNomRes) && cityNomRes.length > 0) {
          const top = cityNomRes[0];
          const cAddr = top.address || {};
          const city = cAddr.city || cAddr.town || cAddr.county || parts[1] || "Bettiah";
          const state = cAddr.state || detectedState || "Bihar";
          const district = cAddr.state_district || "";
          const pincode = cAddr.postcode || "";

          const formattedDetailed = [
            parts[0].split(" ").map(w => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : "").join(" "),
            city,
            district,
            state,
            pincode,
          ].filter(Boolean).join(", ");

          setSearchResults([
            {
              lat: parseFloat(top.lat),
              lng: parseFloat(top.lon),
              displayName: formattedDetailed,
              city,
              state,
              pincode,
            },
            {
              lat: parseFloat(top.lat),
              lng: parseFloat(top.lon),
              displayName: top.display_name,
              city,
              state,
              pincode,
            },
          ]);
          setSearching(false);
          return;
        }
      }

      // 3. Photon query with strict state filtering
      const clean = raw.replace(/[,\-_/]/g, " ").replace(/\s+/g, " ").trim();
      const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(clean)}&limit=8`;
      const pRes = await fetch(photonUrl).then((r) => r.json()).catch(() => null);

      if (pRes?.features?.length > 0) {
        const filtered = pRes.features
          .filter((f) => {
            if (!detectedState) return true;
            const itemState = (f.properties?.state || "").toLowerCase();
            return itemState.includes(detectedState.toLowerCase());
          })
          .map((f) => {
            const p = f.properties || {};
            const [lng, lat] = f.geometry?.coordinates || [0, 0];
            const name = p.name || "";
            const street = p.street || "";
            const city = p.city || p.town || p.district || "";
            const state = p.state || "";
            const postcode = p.postcode || "";
            const displayName = [name, street, city, state, postcode].filter(Boolean).join(", ");
            return {
              lat: Number(lat),
              lng: Number(lng),
              displayName: displayName || `${city}, ${state}`,
              city,
              state,
              pincode: postcode,
            };
          });

        if (filtered.length > 0) {
          setSearchResults(filtered);
          setSearching(false);
          return;
        }
      }

      // If nothing found at all
      setSearchResults([]);
    } catch (err) {
      console.warn("Search failed:", err);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleSearchPlaces();
    }
  };

  const handleSelectSearchResult = (result) => {
    const lat = Number(result.lat);
    const lng = Number(result.lng);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 16, { duration: 1.2 });
    }

    updateMarkerPosition(lat, lng, result.displayName.split(",")[0]);
    setAddressText(result.displayName);
    setIsSearchingOpen(false);
    setSearchQuery("");

    onLocationSelect?.({
      lat,
      lng,
      address: result.displayName,
      city: result.city || "Bettiah",
      pincode: result.pincode || "",
      state: result.state || "Bihar",
    });
  };

  return (
    <div className="space-y-3">
      {/* ── Search Bar (No <form> tag to prevent form refresh) ── */}
      <div className="relative z-30">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search locality, landmark, temple, street or city..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!isSearchingOpen && e.target.value) setIsSearchingOpen(true);
              }}
              onKeyDown={handleSearchKeyDown}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple/40 shadow-sm"
            />
          </div>

          <button
            type="button"
            disabled={searching}
            onClick={handleSearchPlaces}
            className="px-5 py-2.5 bg-gradient-to-r from-primary to-brand-purple hover:opacity-95 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
          >
            {searching ? (
              <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">search</span>
                Search
              </>
            )}
          </button>
        </div>

        {/* Search Results Dropdown */}
        {isSearchingOpen && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-slate-200 divide-y divide-slate-100 max-h-64 overflow-y-auto z-50 animate-fade-in">
            {searchResults.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSearchResult(item)}
                className="w-full text-left p-3 hover:bg-purple-50/80 transition-colors flex items-start gap-2.5 group"
              >
                <span className="material-symbols-outlined text-brand-purple text-[20px] shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  location_on
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {item.displayName.split(",")[0]}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{item.displayName}</p>
                </div>
                <span className="material-symbols-outlined text-slate-300 text-[16px] shrink-0 group-hover:text-brand-purple transition-colors">
                  arrow_forward
                </span>
              </button>
            ))}
          </div>
        )}

        {/* No results banner */}
        {isSearchingOpen && !searching && searchQuery && searchResults.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 text-center">
            <span className="material-symbols-outlined text-slate-300 text-[32px] block mb-1">search_off</span>
            <p className="text-xs text-slate-700 font-bold">No exact match for "{searchQuery}"</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Try searching with just your locality or town name (e.g. <strong>Bettiah</strong> or <strong>Kali Bagh</strong>)
            </p>
          </div>
        )}
      </div>

      {/* ── Map Container (Pure Google Maps view, Only 1 Pin, No Watermark) ── */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-md border border-slate-200">
        <style>{`.leaflet-control-attribution { display: none !important; }`}</style>

        <div ref={mapContainerRef} style={{ height, width: "100%" }} className="z-10" />

        {/* GPS Live Status Toast */}
        {gpsStatus && (
          <div className="absolute top-3 left-3 right-16 z-20 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl shadow-lg text-xs font-medium flex items-center gap-2 animate-fade-in pointer-events-none">
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">my_location</span>
            <span className="truncate">{gpsStatus}</span>
          </div>
        )}

        {/* Detect GPS Button — bottom-right */}
        <button
          type="button"
          onClick={handleLocateMe}
          disabled={locating}
          title="Detect my live GPS position"
          className="absolute bottom-3 right-3 z-20 bg-white hover:bg-slate-50 text-brand-purple px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-200 flex items-center gap-2 text-xs font-black transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-75"
        >
          <span className={`material-symbols-outlined text-[18px] text-brand-purple ${locating ? "animate-spin" : ""}`}>
            {locating ? "sync" : "my_location"}
          </span>
          <span>{locating ? "Detecting GPS…" : "Detect GPS"}</span>
        </button>

        {/* Tap/Drag Hint Badge — bottom-left */}
        <div className="absolute bottom-3 left-3 z-20 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-medium pointer-events-none flex items-center gap-1">
          <span className="material-symbols-outlined text-[13px] text-amber-400">touch_app</span>
          Tap map or drag pin to your exact shop location
        </div>
      </div>

      {/* ── Detected Address Pill ── */}
      {addressText && (
        <div className="bg-purple-50/90 border border-purple-200 rounded-2xl px-4 py-3 flex items-center gap-3 text-xs text-purple-950 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">storefront</span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-bold text-[10px] text-brand-purple uppercase tracking-wider block">
              Selected Shop / Base Location
            </span>
            <p className="font-bold text-slate-800 truncate">{addressText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
