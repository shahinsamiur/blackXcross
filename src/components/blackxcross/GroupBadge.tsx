import { FiGlobe, FiLock } from "react-icons/fi";
import type { GroupVisibility, GroupActivity } from "../../_mock/groups";

export default function GroupBadge({
  visibility,
  activity,
  className = "",
}: {
  visibility: GroupVisibility;
  activity?: GroupActivity;
  className?: string;
}) {
  const VisIcon = visibility === "private" ? FiLock : FiGlobe;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs text-muted ${className}`}
    >
      {activity && (
        <span
          aria-hidden
          className={`h-1.5 w-1.5 rounded-full ${
            activity === "online" ? "bg-success" : "bg-muted"
          }`}
        />
      )}
      <VisIcon size={12} aria-hidden />
      <span className="capitalize">{visibility}</span>
    </span>
  );
}
