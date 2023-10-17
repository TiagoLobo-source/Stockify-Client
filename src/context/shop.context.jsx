import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

 const addToCart = (product) => {
    console.log("iddddddddddddd");
    console.log(product); 
  const copyCart = [...cart];
  const isAlreadyinCart = cart.findIndex(
    (currentProduct) => currentProduct._id === product._id
  );

  console.log("check")
  console.log(isAlreadyinCart)
  if (isAlreadyinCart >= 0) {
    const productFound = copyCart[isAlreadyinCart];
    console.log("*********************");
    console.log(productFound);
    copyCart[isAlreadyinCart] = {
      ...productFound,
      quantity: productFound.quantity + 1,
    };
  } else {
    console.log("else");
    console.log(product);
    copyCart.push({ ...product, quantity: 1 });
   }
   console.log( copyCart.length);
  setCart(copyCart);
};

const removeFromCart = (productId) => {
    const copyCart = [...cart];
    const itemIndex = copyCart.findIndex((item) => item._id === productId);
  
    if (itemIndex >= 0) {
      if (copyCart[itemIndex].quantity > 1) {
        copyCart[itemIndex].quantity -= 1;
      } else {
        
        copyCart.splice(itemIndex, 1);
      }
  
      setCart(copyCart);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
