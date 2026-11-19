import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroWordmarkProduct from "@/components/sections/hero/HeroWordmarkProduct";
import ProductCompareTable from "@/components/sections/product/ProductCompareTable";
import ScrollToneBackdrop from "@/components/kit/ScrollToneBackdrop";
import WaterDropIntro from "@/components/loaders/WaterDropIntro";
import { useCart, type ProductDetailInfo } from "@/context/CartContext";
import {
  ShoppingBag,
  Info,
  Check,
  Sun,
  Briefcase,
  Dumbbell,
  Plane,
  Droplets,
  ShieldCheck,
  Cpu,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Trophy,
  Activity,
  Target,
  Compass,
  Building2
} from "lucide-react";

const CAN_IMAGE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794865744193-o2e363kc.png";
const H2_12PACK_IMAGE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794876509264-c5xnooyr.png";

const JUICE_IMAGES: Record<string, string> = {
  "Blaubeere (Blueberry)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862684-n9ac3wqc.png",
  "Traube (Grape)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862677-cd34mdsd.png",
  "Himbeere (Raspberry)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862680-jc370nfv.png",
  "Ingwer (Ginger Tonic)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862681-6t2d7fbm.png",
  "Apfel Limette (Apple Lime)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862684-n9ac3wqc.png",
  "Apfel Ingwer (Apple Ginger)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862684-n9ac3wqc.png",
};

const H2_12_DETAILS: ProductDetailInfo = {
  title: "FONTES VITEA H2 Wasserstoff-Wasser",
  subtitle: "12x 250 ml Aluminiumdosen (100 % BPA-Frei)",
  price: "39,64 € (12er-Pack)",
  depositInfo: "Inklusive 19 % MwSt. & 3,00 € Dosenpfand (0,25 € pro Dose)",
  imageSrc: H2_12PACK_IMAGE_URL,
  rawPrice: 39.64,
  cansCount: 12,
  deposit: 3.00,
  packInfo: "12er-Pack (12x 250 ml)",
  description:
    "Reinste Hydration angereichert mit mindestens 2,8 mg/L gelöstem molekularem Wasserstoff (H₂). Vertrieben durch FONTES VITEA als offiziellem Vertriebspartner.",
  verzehr: "Empfohlene tägliche Verzehrmenge: 1 bis 2 Dosen täglich. Ideal morgens, bei der Arbeit, vor/nach dem Sport oder unterwegs.",
  nutritionalTable: [
    { name: "Brennwert", value: "0 kJ / 0 kcal" },
    { name: "Fett", value: "0 g" },
    { name: "davon gesättigte Fettsäuren", value: "0 g" },
    { name: "Kohlenhydrate", value: "0 g" },
    { name: "davon Zucker", value: "0 g" },
    { name: "Eiweiß", value: "0 g" },
    { name: "Salz", value: "0 g" },
    { name: "Molekularer Wasserstoff (H₂)", value: "≥ 2.8 mg/L" },
  ],
  specs: [
    "Mind. 2.8 mg/L gelöster Wasserstoff",
    "250 ml Aluminiumdosen – 100 % BPA-Frei",
    "0 kcal, 0 g Zucker, 100% BPA-Frei",
    "Laborgeprüfte Reinheit nach EU-Standards",
    "Gezieltes Antioxidans für Zellschutz"
  ]
};

interface VarietyItem {
  id: string;
  name: string;
  badge: string;
  category: string;
  image: string;
  price: string;
  deposit: string;
  description: string;
  detail: ProductDetailInfo;
}

