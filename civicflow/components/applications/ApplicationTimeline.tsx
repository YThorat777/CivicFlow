import { ApplicationEvent } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { StatusStamp } from "./StatusStamp";

export function ApplicationTimeline({ events }: { events: ApplicationEvent[] }) {
  const ordered = [...events].reverse();

  return (
    <ol className="relative border-l border-ink-100 pl-6">
      {ordered.map((event, idx) => (
        <li key={event.id} className="mb-7 last:mb-0">
          <span
            className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-paper-panel bg-ink-700"
            aria-hidden
          />
          <div className="flex flex-wrap items-center gap-2">
            <StatusStamp status={event.status} animate={idx === 0} />
            <span className="text-xs text-slate">{formatDateTime(event.timestamp)}</span>
          </div>
          <p className="mt-1.5 text-sm text-ink-700">{event.note}</p>
        </li>
      ))}
    </ol>
  );
}
