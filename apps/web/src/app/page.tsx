import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock3, HandCoins, Users } from "lucide-react";
import { FollowUpList } from "@/components/dashboard/follow-up-list";
import { HandoverBanner } from "@/components/dashboard/handover-banner";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { PipelineChart } from "@/components/dashboard/pipeline-chart";
import { RecentLeadsTable } from "@/components/dashboard/recent-leads-table";
import { SectionHeading } from "@/components/dashboard/section-heading";
import { ServiceMixChart } from "@/components/dashboard/service-mix-chart";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDateLong, formatFollowUp } from "@/lib/format";
import {
  getRecentLeads,
  handoverDispatches,
  leads,
  MOCK_NOW,
  overviewKpis,
  pipelineActivity,
  serviceMix,
  upcomingFollowUps,
} from "@/lib/mock-data";

export default function OverviewPage() {
  const recentLeads = getRecentLeads(6);
  const newLeadTotal = pipelineActivity.reduce(
    (sum, point) => sum + point.newLeads,
    0,
  );
  const qualifiedTotal = pipelineActivity.reduce(
    (sum, point) => sum + point.qualified,
    0,
  );
  const todayFollowUps = upcomingFollowUps.filter((item) =>
    formatFollowUp(item.scheduledFor, MOCK_NOW).startsWith("Today"),
  ).length;

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow={formatDateLong(MOCK_NOW)}
          title="Good morning, Kaushik"
          description={`${todayFollowUps} follow-ups and ${handoverDispatches.length} urgent handovers need attention today.`}
          actions={
            <>
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-hairline bg-card px-3 text-xs text-text-secondary">
                <span
                  className={cn(
                    "relative inline-flex size-2 rounded-full bg-mint",
                    "animate-none",
                  )}
                />
                Live · updated just now
              </span>
              <Button
                asChild
                variant="secondary"
                className="h-9 rounded-full bg-pill px-4 text-white hover:bg-pill/80"
              >
                <Link href="/inbox">
                  Open inbox
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
            </>
          }
        />

        <HandoverBanner handovers={handoverDispatches} leads={leads} />

        <section aria-labelledby="kpi-heading">
          <h2 id="kpi-heading" className="sr-only">
            Key performance indicators
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard metric={overviewKpis[0]} icon={Users} tone="blue" />
            <KpiCard metric={overviewKpis[1]} icon={BadgeCheck} tone="mint" />
            <KpiCard metric={overviewKpis[2]} icon={Clock3} tone="peach" />
            <KpiCard
              metric={overviewKpis[3]}
              icon={HandCoins}
              tone="mint"
              inverted
            />
          </div>
        </section>

        <section
          aria-labelledby="activity-heading"
          className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]"
        >
          <h2 id="activity-heading" className="sr-only">
            Pipeline activity and service mix
          </h2>

          <Card className="gap-0 overflow-hidden bg-card py-0 ring-1 ring-white/[0.06]">
            <div className="p-5">
              <SectionHeading
                title="Pipeline activity"
                description={`Last 7 days · ${newLeadTotal} new leads · ${qualifiedTotal} qualified`}
                action={
                  <span className="rounded-full bg-pill px-2.5 py-1 font-mono text-[10px] text-text-secondary">
                    7 days
                  </span>
                }
              />
              <div className="mt-5">
                <PipelineChart points={pipelineActivity} />
              </div>
            </div>
          </Card>

          <Card className="gap-0 overflow-hidden bg-card py-0 ring-1 ring-white/[0.06]">
            <div className="p-5">
              <SectionHeading
                title="Service mix"
                description="Active leads by service line"
                action={
                  <Link
                    href="/leads"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-mint transition-colors hover:text-mint-hover"
                  >
                    View all
                    <ArrowRight aria-hidden="true" className="size-3" />
                  </Link>
                }
              />
              <div className="mt-5">
                <ServiceMixChart data={serviceMix} />
              </div>
            </div>
          </Card>
        </section>

        <section
          aria-labelledby="leads-heading"
          className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]"
        >
          <h2 id="leads-heading" className="sr-only">
            Recent leads and follow-ups
          </h2>

          <Card className="gap-0 overflow-hidden bg-card py-0 ring-1 ring-white/[0.06]">
            <div className="p-5">
              <SectionHeading
                title="Recent leads"
                description="Latest WhatsApp enquiries across all service lines"
                action={
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-8 rounded-full px-3 text-xs text-text-secondary hover:bg-pill hover:text-white"
                  >
                    <Link href="/leads">
                      View all
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  </Button>
                }
              />
              <div className="mt-3">
                <RecentLeadsTable leads={recentLeads} />
              </div>
            </div>
          </Card>

          <Card className="gap-0 overflow-hidden bg-card py-0 ring-1 ring-white/[0.06]">
            <div className="p-5">
              <SectionHeading
                title="Today's follow-ups"
                description="Scheduled callbacks and reminders"
                action={
                  <span className="rounded-full bg-mint-subtle px-2.5 py-1 font-mono text-[10px] font-medium text-mint">
                    {todayFollowUps} today
                  </span>
                }
              />
              <div className="mt-4">
                <FollowUpList items={upcomingFollowUps} />
              </div>
              <Button
                asChild
                className="mt-5 h-10 w-full rounded-full bg-white px-4 text-[#1a1d24] hover:bg-white/90"
              >
                <Link href="/inbox">
                  Open inbox
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
