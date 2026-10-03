"use client";

import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiCheck, FiX, FiEye } from "react-icons/fi";
import { useGetAdminCasesQuery, type AdminCase } from "../../../../state/redux/api/admin";
import { usePublishCaseMutation, useDraftCaseMutation } from "../../../../state/redux/api/cases";
import { useDebounce } from "../../../../hooks";
import Skeleton from "../../../../components/ui/Skeleton";

const PUBLISH_STATES = ["ALL", "DRAFT", "PUBLISHED"] as const;

export default function AdminCasesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [publishState, setPublishState] = useState<(typeof PUBLISH_STATES)[number]>("ALL");
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isFetching, isError, refetch } = useGetAdminCasesQuery({
    page,
    limit: 20,
    search: debouncedSearch || undefined,
    publishState: publishState === "ALL" ? undefined : publishState,
  });

  const [publishCase] = usePublishCaseMutation();
  const [draftCase] = useDraftCaseMutation();
  const [isMutating, setIsMutating] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<"approve" | "reject" | null>(null);

  const cases = data?.data.items ?? [];
  const pagination = data?.data.pagination;

  const handleApprove = async (id: string) => {
    setIsMutating(id);
    setLastAction("approve");
    try {
      await publishCase(id).unwrap();
    } catch (err) {
      alert("Failed to approve case. Please try again.");
    } finally {
      setIsMutating(null);
    }
  };

  const handleReject = async (id: string) => {
    setIsMutating(id);
    setLastAction("reject");
    try {
      await draftCase(id).unwrap();
    } catch (err) {
      alert("Failed to reject case. Please try again.");
    } finally {
      setIsMutating(null);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Cases</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <FiSearch size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search cases..."
              className="rounded-lg border border-border bg-card py-2 pl-8 pr-3 text-sm text-foreground/90 outline-none focus:border-primary/40"
            />
          </div>
          <select
            value={publishState}
            onChange={(e) => {
              setPublishState(e.target.value as typeof publishState);
              setPage(1);
            }}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground/90 outline-none focus:border-primary/40"
          >
            {PUBLISH_STATES.map((s) => (
              <option key={s} value={s}>
                {s === "ALL" ? "All States" : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {isLoading ? (
          <div className="flex flex-col gap-3 p-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-sm text-muted">Failed to load cases.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-sm font-semibold text-primary hover:opacity-80"
            >
              Retry
            </button>
          </div>
        ) : cases.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <p className="text-sm text-muted">No cases found.</p>
          </div>
        ) : (
          <table className="w-full min-w-160 text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wide text-muted">
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">State</th>
                <th className="px-5 py-3">Created</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c: AdminCase) => (
                <tr key={c.id} className="border-b border-border last:border-0">
                  <td className="max-w-70 truncate px-5 py-3 font-medium text-foreground/90">{c.title}</td>
                  <td className="px-5 py-3 text-muted">{c.category}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase ${
                        c.publishState === "PUBLISHED"
                          ? "border-success text-success bg-success/10"
                          : "border-border text-muted"
                      }`}
                    >
                      {c.publishState}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/cases/${c.id}`}
                        className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:text-primary"
                      >
                        <FiEye size={13} />
                        View
                      </Link>
                      <button
                        type="button"
                        disabled={isMutating === c.id || c.publishState === "PUBLISHED"}
                        onClick={() => handleApprove(c.id)}
                        className="flex items-center gap-1 rounded-lg border border-success px-2.5 py-1.5 text-xs font-semibold text-success hover:bg-success/10 disabled:opacity-50"
                      >
                        <FiCheck size={13} />
                        {isMutating === c.id && lastAction === "approve" ? "..." : "Approve"}
                      </button>
                      <button
                        type="button"
                        disabled={isMutating === c.id || c.publishState === "DRAFT"}
                        onClick={() => handleReject(c.id)}
                        className="flex items-center gap-1 rounded-lg border border-primary px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 disabled:opacity-50"
                      >
                        <FiX size={13} />
                        {isMutating === c.id && lastAction === "reject" ? "..." : "Reject"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted">
          <span>
            Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-border px-3 py-1.5 font-medium text-foreground/80 hover:border-primary/40 hover:text-primary disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= pagination.totalPages || isFetching}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-border px-3 py-1.5 font-medium text-foreground/80 hover:border-primary/40 hover:text-primary disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}