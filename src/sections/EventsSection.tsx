import React from "react";
import { Calendar, Clock, Download, ExternalLink, MapPin, Sparkles } from "lucide-react";
import { wedding, createGoogleCalendarUrl, downloadICS } from "../config";

export const EventsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto space-y-10 text-center">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-cinzel text-[#B8860B] tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-[#B8860B]" />
          <span>WEDDING CELEBRATIONS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A221E] tracking-wide">
          Events &amp; Schedule
        </h2>
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wedding.events.map((evt) => (
          <div
            key={evt.id}
            className="group relative card-ivory border-2 border-[#D4AF37]/40 rounded-3xl p-6 flex flex-col justify-between space-y-6 text-left hover:border-[#D4AF37] transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
          >
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-[#F5EFEB] border border-[#D4AF37] text-[10px] font-cinzel font-semibold text-[#B8860B] tracking-widest uppercase">
                {evt.day}
              </div>

              <h3 className="text-xl font-serif font-bold text-[#2A221E] tracking-wide min-h-[56px] flex items-center">
                {evt.name}
              </h3>

              <div className="space-y-2 text-xs font-sans text-[#2A221E]/90">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#B8860B] shrink-0" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#B8860B] shrink-0" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center gap-2.5 pt-1">
                  <MapPin className="w-4 h-4 text-[#B8860B] shrink-0" />
                  <span className="font-semibold text-[#B8860B]">{evt.venue}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col gap-2">
              <a
                href={createGoogleCalendarUrl(evt.name, evt.dateISO, evt.venue, evt.time)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-[#B8860B] text-white font-cinzel font-bold text-[11px] tracking-wider hover:bg-[#8B6508] transition-all shadow-md active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>ADD TO CALENDAR</span>
              </a>

              <button
                onClick={() => downloadICS(evt.name, evt.dateISO, evt.venue, evt.time)}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full card-ivory border border-[#D4AF37] text-[#B8860B] font-cinzel font-semibold text-[11px] tracking-wider hover:bg-[#D4AF37]/10 transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>SAVE THE DATE (.ICS)</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
