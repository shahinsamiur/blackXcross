export default function GroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex min-h-full w-full flex-col">{children}</div>;
}
