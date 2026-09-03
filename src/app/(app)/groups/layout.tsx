import GroupsSidebar from "../../../components/blackxcross/GroupsSidebar";

export default function GroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full w-full flex-col lg:flex-row">
      <GroupsSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
