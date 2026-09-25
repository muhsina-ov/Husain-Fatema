import { useMemo } from "react";

type Particle = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  opacity: number;
  rotate: number;
  isGoldSparkle: boolean;
};

export default function FloatingPetals({ count = 20 }: { count?: number }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 13 + 5) % 100,
        delay: (i % 7) * 0.8,
        duration: 9 + (i % 5) * 1.5,
        size: i % 3 === 0 ? 3 : 7 + (i % 4) * 2,
        drift: (i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 12),
        opacity: 0.25 + (i % 5) * 0.08,
        rotate: (i % 2 === 0 ? 1 : -1) * (30 + (i % 4) * 15),
        isGoldSparkle: i % 3 === 0,
      })),
    [count]
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[8] overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute top-[-5%] ${
            p.isGoldSparkle
              ? "rounded-full bg-gradient-to-r from-[#FFF3CA] via-[#D4AF37] to-[#8B6508] shadow-[0_0_8px_#D4AF37]"
              : "rounded-[40%_60%_55%_45%] bg-gradient-to-br from-[#E6C665]/60 to-[#8B6508]/40 border border-[#D4AF37]/30"
          }`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.isGoldSparkle ? p.size : p.size * 1.3,
            opacity: p.opacity,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            ["--drift" as string]: `${p.drift}px`,
            ["--spin" as string]: `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
