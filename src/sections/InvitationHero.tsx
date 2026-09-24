import { useState } from "react";
import { Share2, Download, Check, Sparkles, Image as ImageIcon } from "lucide-react";
import { wedding } from "../config";

interface InvitationHeroProps {
  onShare: () => void;
}

export default function InvitationHero({ onShare }: InvitationHeroProps) {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  const handleFormatDownload = (format: "webp" | "jpg" | "png") => {
    setDownloadingFormat(format);
    const link = document.createElement("a");
    if (format === "png") {
      link.href = "/invitation-master.png";
      link.download = `Fatema-Husain-Wedding-Invitation.png`;
    } else if (format === "webp") {
      link.href = "/invitation.webp";
      link.download = `Fatema-Husain-Wedding-Invitation.webp`;
    } else {
      link.href = "/invitation.jpg";
      link.download = `Fatema-Husain-Wedding-Invitation.jpg`;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadingFormat(null);
      setShowDownloadMenu(false);
    }, 1200);
  };

  return (
    <section className="relative flex flex-col items-center justify-center px-4 pt-6 pb-12 sm:px-6 sm:pt-10">
      {/* Soft background ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#B8860B]/10 via-[#F5EFEB]/40 to-[#916E32]/10 blur-3xl" />
      </div>

      {/* Main Invitation Container */}
      <div className="relative z-10 w-full max-w-[480px]">
        {/* Card Frame Shadow & Border Accent */}
        <div className="group relative overflow-hidden rounded-2xl bg-[#FFFDF9] p-2 shadow-[0_20px_50px_rgba(42,34,30,0.12)] ring-1 ring-[#B8860B]/30 transition-all duration-500 hover:shadow-[0_28px_60px_rgba(42,34,30,0.18)]">
          {/* Inner 4:5 Aspect Ratio Box */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#F5EFEB]">
            <picture>
              <source srcset="/invitation.webp" type="image/webp" />
              <source srcset="/invitation.jpg" type="image/jpeg" />
              <img
                src="/invitation.png"
                alt="Wedding invitation of Fatema Mustali Bhai Matkawala and Husain Hatim Bhai Kanchwala"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                width={1080}
                height={1350}
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        {/* Action Controls below Card */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* Share Invitation Button */}
          <button
            type="button"
            onClick={onShare}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#2A221E] via-[#3D322C] to-[#2A221E] px-7 py-3.5 text-sm font-semibold tracking-wider text-[#FFFDF9] shadow-md transition-all hover:brightness-110 hover:shadow-lg active:scale-[0.98] sm:w-auto"
          >
            <Share2 className="h-4 w-4 text-[#D4AF37]" />
            <span>Share Invitation</span>
          </button>

          {/* Download Options Dropdown / Toggle */}
          <div className="relative w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[#B8860B]/40 bg-[#FFFDF9] px-6 py-3.5 text-sm font-semibold tracking-wide text-[#2A221E] shadow-sm transition-all hover:border-[#B8860B] hover:bg-[#F5EFEB] active:scale-[0.98] sm:w-auto"
            >
              <Download className="h-4 w-4 text-[#916E32]" />
              <span>Save Invitation</span>
            </button>

            {/* Download Modal / Menu */}
            {showDownloadMenu && (
              <div className="absolute left-1/2 bottom-full mb-3 z-30 w-64 -translate-x-1/2 rounded-2xl border border-[#B8860B]/25 bg-[#FFFDF9] p-3 shadow-2xl backdrop-blur-md">
                <div className="mb-2 border-b border-[#B8860B]/15 pb-2 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#916E32]">
                    Select Image Format
                  </p>
                  <p className="text-[11px] text-[#5A4D41]">Optimized for mobile & WhatsApp</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleFormatDownload("webp")}
                    className="flex items-center justify-between rounded-xl px-3.5 py-2 text-left text-xs font-medium text-[#2A221E] transition-colors hover:bg-[#F5EFEB]"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#B8860B]" />
                      <div>
                        <span className="font-bold">WebP Format</span>
                        <span className="ml-1 text-[10px] text-emerald-700 font-semibold">(Fastest ~157 KB)</span>
                      </div>
                    </div>
                    {downloadingFormat === "webp" && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFormatDownload("jpg")}
                    className="flex items-center justify-between rounded-xl px-3.5 py-2 text-left text-xs font-medium text-[#2A221E] transition-colors hover:bg-[#F5EFEB]"
                  >
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-3.5 w-3.5 text-[#916E32]" />
                      <div>
                        <span className="font-bold">JPEG Format</span>
                        <span className="ml-1 text-[10px] text-[#5A4D41]">(Universal ~260 KB)</span>
                      </div>
                    </div>
                    {downloadingFormat === "jpg" && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFormatDownload("png")}
                    className="flex items-center justify-between rounded-xl px-3.5 py-2 text-left text-xs font-medium text-[#2A221E] transition-colors hover:bg-[#F5EFEB]"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="h-3.5 w-3.5 text-[#2A221E]" />
                      <div>
                        <span className="font-bold">Master PNG</span>
                        <span className="ml-1 text-[10px] text-[#5A4D41]">(Ultra HQ ~1.8 MB)</span>
                      </div>
                    </div>
                    {downloadingFormat === "png" && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
