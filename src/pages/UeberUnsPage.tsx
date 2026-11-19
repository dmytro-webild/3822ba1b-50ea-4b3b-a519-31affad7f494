import { useState, type FormEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building2,
  Users,
  CheckCircle2,
  Send,
  Building,
  Heart,
  Globe2
} from "lucide-react";

export default function UeberUnsPage() {
  const [b2bSubmitted, setB2bSubmitted] = useState(false);
  const [b2bFormData, setB2bFormData] = useState({
    company: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: "Getränke-Großhandel",
    message: ""
  });

  const handleB2bSubmit = (e: FormEvent) => {
    e.preventDefault();
    setB2bSubmitted(true);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-[#0A1C3A] font-sans pb-24">
      {/* Hero Header */}
      <section className="bg-[#0A1C3A] text-white py-20 px-6 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-6 relative z-10">
          <RouterLink
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-white transition uppercase tracking-wider bg-white/10 px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
          </RouterLink>

          <div className="space-y-4 max-w-3xl">
            <span className="text-sky-400 text-xs font-extrabold tracking-widest uppercase bg-sky-950/60 px-4 py-1.5 rounded-full inline-block border border-sky-800/50">
              Familienunternehmen &amp; B2B-Vertrieb
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
              ÜBER UNS – FONTES VITEA
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              Die Quelle des Lebens. Als familiengeführtes Unternehmen mit Herz und Hingabe vertreiben wir reinstes molekulares H₂-Wasserstoffwasser in Deutschland, Österreich und der Schweiz.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story & Philosophy */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {/* Family Business Story Card */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 text-sky-400" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0A1C3A]">
              Unsere Familiengeschichte &amp; Herkunft
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A1C3A] uppercase tracking-tight">
              Aus Familienerfahrung geboren – Für Deine maximale Lebensqualität
            </h2>
            <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-700">
              FONTES VITEA ist kein anonymer Großkonzern, sondern ein leidenschaftliches Familienunternehmen mit tiefen Wurzeln im mitteleuropäischen Raum. Unsere Reise begann mit dem persönlichen Wunsch nach reiner, bioverfügbarer Hydration für unsere eigene Familie. Was einst als Suche nach der reinsten Wasserquelle und den positiven Eigenschaften von gelöstem molekularem Wasserstoff begann, wuchs zu einer Vision heran: Höchste Qualität für bewusste Menschen in Deutschland, Österreich und der Schweiz zugänglich zu machen.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              Von der sorgfältigen Auswahl unserer 136 Meter tiefen Mineralquelle über die physikalische Anreicherung mit reinem H₂-Gas bis hin zur Abfüllung in 100 % BPA-freie Aluminiumdosen begleiten wir jeden Schritt persönlich. Wir stehen mit unserem Familiennamen für kompromisslose Reinheit, Transparenz und ehrlichen Service.
            </p>
          </div>

          {/* DACH Distribution Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <Globe2 className="w-6 h-6 text-[#0A1C3A] shrink-0" />
              <div>
                <span className="text-xs font-black uppercase text-[#0A1C3A] block">Deutschland 🇩🇪</span>
                <span className="text-[11px] text-slate-500">Zentrales Lager &amp; Vertrieb</span>
              </div>
            </div>
            <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <Globe2 className="w-6 h-6 text-[#0A1C3A] shrink-0" />
              <div>
                <span className="text-xs font-black uppercase text-[#0A1C3A] block">Österreich 🇦🇹</span>
                <span className="text-[11px] text-slate-500">Direkte Belieferung</span>
              </div>
            </div>
            <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <Globe2 className="w-6 h-6 text-[#0A1C3A] shrink-0" />
              <div>
                <span className="text-xs font-black uppercase text-[#0A1C3A] block">Schweiz 🇨🇭</span>
                <span className="text-[11px] text-slate-500">Express-Versand DACH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Family Photos Visual Container */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#e2e8f0] px-4 py-1.5 rounded-full inline-block border border-slate-300">
              Einblick &amp; Werte
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0A1C3A]">
              Unsere Gründer &amp; Familie
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
              Persönlicher Kontakt, ehrlicher Austausch und gelebte Familienwerte stehen bei uns an erster Stelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visual Photo Card 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-52 bg-slate-100 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#0A1C3A]/10 text-[#0A1C3A] flex items-center justify-center">
                    <Users className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0A1C3A]">Familienführung &amp; Management</h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Familie FONTES VITEA – Qualität und Herzlichkeit in zweiter Generation
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0A1C3A]">Persönliche Betreuung in der DACH-Region</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Jede Anfrage und Bestellung wird von unserem eigenen Team bearbeitet. Wir legen größten Wert auf langjährige Kundenbeziehungen und ein vertrauensvolles Miteinander.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>📍 Hauptsitz &amp; Logistik Deutschland</span>
                <span className="text-sky-600">Familiengeführt</span>
              </div>
            </div>

            {/* Visual Photo Card 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-52 bg-slate-100 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#0A1C3A]/10 text-[#0A1C3A] flex items-center justify-center">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0A1C3A]">Qualitätssicherung &amp; Quellabfüllung</h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Strenge Kontrollen direkt an der Tiefenquelle (136 m)
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0A1C3A]">Laborgeprüfte Sicherheit</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Jede Charge wird in unabhängigen deutschen Laboratorien auf Reinheit, H₂-Gaskonzentration und Haltbarkeit geprüft. So gewährleisten wir gleichbleibende Höchstqualität.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>🛡️ ISO-Zertifiziert &amp; BPA-Frei</span>
                <span className="text-sky-600">100% Sicher</span>
              </div>
            </div>
          </div>
        </div>

        {/* The 3 Pillars */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#e2e8f0] px-4 py-1.5 rounded-full inline-block border border-slate-300">
              Drei Fundamente
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0A1C3A]">
              Unsere 3 Säulen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-4 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#0A1C3A] text-sky-400 flex items-center justify-center font-black text-lg shadow-md">
                01
              </div>
              <h3 className="text-xl font-black text-[#0A1C3A] uppercase">Absolute Qualität</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Reinstes Wasserstoff-Wasser in BPA-freien, 100% nachhaltigen Aluminiumdosen für maximale Haltbarkeit des gelösten H2-Gases.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-4 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#0A1C3A] text-sky-400 flex items-center justify-center font-black text-lg shadow-md">
                02
              </div>
              <h3 className="text-xl font-black text-[#0A1C3A] uppercase">Kompromisslose Transparenz</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Vollständige Deklaration aller Nährwerte. 0 kcal, 0 g Zucker, 0 künstliche Zusatzstoffe. Dosenpfand transparent ausgewiesen.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-4 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#0A1C3A] text-sky-400 flex items-center justify-center font-black text-lg shadow-md">
                03
              </div>
              <h3 className="text-xl font-black text-[#0A1C3A] uppercase">Wissenschaftliche Fundierung</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Basierend auf aktuellen Studien zur Wirkung von gelöstem Wasserstoff auf Mitochondrien, Laktatabbau und Zellschutz.
              </p>
            </div>
          </div>
        </div>

        {/* Dedicated B2B Area: PARTNER WERDEN */}
        <div id="b2b" className="bg-[#0A1C3A] text-white rounded-3xl p-8 sm:p-14 space-y-12 shadow-2xl relative overflow-hidden">
          <div className="space-y-4 max-w-3xl">
            <span className="text-sky-400 text-xs font-extrabold tracking-widest uppercase bg-sky-950 px-4 py-1.5 rounded-full inline-block border border-sky-800">
              Partner werden &amp; B2B-Vertrieb
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              B2B-PARTNER WERDEN
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Werden Sie Vertriebspartner von FONTES VITEA. Wir beliefern Getränkehändler, Fitnessstudios, Biohacking-Zentren, Sportvereine, Premium-Hotels, Wellness-Resorts, den gehobenen Einzelhandel und Unternehmen in Deutschland, Österreich und der Schweiz.
            </p>
          </div>

          {/* B2B Advantages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
              <Building className="w-7 h-7 text-sky-400" />
              <h3 className="text-base font-bold text-white uppercase">Attraktive Margen</h3>
              <p className="text-xs text-slate-300">Staffelpreise für Groß- &amp; Einzelhändler mit hoher Rendite.</p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
              <Globe2 className="w-7 h-7 text-sky-400" />
              <h3 className="text-base font-bold text-white uppercase">DACH-Logistik</h3>
              <p className="text-xs text-slate-300">Schnelle Palette- und Kartonlieferungen in DE, AT &amp; CH.</p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
              <Sparkles className="w-7 h-7 text-sky-400" />
              <h3 className="text-base font-bold text-white uppercase">Marketing-Support</h3>
              <p className="text-xs text-slate-300">Werbematerialien, POS-Displays und digitale Assets.</p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
              <ShieldCheck className="w-7 h-7 text-sky-400" />
              <h3 className="text-base font-bold text-white uppercase">Laborzertifiziert</h3>
              <p className="text-xs text-slate-300">100% BPA-frei, laborgeprüft und verlässlich nach ISO-Standard.</p>
            </div>
          </div>

          {/* Partner Logos Row (Placeholder required: "Ihr Logo könnte als Erstes hier stehen") */}
          <div className="space-y-4 pt-4 border-t border-slate-700">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block text-center">
              Partner-Netzwerk in der DACH-Region
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-dashed border-sky-400/50 p-6 rounded-2xl text-center space-y-1 hover:bg-white/10 transition">
                <span className="text-xs font-black text-sky-400 uppercase block">„Ihr Logo könnte als Erstes hier stehen“</span>
                <span className="text-[11px] text-slate-400">Erster Partner in Ihrer Region werden</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center space-y-1">
                <span className="text-xs font-bold text-slate-300 uppercase block">Fitness &amp; Sport Club Partner</span>
                <span className="text-[11px] text-slate-400">Jetzt anfragen &amp; Exklusivität sichern</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center space-y-1">
                <span className="text-xs font-bold text-slate-300 uppercase block">Hotel &amp; Spa Partner</span>
                <span className="text-[11px] text-slate-400">Premium Hydration für Ihre Gäste</span>
              </div>
            </div>
          </div>

          {/* B2B Contact Form */}
          <div className="bg-white text-[#0A1C3A] rounded-2xl p-6 sm:p-10 space-y-6 shadow-xl">
            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase text-[#0A1C3A]">
                Geschäftliche Anfrage senden (B2B)
              </h3>
              <p className="text-xs text-slate-600">
                Füllen Sie das Formular aus. Unser B2B-Vertriebsteam meldet sich innerhalb von 24 Stunden persönlich bei Ihnen.
              </p>
            </div>

            {b2bSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-xl space-y-3 text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-emerald-900 uppercase">Vielen Dank für Ihre B2B-Anfrage!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Ihre Anfrage wurde erfolgreich an unser Vertriebsteam für Deutschland, Österreich und die Schweiz übermittelt. Wir setzen uns in Kürze persönlich mit Ihnen in Verbindung.
                </p>
                <button
                  onClick={() => setB2bSubmitted(false)}
                  className="text-xs font-bold text-emerald-900 underline pt-2 hover:text-emerald-700"
                >
                  Weitere Anfrage senden
                </button>
              </div>
            ) : (
              <form onSubmit={handleB2bSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0A1C3A] uppercase mb-1">Firmenname *</label>
                    <input
                      type="text"
                      required
                      placeholder="z.B. BioHealth Fitness GmbH"
                      value={b2bFormData.company}
                      onChange={(e) => setB2bFormData({ ...b2bFormData, company: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-[#0A1C3A] focus:outline-none focus:ring-2 focus:ring-[#0A1C3A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0A1C3A] uppercase mb-1">Ansprechpartner *</label>
                    <input
                      type="text"
                      required
                      placeholder="Max Mustermann"
                      value={b2bFormData.contactPerson}
                      onChange={(e) => setB2bFormData({ ...b2bFormData, contactPerson: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-[#0A1C3A] focus:outline-none focus:ring-2 focus:ring-[#0A1C3A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0A1C3A] uppercase mb-1">E-Mail-Adresse *</label>
                    <input
                      type="email"
                      required
                      placeholder="b2b@unternehmen.de"
                      value={b2bFormData.email}
                      onChange={(e) => setB2bFormData({ ...b2bFormData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-[#0A1C3A] focus:outline-none focus:ring-2 focus:ring-[#0A1C3A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0A1C3A] uppercase mb-1">Telefonnummer *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+49 176 60945171"
                      value={b2bFormData.phone}
                      onChange={(e) => setB2bFormData({ ...b2bFormData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-[#0A1C3A] focus:outline-none focus:ring-2 focus:ring-[#0A1C3A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0A1C3A] uppercase mb-1">Branche / Bereich</label>
                    <select
                      value={b2bFormData.category}
                      onChange={(e) => setB2bFormData({ ...b2bFormData, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-[#0A1C3A] focus:outline-none focus:ring-2 focus:ring-[#0A1C3A]"
                    >
                      <option value="Getränke-Großhandel">Getränke-Großhandel</option>
                      <option value="Fitnessstudio / Biohacking">Fitnessstudio / Biohacking</option>
                      <option value="Sportverein / Athleten">Sportverein / Athleten</option>
                      <option value="Hotel / Spa / Gastronomie">Hotel / Spa / Gastronomie</option>
                      <option value="Einzelhandel / Reformhaus">Einzelhandel / Reformhaus</option>
                      <option value="Sonstiges Unternehmen">Sonstiges Unternehmen</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A1C3A] uppercase mb-1">Ihre Nachricht oder Produktanfrage</label>
                  <textarea
                    rows={3}
                    placeholder="Beschreiben Sie Ihre gewünschten Mengen oder Fragen..."
                    value={b2bFormData.message}
                    onChange={(e) => setB2bFormData({ ...b2bFormData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-[#0A1C3A] focus:outline-none focus:ring-2 focus:ring-[#0A1C3A]"
                  />
                </div>

                <div className="pt-2 flex flex-wrap justify-between items-center gap-4">
                  <div className="text-[11px] text-slate-500">
                    Direkte Anfragen: <span className="font-bold text-[#0A1C3A]">info@fontesvitea.de</span> | Tel: <span className="font-bold text-[#0A1C3A]">017660945171</span>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#0A1C3A] hover:bg-[#12284c] text-white font-extrabold uppercase px-8 py-3.5 rounded-xl text-xs tracking-wider flex items-center gap-2 shadow-lg transition transform hover:scale-105"
                  >
                    <Send className="w-4 h-4 text-sky-400" />
                    <span>B2B-Anfrage absenden</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Navigation & Science Link CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <RouterLink
            to="/#shop"
            className="inline-flex items-center gap-2 bg-[#0A1C3A] hover:bg-[#12284c] text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition"
          >
            Jetzt Produkte im Shop bestellen <ArrowRight className="w-4 h-4" />
          </RouterLink>
          <RouterLink
            to="/wissenschaft"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#0A1C3A] border border-slate-300 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition"
          >
            Wissenschaft &amp; Studien ansehen <ArrowRight className="w-4 h-4" />
          </RouterLink>
        </div>
      </section>
    </div>
  );
}
