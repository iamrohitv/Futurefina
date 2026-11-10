import type {
  ConfigAuditEntry,
  ConversationMessage,
  FaqEntry,
  HandoverDispatch,
  ItrPricingTier,
  KpiMetric,
  Lead,
  OfficeHours,
  PartnerLink,
  PipelinePoint,
  ServiceCategorySummary,
  TeamMember,
  UpcomingFollowUp,
} from "@futurefina/shared";

/**
 * Fixed reference instant for deterministic UI copy and tests.
 * The mock layer is replaced by the PostgreSQL-backed API in Phase 5.
 */
export const MOCK_NOW = "2026-11-09T10:30:00+05:30";

export const overviewKpis: KpiMetric[] = [
  {
    key: "new-leads",
    label: "Total new leads",
    value: 128,
    displayValue: "128",
    deltaPercent: 18.4,
    isImprovement: true,
    comparisonLabel: "vs. last month",
    sparkline: [42, 58, 49, 66, 61, 84, 92, 88, 104, 112, 121, 128],
  },
  {
    key: "qualified",
    label: "Qualified leads",
    value: 74,
    displayValue: "74",
    deltaPercent: 9.2,
    isImprovement: true,
    comparisonLabel: "vs. last month",
    sparkline: [18, 24, 22, 31, 28, 36, 41, 39, 48, 55, 63, 74],
  },
  {
    key: "pending-follow-ups",
    label: "Pending follow-ups",
    value: 12,
    displayValue: "12",
    deltaPercent: -3.1,
    isImprovement: true,
    comparisonLabel: "4 due today",
    sparkline: [21, 19, 22, 18, 20, 17, 16, 18, 14, 13, 12, 12],
  },
  {
    key: "conversions",
    label: "Conversions",
    value: 31,
    displayValue: "31",
    deltaPercent: 4.8,
    isImprovement: true,
    comparisonLabel: "vs. last month",
    sparkline: [8, 11, 10, 14, 13, 17, 19, 18, 22, 25, 28, 31],
  },
];

export const serviceMix: ServiceCategorySummary[] = [
  {
    category: "MUTUAL_FUNDS",
    count: 48,
    sharePercent: 37.5,
  },
  {
    category: "INSURANCE",
    count: 31,
    sharePercent: 24.2,
  },
  {
    category: "ITR",
    count: 18,
    sharePercent: 14.1,
  },
  {
    category: "STOCKS_DEMAT",
    count: 15,
    sharePercent: 11.7,
  },
  {
    category: "LOANS",
    count: 9,
    sharePercent: 7.0,
  },
  {
    category: "SUPPORT",
    count: 7,
    sharePercent: 5.5,
  },
];

export const pipelineActivity: PipelinePoint[] = [
  { label: "Tue 3", newLeads: 18, qualified: 9, projected: false },
  { label: "Wed 4", newLeads: 24, qualified: 12, projected: false },
  { label: "Thu 5", newLeads: 16, qualified: 8, projected: false },
  { label: "Fri 6", newLeads: 28, qualified: 15, projected: false },
  { label: "Sat 7", newLeads: 22, qualified: 11, projected: false },
  { label: "Sun 8", newLeads: 14, qualified: 7, projected: false },
  { label: "Today", newLeads: 20, qualified: 11, projected: true },
];

