import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    setIdentifierError('');
    setPasswordError('');
  
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
        identifier,
        password,
      });
      
      alert(`Login successful: ${response.data.message}`);

      const checkLoginResponse = await axios.get(`http://localhost:4000/check-login/${identifier}`);
      const { message, user } = checkLoginResponse.data;

      // Save the content to localStorage
      const loginData = {
        message,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          loggedIn: user.loggedIn,
        },
      };

      localStorage.setItem('loginData', JSON.stringify(loginData));

      alert(loginData.user.username);
      alert(loginData.user.email);
      alert(loginData.user.loggedIn);

      navigate('/product-display');
    } catch (error) {
      if (error.response?.data?.message) {
        setIdentifierError(error.response.data.message);
        setPasswordError('');
      } else {
        alert(`Login failed: ${error.response?.data?.message || 'An error occurred'}`);
      }
    }
  };
  

  return (
    <div className="login-container" style={{ height: '100vh', display: 'flex', position: 'relative' }}>
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

          {identifierError && <p style={{ color: 'red', fontSize: '16px', marginBottom: '16px' }}>{identifierError}</p>}
          {passwordError && <p style={{ color: 'red', fontSize: '12px', marginBottom: '16px' }}>{passwordError}</p>}

          <form onSubmit={handleLogin}>
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

            <div className="input-group" style={{ marginBottom: '16px', position: 'relative' }}>
              <label htmlFor="password" className="input-label" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Password</label>
              <input
                type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '70%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#374151',
                  fontSize: '18px', // Adjust the size of the icon
                }}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>

            <div className="remember-password" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="remember-me-label" style={{ display: 'flex', alignItems: 'center', color: '#374151' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                Remember me
              </label>
              <a href="/forgot-password" className="forgot-password-link" style={{ color: '#3B82F6', textDecoration: 'underline' }}>
                Forgot password?
              </a>
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
