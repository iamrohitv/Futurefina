import type {
  CustomerType,
  HandoverUrgency,
  LeadStatus,
  PreferredLanguage,
  ServiceCategory,
  UserRole,
} from "./types";

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "New",
  QUALIFICATION_IN_PROGRESS: "Bot qualification in progress",
  QUALIFIED: "Qualified",
  ASSIGNED: "Assigned",
  CONTACT_ATTEMPTED: "Contact attempted",
  FOLLOW_UP_REQUIRED: "Follow-up required",
  CONVERTED: "Converted",
  NOT_INTERESTED: "Not interested",
  CLOSED: "Closed",
  ESCALATED_COMPLAINT: "Escalated / complaint",
};

/** Dense-table labels. Full labels remain available for detail views and tooltips. */
export const LEAD_STATUS_SHORT_LABELS: Record<LeadStatus, string> = {
  NEW: "New",
  QUALIFICATION_IN_PROGRESS: "Qualifying",
  QUALIFIED: "Qualified",
  ASSIGNED: "Assigned",
  CONTACT_ATTEMPTED: "Contact attempted",
  FOLLOW_UP_REQUIRED: "Follow-up",
  CONVERTED: "Converted",
  NOT_INTERESTED: "Not interested",
  CLOSED: "Closed",
  ESCALATED_COMPLAINT: "Escalated",
};

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  MUTUAL_FUNDS: "Mutual Funds",
  STOCKS_DEMAT: "Stocks & Demat",
  INSURANCE: "Insurance",
  LOANS: "Loans",
  ITR: "ITR & Tax",
  SUPPORT: "Customer Support",
};

export const SERVICE_CATEGORY_SHORT_LABELS: Record<ServiceCategory, string> = {
  MUTUAL_FUNDS: "Mutual Funds",
  STOCKS_DEMAT: "Stocks",
  INSURANCE: "Insurance",
  LOANS: "Loans",
  ITR: "ITR",
  SUPPORT: "Support",
};

export const PREFERRED_LANGUAGE_LABELS: Record<PreferredLanguage, string> = {
  GUJARATI: "Gujarati",
  HINDI: "Hindi",
  ENGLISH: "English",
};

export const PREFERRED_LANGUAGE_NATIVE_LABELS: Record<
  PreferredLanguage,
  string
> = {
  GUJARATI: "ગુજરાતી",
  HINDI: "हिंदी",
  ENGLISH: "English",
};

export const CUSTOMER_TYPE_LABELS: Record<CustomerType, string> = {
  NEW: "New",
  EXISTING: "Existing",
};

export const HANDOVER_URGENCY_LABELS: Record<HandoverUrgency, string> = {
  NORMAL: "Normal",
  HIGH: "High",
  CRITICAL: "Critical",
};

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Admin",
  ADVISOR: "Advisor",
};

export const DEFAULT_OWNER = "Kaushik Raval";
