// import logo from './logo.svg';
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/Pages/SignUp";
import PrivateComponent from "./components/Pages/PrivateComponent";
import Login from "./components/Pages/Login";
import AddProduct from "./components/Pages/AddProduct";
import ProductList from "./components/Pages/ProductList";
import UpdateProduct from "./components/Pages/UpdateProduct";
import Product from "./components/Pages/Product";
import Cart from "./components/Pages/Cart";

function App() {
  return (
    <div className="App">
      {/* <h1>E-Dashboard</h1> */}
      <Navbar />

      <Routes>
        <Route element={<PrivateComponent />}> 
          <Route path="/" element={<ProductList/>} />
          <Route path="/:id" element={<Product/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/update/:id" element={<UpdateProduct/>} />
          <Route path='/cart' element={<Cart/>}/>
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path='login'  element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
