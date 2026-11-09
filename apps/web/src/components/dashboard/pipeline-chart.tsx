import type { PipelinePoint } from "@futurefina/shared";
import { cn } from "@/lib/utils";

interface PipelineChartProps {
  points: PipelinePoint[];
}

export function PipelineChart({ points }: PipelineChartProps) {
  const maxValue = Math.max(...points.map((point) => point.newLeads));
  const step = maxValue <= 20 ? 5 : 10;
  const upperBound = Math.ceil(maxValue / step) * step;
  const ticks = Array.from(
    { length: Math.floor(upperBound / step) + 1 },
    (_, index) => upperBound - index * step,
  );

  const totalNewLeads = points.reduce((sum, point) => sum + point.newLeads, 0);
  const totalQualified = points.reduce(
    (sum, point) => sum + point.qualified,
    0,
  );
  const averagePerDay = Math.round(totalNewLeads / points.length);
  const qualificationRate =
    totalNewLeads === 0
      ? 0
      : Math.round((totalQualified / totalNewLeads) * 100);
  const peakDay = points.reduce((best, point) =>
    point.newLeads > best.newLeads ? point : best,
  );

  return (
    <div>
      <div className="flex gap-3">
        <div className="relative h-[180px] w-6 shrink-0 font-mono text-[10px] text-text-tertiary">
          {ticks.map((tick) => (
            <span
              key={tick}
              className="absolute right-0 -translate-y-1/2 tabular-nums"
              style={{ bottom: `${(tick / upperBound) * 100}%` }}
            >
              {tick}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <div className="relative h-[180px]">
            <div aria-hidden="true" className="absolute inset-0">
              {ticks.map((tick) => (
                <div
                  key={tick}
                  className="absolute inset-x-0 border-t border-white/[0.05]"
                  style={{ bottom: `${(tick / upperBound) * 100}%` }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-end justify-between gap-1.5 sm:gap-3">
              {points.map((point) => {
                const height = (point.newLeads / upperBound) * 100;
                const qualifiedShare =
                  point.newLeads === 0
                    ? 0
                    : (point.qualified / point.newLeads) * 100;

                return (
                  <div
                    key={point.label}
                    className="flex h-full flex-1 items-end justify-center"
                  >
                    <div
                      role="img"
                      aria-label={`${point.label}: ${point.newLeads} new leads, ${point.qualified} qualified${point.projected ? ", projected" : ""}`}
                      className="relative w-full max-w-9 rounded-md bg-chart-track"
                      style={{ height: `${height}%` }}
                    >
                      <span className="absolute -top-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[var(--state-neutral-inverted-bg)] px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[var(--state-neutral-inverted-fg)] shadow-sm">
                        {point.newLeads}
                      </span>
                      <div className="absolute inset-0 overflow-hidden rounded-md">
                        <div
                          className={cn(
                            "absolute inset-x-0 bottom-0 border-t-2 border-card",
                            point.projected ? "bg-hatch-mint" : "bg-mint",
                          )}
                          style={{ height: `${qualifiedShare}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-2 flex justify-between gap-1.5 sm:gap-3">
            {points.map((point, index) => (
              <span
                key={point.label}
                className={cn(
                  "flex-1 text-center text-[10px] whitespace-nowrap",
                  index === points.length - 1
                    ? "text-mint"
                    : "text-text-tertiary",
                )}
              >
                {point.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px] text-text-tertiary">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-chart-track" /> New leads
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-mint" /> Qualified
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-hatch-mint ring-1 ring-white/10" />{" "}
          Projected
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-hairline pt-3">
        <div>
          <dt className="text-[9px] tracking-[0.12em] text-text-tertiary uppercase">
            Avg / day
          </dt>
          <dd className="mt-0.5 font-mono text-xs font-medium text-white tabular-nums">
            {averagePerDay}
          </dd>
        </div>
        <div>
          <dt className="text-[9px] tracking-[0.12em] text-text-tertiary uppercase">
            Qualified
          </dt>
          <dd className="mt-0.5 font-mono text-xs font-medium text-white tabular-nums">
            {qualificationRate}%
          </dd>
        </div>
        <div>
          <dt className="text-[9px] tracking-[0.12em] text-text-tertiary uppercase">
            Peak day
          </dt>
          <dd className="mt-0.5 font-mono text-xs font-medium text-white tabular-nums">
            {peakDay.label} · {peakDay.newLeads}
          </dd>
        </div>
      </dl>
    </div>
  );
}
