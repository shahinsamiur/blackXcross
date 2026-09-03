"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiHash, FiPlus } from "react-icons/fi";
import { getGroupById, getChannelsByGroup } from "../../../../../_mock/groups";

export default function GroupChannelsPage() {
  const params = useParams<{ groupId: string }>();
  const group = getGroupById(params.groupId);
  const [channelList, setChannelList] = useState(
    group ? getChannelsByGroup(group.id) : [],
  );
  const [newChannel, setNewChannel] = useState("");

  if (!group) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-10">
        <p className="text-sm text-muted">Group not found.</p>
      </div>
    );
  }

  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newChannel.trim().toLowerCase().replace(/\s+/g, "-");
    if (!name) return;
    setChannelList((prev) => [
      ...prev,
      {
        id: `${group.id}-${name}`,
        groupId: group.id,
        name,
        description: "",
        unreadCount: 0,
      },
    ]);
    setNewChannel("");
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <h1 className="font-display text-2xl text-foreground/90">
        {group.name} · Channels
      </h1>

      <ul className="flex flex-col gap-2">
        {channelList.map((channel) => (
          <li key={channel.id}>
            <Link
              href={`/groups/${group.id}/channels/${channel.id}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:border-primary/40"
            >
              <span className="flex items-center gap-2 text-sm text-foreground/85">
                <FiHash size={15} className="text-muted" />
                {channel.name}
              </span>
              {channel.unreadCount > 0 && (
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                  {channel.unreadCount}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleAddChannel}
        className="flex items-center gap-2 rounded-lg border border-border bg-card p-3"
      >
        <FiHash size={15} className="shrink-0 text-muted" aria-hidden />
        <label htmlFor="new-channel" className="sr-only">
          New channel name
        </label>
        <input
          id="new-channel"
          type="text"
          value={newChannel}
          onChange={(e) => setNewChannel(e.target.value)}
          placeholder="new-channel-name"
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary/40 hover:text-primary"
        >
          <FiPlus size={14} />
          Add
        </button>
      </form>
    </div>
  );
}
