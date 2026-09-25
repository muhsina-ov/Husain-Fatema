import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MessageCircle, Heart, Send } from "lucide-react";
import Reveal from "../components/Reveal";
import { wedding } from "../config";

export default function RSVP() {
  const [attending, setAttending] = useState<"yes" | "no" | null>("yes");
  const [name, setName] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    "Khushi Ni Majlis (21st Nov)",
    "Wedding Reception (22nd Nov)",
  ]);
  const [guestCount, setGuestCount] = useState("2");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleEvent = (eventName: string) => {
    if (selectedEvents.includes(eventName)) {
      if (selectedEvents.length > 1) {
        setSelectedEvents(selectedEvents.filter((e) => e !== eventName));
      }
    } else {
      setSelectedEvents([...selectedEvents, eventName]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitted(true);
  };

  const sendWhatsAppRSVP = () => {
    const text = attending === "yes"
      ? `Assalamu Alaikum! RSVP for ${wedding.groom} & ${wedding.bride}'s Wedding Ceremony:%0A%0A*Name:* ${name}%0A*Status:* Attending with Joy%0A*Guests:* ${guestCount}%0A*Events:* ${selectedEvents.join(", ")}${note ? `%0A*Wishes:* ${note}` : ""}`
      : `Assalamu Alaikum! RSVP for ${wedding.groom} & ${wedding.bride}'s Wedding Ceremony:%0A%0A*Name:* ${name}%0A*Status:* Regretfully Decline${note ? `%0A*Message:* ${note}` : ""}`;
    
    // WhatsApp URL using customer phone number or direct link
    window.open(`https://wa.me/917798349852?text=${text}`, "_blank");
  };

  return (
    <section id="rsvp" className="relative px-6 py-24">
      <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#8a7a68]">
          Attendance
        </span>
        <h2 className="font-script text-5xl text-[#1a1814] sm:text-6xl">
          Kindly RSVP
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#1a1814]/25 to-transparent" />
        <p className="mt-2 max-w-sm font-display text-base italic leading-relaxed text-[#6e6256]">
          We would be honored by your gracious presence and heartfelt prayers as we celebrate.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mx-auto max-w-md">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#fffaf4]/80 p-7 sm:p-10 shadow-[0_30px_80px_rgba(60,45,30,0.08)] ring-1 ring-[rgba(26,24,20,0.08)]">
          <div className="pointer-events-none absolute inset-3 rounded-[1.55rem] ring-1 ring-[rgba(26,24,20,0.06)]" />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Attendance Buttons */}
                <div>
                  <label className="block text-center text-[10px] uppercase tracking-[0.25em] text-[#7a6d60] mb-3">
                    Will you be attending?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending("yes")}
                      className={`flex items-center justify-center gap-2 rounded-full py-3 px-4 text-[11px] uppercase tracking-[0.16em] transition-all duration-300 ${
                        attending === "yes"
                          ? "bg-[#1a1814] text-[#f6f0e6] shadow-sm font-medium"
                          : "border border-[#1a1814]/15 bg-white/50 text-[#5c5146] hover:bg-white/80"
                      }`}
                    >
                      <Check size={14} className={attending === "yes" ? "opacity-100" : "opacity-0"} />
                      Attending
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending("no")}
                      className={`flex items-center justify-center gap-2 rounded-full py-3 px-4 text-[11px] uppercase tracking-[0.16em] transition-all duration-300 ${
                        attending === "no"
                          ? "bg-[#1a1814] text-[#f6f0e6] shadow-sm font-medium"
                          : "border border-[#1a1814]/15 bg-white/50 text-[#5c5146] hover:bg-white/80"
                      }`}
                    >
                      Declining
                    </button>
                  </div>
                </div>

                {/* Guest Name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.25em] text-[#7a6d60] mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-[#1a1814]/15 bg-white/60 px-4 py-3 font-display text-base text-[#1a1814] placeholder:text-[#a09485] focus:border-[#1a1814]/40 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                {attending === "yes" && (
                  <>
                    {/* Events Checkboxes */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-[#7a6d60] mb-2">
                        Events You Will Attend
                      </label>
                      <div className="space-y-2">
                        {[
                          "Khushi Ni Majlis (21st Nov)",
                          "Wedding Reception (22nd Nov)",
                        ].map((evt) => {
                          const isChecked = selectedEvents.includes(evt);
                          return (
                            <button
                              key={evt}
                              type="button"
                              onClick={() => toggleEvent(evt)}
                              className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-left text-xs transition-colors ${
                                isChecked
                                  ? "border-[#1a1814]/30 bg-white/80 text-[#1a1814]"
                                  : "border-[#1a1814]/10 bg-white/30 text-[#7a6d60]"
                              }`}
                            >
                              <span className="font-display text-sm tracking-wide">{evt}</span>
                              <span
                                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                                  isChecked
                                    ? "border-[#1a1814] bg-[#1a1814] text-white"
                                    : "border-[#1a1814]/25"
                                }`}
                              >
                                {isChecked && <Check size={10} />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Guest Count */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-[#7a6d60] mb-2">
                        Number of Guests
                      </label>
                      <div className="flex gap-2">
                        {["1", "2", "3", "4", "5+"].map((count) => (
                          <button
                            key={count}
                            type="button"
                            onClick={() => setGuestCount(count)}
                            className={`flex-1 rounded-xl py-2 text-xs font-medium transition-colors ${
                              guestCount === count
                                ? "bg-[#1a1814] text-[#f6f0e6]"
                                : "border border-[#1a1814]/15 bg-white/50 text-[#5c5146] hover:bg-white"
                            }`}
                          >
                            {count}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Wishes / Note */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.25em] text-[#7a6d60] mb-2">
                    Warm Wishes for Couple (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Write a message of blessings..."
                    className="w-full resize-none rounded-xl border border-[#1a1814]/15 bg-white/60 px-4 py-2.5 font-display text-base text-[#1a1814] placeholder:text-[#a09485] focus:border-[#1a1814]/40 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-full bg-[#1a1814] py-4 text-[11px] uppercase tracking-[0.25em] text-[#f6f0e6] shadow-[0_14px_36px_rgba(40,30,20,0.2)] transition-colors hover:bg-[#2c261f]"
                >
                  Confirm RSVP
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-5"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1a1814]/5 text-[#1a1814]">
                  <Heart size={26} className="text-[#8a7a68] fill-[#8a7a68]/20" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-2xl text-[#1a1814]">
                    Thank You, {name}!
                  </h3>
                  <p className="font-display text-base italic text-[#5c5146]">
                    {attending === "yes"
                      ? "Your RSVP has been confirmed. We eagerly await celebrating with you!"
                      : "Thank you for letting us know. You will be in our thoughts and prayers."}
                  </p>
                </div>

                <div className="pt-3 space-y-3">
                  <motion.button
                    type="button"
                    onClick={sendWhatsAppRSVP}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#1a1814]/15 bg-white/80 py-3.5 px-6 text-[11px] uppercase tracking-[0.2em] text-[#1a1814] shadow-sm hover:bg-white transition-colors"
                  >
                    <MessageCircle size={16} className="text-[#25D366]" />
                    Send via WhatsApp
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-[10px] uppercase tracking-[0.2em] text-[#8a7a68] hover:text-[#1a1814] transition-colors"
                  >
                    Edit Response
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
