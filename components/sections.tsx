"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Copy,
  Check,
  MapPin,
  ChevronDown,
  MessageCircle,
  Instagram,
  Calendar,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { AddToCalendar } from "@/components/AddToCalendar";
import { useSchool, schoolInfo, useReveal } from "@/components/providers";
import { events, campusTourSlots, type CalEvent } from "@/data/events";
import { quickLinks, whatsappGroups, instagram } from "@/data/links";
import { checklistItems, faq, studentCard } from "@/data/content";
import { googleSubscribeUrl, outlookSubscribeUrl } from "@/lib/calendar";
import { dayLabel, dayKey, timeLabel } from "@/lib/format";

/* ---------- helpers ---------- */

const CAT: Record<CalEvent["category"], { label: string; accent: boolean }> = {
  deadline: { label: "Deadline", accent: true },
  orientation: { label: "Orientation", accent: false },
  housing: { label: "Housing", accent: false },
  social: { label: "Social", accent: false },
  logistics: { label: "Logistics", accent: false },
};

// Bulk add: opens Google or Outlook to subscribe to a hosted .ics (adds every
// event at once), or downloads the .ics for Apple Calendar and others.
// The menu is portaled to <body> with fixed positioning so it is never clipped
// or covered by animated/overflow-hidden ancestors.
function BulkCalendar({
  icsPath,
  name,
  label,
  triggerClass,
}: {
  icsPath: string;
  name: string;
  label: string;
  triggerClass: string;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 8, left: Math.min(r.left, window.innerWidth - 240) });
    }
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      )
        setOpen(false);
    };
    const dismiss = () => setOpen(false);
    document.addEventListener("mousedown", close);
    window.addEventListener("scroll", dismiss, true);
    window.addEventListener("resize", dismiss);
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("scroll", dismiss, true);
      window.removeEventListener("resize", dismiss);
    };
  }, [open]);

  const openUrl = (make: (u: string) => string) => {
    window.open(make(window.location.origin + icsPath), "_blank", "noopener");
    setOpen(false);
  };
  const item =
    "block w-full px-4 py-3 text-left text-sm font-medium hover:bg-ink/5 dark:hover:bg-white/10";

  return (
    <>
      <button
        ref={btnRef}
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`no-print ${triggerClass}`}
      >
        <Calendar className="h-4 w-4" />
        {label}
        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{ position: "fixed", top: pos.top, left: pos.left }}
            className="glass z-[200] w-56 overflow-hidden rounded-xl shadow-2xl"
          >
            <button className={item} onClick={() => openUrl(googleSubscribeUrl)}>
              Google Calendar
            </button>
            <button
              className={item}
              onClick={() => openUrl((u) => outlookSubscribeUrl(u, name))}
            >
              Outlook
            </button>
            <a href={icsPath} download className={item} onClick={() => setOpen(false)}>
              Apple / .ics download
            </a>
          </div>,
          document.body
        )}
    </>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1400);
        });
      }}
      aria-label={`Copy ${text}`}
      title="Copy"
      className="no-print inline-flex shrink-0 items-center text-ink/30 transition hover:text-accent dark:text-paper/30"
    >
      {done ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:py-24"
    >
      <div className="reveal relative">
        <span
          aria-hidden
          className="ghost pointer-events-none absolute -top-10 right-0 select-none text-[7rem] text-ink/[0.04] dark:text-paper/[0.04] sm:text-[10rem]"
        >
          {index}
        </span>
        <p className="mono-label flex items-center gap-2">
          <span className="text-accent">{index}</span>
          {eyebrow}
        </p>
        <h2 className="display mt-3 max-w-3xl text-4xl leading-[0.98] text-ink dark:text-paper sm:text-6xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-4 max-w-xl text-base text-ink/60 dark:text-paper/60">
            {intro}
          </p>
        )}
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

