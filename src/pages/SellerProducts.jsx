import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import productsService from "../services/ProductsService";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import Search from "../components/Search";
import "./SellerProducts.css";

function SellerProducts() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProducts2, setFiltered2Products] = useState([]);
  const path = useLocation();
  const [isChecked, setIsChecked] = useState(false);

  function getProducts() {
    // Fetch the data for all projects when the component first loads
    productsService
      .getAllProducts()
      .then((response) => {
        setProducts(response.data);

        if (user.userPermission === "admin" && isChecked) {
          const filtered = response.data.filter(
            (oneProduct) => !oneProduct.isApproved
          );
          setFilteredProducts(filtered);
        } else if (user.userPermission === "admin" && !isChecked) {
          const filtered = response.data.filter(
            (oneProduct) => oneProduct.isApproved
          );
          setFilteredProducts(filtered);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  useEffect(() => {
    getProducts();
  }, [user]);

  useEffect(() => {
    setFiltered2Products(filteredProducts);
  }, [filteredProducts]);

  useEffect(() => {
    const filtered = products.filter((oneProduct) =>
      isChecked ? !oneProduct.isApproved : oneProduct.isApproved
    );
    setFilteredProducts(filtered);
  }, [isChecked, products]);

  function approveProduct(id) {
    axios
      .put(`http://localhost:5005/api/productsapproval/${id}`)
      .then(() => {
        getProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function refuseProduct(id) {
    axios
      .put(`http://localhost:5005/api/productsrefusal/${id}`)
      .then(() => {
        getProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSearch(query) {
    const searchResult = filteredProducts.filter((products) =>
      products.title.toLowerCase().includes(query.toLowerCase())
    );

    setFiltered2Products(searchResult);
  }

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  return (
    <div className="SellerProductsPage">
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Awaiting Approval
      </label>

      <div className="product-cards">
        {filteredProducts2.map((oneProduct) => (
          <div className="product-card" key={oneProduct._id}>
            <h3>{oneProduct.title}</h3>
            <h3>{oneProduct.description}</h3>
            <p>
              Date Created:{" "}
              {new Date(oneProduct.createdAt).toLocaleDateString()}{" "}
              {new Date(oneProduct.createdAt).toLocaleTimeString()}
            </p>
            <p>Price:  {oneProduct.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}</p> 
            <img
              src={oneProduct.imageProduct}
              className="product-image"
              alt="Product"
            />
            {user.userPermission !== "user" && (
              <div className="product-actions">
                {!oneProduct.isApproved ? (
                  <div>
                    <button
                      onClick={() => {
                        approveProduct(oneProduct._id);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className={
                        oneProduct.isPassed === "refused" ? "rejected" : ""
                      }
                      onClick={() => {
                        refuseProduct(oneProduct._id);
                      }}
                    >
                      {oneProduct.isPassed === "refused" ? "Rejected" : "Reject"}
                    </button>
                  </div>
                ) : (
                  <span>Already Approved</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerProducts;