export const leads: Lead[] = [
  {
    id: "lead-001",
    leadCode: "FF-2026-0148",
    phoneE164: "+919876543210",
    customerName: "Ramesh Patel",
    preferredLanguage: "GUJARATI",
    serviceCategory: "MUTUAL_FUNDS",
    serviceSubcategory: "SIP · ELSS",
    customerType: "NEW",
    status: "QUALIFIED",
    capturedDetails: {
      "Monthly SIP": "₹10,000",
      Horizon: "5–10 years",
      "Risk comfort": "Moderate",
      KYC: "Completed",
    },
    enquirySummary:
      "Wants to start a long-term SIP and compare ELSS against a flexi-cap fund. Prefers a Gujarati callback.",
    assignedOwner: "Kaushik Raval",
    nextFollowUpAt: "2026-11-09T16:00:00+05:30",
    promotionalOptIn: true,
    consentRecordedAt: "2026-11-09T09:42:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-08T18:20:00+05:30",
    updatedAt: "2026-11-09T10:28:00+05:30",
  },
  {
    id: "lead-002",
    leadCode: "FF-2026-0149",
    phoneE164: "+919876543211",
    customerName: "Priya Shah",
    preferredLanguage: "GUJARATI",
    serviceCategory: "ITR",
    serviceSubcategory: "Salary ITR",
    customerType: "NEW",
    status: "NEW",
    capturedDetails: {
      "Assessment year": "AY 2026–27",
      Income: "Salary only",
      Documents: "Form 16 available",
    },
    enquirySummary:
      "Salaried professional asking about the ₹1,200 salary-only ITR package and document checklist.",
    assignedOwner: "Kaushik Raval",
    nextFollowUpAt: null,
    promotionalOptIn: false,
    consentRecordedAt: "2026-11-09T10:06:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-09T10:04:00+05:30",
    updatedAt: "2026-11-09T10:12:00+05:30",
  },
  {
    id: "lead-003",
    leadCode: "FF-2026-0150",
    phoneE164: "+919876543212",
    customerName: "Amit Verma",
    preferredLanguage: "HINDI",
    serviceCategory: "INSURANCE",
    serviceSubcategory: "Health Insurance",
    customerType: "EXISTING",
    status: "ESCALATED_COMPLAINT",
    capturedDetails: {
      "Policy type": "Family floater",
      "Cover sought": "₹10L",
      Issue: "Claim rejection",
    },
    enquirySummary:
      "Existing health policy claim was rejected. Customer is frustrated and has asked for Kaushik directly.",
    assignedOwner: "Kaushik Raval",
    nextFollowUpAt: "2026-11-09T14:00:00+05:30",
    promotionalOptIn: false,
    consentRecordedAt: "2026-11-09T09:20:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-09T09:12:00+05:30",
    updatedAt: "2026-11-09T10:05:00+05:30",
  },
  {
    id: "lead-004",
    leadCode: "FF-2026-0151",
    phoneE164: "+919876543213",
    customerName: "Neha Desai",
    preferredLanguage: "ENGLISH",
    serviceCategory: "STOCKS_DEMAT",
    serviceSubcategory: "Demat Account",
    customerType: "NEW",
    status: "QUALIFICATION_IN_PROGRESS",
    capturedDetails: {
      City: "Ahmedabad",
      "Account type": "New demat",
      Platform: "Undecided",
    },
    enquirySummary:
      "Comparing demat account opening options and asking about partner platform charges.",
    assignedOwner: "Rohit Verma",
    nextFollowUpAt: null,
    promotionalOptIn: false,
    consentRecordedAt: "2026-11-09T09:28:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-09T09:25:00+05:30",
    updatedAt: "2026-11-09T09:30:00+05:30",
  },
  {
    id: "lead-005",
    leadCode: "FF-2026-0152",
    phoneE164: "+919876543214",
    customerName: "Karan Mehta",
    preferredLanguage: "HINDI",
    serviceCategory: "LOANS",
    serviceSubcategory: "Loan Against MF",
    customerType: "EXISTING",
    status: "FOLLOW_UP_REQUIRED",
    capturedDetails: {
      "Loan amount": "₹8L",
      "MF holding": "₹14L",
      Purpose: "Business working capital",
    },
    enquirySummary:
      "Wants a loan against mutual funds and requested a callback after 5:30 PM.",
    assignedOwner: "Kaushik Raval",
    nextFollowUpAt: "2026-11-09T17:30:00+05:30",
    promotionalOptIn: true,
    consentRecordedAt: "2026-11-08T16:05:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-08T15:50:00+05:30",
    updatedAt: "2026-11-09T09:12:00+05:30",
  },
  {
    id: "lead-006",
    leadCode: "FF-2026-0153",
    phoneE164: "+919876543215",
    customerName: "Sneha Joshi",
    preferredLanguage: "GUJARATI",
    serviceCategory: "MUTUAL_FUNDS",
    serviceSubcategory: "Lumpsum",
    customerType: "EXISTING",
    status: "CONVERTED",
    capturedDetails: {
      "Lumpsum amount": "₹5L",
      Fund: "Flexi-cap",
      KYC: "Completed",
    },
    enquirySummary:
      "Completed a ₹5L lumpsum investment after a suitability discussion. Onboarding confirmation sent.",
    assignedOwner: "Kaushik Raval",
    nextFollowUpAt: null,
    promotionalOptIn: true,
    consentRecordedAt: "2026-11-07T12:10:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-06T11:30:00+05:30",
    updatedAt: "2026-11-09T08:45:00+05:30",
  },
  {
    id: "lead-007",
    leadCode: "FF-2026-0154",
    phoneE164: "+919876543216",
    customerName: "Vikram Rathod",
    preferredLanguage: "GUJARATI",
    serviceCategory: "INSURANCE",
    serviceSubcategory: "Motor Insurance",
    customerType: "NEW",
    status: "ASSIGNED",
    capturedDetails: {
      Vehicle: "Private car · 2022",
      Cover: "Comprehensive",
      "Renewal date": "18 Nov 2026",
    },
    enquirySummary:
      "Comprehensive motor renewal quote requested. RC copy handoff pending via secure link.",
    assignedOwner: "Rohit Verma",
    nextFollowUpAt: "2026-11-10T11:00:00+05:30",
    promotionalOptIn: false,
    consentRecordedAt: "2026-11-08T13:40:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-08T13:20:00+05:30",
    updatedAt: "2026-11-09T08:20:00+05:30",
  },
  {
    id: "lead-008",
    leadCode: "FF-2026-0155",
    phoneE164: "+919876543217",
    customerName: "Anjali Trivedi",
    preferredLanguage: "HINDI",
    serviceCategory: "ITR",
    serviceSubcategory: "Capital Gains ITR",
    customerType: "NEW",
    status: "CONTACT_ATTEMPTED",
    capturedDetails: {
      "Assessment year": "AY 2026–27",
      Income: "Salary + stocks",
      Documents: "AIS pending",
    },
    enquirySummary:
      "Needs capital-gains ITR support. First call attempted; customer asked to be called after 6 PM.",
    assignedOwner: "Nisha Patel",
    nextFollowUpAt: "2026-11-09T18:00:00+05:30",
    promotionalOptIn: true,
    consentRecordedAt: "2026-11-08T17:15:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-08T16:55:00+05:30",
    updatedAt: "2026-11-08T17:45:00+05:30",
  },
  {
    id: "lead-009",
    leadCode: "FF-2026-0156",
    phoneE164: "+919876543218",
    customerName: "Mehul Bhatt",
    preferredLanguage: "GUJARATI",
    serviceCategory: "MUTUAL_FUNDS",
    serviceSubcategory: "SIP · Tax Saving",
    customerType: "NEW",
    status: "QUALIFIED",
    capturedDetails: {
      "Monthly SIP": "₹15,000",
      Horizon: "10+ years",
      "Risk comfort": "Moderate",
      KYC: "In progress",
    },
    enquirySummary:
      "Tax-saving ELSS enquiry for the current financial year. KYC is in progress.",
    assignedOwner: "Kaushik Raval",
    nextFollowUpAt: "2026-11-10T10:00:00+05:30",
    promotionalOptIn: true,
    consentRecordedAt: "2026-11-08T15:30:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-08T15:10:00+05:30",
    updatedAt: "2026-11-08T16:10:00+05:30",
  },
  {
    id: "lead-010",
    leadCode: "FF-2026-0157",
    phoneE164: "+919876543219",
    customerName: "Pooja Chauhan",
    preferredLanguage: "HINDI",
    serviceCategory: "SUPPORT",
    serviceSubcategory: "Policy Renewal",
    customerType: "EXISTING",
    status: "NEW",
    capturedDetails: {
      "Policy type": "Term life",
      "Renewal date": "30 Nov 2026",
      "Preferred time": "Weekday mornings",
    },
    enquirySummary:
      "Asked for a renewal reminder and updated premium schedule for an existing term policy.",
    assignedOwner: "Nisha Patel",
    nextFollowUpAt: null,
    promotionalOptIn: false,
    consentRecordedAt: "2026-11-08T14:20:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-08T14:18:00+05:30",
    updatedAt: "2026-11-08T14:30:00+05:30",
  },
  {
    id: "lead-011",
    leadCode: "FF-2026-0158",
    phoneE164: "+919876543220",
    customerName: "Arjun Nair",
    preferredLanguage: "ENGLISH",
    serviceCategory: "STOCKS_DEMAT",
    serviceSubcategory: "IPO Enquiry",
    customerType: "NEW",
    status: "NOT_INTERESTED",
    capturedDetails: {
      Query: "IPO application process",
      Outcome: "Using existing broker",
    },
    enquirySummary:
      "Asked about IPO applications but decided to continue with the existing broker.",
    assignedOwner: "Rohit Verma",
    nextFollowUpAt: null,
    promotionalOptIn: false,
    consentRecordedAt: "2026-11-08T10:50:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-08T10:40:00+05:30",
    updatedAt: "2026-11-08T11:05:00+05:30",
  },
  {
    id: "lead-012",
    leadCode: "FF-2026-0159",
    phoneE164: "+919876543221",
    customerName: "Hetal Parekh",
    preferredLanguage: "GUJARATI",
    serviceCategory: "INSURANCE",
    serviceSubcategory: "Term Life",
    customerType: "NEW",
    status: "QUALIFIED",
    capturedDetails: {
      Age: "34",
      "Cover sought": "₹1Cr",
      "Policy term": "30 years",
      Income: "₹12L–₹15L",
    },
    enquirySummary:
      "Term life cover enquiry for family protection. Awaiting underwriting pre-check.",
    assignedOwner: "Kaushik Raval",
    nextFollowUpAt: "2026-11-11T15:00:00+05:30",
    promotionalOptIn: true,
    consentRecordedAt: "2026-11-07T13:50:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-07T13:30:00+05:30",
    updatedAt: "2026-11-07T14:20:00+05:30",
  },
  {
    id: "lead-013",
    leadCode: "FF-2026-0160",
    phoneE164: "+919876543222",
    customerName: "Dinesh Solanki",
    preferredLanguage: "HINDI",
    serviceCategory: "LOANS",
    serviceSubcategory: "Personal Loan",
    customerType: "NEW",
    status: "CLOSED",
    capturedDetails: {
      "Loan amount": "₹3L",
      Outcome: "Approved with partner lender",
    },
    enquirySummary:
      "Personal loan enquiry completed and disbursed through the partner lender. Case closed.",
    assignedOwner: "Nisha Patel",
    nextFollowUpAt: null,
    promotionalOptIn: false,
    consentRecordedAt: "2026-11-06T12:15:00+05:30",
    source: "REFERRAL",
    createdAt: "2026-11-05T11:00:00+05:30",
    updatedAt: "2026-11-07T10:00:00+05:30",
  },
  {
    id: "lead-014",
    leadCode: "FF-2026-0161",
    phoneE164: "+919876543223",
    customerName: "Kavita Joshi",
    preferredLanguage: "GUJARATI",
    serviceCategory: "SUPPORT",
    serviceSubcategory: "Claim Support",
    customerType: "EXISTING",
    status: "ESCALATED_COMPLAINT",
    capturedDetails: {
      "Policy type": "Health",
      Issue: "Hospital reimbursement delay",
      "Days pending": "21",
    },
    enquirySummary:
      "Hospital reimbursement has been pending for 21 days. Customer requested urgent escalation to Kaushik.",
    assignedOwner: "Kaushik Raval",
    nextFollowUpAt: "2026-11-09T12:00:00+05:30",
    promotionalOptIn: false,
    consentRecordedAt: "2026-11-09T09:55:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-09T09:50:00+05:30",
    updatedAt: "2026-11-09T10:20:00+05:30",
  },
  {
    id: "lead-015",
    leadCode: "FF-2026-0162",
    phoneE164: "+919876543224",
    customerName: "Farhan Sheikh",
    preferredLanguage: "HINDI",
    serviceCategory: "MUTUAL_FUNDS",
    serviceSubcategory: "SIP · Index",
    customerType: "NEW",
    status: "CONVERTED",
    capturedDetails: {
      "Monthly SIP": "₹5,000",
      Fund: "Index fund",
      KYC: "Completed",
    },
    enquirySummary:
      "Started a ₹5,000 monthly index SIP after completing KYC and consent.",
    assignedOwner: "Kaushik Raval",
    nextFollowUpAt: null,
    promotionalOptIn: true,
    consentRecordedAt: "2026-11-06T15:20:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-06T14:50:00+05:30",
    updatedAt: "2026-11-06T16:10:00+05:30",
  },
  {
    id: "lead-016",
    leadCode: "FF-2026-0163",
    phoneE164: "+919876543225",
    customerName: "Ritu Agarwal",
    preferredLanguage: "ENGLISH",
    serviceCategory: "ITR",
    serviceSubcategory: "Salary ITR",
    customerType: "NEW",
    status: "NEW",
    capturedDetails: {
      "Assessment year": "AY 2026–27",
      Income: "Salary only",
      Documents: "Form 16, AIS",
    },
    enquirySummary:
      "First-time ITR filer asking whether the salary-only package covers AIS reconciliation.",
    assignedOwner: "Nisha Patel",
    nextFollowUpAt: null,
    promotionalOptIn: false,
    consentRecordedAt: "2026-11-06T11:10:00+05:30",
    source: "WHATSAPP",
    createdAt: "2026-11-06T11:05:00+05:30",
    updatedAt: "2026-11-06T11:30:00+05:30",
  },
];

