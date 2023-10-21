import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

import productsService from "../services/ProductsService";

import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import Search from "../components/Search";

function SellerProducts() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProducts2, setFiltered2Products] = useState([]);
  // const [filteredSearchProducts, setFilteredSearchedProducts] = useState(filteredProducts);
  const path = useLocation();

  const [isChecked, setIsChecked] = useState(false);
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
      <Search searchHandler={handleSearch}></Search>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Awaiting Approval
      </label>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "10vh",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date Created</th>
              <th>Price</th>
              <th>Product Image</th>

              {user.userPermission !== "user" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredProducts2
              .slice()
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((oneProduct) => (
                <tr key={oneProduct._id}>
                  <td>{oneProduct.title}</td>
                  <td>
                    {new Date(oneProduct.createdAt).toLocaleDateString()}{" "}
                    {new Date(oneProduct.createdAt).toLocaleTimeString()}
                  </td>
                  <td>{oneProduct.price}</td>
                  <td>{oneProduct.imageProduct}</td>
                  {/*<td>{oneProduct.isApproved.toString()}</td>*/}
                  {user.userPermission !== "user" && (
                    <td>
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
                            style={{
                              width:"43%",
                              background:
                                oneProduct.isPassed === "refused" ? "red" : "",
                            }}
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
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SellerProducts;
