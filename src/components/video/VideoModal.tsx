import { useCart } from "@/context/CartContext";
import { X, PlayCircle } from "lucide-react";

export default function VideoModal() {
  const { activeVideoUrl, closeVideoModal } = useCart();

  if (!activeVideoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity"
        onClick={closeVideoModal}
      />

      <div className="relative bg-[#0a192f] w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden text-white">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37]">
            <PlayCircle className="w-4 h-4" />
            <span>FONS VITAE Wissenschaftsvideo</span>
          </div>
          <button
            onClick={closeVideoModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="aspect-video w-full bg-black relative flex items-center justify-center">
          <iframe
            className="w-full h-full"
            src={activeVideoUrl}
            title="Wissenschaftliche Studie H2 Wasserstoff"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
