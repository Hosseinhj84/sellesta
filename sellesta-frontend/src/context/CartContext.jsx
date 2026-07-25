import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
} from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setloading] = useState(false);
  const { user } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart(null);
      return;
    }
    try {
      const res = await api.get("cart/");
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    setloading(true);
    try {
      const res = await api.post("cart/add/", {
        product_id: productId,
        quantity: quantity,
      });
      setCart(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setloading(false);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    const res = await api.patch(`cart/item/${itemId}/`, { quantity });
    setCart(res.data);
  };

  const removeCartItem = async (itemId) => {
    const res = await api.delete(`cart/item/${itemId}/remove/`);
    setCart(res.data);
  };

  const itemCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateCartItem,
        removeCartItem,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
