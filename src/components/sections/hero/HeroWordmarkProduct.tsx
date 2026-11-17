import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import MoreArrowPill from "@/components/kit/MoreArrowPill";
import { ShieldCheck, Droplets, Zap, Sparkles, Mountain, Flame, X } from "lucide-react";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Button = { text: string; href: string };
type Stat = { value: string; unit?: string; title: string };

type HeroWordmarkProductProps = {
  brand?: string;
  title?: React.ReactNode;
  description?: string;
  primaryButton?: Button;
  items?: Stat[];
  marquee?: string;
  introDelay?: number;
  model?: unknown;
  media?: "model" | "image";
  productImageSrc?: string;
  productImageAlt?: string;
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
    subtitle: "H₂-Konzentration",
    popupContent:
      "Angereichertes Quellwasser mit molekularem Wasserstoff. Hält nach dem Öffnen 6 Stunden: 99 % nach 2 Std. und 80 % nach 6 Std. noch messbar.",
    icon: Droplets,
    positionDesktop: "top-[2%] left-0 sm:left-2 md:-left-12 lg:-left-28",
    svgLine: { x2: "16%", y2: "15%" },
    floatDuration: 3.8,
  },
  {
    id: "quelle",
    title: "136 m Quellwasser",
    subtitle: "Quellentiefengestein",
    popupContent:
      "Gewonnen aus 136 Metern Tiefe. Natürlich gefiltert durch Gesteinsschichten.",
    icon: Mountain,
    positionDesktop: "top-[36%] left-0 sm:left-2 md:-left-16 lg:-left-32",
    svgLine: { x2: "12%", y2: "45%" },
    floatDuration: 4.4,
  },
  {
    id: "kalorien",
    title: "0 Kalorien",
    subtitle: "Reine Hydration",
    popupContent:
      "Reine Hydration. Ganz ohne Zucker, Kalorien oder künstliche Süßstoffe.",
    icon: Flame,
    positionDesktop: "bottom-[4%] left-0 sm:left-2 md:-left-12 lg:-left-28",
    svgLine: { x2: "16%", y2: "78%" },
    floatDuration: 4.0,
  },
  {
    id: "bpa-frei",
    title: "BPA-Frei",
    subtitle: "Hormonell Unbedenklich",
    popupContent:
      "Maximale Sicherheit. Frei von hormonell schädlichem Bisphenol A (BPA).",
    icon: ShieldCheck,
    positionDesktop: "top-[2%] right-0 sm:right-2 md:-right-12 lg:-right-28",
    svgLine: { x2: "84%", y2: "15%" },
    floatDuration: 3.6,
  },
  {
    id: "energie",
    title: "Energie",
    subtitle: "Zelluläre ATP-Synthese",
    popupContent:
      "Unterstützt die zelluläre Energieproduktion für mehr Kraft und Ausdauer.",
    icon: Zap,
    positionDesktop: "top-[36%] right-0 sm:right-2 md:-right-16 lg:-right-32",
    svgLine: { x2: "88%", y2: "45%" },
    floatDuration: 4.2,
  },
  {
    id: "mineralien",
    title: "Mineralien",
    subtitle: "Vollständiges Profil",
    popupContent:
      "Natürliche Mineralstoffe: Calcium (109 mg/L), Magnesium (14 mg/L), Natrium (7,5 mg/L), Kalium (3,3 mg/L), Sulfat (66,4 mg/L) und Nitrat (12,7 mg/L).",
    icon: Sparkles,
    positionDesktop: "bottom-[4%] right-0 sm:right-2 md:-right-12 lg:-right-28",
    svgLine: { x2: "84%", y2: "78%" },
    floatDuration: 4.6,
  },
];

const BAND = "M-71 371.6C126.3 260 593.5 65.8 934.5 80.8c313 13.8 497 136 572 200";

