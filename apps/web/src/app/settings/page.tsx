import type { Metadata } from "next";
import { Settings2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Workspace"
          title="Settings"
          description="Zero-code configuration for FAQs, indicative pricing, partner links, office hours, and team access."
        />
        <PhasePlaceholder
          phase="Phase 4"
          icon={Settings2}
          title="Zero-code configuration panel"
          description="Phase 4 lets admins update operational content without a redeployment, with validation and a complete change audit."
          features={[
            "ITR pricing tiers with instant preview",
            "Approved FAQ and knowledge-base editor",
            "Partner links and office hours",
            "Team roles and advisor assignments",
            "Audited configuration changes",
          ]}
        />
      </div>
    </AppShell>
  );
}
