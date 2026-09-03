import { FiHash, FiUsers, FiSettings, FiInfo } from "react-icons/fi";

export const groupTabs = [
  { id: "overview", label: "Overview", icon: FiInfo },
  { id: "channels", label: "Channels", icon: FiHash },
  { id: "members", label: "Members", icon: FiUsers },
  { id: "settings", label: "Settings", icon: FiSettings },
] as const;

export type GroupTabId = (typeof groupTabs)[number]["id"];

export default function GroupTabsNav({
  activeTab,
  onChange,
}: {
  activeTab: GroupTabId;
  onChange: (tab: GroupTabId) => void;
}) {
  return (
    <nav
      role="tablist"
      aria-label="Group sections"
      className="flex gap-2 overflow-x-auto border-b border-border"
    >
      {groupTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-foreground/70 hover:text-foreground/90"
            }`}
          >
            <Icon size={15} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
