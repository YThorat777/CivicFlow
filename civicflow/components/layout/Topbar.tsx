"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { STORAGE_EVENT, unreadNotificationCount } from "@/lib/store";
import { Button } from "@/components/ui/Button";

export function Topbar({ title, description }: { title: string; description?: string }) {
  const { user, logout } = useAuth();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const update = () => setUnread(unreadNotificationCount());
    update();
    window.addEventListener(STORAGE_EVENT, update);
    return () => window.removeEventListener(STORAGE_EVENT, update);
  }, []);

  const initials = user?.fullName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="flex items-center justify-between border-b border-ink-100 bg-paper px-6 py-4 md:px-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">
          {title}
        </h1>
        {description && (
          <p className="mt-0.5 text-sm text-slate">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-ink-100 bg-paper-panel text-ink-600 hover:border-ink-300"
          aria-label={`Notifications${unread > 0 ? `, ${unread} unread` : ""}`}
        >
          <span aria-hidden>◔</span>
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-signal px-1 text-[10px] font-semibold text-white">
              {unread}
            </span>
          )}
        </Link>

        <div className="hidden items-center gap-3 border-l border-ink-100 pl-4 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-xs font-semibold text-ink-700">
            {initials}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-ink-900">{user?.fullName}</p>
            <p className="text-xs text-slate">{user?.civicId}</p>
          </div>
        </div>

        <Button variant="secondary" size="sm" onClick={logout}>
          Sign out
        </Button>
      </div>
    </header>
  );
}
