import { useState, type FormEvent } from "react";
import { sendToOwner } from "@/lib/sendToOwner";
import HeaderBanner from "@/components/sections/hero/HeaderBanner";
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function KontaktPage() {
  const { openLegalModal } = useCart();

  const [formData, setFormData] = useState({
    vorname: "",
    nachname: "",
    email: "",
    anfrage: "",
    privacyAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (submitStatus !== "idle") setSubmitStatus("idle");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validation
    if (!formData.vorname.trim()) {
      setErrorMessage("Bitte geben Sie Ihren Vornamen ein.");
      setSubmitStatus("error");
      return;
    }

    if (!formData.nachname.trim()) {
      setErrorMessage("Bitte geben Sie Ihren Nachnamen ein.");
      setSubmitStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      setSubmitStatus("error");
      return;
    }

    if (!formData.anfrage.trim()) {
      setErrorMessage("Bitte geben Sie Ihre Anfrage ein.");
      setSubmitStatus("error");
      return;
    }

    if (!formData.privacyAccepted) {
      setErrorMessage("Bitte stimmen Sie der Datenschutzerklärung zu, um fortzufahren.");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);

    sendToOwner(
      { name: `${formData.vorname} ${formData.nachname}`, email: formData.email, message: formData.anfrage },
      "Kontaktformular",
    )
      .then(() => {
        setSubmitStatus("success");
        setFormData({
        vorname: "",
        nachname: "",
        email: "",
        anfrage: "",
        privacyAccepted: false,
      });
      })
      .catch(() => {
        setErrorMessage("Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@fontes-vitae.com.");
        setSubmitStatus("error");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="bg-transparent min-h-svh font-sans text-[#0A1C3A] pb-16">
      {/* Hero Header Banner */}
      <HeaderBanner
        title="KONTAKT"
        subtitle="Haben Sie Fragen zu unseren FONTES VITAE H2 Wasserstoff-Wasser Produkten, Ihrer Bestellung oder Kooperationen? Unser Team ist gerne für Sie da."
        badge="Kundenservice & Kontakt"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 sm:space-y-10">
        {/* Form and Direct Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Info Card */}
          <div className="lg:col-span-5 bg-[#0A1C3A] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-8 border border-slate-700">
            <div>
              <span className="text-sky-400 text-xs font-extrabold tracking-widest uppercase block mb-1">
                Direkter Kontakt
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                FONTES VITAE TEAM
              </h2>
              <p className="text-slate-300 text-xs leading-relaxed mt-2">
                Sie erreichen uns telefonisch oder per E-Mail. Wir freuen uns auf Ihre Anfrage!
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-sky-400 flex items-center justify-center shrink-0 border border-white/10">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider">Telefon</span>
                  <a href="tel:017660945171" className="font-extrabold text-white hover:text-sky-300 transition text-base">
                    017660945171
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-sky-400 flex items-center justify-center shrink-0 border border-white/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider">E-Mail (Allgemein)</span>
                  <a href="mailto:info@fontes-vitae.com" className="font-extrabold text-white hover:text-sky-300 transition block text-sm sm:text-base">
                    info@fontes-vitae.com
                  </a>
                  <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider mt-2">E-Mail (Bestellungen)</span>
                  <a href="mailto:bestellung@fontes-vitae.com" className="font-extrabold text-white hover:text-sky-300 transition block text-sm">
                    bestellung@fontes-vitae.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-sky-400 flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider">Unternehmenssitz</span>
                  <p className="font-semibold text-slate-200 text-sm leading-snug">
                    FONTES VITAE<br />
                    Industriestr. 23 A<br />
                    61449 Steinbach Ts.<br />
                    Deutschland
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/80 text-xs text-slate-300">
              <p className="font-bold text-white mb-1">Schnelle Reaktionszeit</p>
              <p>Wir antworten Ihnen schnellstmöglich auf Ihre Anfrage.</p>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-300 shadow-xl space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#0A1C3A] tracking-tight">
                Anfrage senden
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Füllen Sie das Formular aus – wir melden uns umgehend bei Ihnen.
              </p>
            </div>

            {submitStatus === "success" && (
              <div className="bg-emerald-50 border border-emerald-300 p-5 rounded-2xl flex items-start gap-3.5 text-emerald-900 text-xs leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-emerald-950 mb-1">Vielen Dank für Ihre Anfrage!</p>
                  <p>
                    Ihre Nachricht wurde erfolgreich an <strong className="font-bold">info@fontes-vitae.com</strong> gesendet. Wir antworten Ihnen schnellstmöglich auf Ihre Anfrage.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === "error" && errorMessage && (
              <div className="bg-rose-50 border border-rose-300 p-4 rounded-2xl flex items-center gap-3 text-rose-900 text-xs">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Vorname */}
                <div>
                  <label htmlFor="vorname" className="block text-xs font-bold uppercase tracking-wider text-[#0A1C3A] mb-1.5">
                    Vorname <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="vorname"
                    name="vorname"
                    value={formData.vorname}
                    onChange={handleInputChange}
                    placeholder="Max"
                    required
                    className="w-full bg-[#f4f6f8] border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#0A1C3A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0A1C3A] transition"
                  />
                </div>

                {/* Nachname */}
                <div>
                  <label htmlFor="nachname" className="block text-xs font-bold uppercase tracking-wider text-[#0A1C3A] mb-1.5">
                    Nachname <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="nachname"
                    name="nachname"
                    value={formData.nachname}
                    onChange={handleInputChange}
                    placeholder="Mustermann"
                    required
                    className="w-full bg-[#f4f6f8] border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#0A1C3A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0A1C3A] transition"
                  />
                </div>
              </div>

              {/* E-Mail-Adresse */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#0A1C3A] mb-1.5">
                  E-Mail-Adresse <span className="text-rose-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="max.mustermann@beispiel.de"
                  required
                  className="w-full bg-[#f4f6f8] border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#0A1C3A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0A1C3A] transition"
                />
              </div>

              {/* Ihre Anfrage */}
              <div>
                <label htmlFor="anfrage" className="block text-xs font-bold uppercase tracking-wider text-[#0A1C3A] mb-1.5">
                  Ihre Anfrage <span className="text-rose-600">*</span>
                </label>
                <textarea
                  id="anfrage"
                  name="anfrage"
                  rows={5}
                  value={formData.anfrage}
                  onChange={handleInputChange}
                  placeholder="Wie können wir Ihnen weiterhelfen?"
                  required
                  className="w-full bg-[#f4f6f8] border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#0A1C3A] font-medium focus:outline-none focus:ring-2 focus:ring-[#0A1C3A] transition resize-y"
                />
              </div>

              {/* Privacy consent checkbox */}
              <div className="flex items-start gap-3 bg-[#f4f6f8] p-3.5 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="privacyAccepted"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleInputChange}
                  required
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0A1C3A] focus:ring-[#0A1C3A] cursor-pointer"
                />
                <label htmlFor="privacyAccepted" className="text-xs text-slate-700 leading-snug cursor-pointer">
                  Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Zuordnung für eventuelle Rückfragen gespeichert werden. Weitere Informationen finden Sie in der{" "}
                  <button
                    type="button"
                    onClick={() => openLegalModal("datenschutz")}
                    className="font-bold text-[#0A1C3A] underline hover:text-[#12284c]"
                  >
                    Datenschutzerklärung
                  </button>
                  . <span className="text-rose-600">*</span>
                </label>
              </div>

              {/* Notice text */}
              <p className="text-xs text-slate-500 font-medium">
                Wir antworten Ihnen schnellstmöglich auf Ihre Anfrage.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-4 rounded-xl font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg transition transform active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>WIRD GESENDET...</span>
                ) : (
                  <>
                    <span>ANFRAGE SENDEN →</span>
                    <Send className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Responsive Google Maps Section */}
        <div className="space-y-6 pt-6 border-t border-slate-300">
          <div className="text-center space-y-2">
            <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-white px-4 py-1.5 rounded-full inline-block border border-slate-300">
              Standort &amp; Anfahrt
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0A1C3A]">
              UNSER STANDORT
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              FONTES VITAE • Industriestr. 23 A, 61449 Steinbach Ts., Deutschland
            </p>
          </div>

          <div className="w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-slate-300 shadow-xl relative bg-slate-200">
            <iframe
              title="FONTES VITAE Unternehmensstandort - Industriestr. 23 A, 61449 Steinbach Ts."
              src="https://maps.google.com/maps?q=Industriestr.%2023%20A,%2061449%20Steinbach%20Ts.&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
