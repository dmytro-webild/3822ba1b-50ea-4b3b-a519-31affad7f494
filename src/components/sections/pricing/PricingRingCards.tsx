import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import { modelChapter, type ModelChapter } from "@/components/kit/modelPose";
import MoreTwoTone from "@/components/kit/MoreTwoTone";
import MoreArrowPill from "@/components/kit/MoreArrowPill";
import MoreRibbon from "@/components/kit/MoreRibbon";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Plan = { title: string; price: string; period?: string; features?: string[]; button?: { text: string; href: string } };

type PricingRingCardsProps = {
  title?: string;
  accent?: string;
  description?: string;
  items?: Plan[];
  model?: ModelChapter;
  media?: "model" | "image";
  ariaLabel?: string;
  className?: string;
};

const PricingRingCards = ({
  title = "More every month.",
  accent = "Pick your plan.",
  description = "Same latte, your pace. Pause, skip or cancel any time.",
  items = [
    { title: "One tub", price: "£24", period: "once", features: ["20 servings", "Free delivery over £30", "Any flavour"], button: { text: "Buy now", href: "#" } },
    { title: "Monthly", price: "£21", period: "/ month", features: ["20 servings a month", "Free delivery", "Skip or pause any time"], button: { text: "Subscribe", href: "#" } },
    { title: "Duo", price: "£38", period: "/ month", features: ["Two tubs a month", "Free flavour add-on", "Free delivery"], button: { text: "Subscribe", href: "#" } },
  ],
  model,
  media = "model",
  ariaLabel,
  className,
}: PricingRingCardsProps) => {
  const isModel = media === "model";
  const reduce = useReducedMotion();
  const { ease, base, slow } = useKitMotion();

  return (
    <section
      aria-label={ariaLabel ?? `${accent} ${title}`.trim()}
      {...modelChapter(isModel ? model : undefined)}
      className={cn("relative overflow-hidden py-[var(--section-space)] text-foreground", className)}
    >
      <div className="mx-auto flex w-[var(--container)] flex-col items-center gap-[clamp(1.5rem,3vw,3rem)]">
        <div className="flex flex-col items-center gap-[clamp(1rem,2vw,1.75rem)] text-center">
          <MoreTwoTone title={title} accent={accent} accentFirst className="justify-center text-center" />
          {description && (
            <p className="max-w-[22em] text-balance text-[length:var(--text-body-lg)] leading-[1.1] tracking-[-0.02em]">{description}</p>
          )}
        </div>
        <div className={cn("grid w-full grid-cols-1 items-center gap-[var(--gap)]", isModel && "lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)]")}>
        {isModel && (
        <div className="relative flex w-full justify-center lg:h-full lg:items-center">
          <MoreRibbon shape="coil" className="-inset-x-[10vw] -inset-y-[6%] lg:-left-[10vw] lg:right-0" />
          <div data-model-anchor="" aria-hidden="true" className="relative h-[30svh] w-[70%] lg:h-[min(60svh,36rem)] lg:w-[min(80%,30rem)]" />
        </div>
        )}
        <ul className={cn("grid w-full gap-[var(--gap)]", !isModel && "lg:auto-cols-fr lg:grid-flow-col")}>
          {items.map((item, index) => {
            const tilt = index % 2 === 0 ? -1.5 : 1.5;
            return (
              <motion.li
                key={index}
                initial={reduce ? { rotate: tilt } : { opacity: 0, y: 40, rotate: tilt * 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: tilt }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: slow, ease, delay: index * 0.08 }}
                className="h-full"
              >
                <div className="kit-card flex h-full flex-col gap-[clamp(1.25rem,2vw,1.75rem)] p-[clamp(1.25rem,2.2vw,2rem)] [container-type:inline-size]">
                  <h3 className="text-balance text-[length:calc(var(--text-h3)*0.7)] uppercase leading-[0.9] text-secondary [overflow-wrap:anywhere]">{item.title}</h3>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <p className="whitespace-nowrap font-[family-name:var(--font-heading)] text-[length:min(var(--text-h2),24cqi)] font-semibold leading-[0.9] tracking-[var(--heading-tracking)]">{item.price}</p>
                    {item.period && <p className="whitespace-nowrap text-[length:var(--text-small)] leading-none">{item.period}</p>}
                  </div>
                  {item.features && item.features.length > 0 && (
                    <ul className="flex flex-col gap-2 border-t border-foreground/15 pt-[clamp(1rem,1.6vw,1.25rem)]">
                      {item.features.map((feature, f) => (
                        <li key={f} className="flex items-start gap-3">
                          <motion.div
                            aria-hidden="true"
                            initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: base, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 + index * 0.08 + f * 0.05 }}
                            className="mt-[0.35em] size-[0.7em] shrink-0 rounded-full bg-secondary"
                          />
                          <p className="text-[length:var(--text-body)] leading-[1.25] [overflow-wrap:anywhere]">{feature}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.button && <MoreArrowPill text={item.button.text} href={item.button.href} tone="light" className="mt-auto" />}
                </div>
              </motion.li>
            );
          })}
        </ul>
        </div>
      </div>
    </section>
  );
};

export default PricingRingCards;
