import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { LeadsWorkspace } from "@/components/leads/leads-workspace";

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
        <LeadsWorkspace />
      </div>
    </AppShell>
  );
}
