import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsService from "../services/ProductsService"
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function AddProducts(props) {
  const [title, setTitle] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [imageProduct, setImageProduct] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


 const {user} = useContext(AuthContext);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const userId=user._id
    const newProduct = { title, description,stock, price ,imageProduct, userId};
    productsService.createProduct(newProduct)
    //axios.post("http://localhost:5005/api/products", newProduct)
    
    .then(() => {
     // alert("Product successfully Created");
     // props.getProducts();
      console.log(props);
      setTitle("");
      setDescription("");
      setStock(0);
      setPrice(0);
      setImageProduct("");
    }
    )
    .catch((error) => {
        console.error("Server Error:", error.response.data);
        setErrorMessage(error.response.data.message)
      });
    
  }
  //console.log(props);
  console.log("1dsadsasdasdasdasdasdsa")
  console.log(user._id)
  console.log("1dsadsasdasdasdasdasdsa")
  return (
 
    <div className="AddProduct">
      <h3>Add Product</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>

        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>

        <label>
        Stock
          <input
            type="number"
            value={stock}
            onChange={(e) => {
                setStock(e.target.value);
            }}
          />
        </label>

        <label>
        Price
          <input
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </label>
        <label>
        Image Product
          <input
            type="file"
            value={imageProduct}
            onChange={(e) => {
                setImageProduct(e.target.value);
            }}
          />
        </label>

        <button>Submit</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default AddProducts;
