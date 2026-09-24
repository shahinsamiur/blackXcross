"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { adminNav } from "../../../_mock/admin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col sm:flex-row">
      <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 sm:hidden">
        <span className="text-sm font-bold tracking-wide text-primary uppercase">
          Admin Panel
        </span>
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 hover:bg-background hover:text-primary"
        >
          <FiMenu size={22} />
        </button>
      </header>


      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          

          <aside className="relative z-50 flex h-full w-[85%] max-w-xs flex-col border-r border-border bg-background shadow-xl">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
              <span className="text-sm font-bold tracking-wide text-primary uppercase">
                Admin Panel
              </span>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 hover:bg-card hover:text-primary"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4">
              {adminNav.map((item) => {
                const active =
                  pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

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