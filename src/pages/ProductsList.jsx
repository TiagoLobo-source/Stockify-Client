import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import productsService from "../services/ProductsService";
import ProductDetailsPage from "./ProductDetailsPage";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import Search from "../components/Search";
import { useCart } from "../context/shop.context";
import "../pages/ProductsList.css";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";


function ProductsList() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProducts2, setFiltered2Products] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, addToCart } = useCart();
  const path = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");


  function limitDescription(description, maxLength) {
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.slice(0, maxLength) + "...";
    }
  }

  function getProducts() {
    productsService
      .getAllProducts()
      .then((response) => {
        setProducts(response.data);

        if (isLoggedIn && user.userPermission !== "user") {
          const filtered = response.data.filter(
            (oneProduct) => oneProduct.idOwner === user._id
          );
          setFilteredProducts(filtered);
        } else {
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
    if (searchQuery) {
      const searchResult = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFiltered2Products(searchResult);
    } else {
      setFiltered2Products(filteredProducts);
    }
  }, [searchQuery, filteredProducts]);

  function deleteProduct(id) {
    axios
      .delete(`${API_URL}/api/products/${id}`)
      .then(() => {
        getProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addCart(id, product) {
    addToCart(product);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearchQuery(query);
  }

  function filterProductsByCategory() {
    if (selectedCategory === "") {
      return filteredProducts2;
    }
    return filteredProducts2.filter(
      (product) => product.category === selectedCategory
    );
  }

  return (
    <div className="ProductsListPage">
      {isLoggedIn && (
        <nav>
          {(user.userPermission === "supplier" ||
            user.userPermission === "admin") && (
            <>
              <Link to="/addproducts">
                <button>Add Products</button>
              </Link>
            </>
          )}
        </nav>
      )}
      <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
        <input
          className="form-control me-3"
          type="search"
          placeholder="Search for a product"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline-dark" type="submit">
          Search
        </button>
      </form>

      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        <option value="">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Furniture">Furniture</option>
        <option value="Books">Books</option>
        <option value="Other">Other</option>
      </select>
      <div className="product-cards">
      {filterProductsByCategory().map((oneProduct) => (
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

    {user?.userPermission !== "user" && isLoggedIn && (
      <button
        onClick={() => {
          deleteProduct(oneProduct._id);
        }}
      >
        Delete
      </button>
    )}

    {(user?.userPermission === "user" || !isLoggedIn) && (
      <div className="button-row">
        <Link to={`/productdetailspage/${oneProduct._id}`}>
          <button className="addToCartBttn seeDetailBttn" style={{marginBottom:"10px"}}>See Details</button>
        </Link>
        <button
          className="addToCartBttn"
          onClick={() => addCart(oneProduct._id, oneProduct)}
        >
          Add To Cart
        </button>
      </div>
    )}
  </div>
))}
      </div>
    </div>
  );
}

export default ProductsList;
