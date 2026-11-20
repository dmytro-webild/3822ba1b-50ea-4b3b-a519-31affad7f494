import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart, type ProductDetailInfo } from "@/context/CartContext";
import CustomerReviewsSection from "@/components/sections/feedback/CustomerReviewsSection";
import SubtleWaveTransition from "@/components/shared/SubtleWaveTransition";
import {
  ShoppingBag,
  Info,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Truck,
  RotateCcw,
  PackageCheck,
  Building2,
  BookOpen,
  ExternalLink
} from "lucide-react";

const CAN_IMAGE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795132125149-eraq7h8f.png";
const H2_12PACK_IMAGE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794876509264-c5xnooyr.png";
const H2_24PACK_IMAGE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794876509262-p9spm6ut.png";
const JUICE_IMAGE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134219308-nr3iwk4m.png";

const JUICE_IMAGES: Record<string, string> = {
  "Blaubeere (Blueberry)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134384024-101x5eut.png",
  "Traube (Grape)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862677-cd34mdsd.png",
  "Himbeere (Raspberry)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134073186-opauqy4r.png",
  "Ingwer (Ginger Tonic)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133989332-pq9c0ikc.png",
  "Apfel Limette (Apple Lime)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134219308-nr3iwk4m.png",
  "Apfel Ingwer (Apple Ginger)": "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134384023-6vwzgda1.png",
};

export interface ShopProduct {
  id: string;
  name: string;
  badge: string;
  category: "h2" | "juice" | "bundle";
  categoryLabel: string;
  image: string;
  description: string;
  detail: ProductDetailInfo;
  prices: {
    "6": { price: number; deposit: number; count: number };
    "12": { price: number; deposit: number; count: number };
    "24": { price: number; deposit: number; count: number };
  };
}

const H2_PRODUCT: ShopProduct = {
  id: "h2-water",
  name: "FONTES VITEA H2 Wasserstoff-Wasser",
  badge: "Original H2",
  category: "h2",
  categoryLabel: "Wasserstoff-Wasser",
  image: CAN_IMAGE_URL,
  description: "Reinste zelluläre Hydration mit mindestens 2,8 mg/L gelöstem molekularem Wasserstoff (H₂). 0 kcal, 0 g Zucker, BPA-Frei.",
  prices: {
    "6": { price: 19.82, deposit: 1.50, count: 6 },
    "12": { price: 39.64, deposit: 3.00, count: 12 },
    "24": { price: 79.28, deposit: 6.00, count: 24 },
  },
  detail: {
    title: "FONTES VITEA H2 Wasserstoff-Wasser",
    subtitle: "250 ml Aluminiumdosen (100 % BPA-Frei)",
    price: "39,64 € (12er-Pack)",
    depositInfo: "Inklusive 19 % MwSt. & 3,00 € Dosenpfand (0,25 € pro Dose)",
    imageSrc: CAN_IMAGE_URL,
    rawPrice: 39.64,
    cansCount: 12,
    deposit: 3.00,
    packInfo: "12er-Pack (12x 250 ml)",
    description:
      "Physikalisch angereichertes Tiefenquellwasser mit mindestens 2,8 mg/L gelöstem molekularem Wasserstoff. Vertrieb durch FONTES VITEA, Ihrem offiziellen Vertriebspartner.",
    verzehr: "Empfohlen: 1 bis 2 Dosen täglich. Ideal morgens, vor/nach dem Sport oder unterwegs.",
    nutritionalTable: [
      { name: "Brennwert", value: "0 kJ / 0 kcal" },
      { name: "Fett", value: "0 g" },
      { name: "davon gesättigte Fettsäuren", value: "0 g" },
      { name: "Kohlenhydrate", value: "0 g" },
      { name: "davon Zucker", value: "0 g" },
      { name: "Eiweiß", value: "0 g" },
      { name: "Salz", value: "0 g" },
      { name: "Molekularer Wasserstoff (H₂)", value: "≥ 2,8 mg/L" },
    ],
    specs: [
      "Mind. 2,8 mg/L gelöster Wasserstoff",
      "250 ml Aluminiumdosen – 100 % BPA-Frei",
      "0 kcal, 0 g Zucker, 100% BPA-Frei",
      "Laborgeprüfte Qualität nach ISO-Standards",
      "Gezieltes selektives Antioxidans"
    ]
  }
};

