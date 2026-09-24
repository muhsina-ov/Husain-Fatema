import React, { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
      {/* Floating Music Notes Animation when active */}
      {isPlaying && (
        <div className="pointer-events-none absolute -top-8 flex gap-3 text-xs text-[#B8860B] font-bold">
          <span className="animate-rise-note-1">♪</span>
          <span className="animate-rise-note-2">♫</span>
        </div>
      )}

      <audio
        ref={audioRef}
        loop
        src="https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3"
      />

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Mute Music" : "Play Music"}
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full card-ivory border-2 border-[#D4AF37] text-[#B8860B] hover:text-[#8B6508] transition-all transform hover:scale-105 shadow-2xl active:scale-95 cursor-pointer"
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-1 h-4">
              <span className="w-1 bg-[#B8860B] rounded-full animate-pulse" style={{ height: "14px" }} />
              <span className="w-1 bg-[#D4AF37] rounded-full animate-pulse" style={{ height: "8px", animationDelay: "0.2s" }} />
              <span className="w-1 bg-[#8B6508] rounded-full animate-pulse" style={{ height: "16px", animationDelay: "0.4s" }} />
            </div>
            <Volume2 className="w-4 h-4 text-[#B8860B] animate-pulse" />
            <span className="text-xs font-cinzel font-bold tracking-wider hidden sm:inline">MUSIC ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#8B6508]" />
            <span className="text-xs font-cinzel font-bold tracking-wider">MUSIC OFF</span>
          </>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
