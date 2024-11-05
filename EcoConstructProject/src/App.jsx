import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      {/* Header placed outside Routes to ensure it's visible on all pages */}
      <Header />
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      {/* Footer placed outside of Routes to always be visible at the bottom */}
      <Footer />
    </Router>
  );
}

export default App;
