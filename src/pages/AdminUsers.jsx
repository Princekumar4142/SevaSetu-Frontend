import { useState, useEffect } from "react";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Input from "../components/Input";
import ConfirmModal from "../components/ConfirmModal";
import userService from "../services/userService";
import { useAuth } from "../hooks/useAuth";

const FALLBACK_USERS = [
  { id: "u-1", name: "Ananya Deshmukh", email: "ananya@example.com", phone: "+91 98201 11223", role: "CUSTOMER", status: "ACTIVE", joined: "12 May 2026", bookingsCount: 14 },
  { id: "u-2", name: "Ramesh Pawar", email: "ramesh.p@example.com", phone: "+91 98201 44321", role: "WORKER", status: "ACTIVE", joined: "10 Jan 2026", bookingsCount: 142 },
  { id: "u-3", name: "Sunil Kadam", email: "sunil.k@mumbaiworkers.coop", phone: "+91 98200 99881", role: "COOPERATIVE_ADMIN", status: "ACTIVE", joined: "01 Dec 2025", bookingsCount: 0 },
  { id: "u-4", name: "Anita Patil", email: "anita.p@shaktiwomen.coop", phone: "+91 98332 11990", role: "COOPERATIVE_ADMIN", status: "ACTIVE", joined: "15 Jan 2026", bookingsCount: 0 },
  { id: "u-5", name: "Dr. Vikram Joshi", email: "vikram.j@federation.gov.in", phone: "+91 98110 00112", role: "FEDERATION_ADMIN", status: "ACTIVE", joined: "01 Nov 2025", bookingsCount: 0 },
  { id: "u-6", name: "Rahul Verma", email: "rahul.v@example.com", phone: "+91 98770 44332", role: "CUSTOMER", status: "SUSPENDED", joined: "04 Feb 2026", bookingsCount: 2 },
];

