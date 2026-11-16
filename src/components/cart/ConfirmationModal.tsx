import { useCart } from "@/context/CartContext";
import { CheckCircle, Package, Truck, ArrowRight } from "lucide-react";

export default function ConfirmationModal() {
  const { isConfirmationOpen, setIsConfirmationOpen, currentOrder } = useCart();

  if (!isConfirmationOpen || !currentOrder) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsConfirmationOpen(false)}
      />

      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-[#081427]">
        {/* Banner */}
        <div className="bg-[#0a192f] text-white p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl" />
          <div className="w-16 h-16 bg-[#c59b27] text-[#081427] rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>
          <span className="text-[#d4af37] text-xs font-extrabold uppercase tracking-widest block mb-1">
            Vielen Dank für Deine Bestellung!
          </span>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight">Bestätigt & In Bearbeitung</h2>
          <p className="text-xs text-slate-300 mt-2">
            Bestellnummer: <span className="font-mono font-bold text-white">{currentOrder.orderNumber}</span>
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Status steps */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-semibold text-[#0a192f]">
              <Package className="w-4 h-4 text-[#c59b27]" />
              <span>Bestellung empfangen</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex items-center gap-2 font-semibold text-slate-600">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Lieferung in 1-2 Werktagen</span>
            </div>
          </div>

          {/* Details summary */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b pb-1">
              Bestellübersicht
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs items-center">
                  <span className="text-slate-800 font-medium">
                    {item.quantity}x {item.title} {item.flavor ? `(${item.flavor})` : ""}
                  </span>
                  <span className="font-bold text-[#0a192f]">{(item.price * item.quantity).toFixed(2)} €</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-2 flex justify-between font-bold text-sm text-[#0a192f]">
              <span>Gesamtsumme (inkl. MwSt. & Pfand):</span>
              <span className="text-lg font-extrabold text-[#0a192f]">{currentOrder.total.toFixed(2)} €</span>
            </div>
          </div>

          {/* Delivery address */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-[#0a192f] block">Lieferadresse:</span>
            <p className="text-slate-700">
              {currentOrder.details.firstName} {currentOrder.details.lastName}
            </p>
            <p className="text-slate-700">{currentOrder.details.street}</p>
            <p className="text-slate-700">{currentOrder.details.zipCity}</p>
            <p className="text-slate-500 text-[11px] pt-1">
              Bestellbestätigung wurde an <strong className="text-slate-800">{currentOrder.details.email}</strong> geschickt.
            </p>
          </div>

          <button
            onClick={() => setIsConfirmationOpen(false)}
            className="w-full bg-[#0a192f] hover:bg-[#162a4d] text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition"
          >
            Zurück zum Shop
          </button>
        </div>
      </div>
    </div>
  );
}
