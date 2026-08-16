import type { Metadata } from "next";
import { Guide, Card, LinkRow } from "@/components/guide";

export const metadata: Metadata = { title: "Campus essentials · HKUST View" };

export default function Campus() {
  return (
    <Guide
      eyebrow="Daily life in HK"
      title="Campus essentials"
      intro="Where to eat, study, work out and get help, plus the one campus quirk that confuses everyone on day one."
    >
      <Card label="Food">
        Several canteens are spread across campus, plus cafes (Passione, Starbucks, Pacific
        Coffee) and fast food. Your student card gets on-campus discounts. Hours vary by
        outlet and by term, so check signage or the Student Hotlinks for what is open now.
        <LinkRow
          links={[
            { label: "Student Hotlinks", href: "https://itso.hkust.edu.hk/student-hotlinks/" },
          ]}
        />
      </Card>

      <Card label="Library and study">
        The Lee Shau Kee Library (floors LG1 to LG5) has long opening hours during term and
        plenty of study space, from silent floors to group rooms. Check current hours and
        book rooms on the library site.
        <LinkRow links={[{ label: "Library", href: "https://library.hkust.edu.hk/" }]} />
      </Card>

      <Card label="Sports and gym">
        There is a sports hall, gym, pool and courts. Bring your student card, and book
        facilities and classes through the Sports and Recreation team. Great way to meet
        people early in the semester.
        <LinkRow
          links={[
            { label: "Student Hotlinks", href: "https://itso.hkust.edu.hk/student-hotlinks/" },
          ]}
        />
      </Card>

      <Card label="Money, printing and help">
        ATMs are on campus (look near the Atrium). Print and scan at the ITSC print
        stations. For anything student-life related, from wellbeing to admin, the Dean of
        Students&apos; Office is the place to start.
        <LinkRow
          links={[
            { label: "Student Hotlinks", href: "https://itso.hkust.edu.hk/student-hotlinks/" },
            { label: "Dean of Students", href: "https://dst.hkust.edu.hk/" },
          ]}
        />
      </Card>

      <Card label="The floors go down" dark>
        HKUST is built into a hillside. From the main entrance you head DOWN through G, LG1,
        LG2 and on toward the seafront. A room starting with LG is lower, not higher, and
        LG7 is near the water. When you are lost, the interactive campus map is faster than
        guessing.
        <LinkRow links={[{ label: "Campus map", href: "https://maps.ust.hk/" }]} />
      </Card>
    </Guide>
  );
}
