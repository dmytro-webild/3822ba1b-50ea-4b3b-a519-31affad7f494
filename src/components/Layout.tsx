import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import NavbarPillLinks from "@/components/navbars/NavbarPillLinks";
import { CartProvider, useCart } from "@/context/CartContext";
import LegalModal from "@/components/legal/LegalModal";
import VideoModal from "@/components/video/VideoModal";
import WaterDropsBackground from "@/components/animation/WaterDropsBackground";
import { ShoppingBag, Home, GraduationCap, PhoneCall, ArrowUp, MessageSquareHeart } from "lucide-react";

function MobileBottomBar() {
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "https://shop.fontes-vitae.com", icon: ShoppingBag },
    { label: "Feedback", href: "/feedback-faq", icon: MessageSquareHeart },
    { label: "Wissenschaft", href: "/wissenschaft", icon: GraduationCap },
    { label: "Kontakt", href: "/kontakt", icon: PhoneCall },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#0A1C3A] text-white border-t border-slate-700/80 shadow-2xl py-2 px-3 flex items-center justify-around lg:hidden font-sans"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isExternal = item.href.startsWith("http");
        const isActive = !isExternal && location.pathname === item.href;

        if (isExternal) {
          return (
            <a
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 transition py-1 px-3 rounded-lg text-slate-300 hover:text-white"
            >
              <Icon className="w-5 h-5 text-slate-300" />
              <span className="text-[11px] tracking-tight">{item.label}</span>
            </a>
          );
        }

        return (
          <Link
            key={item.href}
            to={item.href}
            className={`flex flex-col items-center justify-center gap-0.5 transition py-1 px-3 rounded-lg ${
              isActive ? "text-sky-400 font-extrabold" : "text-slate-300 hover:text-white"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-sky-400" : "text-slate-300"}`} />
            <span className="text-[11px] tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function MobileBackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 left-4 z-40 bg-[#0A1C3A]/90 backdrop-blur-md text-white p-3 rounded-full shadow-2xl border border-slate-300/40 hover:bg-[#0A1C3A] transition transform active:scale-90 lg:hidden flex items-center justify-center"
      aria-label="Nach oben scrollen"
    >
      <ArrowUp className="w-5 h-5 text-sky-400" />
    </button>
  );
}

function LayoutContent() {
  const { openLegalModal } = useCart();

  const bgImageUrl = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795142711130-drighgg1.png";

  return (
    <div
      id="top"
      className="relative isolate min-h-svh flex flex-col bg-transparent text-foreground selection:bg-[#0A1C3A] selection:text-white"
      data-button="default"
      data-card="filled"
      data-pattern="none"
    >
      {/* Site-wide continuous background image */}
      <div
        className="fixed inset-0 pointer-events-none -z-20 bg-cover bg-center bg-no-repeat bg-fixed opacity-100 transition-all duration-300"
        style={{
          backgroundImage: `url("${bgImageUrl}")`
        }}
        aria-hidden="true"
      />

      <WaterDropsBackground />

      <header data-webild-section="Header" className="relative z-20">
        <NavbarPillLinks
          brand="FONTES VITAE"
          navItems={[
            {
              name: "H2 Wasser",
              href: "/#top"
            },
            {
              name: "Vorteile",
              href: "/#vergleich"
            },
            {
              name: "News & Studien",
              href: "/wissenschaft"
            },
            {
              name: "Über uns",
              href: "/ueber-uns"
            },
            {
              name: "Feedback & FAQ",
              href: "/feedback-faq"
            },
            {
              name: "SHOP",
              href: "https://shop.fontes-vitae.com"
            },
            {
              name: "Kontakt",
              href: "/kontakt"
            }
          ]}
          primaryButton={{
            text: "Zum Shop",
            href: "https://shop.fontes-vitae.com"
          }}
          socials={[
            {
              platform: "instagram",
              href: "#"
            },
            {
              platform: "youtube",
              href: "#"
            }
          ]}
        />
      </header>

      <main className="flex-grow relative z-10" data-button="default" data-card="filled" data-pattern="none">
        <Outlet />
      </main>

      {/* Sticky Mobile Bottom Navigation & Back to Top */}
      <MobileBottomBar />
      <MobileBackToTop />

      {/* Modals */}
      <LegalModal />
      <VideoModal />

      <footer data-webild-section="Footer" data-section="footer" className="relative z-10 bg-[#0A1C3A] text-white pt-12 pb-8 border-t border-slate-800 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800/80">
          {/* Brand & Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <Link to="/" className="inline-block">
              <img
                src="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795656931189-wo4v3z21.png"
                alt="FONTES VITAE Logo"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <div>
              <p className="font-extrabold text-sm tracking-wider uppercase"></p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Exklusiver Vertriebspartner für molekulares H2 Wasserstoff-Wasser &amp; edle Fruchtsaft-Kreationen in der DACH-Region.
              </p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-1">Navigation</h4>
            <div className="flex flex-col space-y-1.5 text-xs text-slate-300">
              <Link to="/#top" onClick={() => { if (window.location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white transition">H2 Wasser</Link>
              <Link to="/#vergleich" className="hover:text-white transition">Vorteile</Link>
              <Link to="/wissenschaft" className="hover:text-white transition">News &amp; Studien</Link>
              <Link to="/ueber-uns" className="hover:text-white transition">Über uns</Link>
              <Link to="/feedback-faq" className="hover:text-white transition">Feedback &amp; FAQ</Link>
              <a href="https://shop.fontes-vitae.com" className="hover:text-white transition">SHOP</a>
              <Link to="/kontakt" className="hover:text-white transition">Kontakt</Link>
            </div>
          </div>

          {/* Contact & Customer Info */}
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-1">Kontakt & Service</h4>
            <p className="text-xs text-slate-300">Kundenservice &amp; Beratung:</p>
            <p className="text-xs font-semibold text-white">Tel: +4917660945171</p>
            <p className="text-xs text-slate-300">E-Mail: info@fontes-vitae.com</p>
            <p className="text-xs text-slate-400 pt-1">Bestellungen: bestellung@fontes-vitae.com</p>
          </div>
        </div>

        {/* Legal Links & Copyright */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-left">
          <p>© {new Date().getFullYear()} FONTES VITAE. Alle Rechte vorbehalten.</p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-slate-300">
            <Link to="/impressum" className="hover:text-white transition">Impressum</Link>
            <span>•</span>
            <Link to="/kontakt" className="hover:text-white transition">Kontakt</Link>
            <span>•</span>
            <button onClick={() => openLegalModal("datenschutz")} className="hover:text-white transition">Datenschutz</button>
            <span>•</span>
            <button onClick={() => openLegalModal("agb")} className="hover:text-white transition">AGB</button>
            <span>•</span>
            <button onClick={() => openLegalModal("widerruf")} className="hover:text-white transition">Widerrufsbelehrung</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Layout() {
  return (
    <CartProvider>
      <LayoutContent />
    </CartProvider>
  );
}
