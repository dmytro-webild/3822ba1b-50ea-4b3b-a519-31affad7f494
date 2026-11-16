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
      className="fixed bottom-6 right-6 z-40 bg-[#0a192f] hover:bg-[#162a4d] text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 group transition transform hover:scale-105 active:scale-95"
      aria-label="Warenkorb öffnen"
    >
      <div className="relative">
        <ShoppingBag className="w-6 h-6 text-[#d4af37]" />
        {totalItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#c59b27] text-[#081427] text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-[#0a192f]">
            {totalItemCount}
          </span>
        )}
      </div>
      <div className="hidden sm:block text-left text-xs font-bold leading-tight pr-1">
        <span className="block text-[#d4af37] uppercase text-[10px] tracking-wider">Warenkorb</span>
        <span>{totalPrice.toFixed(2)} €</span>
      </div>
    </button>
  );
}

function LayoutContent() {
  const { openLegalModal } = useCart();

  return (
    <div
      className="relative isolate min-h-svh flex flex-col bg-background text-foreground selection:bg-[#d4af37] selection:text-[#081427]"
      data-button="default"
      data-card="filled"
      data-pattern="none"
    >
      {/* 2D Parallax Floating Water Drops */}
      <WaterDropsBackground />

      <header data-webild-section="Header">
        <NavbarPillLinks
          brand="FONS VITAE"
          navItems={[
            {
              name: "Shop",
              href: "#shop"
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

      <main className="flex-grow" data-button="default" data-card="filled" data-pattern="none">
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

      <footer data-webild-section="Footer" data-section="footer">
        <FooterPanelWordmark
          title="CLEAN & PURE HYDRATION"
          button={{
            text: "Jetzt Produkte wählen",
            href: "#shop"
          }}
          brand="FONS VITAE"
          brandAccent="Industriestr. 23 A, 61449 Steinbach Ts."
          wordmark="FONS VITAE"
          links={[
            {
              text: "Impressum",
              href: "#",
            },
            {
              text: "Datenschutz",
              href: "#",
            },
            {
              text: "AGB",
              href: "#",
            },
            {
              text: "Widerrufsbelehrung",
              href: "#",
            }
          ]}
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
          credit={{
            text: "Impressum & Legal",
            href: "#"
          }}
          imageSrc="https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794859388392-vrlwghmp.png"
          imageAlt="FONS VITAE H2 Dose"
          model={{
            at: 0,
            rz: 0,
            ry: 1080,
            rx: 6,
            scale: 0.66,
            y: 6,
            sm: {
              opacity: 0
            }
          }}
        />

        {/* Footer Legal Quick Bar */}
        <div className="bg-[#061122] text-slate-400 text-xs py-4 px-6 border-t border-slate-800 text-center flex flex-wrap justify-center items-center gap-6">
          <button onClick={() => openLegalModal("impressum")} className="hover:text-[#d4af37] transition">
            Impressum
          </button>
          <span className="text-slate-600">•</span>
          <button onClick={() => openLegalModal("datenschutz")} className="hover:text-[#d4af37] transition">
            Datenschutz
          </button>
          <span className="text-slate-600">•</span>
          <button onClick={() => openLegalModal("agb")} className="hover:text-[#d4af37] transition">
            AGB
          </button>
          <span className="text-slate-600">•</span>
          <button onClick={() => openLegalModal("widerruf")} className="hover:text-[#d4af37] transition">
            Widerrufsbelehrung
          </button>
          <span className="text-slate-600">•</span>
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
