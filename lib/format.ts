// Format event times straight from the HKT ISO strings - no timezone conversion,
// so times always display as Hong Kong time regardless of the viewer's location.
import type { CalEvent } from "@/data/events";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function parts(s: string) {
  const [date, time] = s.split("T");
  const [y, m, d] = date.split("-").map(Number);
  const dow = DAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return { y, m, d, dow, hm: time ? time.slice(0, 5) : "" };
}

export function dayLabel(e: CalEvent): string {
  const p = parts(e.start);
  return `${p.dow} ${p.d} ${MONTHS[p.m - 1]}`;
}

export function dayKey(e: CalEvent): string {
  return e.start.split("T")[0];
}

export function timeLabel(e: CalEvent): string {
  if (e.allDay) return "All day";
  const a = parts(e.start).hm;
  const b = parts(e.end).hm;
  return `${a}-${b}`;
}

// e.g. "Thu 28 Aug 2026"
export function fullDate(dateStr: string): string {
  const p = parts(dateStr);
  return `${p.dow} ${p.d} ${MONTHS[p.m - 1]} ${p.y}`;
}
