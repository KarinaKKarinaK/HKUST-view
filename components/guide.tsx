"use client";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/components/providers";

export function Guide({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  useReveal();
  return (
    <main className="mx-auto max-w-4xl px-5 py-14 sm:py-20">
      <div className="reveal relative">
        <p className="mono-label text-accent">{eyebrow}</p>
        <h1 className="display mt-3 text-4xl leading-[0.98] text-ink dark:text-paper sm:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg text-ink/60 dark:text-paper/60">{intro}</p>
        )}
      </div>
      <div className="mt-10 space-y-4">{children}</div>
    </main>
  );
}

export function Card({
  label,
  children,
  dark = false,
}: {
  label: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`reveal rounded-3xl p-6 sm:p-7 ${
        dark ? "bg-ink text-paper dark:bg-white/[0.06]" : "glass"
      }`}
    >
      <p
        className={`font-mono text-[11px] font-medium uppercase tracking-[0.18em] ${
          dark ? "text-paper/50" : "text-accent"
        }`}
      >
        {label}
      </p>
      <div
        className={`mt-4 text-[15px] leading-relaxed ${
          dark ? "text-paper/80" : "text-ink/70 dark:text-paper/70"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// Numbered or bulleted list of strings (supports React nodes).
export function Steps({
  items,
  numbered = false,
}: {
  items: React.ReactNode[];
  numbered?: boolean;
}) {
  return (
    <ol className="space-y-4">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-0.5 shrink-0 font-sans text-sm font-semibold tabular-nums tracking-tightest text-accent">
            {numbered ? `0${i + 1}` : "//"}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}

export function LinkRow({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink/70 transition hover:border-ink hover:text-ink dark:border-white/20 dark:text-paper/70 dark:hover:border-white/50 dark:hover:text-paper"
        >
          {l.label}
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ))}
    </div>
  );
}
