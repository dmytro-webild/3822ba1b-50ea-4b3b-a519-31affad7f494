import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import MoreArrowPill from "@/components/kit/MoreArrowPill";
import { ShieldCheck, Droplets, Sparkles, Mountain, Flame, CheckCircle2, Quote, X } from "lucide-react";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Button = { text: string; href: string };
type Stat = { value: string; unit?: string; title: string };

type HeroWordmarkProductProps = {
  brand?: string;
  title?: React.ReactNode;
  subtitle?: string;
  description?: string;
  tagline?: string;
  primaryButton?: Button;
  items?: Stat[];
  marquee?: string;
  introDelay?: number;
  model?: unknown;
  media?: "model" | "image";
  productImageSrc?: string;
  productImageAlt?: string;
  quoteText?: string;
  quoteAuthor?: string;
  quoteAuthorTitle?: string;
  ariaLabel?: string;
  className?: string;
};

type BubbleItem = {
  id: string;
  title: string;
  subtitle: string;
  popupContent: string;
  icon: typeof ShieldCheck;
  positionDesktop: string;
  svgLine: { x2: string; y2: string };
  floatDuration: number;
};

const BUBBLES: BubbleItem[] = [
  {
    id: "h2-konzentration",
    title: "2,8 mg/L H₂",
    subtitle: "Messbarer molekularer Wasserstoff",
    popupContent:
      "Reines Quellwasser angereichert mit 2,8 mg/L molekularem Wasserstoff. Hochstabil und in jeder Charge messbar.",
    icon: Droplets,
    positionDesktop: "top-[2%] left-1 sm:left-2 md:-left-12 lg:-left-28",
    svgLine: { x2: "16%", y2: "15%" },
    floatDuration: 3.8,
  },
  {
    id: "quelle",
    title: "Natürliches Quellwasser",
    subtitle: "Natürlich gefiltert",
    popupContent:
      "Gefiltert durch tiefe Gesteinsschichten. Reinste Quellwasserqualität, unverfälscht und natürlich rein.",
    icon: Mountain,
    positionDesktop: "top-[36%] left-1 sm:left-2 md:-left-16 lg:-left-32",
    svgLine: { x2: "12%", y2: "45%" },
    floatDuration: 4.4,
  },
  {
    id: "durchmesser",
    title: "0,289 nm",
    subtitle: "Kinetischer Durchmesser des H₂-Moleküls",
    popupContent:
      "Der extrem kleine kinetische Durchmesser von 0,289 nm ermöglicht es dem Wasserstoffmolekül, zelluläre Strukturen optimal zu erreichen.",
    icon: Sparkles,
    positionDesktop: "bottom-[4%] left-1 sm:left-2 md:-left-12 lg:-left-28",
    svgLine: { x2: "16%", y2: "78%" },
    floatDuration: 4.0,
  },
  {
    id: "bpani",
    title: "BPANI-Schutzbeschichtung",
    subtitle: "Ohne absichtlichen BPA-Zusatz",
    popupContent:
      "Modernste Innenbeschichtung ohne absichtlichen BPA-Zusatz garantiert maximale Reinheit und unbeeinträchtigten Geschmack.",
    icon: ShieldCheck,
    positionDesktop: "top-[2%] right-1 sm:right-2 md:-right-12 lg:-right-28",
    svgLine: { x2: "84%", y2: "15%" },
    floatDuration: 3.6,
  },
  {
    id: "laborgeprueft",
    title: "Laborgeprüfte Qualität",
    subtitle: "Kontrolle jeder Produktionscharge",
    popupContent:
      "Jede einzelne Abfüllung unterliegt strengen unabhängigen Laboranalysen zur Sicherung höchster Qualitätsstandards.",
    icon: CheckCircle2,
    positionDesktop: "top-[36%] right-1 sm:right-2 md:-right-16 lg:-right-32",
    svgLine: { x2: "88%", y2: "45%" },
    floatDuration: 4.2,
  },
  {
    id: "reinheit",
    title: "0 Zucker · 0 Koffein",
    subtitle: "Reine, natürliche Hydration",
    popupContent:
      "Erfrischung pur – 100 % frei von Zucker, Kalorien, Koffein und synthetischen Stimulanzien.",
    icon: Flame,
    positionDesktop: "bottom-[4%] right-1 sm:right-2 md:-right-12 lg:-right-28",
    svgLine: { x2: "84%", y2: "78%" },
    floatDuration: 4.6,
  },
];

