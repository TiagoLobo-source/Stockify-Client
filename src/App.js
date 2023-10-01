import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";   
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
   
    <div className="App">
      
     <Navbar />
     <Routes>      
     
     <Route path="/" element={<HomePage></HomePage>}/>      
      <Route path="/signup" element={<SignupPage/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
