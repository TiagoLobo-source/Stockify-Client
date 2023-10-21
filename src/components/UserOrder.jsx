import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function UserOrders({ userId }) {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
    axios
      .get(`http://localhost:5005/api/orders/user/${userId}`)
      .then((response) => {
        setUserOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user orders:", error);
      });
  }, [userId]);

  return (
    <div>
      <h2>User Orders</h2>
      <ul>
        {userOrders.map((order) => (
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

export default UserOrders;
