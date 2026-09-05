"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav } from "../../../_mock/admin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden w-60 shrink-0 flex-col gap-1 border-r border-border bg-card px-4 py-6 sm:flex">
        <div className="mb-6 px-2">
          <span className="text-sm font-bold tracking-wide text-primary uppercase">
            Admin Panel
          </span>
        </div>

        {adminNav.map((item) => {
          const active =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </aside>

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}