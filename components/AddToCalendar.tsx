"use client";
import { Plus, Download } from "lucide-react";
import type { CalEvent } from "@/data/events";
import { googleCalUrl, downloadIcs } from "@/lib/calendar";

// Direct actions, no dropdown. The Google link opens a prefilled event in
// Google Calendar that anyone visiting the page can save to their own account.
// The .ics works for Apple Calendar, Outlook and everything else. Nothing here
// is tied to any specific account.
export function AddToCalendar({
  event,
  compact = false,
}: {
  event: CalEvent;
  compact?: boolean;
}) {
  const pad = compact ? "px-3 py-1.5" : "px-4 py-2";
  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <a
        href={googleCalUrl(event)}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-1.5 rounded-full bg-ink font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-paper transition hover:bg-accent active:scale-95 dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper ${pad}`}
      >
        <Plus className="h-3.5 w-3.5" />
        Add to Google Calendar
      </a>
      <button
        onClick={() => downloadIcs([event], event.key)}
        title="Download .ics for Apple Calendar, Outlook and others"
        className={`inline-flex items-center gap-1.5 rounded-full border border-ink/15 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink/60 transition hover:border-ink hover:text-ink active:scale-95 dark:border-white/20 dark:text-paper/60 dark:hover:border-white/50 dark:hover:text-paper ${pad}`}
      >
        <Download className="h-3.5 w-3.5" />
        .ics
      </button>
    </div>
  );
}
