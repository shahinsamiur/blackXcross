"use client";

import dynamic from "next/dynamic";
import { FiUser, FiUsers } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import { investigationStats } from "../../_mock/blackxcross";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-background text-xs text-muted">
      Loading map...
    </div>
  ),
});

const statIcons = {
  "active-investigations": FiUser,
  "countries-involved": FaStar,
  "community-members": FiUsers,
};

export default function InvestigationsMap() {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
          Active Investigations Map
        </h2>
        <button
          type="button"
          className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground/80 hover:bg-primary/10 hover:opacity-90"
        >
          View Full Map
        </button>
      </div>

      <div className="relative h-56 w-full overflow-hidden rounded-lg border border-border sm:h-64">
        <LeafletMap />
      </div>

      <div className="grid grid-cols-3 divide-x divide-border">
        {investigationStats.map((stat) => {
          const Icon = statIcons[stat.id as keyof typeof statIcons];
          return (
            <div
              key={stat.id}
              className="flex flex-col items-center gap-1 px-3 text-center first:pl-0 last:pr-0"
            >
              <div className="flex items-center gap-2">
                <Icon className="text-primary" size={20} />
                <span className="text-lg font-bold text-foreground/80">
                  {stat.value}
                </span>
              </div>
              <span className="text-[11px] leading-tight text-muted">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
