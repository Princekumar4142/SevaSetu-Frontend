export default function FederationDashboard() {
  return (
    <div className="flex flex-col gap-lg">
      <h2 className="font-headline-lg text-headline-lg text-on-surface">Federation Command Center</h2>
      <p className="font-body-md text-body-md text-on-surface-variant -mt-sm">
        Full analytics, demand forecasting, and cross-cooperative allocation are built in a later phase. This is the
        Phase 1 shell, wired to your authenticated federation-admin session.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        <PlaceholderStat label="Total Cooperatives" />
        <PlaceholderStat label="Total Workers" />
        <PlaceholderStat label="Active Bookings" />
        <PlaceholderStat label="Welfare Fund" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm min-h-[180px] flex items-center justify-center">
          <p className="font-body-md text-body-md text-on-surface-variant">Workforce overview — Phase 2</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm min-h-[180px] flex items-center justify-center">
          <p className="font-body-md text-body-md text-on-surface-variant">AI demand forecast — Phase 2</p>
        </div>
      </div>
    </div>
  );
}

function PlaceholderStat({ label }) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
      <h3 className="font-label-md text-label-md text-on-surface-variant mb-xs">{label}</h3>
      <p className="font-headline-md text-headline-md text-outline-variant font-bold">—</p>
    </div>
  );
}
