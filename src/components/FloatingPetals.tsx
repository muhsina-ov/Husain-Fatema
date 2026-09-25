import { useMemo } from "react";
import React from "react";

type Petal = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  opacity: number;
  rotate: number;
};

/** Soft falling petals / linen flecks for atmosphere */
export default function FloatingPetals({ count = 14 }: { count?: number }) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 17 + 7) % 100,
        delay: (i % 9) * 0.7,
        duration: 11 + (i % 6) * 1.4,
        size: 6 + (i % 5) * 2,
        drift: 18 + (i % 4) * 10,
        opacity: 0.18 + (i % 5) * 0.06,
        rotate: (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 12),
      })),
    [count]
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[8] overflow-hidden"
      aria-hidden
    >
      {petals.map((p) => {
        const style: React.CSSProperties & { [key: string]: string | number } = {
          left: `${p.left}%`,
          width: p.size,
          height: p.size * 1.35,
          opacity: p.opacity,
          animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
          "--drift": `${p.drift}px`,
          "--spin": `${p.rotate}deg`,
        };
        return (
          <span
            key={p.id}
            className="absolute top-[-10%] rounded-[40%_60%_55%_45%] bg-[#1a1814]"
            style={style}
          />
        );
      })}
    </div>
  );
}

/** Cursor-following soft light orb in the hero */
export function CursorGlow({
  x,
  y,
}: {
  x: number;
  y: number;
}) {
  return (
    <div
      className="pointer-events-none absolute z-[6] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-transform duration-300 ease-out"
      aria-hidden
      style={{
        left: `${50 + x * 28}%`,
        top: `${42 + y * 22}%`,
        background:
          "radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,248,236,0.12) 45%, transparent 70%)",
      }}
    />
  );
}
