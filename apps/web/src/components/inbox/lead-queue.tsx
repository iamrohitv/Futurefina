"use client";

import React from "react";
import Link from "next/link";
import { Search, Filter, ChevronRight } from "lucide-react";
import type { Lead, LeadStatus, ServiceCategory } from "@futurefina/shared";
import { formatRelativeTime, getInitials } from "@/lib/format";
import { MOCK_NOW, leads } from "@/lib/mock-data";
import { StatusBadge } from "@/components/leads/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SERVICE_RING_CLASSES: Record<ServiceCategory, string> = {
  MUTUAL_FUNDS: "ring-purple/40",
  STOCKS_DEMAT: "ring-blue/40",
  INSURANCE: "ring-coral/40",
  LOANS: "ring-peach/40",
  ITR: "ring-amber/40",
  SUPPORT: "ring-mint/40",
};

interface LeadQueueProps {
  onLeadSelect: (lead: Lead) => void;
  className?: string;
}

interface FilterState {
  search: string;
  status: LeadStatus | "ALL";
  service: ServiceCategory | "ALL";
  owner: string | "ALL";
}

export function LeadQueue({ onLeadSelect, className }: LeadQueueProps) {
  const [selectedLeadId, setSelectedLeadId] = React.useState<string | null>(
    null,
  );
  const [filter, setFilter] = React.useState<FilterState>({
    search: "",
    status: "ALL",
    service: "ALL",
    owner: "ALL",
  });

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.customerName.toLowerCase().includes(filter.search.toLowerCase()) ||
      lead.leadCode.toLowerCase().includes(filter.search.toLowerCase()) ||
      lead.phoneE164.includes(filter.search);
    const matchesStatus =
      filter.status === "ALL" || lead.status === filter.status;
    const matchesService =
      filter.service === "ALL" || lead.serviceCategory === filter.service;
    const matchesOwner =
      filter.owner === "ALL" || lead.assignedOwner === filter.owner;

    return matchesSearch && matchesStatus && matchesService && matchesOwner;
  });

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-hairline bg-canvas/50 px-4 py-3">
        <div className="relative max-w-xs flex-1 sm:max-w-full">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-tertiary"
          />
          <label htmlFor="lead-search" className="sr-only">
            Search leads
          </label>
          <Input
            id="lead-search"
            type="search"
            placeholder="Search name, lead code, or phone…"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            className="h-9 border-hairline bg-card pr-4 pl-9 text-sm placeholder:text-text-tertiary focus-visible:border-mint/60 focus-visible:ring-mint/20"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="size-9 h-9 rounded-full text-text-secondary hover:bg-pill hover:text-white"
          onClick={() =>
            setFilter({
              ...filter,
              status: "ALL",
              service: "ALL",
              owner: "ALL",
              search: "",
            })
          }
        >
          <Filter aria-hidden="true" className="size-4" />
        </Button>
      </div>

      <div className="scrollable-area flex-1 overflow-y-auto px-3 py-2">
        <div className="grid grid-cols-1 gap-1">
          {filteredLeads.map((lead) => {
            const active = selectedLeadId === lead.id;
            return (
              <Link
                key={lead.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedLeadId(lead.id);
                  onLeadSelect(lead);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all",
                  active
                    ? "border-mint bg-mint text-[#08120f]"
                    : "border-transparent hover:border-hairline hover:bg-pill/30",
                )}
              >
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-8 place-items-center rounded-full font-mono text-[10px] font-semibold text-white ring-2",
                      SERVICE_RING_CLASSES[lead.serviceCategory],
                    )}
                  >
                    {getInitials(lead.customerName)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-white">
                    {lead.customerName}
                  </p>
                  <p className="truncate font-mono text-[9px] text-text-tertiary">
                    {lead.leadCode}
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <StatusBadge
                    status={lead.status}
                    short
                    className="text-[9px]"
                  />
                  <p className="mt-0.5 text-[9px] text-text-tertiary">
                    {formatRelativeTime(lead.updatedAt, MOCK_NOW)}
                  </p>
                </div>
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "size-3.5",
                    active ? "text-[#08120f]" : "text-text-tertiary",
                  )}
                />
              </Link>
            );
          })}
          {filteredLeads.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-text-tertiary">No leads found</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-hairline bg-canvas/50 px-4 py-3">
        <span className="text-[10px] font-medium text-text-tertiary">
          {filteredLeads.length} of {leads.length} leads
        </span>
        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-full px-3 text-[10px] text-text-secondary hover:bg-pill hover:text-white"
        >
          Export CSV
        </Button>
      </div>
    </div>
  );
}
