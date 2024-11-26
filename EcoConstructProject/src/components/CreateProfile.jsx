import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function CreateProfile() {
  const navigate = useNavigate();
  const identifier = localStorage.getItem('signupIdentifier');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [step, setStep] = useState(1); // Step tracker
  

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!firstName || !lastName || !displayName || !gender || !phoneNumber || !birthDate) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/update-user/${identifier}`, {
        firstName,
        lastName,
        displayName,
        gender,
        phoneNumber,
        birthDate,
      });

      setSuccessMessage(`Profile updated successfully: ${response.data.message}`);
      setTimeout(() => navigate('/login'), 2000); // Redirect ke dashboard setelah 2 detik
    } catch (error) {
      setErrorMessage(`Update failed: ${error.response?.data?.message || 'An error occurred'}`);
    }
  };

  return (
    <div className="update-profile-container" style={{ height: '100vh', display: 'flex', position: 'relative' }}>
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

      <div className="update-box" style={{
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
          <h2 className="form-title" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1F2937' }}>Update Profile</h2>

          {errorMessage && (
            <div style={{ color: 'red', marginBottom: '16px' }}>
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div style={{ color: 'green', marginBottom: '16px' }}>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleUpdate}>
          {step === 1 && (
  <>
    <div className="input-group" style={{ marginBottom: '16px' }}>
      <label htmlFor="firstName" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>First Name</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter your first name"
        style={styles.input}
      />
    </div>

    <div className="input-group" style={{ marginBottom: '16px' }}>
      <label htmlFor="lastName" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Last Name</label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Enter your last name"
        style={styles.input}
      />
    </div>

    <div className="input-group" style={{ marginBottom: '16px' }}>
      <label htmlFor="displayName" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Display Name</label>
      <input
        type="text"
        id="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Enter your display name"
        style={styles.input}
      />
    </div>

    <div className="input-group" style={{ marginBottom: '16px' }}>
      <label htmlFor="gender" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Gender</label>
      <select
        id="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        style={styles.input}
      >
        <option value="" disabled>Select your gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  </>
)}

            {step === 2 && (
              <>
                <div className="input-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="phoneNumber" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    style={styles.input}
                  />
                </div>

                <div className="input-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="birthDate" style={{ display: 'block', color: '#374151', marginBottom: '8px' }}>Birth Date</label>
                  <input
                    type="date"
                    id="birthDate"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <button type="submit" style={styles.button}>Update Profile</button>
              </>
            )}
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            {step > 1 && (
              <button onClick={handleBack} style={styles.navButton}>
                Back
              </button>
            )}
            {step < 2 && (
              <button onClick={handleNext} style={styles.navButton}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    width: '100%',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  navButton: {
    padding: '10px 20px',
    backgroundColor: '#1F2937',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default CreateProfile;
