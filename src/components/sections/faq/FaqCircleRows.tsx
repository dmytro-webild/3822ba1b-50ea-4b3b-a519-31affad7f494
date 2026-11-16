import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import { modelChapter, type ModelChapter } from "@/components/kit/modelPose";
import MoreTwoTone from "@/components/kit/MoreTwoTone";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Question = { title: string; description: string };

type FaqCircleRowsProps = {
  title?: string;
  accent?: string;
  items?: Question[];
  model?: ModelChapter;
  media?: "model" | "image";
  ariaLabel?: string;
  className?: string;
};

const FaqCircleRows = ({
  title = "Asked and answered.",
  accent = "Good questions.",
  items = [
    { title: "How do I make it?", description: "Shake two scoops with 300 ml of cold milk or water and pour over ice. It is ready in under a minute." },
    { title: "How much protein is in a serving?", description: "Each serving has 20 g of protein and less than 2 g of sugar." },
    { title: "Can I pause my subscription?", description: "Yes. Skip a month, pause or cancel from your account at any time, with no fees." },
    { title: "Where do you deliver?", description: "Across the UK. Orders placed before 2 pm leave the same day and usually arrive in one to two days." },
    { title: "Is it suitable for vegans?", description: "Yes. Every flavour is plant based and made without dairy." },
  ],
  model,
  media = "model",
  ariaLabel,
  className,
}: FaqCircleRowsProps) => {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const { ease, base } = useKitMotion();
  const id = useId();

  return (
    <section
      aria-label={ariaLabel ?? `${accent} ${title}`.trim()}
      {...modelChapter(media === "model" ? model : undefined)}
      className={cn("relative py-[var(--section-space)] text-foreground", className)}
    >
      <div className="mx-auto grid w-[var(--container)] gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[5fr_7fr] lg:gap-[var(--gap)]">
        <div className="flex flex-col gap-[clamp(1.5rem,3vw,3rem)]">
          <MoreTwoTone title={title} accent={accent} accentFirst className="max-w-[10em]" />
          {media === "model" && <div data-model-anchor="" aria-hidden="true" className="relative h-[30svh] w-full lg:h-[50svh]" />}
        </div>
        <ul className="border-t border-foreground">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={index} className="border-b border-foreground/15">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-[clamp(0.75rem,1.2vw,1rem)] text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  >
                    <h3 className="text-balance text-[length:var(--text-body-lg)] font-normal leading-[1.05] [overflow-wrap:anywhere]">{item.title}</h3>
                    <motion.div
                      aria-hidden="true"
                      initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: base, ease: [0.34, 1.56, 0.64, 1], delay: Math.min(index, 8) * 0.06 }}
                      className="flex size-[clamp(2.75rem,4vw,3.5rem)] shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className={cn("size-[38%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]", isOpen && "rotate-45")}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      >
                        <path d="M8 2v12M2 8h12" />
                      </svg>
                    </motion.div>
                  </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${id}-${index}`}
                      initial={reduce ? false : { height: 0 }}
                      animate={{ height: "auto" }}
                      exit={reduce ? undefined : { height: 0 }}
                      transition={{ duration: base, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[36em] pb-[clamp(1rem,1.6vw,1.5rem)] pr-[clamp(3.5rem,5vw,4.5rem)] text-[length:var(--text-body)] leading-[1.35] text-muted-foreground">{item.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FaqCircleRows;
