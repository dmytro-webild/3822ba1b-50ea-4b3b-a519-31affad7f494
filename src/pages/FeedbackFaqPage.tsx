import { useState } from "react";
import PhotoContestLoyaltyCard from "@/components/sections/feedback/PhotoContestLoyaltyCard";
import FeedbackForm from "@/components/sections/feedback/FeedbackForm";
import AdminModerationPanel from "@/components/sections/feedback/AdminModerationPanel";
import CustomerReviewsSection from "@/components/sections/feedback/CustomerReviewsSection";
import FaqSection from "@/components/sections/feedback/FaqSection";
import { MessageSquareHeart, Shield } from "lucide-react";

export default function FeedbackFaqPage() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans pt-28">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#0A1C3A] text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
          <MessageSquareHeart className="w-4 h-4 text-sky-400" />
          <span>Kundenmeinungen &amp; Community</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0A1C3A]">
          FEEDBACK &amp; FAQ
        </h1>

        <p className="text-slate-600 text-xs sm:text-sm sm:text-base leading-relaxed">
          Erfahren Sie, was unsere Kunden über FONTES VITEA berichten, nehmen Sie am Fotowettbewerb „DEIN FONTES VITEA MOMENT“ teil oder finden Sie Antworten in unserer FAQ-Sektion.
        </p>

        {/* Admin Moderation Panel Toggle Button */}
        <div className="pt-2">
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0A1C3A] text-xs font-bold rounded-xl border border-slate-300 transition shadow-xs"
          >
            <Shield className="w-4 h-4 text-[#0A1C3A]" />
            <span>{showAdmin ? "Admin-Moderationsbereich ausblenden" : "Admin-Moderationsbereich öffnen"}</span>
          </button>
        </div>
      </div>

      {/* Admin Panel (If open) */}
      {showAdmin && <AdminModerationPanel />}

      {/* 1. Photo Contest Section */}
      <section id="fotowettbewerb">
        <PhotoContestLoyaltyCard />
      </section>

      {/* 2. Customer Feedback Submission Form */}
      <section id="bewertung-einreichen">
        <FeedbackForm />
      </section>

      {/* 3. Approved Public Customer Reviews Carousel */}
      <section id="bewertungen">
        <CustomerReviewsSection
          title="Echte Kundenbewertungen &amp; Fotos"
          subtitle="Synchronisierte Erfahrungen und Bildnachweise aller freigegebenen Bewertungen unserer Kundinnen und Kunden."
          showOrderButton={true}
          showGoogleReviews={true}
        />
      </section>

      {/* 4. Integrated FAQ Section */}
      <section id="faq">
        <FaqSection />
      </section>
    </div>
  );
}
