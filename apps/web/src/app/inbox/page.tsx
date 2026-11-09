import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { InboxWorkspace } from "@/components/inbox/inbox-workspace";

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
        <InboxWorkspace />
      </div>
    </AppShell>
  );
}
