"use client";

import {
  FiPlus,
  FiMinus,
  FiCrosshair,
  FiUser,
  FiGlobe,
  FiUsers,
} from "react-icons/fi";
import { mapMarkers, investigationStats } from "../../_mock/blackxcross";

const statIcons = {
  "active-investigations": FiUser,
  "countries-involved": FiGlobe,
  "community-members": FiUsers,
};

export default function InvestigationsMap() {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-wide text-foreground uppercase">
          Active Investigations Map
        </h2>
        <button
          type="button"
          className="text-xs font-semibold text-primary hover:opacity-80"
        >
          View Full Map
        </button>
      </div>

      <div className="relative h-56 w-full overflow-hidden rounded-lg border border-border bg-background sm:h-64">
        {mapMarkers.map((marker) => (
          <span
            key={marker.id}
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_6px_var(--primary)]"
            style={{ top: marker.top, left: marker.left }}
          />
        ))}

        <div className="absolute bottom-3 left-3 flex flex-col gap-1.5">
          <button
            type="button"
            aria-label="Zoom in"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-foreground/80 hover:text-primary"
          >
            <FiPlus size={14} />
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-foreground/80 hover:text-primary"
          >
            <FiMinus size={14} />
          </button>
          <button
            type="button"
            aria-label="Locate"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-foreground/80 hover:text-primary"
          >
            <FiCrosshair size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {investigationStats.map((stat) => {
          const Icon = statIcons[stat.id as keyof typeof statIcons];
          return (
            <div
              key={stat.id}
              className="flex flex-col items-center gap-1 text-center"
            >
              <Icon className="text-primary" size={16} />
              <span className="text-lg font-bold text-foreground">
                {stat.value}
              </span>
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
