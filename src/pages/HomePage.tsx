import HeroWordmarkProduct from "@/components/sections/hero/HeroWordmarkProduct";
import ProductCompareTable from "@/components/sections/product/ProductCompareTable";
import PricingRingCards from "@/components/sections/pricing/PricingRingCards";
import GalleryTiltedFrames from "@/components/sections/gallery/GalleryTiltedFrames";
import TestimonialPhotoRail from "@/components/sections/testimonial/TestimonialPhotoRail";
import FaqCircleRows from "@/components/sections/faq/FaqCircleRows";
import ContactPanelForm from "@/components/sections/contact/ContactPanelForm";
import ScrollToneBackdrop from "@/components/kit/ScrollToneBackdrop";
import ModelStage from "@/components/kit/ModelStage";
import LoaderWordmarkRise from "@/components/loaders/LoaderWordmarkRise";

export default function HomePage() {
  return (
    <>
      <ScrollToneBackdrop

      />

      <ModelStage
        src="https://storage.googleapis.com/webild/default/models/can/model.f6f3982ffc0d.glb"
        node="Soda can (Short)"
        finishes={{
          "Can metal material": {
            color: "#e4e7ea",
            metalness: 1,
            roughness: 0.22
          }
        }}
        hide={[]}
        scale={1.05}
      />

      <LoaderWordmarkRise
        brand="FONS VITAE"
        introDelay={1.6}
      />

      <div id="hero" data-webild-section="HeroWordmarkProduct" data-webild-section-id="HeroWordmarkProduct-1" data-section="hero">
        <HeroWordmarkProduct
          media="model"
          brand="FONS"
          title="PURE HYDRATION"
          description="Molekulares Wasserstoffwasser für Zellschutz, Energie und maximale Leistung im Alltag und Sport."
          primaryButton={{
            text: "Dosen wählen",
            href: "#product"
          }}
          items={[
            {
              value: "2.8",
              unit: "mg",
              title: "H2 Gehalt"
            },
            {
              value: "0",
              unit: "%",
              title: "Zucker"
            },
            {
              value: "100",
              unit: "%",
              title: "Vegan"
            }
          ]}
          introDelay={1.6}
          marquee="CLEAN & PURE H2"
          model={[
            {
              at: 0,
              rz: -18,
              ry: -30,
              rx: 8,
              scale: 1,
              sm: {
                scale: 0.85
              }
            },
            {
              at: 0.6,
              free: 1,
              rz: -6,
              ry: 60,
              rx: 4,
              scale: 0.75,
              sm: {
                free: 0,
                scale: 0.85
              }
            }
          ]}
        />
      </div>

      <div id="product" data-webild-section="ProductCompareTable" data-webild-section-id="ProductCompareTable-1" data-section="product">
        <ProductCompareTable
          media="model"
          productImageSrc="https://img.b2bpic.net/free-photo/cold-beverage-can-with-water-drops_53876-160725.jpg"
          productImageAlt="Cold beverage can with water drops"
          title="Der Vergleich."
          accent="Mehr für dich."
          benefitsLabel="Vorteile"
          name="FONS VITAE"
          otherLabel="Herkömmlich"
          items={[
            {
              title: "2,8 mg/L H2-Gehalt",
              ours: true,
              other: false
            },
            {
              title: "0 kcal & 0 g Zucker",
              ours: true,
              other: false
            },
            {
              title: "BPA-freie Dose",
              ours: true,
              other: false
            },
            {
              title: "Optimaler Zellschutz",
              ours: true,
              other: false
            },
            {
              title: "100% vegan & rein",
              ours: true,
              other: true
            },
            {
              title: "Laborgeprüfte Qualität",
              ours: true,
              other: false
            }
          ]}
          model={{
            ry: 20,
            rz: 0,
            scale: 0.5,
            sm: {
              scale: 0.78
            }
          }}
        />
      </div>

      <div id="pricing" data-webild-section="PricingRingCards" data-webild-section-id="PricingRingCards-1" data-section="pricing">
        <PricingRingCards
          media="model"
          title="Wähle deine Vorratsgröße"
          accent="Optimale Pakete"
          description="Molekulares Wasserstoffwasser direkt nach Hause geliefert."
          items={[
            {
              title: "12er-Pack H2",
              price: "33,00 €",
              period: "12 Dosen",
              features: [
                "Mind. 2,8 mg/L Wasserstoff",
                "Inklusive Dosenpfand",
                "BPA-freie Dose"
              ],
              button: {
                text: "Jetzt kaufen",
                href: "#product"
              }
            },
            {
              title: "Monatsvorrat",
              price: "66,00 €",
              period: "24 Dosen",
              features: [
                "Mind. 2,8 mg/L Wasserstoff",
                "Inklusive Dosenpfand",
                "3 Dosen täglich"
              ],
              button: {
                text: "Jetzt kaufen",
                href: "#product"
              }
            },
            {
              title: "Kombi-Paket",
              price: "110,40€",
              period: "48 Dosen",
              features: [
                "24x H2 Wasser",
                "24x Säfte-Mix",
                "Inklusive Dosenpfand"
              ],
              button: {
                text: "Jetzt kaufen",
                href: "#product"
              }
            }
          ]}
          model={{
            rz: -14,
            ry: 600,
            scale: 0.6,
            y: -0.5,
            sm: {
              y: 0,
              scale: 0.85
            }
          }}
        />
      </div>

      <div id="gallery" data-webild-section="GalleryTiltedFrames" data-webild-section-id="GalleryTiltedFrames-1" data-section="gallery">
        <GalleryTiltedFrames
          media="image"
          productImageSrc="https://img.b2bpic.net/free-photo/close-up-realistic-water-dynamic-light-background-with-copy-space_23-2148469479.jpg"
          productImageAlt="Close-up realistic water dynamic on light background with copy space"
          title="Vitalität im Alltag"
          accent="Echte Momente"
          items={[
            {
              imageSrc: "https://img.b2bpic.net/free-photo/women-stand-relax-after-exercising-holding-looking-water-bottle_1150-16442.jpg",
              imageAlt: "Women stand and relax after exercising, holding and looking at the water bottle.",
              title: "Fokus beim Workout"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/beautiful-woman-managing-her-work-from-home-drinking-coffee-looking-laptop-sitting-kitchen_1258-199670.jpg",
              imageAlt: "Beautiful woman managing her work from home drinking coffee and looking at laptop sitting in kitchen",
              title: "Energie im Büro"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/beautiful-asian-woman-meditating-exercising-top-mountain_1150-15307.jpg",
              imageAlt: "A beautiful Asian woman meditating and exercising on the top of the mountain.",
              title: "Regeneration nach Run"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/couple-cooking-together-cozy-kitchen-girl-puts-fruits-into-blender-blonde-loves-healthy-diet-pair-spend-time-modern-house_197531-1617.jpg",
              imageAlt: "Couple cooking together in the cozy kitchen. Girl puts fruits into a blender, blonde loves a healthy diet. Pair spend time in the modern house.",
              title: "Frische für den Tag"
            }
          ]}
          model={{
            rz: 8,
            ry: 410,
            scale: 0.72,
            y: -0.4,
            sm: {
              y: 0,
              scale: 0.85
            }
          }}
        />
      </div>

      <div id="testimonial" data-webild-section="TestimonialPhotoRail" data-webild-section-id="TestimonialPhotoRail-1" data-section="testimonial">
        <TestimonialPhotoRail
          media="image"
          title="Echte Kraft"
          label="Feedback von Sportlern"
          imageSrc="https://img.b2bpic.net/free-photo/refreshing-drink-with-apple-arrangement_23-2150928884.jpg"
          items={[
            {
              title: "Deutlicher Schub",
              quote: "Seit ich H2-Wasser vor den Einheiten trinke, fühle ich mich in den späten Sätzen deutlich stabiler.",
              name: "Maximilian Fischer",
              badge: "Geprüft"
            },
            {
              title: "Schnelle Erholung",
              quote: "Nach intensiven Läufen regeneriere ich spürbar schneller. Das Wasser schmeckt absolut rein und frisch.",
              name: "Nina Richter",
              badge: "Geprüft"
            },
            {
              title: "Volle Energie",
              quote: "Ideal für lange Bürotage und Workouts. Ich habe nachmittags kein Leistungstief mehr.",
              name: "Stefan Wolf",
              badge: "Geprüft"
            },
            {
              title: "Perfekter Fokus",
              quote: "Die Kombination aus H2-Wasser und Fruchtsäften gibt mir den optimalen Kick vor jedem Wettkampf.",
              name: "Anna Wagner",
              badge: "Geprüft"
            },
            {
              title: "Reine Hydration",
              quote: "Trinke täglich 3 Dosen H2-Wasser. Meine Haut wirkt frischer und die Ausdauer im Training stimmt.",
              name: "Laura Koch",
              badge: "Geprüft"
            }
          ]}
          model={{
            rx: 25,
            ry: 520,
            rz: 0,
            scale: 0.75,
            sm: {
              scale: 0.85
            }
          }}
        />
      </div>

      <div id="faq" data-webild-section="FaqCircleRows" data-webild-section-id="FaqCircleRows-1" data-section="faq">
        <FaqCircleRows
          media="image"
          title="Häufige Fragen"
          accent="Wissen & Service"
          items={[
            {
              title: "Was bewirkt molekularer Wasserstoff?",
              description: "FONS VITAE H2-Wasser enthält mindestens 2,8 mg/L gelöstes Wasserstoff-Gas. Es dient als gezieltes Antioxidans für Zellschutz, Vitalität und schnelle Regeneration."
            },
            {
              title: "Sind die 250-ml-Dosen frei von BPA?",
              description: "Ja, all unsere 250-ml-Dosen sind 100 % BPA-frei verarbeitet. Sie schützen die hohe H2-Konzentration zuverlässig vor Qualitätsverlust."
            },
            {
              title: "Wie viele Dosen sollte man täglich trinken?",
              description: "Wir empfehlen mindestens 3 Dosen täglich zu trinken, um den Körper kontinuierlich mit molekularem Wasserstoff zu versorgen."
            },
            {
              title: "Ist das Dosenpfand bereits enthalten?",
              description: "Ja, in allen Paketpreisen wie dem 12er-Pack für 33,00 € oder dem 24er-Pack für 66,00 € ist das gesetzliche Pfand bereits komplett eingerechnet."
            },
            {
              title: "Welche Nährwerte hat das H2-Wasser?",
              description: "Unser H2-Wasser ist komplett rein: 0 kcal, 0 g Fett, 0 g Zucker. Es ist 100 % vegan und ideal für Bio-Hacker sowie Sportler."
            },
            {
              title: "Wohin wende ich mich bei Bestellfragen?",
              description: "Bei allen Fragen zu Deiner Bestellung erreichst Du uns per E-Mail unter info@fonsvitae.de oder telefonisch unter 017660945171."
            }
          ]}
          model={{
            rz: 10,
            ry: 700,
            rx: -6,
            scale: 0.56,
            sm: {
              scale: 0.62
            }
          }}
        />
      </div>

      <div id="contact" data-webild-section="ContactPanelForm" data-webild-section-id="ContactPanelForm-1" data-section="contact">
        <ContactPanelForm
          media="image"
          title="Kontakt aufnehmen"
          accent="Wir sind für dich da."
          fields={[
            {
              name: "name",
              label: "Dein Name",
              placeholder: "Vor- und Nachname"
            },
            {
              name: "email",
              label: "E-Mail-Adresse",
              type: "email",
              placeholder: "info@fonsvitae.de"
            },
            {
              name: "phone",
              label: "Telefonnummer",
              type: "tel",
              placeholder: "Für Rückfragen"
            },
            {
              name: "message",
              label: "Nachricht",
              type: "textarea",
              placeholder: "Deine Fragen zu Produkt oder Bestellung"
            }
          ]}
          button={{
            text: "Nachricht senden",
            href: "mailto:info@fonsvitae.de"
          }}
          model={{
            rz: -6,
            ry: 760,
            scale: 0.9,
            sm: {
              scale: 0.85
            }
          }}
        />
      </div>
    </>
  );
}
