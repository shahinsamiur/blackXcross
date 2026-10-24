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

const PUBLIC_ROUTE_PATTERNS: RegExp[] = [
  /^\/$/,
  /^\/archives$/,
  /^\/cases\/(?!create$|drafts$)[^/]+$/,
];

const isPublicRoute = (pathname: string) =>
  PUBLIC_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname));

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
  const isPublic = isPublicRoute(pathname);

  useEffect(() => {
    if (mode === "protected" && !isPublic && status === "unauthenticated") {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
    if (mode === "auth" && status === "authenticated") {
      const redirect = searchParams.get("redirect") || "/";
      router.replace(redirect);
    }
  }, [status, mode, isPublic, pathname, searchParams, router]);

  const isPending = status === "idle" || status === "loading";
  const blockedForProtected =
    mode === "protected" && !isPublic && status !== "authenticated";
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