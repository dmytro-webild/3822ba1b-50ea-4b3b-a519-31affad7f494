import { useState } from "react";
import { Link } from "react-router-dom";
import HeroWordmarkProduct from "@/components/sections/hero/HeroWordmarkProduct";
import ProductCompareTable from "@/components/sections/product/ProductCompareTable";
import TestimonialPhotoRail from "@/components/sections/testimonial/TestimonialPhotoRail";
import FaqCircleRows from "@/components/sections/faq/FaqCircleRows";
import ScrollToneBackdrop from "@/components/kit/ScrollToneBackdrop";
import LoaderWordmarkRise from "@/components/loaders/LoaderWordmarkRise";
import { useCart, type ProductDetailInfo } from "@/context/CartContext";
import {
  ShoppingBag,
  Info,
  Check,
  Play,
  Sun,
  Briefcase,
  Dumbbell,
  Plane,
  ArrowRight
} from "lucide-react";

const CAN_IMAGE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794865744193-o2e363kc.png";
const H2_12PACK_IMAGE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794876509264-c5xnooyr.png";
const H2_24PACK_IMAGE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794876509262-p9spm6ut.png";
const JUICE_IMAGE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862684-n9ac3wqc.png";
const BUNDLE_IMAGE_URL = "https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&w=800";

const JUICE_IMAGES: Record<string, string> = {
  "Blaubeere (Blueberry)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862684-n9ac3wqc.png",
  "Traube (Grape)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862677-cd34mdsd.png",
  "Himbeere (Raspberry)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862680-jc370nfv.png",
  "Ingwer (Ginger Tonic)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862681-6t2d7fbm.png",
  "Apfel Limette (Apple Lime)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794876969120-9lcoxonc.png",
  "Apfel Ingwer (Apple Ginger)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794876969120-9lcoxonc.png",
};

const H2_12_DETAILS: ProductDetailInfo = {
  title: "FONS VITAE H2 Wasserstoff-Wasser (12er-Pack)",
  subtitle: "12x 250 ml Aluminiumdosen (100 % BPA-Frei)",
  price: "39,64 € (12er-Pack)",
  depositInfo: "Inklusive 19 % MwSt. & 3,00 € Dosenpfand (0,25 € pro Dose)",
  imageSrc: H2_12PACK_IMAGE_URL,
  description:
    "Reinste Hydration angereichert mit mindestens 2,8 mg/L gelöstem molekularem Wasserstoff (H2). Geliefert im handlichen 12er-Pack in 100 % BPA-Freien Aluminiumdosen. Entwickelt für Biohacker, Athleten, Fitness-Enthusiasten und die Healthy Beauty Branche zur Förderung der Zellenergie.",
  verzehr: "Empfohlene tägliche Verzehrmenge: 1 bis 2 Dosen täglich. Ideal für: Morgens zum Start, bei der Arbeit, vor/nach dem Sport oder auf Reisen.",
  nutritionalTable: [
    { name: "Brennwert", value: "0 kJ / 0 kcal" },
    { name: "Fett", value: "0 g" },
    { name: "davon gesättigte Fettsäuren", value: "0 g" },
    { name: "Kohlenhydrate", value: "0 g" },
    { name: "davon Zucker", value: "0 g" },
    { name: "Eiweiß", value: "0 g" },
    { name: "Salz", value: "0 g" },
    { name: "Molekularer Wasserstoff (H2)", value: "≥ 2.8 mg/L" },
  ],
  specs: [
    "Mind. 2.8 mg/L gelöster Wasserstoff",
    "Original FONS VITAE 12er-Pack Verpackung",
    "12x 250 ml Aluminiumdosen – 100 % BPA-Frei",
    "0 kcal, 0 g Zucker, 100% BPA-Frei",
    "Laborgeprüfte Reinheit aus Deutschland",
    "Gezieltes Antioxidans für Zellschutz"
  ]
};

const H2_24_DETAILS: ProductDetailInfo = {
  title: "FONS VITAE H2 Wasserstoff-Wasser (24er-Pack)",
  subtitle: "24x 250 ml Aluminiumdosen (100 % BPA-Frei)",
  price: "79,28 € (24er-Pack)",
  depositInfo: "Inklusive 19 % MwSt. & 6,00 € Dosenpfand (0,25 € pro Dose)",
  imageSrc: H2_24PACK_IMAGE_URL,
  description:
    "Der Monatsvorrat für maximale Zellenergie und Vitalität. 24 Dosen FONS VITAE H2 Wasserstoff-Wasser (min. 2.8 mg/L gelöster molekularer Wasserstoff) in 100 % BPA-Freien Aluminiumdosen. Geliefert im stabilen 24er-Pack.",
  verzehr: "Empfohlene tägliche Verzehrmenge: 1 bis 2 Dosen täglich. Ideal für: Morgens zum Start, bei der Arbeit, vor/nach dem Sport oder auf Reisen.",
  nutritionalTable: [
    { name: "Brennwert", value: "0 kJ / 0 kcal" },
    { name: "Fett", value: "0 g" },
    { name: "davon gesättigte Fettsäuren", value: "0 g" },
    { name: "Kohlenhydrate", value: "0 g" },
    { name: "davon Zucker", value: "0 g" },
    { name: "Eiweiß", value: "0 g" },
    { name: "Salz", value: "0 g" },
    { name: "Molekularer Wasserstoff (H2)", value: "≥ 2.8 mg/L" },
  ],
  specs: [
    "Mind. 2.8 mg/L gelöster Wasserstoff",
    "Original FONS VITAE 24er-Pack Verpackung",
    "24x 250 ml Aluminiumdosen – 100 % BPA-Frei",
    "Optimaler Vorrat (1 bis 2 Dosen / Tag)",
    "0 kcal, 0 g Zucker, 100% BPA-Frei",
    "Laborgeprüfte Reinheit aus Deutschland"
  ]
};

