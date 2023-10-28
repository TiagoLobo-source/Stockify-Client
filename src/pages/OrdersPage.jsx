import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { AuthContext } from "../context/auth.context";
import productsService from "../services/ProductsService";


const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

Modal.setAppElement("#root");

function OrderPage() {
  const { user } = useContext(AuthContext);

  const [userOrders, setUserOrders] = useState([]);
  const [sellerOrders, setSellerOrders] = useState([]);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingData, setTrackingData] = useState({});
  const [buttonText, setButtonText] = useState("Send");

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function formatTime(timeString) {
    return new Date(timeString).toLocaleTimeString();
  }

  function openTrackingModal(order) {
    setIsTrackingModalOpen(true);
    setTrackingData(order);
  }

  function deleteOrder(orderId) {
    productsService
      .deleteOrder(orderId)
      .then(() => {
        if (user.userPermission === "user") {
          axios
            .get(`${API_URL}/api/orders/user/${user._id}`)
            .then((response) => {
              setUserOrders(response.data);
            })
            .catch((error) => {
              console.error("Error fetching user orders:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  }

  useEffect(() => {
    if (user.userPermission === "user") {
      axios
        .get(`${API_URL}/api/orders/user/${user._id}`)
        .then((response) => {
          setUserOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user orders:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user.userPermission === "supplier"|| user.userPermission === "admin") {
      console.log("Seller ID:", user._id);
      axios
        .get(`${API_URL}/api/orders/products/${user._id}`)
        .then((response) => {
          console.log("Seller Orders:", response.data);
          setUserOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching seller orders:", error);
        });
      markOrderAsSent;
    }
  }, [user]);

  function markOrderAsSent(orderId) {
    axios
      .put(`${API_URL}/api/orders/products/${orderId}/mark-as-sent`)
      .then((response) => {
        const updatedOrders = userOrders.map((order) => {
          if (order._id === orderId) {
            return {
              ...order,
              buttonText: "On the way",
            };
          }
          return order;
        });
        console.log(updatedOrders)
        setUserOrders(updatedOrders);
      });
  }

  const modalStyles = {
    content: {
      width: "30%",
      maxHeight: "70vh",
      overflowY: "auto",
      margin: "auto",
      border: "none",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      position: "fixed",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  };

  return (
    <div>
     {user.userPermission === "user" && (
  <div>
    <h2>User Orders</h2>
    <ul>
      {userOrders.map((order) => (
        <li key={order._id}>
          Transaction Type:{" "}
          {order.orders[0]?.transactionType === "Backlog"
            ? "Awaiting to be shipped"
            : order.orders[0]?.transactionType}
          <p>
            Amount:{" "}
            {order.orders[0]?.amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p>Date: {formatDate(order.orders[0].date)}</p>
          <p>Time: {formatTime(order.orders[0].date)}</p>
          {order.orders[0]?.products.map((product) => (
            <div key={product.products._id}>
              <h3>Product Details</h3>
              <p>Product Name: {product.products[0].name}</p>
              <p>Product Price: ${product.products[0].price}</p>
            </div>
          ))}
          <button onClick={() => openTrackingModal(order)}>
            Track Order
          </button>
          {order.orders[0].transactionType === "Backlog" && (
            <button onClick={() => deleteOrder(order._id)}>
              Cancel Order
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
)}

      {(user.userPermission === "supplier" || user.userPermission === "admin") && (
        <div>
          <h2>Seller Orders</h2>
          <ul>
            {userOrders.map((order) => (
              <li key={order.orders[0].products[0].idOwner}>
                Transaction Type:{" "}
                {order.orders[0]?.transactionType === "Backlog"
                  ? "Awaiting to be shipped"
                  : order.orders[0]?.transactionType}
                <p>
                  Amount:{" "}
                  {order.orders[0]?.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
                <p>Transaction Date: {formatDate(order.orders[0].date)}</p>
                <p>{formatTime(order.orders[0].date)}</p>
                {order.orders[0].transactionType === "Backlog" && (
                  <button onClick={() => markOrderAsSent(order._id)}>
                    Send
                  </button>
                )}
                {order.orders[0].transactionType === "Sent" && (
                  <button>On the way!</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Modal
        isOpen={isTrackingModalOpen}
        onRequestClose={() => setIsTrackingModalOpen(false)}
        style={modalStyles}
      >
        <div className="modalStyles">
          <h2 style={{ marginTop: "50px" }}>Order Tracking</h2>
          <div>
            {trackingData &&
              trackingData.orders &&
              trackingData.orders.map((orderData, orderIndex) => (
                <div key={orderIndex}>
                  {orderData.products &&
                    orderData.products.map((product, productIndex) => (
                      <div key={productIndex}>
                        <p>Transaction Type: {product.quantity}</p>
                        <p>
                          Price:{" "}
                          {product.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                        <p>
                          Tracking Link:{" "}
                          <a
                            href="https://t.17track.net/en#nums=DW419756486PT"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Track Your Order
                          </a>
                        </p>
                      </div>
                    ))}
                </div>
              ))}
          </div>
          <p>
            Date:{" "}
            {trackingData &&
              trackingData.orders &&
              trackingData.orders[0] &&
              formatDate(trackingData.orders[0].date)}
          </p>
          <p>
            Time:{" "}
            {trackingData &&
              trackingData.orders &&
              trackingData.orders[0] &&
              formatTime(trackingData.orders[0].date)}
          </p>

          <div style={modalbutton}>
            <button onClick={() => setIsTrackingModalOpen(false)}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const modalbutton = {
  marginTop: "40px",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

export default OrderPage;
