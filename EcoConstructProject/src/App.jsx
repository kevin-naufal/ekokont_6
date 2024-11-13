import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import MyAccountAddress from './components/MyAccountAddress';
import MyAccountDetails from './components/MyAccountDetails';
import MyAccountOrders from './components/MyAccountOrders';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account/address" element={<MyAccountAddress />} />
          <Route path="/account/details" element={<MyAccountDetails />} />
          <Route path="/account/orders" element={<MyAccountOrders />} />
        </Routes>
    </Router>
  );
}

export default App;
