// Add-to-calendar helpers. Google Calendar template URLs + client-side .ics generation.
// All events add to the *visitor's own* calendar - nothing is tied to any person.

import type { CalEvent } from "@/data/events";

const fmt = (s: string, allDay?: boolean) =>
  allDay
    ? s.replace(/-/g, "") // 2026-08-14 -> 20260814
    : s.replace(/[-:]/g, ""); // 2026-08-28T13:00:00 -> 20260828T130000

export function googleCalUrl(e: CalEvent): string {
  const dates = `${fmt(e.start, e.allDay)}/${fmt(e.end, e.allDay)}`;
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates,
    details: e.details,
  });
  if (e.location) p.set("location", e.location);
  if (!e.allDay) p.set("ctz", "Asia/Hong_Kong");
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

// Escape per RFC 5545.
const esc = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

// Fold long lines to 75 octets (RFC 5545). byte-safe enough for ASCII content.
const fold = (line: string) => {
  if (line.length <= 75) return line;
  const parts: string[] = [];
  let s = line;
  parts.push(s.slice(0, 75));
  s = s.slice(75);
  while (s.length) {
    parts.push(" " + s.slice(0, 74));
    s = s.slice(74);
  }
  return parts.join("\r\n");
};

// Asia/Hong_Kong is a fixed +08:00 with no DST, so a VTIMEZONE block is simple & correct.
const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  "TZID:Asia/Hong_Kong",
  "BEGIN:STANDARD",
  "DTSTART:19700101T000000",
  "TZOFFSETFROM:+0800",
  "TZOFFSETTO:+0800",
  "TZNAME:HKT",
  "END:STANDARD",
  "END:VTIMEZONE",
];

function vevent(e: CalEvent): string[] {
  const lines: string[] = ["BEGIN:VEVENT", `UID:${e.key}@hkust-exchange`];
  // Fixed DTSTAMP - deterministic build, avoids Date usage.
  lines.push("DTSTAMP:20260813T000000Z");
  if (e.allDay) {
    lines.push(`DTSTART;VALUE=DATE:${fmt(e.start, true)}`);
    lines.push(`DTEND;VALUE=DATE:${fmt(e.end, true)}`);
  } else {
    lines.push(`DTSTART;TZID=Asia/Hong_Kong:${fmt(e.start)}`);
    lines.push(`DTEND;TZID=Asia/Hong_Kong:${fmt(e.end)}`);
  }
  lines.push(`SUMMARY:${esc(e.title)}`);
  lines.push(`DESCRIPTION:${esc(e.details)}`);
  if (e.location) lines.push(`LOCATION:${esc(e.location)}`);
  lines.push("END:VEVENT");
  return lines;
}

export function buildIcs(list: CalEvent[]): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//HKUST Exchange Hub//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...VTIMEZONE,
    ...list.flatMap(vevent),
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n");
}

export function downloadIcs(list: CalEvent[], filename: string) {
  if (typeof window === "undefined") return;
  const blob = new Blob([buildIcs(list)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
