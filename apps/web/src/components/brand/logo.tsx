import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  size?: "sm" | "default";
}

export function BrandMark({ className, size = "default" }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid place-items-center rounded-xl bg-green font-heading font-bold text-black shadow-[0_8px_24px_-12px_rgba(34,197,94,0.9)]",
        size === "sm" ? "size-8 text-sm" : "size-10 text-lg",
        className,
      )}
    >
      F
      <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-white ring-2 ring-canvas" />
    </span>
  );
}
