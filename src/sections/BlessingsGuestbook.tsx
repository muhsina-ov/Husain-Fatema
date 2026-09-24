import React, { useState, useEffect } from "react";
import { Heart, Send, Sparkles } from "lucide-react";
import { wedding } from "../config";

interface Blessing {
  id: string;
  name: string;
  message: string;
  date: string;
}

const DEFAULT_BLESSINGS: Blessing[] = [
  {
    id: "1",
    name: "Mulla Taher Bhai & Family",
    message: "May Allah bless your marriage with endless happiness, love, and prosperity. Baarakallahu Laka Wabaaraka Alayka!",
    date: "Just now",
  },
  {
    id: "2",
    name: "Zahra & Mustafa",
    message: "Heartiest congratulations to Husain & Fatema on this beautiful union! Wishing you a blessed life together.",
    date: "Today",
  },
];

export const BlessingsGuestbook: React.FC = () => {
  const [blessings, setBlessings] = useState<Blessing[]>(() => {
    const saved = localStorage.getItem("wedding_blessings");
    return saved ? JSON.parse(saved) : DEFAULT_BLESSINGS;
  });

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem("wedding_blessings", JSON.stringify(blessings));
  }, [blessings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newBlessing: Blessing = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: "Just now",
    };

    setBlessings([newBlessing, ...blessings]);
    setName("");
    setMessage("");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto space-y-10 text-center">
      {/* Section Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-cinzel text-[#dfac42] tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-[#fbe393]" />
          <span>VIRTUAL BLESSINGS &amp; DUA WALL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
          Send Your Blessings
        </h2>
        <p className="text-xs font-sans text-[#f5efeb]/80 max-w-md mx-auto">
          Share your heartfelt prayers and congratulations for {wedding.groom} &amp; {wedding.bride}.
        </p>
      </div>

      {/* Submission Form */}
      <form
        onSubmit={handleSubmit}
        className="glass-emerald-card gold-border-glow rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-2xl"
      >
        <div>
          <label className="block text-xs font-cinzel text-[#dfac42] tracking-wider uppercase mb-1">
            Your Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Uncle Shabbir & Family"
            className="w-full px-4 py-3 rounded-xl bg-[#041f17]/90 border border-[#dfac42]/40 text-white placeholder-gray-500 focus:outline-none focus:border-[#fbe393] text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-cinzel text-[#dfac42] tracking-wider uppercase mb-1">
            Your Blessing / Dua
          </label>
          <textarea
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="May Allah bless this beautiful union with eternal joy..."
            className="w-full px-4 py-3 rounded-xl bg-[#041f17]/90 border border-[#dfac42]/40 text-white placeholder-gray-500 focus:outline-none focus:border-[#fbe393] text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#dfac42] via-[#fbe393] to-[#c48c26] text-[#041f17] font-cinzel font-bold text-xs tracking-wider flex items-center justify-center gap-2 hover:brightness-110 shadow-lg transition-all"
        >
          <Send className="w-4 h-4 text-[#041f17]" />
          <span>SUBMIT BLESSING</span>
        </button>

        {isSubmitted && (
          <div className="p-3 rounded-xl bg-[#0e4839] border border-[#fbe393]/60 text-[#fbe393] text-xs text-center font-cinzel animate-pulse">
            Thank you! Your prayer has been posted on the wall.
          </div>
        )}
      </form>

      {/* Guest Blessings Cards Wall */}
      <div className="space-y-4 text-left">
        <h3 className="text-sm font-cinzel text-[#dfac42] tracking-widest uppercase text-center">
          WISHES &amp; PRAYERS ({blessings.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blessings.map((item) => (
            <div
              key={item.id}
              className="glass-emerald-card gold-border rounded-2xl p-5 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-white text-base">
                    {item.name}
                  </span>
                  <Heart className="w-3.5 h-3.5 fill-[#dfac42] text-[#dfac42]" />
                </div>
                <p className="text-xs font-sans text-[#f5efeb]/80 leading-relaxed italic">
                  "{item.message}"
                </p>
              </div>
              <span className="text-[10px] font-cinzel text-[#dfac42]/70 pt-2 border-t border-[#dfac42]/20">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