/* ---------- hero + countdown ---------- */

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  if (now === null) return null;
  const toMs = (e: CalEvent) => {
    const iso = e.allDay ? `${e.start}T00:00:00+08:00` : `${e.start}+08:00`;
    return Date.parse(iso);
  };
  const next = events
    .map((e) => ({ e, ms: toMs(e) }))
    .filter((x) => x.ms > now)
    .sort((a, b) => a.ms - b.ms)[0];
  if (!next) return { done: true } as const;
  const diff = next.ms - now;
  return {
    event: next.e,
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  } as const;
}

function Countdown() {
  const c = useCountdown();
  const cell = (n: number, l: string) => (
    <div className="flex flex-col items-center">
      <span className="font-sans text-2xl font-semibold tabular-nums leading-none tracking-tightest sm:text-4xl">
        {String(n).padStart(2, "0")}
      </span>
      <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45 dark:text-paper/45 sm:text-[10px]">
        {l}
      </span>
    </div>
  );
  const sep = (
    <span className="self-start pt-0.5 font-sans text-2xl font-light leading-none text-ink/20 dark:text-paper/20 sm:text-4xl">
      :
    </span>
  );
  return (
    <div className="glass w-fit max-w-full rounded-2xl p-4 shadow-xl sm:p-5">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="mono-label">Next up</span>
      </div>
      {!c ? (
        <div className="mt-2.5 h-14 w-56 animate-pulse rounded-lg bg-ink/5 dark:bg-white/5" />
      ) : "done" in c ? (
        <p className="mt-2 max-w-xs text-base font-medium">
          All key dates have passed. Welcome to HKUST.
        </p>
      ) : (
        <>
          <p className="mt-1.5 max-w-[16rem] text-[15px] font-medium leading-snug sm:max-w-sm sm:text-base">
            {c.event.title}
          </p>
          <div className="mt-3 flex items-end gap-2.5 sm:gap-3.5">
            {cell(c.d, "days")}
            {sep}
            {cell(c.h, "hrs")}
            {sep}
            {cell(c.m, "min")}
            {sep}
            {cell(c.s, "sec")}
          </div>
        </>
      )}
    </div>
  );
}

function Marquee() {
  const items = [
    "Online registration by 14 Aug",
    "Hall check-in from 27 Aug",
    "Orientation 28 Aug",
    "Student card by 11 Sep",
    "HK Day Tour ballot",
    "Snap Challenge by 25 Sep",
  ];
  const row = [...items, ...items];
  return (
    <div className="no-print relative overflow-hidden border-y border-ink/10 py-3 dark:border-white/10">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="mono-label flex items-center gap-8">
            {t}
            <span className="text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-14 sm:pt-20">
        <div className="animate-fade-up">
          <p className="mono-label flex items-center gap-2">
            <LogoMark className="h-4 w-4" /> Fall 2026 // Clear Water Bay // HKT
          </p>
          <h1 className="display mt-6 text-[2.4rem] leading-[0.95] text-ink dark:text-paper sm:text-7xl lg:text-[6.5rem] lg:leading-[0.92]">
            Everything you
            <br />
            need for exchange
            <br />
            <span className="text-accent">at HKUST.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/60 dark:text-paper/60">
            One place for the full orientation, one-tap add-to-calendar, your
            pre-arrival checklist, housing, group chats and every official link.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#schedule"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
            >
              View the schedule
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <BulkCalendar
              icsPath="/calendar/all.ics"
              name="HKUST Exchange key dates"
              label="Add all key dates"
              triggerClass="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink hover:bg-ink hover:text-paper dark:border-white/25 dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
            />
          </div>
        </div>

        <div className="relative mt-12 animate-fade-up overflow-hidden rounded-3xl border border-ink/10 dark:border-white/10">
          <img
            src="/images/hero.webp"
            alt="Hong Kong skyline and Victoria Harbour"
            className="h-[360px] w-full object-cover object-center sm:h-[440px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
          <span className="mono-label absolute right-5 top-5 !text-paper/70">
            Victoria Harbour // Hong Kong
          </span>
          <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
            <Countdown />
          </div>
        </div>
      </div>
      <Marquee />
    </section>
  );
}

/* ---------- checklist ---------- */

