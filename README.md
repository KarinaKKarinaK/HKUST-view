# HKUST Exchange - Everything You Need

A community-made, one-stop hub for HKUST incoming exchange students (Fall 2026): the full
orientation schedule with one-tap **add-to-calendar**, an interactive pre-arrival checklist,
student-card & housing info, official quick links, and group-chat buttons. Installable to your
phone home screen as an app (PWA).

**Live:** https://hkust-view.vercel.app

---

## ⚠️ Disclaimer

> This is an **unofficial, community-maintained** resource. It is **not affiliated with,
> endorsed by, or an official publication of HKUST**. Dates, venues, times, and links may
> change or contain errors - **do not rely on or quote this site for accuracy**. Always confirm
> every detail against the **official emails and communications from HKUST** (Academic Registry,
> SHRLO, and the Office of Global Learning / Study Abroad). The maintainers accept no liability
> for any decisions made based on this information. Provided "as is", without warranty of any kind.

---

## What it is

A fast, mobile-first web app that holds everything a new exchange student needs in one place.
All times are Hong Kong time (HKT, UTC+8). The "Add to calendar" buttons are generic template /
`.ics` links that add events to **each visitor's own** calendar - nothing is tied to any person.
No personal information is stored anywhere.

## Traffic / analytics

Uses [Vercel Web Analytics](https://vercel.com/docs/analytics) (`@vercel/analytics`) to count
how many people open the link over time (privacy-friendly, no cookies). To see the numbers:
open the project on Vercel, go to the **Analytics** tab, and click **Enable** once. Views,
visitors and top pages then show up there over time.

## Design

Editorial grotesque style using the **Geist** and **Geist Mono** typefaces (via `geist`),
a warm paper / near-black palette with a single red accent, film-grain texture and soft mesh
gradients, and light + dark mode. Students can set their **School** (top-right) to personalize
their academic-induction room and reminders; the choice is saved on the device.

## Sources

Compiled from the HKUST incoming-exchange orientation slides (Fall 2026 intake) and the official
HKUST websites linked in the app.

## Editing the content

All content lives in typed data files - no backend, no database:

- **`data/events.ts`** - orientation schedule & key dates (titles, dates, venues, details,
  category). Per-event Google and Outlook links are generated from this. After editing it,
  run `npm run gen:ics` to refresh the hosted subscribe files in `public/calendar/`, then commit.
- **`data/links.ts`** - official quick links **and** the `whatsappGroups` constant. Paste real
  invite links there:
  ```ts
  { label: "All Exchange Students 2026", url: "https://chat.whatsapp.com/XXXX" },
  ```
  An empty string (`url: ""`) renders a disabled "Link coming soon" button.
- **`data/content.ts`** - checklist items, FAQ, student-card & housing copy, `lastUpdated` date.

**Swap the logo:** edit `components/Logo.tsx` (inline SVG), then regenerate the PWA/app icons:
```bash
npm run gen:icons   # rewrites public/icon-*.png, apple-touch-icon.png, favicon-32.png
```

## Run locally & deploy

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

Deployed on Vercel. **Push to `main` → Vercel auto-deploys.** The app is a fully static export
(`next.config.mjs` → `output: "export"`).

## Contributing

Something wrong or out of date? Open an issue or a pull request - this hub is community-maintained.
Please keep it free of personal information and always cross-check against official HKUST emails.

## License

[MIT](LICENSE).
