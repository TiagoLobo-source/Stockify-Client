import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ShoppingCart } from "phosphor-react";
import { useCart } from '../context/shop.context';
import "./Navbar.css";

function Navbar() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const { cart } = useCart();

  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav>
      <div className="navbar">
        <div className="links">
          <Link to="/">
            <button>Home</button>
          </Link>

          {isLoggedIn && (
            <>
            
              <p>{user.name}</p>
              <p>{user.userPermission}</p>
              <button onClick={logOutUser}>Logout</button>

              {user.userPermission === "user" && (
                <>
                  <Link to="/products">
                    <button>Products</button>
                  </Link>
                  <Link to="/">
                    <button>My orders</button>
                  </Link>
                  <Link to="/">
                    <button>Personal details</button>
                  </Link>
                  <Link to="/cart">
                    <button>
                      <ShoppingCart size={32} />
                      {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                    </button>
                  </Link>
                </>
              )}
             {user.userPermission === "supplier" && (
  <>
    <Link to="/">
      <button>Products</button>
    </Link>
    <Link to="/">
      <button>My sales</button>
    </Link>
    <Link to="/">
      <button>Sales tracking</button>
    </Link>
    <Link to="/">
      <button>Company details</button>
    </Link>
  </>
)}

{user.userPermission === "admin" && (
  <>
    <Link to="/">
      <button>Add category</button>
    </Link>
    <Link to="/">
      <button>Add permissions</button>
    </Link>
    <Link to="/">
      <button>Seller details</button>
    </Link>
    <Link to="/sellerproducts">
      <button>Seller products</button>
    </Link>
  </>
)}

            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/cart">
                    <button>
                      <ShoppingCart size={32} />
                      {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                    </button>
                  </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
