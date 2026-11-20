import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ShieldCheck,
  RefreshCw,
  Play,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  FileText,
  Award,
  ChevronDown,
  Zap,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import { useCart } from "@/context/CartContext";

interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  embedUrl: string;
  category: string;
  description: string;
}

const SCIENTIFIC_VIDEOS: VideoItem[] = [
  {
    id: "lebaron",
    title: "Tyler LeBaron: Wasserstoffwasser, Mitochondriengesundheit, selektive Antioxidantien und Langlebigkeit",
    youtubeId: "SDZtVonFPXM",
    embedUrl: "https://www.youtube-nocookie.com/embed/SDZtVonFPXM",
    category: "Wissenschaft & Forschung",
    description: "Vortrag von Molekularbiologe und MHI-Gründer Tyler LeBaron über die molekulare Wirkungsweise von H2 im menschlichen Organismus."
  },
  {
    id: "japan",
    title: "Erfahrungsbericht zu Demenz und Alzheimer: H2-Wasserstoff aus Japan",
    youtubeId: "uvZgOupWwzg",
    embedUrl: "https://www.youtube-nocookie.com/embed/uvZgOupWwzg",
    category: "Zellschutz & Medizin",
    description: "Klinische Erkenntnisse und Erfahrungsberichte aus japanischen Forschungszentren zum Einsatz von molekularem Wasserstoff."
  },
  {
    id: "holy-hydrogen",
    title: "Die Wissenschaft + Vorteile von molekularem Wasserstoffwasser (Heiliger Wasserstoff)",
    youtubeId: "-2Go-J4V3o0",
    embedUrl: "https://www.youtube-nocookie.com/embed/-2Go-J4V3o0",
    category: "Zell-Hydration & Vitalität",
    description: "Umfassende wissenschaftliche Zusammenfassung der Vorteile von gelöstem Wasserstoffwasser für Zellgesundheit und Regeneration."
  }
];

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Was ist molekularer Wasserstoff (H₂) und wie wirkt er im Körper?",
    answer: "Molekularer Wasserstoff (H₂) ist das kleinste und leichteste Molekül im Universum. Durch seine winzige Molekülgröße kann er Zellmembranen sowie die Blut-Hirn-Schranke mühelos durchdringen und direkt in Zellkerne und Mitochondrien gelangen. Dort wirkt H₂ als selektives Antioxidans: Es neutralisiert gezielt hochreaktive, schädliche Hydroxyl-Radikale (•OH), ohne nützliche Signalmoleküle wie Stickstoffmonoxid zu beeinträchtigen."
  },
  {
    question: "Sind die FONTES VITEA Aluminiumdosen 100 % BPA-frei?",
    answer: "Ja, absolut. Sämtliche FONTES VITEA 250-ml-Aluminiumdosen besitzen eine modernste, lebensmittelechte Innenbeschichtung, die zu 100 % frei von Bisphenol A (BPA), Phthalaten und Weichmachern ist. Dadurch wird garantiert, dass keinerlei hormonell wirksame Stoffe oder schädliche Chemikalien an das Wasserstoff-Wasser abgegeben werden."
  },
  {
    question: "Werden für FONTES VITEA Produkte oder Inhaltsstoffe Tierversuche durchgeführt?",
    answer: "Nein, garantiert nicht! FONTES VITEA steht für strikten Tierschutz und ethische Verantwortung. Für keines unserer Produkte, Abfüllverfahren oder Inhaltsstoffe werden Tierversuche durchgeführt oder in Auftrag gegeben. Unsere Produkte sind zu 100 % tierversuchsfrei und vegan."
  },
  {
    question: "Wie stabil ist das gelöste H₂-Gas in der Aluminiumdose?",
    answer: "Die Aluminiumdose bietet die weltweit undurchlässigste Verpackungsbarriere gegen das Entweichen von Wasserstoffgas. In der verschlossenen Dose bleibt die H₂-Konzentration von mindestens 2,8 mg/L über viele Monate stabil. Nach dem Öffnen der Dose bleibt das gelöste H₂-Gas durch unser spezielles Anreicherungsverfahren 6 Stunden lang hochwirksam (ca. 99 % nach 2 Std., ca. 80 % nach 6 Std.)."
  },
  {
    question: "Wie lautet die tägliche Verzehrempfehlung?",
    answer: "Wir empfehlen die Einnahme von 1 bis 2 Dosen (250 ml) FONTES VITEA H₂ Wasserstoff-Wasser täglich. Ideal ist das Trinken direkt nach dem Aufstehen für den optimalen Start in den Tag, vor oder nach dem Sport zur Förderung der Regeneration, bei intensiver geistiger Arbeit im Büro oder auf Reisen."
  },
  {
    question: "Wie funktioniert das Dosenpfand und die Rückgabe?",
    answer: "Im Kaufpreis jeder Dose ist ein gesetzliches Dosenpfand von 0,25 € enthalten, das transparent ausgewiesen wird (z. B. 3,00 € Pfand bei einem 12er-Pack). Die leeren Aluminiumdosen können an jedem üblichen Leergutautomaten in Supermärkten und Getränkemärkten zurückgegeben werden. Aluminium ist zu 100 % unendlich oft ohne Qualitätsverlust recycelbar."
  },
  {
    question: "In welche Länder liefert FONTES VITEA?",
    answer: "FONTES VITEA beliefert Privatkunden und Geschäftspartner in der gesamten DACH-Region: Deutschland, Österreich und die Schweiz. Die Lieferung erfolgt schnell, zuverlässig und sicher verpackt über unsere Logistikpartner."
  }
];

