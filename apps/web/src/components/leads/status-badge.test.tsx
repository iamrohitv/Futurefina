import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LEAD_STATUS_LABELS, LEAD_STATUSES } from "@futurefina/shared";
import { StatusBadge } from "./status-badge";

describe("StatusBadge", () => {
  it("renders the full label and exposes the status token", () => {
    render(<StatusBadge status="QUALIFICATION_IN_PROGRESS" />);

    const badge = screen.getByText("Bot qualification in progress");
    expect(badge).toHaveAttribute(
      "data-lead-status",
      "QUALIFICATION_IN_PROGRESS",
    );
    expect(badge).toHaveAttribute("title", "Bot qualification in progress");
  });

  it("renders a dense label when short is set", () => {
    render(<StatusBadge status="FOLLOW_UP_REQUIRED" short />);

    expect(screen.getByText("Follow-up")).toBeInTheDocument();
    expect(screen.getByTitle("Follow-up required")).toBeInTheDocument();
  });

  it("supports every official lifecycle status", () => {
    for (const status of LEAD_STATUSES) {
      const { unmount } = render(<StatusBadge status={status} />);
      expect(screen.getByText(LEAD_STATUS_LABELS[status])).toBeInTheDocument();
      unmount();
    }
  });
});
