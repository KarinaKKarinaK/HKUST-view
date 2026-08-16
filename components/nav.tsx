"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Moon,
  Sun,
  ChevronDown,
  Check,
  Share2,
  Search,
  Menu,
  X,
  Calendar,
  CornerDownLeft,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { useSchool, useSearch, SCHOOLS } from "@/components/providers";
import { lastUpdated } from "@/data/content";

const REPO_ISSUE = "https://github.com/KarinaKKarinaK/HKUST-view/issues/new";

const PAGES: [string, string][] = [
  ["Home", "/"],
  ["Getting around", "/getting-around"],
  ["Campus", "/campus"],
  ["Weather", "/weather"],
  ["Emergency", "/emergency"],
  ["Money", "/money"],
];

const HOME_SECTIONS: [string, string][] = [
  ["Checklist", "/#before"],
  ["Visa", "/#visa"],
  ["Schedule", "/#schedule"],
  ["Student card", "/#card"],
  ["Housing", "/#housing"],
  ["Group chats", "/#connect"],
  ["Quick links", "/#links"],
  ["FAQ", "/#faq"],
];

/* ---------- search index ---------- */

const INDEX: { title: string; sub: string; keywords: string; href: string }[] = [
  { title: "Pre-arrival checklist", sub: "Home", keywords: "todo tasks before arrive", href: "/#before" },
  { title: "Visa and registration", sub: "Home", keywords: "evisa e-visa landing slip sis student immigration", href: "/#visa" },
  { title: "Orientation schedule", sub: "Home", keywords: "events dates calendar add", href: "/#schedule" },
  { title: "Student card", sub: "Home", keywords: "id discounts library access", href: "/#card" },
  { title: "Housing", sub: "Home", keywords: "hall check-in shrlo dorm room", href: "/#housing" },
  { title: "Group chats", sub: "Home", keywords: "whatsapp instagram community sports", href: "/#connect" },
  { title: "Quick links", sub: "Home", keywords: "official systems canvas sis registry", href: "/#links" },
  { title: "Fun and perks", sub: "Home", keywords: "events snap challenge tech startup", href: "/#perks" },
  { title: "FAQ", sub: "Home", keywords: "questions help", href: "/#faq" },
  { title: "Getting around", sub: "Guide", keywords: "transport mtr minibus 11 11s bus airport express octopus taxi hang hau tko campus", href: "/getting-around" },
  { title: "Campus essentials", sub: "Guide", keywords: "canteen food library gym atm print health floors lg map", href: "/campus" },
  { title: "Weather and typhoons", sub: "Guide", keywords: "t8 typhoon rainstorm black amber class cancelled suspended pack humid heat observatory", href: "/weather" },
  { title: "Emergency and health", sub: "Guide", keywords: "999 hospital security sos clinic doctor wellbeing counselling mental", href: "/emergency" },
  { title: "Money and SIM", sub: "Guide", keywords: "octopus bank card esim sim data tipping revolut wise cash", href: "/money" },
];

