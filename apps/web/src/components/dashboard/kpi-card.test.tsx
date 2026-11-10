import { render, screen } from "@testing-library/react";
import { Users } from "lucide-react";
import { describe, expect, it } from "vitest";
import type { KpiMetric } from "@futurefina/shared";
import { KpiCard } from "./kpi-card";

const metric: KpiMetric = {
  key: "new-leads",
  label: "Total new leads",
  value: 128,
  displayValue: "128",
  deltaPercent: 18.4,
  isImprovement: true,
  comparisonLabel: "vs. last month",
  sparkline: [42, 58, 49, 66, 61, 84, 92, 88, 104, 112, 121, 128],
};

describe("KpiCard", () => {
  it("renders the label, value, comparison, and delta", () => {
    render(<KpiCard metric={metric} icon={Users} />);

    expect(screen.getByText("Total new leads")).toBeInTheDocument();
    expect(screen.getByText("128")).toBeInTheDocument();
    expect(screen.getByText("18.4%")).toBeInTheDocument();
    expect(screen.getByText("vs. last month")).toBeInTheDocument();
  });

  it("exposes the sparkline as a labelled image", () => {
    render(<KpiCard metric={metric} icon={Users} />);

    expect(
      screen.getByRole("img", { name: "Total new leads trend" }),
    ).toBeInTheDocument();
  });

  it("shows the absolute value for a negative delta", () => {
    render(
      <KpiCard
        metric={{
          ...metric,
          key: "pending-follow-ups",
          label: "Pending follow-ups",
          deltaPercent: -3.1,
        }}
        icon={Users}
        tone="amber"
      />,
    );

    expect(screen.getByText("3.1%")).toBeInTheDocument();
  });
});
