import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import AddProduct from "./AddProduct";
import productsService from "../services/ProductsService";
import SeeDetails from "./SeeDetails";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const path = useLocation();
  console.log(path);
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
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

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

  return (
    <div className="ProductsListPage">
      {products.map((oneProduct) => {
        return (
          <div className="ProductCard card" key={oneProduct._id}>
            <Link to={`/seedetails/${oneProduct._id}`}>
              <h3>{oneProduct.title}</h3>
              <h3>{oneProduct.description}</h3>
              <h3>{oneProduct.price}</h3>
              <h3>{oneProduct.stock}</h3>
              <h3>{oneProduct.imageProduct}</h3>
            </Link>
            <button
              onClick={() => {
                deleteProduct(oneProduct._id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsList;
