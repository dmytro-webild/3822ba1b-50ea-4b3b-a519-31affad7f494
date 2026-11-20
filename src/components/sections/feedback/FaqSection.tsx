import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Was unterscheidet FONTES VITEA Quellwasser von herkömmlichem Wasser?",
    answer: "FONTES VITEA ist reinste artesische Quellwasser-Perfektion, angereichert mit mindestens 2.8 mg/L hochreinem molekularem Wasserstoff (H2). Im Gegensatz zu gewöhnlichem Mineralwasser wirkt H2 als gezieltes Antioxidans auf zellulärer Ebene und schützt den Körper vor oxidativem Stress.",
  },
  {
    question: "Wie funktioniert der Fotowettbewerb „DEIN FONTES VITEA MOMENT“?",
    answer: "Laden Sie bei Ihrer Produktbewertung einfach ein Foto Ihres FONTES VITEA Genussmoments hoch und aktivieren Sie das Häkchen für den Fotowettbewerb. Jeden Monat prämiert unser Team die besten Fotos: 1. Platz erhält 100 Treuepunkte, 2. Platz 50 Treuepunkte und 3. Platz 20 Treuepunkte.",
  },
  {
    question: "Wie erhalte und löse ich meine Treuepunkte für Gutscheine ein?",
    answer: "Treuepunkte werden Ihnen nach Prämierung oder Aktionen gutgeschrieben. Sie können Ihre Punkte direkt auf dieser Seite einlösen: 150 Punkte entsprechen einem 20 € Gutschein, 50 Punkte einem 10 € Gutschein und 20 Punkte einem 5 € Gutschein. Der generierte Gutscheincode wird direkt im Checkout auf Ihre Bestellung angerechnet.",
  },
  {
    question: "Warum werden Aluminiumdosen verwendet und sind sie BPA-frei?",
    answer: "Molekularer Wasserstoff ist das kleinste Element des Universums und kann im Laufe der Zeit durch Plastikflaschen entweichen. Unsere Dosen aus 100 % recycelbarem Aluminium besitzen eine patentierte, 100 % BPA-freie Innenbeschichtung, die den Wasserstoffgehalt und die maximale Frische garantiert.",
  },
  {
    question: "Was zeichnet die Kinderserie (Gingerix, Himbeerixa, Limetix etc.) aus?",
    answer: "Unsere Kinderserie besteht aus 100 % natürlichem Direktsaft in Kombination mit erfrischendem H2-Quellwasser. Sie enthält keinerlei zugesetzten Zucker, keine künstlichen Farbstoffe und keine Konservierungsstoffe. Ideal für Schule, Sport und Freizeit.",
  },
  {
    question: "Wann sehe ich meine eingereichte Bewertung auf der Website?",
    answer: "Um eine hohe Qualität und Einhaltung unserer Community-Richtlinien zu gewährleisten, werden alle eingereichten Bewertungen und Fotos von unserem Moderations-Team geprüft. Nach erfolgreicher Freigabe erscheint Ihre Bewertung umgehend auf unserer Seite.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 font-sans">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#0A1C3A] text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
          <HelpCircle className="w-4 h-4 text-sky-400" />
          <span>Häufig Gestellte Fragen</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0A1C3A]">
          Integrierte FAQ-Sektion
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Alles, was Sie über FONTES VITEA, den Fotowettbewerb, unser Treuepunktesystem und den Versand wissen müssen.
        </p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition duration-200 bg-slate-50 hover:bg-slate-100/80"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-5 font-bold text-sm sm:text-base text-[#0A1C3A] flex items-center justify-between gap-4"
              >
                <span>{faq.question}</span>
                <div
                  className={`w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center shrink-0 transition transform ${
                    isOpen ? "rotate-180 bg-[#0A1C3A] text-white border-[#0A1C3A]" : "text-[#0A1C3A]"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
