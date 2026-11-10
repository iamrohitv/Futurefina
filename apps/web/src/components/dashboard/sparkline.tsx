import { cn } from "@/lib/utils";

interface SparklineProps {
  data: number[];
  label: string;
  stroke?: string;
  className?: string;
}

export function Sparkline({
  data,
  label,
  stroke = "var(--accent-green)",
  className,
}: SparklineProps) {
  const width = 120;
  const height = 40;
  const padding = 3;
  const minimum = Math.min(...data);
  const maximum = Math.max(...data);
  const range = maximum - minimum || 1;

  const points = data.map((value, index) => {
    const x =
      padding + (index / Math.max(data.length - 1, 1)) * (width - padding * 2);
    const y =
      height - padding - ((value - minimum) / range) * (height - padding * 2);

    return [x, y] as const;
  });

  const linePath = points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x},${y}`)
    .join(" ");
  const areaPath = `${linePath} L${width - padding},${height} L${padding},${height} Z`;
  const lastPoint = points[points.length - 1];

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id="sparkline-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0.2} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sparkline-gradient)" />
      <path
        d={linePath}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastPoint[0]} cy={lastPoint[1]} r={2.5} fill={stroke} />
    </svg>
  );
}
