import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroWordmarkProduct from "@/components/sections/hero/HeroWordmarkProduct";
import ProductCompareTable from "@/components/sections/product/ProductCompareTable";
import TestimonialPhotoRail from "@/components/sections/testimonial/TestimonialPhotoRail";
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
  Sparkles
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
  "Apfel Limette (Apple Lime)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862684-n9ac3wqc.png",
  "Apfel Ingwer (Apple Ginger)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862684-n9ac3wqc.png",
};

const H2_6_DETAILS: ProductDetailInfo = {
  title: "FONTES VITEA H2 Wasserstoff-Wasser (6er-Pack)",
  subtitle: "6x 250 ml Aluminiumdosen (100 % BPA-Frei)",
  price: "19,82 € (6er-Pack)",
  depositInfo: "Inklusive 19 % MwSt. & 1,50 € Dosenpfand (0,25 € pro Dose)",
  imageSrc: H2_12PACK_IMAGE_URL,
  rawPrice: 19.82,
  cansCount: 6,
  deposit: 1.50,
  packInfo: "6er-Pack (6x 250 ml)",
  description:
    "Das Kennenlern-Paket für pure Zell-Hydration. 6 Aluminiumdosen FONTES VITEA H2 Wasserstoff-Wasser mit mindestens 2,8 mg/L gelöstem Wasserstoff. 100 % BPA-Frei, 0 kcal, 0 g Zucker.",
  verzehr: "Empfohlene tägliche Verzehrmenge: 1 bis 2 Dosen täglich. Ideal morgens, vor/nach dem Sport oder unterwegs.",
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
    "6x 250 ml Aluminiumdosen – 100 % BPA-Frei",
    "0 kcal, 0 g Zucker, 100% BPA-Frei",
    "Laborgeprüfte Reinheit aus Deutschland",
    "Gezieltes Antioxidans für Zellschutz"
  ]
};

const H2_12_DETAILS: ProductDetailInfo = {
  title: "FONTES VITEA H2 Wasserstoff-Wasser (12er-Pack)",
  subtitle: "12x 250 ml Aluminiumdosen (100 % BPA-Frei)",
  price: "39,64 € (12er-Pack)",
  depositInfo: "Inklusive 19 % MwSt. & 3,00 € Dosenpfand (0,25 € pro Dose)",
  imageSrc: H2_12PACK_IMAGE_URL,
  rawPrice: 39.64,
  cansCount: 12,
  deposit: 3.00,
  packInfo: "12er-Pack (12x 250 ml)",
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
    "Original FONTES VITEA 12er-Pack Verpackung",
    "12x 250 ml Aluminiumdosen – 100 % BPA-Frei",
    "0 kcal, 0 g Zucker, 100% BPA-Frei",
    "Laborgeprüfte Reinheit aus Deutschland",
    "Gezieltes Antioxidans für Zellschutz"
  ]
};

