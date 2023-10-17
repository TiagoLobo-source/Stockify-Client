import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import AddProduct from "./AddProduct";
import productsService from "../services/ProductsService";
import ProductDetailsPage from "./ProductDetailsPage";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import Search from "../components/Search";
import { useCart } from '../context/shop.context';

function ProductsList() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProducts2, setFiltered2Products] = useState([]);

  const {cart, addToCart } = useCart();

  // const [filteredSearchProducts, setFilteredSearchedProducts] = useState(filteredProducts);
  const path = useLocation();


  function getProducts() {
    //fetch the data for all projects when the component first loads

    /*axios.get("http://localhost:5005/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })*/
    productsService
      .getAllProducts()
      .then((response) => {
       
        setProducts(response.data);

        if ( isLoggedIn && user.userPermission !== "user") {
          const filtered = response.data.filter(
            (oneProduct) => oneProduct.idOwner === user._id
          );
          setFilteredProducts(filtered);
        } else {
          const filtered = response.data.filter(
            (oneProduct) =>
              oneProduct.isApproved
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

  function deleteProduct(id) {
    axios
      .delete(`http://localhost:5005/api/products/${id}`)
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

 /* function addCart(id, product) {
    productsService
      .updatedStockCart(id)

      .then(() => {
        setCart([...cart, product]);
        console.log("*************")
        console.log(cart)
        console.log("*************")
      })
      .catch((err) => {
        console.log(err);
      });
  }*/

  function addCart(id, product) {
    console.log("ID:", id);
    
    addToCart(product);
  }

  return (
    <div className="ProductsListPage">
      <Search searchHandler={handleSearch}></Search>
      {filteredProducts2.map((oneProduct) => { 
        return (
          <div className="ProductCard card" key={oneProduct._id}>
          
            <Link to={`/productdetailspage/${oneProduct._id}`}>
              <h3>{oneProduct.title}</h3>
              <h3>{oneProduct.description}</h3>
              <h3>{oneProduct.price}</h3>
              <h3>{oneProduct.stock}</h3>
              <h3>{oneProduct.imageProduct}</h3>
              <h3>{oneProduct.isPassed}</h3>
            </Link>

            {user.userPermission !== "user" && (
              <button
                onClick={() => {
                  deleteProduct(oneProduct._id);
                }}
              >
                Delete
              </button>
            )}
            {user.userPermission === "user" && (
              <button
                className="addToCartBttn"
                onClick={() => addCart(oneProduct._id, oneProduct)}
              >
                Add To Cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProductsList;
