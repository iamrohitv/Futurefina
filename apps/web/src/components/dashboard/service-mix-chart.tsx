import {
  SERVICE_CATEGORY_LABELS,
  type ServiceCategorySummary,
} from "@futurefina/shared";
import { formatPercent } from "@/lib/format";
import { SERVICE_COLORS, SERVICE_DOT_CLASSES } from "@/lib/service-colors";
import { cn } from "@/lib/utils";

interface ServiceMixChartProps {
  data: ServiceCategorySummary[];
}

export function ServiceMixChart({ data }: ServiceMixChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const size = 168;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const segments = data.reduce<
    Array<{
      item: (typeof data)[number];
      segmentLength: number;
      dashOffset: number;
    }>
  >((accumulator, item) => {
    const previous = accumulator.at(-1);
    const start = previous ? -previous.dashOffset + previous.segmentLength : 0;
    const segmentLength = (item.sharePercent / 100) * circumference;

    return [...accumulator, { item, segmentLength, dashOffset: -start }];
  }, []);

  const description = data
    .map((item) => `${SERVICE_CATEGORY_LABELS[item.category]} ${item.count}`)
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={`Active leads by service: ${description}.`}
          className="size-40 -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--surface-pill-muted)"
            strokeWidth={strokeWidth}
          />
          {segments.map(({ item, segmentLength, dashOffset }) => {
            return (
              <circle
                key={item.category}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={SERVICE_COLORS[item.category]}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                strokeDashoffset={dashOffset}
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <p className="font-heading text-2xl font-semibold tracking-tight text-white tabular-nums">
              {total}
            </p>
            <p className="text-[9px] tracking-[0.14em] text-text-tertiary uppercase">
              Active leads
            </p>
          </div>
        </div>
      </div>

      <ul className="w-full space-y-2.5">
        {data.map((item) => (
          <li key={item.category} className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className={cn(
                "size-2 shrink-0 rounded-full",
                SERVICE_DOT_CLASSES[item.category],
              )}
            />
            <span className="min-w-0 flex-1 truncate text-xs text-text-secondary">
              {SERVICE_CATEGORY_LABELS[item.category]}
            </span>
            <span className="font-mono text-xs text-white tabular-nums">
              {item.count}
            </span>
            <span className="w-10 text-right font-mono text-[10px] text-text-tertiary tabular-nums">
              {formatPercent(item.sharePercent)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
