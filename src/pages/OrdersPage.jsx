import React, { useContext, useState, useEffect } from "react";
import axios from "axios"; 

import { AuthContext } from "../context/auth.context";
import UserOrders from "../components/UserOrder";
import SellerOrders from "../components/SellerOrder";

function OrderPage() {
  const { user } = useContext(AuthContext);

  const [userOrders, setUserOrders] = useState([]);
  const [sellerOrders, setSellerOrders] = useState([]);

  useEffect(() => {console.log(user._id)
    if (user.userPermission === "user") {
      axios
        .get(`http://localhost:5005/api/orders/user/${user._id}`)
        .then((response) => {
          console.log("11111111111")
          console.log(response.data)
          setUserOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user orders:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user.userPermission === "seller") {
      axios
        .get(`http://localhost:5005/api/orders/${user._id}`)
        .then((response) => {
          setSellerOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching seller orders:", error);
        });
    }
  }, [user]);

  return (
    <div>
      {user.userPermission === "user" && (
        <div>
          <h2>User Orders</h2>
          <ul>
            {userOrders.map((order) => (
              <li key={order._id}>
                <p>Transaction Type: {order.orders[0].transactionType}</p>
                <p>Amount: {order.orders[0].amount}</p>
                <p>Transaction ID: {order.transactionId}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {user.userPermission === "seller" && (
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
      )}
    </div>
  );
}

export default OrderPage;
