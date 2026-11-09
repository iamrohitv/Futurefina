"use client";

import React from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";
import type { Lead } from "@futurefina/shared";
import { formatRelativeTime } from "@/lib/format";
import { MOCK_NOW, getLeadById, handoverDispatches } from "@/lib/mock-data";
import { LeadQueue } from "@/components/inbox/lead-queue";
import { ChatCanvas } from "@/components/inbox/chat-canvas";
import { LeadDossier } from "@/components/inbox/lead-dossier";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function InboxWorkspace({ className }: { className?: string } = {}) {
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);
  const [openHandoverDrawer, setOpenHandoverDrawer] = React.useState(false);

  const pendingHandovers = handoverDispatches.filter(
    (handover) => handover.status === "PENDING",
  );
  const urgentCount = pendingHandovers.filter(
    (handover) =>
      handover.urgency === "CRITICAL" || handover.urgency === "HIGH",
  ).length;

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
  };

  return (
    <div className={cn("flex h-full flex-col", className)}>
      {/* Top alert banner for urgent handovers */}
      {urgentCount > 0 && (
        <div className="flex items-center justify-between gap-3 border border-coral/25 bg-[linear-gradient(90deg,rgba(252,92,70,0.10),rgba(42,45,52,0.55))] px-4 py-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-[#f87171]" />
            <span className="text-sm font-medium text-white">
              {urgentCount} urgent handover{urgentCount > 1 ? "s" : ""} need
              attention
            </span>
          </div>
          <Button
            onClick={() => setOpenHandoverDrawer(true)}
            variant="outline"
            size="sm"
            className="h-8 rounded-full border-coral/50 px-3 text-xs text-[#f87171] hover:bg-coral/10"
          >
            Review queue
          </Button>
        </div>
      )}

      {/* Tri-pane layout */}
      <div className={cn("flex flex-1 overflow-hidden", className)}>
        {/* Pane 1: Lead Queue */}
        <div className="flex w-[320px] flex-shrink-0 flex-col border-r border-hairline bg-canvas lg:w-[25%]">
          <LeadQueue onLeadSelect={handleLeadSelect} />
        </div>

        {/* Pane 2: Chat Canvas */}
        <div className="flex min-w-0 flex-1 flex-col">
          <ChatCanvas lead={selectedLead} messages={[]} onSend={() => {}} />
        </div>

        {/* Pane 3: Lead Dossier */}
        <div className="flex w-[320px] flex-shrink-0 flex-col border-l border-hairline bg-canvas lg:w-[25%]">
          <LeadDossier lead={selectedLead} />
        </div>
      </div>

      {/* Handover Drawer (Sheet) */}
      <Sheet open={openHandoverDrawer} onOpenChange={setOpenHandoverDrawer}>
        <SheetTrigger asChild>
          <button type="button" className="hidden" />
        </SheetTrigger>
        <SheetContent className="w-full max-w-[420px] p-0">
          <div className="flex shrink-0 items-center justify-between border-b border-hairline bg-canvas px-4 py-3">
            <h2 className="text-sm font-semibold text-white">
              Urgent Handovers
            </h2>
            <button
              onClick={() => setOpenHandoverDrawer(false)}
              className="size-8 rounded-full text-text-tertiary hover:bg-pill"
            >
              <ArrowRight className="size-4 rotate-180" />
            </button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto px-4 py-4">
            {pendingHandovers.length === 0 ? (
              <p className="py-8 text-center text-sm text-text-tertiary">
                No pending handovers
              </p>
            ) : (
              <div className="space-y-3">
                {pendingHandovers.map((handover) => {
                  const lead = getLeadById(handover.leadId);
                  return (
                    <div
                      key={handover.id}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border p-3",
                        handover.urgency === "CRITICAL"
                          ? "border-coral/50 bg-[rgba(252,92,70,0.05)]"
                          : "border-hairline/70 bg-pill/30",
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
                          handover.urgency === "CRITICAL"
                            ? "bg-[#451a1a] text-[#f87171]"
                            : "bg-amber/10 text-amber",
                        )}
                      >
                        <AlertTriangle className="size-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-white">
                          {lead ? lead.customerName : "Unknown Lead"}
                        </p>
                        <p className="text-[9px] text-text-tertiary">
                          {handover.triggerReason}
                        </p>
                        <p className="mt-1 font-mono text-[9px] text-text-tertiary">
                          {formatRelativeTime(handover.dispatchedAt, MOCK_NOW)}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (lead) {
                            setSelectedLead(lead);
                            setOpenHandoverDrawer(false);
                          }
                        }}
                        className="size-7 shrink-0 rounded-full bg-pill text-text-secondary hover:bg-pill/80 hover:text-white"
                      >
                        <ArrowRight className="size-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
