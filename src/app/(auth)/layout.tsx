import GrungeOverlay from "../../components/GrungeOverlay";
// import SkullMark from "../../components/icons/SkullMark";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-10 sm:px-6">
      <GrungeOverlay />
      <div className="relative flex w-full max-w-md flex-col gap-6">
        {children}
      </div>
    </div>
  );
}
