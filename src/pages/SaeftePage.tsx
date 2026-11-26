import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  CheckCircle2,
  Leaf,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ArrowRight,
  Info,
  Building2,
  Utensils,
  Dumbbell,
  GraduationCap,
  PartyPopper,
  Shield,
  Recycle,
  X,
  Award,
  Zap,
  Flame,
  Heart,
  type LucideIcon,
  type LucideProps
} from "lucide-react";
import Media from "@/components/kit/Media";

// ─── DATA DEFINITIONS ────────────────────────────────────────────────────────

interface JuiceProduct {
  id: string;
  name: string;
  flavor: string;
  tagline: string;
  description: string;
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    buttonBg: string;
    badgeBg: string;
    starColor: string;
    barColor: string;
  };
  image: string;
  canVolume: string;
  packSizes: string[];
  tasteProfile: {
    sweetness: number; // 1-5
    acidity: number; // 1-5
    bitterness: number; // 1-5
    intensity: number; // 1-5
  };
  highlights: { title: string; desc: string; icon: LucideIcon }[];
  ingredients: string;
  nutrition: {
    energy: string;
    fat: string;
    fatSat: string;
    carbs: string;
    sugar: string;
    protein: string;
    salt: string;
    vitaminC?: string;
  };
}

const PREMIUM_JUICES: JuiceProduct[] = [
  {
    id: "blueberry",
    name: "Blueberry",
    flavor: "Heidelbeere",
    tagline: "Die Kraft der Beere",
    description:
      "100 % natürlich gepresster Heidelbeersaft – fruchtig-mild, reich an natürlichen Antioxidantien und wertvollen Pflanzenstoffen.",
    colorTheme: {
      bg: "bg-purple-900/10 hover:bg-purple-900/15",
      border: "border-purple-300/40",
      text: "text-purple-950",
      accent: "text-purple-700",
      buttonBg: "bg-purple-700 hover:bg-purple-800 text-white shadow-purple-900/20",
      badgeBg: "bg-purple-100 text-purple-800 border-purple-200",
      starColor: "text-purple-600",
      barColor: "bg-purple-600"
    },
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134384024-101x5eut.png",
    canVolume: "250 ml",
    packSizes: ["6er Pack", "12er Pack", "24er Pack"],
    tasteProfile: {
      sweetness: 4,
      acidity: 2,
      bitterness: 2,
      intensity: 5
    },
    highlights: [
      { title: "Reich an Antioxidantien", desc: "Zellschutz durch anthocyanreiche Beeren", icon: Sparkles },
      { title: "Stärkt das Wohlbefinden", desc: "Reiner Pflanzengenuss ohne Zusätze", icon: Heart },
      { title: "Natürlich fruchtig", desc: "Sonnengereifte Waldheidelbeeren", icon: Leaf }
    ],
    ingredients: "100 % Heidelbeerdirektsaft (aus kontrolliertem Anbau). Ohne Rohrzuckerzusatz.",
    nutrition: {
      energy: "198 kJ / 47 kcal",
      fat: "< 0,5 g",
      fatSat: "< 0,1 g",
      carbs: "11,2 g",
      sugar: "9,8 g",
      protein: "0,4 g",
      salt: "< 0,01 g",
      vitaminC: "12 mg (15% NRV)"
    }
  },
  {
    id: "raspberry",
    name: "Raspberry",
    flavor: "Himbeere",
    tagline: "Intensiv & Belebend",
    description:
      "Fruchtig-aromatischer Himbeersaft mit natürlicher Fruchtsäure – voller Geschmack und wertvoller Vitalstoffe.",
    colorTheme: {
      bg: "bg-rose-900/10 hover:bg-rose-900/15",
      border: "border-rose-300/40",
      text: "text-rose-950",
      accent: "text-rose-700",
      buttonBg: "bg-[#D81B60] hover:bg-[#C2185B] text-white shadow-rose-900/20",
      badgeBg: "bg-rose-100 text-rose-800 border-rose-200",
      starColor: "text-rose-600",
      barColor: "bg-[#D81B60]"
    },
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134073186-opauqy4r.png",
    canVolume: "250 ml",
    packSizes: ["6er Pack", "12er Pack", "24er Pack"],
    tasteProfile: {
      sweetness: 3,
      acidity: 4,
      bitterness: 1,
      intensity: 5
    },
    highlights: [
      { title: "Reich an Vitamin C", desc: "Unterstützt das Immunsystem natürlich", icon: Zap },
      { title: "Natürliche Antioxidantien", desc: "Aus frischen aromatischen Himbeeren", icon: ShieldCheck },
      { title: "Fruchtig-intensiv", desc: "Unverfälschtes Sommerbeeren-Aroma", icon: Sparkles }
    ],
    ingredients: "100 % Himbeerdirektsaft. Ohne Zuckerzusatz, ohne Konservierungsstoffe.",
    nutrition: {
      energy: "185 kJ / 44 kcal",
      fat: "< 0,5 g",
      fatSat: "< 0,1 g",
      carbs: "9,5 g",
      sugar: "8,2 g",
      protein: "0,6 g",
      salt: "< 0,01 g",
      vitaminC: "25 mg (31% NRV)"
    }
  },
  {
    id: "grape",
    name: "Grape",
    flavor: "Traube",
    tagline: "Der Klassiker",
    description:
      "Reiner, natürlich gepresster Traubensaft aus sonnenverwöhnten Weintrauben – fruchtig, ausgewogen und erfrischend lecker.",
    colorTheme: {
      bg: "bg-emerald-900/10 hover:bg-emerald-900/15",
      border: "border-emerald-300/40",
      text: "text-emerald-950",
      accent: "text-emerald-700",
      buttonBg: "bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-900/20",
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
      starColor: "text-emerald-600",
      barColor: "bg-emerald-600"
    },
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862677-cd34mdsd.png",
    canVolume: "250 ml",
    packSizes: ["6er Pack", "12er Pack", "24er Pack"],
    tasteProfile: {
      sweetness: 5,
      acidity: 2,
      bitterness: 1,
      intensity: 4
    },
    highlights: [
      { title: "Klassisch fruchtig", desc: "Voller Körper reifer Weintrauben", icon: Leaf },
      { title: "Natürlich mild", desc: "Ausgewogene Süße ohne Säurespitzen", icon: Heart },
      { title: "Vielseitig genießbar", desc: "Perfekt pur oder als Schorle", icon: Award }
    ],
    ingredients: "100 % Traubendirektsaft aus hellem Weintraubenmost.",
    nutrition: {
      energy: "280 kJ / 66 kcal",
      fat: "< 0,5 g",
      fatSat: "< 0,1 g",
      carbs: "16,0 g",
      sugar: "15,5 g",
      protein: "0,3 g",
      salt: "< 0,01 g"
    }
  },
  {
    id: "tonic-ginger",
    name: "Tonic Ginger",
    flavor: "Ingwer",
    tagline: "Würzige Frische",
    description:
      "100 % natürlicher Direktsaft mit belebender Schärfe von Ingwer – feurig, aktivieren und wohltuend.",
    colorTheme: {
      bg: "bg-amber-900/10 hover:bg-amber-900/15",
      border: "border-amber-300/40",
      text: "text-amber-950",
      accent: "text-amber-700",
      buttonBg: "bg-[#D97706] hover:bg-[#B45309] text-white shadow-amber-900/20",
      badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
      starColor: "text-amber-600",
      barColor: "bg-[#D97706]"
    },
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133989332-pq9c0ikc.png",
    canVolume: "250 ml",
    packSizes: ["6er Pack", "12er Pack", "24er Pack"],
    tasteProfile: {
      sweetness: 2,
      acidity: 3,
      bitterness: 4,
      intensity: 5
    },
    highlights: [
      { title: "Natürliche Belebung", desc: "Feuriges Gingerol für den Energieschub", icon: Flame },
      { title: "Angenehm würzig", desc: "Echte Frische frisch gepresster Knollen", icon: Sparkles },
      { title: "Harmonischer Geschmack", desc: "Fein ausbalancierte Schärfe", icon: CheckCircle2 }
    ],
    ingredients: "Direktsaftmischung (Apfel, 18% Ingwerdirektsaft, Zitrone). Ohne Zuckerzusatz.",
    nutrition: {
      energy: "160 kJ / 38 kcal",
      fat: "< 0,5 g",
      fatSat: "< 0,1 g",
      carbs: "8,8 g",
      sugar: "7,5 g",
      protein: "0,4 g",
      salt: "< 0,01 g"
    }
  },
  {
    id: "apple-ginger",
    name: "Apple & Ginger",
    flavor: "Apfel & Ingwer",
    tagline: "Natürlich Belebend",
    description:
      "Die perfekte Kombination aus mildem Apfelsaft und der natürlichen Schärfe von Ingwer – erfrischend, wärmend und harmonisch.",
    colorTheme: {
      bg: "bg-orange-900/10 hover:bg-orange-900/15",
      border: "border-orange-300/40",
      text: "text-orange-950",
      accent: "text-orange-700",
      buttonBg: "bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-orange-900/20",
      badgeBg: "bg-orange-100 text-orange-800 border-orange-200",
      starColor: "text-orange-600",
      barColor: "bg-[#EA580C]"
    },
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134384023-6vwzgda1.png",
    canVolume: "250 ml",
    packSizes: ["6er Pack", "12er Pack", "24er Pack"],
    tasteProfile: {
      sweetness: 4,
      acidity: 2,
      bitterness: 3,
      intensity: 4
    },
    highlights: [
      { title: "Natürliche Belebung", desc: "Milde Apfelsüße trifft Ingwerschärfe", icon: Flame },
      { title: "Angenehm würzig", desc: "Erfrischend und wärmend zugleich", icon: Leaf },
      { title: "Harmonischer Geschmack", desc: "Beliebt bei Groß und Klein", icon: Heart }
    ],
    ingredients: "85 % Apfeldirektsaft, 15 % Ingwerdirektsaft. 100% Natur purity.",
    nutrition: {
      energy: "195 kJ / 46 kcal",
      fat: "< 0,5 g",
      fatSat: "< 0,1 g",
      carbs: "10,8 g",
      sugar: "9,9 g",
      protein: "0,2 g",
      salt: "< 0,01 g"
    }
  },
  {
    id: "apple-lime",
    name: "Apple & Lime",
    flavor: "Apfel & Limette",
    tagline: "Frisch & Spritzig",
    description:
      "Milder Apfelsaft trifft auf die erfrischende Note sonnengereifter Limetten – eine natürlich-fruchtige Erfrischung.",
    colorTheme: {
      bg: "bg-lime-900/10 hover:bg-lime-900/15",
      border: "border-lime-300/40",
      text: "text-lime-950",
      accent: "text-lime-700",
      buttonBg: "bg-[#15803D] hover:bg-[#166534] text-white shadow-lime-900/20",
      badgeBg: "bg-lime-100 text-lime-800 border-lime-200",
      starColor: "text-lime-600",
      barColor: "bg-[#15803D]"
    },
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134219308-nr3iwk4m.png",
    canVolume: "250 ml",
    packSizes: ["6er Pack", "12er Pack", "24er Pack"],
    tasteProfile: {
      sweetness: 3,
      acidity: 4,
      bitterness: 2,
      intensity: 4
    },
    highlights: [
      { title: "Erfrischend & leicht", desc: "Spritziger Durstlöscher an heißen Tagen", icon: Zap },
      { title: "Unterstützt die Vitalität", desc: "Reich an natürlicher Zitronensäure", icon: ShieldCheck },
      { title: "Natürlich süß-säuerlich", desc: "Perfekte Citrus-Apfel-Balance", icon: Sparkles }
    ],
    ingredients: "90 % Apfeldirektsaft, 10 % Limettendirektsaft.",
    nutrition: {
      energy: "188 kJ / 45 kcal",
      fat: "< 0,5 g",
      fatSat: "< 0,1 g",
      carbs: "10,2 g",
      sugar: "9,4 g",
      protein: "0,2 g",
      salt: "< 0,01 g"
    }
  }
];

