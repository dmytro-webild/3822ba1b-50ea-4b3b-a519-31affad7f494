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
  Zap,
  GraduationCap,
  Phone,
  FileText,
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

const SEARCH_DATABASE: SearchItem[] = [
  {
    id: "prod-h2-wasser",
    title: "H2 Wasserstoff-Wasser (Einzeldose & Cases)",
    category: "Produkt",
    description: "Reinstes Wasserstoff-Wasser mit min. 2.8 mg/L gelöstem H2 in 100% BPA-freier Alu-Dose. 0 kcal, 0 g Zucker.",
    keywords: ["wasserstoff", "h2", "wasser", "dose", "aludose", "shop", "kaufen", "bestellen", "einzelne", "einzeldose", "gehalt", "0 kcal", "zuckerfrei"],
    href: "/#shop",
    icon: Package,
  },
  {
    id: "prod-fruchtsaft",
    title: "6 Edle Fruchtsaft-Kreationen mit H2",
    category: "Produkt",
    description: "6 erfrischende Direktsaft-Sorten (Orange-Apfel, Granatapfel-Beere, Exotic u.v.m.) angereichert mit H2-Wasserstoff.",
    keywords: ["fruchtsaft", "saft", "orange", "granatapfel", "beere", "exotic", "ingwer", "zitrone", "mango", "maracuja", "johannisbeere", "kreationen", "geschmack", "sorten"],
    href: "/#shop",
    icon: Package,
  },
  {
    id: "prod-bundles",
    title: "FONTES VITEA Probierpaket & Bundles",
    category: "Produkt",
    description: "Exklusive Sparsets: Starter Bundle, Vitality Box & Executive Paket zum Vorzugspreis.",
    keywords: ["bundle", "bundles", "paket", "probierpaket", "starter", "vitality", "executive", "rabatt", "sparset", "angebote", "vorteilspaket"],
    href: "/#bundles",
    icon: Package,
  },
  {
    id: "prod-kinderserien",
    title: "Kinderserien Special (Gingerix, Limetix, Heidelberix, Himbeerixa, Apfelrix)",
    category: "Produkt",
    description: "Limitiertes Special für Kinder ohne Zuckerzusatz & BPA-frei (Status: nicht vorrätig – ausverkauft).",
    keywords: ["kinderserien", "kinder", "gingerix", "limetix", "heidelberix", "himbeerixa", "apfelrix", "special", "ingwer tonic", "limette", "heidelbeere", "himbeere", "apfel", "ausverkauft"],
    href: "/shop#kinderserien",
    icon: Sparkles,
  },
  {
    id: "sec-quelle",
    title: "Unsere Quelle – Tiefenquelle (136 m)",
    category: "Quelle",
    description: "Natürlich gefiltertes Wasser aus 136 m Tiefe im Vulkangestein. Natriumarm, idealer pH-Wert 7,8 & mineralisiert.",
    keywords: ["quelle", "unsere quelle", "tiefenquelle", "vulkangestein", "mineralien", "reinheit", "natriumarm", "ph-wert", "herkunft", "gestein", "136m", "ursprung"],
    href: "/#quelle",
    icon: Sparkles,
  },
  {
    id: "sec-vorteile",
    title: "Vorteile im Vergleich – Anwendungsbereiche",
    category: "Vorteile",
    description: "Maximale Zellhydratation, Laktatabbau bei Sportlern, selektiver Schutz vor freien Radikalen & mentale Fokus-Steigerung.",
    keywords: ["vorteile", "vergleich", "anwendung", "anwendungsbereiche", "sportler", "laktat", "antioxidans", "ros", "energie", "fokus", "mitochondrien", "regeneration", "zellschutz", "zellhydratation", "leistung"],
    href: "/#vergleich",
    icon: ShieldCheck,
  },
  {
    id: "page-ueber-uns",
    title: "Über uns – Philosophie & Markenstory",
    category: "Über uns",
    description: "Die Quelle des Lebens: Erfahre mehr über die Mission, Philosophie und die 3 Säulen der Marke FONTES VITEA.",
    keywords: ["über uns", "ueber uns", "philosophie", "mission", "geschichte", "markenstory", "3 säulen", "qualität", "transparenz", "fundierung", "wer wir sind", "fontes vitea"],
    href: "/ueber-uns",
    icon: Info,
  },
  {
    id: "sec-technologie",
    title: "Eigene H2-Technologie & Innovation",
    category: "Technologie",
    description: "Proprietiäre Wasserstoffanreicherung (PEM/SPE Elektrolyse) & laborgeprüfte BPA-freie Aluminium-Dosenversiegelung.",
    keywords: ["technologie", "h2-technologie", "pem", "spe", "elektrolyse", "wasserstoffgehalt", "aludose", "bpa-frei", "labor", "anreicherung", "entwicklung", "innovation", "2.8 mg"],
    href: "/ueber-uns",
    icon: Zap,
  },
  {
    id: "page-wissenschaft",
    title: "Wissenschaft & Studien",
    category: "Wissenschaft",
    description: "Fundierte wissenschaftliche Evidenz zur Wirkung von molekularem Wasserstoff auf Zellschutz, Mitochondrien & Regeneration.",
    keywords: ["wissenschaft", "studien", "forschung", "evidenz", "mitochondrien", "laktatabbau", "antioxidantien", "ergebnisse", "laboranalysen", "fachberichte", "daten"],
    href: "/wissenschaft",
    icon: GraduationCap,
  },
  {
    id: "sec-videos",
    title: "Experten-Videos & Studienanalysen",
    category: "Wissenschaft",
    description: "Vorträge von Molekularbiologe Tyler LeBaron (MHI) und klinische Berichte aus der Wasserstoff-Forschung in Japan.",
    keywords: ["video", "videos", "vortrag", "tyler lebaron", "japan", "experten", "youtube", "analysen", "holy hydrogen", "aufzeichnung", "film"],
    href: "/wissenschaft",
    icon: GraduationCap,
  },
  {
    id: "page-kontakt",
    title: "Kontakt & Kundenservice",
    category: "Kontakt",
    description: "Erreiche das FONTES VITEA Kundenservice-Team per Formular, E-Mail (info@fontesvitea.de) oder Telefon (017660945171).",
    keywords: ["kontakt", "kundenservice", "anfrage", "formular", "telefon", "email", "e-mail", "adresse", "standort", "maps", "steinbach", "hilfe", "support", "bestellung"],
    href: "/kontakt",
    icon: Phone,
  },
  {
    id: "page-impressum",
    title: "Impressum & Legal Information",
    category: "Rechtliches",
    description: "Impressum, Anbieterkennzeichnung, Firmenanschrift in Steinbach Ts. und rechtliche Angaben.",
    keywords: ["impressum", "datenschutz", "agb", "widerruf", "rechtliches", "anschrift", "steinbach"],
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
      className="mt-2 bg-white border border-slate-200 shadow-2xl rounded-2xl p-3 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto space-y-2 text-[#0A1C3A] w-full box-border"
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
            Für &quot;{query}&quot; konnte nichts Passendes gefunden werden. Versuchen Sie es mit Begriffen wie &quot;Wasserstoff&quot;, &quot;Studien&quot; oder &quot;Quelle&quot;.
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

    return SEARCH_DATABASE.filter((item) => {
      const inTitle = item.title.toLowerCase().includes(cleanQuery);
      const inDesc = item.description.toLowerCase().includes(cleanQuery);
      const inCategory = item.category.toLowerCase().includes(cleanQuery);
      const inKeywords = item.keywords.some((kw) => kw.toLowerCase().includes(cleanQuery));
      return inTitle || inDesc || inCategory || inKeywords;
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

    if (href.startsWith("/#")) {
      const hashId = href.replace("/", "");
      if (location.pathname === "/") {
        const el = document.querySelector(hashId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.hash = hashId;
        }
      } else {
        navigate(href);
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
