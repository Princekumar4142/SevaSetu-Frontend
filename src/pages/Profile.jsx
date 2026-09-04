import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Badge from "../components/Badge";
import AddressModal from "../components/AddressModal";

export default function Profile() {
  const { currentUser } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  if (!currentUser) return null;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 sm:p-8 shadow-sm max-w-xl mx-auto my-8">
      <div className="flex items-center gap-md mb-lg">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-headline-md font-bold">
          {currentUser.name?.charAt(0)?.toUpperCase()}
        </div>
        <div>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">{currentUser.name}</h2>
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
        
        {/* Delivery / Service Address Row */}
        <div className="border-b border-outline-variant py-3">
          <div className="flex items-center justify-between mb-1">
            <dt className="font-label-md text-label-md text-on-surface-variant font-medium">Delivery Address</dt>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-xs font-bold text-brand-purple hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">edit</span>
              Edit Address
            </button>
          </div>
          <dd className="font-body-md text-body-md text-on-surface font-medium">
            {currentUser.address ? (
              <span>
                {currentUser.address}
                {currentUser.city ? `, ${currentUser.city}` : ""}
                {currentUser.state ? `, ${currentUser.state}` : ""}
                {currentUser.pincode ? ` - ${currentUser.pincode}` : ""}
              </span>
            ) : (
              <span className="text-on-surface-variant italic">No address provided yet</span>
            )}
          </dd>
        </div>
      </dl>

      <AddressModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentUser={currentUser}
      />
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
