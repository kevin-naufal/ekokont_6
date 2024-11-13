import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required');
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/signup', {
        username,
        email,
        password,
      });
      alert(`Signup successful: ${response.data.message}`);
      navigate('/login');
    } catch (error) {
      setErrorMessage(`Signup failed: ${error.response?.data?.message || 'An error occurred'}`);
    }
  };

  return (
    <div className="signup-container" style={{ height: '100vh', display: 'flex', position: 'relative' }}>
      <img
        src="https://github.com/kevin-naufal/TugasKelompokSBD/blob/main/pexels-pixabay-416405.jpg?raw=true"
        alt="Background"
        className="background-image"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          objectFit: 'cover',
          zIndex: 1,
          height: '100%',
          width: '100%',
        }}
      />
      <div className="overlay" style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', top: 0, left: 0 }}></div>

      <div className="signup-box" style={{
        width: '100%',
        maxWidth: '800px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div className="form-wrapper" style={{ width: '100%' }}>
          <h2 className="form-title" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1F2937' }}>Sign Up</h2>
          <p className="form-description" style={{ color: '#4B5563', marginBottom: '24px' }}>
            Already have an account?{' '}
            <a href="/login" className="login-link" style={{ color: '#3B82F6', textDecoration: 'underline', fontWeight: '600' }}>
              Sign In
            </a>
          </p>

          {errorMessage && (
            <div style={{ color: 'red', marginBottom: '16px' }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div className="input-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="username" className="input-label" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>

            <div className="input-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="email" className="input-label" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>

            {/* Password input with toggle visibility */}
            <div className="input-group" style={{ marginBottom: '16px', position: 'relative' }}>
              <label htmlFor="password" className="input-label" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {/* Confirm password input with toggle visibility */}
            <div className="input-group" style={{ marginBottom: '16px', position: 'relative' }}>
              <label htmlFor="confirmPassword" className="input-label" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button
              type="submit"
              className="submit-button"
              style={{
                width: '100%',
                backgroundColor: '#000000',
                color: '#FFFFFF',
                padding: '12px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1F2937')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
