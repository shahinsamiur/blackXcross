import Link from "next/link";
import {
  FiUsers,
  FiFileText,
  FiFlag,
  FiAlertTriangle,
} from "react-icons/fi";
import {
  analyticsOverview,
  adminReports,
  moderationItems,
} from "../../../../_mock/admin";

const overviewCards = [
  {
    id: "totalUsers",
    label: "Total Users",
    value: analyticsOverview.totalUsers.toLocaleString(),
    icon: FiUsers,
    href: "/admin/users",
  },
  {
    id: "activeInvestigations",
    label: "Active Investigations",
    value: analyticsOverview.activeInvestigations.toLocaleString(),
    icon: FiFileText,
    href: "/admin/cases",
  },
  {
    id: "pendingReports",
    label: "Pending Reports",
    value: analyticsOverview.pendingReports.toString(),
    icon: FiFlag,
    href: "/admin/reports",
  },
  {
    id: "flaggedContent",
    label: "Flagged Content",
    value: analyticsOverview.flaggedContent.toString(),
    icon: FiAlertTriangle,
    href: "/admin/moderation",
  },
];

export default function AdminDashboardPage() {
  const recentReports = adminReports.slice(0, 3);
  const recentFlags = moderationItems
    .filter((m) => m.status === "Flagged")
    .slice(0, 3);

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.id}
              href={card.href}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">
                  {card.label}
                </span>
                <Icon className="text-primary" size={18} />
              </div>
              <span className="text-2xl font-bold text-foreground/90">
                {card.value}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
              Recent Reports
            </h2>
            <Link
              href="/admin/reports"
              className="text-xs font-semibold text-primary hover:opacity-80"
            >
              View All
            </Link>
          </div>
          <ul className="flex flex-col">
            {recentReports.map((report, i) => (
              <li
                key={report.id}
                className={`flex items-center justify-between gap-3 py-3 ${
                  i !== recentReports.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-sm text-foreground/90">
                    {report.targetLabel}
                  </span>
                  <span className="text-xs text-muted">
                    {report.reason} · reported by {report.reporter}
                  </span>
                </div>
                <span className="shrink-0 rounded-md border border-border px-2 py-1 text-[11px] font-semibold uppercase text-muted">
                  {report.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
              Flagged Content
            </h2>
            <Link
              href="/admin/moderation"
              className="text-xs font-semibold text-primary hover:opacity-80"
            >
              View All
            </Link>
          </div>
          <ul className="flex flex-col">
            {recentFlags.map((item, i) => (
              <li
                key={item.id}
                className={`flex items-center justify-between gap-3 py-3 ${
                  i !== recentFlags.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-sm text-foreground/90">
                    {item.contentLabel}
                  </span>
                  <span className="text-xs text-muted">
                    {item.aiFlagReason}
                  </span>
                </div>
                <span className="shrink-0 rounded-md border border-primary px-2 py-1 text-[11px] font-semibold uppercase text-primary">
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}