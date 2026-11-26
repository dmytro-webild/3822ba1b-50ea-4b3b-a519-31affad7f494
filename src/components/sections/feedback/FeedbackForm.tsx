import { useState, type FormEvent } from "react";
import { sendToOwner } from "@/lib/sendToOwner";
import { Star, CheckCircle2, AlertCircle, MessageSquare, Send } from "lucide-react";
import { addReview } from "@/utils/feedbackStore";
import Media from "@/components/kit/Media";

interface ProductChoice {
  id: string;
  name: string;
  image: string;
  category: "h2" | "juice" | "kids";
}

const ALL_PRODUCTS: ProductChoice[] = [
  {
    id: "h2-water",
    name: "FONTES VITEA H2 (250 ml)",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795132125149-eraq7h8f.png",
    category: "h2",
  },
  {
    id: "juice-blaubeere",
    name: "FONTES VITEA Blaubeere (Blueberry)",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134384024-101x5eut.png",
    category: "juice",
  },
  {
    id: "juice-traube",
    name: "FONTES VITEA Traube (Grape)",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862677-cd34mdsd.png",
    category: "juice",
  },
  {
    id: "juice-himbeere",
    name: "FONTES VITEA Himbeere (Raspberry)",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134073186-opauqy4r.png",
    category: "juice",
  },
  {
    id: "juice-ingwer",
    name: "FONTES VITEA Ingwer (Ginger Tonic)",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133989332-pq9c0ikc.png",
    category: "juice",
  },
  {
    id: "juice-apfel-limette",
    name: "FONTES VITEA Apfel Limette (Apple Lime)",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134219308-nr3iwk4m.png",
    category: "juice",
  },
  {
    id: "juice-apfel-ingwer",
    name: "FONTES VITEA Apfel Ingwer (Apple Ginger)",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134384023-6vwzgda1.png",
    category: "juice",
  },
  {
    id: "kids-gingerix",
    name: "Kinderserie - Gingerix (Ingwer Tonic)",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216737-r3370ev4.png",
    category: "kids",
  },
  {
    id: "kids-limetix",
    name: "Kinderserie - Limetix (Limette mit Apfel)",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216742-q4yi2mw1.png",
    category: "kids",
  },
  {
    id: "kids-heidelberix",
    name: "Kinderserie - Heidelberix (Heidelbeere)",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216738-2s53ficu.png",
    category: "kids",
  },
  {
    id: "kids-himbeerixa",
    name: "Kinderserie - Himbeerixa (Himbeere)",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216740-l82r4ka1.png",
    category: "kids",
  },
  {
    id: "kids-apfelrix",
    name: "Kinderserie - Apfelrix (Apfel)",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216735-kk46ygff.png",
    category: "kids",
  },
];

const SWEETNESS_MAP: Record<number, string> = {
  1: "Kaum süß",
  2: "Leicht süß",
  3: "Mäßig süß",
  4: "Süß",
  5: "Sehr süß",
};

const ACIDITY_MAP: Record<number, string> = {
  1: "Kaum sauer",
  2: "Leicht sauer",
  3: "Mäßig sauer",
  4: "Sauer",
  5: "Sehr sauer",
};

const TARTNESS_MAP: Record<number, string> = {
  1: "Kaum herb",
  2: "Leicht herb",
  3: "Mäßig herb",
  4: "Herb",
  5: "Sehr herb",
};

const INTENSITY_MAP: Record<number, string> = {
  1: "Sehr mild",
  2: "Mild",
  3: "Mittlere Intensität",
  4: "Intensiv",
  5: "Sehr intensiv",
};

interface TasteBarProps {
  label: string;
  colorName: "orange" | "blue" | "green" | "purple";
  value: number; // 0..5
  onChange: (val: number) => void;
  labelsMap: Record<number, string>;
}

