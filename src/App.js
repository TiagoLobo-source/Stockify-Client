import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AddProduct from "./pages/AddProduct";
import ProductsList from "./pages/ProductsList";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import EditProduct from "./pages/EditProduct";
import SellerProducts from "./pages/SellerProducts";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addproducts" element={<AddProduct />} />
        <Route path='/products' element={<ProductsList/>}/>
        <Route path='/productdetailspage/:id' element={<ProductDetailsPage/>}/>
        <Route path='/editproduct/:id/edit' element={<EditProduct/>}/>
        <Route path='/sellerproducts' element={<SellerProducts/>}/>
      </Routes>
    </div>
  );
}

export default App;
