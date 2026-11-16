import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useFitWidth } from "@/components/kit/useFitWidth";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import { modelChapter, type ModelChapter } from "@/components/kit/modelPose";
import MoreArrowPill from "@/components/kit/MoreArrowPill";
import MoreProductPhoto from "@/components/kit/MoreProductPhoto";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

function FitLine({ text, className, children }: { text: string; className: string; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  useFitWidth(box, row, text);
  return (
    <div ref={box} aria-hidden="true" className={cn("mx-auto w-[82%] text-center lg:w-1/2", className)}>
      <div ref={row} className="inline-flex gap-x-[0.2em] whitespace-nowrap">
        {children}
      </div>
    </div>
  );
}

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
  model?: ModelChapter;
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
    <div aria-hidden="true" className="pointer-events-none relative mt-[clamp(2.5rem,8vw,4rem)] w-full lg:mt-0">
      <svg viewBox="0 0 1440 442" fill="none" className="block w-full overflow-visible">
        <path d={`${BAND}V442H-71Z`} fill="var(--background)" />
        <path id={`${id}-band`} d={BAND} stroke="var(--tint-2)" strokeWidth="160" />
        <text ref={measureRef} className="invisible font-[family-name:var(--font-heading)] font-semibold uppercase tracking-[-0.02em]" fontSize={110}>
          {phrase}
        </text>
        <text className="fill-background font-[family-name:var(--font-heading)] font-semibold uppercase tracking-[-0.02em]" fontSize={110}>
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
  brand = "Verde",
  title = "Matcha meets protein",
  description = "A creamy iced latte with real ceremonial matcha and 20 g of protein in every glass.",
  primaryButton = { text: "Shop now", href: "#pricing" },
  items = [
    { value: "20", unit: "g", title: "of protein" },
    { value: "95", unit: "%", title: "less sugar" },
    { value: "85", unit: "mg", title: "of caffeine" },
  ],
  marquee = "It's a match",
  introDelay = 0,
  model,
  media = "model",
  productImageSrc = "https://images.pexels.com/photos/6767787/pexels-photo-6767787.jpeg?auto=compress&w=1200",
  productImageAlt = "Two bottles beside a stone in soft sunlight",
  ariaLabel,
  className,
}: HeroWordmarkProductProps) => {
  const reduce = useReducedMotion();
  const { ease, slow } = useKitMotion();
  const [go, setGo] = useState(introDelay <= 0);
  const show = <T,>(value: T) => (go ? value : undefined);
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, (v) => (reduce ? 0 : Math.min(v, 2000) * 0.15));
  const letters = Array.from(brand);
  const brandBox = useRef<HTMLDivElement>(null);
  const brandRow = useRef<HTMLDivElement>(null);
  useFitWidth(brandBox, brandRow, brand);
  const [first = "", ...rest] = title.trim().split(/\s+/);
  const lines = [[first], rest].filter((line) => line.length && line[0]);
  const n = Math.max(items.length, 1);
  let wordIndex = 0;

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

  return (
    <section
      {...modelChapter(media === "model" ? model : undefined)}
      aria-label={ariaLabel ?? brand}
      className={cn(
        "relative flex min-h-svh flex-col overflow-hidden bg-card pt-[clamp(7.5rem,30vw,9.5rem)] text-card-foreground [--orbit:min(88vw,56svh)] lg:min-h-[max(100svh,44rem)] lg:pt-[clamp(4.5rem,5.2vw,5rem)] lg:[--orbit:clamp(24rem,min(44vw,100svh-32rem),40rem)]",
        className,
      )}
    >
      <motion.div style={{ y: drift }} className="relative z-10 flex flex-col items-center gap-[clamp(1.5rem,2.1vw,1.875rem)] will-change-transform">
        <p className="sr-only">{brand}</p>
        <div
          ref={brandBox}
          data-hero-wordmark
          aria-hidden="true"
          className="mx-auto w-[calc(var(--container)*0.7)] whitespace-nowrap lg:w-[calc(var(--container)/2)] text-center font-[family-name:var(--font-heading)] text-[length:10rem] font-semibold leading-[0.8] tracking-[-0.03em] text-card-foreground"
        >
          <div ref={brandRow} className="inline-flex">
            {letters.map((char, i) => (
              <div key={i} className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em]">
                <div className="whitespace-pre">{char}</div>
              </div>
            ))}
          </div>
        </div>
        {primaryButton && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: slow, ease, delay: 0.05 }}
          >
            <MoreArrowPill text={primaryButton.text} href={primaryButton.href} />
          </motion.div>
        )}
      </motion.div>

      <div className="relative mx-auto mt-[clamp(1.5rem,2.1vw,1.875rem)] flex w-[var(--container)] flex-1 flex-col items-center lg:grid lg:grid-cols-12 lg:items-center lg:gap-[var(--gap)] lg:pb-[clamp(1.5rem,3svh,2.5rem)]">
        <div className="relative flex w-full flex-col items-center gap-[clamp(1.5rem,5vw,2rem)] lg:col-span-7 lg:gap-0">
          <div className="relative size-[var(--orbit)] shrink-0">
            <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" className="pointer-events-none absolute inset-0 size-full overflow-visible text-secondary">
              <motion.circle
                cx="50"
                cy="50"
                r="49"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
                transform="rotate(150 50 50)"
                style={{ strokeWidth: "clamp(14px, 1.7vw, 24px)" }}
                initial={reduce ? false : { pathLength: 0 }}
                animate={show({ pathLength: 1 })}
                transition={{ duration: 1.6, ease, delay: 0.1 }}
              />
            </svg>

            <div
              data-model-anchor={media === "model" ? "" : undefined}
              aria-hidden={media === "model" || undefined}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[calc(var(--orbit)*0.78)] w-[calc(var(--orbit)*0.56)] -translate-x-1/2 -translate-y-1/2 lg:top-[72%] lg:h-[calc(var(--orbit)*1.02)] lg:w-[calc(var(--orbit)*0.7)]"
            >
              {media === "image" && <MoreProductPhoto imageSrc={productImageSrc} imageAlt={productImageAlt} />}
            </div>

            {items.length > 0 && (
              <ul className="absolute inset-0 hidden lg:block">
                {items.map((item, i) => {
                  const angle = ((n > 1 ? -124 - (92 * i) / (n - 1) : -170) * Math.PI) / 180;
                  return (
                    <li
                      key={`${i}-${item.title}`}
                      style={{ left: `${(50 + 50 * Math.cos(angle)).toFixed(2)}%`, top: `${(50 + 50 * Math.sin(angle)).toFixed(2)}%` } as CSSProperties}
                      className="@container absolute z-10 size-[clamp(6.5rem,calc(var(--orbit)*0.28),8.75rem)] -translate-x-1/2 -translate-y-1/2"
                    >
                      <motion.div
                        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                        animate={show({ scale: 1, opacity: 1 })}
                        transition={{ scale: { type: "spring", stiffness: 260, damping: 14, delay: 0.2 + i * 0.08 }, opacity: { duration: 0.3, delay: 0.2 + i * 0.08 } }}
                        className="flex size-full flex-col items-center justify-center gap-[5cqw] rounded-full bg-background text-foreground"
                      >
                        <div className="flex items-baseline font-[family-name:var(--font-heading)] font-semibold leading-[0.75] tracking-[-0.03em]">
                          <p className="whitespace-nowrap text-[length:37cqw]">{item.value}</p>
                          {item.unit && <p className="whitespace-nowrap text-[length:21cqw] uppercase">{item.unit}</p>}
                        </div>
                        <p className="max-w-[86%] text-center font-[family-name:var(--font-heading)] text-[length:14.5cqw] font-medium leading-[0.92] tracking-[-0.03em]">{item.title}</p>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <ul className="flex justify-center gap-[0.75rem] lg:hidden">
              {items.map((item, i) => (
                <li key={`${i}-${item.title}`} className="@container size-[min(7.5rem,27vw)]">
                  <motion.div
                    initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                    animate={show({ scale: 1, opacity: 1 })}
                    transition={{ scale: { type: "spring", stiffness: 260, damping: 14, delay: 0.2 + i * 0.08 }, opacity: { duration: 0.3, delay: 0.2 + i * 0.08 } }}
                    className="flex size-full flex-col items-center justify-center gap-[5cqw] rounded-full bg-background text-foreground"
                  >
                    <div className="flex items-baseline font-[family-name:var(--font-heading)] font-semibold leading-[0.75] tracking-[-0.03em]">
                      <p className="whitespace-nowrap text-[length:37cqw]">{item.value}</p>
                      {item.unit && <p className="whitespace-nowrap text-[length:21cqw] uppercase">{item.unit}</p>}
                    </div>
                    <p className="max-w-[86%] text-center font-[family-name:var(--font-heading)] text-[length:14.5cqw] font-medium leading-[0.92] tracking-[-0.03em]">{item.title}</p>
                  </motion.div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative z-10 mt-[clamp(2.5rem,10vw,4rem)] flex w-full flex-col items-center gap-[1.875rem] text-center lg:col-span-5 lg:mt-0">
          <h1
            aria-label={title}
            className="w-full font-[family-name:var(--font-heading)] text-[length:clamp(5rem,26vw,7rem)] font-semibold uppercase leading-[0.84] tracking-[-0.03em] lg:text-[length:clamp(4rem,min(7.8vw,11svh),7rem)]"
          >
            {lines.map((words, l) => (
              <FitLine key={l} text={words.join(" ")} className={l === 0 ? "text-secondary" : "mt-[clamp(0.875rem,1.4vw,1.25rem)] leading-none tracking-[0.02em] text-card-foreground"}>
                {words.map((word, w) => {
                  const index = wordIndex++;
                  return (
                    <div key={w} className="overflow-hidden pt-[0.1em] -mt-[0.1em] pb-[0.15em] -mb-[0.15em]">
                      <motion.div
                        initial={reduce ? false : { y: "110%" }}
                        animate={show({ y: "0%" })}
                        transition={{ duration: slow, ease, delay: 0.2 + index * 0.045 }}
                        className="whitespace-nowrap"
                      >
                        {word}
                      </motion.div>
                    </div>
                  );
                })}
              </FitLine>
            ))}
          </h1>
          {description && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={show({ opacity: 1, y: 0 })}
              transition={{ duration: slow, ease, delay: 0.45 }}
              className="max-w-[23rem] text-balance text-[length:1.875rem] leading-[0.92] tracking-[-0.03em] text-card-foreground"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>

      {marquee && <CurvedMarquee text={marquee} />}
    </section>
  );
};

export default HeroWordmarkProduct;
