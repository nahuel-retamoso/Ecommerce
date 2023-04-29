import { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { addToCart, removeFromCart, getCart, clearFirestoreCart } from '../../firebase/firestore';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchCartItems() {
      if (currentUser) {
        const items = await getCart(currentUser.uid);
        setCartItems(items);
      }
    }
    fetchCartItems();
    console.log('useEffect CartContext')
  }, [currentUser]);

  async function addItemToCart(productId, quantity, size, price) {
    if (currentUser) {
      await addToCart(currentUser.uid, productId, quantity, size, price);
      setCartItems([...cartItems, { productId, quantity, size, price }]);
    }
  }

  async function removeItemFromCart(productId) {
    if (currentUser) {
      setCartItems(cartItems.filter((item) => item.productId !== productId));
      await removeFromCart(currentUser.uid, productId);
    }
  }

  async function clearCart() {
    if (currentUser) {
      await clearFirestoreCart(currentUser.uid);
      setCartItems([]);
    }
  }
  

  const value = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
