import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productsService from "../services/ProductsService";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import "../pages/ProductDetailsPage.css";
import { useCart } from "../context/shop.context";
/* 
1. Fetching the data for 1 project
2. display the data for the user */

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();

  function addCart(id, product) {
    console.log("ID:", id);

    addToCart(product);
  }
  useEffect(() => {
    productsService
      .getProduct(id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="ProductDetails">
      <div>
        {/* Before we set the state to the 1 product */}
        {product === null && <h2>Loading</h2>}

        {/* After we set the state to the 1 product */}
        {product && (
          <>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
          </>
        )}

        <Link to={"/products"}>
          <button>Go back to Product</button>
        </Link>
        {(user?.userPermission === "user") && (
              <button className="addToCartBttn" onClick={() => addCart(id, product)}>
              Add To Cart
            </button>
            )}
        
        {user.userPermission !== "user" && (
          <Link to={`/editproduct/${id}/edit`}>
            <button>Edit Product</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
