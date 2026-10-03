"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiUserX, FiUserCheck, FiSlash } from "react-icons/fi";
import {
  useGetAdminUserByIdQuery,
  useSuspendUserMutation,
  useBanUserMutation,
  useReactivateUserMutation,
} from "../../../../../state/redux/api/admin";
import { Skeleton } from "../../../../../components/ui/Skeleton";
const statusStyles: Record<string, string> = {
  ACTIVE: "border-success text-success bg-success/10",
  Active: "border-success text-success bg-success/10",
  SUSPENDED: "border-primary text-primary bg-primary/10",
  Suspended: "border-primary text-primary bg-primary/10",
  BANNED: "border-border text-muted bg-card",
  Banned: "border-border text-muted bg-card",
};

export default function AdminUserDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetAdminUserByIdQuery(params.id);
  const [suspendUser, { isLoading: isSuspending }] = useSuspendUserMutation();
  const [banUser, { isLoading: isBanning }] = useBanUserMutation();
  const [reactivateUser, { isLoading: isReactivating }] = useReactivateUserMutation();
  const user = data?.data;
  const handleReactivate = async () => {
    if (confirm("Reactivate this user?")) {
      try {
        await reactivateUser(params.id).unwrap();
      } catch (err) {
        console.error("Failed to reactivate user", err);
      }
    }
  };
  const handleSuspend = async () => {
    if (confirm("Are you sure you want to suspend this user?")) {
      try {
        await suspendUser(params.id).unwrap();
      } catch (err) {
        console.error("Failed to suspend user", err);
      }
    }
  };
  const handleBan = async () => {
    if (confirm("Are you sure you want to ban this user permanently?")) {
      try {
        await banUser(params.id).unwrap();
      } catch (err) {
        console.error("Failed to ban user", err);
      }
    }
  };
  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6">
        <Skeleton className="h-4 w-24" />
        <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-5 sm:p-6">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (error || !user) {
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
              {user?.username ?? "undefined"}
            </h1>
            <span className="text-sm text-muted">{user.email}</span>
          </div>
          <span
            className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase ${statusStyles[user.status] || "border-border text-muted bg-card"}`}
          >
            {user.status.toLowerCase()}
          </span>
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
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-border p-3">
            <span className="text-xs text-muted">Cases Submitted</span>
            <span className="text-sm font-medium text-foreground/90">
              {user.casesSubmitted ?? "—"}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-border p-3">
            <span className="text-xs text-muted">Reports Filed</span>
            <span className="text-sm font-medium text-foreground/90">
              {user.reportsFiled ?? "—"}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 border-t border-border pt-5">
          {user.status !== "ACTIVE" && user.status !== "Active" && (
            <button
              type="button"
              onClick={handleReactivate}
              disabled={isReactivating}
              className="flex items-center gap-1.5 rounded-lg border border-success px-3 py-2 text-xs font-semibold text-success hover:bg-success/10 disabled:opacity-50"
            >
              <FiUserCheck size={14} />
              Reactivate
            </button>
          )}
          {user.status !== "SUSPENDED" && user.status !== "Suspended" && user.status !== "BANNED" && user.status !== "Banned" && (
            <button
              type="button"
              onClick={handleSuspend}
              disabled={isSuspending}
              className="flex items-center gap-1.5 rounded-lg border border-primary px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10 disabled:opacity-50"
            >
              <FiUserX size={14} />
              Suspend
            </button>
          )}
          {user.status !== "BANNED" && user.status !== "Banned" && (
            <button
              type="button"
              onClick={handleBan}
              disabled={isBanning}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:text-primary disabled:opacity-50"
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