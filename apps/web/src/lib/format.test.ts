import { describe, expect, it } from "vitest";
import {
  formatCompactInr,
  formatCount,
  formatDateLong,
  formatFollowUp,
  formatInr,
  formatPercent,
  formatPhone,
  formatRelativeTime,
  getInitials,
} from "./format";
import { MOCK_NOW } from "./mock-data";

describe("formatInr", () => {
  it("formats whole-rupee amounts with Indian grouping", () => {
    expect(formatInr(1_200)).toBe("₹1,200");
    expect(formatInr(1_50_000)).toBe("₹1,50,000");
  });

  it("does not emit a space between the symbol and digits", () => {
    expect(formatInr(2_000)).not.toMatch(/\s/);
  });
});

describe("formatCompactInr", () => {
  it("uses the Indian numbering system", () => {
    expect(formatCompactInr(999)).toBe("₹999");
    expect(formatCompactInr(5_000)).toBe("₹5K");
    expect(formatCompactInr(12_40_000)).toBe("₹12.4L");
    expect(formatCompactInr(1_25_00_000)).toBe("₹1.25Cr");
  });

  it("preserves negative values", () => {
    expect(formatCompactInr(-12_40_000)).toBe("-₹12.4L");
  });
});

describe("formatPhone", () => {
  it("formats a 12-digit Indian E.164 number", () => {
    expect(formatPhone("+919876543210")).toBe("+91 98765 43210");
  });

  it("returns non-Indian numbers unchanged", () => {
    expect(formatPhone("+14155552671")).toBe("+14155552671");
  });
});

describe("formatCount", () => {
  it("groups counts using Indian conventions", () => {
    expect(formatCount(1_50_000)).toBe("1,50,000");
  });
});

describe("formatFollowUp", () => {
  it("labels a follow-up later today", () => {
    expect(formatFollowUp("2026-11-09T16:00:00+05:30", MOCK_NOW)).toBe(
      "Today, 4:00 PM",
    );
  });

  it("labels a follow-up tomorrow", () => {
    expect(formatFollowUp("2026-11-10T11:00:00+05:30", MOCK_NOW)).toBe(
      "Tomorrow, 11:00 AM",
    );
  });

  it("formats later dates with day and month", () => {
    expect(formatFollowUp("2026-11-11T15:00:00+05:30", MOCK_NOW)).toBe(
      "11 Nov, 3:00 PM",
    );
  });

  it("respects the IST calendar day across UTC boundaries", () => {
    // 2026-11-10T00:30+05:30 is still 9 Nov in UTC but 10 Nov in IST.
    expect(formatFollowUp("2026-11-10T00:30:00+05:30", MOCK_NOW)).toBe(
      "Tomorrow, 12:30 AM",
    );
  });
});

describe("formatRelativeTime", () => {
  it("shows minutes for recent updates", () => {
    expect(formatRelativeTime("2026-11-09T10:28:00+05:30", MOCK_NOW)).toBe(
      "2m ago",
    );
  });

  it("shows hours for same-day updates", () => {
    expect(formatRelativeTime("2026-11-09T09:12:00+05:30", MOCK_NOW)).toBe(
      "1h ago",
    );
  });

  it("shows Yesterday for the previous calendar day", () => {
    expect(formatRelativeTime("2026-11-08T16:05:00+05:30", MOCK_NOW)).toBe(
      "Yesterday",
    );
  });

  it("shows the day and month for older updates", () => {
    expect(formatRelativeTime("2026-11-06T16:10:00+05:30", MOCK_NOW)).toBe(
      "6 Nov",
    );
  });

  it("treats a future timestamp as just now", () => {
    expect(formatRelativeTime("2026-11-09T10:31:00+05:30", MOCK_NOW)).toBe(
      "just now",
    );
  });
});

describe("formatDateLong", () => {
  it("formats the editorial date in IST", () => {
    expect(formatDateLong(MOCK_NOW)).toBe("Monday, 9 November 2026");
  });
});

describe("getInitials", () => {
  it("uses first and last initials", () => {
    expect(getInitials("Ramesh Patel")).toBe("RP");
    expect(getInitials("Kaushik Raval")).toBe("KR");
  });

  it("handles middle names and extra whitespace", () => {
    expect(getInitials("  Ritu  Agarwal ")).toBe("RA");
    expect(getInitials("Amit Kumar Verma")).toBe("AV");
  });

  it("handles single names and empty input", () => {
    expect(getInitials("Kaushik")).toBe("KA");
    expect(getInitials("")).toBe("?");
  });
});

describe("formatPercent", () => {
  it("always uses one decimal place", () => {
    expect(formatPercent(4.8)).toBe("4.8%");
    expect(formatPercent(7)).toBe("7.0%");
  });
});
