import { Scale, Building2, Phone, ShieldCheck } from "lucide-react";

export default function ImpressumPage() {
  return (
    <div className="py-24 bg-transparent min-h-svh font-sans text-[#0A1C3A]">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-white px-4 py-1.5 rounded-full inline-block border border-slate-300 shadow-sm">
            Rechtliche Informationen
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0A1C3A]">
            Impressum
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Angaben gemäß § 5 TMG und rechtliche Hinweise zur FONTES VITAE Website.
          </p>
        </div>

        {/* Legal Details Grid */}
        <div className="space-y-6">
          
          {/* Company Identification */}
          <div className="bg-white p-8 rounded-3xl border border-slate-300 shadow-md space-y-4">
            <div className="flex items-center gap-3 text-[#0A1C3A]">
              <div className="w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">
                Angaben gemäß § 5 TMG
              </h2>
            </div>
            <div className="text-sm text-slate-700 leading-relaxed space-y-1 border-t border-slate-200 pt-4 font-semibold">
              <p className="text-base text-[#0A1C3A] font-black">FONTES VITAE</p>
              <p>Industriestr. 23 A</p>
              <p>61449 Steinbach Ts.</p>
              <p>Deutschland</p>
            </div>
          </div>

          {/* Management Board */}
          <div className="bg-white p-8 rounded-3xl border border-slate-300 shadow-md space-y-4">
            <div className="flex items-center gap-3 text-[#0A1C3A]">
              <div className="w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">
                Vertreten durch die Geschäftsführung
              </h2>
            </div>
            <div className="text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-4 space-y-1 font-semibold">
              <p>Iwona Török</p>
              <p>Sebastian Behlke</p>
              <p>Miroslav Török</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-8 rounded-3xl border border-slate-300 shadow-md space-y-4">
            <div className="flex items-center gap-3 text-[#0A1C3A]">
              <div className="w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">
                Kontakt
              </h2>
            </div>
            <div className="text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-4 space-y-2 font-semibold">
              <p className="flex items-center gap-2">
                <span className="text-slate-500 uppercase text-xs font-bold w-32">Telefon:</span>
                <a href="tel:017660945171" className="text-[#0A1C3A] hover:underline font-extrabold">017660945171</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500 uppercase text-xs font-bold w-32">E-Mail (Allgemein):</span>
                <a href="mailto:info@fontes-vitae.com" className="text-[#0A1C3A] hover:underline font-extrabold">info@fontes-vitae.com</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500 uppercase text-xs font-bold w-32">E-Mail (Bestellung):</span>
                <a href="mailto:bestellung@fontes-vitae.com" className="text-[#0A1C3A] hover:underline font-extrabold">bestellung@fontes-vitae.com</a>
              </p>
            </div>
          </div>

          {/* Dispute Resolution */}
          <div className="bg-white p-8 rounded-3xl border border-slate-300 shadow-md space-y-4">
            <div className="flex items-center gap-3 text-[#0A1C3A]">
              <div className="w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">
                Verbraucherstreitbeilegung &amp; OS-Plattform
              </h2>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 pt-4 space-y-2 font-medium">
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A1C3A] font-bold underline hover:text-sky-700"
                >
                  https://ec.europa.eu/consumers/odr
                </a>{" "}
                finden.
              </p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>

          {/* Legal Liability & Copyright Disclaimer */}
          <div className="bg-white p-8 rounded-3xl border border-slate-300 shadow-md space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            <div>
              <h3 className="text-base font-black uppercase text-[#0A1C3A] mb-2">Haftung für Inhalte</h3>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <h3 className="text-base font-black uppercase text-[#0A1C3A] mb-2">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <h3 className="text-base font-black uppercase text-[#0A1C3A] mb-2">Urheberrecht</h3>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
