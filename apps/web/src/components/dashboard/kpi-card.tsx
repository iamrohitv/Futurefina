import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { KpiMetric } from "@futurefina/shared";
import { Card } from "@/components/ui/card";
import { Sparkline } from "@/components/dashboard/sparkline";
import { formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

type KpiTone = "mint" | "blue" | "peach" | "purple";

const TONE_STYLES: Record<KpiTone, { icon: string; stroke: string }> = {
  mint: {
    icon: "bg-mint-subtle text-mint",
    stroke: "var(--accent-mint)",
  },
  blue: {
    icon: "bg-blue/10 text-blue",
    stroke: "var(--accent-blue)",
  },
  peach: {
    icon: "bg-peach/10 text-peach",
    stroke: "var(--accent-peach)",
  },
  purple: {
    icon: "bg-purple/10 text-purple",
    stroke: "var(--accent-purple)",
  },
};

interface KpiCardProps {
  metric: KpiMetric;
  icon: LucideIcon;
  tone?: KpiTone;
  inverted?: boolean;
}

export function KpiCard({
  metric,
  icon: Icon,
  tone = "mint",
  inverted = false,
}: KpiCardProps) {
  const toneStyles = TONE_STYLES[tone];
  const TrendIcon = metric.deltaPercent >= 0 ? TrendingUp : TrendingDown;
  const deltaClasses = metric.isImprovement
    ? inverted
      ? "bg-[var(--state-improvement-inverted-bg)] text-[var(--state-improvement-inverted-fg)]"
      : "bg-mint-subtle text-mint"
    : inverted
      ? "bg-[var(--state-degradation-inverted-bg)] text-[var(--state-degradation-inverted-fg)]"
      : "bg-[#451a1a] text-[#f87171]";

  return (
    <Card
      className={cn(
        "relative gap-0 overflow-hidden py-0 ring-1",
        inverted
          ? "bg-[var(--state-neutral-inverted-bg)] text-[var(--state-neutral-inverted-fg)] ring-white"
          : "bg-card ring-white/[0.06]",
      )}
    >
      <div className="px-5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className={cn(
                "truncate text-[10px] font-medium tracking-[0.14em] uppercase",
                inverted
                  ? "text-[var(--state-neutral-inverted-fg)]"
                  : "text-text-tertiary",
              )}
            >
              {metric.label}
            </p>
            <p
              className={cn(
                "mt-2 font-heading text-[28px] leading-none font-semibold tracking-tight tabular-nums",
                inverted
                  ? "text-[var(--state-neutral-inverted-fg)]"
                  : "text-white",
              )}
            >
              {metric.displayValue}
            </p>
          </div>
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-xl",
              inverted
                ? "bg-[var(--state-neutral-inverted-bg)] text-[var(--state-neutral-inverted-fg)]"
                : toneStyles.icon,
            )}
          >
            <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[10px] font-medium",
              deltaClasses,
            )}
          >
            <TrendIcon aria-hidden="true" className="size-3" />
            {formatPercent(Math.abs(metric.deltaPercent))}
          </span>
          <span
            className={cn(
              "text-[10px]",
              inverted
                ? "text-[var(--state-neutral-inverted-fg)]"
                : "text-text-tertiary",
            )}
          >
            {metric.comparisonLabel}
          </span>
        </div>
      </div>

      <div className="mt-3 h-11 px-1.5 pb-1">
        <Sparkline
          data={metric.sparkline}
          label={`${metric.label} trend`}
          stroke={
            inverted
              ? "var(--state-improvement-inverted-fg)"
              : toneStyles.stroke
          }
        />
      </div>
    </Card>
  );
}
