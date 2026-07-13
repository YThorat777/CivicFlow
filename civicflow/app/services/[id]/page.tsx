import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ApplyForm } from "@/components/services/ApplyForm";
import { Badge } from "@/components/ui/Badge";
import { getServiceById, SERVICES } from "@/lib/mock-data";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ id: s.id }));
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = getServiceById(params.id);
  if (!service) notFound();

  return (
    <AppShell title={service.title} description={service.department}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ApplyForm service={service} />
        </div>

        <div className="space-y-4">
          <div className="rounded-card border border-ink-100 bg-paper-panel p-5 shadow-card">
            <Badge>{service.category}</Badge>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              {service.description}
            </p>

            <dl className="mt-4 space-y-3 border-t border-ink-100 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate">Processing time</dt>
                <dd className="font-medium text-ink-900">{service.processingTime}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate">Fee</dt>
                <dd className="font-medium text-ink-900">{service.fee}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate">Department</dt>
                <dd className="text-right font-medium text-ink-900">
                  {service.department}
                </dd>
              </div>
            </dl>

            <div className="mt-4 border-t border-ink-100 pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate">
                Required documents
              </p>
              <ul className="mt-2 space-y-1 text-sm text-ink-700">
                {service.requiredDocuments.map((doc) => (
                  <li key={doc} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
