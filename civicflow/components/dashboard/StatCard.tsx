import { Card } from "@/components/ui/Card";
import { cx } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  accent = "ink",
}: {
  label: string;
  value: string | number;
  hint?: string;
  accent?: "ink" | "signal" | "sage" | "rust";
}) {
  const accentClasses: Record<string, string> = {
    ink: "text-ink-700",
    signal: "text-signal-dark",
    sage: "text-sage-dark",
    rust: "text-rust-dark",
  };

  return (
    <Card className="px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate">
        {label}
      </p>
      <p className={cx("mt-2 font-display text-3xl font-semibold", accentClasses[accent])}>
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-slate">{hint}</p>}
    </Card>
  );
}
