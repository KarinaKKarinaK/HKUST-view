"use client";
import { useEffect, useRef, useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import type { CalEvent } from "@/data/events";
import { googleCalUrl, downloadIcs } from "@/lib/calendar";

export function AddToCalendar({
  event,
  compact = false,
  onOpenChange,
}: {
  event: CalEvent;
  compact?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative no-print" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`group inline-flex items-center gap-1.5 rounded-full border border-ink/15 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink transition hover:border-ink hover:bg-ink hover:text-paper dark:border-white/20 dark:text-paper dark:hover:bg-paper dark:hover:text-ink ${
          compact ? "px-3 py-1.5" : "px-4 py-2"
        }`}
      >
        <Plus className="h-3.5 w-3.5" />
        Add to calendar
        <ChevronDown className="h-3 w-3 opacity-50" />
      </button>
      {open && (
        <div
          role="menu"
          className="glass absolute left-0 z-40 mt-2 w-52 overflow-hidden rounded-xl shadow-2xl"
        >
          <a
            href={googleCalUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm font-medium hover:bg-ink/5 dark:hover:bg-white/10"
          >
            Google Calendar
          </a>
          <button
            role="menuitem"
            onClick={() => {
              downloadIcs([event], event.key);
              setOpen(false);
            }}
            className="block w-full px-4 py-3 text-left text-sm font-medium hover:bg-ink/5 dark:hover:bg-white/10"
          >
            Apple / Outlook (.ics)
          </button>
        </div>
      )}
    </div>
  );
}
