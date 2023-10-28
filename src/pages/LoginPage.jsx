import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./SignupPage.css";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const userInfo = { email, password };

    axios
      .post(`${API_URL}/auth/login`, userInfo)
      .then((response) => {
        localStorage.setItem("authToken", response.data.authToken);
        authenticateUser();
        // Redirect to the "/" page after successful login
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="Container">
      <div className="TwoColumnLayout">
        {/* Left Column*/}
        <div className="StyledSection">
          <img src="123.png" alt="Random Image" />
          <h1>Welcome to Our Website</h1>
          <p>This is some styled content on the left side.</p>
        </div>
        <div className="FormSection">
          <div className="card">
            <h1>Login</h1>

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePassword}
                />
              </div>
              <button className="button-signup" type="submit">
                Login
              </button>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <p>Don't have an account yet?</p>
              <Link to={"/signup"}> Sign Up</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
