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
  const averagePerDay =
    points.length > 0 ? Math.round(totalNewLeads / points.length) : 0;
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
        <div className="relative h-[200px] w-6 shrink-0 font-mono text-[10px] text-text-tertiary">
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
          <div className="relative h-[200px]">
            <div aria-hidden="true" className="absolute inset-0">
              {ticks.map((tick) => (
                <div
                  key={tick}
                  className="absolute inset-x-0 border-t border-white/[0.05]"
                  style={{ bottom: `${(tick / upperBound) * 100}%` }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-end justify-between gap-1 sm:gap-3">
              {points.map((point, index) => {
                const isLast = index === points.length - 1;
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
                      className="bg-chart-track relative w-full max-w-9 rounded-md"
                      style={{ height: `${height}%` }}
                    >
                      {isLast ? (
                        <span className="absolute -top-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white px-1.5 py-0.5 font-mono text-[9px] font-semibold text-black shadow-lg">
                          {point.newLeads}
                        </span>
                      ) : null}
                      <div className="absolute inset-0 overflow-hidden rounded-md">
                        <div
                          className={cn(
                            "absolute inset-x-0 bottom-0 border-t-2 border-card",
                            point.projected ? "bg-hatch-green" : "bg-green",
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

          <div className="mt-3 flex justify-between gap-1.5 sm:gap-3">
            {points.map((point, index) => (
              <span
                key={point.label}
                className={cn(
                  "flex-1 text-center text-[10px] whitespace-nowrap",
                  index === points.length - 1
                    ? "text-green"
                    : "text-text-tertiary",
                )}
              >
                {point.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-6 text-[10px] text-text-tertiary">
        <div className="flex items-center gap-2">
          <span className="bg-chart-track h-2 w-2 rounded-full" />
          <span className="font-mono tabular-nums">New leads</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green" />
          <span className="font-mono tabular-nums">Qualified</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green/20 ring-1 ring-white/10" />
          <span className="font-mono tabular-nums">Projected</span>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-hairline pt-4">
        <div className="text-center">
          <dt className="text-[9px] tracking-[0.12em] text-text-tertiary uppercase">
            Avg / day
          </dt>
          <dd className="mt-1 font-mono text-xs font-medium text-white tabular-nums">
            {averagePerDay}
          </dd>
        </div>
        <div className="text-center">
          <dt className="text-[9px] tracking-[0.12em] text-text-tertiary uppercase">
            Qualified
          </dt>
          <dd className="mt-1 font-mono text-xs font-medium text-white tabular-nums">
            {qualificationRate}%
          </dd>
        </div>
        <div className="text-center">
          <dt className="text-[9px] tracking-[0.12em] text-text-tertiary uppercase">
            Peak day
          </dt>
          <dd className="mt-1 font-mono text-xs font-medium text-white tabular-nums">
            {peakDay.label} · {peakDay.newLeads}
          </dd>
        </div>
      </dl>
    </div>
  );
}
