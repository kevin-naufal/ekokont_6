import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function Login() {
  const [identifier, setIdentifier] = useState(''); // Used for either username or email
  const [password, setPassword] = useState('');
  const [identifierError, setIdentifierError] = useState(''); // Error message for identifier
  const [passwordError, setPasswordError] = useState(''); // Error message for password
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error messages
    setIdentifierError('');
    setPasswordError('');

    // Validate input
    if (!identifier) {
      setIdentifierError('Username or Email is required.');
      return;
    }
    if (!password) {
      setPasswordError('Password is required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/login', {
        identifier, // Sends either username or email
        password,
      });
      alert(`Login successful: ${response.data.message}`);
      // Redirect to /HomePage after successful login
      navigate('/');
    } catch (error) {
      // Check if the error is due to incorrect credentials
      if (error.response?.data?.message) {
        setIdentifierError(error.response.data.message); // Display error message for identifier
        setPasswordError(''); // Optionally clear password error
      } else {
        alert(`Login failed: ${error.response?.data?.message || 'An error occurred'}`);
      }
    }
  };

  return (
    <div className="login-container" style={{ height: '100vh', display: 'flex', position: 'relative' }}>
      {/* Background image */}
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
      <div className="overlay" style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', top: 0, left: 0 }}></div> {/* Overlay */}

      {/* Sign-in container */}
      <div className="signin-container" style={{
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
          <h2 className="form-title" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1F2937' }}>Sign In</h2>
          <p className="form-description" style={{ color: '#4B5563', marginBottom: '24px' }}>
            Don't have an account yet?{' '}
            <a href="/signup" className="signup-link" style={{ color: '#3B82F6', textDecoration: 'underline', fontWeight: '600' }}>
              Sign Up
            </a>
          </p>

          {identifierError && <p style={{ color: 'red', fontSize: '16px', marginBottom: '16px' }}>{identifierError}</p>} {/* Error message */}
          {passwordError && <p style={{ color: 'red', fontSize: '12px', marginBottom: '16px' }}>{passwordError}</p>} {/* Error message */}

          <form onSubmit={handleLogin}>
            {/* Username input */}
            <div className="input-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="identifier" className="input-label" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Username or Email</label>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your username or email"
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
            {/* Password input */}
            <div className="input-group" style={{ marginBottom: '16px', position: 'relative' }}>
              <label htmlFor="password" className="input-label" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Password</label>
              <input
                type="password"
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
                  transition: 'border-color 0.2s',
                }}
              />
            </div>

            {/* Remember me and forgot password */}
            <div className="remember-password" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="remember-me-label" style={{ display: 'flex', alignItems: 'center', color: '#374151' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                Remember me
              </label>
              <a href="/forgot-password" className="forgot-password-link" style={{ color: '#3B82F6', textDecoration: 'underline' }}>
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
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
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#1F2937'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#000000'}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
