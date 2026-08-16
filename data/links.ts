// Official HKUST quick links + WhatsApp group placeholders. Edit here.

export type Link = { label: string; url: string };
export type LinkGroup = { title: string; links: Link[] };

export const quickLinks: LinkGroup[] = [
  {
    title: "Academics",
    links: [
      {
        label: "Course Catalog",
        url: "https://registry.hkust.edu.hk/resource-library/course-catalog",
      },
      {
        label: "Class Schedule & Quota",
        url: "https://w5.ab.ust.hk/wcq/cgi-bin/",
      },
      { label: "Academic Registry", url: "https://registry.hkust.edu.hk/" },
      {
        label: "Student Portal (SIS)",
        url: "https://registry.hkust.edu.hk/resource-library/student-portal",
      },
      { label: "Canvas (LMS)", url: "https://canvas.ust.hk/" },
      {
        label: "Useful academic tools",
        url: "https://registry.hkust.edu.hk/useful-tools",
      },
    ],
  },
  {
    title: "Exchange & Orientation",
    links: [
      {
        label: "HKUST Study Abroad (Global Learning)",
        url: "https://studyabroad.hkust.edu.hk/",
      },
      {
        label: "Inbound Orientation & Arrival",
        url: "https://studyabroad.hkust.edu.hk/inbound/arrival/activities",
      },
      {
        label: "MyStudyAbroad system",
        url: "https://mystudyabroad.hkust.edu.hk/",
      },
    ],
  },
  {
    title: "Housing & Campus",
    links: [
      {
        label: "Student Housing (SHRLO)",
        url: "https://shrl.hkust.edu.hk/",
      },
      { label: "Interactive Campus Map", url: "https://map.ust.hk/" },
      { label: "HKUST main site", url: "https://hkust.edu.hk/" },
    ],
  },
  {
    title: "Social",
    links: [
      {
        label: "Instagram @abroadathkust",
        url: "https://www.instagram.com/abroadathkust/",
      },
    ],
  },
];

// EDIT THESE - paste real WhatsApp invite links (https://chat.whatsapp.com/XXXX). "" = coming soon.
export const whatsappGroups: Link[] = [
  { label: "HKUST Night Out", url: "https://chat.whatsapp.com/H4bR8NjofGo132SSlPooBL" },
  { label: "Travel around HK & Asia", url: "https://chat.whatsapp.com/DYJLIxLQnAfEFkO3XfW0wH" },
  { label: "Running", url: "https://chat.whatsapp.com/IpgPD3Nh6vQ7XlG1boVdgK" },
  { label: "Hiking", url: "https://chat.whatsapp.com/Fkn2YmHyWh90uXTutRlpQl" },
  { label: "Football", url: "https://chat.whatsapp.com/8g5qPgwiDSW6pNnnTUxbir" },
  { label: "Badminton", url: "https://chat.whatsapp.com/Fgz3h45RyXp0Eaa35vy8zv" },
  { label: "Gym", url: "https://chat.whatsapp.com/Ho95H3IVL2i4vtoUqla9L9" },
  { label: "Computer Science", url: "https://chat.whatsapp.com/IpgPD3Nh6vQ7XlG1boVdgK" },
];

export const instagramUrl = "https://www.instagram.com/abroadathkust/";
