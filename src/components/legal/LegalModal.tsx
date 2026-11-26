import { useCart } from "@/context/CartContext";
import { X, Shield, FileText, Scale, RotateCcw } from "lucide-react";

export default function LegalModal() {
  const { activeLegalModal, closeLegalModal } = useCart();

  if (!activeLegalModal) return null;

  const titles = {
    impressum: "Impressum",
    datenschutz: "Datenschutzerklärung",
    agb: "Allgemeine Geschäftsbedingungen (AGB)",
    widerruf: "Widerrufsbelehrung",
  };

  const icons = {
    impressum: Scale,
    datenschutz: Shield,
    agb: FileText,
    widerruf: RotateCcw,
  };

  const Icon = icons[activeLegalModal];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity"
        onClick={closeLegalModal}
      />

      <div className="relative bg-[#e5e9ec] w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-300 overflow-hidden text-[#081427]">
        {/* Header */}
        <div className="bg-[#0A1C3A] text-white p-6 flex items-center justify-between border-b border-slate-300">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-slate-200" />
            <div>
              <span className="text-slate-300 text-xs font-extrabold uppercase tracking-widest block">Rechtliche Hinweise</span>
              <h2 className="text-2xl font-bold uppercase tracking-tight">{titles[activeLegalModal]}</h2>
            </div>
          </div>
          <button
            onClick={closeLegalModal}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-[#12284c] transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-slate-700 leading-relaxed">
          {activeLegalModal === "impressum" && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-[#0a192f] text-sm">Angaben gemäß § 5 TMG</h3>
                <p className="font-semibold text-slate-800">FONTES VITAE</p>
                <p>Industriestr. 23 A</p>
                <p>61449 Steinbach Ts.</p>
                <p>Deutschland</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-[#0a192f] text-sm">Vertreten durch die Geschäftsführung</h3>
                <p>Iwona Török</p>
                <p>Sebastian Behlke</p>
                <p>Miroslav Török</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-[#0a192f] text-sm">Kontakt</h3>
                <p>Telefon: 017660945171</p>
                <p>E-Mail Allgemein: info@fontes-vitae.com</p>
                <p>E-Mail Bestellungen: bestellung@fontes-vitae.com</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-[#0a192f] text-sm">Streitschlichtung</h3>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </div>
          )}

          {activeLegalModal === "datenschutz" && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-[#0a192f] text-sm">1. Datenschutz auf einen Blick</h3>
                <p>
                  Der Schutz Ihrer persönlichen Daten ist FONTES VITAE ein besonderes Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO) sowie dieser Datenschutzerklärung.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-[#0a192f] text-sm">2. Datenerfassung auf unserer Website</h3>
                <p>
                  Ihre Daten werden einerseits dadurch erhoben, dass Sie uns diese mitteilen (z. B. im Kontaktdatenformular oder bei der Shop-Bestellung). Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (z. B. IP-Adresse, Browser-Typ).
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-[#0a192f] text-sm">3. Rechte der betroffenen Person</h3>
                <p>
                  Sie haben jederzeit das Recht auf kostenfreie Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
                </p>
              </div>
            </div>
          )}

          {activeLegalModal === "agb" && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-[#0a192f] text-sm">1. Geltungsbereich</h3>
                <p>
                  Für alle Bestellungen über unseren Online-Shop gelten die nachfolgenden Allgemeinen Geschäftsbedingungen von FONTES VITAE (Industriestr. 23 A, 61449 Steinbach Ts.).
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-[#0a192f] text-sm">2. Vertragspartner & Vertragsschluss</h3>
                <p>
                  Der Kaufvertrag kommt zustande mit FONTES VITAE. Mit Einstellung der Produkte in den Online-Shop geben wir ein verbindliches Angebot zum Vertragsschluss über diese Artikel ab.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-[#0a192f] text-sm">3. Preise & Dosenpfand</h3>
                <p>
                  Die angegebenen Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer und inklusive des gesetzlichen Dosenpfands in Höhe von 0,25 € pro Dose.
                </p>
              </div>
            </div>
          )}

          {activeLegalModal === "widerruf" && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-[#0a192f] text-sm">Widerrufsrecht</h3>
                <p>
                  Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter die Waren in Besitz genommen haben.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-[#0a192f] text-sm">Ausübung des Widerrufs</h3>
                <p>
                  Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (FONTES VITAE, Industriestr. 23 A, 61449 Steinbach Ts., E-Mail: bestellung@fontes-vitae.com) mittels einer eindeutigen Erklärung über Ihren Entschluss informieren.
                </p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-300 flex justify-end">
            <button
              onClick={closeLegalModal}
              className="bg-[#0A1C3A] text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-[#12284c] transition"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
