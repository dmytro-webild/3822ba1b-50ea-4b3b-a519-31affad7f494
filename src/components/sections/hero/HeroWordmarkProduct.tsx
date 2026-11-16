import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import MoreArrowPill from "@/components/kit/MoreArrowPill";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Button = { text: string; href: string };
type Stat = { value: string; unit?: string; title: string };

type HeroWordmarkProductProps = {
  brand?: string;
  title?: string;
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
    { value: "100", unit: "%", title: "BPA-Frei & Vegan" },
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

  const mainTitle = title || "H2 - HYDROGEN WATER";

  return (
    <section
      aria-label={ariaLabel ?? mainTitle}
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
          {mainTitle}
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

      {/* Clean 2D Can Image & Metrics Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center gap-8 mt-6 md:mt-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={show({ opacity: 1, scale: 1 })}
          transition={{ duration: slow, ease, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <img
            src={productImageSrc}
            alt={productImageAlt}
            className="w-auto h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] max-w-full object-contain filter drop-shadow-xl"
          />
        </motion.div>

        {/* Feature Badges / Metric Pills */}
        {items.length > 0 && (
          <motion.ul
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: slow, ease, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-4xl"
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

      {/* Curved Marquee */}
      {marquee && <CurvedMarquee text={marquee} />}
    </section>
  );
};

export default HeroWordmarkProduct;
