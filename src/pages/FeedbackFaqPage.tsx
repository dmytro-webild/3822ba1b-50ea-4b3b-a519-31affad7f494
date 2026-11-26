import { useState } from "react";
import FeedbackForm from "@/components/sections/feedback/FeedbackForm";
import AdminModerationPanel from "@/components/sections/feedback/AdminModerationPanel";
import CustomerReviewsSection from "@/components/sections/feedback/CustomerReviewsSection";
import FaqSection from "@/components/sections/feedback/FaqSection";
import HeaderBanner from "@/components/sections/hero/HeaderBanner";
import { Shield } from "lucide-react";

export default function FeedbackFaqPage() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="bg-transparent min-h-screen text-[#0A1C3A] font-sans pb-16 space-y-8 sm:space-y-10">
      {/* Hero Header Banner */}
      <HeaderBanner
        title="FEEDBACK & FAQ"
        subtitle="Erfahren Sie, was unsere Kunden über FONTES VITAE® berichten, geben Sie Ihre eigene Produktbewertung mit Geschmacksprofil ab oder finden Sie Antworten in unserer FAQ-Sektion."
        badge="Kundenmeinungen & Community"
      >
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-bold rounded-xl border border-white/20 transition shadow-xs cursor-pointer backdrop-blur-md"
          >
            <Shield className="w-4 h-4 text-sky-400" />
            <span>{showAdmin ? "Admin-Moderationsbereich ausblenden" : "Admin-Moderationsbereich öffnen"}</span>
          </button>
        </div>
      </HeaderBanner>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Admin Panel (If open) */}
        {showAdmin && <AdminModerationPanel />}

      {/* 1. Customer Feedback Submission Form */}
      <section id="bewertung-einreichen">
        <FeedbackForm />
      </section>

      {/* 2. Approved Public Customer Reviews Carousel */}
      <section id="bewertungen">
        <CustomerReviewsSection
          title="Freigegebene Kundenbewertungen"
          subtitle="Erfahrungen und Geschmacksprofile aller Kundinnen und Kunden auf einen Blick."
          showOrderButton={true}
        />
      </section>

      {/* 3. Integrated FAQ Section */}
      <section id="faq">
        <FaqSection />
      </section>
      </div>
    </div>
  );
}
