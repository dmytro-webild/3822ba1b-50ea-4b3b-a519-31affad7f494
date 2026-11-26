/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";

interface CartContextType {
  activeLegalModal: "impressum" | "datenschutz" | "agb" | "widerruf" | null;
  openLegalModal: (modal: "impressum" | "datenschutz" | "agb" | "widerruf") => void;
  closeLegalModal: () => void;

  activeVideoUrl: string | null;
  openVideoModal: (url: string) => void;
  closeVideoModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [activeLegalModal, setActiveLegalModal] = useState<"impressum" | "datenschutz" | "agb" | "widerruf" | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const openLegalModal = (modal: "impressum" | "datenschutz" | "agb" | "widerruf") => setActiveLegalModal(modal);
  const closeLegalModal = () => setActiveLegalModal(null);

  const openVideoModal = (url: string) => setActiveVideoUrl(url);
  const closeVideoModal = () => setActiveVideoUrl(null);

  return (
    <CartContext.Provider
      value={{
        activeLegalModal,
        openLegalModal,
        closeLegalModal,
        activeVideoUrl,
        openVideoModal,
        closeVideoModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
