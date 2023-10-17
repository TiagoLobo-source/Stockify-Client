import React from 'react';
import { useCart } from '../context/shop.context';

function Cart() {
  const { cart, removeFromCart, addToCart } = useCart();


  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item._id}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => addToCart(item)}>Add to cart</button>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <p>Total: ${calculateTotal()}</p>
      <button>Checkout</button>
    </div>
  );
}

export default Cart;





/*import React, { useState, useEffect } from 'react';
import { useCart } from '../context/shop.context';

function Cart() {
  const { cart } = useCart();
  const [itemId, setItemId] = useState(null);

  // Sort the cart items by id
  const sortedCart = [...cart].sort((a, b) => a.id - b.id);

  const calculateTotal = () => {
    return sortedCart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    if (sortedCart.length > 0) {
      setItemId(sortedCart[0].id);
    }
  }, [sortedCart]);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {sortedCart.map((item) => (
          <div key={item.id}>
            {item.id !== itemId ? (
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <h1>Total: ${item.quantity * item.price}</h1>
              </div>
            ) : (
              <p>Quantity: {item.quantity = ++item.quantity}</p>
            )}
          </div>
        ))}
      </ul>
      <p>Total: ${calculateTotal()}</p>
      <button>Checkout</button>
    </div>
  );
}

export default Cart;*/