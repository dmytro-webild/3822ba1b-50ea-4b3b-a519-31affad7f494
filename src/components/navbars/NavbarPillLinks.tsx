"use client";

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
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

const socialIcons: Partial<Record<SocialPlatform, LucideIcon>> = { instagram: Instagram, linkedin: Linkedin, facebook: Facebook, youtube: Youtube, x: Twitter, github: Github, dribbble: Dribbble, email: Mail };

const EASE = [0.19, 1, 0.22, 1] as const;

const NavbarPillLinks = ({
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
  menuText = "Menu",
}: NavbarPillLinksProps) => {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const hidden = useRef(false);
  const shift = useMotionValue(0);
  const { scrollY } = useScroll();
  useMenuDialog(open, panelRef, () => setOpen(false));

  useMotionValueEvent(scrollY, "change", (value) => {
    const previous = scrollY.getPrevious() ?? 0;
    const hide = !open && value > 120 && value > previous;
    if (hide === hidden.current) return;
    hidden.current = hide;
    animate(shift, hide ? -160 : 0, { duration: reduce ? 0 : 0.6, ease: EASE });
  });

  return (
    <>
      <motion.nav
        aria-label="Main"
        style={{ y: shift }}
        className="fixed inset-x-0 top-0 z-50 px-[var(--gutter)] pt-[clamp(1.25rem,2.6vw,2.5rem)]"
      >
        <div className="flex items-center justify-between gap-[0.5rem] sm:gap-[1rem] lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex min-w-0 items-center gap-[0.75rem]">
            <Link to="/" className="min-w-0 flex items-center gap-2.5">
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
                      className="flex size-[clamp(2.5rem,2.2rem+1vw,3rem)] items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                    >
                      <Icon aria-hidden="true" className="size-[1.1rem]" strokeWidth={1.8} />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </div>

          {navItems.length > 0 && (
            <ul className="hidden items-center gap-[0.5rem] lg:flex">
              {navItems.map((item, i) => (
                <motion.li
                  key={`${i}-${item.href}`}
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.3 + i * 0.08 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("/#")) {
                        const targetId = item.href.replace("/#", "");
                        if (window.location.pathname === "/") {
                          e.preventDefault();
                          if (targetId === "top" || !targetId) {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else {
                            const elem = document.getElementById(targetId);
                            if (elem) {
                              elem.scrollIntoView({ behavior: "smooth" });
                            }
                          }
                        }
                      }
                    }}
                    className="flex h-[2.35rem] items-center rounded-xl bg-white px-3.5 sm:px-4 font-[family-name:var(--font-label)] text-xs sm:text-sm font-extrabold leading-none tracking-tight text-[#0A1C3A] border border-slate-200/90 shadow-xs hover:bg-slate-50 hover:shadow-sm transition-all"
                  >
                    <p className="whitespace-nowrap">{item.name}</p>
                  </a>
                </motion.li>
              ))}
            </ul>
          )}

          <div className="flex shrink-0 items-center justify-end gap-[0.4rem]">
            {/* Minimalist Header Search */}
            <HeaderSearch />

            {primaryButton && (
              <div className="hidden sm:block">
                {primaryButton.href.startsWith("http") ? (
                  <a
                    href={primaryButton.href}
                    className="flex h-[2.35rem] items-center justify-center rounded-xl bg-white text-[#0A1C3A] px-4 font-black text-xs uppercase tracking-wider border border-slate-200 shadow-xs hover:bg-slate-50 hover:shadow-sm transition"
                  >
                    {primaryButton.text}
                  </a>
                ) : (
                  <Link
                    to={primaryButton.href}
                    className="flex h-[2.35rem] items-center justify-center rounded-xl bg-white text-[#0A1C3A] px-4 font-black text-xs uppercase tracking-wider border border-slate-200 shadow-xs hover:bg-slate-50 hover:shadow-sm transition"
                  >
                    {primaryButton.text}
                  </Link>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="flex lg:hidden size-[clamp(2.5rem,2.2rem+1vw,3rem)] items-center justify-center rounded-xl bg-white text-[#0A1C3A] hover:bg-slate-50 active:scale-95 transition shadow-xs border border-slate-200"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

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
            className="fixed inset-x-0 top-0 z-[45] flex h-svh flex-col bg-slate-900/95 backdrop-blur-md px-[var(--gutter)] pb-[2.5rem] pt-[clamp(6.5rem,20vw,8rem)] text-card-foreground lg:hidden"
          >
            <ul className="flex flex-col gap-[0.75rem]">
              {navItems.map((item, i) => (
                <li key={`${i}-${item.href}`}>
                  <motion.a
                    href={item.href}
                    onClick={(e) => {
                      setOpen(false);
                      if (item.href.startsWith("/#")) {
                        const targetId = item.href.replace("/#", "");
                        if (window.location.pathname === "/") {
                          e.preventDefault();
                          if (targetId === "top" || !targetId) {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else {
                            const elem = document.getElementById(targetId);
                            if (elem) {
                              elem.scrollIntoView({ behavior: "smooth" });
                            }
                          }
                        }
                      }
                    }}
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.06 }}
                    className="flex items-center justify-between font-extrabold text-base uppercase bg-white text-[#0A1C3A] px-5 py-3.5 rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
                  >
                    <span>{item.name}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            {socials.length > 0 && (
              <div className="mt-auto flex items-center gap-[0.4rem]">
                {socials.map((social, i) => {
                  const Icon = socialIcons[social.platform] ?? Globe;
                  return (
                    <a
                      key={`${i}-${social.href}`}
                      href={social.href}
                      aria-label={socialName(social.platform)}
                      className="flex size-[3rem] items-center justify-center rounded-full bg-secondary text-secondary-foreground"
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
};

export default NavbarPillLinks;
