import { motion } from "framer-motion";
import { ExternalLink, ClipboardCheck, Users, HeartHandshake } from "lucide-react";
import Reveal from "../components/Reveal";
import { wedding as defaultWedding } from "../config";
import type { WeddingConfig } from "../config";

export default function RSVP({
  config = defaultWedding,
}: {
  config?: WeddingConfig;
}) {
  const formUrl = config.rsvp.googleFormUrl || "https://docs.google.com/forms/d/1mheMXkFOmHK3tfDxTBOMpRbceGBXfTAGhiXQ7tj8gKE/viewform";

  return (
    <section id="rsvp" className="relative px-6 py-24">
      <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#8a7a68]">
          Attendance
        </span>
        <h2 className="font-script text-5xl text-[#1a1814] sm:text-6xl">
          Kindly RSVP
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#1a1814]/25 to-transparent" />
        <p className="mt-2 max-w-md font-display text-base italic leading-relaxed text-[#6e6256]">
          We would be honored by your gracious presence and heartfelt prayers as we celebrate.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mx-auto max-w-md">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#fffaf4]/85 p-8 sm:p-11 shadow-[0_30px_80px_rgba(60,45,30,0.08)] ring-1 ring-[rgba(26,24,20,0.08)] text-center">
          <div className="pointer-events-none absolute inset-3 rounded-[1.55rem] ring-1 ring-[rgba(26,24,20,0.06)]" />

          {/* Gentle top crest icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#1a1814]/5 text-[#8a7a68]">
            <ClipboardCheck size={26} className="text-[#8a7a68]" />
          </div>

          <h3 className="font-display text-2xl text-[#1a1814]">
            Confirm Your Presence
          </h3>

          <p className="mt-3 font-display text-base leading-relaxed text-[#5c5146]">
            Please fill out our official RSVP form so we may warmly prepare for your attendance, track guest counts, and receive your precious wishes.
          </p>

          {/* Feature Highlights */}
          <div className="mt-7 grid grid-cols-2 gap-3 text-left">
            <div className="flex items-center gap-2.5 rounded-xl border border-[#1a1814]/10 bg-white/60 p-3">
              <Users size={16} className="text-[#8a7a68] shrink-0" />
              <div className="text-[11px] leading-tight text-[#4a4036]">
                <span className="font-medium block text-[#1a1814]">Guest Count</span>
                Easily updated
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-[#1a1814]/10 bg-white/60 p-3">
              <HeartHandshake size={16} className="text-[#8a7a68] shrink-0" />
              <div className="text-[11px] leading-tight text-[#4a4036]">
                <span className="font-medium block text-[#1a1814]">Warm Wishes</span>
                Directly received
              </div>
            </div>
          </div>

          {/* Primary Action Button to Google Form */}
          <div className="mt-8 space-y-3">
            <motion.a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#1a1814] py-4 px-6 text-[11px] font-medium uppercase tracking-[0.25em] text-[#f6f0e6] shadow-[0_14px_36px_rgba(40,30,20,0.2)] transition-colors hover:bg-[#2c261f]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{ animation: "sweep 3.6s ease-in-out infinite" }}
              />
              <span>Fill RSVP Form</span>
              <ExternalLink size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>

            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a7a68]">
              Opens in Google Forms · Quick &amp; Simple
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
