import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsService from "../services/ProductsService";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import "../pages/AddProduct.css";
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

function AddProducts(props) {
  const [title, setTitle] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [imageProduct, setImageProduct] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [category, setSelectedCategory] = useState("Electronics");
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const categories = ["Electronics", "Clothing", "Furniture", "Books", "Other"]; // Define the categories array

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("imageUrl", file);

    setIsUploading(true);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        setImageProduct(response.data.fileUrl);
        setIsUploading(false);
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
        setIsUploading(false);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const userId = user._id;
    const newProduct = {
      title,
      description,
      stock,
      price,
      imageProduct,
      userId,
      category,
    };
    productsService
      .createProduct(newProduct)
      .then(() => {
        setTitle("");
        setDescription("");
        setStock(0);
        setPrice(0);
        setImageProduct("");
      })
      .catch((error) => {
        console.error("Server Error:", error.response.data);
        setErrorMessage(error.response.data.message);
      });
  }

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
            required
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
            required
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
            required
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
            required
          />
        </label>

        <label>
          Image Product
          <input
            type="file"
            onChange={(e) => handleFileUpload(e)}
            required
          />
        </label>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Submit"}
        </button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default AddProducts;