export const conversationMessages: ConversationMessage[] = [
  {
    id: "msg-001",
    leadId: "lead-001",
    direction: "INBOUND",
    body: "Namaste, mare SIP shuru karvu che. Gujarati ma callback joie che.",
    language: "GUJARATI",
    sentAt: "2026-11-08T18:20:00+05:30",
    deliveryStatus: "READ",
  },
  {
    id: "msg-002",
    leadId: "lead-001",
    direction: "OUTBOUND",
    body: "Hello Rameshbhai! I've noted your SIP enquiry. Our advisor Kaushik Raval will call you in Gujarati today.",
    language: "ENGLISH",
    sentAt: "2026-11-08T18:25:00+05:30",
    deliveryStatus: "READ",
  },
  {
    id: "msg-003",
    leadId: "lead-001",
    direction: "INBOUND",
    body: "Thank you. Monthly SIP ₹10,000 for 5-10 years. Risk comfort moderate.",
    language: "ENGLISH",
    sentAt: "2026-11-08T18:45:00+05:30",
    deliveryStatus: "READ",
  },
  {
    id: "msg-004",
    leadId: "lead-001",
    direction: "OUTBOUND",
    body: "Perfect. KYC is completed. I've scheduled a callback for today at 4:00 PM. Is that convenient?",
    language: "ENGLISH",
    sentAt: "2026-11-09T10:20:00+05:30",
    deliveryStatus: "DELIVERED",
  },
  {
    id: "msg-005",
    leadId: "lead-002",
    direction: "INBOUND",
    body: "Namaste, mare salary ITR file karvano che. AY 2026-27 ma.",
    language: "GUJARATI",
    sentAt: "2026-11-09T10:04:00+05:30",
    deliveryStatus: "READ",
  },
  {
    id: "msg-006",
    leadId: "lead-002",
    direction: "OUTBOUND",
    body: "Hello Priyaben! I can help with your salary-only ITR for AY 2026-27. The package is ₹1,200. Do you have Form 16 ready?",
    language: "ENGLISH",
    sentAt: "2026-11-09T10:08:00+05:30",
    deliveryStatus: "SENT",
  },
  {
    id: "msg-007",
    leadId: "lead-003",
    direction: "INBOUND",
    body: "Mere health insurance claim reject kar diya gaya hai. 21 din se reimbursement pending hai. Kaushik ji se baat karni hai.",
    language: "HINDI",
    sentAt: "2026-11-09T09:12:00+05:30",
    deliveryStatus: "READ",
  },
  {
    id: "msg-008",
    leadId: "lead-003",
    direction: "OUTBOUND",
    body: "Namaste Amit ji. I understand your frustration. I've escalated this to Kaushik Raval directly. He will call you at 2:00 PM today regarding your hospital reimbursement.",
    language: "HINDI",
    sentAt: "2026-11-09T09:15:00+05:30",
    deliveryStatus: "READ",
  },
  {
    id: "msg-009",
    leadId: "lead-014",
    direction: "INBOUND",
    body: "Hello, my health claim reimbursement has been pending for 21 days. Can you help?",
    language: "ENGLISH",
    sentAt: "2026-11-09T09:50:00+05:30",
    deliveryStatus: "READ",
  },
  {
    id: "msg-010",
    leadId: "lead-014",
    direction: "OUTBOUND",
    body: "Hello Kavitaben. I'm sorry for the delay. This has been escalated as HIGH priority. Kaushik will personally review your case at 12:00 PM today.",
    language: "ENGLISH",
    sentAt: "2026-11-09T09:55:00+05:30",
    deliveryStatus: "READ",
  },
];

