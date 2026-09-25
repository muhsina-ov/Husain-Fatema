import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import Reveal from "../components/Reveal";
import { wedding } from "../config";

export default function RSVP() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [attendingEvents, setAttendingEvents] = useState("Both Events (21st & 22nd Nov)");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const message = `*Wedding RSVP — Husain & Fatema*%0A%0A` +
      `*Name:* ${encodeURIComponent(name.trim())}%0A` +
      `*Guests:* ${encodeURIComponent(guests)}%0A` +
      `*Attending:* ${encodeURIComponent(attendingEvents)}%0A` +
      (notes.trim() ? `*Message:* ${encodeURIComponent(notes.trim())}%0A` : "") +
      `%0AThank you!`;

    const whatsappUrl = `https://wa.me/${wedding.rsvp.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <section className="relative px-6 py-24">
      <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#8a7a68]">
          Kindly Respond
        </span>
        <h2 className="font-script text-5xl text-[#1a1814] sm:text-6xl">RSVP</h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#1a1814]/25 to-transparent" />
        <p className="max-w-md text-sm text-[#6e6256]">
          Please let us know if you will be celebrating with us by confirming your attendance.
        </p>
      </Reveal>

      <Reveal className="mx-auto max-w-md">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#fffaf4]/85 p-8 shadow-[0_30px_80px_rgba(60,45,30,0.08)] ring-1 ring-[rgba(26,24,20,0.08)] backdrop-blur-sm">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-8 text-center"
            >
              <CheckCircle2 className="h-12 w-12 text-[#9d7b42]" />
              <h3 className="font-display text-2xl text-[#1a1814]">Thank You!</h3>
              <p className="text-sm text-[#5c5146]">
                Your response has been prepared. We look forward to celebrating with you!
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[#8a7a68] underline"
              >
                Send another response
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.22em] text-[#6e6256]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-[#1a1814]/15 bg-white/60 px-4 py-3 text-sm text-[#1a1814] placeholder-[#a69888] outline-none transition-all focus:border-[#1a1814]/40 focus:bg-white focus:ring-1 focus:ring-[#1a1814]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-[11px] uppercase tracking-[0.22em] text-[#6e6256]">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full rounded-xl border border-[#1a1814]/15 bg-white/60 px-4 py-3 text-sm text-[#1a1814] outline-none transition-all focus:border-[#1a1814]/40 focus:bg-white focus:ring-1 focus:ring-[#1a1814]/20"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, "8+"].map((n) => (
                      <option key={n} value={n}>
                        {n} {Number(n) === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] uppercase tracking-[0.22em] text-[#6e6256]">
                    Attending
                  </label>
                  <select
                    value={attendingEvents}
                    onChange={(e) => setAttendingEvents(e.target.value)}
                    className="w-full rounded-xl border border-[#1a1814]/15 bg-white/60 px-3 py-3 text-xs text-[#1a1814] outline-none transition-all focus:border-[#1a1814]/40 focus:bg-white focus:ring-1 focus:ring-[#1a1814]/20"
                  >
                    <option value="Both Events (21st & 22nd Nov)">Both Events</option>
                    <option value="Khushi Ni Majlis (21st Nov)">Majlis (21st Nov)</option>
                    <option value="Wedding Reception (22nd Nov)">Reception (22nd Nov)</option>
                    <option value="Regretfully Decline">Unable to Attend</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.22em] text-[#6e6256]">
                  Warm Wishes / Note (Optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Send a message to Husain & Fatema..."
                  className="w-full resize-none rounded-xl border border-[#1a1814]/15 bg-white/60 px-4 py-3 text-sm text-[#1a1814] placeholder-[#a69888] outline-none transition-all focus:border-[#1a1814]/40 focus:bg-white focus:ring-1 focus:ring-[#1a1814]/20"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative mt-2 flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#1a1814] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#f6f0e6] shadow-[0_14px_36px_rgba(40,30,20,0.22)]"
              >
                <Send size={14} />
                Confirm via WhatsApp
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-out group-hover:translate-x-0.5">
                  →
                </span>
              </motion.button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
