import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD
  const addToCart = (product) => {
    const productId = product?._id || product?.id;
    if (!productId) return;

    setCart((prev) => {
      const exists = prev.find((p) => (p._id || p.id) === productId);

      if (exists) {
        return prev.map((p) =>
          (p._id || p.id) === productId
            ? { ...p, qty: (p.qty || 1) + 1 }
            : p
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // INCREASE
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((p) =>
        (p._id || p.id) === id ? { ...p, qty: (p.qty || 1) + 1 } : p
      )
    );
  };

  // DECREASE (AUTO REMOVE WHEN 1 → 0)
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((p) =>
          (p._id || p.id) === id ? { ...p, qty: (p.qty || 1) - 1 } : p
        )
        .filter((p) => (p.qty || 0) > 0)
    );
  };

  // REMOVE COMPLETELY (even 1 item)
  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => (p._id || p.id) !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, p) => sum + (p.qty || 1), 0);

  const totalPrice = cart.reduce(
    (sum, p) => sum + p.price * (p.qty || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartProvider missing");
  return ctx;
};