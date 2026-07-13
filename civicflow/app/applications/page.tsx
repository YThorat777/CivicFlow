"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { StatusStamp } from "@/components/applications/StatusStamp";
import { Card } from "@/components/ui/Card";
import { getApplications, STORAGE_EVENT } from "@/lib/store";
import { Application, ApplicationStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { cx } from "@/lib/utils";

const FILTERS: Array<ApplicationStatus | "All"> = [
  "All",
  "Submitted",
  "In Review",
  "Additional Info Requested",
  "Approved",
  "Denied",
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState<ApplicationStatus | "All">("All");

  useEffect(() => {
    const load = () => setApplications(getApplications());
    load();
    window.addEventListener(STORAGE_EVENT, load);
    return () => window.removeEventListener(STORAGE_EVENT, load);
  }, []);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? applications
        : applications.filter((a) => a.status === filter),
    [applications, filter]
  );

  return (
    <AppShell
      title="My applications"
      description="Track the status of every request you've submitted."
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cx(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              filter === f
                ? "border-ink-700 bg-ink-700 text-paper"
                : "border-ink-100 bg-paper-panel text-ink-600 hover:border-ink-300"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="py-16 text-center">
          <p className="text-sm text-slate">
            No applications match this filter.{" "}
            <Link href="/services" className="font-medium text-signal-dark underline">
              Browse services
            </Link>{" "}
            to start a new one.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <Link key={app.id} href={`/applications/${app.id}`} className="block">
              <Card className="px-5 py-4 transition-shadow hover:shadow-panel">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-ink-900">{app.serviceTitle}</p>
                    <p className="mt-1 font-mono text-xs text-slate">
                      {app.referenceCode}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate">
                    <span>Submitted {formatDate(app.submittedAt)}</span>
                    <StatusStamp status={app.status} />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
