import { Outlet } from "react-router-dom";

export default function BookingMobileLayout() {
  return (
    <div className="min-h-screen bg-surface-container-low flex justify-center">
      <div className="w-full max-w-[430px] bg-white min-h-screen overflow-hidden relative lg:max-w-[1280px] lg:min-h-screen lg:shadow-sm">
        <Outlet />
      </div>
    </div>
  );
}
