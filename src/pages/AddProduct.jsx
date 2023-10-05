import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsService from "../services/ProductsService"

function AddProducts(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const newProduct = { title, description };
    productsService.createProduct(newProduct)
    //axios.post("http://localhost:5005/api/products", newProduct)
    
    .then(() => {
      alert("Product successfully Created");
     // props.getProducts();
      console.log(props);
      setTitle("");
      setDescription("");
    });
  }
  console.log(props);
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

        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddProducts;
