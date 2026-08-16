"use client";
import { Plus } from "lucide-react";
import type { CalEvent } from "@/data/events";
import { googleCalUrl, outlookCalUrl, downloadIcs } from "@/lib/calendar";

// Direct links, no dropdown. Google and Outlook open a prefilled event that
// anyone visiting the page can save to their own account. The .ics is a small
// fallback for Apple Calendar and others. Nothing is tied to any account.
export function AddToCalendar({
  event,
  compact = false,
}: {
  event: CalEvent;
  compact?: boolean;
}) {
  const pad = compact ? "px-3 py-1.5" : "px-4 py-2";
  const primary = `group inline-flex items-center gap-1.5 rounded-full font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition active:scale-95 ${pad}`;
  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <a
        href={googleCalUrl(event)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${primary} bg-ink text-paper hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper`}
      >
        <Plus className="h-3.5 w-3.5" />
        Google Calendar
      </a>
      <a
        href={outlookCalUrl(event)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${primary} border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-paper dark:border-white/20 dark:text-paper dark:hover:bg-paper dark:hover:text-ink`}
      >
        <Plus className="h-3.5 w-3.5" />
        Outlook
      </a>
      <button
        onClick={() => downloadIcs([event], event.key)}
        title="Download .ics for Apple Calendar and others"
        className="inline-flex items-center rounded-full border border-ink/15 px-2.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink/50 transition hover:border-ink hover:text-ink active:scale-95 dark:border-white/20 dark:text-paper/50 dark:hover:border-white/50 dark:hover:text-paper"
      >
        .ics
      </button>
    </div>
  );
}
