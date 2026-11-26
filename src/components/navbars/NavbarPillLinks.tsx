"use client";

import { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Dribbble, Facebook, Github, Globe, Instagram, Linkedin, Mail, Twitter, Youtube, Menu, X, type LucideIcon } from "lucide-react";
import { socialName, type SocialPlatform } from "@/components/shared/socialPlatforms";
import useMenuDialog from "@/components/kit/useMenuDialog";
import HeaderSearch from "@/components/search/HeaderSearch";
import Media from "@/components/kit/Media";

type NavItem = { name: string; href: string };
type Button = { text: string; href: string };
type Social = { platform: SocialPlatform; href: string };

type NavbarPillLinksProps = {
  brand?: string;
  navItems?: NavItem[];
  primaryButton?: Button;
  socials?: Social[];
  menuText?: string;
  closeText?: string;
};

const socialIcons: Partial<Record<SocialPlatform, LucideIcon>> = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  youtube: Youtube,
  x: Twitter,
  github: Github,
  dribbble: Dribbble,
  email: Mail,
};

const EASE = [0.19, 1, 0.22, 1] as const;

export default function NavbarPillLinks({
  navItems = [
    { name: "H2 Wasser", href: "/#top" },
    { name: "Säfte", href: "/saefte" },
    { name: "Vorteile", href: "/#vergleich" },
    { name: "News & Studien", href: "/wissenschaft" },
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Feedback & FAQ", href: "/feedback-faq" },
    { name: "SHOP", href: "https://shop.fontes-vitae.com" },
    { name: "Kontakt", href: "/kontakt" },
  ],
  primaryButton = { text: "Zum Shop", href: "https://shop.fontes-vitae.com" },
  socials = [],
  menuText = "Menü",
}: NavbarPillLinksProps) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const hidden = useRef(false);
  const shift = useMotionValue(0);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();

  useMenuDialog(open, panelRef, () => setOpen(false));

  useMotionValueEvent(scrollY, "change", (value) => {
    setIsScrolled(value > 40);
    const previous = scrollY.getPrevious() ?? 0;
    const hide = !open && value > 120 && value > previous;
    if (hide === hidden.current) return;
    hidden.current = hide;
    animate(shift, hide ? -160 : 0, { duration: reduce ? 0 : 0.6, ease: EASE });
  });

  const isSaeftePage = location.pathname === "/saefte";
  const isHeaderBannerPage = ["/wissenschaft", "/ueber-uns", "/feedback-faq", "/kontakt"].some((p) =>
    location.pathname.startsWith(p)
  );

  const isItemActive = (href: string) => {
    const p = location.pathname;
    const h = location.hash;
    if (href === "/saefte") return p === "/saefte";
    if (href === "/ueber-uns") return p === "/ueber-uns";
    if (href === "/feedback-faq") return p === "/feedback-faq";
    if (href === "/kontakt") return p === "/kontakt";
    if (href === "/wissenschaft") return p.startsWith("/wissenschaft");
    if (href === "/#vergleich") return p === "/" && h === "#vergleich";
    if (href === "/#top" || href === "/") return p === "/" && (!h || h === "#top");
    return false;
  };

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (location.pathname === "/") {
        e.preventDefault();
        if (targetId === "top" || !targetId) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const elem = document.getElementById(targetId);
          if (elem) elem.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        e.preventDefault();
        navigate("/");
        setTimeout(() => {
          if (targetId === "top" || !targetId) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const elem = document.getElementById(targetId);
            if (elem) elem.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else if (!href.startsWith("http")) {
      e.preventDefault();
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getItemClasses = (item: NavItem) => {
    const active = isItemActive(item.href);

    if (isSaeftePage) {
      if (active) {
        return "bg-[#C2410C] text-white border-2 border-amber-300 shadow-md font-black scale-[1.03]";
      }
      return "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold border border-orange-400/30 shadow-xs";
    }

    // Blue Navigation states:
    if (active) {
      // Beim Anklicken / Aktiv (Neonhellblaue Umrandung + Schrift)
      return "bg-[#06152d] text-[#00d2ff] border-2 border-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.8)] font-black scale-[1.02]";
    }

    if (isScrolled) {
      // Beim Scrollen (dunkelblau, weiße Schrift)
      return "bg-[#0A1C3A] text-white border border-slate-700/80 font-bold hover:bg-[#12284c] shadow-xs";
    }

    if (isHeaderBannerPage) {
      // Over header banner at top of page (dark background)
      return "bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold hover:bg-white/20 hover:border-white/40 shadow-xs";
    }

    // Standard (Seitenanfang) hell, freundlich, offen on light background
    return "bg-white/80 backdrop-blur-md text-[#0A1C3A] border border-[#0099ff]/30 font-bold hover:bg-white hover:border-[#00d2ff] shadow-xs";
  };

  return (
    <>
      <motion.nav
        aria-label="Main"
        style={{ y: shift }}
        className="fixed inset-x-0 top-0 z-50 px-[var(--gutter)] pt-[clamp(1rem,2.2vw,2rem)] font-sans"
      >
        <div className="flex items-center justify-between gap-[0.5rem] sm:gap-[1rem] lg:grid lg:grid-cols-[1fr_auto_1fr]">
          
          {/* Left: Brand Logo & Social Icons */}
          <div className="flex min-w-0 items-center gap-[0.75rem]">
            <Link
              to="/"
              className={`min-w-0 flex items-center gap-2.5 p-1 rounded-xl transition shadow-xs ${
                isSaeftePage
                  ? "bg-white/90 backdrop-blur-md border border-amber-300/40 hover:bg-white"
                  : isHeaderBannerPage && !isScrolled
                  ? "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20"
                  : "bg-white/80 backdrop-blur-md border border-amber-900/10 hover:bg-white/95"
              }`}
            >
              <Media
                src="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795656931190-v9zzb3lo.png"
                alt="FONTES VITAE Logo"
                className="h-9 w-auto object-contain"
              />
            </Link>

            {socials.length > 0 && (
              <div className="hidden items-center gap-[0.3rem] lg:flex">
                {socials.map((social, i) => {
                  const Icon = socialIcons[social.platform] ?? Globe;
                  return (
                    <motion.a
                      key={`${i}-${social.href}`}
                      href={social.href}
                      aria-label={socialName(social.platform)}
                      initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.3 + i * 0.08 }}
                      className={`flex size-[clamp(2.5rem,2.2rem+1vw,3rem)] items-center justify-center rounded-full transition-colors duration-300 shadow-xs ${
                        isSaeftePage
                          ? "bg-white/90 backdrop-blur-md text-[#0A1C3A] border border-amber-300/40 hover:bg-white"
                          : isHeaderBannerPage && !isScrolled
                          ? "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
                          : "bg-white/80 backdrop-blur-md text-[#0A1C3A] border border-amber-900/10 hover:bg-white"
                      }`}
                    >
                      <Icon aria-hidden="true" className="size-[1.1rem]" strokeWidth={1.8} />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Center: Main Navigation Pills */}
          {navItems.length > 0 && (
            <ul className="hidden items-center gap-[0.4rem] sm:gap-[0.5rem] lg:flex">
              {navItems.map((item, i) => (
                <motion.li
                  key={`${i}-${item.href}`}
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.3 + i * 0.08 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className={`flex h-[2.35rem] items-center rounded-xl px-3.5 sm:px-4 font-[family-name:var(--font-label)] text-xs sm:text-sm leading-none tracking-tight transition-all ${getItemClasses(
                      item
                    )}`}
                  >
                    <p className="whitespace-nowrap">{item.name}</p>
                  </a>
                </motion.li>
              ))}
            </ul>
          )}

          {/* Right: Search, Shop Button & Mobile Menu Button */}
          <div className="flex shrink-0 items-center justify-end gap-[0.4rem]">
            {/* Header Search */}
            <HeaderSearch />

            {/* ZUM SHOP Button */}
            {primaryButton && (
              <div className="hidden sm:block">
                {primaryButton.href.startsWith("http") ? (
                  <a
                    href={primaryButton.href}
                    className="flex h-[2.35rem] items-center justify-center rounded-xl bg-[#061226] text-amber-300 hover:bg-[#030914] hover:text-amber-200 px-4 font-black text-xs uppercase tracking-wider border border-amber-400/50 shadow-xs transition"
                  >
                    {primaryButton.text}
                  </a>
                ) : (
                  <Link
                    to={primaryButton.href}
                    className="flex h-[2.35rem] items-center justify-center rounded-xl bg-[#061226] text-amber-300 hover:bg-[#030914] hover:text-amber-200 px-4 font-black text-xs uppercase tracking-wider border border-amber-400/50 shadow-xs transition"
                  >
                    {primaryButton.text}
                  </Link>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className={`flex lg:hidden size-[clamp(2.5rem,2.2rem+1vw,3rem)] items-center justify-center rounded-xl transition shadow-xs active:scale-95 ${
                isSaeftePage
                  ? "bg-[#EA580C] text-white border border-orange-400/40 hover:bg-[#C2410C]"
                  : "bg-[#0A1C3A] text-white border border-sky-400/40 hover:bg-[#12284c]"
              }`}
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={menuText}
            initial={reduce ? { opacity: 0 } : { y: "-100%" }}
            animate={reduce ? { opacity: 1 } : { y: "0%" }}
            exit={reduce ? { opacity: 0 } : { y: "-100%" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="fixed inset-x-0 top-0 z-[45] flex h-svh flex-col bg-slate-950/95 backdrop-blur-md px-[var(--gutter)] pb-[2.5rem] pt-[clamp(6.5rem,20vw,8rem)] text-white lg:hidden font-sans overflow-y-auto"
          >
            <ul className="flex flex-col gap-[0.75rem]">
              {navItems.map((item, i) => {
                const active = isItemActive(item.href);
                return (
                  <li key={`${i}-${item.href}`}>
                    <motion.a
                      href={item.href}
                      onClick={(e) => {
                        setOpen(false);
                        handleNavClick(item.href, e);
                      }}
                      initial={reduce ? false : { y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.06 }}
                      className={`flex items-center justify-between font-extrabold text-base uppercase px-5 py-3.5 rounded-xl transition-all ${
                        isSaeftePage
                          ? active
                            ? "bg-[#C2410C] text-white border-2 border-amber-300 shadow-md font-black"
                            : "bg-gradient-to-r from-orange-500 to-amber-500 text-white border border-orange-400/30"
                          : active
                          ? "bg-[#06152d] text-[#00d2ff] border-2 border-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.8)] font-black"
                          : "bg-[#0A1C3A] text-white border border-slate-700 hover:bg-[#12284c]"
                      }`}
                    >
                      <span>{item.name}</span>
                    </motion.a>
                  </li>
                );
              })}
            </ul>

            {socials.length > 0 && (
              <div className="mt-auto flex items-center gap-[0.4rem] pt-6">
                {socials.map((social, i) => {
                  const Icon = socialIcons[social.platform] ?? Globe;
                  return (
                    <a
                      key={`${i}-${social.href}`}
                      href={social.href}
                      aria-label={socialName(social.platform)}
                      className="flex size-[3rem] items-center justify-center rounded-full bg-white/10 text-white border border-white/20"
                    >
                      <Icon aria-hidden="true" className="size-[1.1rem]" strokeWidth={1.8} />
                    </a>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
