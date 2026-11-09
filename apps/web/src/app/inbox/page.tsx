import type { Metadata } from "next";
import { Inbox } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";

export const metadata: Metadata = {
  title: "Inbox",
};

export default function InboxPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Workspace"
          title="Inbox"
          description="Shared advisor inbox for live WhatsApp conversations and handover briefings."
        />
        <PhasePlaceholder
          phase="Phase 2"
          icon={Inbox}
          title="Tri-pane conversation inbox"
          description="The next phase brings the lead queue, WhatsApp chat canvas, and lead dossier together in the approved adaptive layout."
          features={[
            "Lead queue with search, status and owner filters",
            "WhatsApp-style inbound and outbound bubbles",
            "Structured handover drawer with claim action",
            "24-hour window and consent indicators",
            "Keyboard navigation and responsive dossier drawer",
          ]}
        />
      </div>
    </AppShell>
  );
}
