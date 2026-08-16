import type { Metadata } from "next";
import { Guide, Card, LinkRow } from "@/components/guide";

export const metadata: Metadata = { title: "Weather and typhoons · HKUST View" };

export default function Weather() {
  return (
    <Guide
      eyebrow="Daily life in HK"
      title="Weather and typhoons"
      intro="August to October is hot, humid and typhoon season. The upside: a strong enough signal means classes are cancelled."
    >
      <Card label="Typhoon signals">
        Hong Kong uses signals T1, T3, T8, T9 and T10. At <strong>T8 or above</strong>,
        classes and exams are suspended, most shops close and you should stay indoors.
        Watch the Hong Kong Observatory for when a signal is going up or coming down.
        <LinkRow links={[{ label: "HK Observatory", href: "https://www.hko.gov.hk/en/" }]} />
      </Card>

      <Card label="Rainstorm warnings">
        Rainstorm warnings are Amber, Red and Black. A <strong>Black rainstorm</strong>{" "}
        warning also suspends classes. Flooding and slippery slopes are real on campus, so
        do not rush the outdoor stairs when it is pouring.
      </Card>

      <Card label="What to pack">
        Light, breathable clothes for 30C-plus and high humidity early on. A compact
        umbrella and a light rain jacket. Sunscreen. A light layer for the very strong
        indoor air-conditioning. Comfortable shoes for the hilly campus.
      </Card>

      <Card label="When a signal goes up" dark>
        Check the Observatory and your HKUST email and announcements for the exact class
        arrangements, they are the source of truth, not rumours in the group chat. Do not
        travel during T8 or above. Shops get busy before big storms, so keep a little water
        and food in your room.
      </Card>
    </Guide>
  );
}
