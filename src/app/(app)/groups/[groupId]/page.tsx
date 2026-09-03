import Link from "next/link";
import { notFound } from "next/navigation";
import { FiHash, FiUsers, FiSettings, FiChevronRight } from "react-icons/fi";
import ProfileAvatar from "../../../../components/blackxcross/ProfileAvatar";
import GroupBadge from "../../../../components/blackxcross/GroupBadge";
import {
  getGroupById,
  getChannelsByGroup,
  getMembersByGroup,
} from "../../../../_mock/groups";

export default async function GroupHomePage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  const group = getGroupById(groupId);
  if (!group) notFound();

  const channelsPreview = getChannelsByGroup(groupId).slice(0, 3);
  const membersPreview = getMembersByGroup(groupId).slice(0, 5);

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
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

      <p className="text-sm leading-relaxed text-foreground/80">
        {group.description}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href={`/groups/${groupId}/channels`}
          className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5 hover:border-primary/40"
        >
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground/90">
              <FiHash size={16} className="text-muted" />
              Channels
            </h2>
            <FiChevronRight size={16} className="text-muted" />
          </div>
          <ul className="flex flex-col gap-1.5">
            {channelsPreview.map((c) => (
              <li key={c.id} className="text-sm text-foreground/70">
                #{c.name}
                {c.unreadCount > 0 && (
                  <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                    {c.unreadCount}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Link>

        <Link
          href={`/groups/${groupId}/members`}
          className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5 hover:border-primary/40"
        >
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground/90">
              <FiUsers size={16} className="text-muted" />
              Members
            </h2>
            <FiChevronRight size={16} className="text-muted" />
          </div>
          <div className="flex -space-x-2">
            {membersPreview.map((m) => (
              <ProfileAvatar
                key={m.id}
                src="/image/bg1.jpeg"
                alt={m.name}
                size={32}
              />
            ))}
          </div>
        </Link>
      </div>

      <Link
        href={`/groups/${groupId}/settings`}
        className="flex items-center gap-2 self-start text-sm text-muted hover:text-primary"
      >
        <FiSettings size={14} />
        Group Settings
      </Link>
    </div>
  );
}
