import { useState, type FormEvent } from "react";
import { sendToOwner } from "@/lib/sendToOwner";
import { Link as RouterLink } from "react-router-dom";
import HeaderBanner from "@/components/sections/hero/HeaderBanner";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building2,
  Users,
  CheckCircle2,
  Send,
  Building,
  Heart,
  Globe2,
  FileCheck2,
  ExternalLink,
  X,
  Award,
  Flame,
  FileText
} from "lucide-react";

const CERT_WATER_SCAN_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795130857695-2otnb1rt.webp";
const CERT_H2_SCAN_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795130857695-m3v1128k.webp";

export default function UeberUnsPage() {
  const [b2bSubmitted, setB2bSubmitted] = useState(false);
  const [activeCertModal, setActiveCertModal] = useState<{ title: string; imageSrc: string } | null>(null);
  
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
    sendToOwner(
      {
        firma: b2bFormData.company,
        ansprechpartner: b2bFormData.contactPerson,
        email: b2bFormData.email,
        telefon: b2bFormData.phone,
        kategorie: b2bFormData.category,
        message: b2bFormData.message,
      },
      "B2B Partnerantrag",
    )
      .then(() => setB2bSubmitted(true))
      .catch(() => window.alert("Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@fontes-vitae.com."));
  };

  return (
    <div className="bg-transparent min-h-screen text-[#0A1C3A] font-sans pb-24">
      {/* Hero Header Banner */}
      <HeaderBanner
        title="ÜBER UNS – FONTES VITAE"
        subtitle="Die Quelle des Lebens. Als familiengeführtes Unternehmen und exklusiver Vertriebspartner (Distributor) von WRC SR s.r.o. bringen wir reinstes molekulares H₂-Wasserstoffwasser und Premium-Fruchtsäfte zu unseren Kunden in Deutschland, Österreich und der Schweiz."
        badge="Vertriebspartner DACH & Familienunternehmen"
      >
        <div className="pt-3 flex flex-wrap justify-center gap-3">
          <a
            href="#b2b"
            className="inline-flex items-center gap-2 bg-sky-400 hover:bg-sky-300 text-[#0A1C3A] font-black uppercase text-xs tracking-wider px-5 py-3 rounded-xl shadow-lg transition transform hover:scale-105"
          >
            <Users className="w-4 h-4" />
            <span>B2B Partner werden</span>
          </a>
          <a
            href="#zertifikate"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold uppercase text-xs tracking-wider px-5 py-3 rounded-xl border border-white/20 backdrop-blur-md transition"
          >
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Zertifikate &amp; Laboranalysen</span>
          </a>
        </div>
      </HeaderBanner>

      {/* Main Story & Philosophy */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10 sm:space-y-12">
        {/* Family Business Story Card (Distributor Role) */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 text-sky-400" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0A1C3A]">
              Unsere Familiengeschichte &amp; Vertriebsrolle
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A1C3A] uppercase tracking-tight">
              Engagierter Vertriebspartner – Für Deine maximale Lebensqualität
            </h2>
            <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-700">
              FONTES VITAE steht für leidenschaftlichen Vertrieb und höchsten Kundenservice. Als unabhängiger Vertriebspartner konzentrieren wir uns vollkommen darauf, erstklassige H₂-Wasserstoffgetränke und naturbelassene Fruchtsäfte in der gesamten DACH-Region (Deutschland, Österreich und Schweiz) verfügbar zu machen. Die Herstellung erfolgt durch hochspezialisierte, ISO-zertifizierte externe Produktionspartner an der Tiefenquelle.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              Wir betreiben keine eigene Wasserquelle oder Abfüllanlage, sondern wählen unsere Produktionspartner nach strengsten internationalen Qualitätskriterien (HACCP, EU-Lebensmittelrecht, ISO 17025 Laboranalysen) aus. So stellen wir sicher, dass jede gelieferte Dose mindestens 2,8 mg/L gelösten Wasserstoff enthält und 100 % BPA-frei ist. Wir stehen mit unserem Familiennamen für kompromisslose Transparenz und verlässliche Logistik.
            </p>
          </div>

          {/* DACH Distribution Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <Globe2 className="w-6 h-6 text-[#0A1C3A] shrink-0" />
              <div>
                <span className="text-xs font-black uppercase text-[#0A1C3A] block">Deutschland 🇩🇪</span>
                <span className="text-[11px] text-slate-500">Zentraler Vertrieb &amp; Service</span>
              </div>
            </div>
            <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <Globe2 className="w-6 h-6 text-[#0A1C3A] shrink-0" />
              <div>
                <span className="text-xs font-black uppercase text-[#0A1C3A] block">Österreich 🇦🇹</span>
                <span className="text-[11px] text-slate-500">Direkter Kundenversand</span>
              </div>
            </div>
            <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <Globe2 className="w-6 h-6 text-[#0A1C3A] shrink-0" />
              <div>
                <span className="text-xs font-black uppercase text-[#0A1C3A] block">Schweiz 🇨🇭</span>
                <span className="text-[11px] text-slate-500">Express-Belieferung DACH</span>
              </div>
            </div>
          </div>
        </div>

        {/* INTEGRATED CERTIFICATES & COMPLIANCE SECTION */}
        <div id="zertifikate" className="space-y-8">
          <div className="text-center space-y-3">
            <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-sky-100/80 text-sky-900 px-4 py-1.5 rounded-full inline-block border border-sky-300">
              Prüfprotokolle &amp; Dokumentation
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0A1C3A]">
              ZERTIFIKATE &amp; COMPLIANCE
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Unabhängig geprüft — Produktsicherheit, Wasserqualität und Wasserstoffversorgung sind vollständig in akkreditierten europäischen Prüflaboren dokumentiert.
            </p>
          </div>

          {/* Compliance Cards Accordion Style Grid */}
          <div className="space-y-6">
            {/* Category 1: Produktzertifizierung */}
            <div className="bg-white rounded-3xl border border-slate-300 p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A1C3A] text-sky-400 flex items-center justify-center shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase text-[#0A1C3A]">Produktzertifizierung &amp; Standards</h3>
                  <span className="text-xs text-slate-500 font-bold">4 bestätigte Qualitätsnachweis-Einträge</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-sky-600 font-extrabold text-xs">
                    <ShieldCheck className="w-4 h-4" /> HACCP
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Gefahrenanalyse und kritische Kontrollpunkte — Lebensmittelsicherheits-Managementsystem im Abfüllbetrieb.
                  </p>
                </div>

                <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-sky-600 font-extrabold text-xs">
                    <Building className="w-4 h-4" /> EU Food Legislation
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    EG 178/2002, EG 852/2004, EU 1169/2011 — Lebensmittelsicherheit, Hygiene &amp; Kennzeichnung.
                  </p>
                </div>

                <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-sky-600 font-extrabold text-xs">
                    <FileCheck2 className="w-4 h-4" /> SISPO
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Slowakisches System zur Registrierung der Verpackungs- und Abfallkonformität.
                  </p>
                </div>

                <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-sky-600 font-extrabold text-xs">
                    <FileText className="w-4 h-4" /> Traceability
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Lückenlose Chargendokumentation, Musterarchivierung und wiederkehrende Laboranalysen.
                  </p>
                </div>
              </div>
            </div>

            {/* Category 2: Wasserqualität & Prüfung */}
            <div className="bg-white rounded-3xl border border-slate-300 p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A1C3A] text-sky-400 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase text-[#0A1C3A]">Wasserqualität &amp; Laborprüfung</h3>
                  <span className="text-xs text-slate-500 font-bold">Akkreditiertes Prüflabor Středočeské vodárny, a.s.</span>
                </div>
              </div>

              <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#0A1C3A] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                      Protokoll Nr. 1406/1/2024
                    </span>
                    <span className="text-xs font-bold text-slate-700">Akkreditiertes Prüflabor (ČIA L1429)</span>
                  </div>
                  <h4 className="text-base font-black text-[#0A1C3A] uppercase">Trinkwasseranalyse — Alle Parameter konform</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Vollständige Prüfung mikrobiologischer und chemischer Parameter (pH 7,3, Calcium 109 mg/L, Natrium 7.5 mg/L, Nitrat 12.7 mg/L, Eisen 0.04 mg/L). Alle Grenzwerte gemäß EU-Richtlinien unterschritten.
                  </p>
                </div>

                <button
                  onClick={() => setActiveCertModal({ title: "Wasserqualitätsprotokoll Nr. 1406/1/2024 (Středočeské vodárny, a.s.)", imageSrc: CERT_WATER_SCAN_URL })}
                  className="bg-[#0A1C3A] hover:bg-[#12284c] text-white text-xs font-extrabold uppercase px-6 py-3 rounded-xl tracking-wider shrink-0 flex items-center gap-2 shadow-md transition transform hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4 text-sky-400" />
                  <span>Prüfprotokoll</span>
                </button>
              </div>
            </div>

            {/* Category 3: Wasserstoffversorgung & -konzentration */}
            <div className="bg-white rounded-3xl border border-slate-300 p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A1C3A] text-sky-400 flex items-center justify-center shadow-xs">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase text-[#0A1C3A]">Wasserstoffversorgung &amp; H₂-Konzentration</h3>
                  <span className="text-xs text-slate-500 font-bold">Linde Gas &amp; Technopark Kralupy UCT Prague</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Linde Gas */}
                <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-200 space-y-3">
                  <span className="text-xs font-black uppercase text-[#0A1C3A] bg-white px-3 py-1 rounded-full border border-slate-200 inline-block">
                    Linde Gas — Hydrogen 4.0
                  </span>
                  <h4 className="text-base font-extrabold text-[#0A1C3A]">Höchste Gas-Reinheit</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Reinheitszertifizierung ≥ 99,99 % H₂ für die physikalische Anreicherung des Wassers ohne chemische Zusätze.
                  </p>
                </div>

                {/* Technopark Kralupy UCT Prague */}
                <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-[#0A1C3A] bg-white px-3 py-1 rounded-full border border-slate-200 inline-block">
                        University of Chemistry and Technology, Prague
                      </span>
                    </div>
                    <h4 className="text-base font-extrabold text-[#0A1C3A]">Analyse: 2,91 ± 0,10 mg/L H₂ gelöst</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Technopark Kralupy — Protokoll Nr. A1/2026. Bestimmung mittels Silberionen-Reduktion &amp; ICP-OES in versiegelten 250-ml-Aluminiumdosen.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveCertModal({ title: "Technopark Kralupy UCT Prague — Protokoll Nr. A1/2026", imageSrc: CERT_H2_SCAN_URL })}
                    className="mt-4 bg-[#0A1C3A] hover:bg-[#12284c] text-white text-xs font-extrabold uppercase px-5 py-2.5 rounded-xl tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    <ExternalLink className="w-4 h-4 text-sky-400" />
                    <span>Zertifikat A1/2026 Scan öffnen</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Founder & Family Photo Impressions */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#e2e8f0] px-4 py-1.5 rounded-full inline-block border border-slate-300">
              Einblick &amp; Werte
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0A1C3A]">
              Unsere Gründer &amp; Philosophie
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
              Persönlicher Kontakt, ehrlicher Austausch und gelebte Familienwerte stehen bei uns an erster Stelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-52 bg-[#f4f6f8] rounded-2xl border border-slate-300 flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#0A1C3A]/10 text-[#0A1C3A] flex items-center justify-center">
                    <Users className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0A1C3A]">Familienführung &amp; Kundenservice</h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Familie FONTES VITAE – Qualität und Herzlichkeit in zweiter Generation
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0A1C3A]">Persönliche Betreuung in der DACH-Region</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Jede Anfrage und Bestellung wird von unserem eigenen Team bearbeitet. Wir legen größten Wert auf langjährige Kundenbeziehungen und ein vertrauensvolles Miteinander.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>📍 Hauptsitz &amp; Kundenservice Deutschland</span>
                <span className="text-sky-600">Familiengeführt</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-52 bg-[#f4f6f8] rounded-2xl border border-slate-300 flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#0A1C3A]/10 text-[#0A1C3A] flex items-center justify-center">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0A1C3A]">Sorgfältige Partnerauswahl</h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Zusammenarbeit mit ISO-zertifizierten Abfüllbetrieben
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0A1C3A]">Laborgeprüfte Sicherheit</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Jede Charge wird in unabhängigen europäischen Laboratorien auf Reinheit, H₂-Gaskonzentration und Haltbarkeit geprüft. So gewährleisten wir gleichbleibende Höchstqualität.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>🛡️ ISO 17025 Laboranalysen</span>
                <span className="text-sky-600">100% Geprüft</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated B2B Area: PARTNER WERDEN */}
        <div id="b2b" className="bg-[#0A1C3A] text-white rounded-3xl p-8 sm:p-14 space-y-12 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl">
            <div className="space-y-4 max-w-3xl">
              <span className="text-sky-400 text-xs font-extrabold tracking-widest uppercase bg-sky-950 px-4 py-1.5 rounded-full inline-block border border-sky-800">
                B2B-Distributor &amp; Partnernetzwerk DACH
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                PARTNER WERDEN (B2B)
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                Werden Sie B2B-Vertriebspartner von FONTES VITAE. Als spezialisierter Distributor (kein Eigenhersteller) beliefern wir Getränkehändler, Fitnessstudios, Biohacking-Zentren, Sportvereine, Premium-Hotels, Wellness-Resorts und den gehobenen Einzelhandel in Deutschland, Österreich und der Schweiz mit höchster Verlässlichkeit und erstklassigem Service.
              </p>
            </div>
            <a
              href="#b2b-form"
              className="shrink-0 bg-sky-400 hover:bg-sky-300 text-[#0A1C3A] font-black uppercase px-6 py-3.5 rounded-xl text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg transition transform hover:scale-105"
            >
              <Send className="w-4 h-4 text-[#0A1C3A]" />
              <span>Jetzt Partner werden</span>
            </a>
          </div>

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

          {/* Partner Logos Row */}
          <div className="space-y-4 pt-4 border-t border-slate-700">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block text-center">
              Partner-Netzwerk in der DACH-Region
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="#b2b-form"
                className="bg-white/5 border border-dashed border-sky-400/50 p-6 rounded-2xl text-center space-y-1 hover:bg-white/10 transition block"
              >
                <span className="text-xs font-black text-sky-400 uppercase block">„Ihr Logo könnte als Erstes hier stehen“</span>
                <span className="text-[11px] text-slate-400">Erster Partner in Ihrer Region werden →</span>
              </a>
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
          <div id="b2b-form" className="bg-white text-[#0A1C3A] rounded-2xl p-6 sm:p-10 space-y-6 shadow-xl scroll-mt-24">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-600" />
                <h3 className="text-2xl font-black uppercase text-[#0A1C3A]">
                  Geschäftliche Anfrage senden (B2B-Partner werden)
                </h3>
              </div>
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
                    Direkte Anfragen: <span className="font-bold text-[#0A1C3A]">info@fontes-vitae.com</span> | Tel: <span className="font-bold text-[#0A1C3A]">017660945171</span>
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

        {/* Navigation CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <a
            href="https://shop.fontes-vitae.com"
            className="inline-flex items-center gap-2 bg-[#0A1C3A] hover:bg-[#12284c] text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition"
          >
            Jetzt Produkte im Shop bestellen <ArrowRight className="w-4 h-4" />
          </a>
          <RouterLink
            to="/wissenschaft"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#0A1C3A] border border-slate-300 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition"
          >
            Wissenschaft &amp; Studien ansehen <ArrowRight className="w-4 h-4" />
          </RouterLink>
        </div>
      </section>

      {/* Certificate Viewer Modal */}
      {activeCertModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setActiveCertModal(null)} />
          <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-300 overflow-hidden text-[#081427]">
            <div className="bg-[#0A1C3A] text-white p-4 sm:p-6 flex items-center justify-between">
              <div>
                <span className="text-sky-400 text-xs font-extrabold uppercase tracking-widest block">Akkreditiertes Prüfprotokoll</span>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight">{activeCertModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveCertModal(null)}
                className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 sm:p-6 bg-slate-100 flex justify-center max-h-[75vh] overflow-y-auto">
              <img
                src={activeCertModal.imageSrc}
                alt={activeCertModal.title}
                className="w-full max-w-2xl h-auto object-contain shadow-md rounded-lg border border-slate-300"
              />
            </div>
            <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveCertModal(null)}
                className="bg-[#0A1C3A] text-white px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
