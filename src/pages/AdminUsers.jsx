import { useState } from "react";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Input from "../components/Input";

const USERS_DATA = [
  { id: "u-1", name: "Ananya Deshmukh", email: "ananya@example.com", phone: "+91 98201 11223", role: "CUSTOMER", status: "ACTIVE", joined: "12 May 2026", bookingsCount: 14 },
  { id: "u-2", name: "Ramesh Pawar", email: "ramesh.p@example.com", phone: "+91 98201 44321", role: "WORKER", status: "ACTIVE", joined: "10 Jan 2026", bookingsCount: 142 },
  { id: "u-3", name: "Sunil Kadam", email: "sunil.k@mumbaiworkers.coop", phone: "+91 98200 99881", role: "COOPERATIVE_ADMIN", status: "ACTIVE", joined: "01 Dec 2025", bookingsCount: 0 },
  { id: "u-4", name: "Anita Patil", email: "anita.p@shaktiwomen.coop", phone: "+91 98332 11990", role: "COOPERATIVE_ADMIN", status: "ACTIVE", joined: "15 Jan 2026", bookingsCount: 0 },
  { id: "u-5", name: "Dr. Vikram Joshi", email: "vikram.j@federation.gov.in", phone: "+91 98110 00112", role: "FEDERATION_ADMIN", status: "ACTIVE", joined: "01 Nov 2025", bookingsCount: 0 },
  { id: "u-6", name: "Rahul Verma", email: "rahul.v@example.com", phone: "+91 98770 44332", role: "CUSTOMER", status: "SUSPENDED", joined: "04 Feb 2026", bookingsCount: 2 },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(USERS_DATA);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [actionSuccess, setActionSuccess] = useState("");

  const handleToggleStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
          setActionSuccess(`User account ${u.name} marked as ${nextStatus}`);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
    setTimeout(() => setActionSuccess(""), 3500);
  };

  const filtered = users.filter((u) => {
    const searchMatch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    const roleMatch = roleFilter === "ALL" || u.role === roleFilter;
    return searchMatch && roleMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">Platform User Directory</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Inspect all registered accounts, role permissions, and access controls across the platform
          </p>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2 animate-fade-in font-label-md font-medium">
          <span className="material-symbols-outlined text-[20px] text-brand-success fill">check_circle</span>
          {actionSuccess}
        </div>
      )}

      {/* Filter and Search */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm">
        <div className="flex-1 w-full">
          <Input
            placeholder="Search by name, email, or phone number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
          {["ALL", "CUSTOMER", "WORKER", "COOPERATIVE_ADMIN", "FEDERATION_ADMIN"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg font-label-md text-status-badge font-bold transition-colors ${
                roleFilter === r
                  ? "bg-brand-purple text-white"
                  : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {r.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low/50 font-status-badge text-status-badge uppercase tracking-wider text-on-surface-variant">
                <th className="py-3.5 px-4 font-bold">User</th>
                <th className="py-3.5 px-4 font-bold">Role</th>
                <th className="py-3.5 px-4 font-bold">Joined</th>
                <th className="py-3.5 px-4 font-bold">Activity</th>
                <th className="py-3.5 px-4 font-bold">Account Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-body-md text-on-surface">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-purple text-white font-bold flex items-center justify-center text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-label-md font-bold text-on-surface">{user.name}</p>
                        <p className="font-status-badge text-status-badge text-on-surface-variant">
                          {user.email} · {user.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-brand-purple-light/70 text-brand-purple font-status-badge text-[11px] font-bold">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-status-badge text-status-badge text-on-surface-variant">
                    {user.joined}
                  </td>
                  <td className="py-4 px-4 font-semibold">
                    {user.bookingsCount > 0 ? `${user.bookingsCount} orders` : "Admin portal"}
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={user.status === "ACTIVE" ? "success" : "danger"}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button
                      variant={user.status === "ACTIVE" ? "danger" : "outline"}
                      size="sm"
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      {user.status === "ACTIVE" ? "Suspend" : "Re-activate"}
                    </Button>
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
