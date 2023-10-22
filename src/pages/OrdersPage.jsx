import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { AuthContext } from "../context/auth.context";
import UserOrders from "../components/UserOrder";
import SellerOrders from "../components/SellerOrder";
Modal.setAppElement("#root");

function OrderPage() {
  const { user } = useContext(AuthContext);

  const [userOrders, setUserOrders] = useState([]);
  const [sellerOrders, setSellerOrders] = useState([]);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingData, setTrackingData] = useState({});

  function openTrackingModal(order) {
    setIsTrackingModalOpen(true);
    setTrackingData(order);
  }
  useEffect(() => {
    if (user.userPermission === "user") {
      axios
        .get(`http://localhost:5005/api/orders/user/${user._id}`)
        .then((response) => {
          setUserOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user orders:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    console.log(user._id);
    if (user.userPermission === "seller") {
      axios
        .get(`http://localhost:5005/api/orders/products/${user._id}`)
        .then((response) => {
          setSellerOrders(response.data);
          const order = order.orders.products[0];
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
                Transaction Type:{" "}
                {order.orders[0]?.transactionType === "Backlog"
                  ? "Awaiting to be shipped"
                  : order.orders[0]?.transactionType}
                <p>Amount: {order.orders[0]?.amount}</p>
                <p>Transaction ID: {order.transactionId}</p>
                <button onClick={() => openTrackingModal(order)}>
                  Track Order
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Modal
        isOpen={isTrackingModalOpen}
        onRequestClose={() => setIsTrackingModalOpen(false)}
        style={modal}
      >
        <div className="modal">
          <h2>Order Tracking</h2>
          <div>
            {console.log(trackingData)}
            {trackingData &&
              trackingData.orders &&
              trackingData.orders.map((orderData, orderIndex) => (
                <div key={orderIndex}>
                  {orderData.products &&
                    orderData.products.map((product, productIndex) => (
                      <div key={productIndex}>
                        {console.log(product.price)}
                        <p>Transaction Type: {product.quantity}</p>
                        <p>Price: {product.price}</p>
                      </div>
                    ))}
                </div>
              ))}
          </div>
          <p>
            Tracking Link:{" "}
            <a
              href="https://appserver.ctt.pt/CustomerArea/PublicArea_Detail?ObjectCodeInput=DW419756486PT&SearchInput=DW419756486PT&IsFromPublicArea=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              Track Your Order
            </a>
          </p>
          <div style={modalbutton}>
            <button onClick={() => setIsTrackingModalOpen(false)}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const modal = {
  content: {
    width: "30%",
    height: "70vh",
    overflowY: "auto",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  
    alignItems: "center",
    top: "0",
    zIndex: "9999",
    borderRadius: "3%",
    top:0,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
};

const modalbutton = {
  marginTop:"40px",
  marginBottom:"10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

export default OrderPage;
