"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { FiEdit3, FiUsers, FiFileText } from "react-icons/fi";
import CaseCard from "../../../components/CaseCard";
import ProfileAvatar from "../../../components/ProfileAvatar";
import type { RootState } from "../../../state/redux/store";
import { resolveAvatar } from "../../../utils/avatar";
import {
  useGetUserQuery,
  useGetUserCasesQuery,
} from "../../../state/redux/api/users";

const SkeletonCaseCard = () => (
  <div className="flex w-full min-w-0 animate-pulse flex-col gap-6 rounded-xl border border-border bg-card p-4 sm:gap-8 sm:p-5">
    <div className="flex items-center justify-between gap-2">
      <div className="h-5 w-20 rounded-md bg-muted" />
      <div className="h-4 w-12 rounded bg-muted" />
    </div>
    <div className="flex flex-col gap-4">
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

function avatarSrc(
  user:
    | {
        avatar?: string | null;
        avatarUrl?: string | null;
        image?: string | null;
        profileImage?: string | null;
      }
    | undefined,
) {
  const src =
    user?.avatar || user?.avatarUrl || user?.image || user?.profileImage || "";
  return src.trim();
}

export default function DossierPage() {
  const userId = useSelector((state: RootState) => state.auth?.user?.id);

  const { data: user, isLoading: isUserLoading } = useGetUserQuery(
    userId as string,
    { skip: !userId },
  );
  const { data: casesData, isLoading: isCasesLoading } = useGetUserCasesQuery(
    userId as string,
    { skip: !userId },
  );

  const myCaseFiles = casesData || [];
  const photo = avatarSrc(user);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <section className="flex min-w-0 flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          {isUserLoading ? (
            <div className="h-14 w-14 shrink-0 animate-pulse rounded-full bg-muted sm:h-16 sm:w-16" />
          ) : (
            <ProfileAvatar
              key={photo || "no-avatar"}
              src={resolveAvatar(photo)}
              alt={user?.username || "Your profile"}
              size={64}
            />
          )}
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="truncate text-lg font-semibold text-foreground sm:text-2xl">
              {isUserLoading ? (
                <span className="block h-6 w-32 animate-pulse rounded bg-muted" />
              ) : (
                "My Dossier"
              )}
            </h1>
            <p className="text-sm text-muted">
              {myCaseFiles.length} case{" "}
              {myCaseFiles.length === 1 ? "file" : "files"}
            </p>
          </div>
        </div>
        <Link
          href="/dossier/edit"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 sm:w-auto sm:shrink-0"
        >
          <FiEdit3 size={16} />
          Edit Dossier
        </Link>
      </section>

      <section className="flex min-w-0 flex-col gap-4">
        <div className="flex items-center gap-2">
          <FiFileText size={18} className="shrink-0 text-muted" />
          <h2 className="text-sm font-semibold tracking-widest text-muted uppercase">
            My Case Files
          </h2>
        </div>
        {isCasesLoading ? (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCaseCard key={i} />
            ))}
          </div>
        ) : myCaseFiles.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {myCaseFiles.map((caseFile) => (
              <div
                key={caseFile.id}
                className="min-w-0 *:h-full *:w-full *:max-w-full"
              >
                <CaseCard caseFile={caseFile} />
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-border bg-card p-6 text-sm text-muted">
            No case files yet.
          </p>
        )}
      </section>

      <section className="flex min-w-0 flex-col gap-3">
        <div className="flex items-center gap-2">
          <FiUsers size={18} className="shrink-0 text-muted" />
          <h2 className="text-sm font-semibold tracking-widest text-muted uppercase">
            My Groups
          </h2>
        </div>
        <p className="rounded-lg border border-border bg-card px-4 py-6 text-sm text-gray-500">
          This functionality is not available yet
        </p>
      </section>
    </div>
  );
}