const JUICE_DESCRIPTIONS: Record<string, string> = {
  "Blaubeere (Blueberry)": "100% natürlicher Fruchtsaft • Vegan • 100% BPA-Frei. Köstlicher Direktsaft aus sonnengereiften Blaubeeren in BPA-freien Alu-Dosen, reich an natürlichen Vitaminen & Antioxidantien. 100% pflanzlich.",
  "Traube (Grape)": "100% natürlicher Fruchtsaft • Vegan • 100% BPA-Frei. Edler Traubensaft aus besten sonnenverwöhnten Weintrauben in BPA-freien Alu-Dosen, natursüß und voll im Geschmack. 100% pflanzlich.",
  "Himbeere (Raspberry)": "100% natürlicher Fruchtsaft • Vegan • 100% BPA-Frei. Fruchtiges Himbeer-Erlebnis in BPA-freien Alu-Dosen voller natürlicher Frische und Vitalität. 100% pflanzlich.",
  "Ingwer (Ginger Tonic)": "100% natürlicher Fruchtsaft • Vegan • 100% BPA-Frei. Erfrischendes Ginger Tonic in BPA-freien Alu-Dosen mit feiner Ingwerschärfe und voller Belebung. 100% pflanzlich.",
  "Apfel Limette (Apple Lime)": "100% natürlicher Fruchtsaft • Vegan • 100% BPA-Frei. Spritzig-frische Kombination aus knackigem Apfel und feiner Limette in BPA-freien Alu-Dosen. 100% pflanzlich.",
  "Apfel Ingwer (Apple Ginger)": "100% natürlicher Fruchtsaft • Vegan • 100% BPA-Frei. Belebende Harmonie aus süßem Apfelsaft und würziger Ingwernote in BPA-freien Alu-Dosen. 100% pflanzlich.",
};

