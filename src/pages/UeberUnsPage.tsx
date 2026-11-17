import { Link as RouterLink } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Droplets, Award, Zap } from "lucide-react";

export default function UeberUnsPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen text-[#0A1C3A] font-sans pb-24">
      {/* Hero Header */}
      <section className="bg-[#0A1C3A] text-white py-20 px-6 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-6 relative z-10">
          <RouterLink
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-white transition uppercase tracking-wider bg-white/10 px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
          </RouterLink>

          <div className="space-y-4 max-w-3xl">
            <span className="text-sky-400 text-xs font-extrabold tracking-widest uppercase bg-sky-950/60 px-4 py-1.5 rounded-full inline-block border border-sky-800/50">
              Über uns
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
              ÜBER UNS – FONS VITAE
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              Die Quelle des Lebens. Wir verbinden jahrhundertealte Naturphilosophie mit fortschrittlichster Zell-Wissenschaft für Deine maximale Hydration und Vitalität.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story & Philosophy */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Quote Card */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6 text-center sm:text-left relative overflow-hidden">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A1C3A] text-white flex items-center justify-center">
              <Droplets className="w-5 h-5 text-sky-400" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0A1C3A]">
              Unsere Mission &amp; Philosophie
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#0A1C3A] uppercase tracking-tight">
            „FONS VITAE – Die Quelle des Lebens“
          </h2>

          <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-700">
            Unser Name ist unser Auftrag: Wir glauben, dass wahre Gesundheit bei der Quelle beginnt. Inspiriert von der jahrhundertealten philosophischen Idee der „Lebensquelle“ verbinden wir dieses tiefe Verständnis mit modernster Wissenschaft. Unsere Philosophie basiert auf drei Säulen: Absolute Qualität, kompromisslose Transparenz und wissenschaftliche Fundierung. Jede Charge unseres molekularen Wasserstoffs wird streng geprüft. Wir bieten keine leeren Versprechen, sondern messbare Hydration auf zellulärer Ebene – für Deine Energie, Deinen Zellschutz und Deine Vitalität.
          </p>
        </div>

        {/* The 3 Pillars */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[#0A1C3A] text-xs font-extrabold tracking-widest uppercase bg-[#e2e8f0] px-4 py-1.5 rounded-full inline-block border border-slate-300">
              Drei Fundamente
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0A1C3A]">
              Unsere 3 Säulen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-4 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#0A1C3A] text-sky-400 flex items-center justify-center font-black text-lg shadow-md">
                01
              </div>
              <h3 className="text-xl font-black text-[#0A1C3A] uppercase">Absolute Qualität</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Reinstes Wasserstoff-Wasser in BPA-freien, 100% nachhaltigen Aluminiumdosen für maximale Haltbarkeit des gelösten H2-Gases.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-4 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#0A1C3A] text-sky-400 flex items-center justify-center font-black text-lg shadow-md">
                02
              </div>
              <h3 className="text-xl font-black text-[#0A1C3A] uppercase">Kompromisslose Transparenz</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Vollständige Deklaration aller Nährwerte. 0 kcal, 0 g Zucker, 0 künstliche Zusatzstoffe. Dosenpfand transparent ausgewiesen.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-4 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#0A1C3A] text-sky-400 flex items-center justify-center font-black text-lg shadow-md">
                03
              </div>
              <h3 className="text-xl font-black text-[#0A1C3A] uppercase">Wissenschaftliche Fundierung</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Basierend auf aktuellen Studien zur Wirkung von gelöstem Wasserstoff auf Mitochondrien, Laktatabbau und Zellschutz.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-[#0A1C3A] text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-4 max-w-2xl">
            <span className="text-sky-400 text-xs font-extrabold tracking-widest uppercase bg-sky-950 px-4 py-1.5 rounded-full inline-block border border-sky-800">
              Technologie &amp; Innovation
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Was FONS VITAE besonders macht
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Unsere proprietäre H2-Wasserstoff-Technologie verbindet unberührte Tiefenquelle mit hochpräziser physikalischer Wasserstoffanreicherung.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center gap-3 text-sky-400">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-base font-bold text-white uppercase">Tiefenquelle (136 m)</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Natürlich gefiltertes Wasser aus geschützten Gesteinsschichten mit einem idealen pH-Wert von 7,8 und natriumarmem Mineralstoffprofil.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center gap-3 text-sky-400">
                <Zap className="w-6 h-6" />
                <h3 className="text-base font-bold text-white uppercase">Min. 2.8 mg/L H2-Gas</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Höchste Konzentration an molekular gelöstem Wasserstoff für biologisch hochwirksame zelluläre Hydration.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center gap-3 text-sky-400">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="text-base font-bold text-white uppercase">100% BPA-freie Alu-Dose</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Die Aluminiumdose bildet die undurchdringliche Barriere gegen das Entweichen der winzigen Wasserstoffmoleküle.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center gap-3 text-sky-400">
                <Award className="w-6 h-6" />
                <h3 className="text-base font-bold text-white uppercase">Laborgeprüfte Reinheit</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Jede Produktionscharge unterliegt strengsten unabhängigen Laborkontrollen auf Reinheit, Stabilität und H2-Gehalt.
              </p>
            </div>
          </div>

          {/* Prominent CTA button to science */}
          <div className="pt-6 border-t border-slate-700/80 flex flex-wrap gap-4 items-center justify-between">
            <div>
              <p className="text-xs text-slate-300">Möchtest Du tiefer in die wissenschaftlichen Studien eintauchen?</p>
            </div>
            <RouterLink
              to="/wissenschaft"
              className="inline-flex items-center gap-2 bg-sky-400 hover:bg-sky-300 text-[#0A1C3A] font-black px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg transition transform hover:scale-105"
            >
              WISSENSCHAFT &amp; TECHNOLOGIE ENTDECKEN <ArrowRight className="w-4 h-4" />
            </RouterLink>
          </div>
        </div>

        {/* Back to Shop CTA */}
        <div className="text-center pt-8">
          <RouterLink
            to="/#shop"
            className="inline-flex items-center gap-2 bg-[#0A1C3A] hover:bg-[#12284c] text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition"
          >
            Jetzt Produkte im Shop entdecken <ArrowRight className="w-4 h-4" />
          </RouterLink>
        </div>
      </section>
    </div>
  );
}
