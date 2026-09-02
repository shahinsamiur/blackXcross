import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { allMembers } from "../../_mock/blackxcross";

export default function MembersPage() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Members
      </h1>

      <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allMembers.map((member) => (
          <li key={member.username}>
            <Link
              href={`/members/${member.username}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:border-primary/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-muted">
                <FiUser size={18} />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-foreground/90">
                  {member.name}
                </span>
                <span className="truncate text-xs text-muted">
                  {member.role}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
