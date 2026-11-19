import React, { useState } from "react";
import { useCart, type OrderCustomerDetails } from "@/context/CartContext";
import { X, CheckCircle2, CreditCard, Landmark, Wallet } from "lucide-react";

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cartItems, totalPrice, completeCheckout } = useCart();

  const [formData, setFormData] = useState<OrderCustomerDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    zipCity: "",
    paymentMethod: "paypal",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderCustomerDetails, string>>>({});

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof OrderCustomerDetails, string>> = {};
    if (!formData.firstName) newErrors.firstName = "Pflichtfeld";
    if (!formData.lastName) newErrors.lastName = "Pflichtfeld";
    if (!formData.email || !formData.email.includes("@")) newErrors.email = "Gültige E-Mail erforderlich";
    if (!formData.street) newErrors.street = "Pflichtfeld";
    if (!formData.zipCity) newErrors.zipCity = "Pflichtfeld";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    completeCheckout(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCheckoutOpen(false)}
      />

      <div className="relative bg-[#e5e9ec] w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-300 overflow-hidden text-[#081427]">
        {/* Header */}
        <div className="bg-[#0A1C3A] text-white p-6 flex items-center justify-between border-b border-slate-300">
          <div>
            <span className="text-slate-300 text-xs font-extrabold uppercase tracking-widest block">FONTES VITEA Shop</span>
            <h2 className="text-2xl font-bold uppercase tracking-tight">Kasse & Bestellung</h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-[#12284c] transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Order Summary banner */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
            <div>
              <span className="text-xs text-slate-500 block">Bestellsumme ({cartItems.length} Positionen)</span>
              <span className="text-[#0a192f] text-xl font-extrabold">{totalPrice.toFixed(2)} €</span>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-3 py-1 rounded-full border border-emerald-200">
              Kostenloser Versand
            </span>
          </div>

          {/* Section: Personal Info & Address */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a192f] border-b border-slate-300 pb-1">
              1. Lieferadresse & Kontaktdaten
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700">Vorname *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1C3A]"
                  placeholder="Max"
                />
                {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700">Nachname *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1C3A]"
                  placeholder="Mustermann"
                />
                {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700">E-Mail-Adresse *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1C3A]"
                  placeholder="max@beispiel.de"
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700">Telefonnummer (optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1C3A]"
                  placeholder="017660945171"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold mb-1 text-slate-700">Straße & Hausnummer *</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1C3A]"
                  placeholder="Hauptstraße 12a"
                />
                {errors.street && <span className="text-red-500 text-xs">{errors.street}</span>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold mb-1 text-slate-700">PLZ & Ort *</label>
                <input
                  type="text"
                  value={formData.zipCity}
                  onChange={(e) => setFormData({ ...formData, zipCity: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1C3A]"
                  placeholder="61449 Steinbach Ts."
                />
                {errors.zipCity && <span className="text-red-500 text-xs">{errors.zipCity}</span>}
              </div>
            </div>
          </div>

          {/* Section: Payment Method */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a192f] border-b border-slate-300 pb-1">
              2. Zahlungsart wählen
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label
                className={`p-4 rounded-xl border cursor-pointer flex flex-col items-center gap-2 text-center transition ${
                  formData.paymentMethod === "paypal"
                    ? "border-[#0A1C3A] bg-white ring-2 ring-[#0A1C3A]"
                    : "border-slate-300 bg-slate-50 hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "paypal" })}
                  className="sr-only"
                />
                <Wallet className="w-6 h-6 text-[#0A1C3A]" />
                <span className="font-bold text-xs text-[#081427]">PayPal</span>
                <span className="text-[10px] text-slate-500">Käuferschutz & Schnell</span>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer flex flex-col items-center gap-2 text-center transition ${
                  formData.paymentMethod === "card"
                    ? "border-[#0A1C3A] bg-white ring-2 ring-[#0A1C3A]"
                    : "border-slate-300 bg-slate-50 hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "card" })}
                  className="sr-only"
                />
                <CreditCard className="w-6 h-6 text-[#0A1C3A]" />
                <span className="font-bold text-xs text-[#081427]">Kreditkarte</span>
                <span className="text-[10px] text-slate-500">Visa / Mastercard / Amex</span>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer flex flex-col items-center gap-2 text-center transition ${
                  formData.paymentMethod === "bank"
                    ? "border-[#0A1C3A] bg-white ring-2 ring-[#0A1C3A]"
                    : "border-slate-300 bg-slate-50 hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={formData.paymentMethod === "bank"}
                  onChange={() => setFormData({ ...formData, paymentMethod: "bank" })}
                  className="sr-only"
                />
                <Landmark className="w-6 h-6 text-[#0A1C3A]" />
                <span className="font-bold text-xs text-[#081427]">Banküberweisung</span>
                <span className="text-[10px] text-slate-500">Vorkasse per IBAN</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-300 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="text-slate-600 hover:text-black text-sm font-semibold"
            >
              Abbrechen
            </button>

            <button
              type="submit"
              className="bg-[#0A1C3A] hover:bg-[#12284c] text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center gap-2 shadow-lg transition"
            >
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span>Kostenpflichtig bestellen ({totalPrice.toFixed(2)} €)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
