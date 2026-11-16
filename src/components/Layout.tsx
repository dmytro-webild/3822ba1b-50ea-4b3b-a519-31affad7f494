import { Outlet } from "react-router-dom";
import NavbarPillLinks from "@/components/navbars/NavbarPillLinks";
import FooterPanelWordmark from "@/components/sections/footer/FooterPanelWordmark";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="default" data-card="filled" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarPillLinks
          brand="FONS VITAE"
          navItems={[
            {
              name: "Produkte",
              href: "#product"
            },
            {
              name: "Angebote",
              href: "#pricing"
            },
            {
              name: "Erfahrungen",
              href: "#testimonial"
            }
          ]}
          primaryButton={{
            text: "Jetzt bestellen",
            href: "#product"
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
      <footer data-webild-section="Footer" data-section="footer">
        <FooterPanelWordmark
          title="Matcha meets protein"
          button={{
            text: "Buy now",
            href: "#contact"
          }}
          brand="Iced Matcha Latte"
          brandAccent="FONS VITAE London"
          wordmark="FONS VITAE"
          links={[
            {
              text: "Shop all",
              href: "#contact"
            },
            {
              text: "Samples",
              href: "#contact"
            },
            {
              text: "Shipping and delivery",
              href: "#"
            },
            {
              text: "Returns and exchanges",
              href: "#"
            }
          ]}
          socials={[
            {
              label: "Instagram",
              href: "#",
              icon: "instagram"
            },
            {
              label: "TikTok",
              href: "#",
              icon: "tiktok"
            },
            {
              label: "YouTube",
              href: "#",
              icon: "youtube"
            }
          ]}
          copyright="© FONS VITAE Matcha Ltd. All rights reserved."
          credit={{
            text: "Site credits",
            href: "#"
          }}
          imageSrc="https://images.pexels.com/photos/2615323/pexels-photo-2615323.jpeg?auto=compress&w=1400"
          imageAlt="Iced drink in a tall glass"
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
      </footer>
    </div>
  );
}
