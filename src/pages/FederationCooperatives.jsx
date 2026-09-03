import { useState } from "react";
import Button from "../components/Button";
import Badge from "../components/Badge";

const COOPERATIVES_DATA = [
  {
    id: "coop-1",
    name: "Mumbai Urban Workers Co-op Ltd.",
    zone: "Mumbai Metropolitan Region",
    registrationNo: "MH-MUM-COOP-49102",
    membersCount: 420,
    activeJobsToday: 68,
    rating: 4.88,
    welfarePool: 482000,
    complianceStatus: "ACTIVE",
    adminName: "Sunil Kadam",
    contactEmail: "admin@mumbaiworkers.coop",
  },
  {
    id: "coop-2",
    name: "Shakti Women Artisans & Beauticians Co-op",
    zone: "Mumbai Suburbs & Thane",
    registrationNo: "MH-THA-COOP-88219",
    membersCount: 280,
    activeJobsToday: 45,
    rating: 4.94,
    welfarePool: 345000,
    complianceStatus: "ACTIVE",
    adminName: "Anita Patil",
    contactEmail: "contact@shaktiwomen.coop",
  },
  {
    id: "coop-3",
    name: "Pune Technicians & Trades Cooperative Society",
    zone: "Pune City & PCMC",
    registrationNo: "MH-PUN-COOP-23104",
    membersCount: 310,
    activeJobsToday: 38,
    rating: 4.82,
    welfarePool: 290000,
    complianceStatus: "ACTIVE",
    adminName: "Mahesh Deshpande",
    contactEmail: "info@punetech.coop",
  },
  {
    id: "coop-4",
    name: "Navi Mumbai Appliance & Electrical Union",
    zone: "Navi Mumbai & Panvel",
    registrationNo: "MH-NVM-COOP-11928",
    membersCount: 195,
    activeJobsToday: 24,
    rating: 4.79,
    welfarePool: 180000,
    complianceStatus: "REVIEW",
    adminName: "Dinesh Joshi",
    contactEmail: "admin@navimumbai.coop",
  },
];

export default function FederationCooperatives() {
  const [cooperatives] = useState(COOPERATIVES_DATA);
  const [selectedCoop, setSelectedCoop] = useState(null);

  const totalMembers = cooperatives.reduce((sum, c) => sum + c.membersCount, 0);
  const totalWelfare = cooperatives.reduce((sum, c) => sum + c.welfarePool, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">Federated Cooperatives</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            State-level registry, performance monitoring, and welfare fund distribution across all affiliated cooperatives
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
          <p className="font-status-badge text-status-badge uppercase tracking-wider text-on-surface-variant font-bold">
            Affiliated Cooperatives
          </p>
          <p className="font-headline-md text-headline-md font-bold text-brand-purple mt-1">
            {cooperatives.length} Cooperatives
          </p>
          <p className="font-status-badge text-status-badge text-brand-success font-medium">100% active state standing</p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
          <p className="font-status-badge text-status-badge uppercase tracking-wider text-on-surface-variant font-bold">
            Total Union Workforce
          </p>
          <p className="font-headline-md text-headline-md font-bold text-on-surface mt-1">
            {totalMembers.toLocaleString()} Members
          </p>
          <p className="font-status-badge text-status-badge text-on-surface-variant">Across Maharashtra Region</p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
          <p className="font-status-badge text-status-badge uppercase tracking-wider text-on-surface-variant font-bold">
            Federation Welfare Reserve
          </p>
          <p className="font-headline-md text-headline-md font-bold text-brand-success mt-1">
            ₹{totalWelfare.toLocaleString()}
          </p>
          <p className="font-status-badge text-status-badge text-brand-success font-medium">Secured in sovereign escrow</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low/50 font-status-badge text-status-badge uppercase tracking-wider text-on-surface-variant">
                <th className="py-3.5 px-4 font-bold">Cooperative Society</th>
                <th className="py-3.5 px-4 font-bold">Operating Zone</th>
                <th className="py-3.5 px-4 font-bold">Members</th>
                <th className="py-3.5 px-4 font-bold">Quality Rating</th>
                <th className="py-3.5 px-4 font-bold">Welfare Pool</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-body-md text-on-surface">
              {cooperatives.map((coop) => (
                <tr key={coop.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-label-md font-bold text-on-surface">{coop.name}</p>
                    <p className="font-status-badge text-status-badge text-on-surface-variant">
                      Reg: {coop.registrationNo}
                    </p>
                  </td>
                  <td className="py-4 px-4 font-medium text-on-surface">
                    {coop.zone}
                  </td>
                  <td className="py-4 px-4 font-semibold">
                    {coop.membersCount} Workers
                  </td>
                  <td className="py-4 px-4 font-bold">
                    ⭐ {coop.rating}
                  </td>
                  <td className="py-4 px-4 font-bold text-brand-success">
                    ₹{coop.welfarePool.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={coop.complianceStatus === "ACTIVE" ? "success" : "warning"}>
                      {coop.complianceStatus}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button variant="outline" size="sm" onClick={() => setSelectedCoop(coop)}>
                      Inspect
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Modal */}
      {selectedCoop && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl animate-fade-in border border-outline-variant">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <h3 className="font-label-lg text-label-lg font-bold text-on-surface">
                Cooperative Dossier
              </h3>
              <button
                type="button"
                onClick={() => setSelectedCoop(null)}
                className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-3 font-body-md text-on-surface">
              <p className="font-bold text-label-md">{selectedCoop.name}</p>
              <p className="font-status-badge text-status-badge text-on-surface-variant">Zone: {selectedCoop.zone}</p>
              
              <div className="bg-surface-container-low/60 p-4 rounded-xl space-y-2 text-body-md">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Lead Admin:</span>
                  <span className="font-semibold">{selectedCoop.adminName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Contact Email:</span>
                  <span className="font-semibold">{selectedCoop.contactEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Active Jobs Today:</span>
                  <span className="font-semibold">{selectedCoop.activeJobsToday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Welfare Reserve:</span>
                  <span className="font-semibold text-brand-success">₹{selectedCoop.welfarePool.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <Button variant="purple" onClick={() => setSelectedCoop(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
