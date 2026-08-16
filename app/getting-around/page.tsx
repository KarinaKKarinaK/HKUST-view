import type { Metadata } from "next";
import { Guide, Card, LinkRow } from "@/components/guide";

export const metadata: Metadata = { title: "Getting around · HKUST View" };

export default function GettingAround() {
  return (
    <Guide
      eyebrow="Daily life in HK"
      title="Getting around"
      intro="HKUST sits out at Clear Water Bay, a short hop from the nearest MTR. Once you know the minibus and the line, the whole city opens up."
    >
      <Card label="To and from campus">
        Green minibus <strong>11</strong> and <strong>11S</strong> run between campus and
        Hang Hau MTR on the Tseung Kwan O (TKO) line. From Hang Hau you can reach anywhere
        on the MTR network. Buses also connect campus to Choi Hung, Diamond Hill and
        Tseung Kwan O. For live routes and times, Citymapper or Google Maps are your
        friends.
        <LinkRow
          links={[
            { label: "Citymapper HK", href: "https://citymapper.com/hong-kong" },
            { label: "MTR", href: "https://www.mtr.com.hk/en/customer/main/index.html" },
            { label: "Campus map", href: "https://maps.ust.hk/" },
          ]}
        />
      </Card>

      <Card label="From the airport">
        Take the Airport Express to Kowloon or Hong Kong station, then transfer to the MTR
        (or a taxi) toward Tseung Kwan O and on to campus. A taxi the whole way is faster
        but pricier. Either way, budget extra time on arrival day with luggage.
        <LinkRow
          links={[
            {
              label: "Airport Express",
              href: "https://www.mtr.com.hk/en/customer/services/aes_index.html",
            },
          ]}
        />
      </Card>

      <Card label="Octopus card">
        One card for the MTR, buses, minibuses and many shops. Buy it at the airport or any
        MTR station, or add it to your phone. Top up at stations and convenience stores.
        Tap on and, on some transport, tap off.
        <LinkRow
          links={[
            {
              label: "Octopus",
              href: "https://www.octopus.com.hk/en/consumer/index.html",
            },
          ]}
        />
      </Card>

      <Card label="Taxis" dark>
        Hong Kong taxis are metered. Green taxis serve the New Territories (including the
        HKUST area), red taxis serve urban areas. Apps like HKTaxi and Uber work here. Keep
        some cash, since not every taxi takes cards, and have your destination written in
        Chinese if you can.
      </Card>
    </Guide>
  );
}
