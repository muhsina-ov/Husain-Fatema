import { Share2, Download } from "lucide-react";
import { wedding } from "../config";

interface HeaderProps {
  onShare: () => void;
  onDownload: () => void;
}

export default function Header({ onShare, onDownload }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F5EFEB]/85 border-b border-[#B8860B]/15 transition-all">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Monogram */}
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg font-bold tracking-widest text-[#2A221E]">
            {wedding.monogram}
          </span>
          <span className="hidden text-xs uppercase tracking-[0.25em] text-[#916E32] sm:inline-block">
            | Digital Invitation
          </span>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#B8860B]/30 bg-[#FFFDF9] px-3.5 py-1.5 text-xs font-medium text-[#2A221E] shadow-sm transition-all hover:border-[#B8860B] hover:bg-[#B8860B] hover:text-white active:scale-95"
            aria-label="Share Invitation"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>

          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#2A221E] px-3.5 py-1.5 text-xs font-medium text-[#F5EFEB] shadow-sm transition-all hover:bg-[#916E32] active:scale-95"
            aria-label="Download Invitation Image"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Save Card</span>
          </button>
        </div>
      </div>
    </header>
  );
}
