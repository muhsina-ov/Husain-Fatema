import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "../config";
import { Sparkles, Heart } from "lucide-react";

interface IntroGateProps {
  onOpening?: () => void;
  onOpened?: () => void;
}

export const IntroGate: React.FC<IntroGateProps> = ({ onOpening, onOpened }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);

  const handleOpen = () => {
    if (isOpening || isDestroyed) return;
    setIsOpening(true);
    if (onOpening) onOpening();

    setTimeout(() => {
      setIsDestroyed(true);
      if (onOpened) onOpened();
    }, 1300);
  };

  if (isDestroyed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none">
      {/* Left Sliding Curtain Door */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isOpening ? "-100%" : "0%" }}
        transition={{ duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
        className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#F5EFEB] border-r-2 border-[#D4AF37] shadow-2xl z-20"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent opacity-70" />
      </motion.div>

      {/* Right Sliding Curtain Door */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isOpening ? "100%" : "0%" }}
        transition={{ duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#F5EFEB] border-l-2 border-[#D4AF37] shadow-2xl z-20"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent opacity-70" />
      </motion.div>

      {/* Central Royal Envelope Card & 3D Gold Wax Seal */}
      <motion.div
        initial={{ scale: 1, opacity: 1, y: 0 }}
        animate={{
          scale: isOpening ? 0.75 : 1,
          opacity: isOpening ? 0 : 1,
          y: isOpening ? -80 : 0,
        }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-30 w-full max-w-sm mx-4 p-8 card-ivory border-2 border-[#D4AF37] rounded-3xl text-center shadow-2xl flex flex-col items-center justify-center space-y-6 bg-white/95"
      >
        {/* Top Bismillah Calligraphy */}
        <div className="text-xl sm:text-2xl font-arabic text-[#B8860B] tracking-wide">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>

        <div className="space-y-1">
          <p className="text-[11px] font-cinzel tracking-widest text-[#8B6508] uppercase">
            YOU ARE CORDIALLY INVITED TO THE WEDDING CEREMONY OF
          </p>
          <h1 className="text-2xl font-serif font-bold text-[#2A221E] tracking-wide">
            {wedding.groomFull} <span className="text-[#B8860B]">&amp;</span> {wedding.brideFull}
          </h1>
        </div>

        {/* Interactive 3D Gold Wax Seal Stamp */}
        <button
          onClick={handleOpen}
          aria-label="Open Invitation"
          className="group relative w-24 h-24 rounded-full bg-gradient-to-br from-[#E6C665] via-[#D4AF37] to-[#8B6508] p-1 shadow-2xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
        >
          {/* Outer Glowing Pulsing Ring */}
          <div className="absolute -inset-2 rounded-full border-2 border-[#D4AF37]/60 animate-ping opacity-30 pointer-events-none" />

          {/* Inner Wax Seal Core */}
          <div className="w-full h-full rounded-full bg-[#8B6508] border-2 border-[#FBE393] flex flex-col items-center justify-center text-[#F5EFEB] shadow-inner relative overflow-hidden">
            <Sparkles className="w-4 h-4 text-[#FBE393] animate-pulse mb-0.5" />
            <span className="text-sm font-cinzel font-bold text-[#FBE393] tracking-widest">
              H &amp; F
            </span>
            <span className="text-[9px] font-cinzel text-[#FBE393]/90 uppercase tracking-widest mt-0.5">
              OPEN
            </span>
          </div>
        </button>

        <div className="space-y-1">
          <p className="text-xs font-cinzel font-semibold text-[#B8860B] tracking-widest uppercase flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 fill-[#B8860B] text-[#B8860B]" />
            TAP WAX SEAL TO UNROLL
            <Heart className="w-3 h-3 fill-[#B8860B] text-[#B8860B]" />
          </p>
          <p className="text-[10px] font-sans text-[#2A221E]/60 tracking-wider">
            1st, 21st &amp; 22nd November 2026
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroGate;
