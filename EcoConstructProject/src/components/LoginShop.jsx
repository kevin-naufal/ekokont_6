import React, { useState } from 'react';
import axios from 'axios';

function LoginShop() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('Harap isi semua bidang.');
      return;
    }

    try {
      // Mengirimkan data login ke API
      const response = await axios.post('http://localhost:4000/login-shop', {
        username,
        password,
      });

      const { id: shopId, isLoggedIn } = response.data.shopAccount;

      // Menyimpan hasil ke localStorage
      localStorage.setItem('shopId', shopId);
      localStorage.setItem('isLoggedIn', isLoggedIn);

      // Menampilkan hasil `isLoggedIn` melalui alert
      alert(`isLoggedIn: ${isLoggedIn}`);

      if (response.status === 200) {
        alert('Login berhasil!');
        window.location.href = '/dashboard-shop'; // Ganti dengan halaman setelah login
      }
    } catch (error) {
      if (error.response) {
        // Mengambil pesan error dari respon API
        setErrorMessage(error.response.data.message);
      } else {
        // Mengambil error yang mungkin tidak terkait dengan respon API
        setErrorMessage('Terjadi kesalahan. Coba lagi nanti.');
      }
    }
  };

  return (
    <div
      className="login-shop-container"
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <img
        src="https://github.com/kevin-naufal/ekokont_6/blob/main/EcoConstructProject/Images/Login%20&%20Logout%20Background.jpg?raw=true"
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
      <div
        className="overlay"
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2, // Pastikan z-index overlay lebih besar dari background image
        }}
      ></div>

      <div
        className="form-container"
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#1F2937',
            textAlign: 'center',
          }}
        >
          Login Toko
        </h2>

        {errorMessage && (
          <div
            style={{
              color: '#B91C1C',
              backgroundColor: '#FEE2E2',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', color: '#374151' }}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />

          <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', color: '#374151' }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              padding: '12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </form>

        <p style={{ color: '#4B5563', marginTop: '24px', textAlign: 'center' }}>
          Don't have an account yet?{' '}
          <a href="/create-shop" style={{ color: '#3B82F6', textDecoration: 'underline', fontWeight: '600' }}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginShop;
