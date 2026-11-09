"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, Calendar, FileText } from "lucide-react";
import type { Lead } from "@futurefina/shared";
import { formatPhone, formatDateLong, getInitials } from "@/lib/format";
import { StatusBadge } from "@/components/leads/status-badge";
import { ServiceBadge } from "@/components/leads/service-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SERVICE_RING_CLASSES: Record<string, string> = {
  MUTUAL_FUNDS: "ring-purple/40",
  STOCKS_DEMAT: "ring-blue/40",
  INSURANCE: "ring-coral/40",
  LOANS: "ring-peach/40",
  ITR: "ring-amber/40",
  SUPPORT: "ring-mint/40",
};

export function LeadDossier({
  lead,
  className,
}: {
  lead: Lead | null;
  className?: string;
}) {
  if (!lead) {
    return (
      <div
        className={cn(
          "flex h-full flex-col items-center justify-center text-text-tertiary",
          className,
        )}
      >
        <FileText aria-hidden="true" className="mb-3 size-12 opacity-40" />
        <p>Select a lead to view details</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col border-l border-hairline bg-canvas",
        className,
      )}
    >
      <div className="shrink-0 border-b border-hairline bg-canvas/50 px-4 py-3">
        <h2 className="text-sm font-semibold text-white">Lead Dossier</h2>
        <p className="mt-0.5 text-[10px] text-text-tertiary">
          {lead.leadCode} · {lead.source}
        </p>
      </div>

      <div className="scrollable-area flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {/* Lead header */}
          <div className="flex items-start gap-3">
            <div className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-12 place-items-center rounded-full font-mono text-[11px] font-semibold text-white ring-2 ring-white/20",
                  SERVICE_RING_CLASSES[lead.serviceCategory],
                )}
              >
                {getInitials(lead.customerName)}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-white">
                  {lead.customerName}
                </h3>
                <StatusBadge status={lead.status} short />
              </div>
              <p className="mt-0.5 font-mono text-[10px] text-text-tertiary">
                {formatPhone(lead.phoneE164)}
              </p>
              <p className="mt-1 text-[10px] text-text-tertiary">
                {lead.preferredLanguage} · {lead.customerType} customer
              </p>
            </div>
          </div>

          {/* Service info */}
          <div className="rounded-xl border border-hairline bg-pill/30 p-3">
            <div className="mb-2 flex items-start gap-3">
              <ServiceBadge
                category={lead.serviceCategory}
                subcategory={lead.serviceSubcategory}
              />
              <span className="ml-auto font-mono text-[10px] text-text-tertiary">
                {lead.createdAt ? formatDateLong(lead.createdAt) : ""}
              </span>
            </div>
            <dl className="space-y-2">
              {Object.entries(lead.capturedDetails).map(([key, value]) => (
                <div key={key} className="flex justify-between text-[10px]">
                  <dt className="text-text-tertiary">{key}</dt>
                  <dd className="font-mono text-white tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Enquiry summary */}
          <div className="rounded-xl border border-hairline/50 bg-pill/20 p-3">
            <h4 className="mb-1.5 text-[10px] font-medium tracking-wider text-text-tertiary uppercase">
              Enquiry Summary
            </h4>
            <p className="text-sm leading-relaxed text-white">
              {lead.enquirySummary}
            </p>
          </div>

          {/* Next follow-up */}
          {lead.nextFollowUpAt && (
            <div className="rounded-xl border border-amber/20 bg-amber/10 p-3">
              <div className="mb-1.5 flex items-start gap-2">
                <Calendar className="mt-0.5 size-4 text-amber" />
                <h4 className="text-[10px] font-medium tracking-wider text-amber uppercase">
                  Next Follow-up
                </h4>
              </div>
              <p className="font-mono text-sm text-white tabular-nums">
                {formatDateLong(lead.nextFollowUpAt)}
              </p>
            </div>
          )}

          {/* Consent */}
          <div className="flex items-start gap-2 text-[10px]">
            <Phone aria-hidden="true" className="mt-0.5 size-4 text-mint" />
            <div>
              <p className="text-xs font-medium text-white">Consent recorded</p>
              <p className="text-text-tertiary">
                {lead.consentRecordedAt
                  ? formatDateLong(lead.consentRecordedAt)
                  : ""}
              </p>
              <p className="mt-0.5 text-text-secondary">
                Promotional opt-in:{" "}
                <span
                  className={cn(
                    "font-mono",
                    lead.promotionalOptIn ? "text-mint" : "text-text-tertiary",
                  )}
                >
                  {lead.promotionalOptIn ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-hairline bg-canvas/50 px-4 py-3">
        <Button
          asChild
          className="h-9 w-full rounded-full bg-white px-4 text-[#1a1d24] hover:bg-white/90"
        >
          <Link href={`/leads/${lead.id}`}>
            Open full lead record
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
