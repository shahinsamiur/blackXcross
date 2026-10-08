import { FiStar } from "react-icons/fi";
import { memberSpotlight } from "../_mock/blackxcross";
import Image from "next/image";

export default function MemberSpotlight() {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
          Member Spotlight
        </h2>
        <button
          type="button"
          className="text-xs font-semibold text-red-500 hover:text-red-400 cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {memberSpotlight.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 sm:px-3 sm:py-0 sm:first:pl-0 sm:first:pt-0 sm:last:pr-0 sm:last:pb-0"
          >
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-background sm:h-14 sm:w-14">
              <Image
                src={member.avatar}
                alt={member.name}
                width={112}
                height={112}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className="truncate text-sm font-semibold text-foreground">
                {member.name}
              </p>
              <p className="text-xs text-muted">{member.role}</p>
              <span className="flex items-center gap-1 text-xs font-medium text-red-500">
                <FiStar size={12} className="text-red-500" />
                {member.contributions} Contributions
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}