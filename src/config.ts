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

export interface VenueInfo {
  id: string;
  name: string;
  event: string;
  date: string;
  time: string;
  address: string;
  mapsQuery: string;
  mapsUrl: string;
}

export interface WeddingConfig {
  bride: string;
  groom: string;
  brideFull: string;
  groomFull: string;
  groomParents: string;
  brideParents: string;
  monogram: string;
  dateISO: string;
  dateLabel: string;
  timeLabel: string;
  verse: {
    arabic: string;
    blessing: string;
    text: string;
  };
  events: WeddingEvent[];
  venues: VenueInfo[];
  music: {
    audioUrl: string;
  };
  rsvp: {
    googleFormUrl: string;
    googleFormEditUrl: string;
  };
  sections: {
    countdown: boolean;
    events: boolean;
    venue: boolean;
    rsvp: boolean;
  };
  sharing: {
    title: string;
    text: string;
    url: string;
  };
}

// Common shared data
const sharedGroom = "Husain";
const sharedBride = "Fatema";
const sharedGroomFull = "Husain Kanchwala";
const sharedBrideFull = "Fatema Matkawala";
const sharedGroomParents = "Son of Mr. Hatim & Mrs. Fatema Kanchwala";
const sharedBrideParents = "Daughter of Mr. Mustali & Mrs. Alefiya Matkawala";
const sharedMonogram = "H · F";
const sharedArabic = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
const sharedBlessing = "By the blessings of His Holiness Syedna Muffadal Saifuddin ᴛᴜꜱ.";
const sharedFormUrl = "https://docs.google.com/forms/d/1mheMXkFOmHK3tfDxTBOMpRbceGBXfTAGhiXQ7tj8gKE/viewform";
const sharedFormEditUrl = "https://docs.google.com/forms/d/1mheMXkFOmHK3tfDxTBOMpRbceGBXfTAGhiXQ7tj8gKE/edit?usp=sharing_eil_se_dm&ts=6ab928f0";

// Confirmed Events
const eventSheherghast: WeddingEvent = {
  id: "khushi-majlis",
  name: "Khushi Ni Majlis / Sheherghast",
  date: "Saturday, 21st November 2026",
  hijriDate: "12th Jamadil Ukhra",
  dayLabel: "Saturday",
  dayNum: "21",
  monthLabel: "November 2026",
  time: "Ladies: 7:00 PM | Gents: 8:30 PM",
  venue: "Ezzy Mawaid",
  mapsQuery: "Ezzy Mawaid, Chandrapur",
  mapsUrl: "https://maps.app.goo.gl/anYRRWhqTx4onuCd8?g_st=ic",
  dateISO: "2026-11-21T19:00:00+05:30",
  note: "Khushi Ni Majlis & Sheherghast — an auspicious beginning surrounded by prayers and family warmth.",
};

const eventReception: WeddingEvent = {
  id: "reception",
  name: "Wedding Reception",
  date: "Sunday, 22nd November 2026",
  hijriDate: "13th Jamadil Ukhra",
  dayLabel: "Sunday",
  dayNum: "22",
  monthLabel: "November 2026",
  time: "1:00 PM onwards",
  venue: "Shakuntala Farms",
  mapsQuery: "Shakuntala Farms, Wadgaon, Chandrapur",
  mapsUrl: "https://maps.app.goo.gl/ZCTzSggNv4r7Mv8r8?g_st=ic",
  dateISO: "2026-11-22T13:00:00+05:30",
  note: "Join us for an afternoon of joy, delicious feast, and celebrations as we begin our new journey together.",
};

// Confirmed Venues
const venueEzzyMawaid: VenueInfo = {
  id: "ezzy-mawaid",
  name: "Ezzy Mawaid",
  event: "Khushi Ni Majlis / Sheherghast",
  date: "Saturday, 21st November 2026",
  time: "Ladies: 7:00 PM | Gents: 8:30 PM",
  address: "Amakin Saifiyah Ezzi Masjid, Balaji Ward, Chandrapur",
  mapsQuery: "Amakin Saifiyah Ezzi Masjid, Chandrapur, Maharashtra 442402",
  mapsUrl: "https://maps.app.goo.gl/anYRRWhqTx4onuCd8?g_st=ic",
};

