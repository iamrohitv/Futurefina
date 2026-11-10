"use client";

import React from "react";
import {
  Settings2,
  FileText,
  Link2,
  Clock,
  Users,
  Phone,
  CreditCard,
} from "lucide-react";
import {
  SERVICE_CATEGORY_LABELS,
  PREFERRED_LANGUAGE_LABELS,
} from "@futurefina/shared";
import {
  itrPricingTiers,
  faqEntries,
  partnerLinks,
  officeHours,
  teamMembers,
  configAuditEntries,
} from "@/lib/mock-data";
import { formatCompactInr, getInitials } from "@/lib/format";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface SettingsTabProps {
  className?: string;
}

const TAB_ITEMS: Array<{
  key: string;
  label: string;
  icon: React.ElementType;
}> = [
  { key: "itr-pricing", label: "ITR Pricing", icon: CreditCard },
  { key: "faq", label: "FAQ Editor", icon: FileText },
  { key: "partner-links", label: "Partner Links", icon: Link2 },
  { key: "office-hours", label: "Office Hours", icon: Clock },
  { key: "team", label: "Team & Roles", icon: Users },
  { key: "audit-trail", label: "Audit Trail", icon: Settings2 },
];

function formatDay(day: number): string {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day];
}

export function SettingsWorkspace({ className }: SettingsTabProps = {}) {
  const [activeTab, setActiveTab] = React.useState<string>("itr-pricing");

  return (
    <div className={cn("flex h-full flex-col gap-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Settings
          </h1>
          <p className="text-sm text-text-secondary">
            Zero-code configuration for FAQs, pricing, partner links, office
            hours, and team access.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] tracking-wider text-text-tertiary uppercase">
            Admin · Kaushik Raval
          </span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-1 lg:grid-cols-3">
          {TAB_ITEMS.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className={cn(
                "flex flex-col items-center gap-1.5 px-3 py-3 text-xs font-medium transition-all",
                activeTab === tab.key
                  ? "border-b-2 border-mint bg-mint text-[#08120f]"
                  : "bg-pill/30 text-text-secondary hover:bg-pill/50 hover:text-white",
              )}
            >
              <tab.icon className="size-4" aria-hidden="true" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ITR Pricing Tab */}
        <TabsContent value="itr-pricing" className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            {itrPricingTiers.map((tier) => (
              <div
                key={tier.id}
                className="rounded-xl border border-hairline bg-card p-4"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      {tier.name}
                    </h3>
                    <p className="text-[10px] text-text-tertiary">
                      {tier.applicableForms.join(", ")}
                    </p>
                  </div>
                  <button
                    onClick={() => {}}
                    className="size-7 shrink-0 rounded-full text-text-secondary hover:bg-pill"
                    title="Edit pricing"
                  >
                    <span className="size-3.5" />
                  </button>
                </div>
                <div className="mb-2 flex items-baseline gap-1">
                  <span className="text-2xl font-semibold text-white tabular-nums">
                    {formatCompactInr(tier.indicativeFee)}
                  </span>
                  <span className="text-xs text-text-tertiary">indicative</span>
                </div>
                <p className="text-[10px] leading-relaxed text-text-tertiary">
                  {tier.description}
                </p>
                <div className="mt-3 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-mint" />
                  <span className="text-[9px] font-medium text-mint">
                    {tier.turnaroundDays} days turnaround
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`text-[9px] font-medium ${tier.isActive ? "text-mint" : "text-[#f87171]"}`}
                  >
                    {tier.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* FAQ Editor Tab */}
        <TabsContent value="faq" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              FAQ Knowledge Base
            </h2>
            <button
              onClick={() => {}}
              className="h-8 rounded-full bg-white px-3 text-xs text-[#1a1d24] hover:bg-white/90"
            >
              + Add FAQ
            </button>
          </div>
          <div className="grid gap-3">
            {faqEntries.map((faq) => (
              <div
                key={faq.id}
                className="rounded-xl border border-hairline bg-card p-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">
                      {faq.question}
                    </h4>
                    <p className="mt-0.5 text-[10px] text-text-tertiary">
                      {SERVICE_CATEGORY_LABELS[faq.category]}
                    </p>
                  </div>
                  <button
                    onClick={() => {}}
                    className="size-6 shrink-0 rounded-full text-text-secondary hover:bg-pill"
                    title="Edit FAQ"
                  >
                    <span className="size-3" />
                  </button>
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-text-secondary">
                  {faq.answer}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {faq.languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full bg-pill/50 px-2 py-0.5 text-[9px] font-medium text-text-secondary"
                    >
                      {PREFERRED_LANGUAGE_LABELS[lang]}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`text-[9px] font-medium ${faq.isActive ? "text-mint" : "text-[#f87171]"}`}
                  >
                    {faq.isActive ? "Active" : "Inactive"}
                  </span>
                  <span className="ml-auto font-mono text-[9px] text-text-tertiary">
                    {new Date(faq.updatedAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Partner Links Tab */}
        <TabsContent value="partner-links" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Partner Links</h2>
            <button
              onClick={() => {}}
              className="h-8 rounded-full bg-white px-3 text-xs text-[#1a1d24] hover:bg-white/90"
            >
              + Add Link
            </button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="h-9 pl-0 text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                  Partner
                </TableHead>
                <TableHead className="h-9 text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                  Service
                </TableHead>
                <TableHead className="h-9 text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                  URL
                </TableHead>
                <TableHead className="h-9 pr-0 text-right text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partnerLinks.map((link) => (
                <TableRow key={link.id} className="border-hairline/70">
                  <TableCell className="py-3 pl-0">
                    <p className="text-sm font-medium text-white">
                      {link.name}
                    </p>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-[10px] text-text-secondary">
                      {SERVICE_CATEGORY_LABELS[link.category]}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-mint underline underline-offset-4 hover:text-mint-hover"
                    >
                      {link.url}
                    </a>
                  </TableCell>
                  <TableCell className="py-3 pr-0 text-right">
                    <span
                      className={`text-[9px] font-medium ${link.isActive ? "text-mint" : "text-[#f87171]"}`}
                    >
                      {link.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Office Hours Tab */}
        <TabsContent value="office-hours" className="mt-6 space-y-4">
          <h2 className="text-sm font-semibold text-white">
            Office Hours (IST)
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {officeHours.map((oh) => (
              <div
                key={oh.id}
                className="rounded-xl border border-hairline bg-card p-3"
              >
                <div className="mb-1 flex items-start justify-between">
                  <p className="text-xs font-medium text-white">
                    {oh.advisorName}
                  </p>
                  <button
                    onClick={() => {}}
                    className="size-6 shrink-0 rounded-full text-text-secondary hover:bg-pill"
                    title="Edit hours"
                  >
                    <span className="size-3" />
                  </button>
                </div>
                <p className="mt-1 font-mono text-[10px] text-text-tertiary">
                  {formatDay(oh.dayOfWeek)}
                </p>
                <div className="mt-1 flex items-center gap-1">
                  <Phone
                    className="size-3.5 text-text-tertiary"
                    aria-hidden="true"
                  />
                  <span className="text-xs text-white tabular-nums">
                    {oh.startTime} – {oh.endTime}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`text-[9px] font-medium ${oh.isActive ? "text-mint" : "text-[#f87171]"}`}
                  >
                    {oh.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Team & Roles Tab */}
        <TabsContent value="team" className="mt-6 space-y-4">
          <h2 className="text-sm font-semibold text-white">Team & Roles</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="h-9 pl-0 text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                  Name
                </TableHead>
                <TableHead className="h-9 text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                  Role
                </TableHead>
                <TableHead className="h-9 text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                  Services
                </TableHead>
                <TableHead className="h-9 text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                  Languages
                </TableHead>
                <TableHead className="h-9 pr-0 text-right text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id} className="border-hairline/70">
                  <TableCell className="py-3 pl-0">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-pill font-mono text-[9px] font-semibold text-white ring-2 ring-white/10">
                        {getInitials(member.name)}
                      </div>
                      <p className="text-sm font-medium text-white">
                        {member.name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <span
                      className={`text-[10px] font-medium ${
                        member.role === "ADMIN"
                          ? "text-mint"
                          : "text-text-secondary"
                      }`}
                    >
                      {member.role}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-[10px] text-text-secondary">
                      {member.serviceCategories
                        .map((c) => SERVICE_CATEGORY_LABELS[c])
                        .join(", ")}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-[10px] text-text-secondary">
                      {member.languages
                        .map((l) => PREFERRED_LANGUAGE_LABELS[l])
                        .join(", ")}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 pr-0 text-right">
                    <span
                      className={`text-[9px] font-medium ${member.isActive ? "text-mint" : "text-[#f87171]"}`}
                    >
                      {member.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Audit Trail Tab */}
        <TabsContent value="audit-trail" className="mt-6 space-y-4">
          <h2 className="text-sm font-semibold text-white">
            Configuration Audit Trail
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="h-9 pl-0 text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                  Changed By
                </TableHead>
                <TableHead className="h-9 text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                  Section
                </TableHead>
                <TableHead className="h-9 text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                  Action
                </TableHead>
                <TableHead className="h-9 text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                  Target
                </TableHead>
                <TableHead className="h-9 pr-0 text-right text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
                  When
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {configAuditEntries.map((entry) => (
                <TableRow key={entry.id} className="border-hairline/70">
                  <TableCell className="py-3 pl-0">
                    <p className="text-sm font-medium text-white">
                      {entry.changedBy}
                    </p>
                    <p className="font-mono text-[9px] text-text-tertiary">
                      {entry.changedByRole}
                    </p>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-[10px] text-text-secondary">
                      {entry.section.replace(/_/g, " ")}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span
                      className={`text-[10px] font-medium ${
                        entry.action === "CREATE"
                          ? "text-mint"
                          : entry.action === "UPDATE"
                            ? "text-[#38bdf8]"
                            : entry.action === "DELETE"
                              ? "text-[#f87171]"
                              : "text-text-secondary"
                      }`}
                    >
                      {entry.action}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <p className="text-sm font-medium text-white">
                      {entry.targetName}
                    </p>
                    {entry.previousValue && entry.newValue && (
                      <p className="mt-0.5 text-[9px] text-text-tertiary">
                        {entry.previousValue} → {entry.newValue}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="py-3 pr-0 text-right">
                    <span className="font-mono text-[10px] whitespace-nowrap text-text-tertiary tabular-nums">
                      {new Date(entry.changedAt).toLocaleDateString("en-IN")}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      <div className="fixed inset-0 z-50" />
    </div>
  );
}
