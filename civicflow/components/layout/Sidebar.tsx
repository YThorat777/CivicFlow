"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", glyph: "◈" },
  { href: "/services", label: "Services", glyph: "▦" },
  { href: "/applications", label: "My Applications", glyph: "☰" },
  { href: "/documents", label: "Documents", glyph: "▤" },
  { href: "/notifications", label: "Notifications", glyph: "◔" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-ink-100 bg-ink-700 px-4 py-6 text-paper md:flex">
      <div className="mb-8 px-2">
        <p className="font-display text-xl font-semibold tracking-tight">
          Civic<span className="italic text-signal">Flow</span>
        </p>
        <p className="mt-1 text-xs text-ink-300">Citizen Service Portal</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-ink-800 text-paper font-medium"
                  : "text-ink-200 hover:bg-ink-600 hover:text-paper"
              )}
            >
              <span className="w-4 text-center text-signal-light" aria-hidden>
                {item.glyph}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
