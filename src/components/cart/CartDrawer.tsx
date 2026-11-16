import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck } from "lucide-react";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotalNet,
    totalDeposit,
    totalPrice,
    totalCans,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#e5e9ec] border-l border-slate-300 shadow-2xl flex flex-col text-[#081427]">
          {/* Header */}
          <div className="p-5 bg-[#0A1C3A] text-white flex items-center justify-between border-b border-slate-300">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              <h2 className="text-xl font-bold tracking-tight uppercase">Warenkorb</h2>
              <span className="bg-white text-[#0A1C3A] text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((a, b) => a + b.quantity, 0)} Artikel
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-[#12284c] transition"
              aria-label="Schließen"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-200 mx-auto flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold">Dein Warenkorb ist leer</h3>
                <p className="text-sm text-slate-600 max-w-xs mx-auto">
                  Entdecke unser H2 Wasser und biologische Fruchtsäfte für maximale Vitalität.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 bg-[#0a192f] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#162a4d] transition shadow"
                >
                  Jetzt einkaufen
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex gap-4 items-center"
                >
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded-lg bg-slate-50 p-1 border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-[#081427] truncate">{item.title}</h4>
                    {item.flavor && (
                      <span className="text-xs text-[#0A1C3A] font-semibold block">Sorte: {item.flavor}</span>
                    )}
                    <p className="text-xs text-slate-500">{item.packInfo}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-slate-600 hover:text-black transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-slate-600 hover:text-black transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 text-xs flex items-center gap-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-[#081427]">
                      {(item.price * item.quantity).toFixed(2)} €
                    </div>
                    <div className="text-[10px] text-slate-400">
                      inkl. {(item.deposit * item.quantity).toFixed(2)} € Pfand
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary & Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-slate-200 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Warenwert (netto):</span>
                  <span>{subtotalNet.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between font-medium text-[#081427]">
                  <span>Enthaltenes Dosenpfand ({totalCans} Dosen):</span>
                  <span>{totalDeposit.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-[#0A1C3A] font-semibold">
                  <span>Versandkosten:</span>
                  <span>KOSTENLOS</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-bold text-[#081427]">
                  <span>Gesamtsumme:</span>
                  <span className="text-[#0A1C3A] text-lg font-extrabold">{totalPrice.toFixed(2)} €</span>
                </div>
                <p className="text-[10px] text-slate-400 text-right">Inkl. 19% MwSt. und Dosenpfand (0,25 € / Dose)</p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 p-2 rounded-lg border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Kostenfreie & schnelle Lieferung in 1-2 Werktagen.</span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-[#0A1C3A] hover:bg-[#12284c] text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition"
              >
                <span>Zur Kasse gehen</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
