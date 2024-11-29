import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateProfile from './components/CreateProfile';
import HomePage from './components/HomePage';
import MyAccountAddress from './components/MyAccountAddress';
import MyAccountDetails from './components/MyAccountDetails';
import MyAccountOrders from './components/MyAccountOrders';
import AboutUs from './components/AboutUs'; // Import the AboutUs component
import CreateShop from './components/CreateShop';
import CustomerService from './components/CustomerService'; // Import the CustomerService component
import LoginShop from './components/LoginShop';
import DashboardShop from './components/DashboardShop';
import CreateShopProfile from './components/CreateShopProfile';
import ProductDisplay from './components/ProductDisplay';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account-address" element={<MyAccountAddress />} />
        <Route path="/account-details" element={<MyAccountDetails />} />
        <Route path="/account-orders" element={<MyAccountOrders />} />
        <Route path="/about-us" element={<AboutUs />} /> {/* New route for About Us */}
        <Route path="/create-shop" element={<CreateShop />} />
        <Route path="/customer-service" element={<CustomerService />} /> {/* New route for Customer Service */}
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/login-shop" element={<LoginShop />} />
        <Route path="/dashboard-shop" element={<DashboardShop />} />
        <Route path="/create-shop-profile" element={<CreateShopProfile />} />
        <Route path="/product-display" element={<ProductDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