const SEVEN_VARIETIES: VarietyItem[] = [
  {
    id: "sorte-h2",
    name: "FONTES VITEA H2 Wasser",
    badge: "H2 Molekular",
    category: "Wasserstoff-Wasser",
    image: CAN_IMAGE_URL,
    price: "39,64 € (12er-Pack)",
    deposit: "Inkl. 3,00 € Pfand",
    description: "Reinste Hydration mit mind. 2,8 mg/L gelöstem molekularem Wasserstoff (H2). 0 kcal, 0 g Zucker, BPA-Frei.",
    detail: H2_12_DETAILS,
  },
  {
    id: "sorte-blaubeere",
    name: "Blaubeere (Blueberry)",
    badge: "100% Fruchtsaft",
    category: "Vital-Fruchtsaft",
    image: JUICE_IMAGES["Blaubeere (Blueberry)"],
    price: "31,84 € (12er-Pack)",
    deposit: "Inkl. 3,00 € Pfand",
    description: "Köstlicher Direktsaft aus sonnengereiften Blaubeeren. Reich an pflanzlichen Antioxidantien, 100% Vegan.",
    detail: {
      title: "FONTES VITEA Fruchtsaft - Blaubeere (Blueberry)",
      subtitle: "100% natürlicher Direktsaft • 100% Vegan • 250 ml Alu-Dose",
      price: "31,84 € (12er-Pack)",
      depositInfo: "Inklusive 19 % MwSt. & 3,00 € Dosenpfand (0,25 € pro Dose)",
      imageSrc: JUICE_IMAGES["Blaubeere (Blueberry)"],
      description: "Direktsaft aus sonnengereiften Blaubeeren in 100 % BPA-freien Aluminiumdosen. Natursüß, intensiv und voller Vitalstoffe.",
      verzehr: "Ideal als frischer Energieschub am Morgen oder als nahrhafter Fruchttank zwischendurch.",
      nutritionalTable: [
        { name: "Brennwert", value: "185 kJ / 44 kcal" },
        { name: "Fett", value: "< 0,1 g" },
        { name: "Kohlenhydrate", value: "10,5 g" },
        { name: "davon Zucker", value: "9,8 g" },
        { name: "Eiweiß", value: "0,3 g" }
      ],
      specs: [
        "100% natürlicher Blaubeersaft",
        "100% Vegan & BPA-Frei",
        "Reich an Vitamin C & Antioxidantien",
        "Laborgeprüfte Reinheit"
      ]
    }
  },
  {
    id: "sorte-traube",
    name: "Traube (Grape)",
    badge: "100% Fruchtsaft",
    category: "Vital-Fruchtsaft",
    image: JUICE_IMAGES["Traube (Grape)"],
    price: "31,84 € (12er-Pack)",
    deposit: "Inkl. 3,00 € Pfand",
    description: "Edler Traubensaft aus sonnenverwöhnten Weintrauben. Natursüß, reich an Polyphenolen und BPA-Frei.",
    detail: {
      title: "FONTES VITEA Fruchtsaft - Traube (Grape)",
      subtitle: "100% natürlicher Direktsaft • 100% Vegan • 250 ml Alu-Dose",
      price: "31,84 € (12er-Pack)",
      depositInfo: "Inklusive 19 % MwSt. & 3,00 € Dosenpfand (0,25 € pro Dose)",
      imageSrc: JUICE_IMAGES["Traube (Grape)"],
      description: "Intensiver Traubensaft aus Weintrauben höchster Güteklasse in 100 % BPA-freien Alu-Dosen.",
      verzehr: "Perfekter natürlicher Durstlöscher und Kraftspender im Alltag.",
      nutritionalTable: [
        { name: "Brennwert", value: "270 kJ / 64 kcal" },
        { name: "Fett", value: "< 0,1 g" },
        { name: "Kohlenhydrate", value: "15,5 g" },
        { name: "davon Zucker", value: "15,2 g" },
        { name: "Eiweiß", value: "0,2 g" }
      ],
      specs: [
        "100% edler Traubensaft",
        "100% Vegan & BPA-Frei",
        "Wertvolle Pflanzenstoffe",
        "Ohne Zuckerzusatz"
      ]
    }
  },
  {
    id: "sorte-himbeere",
    name: "Himbeere (Raspberry)",
    badge: "100% Fruchtsaft",
    category: "Vital-Fruchtsaft",
    image: JUICE_IMAGES["Himbeere (Raspberry)"],
    price: "31,84 € (12er-Pack)",
    deposit: "Inkl. 3,00 € Pfand",
    description: "Fruchtiges Himbeer-Erlebnis voller natürlicher Frische und Vitalität. In BPA-freien Aluminiumdosen.",
    detail: {
      title: "FONTES VITEA Fruchtsaft - Himbeere (Raspberry)",
      subtitle: "100% natürlicher Fruchtsaft • 100% Vegan • 250 ml Alu-Dose",
      price: "31,84 € (12er-Pack)",
      depositInfo: "Inklusive 19 % MwSt. & 3,00 € Dosenpfand (0,25 € pro Dose)",
      imageSrc: JUICE_IMAGES["Himbeere (Raspberry)"],
      description: "Erfrischender Himbeersaft mit voller Fruchtkraft. 100% pflanzlich abgefüllt in BPA-freien Alu-Dosen.",
      verzehr: "Gekühlt genießen für maximale fruchtige Erfrischung.",
      nutritionalTable: [
        { name: "Brennwert", value: "172 kJ / 41 kcal" },
        { name: "Fett", value: "< 0,1 g" },
        { name: "Kohlenhydrate", value: "9,2 g" },
        { name: "davon Zucker", value: "8,5 g" },
        { name: "Eiweiß", value: "0,4 g" }
      ],
      specs: [
        "Voller Himbeergeschmack",
        "100% Vegan & BPA-Frei",
        "Erfrischende Fruchtsäure",
        "Laborgeprüfte Qualität"
      ]
    }
  },
  {
    id: "sorte-ingwer",
    name: "Ingwer (Ginger Tonic)",
    badge: "100% Fruchtsaft",
    category: "Vital-Fruchtsaft",
    image: JUICE_IMAGES["Ingwer (Ginger Tonic)"],
    price: "31,84 € (12er-Pack)",
    deposit: "Inkl. 3,00 € Pfand",
    description: "Erfrischendes Ginger Tonic mit angenehmer Ingwerschärfe. Belebt Sinne und Kreislauf.",
    detail: {
      title: "FONTES VITEA Fruchtsaft - Ingwer (Ginger Tonic)",
      subtitle: "100% natürlicher Fruchtsaft • 100% Vegan • 250 ml Alu-Dose",
      price: "31,84 € (12er-Pack)",
      depositInfo: "Inklusive 19 % MwSt. & 3,00 € Dosenpfand (0,25 € pro Dose)",
      imageSrc: JUICE_IMAGES["Ingwer (Ginger Tonic)"],
      description: "Kräftig-belebender Ingwersaft mit natürlicher Schärfe in BPA-freien Aluminiumdosen.",
      verzehr: "Optimal als Immun-Kick am Morgen oder Energiekick bei der Arbeit.",
      nutritionalTable: [
        { name: "Brennwert", value: "148 kJ / 35 kcal" },
        { name: "Fett", value: "< 0,1 g" },
        { name: "Kohlenhydrate", value: "8,1 g" },
        { name: "davon Zucker", value: "7,6 g" },
        { name: "Eiweiß", value: "0,2 g" }
      ],
      specs: [
        "Fein-scharfer Ingwer-Kick",
        "100% Vegan & BPA-Frei",
        "Belebend & erfrischend",
        "Ohne Konservierungsmittel"
      ]
    }
  },
  {
    id: "sorte-apfel-limette",
    name: "Apfel Limette (Apple Lime)",
    badge: "100% Fruchtsaft",
    category: "Vital-Fruchtsaft",
    image: JUICE_IMAGES["Apfel Limette (Apple Lime)"],
    price: "31,84 € (12er-Pack)",
    deposit: "Inkl. 3,00 € Pfand",
    description: "Spritzig-frische Kombination aus knackigem Apfel und feiner Limette in BPA-freien Alu-Dosen.",
    detail: {
      title: "FONTES VITEA Fruchtsaft - Apfel Limette (Apple Lime)",
      subtitle: "100% natürlicher Fruchtsaft • 100% Vegan • 250 ml Alu-Dose",
      price: "31,84 € (12er-Pack)",
      depositInfo: "Inklusive 19 % MwSt. & 3,00 € Dosenpfand (0,25 € pro Dose)",
      imageSrc: JUICE_IMAGES["Apfel Limette (Apple Lime)"],
      description: "Die perfekte Harmonie aus knackigem Apfel und spritziger Limette. Natürliche Vitamine in recycelbarer Dose.",
      verzehr: "Fruchtige Erfrischung nach dem Sport oder in der Pause.",
      nutritionalTable: [
        { name: "Brennwert", value: "195 kJ / 46 kcal" },
        { name: "Fett", value: "< 0,1 g" },
        { name: "Kohlenhydrate", value: "11,0 g" },
        { name: "davon Zucker", value: "10,2 g" },
        { name: "Eiweiß", value: "0,1 g" }
      ],
      specs: [
        "Apfel-Limette Frische",
        "100% Vegan & BPA-Frei",
        "Spritzig & leicht",
        "Qualität aus Deutschland"
      ]
    }
  },
  {
    id: "sorte-apfel-ingwer",
    name: "Apfel Ingwer (Apple Ginger)",
    badge: "100% Fruchtsaft",
    category: "Vital-Fruchtsaft",
    image: JUICE_IMAGES["Apfel Ingwer (Apple Ginger)"],
    price: "31,84 € (12er-Pack)",
    deposit: "Inkl. 3,00 € Pfand",
    description: "Belebende Harmonie aus süßem Apfelsaft und würziger Ingwernote in BPA-freien Alu-Dosen.",
    detail: {
      title: "FONTES VITEA Fruchtsaft - Apfel Ingwer (Apple Ginger)",
      subtitle: "100% natürlicher Fruchtsaft • 100% Vegan • 250 ml Alu-Dose",
      price: "31,84 € (12er-Pack)",
      depositInfo: "Inklusive 19 % MwSt. & 3,00 € Dosenpfand (0,25 € pro Dose)",
      imageSrc: JUICE_IMAGES["Apfel Ingwer (Apple Ginger)"],
      description: "Ausgewogenes Geschmackserlebnis aus heimischem Apfelsaft und aromatischer Ingwerwurzel.",
      verzehr: "Genieße die dezente Schärfe mit fruchtiger Note zu jeder Tageszeit.",
      nutritionalTable: [
        { name: "Brennwert", value: "188 kJ / 44 kcal" },
        { name: "Fett", value: "< 0,1 g" },
        { name: "Kohlenhydrate", value: "10,4 g" },
        { name: "davon Zucker", value: "9,7 g" },
        { name: "Eiweiß", value: "0,2 g" }
      ],
      specs: [
        "Fruchtig-würziger Apfel-Ingwer",
        "100% Vegan & BPA-Frei",
        "Ohne Zusatz von Rohrzucker",
        "Reinste Zutaten"
      ]
    }
  }
];

