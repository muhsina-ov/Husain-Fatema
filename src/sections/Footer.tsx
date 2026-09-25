import Reveal, { ParallaxBlock } from "../components/Reveal";
import { wedding } from "../config";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pb-20 pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1a1814]/12 to-transparent" />

      {/* Soft couple silhouette fade */}
      <ParallaxBlock
        speed={0.15}
        className="pointer-events-none absolute inset-x-0 bottom-0 top-8 opacity-[0.06]"
      >
        <img
          src="/assets/layers/layer-couple.png"
          alt=""
          className="mx-auto h-full max-w-md object-contain object-bottom"
        />
      </ParallaxBlock>

      <div className="relative z-10 mb-10 overflow-hidden py-3">
        <div
          className="flex w-max whitespace-nowrap"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {[0, 1].map((n) => (
            <span
              key={n}
              className="font-display px-4 text-sm uppercase tracking-[0.36em] text-[#8a7a68]"
            >
              {Array(4)
                .fill(`${wedding.groom} & ${wedding.bride}  ·  ${wedding.dateLabel}  ·  `)
                .join("")}
            </span>
          ))}
        </div>
      </div>

      <Reveal className="relative z-10 mx-auto flex max-w-sm flex-col items-center gap-4 text-center">
        <p className="font-script text-4xl leading-snug text-[#1a1814] sm:text-5xl">
          We can't wait to celebrate with you
        </p>
        <p className="text-[11px] uppercase tracking-[0.32em] text-[#7a6d60]">
          With love, the Kanchwala & Matkawala families
        </p>
        <div className="h-px w-28 bg-[#1a1814]/15 my-2" />
        <p className="font-display text-xs italic text-[#8a7a68]">
          Blessings & Duas Always
        </p>
      </Reveal>
    </footer>
  );
}
