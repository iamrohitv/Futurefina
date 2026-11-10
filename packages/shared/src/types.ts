/**
 * Futurefina domain types.
 *
 * These types mirror the approved schema in `.github/docs/ARCHITECTURE.md`
 * and the lead lifecycle in `.github/docs/PRD.md` (section 5).
 */

export const LEAD_STATUSES = [
  "NEW",
  "QUALIFICATION_IN_PROGRESS",
  "QUALIFIED",
  "ASSIGNED",
  "CONTACT_ATTEMPTED",
  "FOLLOW_UP_REQUIRED",
  "CONVERTED",
  "NOT_INTERESTED",
  "CLOSED",
  "ESCALATED_COMPLAINT",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const SERVICE_CATEGORIES = [
  "MUTUAL_FUNDS",
  "STOCKS_DEMAT",
  "INSURANCE",
  "LOANS",
  "ITR",
  "SUPPORT",
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export const PREFERRED_LANGUAGES = ["GUJARATI", "HINDI", "ENGLISH"] as const;

export type PreferredLanguage = (typeof PREFERRED_LANGUAGES)[number];

export type CustomerType = "NEW" | "EXISTING";

export type LeadSource = "WHATSAPP" | "MANUAL" | "REFERRAL";

export type MessageDirection = "INBOUND" | "OUTBOUND";

export type MessageDeliveryStatus = "SENT" | "DELIVERED" | "READ";

export type HandoverUrgency = "NORMAL" | "HIGH" | "CRITICAL";

export type HandoverStatus = "PENDING" | "ACKNOWLEDGED" | "RESOLVED";

export type ConsentType = "ENQUIRY_RESPONSE" | "PROMOTIONAL_COMMUNICATION";

export type UserRole = "ADMIN" | "ADVISOR";

export interface Lead {
  id: string;
  leadCode: string;
  phoneE164: string;
  customerName: string;
  preferredLanguage: PreferredLanguage;
  serviceCategory: ServiceCategory;
  serviceSubcategory: string;
  customerType: CustomerType;
  status: LeadStatus;
  capturedDetails: Record<string, string>;
  enquirySummary: string;
  assignedOwner: string;
  nextFollowUpAt: string | null;
  promotionalOptIn: boolean;
  consentRecordedAt: string;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationMessage {
  id: string;
  leadId: string;
  direction: MessageDirection;
  body: string;
  language: PreferredLanguage;
  sentAt: string;
  deliveryStatus: MessageDeliveryStatus;
}

export interface LeadNote {
  id: string;
  leadId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface HandoverDispatch {
  id: string;
  leadId: string;
  urgency: HandoverUrgency;
  triggerReason: string;
  status: HandoverStatus;
  dispatchedAt: string;
}

export interface ConsentAuditEntry {
  id: string;
  leadId: string;
  phoneE164: string;
  consentType: ConsentType;
  granted: boolean;
  consentWordingVersion: string;
  recordedAt: string;
}

export interface KpiMetric {
  key: string;
  label: string;
  value: number;
  displayValue: string;
  deltaPercent: number;
  isImprovement: boolean;
  comparisonLabel: string;
  sparkline: number[];
}

export interface ServiceCategorySummary {
  category: ServiceCategory;
  count: number;
  sharePercent: number;
}

export interface PipelinePoint {
  label: string;
  newLeads: number;
  qualified: number;
  projected: boolean;
}

export interface UpcomingFollowUp {
  id: string;
  leadId: string;
  leadCode: string;
  customerName: string;
  serviceCategory: ServiceCategory;
  serviceSubcategory: string;
  scheduledFor: string;
  owner: string;
  urgent: boolean;
}

/** ITR pricing tier configuration. */
export interface ItrPricingTier {
  id: string;
  name: string;
  description: string;
  indicativeFee: number;
  applicableForms: string[];
  turnaroundDays: number;
  isActive: boolean;
}

/** Approved FAQ entry for the knowledge base. */
export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  category: ServiceCategory;
  languages: PreferredLanguage[];
  isActive: boolean;
  updatedAt: string;
}

/** Partner link configuration. */
export interface PartnerLink {
  id: string;
  name: string;
  url: string;
  category: ServiceCategory;
  isActive: boolean;
}

/** Office hours configuration per advisor. */
export interface OfficeHours {
  id: string;
  advisorName: string;
  dayOfWeek: number; // 0=Sun ... 6=Sat
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  timezone: string;
  isActive: boolean;
}

/** Team member / advisor configuration. */
export interface TeamMember {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phoneE164: string;
  serviceCategories: ServiceCategory[];
  languages: PreferredLanguage[];
  isActive: boolean;
}

/** Configuration change audit trail entry. */
export interface ConfigAuditEntry {
  id: string;
  changedBy: string;
  changedByRole: UserRole;
  section: "ITR_PRICING" | "FAQ" | "PARTNER_LINKS" | "OFFICE_HOURS" | "TEAM";
  action: "CREATE" | "UPDATE" | "DELETE" | "TOGGLE";
  targetId: string;
  targetName: string;
  previousValue: string | null;
  newValue: string | null;
  changedAt: string;
}
