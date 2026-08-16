import type { Metadata } from "next";
import { Guide, Card, LinkRow } from "@/components/guide";

export const metadata: Metadata = { title: "Emergency and health · HKUST View" };

export default function Emergency() {
  return (
    <Guide
      eyebrow="Reference"
      title="Emergency and health"
      intro="Save these before you need them. Most you will never use, but the one time you do, you will be glad they are here."
    >
      <Card label="In an emergency">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="tel:999"
            className="inline-flex items-baseline gap-2 rounded-2xl bg-accent px-5 py-3 text-white"
          >
            <span className="font-sans text-3xl font-semibold tracking-tightest">999</span>
            <span className="text-sm font-medium">Police / Fire / Ambulance</span>
          </a>
        </div>
        <p className="mt-4">
          Free from any phone, including a locked one. Give your location clearly. On
          campus, name the building and floor (remember the floors go down: G, LG1, LG2 and
          so on).
        </p>
      </Card>

      <Card label="On campus">
        The HKUST Security Control Centre is staffed 24/7. Find the current campus hotline
        in your welcome pack or on the Dean of Students&apos; Office site. For minor
        illness, the University Health Center handles non-emergencies during opening hours.
        <LinkRow links={[{ label: "Dean of Students", href: "https://dst.hkust.edu.hk/" }]} />
      </Card>

      <Card label="International SOS">
        You received an International SOS membership card in your welcome pack. It gives
        24/7 medical and travel assistance worldwide. Keep the card and its hotline number
        saved in your phone.
      </Card>

      <Card label="Hospitals and wellbeing">
        The nearest public hospital with an emergency department (A&amp;E) is Tseung Kwan O
        Hospital. Bring your passport or HKID, as public care charges non-residents. For
        stress, homesickness or low mood, the Counseling and Wellness Center offers
        confidential support, and it is normal to use it.
        <LinkRow
          links={[
            { label: "Hospital Authority", href: "https://www.ha.org.hk/visitor/ha_index.asp" },
            { label: "Counseling & Wellness", href: "https://counsel.ust.hk/" },
          ]}
        />
      </Card>
    </Guide>
  );
}
