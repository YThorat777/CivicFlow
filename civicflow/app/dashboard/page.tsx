"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { StatusStamp } from "@/components/applications/StatusStamp";
import { useAuth } from "@/context/AuthContext";
import {
  getApplications,
  getDocuments,
  getNotifications,
  STORAGE_EVENT,
} from "@/lib/store";
import { Application, CivicDocument, Notification } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [documents, setDocuments] = useState<CivicDocument[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const load = () => {
      setApplications(getApplications());
      setDocuments(getDocuments());
      setNotifications(getNotifications());
    };
    load();
    window.addEventListener(STORAGE_EVENT, load);
    return () => window.removeEventListener(STORAGE_EVENT, load);
  }, []);

  const inReview = applications.filter(
    (a) => a.status === "In Review" || a.status === "Additional Info Requested"
  ).length;
  const approved = applications.filter((a) => a.status === "Approved").length;

  return (
    <AppShell
      title={`Welcome back, ${user?.fullName.split(" ")[0] ?? ""}`}
      description="Here's what's happening across your civic requests."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active applications" value={applications.length} accent="ink" />
        <StatCard label="Awaiting review" value={inReview} accent="signal" />
        <StatCard label="Approved" value={approved} accent="sage" />
        <StatCard label="Documents on file" value={documents.length} accent="ink" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink-900">
              Recent applications
            </h2>
            <Link
              href="/applications"
              className="text-sm font-medium text-signal-dark hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardBody className="px-0 py-0">
            {applications.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-slate">
                You haven&apos;t submitted any applications yet.{" "}
                <Link href="/services" className="font-medium text-signal-dark underline">
                  Browse services
                </Link>{" "}
                to get started.
              </p>
            ) : (
              <ul className="divide-y divide-ink-100">
                {applications.slice(0, 5).map((app) => (
                  <li key={app.id}>
                    <Link
                      href={`/applications/${app.id}`}
                      className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-ink-50"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink-900">
                          {app.serviceTitle}
                        </p>
                        <p className="mt-0.5 font-mono text-xs text-slate">
                          {app.referenceCode} · submitted {formatDate(app.submittedAt)}
                        </p>
                      </div>
                      <StatusStamp status={app.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-display text-lg font-semibold text-ink-900">
              Recent activity
            </h2>
          </CardHeader>
          <CardBody className="px-5 py-0">
            <ActivityFeed notifications={notifications.slice(0, 5)} />
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