export default function HomePage() {
  const { addToCart, openProductDetail, openVideoModal } = useCart();

  // Juice selection state
  const [selectedJuiceFlavor, setSelectedJuiceFlavor] = useState("Blaubeere (Blueberry)");
  const [selectedJuicePack, setSelectedJuicePack] = useState<"6" | "12" | "24">("12");
  const [canCardSide, setCanCardSide] = useState<"front" | "back">("front");

  const juicePrices = {
    "6": { price: 15.92, count: 6, deposit: 1.50, label: "6er-Pack (€15,92)" },
    "12": { price: 31.84, count: 12, deposit: 3.00, label: "12er-Pack (€31,84)" },
    "24": { price: 63.68, count: 24, deposit: 6.00, label: "24er-Pack (€63,68)" }
  };

  const handleAddJuiceToCart = () => {
    const pack = juicePrices[selectedJuicePack];
    const image = JUICE_IMAGES[selectedJuiceFlavor] || JUICE_IMAGE_URL;
    addToCart({
      id: `juice-${selectedJuiceFlavor}-${selectedJuicePack}`,
      title: `FONS VITAE Fruchtsaft (${selectedJuiceFlavor}) - 100% Vegan`,
      flavor: selectedJuiceFlavor,
      packInfo: `${pack.count}er-Pack (100% Vegan, ${pack.count}x 250 ml)`,
      price: pack.price,
      cansCount: pack.count,
      deposit: pack.deposit,
      imageSrc: image,
    });
  };

  return (
    <>
      <ScrollToneBackdrop />

      <LoaderWordmarkRise
        brand="FONS VITAE"
        introDelay={1.4}
      />

      {/* Hero Section */}
      <div id="hero" data-webild-section="HeroWordmarkProduct" data-webild-section-id="HeroWordmarkProduct-1" data-section="hero">
        <HeroWordmarkProduct
          media="image"
          productImageSrc={CAN_IMAGE_URL}
          productImageAlt="FONS VITAE H2 Wasserstoff Dose"
          brand=""
          title="H2 - HYDROGEN WATER"
          description="CLEAN & PURE – Maximale Hydration mit molekularem Wasserstoff"
          primaryButton={{
            text: "Jetzt Shop entdecken",
            href: "#shop"
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
          marquee="CLEAN & PURE H2 WATER • FONS VITAE • DIE QUELLE DES LEBENS •"
        />
      </div>

      {/* CORE E-COMMERCE SHOP SECTION */}
      <section id="shop" className="py-20 px-6 max-w-7xl mx-auto font-sans">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#e2e8f0] px-4 py-1.5 rounded-full inline-block border border-slate-300">
            FONS VITAE Online-Shop
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0A1C3A] uppercase tracking-tight">
            Produkte & Hydration
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Molekulares H2 Wasserstoff-Wasser und nahrhafte Fruchtsäfte in 250-ml-Aluminiumdosen.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: H2 Wasser 12er-Pack */}
          <div className="bg-[#f4f6f8] rounded-2xl p-6 border border-slate-300 shadow-lg flex flex-col justify-between hover:border-[#0A1C3A] transition group">
            <div className="space-y-4">
              <div className="relative bg-white rounded-xl p-4 border border-slate-200 text-center">
                <span className="absolute top-3 left-3 bg-[#0A1C3A] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase z-10">
                  12er-Pack
                </span>
                <div className="absolute top-3 right-3 flex gap-1 z-10">
                  <button
                    onClick={() => setCanCardSide("front")}
                    className={`text-[9px] font-bold px-2 py-0.5 rounded transition ${canCardSide === "front" ? "bg-[#0A1C3A] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  >
                    Packung
                  </button>
                  <button
                    onClick={() => setCanCardSide("back")}
                    className={`text-[9px] font-bold px-2 py-0.5 rounded transition ${canCardSide === "back" ? "bg-[#0A1C3A] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  >
                    Dose
                  </button>
                </div>
                <img
                  src={canCardSide === "front" ? H2_12PACK_IMAGE_URL : CAN_IMAGE_URL}
                  alt="FONS VITAE H2 Wasser 12er-Pack Originalverpackung"
                  className="w-full h-44 object-contain mx-auto group-hover:scale-105 transition duration-300"
                />
              </div>
              <div>
                <span className="text-xs text-[#0A1C3A] font-extrabold uppercase">H2 Wasserstoff-Wasser</span>
                <h3 className="text-2xl font-black text-[#0A1C3A] uppercase tracking-tight">12er-Pack H2 Wasser</h3>
                <p className="text-xs text-slate-600 mt-1">12x 250 ml Alu-Dosen (100 % BPA-Frei)</p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A1C3A] shrink-0" />
                  <span>Min. 2.8 mg/L molekularer Wasserstoff</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A1C3A] shrink-0" />
                  <span>0 kcal, 0 g Zucker, BPA-Frei</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A1C3A] shrink-0" />
                  <span>inkl. 19 % MwSt. &amp; Pfand (3,00 €)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-300 space-y-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-2xl font-black text-[#0A1C3A]">39,64 €</span>
                  <span className="text-[10px] text-slate-500 block">inkl. 19 % MwSt. &amp; Pfand</span>
                </div>
                <button
                  onClick={() => openProductDetail(H2_12_DETAILS)}
                  className="text-xs text-[#0A1C3A] hover:underline font-bold flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" /> Details
                </button>
              </div>

              <button
                onClick={() =>
                  addToCart({
                    id: "h2-12pack",
                    title: "FONS VITAE H2 Wasser (12er-Pack)",
                    packInfo: "12er-Pack (12x 250 ml)",
                    price: 39.64,
                    cansCount: 12,
                    deposit: 3.00,
                    imageSrc: H2_12PACK_IMAGE_URL,
                  })
                }
                className="w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-md transition"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                In den Warenkorb (39,64 €)
              </button>
            </div>
          </div>

          {/* Card 2: H2 Wasser 24er-Pack */}
          <div className="bg-[#f4f6f8] rounded-2xl p-6 border-2 border-[#0A1C3A] shadow-xl flex flex-col justify-between group relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0A1C3A] text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider z-10">
              Empfehlung
            </div>
            <div className="space-y-4 pt-1">
              <div className="relative bg-white rounded-xl p-4 border border-slate-200 text-center">
                <span className="absolute top-3 left-3 bg-[#0A1C3A] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase z-10">
                  24er-Pack
                </span>
                <img
                  src={H2_24PACK_IMAGE_URL}
                  alt="FONS VITAE H2 Wasser 24er-Pack Originalverpackung"
                  className="w-full h-44 object-contain mx-auto group-hover:scale-105 transition duration-300"
                />
              </div>
              <div>
                <span className="text-xs text-[#0A1C3A] font-extrabold uppercase">Vorrat (1-2 Dosen/Tag)</span>
                <h3 className="text-2xl font-black text-[#0A1C3A] uppercase tracking-tight">24er-Pack H2 Wasser</h3>
                <p className="text-xs text-slate-600 mt-1">24x 250 ml Alu-Dosen (100 % BPA-Frei)</p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A1C3A] shrink-0" />
                  <span>Min. 2.8 mg/L molekularer Wasserstoff</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A1C3A] shrink-0" />
                  <span>0 kcal, 0 g Zucker, BPA-Frei</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A1C3A] shrink-0" />
                  <span>inkl. 19 % MwSt. &amp; Pfand (6,00 €)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-300 space-y-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-3xl font-black text-[#0A1C3A]">79,28 €</span>
                  <span className="text-[10px] text-slate-500 block">inkl. 19 % MwSt. &amp; Pfand</span>
                </div>
                <button
                  onClick={() => openProductDetail(H2_24_DETAILS)}
                  className="text-xs text-[#0A1C3A] hover:underline font-bold flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" /> Details
                </button>
              </div>

              <button
                onClick={() =>
                  addToCart({
                    id: "h2-24pack",
                    title: "FONS VITAE H2 Wasser (24er-Pack)",
                    packInfo: "24er-Pack (24x 250 ml)",
                    price: 79.28,
                    cansCount: 24,
                    deposit: 6.00,
                    imageSrc: H2_24PACK_IMAGE_URL,
                  })
                }
                className="w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-3 rounded-xl font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg transition"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                In den Warenkorb (79,28 €)
              </button>
            </div>
          </div>

          {/* Card 3: Fruchtsäfte (250 ml) */}
          <div className="bg-[#f4f6f8] rounded-2xl p-6 border border-slate-300 shadow-lg flex flex-col justify-between hover:border-[#0A1C3A] transition group">
            <div className="space-y-4">
              <div className="relative bg-white rounded-xl p-6 border border-slate-200 text-center">
                <div className="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
                  <span className="bg-[#0A1C3A] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                    100% natürlicher Fruchtsaft
                  </span>
                  <span className="bg-emerald-700 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                    Vegan
                  </span>
                  <span className="bg-cyan-700 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                    BPA-Frei
                  </span>
                </div>
                <img
                  src={JUICE_IMAGES[selectedJuiceFlavor] || JUICE_IMAGE_URL}
                  alt={`FONS VITAE ${selectedJuiceFlavor}`}
                  className="w-44 h-44 object-contain mx-auto group-hover:scale-105 transition duration-300"
                />
              </div>
              <div>
                <span className="text-xs text-[#0A1C3A] font-extrabold uppercase">Vital-Fruchtsäfte (250 ml) • 100% Vegan • BPA-Frei</span>
                <h3 className="text-2xl font-black text-[#0A1C3A] uppercase tracking-tight">Fruchtsäfte</h3>
                <p className="text-xs text-slate-600 mt-1">100% natürlicher Fruchtsaft, vegan, BPA-Frei &amp; ohne Zusatzstoffe</p>
              </div>

              {/* Flavor selector dropdown & Vegan description */}
              <div className="space-y-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
                <div>
                  <label className="block font-bold text-[#0A1C3A] mb-1">Geschmack wählen (100% natürlicher Fruchtsaft &amp; BPA-Frei):</label>
                  <select
                    value={selectedJuiceFlavor}
                    onChange={(e) => setSelectedJuiceFlavor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-semibold text-[#0A1C3A] focus:outline-none focus:ring-2 focus:ring-[#0A1C3A]"
                  >
                    <option value="Blaubeere (Blueberry)">🫐 Blaubeere (Blueberry)</option>
                    <option value="Traube (Grape)">🍇 Traube (Grape)</option>
                    <option value="Himbeere (Raspberry)">🍓 Himbeere (Raspberry)</option>
                    <option value="Ingwer (Ginger Tonic)">🫚 Ingwer (Ginger Tonic)</option>
                    <option value="Apfel Limette (Apple Lime)">🍏 Apfel Limette (Apple Lime)</option>
                    <option value="Apfel Ingwer (Apple Ginger)">🍎 Apfel Ingwer (Apple Ginger)</option>
                  </select>
                </div>

                {/* Active Flavor Vegan Description Box */}
                <div className="bg-emerald-50/70 border border-emerald-200 p-2.5 rounded-lg text-slate-700 leading-snug">
                  <span className="font-extrabold text-[#0A1C3A] block mb-0.5 text-[11px] uppercase tracking-wider">
                    {selectedJuiceFlavor} Details:
                  </span>
                  <span>{JUICE_DESCRIPTIONS[selectedJuiceFlavor]}</span>
                </div>

                {/* Pack size selector */}
                <div>
                  <label className="block font-bold text-[#0A1C3A] mb-1">Paketgröße:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["6", "12", "24"] as const).map((pk) => (
                      <button
                        key={pk}
                        type="button"
                        onClick={() => setSelectedJuicePack(pk)}
                        className={`py-1.5 rounded-lg font-bold text-xs border transition ${
                          selectedJuicePack === pk
                            ? "bg-[#0A1C3A] text-white border-[#0A1C3A]"
                            : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        {pk}er-Pack
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-300 space-y-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-2xl font-black text-[#0A1C3A]">
                    {juicePrices[selectedJuicePack].price.toFixed(2).replace('.', ',')} €
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    inkl. 19 % MwSt. &amp; Pfand ({juicePrices[selectedJuicePack].deposit.toFixed(2).replace('.', ',')} € Pfand)
                  </span>
                </div>
                <span className="text-xs text-slate-600 font-semibold">{selectedJuiceFlavor}</span>
              </div>

              <button
                onClick={handleAddJuiceToCart}
                className="w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-md transition"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                Säfte in den Warenkorb ({juicePrices[selectedJuicePack].price.toFixed(2).replace('.', ',')} €)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Unsere Quelle & Mineralien */}
      <div id="quelle" data-webild-section="WaterSourceMinerals" data-webild-section-id="WaterSourceMinerals-1" data-section="source">
        <section className="py-20 px-6 bg-white font-sans text-[#0A1C3A] border-b border-slate-300">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#f4f6f8] px-4 py-1.5 rounded-full inline-block border border-slate-300">
                Natürliche Reinheit
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A1C3A] uppercase tracking-tight">
                Unsere Quelle &amp; Mineralien
              </h2>
              <p className="text-slate-700 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-medium">
                Unser Quellwasser entspringt aus 136 Metern Tiefe und wird durch natürliche Gesteinsschichten gefiltert und tiefenmineralisiert. Diese geschützte Tiefenquelle garantiert höchste mikrobiologische Reinheit sowie ein ausgewogenes Mineralstoffprofil mit optimalem pH-Wert – die reine, unbelastete Basis für unser molekular angereichertes H2-Wasserstoffwasser.
              </p>
            </div>

            {/* Mineral Table with Marine Dark Blue Header on White Background */}
            <div className="bg-white rounded-2xl border border-slate-300 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0A1C3A] text-white text-xs sm:text-sm uppercase font-black tracking-wider">
                      <th className="py-4 px-6 border-b border-[#0A1C3A]">Parameter / Mineralstoff</th>
                      <th className="py-4 px-6 border-b border-[#0A1C3A]">Wert / Konzentration</th>
                      <th className="py-4 px-6 border-b border-[#0A1C3A]">Bedeutung &amp; Eigenschaften</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-800 font-semibold">
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-6 font-bold text-[#0A1C3A]">pH-Wert</td>
                      <td className="py-4 px-6 text-[#0A1C3A] font-bold">7,8 (Leicht basisch)</td>
                      <td className="py-4 px-6 text-slate-600">Unterstützt ein natürliches Säure-Basen-Gleichgewicht</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-6 font-bold text-[#0A1C3A]">Calcium (Ca²⁺)</td>
                      <td className="py-4 px-6 text-[#0A1C3A] font-bold">68 mg/L</td>
                      <td className="py-4 px-6 text-slate-600">Essentieller Mineralstoff für Knochen, Zähne und Muskelkontraktion</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-6 font-bold text-[#0A1C3A]">Magnesium (Mg²⁺)</td>
                      <td className="py-4 px-6 text-[#0A1C3A] font-bold">18 mg/L</td>
                      <td className="py-4 px-6 text-slate-600">Unterstützt den Energiestoffwechsel und das Nervensystem</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-6 font-bold text-[#0A1C3A]">Natrium (Na⁺)</td>
                      <td className="py-4 px-6 text-[#0A1C3A] font-bold">9,5 mg/L (Natriumarm)</td>
                      <td className="py-4 px-6 text-slate-600">Sehr geringer Natriumgehalt – ideal für täglichen Konsum</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-6 font-bold text-[#0A1C3A]">Kalium (K⁺)</td>
                      <td className="py-4 px-6 text-[#0A1C3A] font-bold">2,4 mg/L</td>
                      <td className="py-4 px-6 text-slate-600">Trägt zur Zellhydratation und normalen Muskelfunktion bei</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 px-6 font-bold text-[#0A1C3A]">Nitrat (NO₃⁻)</td>
                      <td className="py-4 px-6 text-[#0A1C3A] font-bold">&lt; 1,0 mg/L (Reinste Qualität)</td>
                      <td className="py-4 px-6 text-slate-600">Nahezu nitratfrei – garantiert frei von Umweltbelastungen</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* BUNDLES & COMBOS SECTION */}
      <div id="bundles" data-webild-section="PricingRingCards" data-webild-section-id="PricingRingCards-1" data-section="pricing">
        <section className="py-20 bg-[#f4f6f8] text-[#0A1C3A] font-sans border-y border-slate-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center space-y-3 mb-16">
              <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-white px-4 py-1.5 rounded-full inline-block border border-slate-300">
                Vorteilspakete
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A1C3A] uppercase tracking-tight">
                Bundles
              </h2>
              <p className="text-slate-600 text-sm max-w-xl mx-auto">
                Kombiniere molekulares H2 Wasserstoff-Wasser und Fruchtsäfte im Sparpaket.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
              {/* Bundle 2 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-300 flex flex-col justify-between hover:border-[#0A1C3A] transition shadow-md">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-[#0A1C3A] uppercase">12x Juice Mix</h3>
                  <div>
                    <div className="text-3xl font-black text-[#0A1C3A]">31,84 €</div>
                    <span className="text-[10px] text-slate-500 font-bold block">inkl. 19 % MwSt. &amp; Pfand</span>
                  </div>
                  <p className="text-xs text-slate-600">12 Dosen Fruchtsaft-Mix in 250 ml BPA-freien Alu-Dosen.</p>
                  <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-200 pt-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#0A1C3A]" /> 6 fruchtige Geschmacksrichtungen
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#0A1C3A]" /> Inkl. 3,00 € Dosenpfand
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#0A1C3A]" /> 100 % BPA-Frei &amp; Vegan
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      id: "bundle-12juices",
                      title: "Bundle 12x Juice Mix",
                      packInfo: "12 Dosen Mix",
                      price: 31.84,
                      cansCount: 12,
                      deposit: 3.00,
                      imageSrc: JUICE_IMAGE_URL,
                    })
                  }
                  className="mt-6 w-full bg-[#0A1C3A] text-white font-extrabold py-3 rounded-xl uppercase text-xs tracking-wider hover:bg-[#12284c] transition"
                >
                  Paket wählen (31,84 €)
                </button>
              </div>

              {/* Combo Bundle (Großes Kombi-Paket) */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#0A1C3A] flex flex-col justify-between shadow-xl relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0A1C3A] text-white text-[10px] font-black px-4 py-0.5 rounded-full uppercase tracking-wider">
                  Großes Kombi-Paket
                </div>
                <div className="space-y-4 pt-2">
                  <h3 className="text-2xl font-black text-[#0A1C3A] uppercase">Großes Kombi-Paket</h3>
                  <div>
                    <div className="text-4xl font-black text-[#0A1C3A]">142,96 €</div>
                    <span className="text-[10px] text-slate-500 font-bold block">inkl. 19 % MwSt. &amp; Pfand</span>
                  </div>
                  <p className="text-xs text-slate-600">24x H2 Wasser + 24x Juice Mix (Insgesamt 48 Dosen)</p>
                  <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-200 pt-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#0A1C3A]" /> 24x H2 Wasser (Min. 2.8 mg/L H2)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#0A1C3A]" /> 24x Fruchtsäfte Mix
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#0A1C3A]" /> Inkl. 12,00 € Dosenpfand &amp; 100 % BPA-Frei
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      id: "bundle-combo-48",
                      title: "Großes Kombi-Paket (24x H2 Water + 24x Juice Mix)",
                      packInfo: "24x H2 Water + 24x Juice Mix",
                      price: 142.96,
                      cansCount: 48,
                      deposit: 12.00,
                      imageSrc: BUNDLE_IMAGE_URL,
                    })
                  }
                  className="mt-6 w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white font-black py-3.5 rounded-xl uppercase text-xs tracking-wider shadow-lg transition"
                >
                  Kombi-Paket kaufen (142,96 €)
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Product Compare Section */}
      <div id="product" data-webild-section="ProductCompareTable" data-webild-section-id="ProductCompareTable-1" data-section="product">
        <ProductCompareTable
          media="image"
          productImageSrc={CAN_IMAGE_URL}
          productImageAlt="FONS VITAE H2 Dose"
          title="Vergleich"
          accent="Vorteile"
          benefitsLabel="Merkmale"
          name="FONS VITAE H2"
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

      {/* ABOUT US (ÜBER UNS) PHILOSOPHICAL SECTION */}
      <section id="about" className="py-24 bg-[#f4f6f8] text-[#0A1C3A] font-sans border-t border-slate-300">
        <div className="max-w-5xl mx-auto px-6 space-y-10 text-center">
          <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-white px-4 py-1.5 rounded-full inline-block border border-slate-300 shadow-sm">
            Über uns
          </span>
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tight text-[#0A1C3A]">
            FONS VITAE – Die Quelle des Lebens
          </h2>
          <div className="w-24 h-1 bg-[#0A1C3A] mx-auto rounded-full" />

          <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-slate-800 max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg text-left sm:text-center">
            „FONS VITAE – Die Quelle des Lebens. Unser Name ist unser Auftrag: Wir glauben, dass wahre Gesundheit bei der Quelle beginnt. Inspiriert von der jahrhundertealten philosophischen Idee der 'Lebensquelle' verbinden wir dieses tiefe Verständnis mit modernster Wissenschaft. Unsere Philosophie basiert auf drei Säulen: Absolute Qualität, kompromisslose Transparenz und wissenschaftliche Fundierung. Jede Charge unseres molekularen Wasserstoffs wird streng geprüft. Wir bieten keine leeren Versprechen, sondern messbare Hydration auf zellulärer Ebene – für deine Energie, deinen Zellschutz und deine Vitalität.“
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-2">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center font-black">
                01
              </div>
              <h3 className="text-lg font-black text-[#0A1C3A] uppercase">Absolute Qualität</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reinstes Wasserstoff-Wasser in BPA-freien, 100% nachhaltigen Aluminiumdosen für maximale Haltbarkeit des gelösten H2-Gases.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center font-black">
                02
              </div>
              <h3 className="text-lg font-black text-[#0A1C3A] uppercase">Kompromisslose Transparenz</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vollständige Deklaration aller Nährwerte. 0 kcal, 0 g Zucker, 0 künstliche Zusatzstoffe. Dosenpfand transparent ausgewiesen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center font-black">
                03
              </div>
              <h3 className="text-lg font-black text-[#0A1C3A] uppercase">Wissenschaftliche Fundierung</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Basierend auf aktuellen Studien zur Wirkung von gelöstem Wasserstoff auf Mitochondrien, Laktatabbau und Zellschutz.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              to="/studien"
              className="inline-flex items-center gap-2 bg-[#0A1C3A] hover:bg-[#12284c] text-white px-8 py-4 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg transition transform hover:scale-105"
            >
              Zu den wissenschaftlichen Studien <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SCIENCE & NEWS (STUDIEN & NEWS) SECTION */}
      <section id="science" className="py-24 bg-white text-[#0A1C3A] font-sans border-t border-slate-300">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#f4f6f8] px-4 py-1.5 rounded-full inline-block border border-slate-300">
              Wissenschaft & News
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0A1C3A] uppercase tracking-tight">
              Studien & News
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Aktuelle Vorträge und klinische Berichte über die Wirkung von molekularem Wasserstoff auf Zellgesundheit, Langlebigkeit und Regeneration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Video 1 */}
            <div className="bg-[#f4f6f8] rounded-2xl border border-slate-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <div className="space-y-4 p-5">
                <div
                  onClick={() => openVideoModal("https://www.youtube-nocookie.com/embed/SDZtVonFPXM")}
                  className="relative aspect-video rounded-xl overflow-hidden bg-[#0A1C3A] cursor-pointer group"
                >
                  <img
                    src="https://img.youtube.com/vi/SDZtVonFPXM/hqdefault.jpg"
                    alt="Tyler LeBaron Wasserstoffwasser"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#0A1C3A] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition border border-white/20">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0A1C3A] bg-white px-2.5 py-1 rounded-md inline-block border border-slate-200">
                  Wissenschaft & Langlebigkeit
                </span>

                <h3 className="text-sm font-extrabold text-[#0A1C3A] leading-snug">
                  Tyler LeBaron: Wasserstoffwasser, Mitochondriengesundheit, selektive Antioxidantien und Langlebigkeit
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Vortrag von Molekularbiologe Tyler LeBaron über die molekulare Wirkungsweise von H2 im menschlichen Organismus.
                </p>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => openVideoModal("https://www.youtube-nocookie.com/embed/SDZtVonFPXM")}
                  className="w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Video ansehen
                </button>
              </div>
            </div>

            {/* Video 2 */}
            <div className="bg-[#f4f6f8] rounded-2xl border border-slate-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <div className="space-y-4 p-5">
                <div
                  onClick={() => openVideoModal("https://www.youtube-nocookie.com/embed/uvZgOupWwzg")}
                  className="relative aspect-video rounded-xl overflow-hidden bg-[#0A1C3A] cursor-pointer group"
                >
                  <img
                    src="https://img.youtube.com/vi/uvZgOupWwzg/hqdefault.jpg"
                    alt="Erfahrungsbericht Demenz Alzheimer H2 Japan"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#0A1C3A] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition border border-white/20">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0A1C3A] bg-white px-2.5 py-1 rounded-md inline-block border border-slate-200">
                  Zellschutz & Medizin
                </span>

                <h3 className="text-sm font-extrabold text-[#0A1C3A] leading-snug">
                  Erfahrungsbericht zu Demenz und Alzheimer: H2-Wasserstoff aus Japan
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Klinische Erkenntnisse und Erfahrungsberichte aus japanischen Forschungszentren zum Einsatz von molekularem Wasserstoff.
                </p>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => openVideoModal("https://www.youtube-nocookie.com/embed/uvZgOupWwzg")}
                  className="w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Video ansehen
                </button>
              </div>
            </div>

            {/* Video 3 */}
            <div className="bg-[#f4f6f8] rounded-2xl border border-slate-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <div className="space-y-4 p-5">
                <div
                  onClick={() => openVideoModal("https://www.youtube-nocookie.com/embed/-2Go-J4V3o0")}
                  className="relative aspect-video rounded-xl overflow-hidden bg-[#0A1C3A] cursor-pointer group"
                >
                  <img
                    src="https://img.youtube.com/vi/-2Go-J4V3o0/hqdefault.jpg"
                    alt="Die Wissenschaft Vorteile von molekularem Wasserstoffwasser"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#0A1C3A] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition border border-white/20">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0A1C3A] bg-white px-2.5 py-1 rounded-md inline-block border border-slate-200">
                  Zell-Hydration & Vitalität
                </span>

                <h3 className="text-sm font-extrabold text-[#0A1C3A] leading-snug">
                  Die Wissenschaft + Vorteile von molekularem Wasserstoffwasser (Heiliger Wasserstoff)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Umfassende wissenschaftliche Zusammenfassung der Vorteile von gelöstem Wasserstoffwasser für Zellgesundheit und Regeneration.
                </p>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => openVideoModal("https://www.youtube-nocookie.com/embed/-2Go-J4V3o0")}
                  className="w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Video ansehen
                </button>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/studien"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A1C3A] bg-[#f4f6f8] hover:bg-slate-200 px-6 py-3 rounded-xl border border-slate-300 transition"
            >
              Alle Studien & Forschungsdetails ansehen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* USE CASES SECTION */}
      <section id="usecases" className="py-24 bg-[#f4f6f8] text-[#0A1C3A] font-sans border-t border-slate-300">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-white px-4 py-1.5 rounded-full inline-block border border-slate-300">
              Einsatzbereiche
            </span>
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0A1C3A]">
              Anwendung im Alltag
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Empfohlene tägliche Verzehrmenge: 1 bis 2 Dosen täglich. Ideal für: Morgens zum Start, bei der Arbeit, vor/nach dem Sport oder auf Reisen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase text-[#0A1C3A]">Morning (Morgens)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Erste Dose nach dem Aufstehen zur Aktivierung des Zellstoffwechsels und sofortigen Rehydrierung.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase text-[#0A1C3A]">Work (Arbeit & Fokus)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Geistige Frische und Konzentration bei hoher mentaler Beanspruchung im Büro ohne Nachmittagstief.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase text-[#0A1C3A]">Exercise & Sports</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vor und während dem Training für verbesserte Sauerstoffaufnahme und verminderte Übersäuerung.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase text-[#0A1C3A]">Travel (Reise)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Schutz vor Reisestress, Luftfeuchtigkeitsabfall in Flugzeugen und Jetlag in handlicher 250-ml-Dose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS & TESTIMONIALS */}
      <div id="testimonial" data-webild-section="TestimonialPhotoRail" data-webild-section-id="TestimonialPhotoRail-1" data-section="testimonial">
        <TestimonialPhotoRail
          media="image"
          title="Bewertungen"
          label="Erfahrungen"
          imageSrc="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794876824895-o64qlmg5.png"
          items={[
            {
              title: "Schnelle Erholung",
              quote: "Seit ich H2-Wasser vor harten Einheiten trinke, erhole ich mich spürbar schneller.",
              name: "Maximilian Fischer",
              badge: "Athlet"
            },
            {
              title: "Geistige Klarheit",
              quote: "Kein Nachmittagstief mehr im Büro. Reinstes Wasserstoff-Wasser für Fokus.",
              name: "Nina Richter",
              badge: "Biohackerin"
            },
            {
              title: "Healthy Beauty",
              quote: "Ich trinke mindestens 3 Dosen täglich. Die Haut wirkt viel strahlender.",
              name: "Stefan Wolf",
              badge: "Fitness-Coach"
            },
            {
              title: "Höchste Qualität",
              quote: "Endlich echtes H2 Wasser in unkomplizierten BPA-freien Dosen.",
              name: "Anna Wagner",
              badge: "Sportlerin"
            }
          ]}
          model={{
            rx: 25,
            ry: 520,
            rz: 0,
            scale: 0.75,
            sm: {
              scale: 0.85
            }
          }}
        />
      </div>

      {/* FAQ SECTION */}
      <div id="faq" data-webild-section="FaqCircleRows" data-webild-section-id="FaqCircleRows-1" data-section="faq">
        <FaqCircleRows
          media="image"
          title="Häufige Fragen"
          accent="Informationen"
          items={[
            {
              title: "Was ist H2 Wasserstoff-Wasser?",
              description: "FONS VITAE H2 Wasser ist mit mindestens 2,8 mg/L molekular gelöstem Wasserstoff (H2) angereichert. Es dient als selektives Antioxidans und unterstützt zelluläre Prozesse."
            },
            {
              title: "Sind die Aluminiumdosen BPA-frei?",
              description: "Ja, alle 250-ml-Aluminiumdosen von FONS VITAE sind 100 % BPA-frei und nachhaltig recycelbar."
            },
            {
              title: "Wie viele Dosen sollte man täglich trinken?",
              description: "Empfohlene tägliche Verzehrmenge: 1 bis 2 Dosen täglich. Ideal für: Morgens zum Start, bei der Arbeit, vor/nach dem Sport oder auf Reisen."
            },
            {
              title: "Ist das Dosenpfand enthalten?",
              description: "Ja! Bei allen Bestellungen wird das gesetzliche Dosenpfand in Höhe von 0,25 € pro Dose transparent ausgewiesen und eingerechnet."
            },
            {
              title: "Welche Nährwerte bietet das H2 Wasser?",
              description: "0 kcal, 0 g Fett, 0 g Zucker, 0 g Kohlenhydrate. Frei von künstlichen Zusatzstoffen."
            },
            {
              title: "Wie lange dauert der Versand?",
              description: "Der Versand erfolgt direkt aus Deutschland und dauert standardmäßig 1-2 Werktage."
            }
          ]}
          model={{
            rz: 10,
            ry: 700,
            rx: -6,
            scale: 0.56,
            sm: {
              scale: 0.62
            }
          }}
        />
      </div>

    </>
  );
}