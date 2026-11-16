import { useState } from "react";
import HeroWordmarkProduct from "@/components/sections/hero/HeroWordmarkProduct";
import ProductCompareTable from "@/components/sections/product/ProductCompareTable";
import TestimonialPhotoRail from "@/components/sections/testimonial/TestimonialPhotoRail";
import FaqCircleRows from "@/components/sections/faq/FaqCircleRows";
import ScrollToneBackdrop from "@/components/kit/ScrollToneBackdrop";
import ModelStage from "@/components/kit/ModelStage";
import FonsVitaeCan from "@/components/models/FonsVitaeCan";
import LoaderWordmarkRise from "@/components/loaders/LoaderWordmarkRise";
import { useCart, type ProductDetailInfo } from "@/context/CartContext";
import {
  Zap,
  ShieldCheck,
  Droplets,
  ShoppingBag,
  Info,
  Check,
  Play,
  Sun,
  Briefcase,
  Dumbbell,
  Plane,
  Mail,
  Phone,
  MapPin,
  Users,
  Instagram,
  Youtube
} from "lucide-react";

const CAN_IMAGE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794859388392-vrlwghmp.png";

const JUICE_IMAGE_URL = "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&w=800";
const BUNDLE_IMAGE_URL = "https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&w=800";

const H2_DETAILS: ProductDetailInfo = {
  title: "FONS VITAE H2 Wasserstoff-Wasser",
  subtitle: "250 ml Aluminiumdose (BPA-frei)",
  price: "33,00 € (12er-Pack)",
  depositInfo: "Inklusive 0,25 € gesetzlichem Dosenpfand pro Dose",
  imageSrc: CAN_IMAGE_URL,
  description:
    "Reinste Hydration angereichert mit mindestens 2,8 mg/L gelöstem molekularem Wasserstoff (H2). Entwickelt für Biohacker, Athleten und gesundheitsbewusste Menschen zur Förderung der ATP-Zellenergie und als gezieltes Antioxidans.",
  verzehr: "Wir empfehlen mindestens 3 Dosen täglich zu trinken, vorzugsweise morgens nach dem Aufstehen, vor dem Workout oder bei hoher geistiger Beanspruchung.",
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
    "Mindestens 2,8 mg/L gelöster Wasserstoff",
    "100% BPA-freie recyclebare Aluminiumdose",
    "0 kcal, 0 g Zucker, 100% Vegan",
    "Laborgeprüfte Reinheit aus Deutschland",
    "Gezieltes Antioxidans für Zellschutz",
    "Dosenpfand bereits komplett enthalten"
  ]
};

