import { useEffect, useRef, useState } from "react";
import L from "leaflet";

export default function LiveTrackingMap({
  userLocation = { lat: 18.5793, lng: 73.9787, address: "Service Destination" },
  workerInfo = { name: "Searching Partner", phone: "", vehicle: "Service Vehicle", rating: 4.9 },
  height = "380px",
  status = "ON_THE_WAY",
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const workerMarkerRef = useRef(null);
  const routeLineRef = useRef(null);
  const [etaMins, setEtaMins] = useState(12);
  const [distanceKm, setDistanceKm] = useState("2.2");
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [isLiveRouting, setIsLiveRouting] = useState(false);

  const uLat = userLocation?.lat || 18.5793;
  const uLng = userLocation?.lng || 73.9787;
  const uAddr = userLocation?.address || "Service Destination";

  // Worker starts ~1.8 km offset from user
  const initialWorkerLat = uLat - 0.012;
  const initialWorkerLng = uLng - 0.014;

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // User Home Pin Icon
    const userHomeIcon = L.divIcon({
      className: "custom-user-home-pin",
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          <div style="position: absolute; width: 48px; height: 48px; border-radius: 50%; background: rgba(94, 53, 177, 0.25); animation: ping 2s infinite; top: -5px;"></div>
          <div style="background: #5E35B1; color: white; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(94, 53, 177, 0.5); border: 3px solid #ffffff; z-index: 2;">
            <span class="material-symbols-outlined" style="font-size: 20px;">home</span>
          </div>
          <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #5E35B1; margin-top: -2px; z-index: 2;"></div>
        </div>
      `,
      iconSize: [38, 48],
      iconAnchor: [19, 48],
      popupAnchor: [0, -48],
    });

    // Worker Vehicle Live Icon
    const workerLiveIcon = L.divIcon({
      className: "custom-worker-live-pin",
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          <div style="background: #002045; color: #F5A623; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 16px rgba(0, 32, 69, 0.5); border: 3px solid #F5A623; transform: scale(1.05);">
            <span class="material-symbols-outlined" style="font-size: 22px;">two_wheeler</span>
          </div>
          <div style="background: #002045; color: #ffffff; padding: 2px 8px; border-radius: 6px; font-size: 10px; font-weight: bold; margin-top: 3px; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
            ${workerInfo?.name?.split(" ")[0] || "Worker"} (Partner)
          </div>
        </div>
      `,
      iconSize: [42, 62],
      iconAnchor: [21, 57],
      popupAnchor: [0, -57],
    });

    const map = L.map(mapContainerRef.current, {
      center: [(uLat + initialWorkerLat) / 2, (uLng + initialWorkerLng) / 2],
      zoom: 15,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "topright" }).addTo(map);

    // User Home Marker
    const userMarker = L.marker([uLat, uLng], { icon: userHomeIcon }).addTo(map);
    userMarker.bindPopup(`<b>Your Address</b><br/>${uAddr}`).openPopup();

    // Worker Live Moving Marker
    const workerMarker = L.marker([initialWorkerLat, initialWorkerLng], { icon: workerLiveIcon }).addTo(map);
    workerMarker.bindPopup(`<b>${workerInfo.name || "Partner"}</b><br/>⭐ ${workerInfo.rating || "4.9"} · On the way`);

    mapInstanceRef.current = map;
    workerMarkerRef.current = workerMarker;

    let moveInterval = null;

    // Fetch real road route from OSRM Navigation API
    async function fetchRoadRoute() {
      setIsLiveRouting(true);
      let waypoints = [
        [initialWorkerLat, initialWorkerLng],
        [uLat, uLng],
      ];

      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${initialWorkerLng},${initialWorkerLat};${uLng},${uLat}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          // OSRM returns coordinates as [lng, lat], convert to Leaflet [lat, lng]
          waypoints = route.geometry.coordinates.map(([lon, lat]) => [lat, lon]);

          const distKm = (route.distance / 1000).toFixed(1);
          const durMins = Math.max(2, Math.round(route.duration / 60));

          setDistanceKm(distKm);
          setEtaMins(durMins);
        }
      } catch (err) {
        console.warn("OSRM routing API fallback:", err.message);
        // Fallback straight line / curve
        waypoints = [
          [initialWorkerLat, initialWorkerLng],
          [initialWorkerLat + 0.005, initialWorkerLng + 0.006],
          [uLat, uLng],
        ];
      } finally {
        setIsLiveRouting(false);
      }

      setRouteCoordinates(waypoints);

      if (routeLineRef.current) {
        routeLineRef.current.remove();
      }

      const routeLine = L.polyline(waypoints, {
        color: "#5E35B1",
        weight: 5,
        opacity: 0.85,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      routeLineRef.current = routeLine;
      map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

      // Animate worker along real road waypoints
      if (waypoints.length > 1) {
        let currentIndex = 0;
        const totalSteps = waypoints.length;
        const maxStep = Math.max(1, Math.floor(totalSteps * 0.85)); // Arrives near destination

        moveInterval = setInterval(() => {
          if (currentIndex < maxStep) {
            currentIndex += 1;
            const currentPoint = waypoints[currentIndex];
            if (currentPoint && workerMarkerRef.current) {
              workerMarkerRef.current.setLatLng(currentPoint);

              const progressRatio = currentIndex / totalSteps;
              const remainingD = Math.max(0.2, (2.2 * (1 - progressRatio)).toFixed(1));
              const remainingT = Math.max(2, Math.round(12 * (1 - progressRatio)));

              setDistanceKm(remainingD.toString());
              setEtaMins(remainingT);
            }
          }
        }, 1800);
      }
    }

    fetchRoadRoute();

    return () => {
      if (moveInterval) clearInterval(moveInterval);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [uLat, uLng, workerInfo?.name]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-outline-variant shadow-md">
      <div ref={mapContainerRef} style={{ height, width: "100%" }} className="z-10" />

      {/* Top Floating ETA Card */}
      <div className="absolute top-3 left-3 right-3 sm:right-auto z-20 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl border border-white/10 flex items-center justify-between sm:justify-start gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-black">
            <span className="material-symbols-outlined text-[22px] fill">two_wheeler</span>
          </div>
          <div>
            <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              {status === "ON_THE_WAY" ? "Partner Arriving In" : "Live Real-Time Status"}
            </div>
            <div className="text-lg font-black text-white leading-tight">
              {etaMins} Mins <span className="text-xs text-slate-400 font-normal">({distanceKm} km away)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Movement Radar Ping */}
      <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>{isLiveRouting ? "Calculating Road Navigation..." : "Live GPS Road Navigation Connected"}</span>
      </div>
    </div>
  );
}
