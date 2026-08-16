// Original HK-themed mark: a minimal red sail (junk boat) over a harbour line.
// Not the official HKUST crest. Crisp at any size, works in light + dark.

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="HKUST Exchange logo"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="16" fill="#0B0B0C" />
      <path d="M33 12 L33 42 L15 42 Z" fill="#DA3A2C" />
      <path d="M36 20 L36 42 L50 42 Z" fill="#F3F1EA" opacity="0.85" />
      <rect x="32" y="12" width="2" height="31" rx="1" fill="#F3F1EA" />
      <path
        d="M13 45 H51 L46 52 Q44 54 41 54 H23 Q20 54 18 52 Z"
        fill="#F3F1EA"
      />
      <rect x="10" y="57" width="44" height="2.4" rx="1.2" fill="#F3F1EA" opacity="0.4" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="font-sans text-[15px] font-semibold tracking-tightest text-ink dark:text-paper">
        HKUST <span className="text-accent">Exchange</span>
      </span>
    </span>
  );
}
