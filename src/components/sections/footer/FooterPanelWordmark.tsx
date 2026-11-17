import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import { modelChapter, type ModelChapter } from "@/components/kit/modelPose";
import MoreTwoTone from "@/components/kit/MoreTwoTone";
import MoreArrowPill from "@/components/kit/MoreArrowPill";
import FitText from "@/components/library/osmo/utilities/FitText";
import { useMemo } from "react";
import type { SocialPlatform } from "@/components/shared/socialPlatforms";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Link = { text: string; href: string };
type Social = { label: string; href: string; icon: SocialPlatform };

type FooterPanelWordmarkProps = {
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  button?: Link;
  brand?: string;
  brandAccent?: string;
  wordmark?: string;
  logoSrc?: string;
  links?: Link[];
  socials?: Social[];
  copyright?: string;
  credit?: Link;
  model?: ModelChapter;
  ariaLabel?: string;
  className?: string;
};

const FALLBACK_ICON = "M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c.9 0 2.3 1.9 2.8 5H9.2C9.7 5.9 11.1 4 12 4zm-3 .6A12 12 0 007.2 9H4.6A8 8 0 019 4.6zm6 0A8 8 0 0119.4 9h-2.6A12 12 0 0015 4.6zM4.1 11h2.9a17 17 0 000 2H4.1a8 8 0 010-2zm5 0h5.8a15 15 0 010 2H9.1a15 15 0 010-2zm7.9 0h2.9a8 8 0 010 2H17a17 17 0 000-2zM4.6 15h2.6A12 12 0 009 19.4 8 8 0 014.6 15zm4.6 0h5.6c-.5 3.1-1.9 5-2.8 5s-2.3-1.9-2.8-5zm7.6 0h2.6a8 8 0 01-4.4 4.4 12 12 0 001.8-4.4z";

const ICONS: Partial<Record<SocialPlatform, string>> = {
  linkedin: "M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.8-2.8s-2 1.3-2 2.7V21h-4z",
  instagram: "M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm5.2-1.6a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2z",
  tiktok: "M14.5 2h3a5 5 0 004.5 4.5v3a8 8 0 01-4.5-1.4V15a7 7 0 11-7-7v3.2A3.8 3.8 0 1014.5 15z",
  youtube: "M22.5 7.2a2.8 2.8 0 00-2-2C18.8 4.7 12 4.7 12 4.7s-6.8 0-8.5.5a2.8 2.8 0 00-2 2A29 29 0 001 12a29 29 0 00.5 4.8 2.8 2.8 0 002 2c1.7.5 8.5.5 8.5.5s6.8 0 8.5-.5a2.8 2.8 0 002-2A29 29 0 0023 12a29 29 0 00-.5-4.8zM9.8 15.1V8.9l5.6 3.1z",
  facebook: "M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5a.5.5 0 01.5-.5z",
  x: "M3 3h5l4.2 5.8L17.5 3H21l-7.1 8.1L21.5 21h-5l-4.6-6.3L6.3 21H2.8l7.5-8.6z",
};

