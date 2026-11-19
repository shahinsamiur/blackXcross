"use client";

import { useState } from "react";
import {
  FiMessageSquare,
  FiSend,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { BiUpvote, BiSolidUpvote } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  useGetCaseTheoriesQuery,
  useCreateTheoryMutation,
  useUpvoteTheoryMutation,
} from "../../state/redux/api/theories";
import {
  useGetTheoryCommentsQuery,
  useCreateCommentMutation,
  useCreateCommentReplyMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} from "../../state/redux/api/comments";
import type { TheoryItem } from "../../state/redux/api/theories";
import type { CommentItem } from "../../state/redux/api/comments";

type TheoriesSectionProps = {
  caseId: string;
  canInteract: boolean;
};

type PersonLike = {
  username: string | null;
  name: string;
  avatar: string | null;
};

function displayName(user: { username: string | null; name: string }) {
  return user.username || user.name;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function timeAgo(iso: string) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (Number.isNaN(seconds) || seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

function UserAvatar({ user, size = 36 }: { user: PersonLike; size?: number }) {
  const [failed, setFailed] = useState(false);
  const raw = user.avatar?.trim();
  const src =
    raw && (/^https?:\/\//i.test(raw) || raw.startsWith("/")) ? raw : null;
  const name = displayName(user);

  return (
    <span
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-bold text-primary ring-1 ring-primary/20"
      style={{ width: size, height: size, fontSize: size <= 28 ? 10 : 12 }}
    >
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        getInitials(name)
      )}
    </span>
  );
}

export function TheoriesSection({ caseId, canInteract }: TheoriesSectionProps) {
  const { data: theories, isLoading } = useGetCaseTheoriesQuery(caseId);
  const [createTheory, { isLoading: isCreatingTheory }] =
    useCreateTheoryMutation();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmitTheory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await createTheory({
        caseId,
        data: { title: title.trim(), content: content.trim() || undefined },
      }).unwrap();
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Failed to create theory:", err);
      alert("Failed to submit theory. Please try again.");
    }
  };
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
        Theories
      </h2>
      {canInteract ? (
        <form
          onSubmit={handleSubmitTheory}
          className="flex flex-col gap-2 border-b border-border pb-4"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Theory title"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
          <textarea
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your theory..."
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isCreatingTheory || !title.trim()}
            className="self-end rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-foreground hover:opacity-90 disabled:opacity-60"
          >
            {isCreatingTheory ? "Posting..." : "Post Theory"}
          </button>
        </form>
      ) : (
        <p className="border-b border-border pb-4 text-xs text-muted">
          Log in to post a theory.
        </p>
      )}
      {isLoading && <p className="text-xs text-muted">Loading theories...</p>}
      {!isLoading && (!theories || theories.length === 0) && (
        <p className="text-xs text-muted">
          No theories yet. Be the first to share one.
        </p>
      )}
      <div className="flex flex-col gap-3">
        {theories?.map((theory) => (
          <TheoryRow
            key={theory.id}
            theory={theory}
            caseId={caseId}
            canInteract={canInteract}
            isExpanded={expandedId === theory.id}
            onToggle={() =>
              setExpandedId((prev) => (prev === theory.id ? null : theory.id))
            }
          />
        ))}
      </div>
    </section>
  );
}

