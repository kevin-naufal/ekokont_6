import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function CreateShop() {
  const [shopName, setShopName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data Toko:', { shopName, street, city, postalCode });
    // Redirect ke halaman utama setelah submit
    window.location.href = '/';
  };

  return (
    <div className="create-shop-container" style={{ height: '100vh', display: 'flex', position: 'relative' }}>
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
      <div
        className="overlay"
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      ></div>

      <div
        className="form-container"
        style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 'auto',
        }}
      >
        <h2
          className="form-title"
          style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1F2937' }}
        >
          Halo, <span style={{ color: '#2c974b' }}>Kevin Naufal</span>, ayo isi detail tokomu!
        </h2>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Input Nama Toko */}
          <label htmlFor="shopName" style={{ display: 'block', marginBottom: '8px', color: '#374151' }}>
            Nama Toko
          </label>
          <input
            type="text"
            id="shopName"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="Masukkan nama toko"
            
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />

          {/* Input Nama Jalan */}
          <label htmlFor="street" style={{ display: 'block', marginBottom: '8px', color: '#374151' }}>
            Nama Jalan
          </label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Masukkan nama jalan"
            
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />

          {/* Input Kota */}
          <label htmlFor="city" style={{ display: 'block', marginBottom: '8px', color: '#374151' }}>
            Kota
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Masukkan kota"
            
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />

          {/* Input Kode Pos */}
          <label htmlFor="postalCode" style={{ display: 'block', marginBottom: '8px', color: '#374151' }}>
            Kode Pos
          </label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Masukkan kode pos"
            
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />

          {/* Tombol Submit */}
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
            Selesaikan
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateShop;
