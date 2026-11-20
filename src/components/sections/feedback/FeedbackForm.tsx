import { useState, type ChangeEvent, type FormEvent } from "react";
import { sendToOwner } from "@/lib/sendToOwner";
import { Star, Upload, CheckCircle2, AlertCircle, Camera, Award } from "lucide-react";
import { addReview } from "@/utils/feedbackStore";

const PRODUCTS = [
  "FONTES VITEA Natural H2 (250 ml)",
  "FONTES VITEA Sparkling H2 12er-Pack",
  "Kinderserie - Gingerix (Ingwer Tonic)",
  "Kinderserie - Limetix (Limette mit Apfel)",
  "Kinderserie - Heidelberix (Heidelbeere)",
  "Kinderserie - Himbeerixa (Himbeere)",
  "Kinderserie - Apfelrix (Apfel)",
];

export default function FeedbackForm() {
  const [firstName, setFirstName] = useState("");
  const [product, setProduct] = useState(PRODUCTS[0]);
  const [rating, setRating] = useState(5);
  const [sweetness, setSweetness] = useState(3);
  const [acidity, setAcidity] = useState(2);
  const [tartness, setTartness] = useState(2);
  const [comment, setComment] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [contestEntry, setContestEntry] = useState(true);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File Upload Handler (JPG, PNG, WEBP with Base64 Conversion)
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrorMsg("Bitte wählen Sie ein Bild im Format JPG, PNG oder WEBP aus.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrorMsg("Das Bild darf maximal 5 MB groß sein.");
      return;
    }

    setErrorMsg(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!firstName.trim()) {
      setErrorMsg("Bitte geben Sie Ihren Vornamen ein.");
      return;
    }

    if (!comment.trim()) {
      setErrorMsg("Bitte verfassen Sie eine kurze Bewertung.");
      return;
    }

    if (!photoUrl) {
      setErrorMsg("Ein Foto-Upload (JPG, PNG, WEBP) ist zwingend erforderlich.");
      return;
    }

    if (!consent) {
      setErrorMsg("Bitte stimmen Sie der Veröffentlichung Ihrer Bewertung und Ihres Fotos zu.");
      return;
    }

    setIsSubmitting(true);

    sendToOwner(
      {
        vorname: firstName,
        produkt: product,
        bewertung: `${rating}/5`,
        suesse: `${sweetness}/5`,
        saeure: `${acidity}/5`,
        herbe: `${tartness}/5`,
        fotowettbewerb: contestEntry ? "ja" : "nein",
        message: comment,
      },
      "Kundenfeedback",
    ).catch(() => undefined);

    try {
      addReview({
        firstName: firstName.trim(),
        product,
        rating,
        tasteRatings: {
          sweetness,
          acidity,
          tartness,
        },
        comment: comment.trim(),
        photoUrl,
        contestEntry,
      });

      setSuccessMsg(
        "Vielen Dank! Ihre Bewertung und Ihr Foto wurden erfolgreich eingereicht. Nach Prüfung durch unser Moderations-Team wird Ihr Feedback auf der Website veröffentlicht."
      );

      // Reset form
      setFirstName("");
      setComment("");
      setPhotoUrl(null);
      setConsent(false);
      setRating(5);
      setSweetness(3);
      setAcidity(2);
      setTartness(2);
    } catch {
      setErrorMsg("Fehler beim Speichern. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 font-sans">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#0A1C3A] text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
          <Camera className="w-4 h-4 text-sky-400" />
          <span>Feedback &amp; Fotowettbewerb</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0A1C3A]">
          IHRE BEWERTUNG MIT FOTO EINREICHEN
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Teilen Sie Ihre Erfahrungen und laden Sie Ihr Foto hoch. Jede freigegebene Foto-Bewertung nimmt automatisch am Fotowettbewerb „DEIN FONTES VITEA MOMENT“ teil!
        </p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-800 p-4 rounded-2xl border border-red-200 flex items-center gap-3 text-xs sm:text-sm font-semibold">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-50 text-emerald-900 p-5 rounded-2xl border border-emerald-200 flex items-center gap-3 text-xs sm:text-sm font-bold shadow-sm">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
        {/* Vorname */}
        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A1C3A]">
            Vorname *
          </label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="z. B. Maximilian"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1C3A] text-[#0A1C3A]"
          />
        </div>

        {/* Product Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A1C3A]">
            Produkt / Sorte auswählen *
          </label>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1C3A] text-[#0A1C3A] font-semibold"
          >
            {PRODUCTS.map((prod) => (
              <option key={prod} value={prod}>
                {prod}
              </option>
            ))}
          </select>
        </div>

        {/* Overall Rating (Stars) */}
        <div className="bg-[#f8fafc] p-5 rounded-2xl border border-slate-200 space-y-2 text-center sm:text-left">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A1C3A]">
            Gesamtbewertung (1–5 Sterne) *
          </label>
          <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 transition transform hover:scale-125 focus:outline-none"
              >
                <Star
                  className={`w-7 h-7 ${
                    star <= rating ? "text-amber-500 fill-amber-500" : "text-slate-300"
                  }`}
                />
              </button>
            ))}
            <span className="ml-3 text-xs font-bold text-slate-700 font-mono">
              ({rating} von 5 Sterne)
            </span>
          </div>
        </div>

        {/* Taste Ratings Sliders (Süße, Säure, Herbheit) */}
        <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-200 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Award className="w-5 h-5 text-[#0A1C3A]" />
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#0A1C3A]">
              Geschmacksprofil-Bewertung (Skala 1 bis 5)
            </h3>
          </div>

          <div className="space-y-4">
            {/* Süße */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Süße:</span>
                <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-mono">
                  {sweetness} / 5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={sweetness}
                onChange={(e) => setSweetness(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 (Sehr dezent)</span>
                <span>5 (Sehr süß)</span>
              </div>
            </div>

            {/* Säure */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Säure:</span>
                <span className="text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-mono">
                  {acidity} / 5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={acidity}
                onChange={(e) => setAcidity(parseInt(e.target.value, 10))}
                className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 (Mild / Ohne Säure)</span>
                <span>5 (Spritzig / Säuerlich)</span>
              </div>
            </div>

            {/* Herbheit */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Herbheit:</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                  {tartness} / 5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={tartness}
                onChange={(e) => setTartness(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 (Sanft)</span>
                <span>5 (Kräftig / Herb)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Written Review */}
        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A1C3A]">
            Schriftlicher Erfahrungsbericht *
          </label>
          <textarea
            required
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Beschreiben Sie Geschmack, Verträglichkeit, Erfrischung und Gesamteindruck..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1C3A] text-[#0A1C3A]"
          />
        </div>

        {/* Mandatory Image Upload */}
        <div className="bg-[#f8fafc] p-6 rounded-2xl border border-dashed border-slate-300 space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A1C3A] flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#0A1C3A]" />
              Foto-Upload (Pflichtfeld: JPG, PNG, WEBP) *
            </label>
            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2.5 py-0.5 rounded border border-red-200 uppercase">
              Erforderlich
            </span>
          </div>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoUpload}
            className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#0A1C3A] file:text-white hover:file:bg-[#12284c] cursor-pointer"
          />

          {/* Image Live Preview */}
          {photoUrl && (
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold text-slate-600 block">Vorschau Ihres hochgeladenen Fotos:</span>
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-[#0A1C3A] shadow-md bg-white">
                <img src={photoUrl} alt="Upload Vorschau" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  Bereit
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Consent Checkboxes */}
        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={contestEntry}
              onChange={(e) => setContestEntry(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-slate-300 text-[#0A1C3A] focus:ring-[#0A1C3A]"
            />
            <span className="text-xs text-slate-700 leading-snug">
              Ich möchte am Fotowettbewerb <strong>„DEIN FONTES VITEA MOMENT“</strong> teilnehmen.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-slate-300 text-[#0A1C3A] focus:ring-[#0A1C3A]"
            />
            <span className="text-xs text-slate-700 leading-snug">
              Ich stimme der Veröffentlichung meiner Bewertung und meines Fotos auf der FONTES VITEA Website nach vorheriger Admin-Prüfung zu. *
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm shadow-xl transition transform hover:scale-[1.01] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 border border-slate-700"
          >
            <Upload className="w-4 h-4 text-sky-400" />
            <span>{isSubmitting ? "Wird eingereicht..." : "Bewertung & Foto jetzt einreichen"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
