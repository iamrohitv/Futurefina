import type { Metadata } from "next";
import { Users } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";

export const metadata: Metadata = {
  title: "Leads",
};

export default function LeadsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Workspace"
          title="Leads"
          description="Search, filter, assign, and progress every lead through the 10 official lifecycle statuses."
        />
        <PhasePlaceholder
          phase="Phase 3"
          icon={Users}
          title="Lead management workspace"
          description="Phase 3 adds the full lead table, status transitions, reassignment, notes, consent audit, follow-up scheduler, and CSV export."
          features={[
            "Multi-dimensional filters across service, status and owner",
            "Status transition controls for all 10 lifecycle states",
            "Lead reassignment and internal notes",
            "Consent audit trail and promotional opt-in state",
            "Role-based CSV export",
          ]}
        />
      </div>
    </AppShell>
  );
}