const FEATURES_10 = [
  { label: "100 % natürlich", sub: "Schonend gepresst", icon: Leaf },
  { label: "Vegan", sub: "Rein pflanzlich", icon: CheckCircle2 },
  { label: "Ohne Zuckerzusatz", sub: "Nur Fruchteigene Süße", icon: Sparkles },
  { label: "Ohne Aspartam", sub: "Keine Süßstoffe", icon: ShieldCheck },
  { label: "Ohne künstliche Süßstoffe", sub: "100% Unverfälscht", icon: Heart },
  { label: "Ohne Konservierungsstoffe", sub: "Frische durch Sterilabfüllung", icon: Shield },
  { label: "Ohne Stabilisatoren", sub: "Reine Natur", icon: Award },
  { label: "Ohne Emulgatoren", sub: "Keine Chemie", icon: Info },
  { label: "BPANI-Schutzbeschichtung", sub: "100% BPA-Frei", icon: LockIcon },
  { label: "Recycelbare Dose", sub: "Nachhaltiges Aluminium", icon: Recycle }
];

function LockIcon(props: LucideProps) {
  return <ShieldCheck {...props} />;
}

const USE_CASES = [
  {
    title: "Gastronomie & Hotellerie",
    desc: "Edler Begleiter im Restaurant, Frühstücksbuffet und exklusiven Barbereich.",
    icon: Utensils,
    color: "from-amber-500/20 to-orange-500/10 border-amber-300/40 text-amber-900"
  },
  {
    title: "Büro & Unternehmen",
    desc: "Gesundes Getränkeangebot für Konferenzräume, Mitarbeiter & geschäftliche Gäste.",
    icon: Building2,
    color: "from-blue-500/20 to-indigo-500/10 border-blue-300/40 text-blue-900"
  },
  {
    title: "Sport & Fitness",
    desc: "Natürliche Energie & Erfrischung vor oder nach dem intensivem Workout.",
    icon: Dumbbell,
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-300/40 text-emerald-900"
  },
  {
    title: "Schulen & Bildung",
    desc: "Fruchtiger Naturgenuss ohne Rohrzuckerzusatz für Kinder und Jugendliche.",
    icon: GraduationCap,
    color: "from-purple-500/20 to-pink-500/10 border-purple-300/40 text-purple-900"
  },
  {
    title: "Events & Veranstaltungen",
    desc: "Der stilvolle Hingucker auf Messen, Catering-Events & feierlichen Anlässen.",
    icon: PartyPopper,
    color: "from-rose-500/20 to-amber-500/10 border-rose-300/40 text-rose-900"
  },
  {
    title: "Einzelhandel & Kioske",
    desc: "Attraktives Premium-Getränk im Kühlregal für qualitätsbewusste Konsumenten.",
    icon: ShoppingBag,
    color: "from-sky-500/20 to-cyan-500/10 border-sky-300/40 text-sky-900"
  }
];

