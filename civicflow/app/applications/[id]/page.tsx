"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { StatusStamp } from "@/components/applications/StatusStamp";
import { ApplicationTimeline } from "@/components/applications/ApplicationTimeline";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  getApplicationById,
  getDocuments,
  advanceApplicationStatus,
  STORAGE_EVENT,
} from "@/lib/store";
import { getServiceById } from "@/lib/mock-data";
import { Application, ApplicationStatus, CivicDocument } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const NEXT_STEPS: Partial<Record<ApplicationStatus, { status: ApplicationStatus; note: string; label: string }[]>> = {
  Submitted: [
    { status: "In Review", note: "Assigned to a reviewing officer.", label: "Move to review" },
  ],
  "In Review": [
    { status: "Approved", note: "Reviewed and approved.", label: "Approve application" },
    { status: "Additional Info Requested", note: "Reviewer requested additional documentation.", label: "Request more info" },
    { status: "Denied", note: "Application did not meet eligibility requirements.", label: "Deny application" },
  ],
  "Additional Info Requested": [
    { status: "In Review", note: "Additional information received; back under review.", label: "Resume review" },
  ],
};

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [application, setApplication] = useState<Application | undefined>();
  const [documents, setDocuments] = useState<CivicDocument[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = () => {
      const app = getApplicationById(params.id);
      if (!app) {
        setNotFound(true);
        return;
      }
      setApplication(app);
      setDocuments(getDocuments());
    };
    load();
    window.addEventListener(STORAGE_EVENT, load);
    return () => window.removeEventListener(STORAGE_EVENT, load);
  }, [params.id]);

  if (notFound) {
    return (
      <AppShell title="Application not found">
        <Card className="py-16 text-center">
          <p className="text-sm text-slate">
            We couldn&apos;t find that application.{" "}
            <Link href="/applications" className="font-medium text-signal-dark underline">
              Back to applications
            </Link>
          </p>
        </Card>
      </AppShell>
    );
  }

  if (!application) {
    return (
      <AppShell title="Loading…">
        <p className="text-sm text-slate">Loading application…</p>
      </AppShell>
    );
  }

  const service = getServiceById(application.serviceId);
  const attachedDocs = documents.filter((d) =>
    application.attachedDocumentIds.includes(d.id)
  );
  const availableActions = NEXT_STEPS[application.status] ?? [];

  function handleAdvance(status: ApplicationStatus, note: string) {
    advanceApplicationStatus(application!.id, status, note);
  }

  return (
    <AppShell title={application.serviceTitle} description={application.referenceCode}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <StatusStamp status={application.status} />
          <span className="text-sm text-slate">
            Submitted {formatDate(application.submittedAt)} · Updated{" "}
            {formatDate(application.updatedAt)}
          </span>
        </div>
        <Link
          href="/applications"
          className="text-sm text-slate hover:text-ink-700"
        >
          ← Back to applications
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="font-display text-lg font-semibold text-ink-900">
                Submitted information
              </h2>
            </CardHeader>
            <CardBody>
              <dl className="space-y-3 text-sm">
                {service?.fields.map((field) => (
                  <div key={field.id} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                    <dt className="text-slate">{field.label}</dt>
                    <dd className="font-medium text-ink-900 sm:text-right">
                      {application.formData[field.id] || "—"}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="font-display text-lg font-semibold text-ink-900">
                Attached documents
              </h2>
            </CardHeader>
            <CardBody>
              {attachedDocs.length === 0 ? (
                <p className="text-sm text-slate">No documents attached.</p>
              ) : (
                <ul className="space-y-2">
                  {attachedDocs.map((doc) => (
                    <li
                      key={doc.id}
                      className="flex items-center justify-between rounded-md border border-ink-100 px-3 py-2.5 text-sm"
                    >
                      <span className="text-ink-900">{doc.name}</span>
                      <span className="text-xs text-slate">{doc.sizeLabel}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>

          {availableActions.length > 0 && (
            <Card className="border-dashed">
              <CardHeader>
                <h2 className="font-display text-base font-semibold text-ink-900">
                  Reviewer simulator
                </h2>
                <p className="mt-1 text-xs text-slate">
                  This portal is a demo — use these actions to simulate how a
                  caseworker would move this application forward.
                </p>
              </CardHeader>
              <CardBody className="flex flex-wrap gap-2">
                {availableActions.map((action) => (
                  <Button
                    key={action.status}
                    variant={
                      action.status === "Denied"
                        ? "danger"
                        : action.status === "Approved"
                        ? "primary"
                        : "secondary"
                    }
                    size="sm"
                    onClick={() => handleAdvance(action.status, action.note)}
                  >
                    {action.label}
                  </Button>
                ))}
              </CardBody>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader>
            <h2 className="font-display text-lg font-semibold text-ink-900">Timeline</h2>
          </CardHeader>
          <CardBody>
            <ApplicationTimeline events={application.timeline} />
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