export function getMessagesForLead(leadId: string): ConversationMessage[] {
  return [...conversationMessages]
    .filter((msg) => msg.leadId === leadId)
    .sort(
      (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
    );
}

export function getUnreadCount(leadId: string): number {
  return conversationMessages.filter(
    (msg) =>
      msg.leadId === leadId &&
      msg.direction === "INBOUND" &&
      msg.deliveryStatus !== "READ",
  ).length;
}

export const handoverDispatches: HandoverDispatch[] = [
  {
    id: "handover-001",
    leadId: "lead-003",
    urgency: "CRITICAL",
    triggerReason:
      "Claim rejection complaint — customer requested Kaushik directly.",
    status: "PENDING",
    dispatchedAt: "2026-11-09T10:05:00+05:30",
  },
  {
    id: "handover-002",
    leadId: "lead-014",
    urgency: "HIGH",
    triggerReason: "Hospital reimbursement pending for 21 days.",
    status: "PENDING",
    dispatchedAt: "2026-11-09T10:20:00+05:30",
  },
];

export const upcomingFollowUps: UpcomingFollowUp[] = [
  {
    id: "follow-up-001",
    leadId: "lead-014",
    leadCode: "FF-2026-0161",
    customerName: "Kavita Joshi",
    serviceCategory: "SUPPORT",
    serviceSubcategory: "Claim Support",
    scheduledFor: "2026-11-09T12:00:00+05:30",
    owner: "Kaushik Raval",
    urgent: true,
  },
  {
    id: "follow-up-002",
    leadId: "lead-001",
    leadCode: "FF-2026-0148",
    customerName: "Ramesh Patel",
    serviceCategory: "MUTUAL_FUNDS",
    serviceSubcategory: "SIP · ELSS",
    scheduledFor: "2026-11-09T16:00:00+05:30",
    owner: "Kaushik Raval",
    urgent: false,
  },
  {
    id: "follow-up-003",
    leadId: "lead-005",
    leadCode: "FF-2026-0152",
    customerName: "Karan Mehta",
    serviceCategory: "LOANS",
    serviceSubcategory: "Loan Against MF",
    scheduledFor: "2026-11-09T17:30:00+05:30",
    owner: "Kaushik Raval",
    urgent: false,
  },
  {
    id: "follow-up-004",
    leadId: "lead-008",
    leadCode: "FF-2026-0155",
    customerName: "Anjali Trivedi",
    serviceCategory: "ITR",
    serviceSubcategory: "Capital Gains ITR",
    scheduledFor: "2026-11-09T18:00:00+05:30",
    owner: "Nisha Patel",
    urgent: false,
  },
  {
    id: "follow-up-005",
    leadId: "lead-007",
    leadCode: "FF-2026-0154",
    customerName: "Vikram Rathod",
    serviceCategory: "INSURANCE",
    serviceSubcategory: "Motor Insurance",
    scheduledFor: "2026-11-10T11:00:00+05:30",
    owner: "Rohit Verma",
    urgent: false,
  },
];

export function getRecentLeads(limit = 6): Lead[] {
  return [...leads]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, limit);
}

