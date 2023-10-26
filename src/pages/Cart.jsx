import axios from "axios";
import { useCart } from "../context/shop.context";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import productsService from "../services/ProductsService";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../pages/Cart.css";

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005'

function Cart() {
  const { cart, removeFromCart, addToCart } = useCart();
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const { clearCart } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = () => {
    const productDetailsArray = [];

    const fetchProductDetails = (item, callback) => {
      productsService
        .getProduct(item._id)
        .then((response) => {
          productDetailsArray.push({ product: response.data, item });
          callback();
        })
        .catch((error) => {
          console.log("Error fetching product details:", error);
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
      }));

      const cartData = { orders };

      axios
        .post(`${API_URL}/api/orders`, cartData)
        .then((orderResponse) => {})
        .catch((error) => {
          console.log("Error during order creation:", error);
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

    clearCart();
    setCheckoutSuccess(true);

    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 10000);
  };

  const closeSuccessMessage = () => {
    setCheckoutSuccess(false);
  };

  useEffect(() => {
    return () => {
      setCheckoutSuccess(false); 
    };
  }, []);


  function generateRandomTransactionId() {
    return Math.floor(Math.random() * 1000000).toString();
  }

  return (
  <div className="order-cards-container">
    
    <div className="orders-card">
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item._id}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.quantity * item.price}</p>
              <button className="action-button" onClick={() => addToCart(item)}>
                Add to cart
              </button>
              <button
                className="action-button"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p>Total: ${calculateTotal()}</p>
      {!isLoggedIn && user?.userPermission !== "user" ? (
        <Link to="/login">
          <button className="checkout-button">Checkout</button>
        </Link>
      ) : (
        <button className="checkout-button" onClick={handleSubmit}>
          Checkout
        </button>
      )}
      <div className={`order-cards ${checkoutSuccess ? "show" : ""}`}>
    <button className="close-button" onClick={closeSuccessMessage}>
    
        &times;
         
      </button>
        Your purchase was successful! Thank you for shopping with us.
    </div>
    </div>
  </div>
);

}

export default Cart;
