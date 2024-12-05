import React, { useState } from 'react';

function CreateShop() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleCreateShop = (e) => {
    e.preventDefault();
    setErrorMessage('');
  
    // Validasi input
    if (!username || !password || !confirmPassword) {
      setErrorMessage('Harap isi semua bidang.');
      return;
    }
  
    if (username.length < 3) {
      setErrorMessage('Username harus memiliki minimal 3 karakter.');
      return;
    }
  
    const usernameRegex = /^\w+$/;
    if (!usernameRegex.test(username)) {
      setErrorMessage('Username hanya boleh mengandung huruf, angka, dan garis bawah.');
      return;
    }
  
    if (password !== confirmPassword) {
      setErrorMessage('Password dan konfirmasi password tidak cocok.');
      return;
    }
  
    if (password.length < 6) {
      setErrorMessage('Password harus terdiri dari minimal 6 karakter.');
      return;
    }
  
    // Simpan data ke localStorage (simulasi)
    localStorage.setItem('storeData', JSON.stringify({ username, password }));
  
    const storedData = JSON.parse(localStorage.getItem('storeData'));
    if (storedData) {
      alert(`Toko berhasil dibuat dengan data berikut:\n\nUsername: ${storedData.username}\nPassword: ${storedData.password}`);
    }
  
    console.log('Data toko:', { username, password });
  
    // Arahkan ke halaman berikutnya
    window.location.href = 'create-shop-profile/';
  };  
  
  
  return (
    <div
      className="create-shop-container"
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
          zIndex: 2,
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
          Buat Toko Baru
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

        <form onSubmit={handleCreateShop}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', color: '#374151' }}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username toko"
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

          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '8px', color: '#374151' }}>
            Konfirmasi Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Masukkan konfirmasi password"
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
            Buat Toko
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateShop;
