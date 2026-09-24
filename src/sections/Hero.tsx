import React from "react";
import { motion } from "framer-motion";
import { wedding } from "../config";
import { Calendar, Heart, Sparkles } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] py-12 px-4 flex flex-col items-center justify-center text-center bg-[#F5EFEB] text-[#2A221E] overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#D4AF37]/10 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-xl mx-auto space-y-6"
      >
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full card-ivory border border-[#D4AF37]/50 text-xs font-cinzel tracking-widest text-[#B8860B] uppercase shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B] animate-pulse" />
          <span>IN THE NAME OF ALLAH, THE MOST GRACIOUS, THE MOST MERCIFUL</span>
        </div>

        {/* Bismillah Calligraphy */}
        <div className="text-2xl sm:text-3xl font-arabic text-[#B8860B] tracking-wide pt-2 animate-pulse-glow">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>

        {/* Subtext */}
        <p className="text-xs font-cinzel tracking-widest text-[#8B6508] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{wedding.verse.subtext}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </p>

        {/* Single Clean Artwork Frame - Option B Image with Spring Scale */}
        <motion.div
          whileHover={{ scale: 1.02, rotate: 0.5 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative mx-auto w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]/60 p-2 bg-white/90"
        >
          <img
            src="/assets/layers/option-b.jpg"
            alt="Husain Kanchwala and Fatema Matkawala Wedding Artwork Option B"
            className="w-full h-full object-cover rounded-2xl"
          />
        </motion.div>

        {/* Bride, Groom & Parent Details Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-ivory border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl max-w-md mx-auto relative overflow-hidden"
        >
          {/* Subtle Top Gold Highlight Line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

          <p className="text-xs font-cinzel text-[#8B6508] tracking-widest uppercase">
            INVITE YOU TO CELEBRATE THE WEDDING CEREMONY OF
          </p>

          {/* Groom Block */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A221E] tracking-wide shimmer-text">
              {wedding.groomFull}
            </h1>
            <p className="text-xs font-cinzel text-[#8B6508] tracking-wider uppercase">
              {wedding.groomParents}
            </p>
          </div>

          <div className="text-base font-cinzel font-bold text-[#B8860B] tracking-widest my-1 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
            &amp;
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          {/* Bride Block */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A221E] tracking-wide shimmer-text">
              {wedding.brideFull}
            </h1>
            <p className="text-xs font-cinzel text-[#8B6508] tracking-wider uppercase">
              {wedding.brideParents}
            </p>
          </div>

          {/* Date Callout */}
          <div className="pt-3 border-t border-[#D4AF37]/30">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5EFEB] border border-[#D4AF37] text-xs font-cinzel font-semibold text-[#B8860B] tracking-wider shadow-sm hover:border-[#8B6508] transition-colors">
              <Calendar className="w-4 h-4 text-[#B8860B]" />
              <span>1st, 21st &amp; 22nd NOVEMBER 2026</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