export function getLeadById(id: string): Lead | undefined {
  return leads.find((lead) => lead.id === id);
}

/** Zero-code configuration mock data (Phase 4). */

/** ITR pricing tiers — indicative fees per PRD section 4. */
export const itrPricingTiers: ItrPricingTier[] = [
  {
    id: "itr-001",
    name: "Salary Only",
    description:
      "Salary income only, Form 16 based, AIS reconciliation included.",
    indicativeFee: 1200,
    applicableForms: ["ITR-1", "ITR-2"],
    turnaroundDays: 3,
    isActive: true,
  },
  {
    id: "itr-002",
    name: "Salary + Stocks / Capital Gains",
    description:
      "Salary with capital gains from stocks, mutual funds, or IPO investments.",
    indicativeFee: 1500,
    applicableForms: ["ITR-2", "ITR-3"],
    turnaroundDays: 5,
    isActive: true,
  },
  {
    id: "itr-003",
    name: "High-Volume Trading",
    description:
      "F&O trading, intraday, or high-volume equity transactions with audit.",
    indicativeFee: 2000,
    applicableForms: ["ITR-3"],
    turnaroundDays: 7,
    isActive: true,
  },
];

/** Approved FAQ entries for the multilingual knowledge base. */
export const faqEntries: FaqEntry[] = [
  {
    id: "faq-001",
    question: "What documents are needed for a salary-only ITR?",
    answer:
      "Form 16, AIS, bank statements, and investment proofs for the assessment year.",
    category: "ITR",
    languages: ["ENGLISH", "HINDI", "GUJARATI"],
    isActive: true,
    updatedAt: "2026-11-08T14:30:00+05:30",
  },
  {
    id: "faq-002",
    question: "Can I start a SIP with ₹5,000 per month?",
    answer:
      "Yes. Mutual fund SIPs can start from ₹500 per month depending on the fund house.",
    category: "MUTUAL_FUNDS",
    languages: ["ENGLISH", "HINDI", "GUJARATI"],
    isActive: true,
    updatedAt: "2026-11-07T11:00:00+05:30",
  },
  {
    id: "faq-003",
    question: "What is the renewal process for motor insurance?",
    answer:
      "Share your RC copy and previous policy. We’ll provide a comprehensive quote within 24 hours.",
    category: "INSURANCE",
    languages: ["ENGLISH", "HINDI"],
    isActive: true,
    updatedAt: "2026-11-06T16:45:00+05:30",
  },
  {
    id: "faq-004",
    question: "How long does a loan against mutual funds take?",
    answer:
      "Typically 3–5 working days after pledge marking and document verification.",
    category: "LOANS",
    languages: ["ENGLISH", "HINDI", "GUJARATI"],
    isActive: true,
    updatedAt: "2026-11-05T10:20:00+05:30",
  },
];