function CommandPalette() {
  const { open, setOpen } = useSearch();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open with Cmd/Ctrl+K or "/".
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !open)) {
        const t = e.target as HTMLElement;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  if (!open) return null;

  const query = q.trim().toLowerCase();
  const results = query
    ? INDEX.filter(
        (i) =>
          i.title.toLowerCase().includes(query) ||
          i.keywords.includes(query) ||
          query.split(" ").every((w) => (i.title + " " + i.keywords).toLowerCase().includes(w))
      )
    : INDEX;

  const go = (href: string) => {
    setOpen(false);
    window.location.href = href;
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-start justify-center bg-ink/40 p-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={() => setOpen(false)}
    >
      <div
        className="glass w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-ink/10 px-4 dark:border-white/10">
          <Search className="h-4 w-4 shrink-0 text-ink/40 dark:text-paper/40" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && results[active]) {
                go(results[active].href);
              }
            }}
            placeholder="Search or jump to what you need today..."
            className="w-full bg-transparent py-4 text-[15px] outline-none placeholder:text-ink/40 dark:placeholder:text-paper/40"
          />
          <kbd className="hidden rounded border border-ink/15 px-1.5 py-0.5 font-mono text-[10px] text-ink/40 sm:block dark:border-white/15 dark:text-paper/40">
            esc
          </kbd>
        </div>
        <ul className="max-h-[52vh] overflow-y-auto p-1.5">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-ink/50 dark:text-paper/50">
              Nothing found. Try &quot;typhoon&quot;, &quot;octopus&quot; or &quot;visa&quot;.
            </li>
          )}
          {results.map((r, i) => (
            <li key={r.href}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r.href)}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left ${
                  i === active ? "bg-ink/5 dark:bg-white/10" : ""
                }`}
              >
                <span className="text-sm font-medium">{r.title}</span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/35 dark:text-paper/35">
                    {r.sub}
                  </span>
                  {i === active && (
                    <CornerDownLeft className="h-3.5 w-3.5 text-ink/40 dark:text-paper/40" />
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SchoolPicker({ compact = false }: { compact?: boolean }) {
  const { school, setSchool } = useSchool();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) =>
      ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-full border font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition ${
          school
            ? "border-accent/40 bg-accent/10 text-accent"
            : "border-ink/15 text-ink/60 hover:border-ink dark:border-white/20 dark:text-paper/60"
        } ${compact ? "px-3 py-2" : "px-3 py-1.5"}`}
      >
        {school ? school : "Set school"}
        <ChevronDown className="h-3 w-3 opacity-60" />
      </button>
      {open && (
        <div className="glass absolute right-0 z-40 mt-2 w-64 overflow-hidden rounded-xl p-1.5 shadow-2xl">
          <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40 dark:text-paper/40">
            Your admitted school
          </p>
          {SCHOOLS.map((s) => (
            <button
              key={s.code}
              onClick={() => {
                setSchool(s.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-ink/5 dark:hover:bg-white/10 ${
                school === s.code ? "font-semibold text-accent" : ""
              }`}
            >
              <span>
                {s.name}
                <span className="ml-1.5 font-mono text-[10px] text-ink/40 dark:text-paper/40">
                  {s.code}
                </span>
              </span>
              {school === s.code && <Check className="h-4 w-4" />}
            </button>
          ))}
          {school && (
            <button
              onClick={() => {
                setSchool(null);
                setOpen(false);
              }}
              className="mt-1 w-full rounded-lg px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40 hover:bg-ink/5 dark:text-paper/40 dark:hover:bg-white/10"
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ShareBtn() {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = "https://hkust-view.vercel.app";
    const data = { title: "HKUST View", text: "Everything you need for exchange at HKUST", url };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {}
    } else {
      navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  return (
    <button
      onClick={share}
      aria-label="Share"
      className="rounded-full p-2 text-ink/60 transition hover:bg-ink/5 hover:text-ink dark:text-paper/60 dark:hover:bg-white/10 dark:hover:text-paper"
    >
      {copied ? <Check className="h-[18px] w-[18px] text-accent" /> : <Share2 className="h-[18px] w-[18px]" />}
    </button>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const on = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", on ? "dark" : "light");
    setDark(on);
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="rounded-full p-2 text-ink/60 transition hover:bg-ink/5 hover:text-ink dark:text-paper/60 dark:hover:bg-white/10 dark:hover:text-paper"
    >
      {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const { setOpen } = useSearch();
  const [menu, setMenu] = useState(false);
  return (
    <header className="no-print sticky top-0 z-50 border-b border-ink/10 bg-paper/95 pt-[env(safe-area-inset-top)] backdrop-blur-xl dark:border-white/10 dark:bg-ink/95">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>
        <div className="hidden items-center gap-0.5 lg:flex">
          {PAGES.map(([label, href]) => {
            const activeTab = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] transition ${
                  activeTab
                    ? "bg-ink text-paper dark:bg-paper dark:text-ink"
                    : "text-ink/50 hover:bg-ink/5 hover:text-ink dark:text-paper/50 dark:hover:bg-white/10 dark:hover:text-paper"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setOpen(true)}
            aria-label="Search"
            className="rounded-full p-2 text-ink/60 transition hover:bg-ink/5 hover:text-ink dark:text-paper/60 dark:hover:bg-white/10 dark:hover:text-paper"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <div className="hidden sm:block">
            <SchoolPicker />
          </div>
          <ShareBtn />
          <ThemeToggle />
          <button
            onClick={() => setMenu((v) => !v)}
            aria-label="Menu"
            className="rounded-full p-2 text-ink/60 hover:bg-ink/5 lg:hidden dark:text-paper/60 dark:hover:bg-white/10"
          >
            {menu ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </nav>
      {menu && (
        <div className="border-t border-ink/10 px-5 py-4 lg:hidden dark:border-white/10">
          <div className="mb-3 sm:hidden">
            <SchoolPicker compact />
          </div>
          <p className="mono-label mb-2">Guides</p>
          <div className="mb-4 grid grid-cols-2 gap-1">
            {PAGES.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenu(false)}
                className={`rounded-lg px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] ${
                  pathname === href
                    ? "bg-ink text-paper dark:bg-paper dark:text-ink"
                    : "text-ink/70 hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
          <p className="mono-label mb-2">On the home page</p>
          <div className="grid grid-cols-2 gap-1">
            {HOME_SECTIONS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenu(false)}
                className="rounded-lg px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink/70 hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-white/10"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
      <CommandPalette />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="no-print border-t border-ink/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <Logo />
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/calendar/all.ics"
              download
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold transition hover:border-ink hover:bg-ink hover:text-paper dark:border-white/25 dark:hover:bg-paper dark:hover:text-ink"
            >
              <Calendar className="h-4 w-4" /> Add all key dates
            </a>
            <a
              href={REPO_ISSUE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent dark:border-white/25"
            >
              Report a wrong link
            </a>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink/50 dark:text-paper/50">
          Made by exchange students, for exchange students. Unofficial and
          community-maintained, not affiliated with or endorsed by HKUST. Dates, venues
          and links may change. Always confirm every detail against the official emails
          from HKUST (Academic Registry, SHRLO, and the Office of Global Learning).{" "}
          <a
            href="https://github.com/KarinaKKarinaK/HKUST-view#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink underline underline-offset-2 dark:text-paper"
          >
            Read the full disclaimer
          </a>
          .
        </p>
        <p className="mono-label mt-6">Last verified {lastUpdated} // HKT</p>
      </div>
    </footer>
  );
}
