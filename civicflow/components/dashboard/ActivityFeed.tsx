import { Notification } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { cx } from "@/lib/utils";

const KIND_STYLES: Record<Notification["kind"], string> = {
  status: "bg-signal",
  document: "bg-ink-500",
  system: "bg-slate",
  reminder: "bg-sage",
};

export function ActivityFeed({ notifications }: { notifications: Notification[] }) {
  if (notifications.length === 0) {
    return (
      <p className="px-1 py-6 text-center text-sm text-slate">
        No recent activity yet. Actions you take will show up here.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-ink-100">
      {notifications.map((n) => (
        <li key={n.id} className="flex gap-3 px-1 py-3.5">
          <span
            className={cx("mt-1.5 h-2 w-2 shrink-0 rounded-full", KIND_STYLES[n.kind])}
            aria-hidden
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink-900">{n.title}</p>
            <p className="mt-0.5 text-sm text-slate">{n.body}</p>
            <p className="mt-1 text-xs text-slate-light">{timeAgo(n.timestamp)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
