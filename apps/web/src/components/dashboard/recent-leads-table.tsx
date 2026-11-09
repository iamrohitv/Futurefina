import type { Lead } from "@futurefina/shared";
import { LeadAvatar } from "@/components/leads/lead-avatar";
import { ServiceBadge } from "@/components/leads/service-badge";
import { StatusBadge } from "@/components/leads/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatFollowUp, formatRelativeTime } from "@/lib/format";
import { MOCK_NOW } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface RecentLeadsTableProps {
  leads: Lead[];
}

export function RecentLeadsTable({ leads }: RecentLeadsTableProps) {
  return (
    <Table
      containerProps={{
        role: "region",
        tabIndex: 0,
        "aria-label": "Recent leads table",
      }}
    >
      <TableHeader>
        <TableRow className="border-hairline hover:bg-transparent">
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
            Next follow-up
          </TableHead>
          <TableHead className="h-9 pr-0 text-right text-[10px] tracking-[0.12em] text-text-tertiary uppercase">
            Updated
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {leads.map((lead) => {
          const followUp = lead.nextFollowUpAt
            ? formatFollowUp(lead.nextFollowUpAt, MOCK_NOW)
            : null;

          return (
            <TableRow
              key={lead.id}
              className="border-hairline/70 hover:bg-pill/30"
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
                <StatusBadge status={lead.status} short />
              </TableCell>

              <TableCell className="hidden py-3 lg:table-cell">
                <span className="flex items-center gap-2 text-xs text-text-secondary">
                  <span className="grid size-6 place-items-center rounded-full bg-pill font-mono text-[8px] font-semibold text-white ring-1 ring-white/10">
                    {lead.assignedOwner
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  {lead.assignedOwner.split(" ")[0]}
                </span>
              </TableCell>

              <TableCell className="hidden py-3 xl:table-cell">
                {followUp ? (
                  <span
                    className={cn(
                      "text-xs whitespace-nowrap",
                      followUp.startsWith("Today")
                        ? "text-white"
                        : "text-text-secondary",
                    )}
                  >
                    {followUp}
                  </span>
                ) : (
                  <span className="text-xs text-text-tertiary">—</span>
                )}
              </TableCell>

              <TableCell className="py-3 pr-0 text-right">
                <span className="font-mono text-[10px] whitespace-nowrap text-text-tertiary tabular-nums">
                  {formatRelativeTime(lead.updatedAt, MOCK_NOW)}
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
