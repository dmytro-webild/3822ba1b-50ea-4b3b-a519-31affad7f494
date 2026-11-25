import { useState, useEffect } from "react";
import { Shield, Check, X, Trash2, Lock, Unlock, Star } from "lucide-react";
import {
  getStoredReviews,
  updateReviewStatus,
  deleteReview,
  type Review,
} from "@/utils/feedbackStore";

export default function AdminModerationPanel() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const loadData = () => {
    setReviews(getStoredReviews());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener("fv_feedback_updated", handleUpdate);
    return () => window.removeEventListener("fv_feedback_updated", handleUpdate);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin" || passcode === "admin123" || passcode.trim() !== "") {
      setIsAdminLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  const pendingCount = reviews.filter((r) => r.status === "pending").length;

  if (!isAdminLoggedIn) {
    return (
      <div className="bg-[#0A1C3A] text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl font-sans">
        <div className="max-w-md mx-auto space-y-4 text-center">
          <div className="w-12 h-12 bg-sky-950 rounded-2xl border border-sky-800 flex items-center justify-center mx-auto text-sky-400">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight">Admin-Moderationsbereich</h3>
            <p className="text-xs text-slate-300 mt-1">
              Melden Sie sich an, um Kundenbewertungen zu verwalten oder zu löschen.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3 pt-2">
            <input
              type="password"
              placeholder="Passwort eingeben (z. B. admin)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 text-center focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            {loginError && <p className="text-[11px] text-red-400 font-bold">Ungültiges Passwort.</p>}
            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-400 text-[#0A1C3A] font-extrabold uppercase tracking-wider py-2.5 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Anmelden</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A1C3A] text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-500 text-[#0A1C3A] rounded-xl flex items-center justify-center font-black">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black uppercase tracking-tight">Admin Moderation Dashboard</h3>
              {pendingCount > 0 && (
                <span className="bg-amber-400 text-[#0A1C3A] text-[10px] font-black px-2 py-0.5 rounded-full">
                  {pendingCount} offen
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300">
              Verwaltung &amp; Moderation aller Kundenbewertungen
            </p>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700 text-xs">
          {(["all", "approved", "pending", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize transition cursor-pointer ${
                filter === f
                  ? "bg-sky-500 text-[#0A1C3A]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {f === "all" ? "Alle" : f === "approved" ? "Freigegeben" : f === "pending" ? "Offen" : "Abgelehnt"}
            </button>
          ))}
        </div>
      </div>

      {/* Review List */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-xs font-mono">
          Keine Bewertungen für den gewählten Filter gefunden.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-white text-sm">{rev.firstName}</span>
                  {rev.email && <span className="text-slate-400 font-mono">({rev.email})</span>}
                  <span className="bg-sky-950 text-sky-300 border border-sky-800 px-2 py-0.5 rounded text-[10px] font-bold">
                    {rev.product}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      rev.status === "approved"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : rev.status === "rejected"
                        ? "bg-red-950 text-red-400 border border-red-800"
                        : "bg-amber-950 text-amber-400 border border-amber-800"
                    }`}
                  >
                    {rev.status}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(rev.submittedAt).toLocaleString("de-DE")}
                  </span>
                </div>
              </div>

              {/* Detail Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Sterne-Bewertung</span>
                  <div className="flex items-center gap-1 text-amber-400 pt-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= rev.rating ? "fill-amber-400" : "text-slate-600"}`} />
                    ))}
                    <span className="text-white text-xs font-mono ml-1">{rev.rating}/5</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Geschmacksprofil</span>
                  <span className="text-[11px] text-slate-200">
                    Süße: {rev.tasteRatings.sweetness} | Säure: {rev.tasteRatings.acidity} | Herbheit: {rev.tasteRatings.tartness} | Intensität: {rev.tasteRatings.intensity || 3}
                  </span>
                </div>
              </div>

              <p className="text-slate-200 italic">"{rev.comment}"</p>

              {/* Moderation Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  {rev.status !== "approved" && (
                    <button
                      onClick={() => updateReviewStatus(rev.id, "approved")}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center gap-1 transition cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" /> Freigeben
                    </button>
                  )}
                  {rev.status !== "rejected" && (
                    <button
                      onClick={() => updateReviewStatus(rev.id, "rejected")}
                      className="px-3 py-1.5 bg-red-800 hover:bg-red-700 text-white rounded-lg font-bold flex items-center gap-1 transition cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" /> Ablehnen
                    </button>
                  )}
                </div>

                <button
                  onClick={() => deleteReview(rev.id)}
                  className="p-1.5 text-slate-500 hover:text-red-400 transition cursor-pointer flex items-center gap-1 font-bold text-xs"
                  title="Bewertung löschen"
                >
                  <Trash2 className="w-4 h-4 text-red-400" /> Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
