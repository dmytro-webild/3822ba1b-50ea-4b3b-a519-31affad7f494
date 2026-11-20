import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import NavbarPillLinks from "@/components/navbars/NavbarPillLinks";
import { CartProvider, useCart } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutModal from "@/components/cart/CheckoutModal";
import ConfirmationModal from "@/components/cart/ConfirmationModal";
import ProductDetailsModal from "@/components/shop/ProductDetailsModal";
import LegalModal from "@/components/legal/LegalModal";
import VideoModal from "@/components/video/VideoModal";
import WaterDropsBackground from "@/components/animation/WaterDropsBackground";
import { ShoppingBag, Home, GraduationCap, PhoneCall, ArrowUp } from "lucide-react";

function FloatingCartButton() {
  const { setIsCartOpen, totalItemCount, totalPrice } = useCart();

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40 bg-[#0A1C3A] hover:bg-[#12284c] text-white p-3.5 rounded-2xl shadow-2xl border border-slate-300 flex items-center gap-3 group transition transform hover:scale-105 active:scale-95"
      aria-label="Warenkorb öffnen"
    >
      <div className="relative">
        <ShoppingBag className="w-6 h-6 text-slate-200" />
        {totalItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-[#0A1C3A] text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-[#0A1C3A]">
            {totalItemCount}
          </span>
        )}
      </div>
      <div className="hidden sm:block text-left text-xs font-bold leading-tight pr-1">
        <span className="block text-slate-300 uppercase text-[10px] tracking-wider">Warenkorb</span>
        <span>{totalPrice.toFixed(2)} €</span>
      </div>
    </button>
  );
}

function MobileBottomBar() {
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/shop", icon: ShoppingBag },
    { label: "Über uns", href: "/ueber-uns", icon: Home },
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
        const isActive = location.pathname === item.href;
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

  return (
    <div
      id="top"
      className="relative isolate min-h-svh flex flex-col bg-background text-foreground selection:bg-[#0A1C3A] selection:text-white"
      data-button="default"
      data-card="filled"
      data-pattern="none"
    >
      {/* 2D Water drops removed for static clean design */}
      <WaterDropsBackground />

      <header data-webild-section="Header" className="relative z-20">
        <NavbarPillLinks
          brand="FONTES VITEA"
          navItems={[
            {
              name: "Das Quellwasser",
              href: "/#quelle"
            },
            {
              name: "Vorteile",
              href: "/#vergleich"
            },
            {
              name: "Shop",
              href: "/shop"
            },
            {
              name: "Über uns",
              href: "/ueber-uns"
            },
            {
              name: "News & Studien",
              href: "/wissenschaft"
            },
            {
              name: "Kontakt",
              href: "/kontakt"
            }
          ]}
          primaryButton={{
            text: "Zum Shop",
            href: "/shop"
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

      {/* Floating Cart Launcher Button */}
      <FloatingCartButton />

      {/* Sticky Mobile Bottom Navigation & Back to Top */}
      <MobileBottomBar />
      <MobileBackToTop />

      {/* All Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <ConfirmationModal />
      <ProductDetailsModal />
      <LegalModal />
      <VideoModal />

      <footer data-webild-section="Footer" data-section="footer" className="relative z-10 bg-[#0A1C3A] text-white pt-12 pb-8 border-t border-slate-800 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800/80">
          {/* Brand & Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <Link to="/" className="inline-block">
              <img
                src="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795103673176-908st9q6.png"
                alt="FONTES VITEA Logo"
                className="h-14 w-auto object-contain rounded-xl bg-white p-2 shadow-md"
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
              <Link to="/#quelle" className="hover:text-white transition">Das Quellwasser</Link>
              <Link to="/#vergleich" className="hover:text-white transition">Vorteile</Link>
              <Link to="/shop" className="hover:text-white transition">Shop</Link>
              <Link to="/ueber-uns" className="hover:text-white transition">Über uns</Link>
              <Link to="/wissenschaft" className="hover:text-white transition">News &amp; Studien</Link>
              <Link to="/kontakt" className="hover:text-white transition">Kontakt</Link>
            </div>
          </div>

          {/* Contact & Customer Info */}
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-1">Kontakt & Service</h4>
            <p className="text-xs text-slate-300">Kundenservice &amp; Beratung:</p>
            <p className="text-xs font-semibold text-white">Tel: 017660945171</p>
            <p className="text-xs text-slate-300">E-Mail: info@fontesvitea.de</p>
            <p className="text-xs text-slate-400 pt-1">Bestellungen: bestellung@fontesvitea.de</p>
          </div>
        </div>

        {/* Legal Links & Copyright */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-left">
          <p>© {new Date().getFullYear()} FONTES VITEA. Alle Rechte vorbehalten.</p>
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
