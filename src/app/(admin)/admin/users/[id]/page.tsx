"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiUserX, FiUserCheck, FiSlash } from "react-icons/fi";
import { adminUsers, type UserStatus } from "../../../../../_mock/admin";

const statusStyles: Record<UserStatus, string> = {
  Active: "border-success text-success bg-success/10",
  Suspended: "border-primary text-primary bg-primary/10",
  Banned: "border-border text-muted bg-card",
};

export default function AdminUserDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const user = adminUsers.find((u) => u.id === params.id);
  const [status, setStatus] = useState<UserStatus | undefined>(user?.status);

  if (!user) {
    return (
      <div className="flex w-full flex-col items-center gap-3 py-16 text-center">
        <p className="text-sm text-muted">
          User not found. It may have been removed or the link is incorrect.
        </p>
        <button
          type="button"
          onClick={() => router.push("/admin/users")}
          className="text-sm font-semibold text-primary hover:opacity-80"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <Link
        href="/admin/users"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary"
      >
        <FiArrowLeft size={16} />
        Back to Users
      </Link>

      <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
              {user.username}
            </h1>
            <span className="text-sm text-muted">{user.email}</span>
          </div>
          {status && (
            <span
              className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase ${statusStyles[status]}`}
            >
              {status}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col gap-1 rounded-lg border border-border p-3">
            <span className="text-xs text-muted">Role</span>
            <span className="text-sm font-medium text-foreground/90">
              {user.role}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-border p-3">
            <span className="text-xs text-muted">Joined</span>
            <span className="text-sm font-medium text-foreground/90">
              {user.joinDate}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-border p-3">
            <span className="text-xs text-muted">Cases Submitted</span>
            <span className="text-sm font-medium text-foreground/90">
              {user.casesSubmitted}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-border p-3">
            <span className="text-xs text-muted">Reports Filed</span>
            <span className="text-sm font-medium text-foreground/90">
              {user.reportsFiled}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-border pt-5">
          {status !== "Active" && (
            <button
              type="button"
              onClick={() => setStatus("Active")}
              className="flex items-center gap-1.5 rounded-lg border border-success px-3 py-2 text-xs font-semibold text-success hover:bg-success/10"
            >
              <FiUserCheck size={14} />
              Reactivate
            </button>
          )}
          {status !== "Suspended" && (
            <button
              type="button"
              onClick={() => setStatus("Suspended")}
              className="flex items-center gap-1.5 rounded-lg border border-primary px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10"
            >
              <FiUserX size={14} />
              Suspend
            </button>
          )}
          {status !== "Banned" && (
            <button
              type="button"
              onClick={() => setStatus("Banned")}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:text-primary"
            >
              <FiSlash size={14} />
              Ban
            </button>
          )}
        </div>
      </div>
    </div>
  );
}