export default function WissenschaftPage() {
  const { openVideoModal } = useCart();
  const [activeCategory, setActiveCategory] = useState<"all" | "sport" | "zellschutz" | "regeneration">("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-[#0A1C3A] font-sans pb-24">
      {/* Hero Header */}
      <section className="bg-[#0A1C3A] text-white py-20 px-6 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-white transition uppercase tracking-wider bg-white/10 px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
          </Link>

          <div className="space-y-4 max-w-3xl">
            <span className="text-sky-400 text-xs font-extrabold tracking-widest uppercase bg-sky-950/60 px-4 py-1.5 rounded-full inline-block border border-sky-800/50">
              Wissenschaftliche Evidenz &amp; Studien
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
              WISSEN &amp; STUDIEN
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              FONTES VITEA basiert auf über 1.000 wissenschaftlichen Studien zur Wirkung von molekularem Wasserstoff (H₂). Entdecke biochemische Grundlagen, Studien zu Laktatabbau und Mitochondrien, laborgeprüfte Zertifikate und Expertenberichte.
            </p>
          </div>
        </div>
      </section>

      {/* Main Categories Overview */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase transition border ${
              activeCategory === "all"
                ? "bg-[#0A1C3A] text-white border-[#0A1C3A] shadow-md"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
          >
            Alle Säulen
          </button>
          <button
            onClick={() => setActiveCategory("sport")}
            className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase transition border ${
              activeCategory === "sport"
                ? "bg-[#0A1C3A] text-white border-[#0A1C3A] shadow-md"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
          >
            Sport &amp; Performance
          </button>
          <button
            onClick={() => setActiveCategory("zellschutz")}
            className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase transition border ${
              activeCategory === "zellschutz"
                ? "bg-[#0A1C3A] text-white border-[#0A1C3A] shadow-md"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
          >
            Zellschutz
          </button>
          <button
            onClick={() => setActiveCategory("regeneration")}
            className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase transition border ${
              activeCategory === "regeneration"
                ? "bg-[#0A1C3A] text-white border-[#0A1C3A] shadow-md"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
          >
            Regeneration
          </button>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Category 1: Sport & Performance */}
          {(activeCategory === "all" || activeCategory === "sport") && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6 flex flex-col justify-between hover:shadow-xl transition">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-md">
                  <Activity className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600">Kategorie 01</span>
                  <h2 className="text-2xl font-black uppercase text-[#0A1C3A]">Sport &amp; Performance</h2>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Molekularer Wasserstoff reduziert nachweislich die Ansammlung von Laktat im Blut während intensiver sportlicher Belastung und schützt vor Mikrotraumata.
                </p>

                <ul className="space-y-2.5 pt-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0A1C3A] shrink-0 mt-0.5" />
                    <span>Verringerung von Muskelermüdung &amp; Laktatwerten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0A1C3A] shrink-0 mt-0.5" />
                    <span>Förderung der mitochondrialen ATP-Produktion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0A1C3A] shrink-0 mt-0.5" />
                    <span>Verhinderung von Mikrotraumata in den Muskeln</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Ergebnis: Steigerung der Spitzenleistung</span>
              </div>
            </div>
          )}

          {/* Category 2: Zellschutz */}
          {(activeCategory === "all" || activeCategory === "zellschutz") && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6 flex flex-col justify-between hover:shadow-xl transition">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600">Kategorie 02</span>
                  <h2 className="text-2xl font-black uppercase text-[#0A1C3A]">Zellschutz</h2>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  H₂ fungiert als selektives Antioxidans. Es neutralisiert gezielt zellschädigende Hydroxyl-Radikale (•OH), ohne physiologisch wichtige Sauerstoffspezies zu beeinträchtigen.
                </p>

                <ul className="space-y-2.5 pt-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0A1C3A] shrink-0 mt-0.5" />
                    <span>Gezielte Neutralisation von ROS (Oxidativer Stress)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0A1C3A] shrink-0 mt-0.5" />
                    <span>Schutz biologischer Membranen und der DNA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0A1C3A] shrink-0 mt-0.5" />
                    <span>Unterstützung des körpereigenen Enzymsystems</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Ergebnis: Zellulärer Schutz &amp; Langlebigkeit</span>
              </div>
            </div>
          )}

          {/* Category 3: Regeneration */}
          {(activeCategory === "all" || activeCategory === "regeneration") && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6 flex flex-col justify-between hover:shadow-xl transition">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-md">
                  <RefreshCw className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600">Kategorie 03</span>
                  <h2 className="text-2xl font-black uppercase text-[#0A1C3A]">Regeneration</h2>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Durch seine winzige Molekülgröße durchdringt H₂ mühelos Biomembranen und gelangt direkt in Zellkerne sowie Mitochondrien für rasche Hydration und Erholung.
                </p>

                <ul className="space-y-2.5 pt-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0A1C3A] shrink-0 mt-0.5" />
                    <span>Tiefen-Hydration auf zellulärer Ebene</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0A1C3A] shrink-0 mt-0.5" />
                    <span>Beschleunigte Erholungszeiten nach Belastungen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0A1C3A] shrink-0 mt-0.5" />
                    <span>Unterstützung des Haut- und Bindegewebes</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Ergebnis: Optimale Erholung &amp; Wohlbefinden</span>
              </div>
            </div>
          )}
        </div>

        {/* Scientific Publications & PubMed References */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-md border border-sky-100 inline-block">
              Internationale Fachliteratur &amp; PubMed
            </span>
            <h2 className="text-3xl font-black uppercase text-[#0A1C3A]">
              Internationale Forschung &amp; Publikationen
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Seit der Pionierstudie in <em>Nature Medicine (2007)</em> von Prof. Shigeo Ohta haben Forscher weltweit in über 1.000 wissenschaftlichen Arbeiten die therapeutische Wirkung von molekularem Wasserstoff nachgewiesen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A1C3A]">
                <FileText className="w-4 h-4 text-sky-600" />
                <span>Nature Medicine (2007) – Ohsawa et al.</span>
              </div>
              <h3 className="text-sm font-bold text-[#0A1C3A]">
                „Hydrogen acts as a therapeutic antioxidant by selectively reducing cytotoxic oxygen radicals“
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Der wissenschaftliche Durchbruch: Molekularer Wasserstoff neutralisiert gezielt Hydroxylradikale (•OH), ohne physiologische Signalmoleküle zu schädigen.
              </p>
            </div>

            <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A1C3A]">
                <FileText className="w-4 h-4 text-sky-600" />
                <span>Medical Gas Research (2012) – LeBaron et al.</span>
              </div>
              <h3 className="text-sm font-bold text-[#0A1C3A]">
                „Molecular hydrogen as an emerging therapeutic medical gas for sports medicine“
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Untersuchung von gelöstem Wasserstoff bei Leistungssportlern: Signifikante Senkung von Blut-Laktatwerten und Muskelkater.
              </p>
            </div>
          </div>
        </div>

        {/* Video Studies Showcase Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#f4f6f8] px-4 py-1.5 rounded-full inline-block border border-slate-300">
              Experten-Vorträge &amp; Studien
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A1C3A] uppercase tracking-tight">
              Wissenschaftliche Videos &amp; Analysen
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Sieh dir hochkarätige Vorträge und Berichte renommierter Forscher über die Wirkungsweise von H₂-Wasserstoff an.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SCIENTIFIC_VIDEOS.map((video) => (
              <div
                key={video.id}
                className="bg-[#f8fafc] rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition group"
              >
                <div className="space-y-4 p-5">
                  <div
                    onClick={() => openVideoModal(video.embedUrl)}
                    className="relative aspect-video rounded-xl overflow-hidden bg-[#0A1C3A] cursor-pointer group-hover:opacity-95 transition"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#0A1C3A] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition border border-white/20">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md inline-block border border-sky-100">
                    {video.category}
                  </span>

                  <h3 className="text-sm font-bold text-[#0A1C3A] leading-snug">
                    {video.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => openVideoModal(video.embedUrl)}
                    className="w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Video ansehen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zertifizierung & Prüfsiegel Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0A1C3A] text-sky-400 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block">Zertifizierung &amp; Reinheit</span>
                <h3 className="text-xl font-black text-[#0A1C3A] uppercase">Quellen &amp; Prüfsiegel</h3>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-semibold max-w-md">
              Jede Abfüllung von FONTES VITEA wird strengsten unabhängigen Laborkontrollen in Deutschland unterzogen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#f8fafc] p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-[#0A1C3A] block">100 % BPA-Frei Zertifikat</span>
                <span className="text-[11px] text-slate-500">Innenbeschichtung ohne Weichmacher</span>
              </div>
            </div>

            <div className="bg-[#f8fafc] p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <Zap className="w-5 h-5 text-sky-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-[#0A1C3A] block">Mind. 2.8 mg/L H₂-Gaskonzentration</span>
                <span className="text-[11px] text-slate-500">Laborgeprüfte Gaslöslichkeit</span>
              </div>
            </div>

            <div className="bg-[#f8fafc] p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <Award className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-[#0A1C3A] block">ISO 9001 Abfüllstandard</span>
                <span className="text-[11px] text-slate-500">Garantierte Hygiene &amp; Reinheit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Section: Weiterführende Literatur */}
        <div id="weiterfuehrende-literatur" className="bg-[#0A1C3A] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 relative z-10 text-center sm:text-left">
            <span className="text-sky-400 text-xs font-extrabold tracking-widest uppercase bg-sky-950/80 px-4 py-1.5 rounded-full border border-sky-800/60 inline-block">
              Buchempfehlung
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              WEITERFÜHRENDE LITERATUR
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Wissenschaftlich fundierte Lektüre über die Wirkweise und Anwendungsfelder von molekularem Wasserstoff.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Book Cover Visual */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 sm:w-56 aspect-[1/1.5] bg-gradient-to-br from-[#0B1E3F] via-[#162B4E] to-[#0A1C3A] rounded-r-xl rounded-l-sm border-l-8 border-l-slate-400 border-t border-r border-b border-sky-400/40 shadow-2xl p-5 flex flex-col justify-between text-white overflow-hidden group">
                <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
                
                <div className="space-y-3 z-10">
                  <div className="text-[10px] font-black uppercase tracking-widest text-sky-300 border-b border-sky-400/20 pb-1.5 flex justify-between items-center">
                    <span>Kopp Verlag</span>
                    <span className="text-[9px] font-mono text-slate-400">FACHBUCH</span>
                  </div>
                  
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Brigitte Hamann</span>
                    <h3 className="text-base sm:text-lg font-black uppercase leading-tight tracking-tight text-white mt-1">
                      Praxisbuch molekularer Wasserstoff
                    </h3>
                    <p className="text-[11px] font-semibold text-sky-300 italic mt-1.5 leading-snug">
                      Die natürliche Medizin der Zukunft
                    </p>
                  </div>
                </div>

                <div className="z-10 pt-4 border-t border-sky-400/20 flex items-end justify-between">
                  <div className="flex items-center gap-1.5 text-sky-400">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">H₂ Standardwerk</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">Kopp Verlag</span>
                </div>
              </div>
            </div>

            {/* Information & Details */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-sky-400">
                  <span className="bg-white/10 text-sky-300 px-3 py-1 rounded-full border border-white/10">
                    Autorin: Brigitte Hamann
                  </span>
                  <span className="bg-white/10 text-slate-300 px-3 py-1 rounded-full border border-white/10">
                    Kopp Verlag
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                  Praxisbuch molekularer Wasserstoff
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-sky-300 italic">
                  Die natürliche Medizin der Zukunft
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Für alle, die tiefer in die Welt des molekularen Wasserstoffs eintauchen möchten, empfehlen wir das Praxisbuch molekularer Wasserstoff von <strong>Brigitte Hamann</strong>. Das Werk erläutert verständlich und wissenschaftlich fundiert, wie gelöster molekularer Wasserstoff als Jungbrunnen für die Zellen wirkt, oxidativen Stress abwendet und die Mitochondrienfunktion belebt.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-1">
                <li className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Detaillierter Überblick über biochemische Wirkmechanismen</span>
                </li>
                <li className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Praktische Leitfäden für zelluläre Entgiftung &amp; Vitalität</span>
                </li>
                <li className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10 sm:col-span-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Fundiertes Wissen für gesundheitsbewusste Menschen &amp; Fachkreise</span>
                </li>
              </ul>

              <div className="space-y-3 pt-3 border-t border-slate-700/80">
                <a
                  href="https://www.amazon.de/dp/3864455829?tag=fontesvitea-21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-[#0A1C3A] font-black uppercase text-xs sm:text-sm tracking-wider py-3.5 px-7 rounded-xl shadow-lg transition duration-200"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Mehr über das Buch erfahren</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>

                <p className="text-[11px] text-slate-400 italic leading-normal">
                  *Hinweis: Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Beim Klick auf den Button werden Sie zu Amazon weitergeleitet.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Structured Expandable FAQ Section */}
        <div id="faq" className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#f4f6f8] px-4 py-1.5 rounded-full inline-block border border-slate-300">
              Häufige Fragen &amp; Antworten
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A1C3A] uppercase tracking-tight">
              FACHLICHER FAQ-BEREICH
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Präzise und transparente Antworten zu molekularem Wasserstoff, BPA-Freiheit, Tierversuchsfreiheit, Verzehrempfehlung und Dosenpfand.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? "bg-[#f8fafc] border-[#0A1C3A] shadow-md" : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0A1C3A] focus:outline-none"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-sky-600" : "text-slate-400"}`} />
                      <span>{item.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0A1C3A] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-sky-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/80">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Back to Shop CTA */}
        <div className="text-center pt-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#0A1C3A] hover:bg-[#12284c] text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition"
          >
            Jetzt FONTES VITEA im Shop bestellen <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}
