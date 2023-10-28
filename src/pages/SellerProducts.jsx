import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import productsService from "../services/ProductsService";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import Search from "../components/Search";
import "../pages/ProductsList.css";


const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

function SellerProducts() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProducts2, setFiltered2Products] = useState([]);
  const path = useLocation();
  const [isChecked, setIsChecked] = useState(false);


  function limitDescription(description, maxLength) {
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.slice(0, maxLength) + "...";
    }
  }

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
      .put(`${API_URL}/api/productsapproval/${id}`)
      .then(() => {
        getProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function refuseProduct(id) {
    axios
      .put(`${API_URL}/api/productsrefusal/${id}`)
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
    <div className="ProductsListPage">
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
          <div className={`small-card ${oneProduct.isPassed}`}>
            {oneProduct.isPassed}
          </div>
      
          <div className="title-container">
            <Link to={`/productdetailspage/${oneProduct._id}`}>
              <h3>{oneProduct.title}</h3>
            </Link>
          </div>
          <p>{limitDescription(oneProduct.description, 30)}</p>
          <h3>
            {oneProduct.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h3>
          <img
            src={oneProduct.imageProduct}
            className="product-image"
            alt="Product"
          />
          <br />
          {user?.userPermission !== "user" && isLoggedIn && (
            <h3>{oneProduct.isPassed}</h3>
          )}
      
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
