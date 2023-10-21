import React, { useEffect } from 'react';
import axios from 'axios'; 
import { useCart } from '../context/shop.context';
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import productsService from "../services/ProductsService";
const API_URL = "http://localhost:5005";

function Cart() {
  const { cart, removeFromCart, addToCart } = useCart();
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = () => {
   
    const productDetailsArray = [];
  
    const fetchProductDetails = (item, callback) => {
      productsService.getProduct(item._id)
        .then((response) => {
          productDetailsArray.push({ product: response.data, item });
          callback();
        })
        .catch((error) => {
          console.log('Error fetching product details:', error);
          callback(error);
        });
    };
  
    const createOrder = () => {
      const orders = productDetailsArray.map(({ product, item }) => ({
        user: user._id,
        products: [
          {
            product: item._id,
            quantity: item.quantity,
            price: item.price,
            idOwner: product.idOwner,
          },
        ],
        transactionType: "Backlog",
        amount: item.quantity * item.price,
        transactionId: generateRandomTransactionId(),
      }))
  
      const cartData = { orders };
  
      axios
        .post(`${API_URL}/api/orders`, cartData)
        .then((orderResponse) => {
      
        })
        .catch((error) => {
          console.log('Error during order creation:', error);
        });
    };
  
 
    let count = 0;
    const totalItems = cart.length;
  
    cart.forEach((item) => {
      fetchProductDetails(item, (error) => {
        count++;
        if (count === totalItems) {
          
          createOrder();
        }
      });
    });
  };
  
  function generateRandomTransactionId() {
    return Math.floor(Math.random() * 1000000).toString();
  }
  
  

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
              <p>Total: {item.quantity * item.price}</p>
              <button onClick={() => addToCart(item)}>Add to cart</button>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <p>Total: ${calculateTotal()}</p>
      <button onClick={handleSubmit}>Checkout</button>
    </div>
  );
}

export default Cart;
