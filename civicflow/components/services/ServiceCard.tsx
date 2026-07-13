import Link from "next/link";
import { Service } from "@/lib/types";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.id}`} className="group block">
      <Card className="h-full transition-shadow group-hover:shadow-panel">
        <CardBody className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-2">
            <Badge>{service.category}</Badge>
            <span className="font-mono text-xs text-slate-light">{service.fee}</span>
          </div>
          <h3 className="mt-3 font-display text-lg font-semibold text-ink-900 group-hover:text-signal-dark">
            {service.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate">
            {service.summary}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3 text-xs text-slate">
            <span>{service.department}</span>
            <span>{service.processingTime}</span>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
