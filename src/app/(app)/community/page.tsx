import ActivityFeed from "../../../components/blackxcross/ActivityFeed";
import TrendingTheories from "../../../components/blackxcross/TrendingTheories";
import MemberSpotlight from "../../../components/blackxcross/MemberSpotlight";
import { myGroups } from "../../../_mock/blackxcross";
import { FiUsers, FiPlus } from "react-icons/fi";

export default function CommunityPage() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Community Hub
      </h1>

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <ActivityFeed />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <TrendingTheories />
          <MemberSpotlight />
        </div>
      </div>

      <section className="flex flex-col gap-4">
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
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-80"
          >
            <FiPlus size={16} />
            New Group
          </button>
        </div>

        <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {myGroups.map((group) => (
            <li
              key={group.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 text-sm text-foreground/90"
            >
              <span className="truncate">{group.name}</span>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-foreground/50">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {group.memberCount}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
