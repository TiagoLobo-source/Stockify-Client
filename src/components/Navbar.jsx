
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { useCart } from '../context/shop.context';
import "./Navbar.css";

function Navbar() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const { cart } = useCart();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="links">
        <Link to="/" className="nav-link">
          <button>Home</button>
        </Link>

        {isLoggedIn && (
          <>
            <div className="user-info">
              <p>{user.name}</p>
              <p>{user.userPermission}</p>
            </div>
            <button onClick={logOutUser} className="nav-button">
              Logout
            </button>

            {user.userPermission === "user" && (
              <>
                <Link to="/products" className="nav-link">
                  <button>Products</button>
                </Link>
                <Link to="/orders" className="nav-link">
                  <button>My orders</button>
                </Link>
                <Link to={`/personaldetails/${user._id}`} className="nav-link">
                  <button>Personal details</button>
                </Link>
                <Link to="/cart" className="nav-link">
                  <button>
                    <ShoppingCart size={32} />
                    {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                  </button>
                </Link>
              </>
            )}
            {user.userPermission === "supplier" && (
              <>
                <Link to="/" className="nav-link">
                  <button>Products</button>
                </Link>
                <Link to="/" className="nav-link">
                  <button>My sales</button>
                </Link>
                <Link to="/" className="nav-link">
                  <button>Sales tracking</button>
                </Link>
                <Link to={`/personaldetails/${user._id}`}  className="nav-link">
                  <button>Company details</button>
                </Link>
              </>
            )}
            {user.userPermission === "admin" && (
              <>
                <Link to="/" className="nav-link">
                  <button>Add category</button>
                </Link>
                <Link to="/" className="nav-link">
                  <button>Add permissions</button>
                </Link>
                <Link to={`/personaldetails/${user._id}`} className="nav-link">
                  <button>Seller details</button>
                </Link>
                <Link to="/sellerproducts" className="nav-link">
                  <button>Seller products</button>
                </Link>
              </>
            )}
          </>
        )}

        {!isLoggedIn && (
          <>
             <Link to="/signup">
    <button className="realbutton">Sign Up</button>
  </Link>
  <Link to="/login">
    <button className="realbutton">Login</button>
  </Link>
  <Link to="/cart">
    <button className="realbutton">
      <ShoppingCart size={32} />
      {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
    </button>
  </Link>
</>
         
        )}
      </div>
    </nav>
  );
}

export default Navbar;