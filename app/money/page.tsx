import type { Metadata } from "next";
import { Guide, Card, LinkRow } from "@/components/guide";

export const metadata: Metadata = { title: "Money and SIM · HKUST View" };

export default function Money() {
  return (
    <Guide
      eyebrow="Reference"
      title="Money and SIM"
      intro="Get paying and connected on day one. Most exchange students never open a local bank account and do just fine."
    >
      <Card label="Octopus">
        Your everyday tap-to-pay for transport and many shops and restaurants. Get it at
        the airport or any MTR station, or add it to your phone. Top up with cash at
        stations and convenience stores.
        <LinkRow
          links={[
            { label: "Octopus", href: "https://www.octopus.com.hk/en/consumer/index.html" },
          ]}
        />
      </Card>

      <Card label="Cards and cash">
        Bring a card with low foreign-exchange fees. Multi-currency cards like Wise and
        Revolut are popular with exchange students for good rates. Carry some HK cash for
        your first days, and check your own card&apos;s Hong Kong fees before you fly.
        <LinkRow links={[{ label: "Wise", href: "https://wise.com/" }]} />
      </Card>

      <Card label="Bank account">
        You can open a local account (HSBC, Hang Seng, Bank of China) once you have an HKID,
        which is only for full-year (180+ day) students. One-semester students usually
        manage fine with Octopus, a travel card and some cash.
      </Card>

      <Card label="SIM and data">
        Grab a prepaid SIM at the airport or any convenience store (China Mobile HK, csl,
        3HK, SmarTone), or set up an eSIM before you land so you have data the moment you
        arrive.
        <LinkRow links={[{ label: "Airalo (eSIM)", href: "https://www.airalo.com/" }]} />
      </Card>

      <Card label="Tipping" dark>
        Tipping is not expected in Hong Kong. Sit-down restaurants often add a 10% service
        charge to the bill. For taxis, people usually just round up to the nearest dollar or
        two.
      </Card>
    </Guide>
  );
}
