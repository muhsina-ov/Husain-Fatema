import { motion } from "framer-motion";
import { CalendarPlus, Navigation, MapPin, Clock } from "lucide-react";
import Reveal, { ParallaxBlock } from "../components/Reveal";
import { useLocalTilt } from "../hooks/useParallax";
import {
  wedding,
  createGoogleCalendarUrl,
  downloadEventICS,
  getMapsDirectionsUrl,
  type WeddingEvent,
} from "../config";

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const { ref, style } = useLocalTilt(5);

  return (
    <motion.div
      ref={ref}
      style={style}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-[#fffaf4]/85 px-6 pb-8 pt-10 text-center shadow-[0_30px_80px_rgba(60,45,30,0.08)] ring-1 ring-[rgba(26,24,20,0.08)] backdrop-blur-sm"
    >
      <div className="pointer-events-none absolute inset-3 rounded-[1.55rem] ring-1 ring-[rgba(26,24,20,0.06)]" />

      {/* Top badges: Day + Islamic Hijri Date */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="rounded-full bg-[#1a1814]/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8a7a68]">
          {event.dayLabel}
        </span>
        <span className="rounded-full bg-[#9d7b42]/10 px-3 py-1 text-[10px] font-medium tracking-[0.15em] text-[#9d7b42]">
          {event.islamicDate}
        </span>
      </div>

      {/* Date display */}
      <motion.p
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 font-display text-7xl font-medium leading-none text-[#1a1814] sm:text-8xl"
      >
        {event.dayNum}
      </motion.p>
      <p className="mt-1 font-display text-lg tracking-[0.2em] text-[#4a4036] uppercase">
        {event.monthLabel}
      </p>

      <div className="mx-auto my-5 h-px w-20 bg-[#1a1814]/15" />

      {/* Event Title */}
      <h3 className="font-display text-2xl font-medium uppercase tracking-wide text-[#1a1814] sm:text-3xl">
        {event.name}
      </h3>

      {/* Timing details */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-[#2c261f]">
        <Clock size={15} className="text-[#9d7b42]" />
        <span>{event.time}</span>
      </div>

      {/* Venue */}
      <div className="mt-2 flex items-center justify-center gap-1.5 text-[13px] text-[#5c5146]">
        <MapPin size={14} className="text-[#8a7a68]" />
        <span>{event.venue}</span>
      </div>

      {event.note && (
        <p className="mx-auto mt-4 max-w-xs font-display text-sm italic leading-relaxed text-[#6e6256]">
          {event.note}
        </p>
      )}

      {/* Interactive CTA buttons */}
      <div className="mt-7 flex flex-col gap-2.5">
        <div className="grid grid-cols-2 gap-2">
          <motion.a
            href={createGoogleCalendarUrl(event)}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-1.5 rounded-full border border-[#1a1814]/15 bg-white/60 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2c261f] transition-all hover:bg-white hover:shadow-sm"
          >
            <CalendarPlus size={13} className="text-[#9d7b42]" />
            Google
          </motion.a>
          <motion.button
            type="button"
            onClick={() => downloadEventICS(event)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-1.5 rounded-full border border-[#1a1814]/15 bg-white/60 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2c261f] transition-all hover:bg-white hover:shadow-sm"
          >
            <CalendarPlus size={13} className="text-[#9d7b42]" />
            Save .ICS
          </motion.button>
        </div>

        <motion.a
          href={getMapsDirectionsUrl(event.mapsQuery)}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -1, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 rounded-full bg-[#1a1814] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#f6f0e6] shadow-sm transition-all hover:bg-[#2c261f]"
        >
          <Navigation size={12} />
          Directions to {event.venue}
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Events() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <ParallaxBlock
        speed={0.18}
        className="pointer-events-none absolute -left-10 top-24 opacity-[0.05]"
      >
        <img
          src="/assets/layers/layer-couple.png"
          alt=""
          className="w-56 -scale-x-100 sm:w-72"
        />
      </ParallaxBlock>

      <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#8a7a68]">
          The Itinerary
        </span>
        <h2 className="font-script text-5xl text-[#1a1814] sm:text-6xl">
          Events & Celebrations
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#1a1814]/25 to-transparent" />
      </Reveal>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {wedding.events.map((ev, index) => (
          <Reveal key={ev.id} delay={index * 0.1}>
            <EventCard event={ev} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
