// Generates hosted .ics files so Google/Outlook can subscribe to them by URL.
// Runs on prebuild (Node type-stripping). Writes public/calendar/all.ics and
// one file per calendar day.
import { writeFile, mkdir } from "node:fs/promises";
import { events } from "../data/events.ts";
import { buildIcs } from "../lib/calendar.ts";

const outDir = "public/calendar";
await mkdir(outDir, { recursive: true });

await writeFile(`${outDir}/all.ics`, buildIcs(events));

const days = new Map<string, typeof events>();
for (const e of events) {
  const day = e.start.split("T")[0];
  if (!days.has(day)) days.set(day, []);
  days.get(day)!.push(e);
}
for (const [day, list] of days) {
  await writeFile(`${outDir}/${day}.ics`, buildIcs(list));
}

console.log(`Wrote ${outDir}/all.ics and ${days.size} day files`);