export default function HomePage() {
  const { addToCart, openProductDetail, openVideoModal } = useCart();

  // Juice selection state
  const [selectedJuiceFlavor, setSelectedJuiceFlavor] = useState("Heidelbeere");
  const [selectedJuicePack, setSelectedJuicePack] = useState<"6" | "12" | "24">("12");

  const juicePrices = {
    "6": { price: 11.10, count: 6, deposit: 1.50, label: "6er-Pack (€11,10)" },
    "12": { price: 22.20, count: 12, deposit: 3.00, label: "12er-Pack (€22,20)" },
    "24": { price: 44.40, count: 24, deposit: 6.00, label: "24er-Pack (€44,40)" }
  };

  const handleAddJuiceToCart = () => {
    const pack = juicePrices[selectedJuicePack];
    addToCart({
      id: `juice-${selectedJuiceFlavor}-${selectedJuicePack}`,
      title: `FONS VITAE Bio Fruchtsaft (${selectedJuiceFlavor})`,
      flavor: selectedJuiceFlavor,
      packInfo: `${pack.count}er-Pack (${pack.count}x 250 ml)`,
      price: pack.price,
      cansCount: pack.count,
      deposit: pack.deposit,
      imageSrc: JUICE_IMAGE_URL,
    });
  };

  return (
    <>
      <ScrollToneBackdrop />

      {/* 3D Model Stage with slowly rotating 250ml metallic silver can and winding water stream */}
      <ModelStage
        model={<FonsVitaeCan />}
        scale={1.05}
      />

      <LoaderWordmarkRise
        brand="FONS VITAE"
        introDelay={1.4}
      />

      {/* Hero Section */}
      <div id="hero" data-webild-section="HeroWordmarkProduct" data-webild-section-id="HeroWordmarkProduct-1" data-section="hero">
        <HeroWordmarkProduct
          media="model"
          productImageSrc={CAN_IMAGE_URL}
          productImageAlt="FONS VITAE H2 Hydrogen Water 250ml Dose"
          brand="FONS VITAE"
          title="CLEAN & PURE"
          description="Maximale Hydration mit molekularem Wasserstoff. Das Premium-H2-Wasser für Athleten, Biohacker, Fitness-Begeisterte und die Healthy Beauty Branche."
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
              title: "BPA-Frei & Vegan"
            }
          ]}
          introDelay={1.4}
          marquee="CLEAN & PURE H2 WATER • FONS VITAE • DIE QUELLE DES LEBENS •"
          model={[
            {
              at: 0,
              rz: -12,
              ry: -25,
              rx: 6,
              scale: 1,
              sm: {
                scale: 0.85
              }
            },
            {
              at: 0.6,
              free: 1,
              rz: -4,
              ry: 55,
              rx: 4,
              scale: 0.75,
              sm: {
                free: 0,
                scale: 0.85
              }
            }
          ]}
        />
      </div>

      {/* USP Bar */}
      <section className="bg-[#0a192f] text-white py-8 border-y border-slate-700 font-sans shadow-inner">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <Zap className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-extrabold text-base tracking-wide text-white uppercase">Energie</h3>
              <p className="text-xs text-slate-300">Unterstützt die zelluläre ATP-Produktion</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-extrabold text-base tracking-wide text-white uppercase">Zellschutz</h3>
              <p className="text-xs text-slate-300">Selektives Antioxidans gegen freien Radikalen-Stress</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <Droplets className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-extrabold text-base tracking-wide text-white uppercase">Vitalität</h3>
              <p className="text-xs text-slate-300">Schnelle Muskel-Regeneration & Hydration</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE E-COMMERCE SHOP SECTION */}
      <section id="shop" className="py-20 px-6 max-w-7xl mx-auto font-sans">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[#c59b27] text-xs font-extrabold tracking-widest uppercase bg-[#0a192f] px-4 py-1.5 rounded-full inline-block">
            FONS VITAE Online-Shop
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-[#081427] uppercase tracking-tight">
            Wähle Deine Hydration
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Entdecke unser molekulares H2 Wasserstoff-Wasser und vitaminschonende Fruchtsäfte in BPA-freien 250-ml-Dosen.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: H2 Wasser 12er-Pack */}
          <div className="bg-[#e5e9ec] rounded-2xl p-6 border border-slate-300 shadow-xl flex flex-col justify-between hover:border-[#c59b27] transition group">
            <div className="space-y-4">
              <div className="relative bg-white rounded-xl p-6 border border-slate-200 text-center">
                <span className="absolute top-3 left-3 bg-[#0a192f] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                  Bestseller
                </span>
                <img
                  src={CAN_IMAGE_URL}
                  alt="FONS VITAE H2 Wasser 12er-Pack"
                  className="w-40 h-40 object-contain mx-auto group-hover:scale-105 transition duration-300"
                />
              </div>
              <div>
                <span className="text-xs text-[#c59b27] font-extrabold uppercase">H2 Wasserstoff-Wasser</span>
                <h3 className="text-2xl font-black text-[#081427] uppercase tracking-tight">12er-Pack H2 Wasser</h3>
                <p className="text-xs text-slate-600 mt-1">12x 250 ml Alu-Dosen (BPA-frei)</p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mind. 2,8 mg/L molekularer Wasserstoff</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>0 kcal, 0 g Zucker, 100% Vegan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Inklusive 3,00 € gesetzlichem Dosenpfand</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-300 space-y-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-2xl font-black text-[#0a192f]">33,00 €</span>
                  <span className="text-[10px] text-slate-500 block">inkl. 3,00 € Pfand</span>
                </div>
                <button
                  onClick={() => openProductDetail(H2_DETAILS)}
                  className="text-xs text-[#0a192f] hover:text-[#c59b27] font-bold flex items-center gap-1 underline underline-offset-2"
                >
                  <Info className="w-3.5 h-3.5" /> Details
                </button>
              </div>

              <button
                onClick={() =>
                  addToCart({
                    id: "h2-12pack",
                    title: "FONS VITAE H2 Wasser",
                    packInfo: "12er-Pack (12x 250 ml)",
                    price: 33.00,
                    cansCount: 12,
                    deposit: 3.00,
                    imageSrc: CAN_IMAGE_URL,
                  })
                }
                className="w-full bg-[#0a192f] hover:bg-[#162a4d] text-white py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-md transition"
              >
                <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                In den Warenkorb (33,00 €)
              </button>
            </div>
          </div>

          {/* Card 2: H2 Wasser 24er-Pack */}
          <div className="bg-[#0a192f] text-white rounded-2xl p-6 border border-slate-700 shadow-2xl flex flex-col justify-between hover:border-[#d4af37] transition group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#d4af37] text-[#081427] text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Empfehlung Biohacker
            </div>
            <div className="space-y-4">
              <div className="relative bg-slate-800/80 rounded-xl p-6 border border-slate-700 text-center">
                <img
                  src={CAN_IMAGE_URL}
                  alt="FONS VITAE H2 Wasser 24er-Pack"
                  className="w-40 h-40 object-contain mx-auto group-hover:scale-105 transition duration-300"
                />
              </div>
              <div>
                <span className="text-xs text-[#d4af37] font-extrabold uppercase">Monatsvorrat (3 Dosen/Tag)</span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">24er-Pack H2 Wasser</h3>
                <p className="text-xs text-slate-300 mt-1">24x 250 ml Alu-Dosen (BPA-frei)</p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-200 bg-slate-800/70 p-3.5 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Mind. 2,8 mg/L molekularer Wasserstoff</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Optimale Versorgung für 8 Tage (3/Tag)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Inklusive 6,00 € gesetzlichem Dosenpfand</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-3xl font-black text-white">66,00 €</span>
                  <span className="text-[10px] text-slate-400 block">inkl. 6,00 € Pfand</span>
                </div>
                <button
                  onClick={() => openProductDetail(H2_DETAILS)}
                  className="text-xs text-[#d4af37] hover:text-white font-bold flex items-center gap-1 underline underline-offset-2"
                >
                  <Info className="w-3.5 h-3.5" /> Details
                </button>
              </div>

              <button
                onClick={() =>
                  addToCart({
                    id: "h2-24pack",
                    title: "FONS VITAE H2 Wasser",
                    packInfo: "24er-Pack (24x 250 ml)",
                    price: 66.00,
                    cansCount: 24,
                    deposit: 6.00,
                    imageSrc: CAN_IMAGE_URL,
                  })
                }
                className="w-full bg-[#d4af37] hover:bg-[#c59b27] text-[#081427] py-3 rounded-xl font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg transition"
              >
                <ShoppingBag className="w-4 h-4 text-[#081427]" />
                In den Warenkorb (66,00 €)
              </button>
            </div>
          </div>

          {/* Card 3: Fruchtsäfte (250 ml) with Flavor & Pack Selector */}
          <div className="bg-[#e5e9ec] rounded-2xl p-6 border border-slate-300 shadow-xl flex flex-col justify-between hover:border-[#c59b27] transition group">
            <div className="space-y-4">
              <div className="relative bg-white rounded-xl p-6 border border-slate-200 text-center">
                <span className="absolute top-3 left-3 bg-[#c59b27] text-[#081427] text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                  6 Premium-Sorten
                </span>
                <img
                  src={JUICE_IMAGE_URL}
                  alt="FONS VITAE Fruchtsäfte"
                  className="w-40 h-40 object-cover rounded-lg mx-auto group-hover:scale-105 transition duration-300"
                />
              </div>
              <div>
                <span className="text-xs text-[#c59b27] font-extrabold uppercase">Vital-Fruchtsäfte (250 ml)</span>
                <h3 className="text-2xl font-black text-[#081427] uppercase tracking-tight">Biologische Säfte</h3>
                <p className="text-xs text-slate-600 mt-1">Vitamine & Antioxidantien aus echter Frucht</p>
              </div>

              {/* Flavor selector dropdown */}
              <div className="space-y-2 bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
                <div>
                  <label className="block font-bold text-[#081427] mb-1">Geschmacksrichtung wählen:</label>
                  <select
                    value={selectedJuiceFlavor}
                    onChange={(e) => setSelectedJuiceFlavor(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-300 rounded-lg p-2 font-semibold text-[#081427] focus:outline-none focus:ring-2 focus:ring-[#c59b27]"
                  >
                    <option value="Heidelbeere">🫐 Heidelbeere (Blueberry)</option>
                    <option value="Himbeere">🍓 Himbeere (Raspberry)</option>
                    <option value="Apfel-Limette">🍏 Apfel-Limette (Apple Lime)</option>
                    <option value="Apfel-Ingwer">🫚 Apfel-Ingwer (Apple Ginger)</option>
                    <option value="Traube">🍇 Traube (Grape)</option>
                    <option value="Kirsche">🍒 Kirsche (Cherry)</option>
                  </select>
                </div>

                {/* Pack size selector buttons */}
                <div>
                  <label className="block font-bold text-[#081427] mb-1">Paketgröße:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["6", "12", "24"] as const).map((pk) => (
                      <button
                        key={pk}
                        type="button"
                        onClick={() => setSelectedJuicePack(pk)}
                        className={`py-1.5 rounded-lg font-bold text-xs border transition ${
                          selectedJuicePack === pk
                            ? "bg-[#0a192f] text-white border-[#0a192f]"
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
                  <span className="text-2xl font-black text-[#0a192f]">
                    {juicePrices[selectedJuicePack].price.toFixed(2)} €
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    inkl. {juicePrices[selectedJuicePack].deposit.toFixed(2)} € Pfand
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-semibold">{selectedJuiceFlavor}</span>
              </div>

              <button
                onClick={handleAddJuiceToCart}
                className="w-full bg-[#0a192f] hover:bg-[#162a4d] text-white py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-md transition"
              >
                <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                Säfte in den Warenkorb ({juicePrices[selectedJuicePack].price.toFixed(2)} €)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BUNDLES & COMBOS SECTION */}
      <div id="bundles" data-webild-section="PricingRingCards" data-webild-section-id="PricingRingCards-1" data-section="pricing">
        <section className="py-20 bg-[#0a192f] text-white font-sans border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center space-y-3 mb-16">
              <span className="text-[#d4af37] text-xs font-extrabold tracking-widest uppercase bg-slate-800 px-4 py-1.5 rounded-full inline-block">
                Sparen mit Vorratspaketen
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
                Vorteils-Bundles
              </h2>
              <p className="text-slate-300 text-sm max-w-xl mx-auto">
                Die perfekte Kombination aus purem H2 Wasserstoff-Wasser und nahrhaften Fruchtsäften.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Bundle 1 */}
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between hover:border-[#d4af37] transition">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white uppercase">24x H2 Wasser</h3>
                  <div className="text-3xl font-black text-[#d4af37]">66,00 €</div>
                  <p className="text-xs text-slate-300">24 Dosen H2 Wasserstoff-Wasser in 250 ml Dosen.</p>
                  <ul className="text-xs text-slate-300 space-y-2 border-t border-slate-700 pt-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#d4af37]" /> Mind. 2,8 mg/L gelöster Wasserstoff
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#d4af37]" /> Inkl. 6,00 € Dosenpfand
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#d4af37]" /> BPA-freie Alu-Dosen
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      id: "bundle-24h2",
                      title: "Bundle 24x H2 Wasser",
                      packInfo: "24 Dosen",
                      price: 66.00,
                      cansCount: 24,
                      deposit: 6.00,
                      imageSrc: CAN_IMAGE_URL,
                    })
                  }
                  className="mt-6 w-full bg-[#d4af37] text-[#081427] font-extrabold py-3 rounded-xl uppercase text-xs tracking-wider hover:bg-[#c59b27] transition"
                >
                  Paket wählen (66,00 €)
                </button>
              </div>

              {/* Bundle 2 */}
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between hover:border-[#d4af37] transition">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white uppercase">12x Säfte-Mix</h3>
                  <div className="text-3xl font-black text-[#d4af37]">22,20 €</div>
                  <p className="text-xs text-slate-300">12 Dosen gemischte Fruchtsäfte (Heidelbeere, Himbeere, etc.)</p>
                  <ul className="text-xs text-slate-300 space-y-2 border-t border-slate-700 pt-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#d4af37]" /> 6 leckere Geschmacksrichtungen
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#d4af37]" /> Inkl. 3,00 € Dosenpfand
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#d4af37]" /> 100% biologischer Genuss
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      id: "bundle-12juices",
                      title: "Bundle 12x Fruchtsäfte Mix",
                      packInfo: "12 Dosen Mix",
                      price: 22.20,
                      cansCount: 12,
                      deposit: 3.00,
                      imageSrc: JUICE_IMAGE_URL,
                    })
                  }
                  className="mt-6 w-full bg-[#d4af37] text-[#081427] font-extrabold py-3 rounded-xl uppercase text-xs tracking-wider hover:bg-[#c59b27] transition"
                >
                  Paket wählen (22,20 €)
                </button>
              </div>

              {/* Combo Bundle (Best Value) */}
              <div className="bg-gradient-to-b from-[#162a4d] to-[#0a192f] rounded-2xl p-6 border-2 border-[#d4af37] flex flex-col justify-between shadow-2xl relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#081427] text-[10px] font-black px-4 py-0.5 rounded-full uppercase tracking-wider">
                  Beliebtestes Kombi-Paket
                </div>
                <div className="space-y-4 pt-2">
                  <h3 className="text-2xl font-black text-white uppercase">Großes Kombi-Paket</h3>
                  <div className="text-4xl font-black text-[#d4af37]">110,40 €</div>
                  <p className="text-xs text-slate-200">24x H2 Wasser stoff-Wasser + 24x Säfte-Mix (Insgesamt 48 Dosen)</p>
                  <ul className="text-xs text-slate-200 space-y-2 border-t border-slate-700 pt-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#d4af37]" /> 24x H2 Wasser (2.8 mg/L H2)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#d4af37]" /> 24x Fruchtsäfte Mix
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#d4af37]" /> Inkl. 12,00 € Dosenpfand
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      id: "bundle-combo-48",
                      title: "Großes Kombi-Paket (48 Dosen)",
                      packInfo: "24x H2 Wasser + 24x Säfte-Mix",
                      price: 110.40,
                      cansCount: 48,
                      deposit: 12.00,
                      imageSrc: BUNDLE_IMAGE_URL,
                    })
                  }
                  className="mt-6 w-full bg-[#d4af37] hover:bg-[#c59b27] text-[#081427] font-black py-3.5 rounded-xl uppercase text-xs tracking-wider shadow-lg transition"
                >
                  Kombi-Paket kaufen (110,40 €)
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Product Compare Section */}
      <div id="product" data-webild-section="ProductCompareTable" data-webild-section-id="ProductCompareTable-1" data-section="product">
        <ProductCompareTable
          media="model"
          productImageSrc={CAN_IMAGE_URL}
          productImageAlt="FONS VITAE H2 Hydrogen Water 250ml Dose"
          title="Der Qualitäts-Vergleich."
          accent="Mehr für dich."
          benefitsLabel="Vorteile"
          name="FONS VITAE H2"
          otherLabel="Herkömmliches Wasser"
          items={[
            {
              title: "Mind. 2,8 mg/L molekular gelöster Wasserstoff",
              ours: true,
              other: false
            },
            {
              title: "Gezieltes Abfangen schädlicher Hydroxyl-Radikale",
              ours: true,
              other: false
            },
            {
              title: "0 kcal & 0 g Zucker & 0 Zusatzstoffe",
              ours: true,
              other: false
            },
            {
              title: "100% BPA-freie recyclebare Aluminiumdose",
              ours: true,
              other: false
            },
            {
              title: "100% vegan & laborgeprüfte Reinheit",
              ours: true,
              other: true
            },
            {
              title: "Unterstützung der zellulären Regeneration",
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
      <section id="about" className="py-24 bg-[#e5e9ec] text-[#081427] font-sans border-t border-slate-300">
        <div className="max-w-5xl mx-auto px-6 space-y-8 text-center">
          <span className="text-[#c59b27] text-xs font-extrabold tracking-widest uppercase bg-[#0a192f] px-4 py-1.5 rounded-full inline-block">
            Über Uns • Philosophie
          </span>
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tight text-[#0a192f]">
            FONS VITAE – Die Quelle des Lebens
          </h2>
          <div className="w-24 h-1 bg-[#c59b27] mx-auto rounded-full" />

          <blockquote className="text-lg lg:text-xl font-medium leading-relaxed italic text-slate-700 max-w-3xl mx-auto">
            „Wir wissen aus eigener Erfahrung, wie schwer es ist, wahre Qualität zu finden. Wasser ist nicht bloß ein Durstlöscher – es ist der elementare Träger aller biochemischen Prozesse in unseren Zellen.“
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-3">
              <h3 className="text-xl font-black text-[#0a192f] uppercase">Unsere Vision</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                FONS VITAE wurde gegründet, um Menschen mit den höchsten Ansprüchen an ihre körperliche und mentale Leistungsfähigkeit Zugang zu reinstem, wissenschaftlich fundiertem Wasserstoff-Wasser zu geben. Wir verbinden antike Erkenntnisse über Vitalität mit modernem Biohacking.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-3">
              <h3 className="text-xl font-black text-[#0a192f] uppercase">Reinheit & Verantwortung</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Jede 250-ml-Dose FONS VITAE steht für unkompromisslose Qualität: frei von BPA, frei von Mikroplastik und konserviert in recycelbarem Aluminium zur maximalen Erhaltung der flüchtigen H2-Moleküle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE & NEWS (STUDIEN & NEWS) SECTION */}
      <section id="science" className="py-24 bg-[#0a192f] text-white font-sans border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[#d4af37] text-xs font-extrabold tracking-widest uppercase bg-slate-800 px-4 py-1.5 rounded-full inline-block">
              Wissenschaft & Forschung
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              Studien & News
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Wissenschaftliche Einordnung von molekularem Wasserstoff in Sport, Zellschutz und Beauty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Sports */}
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs text-[#d4af37] font-bold uppercase tracking-wider">01. Leistungssport</span>
                <h3 className="text-xl font-bold uppercase text-white">Laktat-Reduktion & Ausdauer</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Studien zeigen, dass molekularer Wasserstoff die Übersäuerung im Muskelgewebe bremst und Erholungszeiten nach intensivsten Trainingseinheiten signifikant verkürzt.
                </p>
              </div>
              <button
                onClick={() => openVideoModal("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ")}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] hover:text-white transition pt-4"
              >
                <Play className="w-4 h-4 fill-current" /> Video von Sportmedizinern ansehen
              </button>
            </div>

            {/* Pillar 2: Anti-inflammation */}
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs text-[#d4af37] font-bold uppercase tracking-wider">02. Zellschutz</span>
                <h3 className="text-xl font-bold uppercase text-white">Selektives Antioxidans</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  H2 neutralisiert gezielt hochreaktive Hydroxyl-Radikale (*OH), ohne nützliche Signalmoleküle des Immunsystems negativ zu beeinträchtigen.
                </p>
              </div>
              <button
                onClick={() => openVideoModal("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ")}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] hover:text-white transition pt-4"
              >
                <Play className="w-4 h-4 fill-current" /> Vortrag von Prof. Dr. Weber ansehen
              </button>
            </div>

            {/* Pillar 3: Beauty */}
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs text-[#d4af37] font-bold uppercase tracking-wider">03. Healthy Beauty</span>
                <h3 className="text-xl font-bold uppercase text-white">Haut-Hydration & Frische</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Von innen heraus: Die winzigen Wasserstoff-Moleküle durchdringen Zellmembranen mühelos und unterstützen die Kollagensynthese für ein strahlendes Hautbild.
                </p>
              </div>
              <button
                onClick={() => openVideoModal("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ")}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] hover:text-white transition pt-4"
              >
                <Play className="w-4 h-4 fill-current" /> Ärztliche Experten-Analyse ansehen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES (EINSATZBEREICHE) SECTION */}
      <section id="usecases" className="py-24 bg-[#e5e9ec] text-[#081427] font-sans">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[#c59b27] text-xs font-extrabold tracking-widest uppercase bg-[#0a192f] px-4 py-1.5 rounded-full inline-block">
              Dein Alltag mit FONS VITAE
            </span>
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0a192f]">
              Einsatzbereiche
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Optimale Begleitung für jede Phase Deines Tages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0a192f] text-[#d4af37] flex items-center justify-center">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase text-[#0a192f]">Morgen-Routine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Trinke die erste Dose FONS VITAE H2 direkt nach dem Aufstehen, um den Stoffwechsel zu aktivieren und Zellen zu fluten.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0a192f] text-[#d4af37] flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase text-[#0a192f]">Fokus im Büro</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reine geistige Klarheit ohne das Tief nach dem Nachmittagskaffee. H2 unterstützt den zellulären Energiefluss im Gehirn.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0a192f] text-[#d4af37] flex items-center justify-center">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase text-[#0a192f]">Sport & Workout</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vor und nach intensiven Einheiten für maximale Muskel-Hydration, reduzierte Übersäuerung und schnellste Erholung.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0a192f] text-[#d4af37] flex items-center justify-center">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase text-[#0a192f]">Reise & Unterwegs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Schütze Deinen Körper vor Dehydrierung, Reisestress und Jetlag. Praktisch in der 250-ml-Dose griffbereit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS & TESTIMONIALS */}
      <div id="testimonial" data-webild-section="TestimonialPhotoRail" data-webild-section-id="TestimonialPhotoRail-1" data-section="testimonial">
        <TestimonialPhotoRail
          media="image"
          title="Echte Leistung"
          label="Erfahrungen von Sportlern & Biohackern"
          imageSrc="https://img.b2bpic.net/free-photo/refreshing-drink-with-apple-arrangement_23-2150928884.jpg"
          items={[
            {
              title: "Spürbare Erholung",
              quote: "Seit ich H2-Wasser vor den harten Trainingseinheiten trinke, erhole ich mich spürbar schneller.",
              name: "Maximilian Fischer",
              badge: "Leistungssportler"
            },
            {
              title: "Kein Nachmittagstief",
              quote: "Ideal im Büro. Ich bleibe den ganzen Tag über fokussiert und energetisiert.",
              name: "Nina Richter",
              badge: "Biohackerin"
            },
            {
              title: "Haut & Vitalität",
              quote: "Ich trinke 3 Dosen täglich. Meine Haut wirkt viel frischer und hydratisierter.",
              name: "Stefan Wolf",
              badge: "Fitness-Coach"
            },
            {
              title: "Perfekter Fokus",
              quote: "Die Kombination aus H2 Wasser und Fruchtsäften ist mein täglicher Begleiter.",
              name: "Anna Wagner",
              badge: "Triathletin"
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
          accent="Wissen & Service"
          items={[
            {
              title: "Was bewirkt molekularer Wasserstoff im Körper?",
              description: "FONS VITAE H2-Wasser enthält mindestens 2,8 mg/L gelöstes H2-Gas. Es fungiert als selektives Antioxidans gegen schädliche Hydroxyl-Radikale und fördert die ATP-Synthese in den Mitochondrien."
            },
            {
              title: "Sind die 250-ml-Dosen frei von BPA?",
              description: "Ja! Alle unsere 250-ml-Aluminiumdosen sind 100 % BPA-frei verarbeitet und sichern die gleichbleibend hohe H2-Konzentration ohne Qualitätsverlust."
            },
            {
              title: "Wie viele Dosen sollte ich täglich trinken?",
              description: "Wir empfehlen mindestens 3 Dosen täglich (morgens, vor dem Workout und abends), um den Körper kontinuierlich mit gelöstem Wasserstoff zu versorgen."
            },
            {
              title: "Ist das gesetzliche Dosenpfand bereits enthalten?",
              description: "Ja, in all unseren Paketpreisen (z. B. 33,00 € für das 12er-Pack oder 66,00 € für das 24er-Pack) ist das Dosenpfand von 0,25 € pro Dose bereits komplett eingerechnet."
            },
            {
              title: "Welche Nährwerte hat das H2-Wasser?",
              description: "Unser H2-Wasser ist zu 100 % rein: 0 kcal, 0 g Fett, 0 g Zucker, 0 g Kohlenhydrate. 100 % vegan und laborgeprüft."
            },
            {
              title: "Wie lange dauert der Versand?",
              description: "Der Versand erfolgt direkt aus Deutschland und dauert in der Regel 1-2 Werktage. Ab 30 € ist der Versand kostenfrei."
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

      {/* CONTACT, SERVICE & TEAM SECTION */}
      <section id="contact" className="py-24 bg-[#0a192f] text-white font-sans border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[#d4af37] text-xs font-extrabold tracking-widest uppercase bg-slate-800 px-4 py-1.5 rounded-full inline-block">
              Kundenservice & Team
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              Kontakt & Ansprechpartner
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Wir freuen uns auf Deine Fragen rund um H2 Wasser, Bestellungen und Kooperationen.
            </p>
          </div>

          {/* Team Showcase */}
          <div className="space-y-6">
            <h3 className="text-[#d4af37] text-sm font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2">
              <Users className="w-4 h-4" /> Das FONS VITAE Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
                <div className="w-16 h-16 rounded-full bg-[#d4af37] text-[#081427] font-black text-xl flex items-center justify-center mx-auto shadow-md">
                  IT
                </div>
                <h4 className="font-extrabold text-lg text-white">Iwona Török</h4>
                <p className="text-xs text-[#d4af37] font-semibold">Geschäftsleitung & Qualität</p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
                <div className="w-16 h-16 rounded-full bg-[#d4af37] text-[#081427] font-black text-xl flex items-center justify-center mx-auto shadow-md">
                  SB
                </div>
                <h4 className="font-extrabold text-lg text-white">Sebastian Behlke</h4>
                <p className="text-xs text-[#d4af37] font-semibold">Geschäftsleitung & Vertrieb</p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
                <div className="w-16 h-16 rounded-full bg-[#d4af37] text-[#081427] font-black text-xl flex items-center justify-center mx-auto shadow-md">
                  MT
                </div>
                <h4 className="font-extrabold text-lg text-white">Miroslav Török</h4>
                <p className="text-xs text-[#d4af37] font-semibold">Geschäftsleitung & Logistik</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-6">
            {/* Contact Form */}
            <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 space-y-6 shadow-2xl">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-white">Schreib uns eine Nachricht</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Vielen Dank! Deine Nachricht wurde erfolgreich versendet.");
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Dein Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    placeholder="Vor- und Nachname"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">E-Mail-Adresse *</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    placeholder="info@fonsvitae.de"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Telefonnummer</label>
                  <input
                    type="tel"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    placeholder="017660945171"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Deine Nachricht *</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    placeholder="Fragen zu Produkt, Beratung oder Bestellung..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#d4af37] hover:bg-[#c59b27] text-[#081427] py-3.5 rounded-xl font-extrabold uppercase text-xs tracking-wider shadow-lg transition"
                >
                  Nachricht jetzt senden
                </button>
              </form>
            </div>

            {/* Direct Details & Google Maps Placeholder */}
            <div className="space-y-6">
              <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 space-y-4">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white">FONS VITAE Kontakt</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#d4af37]" />
                    <span>Telefon Kundenservice: <strong>017660945171</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#d4af37]" />
                    <span>Allgemeine Anfragen: <strong>info@fonsvitae.de</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#d4af37]" />
                    <span>Bestellungen: <strong>bestellung@fonsvitae.de</strong></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">FONS VITAE Hauptsitz</strong>
                      <span>Industriestr. 23 A, 61449 Steinbach Ts.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700 flex items-center gap-4">
                  <span className="text-xs text-slate-400 font-semibold">Social Media:</span>
                  <div className="flex gap-2">
                    <span className="bg-slate-700 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Instagram className="w-3 h-3" /> Instagram (Coming Soon)
                    </span>
                    <span className="bg-slate-700 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Youtube className="w-3 h-3" /> YouTube (Coming Soon)
                    </span>
                  </div>
                </div>
              </div>

              {/* Google Maps Placeholder */}
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 overflow-hidden text-center p-8 space-y-3 relative">
                <div className="w-12 h-12 bg-[#d4af37]/20 border border-[#d4af37] rounded-full flex items-center justify-center mx-auto text-[#d4af37]">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-base">Standort Steinbach Ts.</h4>
                <p className="text-xs text-slate-300">FONS VITAE • Industriestr. 23 A, 61449 Steinbach Ts.</p>
                <div className="w-full h-40 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-center text-xs text-slate-400 font-mono">
                  [ Google Maps Standortsicht - 61449 Steinbach Ts. ]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