function TasteBar({ label, colorName, value, onChange, labelsMap }: TasteBarProps) {
  const styles = {
    orange: {
      bg: "bg-amber-500 text-white border-amber-500 shadow-amber-500/20",
      badge: "bg-amber-50 text-amber-800 border-amber-300",
      fill: "bg-amber-500",
    },
    blue: {
      bg: "bg-sky-500 text-white border-sky-500 shadow-sky-500/20",
      badge: "bg-sky-50 text-sky-800 border-sky-300",
      fill: "bg-sky-500",
    },
    green: {
      bg: "bg-emerald-600 text-white border-emerald-600 shadow-emerald-600/20",
      badge: "bg-emerald-50 text-emerald-800 border-emerald-300",
      fill: "bg-emerald-600",
    },
    purple: {
      bg: "bg-purple-600 text-white border-purple-600 shadow-purple-600/20",
      badge: "bg-purple-50 text-purple-800 border-purple-300",
      fill: "bg-purple-600",
    },
  }[colorName];

  return (
    <div className="space-y-2.5 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-black uppercase tracking-wider text-[#0A1C3A]">
          {label} *
        </span>
        {value > 0 ? (
          <span className={`text-xs font-black px-3 py-1 rounded-full border shadow-xs ${styles.badge}`}>
            {labelsMap[value]} – {value}/5
          </span>
        ) : (
          <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
            Bitte wählen (1–5) *
          </span>
        )}
      </div>

      {/* 5 Segment Buttons */}
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((step) => {
          const isSelected = step === value;
          const isFilled = step <= value;
          return (
            <button
              key={step}
              type="button"
              onClick={() => onChange(step)}
              className={`h-11 rounded-xl border font-black text-sm transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                isSelected
                  ? `${styles.bg} shadow-md scale-105 z-10`
                  : isFilled
                  ? `${styles.fill} text-white border-transparent opacity-75`
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
              }`}
            >
              <span>{step}</span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between px-1 text-[10px] text-slate-400 font-bold">
        <span>1 ({labelsMap[1]})</span>
        <span>5 ({labelsMap[5]})</span>
      </div>
    </div>
  );
}

export default function FeedbackForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(ALL_PRODUCTS[0].id);

  const [rating, setRating] = useState(0); // 0 = unselected
  const [sweetness, setSweetness] = useState(0); // 0 = unselected
  const [acidity, setAcidity] = useState(0); // 0 = unselected
  const [tartness, setTartness] = useState(0); // 0 = unselected
  const [intensity, setIntensity] = useState(0); // 0 = unselected

  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedProduct = ALL_PRODUCTS.find((p) => p.id === selectedProductId) || ALL_PRODUCTS[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!firstName.trim()) {
      setErrorMsg("Bitte geben Sie Ihren Vornamen ein.");
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    if (rating === 0) {
      setErrorMsg("Bitte wählen Sie eine Gesamtbewertung von 1 bis 5 Sternen.");
      return;
    }

    if (sweetness === 0) {
      setErrorMsg("Bitte wählen Sie einen Wert für Süße (1–5).");
      return;
    }

    if (acidity === 0) {
      setErrorMsg("Bitte wählen Sie einen Wert für Säure (1–5).");
      return;
    }

    if (tartness === 0) {
      setErrorMsg("Bitte wählen Sie einen Wert für Herbheit (1–5).");
      return;
    }

    if (intensity === 0) {
      setErrorMsg("Bitte wählen Sie einen Wert für Geschmacksintensität (1–5).");
      return;
    }

    if (!comment.trim()) {
      setErrorMsg("Bitte verfassen Sie einen schriftlichen Erfahrungsbericht.");
      return;
    }

    if (!consent) {
      setErrorMsg("Bitte stimmen Sie der Veröffentlichung Ihrer Bewertung zu.");
      return;
    }

    setIsSubmitting(true);

    // Automatischer E-Mail-Versand aller Daten an info@fontes-vitae.com
    sendToOwner(
      {
        vorname: firstName.trim(),
        email: email.trim(),
        instagram: instagram.trim() || "-",
        tiktok: tiktok.trim() || "-",
        produkt: selectedProduct.name,
        bewertung: `${rating}/5 Sterne`,
        suesse: `${SWEETNESS_MAP[sweetness]} – ${sweetness}/5`,
        saeure: `${ACIDITY_MAP[acidity]} – ${acidity}/5`,
        herbheit: `${TARTNESS_MAP[tartness]} – ${tartness}/5`,
        geschmacksintensitaet: `${INTENSITY_MAP[intensity]} – ${intensity}/5`,
        empfaenger: "info@fontes-vitae.com",
        message: comment.trim(),
      },
      "Kundenbewertung",
    ).catch(() => undefined);

    try {
      // Direct publication in feedback store
      addReview({
        firstName: firstName.trim(),
        email: email.trim(),
        instagram: instagram.trim() || undefined,
        tiktok: tiktok.trim() || undefined,
        product: selectedProduct.name,
        productImage: selectedProduct.image,
        rating,
        tasteRatings: {
          sweetness,
          acidity,
          tartness,
          intensity,
        },
        comment: comment.trim(),
        consent: true,
      });

      setSuccessMsg("Vielen Dank! Deine Bewertung wurde erfolgreich veröffentlicht.");

      // Reset form
      setFirstName("");
      setEmail("");
      setInstagram("");
      setTiktok("");
      setSelectedProductId(ALL_PRODUCTS[0].id);
      setRating(0);
      setSweetness(0);
      setAcidity(0);
      setTartness(0);
      setIntensity(0);
      setComment("");
      setConsent(false);
    } catch {
      setErrorMsg("Fehler beim Speichern. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 font-sans">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#0A1C3A] text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
          <MessageSquare className="w-4 h-4 text-sky-400" />
          <span>Feedback &amp; Produktbewertung</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0A1C3A]">
          Deine Meinung zählt!
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Teile deine Erfahrungen mit FONTES VITEA® – deine ehrliche Produktbewertung unterstützt unsere Community und hilft anderen Kunden.
        </p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-800 p-4 rounded-2xl border border-red-200 flex items-center gap-3 text-xs sm:text-sm font-semibold max-w-3xl mx-auto">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-50 text-emerald-900 p-5 rounded-2xl border border-emerald-200 flex items-center gap-3 text-xs sm:text-sm font-bold shadow-sm max-w-3xl mx-auto">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
        {/* Contact Info (Vorname, E-Mail, Instagram, TikTok) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A1C3A]">
              Vorname *
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="z. B. Maximilian"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1C3A] text-[#0A1C3A] font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A1C3A]">
              E-Mail-Adresse *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="z. B. max@beispiel.de"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1C3A] text-[#0A1C3A] font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A1C3A]">
              Instagram (optional)
            </label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@username"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1C3A] text-[#0A1C3A]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A1C3A]">
              TikTok (optional)
            </label>
            <input
              type="text"
              value={tiktok}
              onChange={(e) => setTiktok(e.target.value)}
              placeholder="@username"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1C3A] text-[#0A1C3A]"
            />
          </div>
        </div>

        {/* Product Selection with Automatic 250-ml Can Image */}
        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A1C3A]">
            Produktauswahl (12 Produkte inkl. Kinderserie) *
          </label>
          <div className="flex flex-col sm:flex-row gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-300">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-xl border border-slate-200 p-2 flex items-center justify-center shrink-0 shadow-sm">
              <Media
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex-1 space-y-2 w-full">
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-[#0A1C3A] focus:outline-none focus:ring-2 focus:ring-[#0A1C3A] cursor-pointer"
              >
                <optgroup label="Wasserstoff-Wasser (Original H2)">
                  {ALL_PRODUCTS.filter((p) => p.category === "h2").map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Vital-Fruchtsäfte (100% Frucht)">
                  {ALL_PRODUCTS.filter((p) => p.category === "juice").map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Kinderserie (Special Edition)">
                  {ALL_PRODUCTS.filter((p) => p.category === "kids").map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name}
                    </option>
                  ))}
                </optgroup>
              </select>
              <p className="text-xs text-slate-500 font-medium">
                Ausgewähltes Produkt: <strong className="text-[#0A1C3A] font-bold">{selectedProduct.name}</strong> (250-ml Aluminiumdose)
              </p>
            </div>
          </div>
        </div>

        {/* 5-Star Overall Rating */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-300 space-y-2 text-center sm:text-left">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A1C3A]">
            Gesamtbewertung (1–5 Sterne) *
          </label>
          <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 transition transform hover:scale-125 focus:outline-none cursor-pointer"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating ? "text-amber-400 fill-amber-400 drop-shadow-xs" : "text-slate-300"
                  }`}
                />
              </button>
            ))}
            {rating > 0 ? (
              <span className="ml-3 text-xs font-bold text-slate-700 font-mono">
                ({rating} von 5 Sterne)
              </span>
            ) : (
              <span className="ml-3 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                Bitte auswählen (1–5 Sterne) *
              </span>
            )}
          </div>
        </div>

        {/* Taste Profile (4 Bars with 5 segments each: Süße, Säure, Herbheit, Geschmacksintensität) */}
        <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-300 space-y-4">
          <div>
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#0A1C3A]">
              Geschmacksprofil-Bewertung (Pflichtfelder, Skala 1 bis 5)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Wähle für jede der vier Eigenschaften die passende Stufe aus.
            </p>
          </div>

          <div className="space-y-4">
            {/* Süße */}
            <TasteBar
              label="Süße (Orange)"
              colorName="orange"
              value={sweetness}
              onChange={setSweetness}
              labelsMap={SWEETNESS_MAP}
            />

            {/* Säure */}
            <TasteBar
              label="Säure (Blau)"
              colorName="blue"
              value={acidity}
              onChange={setAcidity}
              labelsMap={ACIDITY_MAP}
            />

            {/* Herbheit */}
            <TasteBar
              label="Herbheit (Grün)"
              colorName="green"
              value={tartness}
              onChange={setTartness}
              labelsMap={TARTNESS_MAP}
            />

            {/* Geschmacksintensität */}
            <TasteBar
              label="Geschmacksintensität (Violett)"
              colorName="purple"
              value={intensity}
              onChange={setIntensity}
              labelsMap={INTENSITY_MAP}
            />
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
            placeholder="Beschreiben Sie Geschmack, Verträglichkeit, Erfrischung und Ihren Gesamteindruck..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1C3A] text-[#0A1C3A] font-medium"
          />
        </div>

        {/* Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer p-4 bg-slate-50 rounded-2xl border border-slate-300 hover:bg-slate-100 transition">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0A1C3A] focus:ring-[#0A1C3A] cursor-pointer"
            />
            <span className="text-xs text-slate-700 leading-relaxed font-medium">
              Ich bin damit einverstanden, dass mein Vorname, meine Produktbewertung, mein Geschmacksprofil und mein Feedback öffentlich auf der Website von FONTES VITAE® angezeigt werden. Meine E-Mail-Adresse bleibt vertraulich. Meine Einwilligung kann ich jederzeit widerrufen (siehe{" "}
              <a
                href="/impressum"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold text-[#0A1C3A] hover:text-sky-600"
              >
                Datenschutzerklärung
              </a>
              ). *
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-4 rounded-xl font-black uppercase tracking-wider text-sm shadow-xl transition transform hover:scale-[1.01] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2.5 border border-slate-700 cursor-pointer"
          >
            <Send className="w-4 h-4 text-sky-400" />
            <span>{isSubmitting ? "Wird eingereicht..." : "Bewertung jetzt absenden"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
