import { motion } from "framer-motion";
import { CalendarPlus, Download } from "lucide-react";
import Reveal, { ParallaxBlock } from "../components/Reveal";
import { useLocalTilt } from "../hooks/useParallax";
import {
  wedding,
  createGoogleCalendarUrl,
  downloadEventICS,
} from "../config";
import type { WeddingEvent } from "../config";

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const { ref, style } = useLocalTilt(6);

  return (
    <motion.div
      ref={ref}
      style={style}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[2rem] bg-[#fffaf4]/70 px-6 pb-10 pt-12 text-center shadow-[0_30px_80px_rgba(60,45,30,0.08)] ring-1 ring-[rgba(26,24,20,0.08)]"
    >
      <div className="pointer-events-none absolute inset-3 rounded-[1.55rem] ring-1 ring-[rgba(26,24,20,0.06)]" />

      {/* Soft light sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ animation: "dress-shimmer 4.5s ease-in-out infinite" }}
      />

      <p className="text-[11px] uppercase tracking-[0.4em] text-[#8a7a68]">
        {event.dayLabel}
      </p>

      <motion.p
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 * index, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-2 font-display text-8xl font-medium leading-none text-[#1a1814]"
      >
        {event.dayNum}
      </motion.p>

      <p className="mt-2 font-display text-xl tracking-[0.18em] text-[#4a4036]">
        {event.monthLabel}
      </p>

      <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-[#8a7a68]">
        {event.hijriDate}
      </p>

      <div className="mx-auto mt-6 h-px w-20 bg-[#1a1814]/15" />

      <h3 className="mt-6 font-display text-2xl font-medium text-[#1a1814]">
        {event.name}
      </h3>

      <p className="mt-2 font-display text-lg text-[#3d342c]">{event.time}</p>

      <p className="mt-1 text-sm tracking-wide text-[#5c5146]">{event.venue}</p>

      <p className="mx-auto mt-4 max-w-xs font-display text-base italic leading-relaxed text-[#6e6256]">
        {event.note}
      </p>

      {/* Calendar Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <motion.a
          href={createGoogleCalendarUrl(
            event.name,
            event.dateISO,
            event.venue,
            event.time
          )}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#1a1814]/12 bg-white/50 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] text-[#2c261f] transition-colors duration-500 hover:border-[#1a1814]/25 hover:bg-white/80"
        >
          <CalendarPlus size={14} className="text-[#8a7a68]" />
          Add to Google
        </motion.a>

        <motion.button
          type="button"
          onClick={() =>
            downloadEventICS(event.name, event.dateISO, event.venue, event.time)
          }
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#1a1814]/12 bg-white/50 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] text-[#2c261f] transition-colors duration-500 hover:border-[#1a1814]/25 hover:bg-white/80"
        >
          <Download size={14} className="text-[#8a7a68]" />
          Save .ICS
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Events() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <ParallaxBlock
        speed={0.18}
        className="pointer-events-none absolute -left-10 top-24 opacity-[0.06]"
      >
        <img
          src="/assets/layers/layer-couple.png"
          alt=""
          className="w-56 -scale-x-100 sm:w-72"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </ParallaxBlock>

      <Reveal className="mb-14 flex flex-col items-center gap-3 text-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#8a7a68]">
          The celebrations
        </span>
        <h2 className="font-script text-5xl text-[#1a1814] sm:text-6xl">
          Wedding Events
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#1a1814]/25 to-transparent" />
      </Reveal>

      <div className="relative mx-auto max-w-lg space-y-10">
        {wedding.events.map((event, index) => (
          <Reveal key={event.id} delay={index * 0.12}>
            <EventCard event={event} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
