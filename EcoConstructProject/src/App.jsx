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
import MarketPlace from './components/MarketPlace';
import Payment from "./components/Payment";
import Cart from "./components/Cart";
import BuyOut from './components/BuyOut';
import SuccessfulPayment from './components/SuccessfulPayment';
import SingleProductPage from './components/SingleProductPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
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
        <Route path="/" element={<ProductDisplay />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buyout" element={<BuyOut />} />
        <Route path="/successful-payment" element={<SuccessfulPayment />} />
        <Route path="/product-display/:id" element={<SingleProductPage />} /> {/* Dynamic route */}
      </Routes>
    </Router>
  );
}

export default App;