function TheoryRow({
  theory,
  caseId,
  canInteract,
  isExpanded,
  onToggle,
}: {
  theory: TheoryItem;
  caseId: string;
  canInteract: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [upvoteTheory, { isLoading: isUpvoting }] = useUpvoteTheoryMutation();
  const upvoted = !!theory.upvotedByMe;

  const handleToggleUpvote = async () => {
    try {
      await upvoteTheory({ id: theory.id, caseId }).unwrap();
    } catch (err) {
      console.error("Failed to update upvote:", JSON.stringify(err));
    }
  };

  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex items-start gap-3">
        <UserAvatar user={theory.user} size={36} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-sm font-semibold text-foreground/90">
            {theory.title}
          </span>
          <span className="text-xs text-muted">
            by {displayName(theory.user)} · {timeAgo(theory.createdAt)}
          </span>
          {theory.content && (
            <p className="mt-1 wrap-break-word text-sm leading-relaxed text-muted">
              {theory.content}
            </p>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={handleToggleUpvote}
          disabled={!canInteract || isUpvoting}
          aria-pressed={upvoted}
          aria-label={upvoted ? "Remove upvote" : "Upvote theory"}
          title={canInteract ? undefined : "Log in to upvote"}
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            upvoted
              ? "border-primary/50 bg-primary/10 text-primary"
              : "border-border text-foreground/80 hover:border-primary/40 hover:text-primary"
          }`}
        >
          {upvoted ? <BiSolidUpvote size={16} /> : <BiUpvote size={16} />}
          {theory._count.upvotes}
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
        >
          <FiMessageSquare size={14} /> {theory._count.comments}
          {isExpanded ? <FiChevronUp size={13} /> : <FiChevronDown size={13} />}
        </button>
      </div>
      {isExpanded && (
        <CommentThread theoryId={theory.id} canInteract={canInteract} />
      )}
    </div>
  );
}

function CommentThread({
  theoryId,
  canInteract,
}: {
  theoryId: string;
  canInteract: boolean;
}) {
  const { data, isLoading } = useGetTheoryCommentsQuery({ theoryId });
  const [createComment, { isLoading: isPosting }] = useCreateCommentMutation();
  const [content, setContent] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await createComment({ theoryId, content: content.trim() }).unwrap();
      setContent("");
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Failed to post comment. Please try again.");
    }
  };
  return (
    <div className="mt-4 flex w-full flex-col items-stretch gap-4 border-t border-border pt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-widest text-muted uppercase">
          Discussion
        </h3>
        {data && data.items.length > 0 && (
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {data.pagination.total}
          </span>
        )}
      </div>

      {canInteract ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment..."
            className="w-full rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isPosting || !content.trim()}
            aria-label="Post comment"
            className="shrink-0 rounded-full bg-primary p-2.5 text-foreground hover:opacity-90 disabled:opacity-60"
          >
            <FiSend size={14} />
          </button>
        </form>
      ) : (
        <p className="text-xs text-muted">Log in to leave a comment.</p>
      )}

      {isLoading && <p className="text-xs text-muted">Loading comments...</p>}
      {!isLoading && (!data || data.items.length === 0) && (
        <p className="text-xs text-muted">
          No comments yet. Start the discussion.
        </p>
      )}

      <ul className="m-0 flex w-full list-none flex-col items-stretch gap-5 p-0">
        {data?.items.map((comment) => (
          <CommentRow
            key={comment.id}
            comment={comment}
            theoryId={theoryId}
            canInteract={canInteract}
          />
        ))}
      </ul>
    </div>
  );
}

function CommentLikeButton({
  comment,
  theoryId,
  canInteract,
}: {
  comment: CommentItem;
  theoryId: string;
  canInteract: boolean;
}) {
  const [likeComment, { isLoading: isLiking }] = useLikeCommentMutation();
  const [unlikeComment, { isLoading: isUnliking }] = useUnlikeCommentMutation();
  const liked = !!comment.likedByMe;

  const handleToggle = async () => {
    try {
      if (liked) {
        await unlikeComment({ id: comment.id, theoryId }).unwrap();
      } else {
        await likeComment({ id: comment.id, theoryId }).unwrap();
      }
    } catch (err) {
      console.error("Failed to update like:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={!canInteract || isLiking || isUnliking}
      aria-pressed={liked}
      aria-label={liked ? "Unlike comment" : "Like comment"}
      title={canInteract ? undefined : "Log in to like"}
      className={`flex items-center gap-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        liked ? "text-primary" : "text-muted hover:text-primary"
      }`}
    >
      {liked ? <FaHeart size={13} /> : <FaRegHeart size={13} />}
      {comment.likeCount ?? 0}
    </button>
  );
}

function CommentBody({
  comment,
  theoryId,
  canInteract,
  small = false,
  onReplyClick,
}: {
  comment: CommentItem;
  theoryId: string;
  canInteract: boolean;
  small?: boolean;
  onReplyClick?: () => void;
}) {
  const name = displayName(comment.user);
  return (
    <div className="flex w-full items-start justify-start gap-3">
      <UserAvatar user={comment.user} size={small ? 28 : 36} />
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <div className="max-w-full rounded-xl bg-card px-3.5 py-2.5">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-xs font-semibold text-foreground/90">
              {name}
            </span>
            <span className="text-[11px] text-muted">
              {timeAgo(comment.createdAt)}
            </span>
          </div>
          <p className="mt-1 wrap-break-word text-sm leading-relaxed text-foreground/80">
            {comment.content}
          </p>
        </div>
        <div className="flex items-center gap-4 px-1">
          <CommentLikeButton
            comment={comment}
            theoryId={theoryId}
            canInteract={canInteract}
          />
          {canInteract && onReplyClick && (
            <button
              type="button"
              onClick={onReplyClick}
              className="text-xs font-medium text-muted hover:text-primary"
            >
              Reply
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CommentRow({
  comment,
  theoryId,
  canInteract,
}: {
  comment: CommentItem;
  theoryId: string;
  canInteract: boolean;
}) {
  const [createReply, { isLoading: isReplying }] =
    useCreateCommentReplyMutation();
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    try {
      await createReply({
        parentId: comment.id,
        theoryId,
        content: replyContent.trim(),
      }).unwrap();
      setReplyContent("");
      setReplyOpen(false);
    } catch (err) {
      console.error("Failed to post reply:", err);
      alert("Failed to post reply. Please try again.");
    }
  };
  return (
    <li className="block w-full list-none">
      <div className="flex w-full flex-col items-stretch gap-3">
        <CommentBody
          comment={comment}
          theoryId={theoryId}
          canInteract={canInteract}
          onReplyClick={() => setReplyOpen((v) => !v)}
        />
        {replyOpen && (
          <form
            onSubmit={handleReply}
            className="ml-12 flex items-center gap-2"
          >
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              autoFocus
              className="w-full rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isReplying || !replyContent.trim()}
              aria-label="Post reply"
              className="shrink-0 rounded-full bg-primary p-2.5 text-foreground hover:opacity-90 disabled:opacity-60"
            >
              <FiSend size={14} />
            </button>
          </form>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <ul className="m-0 ml-4 flex list-none flex-col items-stretch gap-3 border-l border-border p-0 pl-5 sm:ml-5">
            {comment.replies.map((reply) => (
              <li key={reply.id} className="block w-full list-none">
                <CommentBody
                  comment={reply}
                  theoryId={theoryId}
                  canInteract={canInteract}
                  small
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
