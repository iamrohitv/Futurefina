import { describe, expect, it } from "vitest";
import {
  LEAD_STATUSES,
  PREFERRED_LANGUAGES,
  SERVICE_CATEGORIES,
} from "@futurefina/shared";
import {
  getLeadById,
  getRecentLeads,
  handoverDispatches,
  leads,
  MOCK_NOW,
  overviewKpis,
  pipelineActivity,
  serviceMix,
  upcomingFollowUps,
} from "./mock-data";

const E164_INDIA = /^\+91[6-9]\d{9}$/;

describe("lead fixtures", () => {
  it("contains 16 unique leads with unique lead codes", () => {
    expect(leads).toHaveLength(16);
    expect(new Set(leads.map((lead) => lead.id)).size).toBe(leads.length);
    expect(new Set(leads.map((lead) => lead.leadCode)).size).toBe(leads.length);
  });

  it("uses only approved statuses, categories, and languages", () => {
    for (const lead of leads) {
      expect(LEAD_STATUSES).toContain(lead.status);
      expect(SERVICE_CATEGORIES).toContain(lead.serviceCategory);
      expect(PREFERRED_LANGUAGES).toContain(lead.preferredLanguage);
    }
  });

  it("uses valid Indian E.164 phone numbers", () => {
    for (const lead of leads) {
      expect(lead.phoneE164).toMatch(E164_INDIA);
    }
  });

  it("uses parseable timestamps and non-empty required text", () => {
    for (const lead of leads) {
      expect(Number.isNaN(new Date(lead.createdAt).getTime())).toBe(false);
      expect(Number.isNaN(new Date(lead.updatedAt).getTime())).toBe(false);
      expect(Number.isNaN(new Date(lead.consentRecordedAt).getTime())).toBe(
        false,
      );
      expect(lead.customerName.trim()).not.toBe("");
      expect(lead.enquirySummary.trim()).not.toBe("");
      expect(lead.assignedOwner.trim()).not.toBe("");
      expect(lead.serviceSubcategory.trim()).not.toBe("");
    }
  });

  it("records consent before or at creation time", () => {
    for (const lead of leads) {
      expect(new Date(lead.consentRecordedAt).getTime()).toBeLessThanOrEqual(
        new Date(lead.updatedAt).getTime(),
      );
    }
  });
});

describe("overview aggregates", () => {
  it("exposes four KPI metrics with matching sparkline lengths", () => {
    expect(overviewKpis).toHaveLength(4);

    for (const metric of overviewKpis) {
      expect(metric.sparkline.length).toBeGreaterThanOrEqual(7);
      expect(metric.displayValue.trim()).not.toBe("");
      expect(Number.isFinite(metric.deltaPercent)).toBe(true);
    }
  });

  it("reconciles the service-mix total with total new leads", () => {
    const total = serviceMix.reduce((sum, item) => sum + item.count, 0);
    const totalNewLeads = overviewKpis.find(
      (metric) => metric.key === "new-leads",
    );

    expect(total).toBe(totalNewLeads?.value);
  });

  it("uses six service categories and shares that sum to 100%", () => {
    expect(serviceMix).toHaveLength(6);
    expect(new Set(serviceMix.map((item) => item.category)).size).toBe(6);

    const share = serviceMix.reduce((sum, item) => sum + item.sharePercent, 0);
    expect(share).toBeCloseTo(100, 1);

    for (const item of serviceMix) {
      expect(item.count).toBeGreaterThan(0);
      expect(item.sharePercent).toBeGreaterThan(0);
    }
  });

  it("provides seven pipeline days with only the last projected", () => {
    expect(pipelineActivity).toHaveLength(7);

    const projected = pipelineActivity.filter((point) => point.projected);
    expect(projected).toHaveLength(1);
    expect(pipelineActivity.at(-1)?.projected).toBe(true);

    for (const point of pipelineActivity) {
      expect(point.qualified).toBeLessThanOrEqual(point.newLeads);
    }
  });
});

describe("follow-ups and handovers", () => {
  it("sorts upcoming follow-ups chronologically", () => {
    const timestamps = upcomingFollowUps.map((item) =>
      new Date(item.scheduledFor).getTime(),
    );

    expect(timestamps).toEqual([...timestamps].sort((a, b) => a - b));
  });

  it("references existing leads from follow-ups and handovers", () => {
    const leadIds = new Set(leads.map((lead) => lead.id));

    for (const followUp of upcomingFollowUps) {
      expect(leadIds.has(followUp.leadId)).toBe(true);
    }

    for (const handover of handoverDispatches) {
      expect(leadIds.has(handover.leadId)).toBe(true);
    }
  });

  it("keeps follow-up and handover timestamps before the reference instant", () => {
    const now = new Date(MOCK_NOW).getTime();

    for (const handover of handoverDispatches) {
      expect(new Date(handover.dispatchedAt).getTime()).toBeLessThanOrEqual(
        now,
      );
    }
  });

  it("schedules all follow-ups after the reference instant", () => {
    const now = new Date(MOCK_NOW).getTime();

    for (const followUp of upcomingFollowUps) {
      expect(new Date(followUp.scheduledFor).getTime()).toBeGreaterThan(now);
    }
  });
});

describe("selectors", () => {
  it("returns recent leads in descending updated order", () => {
    const recent = getRecentLeads(6);

    expect(recent).toHaveLength(6);

    for (let index = 1; index < recent.length; index += 1) {
      expect(
        new Date(recent[index - 1].updatedAt).getTime(),
      ).toBeGreaterThanOrEqual(new Date(recent[index].updatedAt).getTime());
    }
  });

  it("caps the default recent list at six items", () => {
    expect(getRecentLeads()).toHaveLength(6);
    expect(getRecentLeads(100)).toHaveLength(leads.length);
  });

  it("finds a lead by id and returns undefined for unknown ids", () => {
    expect(getLeadById("lead-001")?.customerName).toBe("Ramesh Patel");
    expect(getLeadById("lead-999")).toBeUndefined();
  });
});
