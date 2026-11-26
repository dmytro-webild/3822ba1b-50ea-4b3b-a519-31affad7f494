import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  FileText,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  BookOpen
} from "lucide-react";
import { STUDY_ARTICLES } from "@/utils/studiesData";

export default function StudieDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find index of current article
  const currentIndex = STUDY_ARTICLES.findIndex(
    (a) => a.slug === slug || a.id === slug
  );
  const article = currentIndex !== -1 ? STUDY_ARTICLES[currentIndex] : null;

  // Calculate previous and next article indices (cyclic loop)
  const totalArticles = STUDY_ARTICLES.length;
  const prevIndex = (currentIndex - 1 + totalArticles) % totalArticles;
  const nextIndex = (currentIndex + 1) % totalArticles;

  const prevArticle = totalArticles > 0 ? STUDY_ARTICLES[prevIndex] : null;
  const nextArticle = totalArticles > 0 ? STUDY_ARTICLES[nextIndex] : null;

  // Scroll to top whenever slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Keyboard navigation listener (Left/Right arrow keys)
  useEffect(() => {
    if (!article || !prevArticle || !nextArticle) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing when user is typing in form elements
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigate(`/wissenschaft/beitrag/${prevArticle.slug}`);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigate(`/wissenschaft/beitrag/${nextArticle.slug}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [article, prevArticle, nextArticle, navigate]);

  // Mobile Swipe Gesture Handling
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchEndX === null || touchStartY === null || !prevArticle || !nextArticle) return;
    const deltaX = touchStartX - touchEndX;
    const currentY = e.changedTouches[0]?.clientY ?? touchStartY;
    const deltaY = Math.abs(touchStartY - currentY);

    // Ensure horizontal gesture is dominant (min 50px delta, > 1.2x vertical delta)
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY * 1.2) {
      if (deltaX > 0) {
        // Swipe Left -> Next Article
        navigate(`/wissenschaft/beitrag/${nextArticle.slug}`);
      } else {
        // Swipe Right -> Previous Article
        navigate(`/wissenschaft/beitrag/${prevArticle.slug}`);
      }
    }
  };

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
            className="inline-flex items-center justify-center gap-2 bg-[#0A1C3A] hover:bg-[#12284c] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zu News &amp; Studien
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-transparent text-[#0A1C3A] font-sans pb-16 relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ─── FIXED SIDE ARROW BUTTONS (DESKTOP & TABLET) ─── */}
      {prevArticle && (
        <button
          onClick={() => navigate(`/wissenschaft/beitrag/${prevArticle.slug}`)}
          className="fixed left-3 lg:left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center gap-3 bg-[#0A1C3A]/90 hover:bg-[#0A1C3A] text-white p-3 lg:p-4 rounded-2xl shadow-2xl border border-white/20 transition-all transform hover:scale-105 active:scale-95 group"
          title={`Vorheriger Beitrag: ${prevArticle.title}`}
          aria-label="Vorheriger Beitrag"
        >
          <ChevronLeft className="w-6 h-6 text-sky-400 group-hover:-translate-x-0.5 transition-transform" />
          <div className="hidden xl:flex flex-col text-left max-w-[180px] pointer-events-none pr-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">Vorheriger Beitrag</span>
            <span className="text-xs font-bold text-white truncate">{prevArticle.title}</span>
          </div>
        </button>
      )}

      {nextArticle && (
        <button
          onClick={() => navigate(`/wissenschaft/beitrag/${nextArticle.slug}`)}
          className="fixed right-3 lg:right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center gap-3 bg-[#0A1C3A]/90 hover:bg-[#0A1C3A] text-white p-3 lg:p-4 rounded-2xl shadow-2xl border border-white/20 transition-all transform hover:scale-105 active:scale-95 group"
          title={`Nächster Beitrag: ${nextArticle.title}`}
          aria-label="Nächster Beitrag"
        >
          <div className="hidden xl:flex flex-col text-right max-w-[180px] pointer-events-none pl-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">Nächster Beitrag</span>
            <span className="text-xs font-bold text-white truncate">{nextArticle.title}</span>
          </div>
          <ChevronRight className="w-6 h-6 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Header Banner */}
      <section className="bg-[#0A1C3A] text-white py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-5 relative z-10">
          {/* Oberhalb des Beitrags: Zurück zu News & Studien Button */}
          <Link
            to="/wissenschaft"
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-white transition uppercase tracking-wider bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-full border border-white/15 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> ← Zurück zu News &amp; Studien
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 space-y-8 sm:space-y-10">
        
        {/* Oberhalb des Artikelinhalts: Zusätzlicher prominenter Back Button */}
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/wissenschaft"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0A1C3A] px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border border-slate-200 shadow-md transition"
          >
            <ArrowLeft className="w-4 h-4 text-sky-600" /> ← Zurück zu News &amp; Studien
          </Link>

          {/* Quick keyboard & swipe tip indicator */}
          <span className="hidden sm:inline-block text-[11px] text-slate-500 font-medium italic">
            Tipp: Nutzen Sie Pfeiltasten (← →) oder Wischgesten
          </span>
        </div>

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

        {/* Article Text Content Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-xl space-y-8">
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

        {/* ─── UNTERHALB DES BEITRAGS: GUT SICHTBARER BUTTON ─── */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <Link
            to="/wissenschaft"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#0A1C3A] px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border border-slate-300 shadow-md transition"
          >
            <ArrowLeft className="w-4 h-4 text-sky-600" /> ← Zurück zu News &amp; Studien
          </Link>

          <a
            href="https://shop.fontes-vitae.com"
            className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#0A1C3A] hover:bg-[#12284c] text-white px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition"
          >
            Zum Shop <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* ─── NAVIGATION AM ENDE JEDES BEITRAGS (3 BUTTONS NEBENEINANDER) ─── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100 inline-block">
              Beitrags-Navigation
            </span>
            <h3 className="text-base sm:text-lg font-black text-[#0A1C3A] uppercase">
              Weitere Beiträge entdecken
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Button 1: ← Vorheriger Beitrag */}
            {prevArticle ? (
              <Link
                to={`/wissenschaft/beitrag/${prevArticle.slug}`}
                className="bg-[#0A1C3A] hover:bg-[#12284c] text-white p-5 rounded-2xl flex flex-col justify-between border border-slate-800 shadow-md hover:shadow-xl transition group text-left space-y-3"
              >
                <div className="flex items-center gap-2 text-sky-400 font-extrabold text-xs uppercase tracking-wider">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>← Vorheriger Beitrag</span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                    {prevArticle.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {prevArticle.category}
                  </span>
                </div>
              </Link>
            ) : <div />}

            {/* Button 2: Zur Übersicht */}
            <Link
              to="/wissenschaft"
              className="bg-sky-50 hover:bg-sky-100/80 text-[#0A1C3A] p-5 rounded-2xl flex flex-col items-center justify-center text-center border border-sky-200 shadow-md hover:shadow-xl transition group space-y-2 min-h-[110px]"
            >
              <div className="w-10 h-10 rounded-full bg-[#0A1C3A] text-sky-400 flex items-center justify-center shadow-xs group-hover:scale-110 transition">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider block text-[#0A1C3A]">
                  Zur Übersicht
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Hauptseite News &amp; Studien
                </span>
              </div>
            </Link>

            {/* Button 3: Nächster Beitrag → */}
            {nextArticle ? (
              <Link
                to={`/wissenschaft/beitrag/${nextArticle.slug}`}
                className="bg-[#0A1C3A] hover:bg-[#12284c] text-white p-5 rounded-2xl flex flex-col justify-between items-end border border-slate-800 shadow-md hover:shadow-xl transition group text-right space-y-3"
              >
                <div className="flex items-center gap-2 text-sky-400 font-extrabold text-xs uppercase tracking-wider">
                  <span>Nächster Beitrag →</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                    {nextArticle.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {nextArticle.category}
                  </span>
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>

      </main>
    </div>
  );
}
