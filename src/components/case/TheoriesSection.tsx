"use client";

import { useState } from "react";
import {
  FiMessageSquare,
  FiThumbsUp,
  FiSend,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import {
  useGetCaseTheoriesQuery,
  useCreateTheoryMutation,
  useUpvoteTheoryMutation,
} from "../../state/redux/api/theories";
import {
  useGetTheoryCommentsQuery,
  useCreateCommentMutation,
  useCreateCommentReplyMutation,
} from "../../state/redux/api/comments";
import type { TheoryItem } from "../../state/redux/api/theories";
import type { CommentItem } from "../../state/redux/api/comments";

type TheoriesSectionProps = {
  caseId: string;
  canInteract: boolean;
};

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
  const [upvoteTheory] = useUpvoteTheoryMutation();
  const handleUpvote = async () => {
    try {
      await upvoteTheory({ id: theory.id, caseId }).unwrap();
    } catch (err) {
      console.error("Failed to upvote:", err);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-foreground/90">
          {theory.title}
        </span>
        <span className="text-xs text-muted">
          by {theory.user.username || theory.user.name}
        </span>
        {theory.content && (
          <p className="mt-1 text-sm text-muted">{theory.content}</p>
        )}
      </div>
      <div className="mt-3 flex items-center gap-4">
        <button
          type="button"
          onClick={handleUpvote}
          disabled={!canInteract}
          className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiThumbsUp size={13} /> {theory._count.upvotes}
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 hover:text-primary"
        >
          <FiMessageSquare size={13} /> {theory._count.comments}
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
    <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
      {canInteract ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment..."
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isPosting || !content.trim()}
            aria-label="Post comment"
            className="shrink-0 rounded-lg bg-primary p-2 text-foreground hover:opacity-90 disabled:opacity-60"
          >
            <FiSend size={14} />
          </button>
        </form>
      ) : (
        <p className="text-xs text-muted">Log in to leave a comment.</p>
      )}

      {isLoading && <p className="text-xs text-muted">Loading comments...</p>}
      {!isLoading && (!data || data.items.length === 0) && (
        <p className="text-xs text-muted">No comments yet.</p>
      )}

      <ul className="flex flex-col gap-3">
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
    <li className="flex flex-col gap-2">
      <div className="rounded-lg bg-card p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground/90">
            {comment.user.username || comment.user.name}
          </span>
          {canInteract && (
            <button
              type="button"
              onClick={() => setReplyOpen((v) => !v)}
              className="text-xs font-medium text-muted hover:text-primary"
            >
              Reply
            </button>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">{comment.content}</p>
      </div>
      {replyOpen && (
        <form onSubmit={handleReply} className="ml-4 flex items-center gap-2">
          <input
            type="text"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isReplying || !replyContent.trim()}
            aria-label="Post reply"
            className="shrink-0 rounded-lg bg-primary p-2 text-foreground hover:opacity-90 disabled:opacity-60"
          >
            <FiSend size={14} />
          </button>
        </form>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <ul className="ml-4 flex flex-col gap-2 border-l border-border pl-3">
          {comment.replies.map((reply) => (
            <li key={reply.id} className="rounded-lg bg-card p-3">
              <span className="text-xs font-semibold text-foreground/90">
                {reply.user.username || reply.user.name}
              </span>
              <p className="mt-1 text-sm text-muted">{reply.content}</p>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
