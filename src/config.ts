// ─────────────────────────────────────────────────────────────
//  WEDDING CONFIG — Verified Client Information & Corrections
// ─────────────────────────────────────────────────────────────

export const wedding = {
  bride: "Fatema",
  groom: "Husain",
  brideFull: "Fatema Matkawala",
  groomFull: "Husain Kanchwala",
  monogram: "H & F",

  groomParents: "SON OF Mr. Hatim Kanchwala & Mrs. Fatema Kanchwala",
  brideParents: "DAUGHTER OF Mr. Mustali & Mrs. Aaliya Matkawala",

  dateISO: "2026-11-01T19:00:00+05:30",
  dateLabel: "1st, 21st & 22nd November 2026",
  timeLabel: "Wedding Celebrations",
  venueDefault: "Ezzy Masjid",

  verse: {
    arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    subtext: "TOGETHER WITH THEIR FAMILIES",
    invitationText: "INVITE YOU TO CELEBRATE THE WEDDING CEREMONY OF",
  },

  events: [
    {
      id: "khushi-majlis",
      name: "KHUSHI NI MAJLIS / SHEHRE GHAAT",
      date: "1st Nov, 12th Jamadil Ukhra",
      day: "Saturday",
      time: "Ladies: 7:00 PM | Gents: 8:30 PM",
      venue: "Ezzy Masjid",
      dateISO: "2026-11-01T19:00:00+05:30",
    },
    {
      id: "darees",
      name: "DAREES",
      date: "21st November 2026",
      day: "Saturday",
      time: "7:00 PM",
      venue: "Ezzy Masjid",
      dateISO: "2026-11-21T19:00:00+05:30",
    },
    {
      id: "reception",
      name: "WEDDING RECEPTION",
      date: "22nd November 2026",
      day: "Sunday",
      time: "1:00 PM",
      venue: "Ezzy Masjid",
      dateISO: "2026-11-22T13:00:00+05:30",
    },
  ],

  sharing: {
    title: "Husain Kanchwala & Fatema Matkawala — Wedding Invitation",
    text: "You are cordially invited to celebrate the Wedding Ceremony of Fatema Matkawala and Husain Kanchwala.",
    url: typeof window !== "undefined" ? window.location.href : "https://YOUR-DOMAIN.com/",
  },
};

export const createGoogleCalendarUrl = (eventName: string, dateISO: string, venue: string = "Ezzy Masjid", timeDetails?: string) => {
  const start = new Date(dateISO);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replaceAll("-", "").replaceAll(":", "").replace(/\.\d{3}/g, "").slice(0, 15) + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${eventName} — ${wedding.groom} & ${wedding.bride}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    location: venue,
    details: `${eventName} for ${wedding.groomFull} (${wedding.groomParents}) & ${wedding.brideFull} (${wedding.brideParents}). Timings: ${timeDetails || "As mentioned on invitation"}. Venue: ${venue}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadICS = (eventName: string, dateISO: string, venue: string = "Ezzy Masjid", timeDetails?: string) => {
  const start = new Date(dateISO);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replaceAll("-", "").replaceAll(":", "").replaceAll(".", "").slice(0, 15) + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MuslimWeddingInvitation//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}-${eventName.replace(/\s+/g, "")}@wedding`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${eventName} — ${wedding.groom} & ${wedding.bride}`,
    `LOCATION:${venue}`,
    `DESCRIPTION:${eventName} for ${wedding.groomFull} & ${wedding.brideFull}. Timings: ${timeDetails || ""}. Venue: ${venue}`,
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
