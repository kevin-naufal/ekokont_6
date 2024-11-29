import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateShopProfile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [storeName, setStoreName] = useState(''); // Renamed to storeName
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    // Membaca data dari localStorage dan menggunakan JSON.parse
    const savedStoreData = localStorage.getItem('storeData');
    
    if (savedStoreData) {
      try {
        const { username, password } = JSON.parse(savedStoreData);
        setUsername(username);
        setPassword(password);
        
        alert(`Saved Username: ${username}`);
        alert(`Saved Password: ${password}`); // This should work if data exists
      } catch (error) {
        console.error('Error parsing storeData:', error);
        alert('Error parsing store data.');
      }
    } else {
      console.log('No storeData found in localStorage');
    }
  }, []);
  


  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      objectFit: 'cover',
      zIndex: 1,
      height: '100%',
      width: '100%',
    },
    overlay: {
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    formContainer: {
      width: '100%',
      maxWidth: '500px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      zIndex: 10,
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '24px',
      color: '#1F2937',
      textAlign: 'center',
    },
    errorMessage: {
      color: '#B91C1C',
      backgroundColor: '#FEE2E2',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '16px',
      textAlign: 'center',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#374151',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #D1D5DB',
      borderRadius: '4px',
      marginBottom: '16px',
    },
    textArea: {
      width: '100%',
      padding: '12px',
      border: '1px solid #D1D5DB',
      borderRadius: '4px',
      marginBottom: '16px',
      resize: 'none',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    buttonPrimary: {
      backgroundColor: '#007BFF',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonSecondary: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (step === 1) {
      if (!storeName  || !description || !phoneNumber) {
        setErrorMessage('Harap isi semua bidang yang wajib pada langkah 1.');
        alert(`Saved Password: ${password}`); // This should work if data exist
        return;
      }
    } else if (step === 2) {
      if (!address || !email) {
        setErrorMessage('Harap isi semua bidang yang wajib pada langkah 2.');
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:4000/add-shop-account', {
          username,
          storeName,
          email,
          phoneNumber,
          address,
          password,
        });
  
        console.log('Response:', response.data);
        alert(`Toko berhasil dibuat!`);
        navigate('/login-shop');
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Terjadi kesalahan saat membuat akun toko.');
        }
        console.error('Error:', error);
      }
    }

    if (step < 2) {
      setStep(step + 1);
    }
  };

  return (
    <div className="shop-info-container" style={styles.container}>
      <img
        src="https://github.com/kevin-naufal/TugasKelompokSBD/blob/main/pexels-pixabay-416405.jpg?raw=true"
        alt="Background"
        className="background-image"
        style={styles.backgroundImage}
      />
      <div className="overlay" style={styles.overlay}></div>
      <div className="form-container" style={styles.formContainer}>
        <h2 style={styles.heading}>Informasi Toko</h2>
        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
        <form onSubmit={handleFormSubmit}>
        {step === 1 && (
  <>
    <label htmlFor="storeName" style={styles.label}>
      Nama Toko Lengkap *
    </label>
    <input
      type="text"
      id="storeName"
      value={storeName}
      onChange={(e) => setStoreName(e.target.value)}
      style={styles.input}
      placeholder="Masukkan nama toko lengkap"
    />
    <label htmlFor="description" style={styles.label}>
      Deskripsi Toko *
    </label>
    <textarea
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      style={styles.textArea}
      placeholder="Masukkan deskripsi singkat toko"
      rows="4"
    ></textarea>
    <label htmlFor="phoneNumber" style={styles.label}>
      Nomor Telepon *
    </label>
    <input
      type="text"
      id="phoneNumber"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      style={styles.input}
      placeholder="Masukkan nomor telepon"
    />
  </>
)}
          {step === 2 && (
            <>
              <label htmlFor="address" style={styles.label}>
                Alamat Lengkap *
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={styles.input}
                placeholder="Masukkan alamat lengkap"
              />
              <label htmlFor="email" style={styles.label}>
                Email Toko *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="Masukkan email toko"
              />
            </>
          )}
          <div style={styles.buttonContainer}>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                style={styles.buttonSecondary}
              >
                Kembali
              </button>
            )}
            <button type="submit" style={styles.buttonPrimary}>
              {step === 2 ? 'Simpan Informasi' : 'Selanjutnya'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateShopProfile;
