// ─────────────────────────────────────────────────────────────
//  WEDDING CONFIG — Husain Kanchwala & Fatema Matkawala
// ─────────────────────────────────────────────────────────────

export interface WeddingEvent {
  id: string;
  name: string;
  islamicDate: string;
  dayLabel: string;
  dayNum: string;
  monthLabel: string;
  date: string;
  time: string;
  timeDetails?: {
    ladies?: string;
    gents?: string;
    general?: string;
  };
  venue: string;
  venueAddress: string;
  mapsQuery: string;
  dateISO: string;
  note?: string;
}

export const wedding = {
  bride: "Fatema",
  groom: "Husain",
  brideFull: "Fatema Matkawala",
  groomFull: "Husain Kanchwala",
  brideParents: "Daughter of Mr. Mustali & Mrs. Alefiya Matkawala",
  groomParents: "Son of Mr. Hatim & Mrs. Fatema Kanchwala",
  hashtag: "#HusainWedsFatema",
  monogram: "H · F",

  // Countdown target (first event: 21st November 2026 at 7:00 PM)
  dateISO: "2026-11-21T19:00:00+05:30",
  dateLabel: "21st & 22nd November 2026",
  timeLabel: "Celebrations begin at 7:00 PM",

  verse: {
    arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    text: "With soft hearts and grateful families, we cordially invite you to celebrate the wedding ceremony of our beloved children.",
  },

  events: [
    {
      id: "majlis",
      name: "Khushi Ni Majlis / Shehreghast",
      islamicDate: "12th Jamadil Ukhra",
      dayLabel: "Saturday",
      dayNum: "21",
      monthLabel: "November 2026",
      date: "Saturday, 21st November 2026",
      time: "Ladies: 7:00 PM | Gents: 8:30 PM",
      timeDetails: {
        ladies: "7:00 PM",
        gents: "8:30 PM",
      },
      venue: "Ezzy Mawaid",
      venueAddress: "Ezzy Mawaid",
      mapsQuery: "Ezzy Mawaid",
      dateISO: "2026-11-21T19:00:00+05:30",
      note: "Join us for prayers and auspicious blessings on this joyous evening.",
    },
    {
      id: "reception",
      name: "Wedding Reception",
      islamicDate: "13th Jamadil Ukhra",
      dayLabel: "Sunday",
      dayNum: "22",
      monthLabel: "November 2026",
      date: "Sunday, 22nd November 2026",
      time: "1:00 PM onwards",
      timeDetails: {
        general: "1:00 PM onwards",
      },
      venue: "Shakuntala Farms",
      venueAddress: "Shakuntala Farms",
      mapsQuery: "Shakuntala Farms",
      dateISO: "2026-11-22T13:00:00+05:30",
      note: "A joyous afternoon of festivities, feast, and celebration.",
    },
  ] as WeddingEvent[],

  venues: [
    {
      name: "Ezzy Mawaid",
      event: "Khushi Ni Majlis / Shehreghast",
      date: "Saturday, 21st November 2026",
      mapsQuery: "Ezzy Mawaid",
    },
    {
      name: "Shakuntala Farms",
      event: "Wedding Reception",
      date: "Sunday, 22nd November 2026",
      mapsQuery: "Shakuntala Farms",
    },
  ],

  rsvp: {
    whatsappNumber: "917798349852",
    contactName: "Kanchwala & Matkawala Families",
  },

  music: {
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-wedding-waltz-piano-and-strings-1002.mp3",
  },

  sections: {
    events: true,
    venue: true,
    countdown: true,
    rsvp: true,
  },
};

export const createGoogleCalendarUrl = (ev: WeddingEvent) => {
  const start = new Date(ev.dateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15) + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${wedding.bride} & ${wedding.groom} — ${ev.name}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${ev.name} at ${ev.venue} (${ev.time})`,
    location: `${ev.venue}, ${ev.venueAddress}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadEventICS = (ev: WeddingEvent) => {
  const start = new Date(ev.dateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InviteStory//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${ev.id}-${Date.now()}@invitestory`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${wedding.bride} & ${wedding.groom} — ${ev.name}`,
    `DESCRIPTION:${ev.name} at ${ev.venue} (${ev.time})`,
    `LOCATION:${ev.venue}\\, ${ev.venueAddress}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${wedding.bride}-${wedding.groom}-${ev.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

export const getMapsDirectionsUrl = (query: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

export const getMapsEmbedUrl = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
