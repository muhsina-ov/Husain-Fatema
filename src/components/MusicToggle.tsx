import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { wedding } from "../config";

export default function MusicToggle({ autoPlay = false }: { autoPlay?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(wedding.music.audioUrl);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    if (autoPlay) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay may be blocked by browser policy until user interacts
        setIsPlaying(false);
      });
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [autoPlay]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.log("Audio play error:", e));
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <motion.button
        type="button"
        onClick={toggleMusic}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-full border border-[#1a1814]/15 bg-[#fffaf4]/90 px-3.5 py-2 text-[11px] font-medium tracking-[0.16em] text-[#3d342c] shadow-[0_8px_24px_rgba(40,30,20,0.12)] backdrop-blur-md transition-colors hover:bg-white"
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
      >
        {isPlaying ? (
          <>
            <Volume2 size={15} className="text-[#8a7a68] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Music On</span>
          </>
        ) : (
          <>
            <VolumeX size={15} className="text-[#8a7a68]" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Music Off</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