const FooterPanelWordmark = ({
  title = "Matcha meets protein",
  imageSrc = "https://images.pexels.com/photos/2615323/pexels-photo-2615323.jpeg?auto=compress&w=1400",
  imageAlt = "Iced drink in a tall glass",
  button = { text: "Buy now", href: "#" },
  brand = "Iced Matcha Latte",
  brandAccent = "Verde London",
  wordmark = "Verde",
  logoSrc,
  links = [
    { text: "Shop all", href: "#" },
    { text: "Samples", href: "#" },
    { text: "Shipping and delivery", href: "#" },
    { text: "Returns and exchanges", href: "#" },
  ],
  socials = [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "TikTok", href: "#", icon: "tiktok" },
    { label: "YouTube", href: "#", icon: "youtube" },
  ],
  copyright = "© Verde. All rights reserved.",
  credit = { text: "Site credits", href: "#" },
  model,
  ariaLabel,
  className,
}: FooterPanelWordmarkProps) => {
  const reduce = useReducedMotion();
  const { ease, slow } = useKitMotion();
  const wordmarkLines = useMemo(() => (wordmark.trim() ? [wordmark.trim()] : []), [wordmark]);
  const lines = title.trim().split(/\s+/).filter(Boolean);

  return (
    <section aria-label={ariaLabel ?? "Footer"} {...modelChapter(model)} className={cn("relative pt-[var(--section-space)] text-foreground", className)}>
      <footer className="relative mx-auto w-[var(--container)]">
        <div className="grid grid-cols-1 gap-[8px] lg:grid-cols-2 lg:gap-[12px]">
          <div className="@container relative aspect-[374/600] overflow-hidden rounded-[var(--radius-card)] bg-card lg:aspect-square">
            {imageSrc && (
              <>
                <Media src={imageSrc} alt={imageAlt} loading="lazy" className="absolute inset-0 size-full object-cover" />
                <div aria-hidden="true" className="absolute inset-0 bg-black/30" />
              </>
            )}
            <div className="relative flex size-full flex-col items-center justify-between p-[7cqw] pb-[8cqw]">
              {lines.length > 0 && (
                <h2 aria-label={title} className="flex flex-col items-center text-center text-[length:min(20cqw,8rem)] font-bold uppercase leading-[0.84] tracking-[-0.03em] text-white">
                  {lines.map((line, index) => (
                    <div key={index} aria-hidden="true" className="overflow-hidden pb-[0.15em] -mb-[0.15em]">
                      <motion.div
                        initial={reduce ? false : { y: "110%" }}
                        whileInView={{ y: "0%" }}
                        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                        transition={{ duration: slow, ease, delay: index * 0.09 }}
                        className="whitespace-nowrap"
                      >
                        {line}
                      </motion.div>
                    </div>
                  ))}
                </h2>
              )}
              {button && <MoreArrowPill text={button.text} href={button.href} tone="light" />}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-1 flex-col justify-between gap-[48px] pb-[24px] pt-[48px] lg:px-[clamp(1.5rem,3vw,3rem)] lg:pb-[clamp(1.5rem,3vw,3rem)] lg:pt-[clamp(1.5rem,3vw,3rem)]">
              <MoreTwoTone title={brand} accent={brandAccent} accentFirst balance tag="h3" className="max-w-[9em] text-left text-[length:clamp(3rem,2rem+3vw,6rem)] leading-[0.86]" />
              <div className="flex flex-col items-start gap-[32px] lg:flex-row lg:items-end lg:justify-between">
                {links.length > 0 && (
                  <ul className="flex flex-col items-start gap-[14px]">
                    {links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="text-[length:1.375rem] leading-[1] tracking-[-0.02em] underline decoration-1 underline-offset-[0.3em] transition-opacity duration-500 hover:opacity-60"
                        >
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                {socials.length > 0 && (
                  <ul className="flex gap-[6px]">
                    {socials.map((social, index) => (
                      <li key={index}>
                        <a
                          href={social.href}
                          aria-label={social.label}
                          className="flex size-[44px] items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-primary hover:text-primary-foreground"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[22px]" fill="currentColor" fillRule="evenodd">
                            <path d={ICONS[social.icon] ?? FALLBACK_ICON} />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {logoSrc ? (
          <div className="mt-[clamp(1.5rem,3vw,3rem)] py-6 flex justify-center items-center">
            <img
              src={logoSrc}
              alt="FONS VITAE Logo"
              className="h-20 sm:h-28 md:h-36 lg:h-44 w-auto object-contain rounded-2xl shadow-xl border border-slate-200/50 bg-white p-3"
            />
          </div>
        ) : wordmarkLines.length > 0 ? (
          <div className="mt-[clamp(1.5rem,3vw,3rem)] pb-[0.04em]">
            <FitText lines={wordmarkLines} ariaLabel={wordmark} className="text-foreground" lineClassName="text-center text-[length:var(--text-display)] font-bold leading-[0.8] tracking-[-0.03em]" />
          </div>
        ) : null}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-foreground/15 py-[22px] lg:py-[28px]">
          <p className="text-[length:1.125rem] leading-[0.92] tracking-[-0.02em]">{copyright}</p>
          {credit && (
            <a href={credit.href} className="text-[length:1.125rem] leading-[0.92] tracking-[-0.02em] underline decoration-1 underline-offset-[0.3em]">
              {credit.text}
            </a>
          )}
        </div>
      </footer>
    </section>
  );
};

export default FooterPanelWordmark;
