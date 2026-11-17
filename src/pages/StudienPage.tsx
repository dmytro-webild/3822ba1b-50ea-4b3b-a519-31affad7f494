import { useState } from "react";
import { Link } from "react-router-dom";
import { Activity, ShieldCheck, RefreshCw, Play, ArrowLeft, CheckCircle2 } from "lucide-react";
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

export default function StudienPage() {
  const { openVideoModal } = useCart();
  const [activeCategory, setActiveCategory] = useState<"all" | "sport" | "zellschutz" | "regeneration">("all");

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
              Wissenschaftliche Evidenz
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
              Molekularer Wasserstoff & Forschung
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              FONS VITAE basiert auf fundierten wissenschaftlichen Studienergebnissen zu molekularem Wasserstoff (H2). Entdecke die Forschungskategorien und Expertenberichte zur Wirkung auf zellulärer Ebene.
            </p>
          </div>
        </div>
      </section>

      {/* Main Categories Overview */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-16">
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
            Sport & Performance
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
                  <h2 className="text-2xl font-black uppercase text-[#0A1C3A]">Sport & Performance</h2>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Molekularer Wasserstoff reduziert nachweislich die Ansammlung von Laktat im Blut während intensiver sportlicher Belastung. 
                </p>

                <ul className="space-y-2.5 pt-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0A1C3A] shrink-0 mt-0.5" />
                    <span>Verringerung von Muskelermüdung & Laktatwerten</span>
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
                  H2 fungiert als selektives Antioxidans. Es neutralisiert gezielt zellschädigende Hydroxyl-Radikale (.OH), ohne physiologisch wichtige Sauerstoffspezies zu beeinträchtigen.
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
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Ergebnis: Zellulärer Schutz & Langlebigkeit</span>
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
                  Durch seine winzige Molekülgröße durchdringt H2 mühelos Biomembranen und gelangt direkt in Zellkerne sowie Mitochondrien für rasche Hydration und Erholung.
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
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Ergebnis: Optimale Erholung & Wohlbefinden</span>
              </div>
            </div>
          )}
        </div>

        {/* Video Studies Showcase Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#f4f6f8] px-4 py-1.5 rounded-full inline-block border border-slate-300">
              Experten-Vorträge & Studien
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A1C3A] uppercase tracking-tight">
              Wissenschaftliche Videos & Analysen
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Sieh dir hochkarätige Vorträge und Berichte renommierter Forscher über die Wirkungsweise von H2-Wasserstoff an.
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
      </section>
    </div>
  );
}
