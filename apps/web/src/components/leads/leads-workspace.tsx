"use client";

import React from "react";
import { Users, Filter, Download, Plus, Phone } from "lucide-react";
import type { Lead, LeadStatus, ServiceCategory } from "@futurefina/shared";
import {
  LEAD_STATUS_LABELS,
  LEAD_STATUSES,
  SERVICE_CATEGORY_LABELS,
  SERVICE_CATEGORIES,
  PREFERRED_LANGUAGE_LABELS,
  PREFERRED_LANGUAGES,
  DEFAULT_OWNER,
} from "@futurefina/shared";
import { leads, MOCK_NOW } from "@/lib/mock-data";
import {
  formatPhone,
  formatRelativeTime,
  formatDateLong,
  getInitials,
} from "@/lib/format";
import { SERVICE_RING_CLASSES } from "@/lib/service-colors";
import { StatusBadge } from "@/components/leads/status-badge";
import { ServiceBadge } from "@/components/leads/service-badge";
import { LeadAvatar } from "@/components/leads/lead-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger as SheetTriggerComponent,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface FilterState {
  search: string;
  status: LeadStatus | "ALL";
  service: ServiceCategory | "ALL";
  owner: string | "ALL";
  language: string | "ALL";
}

interface LeadNote {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

const OWNERS = ["Kaushik Raval", "Rohit Verma", "Nisha Patel"];

export function LeadsWorkspace() {
  const [filter, setFilter] = React.useState<FilterState>({
    search: "",
    status: "ALL",
    service: "ALL",
    owner: "ALL",
    language: "ALL",
  });
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);
  const [notes, setNotes] = React.useState<Record<string, LeadNote[]>>({});

  const filteredLeads = React.useMemo(() => {
    return leads.filter((lead) => {
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
      const matchesLanguage =
        filter.language === "ALL" || lead.preferredLanguage === filter.language;
      return (
        matchesSearch &&
        matchesStatus &&
        matchesService &&
        matchesOwner &&
        matchesLanguage
      );
    });
  }, [filter]);

