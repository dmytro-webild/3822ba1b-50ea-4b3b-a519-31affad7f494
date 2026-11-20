import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Trophy, ShoppingBag, ZoomIn, X, CheckCircle2, Award } from "lucide-react";
import { getApprovedReviews, type Review } from "@/utils/feedbackStore";

interface CustomerReviewsSectionProps {
  title?: string;
  subtitle?: string;
  showOrderButton?: boolean;
  className?: string;
}

export default function CustomerReviewsSection({
  title = "Freigegebene Kundenbewertungen & Fotos",
  subtitle = "Echte Fotos und Erfahrungen unserer Kundinnen und Kunden – Geschmack & H2-Erlebnis im Überblick.",
  showOrderButton = true,
  className = "",
}: CustomerReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const loadReviews = () => {
    setReviews(getApprovedReviews());
  };

  useEffect(() => {
    loadReviews();
    const handleUpdate = () => loadReviews();
    window.addEventListener("fv_feedback_updated", handleUpdate);
    return () => window.removeEventListener("fv_feedback_updated", handleUpdate);
  }, []);

  return (
    <section className={`py-16 px-4 sm:px-6 bg-[#f8fafc] text-[#0A1C3A] font-sans border-y border-slate-200 ${className}`}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-[#0A1C3A] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full border border-sky-200">
            <CheckCircle2 className="w-4 h-4 text-sky-600" />
            <span>Geprüfte Kundenbewertungen</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0A1C3A]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Reviews Grid */}
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto">
            <p className="text-sm font-semibold text-slate-600">Noch keine freigegebenen Kundenbewertungen vorhanden.</p>
            <p className="text-xs text-slate-400 mt-1">Seien Sie der Erste und reichen Sie Ihr Feedback mit Foto ein!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl hover:border-[#0A1C3A] transition duration-300 flex flex-col justify-between overflow-hidden relative group"
              >
                <div>
                  {/* Photo Section */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img
                      src={rev.photoUrl}
                      alt={`Kundenfoto von ${rev.firstName}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 cursor-pointer"
                      onClick={() => setActivePhoto(rev.photoUrl)}
                    />

                    {/* Image Zoom Overlay Trigger */}
                    <button
                      onClick={() => setActivePhoto(rev.photoUrl)}
                      className="absolute top-3 right-3 bg-[#0A1C3A]/80 hover:bg-[#0A1C3A] text-white p-2 rounded-full backdrop-blur-md transition shadow-md"
                      title="Foto vergrößern"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>

                    {/* Contest Winner Badge if applicable */}
                    {rev.contestWinnerRank && (
                      <div className="absolute top-3 left-3 bg-amber-400 text-[#0A1C3A] text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-amber-300">
                        <Trophy className="w-3.5 h-3.5 text-[#0A1C3A]" />
                        <span>{rev.contestWinnerRank}. Platz Gewinner</span>
                      </div>
                    )}
                  </div>

                  {/* Review Content */}
                  <div className="p-6 space-y-4">
                    {/* Customer Header */}
                    <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-lg font-black text-[#0A1C3A] tracking-tight">{rev.firstName}</h3>
                        <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200 mt-1">
                          {rev.product}
                        </span>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-0.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 shrink-0">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= rev.rating ? "text-amber-500 fill-amber-500" : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Taste Ratings Breakdown (Süße, Säure, Herbheit) */}
                    <div className="bg-[#f8fafc] p-3 rounded-xl border border-slate-200 space-y-2">
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                        <Award className="w-3 h-3 text-[#0A1C3A]" /> Geschmacksprofil (1-5)
                      </div>
                      <div className="space-y-1.5 text-xs font-semibold text-slate-700">
                        {/* Süße */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="w-16 shrink-0">Süße:</span>
                          <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-amber-500 h-full rounded-full"
                              style={{ width: `${(rev.tasteRatings.sweetness / 5) * 100}%` }}
                            />
                          </div>
                          <span className="w-6 text-right font-bold text-slate-900">{rev.tasteRatings.sweetness}/5</span>
                        </div>
                        {/* Säure */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="w-16 shrink-0">Säure:</span>
                          <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-sky-500 h-full rounded-full"
                              style={{ width: `${(rev.tasteRatings.acidity / 5) * 100}%` }}
                            />
                          </div>
                          <span className="w-6 text-right font-bold text-slate-900">{rev.tasteRatings.acidity}/5</span>
                        </div>
                        {/* Herbheit */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="w-16 shrink-0">Herbheit:</span>
                          <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-600 h-full rounded-full"
                              style={{ width: `${(rev.tasteRatings.tartness / 5) * 100}%` }}
                            />
                          </div>
                          <span className="w-6 text-right font-bold text-slate-900">{rev.tasteRatings.tartness}/5</span>
                        </div>
                      </div>
                    </div>

                    {/* Written Comment */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                </div>

                {/* Footer metadata */}
                <div className="px-6 pb-6 text-[10px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-100 pt-3">
                  <span>Verifizierter Kauf</span>
                  <span>{new Date(rev.submittedAt).toLocaleDateString("de-DE")}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Prominent Existing-Design Button "Jetzt bestellen" linking to /shop */}
        {showOrderButton && (
          <div className="pt-6 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-3 bg-[#0A1C3A] hover:bg-[#12284c] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition duration-300 border border-slate-700 mx-auto"
            >
              <ShoppingBag className="w-5 h-5 text-sky-400" />
              <span>Jetzt bestellen</span>
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Photo Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 bg-[#0A1C3A] text-white p-2 rounded-full hover:bg-red-600 transition z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activePhoto}
              alt="Vergrößertes Kundenfoto"
              className="max-h-[85vh] w-auto object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}
