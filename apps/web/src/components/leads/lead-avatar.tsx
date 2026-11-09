import type { ServiceCategory } from "@futurefina/shared";
import { getInitials } from "@/lib/format";
import { SERVICE_RING_CLASSES } from "@/lib/service-colors";
import { cn } from "@/lib/utils";

interface LeadAvatarProps {
  name: string;
  category: ServiceCategory;
  size?: "sm" | "default";
  className?: string;
}

export function LeadAvatar({
  name,
  category,
  size = "default",
  className,
}: LeadAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-pill font-mono font-semibold text-white ring-2",
        size === "sm" ? "size-7 text-[9px]" : "size-9 text-[10px]",
        SERVICE_RING_CLASSES[category],
        className,
      )}
    >
      {getInitials(name)}
    </span>
  );
}
