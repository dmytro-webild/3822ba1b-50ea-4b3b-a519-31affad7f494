import { useCart } from "@/context/CartContext";
import { X, Check, ShieldCheck, Zap, HeartPulse, Droplets } from "lucide-react";

export default function ProductDetailsModal() {
  const { activeProductDetail, closeProductDetail, addToCart } = useCart();

  if (!activeProductDetail) return null;

  const handleAddToCartFromModal = () => {
    // derive cart item
    addToCart({
      id: "h2-details-cart-item",
      title: activeProductDetail.title,
      packInfo: activeProductDetail.subtitle,
      price: parseFloat(activeProductDetail.price.replace("€", "").replace(",", ".")),
      cansCount: 12,
      deposit: 3.00,
      imageSrc: activeProductDetail.imageSrc,
    });
    closeProductDetail();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity"
        onClick={closeProductDetail}
      />

      <div className="relative bg-[#e5e9ec] w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-300 overflow-hidden text-[#081427]">
        {/* Header */}
        <div className="bg-[#0a192f] text-white p-6 flex items-center justify-between border-b border-slate-700">
          <div>
            <span className="text-[#d4af37] text-xs font-extrabold uppercase tracking-widest block">Produktdetails</span>
            <h2 className="text-2xl font-bold uppercase tracking-tight">{activeProductDetail.title}</h2>
          </div>
          <button
            onClick={closeProductDetail}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Info Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-center">
              <img
                src={activeProductDetail.imageSrc}
                alt={activeProductDetail.title}
                className="w-32 h-32 object-contain"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <span className="text-xs text-slate-500 block">{activeProductDetail.subtitle}</span>
              <div className="text-2xl font-extrabold text-[#0a192f]">{activeProductDetail.price}</div>
              <span className="text-xs text-[#c59b27] font-semibold block">{activeProductDetail.depositInfo}</span>
              <p className="text-xs text-slate-600 leading-relaxed">{activeProductDetail.description}</p>
            </div>
          </div>

          {/* Key Specifications Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1 shadow-xs">
              <Droplets className="w-5 h-5 text-[#0a192f] mx-auto" />
              <span className="text-[11px] font-bold text-[#081427] block">Min. 2.8 mg/L H2</span>
              <span className="text-[10px] text-slate-500">Molekular gelöst</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#c59b27] mx-auto" />
              <span className="text-[11px] font-bold text-[#081427] block">BPA-freie Alu-Dose</span>
              <span className="text-[10px] text-slate-500">Recyclebar</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1 shadow-xs">
              <Zap className="w-5 h-5 text-[#0a192f] mx-auto" />
              <span className="text-[11px] font-bold text-[#081427] block">100% Vegan</span>
              <span className="text-[10px] text-slate-500">Reine Qualität</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1 shadow-xs">
              <HeartPulse className="w-5 h-5 text-[#c59b27] mx-auto" />
              <span className="text-[11px] font-bold text-[#081427] block">Mind. 3 Dosen/Tag</span>
              <span className="text-[10px] text-slate-500">Verzehrempfehlung</span>
            </div>
          </div>

          {/* Nährwerttabelle */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a192f] border-b border-slate-300 pb-1">
              Nährwerttabelle (pro 100 ml)
            </h3>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
              <table className="w-full text-left">
                <tbody>
                  {activeProductDetail.nutritionalTable.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                      <td className="px-4 py-2 font-semibold text-slate-700">{row.name}</td>
                      <td className="px-4 py-2 text-right font-bold text-[#0a192f]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Specs list */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a192f] border-b border-slate-300 pb-1">
              Produkteigenschaften & Vorteile
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {activeProductDetail.specs.map((spec, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-800 font-medium">{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verzehrempfehlung */}
          <div className="bg-slate-100 p-4 rounded-xl border border-slate-300 text-xs space-y-1">
            <span className="font-bold text-[#0a192f] block uppercase tracking-wide">Verzehrempfehlung:</span>
            <p className="text-slate-700 leading-relaxed">{activeProductDetail.verzehr}</p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={closeProductDetail}
              className="text-slate-600 hover:text-black text-sm font-semibold"
            >
              Schließen
            </button>
            <button
              onClick={handleAddToCartFromModal}
              className="bg-[#0a192f] hover:bg-[#162a4d] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg transition"
            >
              In den Warenkorb legen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
