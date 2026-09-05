"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { adminUsers, type UserStatus } from "../../../../_mock/admin";

const statusFilters: (UserStatus | "All")[] = [
  "All",
  "Active",
  "Suspended",
  "Banned",
];

const statusStyles: Record<UserStatus, string> = {
  Active: "border-success text-success bg-success/10",
  Suspended: "border-primary text-primary bg-primary/10",
  Banned: "border-border text-muted bg-card",
};

export default function AdminUsersPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All");

  const filteredUsers = useMemo(() => {
    return adminUsers.filter((user) => {
      const matchesQuery =
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Users
      </h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            size={16}
          />
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
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                statusFilter === status
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-foreground/80 hover:border-primary/40"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

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
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground/90">
                      {user.username}
                    </span>
                    <span className="text-xs text-muted">{user.email}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground/80">{user.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase ${statusStyles[user.status]}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-foreground/80">
                  {user.joinDate}
                </td>
                <td className="px-4 py-3 text-foreground/80">
                  {user.casesSubmitted}
                </td>
                <td className="px-4 py-3 text-foreground/80">
                  {user.reportsFiled}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="text-xs font-semibold text-primary hover:opacity-80"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-muted">
                  No users match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}