  const leadStats = React.useMemo(() => {
    const counts: Record<string, number> = {};
    LEAD_STATUSES.forEach((s) => (counts[s] = 0));
    for (const lead of filteredLeads) {
      counts[lead.status] = (counts[lead.status] || 0) + 1;
    }
    return counts;
  }, [filteredLeads]);

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    void leadId;
    void newStatus;
  };

  const handleReassign = (leadId: string, newOwner: string) => {
    void leadId;
    void newOwner;
  };

  const addNote = (leadId: string, content: string) => {
    if (!content.trim()) return;
    const note: LeadNote = {
      id: `note-${Date.now()}`,
      content: content.trim(),
      author: DEFAULT_OWNER,
      createdAt: MOCK_NOW,
    };
    setNotes((prev) => ({
      ...prev,
      [leadId]: [...(prev[leadId] || []), note],
    }));
  };

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {LEAD_STATUSES.map((status) => (
          <div
            key={status}
            className="rounded-xl border border-hairline bg-card p-4"
          >
            <p className="text-[10px] font-medium tracking-[0.14em] text-text-tertiary uppercase">
              {LEAD_STATUS_LABELS[status]}
            </p>
            <p className="mt-1 font-heading text-2xl font-semibold tracking-tight text-white tabular-nums">
              {leadStats[status] || 0}
            </p>
          </div>
        ))}
      </div>

      {/* Filters bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex w-full flex-col lg:flex-row lg:gap-4">
          <div className="relative max-w-xs flex-1 sm:max-w-full">
            <Filter
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-tertiary"
              aria-hidden="true"
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

          <Select
            value={filter.status}
            onValueChange={(v) =>
              setFilter({ ...filter, status: v as LeadStatus | "ALL" })
            }
          >
            <SelectTrigger className="h-9 w-48 sm:w-56">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All statuses</SelectItem>
              {LEAD_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {LEAD_STATUS_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filter.service}
            onValueChange={(v) =>
              setFilter({ ...filter, service: v as ServiceCategory | "ALL" })
            }
          >
            <SelectTrigger className="h-9 w-48 sm:w-56">
              <SelectValue placeholder="All services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All services</SelectItem>
              {SERVICE_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {SERVICE_CATEGORY_LABELS[c]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filter.owner}
            onValueChange={(v) =>
              setFilter({ ...filter, owner: v as string | "ALL" })
            }
          >
            <SelectTrigger className="h-9 w-48 sm:w-56">
              <SelectValue placeholder="All owners" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All owners</SelectItem>
              {OWNERS.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filter.language}
            onValueChange={(v) =>
              setFilter({ ...filter, language: v as string | "ALL" })
            }
          >
            <SelectTrigger className="h-9 w-48 sm:w-56">
              <SelectValue placeholder="All languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All languages</SelectItem>
              {PREFERRED_LANGUAGES.map((l) => (
                <SelectItem key={l} value={l}>
                  {PREFERRED_LANGUAGE_LABELS[l]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-full justify-end gap-2 lg:w-auto">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-8 rounded-full px-3 text-[10px] text-text-secondary hover:bg-pill hover:text-white"
          >
            <a href="#" download="leads.csv">
              <Download className="mr-1.5 size-3.5" aria-hidden="true" /> Export
              CSV
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 h-8 rounded-full text-text-secondary hover:bg-pill hover:text-white"
          >
            <Plus className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Leads table */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-hairline">
              <TableHead className="h-9 pl-0 text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                Lead
              </TableHead>
              <TableHead className="h-9 text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                Service
              </TableHead>
              <TableHead className="h-9 text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                Status
              </TableHead>
              <TableHead className="hidden h-9 text-[10px] tracking-[0.12em] text-text-tertiary uppercase lg:table-cell">
                Owner
              </TableHead>
              <TableHead className="hidden h-9 text-[10px] tracking-[0.12em] text-text-tertiary uppercase xl:table-cell">
                Language
              </TableHead>
              <TableHead className="hidden h-9 text-[10px] tracking-[0.12em] text-text-tertiary uppercase 2xl:table-cell">
                Phone
              </TableHead>
              <TableHead className="h-9 pr-0 text-right text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                Updated
              </TableHead>
              <TableHead className="h-9 pr-0 text-right text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow
                key={lead.id}
                className="group border-hairline/70 hover:bg-pill/30"
              >
                <TableCell className="py-3 pl-0">
                  <div className="flex items-center gap-3">
                    <LeadAvatar
                      name={lead.customerName}
                      category={lead.serviceCategory}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {lead.customerName}
                      </p>
                      <p className="font-mono text-[10px] text-text-tertiary">
                        {lead.leadCode}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <ServiceBadge
                    category={lead.serviceCategory}
                    subcategory={lead.serviceSubcategory}
                  />
                </TableCell>
                <TableCell className="py-3">
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className={cn(
                      "inline-flex h-6 max-w-[140px] items-center truncate rounded-full px-2.5 text-xs font-medium whitespace-nowrap transition-all",
                      "border border-transparent bg-transparent",
                      {
                        "bg-mint text-[#08120f]": selectedLead?.id === lead.id,
                      },
                    )}
                  >
                    {LEAD_STATUS_LABELS[lead.status]}
                  </button>
                </TableCell>
                <TableCell className="hidden py-3 lg:table-cell">
                  <span className="text-xs text-text-secondary">
                    {lead.assignedOwner}
                  </span>
                </TableCell>
                <TableCell className="hidden py-3 xl:table-cell">
                  <span className="font-mono text-xs text-text-tertiary">
                    {PREFERRED_LANGUAGE_LABELS[lead.preferredLanguage]}
                  </span>
                </TableCell>
                <TableCell className="hidden py-3 2xl:table-cell">
                  <span className="font-mono text-[10px] whitespace-nowrap text-text-tertiary tabular-nums">
                    {formatPhone(lead.phoneE164)}
                  </span>
                </TableCell>
                <TableCell className="py-3 pr-0 text-right">
                  <span className="font-mono text-[10px] whitespace-nowrap text-text-tertiary tabular-nums">
                    {formatRelativeTime(lead.updatedAt, MOCK_NOW)}
                  </span>
                </TableCell>
                <TableCell className="py-3 pr-0 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Sheet>
                      <SheetTriggerComponent asChild>
                        <button className="size-7 shrink-0 rounded-full text-text-tertiary hover:bg-pill hover:text-white">
                          <Phone
                            className="size-3.5"
                            aria-label={`Call ${lead.customerName}`}
                          />
                        </button>
                      </SheetTriggerComponent>
                      <SheetContent side="right" className="w-[340px]">
                        <SheetHeader>
                          <SheetTitle>Call {lead.customerName}</SheetTitle>
                        </SheetHeader>
                        <div className="p-4">
                          <p className="mb-3 text-sm text-white">
                            {lead.phoneE164}
                          </p>
                          <Button className="w-full" variant="outline">
                            Log call outcome
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="size-7 shrink-0 rounded-full text-text-tertiary hover:bg-pill hover:text-white"
                      title="Open lead dossier"
                    >
                      <Users className="size-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Lead detail sheet */}
      {selectedLead && (
        <Sheet
          open={selectedLead !== null}
          onOpenChange={() => setSelectedLead(null)}
        >
          <SheetTriggerComponent asChild>
            <button type="button" className="hidden" />
          </SheetTriggerComponent>
          <SheetContent side="right" className="w-[420px] p-0">
            <div className="flex shrink-0 items-center justify-between border-b border-hairline bg-canvas px-4 py-3">
              <h2 className="text-sm font-semibold text-white">
                {selectedLead.customerName}
              </h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="size-8 rounded-full text-text-tertiary hover:bg-pill"
              >
                <span className="size-4 rotate-180" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto px-4 py-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-12 place-items-center rounded-full font-mono text-[11px] font-semibold text-white ring-2 ring-white/20",
                        SERVICE_RING_CLASSES[selectedLead.serviceCategory],
                      )}
                    >
                      {getInitials(selectedLead.customerName)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium text-white">
                        {selectedLead.customerName}
                      </h3>
                      <StatusBadge status={selectedLead.status} />
                    </div>
                    <p className="mt-0.5 font-mono text-[10px] text-text-tertiary">
                      {formatPhone(selectedLead.phoneE164)}
                    </p>
                    <p className="mt-1 text-[10px] text-text-tertiary">
                      {selectedLead.preferredLanguage} ·{" "}
                      {selectedLead.customerType} customer ·{" "}
                      {selectedLead.source}
                    </p>
                  </div>
                </div>

                {/* Status transition */}
                <div className="rounded-xl border border-hairline bg-pill/30 p-3">
                  <h4 className="mb-2 text-[10px] font-medium tracking-wider text-text-tertiary uppercase">
                    Change Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {LEAD_STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(selectedLead.id, s)}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[9px] font-medium transition-all",
                          selectedLead.status === s
                            ? "bg-mint text-[#08120f]"
                            : "border border-hairline/70 bg-transparent text-text-secondary hover:bg-pill hover:text-white",
                        )}
                      >
                        {LEAD_STATUS_LABELS[s]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reassignment */}
                <div className="rounded-xl border border-hairline bg-pill/30 p-3">
                  <h4 className="mb-2 text-[10px] font-medium tracking-wider text-text-tertiary uppercase">
                    Reassign Owner
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {OWNERS.map((owner) => (
                      <button
                        key={owner}
                        onClick={() => handleReassign(selectedLead.id, owner)}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[9px] font-medium transition-all",
                          selectedLead.assignedOwner === owner
                            ? "bg-mint text-[#08120f]"
                            : "border border-hairline/70 bg-transparent text-text-secondary hover:bg-pill hover:text-white",
                        )}
                      >
                        {owner.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Captured details */}
                <div className="rounded-xl border border-hairline/50 bg-pill/20 p-3">
                  <h4 className="mb-2 text-[10px] font-medium tracking-wider text-text-tertiary uppercase">
                    Captured Details
                  </h4>
                  <dl className="space-y-2">
                    {Object.entries(selectedLead.capturedDetails).map(
                      ([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <dt className="text-text-tertiary">{key}</dt>
                          <dd className="font-mono text-white tabular-nums">
                            {value}
                          </dd>
                        </div>
                      ),
                    )}
                  </dl>
                </div>

                {/* Enquiry summary */}
                <div className="rounded-xl border border-hairline/50 bg-pill/20 p-3">
                  <h4 className="mb-2 text-[10px] font-medium tracking-wider text-text-tertiary uppercase">
                    Enquiry Summary
                  </h4>
                  <p className="text-sm leading-relaxed text-white">
                    {selectedLead.enquirySummary}
                  </p>
                </div>

                {/* Consent */}
                <div className="flex items-start gap-2 text-[10px]">
                  <Phone
                    aria-hidden="true"
                    className="mt-0.5 size-4 text-mint"
                  />
                  <div>
                    <p className="text-xs font-medium text-white">
                      Consent recorded
                    </p>
                    <p className="text-text-tertiary">
                      {formatDateLong(selectedLead.consentRecordedAt)}
                    </p>
                    <p className="mt-0.5 text-text-secondary">
                      Promotional opt-in:{" "}
                      <span
                        className={cn(
                          "font-mono",
                          selectedLead.promotionalOptIn
                            ? "text-mint"
                            : "text-text-tertiary",
                        )}
                      >
                        {selectedLead.promotionalOptIn ? "Yes" : "No"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Notes */}
                <div className="rounded-xl border border-hairline/50 bg-pill/20 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-[10px] font-medium tracking-wider text-text-tertiary uppercase">
                      Internal Notes
                    </h4>
                  </div>
                  <div className="max-h-32 space-y-2 overflow-y-auto">
                    {(notes[selectedLead.id] || []).map((note) => (
                      <div
                        key={note.id}
                        className="flex items-start gap-2 text-xs"
                      >
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-mint" />
                        <div>
                          <p className="leading-relaxed text-white">
                            {note.content}
                          </p>
                          <p className="mt-0.5 text-[9px] text-text-tertiary">
                            {note.author} ·{" "}
                            {formatRelativeTime(note.createdAt, MOCK_NOW)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {(notes[selectedLead.id] || []).length === 0 && (
                      <p className="text-[10px] text-text-tertiary">
                        No notes yet.
                      </p>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a note…"
                      className="h-8 flex-1 rounded-lg border border-hairline bg-card pr-3 pl-3 text-sm text-white placeholder:text-text-tertiary focus-visible:border-mint/60 focus-visible:ring-mint/20"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addNote(selectedLead!.id, e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      className="h-8 rounded-full px-3 text-[10px]"
                      onClick={() => {
                        const inputEl = document.querySelector(
                          'input[placeholder="Add a note…"]',
                        ) as HTMLInputElement | null;
                        if (inputEl && selectedLead) {
                          addNote(selectedLead.id, inputEl.value);
                          inputEl.value = "";
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
