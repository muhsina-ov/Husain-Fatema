import React from "react";

export const GoldArchArtwork: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full max-w-md mx-auto aspect-[3/4] overflow-hidden rounded-3xl glass-emerald-card gold-border-glow p-6 flex flex-col items-center justify-between text-center select-none ${className}`}>
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e4839]/60 via-[#062c22]/80 to-[#031812] pointer-events-none" />

      {/* SVG Decorative Arch Frame */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none p-3"
        viewBox="0 0 300 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff3ca" />
            <stop offset="30%" stopColor="#fbe393" />
            <stop offset="70%" stopColor="#dfac42" />
            <stop offset="100%" stopColor="#9a6e14" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Arch Border */}
        <path
          d="M 20 380 L 20 140 C 20 60 75 20 150 20 C 225 20 280 60 280 140 L 280 380 Z"
          stroke="url(#goldGrad)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#glow)"
        />

        {/* Inner Arch Border */}
        <path
          d="M 28 380 L 28 142 C 28 68 80 28 150 28 C 220 28 272 68 272 142 L 272 380 Z"
          stroke="url(#goldGrad)"
          strokeWidth="1"
          strokeDasharray="4 3"
          fill="none"
          opacity="0.8"
        />

        {/* Keyhole Arch Crest Pattern */}
        <path
          d="M 150 20 C 135 45 120 60 150 90 C 180 60 165 45 150 20 Z"
          fill="url(#goldGrad)"
          opacity="0.9"
        />

        {/* Hanging Lantern Left */}
        <g className="animate-float-lantern" style={{ transformOrigin: "60px 40px" }}>
          <line x1="60" y1="20" x2="60" y2="70" stroke="url(#goldGrad)" strokeWidth="1" />
          <polygon points="60,70 54,80 66,80" fill="url(#goldGrad)" />
          <rect x="54" y="80" width="12" height="18" rx="2" fill="url(#goldGrad)" opacity="0.85" />
          <circle cx="60" cy="89" r="4" fill="#fff3ca" className="animate-pulse" />
          <polygon points="60,105 54,98 66,98" fill="url(#goldGrad)" />
        </g>

        {/* Hanging Lantern Right */}
        <g className="animate-float-lantern" style={{ animationDelay: "1.5s", transformOrigin: "240px 40px" }}>
          <line x1="240" y1="20" x2="240" y2="70" stroke="url(#goldGrad)" strokeWidth="1" />
          <polygon points="240,70 234,80 246,80" fill="url(#goldGrad)" />
          <rect x="234" y="80" width="12" height="18" rx="2" fill="url(#goldGrad)" opacity="0.85" />
          <circle cx="240" cy="89" r="4" fill="#fff3ca" className="animate-pulse" />
          <polygon points="240,105 234,98 246,98" fill="url(#goldGrad)" />
        </g>

        {/* Bottom Arabesque Corner Ornaments */}
        <path d="M 20 340 Q 50 340 50 380" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" />
        <path d="M 280 340 Q 250 340 250 380" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Content Inside Arch */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center space-y-4 px-4 py-8">
        {/* Bismillah Calligraphy */}
        <div className="text-xl sm:text-2xl font-arabic text-[#fbe393] animate-pulse-glow tracking-wide">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>

        {/* Monogram Crest */}
        <div className="relative w-20 h-20 rounded-full glass-emerald-card gold-border-glow flex items-center justify-center my-2 shadow-2xl">
          <div className="text-2xl font-cinzel font-bold gold-text-gradient tracking-widest">
            H &amp; F
          </div>
          <div className="absolute -bottom-1 text-[9px] font-cinzel text-[#fbe393] uppercase tracking-widest bg-[#041f17] px-2 py-0.5 rounded-full border border-[#dfac42]/40 whitespace-nowrap">
            WEDDING CEREMONY
          </div>
        </div>

        {/* Couple Names */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            Husain Kanchwala
          </h2>
          <div className="text-xs font-cinzel text-[#dfac42] tracking-widest uppercase flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#dfac42]" />
            WEDS
            <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#dfac42]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            Fatema Matkawala
          </h2>
        </div>

        {/* Date Callout */}
        <div className="pt-2 text-xs font-sans font-medium text-[#fbe393]/90 tracking-wider uppercase border-t border-[#dfac42]/30 px-6">
          1st, 21st &amp; 22nd November 2026
        </div>
      </div>

      {/* Subtle Bottom Watermark */}
      <div className="relative z-10 text-[10px] font-cinzel text-[#dfac42]/70 tracking-widest uppercase">
        SOLICIT YOUR DUA &amp; PRESENCE
      </div>
    </div>
  );
};
