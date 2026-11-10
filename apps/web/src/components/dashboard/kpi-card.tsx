import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { KpiMetric } from "@futurefina/shared";
import { Card } from "@/components/ui/card";
import { Sparkline } from "@/components/dashboard/sparkline";
import { formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

type KpiTone = "green" | "blue" | "purple" | "amber";

const TONE_STYLES: Record<KpiTone, { icon: string; stroke: string }> = {
  green: {
    icon: "bg-green/10 text-green",
    stroke: "var(--accent-green)",
  },
  blue: {
    icon: "bg-blue/10 text-blue",
    stroke: "var(--accent-blue)",
  },
  purple: {
    icon: "bg-purple/10 text-purple",
    stroke: "var(--accent-purple)",
  },
  amber: {
    icon: "bg-amber/10 text-amber",
    stroke: "var(--accent-amber)",
  },
};

interface KpiCardProps {
  metric: KpiMetric;
  icon: LucideIcon;
  tone?: KpiTone;
}

export function KpiCard({ metric, icon: Icon, tone = "green" }: KpiCardProps) {
  const toneStyles = TONE_STYLES[tone];
  const TrendIcon = metric.deltaPercent >= 0 ? TrendingUp : TrendingDown;
  const isImprovement = metric.isImprovement;

  return (
    <Card
      className={cn(
        "relative gap-0 overflow-hidden py-0 ring-1 ring-white/[0.03]",
        "bg-gradient-to-br from-white/[0.03] to-transparent",
      )}
    >
      <div className="px-6 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-text-tertiary uppercase">
              {metric.label}
            </p>
            <p className="mt-1 font-heading text-2xl font-bold tracking-tight text-white tabular-nums">
              {metric.displayValue}
            </p>
            <p className="mt-1 text-[10px] font-medium text-text-tertiary">
              {metric.comparisonLabel}
            </p>
          </div>
          <span
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-xl",
              toneStyles.icon,
            )}
          >
            <Icon aria-hidden="true" className="size-5" strokeWidth={2} />
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium",
              isImprovement
                ? "bg-green/10 text-green"
                : "bg-[#451a1a] text-[#f43f5e]",
            )}
          >
            <TrendIcon aria-hidden="true" className="size-3" />
            {formatPercent(Math.abs(metric.deltaPercent))}
          </span>
        </div>
      </div>

      <div className="mt-4 h-10 px-6 pb-2">
        <Sparkline
          data={metric.sparkline}
          label={`${metric.label} trend`}
          stroke={toneStyles.stroke}
        />
      </div>
    </Card>
  );
}
