import { useState } from "react";
import { Navigation, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { useLocalTilt } from "../hooks/useParallax";
import {
  wedding,
  getMapsEmbedUrl,
  getMapsDirectionsUrl,
} from "../config";

export default function Venue() {
  const [activeVenueIndex, setActiveVenueIndex] = useState(0);
  const activeVenue = wedding.venues[activeVenueIndex];
  const mapTilt = useLocalTilt(4);

  return (
    <section className="relative px-6 py-24">
      <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#8a7a68]">
          Where & When
        </span>
        <h2 className="font-script text-5xl text-[#1a1814] sm:text-6xl">
          The Venues
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#1a1814]/25 to-transparent" />
      </Reveal>

      {/* Venue Switcher Tabs */}
      <div className="mx-auto mb-8 flex max-w-sm justify-center gap-2 rounded-full bg-[#1a1814]/5 p-1.5 ring-1 ring-[rgba(26,24,20,0.06)]">
        {wedding.venues.map((v, i) => (
          <button
            key={v.name}
            type="button"
            onClick={() => setActiveVenueIndex(i)}
            className={`flex-1 rounded-full px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
              activeVenueIndex === i
                ? "bg-white text-[#1a1814] shadow-sm"
                : "text-[#7a6d60] hover:text-[#1a1814]"
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>

      <div className="mx-auto flex max-w-md flex-col gap-6">
        <Reveal key={activeVenue.name} className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[#9d7b42]">
            {activeVenue.event} · {activeVenue.date}
          </p>
          <h3 className="font-display text-3xl font-medium text-[#1a1814]">
            {activeVenue.name}
          </h3>
          <p className="flex items-center gap-1.5 text-[13px] text-[#5c5146]">
            <MapPin size={14} className="text-[#8a7a68]" />
            {activeVenue.mapsQuery}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <motion.div
            ref={mapTilt.ref}
            style={mapTilt.style}
            className="overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_rgba(60,45,30,0.1)] ring-1 ring-[rgba(26,24,20,0.1)]"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <iframe
              key={activeVenue.mapsQuery}
              title={`${activeVenue.name} Map`}
              src={getMapsEmbedUrl(activeVenue.mapsQuery)}
              className="h-64 w-full saturate-[0.85] contrast-[1.02] sm:h-72"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </Reveal>

        <Reveal delay={0.12} className="grid grid-cols-1 gap-3">
          <motion.a
            href={getMapsDirectionsUrl(activeVenue.mapsQuery)}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#1a1814] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#f6f0e6] shadow-[0_14px_36px_rgba(40,30,20,0.22)]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              style={{ animation: "sweep 3.6s ease-in-out infinite" }}
            />
            <Navigation size={15} />
            Get directions to {activeVenue.name}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-px">
              ↗
            </span>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
