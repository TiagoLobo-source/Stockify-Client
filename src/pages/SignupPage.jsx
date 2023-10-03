import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [userPermission, setUserPermission] = useState('user');
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setUserPermission(event.target.value);};
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const newUser = { email, password, name , userPermission };

    //send post request to /auth/signup to my server

    axios
      .post("http://localhost:5005/auth/signup", newUser)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        //const errorDescription = error.response.data.message;
        //setErrorMessage(errorDescription);
      });
  };
  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />
        <div>
      <h2>Select an option:</h2>
      <div>
        <input
          type="radio"
          id="user"
          name="userPermission"
          value="user"
          checked={userPermission === 'user'}
          onChange={handleOptionChange}
        />
        <label htmlFor="user">User</label>
      </div>
      <div>
        <input
          type="radio"
          id="supplier"
          name="userPermission"
          value="supplier"
          checked={userPermission === 'supplier'}
          onChange={handleOptionChange}
        />
        <label htmlFor="supplier">Supplier</label>
      </div>

      <p>Selected option: {userPermission}</p>
    </div>
        <button type="submit">Sign Up</button>
      </form>
      
    </div>
  );
}

export default SignupPage;
