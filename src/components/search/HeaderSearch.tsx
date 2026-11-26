import { useState, useRef, useEffect, useCallback, useId } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  X,
  ArrowRight,
  Package,
  Sparkles,
  ShieldCheck,
  Info,
  GraduationCap,
  Phone,
  FileText,
  Users,
} from "lucide-react";

interface SearchItem {
  id: string;
  title: string;
  category: "Produkt" | "Quelle" | "Vorteile" | "Über uns" | "Technologie" | "Wissenschaft" | "Kontakt" | "Rechtliches";
  description: string;
  keywords: string[];
  href: string;
  icon: typeof Package;
}

const SYNONYMS_MAP: Record<string, string[]> = {
  blueberry: ["blaubeere", "heidelbeere", "heidelbeeren", "blueberries", "beere"],
  blaubeere: ["blueberry", "heidelbeere", "heidelbeeren", "blueberries", "beere"],
  heidelbeere: ["blueberry", "blaubeere", "heidelbeeren", "blueberries", "beere"],
  heidelbeeren: ["blueberry", "blaubeere", "heidelbeere", "blueberries", "beere"],

  zertifikat: ["zertifikate", "laboranalyse", "laboranalysen", "labor", "iso", "qualitätsnachweis", "bpa-frei", "akkreditiert"],
  zertifikate: ["zertifikat", "laboranalyse", "laboranalysen", "labor", "iso", "qualitätsnachweis", "bpa-frei", "akkreditiert"],
  laboranalyse: ["laboranalysen", "zertifikat", "zertifikate", "labor", "prüflabor", "analyse", "iso 17025"],
  laboranalysen: ["laboranalyse", "zertifikat", "zertifikate", "labor", "prüflabor", "analyse", "iso 17025"],
  labor: ["laboranalyse", "laboranalysen", "zertifikat", "zertifikate", "prüflabor", "analyse"],

  partner: ["partnernetzwerk", "b2b", "partner werden", "vertriebspartner", "distributor", "großhandel", "b2b-partner", "händler"],
  partnernetzwerk: ["partner", "b2b", "partner werden", "vertriebspartner", "distributor", "b2b-partner", "großhandel"],
  b2b: ["partner", "partnernetzwerk", "partner werden", "vertriebspartner", "distributor", "großhandel", "b2b-partner"],
  "partner werden": ["partner", "partnernetzwerk", "b2b", "vertriebspartner", "distributor", "großhandel"],

  saft: ["fruchtsaft", "direktsaft", "juice"],
  fruchtsaft: ["saft", "direktsaft", "juice"],
  juice: ["saft", "fruchtsaft", "direktsaft"],

  ingwer: ["ginger", "ginger tonic"],
  ginger: ["ingwer", "ginger tonic"],

  himbeere: ["raspberry", "himbeeren"],
  raspberry: ["himbeere", "himbeeren"],

  traube: ["grape", "weintraube"],
  grape: ["traube", "weintraube"],

  apfel: ["apple"],
  apple: ["apfel"],
};

