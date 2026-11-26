import React from "react";

interface HeaderBannerProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: React.ReactNode;
}

export default function HeaderBanner({
  title,
  subtitle,
  badge,
  children,
}: HeaderBannerProps) {
  const bgImageUrl =
    "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795708383563-jke0h7jy.png";

  return (
    <section className="relative overflow-hidden bg-[#041126] text-white pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-6 shadow-xl border-b border-sky-900/40">
      {/* Molecule & wave background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-95 pointer-events-none"
        style={{
          backgroundImage: `url("${bgImageUrl}")`,
        }}
        aria-hidden="true"
      />

      {/* Subtle radial gradient overlay to emphasize centered text while keeping side molecules clear */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,17,38,0.3)_0%,rgba(4,17,38,0.7)_80%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 font-sans">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/30 text-xs font-extrabold uppercase tracking-widest backdrop-blur-md shadow-xs">
            {badge}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight filter drop-shadow-md">
          {title}
        </h1>

        {subtitle && (
          <p className="text-slate-200 text-xs sm:text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed filter drop-shadow-xs">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
