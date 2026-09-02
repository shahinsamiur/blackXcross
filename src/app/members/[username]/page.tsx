"use client";

import { useRouter, useParams } from "next/navigation";
import { FiUser, FiAward } from "react-icons/fi";
import { allMembers } from "../../../_mock/blackxcross";

export default function MemberProfilePage() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const member = allMembers.find((m) => m.username === params.username);

  if (!member) {
    return (
      <div className="flex w-full flex-col items-center gap-3 px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-muted">
          Member not found. They may have changed their name or the link is
          incorrect.
        </p>
        <button
          type="button"
          onClick={() => router.push("/members")}
          className="text-sm font-semibold text-primary hover:opacity-80"
        >
          Back to Members
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <section className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-background text-muted">
          <FiUser size={32} />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
            {member.name}
          </h1>
          <p className="text-sm text-muted">{member.role}</p>
        </div>
      </section>

      <section className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
        <FiAward size={20} className="shrink-0 text-primary" />
        <div>
          <p className="text-sm font-medium text-foreground/90">
            {member.contributions} Contributions
          </p>
          <p className="text-xs text-muted">
            Evidence uploads, theories, and discussion activity
          </p>
        </div>
      </section>
    </div>
  );
}
