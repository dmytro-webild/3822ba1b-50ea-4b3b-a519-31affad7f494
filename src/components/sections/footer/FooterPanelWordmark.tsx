import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import { modelChapter, type ModelChapter } from "@/components/kit/modelPose";
import MoreArrowPill from "@/components/kit/MoreArrowPill";
import type { SocialPlatform } from "@/components/shared/socialPlatforms";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Link = { text: string; href: string };
type Social = { label: string; href: string; icon: SocialPlatform };

type FooterPanelWordmarkProps = {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  lineupImageSrc?: string;
  logoSrc?: string;
  button?: Link;
  brand?: string;
  brandAccent?: string;
  wordmark?: string;
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

const FLAVOR_PILLS = [
  { name: "Ingwer", sub: "Tonic Ginger" },
  { name: "Traube", sub: "Grape" },
  { name: "Apfel & Limette", sub: "Apple & Lime" },
  { name: "Himbeere", sub: "Raspberry" },
  { name: "Apfel & Ingwer", sub: "Apple & Ginger" },
  { name: "Heidelbeere", sub: "Blueberry" },
  { name: "H2 Water", sub: "Molekular" },
];

const FooterPanelWordmark = ({
  title = "DAS GESAMTE FONS VITAE SORTIMENT",
  subtitle = "H2 WASSERSTOFF-WASSER & 6 EDLE FRUCHTSAFT-KREATIONEN",
  lineupImageSrc = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794880807544-312gbdxq.png",
  logoSrc = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794862275041-s5qagrxx.jpg",
  button = { text: "Jetzt Produkte entdecken", href: "#shop" },
  socials = [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "YouTube", href: "#", icon: "youtube" },
  ],
  copyright = "© FONS VITAE – Die Quelle des Lebens. Alle Rechte vorbehalten.",
  model,
  ariaLabel,
  className,
}: FooterPanelWordmarkProps) => {
  const reduce = useReducedMotion();
  const { ease, slow } = useKitMotion();

  return (
    <section
      aria-label={ariaLabel ?? "Product Showcase & Footer"}
      {...modelChapter(model)}
      className={cn(
        "relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100/70 text-[#0A1C3A] overflow-hidden border-t border-slate-200/80 font-sans",
        className
      )}
    >
      {/* Background Water Wave / Stream Effect */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute w-[200%] h-full top-0 left-0 opacity-25"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="streamGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="35%" stopColor="#0284c7" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#0A1C3A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="streamGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Dynamic flowing wave path 1 */}
          <path
            fill="none"
            stroke="url(#streamGrad1)"
            strokeWidth="14"
            d="M 0,320 C 300,180 600,420 900,260 C 1200,100 1500,380 1800,240"
          >
            {!reduce && (
              <animate
                attributeName="d"
                dur="12s"
                repeatCount="indefinite"
                values="
                  M 0,320 C 300,180 600,420 900,260 C 1200,100 1500,380 1800,240;
                  M 0,260 C 300,400 600,180 900,340 C 1200,200 1500,160 1800,300;
                  M 0,320 C 300,180 600,420 900,260 C 1200,100 1500,380 1800,240
                "
              />
            )}
          </path>

          {/* Dynamic flowing wave path 2 (Secondary water ribbon) */}
          <path
            fill="none"
            stroke="url(#streamGrad2)"
            strokeWidth="8"
            strokeDasharray="16 8"
            d="M 0,220 C 350,380 700,140 1050,320 C 1400,500 1600,200 1800,320"
          >
            {!reduce && (
              <animate
                attributeName="d"
                dur="16s"
                repeatCount="indefinite"
                values="
                  M 0,220 C 350,380 700,140 1050,320 C 1400,500 1600,200 1800,320;
                  M 0,340 C 350,160 700,360 1050,180 C 1400,280 1600,400 1800,220;
                  M 0,220 C 350,380 700,140 1050,320 C 1400,500 1600,200 1800,320
                "
              />
            )}
          </path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Prominent FONS VITAE Logo */}
        {logoSrc && (
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.9, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: slow, ease }}
            className="flex flex-col items-center justify-center space-y-4 mb-6 sm:mb-8"
          >
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-sky-400 via-blue-600 to-[#0A1C3A] opacity-25 blur-md group-hover:opacity-45 transition duration-500" />
              <img
                src={logoSrc}
                alt="FONS VITAE Logo"
                className="relative h-20 sm:h-28 md:h-36 w-auto object-contain rounded-2xl shadow-xl border border-slate-200/90 bg-white p-3.5 sm:p-4 transition hover:scale-105 duration-300"
              />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#0A1C3A]">
                {title}
              </h2>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 max-w-xl mx-auto">
                {subtitle}
              </p>
            </div>
          </motion.div>
        )}

        {/* Horizontal Product Showcase Container with Flowing Water Stream Accent */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: slow, ease, delay: 0.1 }}
          className="relative w-full max-w-6xl my-4 sm:my-8 bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/90 p-4 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Internal Stream Banner Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/10 to-indigo-500/5 pointer-events-none" />

          {/* SVG Animated Water Ribbon Weaving Horizontally Behind Cans */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 1000 300">
            <path
              d="M -50 150 Q 200 40, 450 160 T 950 140 T 1050 160"
              fill="none"
              stroke="#0284c7"
              strokeWidth="12"
              strokeOpacity="0.2"
            >
              {!reduce && (
                <animate
                  attributeName="d"
                  dur="8s"
                  repeatCount="indefinite"
                  values="
                    M -50 150 Q 200 40, 450 160 T 950 140 T 1050 160;
                    M -50 140 Q 200 240, 450 120 T 950 180 T 1050 140;
                    M -50 150 Q 200 40, 450 160 T 950 140 T 1050 160
                  "
                />
              )}
            </path>
            <path
              d="M -50 150 Q 200 40, 450 160 T 950 140 T 1050 160"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeOpacity="0.4"
              strokeDasharray="12 12"
            >
              {!reduce && (
                <animate
                  attributeName="d"
                  dur="8s"
                  repeatCount="indefinite"
                  values="
                    M -50 150 Q 200 40, 450 160 T 950 140 T 1050 160;
                    M -50 140 Q 200 240, 450 120 T 950 180 T 1050 140;
                    M -50 150 Q 200 40, 450 160 T 950 140 T 1050 160
                  "
                />
              )}
            </path>
          </svg>

          {/* High-Resolution Lineup Image of all 7 Cans */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.img
              src={lineupImageSrc}
              alt="FONS VITAE H2 Wasser & 6 Direktsaft-Variationen Produktaufreihung"
              className="w-full h-auto max-h-[380px] sm:max-h-[460px] md:max-h-[520px] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: slow, ease, delay: 0.2 }}
            />

            {/* Flavor Labels Bar */}
            <div className="w-full mt-6 pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 text-center">
              {FLAVOR_PILLS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 border border-slate-200 rounded-xl py-2 px-2 shadow-xs transition hover:border-[#0A1C3A] hover:bg-white hover:shadow-md"
                >
                  <span className="block font-extrabold text-[#0A1C3A] text-xs sm:text-sm tracking-tight leading-tight">
                    {item.name}
                  </span>
                  <span className="block text-[10px] sm:text-xs text-slate-500 font-semibold truncate mt-0.5">
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        {button && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: slow, ease, delay: 0.3 }}
            className="mt-4 mb-10"
          >
            <MoreArrowPill text={button.text} href={button.href} />
          </motion.div>
        )}

        {/* Clean Footer Bottom Bar with Socials & Copyright */}
        <div className="w-full max-w-6xl pt-8 border-t border-slate-300/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p className="font-semibold text-center sm:text-left">{copyright}</p>

          {socials.length > 0 && (
            <ul className="flex items-center gap-3">
              {socials.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-full bg-slate-200/80 text-[#0A1C3A] hover:bg-[#0A1C3A] hover:text-white transition-colors duration-300 shadow-xs"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="currentColor" fillRule="evenodd">
                      <path d={ICONS[social.icon] ?? FALLBACK_ICON} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default FooterPanelWordmark;
