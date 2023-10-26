import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { useCart } from "../context/shop.context";
import "./Navbar.css";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const { cart } = useCart();
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const buttonStyle = {
    color: "#181412",
    textDecoration: "none",
    backgroundColor: "transparent",
    border: "none",
  };
  const centeredStyle = {
    display: "flex",
    alignItems: "center",
  };

  const boldText = {
    fontWeight: "bold",
  };
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark fixed-top"
      style={{ backgroundColor: "#F7ECE7", color: "#181412" }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          style={{ color: "#181412", fontWeight: 700 }}
          href="/"
        >
          Stockify
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {isLoggedIn && (
              <>
                {user.userPermission === "user" && (
                  <>
                    <Link to="/products" className="nav-link">
                      <button style={buttonStyle}>Products</button>
                    </Link>
                    <Link to="/orders" className="nav-link">
                      <button style={buttonStyle}>My orders</button>
                    </Link>
                    <Link
                      to={`/personaldetails/${user._id}`}
                      className="nav-link"
                    >
                      <button style={buttonStyle}>Personal details</button>
                    </Link>
                  </>
                )}
                {(user.userPermission === "supplier" ||
                  user.userPermission === "admin") && (
                    <>
                      <Link to="/products" className="nav-link">
                        <button style={buttonStyle}>Products</button>
                      </Link>

                      <Link to="/orders" className="nav-link">
                        <button style={buttonStyle}>Orders tracking</button>
                      </Link>
                      <Link
                        to={`/personaldetails/${user._id}`}
                        className="nav-link"
                      >
                        <button style={buttonStyle}>Company details</button>
                      </Link>
                    </>
                  )}
                {user.userPermission === "admin" && (
                  <>
                    <Link to="/sellerproducts" className="nav-link">
                      <button style={buttonStyle}>Posts management</button>
                    </Link>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
        <div className="ms-auto d-flex align-items-center">
          {!isLoggedIn && (
            <>
              <Link to="/signup" className="nav-link">
                <button className="realbutton" style={buttonStyle}>
                  Sign Up
                </button>
              </Link>
              <Link to="/login" className="nav-link">
                <button className="realbutton" style={buttonStyle}>
                  Login
                </button>
              </Link>
              <Link to="/productshome" className="nav-link">
                <button style={buttonStyle}>Products</button>
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <button
                onClick={logOutUser}
                className="nav-link"
                style={buttonStyle}
              >
                Logout
              </button>
              <button
                className="nav-link"
                style={{ fontWeight: "bold", ...buttonStyle }}
              >
                {user.name.split(" ")[0]}
              </button>
            </>
          )}
          {(!isLoggedIn || user.userPermission === "user") && (
            <Link to="/cart" className="nav-link">
              <button className="realbutton" style={buttonStyle}>
                <ShoppingCart size={32} />
                {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
