import { ApplicationStatus } from "@/lib/types";
import { cx } from "@/lib/utils";

const STYLES: Record<ApplicationStatus, string> = {
  Submitted: "border-ink-300 text-ink-700 bg-ink-50",
  "In Review": "border-signal-dark text-signal-dark bg-signal-light",
  "Additional Info Requested": "border-rust-dark text-rust-dark bg-rust-light",
  Approved: "border-sage-dark text-sage-dark bg-sage-light",
  Denied: "border-rust-dark text-rust-dark bg-rust-light",
};

export function StatusStamp({
  status,
  animate = false,
  className,
}: {
  status: ApplicationStatus;
  animate?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "civic-stamp",
        STYLES[status],
        animate && "stamp-enter",
        className
      )}
    >
      {status}
    </span>
  );
}
