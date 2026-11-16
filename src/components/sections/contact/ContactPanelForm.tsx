import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import { modelChapter, type ModelChapter } from "@/components/kit/modelPose";
import MoreTwoTone from "@/components/kit/MoreTwoTone";
import MoreArrowPill from "@/components/kit/MoreArrowPill";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Field = { name: string; label: string; type?: "text" | "email" | "tel" | "textarea"; placeholder?: string };

type ContactPanelFormProps = {
  title?: string;
  accent?: string;
  fields?: Field[];
  button?: { text: string; href: string };
  model?: ModelChapter;
  media?: "model" | "image";
  ariaLabel?: string;
  className?: string;
};

const ContactPanelForm = ({
  title = "Say hello.",
  accent = "We read every note.",
  fields = [
    { name: "name", label: "Name", placeholder: "Your name" },
    { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
    { name: "message", label: "Message", type: "textarea", placeholder: "Orders, wholesale, or just your favourite flavour" },
  ],
  button = { text: "Send message", href: "#" },
  model,
  media = "model",
  ariaLabel,
  className,
}: ContactPanelFormProps) => {
  const isModel = media === "model";
  const reduce = useReducedMotion();
  const { ease, base, slow } = useKitMotion();

  return (
    <section aria-label={ariaLabel ?? `${title} ${accent}`.trim()} {...modelChapter(isModel ? model : undefined)} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className={cn("mx-auto grid w-[var(--container)] items-stretch gap-[var(--gap)]", isModel && "lg:grid-cols-2")}>
        <div className={cn("flex flex-col gap-[clamp(1.5rem,3vw,3rem)] lg:py-[clamp(1rem,3vw,2.5rem)]", !isModel && "lg:grid lg:grid-cols-2 lg:items-start lg:gap-[var(--gap)] lg:py-0")}>
          <MoreTwoTone title={title} accent={accent} className="max-w-[10em]" />
          <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-[clamp(0.875rem,1.4vw,1.25rem)]">
            {fields.map((field, index) => (
              <motion.label
                key={field.name}
                initial={reduce ? false : { y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px 0px 0px" }}
                transition={{ duration: slow * 0.7, ease, delay: index * 0.05 }}
                className="flex flex-col gap-[0.5rem]"
              >
                <p className="pl-[1.25rem] text-[length:var(--text-small)] font-medium leading-none">{field.label}</p>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    rows={5}
                    className="min-h-[9rem] w-full resize-none rounded-[1.5rem] bg-secondary px-[1.25rem] py-[1rem] text-[length:var(--text-body)] leading-[1.3] text-secondary-foreground outline-none transition-shadow placeholder:text-secondary-foreground/70 focus-visible:ring-2 focus-visible:ring-ring"
                  />
                ) : (
                  <input
                    name={field.name}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    className="h-[clamp(3rem,2.6rem+1.2vw,3.5rem)] w-full rounded-full bg-secondary px-[1.25rem] text-[length:var(--text-body)] text-secondary-foreground outline-none transition-shadow placeholder:text-secondary-foreground/70 focus-visible:ring-2 focus-visible:ring-ring"
                  />
                )}
              </motion.label>
            ))}
            {button && (
              <motion.div
                initial={reduce ? false : { y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px 0px 0px" }}
                transition={{ duration: slow * 0.7, ease, delay: fields.length * 0.05 }}
                className="pt-[0.5rem]"
              >
                <MoreArrowPill text={button.text} type="submit" />
              </motion.div>
            )}
          </form>
        </div>

        {isModel && (
        <div className="relative -order-1 flex h-[32svh] items-center justify-center overflow-hidden rounded-[var(--radius-card)] lg:order-none lg:h-auto lg:min-h-[clamp(30rem,62svh,42rem)] lg:bg-card">
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 400 400"
            initial={reduce ? false : "hidden"}
            whileInView="shown"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[82%] lg:block w-auto -translate-x-1/2 -translate-y-1/2 rotate-[150deg] overflow-visible text-secondary"
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
              variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 0.68, transition: { duration: slow * 1.4, ease, delay: base * 0.2 } } }}
            />
          </motion.svg>
          <div data-model-anchor="" aria-hidden="true" className="relative aspect-[4/5] h-[28svh] lg:h-[clamp(20rem,46svh,32rem)]" />
        </div>
        )}
      </div>
    </section>
  );
};

export default ContactPanelForm;