const venueShakuntalaFarms: VenueInfo = {
  id: "shakuntala-farms",
  name: "Shakuntala Farms",
  event: "Wedding Reception",
  date: "Sunday, 22nd November 2026",
  time: "1:00 PM onwards",
  address: "Shakuntala Farms, Wadgaon, Chandrapur",
  mapsQuery: "Shakuntala Farms, Wadgaon, Chandrapur, Maharashtra 442401",
  mapsUrl: "https://maps.app.goo.gl/ZCTzSggNv4r7Mv8r8?g_st=ic",
};

// ─────────────────────────────────────────────────────────────
// VERSION 1: BOTH FUNCTIONS (21st & 22nd November 2026)
// ─────────────────────────────────────────────────────────────
export const weddingBoth: WeddingConfig = {
  bride: sharedBride,
  groom: sharedGroom,
  brideFull: sharedBrideFull,
  groomFull: sharedGroomFull,
  groomParents: sharedGroomParents,
  brideParents: sharedBrideParents,
  monogram: sharedMonogram,

  dateISO: "2026-11-21T19:00:00+05:30",
  dateLabel: "21st & 22nd November 2026",
  timeLabel: "Wedding Ceremony",

  verse: {
    arabic: sharedArabic,
    blessing: sharedBlessing,
    text: "With hearts full of love and gratitude. The joyous families invite you to celebrate the wedding ceremony — A blessed beginning cherished into forever.",
  },

  events: [eventSheherghast, eventReception],
  venues: [venueEzzyMawaid, venueShakuntalaFarms],

  music: {
    audioUrl: "/music.mp3",
  },

  rsvp: {
    googleFormUrl: sharedFormUrl,
    googleFormEditUrl: sharedFormEditUrl,
  },

  sections: {
    countdown: true,
    events: true,
    venue: true,
    rsvp: true,
  },

  sharing: {
    title: "Husain & Fatema — Wedding Invitation",
    text: "With hearts full of love and gratitude, the joyous families invite you to celebrate the wedding ceremony of Husain Kanchwala & Fatema Matkawala on 21st & 22nd November 2026.",
    url: typeof window !== "undefined" ? window.location.href : "https://husain-fatema.invitingyou.top/",
  },
};

// ─────────────────────────────────────────────────────────────
// VERSION 2: 22 NOVEMBER FUNCTION ONLY (Wedding Reception)
// ─────────────────────────────────────────────────────────────
export const wedding22Nov: WeddingConfig = {
  bride: sharedBride,
  groom: sharedGroom,
  brideFull: sharedBrideFull,
  groomFull: sharedGroomFull,
  groomParents: sharedGroomParents,
  brideParents: sharedBrideParents,
  monogram: sharedMonogram,

  dateISO: "2026-11-22T13:00:00+05:30",
  dateLabel: "Sunday, 22nd November 2026",
  timeLabel: "Wedding Reception",

  verse: {
    arabic: sharedArabic,
    blessing: sharedBlessing,
    text: "With hearts full of love and gratitude. The joyous families invite you to celebrate the wedding ceremony — A blessed beginning cherished into forever.",
  },

  events: [eventReception],
  venues: [venueShakuntalaFarms],

  music: {
    audioUrl: "/music.mp3",
  },

  rsvp: {
    googleFormUrl: sharedFormUrl,
    googleFormEditUrl: sharedFormEditUrl,
  },

  sections: {
    countdown: true,
    events: true,
    venue: true,
    rsvp: true,
  },

  sharing: {
    title: "Husain & Fatema — Wedding Reception Invitation",
    text: "With hearts full of love and gratitude, the joyous families invite you to celebrate the wedding reception of Husain Kanchwala & Fatema Matkawala on Sunday, 22nd November 2026 at Shakuntala Farms.",
    url: typeof window !== "undefined" ? window.location.href : "https://husain-fatema.invitingyou.top/22-nov.html",
  },
};

// Default export for backwards compatibility
export const wedding = weddingBoth;

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
