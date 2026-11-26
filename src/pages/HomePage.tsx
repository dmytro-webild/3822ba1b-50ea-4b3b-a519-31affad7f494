import { useRef } from "react";
import { Link } from "react-router-dom";
import HeroWordmarkProduct from "@/components/sections/hero/HeroWordmarkProduct";
import ProductCompareTable from "@/components/sections/product/ProductCompareTable";
import CustomerReviewsSection from "@/components/sections/feedback/CustomerReviewsSection";
import ScrollToneBackdrop from "@/components/kit/ScrollToneBackdrop";
import WaterDropIntro from "@/components/loaders/WaterDropIntro";
import {
  Briefcase,
  Dumbbell,
  Droplets,
  ShieldCheck,
  BookOpen,
  Trophy,
  Activity,
  Target,
  Compass,
  Building2,
  Flame,
  Zap,
  Users,
  UserCheck,
  Utensils,
  Wine,
  GraduationCap,
  Shield,
  Siren,
  Layers,
  FlaskConical
} from "lucide-react";

const CAN_IMAGE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795132125149-eraq7h8f.png";

interface EinsatzbereichCard {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  icon: typeof Dumbbell;
  badgeColor: string;
}

const EINSATZBEREICHE: EinsatzbereichCard[] = [
  {
    id: "fitnessstudios",
    title: "Fitnessstudios",
    category: "Kraft & Ausdauer",
    description: "Zelluläre Hydration & Erfrischung für intensive Trainingseinheiten und maximale Pump-Leistung.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=compress&w=800&q=80",
    icon: Dumbbell,
    badgeColor: "text-sky-400",
  },
  {
    id: "boxstudios",
    title: "Boxstudios",
    category: "Kampfsport & Reflexe",
    description: "Optimale Flüssigkeitsversorgung im Ring – unterstützt schnelle Reaktionszeit & Ausdauer.",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=compress&w=800&q=80",
    icon: Flame,
    badgeColor: "text-red-400",
  },
  {
    id: "trainingscamps",
    title: "Trainingscamps",
    category: "Intensiv-Bootcamps",
    description: "Regenerationsschub für mehrtägige Belastungsprofile und kompromisslose Leistungssteigerung.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=compress&w=800&q=80",
    icon: Zap,
    badgeColor: "text-amber-400",
  },
  {
    id: "sportvereine",
    title: "Fußball- & Sportvereine",
    category: "Fußball & Team-Sport",
    description: "Reines H2-Quellwasser für Fußballteams & Mannschaftssportler – Kraft tanken vor, während und nach dem Match.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=compress&w=800&q=80",
    icon: Users,
    badgeColor: "text-emerald-400",
  },
  {
    id: "militaer",
    title: "Militär & Streitkräfte",
    category: "Taktischer Einsatz",
    description: "Höchste Belastungsfähigkeit & mentale Ausdauer unter Extrembedingungen für Streitkräfte und Spezialkräfte.",
    image: "https://images.pexels.com/photos/28288637/pexels-photo-28288637.jpeg?auto=compress&cs=tinysrgb&h=650&w=940&id=28288637",
    icon: Shield,
    badgeColor: "text-emerald-400",
  },
  {
    id: "einsatzkraefte",
    title: "Zivile Einsatzkräfte",
    category: "Feuerwehr, Polizei & Rettung",
    description: "Zuverlässige Hydration im 24/7 Schichteinsatz – schnelle Regeneration für Feuerwehr, Polizei & THW.",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=compress&w=800&q=80",
    icon: Siren,
    badgeColor: "text-red-400",
  },
  {
    id: "personaltraining",
    title: "Personal Training",
    category: "1-zu-1 Coaching",
    description: "Das funktionale Premiumingredienz für exklusive Coaching-Kunden und schnelle Trainingserfolge.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=compress&w=800&q=80",
    icon: UserCheck,
    badgeColor: "text-[#0A1C3A]",
  },
  {
    id: "profisport",
    title: "Profisport",
    category: "Elite Performance",
    description: "Selektive Reduzierung von oxidativem Stress & Laktatansammlungen in den Wettkampfphasen.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=compress&w=800&q=80",
    icon: Trophy,
    badgeColor: "text-amber-400",
  },
  {
    id: "skifahrer",
    title: "Skifahrer & Wintersport",
    category: "Alpin & Höhe",
    description: "Bessere Sauerstoffverwertung in großer Höhe & schnelle Erholung bei Kältebelastungen.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=compress&w=800&q=80",
    icon: Trophy,
    badgeColor: "text-sky-400",
  },
  {
    id: "tennisspieler",
    title: "Tennisspieler",
    category: "Schnelligkeit & Fokus",
    description: "Hält die Konzentration über lange Sätze aufrecht & reduziert muskuläre Ermüdung.",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=compress&w=800&q=80",
    icon: Activity,
    badgeColor: "text-emerald-400",
  },
  {
    id: "golfspieler",
    title: "Golfspieler",
    category: "Präzision & Konstanz",
    description: "Dauerhafte mentale Schärfe über 18 Löcher hinweg ohne Leistungstiefs.",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=compress&w=800&q=80",
    icon: Target,
    badgeColor: "text-amber-400",
  },
  {
    id: "segler",
    title: "Segler & Wassersport",
    category: "Elemente & Sonne",
    description: "Optimaler Zellschutz vor oxidativem Stress durch Sonnenstrahlung, Wind & Salzwasser.",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795131470431-6qvssxou.png",
    icon: Compass,
    badgeColor: "text-sky-400",
  },
  {
    id: "bueroleute",
    title: "Büroleute & Business",
    category: "Office & Fokus",
    description: "Geistige Frische bei Bildschirmarbeit – vertreibt das Nachmittagstief ohne Koffein.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=compress&w=800&q=80",
    icon: Briefcase,
    badgeColor: "text-indigo-400",
  },
  {
    id: "restaurants",
    title: "Restaurants",
    category: "Gastronomie & Dining",
    description: "Das exklusive Erfrischungserlebnis für gehobene Gastronomie – feinstes H₂-Wasser als edler Speisenbegleiter.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=compress&w=800&q=80",
    icon: Utensils,
    badgeColor: "text-amber-400",
  },
  {
    id: "bars",
    title: "Bars & Lounges",
    category: "Nightlife & Gastro",
    description: "Alkoholfreier Premium-Genuss & belebende Hydration für lange Nächte und anspruchsvolle Bargäste.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=compress&w=800&q=80",
    icon: Wine,
    badgeColor: "text-rose-400",
  },
  {
    id: "universitaetsmensen",
    title: "Universitätsmensen",
    category: "Campus & Studium",
    description: "Fokus & Energie für Studierende im Vorlesungsmarathon – die gesunde Hydrationsalternative auf dem Campus.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=compress&w=800&q=80",
    icon: GraduationCap,
    badgeColor: "text-sky-400",
  },
];

