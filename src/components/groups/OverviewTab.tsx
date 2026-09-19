import type { Group } from "../../_mock/groups";

export default function OverviewTab({ group }: { group: Group }) {
  return (
    <p className="text-sm leading-relaxed text-foreground/80">
      {group.description}
    </p>
  );
}
