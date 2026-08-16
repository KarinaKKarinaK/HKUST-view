"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

/* ---------- school personalization ---------- */

export type SchoolCode = "SSCI" | "SENG" | "SBM" | "SHSS";
export const SCHOOLS: { code: SchoolCode; name: string; lt: string }[] = [
  { code: "SSCI", name: "Science", lt: "Lecture Theatre E" },
  { code: "SENG", name: "Engineering", lt: "Lecture Theatre A" },
  { code: "SBM", name: "Business & Management", lt: "Lecture Theatre B" },
  { code: "SHSS", name: "Humanities & Social Science", lt: "Lecture Theatre K" },
];

const SchoolCtx = createContext<{
  school: SchoolCode | null;
  setSchool: (s: SchoolCode | null) => void;
}>({ school: null, setSchool: () => {} });

/* ---------- search / command palette ---------- */

const SearchCtx = createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
}>({ open: false, setOpen: () => {} });

export function Providers({ children }: { children: React.ReactNode }) {
  const [school, setSchoolState] = useState<SchoolCode | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("school") as SchoolCode | null;
    if (s && SCHOOLS.some((x) => x.code === s)) setSchoolState(s);
  }, []);

  const setSchool = (s: SchoolCode | null) => {
    setSchoolState(s);
    if (s) localStorage.setItem("school", s);
    else localStorage.removeItem("school");
  };

  return (
    <SchoolCtx.Provider value={{ school, setSchool }}>
      <SearchCtx.Provider value={{ open, setOpen }}>
        {children}
      </SearchCtx.Provider>
    </SchoolCtx.Provider>
  );
}

export const useSchool = () => useContext(SchoolCtx);
export const useSearch = () => useContext(SearchCtx);
export const schoolInfo = (c: SchoolCode | null) =>
  SCHOOLS.find((s) => s.code === c) ?? null;

/* ---------- scroll reveal ---------- */

// Reveal .reveal elements on scroll. Re-runs per mount so it works after
// client-side navigation between pages.
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    const t = setTimeout(
      () =>
        document
          .querySelectorAll(".reveal:not(.in)")
          .forEach((el) => el.classList.add("in")),
      2000
    );
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
}