export default function HomePage() {
  const einsatzbereicheRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ScrollToneBackdrop />

      <WaterDropIntro />

      {/* 1. HERO SECTION */}
      <div id="hero" data-webild-section="HeroWordmarkProduct" data-webild-section-id="HeroWordmarkProduct-1" data-section="hero">
        <HeroWordmarkProduct
          media="image"
          productImageSrc={CAN_IMAGE_URL}
          productImageAlt="FONTES VITEA H2 Wasserstoff Dose"
          brand=""
          title="H2 - HYDROGEN WATER"
          subtitle="CLEAN & PURE – HYDRATION EINER NEUEN GENERATION"
          description="Reines Quellwasser, angereichert mit 2,8 mg/L molekularem Wasserstoff. Inspiriert von der Natur, wissenschaftlich erforscht und durch innovative Verpackungstechnologie geschützt."
          tagline="Ohne Zucker · Ohne Koffein · Ohne Stimulanzien"
          primaryButton={{
            text: "Jetzt Shop entdecken",
            href: "https://shop.fontes-vitae.com"
          }}
          items={[
            {
              value: "2.8",
              unit: "mg/L",
              title: "Gelöster Wasserstoff"
            },
            {
              value: "0",
              unit: "kcal",
              title: "Zucker & Kalorien"
            },
            {
              value: "100",
              unit: "%",
              title: "BPA-Frei & Rein"
            }
          ]}
          introDelay={1.4}
        />
      </div>

      {/* 2. TECHNOLOGIE & INNOVATION */}
      <div id="technologie" data-webild-section="TechnologyInnovation" data-webild-section-id="TechnologyInnovation-1" data-section="tech">
        <section className="py-20 px-6 bg-transparent text-[#0A1C3A] font-sans">
          <div className="max-w-6xl mx-auto space-y-14">
            {/* Header */}
            <div className="text-center space-y-3">
              <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#f4f6f8] px-4 py-1.5 rounded-full inline-block border border-slate-300">
                FORTSCHRITTLICHE VERPACKUNGSTECHNOLOGIE
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A1C3A] uppercase tracking-tight">
                TECHNOLOGIE &amp; INNOVATION
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-medium">
                Moderne Wasserstoff-Technologie und innovative Dosenbeschichtung für höchste Qualität.
              </p>
            </div>

            {/* 1) Oberes Raster - 3 Bildkarten */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-[#f8fafc] rounded-2xl overflow-hidden border border-slate-300 shadow-md hover:border-[#0A1C3A] hover:shadow-xl transition flex flex-col justify-between group">
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-200">
                    <img
                      src="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795654411022-9o7v5ozx.png"
                      alt="H2-Konzentration"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C3A]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-lg border border-slate-700">
                      <Droplets className="w-5 h-5 text-sky-400" />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black uppercase text-[#0A1C3A]">H₂-KONZENTRATION</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      2,8 mg/L gelöster molekularer Wasserstoff laut Herstellerangabe. Eine spezielle Anreicherungstechnologie ermöglicht diese hohe Konzentration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#f8fafc] rounded-2xl overflow-hidden border border-slate-300 shadow-md hover:border-[#0A1C3A] hover:shadow-xl transition flex flex-col justify-between group">
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-200">
                    <img
                      src="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795653130858-6zykqvgj.png"
                      alt="Aluminiumdosen-Technologie"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C3A]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-lg border border-slate-700">
                      <Layers className="w-5 h-5 text-sky-400" />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black uppercase text-[#0A1C3A]">ALUMINIUMDOSEN-TECHNOLOGIE</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      Eine hochfeste Aluminiumlegierung sorgt für Stabilität und Lichtschutz. Die Verpackung schützt das Getränk vor äußeren Einflüssen.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#f8fafc] rounded-2xl overflow-hidden border border-slate-300 shadow-md hover:border-[#0A1C3A] hover:shadow-xl transition flex flex-col justify-between group">
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-200">
                    <img
                      src="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795654372979-h1aq82jr.png"
                      alt="BPANI-Technologie"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C3A]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-lg border border-slate-700">
                      <ShieldCheck className="w-5 h-5 text-sky-400" />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black uppercase text-[#0A1C3A]">BPANI-TECHNOLOGIE</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      Moderne Innenbeschichtung ohne absichtlichen Zusatz von Bisphenol A (BPA). Eine innovative Alternative zu herkömmlichen BPA-basierten Epoxidbeschichtungen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2) Großes Hauptbild - Innovative Schutzbarriere (3D Querschnittsdarstellung) */}
            <div className="bg-[#0A1C3A] text-white rounded-3xl p-6 sm:p-10 border border-slate-700 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left column */}
                <div className="lg:col-span-4 space-y-4 text-left">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-none">
                      INNOVATIVE
                      <br />
                      <span className="text-sky-400 border-b-4 border-sky-400 inline-block pb-1 mt-1">
                        SCHUTZBARRIERE
                      </span>
                    </h3>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pt-2">
                    Eine spezielle Innenbeschichtung trennt das Getränk von der Aluminiumoberfläche und unterstützt den Erhalt von Geschmack und Qualität.
                  </p>
                </div>

                {/* Center column: 3D Cross-section Graphic */}
                <div className="lg:col-span-4 flex items-center justify-center relative py-4 lg:py-0">
                  <div className="relative flex items-center justify-center max-w-[320px] w-full">
                    <div className="relative z-10 w-36 sm:w-44 shrink-0 transform -rotate-3 hover:rotate-0 transition duration-500">
                      <img
                        src={CAN_IMAGE_URL}
                        alt="FONTES VITEA H2 Dose Querschnitt"
                        className="w-full h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
                      />
                    </div>

                    <div className="relative z-20 -ml-8 w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 border-slate-300 shadow-2xl overflow-hidden bg-slate-900 shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#061224] to-slate-900 flex items-center justify-center">
                        {/* Layer 1: Aluminium ring */}
                        <div className="absolute inset-2 rounded-full border-[10px] border-slate-400/90 shadow-inner flex items-center justify-center">
                          {/* Layer 2: Inner polymer coating */}
                          <div className="absolute inset-1 rounded-full border-4 border-sky-400/90 shadow-[0_0_15px_rgba(56,189,248,0.5)] flex items-center justify-center">
                            {/* Layer 3: Liquid inside with H2 bubbles */}
                            <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-600/70 via-sky-900/80 to-amber-500/50 flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.4)_0%,transparent_70%)] animate-pulse" />
                              <span className="w-2 h-2 rounded-full bg-sky-200/80 absolute top-4 left-6 animate-bounce" />
                              <span className="w-3 h-3 rounded-full bg-amber-200/90 absolute bottom-6 right-8 animate-pulse" />
                              <span className="w-1.5 h-1.5 rounded-full bg-white absolute top-10 right-5" />
                              <span className="w-2.5 h-2.5 rounded-full bg-sky-300/80 absolute bottom-10 left-8" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column: 3 Callouts */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-4 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/80 backdrop-blur-sm">
                    <div className="w-9 h-9 rounded-full bg-slate-200 text-[#0A1C3A] font-black flex items-center justify-center text-base shrink-0 shadow-md">
                      1
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-extrabold text-white">Aluminiumlegierung</h4>
                      <p className="text-xs text-slate-300">Stabilität und Schutz</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-sky-950/60 p-3.5 rounded-2xl border border-sky-500/40 backdrop-blur-sm">
                    <div className="w-9 h-9 rounded-full bg-sky-400 text-[#0A1C3A] font-black flex items-center justify-center text-base shrink-0 shadow-md shadow-sky-500/20">
                      2
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-extrabold text-white">Polymerbeschichtung (Innenbeschichtung)</h4>
                      <p className="text-xs text-sky-200">Funktionale Schutzbarriere</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/80 backdrop-blur-sm">
                    <div className="w-9 h-9 rounded-full bg-slate-200 text-[#0A1C3A] font-black flex items-center justify-center text-base shrink-0 shadow-md">
                      3
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-extrabold text-white">Getränk</h4>
                      <p className="text-xs text-slate-300">Kein direkter Metallkontakt bei intakter Beschichtung</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3) Unteres Raster - 3 Bildkarten */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-[#f8fafc] rounded-2xl overflow-hidden border border-slate-300 shadow-md hover:border-[#0A1C3A] hover:shadow-xl transition flex flex-col justify-between group">
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-200">
                    <img
                      src="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795654811669-5n7rmz1a.png"
                      alt="Innere Polymerbeschichtung"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C3A]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-lg border border-slate-700">
                      <Layers className="w-5 h-5 text-sky-400" />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black uppercase text-[#0A1C3A]">INNERE POLYMERBESCHICHTUNG</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      Eine ultradünne, durchgehende Polymerschicht bildet eine funktionale Barriere zwischen Getränk und Aluminium.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#f8fafc] rounded-2xl overflow-hidden border border-slate-300 shadow-md hover:border-[#0A1C3A] hover:shadow-xl transition flex flex-col justify-between group">
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-200">
                    <img
                      src="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795654905969-uzt13zda.png"
                      alt="Geschmacks- und Qualitätsschutz"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C3A]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-lg border border-slate-700">
                      <FlaskConical className="w-5 h-5 text-sky-400" />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black uppercase text-[#0A1C3A]">GESCHMACKS- UND QUALITÄTSSCHUTZ</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      Die Innenbeschichtung schützt vor Korrosion und reduziert das Risiko metallischer Geschmacksnoten. Der ursprüngliche Getränkegeschmack bleibt geschützt.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#f8fafc] rounded-2xl overflow-hidden border border-slate-300 shadow-md hover:border-[#0A1C3A] hover:shadow-xl transition flex flex-col justify-between group">
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=compress&w=800&q=80"
                      alt="Lebensmittelsicherheit"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C3A]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-lg border border-slate-700">
                      <ShieldCheck className="w-5 h-5 text-sky-400" />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black uppercase text-[#0A1C3A]">LEBENSMITTELSICHERHEIT</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      Für den Lebensmittelkontakt vorgesehene Materialien und moderne Beschichtungstechnologien unterstützen die Produktsicherheit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4) Vergleichskarten-Bereich für BPANI im Vergleich zu herkömmlichen BPA-Beschichtungen */}
            <div className="space-y-8 pt-4">
              <div className="flex items-center gap-4 text-center">
                <div className="h-px bg-slate-300 flex-1" />
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#0A1C3A] px-2">
                  BESCHICHTUNGSTECHNOLOGIE IM VERGLEICH
                </h3>
                <div className="h-px bg-slate-300 flex-1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Herkömmliche BPA-Beschichtung */}
                <div className="bg-orange-50/60 rounded-2xl p-6 sm:p-8 border border-orange-200/90 shadow-sm flex flex-col justify-between space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md font-black text-xl">
                      !
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase text-amber-900 tracking-tight">
                        HERKÖMMLICHE BPA-BESCHICHTUNG
                      </h4>
                      <p className="text-xs text-amber-800/80 mt-0.5">Herkömmliche Standardbeschichtungen</p>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm font-semibold text-slate-700">
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center shrink-0 text-xs">✕</span>
                      <span>BPA-basierte Epoxidharze</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center shrink-0 text-xs">✕</span>
                      <span>Potenzielle Stoffmigration</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center shrink-0 text-xs">✕</span>
                      <span>Regulatorische Einschränkungen</span>
                    </li>
                  </ul>
                </div>

                {/* Moderne BPANI-Beschichtung */}
                <div className="bg-emerald-50/60 rounded-2xl p-6 sm:p-8 border border-emerald-300 shadow-sm flex flex-col justify-between space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase text-emerald-950 tracking-tight">
                        MODERNE BPANI-BESCHICHTUNG
                      </h4>
                      <p className="text-xs text-emerald-800/80 mt-0.5">FONTES VITEA Qualitätsverpackung</p>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm font-semibold text-slate-800">
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                      <span>Ohne absichtlichen BPA-Zusatz</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                      <span>Alternative Polymertechnologie</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                      <span>Funktionale Schutzbarriere</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                      <span>Korrosionsbeständigkeit</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sie möchten mehr erfahren? Info-Bereich */}
              <div className="mt-14 pt-10 border-t border-slate-200/80 max-w-3xl mx-auto text-center space-y-5">
                <div className="inline-flex items-center justify-center size-12 bg-[#0A1C3A] text-white rounded-2xl shadow-sm">
                  <BookOpen className="w-6 h-6 text-sky-400" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0A1C3A]">
                  Sie möchten mehr erfahren?
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium max-w-2xl mx-auto">
                  Entdecken Sie wissenschaftliche Studien, Forschungsergebnisse, Zertifikate und weiterführende Informationen über molekularen Wasserstoff und unsere Technologie.
                </p>
                <div className="pt-2">
                  <Link
                    to="/wissenschaft"
                    className="inline-flex items-center justify-center gap-3 bg-[#0A1C3A] hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <BookOpen className="w-4 h-4 shrink-0 text-sky-400" />
                    <span>WISSEN, STUDIEN &amp; ZERTIFIKATE ENTDECKEN →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 3. DAS QUELLWASSER (inkl. Mineralstoff- & Trinkwasseranalyse) */}
      <div id="quelle" data-webild-section="WaterSourceMinerals" data-webild-section-id="WaterSourceMinerals-1" data-section="source">
        <section className="py-20 px-6 bg-transparent font-sans text-[#0A1C3A]">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#f4f6f8] px-4 py-1.5 rounded-full inline-block border border-slate-300">
                Natürliche Herkunft &amp; Reinheit
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A1C3A] uppercase tracking-tight">
                DAS QUELLWASSER
              </h2>
              <p className="text-slate-700 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-medium">
                Das Quellwasser entspricht höchsten Reinheitsstandards und wird aus einer tiefliegenden unterirdischen Quelle (136 Meter) gewonnen. Durch jahrtausendealte Gesteinsschichten natürlich gefiltert, bietet es ein ausgewogenes Mineralienprofil. FONTES VITEA bringt als spezialisierter Vertriebspartner dieses edle Wasserstoff-Wasser in höchster Qualität direkt zu Ihnen.
              </p>
            </div>

            {/* Depth visual & features banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-300 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shrink-0">
                  <Droplets className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase text-[#0A1C3A]">136 Meter Tiefe</h3>
                  <p className="text-xs text-slate-600 mt-1">Geschützte unterirdische Tiefenquelle für dauerhaft stabile Mineralzusammensetzung.</p>
                </div>
              </div>

              <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-300 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase text-[#0A1C3A]">Geologische Filterung</h3>
                  <p className="text-xs text-slate-600 mt-1">Natürlich durch Gesteinsschichten gereinigt, frei von Umwelt- und Oberflächenbelastungen.</p>
                </div>
              </div>

              <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-300 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase text-[#0A1C3A]">Zertifizierte Abfüllung</h3>
                  <p className="text-xs text-slate-600 mt-1">Geprüfte Abfüllung durch akkreditierte Partnerunternehmen nach strengsten EU-Richtlinien.</p>
                </div>
              </div>
            </div>

            {/* Complete Laboratory Mineral & Water Quality Table */}
            <div className="bg-white rounded-2xl border border-slate-300 shadow-xl overflow-hidden">
              <div className="bg-[#0A1C3A] text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-[#0A1C3A]">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight">Trinkwasserqualität &amp; Laboranalyse</h3>
                  <p className="text-xs text-slate-300">Ausgewählte chemische Parameter gemäß EU-/SR-Trinkwasservorschriften (Messung: Středočeské vodárny, a.s.)</p>
                </div>
                <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Alle Parameter Konform
                </span>
              </div>

              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-left border-collapse min-w-[480px]">
                  <thead>
                    <tr className="bg-[#f4f6f8] text-[#0A1C3A] text-xs uppercase font-black tracking-wider border-b border-slate-300">
                      <th className="py-3.5 px-6">Parameter</th>
                      <th className="py-3.5 px-6">Gemessener Wert</th>
                      <th className="py-3.5 px-6">Grenzwert (SR/EU)</th>
                      <th className="py-3.5 px-6 text-right">Bewertung</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs text-slate-800 font-medium">
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0A1C3A]">pH-Wert</td>
                      <td className="py-3.5 px-6 font-semibold">7.3</td>
                      <td className="py-3.5 px-6 text-slate-600">6.5 – 9.5</td>
                      <td className="py-3.5 px-6 text-right">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Konform</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0A1C3A]">Calcium (Ca)</td>
                      <td className="py-3.5 px-6 font-semibold">109 mg/L</td>
                      <td className="py-3.5 px-6 text-slate-400">—</td>
                      <td className="py-3.5 px-6 text-right text-slate-400">—</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0A1C3A]">Magnesium (Mg)</td>
                      <td className="py-3.5 px-6 font-semibold">14 mg/L</td>
                      <td className="py-3.5 px-6 text-slate-400">—</td>
                      <td className="py-3.5 px-6 text-right text-slate-400">—</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0A1C3A]">Natrium (Na)</td>
                      <td className="py-3.5 px-6 font-semibold">7.5 mg/L</td>
                      <td className="py-3.5 px-6 text-slate-600">200 mg/L</td>
                      <td className="py-3.5 px-6 text-right">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Konform</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0A1C3A]">Kalium (K)</td>
                      <td className="py-3.5 px-6 font-semibold">3.3 mg/L</td>
                      <td className="py-3.5 px-6 text-slate-400">—</td>
                      <td className="py-3.5 px-6 text-right text-slate-400">—</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0A1C3A]">Nitrat (NO₃⁻)</td>
                      <td className="py-3.5 px-6 font-semibold">12.7 mg/L</td>
                      <td className="py-3.5 px-6 text-slate-600">50 mg/L</td>
                      <td className="py-3.5 px-6 text-right">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Konform</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0A1C3A]">Nitrit (NO₂⁻)</td>
                      <td className="py-3.5 px-6 font-semibold">&lt;0.05 mg/L</td>
                      <td className="py-3.5 px-6 text-slate-600">0.50 mg/L</td>
                      <td className="py-3.5 px-6 text-right">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Konform</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0A1C3A]">Chlorid (Cl⁻)</td>
                      <td className="py-3.5 px-6 font-semibold">17.7 mg/L</td>
                      <td className="py-3.5 px-6 text-slate-600">250 mg/L</td>
                      <td className="py-3.5 px-6 text-right">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Konform</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0A1C3A]">Sulfat (SO₄²⁻)</td>
                      <td className="py-3.5 px-6 font-semibold">66.4 mg/L</td>
                      <td className="py-3.5 px-6 text-slate-600">250 mg/L</td>
                      <td className="py-3.5 px-6 text-right">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Konform</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0A1C3A]">Eisen (Fe)</td>
                      <td className="py-3.5 px-6 font-semibold">0.04 mg/L</td>
                      <td className="py-3.5 px-6 text-slate-600">0.20 mg/L</td>
                      <td className="py-3.5 px-6 text-right">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Konform</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-6 font-bold text-[#0A1C3A]">Mangan (Mn)</td>
                      <td className="py-3.5 px-6 font-semibold">0.00 mg/L</td>
                      <td className="py-3.5 px-6 text-right">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Konform</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 5. VORTEILE IM VERGLEICH */}
      <div id="vergleich" data-webild-section="ProductCompareTable" data-webild-section-id="ProductCompareTable-1" data-section="product">
        <section className="py-20 px-6 bg-transparent text-[#0A1C3A] font-sans">
          <div className="max-w-7xl mx-auto">
            <ProductCompareTable
              media="image"
              productImageSrc={CAN_IMAGE_URL}
              productImageAlt="FONTES VITEA H2 Dose"
              title="IM VERGLEICH"
              accent="VORTEILE"
              benefitsLabel="Merkmale"
              name="FONTES VITEA H2"
              otherLabel="Herkömmliches Wasser"
              shopUrl="https://shop.fontes-vitae.com"
              shopButtonText="Zum Shop"
              items={[
                {
                  title: "Min. 2.8 mg/L molekular gelöster Wasserstoff",
                  ours: true,
                  other: false
                },
                {
                  title: "Gezieltes Abfangen schädlicher Radikale",
                  ours: true,
                  other: false
                },
                {
                  title: "0 kcal & 0 g Zucker & 0 Zusatzstoffe",
                  ours: true,
                  other: false
                },
                {
                  title: "BPA-freie Aluminiumdose",
                  ours: true,
                  other: false
                },
                {
                  title: "Laborgeprüfte Reinheit & Qualität",
                  ours: true,
                  other: true
                },
                {
                  title: "1 bis 2 Dosen täglich empfohlen",
                  ours: true,
                  other: false
                }
              ]}
              model={{
                ry: 20,
                rz: 0,
                scale: 0.5,
                sm: {
                  scale: 0.78
                }
              }}
            />
          </div>
        </section>
      </div>

      {/* 6. EINSATZBEREICHE & ANWENDUNGSGEBIETE */}
      <div id="einsatzbereiche" data-webild-section="Einsatzbereiche" data-webild-section-id="Einsatzbereiche-1" data-section="einsatzbereiche">
        <section className="py-20 px-6 bg-transparent text-[#0A1C3A] font-sans">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Einsatzbereiche Section Header */}
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-white px-4 py-1.5 rounded-full inline-block border border-slate-300">
                Performance &amp; Zielgruppen
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A1C3A] uppercase tracking-tight">
                EINSATZBEREICHE &amp; ANWENDUNGSGEBIETE
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Ob Fitnessstudio, Militär &amp; Streitkräfte, zivile Einsatzkräfte, Fußball- &amp; Sportvereine, Gastronomie, Bars, Universitätsmensen, Personal Training oder Profisport – FONTES VITEA liefert zielgerichtete zelluläre Hydration.
              </p>
            </div>

            {/* Grid on Desktop (4 cols), Grid on Tablet (2 cols), Swipe Carousel on Mobile */}
            <div
              ref={einsatzbereicheRef}
              className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 pt-2 scrollbar-none select-none"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {EINSATZBEREICHE.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.id}
                    className="snap-start shrink-0 w-[280px] sm:w-[320px] md:w-full md:shrink bg-white rounded-2xl overflow-hidden border border-slate-300 shadow-md hover:border-[#0A1C3A] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full"
                  >
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="relative h-48 overflow-hidden bg-slate-200 shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C3A]/85 via-transparent to-transparent" />
                          <span className="absolute bottom-3 left-3 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                            <IconComp className={`w-4 h-4 ${item.badgeColor}`} /> {item.category}
                          </span>
                        </div>
                        <div className="p-5 space-y-2">
                          <h3 className="text-base font-black uppercase text-[#0A1C3A]">{item.title}</h3>
                          <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* FREIGEGEBENE KUNDENBEWERTUNGEN UNTER DER VERGLEICHSTABELLE */}
      <div id="kundenbewertungen" data-webild-section="CustomerReviews" data-section="reviews">
        <CustomerReviewsSection
          title="Echte Erfahrungen aus der FONTES VITEA Community"
          subtitle="Entdecken Sie, was unsere Kundinnen und Kunden über Geschmack und das Wasserstoff-Erlebnis berichten."
          showOrderButton={true}
          showGoogleReviews={true}
        />
      </div>
    </>
  );
}
