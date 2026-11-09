import {
  LEAD_STATUS_LABELS,
  LEAD_STATUS_SHORT_LABELS,
  type LeadStatus,
} from "@futurefina/shared";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: LeadStatus;
  short?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  short = false,
  className,
}: StatusBadgeProps) {
  const label = short
    ? LEAD_STATUS_SHORT_LABELS[status]
    : LEAD_STATUS_LABELS[status];

  return (
    <span
      data-lead-status={status}
      title={LEAD_STATUS_LABELS[status]}
      className={cn(
        "inline-flex h-6 max-w-full items-center truncate rounded-full px-2.5 text-xs font-medium whitespace-nowrap",
        className,
      )}
    >
      {label}
    </span>
  );
}
