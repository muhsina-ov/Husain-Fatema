import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { wedding } from "../config";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(wedding.dateISO).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-4 max-w-xl mx-auto text-center">
      <div className="card-ivory border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="inline-flex items-center gap-2 text-xs font-cinzel font-semibold tracking-widest text-[#B8860B] uppercase">
          <Clock className="w-4 h-4 text-[#B8860B]" />
          <span>COUNTDOWN TO THE CELEBRATION</span>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HOURS", value: timeLeft.hours },
            { label: "MINS", value: timeLeft.minutes },
            { label: "SECS", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/90 border border-[#D4AF37]/30 text-center shadow-sm"
            >
              <span className="text-2xl sm:text-4xl font-serif font-bold text-[#B8860B]">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-cinzel text-[#8B6508] tracking-wider mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs font-sans text-[#2A221E]/70 tracking-wide">
          21st November 2026 — 7:00 PM (Darees) &amp; 22nd November 2026 — 1:00 PM (Reception)
        </p>
      </div>
    </section>
  );
};

export default CountdownSection;