const JUICE_PRODUCTS: ShopProduct[] = [
  {
    id: "juice-blaubeere",
    name: "Blaubeere (Blueberry)",
    badge: "100% Fruchtsaft",
    category: "juice",
    categoryLabel: "Vital-Fruchtsaft",
    image: JUICE_IMAGES["Blaubeere (Blueberry)"],
    description: "Köstlicher Direktsaft aus sonnengereiften Blaubeeren. Reich an pflanzlichen Antioxidantien, 100% Vegan & BPA-Frei.",
    prices: {
      "6": { price: 15.92, deposit: 1.50, count: 6 },
      "12": { price: 31.84, deposit: 3.00, count: 12 },
      "24": { price: 63.68, deposit: 6.00, count: 24 },
    },
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
    id: "juice-traube",
    name: "Traube (Grape)",
    badge: "100% Fruchtsaft",
    category: "juice",
    categoryLabel: "Vital-Fruchtsaft",
    image: JUICE_IMAGES["Traube (Grape)"],
    description: "Edler Traubensaft aus sonnenverwöhnten Weintrauben. Natursüß, reich an Polyphenolen und BPA-Frei.",
    prices: {
      "6": { price: 15.92, deposit: 1.50, count: 6 },
      "12": { price: 31.84, deposit: 3.00, count: 12 },
      "24": { price: 63.68, deposit: 6.00, count: 24 },
    },
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
    id: "juice-himbeere",
    name: "Himbeere (Raspberry)",
    badge: "100% Fruchtsaft",
    category: "juice",
    categoryLabel: "Vital-Fruchtsaft",
    image: JUICE_IMAGES["Himbeere (Raspberry)"],
    description: "Fruchtiges Himbeer-Erlebnis voller natürlicher Frische und Vitalität. In BPA-freien Aluminiumdosen.",
    prices: {
      "6": { price: 15.92, deposit: 1.50, count: 6 },
      "12": { price: 31.84, deposit: 3.00, count: 12 },
      "24": { price: 63.68, deposit: 6.00, count: 24 },
    },
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
    id: "juice-ingwer",
    name: "Ingwer (Ginger Tonic)",
    badge: "100% Fruchtsaft",
    category: "juice",
    categoryLabel: "Vital-Fruchtsaft",
    image: JUICE_IMAGES["Ingwer (Ginger Tonic)"],
    description: "Erfrischendes Ginger Tonic mit angenehmer Ingwerschärfe. Belebt Sinne und Kreislauf.",
    prices: {
      "6": { price: 15.92, deposit: 1.50, count: 6 },
      "12": { price: 31.84, deposit: 3.00, count: 12 },
      "24": { price: 63.68, deposit: 6.00, count: 24 },
    },
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
    id: "juice-apfel-limette",
    name: "Apfel Limette (Apple Lime)",
    badge: "100% Fruchtsaft",
    category: "juice",
    categoryLabel: "Vital-Fruchtsaft",
    image: JUICE_IMAGES["Apfel Limette (Apple Lime)"],
    description: "Spritzig-frische Kombination aus knackigem Apfel und feiner Limette in BPA-freien Alu-Dosen.",
    prices: {
      "6": { price: 15.92, deposit: 1.50, count: 6 },
      "12": { price: 31.84, deposit: 3.00, count: 12 },
      "24": { price: 63.68, deposit: 6.00, count: 24 },
    },
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
        "Qualität nach EU-Standards"
      ]
    }
  },
  {
    id: "juice-apfel-ingwer",
    name: "Apfel Ingwer (Apple Ginger)",
    badge: "100% Fruchtsaft",
    category: "juice",
    categoryLabel: "Vital-Fruchtsaft",
    image: JUICE_IMAGES["Apfel Ingwer (Apple Ginger)"],
    description: "Belebende Harmonie aus süßem Apfelsaft und würziger Ingwernote in BPA-freien Alu-Dosen.",
    prices: {
      "6": { price: 15.92, deposit: 1.50, count: 6 },
      "12": { price: 31.84, deposit: 3.00, count: 12 },
      "24": { price: 63.68, deposit: 6.00, count: 24 },
    },
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

export interface KinderserienProduct {
  id: string;
  name: string;
  flavor: string;
  badge: string;
  image: string;
  description: string;
  specs: string[];
  detail: ProductDetailInfo;
}

const KINDERSERIEN_PRODUCTS: KinderserienProduct[] = [
  {
    id: "kids-gingerix",
    name: "Gingerix (Ingwer Tonic)",
    flavor: "Ingwer Tonic",
    badge: "Kinderserie • Special",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216737-r3370ev4.png",
    description: "100 % natürlicher Direktsaft mit angenehmer Ingwerschärfe, speziell kreiert für die Kinderserie. Ohne Zuckerzusatz.",
    specs: [
      "100 % natürlicher Direktsaft",
      "Ohne Zuckerzusatz",
      "Ohne Konservierungsstoffe & Aromen",
      "BPA-freie Alu-Dose (250 ml)"
    ],
    detail: {
      title: "FONTES VITEA Kinderserie - Gingerix (Ingwer Tonic)",
      subtitle: "100 % natürlicher Direktsaft • Special Edition • 250 ml Alu-Dose",
      price: "Nicht vorrätig – ausverkauft",
      depositInfo: "Status: Derzeit nicht auf Lager",
      imageSrc: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216737-r3370ev4.png",
      description: "Belebendes Ginger Tonic aus 100 % natürlichem Direktsaft. Frei von Zuckerzusätzen, Konservierungsstoffen, Farbstoffen und künstlichen Aromen.",
      verzehr: "Ideal gekühlt für die erfrischende Pause zwischendurch.",
      nutritionalTable: [
        { name: "Brennwert", value: "148 kJ / 35 kcal" },
        { name: "Fett", value: "< 0,1 g" },
        { name: "Kohlenhydrate", value: "8,1 g" },
        { name: "davon Zucker", value: "7,6 g" },
        { name: "Eiweiß", value: "0,2 g" }
      ],
      specs: [
        "100 % natürlicher Direktsaft",
        "Ohne Zuckerzusatz",
        "Ohne Konservierungsstoffe & Aromen",
        "Doseninnenbeschichtung ohne BPA"
      ],
      isOutOfStock: true
    }
  },
  {
    id: "kids-limetix",
    name: "Limetix (Limette mit Apfel)",
    flavor: "Limette mit Apfel",
    badge: "Kinderserie • Special",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216742-q4yi2mw1.png",
    description: "Spritzige Kombination aus frischer Limette und knackigem Apfel. 100 % natürlich und ohne künstliche Zusätze.",
    specs: [
      "Erfrischende Limette & Apfel",
      "Ohne Zuckerzusatz",
      "Ohne Konservierungsstoffe & Aromen",
      "BPA-freie Alu-Dose (250 ml)"
    ],
    detail: {
      title: "FONTES VITEA Kinderserie - Limetix (Limette mit Apfel)",
      subtitle: "Fruchtiges Erfrischungsgetränk • Special Edition • 250 ml Alu-Dose",
      price: "Nicht vorrätig – ausverkauft",
      depositInfo: "Status: Derzeit nicht auf Lager",
      imageSrc: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216742-q4yi2mw1.png",
      description: "Die spritzig-fruchtige Harmonie aus sonnengereifter Limette und heimischem Apfel in der limitierten Kinderserien-Dose.",
      verzehr: "Gekühlt genießen als fruchtiger Durstlöscher im Alltag.",
      nutritionalTable: [
        { name: "Brennwert", value: "195 kJ / 46 kcal" },
        { name: "Fett", value: "< 0,1 g" },
        { name: "Kohlenhydrate", value: "11,0 g" },
        { name: "davon Zucker", value: "10,2 g" },
        { name: "Eiweiß", value: "0,1 g" }
      ],
      specs: [
        "Fruchtige Limette & Apfel",
        "Ohne Zuckerzusatz",
        "Ohne Konservierungsstoffe & Farbstoffe",
        "Doseninnenbeschichtung ohne BPA"
      ],
      isOutOfStock: true
    }
  },
  {
    id: "kids-heidelberix",
    name: "Heidelberix (Heidelbeere)",
    flavor: "Heidelbeere",
    badge: "Kinderserie • Special",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216738-2s53ficu.png",
    description: "Heidelbeer-Erfrischungsgetränk mit 30 % natürlichem Heidelbeersaft. Natursüß, beerenstark & zuckerfrei.",
    specs: [
      "30 % natürlicher Heidelbeersaft",
      "Ohne Zuckerzusatz",
      "Ohne Konservierungsstoffe & Farbstoffe",
      "BPA-freie Alu-Dose (250 ml)"
    ],
    detail: {
      title: "FONTES VITEA Kinderserie - Heidelberix (Heidelbeere)",
      subtitle: "30 % Heidelbeersaft • Special Edition • 250 ml Alu-Dose",
      price: "Nicht vorrätig – ausverkauft",
      depositInfo: "Status: Derzeit nicht auf Lager",
      imageSrc: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216738-2s53ficu.png",
      description: "Intensiver Heidelbeergeschmack mit 30 % echtem Fruchtsaft. Perfekt abgestimmt für den Geschmack kleiner Entdecker.",
      verzehr: "Gut gekühlt servieren für volle Beerenfrische.",
      nutritionalTable: [
        { name: "Brennwert", value: "185 kJ / 44 kcal" },
        { name: "Fett", value: "< 0,1 g" },
        { name: "Kohlenhydrate", value: "10,5 g" },
        { name: "davon Zucker", value: "9,8 g" },
        { name: "Eiweiß", value: "0,3 g" }
      ],
      specs: [
        "30 % natürlicher Heidelbeersaft",
        "Ohne Zuckerzusatz",
        "Ohne Konservierungsstoffe & Aromen",
        "Doseninnenbeschichtung ohne BPA"
      ],
      isOutOfStock: true
    }
  },
  {
    id: "kids-himbeerixa",
    name: "Himbeerixa (Himbeere)",
    flavor: "Himbeere",
    badge: "Kinderserie • Special",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216740-l82r4ka1.png",
    description: "Himbeer-Erfrischungsgetränk mit 30 % natürlichem Himbeersaft. Beerenstark, fruchtig und ohne Zuckerzusatz.",
    specs: [
      "30 % natürlicher Himbeersaft",
      "Ohne Zuckerzusatz",
      "Ohne Konservierungsstoffe & Aromen",
      "BPA-freie Alu-Dose (250 ml)"
    ],
    detail: {
      title: "FONTES VITEA Kinderserie - Himbeerixa (Himbeere)",
      subtitle: "30 % Himbeersaft • Special Edition • 250 ml Alu-Dose",
      price: "Nicht vorrätig – ausverkauft",
      depositInfo: "Status: Derzeit nicht auf Lager",
      imageSrc: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216740-l82r4ka1.png",
      description: "Fruchtiges Himbeergetränk mit 30 % echtem Himbeersaft aus sonnengereiften Früchten. Ohne künstliche Farbstoffe oder Aromen.",
      verzehr: "Die fruchtige Erfrischung für zwischendurch.",
      nutritionalTable: [
        { name: "Brennwert", value: "172 kJ / 41 kcal" },
        { name: "Fett", value: "< 0,1 g" },
        { name: "Kohlenhydrate", value: "9,2 g" },
        { name: "davon Zucker", value: "8,5 g" },
        { name: "Eiweiß", value: "0,4 g" }
      ],
      specs: [
        "30 % natürlicher Himbeersaft",
        "Ohne Zuckerzusatz",
        "Ohne Konservierungsstoffe & Aromen",
        "Doseninnenbeschichtung ohne BPA"
      ],
      isOutOfStock: true
    }
  },
  {
    id: "kids-apfelrix",
    name: "Apfelrix (Apfel)",
    flavor: "Apfel",
    badge: "Kinderserie • Special",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216735-kk46ygff.png",
    description: "Apfel-Erfrischungsgetränk mit 30 % natürlichem Apfelsaft. Frischer Apfelgeschmack aus heimischen Früchten.",
    specs: [
      "30 % natürlicher Apfelsaft",
      "Ohne Zuckerzusatz",
      "Ohne Konservierungsstoffe & Aromen",
      "BPA-freie Alu-Dose (250 ml)"
    ],
    detail: {
      title: "FONTES VITEA Kinderserie - Apfelrix (Apfel)",
      subtitle: "30 % Apfelsaft • Special Edition • 250 ml Alu-Dose",
      price: "Nicht vorrätig – ausverkauft",
      depositInfo: "Status: Derzeit nicht auf Lager",
      imageSrc: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216735-kk46ygff.png",
      description: "Knackiger Apfelsaftgeschmack mit 30 % Fruchtsaftgehalt. Der bewährte Klassiker neu aufgelegt in der beliebten Kinderserie.",
      verzehr: "Ideal gekühlt als fruchtiger Begleiter im Alltag.",
      nutritionalTable: [
        { name: "Brennwert", value: "180 kJ / 42 kcal" },
        { name: "Fett", value: "< 0,1 g" },
        { name: "Kohlenhydrate", value: "10,1 g" },
        { name: "davon Zucker", value: "9,5 g" },
        { name: "Eiweiß", value: "0,1 g" }
      ],
      specs: [
        "30 % natürlicher Apfelsaft",
        "Ohne Zuckerzusatz",
        "Ohne Konservierungsstoffe & Aromen",
        "Doseninnenbeschichtung ohne BPA"
      ],
      isOutOfStock: true
    }
  }
];

export default function ShopPage() {
  const location = useLocation();
  const { addToCart, openProductDetail } = useCart();
  const [activeTab, setActiveTab] = useState<"all" | "h2" | "juice" | "bundle" | "kids">("all");
  const [packSizes, setPackSizes] = useState<Record<string, "6" | "12" | "24">>({
    "h2-water": "12",
    "juice-blaubeere": "12",
    "juice-traube": "12",
    "juice-himbeere": "12",
    "juice-ingwer": "12",
    "juice-apfel-limette": "12",
    "juice-apfel-ingwer": "12",
  });

  const allProducts = [H2_PRODUCT, ...JUICE_PRODUCTS];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get("product") || (location.hash ? location.hash.replace("#", "") : null);
    const categoryParam = searchParams.get("category");

    if (categoryParam && ["all", "h2", "juice", "bundle", "kids"].includes(categoryParam)) {
      setActiveTab(categoryParam as "all" | "h2" | "juice" | "bundle" | "kids");
    }

    if (productId) {
      const mainProd = allProducts.find((p) => p.id === productId);
      if (mainProd) {
        if (mainProd.category === "juice") setActiveTab("juice");
        else if (mainProd.category === "h2") setActiveTab("h2");
        const currentSize = packSizes[mainProd.id] || "12";
        const packData = mainProd.prices[currentSize];
        const displayImg = mainProd.id === "h2-water" && currentSize === "24" ? H2_24PACK_IMAGE_URL : (mainProd.id === "h2-water" ? H2_12PACK_IMAGE_URL : mainProd.image);
        openProductDetail({
          ...mainProd.detail,
          imageSrc: displayImg,
          rawPrice: packData.price,
          price: `${packData.price.toFixed(2).replace('.', ',')} € (${currentSize}er-Pack)`,
          deposit: packData.deposit,
          cansCount: packData.count,
        });
        setTimeout(() => {
          const el = document.getElementById(productId);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
        return;
      }

      const kidsProd = KINDERSERIEN_PRODUCTS.find((p) => p.id === productId);
      if (kidsProd) {
        setActiveTab("kids");
        openProductDetail(kidsProd.detail);
        setTimeout(() => {
          const el = document.getElementById(productId);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
        return;
      }

      if (productId === "bundle-12juices" || productId === "bundle-combo-48") {
        setActiveTab("bundle");
        setTimeout(() => {
          const el = document.getElementById(productId);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, location.hash, openProductDetail]);

  const handlePackChange = (productId: string, size: "6" | "12" | "24") => {
    setPackSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const filteredProducts = allProducts.filter((p) => {
    if (activeTab === "all") return true;
    return p.category === activeTab;
  });

  return (
    <div className="bg-transparent min-h-screen text-[#0A1C3A] font-sans pb-24">
      {/* Header Banner */}
      <section className="bg-[#0A1C3A] text-white py-16 px-6 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-6 relative z-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-sky-400 text-xs font-extrabold tracking-widest uppercase bg-sky-950/80 px-4 py-1.5 rounded-full border border-sky-800/60">
              Offizieller FONTES VITEA Shop
            </span>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>FONTES VITEA – Vertriebspartner DACH</span>
            </div>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
              ONLINESHOP – SPRECHENDER TRINKGENUSS
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              Entdecke alle 7 Sorten FONTES VITEA H₂-Wasserstoff-Wasser &amp; 100% vegane Fruchtsäfte im 6er-, 12er- oder 24er-Pack. Direkt zu dir nach Hause in Deutschland, Österreich &amp; der Schweiz.
            </p>
          </div>

          {/* Quick Info Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <Truck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Schneller DACH-Versand</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>100 % BPA-Freie Alu-Dosen</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <RotateCcw className="w-4 h-4 text-sky-400 shrink-0" />
              <span>0,25 € Dosenpfand inklusive</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <PackageCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Geprüfte Laborqualität</span>
            </div>
          </div>
        </div>
      </section>

      <SubtleWaveTransition variant="iceblue" />

      {/* Main Shop Content Area */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase transition ${
              activeTab === "all"
                ? "bg-[#0A1C3A] text-white shadow-md"
                : "text-slate-600 hover:text-[#0A1C3A] hover:bg-slate-100"
            }`}
          >
            Alle Sorten ({allProducts.length})
          </button>
          <button
            onClick={() => setActiveTab("h2")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase transition ${
              activeTab === "h2"
                ? "bg-[#0A1C3A] text-white shadow-md"
                : "text-slate-600 hover:text-[#0A1C3A] hover:bg-slate-100"
            }`}
          >
            H₂ Wasserstoff-Wasser
          </button>
          <button
            onClick={() => setActiveTab("juice")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase transition ${
              activeTab === "juice"
                ? "bg-[#0A1C3A] text-white shadow-md"
                : "text-slate-600 hover:text-[#0A1C3A] hover:bg-slate-100"
            }`}
          >
            Fruchtsäfte (6 Sorten)
          </button>
          <button
            onClick={() => setActiveTab("bundle")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase transition ${
              activeTab === "bundle"
                ? "bg-[#0A1C3A] text-white shadow-md"
                : "text-slate-600 hover:text-[#0A1C3A] hover:bg-slate-100"
            }`}
          >
            Vorteilspakete &amp; Bundles
          </button>
          <button
            onClick={() => setActiveTab("kids")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase transition flex items-center gap-1.5 ${
              activeTab === "kids"
                ? "bg-[#0A1C3A] text-white shadow-md"
                : "text-amber-800 bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Kinderserien Special (5 Sorten)
          </button>
        </div>

        {/* Products Grid (when not purely bundles or kids view) */}
        {activeTab !== "bundle" && activeTab !== "kids" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const currentSize = packSizes[product.id] || "12";
              const packData = product.prices[currentSize];
              const displayImage = product.id === "h2-water" && currentSize === "24" ? H2_24PACK_IMAGE_URL : (product.id === "h2-water" ? H2_12PACK_IMAGE_URL : product.image);

              return (
                <div
                  key={product.id}
                  id={product.id}
                  className="bg-white rounded-2xl p-6 border border-slate-300 shadow-md flex flex-col justify-between hover:border-[#0A1C3A] hover:shadow-xl transition group"
                >
                  <div className="space-y-4">
                    {/* Image Box */}
                    <div className="relative bg-[#f4f6f8] rounded-xl p-6 border border-slate-200 text-center cursor-pointer" onClick={() => openProductDetail({ ...product.detail, imageSrc: displayImage, rawPrice: packData.price, price: `${packData.price.toFixed(2).replace('.', ',')} € (${currentSize}er-Pack)`, deposit: packData.deposit, cansCount: packData.count })}>
                      <span className="absolute top-3 left-3 bg-[#0A1C3A] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase z-10 shadow-xs">
                        {product.badge}
                      </span>
                      <span className="absolute top-3 right-3 bg-slate-100 text-[#0A1C3A] text-[10px] font-bold px-2 py-0.5 rounded border border-slate-300 z-10">
                        {currentSize}er-Pack
                      </span>
                      <img
                        src={displayImage}
                        alt={product.name}
                        className="w-full h-44 object-contain mx-auto group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] text-[#0A1C3A] font-extrabold uppercase tracking-wider">{product.categoryLabel}</span>
                      <h3 className="text-2xl font-black text-[#0A1C3A] uppercase tracking-tight">{product.name}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Pack size Selector */}
                    <div className="space-y-2 bg-[#f8fafc] p-3 rounded-xl border border-slate-200 text-xs">
                      <label className="block font-bold text-[#0A1C3A] text-[11px]">Packungsgröße wählen:</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(["6", "12", "24"] as const).map((pk) => (
                          <button
                            key={pk}
                            type="button"
                            onClick={() => handlePackChange(product.id, pk)}
                            className={`py-1.5 rounded-lg font-bold text-xs border transition ${
                              currentSize === pk
                                ? "bg-[#0A1C3A] text-white border-[#0A1C3A] shadow-xs"
                                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            {pk}er-Pack
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Bullet Specs */}
                    <div className="space-y-1.5 text-xs text-slate-700 bg-[#f8fafc] p-3 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0A1C3A] shrink-0" />
                        <span>{packData.count}x 250 ml Aluminiumdosen (BPA-Frei)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0A1C3A] shrink-0" />
                        <span>Inkl. 19 % MwSt. &amp; Pfand ({packData.deposit.toFixed(2).replace('.', ',')} €)</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="mt-6 pt-4 border-t border-slate-200 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="text-2xl font-black text-[#0A1C3A]">
                          {packData.price.toFixed(2).replace('.', ',')} €
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          inkl. MwSt. &amp; Pfand ({packData.deposit.toFixed(2).replace('.', ',')} €)
                        </span>
                      </div>
                      <button
                        onClick={() => openProductDetail({ ...product.detail, imageSrc: displayImage, rawPrice: packData.price, price: `${packData.price.toFixed(2).replace('.', ',')} € (${currentSize}er-Pack)`, deposit: packData.deposit, cansCount: packData.count })}
                        className="text-xs text-[#0A1C3A] hover:underline font-bold flex items-center gap-1"
                      >
                        <Info className="w-3.5 h-3.5" /> Details
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        addToCart({
                          id: `${product.id}-${currentSize}pack`,
                          title: `${product.name} (${currentSize}er-Pack)`,
                          flavor: product.category === "juice" ? product.name : undefined,
                          packInfo: `${currentSize}er-Pack (${currentSize}x 250 ml)`,
                          price: packData.price,
                          cansCount: packData.count,
                          deposit: packData.deposit,
                          imageSrc: displayImage,
                        })
                      }
                      className="w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-md transition transform active:scale-98"
                    >
                      <ShoppingBag className="w-4 h-4 text-white" />
                      In den Warenkorb ({packData.price.toFixed(2).replace('.', ',')} €)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <SubtleWaveTransition variant="silver" />

        {/* Bundles Section */}
        {(activeTab === "all" || activeTab === "bundle") && (
          <div className="space-y-6 pt-6">
            <div className="space-y-2">
              <span className="text-xs text-[#0A1C3A] font-extrabold uppercase tracking-widest bg-white px-3.5 py-1 rounded-full border border-slate-300 inline-block">
                Besondere Sparangebote
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-[#0A1C3A]">
                EMPFOHLENE BUNDLES &amp; MIX-PAKETE
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bundle 1 */}
              <div id="bundle-12juices" className="bg-white rounded-2xl p-8 border border-slate-300 shadow-md flex flex-col justify-between hover:border-[#0A1C3A] transition">
                <div className="space-y-4">
                  <span className="bg-[#0A1C3A] text-white text-[10px] font-extrabold px-3 py-1 rounded-md uppercase">
                    100 % Vegan Fruchtsaft Mix
                  </span>
                  <h3 className="text-3xl font-black text-[#0A1C3A] uppercase">12x Juice Mix Bundle</h3>
                  <div className="text-3xl font-black text-[#0A1C3A]">
                    31,84 € <span className="text-xs font-normal text-slate-500 block">Inkl. 3,00 € Dosenpfand</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Der ideale Einstieg in alle 6 edlen Fruchtsaft-Kreationen (Blaubeere, Traube, Himbeere, Ingwer Tonic, Apfel Limette, Apfel Ingwer). 12 Aluminiumdosen à 250 ml.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-100 pt-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" /> Alle 6 fruchtigen Sorten im Paket
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" /> 100 % Vegan, 100 % BPA-Frei
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() =>
                    addToCart({
                      id: "bundle-12juices",
                      title: "Bundle 12x Juice Mix",
                      packInfo: "12 Dosen Fruchtsaft Mix (12x 250 ml)",
                      price: 31.84,
                      cansCount: 12,
                      deposit: 3.00,
                      imageSrc: JUICE_IMAGE_URL,
                    })
                  }
                  className="mt-6 w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-3.5 rounded-xl font-black uppercase text-xs tracking-wider shadow-md transition"
                >
                  Juice Mix bestellen (31,84 €)
                </button>
              </div>

              {/* Bundle 2 */}
              <div id="bundle-combo-48" className="bg-white rounded-2xl p-8 border-2 border-[#0A1C3A] shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#0A1C3A] text-white text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                  Bestseller Kombi
                </div>

                <div className="space-y-4">
                  <span className="bg-amber-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-md uppercase">
                    Maximale Frische
                  </span>
                  <h3 className="text-3xl font-black text-[#0A1C3A] uppercase">Großes Kombi-Paket (48 Dosen)</h3>
                  <div className="text-3xl font-black text-[#0A1C3A]">
                    142,96 € <span className="text-xs font-normal text-slate-500 block">Inkl. 12,00 € Dosenpfand</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    24x FONTES VITEA H₂-Wasserstoff-Wasser + 24x Fruchtsaft-Mix (insgesamt 48 Dosen à 250 ml). Der ultimative Vorrat für zelluläre Gesundheit und Fruchtgenuss.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-100 pt-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-600" /> 24x H₂-Wasserstoff-Wasser (≥ 2,8 mg/L H₂)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-600" /> 24x Fruchtsäfte (alle 6 Sorten)
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() =>
                    addToCart({
                      id: "bundle-combo-48",
                      title: "Großes Kombi-Paket (24x H2 Water + 24x Juice Mix)",
                      packInfo: "48 Dosen (24x H2 Water + 24x Juice Mix)",
                      price: 142.96,
                      cansCount: 48,
                      deposit: 12.00,
                      imageSrc: H2_24PACK_IMAGE_URL,
                    })
                  }
                  className="mt-6 w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-3.5 rounded-xl font-black uppercase text-xs tracking-wider shadow-lg transition"
                >
                  Kombi-Paket kaufen (142,96 €)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Unsere Buchempfehlung Section (placed right under Bundles) */}
        {(activeTab === "all" || activeTab === "bundle") && (
          <div id="buchempfehlung" className="space-y-6 pt-10 border-t border-slate-200">
            <div className="space-y-2">
              <span className="text-xs text-sky-900 bg-sky-100 font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full border border-sky-300 inline-block">
                Wissenschaft &amp; Literatur
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-[#0A1C3A]">
                UNSERE BUCHEMPFEHLUNG
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                Fachliteratur zu molekularem Wasserstoff, wissenschaftlichen Hintergründen und gesundheitlichen Potenzialen.
              </p>
            </div>

            {/* Premium Card Layout */}
            <div className="bg-[#0A1C3A] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Book Cover Visual */}
              <div className="relative w-48 sm:w-56 shrink-0 aspect-[1/1.5] bg-gradient-to-br from-[#0B1E3F] via-[#162B4E] to-[#0A1C3A] rounded-r-xl rounded-l-sm border-l-8 border-l-slate-400 border-t border-r border-b border-sky-400/40 shadow-2xl p-5 flex flex-col justify-between text-white overflow-hidden group">
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

              {/* Book Information & Affiliate CTA */}
              <div className="space-y-6 flex-1 text-center md:text-left z-10">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800">
                      Bestseller-Autorin Brigitte Hamann
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      Verlag: Kopp Verlag
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    Praxisbuch molekularer Wasserstoff
                  </h3>
                  <p className="text-sm font-semibold text-sky-300 italic">
                    Die natürliche Medizin der Zukunft
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  Sie möchten mehr über molekularen Wasserstoff erfahren? Das Praxisbuch von Brigitte Hamann bietet einen umfassenden Einblick in das Thema und beschäftigt sich mit wissenschaftlichen Hintergründen, Forschungsansätzen und möglichen Anwendungsgebieten.
                </p>

                <div className="space-y-4 pt-2">
                  <a
                    href="https://www.amazon.de/dp/3864455829?tag=fontesvitea-21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-[#0A1C3A] font-black uppercase text-xs sm:text-sm tracking-wider py-3.5 px-8 rounded-xl shadow-lg transition duration-200"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Buch bei Amazon ansehen</span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>

                  <p className="text-[11px] text-slate-400 italic leading-normal max-w-2xl">
                    *Hinweis: Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Wenn Sie auf den Button klicken und über diesen externen Link bestellen, erhalten wir eine kleine Provision. Der Preis für Sie bleibt unverändert.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <SubtleWaveTransition variant="pearl" />

        {/* Kinderserien Special Section (placed right under Bundles) */}
        {(activeTab === "all" || activeTab === "kids") && (
          <div id="kinderserien" className="space-y-6 pt-10 border-t border-slate-200">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs text-amber-900 bg-amber-100 font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full border border-amber-300 inline-block">
                  Kinderserie Special Edition
                </span>
                <span className="text-xs text-red-700 bg-red-100 font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-red-200 font-mono">
                  nicht vorrätig – ausverkauft
                </span>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-[#0A1C3A]">
                KINDERSERIEN SPECIAL
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                Unsere fröhliche Kinderserie in den 5 beliebten Sorten Gingerix, Limetix, Heidelberix, Himbeerixa und Apfelrix – 100 % frei von Zuckerzusatz und Konservierungsstoffen in 100 % BPA-freien Alu-Dosen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {KINDERSERIEN_PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  id={product.id}
                  className="bg-white rounded-2xl p-6 border border-slate-300 shadow-md flex flex-col justify-between hover:border-[#0A1C3A] hover:shadow-xl transition group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Image Box */}
                    <div
                      className="relative bg-[#f4f6f8] rounded-xl p-6 border border-slate-200 text-center cursor-pointer"
                      onClick={() => openProductDetail(product.detail)}
                    >
                      <span className="absolute top-3 left-3 bg-[#0A1C3A] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase z-10 shadow-xs">
                        {product.badge}
                      </span>
                      <span className="absolute top-3 right-3 bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded border border-red-300 z-10">
                        Ausverkauft
                      </span>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-44 object-contain mx-auto group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] text-[#0A1C3A] font-extrabold uppercase tracking-wider">Limitiertes Special</span>
                      <h3 className="text-2xl font-black text-[#0A1C3A] uppercase tracking-tight">{product.name}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Quick Bullet Specs */}
                    <div className="space-y-1.5 text-xs text-slate-700 bg-[#f8fafc] p-3 rounded-xl border border-slate-200">
                      {product.specs.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#0A1C3A] shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status & Details CTA */}
                  <div className="mt-6 pt-4 border-t border-slate-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded border border-red-200 uppercase tracking-wider">
                        nicht vorrätig – ausverkauft
                      </span>
                      <button
                        onClick={() => openProductDetail(product.detail)}
                        className="text-xs text-[#0A1C3A] hover:underline font-bold flex items-center gap-1"
                      >
                        <Info className="w-3.5 h-3.5" /> Details
                      </button>
                    </div>

                    <button
                      disabled
                      className="w-full bg-slate-200 text-slate-500 py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 border border-slate-300 cursor-not-allowed"
                    >
                      nicht vorrätig – ausverkauft
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <SubtleWaveTransition variant="iceblue" />

        {/* FREIGEGEBENE KUNDENBEWERTUNGEN UNTER DER KINDERSERIE */}
        <div id="kundenbewertungen-shop" className="pt-2">
          <CustomerReviewsSection
            title="Kundenbewertungen zu unseren Sorten &amp; Kinderserie"
            subtitle="Lesen Sie echte Kundenerfahrungen zu Geschmack, Inhaltsstoffen und Verträglichkeit."
            showOrderButton={true}
            showGoogleReviews={true}
          />
        </div>

        <SubtleWaveTransition variant="silver" />

        {/* Distributor Guarantee Banner */}
        <div className="bg-[#0A1C3A] text-white rounded-3xl p-8 sm:p-10 space-y-4 shadow-xl border border-slate-800">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-sky-400" />
            <h3 className="text-2xl font-black uppercase tracking-tight">FONTES VITEA – Qualität &amp; Vertrauen</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Als offizieller Vertriebspartner (Distributor) für Deutschland, Österreich und die Schweiz garantieren wir höchste Standards. Die Abfüllung erfolgt durch akkreditierte Produktionspartner in zertifizierten Anlagen. Sämtliche Dosen sind 100 % BPA-frei und unterliegen unabhängigen Laborprüfungen.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-sky-400">
            <Link to="/ueber-uns" className="hover:underline flex items-center gap-1">
              Mehr über uns &amp; Zertifikate erfahren <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
