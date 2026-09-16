"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { 
  useGetAdminUsersQuery, 
  useSuspendUserMutation, 
  useBanUserMutation 
} from "../../../../state/redux/api/admin";
import { Skeleton } from "../../../../components/ui/Skeleton";

type UserStatus = "ACTIVE" | "SUSPENDED" | "BANNED" | "Active" | "Suspended" | "Banned";

const statusFilters: (UserStatus | "All")[] = ["All", "ACTIVE", "SUSPENDED", "BANNED"];

const statusStyles: Record<string, string> = {
  ACTIVE: "border-success text-success bg-success/10",
  Active: "border-success text-success bg-success/10",
  SUSPENDED: "border-primary text-primary bg-primary/10",
  Suspended: "border-primary text-primary bg-primary/10",
  BANNED: "border-border text-muted bg-card",
  Banned: "border-border text-muted bg-card",
};

export default function AdminUsersPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All");
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading, error } = useGetAdminUsersQuery({
    page,
    limit,
    search: query || undefined,
    status: statusFilter === "All" ? undefined : statusFilter,
  });

  const [suspendUser, { isLoading: isSuspending }] = useSuspendUserMutation();
  const [banUser, { isLoading: isBanning }] = useBanUserMutation();

  const users = data?.data?.items || [];
  const totalPages = data?.data?.pagination?.totalPages || 0;

  const handleSuspend = async (id: string) => {
    if (confirm("Are you sure you want to suspend this user?")) {
      try {
        await suspendUser(id).unwrap();
      } catch (err) {
        console.error("Failed to suspend user", err);
      }
    }
  };

  const handleBan = async (id: string) => {
    if (confirm("Are you sure you want to ban this user permanently?")) {
      try {
        await banUser(id).unwrap();
      } catch (err) {
        console.error("Failed to ban user", err);
      }
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Users</h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by username or email..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {statusFilters.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => {
                setStatusFilter(status);
                setPage(1);
              }}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                statusFilter === status
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-foreground/80 hover:border-primary/40"
              }`}
            >
              {status === "All" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
          Failed to load users. Please try again later.
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-160 text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Username</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 font-medium">Cases</th>
              <th className="px-4 py-3 font-medium">Reports</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </td>
                  <td className="px-4 py-3"><Skeleton className="h-4 w-20" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-6 w-20 rounded-md" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-4 w-8" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-4 w-8" /></td>
                  <td className="px-4 py-3 text-right"><Skeleton className="h-8 w-20 ml-auto" /></td>
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted">
                  No users match your search.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground/90">{user.username}</span>
                      <span className="text-xs text-muted">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground/80">{user.role}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase ${statusStyles[user.status] || "border-border text-muted bg-card"}`}>
                      {user.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground/80">
                    {new Date(user.createdAt ?? user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-foreground/80">{user.casesSubmitted}</td>
                  <td className="px-4 py-3 text-foreground/80">{user.reportsFiled}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/users/${user.id}`} className="text-xs font-semibold text-primary hover:opacity-80">
                        View
                      </Link>
                      {user.status !== "SUSPENDED" && user.status !== "BANNED" && (
                        <>
                          <button
                            onClick={() => handleSuspend(user.id)}
                            disabled={isSuspending}
                            className="text-xs font-semibold text-yellow-600 hover:opacity-80 disabled:opacity-50"
                            title="Suspend User"
                          >
                            Suspend
                          </button>
                          <button
                            onClick={() => handleBan(user.id)}
                            disabled={isBanning}
                            className="text-xs font-semibold text-red-600 hover:opacity-80 disabled:opacity-50"
                            title="Ban User"
                          >
                            Ban
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && users.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground/80 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground/80 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}