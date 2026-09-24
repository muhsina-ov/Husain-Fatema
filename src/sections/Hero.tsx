import React from "react";
import { wedding } from "../config";
import { Calendar, Heart } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] py-12 px-4 flex flex-col items-center justify-center text-center bg-[#F5EFEB] text-[#2A221E]">
      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full card-ivory border border-[#D4AF37]/50 text-xs font-cinzel tracking-widest text-[#B8860B] uppercase shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
          <span>IN THE NAME OF ALLAH, THE MOST GRACIOUS, THE MOST MERCIFUL</span>
        </div>

        {/* Bismillah Calligraphy */}
        <div className="text-2xl sm:text-3xl font-arabic text-[#B8860B] tracking-wide pt-2">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>

        {/* Subtext */}
        <p className="text-xs font-cinzel tracking-widest text-[#8B6508] uppercase">
          {wedding.verse.subtext}
        </p>

        {/* Artwork Frame - Option B Image */}
        <div className="relative mx-auto w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]/50 p-2 bg-white/80">
          <img
            src="/assets/layers/option-b.jpg"
            alt="Husain Kanchwala and Fatema Matkawala Wedding Artwork Option B"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Bride, Groom & Parent Details Card */}
        <div className="card-ivory border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl max-w-md mx-auto">
          <p className="text-xs font-cinzel text-[#8B6508] tracking-widest uppercase">
            INVITE YOU TO CELEBRATE THE WEDDING CEREMONY OF
          </p>

          {/* Groom Block */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A221E] tracking-wide">
              {wedding.groomFull}
            </h1>
            <p className="text-xs font-cinzel text-[#8B6508] tracking-wider uppercase">
              {wedding.groomParents}
            </p>
          </div>

          <div className="text-base font-cinzel font-bold text-[#B8860B] tracking-widest my-1">
            &amp;
          </div>

          {/* Bride Block */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A221E] tracking-wide">
              {wedding.brideFull}
            </h1>
            <p className="text-xs font-cinzel text-[#8B6508] tracking-wider uppercase">
              {wedding.brideParents}
            </p>
          </div>

          {/* Date Callout */}
          <div className="pt-3 border-t border-[#D4AF37]/30">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5EFEB] border border-[#D4AF37] text-xs font-cinzel font-semibold text-[#B8860B] tracking-wider shadow-sm">
              <Calendar className="w-4 h-4 text-[#B8860B]" />
              <span>1st, 21st &amp; 22nd NOVEMBER 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
