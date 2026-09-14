"use client";

import ActivityFeed from "../../../components/blackxcross/ActivityFeed";
import TrendingTheories from "../../../components/blackxcross/TrendingTheories";
import { FiUsers, FiPlus } from "react-icons/fi";
import { useGetGroupsQuery } from "../../../state/redux/api/groups";
import { useGetDashboardQuery } from "../../../state/redux/api/dashboard";

const SkeletonGroupItem = () => (
  <li className="flex items-center justify-between rounded-lg border border-border bg-card p-4 animate-pulse">
    <div className="h-4 w-3/4 rounded bg-muted" />
    <div className="h-3 w-10 rounded bg-muted" />
  </li>
);

export default function CommunityPage() {
  const { 
    data: groupsData, 
    isLoading: isGroupsLoading, 
    error: groupsError 
  } = useGetGroupsQuery();

  const { 
    data: dashboardData, 
    isLoading: isDashboardLoading 
  } = useGetDashboardQuery();
  
  const groups = groupsData?.items || [];

  return (
    <div className="flex w-full flex-col gap-8 px-4 pb-10 sm:px-6 lg:px-8">
      <style>{`
        @keyframes community-reveal {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .community-reveal {
          animation: community-reveal 0.5s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .community-reveal { animation: none; }
        }
      `}</style>

      <div className="community-reveal flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Community Hub
        </h1>
        <p className="text-sm text-foreground/60">
          Latest activity, theories, and groups from fellow investigators.
        </p>
      </div>

      <div className="community-reveal grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <ActivityFeed 
            activities={dashboardData?.recentActivity || []} 
            isLoading={isDashboardLoading} 
          />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <TrendingTheories 
            theories={dashboardData?.trendingTheories || []} 
            isLoading={isDashboardLoading} 
          />
        </div>
      </div>

      <div className="border-t border-border" />

      <section className="community-reveal flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FiUsers size={18} className="text-muted" />
            <h2 className="text-sm font-semibold tracking-widest text-muted uppercase">
              Groups
            </h2>
          </div>
          <button
            type="button"
            aria-label="Create group"
            className="flex items-center gap-1.5 rounded-full border border-transparent px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:border-primary/40 hover:bg-primary/10"
          >
            <FiPlus size={16} />
            New Group
          </button>
        </div>

        <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {isGroupsLoading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonGroupItem key={i} />)
          ) : groupsError ? (
            <li className="col-span-full flex items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
              Failed to load groups. Please try again later.
            </li>
          ) : groups.length > 0 ? (
            groups.map((group) => (
              <li
                key={group.id}
                className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 text-sm text-foreground/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-black/20"
              >
                <span className="truncate transition-colors group-hover:text-foreground">
                  {group.name}
                </span>
                <span className="flex shrink-0 items-center gap-1.5 text-xs text-foreground/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  {group.memberCount}
                </span>
              </li>
            ))
          ) : (
            <li className="col-span-full flex items-center justify-center rounded-lg border border-border bg-card p-4 text-sm text-muted">
              No groups found.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}