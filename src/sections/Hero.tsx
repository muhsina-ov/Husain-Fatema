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

const SPARKS = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  left: 8 + ((i * 37) % 84),
  top: 12 + ((i * 53) % 72),
  size: 1.5 + (i % 5) * 0.7,
  delay: (i % 9) * 0.28,
  duration: 2.6 + (i % 6) * 0.4,
}));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const point = useParallax(true);
  const [shimmer, setShimmer] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const artY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 140]), {
    stiffness: 90,
    damping: 26,
  });
  const artScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.92]), {
    stiffness: 90,
    damping: 26,
  });
  const artOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -70]), {
    stiffness: 90,
    damping: 26,
  });
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const vignette = useTransform(scrollYProgress, [0, 1], [0.35, 0.85]);
  const vignetteBg = useMotionTemplate`linear-gradient(to bottom, rgba(243,237,227,${vignette}), transparent 40%, rgba(243,237,227,0.95))`;

  const layers = useMemo(
    () => ({
      bg: layerTransform(point, 0.1, { scale: 1.1, scrollY: 0.35 }),
      glow: layerTransform(point, 0.22, { scrollY: 0.2 }),
      shadows: layerTransform(point, 0.38, { scrollY: 0.55 }),
      couple: layerTransform(point, 0.62, { scrollY: 0.7 }),
      sparks: layerTransform(point, 1.35, { scrollY: 1.1 }),
      title: layerTransform(point, 0.18, { invert: true, scrollY: -0.2 }),
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
          className="h-full w-full object-cover opacity-90"
          draggable={false}
          onError={(e) => {
            // graceful fallback if direct path needed
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      <CursorGlow x={point.x} y={point.y} />

      {/* Centered art stage with customer reference artwork */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[16%] z-[1] mx-auto w-full max-w-[440px] sm:max-w-[480px]"
        style={{ y: artY, scale: artScale, opacity: artOpacity }}
      >
        {/* Soft breathing halo */}
        <div className="absolute inset-0 will-change-transform" style={layers.glow}>
          <div
            className="absolute left-1/2 top-[38%] h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.72) 0%, rgba(255,250,242,0.3) 42%, transparent 70%)",
              animation: "halo-breathe 5.5s ease-in-out infinite",
            }}
          />
        </div>

        {/* Soft ground shadows */}
        <div
          className="absolute inset-0 will-change-transform opacity-60 mix-blend-multiply"
          style={layers.shadows}
        >
          <img
            src="/assets/layers/layer-02-shadows.png"
            alt=""
            className="absolute bottom-0 left-1/2 h-[65%] w-auto max-w-none -translate-x-1/2 object-contain opacity-45"
            draggable={false}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Customer Ring Exchange Artwork in Soft Arch Cutout */}
        <motion.div
          className="absolute inset-0 z-[2] will-change-transform"
          style={layers.couple}
          initial={{ opacity: 0, y: 44, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute bottom-4 left-1/2 flex h-[90%] w-[86%] max-w-[380px] -translate-x-1/2 items-end justify-center">
            {/* Arched frame wrapper with soft drop shadow */}
            <div className="relative overflow-hidden rounded-t-[14rem] rounded-b-[2rem] shadow-[0_28px_60px_rgba(60,45,30,0.16)] ring-1 ring-[#1a1814]/10">
              <img
                src="/assets/hero-ring-arch.png"
                alt={`${wedding.groomFull} and ${wedding.brideFull}`}
                className="h-full w-full object-cover"
                style={{ animation: "waltz-sway-inner 7.5s ease-in-out infinite" }}
                draggable={false}
              />

              {/* Shimmer sweep effect */}
              <div
                className={`pointer-events-none absolute inset-0 overflow-hidden ${
                  shimmer ? "opacity-100" : "opacity-30"
                }`}
              >
                <span
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                  style={{ animation: "dress-shimmer 3.8s ease-in-out infinite" }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating bouquet watermark */}
        <motion.div
          className="absolute inset-0 z-[3] will-change-transform"
          style={layerTransform(point, 1.05, {
            rotate: 1.1,
            scale: 1.03 + point.velocity * 0.05,
            scrollY: 0.95,
          })}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/assets/layers/layer-05-bouquet.png"
            alt=""
            className="absolute bottom-[16%] right-[-2%] w-[28%] max-w-[120px] opacity-90 drop-shadow-[0_12px_24px_rgba(40,30,20,0.16)]"
            style={{ animation: "pearl-drift 5.8s ease-in-out infinite" }}
            draggable={false}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </motion.div>

        {/* Sequin sparkles — brighten with pointer velocity */}
        <div
          className="absolute inset-0 z-[4] will-change-transform"
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
                boxShadow: `0 0 ${6 + point.velocity * 10}px rgba(255,255,255,${
                  0.7 + point.velocity * 0.3
                })`,
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
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-36 bg-gradient-to-b from-[#f3ede3] to-transparent" />

      {/* Typography with opposite parallax */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col items-center px-6 pt-[min(10svh,5.5rem)] text-center"
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
            className="mt-4 font-script leading-[0.95] text-[#1a1814]"
            style={{ fontSize: "clamp(3.4rem, 14vw, 5.6rem)" }}
          >
            <motion.span
              className="inline-block"
              whileHover={{ y: -3, transition: { duration: 0.35 } }}
            >
              {wedding.groom}
            </motion.span>
            <span className="mx-2 inline-block font-script text-[0.55em] text-[#8a7a68]">
              &amp;
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
            className="mt-5 h-px w-28 origin-center bg-gradient-to-r from-transparent via-[#1a1814]/35 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="mt-4 font-display text-lg tracking-wide text-[#3d342c] sm:text-xl"
          >
            {wedding.dateLabel}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="mt-1 text-[11px] uppercase tracking-[0.32em] text-[#7a6d60]"
          >
            {wedding.timeLabel}
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
