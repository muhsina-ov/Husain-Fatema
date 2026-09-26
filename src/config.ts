// ─────────────────────────────────────────────────────────────
//  WEDDING CONFIG — Husain & Fatema
//  Verified Customer Requirements & Confirmed Dates
// ─────────────────────────────────────────────────────────────

export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  hijriDate: string;
  dayLabel: string;
  dayNum: string;
  monthLabel: string;
  time: string;
  venue: string;
  mapsQuery: string;
  mapsUrl: string;
  dateISO: string;
  note: string;
}

export const wedding = {
  bride: "Fatema",
  groom: "Husain",
  brideFull: "Fatema Matkawala",
  groomFull: "Husain Kanchwala",
  groomParents: "Son of Mr. Hatim & Mrs. Fatema Kanchwala",
  brideParents: "Daughter of Mr. Mustali & Mrs. Alefiya Matkawala",
  monogram: "H · F",

  // Confirmed Dates (21st & 22nd November 2026)
  dateISO: "2026-11-21T19:00:00+05:30",
  dateLabel: "21st & 22nd November 2026",
  timeLabel: "Wedding Ceremony",

  verse: {
    arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    text: "With soft hearts and grateful families, we invite you to celebrate our wedding ceremony — a quiet beginning, cherished into forever.",
  },

  events: [
    {
      id: "khushi-majlis",
      name: "Khushi Ni Majlis / Shehre Ghaat",
      date: "Saturday, 21st November 2026",
      hijriDate: "12th Jamadil Ukhra",
      dayLabel: "Saturday",
      dayNum: "21",
      monthLabel: "November 2026",
      time: "Ladies: 7:00 PM | Gents: 8:30 PM",
      venue: "Ezzy Mawaid",
      mapsQuery: "Ezzy Mawaid",
      mapsUrl: "https://maps.app.goo.gl/anYRRWhqTx4onuCd8?g_st=ic",
      dateISO: "2026-11-21T19:00:00+05:30",
      note: "Khushi Ni Majlis & Shehre Ghaat — an auspicious beginning surrounded by prayers and family warmth.",
    },
    {
      id: "reception",
      name: "Wedding Reception",
      date: "Sunday, 22nd November 2026",
      hijriDate: "13th Jamadil Ukhra",
      dayLabel: "Sunday",
      dayNum: "22",
      monthLabel: "November 2026",
      time: "1:00 PM onwards",
      venue: "Shakuntala Farms",
      mapsQuery: "Shakuntala Farms",
      mapsUrl: "https://maps.app.goo.gl/ZCTzSggNv4r7Mv8r8?g_st=ic",
      dateISO: "2026-11-22T13:00:00+05:30",
      note: "Join us for an afternoon of joy, delicious feast, and celebrations as we begin our new journey together.",
    },
  ] as WeddingEvent[],

  venues: [
    {
      id: "ezzy-mawaid",
      name: "Ezzy Mawaid",
      event: "Khushi Ni Majlis / Shehre Ghaat",
      date: "Saturday, 21st November 2026",
      time: "Ladies: 7:00 PM | Gents: 8:30 PM",
      address: "Amakin Saifiyah Ezzi Masjid, Balaji Ward, Chandrapur",
      mapsQuery: "Amakin Saifiyah Ezzi Masjid, Chandrapur, Maharashtra 442402",
      mapsUrl: "https://maps.app.goo.gl/anYRRWhqTx4onuCd8?g_st=ic",
    },
    {
      id: "shakuntala-farms",
      name: "Shakuntala Farms",
      event: "Wedding Reception",
      date: "Sunday, 22nd November 2026",
      time: "1:00 PM onwards",
      address: "Shakuntala Farms, Wadgaon, Chandrapur",
      mapsQuery: "Shakuntala Farms, Wadgaon, Chandrapur, Maharashtra 442401",
      mapsUrl: "https://maps.app.goo.gl/ZCTzSggNv4r7Mv8r8?g_st=ic",
    },
  ],

  music: {
    audioUrl: "https://media.invitestory.in/audio/soft-piano-strings.mp3",
  },

  sections: {
    countdown: true,
    events: true,
    venue: true,
    rsvp: true,
  },

  sharing: {
    title: "Husain & Fatema — Wedding Invitation",
    text: "With soft hearts and grateful families, Husain Kanchwala & Fatema Matkawala invite you to celebrate their wedding ceremony on 21st & 22nd November 2026.",
    url: typeof window !== "undefined" ? window.location.href : "https://husain-fatema.invitingyou.top/",
  },
};

export const createGoogleCalendarUrl = (
  eventName: string,
  dateISO: string,
  venue: string,
  timeDetails?: string
) => {
  const start = new Date(dateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15) + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${eventName} — ${wedding.groom} & ${wedding.bride}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${eventName} for ${wedding.groomFull} & ${wedding.brideFull}. Timings: ${timeDetails || "As per invitation"}. Venue: ${venue}.`,
    location: venue,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadEventICS = (
  eventName: string,
  dateISO: string,
  venue: string,
  timeDetails?: string
) => {
  const start = new Date(dateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InviteStory//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}-${eventName.replace(/\s+/g, "")}@invitestory`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${eventName} — ${wedding.groom} & ${wedding.bride}`,
    `DESCRIPTION:${eventName} for ${wedding.groomFull} & ${wedding.brideFull}. Timings: ${timeDetails || ""}. Venue: ${venue}`,
    `LOCATION:${venue}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${wedding.groom}-${wedding.bride}-${eventName.toLowerCase().replace(/[^a-z0-9]/g, "-")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

export const getMapsEmbedUrl = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

export const getMapsDirectionsUrl = (query: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
