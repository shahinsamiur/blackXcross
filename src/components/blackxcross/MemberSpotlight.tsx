import { FiStar, FiUser } from "react-icons/fi";
import { memberSpotlight } from "../../_mock/blackxcross";

export default function MemberSpotlight() {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-wide text-foreground uppercase">
          Member Spotlight
        </h2>
        <button
          type="button"
          className="text-xs font-semibold text-primary hover:opacity-80"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {memberSpotlight.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background text-muted">
              <FiUser size={22} />
            </span>
            <div>
              <p className="text-sm font-semibold text-primary">
                {member.name}
              </p>
              <p className="text-xs text-muted">{member.role}</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-foreground/80">
              <FiStar size={12} className="text-warning" />
              {member.contributions} Contributions
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
