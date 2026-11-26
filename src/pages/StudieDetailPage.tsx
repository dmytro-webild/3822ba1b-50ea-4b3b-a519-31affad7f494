import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, FileText, ExternalLink, CheckCircle2, ShieldCheck } from "lucide-react";
import { STUDY_ARTICLES } from "@/utils/studiesData";

export default function StudieDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = STUDY_ARTICLES.find((a) => a.slug === slug || a.id === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-transparent py-24 px-6 flex flex-col items-center justify-center text-center font-sans">
        <div className="max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <FileText className="w-12 h-12 text-[#0A1C3A] mx-auto opacity-40" />
          <h1 className="text-2xl font-black text-[#0A1C3A] uppercase">Beitrag nicht gefunden</h1>
          <p className="text-xs text-slate-600">
            Der angeforderte wissenschaftliche Beitrag konnte leider nicht gefunden werden oder wurde verschoben.
          </p>
          <Link
            to="/wissenschaft"
            className="inline-flex items-center justify-center gap-2 bg-[#0A1C3A] hover:bg-[#12284c] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zu News &amp; Studien
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-[#0A1C3A] font-sans pb-12">
      {/* Header Banner */}
      <section className="bg-[#0A1C3A] text-white py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <Link
            to="/wissenschaft"
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-white transition uppercase tracking-wider bg-white/10 px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zu News &amp; Studien
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sky-400 text-xs font-extrabold tracking-widest uppercase bg-sky-950/80 px-3.5 py-1 rounded-full border border-sky-800/60 inline-block">
                {article.category}
              </span>
              <span className="text-slate-300 text-xs font-medium flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                {article.publishDate}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight text-white">
              {article.title}
            </h1>

            <p className="text-sky-300 text-sm sm:text-base font-medium italic leading-relaxed">
              {article.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Article Body */}
      <main className="max-w-4xl mx-auto px-6 -mt-8 relative z-20 space-y-10">
        {/* Featured Image */}
        <div className="bg-white rounded-3xl p-3 border border-slate-200 shadow-2xl overflow-hidden">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900">
            <img
              src={article.imageSrc}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-[#0A1C3A]/90 backdrop-blur-md text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>{article.authorOrJournal}</span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8">
          {/* Executive Summary */}
          <div className="bg-sky-50/80 p-6 rounded-2xl border border-sky-100 space-y-2">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-700">Zusammenfassung</h2>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {article.shortDescription}
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-[#0A1C3A]">
              1. Einleitung &amp; Hintergrund
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {article.fullContent.introduction}
            </p>
          </div>

          {/* Key Findings */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-[#0A1C3A]">
              2. Kern-Ergebnisse der Forschungsarbeit
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {article.fullContent.keyFindings.map((finding, idx) => (
                <div
                  key={idx}
                  className="bg-[#f8fafc] p-4 sm:p-5 rounded-2xl border border-slate-200 flex items-start gap-3.5"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0A1C3A] text-sky-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {finding}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology */}
          {article.fullContent.methodology && (
            <div className="space-y-3 pt-2">
              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#0A1C3A]">
                3. Forschungsdesign &amp; Methodik
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {article.fullContent.methodology}
              </p>
            </div>
          )}

          {/* Practical Takeaway */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-[#0A1C3A]">
              4. Bedeutung für die Praxis
            </h2>
            <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                {article.fullContent.practicalTakeaway}
              </p>
            </div>
          </div>

          {/* Citation & Original Source Box */}
          <div className="bg-[#0A1C3A] text-white p-6 sm:p-8 rounded-2xl space-y-4 border border-slate-800 shadow-lg">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">
                Wissenschaftliche Quelle &amp; Referenz
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                „{article.fullContent.originalStudyTitle}“
              </h3>
              {article.fullContent.doiOrPmid && (
                <p className="text-xs font-mono text-slate-300">
                  {article.fullContent.doiOrPmid}
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-slate-700/80">
              <a
                href={article.fullContent.originalStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-[#0A1C3A] px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-md"
              >
                <span>Originalstudie auf PubMed lesen</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <span className="text-[11px] text-slate-400 italic">
                {article.authorOrJournal}
              </span>
            </div>
          </div>
        </article>

        {/* Footer Navigation CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <Link
            to="/wissenschaft"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#0A1C3A] border border-slate-300 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition"
          >
            <ArrowLeft className="w-4 h-4" /> Alle Studien ansehen
          </Link>

          <a
            href="https://shop.fontes-vitae.com"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0A1C3A] hover:bg-[#12284c] text-white px-7 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition"
          >
            Jetzt FONTES VITAE im Shop bestellen <ArrowLeft className="w-4 h-4 rotate-180" />
          </a>
        </div>
      </main>
    </div>
  );
}