function Checklist() {
  const { school } = useSchool();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("checklist");
      if (raw) setChecked(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const total = checklistItems.length;
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  const toggle = useCallback(
    (id: string) => {
      setChecked((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        try {
          localStorage.setItem("checklist", JSON.stringify(next));
        } catch {}
        if (Object.values(next).filter(Boolean).length === total) {
          import("canvas-confetti").then((m) =>
            m.default({
              particleCount: 150,
              spread: 85,
              origin: { y: 0.7 },
              colors: ["#DA3A2C", "#0B0B0C", "#F3F1EA"],
            })
          );
        }
        return next;
      });
    },
    [total]
  );

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="font-sans text-5xl font-semibold tracking-tightest tabular-nums">
            {ready ? pct : 0}
            <span className="text-2xl text-ink/40 dark:text-paper/40">%</span>
          </span>
          <p className="mono-label mt-1">
            {ready ? `${done} of ${total} done` : "Loading"}
          </p>
        </div>
        {school === "SBM" && (
          <p className="max-w-[15rem] rounded-xl bg-accent/10 px-3 py-2 text-xs font-medium text-accent">
            SBM: wait for your School's instructions on the network account, course and
            online registration steps.
          </p>
        )}
      </div>
      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ul className="divide-y divide-ink/5 dark:divide-white/5">
        {checklistItems.map((it) => (
          <li key={it.id}>
            <label className="flex cursor-pointer items-start gap-3 py-3.5 transition">
              <input
                type="checkbox"
                checked={!!checked[it.id]}
                onChange={() => toggle(it.id)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-accent"
              />
              <span
                className={`text-[15px] leading-snug transition ${
                  checked[it.id]
                    ? "text-ink/30 line-through dark:text-paper/30"
                    : "text-ink/80 dark:text-paper/80"
                }`}
              >
                {it.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- schedule ---------- */

function EventCard({ e }: { e: CalEvent }) {
  const cat = CAT[e.category];
  const { school } = useSchool();
  const info = schoolInfo(school);
  const isInduction = e.key === "academic_induction";
  return (
    <div
      className={`reveal group relative flex flex-col rounded-2xl border p-5 transition hover:border-ink/30 ${
        cat.accent
          ? "border-accent/30 bg-accent/[0.04] hover:border-accent/60"
          : "border-ink/10 bg-white/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/25"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`font-mono text-[10px] font-medium uppercase tracking-[0.16em] ${
            cat.accent ? "text-accent" : "text-ink/40 dark:text-paper/40"
          }`}
        >
          {cat.label}
        </span>
        <span className="font-mono text-[11px] text-ink/50 dark:text-paper/50">
          {timeLabel(e)} {e.allDay ? "" : "HKT"}
        </span>
      </div>
      <h3 className="mt-3 text-xl font-semibold leading-tight tracking-tight text-ink dark:text-paper">
        {e.title}
      </h3>
      {e.location && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink/60 dark:text-paper/60">
          <MapPin className="h-4 w-4 shrink-0 text-accent" />
          <span>{e.location}</span>
          <CopyBtn text={e.location} />
        </p>
      )}
      <p className="mt-2 text-sm leading-relaxed text-ink/60 dark:text-paper/60">
        {e.details}
      </p>
      {isInduction && info && (
        <p className="mt-3 rounded-xl bg-accent/10 px-3 py-2 text-sm font-medium text-accent">
          Your room ({info.name}): {info.lt}
        </p>
      )}
      {(e.key === "welcome_lounge_1" || e.key === "welcome_lounge_2") && (
        <p className="mt-3 rounded-xl bg-ink/5 px-3 py-2 text-xs font-medium text-ink/70 dark:bg-white/5 dark:text-paper/70">
          Campus tour slots: {campusTourSlots}
        </p>
      )}
      <div className="mt-4 pt-1">
        <AddToCalendar event={e} compact />
      </div>
    </div>
  );
}

function Schedule() {
  const groups: { day: string; label: string; items: CalEvent[] }[] = [];
  for (const e of events) {
    const k = dayKey(e);
    let g = groups.find((x) => x.day === k);
    if (!g) {
      g = { day: k, label: dayLabel(e), items: [] };
      groups.push(g);
    }
    g.items.push(e);
  }
  return (
    <div className="divide-y divide-ink/10 dark:divide-white/10">
      <p className="reveal -mt-4 max-w-xl pb-8 text-sm text-ink/50 dark:text-paper/50">
        Every item adds to <strong className="text-ink dark:text-paper">your own</strong>{" "}
        calendar. Times are Hong Kong (HKT, UTC+8).
      </p>
      {groups.map((g) => (
        <div
          key={g.day}
          className="grid gap-x-8 gap-y-5 py-8 md:grid-cols-12"
        >
          <div className="reveal md:col-span-3">
            <div className="md:sticky md:top-24">
              <h3 className="font-sans text-2xl font-semibold tracking-tightest text-ink dark:text-paper">
                {g.label}
              </h3>
              <p className="mono-label mt-1">
                {g.items.length} {g.items.length === 1 ? "event" : "events"}
              </p>
              <div className="mt-3">
                <BulkCalendar
                  icsPath={`/calendar/${g.day}.ics`}
                  name={`HKUST ${g.label}`}
                  label="Add day"
                  triggerClass="no-print inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink/60 transition hover:border-ink hover:text-ink dark:border-white/20 dark:text-paper/60 dark:hover:border-white/50 dark:hover:text-paper"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4 md:col-span-9">
            {g.items.map((e) => (
              <EventCard key={e.key} e={e} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- student card ---------- */

function StudentCardSection() {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <div className="reveal glass relative overflow-hidden rounded-3xl p-7 md:col-span-3">
        <span aria-hidden className="ghost pointer-events-none absolute -right-4 -top-8 select-none text-[9rem] text-ink/[0.04] dark:text-paper/[0.04]">
          ID
        </span>
        <p className="mono-label">How it works</p>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/70 dark:text-paper/70">
          {studentCard.how}
        </p>
        <p className="mono-label mt-6">It unlocks</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {studentCard.unlocks.map((u) => (
            <li
              key={u}
              className="rounded-full border border-ink/10 px-3 py-1 text-xs font-medium text-ink/70 dark:border-white/10 dark:text-paper/70"
            >
              {u}
            </li>
          ))}
        </ul>
      </div>
      <div className="reveal rounded-3xl bg-ink p-7 text-paper dark:bg-white/[0.06] md:col-span-2">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-paper/50">
          On-campus discounts
        </p>
        <ul className="mt-4 space-y-3">
          {studentCard.discounts.map((d) => (
            <li key={d} className="flex items-center gap-2.5 text-sm">
              <span className="h-1.5 w-1.5 shrink-0 bg-accent" /> {d}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-paper/50">
          On-campus outlets only. Collection deadline 11 Sep. See the schedule for venues
          and times.
        </p>
      </div>
    </div>
  );
}

/* ---------- student visa ---------- */

function VisaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink/70 transition hover:border-ink hover:text-ink dark:border-white/20 dark:text-paper/70 dark:hover:border-white/50 dark:hover:text-paper"
    >
      {children}
      <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function VisaSection() {
  const regSteps = [
    "Online Registration Form: verify your personal particulars. Submit once only.",
    "Upload ID documents: passport plus your HK student e-Visa (HKID if you have one; EEP for Mainland students). Tuition-payment proof does not apply to exchange students.",
    "Upload a passport-style photo on a white background. This becomes your student card photo, so there is no separate student card form.",
  ];
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Download e-Visa */}
        <div className="reveal glass rounded-3xl p-7">
          <div className="flex items-center gap-2 text-accent">
            <Plane className="h-5 w-5" />
            <p className="mono-label !text-accent">Download your e-Visa</p>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/70 dark:text-paper/70">
            Your HK student visa is an e-Visa, a PDF you download yourself. It is not a
            sticker and it does not wait until you arrive. Download it as soon as it is
            approved.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/70 dark:text-paper/70">
            On the HK Immigration e-Visa page you will need your visa application reference
            number (in your HKUST approval email), your date of birth, and the first 4
            digits of the travel document you applied with. Click Download ALL to get the
            e-Visa and the approval letter. Save it on your phone and print it on A4.
          </p>
          <div className="mt-4 rounded-xl bg-ink/5 px-4 py-3 text-sm leading-relaxed text-ink/70 dark:bg-white/5 dark:text-paper/70">
            Check it right away: name matches your passport, date of birth correct,
            validity covers your whole study period (about 19 Dec 2026 for Fall 2026, or
            about 28 May 2027 for Spring 2027), institution is HKUST. If anything is wrong,
            email study.abroad@ust.hk immediately.
          </div>
          <div className="mt-4">
            <VisaLink href="https://www.gov.hk/en/residents/immigration/nonpermanent/downloadevisa.htm">
              Download HK e-Visa
            </VisaLink>
          </div>
        </div>

        {/* Register in SIS */}
        <div className="reveal glass rounded-3xl p-7">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-ink/40 dark:text-paper/40" />
            <p className="mono-label">Register in SIS before you fly</p>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/70 dark:text-paper/70">
            Complete Online Program Registration in SIS (SISPROD) before you travel. Three
            steps:
          </p>
          <ol className="mt-4 space-y-4">
            {regSteps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-sans text-lg font-semibold tabular-nums tracking-tightest text-accent">
                  0{i + 1}
                </span>
                <span className="text-[15px] leading-relaxed text-ink/70 dark:text-paper/70">
                  {s}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-ink/60 dark:text-paper/60">
            Reviews take about 5 working days, so do it early. All 3 steps can be done
            before arrival. Only the landing slip waits.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <VisaLink href="https://sisprod.psft.ust.hk/psp/SISPROD/EMPLOYEE/HRMS/c/Z_SR_MNU.ZR_REG_FORM_CMP.GBL?">
              Open SIS
            </VisaLink>
            <VisaLink href="https://registry.hkust.edu.hk/resource-library/guidance-completing-your-online-program-registration">
              Guidance
            </VisaLink>
            <VisaLink href="https://registry.hkust.edu.hk/resource-library/upload-registration-document-samples">
              Upload samples
            </VisaLink>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Landing slip */}
        <div className="reveal rounded-3xl border border-accent/30 bg-accent/[0.05] p-7">
          <p className="mono-label !text-accent">The landing slip is critical</p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/75 dark:text-paper/75">
            On entry to Hong Kong, show your e-Visa and passport at immigration. The
            officer activates your visa and issues a STUDENT landing slip. Keep it safe.
            Without it, your visa is not activated and you cannot collect your student
            card.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/75 dark:text-paper/75">
            After you arrive: upload the landing slip in SIS (deadline 11 Sep), then
            collect your physical student card on campus (from 27 Aug, deadline 11 Sep)
            with your passport or HKID and your landing slip.
          </p>
        </div>

        {/* Timing & travel */}
        <div className="reveal rounded-3xl bg-ink p-7 text-paper dark:bg-white/[0.06]">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-paper/50">
            Timing and travel
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-paper/80">
            <li>
              Hall check-in opens 10am on 27 Aug, with no early check-in. If you land
              earlier, book your own accommodation for the gap.
            </li>
            <li>
              Your e-Visa lets you travel in and out of Hong Kong within its validity, but
              enter and leave before it expires or it becomes void.
            </li>
            <li>
              Staying a full year (180+ days)? You also need a Hong Kong ID card. Book an
              immigration appointment early once your visa is issued, as the earliest slots
              fill up fast. One-semester students do not need one.
            </li>
            <li>
              Going to Mainland China? You may need a separate Chinese tourist visa.
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="https://www.visaforchina.cn/HKG3_EN/qianzhengyewu"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full bg-paper/10 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] transition hover:bg-accent"
            >
              Chinese Visa Center
              <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://ww1.ctshk.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full bg-paper/10 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] transition hover:bg-accent"
            >
              China Travel Service HK
              <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- housing ---------- */

function HousingSection() {
  const rows = [
    "Earliest hall check-in is 10:00am, 27 Aug. No early check-in can be arranged.",
    "Hall allocation results are emailed to your HKUST account from SHRLO about one week before check-in.",
    "Undergraduate exchange students are guaranteed and expected to stay in university housing.",
    'Grab free beddings, kitchenware and electronics at the "Stop! Don\'t Shop! Adopt!" pickup (Living Lab Hub, opposite Passione Cafe), or take the IKEA shuttle on 28 Aug.',
  ];
  return (
    <div className="reveal glass rounded-3xl p-7 sm:p-9">
      <div className="grid gap-6 md:grid-cols-2">
        <ul className="space-y-4">
          {rows.map((r, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink/70 dark:text-paper/70">
              <span className="mt-1 font-mono text-xs text-accent">0{i + 1}</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col justify-end gap-4">
          <a
            href="https://shrl.hkust.edu.hk/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-paper transition hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
          >
            <span className="font-medium">Student Housing (SHRLO)</span>
            <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="https://maps.ust.hk/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-between rounded-2xl border border-ink/15 px-5 py-4 transition hover:border-ink dark:border-white/20"
          >
            <span className="font-medium">Interactive campus map</span>
            <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- connect ---------- */

function Connect() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="reveal glass rounded-3xl p-7">
        <div className="flex items-center justify-between">
          <p className="mono-label">Group chats</p>
          <MessageCircle className="h-5 w-5 text-ink/30 dark:text-paper/30" />
        </div>
        <p className="mt-2 text-xs text-ink/50 dark:text-paper/50">
          Community-run groups. Tap to join on WhatsApp.
        </p>
        <div className="mt-5 grid gap-2">
          {whatsappGroups.map((g) =>
            g.url ? (
              <a
                key={g.label}
                href={g.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-sm font-medium text-paper transition hover:bg-accent dark:bg-white/10 dark:hover:bg-accent"
              >
                {g.label}
                <ArrowUpRight className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <div
                key={g.label}
                data-placeholder="true"
                className="flex items-center justify-between rounded-xl border border-dashed border-ink/15 px-4 py-3 text-sm font-medium text-ink/40 dark:border-white/15 dark:text-paper/40"
              >
                {g.label}
                <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
                  Coming soon
                </span>
              </div>
            )
          )}
        </div>
      </div>
      <div className="reveal flex flex-col gap-4">
        <div className="glass rounded-3xl p-5">
          <p className="mono-label mb-3 flex items-center gap-2">
            <Instagram className="h-4 w-4 text-accent" /> Instagram
          </p>
          <div className="grid gap-2">
            {instagram.map((ig) => (
              <a
                key={ig.url}
                href={ig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl bg-ink/5 px-4 py-3 text-sm font-medium transition hover:bg-accent hover:text-paper dark:bg-white/5"
              >
                {ig.label}
                <ArrowUpRight className="h-4 w-4 opacity-60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>
        <div className="glass flex-1 rounded-3xl p-7">
          <p className="mono-label">Exchange buddies</p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/70 dark:text-paper/70">
            Meet your HKUST Exchange Buddies at the Welcome Lounge (Tsang Shiu Tim Art
            Hall). They can help you settle in, find your way around campus, and answer
            any questions.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- quick links ---------- */

function QuickLinks() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {quickLinks.map((grp) => (
        <div key={grp.title} className="reveal glass rounded-3xl p-6">
          <p className="mono-label text-accent">{grp.title}</p>
          <ul className="mt-3 divide-y divide-ink/5 dark:divide-white/5">
            {grp.links.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-2 py-3 text-[15px] font-medium text-ink/80 transition hover:text-accent dark:text-paper/80"
                >
                  {l.label}
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/25 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent dark:text-paper/25" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ---------- perks ---------- */

function Perks() {
  return (
    <div className="space-y-4">
      <a
        href="https://hk-event-scraper.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="reveal group flex flex-col items-start justify-between gap-4 rounded-3xl bg-ink p-7 text-paper transition hover:bg-accent dark:bg-white/[0.06] dark:hover:bg-accent sm:flex-row sm:items-center"
      >
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-paper/50 group-hover:text-paper/80">
            Into tech and startups?
          </p>
          <p className="mt-2 max-w-xl text-lg font-semibold tracking-tight">
            See upcoming tech and startup events in Hong Kong and nearby, all in one live
            feed.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-paper/10 px-5 py-2.5 text-sm font-semibold">
          Open the events feed
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </a>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="reveal relative overflow-hidden rounded-3xl border border-ink/10 p-7 text-paper dark:border-white/10">
        <img
          src="/images/campus.jpg"
          alt="HKUST campus above Clear Water Bay"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent-soft">
          HK Day Tour
        </p>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-paper/80">
          Explore Hong Kong with fellow exchange students. Register via MyStudyAbroad by
          13 Aug. Places are allocated by ballot, and if you get a spot, pay by 20 Aug.
          Meals provided. SBM students: pick Tour (1).
        </p>
        <a
          href="https://mystudyabroad.hkust.edu.hk/"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-accent hover:text-paper"
        >
          MyStudyAbroad
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
      <div className="reveal glass rounded-3xl p-7">
        <p className="mono-label">Exchange Snap Challenge</p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/70 dark:text-paper/70">
          Make a short video. An orientation vlog, "Day in the Life at HKUST", hidden
          campus gems, "Hong Kong with HKUST", or "Found my squad at HKUST". Submit by 25
          Sep.
        </p>
        <div className="mt-5 space-y-2">
          <div className="flex items-center gap-3 rounded-xl bg-ink/5 px-4 py-3 dark:bg-white/5">
            <span className="font-sans text-lg font-semibold tracking-tightest text-accent">×5</span>
            <span className="text-sm font-medium">Grand Prize: Ocean Park ticket</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-ink/5 px-4 py-3 dark:bg-white/5">
            <span className="h-1.5 w-1.5 bg-accent" />
            <span className="text-sm font-medium">
              Appreciation: film camera or HK$200 Starbucks voucher
            </span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

/* ---------- faq ---------- */

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="glass overflow-hidden rounded-3xl">
      {faq.map((f, i) => (
        <div key={i} className="reveal border-b border-ink/8 last:border-0 dark:border-white/8">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            aria-expanded={open === i}
          >
            <span className="text-[17px] font-medium tracking-tight text-ink dark:text-paper">
              {f.q}
            </span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-accent transition-transform ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {open === i && (
            <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink/60 dark:text-paper/60">
              {f.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- page ---------- */

export function HomeMain() {
  useReveal();
  return (
    <main>
      <Hero />
        <Section
          id="before"
          index="01"
          eyebrow="Before you arrive"
          title="Your pre-arrival checklist"
          intro="Saved to this device. Tick things off as you go."
        >
          <Checklist />
        </Section>
        <Section
          id="visa"
          index="02"
          eyebrow="Visa and registration"
          title="Sort your visa before you fly"
          intro="Your HK student visa is an e-Visa you download yourself, and registration happens online. Do it all before you land. Only the landing slip waits."
        >
          <VisaSection />
        </Section>
        <Section
          id="schedule"
          index="03"
          eyebrow="Orientation"
          title="The full schedule"
        >
          <Schedule />
        </Section>
        <Section
          id="card"
          index="04"
          eyebrow="Student card"
          title="Your key to campus"
        >
          <StudentCardSection />
        </Section>
        <Section id="housing" index="05" eyebrow="Housing" title="Halls and moving in">
          <HousingSection />
        </Section>
        <Section id="connect" index="06" eyebrow="Get connected" title="Find your people">
          <Connect />
        </Section>
        <Section
          id="links"
          index="07"
          eyebrow="Quick links"
          title="Official HKUST systems"
        >
          <QuickLinks />
        </Section>
        <Section id="perks" index="08" eyebrow="Fun and perks" title="Make the most of it">
          <Perks />
        </Section>
        <Section id="faq" index="09" eyebrow="FAQ" title="Common questions">
          <Faq />
        </Section>
      </main>
  );
}
