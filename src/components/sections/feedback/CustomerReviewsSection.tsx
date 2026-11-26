import { useState, useEffect, useRef } from "react";
import { Star, ShoppingBag, ZoomIn, X, CheckCircle2, Award, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { getApprovedReviews, type Review } from "@/utils/feedbackStore";
import Media from "@/components/kit/Media";

interface CustomerReviewsSectionProps {
  title?: string;
  subtitle?: string;
  showOrderButton?: boolean;
  showGoogleReviews?: boolean;
  className?: string;
}

export default function CustomerReviewsSection({
  title = "Freigegebene Kundenbewertungen",
  subtitle = "Echte Erfahrungen und Geschmacksprofile unserer Kundinnen und Kunden.",
  showOrderButton = true,
  showGoogleReviews = true,
  className = "",
}: CustomerReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const loadReviews = () => {
    setReviews(getApprovedReviews());
  };

  useEffect(() => {
    loadReviews();
    const handleUpdate = () => loadReviews();
    window.addEventListener("fv_feedback_updated", handleUpdate);
    return () => window.removeEventListener("fv_feedback_updated", handleUpdate);
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section className={`py-8 sm:py-10 px-4 sm:px-6 bg-transparent text-[#0A1C3A] font-sans border-y border-slate-200/50 ${className}`}>
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-sky-50 text-[#0A1C3A] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full border border-sky-200">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Geprüfte Kundenbewertungen</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0A1C3A]">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Carousel Control Buttons */}
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={scrollLeft}
                aria-label="Vorherige Bewertung"
                className="w-11 h-11 bg-white hover:bg-[#0A1C3A] hover:text-white text-[#0A1C3A] border border-slate-300 rounded-full flex items-center justify-center shadow-md transition transform active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Nächste Bewertung"
                className="w-11 h-11 bg-white hover:bg-[#0A1C3A] hover:text-white text-[#0A1C3A] border border-slate-300 rounded-full flex items-center justify-center shadow-md transition transform active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Horizontal Reviews Carousel Container (Scrollbar hidden) */}
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto">
            <p className="text-sm font-semibold text-slate-600">Noch keine freigegebenen Kundenbewertungen vorhanden.</p>
            <p className="text-xs text-slate-400 mt-1">Seien Sie der Erste und reichen Sie Ihre Bewertung ein!</p>
          </div>
        ) : (
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scrollbar-none [&::-webkit-scrollbar]:hidden scroll-smooth select-none"
            style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="snap-start shrink-0 w-[300px] sm:w-[350px] bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl hover:border-[#0A1C3A] transition duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Can / Product Banner */}
                  {rev.productImage && (
                    <div className="relative h-48 w-full overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4">
                      <Media
                        src={rev.productImage}
                        alt={`Produktbild zu ${rev.product}`}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition duration-500 cursor-pointer"
                        onClick={() => setActivePhoto(rev.productImage || null)}
                      />

                      <button
                        onClick={() => setActivePhoto(rev.productImage || null)}
                        className="absolute top-3 right-3 bg-[#0A1C3A]/80 hover:bg-[#0A1C3A] text-white p-1.5 rounded-full backdrop-blur-md transition shadow-md cursor-pointer"
                        title="Bild vergrößern"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Review Content */}
                  <div className="p-5 space-y-4">
                    {/* Customer Header */}
                    <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-base font-black text-[#0A1C3A] tracking-tight">{rev.firstName}</h3>
                        <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 mt-1">
                          {rev.product}
                        </span>
                        {(rev.instagram || rev.tiktok) && (
                          <div className="flex gap-2 text-[10px] text-slate-400 mt-1 font-mono">
                            {rev.instagram && <span>IG: {rev.instagram}</span>}
                            {rev.tiktok && <span>TT: {rev.tiktok}</span>}
                          </div>
                        )}
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 shrink-0">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= rev.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Taste Ratings Breakdown (Süße, Säure, Herbheit, Geschmacksintensität) */}
                    <div className="bg-[#f8fafc] p-3 rounded-xl border border-slate-200 space-y-2">
                      <div className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                        <Award className="w-3 h-3 text-[#0A1C3A]" /> Geschmacksprofil
                      </div>
                      <div className="space-y-1.5 text-[11px] font-semibold text-slate-700">
                        {/* Süße */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="w-20 shrink-0 text-amber-800 font-bold">Süße:</span>
                          <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-amber-500 h-full rounded-full"
                              style={{ width: `${(rev.tasteRatings.sweetness / 5) * 100}%` }}
                            />
                          </div>
                          <span className="w-6 text-right font-bold text-slate-900 font-mono">{rev.tasteRatings.sweetness}/5</span>
                        </div>
                        {/* Säure */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="w-20 shrink-0 text-sky-800 font-bold">Säure:</span>
                          <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-sky-500 h-full rounded-full"
                              style={{ width: `${(rev.tasteRatings.acidity / 5) * 100}%` }}
                            />
                          </div>
                          <span className="w-6 text-right font-bold text-slate-900 font-mono">{rev.tasteRatings.acidity}/5</span>
                        </div>
                        {/* Herbheit */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="w-20 shrink-0 text-emerald-800 font-bold">Herbheit:</span>
                          <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-600 h-full rounded-full"
                              style={{ width: `${(rev.tasteRatings.tartness / 5) * 100}%` }}
                            />
                          </div>
                          <span className="w-6 text-right font-bold text-slate-900 font-mono">{rev.tasteRatings.tartness}/5</span>
                        </div>
                        {/* Geschmacksintensität */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="w-20 shrink-0 text-purple-800 font-bold">Intensität:</span>
                          <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-purple-600 h-full rounded-full"
                              style={{ width: `${((rev.tasteRatings.intensity || 3) / 5) * 100}%` }}
                            />
                          </div>
                          <span className="w-6 text-right font-bold text-slate-900 font-mono">{rev.tasteRatings.intensity || 3}/5</span>
                        </div>
                      </div>
                    </div>

                    {/* Written Comment */}
                    <p className="text-xs text-slate-700 leading-relaxed italic line-clamp-4">
                      "{rev.comment}"
                    </p>
                  </div>
                </div>

                {/* Footer metadata */}
                <div className="px-5 pb-4 text-[10px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-100 pt-3">
                  <span>Verifizierte Bewertung</span>
                  <span>{new Date(rev.submittedAt).toLocaleDateString("de-DE")}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons Row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Google Reviews Button */}
          {showGoogleReviews && (
            <a
              href="https://g.page/r/CQ9oyDuP_2cVECE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-100 text-[#0A1C3A] px-7 py-3.5 rounded-xl font-extrabold uppercase tracking-wider text-xs sm:text-sm border-2 border-slate-300 shadow-md hover:shadow-lg transition duration-300"
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Jetzt auf Google bewerten</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          )}

          {/* „Jetzt bestellen“ Button linked to https://shop.fontes-vitae.com (same tab) */}
          {showOrderButton && (
            <a
              href="https://shop.fontes-vitae.com"
              target="_self"
              className="inline-flex items-center justify-center gap-2.5 bg-[#0A1C3A] hover:bg-[#12284c] text-white px-8 py-3.5 rounded-xl font-black uppercase tracking-wider text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition duration-300 border border-slate-700"
            >
              <ShoppingBag className="w-4 h-4 text-sky-400" />
              <span>Jetzt bestellen</span>
            </a>
          )}
        </div>
      </div>

      {/* Lightbox Photo Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setActivePhoto(null)}
        >
          <div className="relative max-w-2xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-6 text-center">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 bg-[#0A1C3A] text-white p-2 rounded-full hover:bg-red-600 transition z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <Media
              src={activePhoto}
              alt="Vergrößertes Produktbild"
              className="max-h-[75vh] w-auto object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}
