/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface CartItem {
  id: string;
  title: string;
  packInfo: string;
  price: number;
  cansCount: number;
  deposit: number; // 0.25 per can
  quantity: number;
  imageSrc: string;
  flavor?: string;
}

export interface ProductDetailInfo {
  title: string;
  subtitle: string;
  price: string;
  depositInfo: string;
  imageSrc: string;
  nutritionalTable: { name: string; value: string }[];
  specs: string[];
  description: string;
  verzehr: string;
}

export interface OrderCustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  zipCity: string;
  paymentMethod: "paypal" | "card" | "bank";
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  
  subtotalNet: number;
  totalDeposit: number;
  totalPrice: number;
  totalCans: number;
  totalItemCount: number;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  isConfirmationOpen: boolean;
  setIsConfirmationOpen: (open: boolean) => void;

  currentOrder: { orderNumber: string; details: OrderCustomerDetails; items: CartItem[]; total: number } | null;
  completeCheckout: (details: OrderCustomerDetails) => void;

  activeProductDetail: ProductDetailInfo | null;
  openProductDetail: (detail: ProductDetailInfo) => void;
  closeProductDetail: () => void;

  activeLegalModal: "impressum" | "datenschutz" | "agb" | "widerruf" | null;
  openLegalModal: (modal: "impressum" | "datenschutz" | "agb" | "widerruf") => void;
  closeLegalModal: () => void;

  activeVideoUrl: string | null;
  openVideoModal: (url: string) => void;
  closeVideoModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fons_vitae_cart");
      if (saved) {
        try { return JSON.parse(saved); } catch { return []; }
      }
    }
    return [
      {
        id: "h2-12pack",
        title: "FONS VITAE H2 Wasser",
        packInfo: "12er-Pack (12x 250 ml)",
        price: 33.00,
        cansCount: 12,
        deposit: 3.00,
        quantity: 1,
        imageSrc: "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794859388392-vrlwghmp.png",
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [activeProductDetail, setActiveProductDetail] = useState<ProductDetailInfo | null>(null);
  const [activeLegalModal, setActiveLegalModal] = useState<"impressum" | "datenschutz" | "agb" | "widerruf" | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const [currentOrder, setCurrentOrder] = useState<{
    orderNumber: string;
    details: OrderCustomerDetails;
    items: CartItem[];
    total: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fons_vitae_cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, "quantity">, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [...prev, { ...item, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDeposit = cartItems.reduce((acc, item) => acc + item.deposit * item.quantity, 0);
  const subtotalNet = Math.max(0, totalPrice - totalDeposit);
  const totalCans = cartItems.reduce((acc, item) => acc + item.cansCount * item.quantity, 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const completeCheckout = (details: OrderCustomerDetails) => {
    const orderNum = `FV-${Math.floor(100000 + Math.random() * 900000)}`;
    setCurrentOrder({
      orderNumber: orderNum,
      details,
      items: [...cartItems],
      total: totalPrice,
    });
    clearCart();
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
  };

  const openProductDetail = (detail: ProductDetailInfo) => setActiveProductDetail(detail);
  const closeProductDetail = () => setActiveProductDetail(null);

  const openLegalModal = (modal: "impressum" | "datenschutz" | "agb" | "widerruf") => setActiveLegalModal(modal);
  const closeLegalModal = () => setActiveLegalModal(null);

  const openVideoModal = (url: string) => setActiveVideoUrl(url);
  const closeVideoModal = () => setActiveVideoUrl(null);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotalNet,
        totalDeposit,
        totalPrice,
        totalCans,
        totalItemCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isConfirmationOpen,
        setIsConfirmationOpen,
        currentOrder,
        completeCheckout,
        activeProductDetail,
        openProductDetail,
        closeProductDetail,
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
