import { useState, useEffect } from "react";
import { Trophy, Gift, Award, CheckCircle2, Ticket, Sparkles, Copy, Check } from "lucide-react";
import {
  getLoyaltyPoints,
  getUserVouchers,
  redeemVoucher,
  type Voucher,
} from "@/utils/feedbackStore";

export default function PhotoContestLoyaltyCard() {
  const [points, setPoints] = useState(170);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [redeemMsg, setRedeemMsg] = useState<{ success: boolean; text: string } | null>(null);

  const loadPoints = () => {
    setPoints(getLoyaltyPoints());
    setVouchers(getUserVouchers());
  };

  useEffect(() => {
    loadPoints();
    const handleUpdate = () => loadPoints();
    window.addEventListener("fv_points_updated", handleUpdate);
    return () => window.removeEventListener("fv_points_updated", handleUpdate);
  }, []);

  const handleRedeem = (cost: number, label: string) => {
    setRedeemMsg(null);
    const result = redeemVoucher(cost, label);
    if (result.success && result.code) {
      setRedeemMsg({
        success: true,
        text: `Herzlichen Glückwunsch! Ihr Gutscheincode ${result.code} (${label}) wurde erstellt.`,
      });
    } else {
      setRedeemMsg({
        success: false,
        text: result.message || "Einlösung fehlgeschlagen.",
      });
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="bg-[#0A1C3A] text-white rounded-3xl p-6 sm:p-10 border border-slate-700 shadow-2xl space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-slate-700 pb-8 text-center lg:text-left">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-[#0A1C3A] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-amber-300">
            <Trophy className="w-4 h-4 text-[#0A1C3A]" />
            <span>Monatlicher Fotowettbewerb</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
            „DEIN FONTES VITEA MOMENT“
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Reichen Sie Ihr Foto mit Kundenbewertung ein und sichern Sie sich jeden Monat wertvolle Treuepunkte, die Sie direkt in Einkaufsgutscheine umwandeln können.
          </p>
        </div>

        {/* Current Points Badge */}
        <div className="bg-slate-900/90 border-2 border-amber-400 rounded-2xl p-6 text-center shrink-0 min-w-[220px] shadow-xl">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
            Ihr Treuepunkte-Konto
          </span>
          <div className="text-4xl font-black text-amber-400 font-mono my-1 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span>{points}</span>
          </div>
          <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">Treuepunkte</span>
        </div>
      </div>

      {/* Monthly Prizes & Redeemable Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Monthly Prizes */}
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 border-b border-slate-800 pb-3">
            <Award className="w-5 h-5" />
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Monatliche Gewinne
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-xl border border-amber-500/30">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-2">
                🥇 1. Platz
              </span>
              <span className="text-xs font-extrabold text-amber-400 font-mono">+ 100 Treuepunkte</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
                🥈 2. Platz
              </span>
              <span className="text-xs font-extrabold text-sky-400 font-mono">+ 50 Treuepunkte</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                🥉 3. Platz
              </span>
              <span className="text-xs font-extrabold text-sky-400 font-mono">+ 20 Treuepunkte</span>
            </div>
          </div>
        </div>

        {/* Redeem Rewards */}
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sky-400 border-b border-slate-800 pb-3">
            <Gift className="w-5 h-5" />
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Punkte gegen Gutscheine einlösen
            </h3>
          </div>

          <div className="space-y-3">
            {/* 150 P = 20 € */}
            <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-xl border border-slate-700 gap-2">
              <div>
                <span className="text-xs font-bold text-white block">20 € Einkaufsgutschein</span>
                <span className="text-[10px] text-slate-400 font-mono">Kosten: 150 Treuepunkte</span>
              </div>
              <button
                onClick={() => handleRedeem(150, "20 € Gutschein")}
                disabled={points < 150}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:hover:bg-amber-400 text-[#0A1C3A] font-extrabold text-xs uppercase tracking-wider rounded-lg transition shrink-0"
              >
                Einlösen
              </button>
            </div>

            {/* 50 P = 10 € */}
            <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-xl border border-slate-700 gap-2">
              <div>
                <span className="text-xs font-bold text-white block">10 € Einkaufsgutschein</span>
                <span className="text-[10px] text-slate-400 font-mono">Kosten: 50 Treuepunkte</span>
              </div>
              <button
                onClick={() => handleRedeem(50, "10 € Gutschein")}
                disabled={points < 50}
                className="px-3 py-1.5 bg-sky-400 hover:bg-sky-300 disabled:opacity-40 disabled:hover:bg-sky-400 text-[#0A1C3A] font-extrabold text-xs uppercase tracking-wider rounded-lg transition shrink-0"
              >
                Einlösen
              </button>
            </div>

            {/* 20 P = 5 € */}
            <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-xl border border-slate-700 gap-2">
              <div>
                <span className="text-xs font-bold text-white block">5 € Einkaufsgutschein</span>
                <span className="text-[10px] text-slate-400 font-mono">Kosten: 20 Treuepunkte</span>
              </div>
              <button
                onClick={() => handleRedeem(20, "5 € Gutschein")}
                disabled={points < 20}
                className="px-3 py-1.5 bg-sky-400 hover:bg-sky-300 disabled:opacity-40 disabled:hover:bg-sky-400 text-[#0A1C3A] font-extrabold text-xs uppercase tracking-wider rounded-lg transition shrink-0"
              >
                Einlösen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Redemption Notification */}
      {redeemMsg && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-3 ${
            redeemMsg.success
              ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
              : "bg-red-950/80 border-red-500 text-red-200"
          }`}
        >
          {redeemMsg.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <Award className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{redeemMsg.text}</span>
        </div>
      )}

      {/* User's Generated Vouchers */}
      {vouchers.length > 0 && (
        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Ticket className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Ihre aktivierten Gutscheincodes
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {vouchers.map((v) => (
              <div
                key={v.code}
                className="bg-slate-950 p-3 rounded-xl border border-emerald-500/40 flex items-center justify-between gap-2"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    {v.discount} Rabatt
                  </span>
                  <span className="text-xs font-black font-mono text-emerald-300">{v.code}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(v.code)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition text-xs"
                  title="Code kopieren"
                >
                  {copiedCode === v.code ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