const SEARCH_DATABASE: SearchItem[] = [
  {
    id: "prod-h2-wasser",
    title: "FONTES VITAE H2 Wasserstoff-Wasser",
    category: "Produkt",
    description: "Reinste zelluläre Hydration mit mindestens 2,8 mg/L gelöstem molekularem Wasserstoff (H₂). 0 kcal, 0 g Zucker, BPA-Frei.",
    keywords: [
      "wasserstoff", "h2", "wasser", "dose", "aludose", "shop", "kaufen", "bestellen",
      "einzeldose", "2.8 mg", "2,8 mg", "0 kcal", "zuckerfrei", "original", "hydrogen",
      "hydrogen water", "quellwasser", "dosen", "gehalt", "mineralwasser"
    ],
    href: "https://shop.fontes-vitae.com",
    icon: Package,
  },
  {
    id: "page-saefte",
    title: "FONTES VITAE® Premium Säfte & Frucht-Entdecker",
    category: "Produkt",
    description: "6 edle Direktsaft-Kreationen (Blueberry, Raspberry, Grape, Tonic Ginger, Apple & Ginger, Apple & Lime) sowie die Kinderserie Frucht-Entdecker®.",
    keywords: [
      "säfte", "saefte", "saft", "fruchtsaft", "direktsaft", "fruchtgenuss", "blueberry", "raspberry",
      "grape", "tonic ginger", "apple ginger", "apple lime", "frucht-entdecker", "kinderserie", "heidelbeere",
      "himbeere", "traube", "ingwer", "apfel", "limette"
    ],
    href: "/saefte",
    icon: Sparkles,
  },
  {
    id: "prod-juice-blaubeere",
    title: "Blaubeere (Blueberry / Heidelbeere) – Vital-Fruchtsaft",
    category: "Produkt",
    description: "Köstlicher Direktsaft aus sonnengereiften Blaubeeren (Heidelbeeren). Reich an pflanzlichen Antioxidantien, 100% Vegan & BPA-Frei.",
    keywords: [
      "blaubeere", "blueberry", "heidelbeere", "heidelbeeren", "beere", "beeren",
      "fruchtsaft", "direktsaft", "saft", "blaubeersaft", "heidelbeersaft", "blueberries",
      "geschmack", "sorte", "juice"
    ],
    href: "https://shop.fontes-vitae.com",
    icon: Package,
  },
  {
    id: "prod-juice-traube",
    title: "Traube (Grape) – Vital-Fruchtsaft",
    category: "Produkt",
    description: "Edler Traubensaft aus sonnenverwöhnten Weintrauben. Natursüß, reich an Polyphenolen und BPA-Frei.",
    keywords: [
      "traube", "grape", "weintraube", "weintrauben", "traubensaft", "fruchtsaft",
      "direktsaft", "saft", "grapes", "geschmack", "sorte", "juice"
    ],
    href: "https://shop.fontes-vitae.com",
    icon: Package,
  },
  {
    id: "prod-juice-himbeere",
    title: "Himbeere (Raspberry) – Vital-Fruchtsaft",
    category: "Produkt",
    description: "Fruchtiges Himbeer-Erlebnis voller natürlicher Frische und Vitalität. In BPA-freien Aluminiumdosen.",
    keywords: [
      "himbeere", "raspberry", "himbeeren", "himbeersaft", "beere", "fruchtsaft",
      "direktsaft", "saft", "raspberries", "geschmack", "sorte", "juice"
    ],
    href: "https://shop.fontes-vitae.com",
    icon: Package,
  },
  {
    id: "prod-juice-ingwer",
    title: "Ingwer (Ginger Tonic) – Vital-Fruchtsaft",
    category: "Produkt",
    description: "Erfrischendes Ginger Tonic mit angenehmer Ingwerschärfe. Belebt Sinne und Kreislauf.",
    keywords: [
      "ingwer", "ginger", "ginger tonic", "tonic", "ingwersaft", "fruchtsaft",
      "direktsaft", "saft", "schärfe", "geschmack", "sorte", "juice"
    ],
    href: "https://shop.fontes-vitae.com",
    icon: Package,
  },
  {
    id: "prod-juice-apfel-limette",
    title: "Apfel Limette (Apple Lime) – Vital-Fruchtsaft",
    category: "Produkt",
    description: "Spritzig-frische Kombination aus knackigem Apfel und feiner Limette in BPA-freien Alu-Dosen.",
    keywords: [
      "apfel limette", "apple lime", "apfel", "limette", "apple", "lime", "fruchtsaft",
      "direktsaft", "saft", "citrus", "geschmack", "sorte", "juice"
    ],
    href: "https://shop.fontes-vitae.com",
    icon: Package,
  },
  {
    id: "prod-juice-apfel-ingwer",
    title: "Apfel Ingwer (Apple Ginger) – Vital-Fruchtsaft",
    category: "Produkt",
    description: "Belebende Harmonie aus süßem Apfelsaft und würziger Ingwernote in BPA-freien Alu-Dosen.",
    keywords: [
      "apfel ingwer", "apple ginger", "apfel", "ingwer", "apple", "ginger", "fruchtsaft",
      "direktsaft", "saft", "geschmack", "sorte", "juice"
    ],
    href: "https://shop.fontes-vitae.com",
    icon: Package,
  },
  {
    id: "prod-bundle-juice-mix",
    title: "Probierpaket 12x Juice Mix Bundle",
    category: "Produkt",
    description: "Exklusives Probierpaket mit 12 Dosen: Je 2 Dosen aller 6 Fruchtsaft-Sorten zum Vorzugspreis.",
    keywords: [
      "bundle", "bundles", "probierpaket", "12er", "juice mix", "mix", "fruchtsaft mix",
      "sparset", "vorteilspaket", "paket", "angebot", "rabatt"
    ],
    href: "https://shop.fontes-vitae.com",
    icon: Sparkles,
  },
  {
    id: "prod-bundle-combo-48",
    title: "Großes Kombi-Paket (48 Dosen H2 + Fruchtsäfte)",
    category: "Produkt",
    description: "24x H₂-Wasserstoff-Wasser + 24x Fruchtsaft-Mix (48 Dosen à 250 ml). Maximale Frische & Vorrat.",
    keywords: [
      "bundle", "bundles", "kombi-paket", "kombipaket", "48 dosen", "bestseller",
      "vorratspaket", "grosses paket", "48er", "sparset", "vorteilspaket"
    ],
    href: "https://shop.fontes-vitae.com",
    icon: Sparkles,
  },
  {
    id: "prod-kinderserien",
    title: "Kinderserien Special Edition (Gingerix, Limetix, Heidelberix, Himbeerixa, Apfelrix)",
    category: "Produkt",
    description: "Limitiertes Special für Kinder ohne Zuckerzusatz & BPA-frei (Status: derzeit ausverkauft).",
    keywords: [
      "kinderserien", "kinder", "gingerix", "limetix", "heidelberix", "himbeerixa",
      "apfelrix", "special", "ingwer tonic", "limette", "heidelbeere", "himbeere",
      "apfel", "blueberry", "blaubeere", "ausverkauft"
    ],
    href: "https://shop.fontes-vitae.com",
    icon: Sparkles,
  },
  {
    id: "sec-zertifikate",
    title: "Zertifikate & Laboranalysen (ISO 17025 & BPA-Frei)",
    category: "Wissenschaft",
    description: "Unabhängige Laborprüfungen, ISO 17025 Akkreditierung (ČIA L1429), 100% BPA-Freiheit und ≥ 99,99% H₂ Reinheitszertifikat.",
    keywords: [
      "zertifikat", "zertifikate", "laboranalyse", "laboranalysen", "labor", "analyse",
      "analysen", "qualitätsnachweis", "zertifizierung", "prüflabor", "iso 17025",
      "bpa-frei", "prüfsiegel", "akkreditiert", "wasserqualität", "reinheit", "haccp",
      "labore", "gutachten", "prüfbericht"
    ],
    href: "/ueber-uns#zertifikate",
    icon: ShieldCheck,
  },
  {
    id: "sec-b2b-partner",
    title: "B2B-Partnernetzwerk & Partner werden (Vertriebspartner DACH)",
    category: "Über uns",
    description: "Werden Sie B2B-Vertriebspartner von FONTES VITAE für Getränkehändler, Fitnessstudios, Hotels, Spas & Einzelhandel. Attraktive Margen & DACH-Logistik.",
    keywords: [
      "partner", "partnernetzwerk", "b2b", "b2b-partner", "partner werden", "vertriebspartner",
      "distributor", "grosshandel", "großhandel", "b2b-vertrieb", "händler", "hotel partner",
      "fitness partner", "reseller", "lieferant", "kooperation", "wiederverkäufer", "b2b anfrage"
    ],
    href: "/ueber-uns#b2b",
    icon: Users,
  },
  {
    id: "sec-quelle",
    title: "Unsere Quelle – Tiefenquelle (136 m)",
    category: "Quelle",
    description: "Natürlich gefiltertes Wasser aus 136 m Tiefe im Vulkangestein. Natriumarm, idealer pH-Wert 7,8 & ausgewogene Mineralisierung.",
    keywords: [
      "quelle", "unsere quelle", "tiefenquelle", "vulkangestein", "mineralien", "reinheit",
      "natriumarm", "ph-wert", "herkunft", "gestein", "136m", "ursprung", "trinkwasserqualität",
      "wasserqualität", "analyse"
    ],
    href: "/#quelle",
    icon: Sparkles,
  },
  {
    id: "sec-vorteile",
    title: "Vorteile & Anwendungsbereiche",
    category: "Vorteile",
    description: "Maximale Zellhydratation, Laktatabbau bei Sportlern, selektiver Schutz vor freien Radikalen & mentale Fokus-Steigerung.",
    keywords: [
      "vorteile", "vergleich", "anwendung", "anwendungsbereiche", "einsatzbereiche", "sportler", "laktat",
      "antioxidans", "ros", "energie", "fokus", "mitochondrien", "regeneration", "zellschutz",
      "zellhydratation", "leistung", "restaurant", "restaurants", "bar", "bars", "gastronomie",
      "universität", "universitäten", "mensa", "mensen", "universitätsmensen",
      "militär", "militaer", "streitkräfte", "streitkraefte", "einsatzkräfte", "einsatzkraefte",
      "polizei", "feuerwehr", "rettungsdienst", "rettung", "thw", "fußball", "fussball", "fußballverein"
    ],
    href: "/#vergleich",
    icon: ShieldCheck,
  },
  {
    id: "page-ueber-uns",
    title: "Über uns – Philosophie & Vertriebspartner-Rolle",
    category: "Über uns",
    description: "Die Quelle des Lebens: Erfahre mehr über FONTES VITAE als exklusiver Vertriebspartner in der DACH-Region und unsere Familienphilosophie.",
    keywords: [
      "über uns", "ueber uns", "philosophie", "mission", "geschichte", "markenstory",
      "3 säulen", "qualität", "transparenz", "wer wir sind", "fontes vitae", "familienunternehmen",
      "vertriebspartner", "distributor"
    ],
    href: "/ueber-uns",
    icon: Info,
  },
  {
    id: "page-wissenschaft",
    title: "Wissenschaft & Studien",
    category: "Wissenschaft",
    description: "Fundierte wissenschaftliche Evidenz zur Wirkung von molekularem Wasserstoff auf Zellschutz, Mitochondrien & Regeneration.",
    keywords: [
      "wissenschaft", "studien", "forschung", "evidenz", "mitochondrien", "laktatabbau",
      "antioxidantien", "ergebnisse", "laboranalysen", "fachberichte", "daten", "zertifikat",
      "zertifikate"
    ],
    href: "/wissenschaft",
    icon: GraduationCap,
  },
  {
    id: "sec-faq",
    title: "Häufig gestellte Fragen (FAQ)",
    category: "Über uns",
    description: "Antworten zu H₂-Wasserstoff, Aluminiumdosen, BPA-Freiheit, Tierversuchsfreiheit, Dosenpfand und Produktbewertungen.",
    keywords: [
      "faq", "häufige fragen", "fragen", "antworten", "dosenpfand", "pfand", "versand",
      "lieferung", "tierversuchsfrei", "vegan", "verzehrempfehlung", "bewertung", "kundenbewertung"
    ],
    href: "/feedback-faq",
    icon: Info,
  },
  {
    id: "page-kontakt",
    title: "Kontakt & Kundenservice",
    category: "Kontakt",
    description: "Erreiche das FONTES VITAE Kundenservice-Team per Formular, E-Mail (info@fontes-vitae.com) oder Telefon (017660945171).",
    keywords: [
      "kontakt", "kundenservice", "anfrage", "formular", "telefon", "email", "e-mail",
      "adresse", "standort", "maps", "steinbach", "hilfe", "support", "bestellung"
    ],
    href: "/kontakt",
    icon: Phone,
  },
  {
    id: "page-impressum",
    title: "Impressum & Legal Information",
    category: "Rechtliches",
    description: "Impressum, Anbieterkennzeichnung, Firmenanschrift in Steinbach Ts. und rechtliche Angaben.",
    keywords: [
      "impressum", "datenschutz", "agb", "widerruf", "rechtliches", "anschrift", "steinbach"
    ],
    href: "/impressum",
    icon: FileText,
  },
];

