import { Outlet } from "react-router-dom";
import NavbarPillLinks from "@/components/navbars/NavbarPillLinks";
import FooterPanelWordmark from "@/components/sections/footer/FooterPanelWordmark";
import { CartProvider, useCart } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutModal from "@/components/cart/CheckoutModal";
import ConfirmationModal from "@/components/cart/ConfirmationModal";
import ProductDetailsModal from "@/components/shop/ProductDetailsModal";
import LegalModal from "@/components/legal/LegalModal";
import VideoModal from "@/components/video/VideoModal";
import WaterDropsBackground from "@/components/animation/WaterDropsBackground";
import { ShoppingBag } from "lucide-react";

function FloatingCartButton() {
  const { setIsCartOpen, totalItemCount, totalPrice } = useCart();

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-6 right-6 z-40 bg-[#0A1C3A] hover:bg-[#12284c] text-white p-3.5 rounded-2xl shadow-2xl border border-slate-300 flex items-center gap-3 group transition transform hover:scale-105 active:scale-95"
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

function LayoutContent() {
  const { openLegalModal } = useCart();

  return (
    <div
      className="relative isolate min-h-svh flex flex-col bg-background text-foreground selection:bg-[#0A1C3A] selection:text-white"
      data-button="default"
      data-card="filled"
      data-pattern="none"
    >
      {/* 2D Water drops removed for static clean design */}
      <WaterDropsBackground />

      <header data-webild-section="Header" className="relative z-20">
        <NavbarPillLinks
          brand="FONS VITAE"
          navItems={[
            {
              name: "Shop",
              href: "#shop"
            },
            {
              name: "Quelle & Mineralien",
              href: "#quelle"
            },
            {
              name: "Pakete",
              href: "#bundles"
            },
            {
              name: "Über uns",
              href: "#about"
            },
            {
              name: "Studien & News",
              href: "#science"
            },
            {
              name: "Einsatzbereiche",
              href: "#usecases"
            },
            {
              name: "Kontakt",
              href: "#contact"
            }
          ]}
          primaryButton={{
            text: "Jetzt bestellen",
            href: "#shop"
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

      {/* All Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <ConfirmationModal />
      <ProductDetailsModal />
      <LegalModal />
      <VideoModal />

      <footer data-webild-section="Footer" data-section="footer" className="relative z-10">
        <FooterPanelWordmark
          title="DAS GESAMTE FONS VITAE SORTIMENT"
          subtitle="H2 WASSERSTOFF-WASSER & 6 EDLE FRUCHTSAFT-KREATIONEN"
          button={{
            text: "Jetzt Produkte entdecken",
            href: "#shop"
          }}
          brand="FONS VITAE"
          logoSrc="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794862275041-s5qagrxx.jpg"
          lineupImageSrc="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794880807544-312gbdxq.png"
          socials={[
            {
              label: "Instagram (Coming Soon)",
              href: "#",
              icon: "instagram"
            },
            {
              label: "YouTube (Coming Soon)",
              href: "#",
              icon: "youtube"
            }
          ]}
          copyright="© FONS VITAE – Die Quelle des Lebens. Alle Rechte vorbehalten. Kundenservice: 017660945171 | info@fonsvitae.de"
        />

        {/* Footer Legal Quick Bar */}
        <div className="bg-[#f4f6f8] text-[#0A1C3A] text-xs py-4 px-6 border-t border-slate-300 text-center flex flex-wrap justify-center items-center gap-6">
          <button onClick={() => openLegalModal("impressum")} className="font-semibold hover:underline transition">
            Impressum
          </button>
          <span className="text-slate-400">•</span>
          <button onClick={() => openLegalModal("datenschutz")} className="font-semibold hover:underline transition">
            Datenschutz
          </button>
          <span className="text-slate-400">•</span>
          <button onClick={() => openLegalModal("agb")} className="font-semibold hover:underline transition">
            AGB
          </button>
          <span className="text-slate-400">•</span>
          <button onClick={() => openLegalModal("widerruf")} className="font-semibold hover:underline transition">
            Widerrufsbelehrung
          </button>
          <span className="text-slate-400">•</span>
          <span>Bestellungen: bestellung@fonsvitae.de | Tel: 017660945171</span>
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
