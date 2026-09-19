import { FiUserPlus } from "react-icons/fi";
import ProfileAvatar from "../ProfileAvatar";
import { getMembersByGroup } from "../../_mock/groups";

const roleStyles: Record<string, string> = {
  owner: "border-primary/40 bg-primary/10 text-primary",
  admin: "border-warning/40 bg-warning/10 text-warning",
  member: "border-border text-foreground/70",
};

export default function MembersTab({ groupId }: { groupId: string }) {
  const members = getMembersByGroup(groupId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{members.length} members</p>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/20"
        >
          <FiUserPlus size={16} />
          Invite Member
        </button>
      </div>

      <ul className="flex flex-col gap-3">
        {members.map((member) => (
          <li
            key={member.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <ProfileAvatar
                src="/image/bg1.jpeg"
                alt={member.name}
                size={40}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground/90">
                  {member.name}
                </p>
                <p className="text-xs text-muted">
                  Joined {member.joinedAt} · {member.contributions}{" "}
                  contributions
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {member.online && (
                <span
                  className="h-1.5 w-1.5 rounded-full bg-success"
                  aria-hidden
                />
              )}
              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${roleStyles[member.role]}`}
              >
                {member.role}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
