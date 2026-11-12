import { FiUsers, FiFileText, FiFlag, FiAlertTriangle } from "react-icons/fi";
import { analyticsOverview, signupsOverTime } from "../../../../_mock/admin";

const overviewCards = [
  {
    id: "totalUsers",
    label: "Total Users",
    value: analyticsOverview.totalUsers.toLocaleString(),
    icon: FiUsers,
  },
  {
    id: "activeInvestigations",
    label: "Active Investigations",
    value: analyticsOverview.activeInvestigations.toLocaleString(),
    icon: FiFileText,
  },
  {
    id: "pendingReports",
    label: "Pending Reports",
    value: analyticsOverview.pendingReports.toString(),
    icon: FiFlag,
  },
  {
    id: "flaggedContent",
    label: "Flagged Content",
    value: analyticsOverview.flaggedContent.toString(),
    icon: FiAlertTriangle,
  },
];

export default function AdminAnalyticsPage() {
  const maxValue = Math.max(...signupsOverTime.map((p) => p.value));

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Analytics
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
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
            </div>
          );
        })}
      </div>

      <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
          Signups Over Time
        </h2>

        <div className="flex items-end gap-4 px-1 pt-4">
          {signupsOverTime.map((point) => {
            const heightPct = (point.value / maxValue) * 100;
            return (
              <div
                key={point.label}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-xs text-foreground/80">
                  {point.value}
                </span>
                <div className="flex h-32 w-full items-end">
                  <div
                    className="w-full rounded-t-md bg-primary/70"
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-xs text-muted">{point.label}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