const CurvedMarquee = ({ text }: { text: string }) => {
  const id = useId();
  const measureRef = useRef<SVGTextElement>(null);
  const reduce = useReducedMotion();
  const [unit, setUnit] = useState(0);
  const phrase = `${text.trim()} · `;

  useEffect(() => {
    const measure = () => setUnit(measureRef.current?.getComputedTextLength() ?? 0);
    measure();
    document.fonts?.ready.then(measure);
  }, [phrase]);

  const repeats = unit > 0 ? Math.ceil(2400 / unit) + 2 : 12;

  return (
    <div aria-hidden="true" className="pointer-events-none relative mt-12 w-full">
      <svg viewBox="0 0 1440 442" fill="none" className="block w-full overflow-visible">
        <path d={`${BAND}V442H-71Z`} fill="#ffffff" />
        <path id={`${id}-band`} d={BAND} stroke="#e2e8f0" strokeWidth="160" />
        <text ref={measureRef} className="invisible font-sans font-extrabold uppercase tracking-tight" fontSize={110}>
          {phrase}
        </text>
        <text className="fill-[#0A1C3A] font-sans font-extrabold uppercase tracking-tight" fontSize={110}>
          <textPath href={`#${id}-band`} dominantBaseline="central" startOffset="0">
            {phrase.repeat(repeats)}
            {!reduce && unit > 0 && <animate attributeName="startOffset" from="0" to={-unit} dur={`${(unit / 90).toFixed(2)}s`} repeatCount="indefinite" />}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

const HeroWordmarkProduct = ({
  title = "H2 - HYDROGEN WATER",
  description = "CLEAN & PURE – Maximale Hydration mit molekularem Wasserstoff",
  primaryButton = { text: "Jetzt Shop entdecken", href: "#shop" },
  items = [
    { value: "2.8", unit: "mg/L", title: "Gelöster Wasserstoff" },
    { value: "0", unit: "kcal", title: "Zucker & Kalorien" },
    { value: "100", unit: "%", title: "BPA-Frei & Rein" },
  ],
  marquee = "CLEAN & PURE H2 WATER • FONS VITAE • DIE QUELLE DES LEBENS •",
  introDelay = 0,
  productImageSrc = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794865744193-o2e363kc.png",
  productImageAlt = "FONS VITAE H2 Wasserstoff Dose",
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
        "relative flex min-h-svh flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9] text-[#0A1C3A] pt-28 pb-12 md:pt-36 lg:pt-40",
        className
      )}
    >
      {/* Prominent Headline & Subtext block at Top Center */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-4">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: -20 }}
          animate={show({ opacity: 1, y: 0 })}
          transition={{ duration: slow, ease }}
          className="font-extrabold not-italic text-[#0A1C3A] text-center uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
        >
          {formattedTitle}
        </motion.h1>

        {description && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: slow, ease, delay: 0.1 }}
            className="max-w-2xl text-center text-sm sm:text-base md:text-lg font-bold text-slate-600 leading-relaxed uppercase tracking-wider"
          >
            {description}
          </motion.p>
        )}

        {primaryButton && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: slow, ease, delay: 0.15 }}
            className="mt-2"
          >
            <MoreArrowPill text={primaryButton.text} href={primaryButton.href} />
          </motion.div>
        )}
      </div>

      {/* Main Container with 6 Orbiting Glassmorphism Bubbles & 2D Floating Can */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full flex flex-col items-center gap-8 mt-6 md:mt-8">
        <div className="relative w-full max-w-4xl flex items-center justify-center py-8 sm:py-12 min-h-[460px] sm:min-h-[520px]">
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
              className="w-auto h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] max-w-full object-contain filter drop-shadow-2xl"
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
                  "absolute z-20 backdrop-blur-md bg-white/90 border border-white/90 shadow-xl rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 text-[#0A1C3A] hover:bg-white hover:border-[#0A1C3A] hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-3.5 min-w-[170px] sm:min-w-[210px] md:min-w-[240px] text-left group",
                  bubble.positionDesktop
                )}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0A1C3A]/10 text-[#0A1C3A] group-hover:bg-[#0A1C3A] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                  <IconComponent className="w-5 h-5 sm:w-5 sm:h-5" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-extrabold text-xs sm:text-sm uppercase tracking-tight text-[#0A1C3A] leading-tight">
                    {bubble.title}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500 font-semibold group-hover:text-[#0A1C3A] transition-colors truncate">
                    {bubble.subtitle}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Feature Badges / Metric Pills */}
        {items.length > 0 && (
          <motion.ul
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: slow, ease, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-4xl z-10"
          >
            {items.map((item, i) => (
              <li
                key={`${i}-${item.title}`}
                className="bg-white border border-slate-300 shadow-md rounded-full px-5 py-2.5 flex items-center gap-3 transition hover:border-[#0A1C3A]"
              >
                <span className="font-extrabold text-[#0A1C3A] text-base sm:text-lg font-mono">
                  {item.value} {item.unit}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-700 border-l border-slate-300 pl-3">
                  {item.title}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </div>

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
                  FONS VITAE Qualitätsversprechen
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

      {/* Curved Marquee */}
      {marquee && <CurvedMarquee text={marquee} />}
    </section>
  );
};

export default HeroWordmarkProduct;
