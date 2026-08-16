// Checklist items, FAQ, student card & housing copy. Edit here.

export const checklistItems: { id: string; label: string }[] = [
  {
    id: "network",
    label:
      "Activate HKUST network account (instructions emailed to you; SBM students wait for your School)",
  },
  {
    id: "courses",
    label:
      "Complete course registration (details emailed; arrangements vary by School)",
  },
  {
    id: "online_reg",
    label:
      "Online Registration - 4 steps, by 14 Aug (form, travel doc/e-Visa, white-bg photo, risk form)",
  },
  {
    id: "hk_tour",
    label: "Register for HK Day Tour by 13 Aug (optional, ballot)",
  },
  {
    id: "money",
    label:
      "Sort out money: a card with low foreign-exchange fees, plus some cash for your first days",
  },
  {
    id: "hall_email",
    label: "Check hall allocation email from SHRLO (~1 week before check-in)",
  },
  {
    id: "landing_airport",
    label:
      "At HK immigration, get your STUDENT landing slip (tell the officer you are a student, not a tourist)",
  },
  { id: "checkin", label: "Check in to your hall (from 10am, 27 Aug)" },
  {
    id: "octopus",
    label:
      "Get an Octopus card for the MTR and small payments (at the airport or any MTR station)",
  },
  { id: "welcome_pkg", label: "Collect welcome package at the Welcome Lounge" },
  { id: "card", label: "Collect your Student Card (by 11 Sep)" },
  {
    id: "landing",
    label: "Upload landing slip (by 11 Sep, if applicable)",
  },
  {
    id: "orientation",
    label: "Attend the MANDATORY Orientation Session (28 Aug, 13:00)",
  },
  {
    id: "induction",
    label: "Attend your School's Academic Induction (28 Aug, 15:00)",
  },
];

export const faq: { q: string; a: string }[] = [
  {
    q: "When can I move into my hall?",
    a: "From 10:00am on 27 Aug; no early check-in. Watch for the SHRLO allocation email, sent to your HKUST account about a week before check-in.",
  },
  {
    q: "What do I need to collect my student card?",
    a: "Your travel document (Passport / EEP / HKID) plus your landing slip, after you have submitted all registration documents. Your card is ready the next working day. Collection deadline: 11 Sep.",
  },
  {
    q: "Which orientation events are mandatory?",
    a: "The Orientation Session on 28 Aug 13:00-14:50 (Shaw Auditorium) and your School's Academic Induction on 28 Aug 15:00-17:00.",
  },
  {
    q: "Where do I get cheap essentials and beddings?",
    a: 'Free at the "Stop! Don\'t Shop! Adopt!" pickup (Living Lab Hub, opposite Passione Cafe), or take the IKEA shuttle on 28 Aug.',
  },
  {
    q: "How do I join the HK Day Tour?",
    a: "Register via MyStudyAbroad by 13 Aug. Places are allocated by ballot; if you get a spot, pay by 20 Aug to confirm.",
  },
  {
    q: "I'm an SBM student - anything different?",
    a: "Several steps say to wait for instructions from your School (network account, course registration, online registration). SBM students are also advised to pick Tour (1) for the HK Day Tour.",
  },
  {
    q: "What discounts does the student card give?",
    a: "About 30% off Starbucks / Pacific Coffee, and 5% off Fusion Supermarket and 7-Eleven (on-campus outlets only).",
  },
  {
    q: "Do I need a Hong Kong ID card (HKID)?",
    a: "Only if you stay 180 days or more (a full academic year). One-semester exchange students do not need one. If you do, book an immigration appointment early once your visa is issued (bring your visa) because the earliest slots fill up fast.",
  },
  {
    q: "How do I pay for transport and daily things?",
    a: "Get an Octopus card at the airport or any MTR station (physical or on your phone) for the MTR, buses and many shops. A card with low foreign-exchange fees plus some cash is handy at first; you can open a local bank account once you have an HKID.",
  },
  {
    q: "Where can I check course reviews before registering?",
    a: "ust.space has past students' course reviews and rankings. Course selection runs in stages: add courses to your cart from 21 Aug, then confirm from 25 Aug. The Fall term runs 1 Sep to 19 Dec.",
  },
  {
    q: "Something looks wrong or out of date - can I help?",
    a: "Yes! This hub is community-maintained. Open an issue or a pull request on GitHub to fix or add info, and always confirm details against official HKUST emails.",
  },
];

export const studentCard = {
  how: "Your HKUST Student Card is your student identity, library card, and access key. It is available for collection the next working day after you submit ALL registration documents (including your landing slip).",
  unlocks: [
    "Student identity",
    "Library card",
    "Sports & recreational facilities",
    "Computer barns & laboratories",
    "Access to your hall",
  ],
  discounts: [
    "Starbucks / Pacific Coffee ~30% off",
    "Fusion Supermarket 5% off",
    "7-Eleven 5% off",
  ],
};

export const lastUpdated = "13 August 2026";