interface SearchResultsListProps {
  results: SearchItem[];
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
  handleSelect: (href: string) => void;
  query: string;
}

function SearchResultsList({
  results,
  selectedIndex,
  setSelectedIndex,
  handleSelect,
  query,
}: SearchResultsListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="mt-2 bg-white border border-slate-200 shadow-2xl rounded-2xl p-3 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto space-y-2 text-[#0A1C3A] w-full box-border font-sans"
    >
      <div className="px-3 pt-1 pb-2 flex items-center justify-between border-b border-slate-100">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
          Suchergebnisse ({results.length})
        </span>
        <span className="text-[10px] text-slate-400 font-medium">
          Esc zum Schließen
        </span>
      </div>

      {results.length > 0 ? (
        <ul className="space-y-1.5" role="listbox">
          {results.map((item, index) => {
            const IconComp = item.icon;
            const isSelected = index === selectedIndex;

            return (
              <li key={item.id} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left p-3 rounded-xl transition flex items-start gap-3 group border ${
                    isSelected
                      ? "bg-slate-100 border-[#0A1C3A]/30 text-[#0A1C3A] shadow-sm"
                      : "bg-white border-transparent hover:bg-slate-50 text-slate-800"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition ${
                      isSelected
                        ? "bg-[#0A1C3A] text-white"
                        : "bg-slate-100 text-[#0A1C3A] group-hover:bg-[#0A1C3A] group-hover:text-white"
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-sky-50 text-sky-700 px-2 py-0.5 rounded border border-sky-200/60">
                        {item.category}
                      </span>
                      <span className="text-xs font-black text-[#0A1C3A] truncate">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition text-[#0A1C3A]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="py-8 text-center space-y-2">
          <p className="text-sm font-bold text-[#0A1C3A]">
            Keine Ergebnisse gefunden
          </p>
          <p className="text-xs text-slate-500 max-w-[260px] mx-auto">
            Für &quot;{query}&quot; konnte nichts Passendes gefunden werden. Versuchen Sie es mit Begriffen wie &quot;Blaubeere&quot;, &quot;Zertifikat&quot; oder &quot;Partner werden&quot;.
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function HeaderSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputId = useId();

  const navigate = useNavigate();
  const location = useLocation();

  const filterResults = useCallback((q: string): SearchItem[] => {
    const cleanQuery = q.trim().toLowerCase();
    if (!cleanQuery) return [];

    const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);
    const expandedTokens = new Set<string>([cleanQuery, ...queryTokens]);

    queryTokens.forEach((token) => {
      if (SYNONYMS_MAP[token]) {
        SYNONYMS_MAP[token].forEach((syn) => expandedTokens.add(syn));
      }
    });

    if (SYNONYMS_MAP[cleanQuery]) {
      SYNONYMS_MAP[cleanQuery].forEach((syn) => expandedTokens.add(syn));
    }

    const candidateList = Array.from(expandedTokens);

    return SEARCH_DATABASE.filter((item) => {
      const itemTitle = item.title.toLowerCase();
      const itemDesc = item.description.toLowerCase();
      const itemCat = item.category.toLowerCase();
      const itemKeywords = item.keywords.map((k) => k.toLowerCase());

      return candidateList.some((term) => {
        const inTitle = itemTitle.includes(term);
        const inDesc = itemDesc.includes(term);
        const inCat = itemCat.includes(term);
        const inKw = itemKeywords.some((kw) => kw.includes(term) || term.includes(kw));
        return inTitle || inDesc || inCat || inKw;
      });
    });
  }, []);

  const results = filterResults(query);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (window.innerWidth < 640) {
          mobileInputRef.current?.focus();
        } else {
          desktopInputRef.current?.focus();
        }
      }, 50);
    } else {
      setQuery("");
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Handle result selection
  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(-1);

    if (href.startsWith("http")) {
      window.location.href = href;
      return;
    }

    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      const targetPath = path || "/";

      if (location.pathname === targetPath) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.hash = hash;
        }
      } else {
        navigate(href);
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Keyboard navigation inside search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      }
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        handleSelect(results[selectedIndex].href);
      } else if (results.length > 0) {
        handleSelect(results[0].href);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Search Toggle Icon Button - Always visible in Row 1 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex size-[clamp(2.5rem,2.2rem+1vw,3rem)] items-center justify-center rounded-full bg-[#0A1C3A] text-white hover:bg-[#12284c] active:scale-95 transition shadow-sm border border-slate-700/50 ${
          isOpen ? "ring-2 ring-sky-400 bg-[#12284c]" : ""
        }`}
        aria-label={isOpen ? "Suche schließen" : "Suche öffnen"}
        aria-expanded={isOpen}
      >
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-100" />
      </button>

      {/* Expandable Search Overlay & Second Row */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* DESKTOP SEARCH OVERLAY (sm: and above) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="hidden sm:block absolute right-0 top-0 z-50 sm:w-[380px] md:w-[420px]"
            >
              <div className="bg-white border border-slate-300 shadow-2xl rounded-2xl p-2 flex items-center gap-2 ring-2 ring-[#0A1C3A]/20">
                <div className="pl-3 text-[#0A1C3A] flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5 text-[#0A1C3A]" />
                </div>

                <label htmlFor={`${searchInputId}-desktop`} className="sr-only">Was suchen Sie?</label>
                <input
                  id={`${searchInputId}-desktop`}
                  ref={desktopInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Was suchen Sie?"
                  className="w-full bg-transparent text-[#0A1C3A] placeholder:text-slate-400 text-sm font-semibold focus:outline-none py-1.5"
                  autoComplete="off"
                />

                {query.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setSelectedIndex(-1);
                      desktopInputRef.current?.focus();
                    }}
                    className="p-1 rounded-full text-slate-400 hover:text-[#0A1C3A] hover:bg-slate-100 transition shrink-0"
                    aria-label="Eingabe löschen"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl bg-[#0A1C3A] text-white hover:bg-[#12284c] transition shrink-0"
                  aria-label="Suche schließen"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {query.trim().length > 0 && (
                <SearchResultsList
                  results={results}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  handleSelect={handleSelect}
                  query={query}
                />
              )}
            </motion.div>

            {/* MOBILE SEARCH ROW 2 (under sm breakpoint) */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="block sm:hidden fixed left-0 right-0 top-[clamp(4.25rem,14vw,5rem)] px-4 z-50 w-full max-w-full box-border"
            >
              <div className="bg-white border border-slate-300 shadow-2xl rounded-2xl p-2 flex items-center gap-2 ring-2 ring-[#0A1C3A]/20 w-full box-border">
                <div className="pl-3 text-[#0A1C3A] flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5 text-[#0A1C3A]" />
                </div>

                <label htmlFor={`${searchInputId}-mobile`} className="sr-only">Was suchen Sie?</label>
                <input
                  id={`${searchInputId}-mobile`}
                  ref={mobileInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Was suchen Sie?"
                  className="w-full bg-transparent text-[#0A1C3A] placeholder:text-slate-400 text-sm font-semibold focus:outline-none py-1.5"
                  autoComplete="off"
                />

                {query.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setSelectedIndex(-1);
                      mobileInputRef.current?.focus();
                    }}
                    className="p-1 rounded-full text-slate-400 hover:text-[#0A1C3A] hover:bg-slate-100 transition shrink-0"
                    aria-label="Eingabe löschen"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl bg-[#0A1C3A] text-white hover:bg-[#12284c] transition shrink-0"
                  aria-label="Suche schließen"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {query.trim().length > 0 && (
                <SearchResultsList
                  results={results}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  handleSelect={handleSelect}
                  query={query}
                />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
