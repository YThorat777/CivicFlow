import { cx } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border border-ink-100 bg-ink-50 px-2.5 py-0.5 text-xs font-medium text-ink-600",
        className
      )}
    >
      {children}
    </span>
  );
}
