import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { TooltipProvider } from "@/components/ui/tooltip";
import OverviewPage from "./page";

function renderOverview() {
  return render(
    <TooltipProvider>
      <OverviewPage />
    </TooltipProvider>,
  );
}

describe("Overview page", () => {
  it("renders the header, KPIs, charts, and recent leads", () => {
    renderOverview();

    expect(
      screen.getByRole("heading", { name: /dashboard/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Total new leads")).toBeInTheDocument();
    expect(screen.getAllByText("Pipeline activity").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Service mix").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Recent leads").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Today's follow-ups").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ramesh Patel").length).toBeGreaterThan(0);
  });

  it("shows the urgent handover banner with a review action", () => {
    renderOverview();

    expect(
      screen.getByText("2 urgent handovers need attention"),
    ).toBeInTheDocument();

    const reviewLink = screen.getByRole("link", { name: /review queue/i });
    expect(reviewLink).toHaveAttribute("href", "/inbox");
  });

  it("has no detectable accessibility violations", async () => {
    const { container } = renderOverview();

    const results = await axe.run(container, {
      rules: {
        // jsdom cannot compute rendered colors or layout.
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
