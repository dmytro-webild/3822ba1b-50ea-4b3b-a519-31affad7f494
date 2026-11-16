import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import { modelChapter, type ModelChapter } from "@/components/kit/modelPose";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Review = { title: string; quote: string; name: string; badge?: string };

type TestimonialPhotoRailProps = {
  title?: string;
  label?: string;
  imageSrc?: string;
  imageAlt?: string;
  items?: Review[];
  model?: ModelChapter;
  media?: "model" | "image";
  ariaLabel?: string;
  className?: string;
};

const TestimonialPhotoRail = ({
  title = "Clean. Green. Goodness.",
  label = "Don't take our word for it",
  imageSrc = "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1600",
  imageAlt = "",
  items = [
    { title: "Best one yet!", quote: "Creamy, not too sweet and it keeps me full until lunch.", name: "Daniela A.", badge: "Verified" },
    { title: "My new ritual", quote: "Shaken with oat milk and ice before the school run. Every single day.", name: "Tom R.", badge: "Verified" },
    { title: "Super smooth", quote: "No clumps, no chalky taste. I finally like my protein.", name: "Priya K.", badge: "Verified" },
    { title: "Worth it", quote: "The subscription is easy to pause and the tub lasts the month.", name: "Marcus L.", badge: "Verified" },
  ],
  model,
  media = "model",
  ariaLabel,
  className,
}: TestimonialPhotoRailProps) => {
  const isModel = media === "model";
  const reduce = useReducedMotion();
  const { ease, slow } = useKitMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });

  return (
    <section
      aria-label={ariaLabel ?? title}
      {...modelChapter(isModel ? model : undefined)}
      className={cn("relative overflow-x-clip py-[var(--section-space)] text-foreground [--overlap:clamp(6rem,14svh,9rem)]", className)}
    >
      <div
        className={cn(
          "relative mx-auto grid w-[var(--container)] grid-cols-1 items-center justify-items-center gap-y-[clamp(1rem,3vw,2rem)] overflow-hidden rounded-[var(--radius-card)] bg-card px-[clamp(1.25rem,3vw,3rem)] pb-[calc(var(--overlap)+clamp(1.5rem,3svh,2.5rem))] pt-[clamp(2.5rem,6vw,5rem)] lg:gap-x-[var(--gap)]",
          isModel ? "lg:grid-cols-[minmax(0,1fr)_clamp(15rem,26vw,26rem)_minmax(0,1fr)]" : "lg:grid-cols-2",
        )}
      >
        <h2 aria-label={title} className="flex flex-col items-center text-center text-[length:min(var(--text-h1),16vw)] font-bold uppercase leading-[0.82] tracking-[-0.03em] lg:col-start-1 lg:row-start-1 lg:items-start lg:justify-self-start lg:text-left lg:text-[length:clamp(3rem,6vw,6.5rem)]">
          {title.trim().split(/\s+/).map((word, index) => (
            <div key={index} aria-hidden="true" className="overflow-hidden pb-[0.15em] -mb-[0.15em]">
              <motion.div
                initial={reduce ? false : { y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: slow, ease, delay: index * 0.09 }}
                className={cn("whitespace-nowrap", index === 0 ? "text-secondary" : "text-card-foreground")}
              >
                {word}
              </motion.div>
            </div>
          ))}
        </h2>
        {isModel && (
        <div className="relative flex w-full justify-center lg:col-start-2 lg:row-start-1">
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 400 400"
            initial={reduce ? false : "hidden"}
            whileInView="shown"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[96%] w-auto -translate-x-1/2 -translate-y-1/2 rotate-[200deg] overflow-visible text-secondary"
          >
            <motion.circle
              cx="200"
              cy="200"
              r="180"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: "clamp(18px, 2.2vw, 36px)" }}
              variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 0.62, transition: { duration: slow * 1.4, ease } } }}
            />
          </motion.svg>
          <div data-model-anchor="" aria-hidden="true" className="relative aspect-[4/5] h-[30svh] max-w-full lg:h-[clamp(22rem,36vw,34rem)]" />
        </div>
        )}
        <div className={cn("relative flex flex-col items-center gap-[clamp(1rem,2vw,1.75rem)] lg:row-start-1 lg:items-end lg:justify-self-end", isModel ? "lg:col-start-3" : "lg:col-start-2")}>
          <motion.div
            initial={reduce ? false : { rotate: 10, y: 40, opacity: 0 }}
            whileInView={{ rotate: 3, y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: slow, ease }}
            className="hidden w-[clamp(10rem,16vw,15rem)] rounded-[var(--radius-image)] bg-secondary p-[clamp(0.5rem,0.8vw,0.75rem)] lg:block"
          >
            <ImageScrollParallax imageSrc={imageSrc} imageAlt={imageAlt} strength={0.08} className="aspect-[4/5] rounded-[calc(var(--radius-image)-0.25rem)]" />
          </motion.div>
        <div className="relative flex flex-col items-center gap-[clamp(0.75rem,1.6svh,1.25rem)] lg:items-end">
          <motion.p
            initial={reduce ? false : { y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: slow, ease }}
            className="max-w-[12em] text-balance text-center text-[length:var(--text-body-lg)] font-semibold uppercase leading-[0.9] tracking-[-0.03em] text-card-foreground lg:text-right"
          >
            {label}
          </motion.p>
          <div className="flex gap-[5px]">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => emblaApi?.scrollPrev()}
              className="flex size-[clamp(2.75rem,2.4rem+1vw,3.125rem)] items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-primary hover:text-primary-foreground"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-[1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 8H3M7 4L3 8l4 4" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next review"
              onClick={() => emblaApi?.scrollNext()}
              className="flex size-[clamp(2.75rem,2.4rem+1vw,3.125rem)] items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-primary hover:text-primary-foreground"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-[1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-[var(--overlap)] w-[var(--container)]">
        <div ref={emblaRef} className="-mx-[0.75rem] -my-[2rem] overflow-hidden px-[0.75rem] py-[2rem]">
          <ul className="-ml-[var(--gap)] flex touch-pan-y">
            {items.map((item, index) => (
              <li key={index} className="min-w-0 shrink-0 grow-0 basis-full pl-[var(--gap)] lg:basis-1/2 xl:basis-1/3">
                <motion.div
                  initial={reduce ? false : { y: 40, rotate: index % 2 === 0 ? -8 : 8, opacity: 0 }}
                  whileInView={{ y: 0, rotate: index % 2 === 0 ? -2 : 2, opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                  transition={{ duration: slow, ease, delay: (index % 3) * 0.08 }}
                  className="flex h-full flex-col rounded-[var(--radius-card)] bg-secondary p-[clamp(1.5rem,2.8vw,2.5rem)] text-secondary-foreground"
                >
                  <div className="flex gap-[2px] text-accent" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <svg key={star} viewBox="0 0 16 16" aria-hidden="true" className="size-[0.9rem]" fill="currentColor">
                        <path d="M8 1.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 12l-4.2 2.2.8-4.7L1.2 6.2l4.7-.7z" />
                      </svg>
                    ))}
                  </div>
                  <h3 className="mt-[clamp(1rem,1.6vw,1.25rem)] text-balance text-[length:calc(var(--text-h3)*0.62)] leading-[0.92] tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-[0.6rem] text-balance pb-[clamp(1.5rem,2.6vw,2.5rem)] text-[length:var(--text-body)] leading-[1.2]">{item.quote}</p>
                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-secondary-foreground/15 pt-[clamp(0.875rem,1.2vw,1rem)]">
                    <p className="text-[length:var(--text-body)] font-medium leading-none">{item.name}</p>
                    {item.badge && (
                      <div className="flex shrink-0 items-center gap-[0.35rem]">
                        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-[1.1rem] text-accent" fill="currentColor">
                          <path d="M8 0.8l1.9 1.3 2.3-.1.8 2.1 1.9 1.4-.6 2.2.6 2.2-1.9 1.4-.8 2.1-2.3-.1L8 15.2l-1.9-1.3-2.3.1-.8-2.1-1.9-1.4.6-2.2-.6-2.2 1.9-1.4.8-2.1 2.3.1z" />
                          <path d="M5.2 8.2l1.9 1.9 3.8-3.9" fill="none" stroke="var(--secondary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="whitespace-nowrap text-[length:var(--text-small)] leading-none">{item.badge}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TestimonialPhotoRail;
