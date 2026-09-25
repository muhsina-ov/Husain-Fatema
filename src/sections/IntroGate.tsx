import { useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "../config";

const ease: [number, number, number, number] = [0.65, 0, 0.35, 1];

export default function IntroGate({
  onOpening,
  onOpened,
}: {
  onOpening: () => void;
  onOpened: () => void;
}) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onOpening();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* Left paper panel */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
        style={{
          background:
            "linear-gradient(110deg, #efe6d8 0%, #f6f0e6 45%, #ebe2d4 100%)",
        }}
        animate={opening ? { x: "-105%" } : { x: 0 }}
        transition={{ duration: 1.35, delay: 0.25, ease }}
      >
        <div
          className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>

      {/* Right paper panel */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
        style={{
          background:
            "linear-gradient(250deg, #efe6d8 0%, #f6f0e6 45%, #ebe2d4 100%)",
        }}
        animate={opening ? { x: "105%" } : { x: 0 }}
        transition={{ duration: 1.35, delay: 0.25, ease }}
        onAnimationComplete={() => opening && onOpened()}
      >
        <div
          className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>

      {/* Vertical gold line seam */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#b8860b]/40 to-transparent"
        animate={opening ? { opacity: 0, scaleY: 0 } : { opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Soft light seam */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-16 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)",
          filter: "blur(8px)",
        }}
        initial={{ opacity: 0, scaleX: 0.15 }}
        animate={
          opening
            ? { opacity: [0, 1, 0], scaleX: [0.15, 1.4, 2.4] }
            : { opacity: 0.35, scaleX: 0.4 }
        }
        transition={{ duration: 1.35, delay: 0.25, ease }}
      />

      {/* Center Invitation Card */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        animate={
          opening
            ? { opacity: 0, scale: 0.94, filter: "blur(6px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.5 }}
      >
        <div className="relative mx-auto flex w-full max-w-sm flex-col items-center rounded-[2rem] bg-[#fffaf4]/90 px-7 py-9 shadow-[0_25px_70px_rgba(40,30,20,0.14)] ring-1 ring-[rgba(26,24,20,0.08)] backdrop-blur-md">
          {/* Bismillah calligraphy - exactly one here */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="font-display text-base text-[#9d7b42]"
          >
            {wedding.verse.arabic}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-4 text-[10px] uppercase tracking-[0.34em] text-[#7a6d60]"
          >
            You are cordially invited to the
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.8 }}
            className="mt-1 text-[11px] font-medium uppercase tracking-[0.28em] text-[#4a4036]"
          >
            Wedding Ceremony of
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display text-3xl font-medium tracking-wide text-[#1a1814] sm:text-4xl"
          >
            {wedding.groomFull}
            <span className="my-1 block font-script text-2xl font-normal text-[#9d7b42]">
              &
            </span>
            {wedding.brideFull}
          </motion.h2>

          {/* Interactive Wax Seal */}
          <motion.button
            type="button"
            onClick={handleOpen}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="group relative my-6 flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-full shadow-[0_12px_32px_rgba(157,123,66,0.35)] transition-all duration-300"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, #d4af37 0%, #b8860b 60%, #8b6508 100%)",
              border: "3px solid #f4e8c1",
            }}
            aria-label="Tap to open invitation"
          >
            {/* Wax texture details */}
            <span className="pointer-events-none absolute inset-1 rounded-full border border-yellow-200/40" />
            <span className="font-display text-sm font-semibold tracking-widest text-[#fff8eb] drop-shadow-sm">
              {wedding.monogram}
            </span>
            <span className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.24em] text-yellow-100">
              Open
            </span>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#9d7b42]"
          >
            <span>♥</span> Tap Wax Seal to Unroll <span>♥</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-2 text-[11px] tracking-wide text-[#7a6d60]"
          >
            21st & 22nd November 2026
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
