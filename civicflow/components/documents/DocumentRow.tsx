import { CivicDocument } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function DocumentRow({
  document,
  onDelete,
}: {
  document: CivicDocument;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="border-b border-ink-100 last:border-0">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="text-lg text-ink-400" aria-hidden>
            ▤
          </span>
          <span className="text-sm font-medium text-ink-900">{document.name}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge>{document.category}</Badge>
      </td>
      <td className="px-4 py-3 text-sm text-slate">{document.sizeLabel}</td>
      <td className="px-4 py-3 text-sm text-slate">{formatDate(document.uploadedAt)}</td>
      <td className="px-4 py-3 text-right">
        <Button variant="ghost" size="sm" onClick={() => onDelete(document.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
}
