import { motion } from "framer-motion";
import Reveal, { ParallaxBlock, Stagger, staggerItem } from "../components/Reveal";
import { wedding as defaultWedding } from "../config";
import type { WeddingConfig } from "../config";

export default function InviteMessage({
  config = defaultWedding,
}: {
  config?: WeddingConfig;
}) {
  const words = config.verse.text.split(" ");

  return (
    <section className="relative overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1a1814]/12 to-transparent" />

      {/* Soft floating bouquet watermark */}
      <ParallaxBlock
        speed={0.22}
        className="pointer-events-none absolute -right-8 top-10 opacity-[0.07] sm:right-8"
      >
        <img
          src="/assets/layers/layer-05-bouquet.png"
          alt=""
          className="w-40 rotate-12 sm:w-52"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </ParallaxBlock>

      <Reveal className="mx-auto flex max-w-lg flex-col items-center text-center">
        {/* Single Bismillah in Ivory Waltz style */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-lg leading-relaxed tracking-widest text-[#5c5146]"
        >
          {config.verse.arabic}
        </motion.p>

        {/* Syedna Muffadal Saifuddin TUS blessing - immediately after Bismillah */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-md font-display text-[12px] sm:text-[13px] uppercase tracking-[0.24em] text-[#6e6256] font-medium leading-relaxed"
        >
          {config.verse.blessing}
        </motion.p>

        {/* Elegant accent divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-px w-20 origin-center bg-gradient-to-r from-transparent via-[#1a1814]/30 to-transparent"
        />

        {/* Joyous families invitation paragraph */}
        <Stagger
          className="mt-8 flex flex-wrap justify-center gap-x-1.5 gap-y-1"
          stagger={0.03}
        >
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              variants={staggerItem}
              className="font-display text-[1.32rem] leading-[1.58] text-[#2c261f] sm:text-[1.48rem]"
            >
              {word}
            </motion.span>
          ))}
        </Stagger>

        {/* Parents Details */}
        <Stagger className="mt-12 flex flex-col gap-2" stagger={0.12}>
          <motion.p
            variants={staggerItem}
            className="text-[11px] uppercase tracking-[0.28em] text-[#7a6d60]"
          >
            {config.groomParents}
          </motion.p>
          <motion.p
            variants={staggerItem}
            className="text-[11px] uppercase tracking-[0.28em] text-[#7a6d60]"
          >
            {config.brideParents}
          </motion.p>
        </Stagger>
      </Reveal>
    </section>
  );
}