const KIDS_CANS = [
  {
    id: "himbeerixa",
    name: "Himbeerixa",
    flavor: "Himbeere",
    role: "Die Sammlerin & Forscherin",
    desc: "Fruchtige Himbeere mit natürlicher Frische. Der Liebling kleiner Entdecker!",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216740-l82r4ka1.png",
    color: "bg-rose-50/90 border-rose-200 text-rose-900",
    badgeBg: "bg-rose-600 text-white"
  },
  {
    id: "heidelberix",
    name: "Heidelberix",
    flavor: "Heidelbeere",
    role: "Der Anführer",
    desc: "Köstlicher Heidelbeer-Direktsaft für mutige Abenteurer und schlaue Köpfe.",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216738-2s53ficu.png",
    color: "bg-purple-50/90 border-purple-200 text-purple-900",
    badgeBg: "bg-purple-600 text-white"
  },
  {
    id: "apfelrix",
    name: "Apfelrix",
    flavor: "Apfel",
    role: "Der Kartograf",
    desc: "Knackig-süßer Apfelsaft aus heimischen Früchten – purer Naturgenuss.",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216735-kk46ygff.png",
    color: "bg-red-50/90 border-red-200 text-red-900",
    badgeBg: "bg-red-600 text-white"
  },
  {
    id: "ingwerix",
    name: "Ingwerix",
    flavor: "Ingwer Tonic",
    role: "Der Historiker",
    desc: "Milder Apfel mit mohniger Ingwernote – kinderfreundlich ausbalanciert.",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216737-r3370ev4.png",
    color: "bg-amber-50/90 border-amber-200 text-amber-900",
    badgeBg: "bg-amber-600 text-white"
  },
  {
    id: "limetix",
    name: "Limetix",
    flavor: "Limette mit Apfel",
    role: "Der Fruchtexperte",
    desc: "Spritzig-frischer Apfel-Limette-Mix für den ultimativen Erfrischungskick.",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216742-q4yi2mw1.png",
    color: "bg-lime-50/90 border-lime-200 text-lime-900",
    badgeBg: "bg-lime-600 text-white"
  }
];

interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  tagline: string;
  summary: string;
  fullStory: string;
  favoriteFruit: string;
  image: string;
  colorTheme: string;
  btnBg: string;
}

const CHARACTERS: CharacterProfile[] = [
  {
    id: "himbeerixxa",
    name: "Himbeerixxa",
    role: "Die Sammlerin & Forscherin",
    tagline: "Neugierig, mutig und immer auf der Suche nach den besten Himbeeren.",
    summary: "Himbeerixxa kennt jeden Winkel des magischen Fruchtwaldes. Mit ihrer Lupe spürt sie die saftigsten Himbeeren auf.",
    fullStory:
      "Himbeerixxa ist die schlaueste Forscherin im Fruchtwald. Wo immer seltene Beeren wachsen, findet sie den Weg! Mit ihrer magischen Lupe prüft sie die Sonne auf den Früchten und sorgt dafür, dass nur die frischesten Himbeeren geerntet werden. Ihr Motto: Natur pur ist das größte Abenteuer!",
    favoriteFruit: "Sonnengereifte Himbeeren",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216740-l82r4ka1.png",
    colorTheme: "bg-rose-50 border-rose-300 text-rose-950",
    btnBg: "bg-[#D81B60] hover:bg-[#C2185B]"
  },
  {
    id: "heidelberix",
    name: "Heidelberix",
    role: "Der Anführer",
    tagline: "Clever, sportlich und ein echter Teamplayer mit großem Entdeckergeist.",
    summary: "Er leitet die Truppe der Frucht-Entdecker mit Mut und Weitsicht durch jedes noch so wilde Abenteuer.",
    fullStory:
      "Heidelberix liebt den Sport und die freie Natur. Als Anführer der Frucht-Entdecker hat er stets einen klaren Kopf und motiviert das ganze Team. Seine Lieblingsbeere, die blaue Heidelbeere, spendet ihm die nötige Energie für rasante Abenteuer in den Bergen.",
    favoriteFruit: "Wilde Wald-Heidelbeeren",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216738-2s53ficu.png",
    colorTheme: "bg-purple-50 border-purple-300 text-purple-950",
    btnBg: "bg-purple-700 hover:bg-purple-800"
  },
  {
    id: "apfelrix",
    name: "Apfelrix",
    role: "Der Kartograf",
    tagline: "Erkundet neue Orte, zeichnet Karten und liebt knackige Äpfel.",
    summary: "Mit Kompass und Pergament zeichnet Apfelrix die Pfade durch die geheimnisvollen Fruchtwelten.",
    fullStory:
      "Kein Weg ist Apfelrix zu weit. Als meisterhafter Kartograf zeichnet er genaue Landkarten für die Truppe. Ein knackiger roter Apfel ist seine liebste Stärkung auf langen Wanderungen über wogende Wiesen und Hügel.",
    favoriteFruit: "Knackige rote Äpfel",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216735-kk46ygff.png",
    colorTheme: "bg-orange-50 border-orange-300 text-orange-950",
    btnBg: "bg-[#EA580C] hover:bg-[#C2410C]"
  },
  {
    id: "ingwerix",
    name: "Ingwerix",
    role: "Der Historiker",
    tagline: "Kennt spannende Geschichten und das Geheimnis des Ingwers.",
    summary: "Der weise Kopf der Gruppe liest in alten Schriften und weiß alles über die Kraft der Wurzeln.",
    fullStory:
      "Ingwerix trägt ein altes Buch voller Geschichten mit sich. Er weiß exakt, wie wertvoll die Ingwerwurzel seit Jahrtausenden für Wohlbefinden und Vitalität ist. Seine spannenden Erzählungen am Lagerfeuer begeistert alle Entdecker.",
    favoriteFruit: "Frische Ingwerwurzel & Apfel",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216737-r3370ev4.png",
    colorTheme: "bg-amber-50 border-amber-300 text-amber-950",
    btnBg: "bg-[#D97706] hover:bg-[#B45309]"
  },
  {
    id: "limetix",
    name: "Limetix",
    role: "Der Fruchtexperte",
    tagline: "Der Experte für besondere Früchte und frische Limetten.",
    summary: "Limetix zaubert mit feiner Limettennote die spritzigste Erfrischung in jede Entdeckertour.",
    fullStory:
      "Limetix ist der Gourmet unter den Entdeckern. Mit geschultem Geschmackssinn findet er die saftigsten grünen Limetten und kombiniert sie mit mildem Apfelsaft. Sein Ergebnis ist eine natürliche Erfrischung, die alle strahlen lässt!",
    favoriteFruit: "Sonnige grüne Limetten",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216742-q4yi2mw1.png",
    colorTheme: "bg-lime-50 border-lime-300 text-lime-950",
    btnBg: "bg-[#15803D] hover:bg-[#166534]"
  }
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function SaeftePage() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [selectedPacks, setSelectedPacks] = useState<Record<string, string>>({
    blueberry: "12er Pack",
    raspberry: "12er Pack",
    grape: "12er Pack",
    "tonic-ginger": "12er Pack",
    "apple-ginger": "12er Pack",
    "apple-lime": "12er Pack"
  });
  const [activeCharacter, setActiveCharacter] = useState<CharacterProfile | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-slate-900 font-sans pb-20">
      
      {/* ─── 1. HERO BANNER SECTION ─────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 pb-10 sm:pb-14 overflow-hidden bg-gradient-to-b from-[#0A1C3A] via-[#0F2852] to-[#FFFDF7]">
        {/* Subtle glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-400/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          
          {/* Header Tagline & Brand Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>FONTES VITAE® Premium Direktsäfte</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase"
          >
            PREMIUM FRUCHTGENUSS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-lg sm:text-xl text-amber-100/90 font-medium max-w-2xl mx-auto italic"
          >
            „Von der Natur inspiriert. Mit Leidenschaft verfeinert.“
          </motion.p>

          {/* Large Hero Banner Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 sm:mt-8 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-amber-200/40 bg-slate-900/40 backdrop-blur-md group"
          >
            <Media
              src="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795660656824-z8f97335.png"
              alt="FONTES VITAE Premium Fruchtsäfte Banner"
              className="w-full h-auto object-cover max-h-[520px] transition-transform duration-700 group-hover:scale-[1.01]"
            />
          </motion.div>

          {/* Quick Jump & Shop Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#saefte-detail"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition transform active:scale-95"
            >
              <span>Unsere Säfte entdecken</span>
              <ChevronDown className="w-4 h-4" />
            </a>
            <a
              href="https://shop.fontes-vitae.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0A1C3A] hover:bg-[#061226] text-white font-bold text-sm uppercase tracking-wider border border-amber-300/40 shadow-lg transition transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>Direkt zum Shop</span>
            </a>
          </motion.div>

        </div>
      </section>

      {/* ─── 2. SECHS PREMIUM-SÄFTE IM DETAIL ───────────────────────────────── */}
      <section id="saefte-detail" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Sortiments-Übersicht
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1C3A] tracking-tight">
            Unsere Premium-Säfte im Detail
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Entdecke unsere sechs Premium-Säfte – natürlich, fruchtig und voller erstklassigem Geschmack.
          </p>
        </div>

        {/* List of 6 Juices */}
        <div className="space-y-8">
          {PREMIUM_JUICES.map((juice, idx) => {
            const isAccordionOpen = openAccordion === juice.id;
            const currentPack = selectedPacks[juice.id] || "12er Pack";

            return (
              <motion.div
                key={juice.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`rounded-2xl sm:rounded-3xl border ${juice.colorTheme.border} ${juice.colorTheme.bg} p-5 sm:p-8 transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Can Presentation (Double View) */}
                  <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
                    <div className="relative group">
                      {/* Glow backdrop */}
                      <div className="absolute inset-0 bg-white/60 blur-2xl rounded-full scale-110 pointer-events-none" />
                      
                      {/* Can Image (Front & Back stacked representation) */}
                      <div className="relative flex items-center justify-center py-2">
                        <Media
                          src={juice.image}
                          alt={`FONTES VITAE ${juice.name} ${juice.flavor} Dose`}
                          className="h-64 sm:h-72 w-auto object-contain filter drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Slight offset second can for double view feel */}
                        <Media
                          src={juice.image}
                          alt={`FONTES VITAE ${juice.name} Rückseite`}
                          className="h-56 sm:h-64 w-auto object-contain filter drop-shadow-lg -ml-12 opacity-85 hover:opacity-100 transition-opacity hidden sm:block"
                        />
                      </div>
                    </div>

                    {/* Can Volume Badge */}
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-xs font-extrabold text-slate-800 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Füllmenge: {juice.canVolume}</span>
                    </div>
                  </div>

                  {/* Right Column: Details & Taste Profile */}
                  <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                    
                    {/* Header info */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${juice.colorTheme.badgeBg}`}>
                          {juice.flavor}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          100 % Direktsaft
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-[#0A1C3A] tracking-tight">
                        {juice.name} <span className="font-normal text-slate-600">– {juice.flavor}</span>
                      </h3>
                      <p className={`text-xs sm:text-sm font-semibold ${juice.colorTheme.accent} mt-0.5 italic`}>
                        {juice.tagline}
                      </p>
                      
                      <p className="mt-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                        {juice.description}
                      </p>
                    </div>

                    {/* Highlights Grid (3 pills) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {juice.highlights.map((hl, hIdx) => {
                        const Icon = hl.icon;
                        return (
                          <div
                            key={hIdx}
                            className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-white/90 shadow-2xs flex items-start gap-2.5"
                          >
                            <div className={`p-1.5 rounded-lg ${juice.colorTheme.badgeBg} shrink-0`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">{hl.title}</p>
                              <p className="text-[11px] text-slate-600 leading-tight mt-0.5">{hl.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Taste Profile Indicators (Süße, Säure, Herbheit, Intensität) */}
                    <div className="bg-white/70 backdrop-blur-xs p-4 rounded-xl border border-white/80 shadow-2xs">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Geschmacksprofil
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        
                        {/* Süße */}
                        <div>
                          <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                            <span>Süße</span>
                            <span>{juice.tasteProfile.sweetness}/5</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${juice.colorTheme.barColor} transition-all duration-500`}
                              style={{ width: `${(juice.tasteProfile.sweetness / 5) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Säure */}
                        <div>
                          <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                            <span>Säure</span>
                            <span>{juice.tasteProfile.acidity}/5</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${juice.colorTheme.barColor} transition-all duration-500`}
                              style={{ width: `${(juice.tasteProfile.acidity / 5) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Herbheit */}
                        <div>
                          <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                            <span>Herbheit</span>
                            <span>{juice.tasteProfile.bitterness}/5</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${juice.colorTheme.barColor} transition-all duration-500`}
                              style={{ width: `${(juice.tasteProfile.bitterness / 5) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Geschmacksintensität */}
                        <div>
                          <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                            <span>Intensität</span>
                            <span>{juice.tasteProfile.intensity}/5</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${juice.colorTheme.barColor} transition-all duration-500`}
                              style={{ width: `${(juice.tasteProfile.intensity / 5) * 100}%` }}
                            />
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Pack Sizes & CTA Button */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-slate-200/60">
                      
                      {/* Pack selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Packung:</span>
                        <div className="flex gap-1.5">
                          {juice.packSizes.map((pack) => {
                            const isSelected = currentPack === pack;
                            return (
                              <button
                                key={pack}
                                type="button"
                                onClick={() =>
                                  setSelectedPacks((prev) => ({ ...prev, [juice.id]: pack }))
                                }
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                                  isSelected
                                    ? `${juice.colorTheme.buttonBg} shadow-xs`
                                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                                }`}
                              >
                                {pack}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Expandable Info Toggle & Shop CTA */}
                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleAccordion(juice.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/90 text-slate-800 text-xs font-bold border border-slate-300 hover:bg-white transition"
                        >
                          <Info className="w-3.5 h-3.5 text-slate-600" />
                          <span>Zutaten & Nährwerte</span>
                          {isAccordionOpen ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-600" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                          )}
                        </button>

                        <a
                          href="https://shop.fontes-vitae.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition transform active:scale-95 shadow-md ${juice.colorTheme.buttonBg}`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Zum Shop</span>
                        </a>
                      </div>
                    </div>

                    {/* Accordion Content (Zutaten & Nährwerte) */}
                    <AnimatePresence>
                      {isAccordionOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-inner mt-3"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-800">
                            
                            {/* Zutaten */}
                            <div>
                              <h5 className="font-extrabold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5 text-xs">
                                <Leaf className="w-4 h-4 text-emerald-600" />
                                Zutaten
                              </h5>
                              <p className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed text-slate-700">
                                {juice.ingredients}
                              </p>
                              <p className="mt-2 text-[11px] text-slate-500 italic">
                                * Ohne künstliche Zusätze, ohne Aspartam, ohne Konservierungsstoffe.
                              </p>
                            </div>

                            {/* Nährwertangaben pro 100 ml */}
                            <div>
                              <h5 className="font-extrabold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5 text-xs">
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                Nährwerte pro 100 ml
                              </h5>
                              <div className="bg-slate-50 rounded-xl border border-slate-200/80 overflow-hidden divide-y divide-slate-200/60">
                                <div className="flex justify-between px-3 py-1.5">
                                  <span className="font-semibold text-slate-600">Brennwert:</span>
                                  <span className="font-bold text-slate-900">{juice.nutrition.energy}</span>
                                </div>
                                <div className="flex justify-between px-3 py-1.5">
                                  <span className="font-semibold text-slate-600">Fett:</span>
                                  <span className="font-bold text-slate-900">{juice.nutrition.fat}</span>
                                </div>
                                <div className="flex justify-between px-3 py-1.5 pl-5 text-[11px]">
                                  <span className="text-slate-500">davon gesättigte Fettsäuren:</span>
                                  <span className="font-semibold text-slate-800">{juice.nutrition.fatSat}</span>
                                </div>
                                <div className="flex justify-between px-3 py-1.5">
                                  <span className="font-semibold text-slate-600">Kohlenhydrate:</span>
                                  <span className="font-bold text-slate-900">{juice.nutrition.carbs}</span>
                                </div>
                                <div className="flex justify-between px-3 py-1.5 pl-5 text-[11px]">
                                  <span className="text-slate-500">davon fruchteigener Zucker:</span>
                                  <span className="font-semibold text-slate-800">{juice.nutrition.sugar}</span>
                                </div>
                                <div className="flex justify-between px-3 py-1.5">
                                  <span className="font-semibold text-slate-600">Eiweiß:</span>
                                  <span className="font-bold text-slate-900">{juice.nutrition.protein}</span>
                                </div>
                                <div className="flex justify-between px-3 py-1.5">
                                  <span className="font-semibold text-slate-600">Salz:</span>
                                  <span className="font-bold text-slate-900">{juice.nutrition.salt}</span>
                                </div>
                                {juice.nutrition.vitaminC && (
                                  <div className="flex justify-between px-3 py-1.5 bg-amber-50 text-amber-900">
                                    <span className="font-extrabold">Vitamin C:</span>
                                    <span className="font-extrabold">{juice.nutrition.vitaminC}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* ─── 3. BESONDERHEITEN UNSERER SÄFTE (10 ICON-GRID) ───────────────────── */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 border-y border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="px-3 py-1 rounded-full bg-[#0A1C3A] text-amber-300 text-xs font-bold uppercase tracking-wider inline-block mb-2">
              Warum unsere Säfte so besonders sind?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1C3A] tracking-tight">
              100 % Natur & Höchste Qualitätsstandards
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Unverfälschter Fruchtgenuss in einer nachhaltigen Premium-Verpackung.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {FEATURES_10.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs hover:shadow-md transition text-center flex flex-col items-center justify-center group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-[#0A1C3A] flex items-center justify-center mb-3 group-hover:bg-[#0A1C3A] group-hover:text-amber-300 transition duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                    {feat.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">{feat.sub}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── 4. EINSATZBEREICHE & ANWENDUNGSGEBIETE ─────────────────────────── */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider inline-block mb-2">
            Vielseitige Einsatzbereiche
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1C3A] tracking-tight">
            Perfekt für jeden Anlass & jedes Umfeld
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Unsere Säfte sind die ideale, natürliche Erfrischung – perfekt für viele Gelegenheiten:
          </p>
        </div>

        {/* Desktop Grid (3 columns) / Mobile Horizontal Swipe Carousel without visible scrollbar */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {USE_CASES.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`min-w-[82vw] sm:min-w-[280px] md:min-w-0 snap-center shrink-0 rounded-2xl bg-gradient-to-br ${uc.color} border p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/90 text-[#0A1C3A] flex items-center justify-center mb-4 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {uc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {uc.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-300/40 flex items-center justify-between text-xs font-bold text-[#0A1C3A]">
                  <span>Premium Partner</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* ─── 5. DIE FRUCHT-ENTDECKER (GROSSFLÄCHIGES BANNER) ────────────────── */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border-2 border-amber-300/80 shadow-2xl group bg-amber-950/20"
        >
          <Media
            src="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795660656826-jcetsu9g.png"
            alt="Die Frucht-Entdecker Originalbanner"
            className="w-full h-auto object-cover max-h-[550px] transition-transform duration-700 group-hover:scale-[1.01]"
          />
        </motion.div>
      </section>

      {/* ─── 6. UNSERE KINDERSERIE ─────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/60 border-t border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="px-3.5 py-1.5 rounded-full bg-rose-600 text-white text-xs font-extrabold uppercase tracking-wider inline-block mb-3 shadow-sm">
              Demnächst Erhältlich
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A1C3A] tracking-tight">
              Unsere Kinderserie – Die Frucht-Entdecker®
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Spannend, lehrreich und natürlich fruchtig! Speziell entwickelte Rezepturen in 5 tollen Geschmacksrichtungen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {KIDS_CANS.map((can, idx) => (
              <motion.div
                key={can.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className={`rounded-2xl border ${can.color} p-5 flex flex-col items-center text-center justify-between shadow-xs hover:shadow-md transition`}
              >
                <div className="w-full flex flex-col items-center">
                  
                  {/* Status Badge */}
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-3 ${can.badgeBg}`}>
                    Demnächst
                  </span>

                  {/* Can image */}
                  <div className="relative my-2 py-2 group">
                    <Media
                      src={can.image}
                      alt={`Kinderserie ${can.name} Dose`}
                      className="h-48 w-auto object-contain filter drop-shadow-md group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mt-2">
                    {can.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-600 mt-0.5">
                    {can.flavor}
                  </p>
                  <p className="text-[11px] font-medium text-slate-500 italic mt-0.5">
                    {can.role}
                  </p>

                  <p className="text-xs text-slate-700 mt-3 leading-relaxed">
                    {can.desc}
                  </p>
                </div>

                <div className="w-full mt-4 pt-3 border-t border-slate-200/80 flex flex-col gap-1.5 text-[11px]">
                  <div className="flex items-center justify-center gap-1 font-semibold text-slate-700">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Füllmenge: 250 ml</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-slate-600">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Ohne Zuckerzusatz</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 7. WER SIND DIE FRUCHT-ENTDECKER? (FIGUREN-PROFILE) ───────────── */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3.5 py-1.5 rounded-full bg-[#0A1C3A] text-amber-300 text-xs font-extrabold uppercase tracking-wider inline-block mb-3">
            Charaktere & Geschichten
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A1C3A] tracking-tight">
            Die Figuren der Frucht-Entdecker® – Ihre Profile
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Lerne die fünf mutigen Helden kennen! Klicke auf ein Profil, um mehr über ihre Abenteuer zu erfahren.
          </p>
        </div>

        {/* 5 Character Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CHARACTERS.map((char, idx) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className={`rounded-2xl border ${char.colorTheme} p-5 flex flex-col items-center text-center justify-between shadow-xs hover:shadow-lg transition group`}
            >
              <div className="w-full flex flex-col items-center">
                
                {/* Character Circular Avatar / Image */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md mb-3 bg-white flex items-center justify-center p-1 group-hover:scale-105 transition duration-300">
                  <Media
                    src={char.image}
                    alt={char.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-lg font-black text-slate-900">
                  {char.name}
                </h3>
                <p className="text-xs font-bold text-amber-700 mt-0.5">
                  {char.role}
                </p>

                <p className="text-xs text-slate-700 mt-3 leading-relaxed">
                  {char.summary}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveCharacter(char)}
                className={`mt-5 w-full py-2 px-3 rounded-xl text-white font-bold text-xs uppercase tracking-wider shadow-xs transition transform active:scale-95 flex items-center justify-center gap-1.5 ${char.btnBg}`}
              >
                <span>Zum Profil</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </motion.div>
          ))}
        </div>

      </section>

      {/* ─── CHARACTER PROFILE MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {activeCharacter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveCharacter(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                aria-label="Schließen"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 rounded-full border-4 border-amber-300 shadow-lg p-2 bg-gradient-to-b from-amber-50 to-amber-100 mb-4">
                  <Media
                    src={activeCharacter.image}
                    alt={activeCharacter.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1">
                  {activeCharacter.role}
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-[#0A1C3A]">
                  {activeCharacter.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-amber-700 italic mt-1">
                  „{activeCharacter.tagline}“
                </p>

                <div className="my-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-left text-xs sm:text-sm text-slate-800 leading-relaxed">
                  <p className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Die Geschichte von {activeCharacter.name}:
                  </p>
                  <p className="mt-1 text-slate-700">{activeCharacter.fullStory}</p>
                  
                  <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Lieblingsfrucht:</span>
                    <span className="font-bold text-amber-900">{activeCharacter.favoriteFruit}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCharacter(null)}
                  className="w-full py-3 rounded-xl bg-[#0A1C3A] hover:bg-[#061226] text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  Profil Schließen
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
