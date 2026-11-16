import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import { modelChapter, type ModelChapter } from "@/components/kit/modelPose";
import MoreProductPhoto from "@/components/kit/MoreProductPhoto";
import MoreTwoTone from "@/components/kit/MoreTwoTone";
import ImageScrollParallax from "@/components/animation/ImageScrollParallax";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Frame = { imageSrc: string; imageAlt?: string; title?: string };

type GalleryTiltedFramesProps = {
  title?: string;
  accent?: string;
  items?: Frame[];
  model?: ModelChapter;
  media?: "model" | "image";
  productImageSrc?: string;
  productImageAlt?: string;
  ariaLabel?: string;
  className?: string;
};

const photo = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

const GalleryTiltedFrames = ({
  title = "Life with a little more.",
  accent = "Shared by you.",
  items = [
    { imageSrc: photo(2696064), imageAlt: "Two cooks in an open kitchen", title: "Sunday prep" },
    { imageSrc: photo(40105328), imageAlt: "Woman deadlifting in a bright gym", title: "After the session" },
    { imageSrc: photo(1813466), imageAlt: "Coffee and pastries in a cafe", title: "Morning stop" },
    { imageSrc: photo(1268855), imageAlt: "Friends walking a jetty", title: "Out for the day" },
  ],
  model,
  media = "model",
  productImageSrc = "https://images.pexels.com/photos/2067628/pexels-photo-2067628.jpeg?auto=compress&w=1200",
  productImageAlt = "Latte art in a ceramic cup",
  ariaLabel,
  className,
}: GalleryTiltedFramesProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start end", "end start"] });
  const slow = useTransform(scrollYProgress, [0, 1], ["3rem", "-3rem"]);
  const fast = useTransform(scrollYProgress, [0, 1], ["7rem", "-7rem"]);
  const half = Math.ceil(items.length / 2);
  const columns: { list: { item: Frame; index: number }[]; y: MotionValue<string>; place: string }[] = [
    { list: [], y: slow, place: "lg:order-1" },
    { list: [], y: fast, place: "mt-[clamp(1.5rem,5vw,2.5rem)] lg:order-3 lg:mt-0" },
  ];
  items.forEach((item, index) => columns[index < half ? 0 : 1].list.push({ item, index }));

  return (
    <section aria-label={ariaLabel ?? `${title} ${accent}`} {...modelChapter(media === "model" ? model : undefined)} className={cn("relative overflow-x-clip py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <MoreTwoTone title={title} accent={accent} className="mx-auto max-w-[12em] justify-center text-center" />

        <div ref={gridRef} className="mt-[clamp(1.5rem,3vw,3rem)] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,30%)_minmax(0,1fr)] lg:items-center lg:gap-x-[clamp(1.5rem,3vw,3rem)]">
          <div className="flex items-center justify-center pb-[clamp(2rem,6vw,3rem)] lg:order-2 lg:pb-0">
            <div data-model-anchor={media === "model" ? "" : undefined} aria-hidden={media === "model" || undefined} className="pointer-events-none h-[30svh] w-[80%] lg:h-[min(80svh,48rem)] lg:w-full">
              {media === "image" && <MoreProductPhoto imageSrc={productImageSrc} imageAlt={productImageAlt} />}
            </div>
          </div>

          {columns.map((column, c) => (
            <motion.div key={c} style={{ y: reduce ? 0 : column.y }} className={cn("grid min-w-0 grid-cols-2 items-start gap-x-[var(--gap)] gap-y-[clamp(1.5rem,3vw,2.5rem)] will-change-transform [&>*:nth-child(even)]:mt-[clamp(2.5rem,6vw,5rem)]", column.place)}>
              {column.list.map(({ item, index }) => {
                const rest = index % 4 < 2 ? (index % 2 === 0 ? -2.5 : 2) : index % 2 === 0 ? 3 : -2;
                const sign = rest < 0 ? -1 : 1;
                return (
                  <motion.figure
                    key={index}
                    initial={reduce ? false : "hidden"}
                    whileInView="shown"
                    viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                    variants={{
                      hidden: { rotate: rest + sign * 8, y: 40 },
                      shown: { rotate: rest, y: 0, transition: { duration: kit.slow, ease: kit.ease } },
                    }}
                    style={{ rotate: rest }}
                    className="m-0 flex flex-col gap-[clamp(0.6rem,1vw,0.9rem)]"
                  >
                    <div className="rounded-[var(--radius-image)] bg-secondary p-[clamp(0.5rem,1vw,0.9rem)]">
                      <motion.div
                        variants={{
                          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
                          shown: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: kit.slow, ease: kit.ease, delay: 0.1 } },
                        }}
                        className="overflow-hidden rounded-[calc(var(--radius-image)-0.25rem)]"
                      >
                        <ImageScrollParallax imageSrc={item.imageSrc} imageAlt={item.imageAlt ?? ""} strength={c === 0 ? 0.1 : 0.18} className="aspect-[4/5] rounded-none" />
                      </motion.div>
                    </div>
                    {item.title && (
                      <figcaption className="px-[0.2rem] text-balance text-[length:var(--text-small)] leading-[1.1] text-muted-foreground">
                        {item.title}
                      </figcaption>
                    )}
                  </motion.figure>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryTiltedFrames;
