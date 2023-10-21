import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function SellerOrders({ sellerId }) {
  const [sellerOrders, setSellerOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/orders/seller/${sellerId}`)
      .then((response) => {
        setSellerOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching seller orders:", error);
      });
  }, [sellerId]);

  return (
    <div>
      <h2>Seller Orders</h2>
      <ul>
        {sellerOrders.map((order) => (
          <li key={order._id}>
            <p>Transaction Type: {order.transactionType}</p>
            <p>Amount: {order.amount}</p>
            <p>Transaction ID: {order.transactionId}</p>
          
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SellerOrders;