const H2_24_DETAILS: ProductDetailInfo = {
  title: "FONTES VITEA H2 Wasserstoff-Wasser (24er-Pack)",
  subtitle: "24x 250 ml Aluminiumdosen (100 % BPA-Frei)",
  price: "79,28 € (24er-Pack)",
  depositInfo: "Inklusive 19 % MwSt. & 6,00 € Dosenpfand (0,25 € pro Dose)",
  imageSrc: H2_24PACK_IMAGE_URL,
  rawPrice: 79.28,
  cansCount: 24,
  deposit: 6.00,
  packInfo: "24er-Pack (24x 250 ml)",
  description:
    "Der Monatsvorrat für maximale Zellenergie und Vitalität. 24 Dosen FONTES VITEA H2 Wasserstoff-Wasser (min. 2.8 mg/L gelöster molekularer Wasserstoff) in 100 % BPA-Freien Aluminiumdosen. Geliefert im stabilen 24er-Pack.",
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
    "Original FONTES VITEA 24er-Pack Verpackung",
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

// 7 Sorten Product List for Carousel
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
        "Fein-schcontent Ingwer-Kick",
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
  const { addToCart, openProductDetail } = useCart();

  // H2 Pack selection state
  const [selectedH2Pack, setSelectedH2Pack] = useState<"6" | "12" | "24">("12");

  const h2PackInfo = {
    "6": { price: 19.82, count: 6, deposit: 1.50, label: "6er-Pack (19,82 €)", detail: H2_6_DETAILS, image: H2_12PACK_IMAGE_URL },
    "12": { price: 39.64, count: 12, deposit: 3.00, label: "12er-Pack (39,64 €)", detail: H2_12_DETAILS, image: H2_12PACK_IMAGE_URL },
    "24": { price: 79.28, count: 24, deposit: 6.00, label: "24er-Pack (79,28 €)", detail: H2_24_DETAILS, image: H2_24PACK_IMAGE_URL }
  };

  // Juice selection state
  const [selectedJuiceFlavor, setSelectedJuiceFlavor] = useState("Blaubeere (Blueberry)");
  const [selectedJuicePack, setSelectedJuicePack] = useState<"6" | "12" | "24">("12");
  const [canCardSide, setCanCardSide] = useState<"front" | "back">("front");

  // Bottom Carousel state
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
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentVariety = SEVEN_VARIETIES[carouselIndex];

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
      title: `FONTES VITEA Fruchtsaft (${selectedJuiceFlavor}) - 100% Vegan`,
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

      <WaterDropIntro />

      {/* 1. HERO SECTION (Without Curved Marquee) */}
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
        />
      </div>

      {/* 2. UNSERE QUELLE (inkl. Mineralstofftabelle) */}
      <div id="quelle" data-webild-section="WaterSourceMinerals" data-webild-section-id="WaterSourceMinerals-1" data-section="source">
        <section className="py-20 px-6 bg-white font-sans text-[#0A1C3A] border-b border-slate-300">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#f4f6f8] px-4 py-1.5 rounded-full inline-block border border-slate-300">
                Natürliche Reinheit
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A1C3A] uppercase tracking-tight">
                UNSERE QUELLE
              </h2>
              <p className="text-slate-700 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-medium">
                Unser Quellwasser entspringt aus 136 Metern Tiefe und wird durch natürliche Gesteinsschichten gefiltert und tiefenmineralisiert. Diese geschützte Tiefenquelle garantiert höchste mikrobiologische Reinheit sowie ein ausgewogenes Mineralstoffprofil mit optimalem pH-Wert – die reine, unbelastete Basis für unser molekular angereichertes H2-Wasserstoffwasser.
              </p>
            </div>

            {/* Mineral Table */}
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

      {/* 3. HYDRATION IM ALLTAG (4 spezifische Icon-Bereiche) */}
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
              {/* Icon Area 1: Morgens */}
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

              {/* Icon Area 2: Arbeit */}
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

              {/* Icon Area 3: Sport */}
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

              {/* Icon Area 4: Reisen */}
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
              {/* Feature 1: H2-Konzentration */}
              <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-300 shadow-md space-y-4 hover:border-[#0A1C3A] transition">
                <div className="w-14 h-14 rounded-2xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-md">
                  <Droplets className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black uppercase text-[#0A1C3A]">H₂-Konzentration</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mindestens <strong>2,8 mg/L</strong> gelöster molekularer Wasserstoff. Dank unserem geschützten Anreicherungsverfahren bleibt das H2 selbst nach dem Öffnen 6 Stunden lang stabil (99 % nach 2 Std., 80 % nach 6 Std.).
                </p>
                <div className="pt-3 text-xs font-bold text-[#0A1C3A] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Höchste Wirkdosis am Markt
                </div>
              </div>

              {/* Feature 2: Aluminiumdosentechnologie */}
              <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-300 shadow-md space-y-4 hover:border-[#0A1C3A] transition">
                <div className="w-14 h-14 rounded-2xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-md">
                  <Cpu className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black uppercase text-[#0A1C3A]">Aluminiumdosentechnologie</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Spezielle 250-ml-Aluminiumdosen bieten die absolut undurchlässige Barriere gegen das Entweichen des extrem kleinen H2-Gases. Lichtgeschützt, unempfindlich und 100 % unendlich recycelbar.
                </p>
                <div className="pt-3 text-xs font-bold text-[#0A1C3A] flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" /> Optimaler Gasschutz &amp; Nachhaltig
                </div>
              </div>

              {/* Feature 3: BPA-Freiheit */}
              <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-300 shadow-md space-y-4 hover:border-[#0A1C3A] transition">
                <div className="w-14 h-14 rounded-2xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-7 h-7" />
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

      {/* 5. VORSCHAU ZUR SEITE WISSEN & STUDIEN */}
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

            {/* Visual Box / Video Preview Card */}
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

      {/* 6. VORTEILE IM VERGLEICH (Product Comparison Section) */}
      <div id="vergleich" data-webild-section="ProductCompareTable" data-webild-section-id="ProductCompareTable-1" data-section="product">
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

      {/* 7. UNSERE PRODUKTE (Shop & Bundles Section) */}
      <section id="shop" className="py-20 px-6 max-w-7xl mx-auto font-sans">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#e2e8f0] px-4 py-1.5 rounded-full inline-block border border-slate-300">
            FONTES VITEA Online-Shop
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0A1C3A] uppercase tracking-tight">
            UNSERE PRODUKTE
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Molekulares H2 Wasserstoff-Wasser und nahrhafte Fruchtsäfte in 250-ml-Aluminiumdosen.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: H2 Wasser (6er / 12er / 24er Pack) */}
          <div className="bg-[#f4f6f8] rounded-2xl p-6 border border-slate-300 shadow-lg flex flex-col justify-between hover:border-[#0A1C3A] transition group">
            <div className="space-y-4">
              <div className="relative bg-white rounded-xl p-4 border border-slate-200 text-center">
                <span className="absolute top-3 left-3 bg-[#0A1C3A] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase z-10">
                  {selectedH2Pack}er-Pack
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
                  src={canCardSide === "front" ? (selectedH2Pack === "24" ? H2_24PACK_IMAGE_URL : H2_12PACK_IMAGE_URL) : CAN_IMAGE_URL}
                  alt={`FONTES VITEA H2 Wasser ${selectedH2Pack}er-Pack`}
                  className="w-full h-44 object-contain mx-auto group-hover:scale-105 transition duration-300"
                />
              </div>
              <div>
                <span className="text-xs text-[#0A1C3A] font-extrabold uppercase">H2 Wasserstoff-Wasser</span>
                <h3 className="text-2xl font-black text-[#0A1C3A] uppercase tracking-tight">{selectedH2Pack}er-Pack H2 Wasser</h3>
                <p className="text-xs text-slate-600 mt-1">{selectedH2Pack}x 250 ml Alu-Dosen (100 % BPA-Frei)</p>
              </div>

              {/* Pack size selector */}
              <div className="space-y-2 bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
                <label className="block font-bold text-[#0A1C3A]">Paketgröße wählen:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["6", "12", "24"] as const).map((pk) => (
                    <button
                      key={pk}
                      type="button"
                      onClick={() => setSelectedH2Pack(pk)}
                      className={`py-1.5 rounded-lg font-bold text-xs border transition ${
                        selectedH2Pack === pk
                          ? "bg-[#0A1C3A] text-white border-[#0A1C3A]"
                          : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                      }`}
                    >
                      {pk}er-Pack
                    </button>
                  ))}
                </div>
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
                  <span>inkl. MwSt. &amp; Pfand ({h2PackInfo[selectedH2Pack].deposit.toFixed(2).replace('.', ',')} €)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-300 space-y-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-2xl font-black text-[#0A1C3A]">
                    {h2PackInfo[selectedH2Pack].price.toFixed(2).replace('.', ',')} €
                  </span>
                  <span className="text-[10px] text-slate-500 block">inkl. 19 % MwSt. &amp; Pfand</span>
                </div>
                <button
                  onClick={() => openProductDetail(h2PackInfo[selectedH2Pack].detail)}
                  className="text-xs text-[#0A1C3A] hover:underline font-bold flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" /> Details
                </button>
              </div>

              <button
                onClick={() =>
                  addToCart({
                    id: `h2-${selectedH2Pack}pack`,
                    title: `FONTES VITEA H2 Wasser (${selectedH2Pack}er-Pack)`,
                    packInfo: `${selectedH2Pack}er-Pack (${selectedH2Pack}x 250 ml)`,
                    price: h2PackInfo[selectedH2Pack].price,
                    cansCount: h2PackInfo[selectedH2Pack].count,
                    deposit: h2PackInfo[selectedH2Pack].deposit,
                    imageSrc: h2PackInfo[selectedH2Pack].image,
                  })
                }
                className="w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-md transition"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                In den Warenkorb ({h2PackInfo[selectedH2Pack].price.toFixed(2).replace('.', ',')} €)
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
                  alt="FONTES VITEA H2 Wasser 24er-Pack Originalverpackung"
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
                    title: "FONTES VITEA H2 Wasser (24er-Pack)",
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
                  alt={`FONTES VITEA ${selectedJuiceFlavor}`}
                  className="w-44 h-44 object-contain mx-auto group-hover:scale-105 transition duration-300"
                />
              </div>
              <div>
                <span className="text-xs text-[#0A1C3A] font-extrabold uppercase">Vital-Fruchtsäfte (250 ml) • 100% Vegan • BPA-Frei</span>
                <h3 className="text-2xl font-black text-[#0A1C3A] uppercase tracking-tight">FRUCHTSÄFTE</h3>
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

      {/* 8. KUNDENBEWERTUNGEN (DAS SAGEN UNSERE KUNDEN) */}
      <div id="testimonial" data-webild-section="TestimonialPhotoRail" data-webild-section-id="TestimonialPhotoRail-1" data-section="testimonial">
        <TestimonialPhotoRail
          media="image"
          title="DAS SAGEN UNSERE KUNDEN"
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

      {/* 9. EMPFOHLENE BUNDLES */}
      <div id="bundles" data-webild-section="PricingRingCards" data-webild-section-id="PricingRingCards-1" data-section="pricing">
        <section className="py-20 bg-[#f4f6f8] text-[#0A1C3A] font-sans border-y border-slate-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center space-y-3 mb-16">
              <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-white px-4 py-1.5 rounded-full inline-block border border-slate-300">
                Vorteilspakete
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A1C3A] uppercase tracking-tight">
                Empfohlene Bundles
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

      {/* 10. HOCHWERTIGES PRODUKT-KARUSSELL AM ENDE DER STARTSEITE (ALLE 7 SORTEN) */}
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
                Klicke auf eine Sorte für alle Details, Nährwerte und die direkte Bestellen-Option.
              </p>
            </div>

            {/* Premium Carousel Box */}
            <div className="relative bg-white rounded-3xl border border-slate-300 p-6 sm:p-10 shadow-2xl overflow-hidden max-w-5xl mx-auto">
              {/* Internal Accent background */}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-blue-500/10 to-indigo-500/5 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-full flex items-center justify-between min-h-[380px] sm:min-h-[420px]">
                  {/* Prev Button */}
                  <button
                    onClick={prevVariety}
                    className="absolute left-0 sm:left-2 z-20 bg-white/95 hover:bg-[#0A1C3A] text-[#0A1C3A] hover:text-white p-3.5 rounded-full shadow-xl border border-slate-300 transition transform hover:scale-110 active:scale-95"
                    aria-label="Vorherige Sorte"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Active Variety Content Card */}
                  <div className="w-full px-12 sm:px-16 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
                    {/* Image */}
                    <div className="shrink-0 relative group cursor-pointer" onClick={() => openProductDetail(currentVariety.detail)}>
                      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-600 to-[#0A1C3A] opacity-20 blur-xl rounded-full group-hover:opacity-40 transition duration-500" />
                      <img
                        src={currentVariety.image}
                        alt={currentVariety.name}
                        className="relative w-44 sm:w-56 h-56 sm:h-64 object-contain filter drop-shadow-2xl transition duration-300 transform group-hover:scale-105"
                      />
                    </div>

                    {/* Info */}
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

                        <button
                          onClick={() => openProductDetail(currentVariety.detail)}
                          className="bg-[#0A1C3A] hover:bg-[#12284c] text-white text-xs font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2"
                        >
                          <Info className="w-4 h-4 text-sky-400" />
                          <span>Details &amp; Bestellen</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Next Button */}
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
