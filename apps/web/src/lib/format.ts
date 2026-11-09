const KOLKATA_TIME_ZONE = "Asia/Kolkata";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const countFormatter = new Intl.NumberFormat("en-IN");

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: KOLKATA_TIME_ZONE,
});

const dayMonthFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  timeZone: KOLKATA_TIME_ZONE,
});

const longDateFormatter = new Intl.DateTimeFormat("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: KOLKATA_TIME_ZONE,
});

const dateKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: KOLKATA_TIME_ZONE,
});

function trimDecimal(value: number): string {
  return value.toFixed(2).replace(/\.?0+$/, "");
}

/** Formats a whole-rupee amount for fees and captions: ₹1,200. */
export function formatInr(amount: number): string {
  return inrFormatter.format(amount).replace(/\s/g, "");
}

/** Formats large amounts compactly in the Indian numbering system: ₹12.4L, ₹1.2Cr. */
export function formatCompactInr(amount: number): string {
  const absolute = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";

  if (absolute >= 1_00_00_000) {
    return `${sign}₹${trimDecimal(absolute / 1_00_00_000)}Cr`;
  }
  if (absolute >= 1_00_000) {
    return `${sign}₹${trimDecimal(absolute / 1_00_000)}L`;
  }
  if (absolute >= 1_000) {
    return `${sign}₹${trimDecimal(absolute / 1_000)}K`;
  }
  return `${sign}₹${countFormatter.format(absolute)}`;
}

/** Formats an E.164 Indian number for display: +91 98765 43210. */
export function formatPhone(e164: string): string {
  const digits = e164.replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }

  return e164;
}

export function formatCount(value: number): string {
  return countFormatter.format(value);
}

function dateKey(iso: string): string {
  return dateKeyFormatter.format(new Date(iso));
}

function shiftDateKey(key: string, days: number): string {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days))
    .toISOString()
    .slice(0, 10);
}

function formatTime(iso: string): string {
  return timeFormatter.format(new Date(iso));
}

/**
 * Formats a follow-up timestamp relative to a reference instant:
 * "Today, 4:00 PM", "Tomorrow, 11:00 AM", "11 Nov, 3:00 PM".
 */
export function formatFollowUp(iso: string, nowIso: string): string {
  const targetKey = dateKey(iso);
  const nowKey = dateKey(nowIso);

  if (targetKey === nowKey) {
    return `Today, ${formatTime(iso)}`;
  }

  if (targetKey === shiftDateKey(nowKey, 1)) {
    return `Tomorrow, ${formatTime(iso)}`;
  }

  return `${dayMonthFormatter.format(new Date(iso))}, ${formatTime(iso)}`;
}

/**
 * Compact audit timestamp: "just now", "18m ago", "2h ago", "Yesterday", "7 Nov".
 */
export function formatRelativeTime(iso: string, nowIso: string): string {
  const diffMinutes = Math.round(
    (new Date(nowIso).getTime() - new Date(iso).getTime()) / 60_000,
  );

  if (diffMinutes < 1) {
    return "just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  if (dateKey(iso) === dateKey(nowIso)) {
    return `${Math.round(diffMinutes / 60)}h ago`;
  }

  if (dateKey(iso) === shiftDateKey(dateKey(nowIso), -1)) {
    return "Yesterday";
  }

  return dayMonthFormatter.format(new Date(iso));
}

/** Long editorial date: "Monday, 9 November 2026". */
export function formatDateLong(iso: string): string {
  return longDateFormatter.format(new Date(iso));
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
