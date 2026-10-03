import ProfileAvatar from "../ProfileAvatar";
import GroupBadge from "../GroupBadge";
import type { Group } from "../../_mock/groups";
export default function GroupHeader({ group }: { group: Group }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-center gap-4">
        <ProfileAvatar src={group.avatar} alt={group.name} size={64} />
        <div>
          <h1 className="font-display text-xl text-foreground/90 sm:text-2xl">
            {group.name}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <GroupBadge
              visibility={group.visibility}
              activity={group.activity}
            />
            <span className="text-xs text-muted">
              · {group.memberCount} members · {group.category}
            </span>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/20"
      >
        {group.joined ? "Leave Group" : "Join Group"}
      </button>
    </div>
  );
}
