import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Sun, Briefcase, Dumbbell, Plane } from "lucide-react";
import { useKitMotion } from "@/components/kit/kitMotion";
import { modelChapter, type ModelChapter } from "@/components/kit/modelPose";
import MoreProductPhoto from "@/components/kit/MoreProductPhoto";
import MoreTwoTone from "@/components/kit/MoreTwoTone";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Row = { title: string; ours?: boolean; other?: boolean };

type ApplicationArea = {
  icon: React.ReactNode;
  label: string;
};

type ProductCompareTableProps = {
  title?: string;
  accent?: string;
  benefitsLabel?: string;
  name?: string;
  otherLabel?: string;
  items?: Row[];
  model?: ModelChapter;
  media?: "model" | "image";
  productImageSrc?: string;
  productImageAlt?: string;
  ariaLabel?: string;
  className?: string;
  suitableForTitle?: string;
  applicationAreas?: ApplicationArea[];
};

const DEFAULT_APPLICATION_AREAS: ApplicationArea[] = [
  { icon: <Sun className="w-4 h-4 text-white" />, label: "MORGENS" },
  { icon: <Briefcase className="w-4 h-4 text-white" />, label: "ARBEIT & FOKUS" },
  { icon: <Dumbbell className="w-4 h-4 text-white" />, label: "SPORT" },
  { icon: <Plane className="w-4 h-4 text-white" />, label: "REISEN" },
];

const POP: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const Check = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[clamp(1.25rem,1.6vw,1.75rem)] -rotate-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);

const Cross = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[clamp(1.125rem,1.4vw,1.5rem)]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

const ProductCompareTable = ({
  title = "See the difference.",
  accent = "More for you.",
  benefitsLabel = "Benefits",
  name = "Verde",
  otherLabel = "The usual",
  items = [
    { title: "Low in carbs" },
    { title: "Low in sugar" },
    { title: "High in protein" },
    { title: "Keeps you full for longer" },
    { title: "Made with real ingredients" },
    { title: "Ready in under a minute" },
  ],
  model,
  media = "model",
  productImageSrc = "https://images.pexels.com/photos/26348192/pexels-photo-26348192.jpeg?auto=compress&w=1200",
  productImageAlt = "Amber bottles lined up on a warm set",
  ariaLabel,
  className,
  suitableForTitle = "BESONDERS GEEIGNET FÜR",
  applicationAreas = DEFAULT_APPLICATION_AREAS,
}: ProductCompareTableProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { base } = useKitMotion();
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "center center"] });
  const clip = useTransform(scrollYProgress, (v) => {
    const left = 1 - Math.min(1, Math.max(0, v));
    return `inset(${(22 * left).toFixed(2)}% ${(20 * left).toFixed(2)}% round var(--radius-image))`;
  });

  return (
    <section
      aria-label={ariaLabel ?? `${accent} ${title}`.trim()}
      {...modelChapter(media === "model" ? model : undefined)}
      className={cn("relative py-[var(--section-space)] text-foreground", className)}
    >
      <div className="mx-auto w-[var(--container)]">
        <div className="grid gap-[clamp(1.5rem,3vw,3rem)] rounded-[var(--radius-card)] bg-secondary p-[clamp(0.5rem,0.7vw,0.625rem)] text-secondary-foreground lg:grid-cols-2 lg:gap-[var(--gap)]">
          <div ref={frameRef} className="relative flex items-center justify-center lg:min-h-[min(54rem,88svh)]">
            <motion.div
              aria-hidden="true"
              style={reduce ? undefined : { clipPath: clip }}
              className="absolute inset-0 overflow-hidden rounded-[var(--radius-image)] bg-card will-change-[clip-path]"
            >
              <svg viewBox="0 0 600 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-secondary">
                <path d="M-40 300C120 360 220 520 300 640S520 860 680 820" fill="none" stroke="currentColor" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: "clamp(18px, 2.2vw, 36px)" }} />
              </svg>
            </motion.div>
            <div data-model-anchor={media === "model" ? "" : undefined} aria-hidden={media === "model" || undefined} className="relative h-[34svh] w-[88%] lg:h-[min(76svh,50rem)] lg:w-[90%]">
              {media === "image" && <MoreProductPhoto imageSrc={productImageSrc} imageAlt={productImageAlt} />}
            </div>
          </div>
          <div className="flex flex-col justify-center gap-[clamp(1.5rem,3vw,3rem)] px-[clamp(0.75rem,3vw,2rem)] pb-[clamp(1.5rem,4vw,3rem)] lg:pl-[clamp(1rem,4vw,4rem)] lg:pr-[clamp(1rem,2.5vw,2rem)] lg:py-[clamp(2rem,4vw,3.5rem)]">
            <MoreTwoTone title={title} accent={accent} accentFirst accentClassName="text-secondary-foreground/70" className="max-w-none text-[length:var(--text-h3)]" />
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-secondary-foreground">
                  <th scope="col" className="pb-[clamp(0.75rem,1.2vw,1rem)] pr-4 align-bottom font-normal">
                    <p className="text-[length:var(--text-small)] leading-[1.1]">{benefitsLabel}</p>
                  </th>
                  <th scope="col" className="px-1 pb-[clamp(0.75rem,1.2vw,1rem)] text-center align-bottom">
                    <p className="whitespace-nowrap font-[family-name:var(--font-heading)] text-[length:var(--text-body-lg)] font-semibold leading-none tracking-[var(--heading-tracking)]">{name}</p>
                  </th>
                  <th scope="col" className="pb-[clamp(0.75rem,1.2vw,1rem)] pl-1 text-center align-bottom font-normal">
                    <p className="whitespace-nowrap text-[length:var(--text-small)] leading-[1.1]">{otherLabel}</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={reduce ? false : "hidden"}
                    whileInView="shown"
                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    className="border-b border-secondary-foreground/15 last:border-b-0"
                  >
                    <th scope="row" className="py-2 pr-4 font-normal">
                      <p className="text-balance font-[family-name:var(--font-heading)] text-[length:var(--text-body)] leading-[1.1] tracking-[var(--heading-tracking)] [overflow-wrap:anywhere]">{item.title}</p>
                    </th>
                    {[item.ours ?? true, item.other ?? false].map((yes, col) => (
                      <td key={col} className="px-1 py-2">
                        <motion.div
                          aria-label={yes ? "Yes" : "No"}
                          role="img"
                          variants={{
                            hidden: { scale: 0.6, opacity: 0 },
                            shown: { scale: 1, opacity: 1, transition: { duration: base, ease: POP, delay: 0.1 + col * 0.08 } },
                          }}
                          className={cn(
                            "mx-auto flex h-[3.125rem] items-center justify-center",
                            col === 0 ? "w-[clamp(2.75rem,7.5vw,6.75rem)] rounded-[calc(var(--radius-card)-0.25rem)] bg-background text-foreground" : "w-[clamp(2.75rem,5vw,4rem)]",
                            !yes && col === 0 && "bg-transparent",
                          )}
                        >
                          {yes ? <Check /> : <Cross />}
                        </motion.div>
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {suitableForTitle && applicationAreas && applicationAreas.length > 0 && (
              <div className="mt-5 pt-5 border-t border-secondary-foreground/20">
                <p className="text-[11px] font-black uppercase tracking-widest text-[#0A1C3A] mb-3">
                  {suitableForTitle}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {applicationAreas.map((area, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0A1C3A] text-white flex items-center justify-center shrink-0 shadow-sm">
                        {area.icon}
                      </div>
                      <span className="text-xs font-black text-[#0A1C3A] uppercase tracking-tight leading-tight">
                        {area.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCompareTable;
