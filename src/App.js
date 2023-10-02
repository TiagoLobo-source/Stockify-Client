import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";   
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
   
    <div className="App">
      
     <Navbar />
     <Routes>      
     
     <Route path="/" element={<HomePage></HomePage>}/>      
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
