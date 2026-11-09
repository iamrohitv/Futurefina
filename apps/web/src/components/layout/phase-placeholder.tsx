import Link from "next/link";
import { ArrowRight, Sparkles, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhasePlaceholderProps {
  phase: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}

export function PhasePlaceholder({
  phase,
  title,
  description,
  features,
  icon: Icon,
}: PhasePlaceholderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-hairline bg-card p-6 sm:p-10">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(19,173,135,0.12),transparent_45%)]"
      />
      <div className="relative max-w-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-subtle px-2.5 py-1 text-xs font-medium text-mint">
          <Sparkles aria-hidden="true" className="size-3.5" />
          {phase}
        </span>

        <div className="mt-6 grid size-14 place-items-center rounded-2xl bg-pill text-mint">
          <Icon aria-hidden="true" className="size-6" strokeWidth={1.8} />
        </div>

        <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          {description}
        </p>

        <ul className="mt-6 grid gap-2 text-sm text-text-secondary sm:grid-cols-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span
                aria-hidden="true"
                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-mint"
              />
              {feature}
            </li>
          ))}
        </ul>

        <Button
          asChild
          className="mt-8 h-10 rounded-full bg-white px-5 text-[#1a1d24] hover:bg-white/90"
        >
          <Link href="/">
            Back to overview
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