const HeroWordmarkProduct = ({
  title = "H2 - HYDROGEN WATER",
  subtitle = "CLEAN & PURE – HYDRATION EINER NEUEN GENERATION",
  description = "Reines Quellwasser, angereichert mit 2,8 mg/L molekularem Wasserstoff. Inspiriert von der Natur, wissenschaftlich erforscht und durch innovative Verpackungstechnologie geschützt.",
  tagline = "Ohne Zucker · Ohne Koffein · Ohne Stimulanzien",
  primaryButton = { text: "Jetzt Shop entdecken", href: "https://shop.fontes-vitae.com" },
  quoteText = "„Es fühlt sich beinahe göttlich an. Es ist wie ein göttliches Molekül. Gott erschuf die Welt durch ein Wort – dieses Wort wäre Wasserstoff.“",
  quoteAuthor = "Dr. Tyler W. LeBaron, MSc, PhD (USA)",
  quoteAuthorTitle = "Biochemiker und Physiologe, Gründer des Molecular Hydrogen Institute (MHI).",
  introDelay = 0,
  productImageSrc = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795132125149-eraq7h8f.png",
  productImageAlt = "FONTES VITEA H2 Wasserstoff Dose",
  ariaLabel,
  className,
}: HeroWordmarkProductProps) => {
  const reduce = useReducedMotion();
  const { ease, slow } = useKitMotion();
  const [go, setGo] = useState(introDelay <= 0);
  const [activeBubble, setActiveBubble] = useState<BubbleItem | null>(null);
  const show = <T,>(value: T) => (go ? value : undefined);

  useEffect(() => {
    if (go) return;
    const start = () => setGo(true);
    const fallback = window.setTimeout(start, (introDelay + 1.5) * 1000);
    window.addEventListener("kit:intro", start);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("kit:intro", start);
    };
  }, [go, introDelay]);

  const renderTitle = (input: React.ReactNode) => {
    if (typeof input === "string") {
      if (input.includes("H2")) {
        const parts = input.split("H2");
        return (
          <>
            {parts.map((part, index) => (
              <span key={index}>
                {part}
                {index < parts.length - 1 && (
                  <>
                    H<sub className="text-[#D4AF37] text-[0.6em] relative bottom-[-0.15em] font-extrabold">2</sub>
                  </>
                )}
              </span>
            ))}
          </>
        );
      }
    }
    return input;
  };

  const rawTitle = title || "H2 - HYDROGEN WATER";
  const formattedTitle = renderTitle(rawTitle);
  const sectionAriaLabel = ariaLabel ?? (typeof rawTitle === "string" ? rawTitle : "H2 - HYDROGEN WATER");

  return (
    <section
      aria-label={sectionAriaLabel}
      className={cn(
        "relative flex flex-col items-center justify-start overflow-hidden bg-transparent text-[#0A1C3A] pt-24 pb-10 md:pt-28 lg:pt-32",
        className
      )}
    >
      {/* Prominent Headline & Subtext block at Top Center */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-3">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: -16 }}
          animate={show({ opacity: 1, y: 0 })}
          transition={{ duration: slow, ease }}
          className="font-extrabold not-italic text-[#0A1C3A] text-center uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
        >
          {formattedTitle}
        </motion.h1>

        {subtitle && (
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: slow, ease, delay: 0.08 }}
            className="text-base sm:text-lg md:text-xl font-extrabold text-[#0A1C3A] uppercase tracking-wider text-center"
          >
            {subtitle}
          </motion.h2>
        )}

        {description && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: slow, ease, delay: 0.12 }}
            className="max-w-2xl text-center text-xs sm:text-sm md:text-base font-medium text-slate-600 leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {tagline && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: slow, ease, delay: 0.16 }}
            className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#0A1C3A] bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200/80 shadow-xs"
          >
            {tagline}
          </motion.div>
        )}

        {primaryButton && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: slow, ease, delay: 0.2 }}
            className="mt-1"
          >
            <MoreArrowPill text={primaryButton.text} href={primaryButton.href} />
          </motion.div>
        )}
      </div>

      {/* Main Container with 6 Orbiting Glassmorphism Bubbles & 2D Floating Can */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full flex flex-col items-center gap-6 mt-4 md:mt-6">
        <div className="relative w-full max-w-4xl flex items-center justify-center py-6 sm:py-10 min-h-[420px] sm:min-h-[480px]">
          {/* Thin connecting lines SVG overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" aria-hidden="true">
            {BUBBLES.map((b) => (
              <g key={`line-${b.id}`}>
                <line
                  x1="50%"
                  y1="50%"
                  x2={b.svgLine.x2}
                  y2={b.svgLine.y2}
                  stroke="#0A1C3A"
                  strokeWidth="1.5"
                  strokeOpacity="0.25"
                  strokeDasharray="4 4"
                />
                <circle
                  cx={b.svgLine.x2}
                  cy={b.svgLine.y2}
                  r="4"
                  fill="#0A1C3A"
                  fillOpacity="0.6"
                />
              </g>
            ))}
          </svg>

          {/* Floating Can */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={show(
              reduce
                ? { opacity: 1, scale: 1 }
                : {
                    opacity: 1,
                    scale: 1,
                    y: [-8, 8, -8],
                  }
            )}
            transition={{
              opacity: { duration: slow, ease, delay: 0.2 },
              scale: { duration: slow, ease, delay: 0.2 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative z-10 flex items-center justify-center my-4"
          >
            <img
              src={productImageSrc}
              alt={productImageAlt}
              className="w-auto h-[300px] sm:h-[380px] md:h-[440px] lg:h-[480px] max-w-full object-contain filter drop-shadow-2xl"
            />
          </motion.div>

          {/* 6 Large Glassmorphism Bubbles Orbiting Main Can */}
          {BUBBLES.map((bubble) => {
            const IconComponent = bubble.icon;
            return (
              <motion.button
                key={bubble.id}
                type="button"
                onClick={() => setActiveBubble(bubble)}
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={show(
                  reduce
                    ? { opacity: 1, scale: 1 }
                    : {
                        opacity: 1,
                        scale: 1,
                        y: [-6, 6, -6],
                      }
                )}
                transition={{
                  opacity: { duration: slow, ease, delay: 0.3 },
                  scale: { duration: slow, ease, delay: 0.3 },
                  y: { duration: bubble.floatDuration, repeat: Infinity, ease: "easeInOut" },
                }}
                className={cn(
                  "absolute z-20 backdrop-blur-md bg-white/90 border border-white/90 shadow-xl rounded-2xl px-2.5 sm:px-4 md:px-5 py-2 sm:py-3 md:py-3.5 text-[#0A1C3A] hover:bg-white hover:border-[#0A1C3A] hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2 sm:gap-3.5 min-w-[130px] sm:min-w-[170px] md:min-w-[210px] lg:min-w-[240px] text-left group",
                  bubble.positionDesktop
                )}
              >
                <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-[#0A1C3A]/10 text-[#0A1C3A] group-hover:bg-[#0A1C3A] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-extrabold text-[11px] sm:text-xs md:text-sm uppercase tracking-tight text-[#0A1C3A] leading-tight">
                    {bubble.title}
                  </span>
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 font-semibold group-hover:text-[#0A1C3A] transition-colors leading-tight">
                    {bubble.subtitle}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Zentrierter Zitatbereich unterhalb der Getränkedose */}
      {quoteText && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={show({ opacity: 1, y: 0 })}
          transition={{ duration: slow, ease, delay: 0.35 }}
          className="relative z-10 w-full max-w-3xl mx-auto px-6 py-6 sm:py-8 mt-6 sm:mt-8 text-center bg-white/50 backdrop-blur-md rounded-3xl border border-white/80 shadow-lg"
        >
          <div className="flex justify-center mb-3 text-[#D4AF37] opacity-85" aria-hidden="true">
            <Quote className="w-8 h-8 sm:w-10 sm:h-10 transform -scale-x-100" />
          </div>

          <blockquote className="font-serif italic text-base sm:text-lg md:text-xl text-[#0A1C3A] leading-relaxed max-w-2xl mx-auto tracking-normal">
            {quoteText}
          </blockquote>

          {quoteAuthor && (
            <div className="mt-4 pt-4 border-t border-slate-200/60 max-w-md mx-auto">
              <p className="font-extrabold text-xs sm:text-sm text-[#0A1C3A] tracking-wider uppercase">
                {quoteAuthor}
              </p>
              {quoteAuthorTitle && (
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-normal mt-0.5">
                  {quoteAuthorTitle}
                </p>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Interactive Popup Modal when Clicking Floating Bubble */}
      {activeBubble && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveBubble(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-200 text-[#0A1C3A]"
          >
            <button
              onClick={() => setActiveBubble(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-[#0A1C3A] hover:bg-slate-100 transition"
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center shadow-md shrink-0">
                <activeBubble.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block">
                  FONTES VITEA Qualitätsversprechen
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#0A1C3A] uppercase tracking-tight">
                  {activeBubble.title}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed pt-4 border-t border-slate-200">
              {activeBubble.popupContent}
            </p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveBubble(null)}
                className="bg-[#0A1C3A] hover:bg-[#12284c] text-white text-xs font-extrabold uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition"
              >
                Schließen
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default HeroWordmarkProduct;