/** Approved partner links. */
export const partnerLinks: PartnerLink[] = [
  {
    id: "partner-001",
    name: "Zerodha Demat Account",
    url: "https://zerodha.com/account-opening",
    category: "STOCKS_DEMAT",
    isActive: true,
  },
  {
    id: "partner-002",
    name: "Groww Mutual Funds",
    url: "https://groww.in/mutual-funds",
    category: "MUTUAL_FUNDS",
    isActive: true,
  },
  {
    id: "partner-003",
    name: "HDFC ERGO Health Insurance",
    url: "https://hdfcergo.com/health-insurance",
    category: "INSURANCE",
    isActive: true,
  },
];

/** Office hours per advisor (IST). */
export const officeHours: OfficeHours[] = [
  {
    id: "oh-001",
    advisorName: "Kaushik Raval",
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "18:00",
    timezone: "Asia/Kolkata",
    isActive: true,
  },
  {
    id: "oh-002",
    advisorName: "Kaushik Raval",
    dayOfWeek: 2,
    startTime: "09:00",
    endTime: "18:00",
    timezone: "Asia/Kolkata",
    isActive: true,
  },
  {
    id: "oh-003",
    advisorName: "Kaushik Raval",
    dayOfWeek: 3,
    startTime: "09:00",
    endTime: "18:00",
    timezone: "Asia/Kolkata",
    isActive: true,
  },
  {
    id: "oh-004",
    advisorName: "Kaushik Raval",
    dayOfWeek: 4,
    startTime: "09:00",
    endTime: "18:00",
    timezone: "Asia/Kolkata",
    isActive: true,
  },
  {
    id: "oh-005",
    advisorName: "Kaushik Raval",
    dayOfWeek: 5,
    startTime: "09:00",
    endTime: "17:00",
    timezone: "Asia/Kolkata",
    isActive: true,
  },
  {
    id: "oh-006",
    advisorName: "Rohit Verma",
    dayOfWeek: 1,
    startTime: "10:00",
    endTime: "17:00",
    timezone: "Asia/Kolkata",
    isActive: true,
  },
  {
    id: "oh-007",
    advisorName: "Rohit Verma",
    dayOfWeek: 3,
    startTime: "10:00",
    endTime: "17:00",
    timezone: "Asia/Kolkata",
    isActive: true,
  },
  {
    id: "oh-008",
    advisorName: "Rohit Verma",
    dayOfWeek: 5,
    startTime: "10:00",
    endTime: "16:00",
    timezone: "Asia/Kolkata",
    isActive: true,
  },
  {
    id: "oh-009",
    advisorName: "Nisha Patel",
    dayOfWeek: 2,
    startTime: "10:00",
    endTime: "17:00",
    timezone: "Asia/Kolkata",
    isActive: true,
  },
  {
    id: "oh-010",
    advisorName: "Nisha Patel",
    dayOfWeek: 4,
    startTime: "10:00",
    endTime: "17:00",
    timezone: "Asia/Kolkata",
    isActive: true,
  },
];

