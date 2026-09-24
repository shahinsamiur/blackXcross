import GrungeOverlay from "../../components/GrungeOverlay";
import AuthWrapper from "../../components/AuthWrapper";
// import SkullMark from "../../components/icons/SkullMark";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper mode="auth">
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-10 sm:px-6">
        <GrungeOverlay />
        <div className="relative flex w-full max-w-md flex-col gap-6">
          {children}
        </div>
      </div>
    </AuthWrapper>
  );
}