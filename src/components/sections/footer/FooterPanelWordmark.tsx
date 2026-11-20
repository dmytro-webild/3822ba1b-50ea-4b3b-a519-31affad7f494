import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import { modelChapter, type ModelChapter } from "@/components/kit/modelPose";
import type { SocialPlatform } from "@/components/shared/socialPlatforms";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Media from "@/components/kit/Media";

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

const SORTIMENT_ITEMS = [
  {
    title: "Das gesamte Sortiment (7 Dosen)",
    subtitle: "H2 Wasserstoff-Wasser & 6 edle Fruchtsaft-Kreationen",
    badge: "Komplett-Lineup",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794880807544-312gbdxq.png",
    isLineup: true,
  },
  {
    title: "FONTES VITEA H2 Water",
    subtitle: "Molekular gelöstes Wasserstoff-Wasser (min. 2.8 mg/L H2)",
    badge: "H2 Molekular",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795132125149-eraq7h8f.png",
    isLineup: false,
  },
  {
    title: "Ingwer (Ginger Tonic)",
    subtitle: "100% natürlicher Direktsaft mit belebender Schärfe",
    badge: "100% Fruchtsaft",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794876969120-9lcoxonc.png",
    isLineup: false,
  },
  {
    title: "Traube (Grape)",
    subtitle: "Edler Traubensaft aus sonnenverwöhnten Weintrauben",
    badge: "100% Fruchtsaft",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862677-cd34mdsd.png",
    isLineup: false,
  },
  {
    title: "Apfel Limette (Apple & Lime)",
    subtitle: "Spritzig-frische Kombination aus Apfel und feiner Limette",
    badge: "100% Fruchtsaft",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794876969120-9lcoxonc.png",
    isLineup: false,
  },
  {
    title: "Himbeere (Raspberry)",
    subtitle: "Fruchtiges Himbeer-Erlebnis voller natürlicher Vitalität",
    badge: "100% Fruchtsaft",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794874862680-jc370nfv.png",
    isLineup: false,
  },
  {
    title: "Apfel Ingwer (Apple & Ginger)",
    subtitle: "Belebende Harmonie aus süßem Apfel und würzigem Ingwer",
    badge: "100% Fruchtsaft",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134384023-6vwzgda1.png",
    isLineup: false,
  },
  {
    title: "Blaubeere (Blueberry)",
    subtitle: "Köstlicher Direktsaft aus sonnengereiften Blaubeeren",
    badge: "100% Fruchtsaft",
    image: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134384024-101x5eut.png",
    isLineup: false,
  },
];

const FooterPanelWordmark = ({
  title = "DAS GESAMTE FONTES VITEA SORTIMENT",
  subtitle = "H2 WASSERSTOFF-WASSER & 6 EDLE FRUCHTSAFT-KREATIONEN",
  lineupImageSrc = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794880807544-312gbdxq.png",
  logoSrc = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795103673176-908st9q6.png",
  socials = [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "YouTube", href: "#", icon: "youtube" },
  ],
  copyright = "© FONTES VITEA – Die Quelle des Lebens. Alle Rechte vorbehalten.",
  model,
  ariaLabel,
  className,
}: FooterPanelWordmarkProps) => {
  const reduce = useReducedMotion();
  const { ease, slow } = useKitMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SORTIMENT_ITEMS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + SORTIMENT_ITEMS.length) % SORTIMENT_ITEMS.length);
  };

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SORTIMENT_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reduce]);

  const currentItem = SORTIMENT_ITEMS[currentIndex];

  return (
    <section
      aria-label={ariaLabel ?? "Product Showcase & Footer"}
      {...modelChapter(model)}
      className={cn(
        "relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100/70 text-[#0A1C3A] overflow-hidden border-t border-slate-200/80 font-sans",
        className
      )}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Prominent FONTES VITEA Logo */}
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
              <Media
                src={logoSrc}
                alt="FONTES VITEA Logo"
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
          className="relative w-full max-w-6xl my-4 sm:my-8 bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-2xl overflow-hidden"
        >
          {/* Internal Stream Banner Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/10 to-indigo-500/5 pointer-events-none" />

          {/* Smooth Product Carousel Slider */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-full flex items-center justify-between min-h-[320px] sm:min-h-[400px]">
              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="absolute left-0 sm:left-2 z-20 bg-white/90 hover:bg-[#0A1C3A] text-[#0A1C3A] hover:text-white p-3 rounded-full shadow-lg border border-slate-200 transition transform hover:scale-110 active:scale-95"
                aria-label="Vorheriges Produkt"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Carousel Content */}
              <div className="w-full px-12 sm:px-16 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto"
                  >
                    <span className="bg-[#0A1C3A] text-white text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-xs">
                      {currentItem.badge}
                    </span>

                    <div className="relative flex items-center justify-center my-2">
                      <Media
                        src={currentItem.isLineup ? (lineupImageSrc || currentItem.image) : currentItem.image}
                        alt={currentItem.title}
                        className={`object-contain drop-shadow-2xl transition-all duration-300 ${
                          currentItem.isLineup
                            ? "h-48 sm:h-64 md:h-72 w-full max-w-3xl"
                            : "h-52 sm:h-64 md:h-72 w-auto hover:scale-105"
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-black uppercase text-[#0A1C3A] tracking-tight">
                        {currentItem.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-slate-600">
                        {currentItem.subtitle}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-0 sm:right-2 z-20 bg-white/90 hover:bg-[#0A1C3A] text-[#0A1C3A] hover:text-white p-3 rounded-full shadow-lg border border-slate-200 transition transform hover:scale-110 active:scale-95"
                aria-label="Nächstes Produkt"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {SORTIMENT_ITEMS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Gehe zu Slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-[#0A1C3A]"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Large Prominent "Jetzt bestellen" Button */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: slow, ease, delay: 0.3 }}
          className="mt-6 mb-12"
        >
          <a
            href="#shop"
            className="inline-flex items-center justify-center gap-3 bg-[#0A1C3A] hover:bg-[#12284c] text-white font-extrabold text-base sm:text-lg uppercase tracking-wider px-10 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-slate-700/50"
          >
            <span>Jetzt bestellen</span>
            <ArrowRight className="w-5 h-5 text-sky-400" />
          </a>
        </motion.div>

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
