import React, { useState } from "react";
import { Share2, Copy, Check, Heart } from "lucide-react";
import { wedding } from "../config";

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*Wedding Invitation*\n\nYou are cordially invited to celebrate the Wedding Ceremony of *${wedding.groomFull}* & *${wedding.brideFull}*.\n\n📅 *Khushi Ni Majlis / Shehre Ghaat:* 1st Nov (Ladies 7PM | Gents 8:30PM)\n📅 *Darees:* 21st Nov 7:00 PM\n📅 *Wedding Reception:* 22nd Nov 1:00 PM\n📍 *Venue:* Ezzy Masjid`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <footer className="py-16 px-4 border-t border-[#D4AF37]/30 text-center space-y-8 bg-[#F5EFEB] text-[#2A221E]">
      <div className="max-w-md mx-auto space-y-3">
        <div className="text-xl font-arabic text-[#B8860B] leading-relaxed">
          بَارَكَ ٱللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </div>
        <p className="text-xs font-serif italic text-[#8B6508]">
          "May Allah bless you and shower His blessings upon you and join you together in goodness."
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleShareWhatsApp}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-cinzel font-bold text-xs tracking-wider shadow-md transition-all active:scale-95"
        >
          <Share2 className="w-4 h-4" />
          <span>SHARE VIA WHATSAPP</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full card-ivory border border-[#D4AF37] text-[#B8860B] font-cinzel font-bold text-xs tracking-wider hover:bg-[#D4AF37]/10 transition-all active:scale-95"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-[#B8860B]" />}
          <span>{copied ? "LINK COPIED!" : "COPY INVITATION LINK"}</span>
        </button>
      </div>

      <div className="space-y-2 pt-6 border-t border-[#D4AF37]/20 max-w-sm mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-cinzel text-[#8B6508]">
          <span>WITH BLESSINGS &amp; BEST COMPLIMENTS</span>
          <Heart className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
        </div>
        <p className="text-[11px] font-sans text-[#2A221E]/70 uppercase tracking-widest font-semibold">
          MATKAWALA &amp; KANCHWALA FAMILIES
        </p>
      </div>
    </footer>
  );
};

export default Footer;
