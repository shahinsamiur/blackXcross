"use client";

import { useMemo, useState } from "react";
import { FiSearch, FiThumbsUp, FiTrash2 } from "react-icons/fi";
import { FaFire } from "react-icons/fa6";
import { adminTheories } from "../../../../_mock/admin";

export default function AdminTheoriesPage() {
  const [query, setQuery] = useState("");
  const [removedIds, setRemovedIds] = useState<string[]>([]);

  const filteredTheories = useMemo(() => {
    return adminTheories.filter(
      (theory) =>
        !removedIds.includes(theory.id) &&
        theory.text.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, removedIds]);

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Theories
      </h1>

      <div className="relative w-full max-w-sm">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          size={16}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search theories..."
          className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
        />
      </div>

      <div className="rounded-xl border border-border bg-card">
        <ul className="flex flex-col">
          {filteredTheories.map((theory, i) => (
            <li
              key={theory.id}
              className={`flex items-center gap-3 p-4 ${
                i !== filteredTheories.length - 1
                  ? "border-b border-border"
                  : ""
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FaFire size={16} />
              </span>
              <p className="flex-1 text-sm leading-snug text-foreground/90">
                {theory.text}
              </p>
              <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted">
                <FiThumbsUp size={12} />
                {theory.likes}
              </span>
              <button
                type="button"
                onClick={() =>
                  setRemovedIds((prev) => [...prev, theory.id])
                }
                aria-label="Remove theory"
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:text-primary"
              >
                <FiTrash2 size={13} />
                Remove
              </button>
            </li>
          ))}
          {filteredTheories.length === 0 && (
            <li className="p-6 text-center text-sm text-muted">
              No theories match your search.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}