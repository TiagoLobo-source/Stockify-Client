import React, { useEffect, useState } from "react";
import productsService from "../services/ProductsService";
import Search from "../components/Search";
import { useCart } from "../context/shop.context";
import "../pages/ProductsList.css";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";


function ProductListHome() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const { cart, addToCart } = useCart();

  function getProducts() {
    productsService
      .getAllProductsHome()
      .then((response) => {
        
        const filtered = response.data.filter((oneProduct) => oneProduct.isApproved);
        setFilteredProducts(filtered);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);
const testproducts = filteredProducts.filter((products) =>
products.title.toLowerCase().includes(query.toLowerCase())
);

  // A função handleSearch deve ser definida aqui para evitar erros.
  function handleSearch(query) {
    const searchResult = filteredProducts.filter((products) =>
      products.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(searchResult);
  }

  function filterProductsByCategory() {
    if (selectedCategory === "" && query === "") {
      return filteredProducts;
    }

    return filteredProducts.filter((product) => {
      const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
      const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }

  function addCart(id, product) {
    addToCart(product);
  }
  
  return (
    <div className="ProductsListPage">
     
      
  <form className="d-flex" role="search">
            <input
              className="form-control me-3"
              type="search"
              placeholder="Search for a product"
              aria-label="Search"
              value={query }
              onChange={(e) => setQuery(e.target.value) }
            />
            <button
              className="btn btn-outline-dark"
              type="submit"
              value={query}
              onChange={(e) =>setQuery(e.target.value)}
            >
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
            <Link to={`/productdetailspage/${oneProduct._id}`}>
              <h3>{oneProduct.title}</h3>
              <h3>{oneProduct.description}</h3>
              <h3>{oneProduct.price}</h3>
              <h3>{oneProduct.stock}</h3>
              <h3>{oneProduct.imageProduct}</h3>
              <h3>{oneProduct.isPassed}</h3>
            </Link>

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
              <button
                className="addToCartBttn"
                onClick={() => addCart(oneProduct._id, oneProduct)}
              >
                Add To Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

 
}

export default ProductListHome;
