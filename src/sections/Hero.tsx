import { useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { layerTransform, useParallax } from "../hooks/useParallax";
import { CursorGlow } from "../components/FloatingPetals";
import { wedding } from "../config";

const SPARKS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: 6 + ((i * 39) % 88),
  top: 10 + ((i * 57) % 76),
  size: 1.5 + (i % 5) * 0.8,
  delay: (i % 8) * 0.3,
  duration: 2.5 + (i % 6) * 0.45,
}));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const point = useParallax(true);
  const [shimmer, setShimmer] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const artY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), {
    stiffness: 90,
    damping: 26,
  });
  const artScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.94]), {
    stiffness: 90,
    damping: 26,
  });
  const artOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), {
    stiffness: 90,
    damping: 26,
  });
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const vignette = useTransform(scrollYProgress, [0, 1], [0.35, 0.85]);
  const vignetteBg = useMotionTemplate`linear-gradient(to bottom, rgba(243,237,227,${vignette}), transparent 45%, rgba(243,237,227,0.98))`;

  const layers = useMemo(
    () => ({
      bg: layerTransform(point, 0.08, { scale: 1.08, scrollY: 0.3 }),
      glow: layerTransform(point, 0.2, { scrollY: 0.2 }),
      frame: layerTransform(point, 0.45, { scrollY: 0.55 }),
      sparks: layerTransform(point, 1.2, { scrollY: 0.9 }),
      title: layerTransform(point, 0.15, { invert: true, scrollY: -0.15 }),
    }),
    [point]
  );

  const sparkBoost = 0.55 + point.velocity * 0.9;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[115dvh] flex-col overflow-hidden"
      onPointerEnter={() => setShimmer(true)}
      onPointerLeave={() => setShimmer(false)}
    >
      {/* Full-bleed cream wash */}
      <div className="pointer-events-none absolute inset-0 bg-[#f3ede3]" />
      <div
        className="pointer-events-none absolute inset-[-10%] will-change-transform"
        style={layers.bg}
      >
        <img
          src="/assets/layers/layer-01-background.png"
          alt=""
          className="h-full w-full object-cover opacity-85"
          draggable={false}
        />
      </div>

      <CursorGlow x={point.x} y={point.y} />

      {/* Centered art stage with Customer Requested Image */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-6 top-[28%] z-[2] mx-auto flex w-full max-w-[420px] items-center justify-center px-4"
        style={{ y: artY, scale: artScale, opacity: artOpacity }}
      >
        {/* Soft atmospheric halo */}
        <div className="absolute inset-0 will-change-transform" style={layers.glow}>
          <div
            className="absolute left-1/2 top-[45%] h-[75%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(243,237,227,0.3) 50%, transparent 75%)",
              animation: "halo-breathe 6s ease-in-out infinite",
            }}
          />
        </div>

        {/* Elegant Arch Framed Photo */}
        <motion.div
          className="relative z-[2] will-change-transform"
          style={layers.frame}
          initial={{ opacity: 0, y: 36, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Arched Photo Card */}
          <div className="relative mx-auto h-[380px] w-[260px] sm:h-[430px] sm:w-[290px] overflow-hidden rounded-t-[140px] rounded-b-[28px] border-[3px] border-[#fffdfa] bg-[#fffaf4] shadow-[0_28px_60px_rgba(60,45,30,0.18)] ring-1 ring-[#b8860b]/25">
            <img
              src="/assets/hero-ring.jpg"
              alt="Husain and Fatema"
              className="h-full w-full object-cover object-center"
              draggable={false}
            />

            {/* Inner gold decorative arch line */}
            <div className="pointer-events-none absolute inset-2 rounded-t-[130px] rounded-b-[20px] border border-[#d4af37]/30" />

            {/* Soft bottom vignette overlay */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1a1814]/40 via-transparent to-transparent" />

            {/* Subtle light sweep */}
            <div
              className={`pointer-events-none absolute inset-0 overflow-hidden ${
                shimmer ? "opacity-100" : "opacity-35"
              }`}
            >
              <span
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{ animation: "dress-shimmer 4.5s ease-in-out infinite" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Floating sequin sparkles */}
        <div
          className="absolute inset-0 z-[4] will-change-transform pointer-events-none"
          style={layers.sparks}
          aria-hidden
        >
          {SPARKS.map((s) => (
            <span
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                opacity: sparkBoost,
                boxShadow: `0 0 ${6 + point.velocity * 10}px rgba(255,255,255,${0.7 + point.velocity * 0.3})`,
                animation: `sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Soft vignette that deepens on scroll */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{ background: vignetteBg }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-32 bg-gradient-to-b from-[#f3ede3] to-transparent" />

      {/* Typography */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col items-center px-6 pt-[min(8svh,4.5rem)] text-center"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div
          className="flex w-full flex-col items-center will-change-transform"
          style={layers.title}
        >
          <motion.p
            initial={{ opacity: 0, y: 12, letterSpacing: "0.55em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.42em" }}
            transition={{ delay: 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[11px] uppercase text-[#6e6256]"
          >
            Together with their families
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-script leading-[0.95] text-[#1a1814]"
            style={{ fontSize: "clamp(3.4rem, 14vw, 5.4rem)" }}
          >
            <motion.span
              className="inline-block"
              whileHover={{ y: -3, transition: { duration: 0.35 } }}
            >
              {wedding.groom}
            </motion.span>
            <span className="mx-2 inline-block font-script text-[0.55em] text-[#8a7a68]">
              &
            </span>
            <motion.span
              className="inline-block"
              whileHover={{ y: -3, transition: { duration: 0.35 } }}
            >
              {wedding.bride}
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 h-px w-28 origin-center bg-gradient-to-r from-transparent via-[#1a1814]/35 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="mt-3 font-display text-lg tracking-wide text-[#3d342c] sm:text-xl"
          >
            {wedding.dateLabel}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="mt-1 text-[11px] uppercase tracking-[0.32em] text-[#7a6d60]"
          >
            Wedding Ceremony
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={() =>
          window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" })
        }
        className="relative z-10 mb-8 flex flex-col items-center gap-2 text-[#7a6d60] transition-colors hover:text-[#1a1814]"
        aria-label="Scroll to invitation details"
      >
        <span className="text-[10px] uppercase tracking-[0.38em]">Scroll</span>
        <span
          className="block h-8 w-px bg-gradient-to-b from-[#1a1814]/45 to-transparent"
          style={{ animation: "scroll-pulse 2.2s ease-in-out infinite" }}
        />
      </motion.button>
    </section>
  );
}
