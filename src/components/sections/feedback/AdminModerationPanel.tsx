import { useState, useEffect } from "react";
import { Shield, Check, X, Trophy, Trash2, Lock, Unlock, RefreshCw, Star } from "lucide-react";
import {
  getStoredReviews,
  updateReviewStatus,
  setContestWinner,
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
              Melden Sie sich an, um ausstehende Kundenbewertungen freizugeben und Fotowettbewerb-Gewinner festzulegen.
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
              className="w-full bg-sky-500 hover:bg-sky-400 text-[#0A1C3A] font-extrabold uppercase tracking-wider py-2.5 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
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
              Freigabe von Kundenbewertungen &amp; Prämierung Fotowettbewerb
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadData()}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition text-xs flex items-center gap-1.5"
            title="Aktualisieren"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Aktualisieren</span>
          </button>
          <button
            onClick={() => setIsAdminLoggedIn(false)}
            className="px-3 py-2 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800/80 rounded-xl transition text-xs font-bold uppercase tracking-wider"
          >
            Abmelden
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            filter === "all" ? "bg-sky-400 text-[#0A1C3A]" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Alle ({reviews.length})
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            filter === "pending" ? "bg-amber-400 text-[#0A1C3A]" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Ausstehend ({reviews.filter((r) => r.status === "pending").length})
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            filter === "approved" ? "bg-emerald-400 text-[#0A1C3A]" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Freigegeben ({reviews.filter((r) => r.status === "approved").length})
        </button>
        <button
          onClick={() => setFilter("rejected")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            filter === "rejected" ? "bg-red-400 text-[#0A1C3A]" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Abgelehnt ({reviews.filter((r) => r.status === "rejected").length})
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-6 text-center">Keine Einträge in dieser Kategorie.</p>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-700 space-y-4 text-xs"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                    <img src={rev.photoUrl} alt="Kundenfoto" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-white">{rev.firstName}</span>
                    </div>
                    <span className="text-[11px] text-sky-400 font-semibold">{rev.product}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      rev.status === "approved"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : rev.status === "pending"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        : "bg-red-500/20 text-red-300 border border-red-500/40"
                    }`}
                  >
                    {rev.status === "approved"
                      ? "Freigegeben"
                      : rev.status === "pending"
                      ? "Ausstehend"
                      : "Abgelehnt"}
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
                    Süße: {rev.tasteRatings.sweetness} | Säure: {rev.tasteRatings.acidity} | Herbheit: {rev.tasteRatings.tartness}
                  </span>
                </div>
              </div>

              <p className="text-slate-200 italic">"{rev.comment}"</p>

              {/* Moderation Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
                {/* Status actions */}
                <div className="flex items-center gap-2">
                  {rev.status !== "approved" && (
                    <button
                      onClick={() => updateReviewStatus(rev.id, "approved")}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center gap-1 transition"
                    >
                      <Check className="w-3.5 h-3.5" /> Freigeben
                    </button>
                  )}
                  {rev.status !== "rejected" && (
                    <button
                      onClick={() => updateReviewStatus(rev.id, "rejected")}
                      className="px-3 py-1.5 bg-red-800 hover:bg-red-700 text-white rounded-lg font-bold flex items-center gap-1 transition"
                    >
                      <X className="w-3.5 h-3.5" /> Ablehnen
                    </button>
                  )}
                </div>

                {/* Photo Contest Winner Allocation */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-amber-400" /> Wettbewerb:
                  </span>
                  <button
                    onClick={() => setContestWinner(rev.id, rev.contestWinnerRank === 1 ? undefined : 1)}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                      rev.contestWinnerRank === 1
                        ? "bg-amber-400 text-[#0A1C3A]"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    1. Platz
                  </button>
                  <button
                    onClick={() => setContestWinner(rev.id, rev.contestWinnerRank === 2 ? undefined : 2)}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                      rev.contestWinnerRank === 2
                        ? "bg-amber-400 text-[#0A1C3A]"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    2. Platz
                  </button>
                  <button
                    onClick={() => setContestWinner(rev.id, rev.contestWinnerRank === 3 ? undefined : 3)}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                      rev.contestWinnerRank === 3
                        ? "bg-amber-400 text-[#0A1C3A]"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    3. Platz
                  </button>
                  <button
                    onClick={() => deleteReview(rev.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400 transition ml-2"
                    title="Bewertung löschen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
