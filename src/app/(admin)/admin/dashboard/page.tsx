"use client";

import Link from "next/link";
import { FiUsers, FiFileText, FiFlag, FiAlertTriangle } from "react-icons/fi";
// 1. Import the specific types we created earlier
import { 
  useGetAdminDashboardQuery, 
  type AdminReport, 
  type AdminFlag 
} from "../../../../state/redux/api/admin";
import { Skeleton } from "../../../../components/ui/Skeleton";

export default function AdminDashboardPage() {
  const { data, isLoading, error } = useGetAdminDashboardQuery();
  const dashboardData = data?.data;

  const overviewCards = [
    {
      id: "totalUsers",
      label: "Total Users",
      value: dashboardData?.totals?.users?.toLocaleString() ?? "0",
      icon: FiUsers,
      href: "/admin/users",
    },
    {
      id: "activeInvestigations",
      label: "Active Investigations",
      value: dashboardData?.totals?.cases?.toLocaleString() ?? "0",
      icon: FiFileText,
      href: "/admin/cases",
    },
    {
      id: "pendingReports",
      label: "Pending Reports",
      value: dashboardData?.totals?.pendingReports?.toString() ?? "0",
      icon: FiFlag,
      href: "/admin/reports",
    },
    {
      id: "flaggedContent",
      label: "Flagged Content",
      value: dashboardData?.totals?.pendingModeration?.toString() ?? "0",
      icon: FiAlertTriangle,
      href: "/admin/moderation",
    },
  ];

  if (error) {
    return (
      <div className="flex w-full flex-col gap-6">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Dashboard</h1>
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
          Failed to load dashboard data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.id}
              href={card.href}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">
                  {card.label}
                </span>
                {isLoading ? (
                  <Skeleton className="h-5 w-5 rounded-full" />
                ) : (
                  <Icon className="text-primary" size={18} />
                )}
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <span className="text-2xl font-bold text-foreground/90">
                  {card.value}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">Recent Reports</h2>
            <Link href="/admin/reports" className="text-xs font-semibold text-primary hover:opacity-80">
              View All
            </Link>
          </div>
          <ul className="flex w-full flex-col">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="flex w-full items-start justify-between gap-3 py-3 border-b border-border last:border-0">
                  <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-md" />
                </li>
              ))
            ) : dashboardData?.recentReports && dashboardData.recentReports.length > 0 ? (
              dashboardData.recentReports.map((report: AdminReport, i: number) => (
                <li
                  key={report.id || i}
                  className={`flex w-full items-start justify-between gap-3 py-3 ${
                    i !== (dashboardData.recentReports?.length ?? 0) - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-foreground/90">{report.targetLabel}</span>
                    <span className="text-xs text-muted">{report.reason} · reported by {report.reporter}</span>
                  </div>
                  <span className="shrink-0 rounded-md border border-border px-2 py-1 text-[11px] font-semibold uppercase text-muted">
                    {report.status}
                  </span>
                </li>
              ))
            ) : (
              <li className="py-6 text-center text-sm text-muted">No recent reports.</li>
            )}
          </ul>
        </section>

        <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">Flagged Content</h2>
            <Link href="/admin/moderation" className="text-xs font-semibold text-primary hover:opacity-80">
              View All
            </Link>
          </div>
          <ul className="flex w-full flex-col">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="flex w-full items-center justify-between gap-3 py-3 border-b border-border last:border-0">
                  <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-md" />
                </li>
              ))
            ) : dashboardData?.recentFlags && dashboardData.recentFlags.length > 0 ? (
              dashboardData.recentFlags.map((item: AdminFlag, i: number) => (
                <li
                  key={item.id || i}
                  className={`flex w-full items-center justify-between gap-3 py-3 ${
                    i !== (dashboardData.recentFlags?.length ?? 0) - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-foreground/90">{item.contentLabel}</span>
                    <span className="text-xs text-muted">{item.aiFlagReason}</span>
                  </div>
                  <span className="shrink-0 rounded-md border border-primary px-2 py-1 text-[11px] font-semibold uppercase text-primary">
                    {item.status}
                  </span>
                </li>
              ))
            ) : (
              <li className="py-6 text-center text-sm text-muted">No flagged content.</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}