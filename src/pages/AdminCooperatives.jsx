import { useState } from "react";
import Button from "../components/Button";
import Badge from "../components/Badge";

const ADMIN_COOPERATIVES = [
  {
    id: "coop-1",
    name: "Mumbai Urban Workers Co-op Ltd.",
    zone: "Mumbai Metropolitan Region",
    registrationNo: "MH-MUM-COOP-49102",
    membersCount: 420,
    status: "ACTIVE",
    appliedDate: "01 Dec 2025",
    verifiedByState: true,
  },
  {
    id: "coop-2",
    name: "Shakti Women Artisans & Beauticians Co-op",
    zone: "Mumbai Suburbs & Thane",
    registrationNo: "MH-THA-COOP-88219",
    membersCount: 280,
    status: "ACTIVE",
    appliedDate: "15 Jan 2026",
    verifiedByState: true,
  },
  {
    id: "coop-5",
    name: "Aurangabad Technicians Self-Help Society",
    zone: "Chhatrapati Sambhajinagar",
    registrationNo: "MH-AUR-COOP-99014",
    membersCount: 85,
    status: "PENDING_APPROVAL",
    appliedDate: "29 Aug 2026",
    verifiedByState: false,
  },
];

export default function AdminCooperatives() {
  const [coops, setCoops] = useState(ADMIN_COOPERATIVES);
  const [actionSuccess, setActionSuccess] = useState("");

  const handleApprove = (id, name) => {
    setCoops((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "ACTIVE", verifiedByState: true } : c))
    );
    setActionSuccess(`Cooperative '${name}' approved for platform dispatch & banking integration`);
    setTimeout(() => setActionSuccess(""), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">Cooperative Society Approvals</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Review legal bylaws, cooperative registration credentials, and grant platform integration licenses
          </p>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2 animate-fade-in font-label-md font-medium">
          <span className="material-symbols-outlined text-[20px] text-brand-success fill">check_circle</span>
          {actionSuccess}
        </div>
      )}

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low/50 font-status-badge text-status-badge uppercase tracking-wider text-on-surface-variant">
                <th className="py-3.5 px-4 font-bold">Society Name</th>
                <th className="py-3.5 px-4 font-bold">Zone</th>
                <th className="py-3.5 px-4 font-bold">Reg. Number</th>
                <th className="py-3.5 px-4 font-bold">Initial Members</th>
                <th className="py-3.5 px-4 font-bold">State Verification</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-body-md text-on-surface">
              {coops.map((c) => (
                <tr key={c.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-on-surface">
                    {c.name}
                  </td>
                  <td className="py-4 px-4 font-medium text-on-surface">
                    {c.zone}
                  </td>
                  <td className="py-4 px-4 font-status-badge text-status-badge text-on-surface-variant">
                    {c.registrationNo}
                  </td>
                  <td className="py-4 px-4 font-semibold">
                    {c.membersCount} Workers
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 font-label-md text-status-badge font-bold ${
                        c.verifiedByState ? "text-brand-success" : "text-amber-700"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px] fill">
                        {c.verifiedByState ? "verified" : "pending"}
                      </span>
                      {c.verifiedByState ? "Govt Verified" : "Pending Audit"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={c.status === "ACTIVE" ? "success" : "warning"}>
                      {c.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    {c.status === "PENDING_APPROVAL" ? (
                      <Button
                        variant="purple"
                        size="sm"
                        onClick={() => handleApprove(c.id, c.name)}
                      >
                        Approve License
                      </Button>
                    ) : (
                      <span className="font-status-badge text-status-badge text-brand-success font-bold">
                        Licensed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
