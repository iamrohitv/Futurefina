import type { UpcomingFollowUp } from "@futurefina/shared";
import { formatFollowUp, getInitials } from "@/lib/format";
import { MOCK_NOW } from "@/lib/mock-data";
import { SERVICE_DOT_CLASSES } from "@/lib/service-colors";
import { cn } from "@/lib/utils";

interface FollowUpListProps {
  items: UpcomingFollowUp[];
}

export function FollowUpList({ items }: FollowUpListProps) {
  return (
    <ul className="divide-y divide-hairline/70">
      {items.map((item) => {
        const [dayLabel, timeLabel] = formatFollowUp(
          item.scheduledFor,
          MOCK_NOW,
        ).split(", ");

        return (
          <li
            key={item.id}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className="w-14 shrink-0 text-right">
              <p
                className={cn(
                  "font-mono text-[11px] font-medium tabular-nums",
                  item.urgent ? "text-[var(--state-degradation-fg)]" : "text-white",
                )}
              >
                {timeLabel}
              </p>
              <p className="text-[9px] text-text-tertiary">{dayLabel}</p>
            </div>

            <span
              aria-hidden="true"
              className={cn(
                "h-8 w-px shrink-0",
                item.urgent ? "bg-coral/40" : "bg-hairline",
              )}
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white">
                {item.customerName}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 truncate text-[10px] text-text-tertiary">
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    SERVICE_DOT_CLASSES[item.serviceCategory],
                  )}
                />
                {item.serviceSubcategory}
              </p>
            </div>

            <span
              title={item.owner}
              className="grid size-7 shrink-0 place-items-center rounded-full bg-pill font-mono text-[9px] font-semibold text-text-secondary ring-1 ring-white/10"
            >
              {getInitials(item.owner)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
