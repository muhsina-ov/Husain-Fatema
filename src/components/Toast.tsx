import { Check } from "lucide-react";

interface ToastProps {
  message: string;
  visible: boolean;
}

export default function Toast({ message, visible }: ToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300">
      <div className="flex items-center gap-2.5 rounded-full border border-[#B8860B]/30 bg-[#2A221E] px-5 py-2.5 text-xs font-semibold tracking-wide text-[#FFFDF9] shadow-2xl backdrop-blur-md">
        <Check className="h-4 w-4 text-emerald-400" />
        <span>{message}</span>
      </div>
    </div>
  );
}
