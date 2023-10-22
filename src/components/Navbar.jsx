import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { useCart } from "../context/shop.context";
import "./Navbar.css";

function Navbar() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const { cart } = useCart();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const buttonStyle = {
    color: "#181412",
    textDecoration: "none",
    backgroundColor: "transparent",
    border: "none",
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
          href="#"
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
         
          <form className="d-flex" role="search">
            <input
              className="form-control me-3"
              type="search"
              placeholder="Search for a product"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      {isLoggedIn && (
        <>
          <div className="user-info">
            <p>{user.name}</p>
            <p>{user.userPermission}</p>
          </div>

          <button
            onClick={logOutUser}
            className="nav-link"
            style={buttonStyle}
          >
            Logout
          </button>

          {user.userPermission === "user" && (
            <>
              <Link to="/products" className="nav-link">
                <button
                 style={buttonStyle}
                >
                  Products
                </button>
              </Link>
              <Link to="/orders" className="nav-link">
                <button
                  style={buttonStyle}
                >
                  My orders
                </button>
              </Link>
              <Link to={`/personaldetails/${user._id}`} className="nav-link">
                <button
                 style={buttonStyle}
                >
                  Personal details
                </button>
              </Link>
              <Link to="/cart" className="nav-link">
                <button
                  style={buttonStyle}
                >
                  <ShoppingCart size={32} />
                  {cartItemCount > 0 && (
                    <span className="cart-count">{cartItemCount}</span>
                  )}
                </button>
              </Link>
            </>
          )}
          {user.userPermission === "supplier" && (
            <>
              <Link to="/" className="nav-link">
                <button style={buttonStyle}>Products</button>
              </Link>
              <Link to="/" className="nav-link">
                <button style={buttonStyle}>My sales</button>
              </Link>
              <Link to="/orders" className="nav-link">
                <button style={buttonStyle}>Orders tracking</button>
              </Link>
              <Link to={`/personaldetails/${user._id}`} className="nav-link">
                <button style={buttonStyle}>Company details</button>
              </Link>
            </>
          )}
          {user.userPermission === "admin" && (
            <>
              <Link to="/" className="nav-link">
                <button style={buttonStyle}>Add category</button>
              </Link>

              <Link to={`/personaldetails/${user._id}`} className="nav-link">
                <button style={buttonStyle}>Seller details</button>
              </Link>
              <Link to="/sellerproducts" className="nav-link">
                <button style={buttonStyle}>Seller products</button>
              </Link>
            </>
          )}
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button className="realbutton" style={buttonStyle}>Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="realbutton" style={buttonStyle}>Login</button>
          </Link>
          <Link to="/cart">
            <button className="realbutton" style={buttonStyle}>
              <ShoppingCart size={32} />
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
