import {
  ChartCandlestick,
  FileText,
  Headphones,
  Landmark,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import {
  SERVICE_CATEGORY_SHORT_LABELS,
  type ServiceCategory,
} from "@futurefina/shared";
import { SERVICE_ICON_COLOR_CLASSES } from "@/lib/service-colors";
import { cn } from "@/lib/utils";

const SERVICE_ICONS: Record<ServiceCategory, LucideIcon> = {
  MUTUAL_FUNDS: TrendingUp,
  STOCKS_DEMAT: ChartCandlestick,
  INSURANCE: ShieldCheck,
  LOANS: Landmark,
  ITR: FileText,
  SUPPORT: Headphones,
};

interface ServiceBadgeProps {
  category: ServiceCategory;
  subcategory?: string;
  className?: string;
}

export function ServiceBadge({
  category,
  subcategory,
  className,
}: ServiceBadgeProps) {
  const Icon = SERVICE_ICONS[category];

  return (
    <span className={cn("flex items-center gap-2", className)}>
      <Icon
        aria-hidden="true"
        className={cn(
          "size-3.5 shrink-0",
          SERVICE_ICON_COLOR_CLASSES[category],
        )}
        strokeWidth={2}
      />
      <span className="min-w-0">
        <span className="block truncate text-xs font-medium text-text-secondary">
          {SERVICE_CATEGORY_SHORT_LABELS[category]}
        </span>
        {subcategory ? (
          <span className="block truncate text-[10px] text-text-tertiary">
            {subcategory}
          </span>
        ) : null}
      </span>
    </span>
  );
}
