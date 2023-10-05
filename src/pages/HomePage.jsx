import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      {isLoggedIn && (
        <>
          {(user.userPermission === "supplier" || user.userPermission === "admin")  && (
            <>
              <Link to="/addproducts">
                <button>Add Products</button>
              </Link>
              <Link to="/products">
                <button>Product List</button>
              </Link>
            </>
          )}
        </>
      )}
    </nav>
  );
}

export default HomePage;
