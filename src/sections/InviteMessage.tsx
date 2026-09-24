import { motion } from "framer-motion";
import Reveal, { ParallaxBlock, Stagger, staggerItem } from "../components/Reveal";
import { wedding } from "../config";

export default function InviteMessage() {
  const verseWords = "With soft hearts and grateful families, we invite you to witness our wedding celebrations — a quiet beginning, danced into forever.".split(" ");

  return (
    <section className="relative overflow-hidden px-6 py-20 bg-[#F5EFEB]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B8860B]/25 to-transparent" />

      {/* Floating bouquet watermark */}
      <ParallaxBlock speed={0.22} className="pointer-events-none absolute -right-8 top-10 opacity-[0.09] sm:right-8">
        <img
          src="/assets/layers/layer-05-bouquet.png"
          alt=""
          className="w-40 rotate-12 sm:w-52"
        />
      </ParallaxBlock>

      <Reveal className="mx-auto flex max-w-md flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl font-bold tracking-widest text-[#2A221E]"
        >
          {wedding.verse.arabic}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 h-px w-20 origin-center bg-[#B8860B]/40"
        />

        <Stagger className="mt-6 flex flex-wrap justify-center gap-x-1.5 gap-y-1" stagger={0.035}>
          {verseWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              variants={staggerItem}
              className="font-serif text-xl leading-[1.6] text-[#2A221E] sm:text-2xl"
            >
              {word}
            </motion.span>
          ))}
        </Stagger>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 font-serif text-xs uppercase tracking-[0.35em] text-[#916E32]"
        >
          Fatema Mustali Bhai Matkawala &amp; Husain Hatim Bhai Kanchwala
        </motion.p>
      </Reveal>
    </section>
  );
}
