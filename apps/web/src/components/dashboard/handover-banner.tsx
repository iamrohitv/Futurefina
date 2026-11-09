import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import type { HandoverDispatch, Lead } from "@futurefina/shared";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/format";
import { MOCK_NOW } from "@/lib/mock-data";

interface HandoverBannerProps {
  handovers: HandoverDispatch[];
  leads: Lead[];
}

export function HandoverBanner({ handovers, leads }: HandoverBannerProps) {
  const pending = handovers.filter((handover) => handover.status === "PENDING");

  if (pending.length === 0) {
    return null;
  }

  const priority = pending.find((handover) => handover.urgency === "CRITICAL");
  const current = priority ?? pending[0];
  const lead = leads.find((item) => item.id === current.leadId);
  const countLabel = pending.length === 1 ? "handover needs" : "handovers need";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-coral/25 bg-[linear-gradient(90deg,rgba(252,92,70,0.10),rgba(42,45,52,0.55))] p-4 sm:flex-row sm:items-center">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--state-degradation-bg)] text-[var(--state-degradation-fg)]">
        <AlertTriangle aria-hidden="true" className="size-5" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">
          {pending.length} urgent {countLabel} attention
        </p>
        <p className="mt-0.5 truncate text-xs text-text-secondary">
          {lead ? (
            <>
              {lead.customerName} · {lead.serviceSubcategory} ·{" "}
              {formatRelativeTime(current.dispatchedAt, MOCK_NOW)}
            </>
          ) : (
            "Review the handover queue for the full briefing."
          )}
        </p>
      </div>

      <Button
        asChild
        className="h-9 shrink-0 rounded-full bg-white px-4 text-[#1a1d24] hover:bg-white/90"
      >
        <Link href="/inbox">
          Review queue
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