export default function HomePage() {
  const { openProductDetail } = useCart();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const prevVariety = () => {
    setCarouselIndex((prev) => (prev - 1 + SEVEN_VARIETIES.length) % SEVEN_VARIETIES.length);
  };

  const nextVariety = () => {
    setCarouselIndex((prev) => (prev + 1) % SEVEN_VARIETIES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % SEVEN_VARIETIES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const currentVariety = SEVEN_VARIETIES[carouselIndex];

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
          description="CLEAN & PURE – Maximale Hydration mit molekularem Wasserstoff"
          primaryButton={{
            text: "Jetzt Shop entdecken",
            href: "/shop"
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

      {/* 2. DAS QUELLWASSER (inkl. Mineralstoff- & Trinkwasseranalyse) */}
      <div id="quelle" data-webild-section="WaterSourceMinerals" data-webild-section-id="WaterSourceMinerals-1" data-section="source">
        <section className="py-20 px-6 bg-white font-sans text-[#0A1C3A] border-b border-slate-300">
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

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
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
                      <td className="py-3.5 px-6 text-slate-600">0.05 mg/L</td>
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

      {/* 3. HYDRATION IM ALLTAG */}
      <div id="hydration" data-webild-section="HydrationAlltag" data-webild-section-id="HydrationAlltag-1" data-section="hydration">
        <section className="py-20 px-6 bg-[#f8fafc] text-[#0A1C3A] font-sans border-b border-slate-300">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-white px-4 py-1.5 rounded-full inline-block border border-slate-300 shadow-xs">
                Perfekt für jeden Moment
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A1C3A] uppercase tracking-tight">
                HYDRATION IM ALLTAG
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Ob beim Start in den Tag, im Fokus des Arbeitsalltags, beim schweißtreibenden Sport oder auf Reisen – FONTES VITEA schenkt dir reinste Energie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col justify-between hover:border-[#0A1C3A] hover:shadow-xl transition group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:bg-[#0A1C3A] group-hover:text-white transition duration-300 shadow-xs">
                    <Sun className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 block mb-1">Phase 01</span>
                    <h3 className="text-2xl font-black text-[#0A1C3A] uppercase">Morgens</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Frischer Kick für den Tag. Aktiviert sanft den Stoffwechsel und versorgt den Körper direkt nach dem Aufstehen mit zellulärer Hydration.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-[#0A1C3A]">
                  • ZELLULÄRE ENERGIE &amp; VITALITÄT
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col justify-between hover:border-[#0A1C3A] hover:shadow-xl transition group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center group-hover:bg-[#0A1C3A] group-hover:text-white transition duration-300 shadow-xs">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-600 block mb-1">Phase 02</span>
                    <h3 className="text-2xl font-black text-[#0A1C3A] uppercase">Arbeit</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mentale Klarheit ohne Koffeintief. Unterstützt die Konzentration und Leistungsfähigkeit bei langen Arbeitstagen und intensiven Meetings.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-[#0A1C3A]">
                  • KONSISTENTER FOKUS
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col justify-between hover:border-[#0A1C3A] hover:shadow-xl transition group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:bg-[#0A1C3A] group-hover:text-white transition duration-300 shadow-xs">
                    <Dumbbell className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 block mb-1">Phase 03</span>
                    <h3 className="text-2xl font-black text-[#0A1C3A] uppercase">Sport</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ideal vor oder nach dem Workout. Reduziert die Laktatansammlung im Blut und beschleunigt die muskuläre Regeneration nach Belastungen.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-[#0A1C3A]">
                  • SCHNELLE ERHOLUNG
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col justify-between hover:border-[#0A1C3A] hover:shadow-xl transition group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center group-hover:bg-[#0A1C3A] group-hover:text-white transition duration-300 shadow-xs">
                    <Plane className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 block mb-1">Phase 04</span>
                    <h3 className="text-2xl font-black text-[#0A1C3A] uppercase">Reisen</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Kompakt und robust in der BPA-freien 250-ml-Aluminiumdose. Der perfekte frische Begleiter im Flugzeug, Auto oder bei Ausflügen.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-[#0A1C3A]">
                  • MAXIMALE FLEXIBILITÄT
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 4. TECHNOLOGIE & INNOVATION */}
      <div id="technologie" data-webild-section="TechnologyInnovation" data-webild-section-id="TechnologyInnovation-1" data-section="tech">
        <section className="py-20 px-6 bg-white text-[#0A1C3A] font-sans border-b border-slate-300">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#f4f6f8] px-4 py-1.5 rounded-full inline-block border border-slate-300">
                Höchste Standards
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A1C3A] uppercase tracking-tight">
                TECHNOLOGIE &amp; INNOVATION
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
                Fortschrittlichste Anreicherungsmethoden und innovative Verpackungstechnologie garantieren höchste H2-Stabilität und absolute Reinheit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-300 shadow-md space-y-4 hover:border-[#0A1C3A] transition">
                <div className="w-14 h-14 rounded-2xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-md">
                  <Droplets className="w-7 h-7 text-sky-400" />
                </div>
                <h3 className="text-2xl font-black uppercase text-[#0A1C3A]">H₂-Konzentration</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mindestens <strong>2,8 mg/L</strong> gelöster molekularer Wasserstoff. Dank physikalischem Anreicherungsverfahren bleibt das H₂ selbst nach dem Öffnen über 6 Stunden lang stabil.
                </p>
                <div className="pt-3 text-xs font-bold text-[#0A1C3A] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Höchste Wirkdosis am Markt
                </div>
              </div>

              <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-300 shadow-md space-y-4 hover:border-[#0A1C3A] transition">
                <div className="w-14 h-14 rounded-2xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-md">
                  <Cpu className="w-7 h-7 text-sky-400" />
                </div>
                <h3 className="text-2xl font-black uppercase text-[#0A1C3A]">Aluminiumdosentechnologie</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Spezielle 250-ml-Aluminiumdosen bieten die absolut undurchlässige Barriere gegen das Entweichen des extrem kleinen H₂-Gases. Lichtgeschützt, unempfindlich und 100 % unendlich recycelbar.
                </p>
                <div className="pt-3 text-xs font-bold text-[#0A1C3A] flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" /> Optimaler Gasschutz &amp; Nachhaltig
                </div>
              </div>

              <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-300 shadow-md space-y-4 hover:border-[#0A1C3A] transition">
                <div className="w-14 h-14 rounded-2xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-7 h-7 text-sky-400" />
                </div>
                <h3 className="text-2xl font-black uppercase text-[#0A1C3A]">BPA-Freiheit</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Unsere Aluminiumdosen besitzen eine modernste Innenbeschichtung ohne Bisphenol A (BPA), ohne Phthalate und ohne Weichmacher. Für 100 % hormonell unbedenklichen und reinen Trinkgenuss.
                </p>
                <div className="pt-3 text-xs font-bold text-[#0A1C3A] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-600" /> Zero Schadstoffe &amp; Maximaler Schutz
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 5. VORTEILE IM VERGLEICH & BILDERSERIE (SPORTLER & BÜROLEUTE) */}
      <div id="vergleich" data-webild-section="ProductCompareTable" data-webild-section-id="ProductCompareTable-1" data-section="product">
        <section className="py-20 px-6 bg-[#f4f6f8] text-[#0A1C3A] font-sans border-b border-slate-300">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3">
              <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-white px-4 py-1.5 rounded-full inline-block border border-slate-300">
                Performance &amp; Zielgruppen
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A1C3A] uppercase tracking-tight">
                VORTEILE IM VERGLEICH &amp; EINSATZBEREICHE
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                Egal ob Spitzensportler, Alpinist, Segler oder Office-Professional – FONTES VITEA liefert zielgerichtete Hydration für jede Herausforderung.
              </p>
            </div>

            {/* Athlete & Professional Image Series Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* Skifahrer */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-300 shadow-lg flex flex-col justify-between hover:border-[#0A1C3A] transition group">
                <div className="relative h-44 overflow-hidden bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=compress&w=800&q=80"
                    alt="Skifahrer im Schnee"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C3A]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-sky-400" /> Skifahrer
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-extrabold uppercase text-[#0A1C3A]">Alpin- &amp; Wintersport</h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Bessere Ausdauer in großer Höhe &amp; schnelle Erholung bei intensiver Kältebelastung.
                  </p>
                </div>
              </div>

              {/* Tennisspieler */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-300 shadow-lg flex flex-col justify-between hover:border-[#0A1C3A] transition group">
                <div className="relative h-44 overflow-hidden bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=compress&w=800&q=80"
                    alt="Tennisspieler in Aktion"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C3A]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-emerald-400" /> Tennisspieler
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-extrabold uppercase text-[#0A1C3A]">Schnelle Reflexe</h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Reduziert Laktatansammlung bei langen Sätzen &amp; fördert präzise Bewegungsabläufe.
                  </p>
                </div>
              </div>

              {/* Golfspieler */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-300 shadow-lg flex flex-col justify-between hover:border-[#0A1C3A] transition group">
                <div className="relative h-44 overflow-hidden bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=compress&w=800&q=80"
                    alt="Golfspieler auf dem Grün"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C3A]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-amber-400" /> Golfspieler
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-extrabold uppercase text-[#0A1C3A]">Fokus &amp; Konstanz</h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Dauerhafte mentale Schärfe über 18 Löcher hinweg ohne Ermüdungsschübe.
                  </p>
                </div>
              </div>

              {/* Segler */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-300 shadow-lg flex flex-col justify-between hover:border-[#0A1C3A] transition group">
                <div className="relative h-44 overflow-hidden bg-slate-200">
                  <img
                    src="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795131470431-6qvssxou.png"
                    alt="Segler auf dem Meer"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C3A]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-sky-400" /> Segler
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-extrabold uppercase text-[#0A1C3A]">Wassersport &amp; Elemente</h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Optimaler Schutz vor oxidativem Stress durch Sonne, Wind &amp; Salzwasser.
                  </p>
                </div>
              </div>

              {/* Büroleute */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-300 shadow-lg flex flex-col justify-between hover:border-[#0A1C3A] transition group">
                <div className="relative h-44 overflow-hidden bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=compress&w=800&q=80"
                    alt="Büroleute im Meeting"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C3A]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-indigo-400" /> Büroleute
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-extrabold uppercase text-[#0A1C3A]">Office &amp; Business</h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Geistige Frische bei Bildschirmarbeit – ganz ohne Nachmittagstief.
                  </p>
                </div>
              </div>
            </div>

            {/* Existing Comparison Table */}
            <ProductCompareTable
              media="image"
              productImageSrc={CAN_IMAGE_URL}
              productImageAlt="FONTES VITEA H2 Dose"
              title="IM VERGLEICH"
              accent="VORTEILE"
              benefitsLabel="Merkmale"
              name="FONTES VITEA H2"
              otherLabel="Herkömmliches Wasser"
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

      {/* 6. VORSCHAU ZUR SEITE WISSEN & STUDIEN */}
      <div id="wissen-vorschau" data-webild-section="SciencePreview" data-webild-section-id="SciencePreview-1" data-section="science">
        <section className="py-20 px-6 bg-[#0A1C3A] text-white font-sans relative overflow-hidden">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <span className="text-sky-400 text-xs font-extrabold tracking-widest uppercase bg-sky-950/80 px-4 py-1.5 rounded-full inline-block border border-sky-800/60">
                Wissenschaftlich Fundiert
              </span>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
                WISSEN &amp; STUDIEN VORSCHAU
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Molekularer Wasserstoff (H2) ist in über 1.000 wissenschaftlichen Publikationen erforscht. Er wirkt als selektives Antioxidans, neutralisiert schädliche freie Radikale (.OH) und fördert die zelluläre ATP-Synthese.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-xl border border-white/10 text-xs">
                  <Check className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Reduzierung von Laktat im Muskelgewebe während Belastung</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-xl border border-white/10 text-xs">
                  <Check className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Selektive Neutralisation von Oxidativem Stress (ROS)</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-xl border border-white/10 text-xs">
                  <Check className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Direkte Bioverfügbarkeit &amp; rasche zelluläre Aufnahme</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/wissenschaft"
                  className="inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-[#0A1C3A] font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-xl transition transform hover:scale-105"
                >
                  <BookOpen className="w-4 h-4 text-[#0A1C3A]" />
                  <span>Alle Studien &amp; Videos entdecken</span>
                  <ArrowRight className="w-4 h-4 text-[#0A1C3A]" />
                </Link>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/15 space-y-6 text-center">
              <span className="text-xs text-sky-400 font-extrabold uppercase tracking-widest block">
                Forschungs-Highlight
              </span>
              <h3 className="text-2xl font-black uppercase text-white">
                Mitochondrien &amp; Zell-Langlebigkeit
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Erfahre in detaillierten Vorträgen von führenden Molekularbiologen wie Tyler LeBaron, wie Wasserstoffwasser die zelluläre Mitochondrienfunktion schützt und verjüngt.
              </p>

              <div className="pt-4 flex justify-center">
                <Link
                  to="/wissenschaft"
                  className="bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs uppercase px-6 py-3 rounded-xl tracking-wider transition shadow-lg inline-flex items-center gap-2"
                >
                  <span>Zur Wissenschafts-Übersicht</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 7. NEUES, HOCHWERTIGES, AUTOMATISCH ANIMIERTES PRODUKT-KARUSSELL AM ENDE DER STARTSEITE (ALLE 7 SORTEN) */}
      <div id="produkt-karussell" data-webild-section="ProductCarouselSeven" data-webild-section-id="ProductCarouselSeven-1" data-section="carousel">
        <section className="py-20 px-6 bg-gradient-to-b from-white via-slate-50 to-slate-100 text-[#0A1C3A] font-sans border-t border-slate-300">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-white px-4 py-1.5 rounded-full inline-block border border-slate-300 shadow-xs">
                Alle 7 Sorten entdecken
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A1C3A] uppercase tracking-tight">
                DIE FONTES VITEA SORTEN-VIELFALT
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                Erlebe unser gesamtes Sortiment im automatischen Produktkarussell. Klicke auf eine Sorte für Details oder besuche direkt unseren eigenständigen Shop.
              </p>
            </div>

            {/* Premium Carousel Box */}
            <div className="relative bg-white rounded-3xl border border-slate-300 p-6 sm:p-10 shadow-2xl overflow-hidden max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-blue-500/10 to-indigo-500/5 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-full flex items-center justify-between min-h-[380px] sm:min-h-[420px]">
                  <button
                    onClick={prevVariety}
                    className="absolute left-0 sm:left-2 z-20 bg-white/95 hover:bg-[#0A1C3A] text-[#0A1C3A] hover:text-white p-3.5 rounded-full shadow-xl border border-slate-300 transition transform hover:scale-110 active:scale-95"
                    aria-label="Vorherige Sorte"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <div className="w-full px-12 sm:px-16 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
                    <div className="shrink-0 relative group cursor-pointer" onClick={() => openProductDetail(currentVariety.detail)}>
                      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-600 to-[#0A1C3A] opacity-20 blur-xl rounded-full group-hover:opacity-40 transition duration-500" />
                      <img
                        src={currentVariety.image}
                        alt={currentVariety.name}
                        className="relative w-44 sm:w-56 h-56 sm:h-64 object-contain filter drop-shadow-2xl transition duration-300 transform group-hover:scale-105"
                      />
                    </div>

                    <div className="space-y-4 max-w-lg">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                        <span className="bg-[#0A1C3A] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-xs">
                          {currentVariety.badge}
                        </span>
                        <span className="bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
                          Sorte {carouselIndex + 1} von 7
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{currentVariety.category}</span>
                        <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#0A1C3A] tracking-tight">
                          {currentVariety.name}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {currentVariety.description}
                      </p>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                        <div>
                          <div className="text-2xl font-black text-[#0A1C3A]">{currentVariety.price}</div>
                          <span className="text-[10px] text-slate-500 font-bold block">{currentVariety.deposit}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openProductDetail(currentVariety.detail)}
                            className="bg-[#0A1C3A] hover:bg-[#12284c] text-white text-xs font-extrabold uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2"
                          >
                            <Info className="w-4 h-4 text-sky-400" />
                            <span>Details</span>
                          </button>
                          <Link
                            to="/shop"
                            className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Zum Shop</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={nextVariety}
                    className="absolute right-0 sm:right-2 z-20 bg-white/95 hover:bg-[#0A1C3A] text-[#0A1C3A] hover:text-white p-3.5 rounded-full shadow-xl border border-slate-300 transition transform hover:scale-110 active:scale-95"
                    aria-label="Nächste Sorte"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Grid of 7 Thumbnails */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8 pt-6 border-t border-slate-200 w-full">
                  {SEVEN_VARIETIES.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setCarouselIndex(idx)}
                      className={`p-2 rounded-xl border transition flex items-center gap-2 ${
                        carouselIndex === idx
                          ? "bg-[#0A1C3A] text-white border-[#0A1C3A] shadow-md scale-105"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <img src={v.image} alt={v.name} className="w-6 h-6 object-contain" />
                      <span className="text-[11px] font-extrabold truncate max-w-[100px]">{v.name.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