/** Team members / advisors. */
export const teamMembers: TeamMember[] = [
  {
    id: "tm-001",
    name: "Kaushik Raval",
    role: "ADMIN",
    email: "kaushik@futurefina.in",
    phoneE164: "+919876543200",
    serviceCategories: ["MUTUAL_FUNDS", "INSURANCE", "LOANS", "ITR", "SUPPORT"],
    languages: ["GUJARATI", "HINDI", "ENGLISH"],
    isActive: true,
  },
  {
    id: "tm-002",
    name: "Rohit Verma",
    role: "ADVISOR",
    email: "rohit@futurefina.in",
    phoneE164: "+919876543201",
    serviceCategories: ["STOCKS_DEMAT", "INSURANCE", "LOANS"],
    languages: ["HINDI", "ENGLISH", "GUJARATI"],
    isActive: true,
  },
  {
    id: "tm-003",
    name: "Nisha Patel",
    role: "ADVISOR",
    email: "nisha@futurefina.in",
    phoneE164: "+919876543202",
    serviceCategories: ["ITR", "SUPPORT", "MUTUAL_FUNDS"],
    languages: ["GUJARATI", "HINDI", "ENGLISH"],
    isActive: true,
  },
];

/** Configuration change audit trail. */
export const configAuditEntries: ConfigAuditEntry[] = [
  {
    id: "audit-001",
    changedBy: "Kaushik Raval",
    changedByRole: "ADMIN",
    section: "ITR_PRICING",
    action: "UPDATE",
    targetId: "itr-001",
    targetName: "Salary Only ITR fee",
    previousValue: "₹1,000",
    newValue: "₹1,200",
    changedAt: "2026-11-08T10:15:00+05:30",
  },
  {
    id: "audit-002",
    changedBy: "Kaushik Raval",
    changedByRole: "ADMIN",
    section: "PARTNER_LINKS",
    action: "CREATE",
    targetId: "partner-003",
    targetName: "HDFC ERGO Health Insurance",
    previousValue: null,
    newValue: "https://hdfcergo.com/health-insurance",
    changedAt: "2026-11-07T09:30:00+05:30",
  },
  {
    id: "audit-003",
    changedBy: "Nisha Patel",
    changedByRole: "ADVISOR",
    section: "FAQ",
    action: "UPDATE",
    targetId: "faq-002",
    targetName: "SIP minimum amount FAQ",
    previousValue: "₹1,000 per month",
    newValue: "₹500 per month",
    changedAt: "2026-11-06T14:10:00+05:30",
  },
];

export function getItrPricingTiers(): ItrPricingTier[] {
  return [...itrPricingTiers].sort((a, b) => a.indicativeFee - b.indicativeFee);
}

export function getFaqEntries(): FaqEntry[] {
  return [...faqEntries].sort((a, b) => a.category.localeCompare(b.category));
}

export function getPartnerLinks(): PartnerLink[] {
  return [...partnerLinks].sort((a, b) => a.name.localeCompare(b.name));
}

export function getOfficeHours(): OfficeHours[] {
  return [...officeHours].sort(
    (a, b) =>
      a.advisorName.localeCompare(b.advisorName) || a.dayOfWeek - b.dayOfWeek,
  );
}

export function getTeamMembers(): TeamMember[] {
  return [...teamMembers].sort((a, b) => a.name.localeCompare(b.name));
}

export function getConfigAuditEntries(): ConfigAuditEntry[] {
  return [...configAuditEntries].sort(
    (a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime(),
  );
}
