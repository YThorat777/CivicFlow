"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  STORAGE_EVENT,
} from "@/lib/store";
import { Notification } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { cx } from "@/lib/utils";

const KIND_LABEL: Record<Notification["kind"], string> = {
  status: "Status update",
  document: "Document",
  system: "System",
  reminder: "Reminder",
};

const KIND_DOT: Record<Notification["kind"], string> = {
  status: "bg-signal",
  document: "bg-ink-500",
  system: "bg-slate",
  reminder: "bg-sage",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const load = () => setNotifications(getNotifications());
    load();
    window.addEventListener(STORAGE_EVENT, load);
    return () => window.removeEventListener(STORAGE_EVENT, load);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppShell
      title="Notifications"
      description="Updates about your applications and account."
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate">
          {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
        </p>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllNotificationsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card className="py-16 text-center">
          <p className="text-sm text-slate">No notifications yet.</p>
        </Card>
      ) : (
        <Card className="divide-y divide-ink-100 px-0 py-0">
          {notifications.map((n) => {
            const content = (
              <div
                className={cx(
                  "flex gap-3 px-5 py-4 transition-colors hover:bg-ink-50",
                  !n.read && "bg-signal-light/30"
                )}
              >
                <span
                  className={cx("mt-1.5 h-2 w-2 shrink-0 rounded-full", KIND_DOT[n.kind])}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-ink-900">{n.title}</p>
                    <span className="text-xs uppercase tracking-wide text-slate-light">
                      {KIND_LABEL[n.kind]}
                    </span>
                    {!n.read && (
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-label="Unread" />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate">{n.body}</p>
                  <p className="mt-1 text-xs text-slate-light">{timeAgo(n.timestamp)}</p>
                </div>
              </div>
            );

            return (
              <div key={n.id} onClick={() => !n.read && markNotificationRead(n.id)}>
                {n.relatedApplicationId ? (
                  <Link href={`/applications/${n.relatedApplicationId}`} className="block">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </Card>
      )}
    </AppShell>
  );
}
