import { useEffect, useState } from "react";
import api from "./api/axios";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import StaticPage from "./pages/StaticPage";
import Checkout from "./pages/Checkout";
import OrderDetail from "./pages/OrderDetail";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pages/:slug/" element={<StaticPage />} />
        <Route path="/checkout" element={<Checkout/>} /> 
        <Route path="/orders/:id" element={<OrderDetail/>} /> 
      </Routes>
    </div>
  );
}

export default App;
