import { Trophy, Camera, Sparkles } from "lucide-react";

export default function PhotoContestLoyaltyCard() {
  return (
    <div className="bg-[#0A1C3A] text-white rounded-3xl p-6 sm:p-10 border border-slate-700 shadow-2xl space-y-8 font-sans relative overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-slate-700 pb-8 text-center lg:text-left relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-[#0A1C3A] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-amber-300">
            <Trophy className="w-4 h-4 text-[#0A1C3A]" />
            <span>Monatlicher Fotowettbewerb</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
            „DEIN FONTES VITEA MOMENT“
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Zeigen Sie uns Ihren erfrischenden FONTES VITEA Genussmoment! Laden Sie einfach ein Foto zu Ihrer Kundenbewertung hoch und nehmen Sie automatisch am monatlichen Fotowettbewerb teil.
          </p>
        </div>

        {/* Feature Highlight Badge */}
        <div className="bg-slate-900/90 border-2 border-amber-400 rounded-2xl p-6 text-center shrink-0 min-w-[240px] shadow-xl">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 block">
            Jeden Monat neu
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white uppercase my-2 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span>DEIN FOTO</span>
          </div>
          <span className="text-xs text-slate-300 font-bold uppercase tracking-wider block">
            Monats-Auszeichnung
          </span>
        </div>
      </div>

      {/* Monthly Prizes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="bg-slate-900/90 rounded-2xl p-6 border border-amber-500/40 space-y-3 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400 flex items-center justify-center mx-auto text-2xl">
            🥇
          </div>
          <h3 className="text-base font-black uppercase tracking-wider text-amber-300">
            1. Platz
          </h3>
          <p className="text-xs text-slate-300 leading-snug">
            Auszeichnung als FONTES VITEA Foto des Monats auf unserer Website &amp; Community-Highlights.
          </p>
        </div>

        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-700 space-y-3 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-sky-300 border border-sky-400/40 flex items-center justify-center mx-auto text-2xl">
            🥈
          </div>
          <h3 className="text-base font-black uppercase tracking-wider text-sky-300">
            2. Platz
          </h3>
          <p className="text-xs text-slate-300 leading-snug">
            Highlight-Präsentation im Kundenbewertungs-Karussell auf der Startseite.
          </p>
        </div>

        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-700 space-y-3 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-300 border border-slate-600 flex items-center justify-center mx-auto text-2xl">
            🥉
          </div>
          <h3 className="text-base font-black uppercase tracking-wider text-slate-200">
            3. Platz
          </h3>
          <p className="text-xs text-slate-300 leading-snug">
            Monatliche Nennung &amp; Auszeichnung in unserer Kunden-Galerie.
          </p>
        </div>
      </div>

      {/* How to Participate */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <Camera className="w-6 h-6 text-sky-400 shrink-0" />
          <span className="text-xs sm:text-sm text-slate-200 font-medium">
            <strong>So einfach geht’s:</strong> Formular unten ausfüllen, Foto hochladen &amp; Häkchen für den Fotowettbewerb setzen!
          </span>
        </div>
        <a
          href="#bewertung-einreichen"
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-[#0A1C3A] text-xs font-black uppercase tracking-wider rounded-xl transition shadow-md shrink-0"
        >
          Foto hochladen
        </a>
      </div>
    </div>
  );
}
