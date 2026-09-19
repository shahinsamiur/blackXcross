"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { FiEdit3, FiUsers, FiFileText } from "react-icons/fi";
import { myGroups } from "../../../_mock/blackxcross"; 
import CaseCard from "../../../components/CaseCard";
import ProfileAvatar from "../../../components/ProfileAvatar";
import type { RootState } from "../../../state/redux/store";
import { useGetUserQuery, useGetUserCasesQuery } from "../../../state/redux/api/users";

const SkeletonCaseCard = () => (
  <div className="flex w-60 shrink-0 snap-start flex-col gap-8 rounded-xl border border-border bg-card p-5 px-3 sm:w-72 sm:gap-10 sm:px-4 md:w-92 animate-pulse">
    <div className="flex items-center justify-between gap-2">
      <div className="h-5 w-20 rounded-md bg-muted" />
      <div className="h-4 w-12 rounded bg-muted" />
    </div>
    <div className="flex flex-col gap-6 sm:gap-10">
      <div className="h-6 w-3/4 rounded bg-muted" />
      <div className="h-4 w-full rounded bg-muted" />
      <div className="h-4 w-5/6 rounded bg-muted" />
    </div>
    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
      <div className="h-5 w-20 rounded bg-muted" />
      <div className="h-4 w-16 rounded bg-muted" />
    </div>
  </div>
);

export default function DossierPage() {
  const userId = useSelector((state: RootState) => state.auth?.user?.id);

  const { data: user, isLoading: isUserLoading } = useGetUserQuery(userId as string, {
    skip: !userId,
  });
  const { data: casesData, isLoading: isCasesLoading } = useGetUserCasesQuery(userId as string, {
    skip: !userId,
  });
  
  const myCaseFiles = casesData?.items || [];

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          {isUserLoading ? (
            <div className="h-16 w-16 animate-pulse rounded-full bg-muted" />
          ) : (
            <ProfileAvatar 
              src={user?.avatar || "/image/hero1.jpg"} 
              alt={user?.username || "Your profile"} 
              size={64} 
            />
          )}
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
              {isUserLoading ? (
                <div className="h-6 w-32 animate-pulse rounded bg-muted" />
              ) : (
                "My Dossier"
              )}
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

        {isCasesLoading ? (
          <div className="flex w-full snap-x gap-4 overflow-x-auto pb-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCaseCard key={i} />
            ))}
          </div>
        ) : myCaseFiles.length > 0 ? (
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