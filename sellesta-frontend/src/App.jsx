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
import Products from "./pages/Products";
import MyOrders from "./pages/MyOrder";
import AdminLayout from "./components/AdminLayout";
import AdminRoute from "./components/AdminRoute";
import AdminOrders from "./pages/admin/AdminOrder";
import AdminProducts from "./pages/admin/AdminProduct";
import AdminProductForms from "./pages/admin/AdminProductForm";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminCategoryForm from "./pages/admin/AdminCategoriesForm";
import AdminHeaderLinks from "./pages/admin/AdminHeaderLinks";
import AdminPage from "./pages/admin/AdminPage";

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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductForms />} />
          <Route path="products/:slug/edit" element={<AdminProductForms />} />
          <Route path="categories/" element={<AdminCategories />} />
          <Route path="categories/new" element={<AdminCategoryForm />} />
          <Route path="categories/:slug/edit" element={<AdminCategoryForm />} />
          <Route path="header-links" element={<AdminHeaderLinks />} />
          <Route path="pages" element={<AdminPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