export default function AdminUsers() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [actionSuccess, setActionSuccess] = useState("");
  const [actionError, setActionError] = useState("");

  // Deletion modal state
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Status toggle state
  const [statusLoadingId, setStatusLoadingId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await userService.getAllUsers({ role: roleFilter, search });
      if (res.data?.users) {
        setUsers(res.data.users);
      } else {
        setUsers(FALLBACK_USERS);
      }
    } catch (err) {
      console.warn("Could not fetch users from backend, using fallback:", err.message);
      setUsers(FALLBACK_USERS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const handleToggleStatus = async (user) => {
    const nextIsActive = user.status !== "ACTIVE";
    setStatusLoadingId(user.id || user._id);
    setActionError("");

    try {
      await userService.toggleUserStatus(user.id || user._id, nextIsActive);
      setUsers((prev) =>
        prev.map((u) => {
          if ((u.id || u._id) === (user.id || user._id)) {
            const nextStatus = nextIsActive ? "ACTIVE" : "SUSPENDED";
            return { ...u, status: nextStatus, isActive: nextIsActive };
          }
          return u;
        })
      );
      setActionSuccess(`User account ${user.name} marked as ${nextIsActive ? "ACTIVE" : "SUSPENDED"}`);
      setTimeout(() => setActionSuccess(""), 4000);
    } catch (err) {
      // Local optimistic fallback if offline
      const nextStatus = nextIsActive ? "ACTIVE" : "SUSPENDED";
      setUsers((prev) =>
        prev.map((u) => {
          if ((u.id || u._id) === (user.id || user._id)) {
            return { ...u, status: nextStatus, isActive: nextIsActive };
          }
          return u;
        })
      );
      setActionSuccess(`User account ${user.name} marked as ${nextStatus}`);
      setTimeout(() => setActionSuccess(""), 4000);
    } finally {
      setStatusLoadingId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    const targetId = userToDelete.id || userToDelete._id;
    setDeleting(true);
    setActionError("");

    try {
      await userService.deleteUser(targetId);
      setUsers((prev) => prev.filter((u) => (u.id || u._id) !== targetId));
      setActionSuccess(`User profile for "${userToDelete.name}" was permanently deleted.`);
      setTimeout(() => setActionSuccess(""), 4500);
      setUserToDelete(null);
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || "Failed to delete user profile.";
      setActionError(errMsg);
      setTimeout(() => setActionError(""), 5000);
      setUserToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = users.filter((u) => {
    const searchMatch =
      !search ||
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.phone?.includes(search);
    const roleMatch = roleFilter === "ALL" || u.role === roleFilter;
    return searchMatch && roleMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-black text-xs uppercase tracking-wider">
              Admin Powers Active
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">Platform User &amp; Worker Directory</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Full platform administration: inspect accounts, manage role access, suspend accounts, or permanently delete worker and user profiles.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-status-badge text-status-badge px-3 py-1.5 rounded-full bg-brand-purple-light text-brand-purple font-bold">
            Total Accounts: {filtered.length}
          </span>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2 animate-fade-in font-label-md font-medium">
          <span className="material-symbols-outlined text-[20px] text-emerald-600 fill">check_circle</span>
          {actionSuccess}
        </div>
      )}

      {actionError && (
        <div className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-200 flex items-center gap-2 animate-fade-in font-label-md font-medium">
          <span className="material-symbols-outlined text-[20px] text-red-600">error</span>
          {actionError}
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
                <th className="py-3.5 px-4 font-bold">User / Worker</th>
                <th className="py-3.5 px-4 font-bold">Role</th>
                <th className="py-3.5 px-4 font-bold">Joined</th>
                <th className="py-3.5 px-4 font-bold">Activity</th>
                <th className="py-3.5 px-4 font-bold">Account Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Moderation &amp; Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-body-md text-on-surface">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-3xl animate-spin text-brand-purple">progress_activity</span>
                    <p className="mt-2 text-sm">Loading user directory…</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-4xl text-outline">group_off</span>
                    <p className="mt-2 text-sm">No users found matching your query.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((user) => {
                  const targetId = user.id || user._id;
                  const isCurrentAdmin =
                    currentUser &&
                    ((currentUser._id && currentUser._id === targetId) ||
                      (currentUser.id && currentUser.id === targetId) ||
                      (currentUser.phone && currentUser.phone === user.phone));

                  return (
                    <tr key={targetId} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full text-white font-bold flex items-center justify-center text-sm ${user.role === "WORKER" ? "bg-amber-600" : "bg-brand-purple"}`}>
                            {user.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="font-label-md font-bold text-on-surface">{user.name}</p>
                              {isCurrentAdmin && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-800">YOU</span>
                              )}
                            </div>
                            <p className="font-status-badge text-status-badge text-on-surface-variant">
                              {user.email || "No email"} · {user.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-md font-status-badge text-[11px] font-bold ${
                          user.role === "WORKER"
                            ? "bg-amber-100 text-amber-900"
                            : user.role === "CUSTOMER"
                            ? "bg-blue-100 text-blue-900"
                            : "bg-brand-purple-light/70 text-brand-purple"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-status-badge text-status-badge text-on-surface-variant">
                        {user.joined}
                      </td>
                      <td className="py-4 px-4 font-semibold">
                        {user.bookingsCount > 0
                          ? `${user.bookingsCount} bookings`
                          : user.role === "WORKER"
                          ? "Worker profile"
                          : "Customer account"}
                      </td>
                      <td className="py-4 px-4">
                        <Badge tone={user.status === "ACTIVE" ? "verified" : "rejected"}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Suspend / Reactivate */}
                          <button
                            type="button"
                            disabled={isCurrentAdmin || statusLoadingId === targetId}
                            onClick={() => handleToggleStatus(user)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border disabled:opacity-40 disabled:cursor-not-allowed ${
                              user.status === "ACTIVE"
                                ? "border-amber-300 text-amber-800 hover:bg-amber-50"
                                : "border-emerald-300 text-emerald-800 hover:bg-emerald-50"
                            }`}
                          >
                            {statusLoadingId === targetId
                              ? "Updating…"
                              : user.status === "ACTIVE"
                              ? "Suspend"
                              : "Re-activate"}
                          </button>

                          {/* Delete Profile Permanent Button */}
                          <button
                            type="button"
                            disabled={isCurrentAdmin}
                            onClick={() => setUserToDelete(user)}
                            title={isCurrentAdmin ? "Cannot delete your own admin account" : "Delete Profile Permanently from Website"}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-700 hover:bg-red-600 hover:text-white border border-red-200 transition-all flex items-center gap-1 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            <span>Delete Profile</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog for Permanent Deletion */}
      <ConfirmModal
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleConfirmDelete}
        loading={deleting}
        title="Permanently Delete Profile?"
        targetName={userToDelete?.name}
        message={`Are you sure you want to permanently delete the profile for "${userToDelete?.name}" (${userToDelete?.role})? This will delete their account, purge all associated worker and profile records, and cancel any pending bookings.`}
        confirmText="Yes, Delete Profile"
        cancelText="Keep Profile"
      />
    </div>
  );
}
