"use client";

import { Suspense, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../state/redux/store";
import { Skeleton } from "./ui/Skeleton";

interface AuthWrapperProps {
  children: React.ReactNode;
  mode: "protected" | "auth";
}

function LoadingFallback() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Skeleton className="h-8 w-32" />
    </div>
  );
}

function AuthWrapperInner({ children, mode }: AuthWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    if (mode === "protected" && status === "unauthenticated") {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
    if (mode === "auth" && status === "authenticated") {
      const redirect = searchParams.get("redirect") || "/";
      router.replace(redirect);
    }
  }, [status, mode, pathname, searchParams, router]);

  const isPending = status === "idle" || status === "loading";
  const blockedForProtected =
    mode === "protected" && status !== "authenticated";
  const blockedForAuth = mode === "auth" && status === "authenticated";

  if (isPending || blockedForProtected || blockedForAuth) {
    return <LoadingFallback />;
  }

  return <>{children}</>;
}

export default function AuthWrapper(props: AuthWrapperProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthWrapperInner {...props} />
    </Suspense>
  );
}
