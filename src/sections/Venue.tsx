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
  const currentVenue = wedding.venues[activeVenueIndex];
  const mapTilt = useLocalTilt(5);

  return (
    <section className="relative px-6 py-24">
      <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#8a7a68]">
          Where &amp; when
        </span>
        <h2 className="font-script text-5xl text-[#1a1814] sm:text-6xl">
          The Venues
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#1a1814]/25 to-transparent" />
      </Reveal>

      {/* Venue Switcher Tabs */}
      <Reveal className="mx-auto mb-8 flex max-w-xs justify-center gap-2 rounded-full border border-[#1a1814]/10 bg-white/40 p-1.5 backdrop-blur-sm">
        {wedding.venues.map((venue, idx) => (
          <button
            key={venue.id}
            type="button"
            onClick={() => setActiveVenueIndex(idx)}
            className={`flex-1 rounded-full py-2 px-3 text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
              activeVenueIndex === idx
                ? "bg-[#1a1814] text-[#f6f0e6] shadow-sm font-medium"
                : "text-[#6e6256] hover:text-[#1a1814]"
            }`}
          >
            {venue.name}
          </button>
        ))}
      </Reveal>

      <div className="mx-auto flex max-w-md flex-col gap-6">
        <Reveal key={currentVenue.id} className="flex flex-col items-center gap-2 text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8a7a68]">
            {currentVenue.event}
          </span>
          <h3 className="font-display text-3xl text-[#1a1814]">
            {currentVenue.name}
          </h3>
          <a
            href={currentVenue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[13px] text-[#5c5146] hover:text-[#1a1814] transition-colors"
            title="Open location in Google Maps"
          >
            <MapPin size={14} className="text-[#8a7a68] group-hover:text-[#1a1814]" />
            <span className="underline-offset-2 group-hover:underline">{currentVenue.address}</span>
            <span className="text-[11px] text-[#8a7a68] transition-transform group-hover:translate-x-0.5">↗</span>
          </a>
          <p className="text-[11px] text-[#7a6d60] tracking-wide">
            {currentVenue.date} · {currentVenue.time}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <motion.div
            ref={mapTilt.ref}
            style={mapTilt.style}
            className="relative overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_rgba(60,45,30,0.1)] ring-1 ring-[rgba(26,24,20,0.1)]"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <iframe
              key={currentVenue.mapsQuery}
              title={`${currentVenue.name} map`}
              src={getMapsEmbedUrl(currentVenue.mapsQuery)}
              className="h-64 w-full saturate-[0.85] contrast-[1.02] sm:h-72"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={currentVenue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#1a1814] shadow-md backdrop-blur-sm hover:bg-white transition-colors"
            >
              <span>Open in Maps</span>
              <Navigation size={10} className="text-[#8a7a68]" />
            </a>
          </motion.div>
        </Reveal>

        <Reveal delay={0.12} className="grid grid-cols-1 gap-3">
          <motion.a
            href={currentVenue.mapsUrl || getMapsDirectionsUrl(currentVenue.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
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
            Get directions to {currentVenue.name}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-px">
              ↗
            </span>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
