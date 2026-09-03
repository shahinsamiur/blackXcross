"use client";

import Link from "next/link";
import { FiEdit3, FiUsers, FiFileText } from "react-icons/fi";
import { caseFiles, myGroups } from "../../../_mock/blackxcross";
import CaseCard from "../../../components/blackxcross/CaseCard";
import ProfileAvatar from "../../../components/blackxcross/ProfileAvatar";

const myCaseFiles = caseFiles.slice(0, 3);

export default function DossierPage() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <ProfileAvatar src="/image/hero1.jpg" alt="Your profile" size={64} />
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
              My Dossier
            </h1>
            <p className="text-sm text-muted">
              {myCaseFiles.length} case files &middot; {myGroups.length} groups
            </p>
          </div>
        </div>

        <Link
          href="/dossier/edit"
          className="flex items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 sm:self-start"
        >
          <FiEdit3 size={16} />
          Edit Dossier
        </Link>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <FiFileText size={18} className="text-muted" />
          <h2 className="text-sm font-semibold tracking-widest text-muted uppercase">
            My Case Files
          </h2>
        </div>

        {myCaseFiles.length > 0 ? (
          <div className="flex w-full snap-x gap-4 overflow-x-auto pb-2">
            {myCaseFiles.map((caseFile) => (
              <CaseCard key={caseFile.id} caseFile={caseFile} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-border bg-card p-6 text-sm text-muted">
            No case files yet.
          </p>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <FiUsers size={18} className="text-muted" />
          <h2 className="text-sm font-semibold tracking-widest text-muted uppercase">
            My Groups
          </h2>
        </div>

        <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {myGroups.map((group) => (
            <li
              key={group.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 text-sm text-foreground/90"
            >
              <span className="truncate">{group.name}</span>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-foreground/50">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {group.memberCount}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
