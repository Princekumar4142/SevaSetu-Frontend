import { useAuth } from "../hooks/useAuth";
import Badge from "../components/Badge";

export default function Profile() {
  const { currentUser } = useAuth();
  if (!currentUser) return null;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-sm max-w-xl">
      <div className="flex items-center gap-md mb-lg">
        <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed text-headline-md font-headline-md">
          {currentUser.name?.charAt(0)?.toUpperCase()}
        </div>
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">{currentUser.name}</h2>
          {currentUser.role === "WORKER" && (
            <Badge tone={currentUser.isVerified ? "verified" : "pending"} icon={currentUser.isVerified ? "verified" : "hourglass_empty"}>
              {currentUser.isVerified ? "Verified" : "Verification Pending"}
            </Badge>
          )}
        </div>
      </div>

      <dl className="flex flex-col gap-sm">
        <Row label="Phone" value={currentUser.phone} />
        <Row label="Email" value={currentUser.email || "—"} />
        <Row label="Role" value={currentUser.role.replace("_", " ")} />
        <Row label="Preferred Language" value={currentUser.language} />
      </dl>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-outline-variant py-sm">
      <dt className="font-label-md text-label-md text-on-surface-variant">{label}</dt>
      <dd className="font-body-md text-body-md text-on-surface">{value}</dd>
    </div>
  );
}
