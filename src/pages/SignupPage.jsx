import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignupPage.css";
import authService from "../services/AuthService";

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005'

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [userPermission, setUserPermission] = useState("user");
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setUserPermission(event.target.value);
  };

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      setErrorMessage("Password and Confirm Password do not match.");
      return;
    }

    const newUser = { email, password, name, userPermission };

    axios
      .post(`${API_URL}/auth/signup`, newUser)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  return (
    <div className="Container">
      <div className="SignupPage">
        <div className="card">
          <h1>Sign Up</h1>
  
          <form onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={email} onChange={handleEmail} />
            </div>
  
            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" value={password} onChange={handlePassword} />
            </div>
  
            <div className="form-group">
              <label>Confirm Password:</label>
              <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} />
            </div>
  
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={name} onChange={handleName} className="name" />
            </div>
            {errorMessage && (
              <div className="error-box">
                <p className="error-message">{errorMessage}</p>
              </div>
            )}
  
            <div className="radio-group">
              <p><b>Select an option:</b></p>
              <div className="radio-options-container">
                <div className="radio-option">
                  <input type="radio" id="user" name="userPermission" value="user" checked={userPermission === "user"} onChange={handleOptionChange} />
                  <label htmlFor="user">User</label>
                </div>
                <div className="radio-option">
                  <input type="radio" id="supplier" name="userPermission" value="supplier" checked={userPermission === "supplier"} onChange={handleOptionChange} />
                  <label htmlFor="supplier">Supplier</label>
                </div>
              </div>
            </div>
  
            <button className="button-signup" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    
      </div> );
}

export default SignupPage;
