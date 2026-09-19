"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import GroupHeader from "../../../../components/groups/GroupHeader";
import GroupTabsNav, {
  type GroupTabId,
} from "../../../../components/groups/GroupTabsNav";
import OverviewTab from "../../../../components/groups/OverviewTab";
import ChannelsTab from "../../../../components/groups/ChannelsTab";
import MembersTab from "../../../../components/groups/MembersTab";
import SettingsTab from "../../../../components/groups/SettingsTab";
import { getGroupById } from "../../../../_mock/groups";

export default function GroupPage() {
  const params = useParams<{ groupId: string }>();
  const group = getGroupById(params.groupId);
  const [activeTab, setActiveTab] = useState<GroupTabId>("overview");

  if (!group) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-10">
        <p className="text-sm text-muted">Group not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <GroupHeader group={group} />
      <GroupTabsNav activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && <OverviewTab group={group} />}
      {activeTab === "channels" && <ChannelsTab groupId={group.id} />}
      {activeTab === "members" && <MembersTab groupId={group.id} />}
      {activeTab === "settings" && <SettingsTab group={group} />}
    </div>
  );
}
