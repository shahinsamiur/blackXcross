import GrungeOverlay from "../../components/GrungeOverlay";
import SkullMark from "../../components/icons/SkullMark";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-10 sm:px-6">
      <GrungeOverlay />
      <div className="relative flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <SkullMark className="h-10 w-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
          <span className="font-display text-2xl tracking-wide text-foreground/90">
            BLACK<span className="text-primary">×</span>CROSS
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
