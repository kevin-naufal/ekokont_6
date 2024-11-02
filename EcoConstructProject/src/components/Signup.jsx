import React from 'react';

function SignUp() {
  return (
    <div className="signup-container" style={{ height: '100vh', display: 'flex', position: 'relative' }}>
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

      {/* Sign-up container */}
      <div className="signup-form" style={{
        width: '100%',
        maxWidth: '800px', // Increased maxWidth for a wider container
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        paddingLeft: '32px', // Adjusted padding
        paddingRight: '82px', // Top/bottom padding
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto', // This pushes the container to the right
        marginRight: '0', // Optional, can be set to ensure no right margin
      }}>
        <div className="form-wrapper" style={{ width: '100%' }}>
          <h2 className="form-title" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1F2937' }}>Sign Up</h2>
          <p className="form-description" style={{ color: '#4B5563', marginBottom: '24px' }}>
            Already have an account?{' '}
            <a href="/login" className="login-link" style={{ color: '#3B82F6', textDecoration: 'underline', fontWeight: '600' }}>
              Sign In
            </a>
          </p>
          <form>
            {/* Name input */}
            <div className="input-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="name" className="input-label" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Your name</label>
              <input
                type="text"
                id="name"
                className="input-field"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Username input */}
            <div className="input-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="username" className="input-label" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Username</label>
              <input
                type="text"
                id="username"
                className="input-field"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                placeholder="Choose a username"
                required
              />
            </div>

            {/* Email input */}
            <div className="input-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="email" className="input-label" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Email address</label>
              <input
                type="email"
                id="email"
                className="input-field"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password input */}
            <div className="input-group" style={{ marginBottom: '16px', position: 'relative' }}>
              <label htmlFor="password" className="input-label" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Password</label>
              <input
                type="password"
                id="password"
                className="input-field"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                placeholder="Create a password"
                required
              />
            </div>

            {/* Agreement checkbox */}
            <div className="agreement" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <label className="agreement-label" style={{ display: 'flex', alignItems: 'center', color: '#374151' }}>
              </label>
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
