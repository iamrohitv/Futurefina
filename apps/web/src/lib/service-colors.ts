import type { ServiceCategory } from "@futurefina/shared";

/** Categorical accents from DESIGN_GUIDELINES.md section 2.2. */
export const SERVICE_COLORS: Record<ServiceCategory, string> = {
  MUTUAL_FUNDS: "var(--accent-purple)",
  STOCKS_DEMAT: "var(--accent-blue)",
  INSURANCE: "var(--accent-coral)",
  LOANS: "var(--accent-peach)",
  ITR: "var(--accent-amber)",
  SUPPORT: "var(--accent-mint)",
};

export const SERVICE_DOT_CLASSES: Record<ServiceCategory, string> = {
  MUTUAL_FUNDS: "bg-purple",
  STOCKS_DEMAT: "bg-blue",
  INSURANCE: "bg-coral",
  LOANS: "bg-peach",
  ITR: "bg-amber",
  SUPPORT: "bg-mint",
};

export const SERVICE_ICON_COLOR_CLASSES: Record<ServiceCategory, string> = {
  MUTUAL_FUNDS: "text-purple",
  STOCKS_DEMAT: "text-blue",
  INSURANCE: "text-coral",
  LOANS: "text-peach",
  ITR: "text-amber",
  SUPPORT: "text-mint",
};

export const SERVICE_RING_CLASSES: Record<ServiceCategory, string> = {
  MUTUAL_FUNDS: "ring-purple/40",
  STOCKS_DEMAT: "ring-blue/40",
  INSURANCE: "ring-coral/40",
  LOANS: "ring-peach/40",
  ITR: "ring-amber/40",
  SUPPORT: "ring-mint/40",
};
