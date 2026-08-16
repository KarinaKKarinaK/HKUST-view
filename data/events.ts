// Orientation & key dates - Fall 2026 intake. All times Hong Kong (HKT, UTC+8).
// Edit dates/venues/details here. Source: HKUST incoming-exchange orientation slides.

export type Category =
  | "deadline"
  | "orientation"
  | "housing"
  | "social"
  | "logistics";

export type CalEvent = {
  key: string;
  title: string;
  start: string; // ISO local HKT, e.g. "2026-08-28T13:00:00"; or date "2026-08-14" if allDay
  end: string;
  allDay?: boolean;
  location?: string;
  details: string;
  category: Category;
};

export const events: CalEvent[] = [
  {
    key: "hk_tour_reg",
    title: "HK Day Tour - Registration Deadline",
    start: "2026-08-13",
    end: "2026-08-14",
    allDay: true,
    location: "MyStudyAbroad system",
    category: "deadline",
    details:
      "Register for the Hong Kong Day Tour via the MyStudyAbroad system. Quotas are limited and allocated by a random ballot after the deadline - no late registration. Results & payment details are announced by email by 17 Aug; payment is due by 20 Aug. Meals are provided during the tour (limited dietary accommodation). School of Business & Management students are recommended to choose Tour (1).",
  },
  {
    key: "online_reg",
    title: "Online Registration Deadline (before arrival)",
    start: "2026-08-14",
    end: "2026-08-15",
    allDay: true,
    category: "deadline",
    details:
      "Complete BEFORE your arrival at HKUST: (1) Online Registration Form; (2) Upload your travel document / student e-Visa; (3) Upload a passport-style photo on a white background; (4) Complete the Assumption of Risk & Release Form. SBM students: wait for instructions from your School. Not applicable to HKUST Guangzhou campus students.",
  },
  {
    key: "hk_tour_pay",
    title: "HK Day Tour - Payment Deadline",
    start: "2026-08-20",
    end: "2026-08-21",
    allDay: true,
    category: "deadline",
    details:
      "If successful in the ballot, settle your payment by 20 Aug to secure your seat. Check your email regularly.",
  },
  {
    key: "free_essentials",
    title: 'Free Essentials Pickup - "Stop! Don\'t Shop! Adopt!"',
    start: "2026-08-25T14:00:00",
    end: "2026-08-25T17:00:00",
    location: "Living Lab Hub (opposite Passione Cafe)",
    category: "logistics",
    details:
      "Pick up FREE beddings, kitchenware and electronics for your new hall - don't buy what you can adopt! Weekday only. Full schedule: 20-24 Aug beddings 2-5pm; 25-26 Aug all items 2-5pm; 27 Aug-1 Sep 12-5pm. Location: Living Lab Hub (opposite Passione Cafe).",
  },
  {
    key: "hall_checkin",
    title: "Hall Check-in Opens (earliest)",
    start: "2026-08-27T10:00:00",
    end: "2026-08-27T10:30:00",
    location: "HKUST Student Housing",
    category: "housing",
    details:
      "Earliest check-in to HKUST student housing is 10:00am, 27 Aug - no early check-in can be arranged. Hall allocation results are emailed to your HKUST account from SHRLO around one week before the earliest check-in date. Undergraduate exchange students are guaranteed and expected to stay in university housing.",
  },
  {
    key: "welcome_lounge_1",
    title: "Welcome Lounge (Day 1) + Campus Tour sign-up",
    start: "2026-08-27T14:00:00",
    end: "2026-08-27T17:00:00",
    location: "Tsang Shiu Tim Art Hall",
    category: "orientation",
    details:
      "At the Welcome Lounge (Tsang Shiu Tim Art Hall) collect your welcome package - insurance certificate, Non-local Student Pocket Guide, International SOS Information Sheet, International SOS Membership Card, Emergency Card, and your Welcome Reception entry pass - plus a welcome gift. Sign up for a campus tour, meet your HKUST Exchange Buddies, and ask any questions. Service hours: 27 Aug 14:00-17:00; 28 Aug 09:30-11:30.",
  },
  {
    key: "student_card",
    title: "Collect Student Card (Day 1)",
    start: "2026-08-27T14:00:00",
    end: "2026-08-27T17:00:00",
    location: "LT-L, G/F, Cheng Yu Tung Building",
    category: "logistics",
    details:
      "Bring your travel document (Passport, EEP, or HKID) and your landing slip. Your card is ready the next working day AFTER you submit ALL registration documents (including the landing slip). Pick-up: 27 Aug 14:00-17:00 & 28 Aug 10:00-12:00 / 14:00-16:00 at LT-L, G/F, Cheng Yu Tung Building; from 1 Sep at the Academic Registry Office during office hours. Collection deadline: 11 Sep.",
  },
  {
    key: "welcome_lounge_2",
    title: "Welcome Lounge (Day 2)",
    start: "2026-08-28T09:30:00",
    end: "2026-08-28T11:30:00",
    location: "Tsang Shiu Tim Art Hall",
    category: "orientation",
    details:
      "At the Welcome Lounge (Tsang Shiu Tim Art Hall) collect your welcome package - insurance certificate, Non-local Student Pocket Guide, International SOS Information Sheet, International SOS Membership Card, Emergency Card, and your Welcome Reception entry pass - plus a welcome gift. Sign up for a campus tour, meet your HKUST Exchange Buddies, and ask any questions. Service hours: 27 Aug 14:00-17:00; 28 Aug 09:30-11:30.",
  },
  {
    key: "orientation",
    title: "Orientation Session (MANDATORY)",
    start: "2026-08-28T13:00:00",
    end: "2026-08-28T14:50:00",
    location: "Shaw Auditorium",
    category: "orientation",
    details:
      "Mandatory orientation session for all incoming exchange students. Shaw Auditorium, 13:00-14:50.",
  },
  {
    key: "academic_induction",
    title: "Academic Induction Session (your School only)",
    start: "2026-08-28T15:00:00",
    end: "2026-08-28T17:00:00",
    location: "Cheng Yu Tung Building lecture theatres",
    category: "orientation",
    details:
      "Attend the Academic Induction of your admitted School ONLY (3:00-5:00pm): School of Science (SSCI) to Lecture Theatre E · School of Engineering (SENG) to Lecture Theatre A · School of Business & Management (SBM) to Lecture Theatre B · School of Humanities & Social Science (SHSS) to Lecture Theatre K.",
  },
  {
    key: "ikea_shuttle",
    title: "IKEA Shuttle Bus",
    start: "2026-08-28T17:00:00",
    end: "2026-08-28T20:00:00",
    location: "Gather at Welcome Lounge (Tsang Shiu Tim Art Hall)",
    category: "logistics",
    details:
      "Shuttle bus to IKEA to grab essentials and beddings. Gather at the Welcome Lounge; return route IKEA to Jockey Club Hall to HKUST. 28 Aug 17:00-20:00.",
  },
  {
    key: "wellbeing",
    title: "Non-academic Opportunities & Your Wellbeing",
    start: "2026-08-31T10:45:00",
    end: "2026-08-31T12:00:00",
    location: "Shaw Auditorium",
    category: "orientation",
    details:
      "Learn about sports and other non-academic opportunities and wellbeing support at HKUST. Shaw Auditorium, 31 Aug 10:45-12:00.",
  },
  {
    key: "welcome_reception",
    title: "Welcome Reception",
    start: "2026-08-31T12:10:00",
    end: "2026-08-31T13:45:00",
    location: "China Garden",
    category: "social",
    details:
      "Sip, snack and socialize. Bring your Welcome Reception entry pass (collected at the Welcome Lounge). China Garden, 31 Aug 12:10-13:45.",
  },
  {
    key: "landing_slip",
    title: "Landing Slip Upload & Student Card Collection Deadline",
    start: "2026-09-11",
    end: "2026-09-12",
    allDay: true,
    category: "deadline",
    details:
      "By 11 Sep, upload your student landing slip (issued by the Immigration Officer when you enter Hong Kong), if applicable. This is also the deadline to collect your student card.",
  },
  {
    key: "snap_challenge",
    title: "Exchange Snap Challenge - Submission Deadline",
    start: "2026-09-25",
    end: "2026-09-26",
    allDay: true,
    category: "deadline",
    details:
      'Create a short video on one of these themes - travel vlog-style reel of your orientation, "Day in the Life at HKUST", "Hidden gems on campus", "Hong Kong with HKUST", or "Found my squad at HKUST". Prizes: Grand Prize (5 winners) an Ocean Park ticket; Appreciation Award a film camera OR a HK$200 Starbucks voucher. Submission deadline 25 Sep. Details shared via email.',
  },
];

// Campus tour slots - shown as a note under Welcome Lounge (register at the Welcome Lounge).
export const campusTourSlots =
  "27 Aug: 14:30-15:30 or 16:00-17:00 · 28 Aug: 10:00-11:00 or 11:00-12:00.";
