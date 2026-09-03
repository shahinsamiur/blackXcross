"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiArrowLeft, FiHash, FiSend } from "react-icons/fi";
import ProfileAvatar from "../../../../../../components/blackxcross/ProfileAvatar";
import {
  getGroupById,
  getChannelById,
  getMessagesByChannel,
} from "../../../../../../_mock/groups";

export default function ChannelPage() {
  const params = useParams<{ groupId: string; channelId: string }>();
  const group = getGroupById(params.groupId);
  const channel = getChannelById(params.channelId);
  const [messages, setMessages] = useState(
    channel ? getMessagesByChannel(channel.id) : [],
  );
  const [draft, setDraft] = useState("");

  if (!group || !channel) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-10">
        <p className="text-sm text-muted">Channel not found.</p>
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        channelId: channel.id,
        author: "You",
        avatar: "/image/hero1.jpg",
        text,
        timeAgo: "Just now",
      },
    ]);
    setDraft("");
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex items-center gap-3 border-b border-border px-4 py-4 sm:px-6 lg:px-10">
        <Link
          href={`/groups/${group.id}/channels`}
          aria-label="Back to channels"
          className="text-muted hover:text-primary"
        >
          <FiArrowLeft size={18} />
        </Link>
        <FiHash size={16} className="text-muted" />
        <h1 className="text-sm font-semibold text-foreground/90">
          {channel.name}
        </h1>
        <span className="text-xs text-muted">in {group.name}</span>
      </div>

      <ul className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-6 lg:px-10">
        {messages.map((message) => (
          <li key={message.id} className="flex items-start gap-3">
            <ProfileAvatar
              src={message.avatar}
              alt={message.author}
              size={36}
            />
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-medium text-foreground/90">
                  {message.author}
                </p>
                <span className="text-xs text-muted">{message.timeAgo}</span>
              </div>
              <p className="mt-0.5 text-sm leading-relaxed text-foreground/80">
                {message.text}
              </p>
            </div>
          </li>
        ))}
        {messages.length === 0 && (
          <p className="text-sm text-muted">
            No messages yet in #{channel.name}.
          </p>
        )}
      </ul>

      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 border-t border-border px-4 py-4 sm:px-6 lg:px-10"
      >
        <label htmlFor="message-draft" className="sr-only">
          Message #{channel.name}
        </label>
        <input
          id="message-draft"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Message #${channel.name}`}
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-foreground hover:opacity-90"
        >
          <FiSend size={16} />
        </button>
      </form>
    </div>
  );
}
