import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div>
        <p>
          <button>Home</button>
          <button>Log In</button>
          <Link to="/signup"> <button>Sign Up</button> </Link>
           {/* <button>Log out</button> */} 
        </p>
      </div>
    </nav>
  );
}

export default Navbar;
