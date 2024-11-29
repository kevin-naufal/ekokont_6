import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header'; 
import Footer from './Footer'; 
import MyAccountSidebar from './MyAccountSidebar'; 

const MyAccountDetails = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    gender: '',
    phoneNumber: null,
    birthDate: null,
  });

  const [editable, setEditable] = useState(false); // State to toggle edit mode

  // Retrieve login data from local storage
  const storedLoginData = JSON.parse(localStorage.getItem("loginData"));
  const identifier = storedLoginData?.user?.username || ""; // Use username as the identifier

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/get-user/${identifier}`
        );
        if (response.status === 200) {
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        alert("Failed to fetch user details.");
      }
    };

    fetchUserDetails();
  }, [identifier]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/update-user/${identifier}`,
        userDetails
      );
      if (response.status === 200) {
        alert("User details updated successfully");
        setEditable(false); // Disable editing after saving
      }
    } catch (error) {
      console.error("Error saving user details:", error);
      alert("Failed to save user details.");
    }
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    container: {
      backgroundColor: '#F1E4CC',
      padding: '50px 150px',
      fontFamily: 'Arial, sans-serif',
      flex: 1,
    },
    headerText: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#2C3E50',
    },
    accountSection: {
      display: 'flex',
      gap: '40px',
      alignItems: 'flex-start',
      marginTop: '20px',
    },
    mainContent: {
      flex: '3',
      backgroundColor: '#f4f0eb',
      borderRadius: '8px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      padding: '30px',
      minWidth: '600px',
    },
    formContainer: {
      padding: '30px',
      display: 'grid',
      gap: '20px',
      gridTemplateColumns: '1fr 1fr',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#34495E',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
    },
    saveButton: {
      backgroundColor: '#34495E',
      color: '#fff',
      padding: '12px 25px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
    },
    saveButtonHover: {
      backgroundColor: '#2C3E50',
    },
    changePasswordLink: {
      color: '#2980B9',
      cursor: 'pointer',
      textDecoration: 'underline',
      display: 'inline-block',
      marginTop: '15px',
    },
    card: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    cardContent: {
      fontSize: '16px',
      color: '#34495E',
    },
    emptyState: {
      color: '#bdc3c7',
      fontStyle: 'italic',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.headerText}>My Account</h1>
        <div style={styles.accountSection}>
          <MyAccountSidebar />

          <div style={styles.mainContent}>
            <h2>Account Details</h2>
            <div style={styles.formContainer}>
              <div style={styles.card}>
                <label style={styles.label}>FIRST NAME</label>
                {editable ? (
                  <input
                    type="text"
                    name="firstName"
                    value={userDetails.firstName}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  <div style={styles.cardContent}>
                    {userDetails.firstName || <span style={styles.emptyState}>N/A</span>}
                  </div>
                )}
              </div>

              <div style={styles.card}>
                <label style={styles.label}>LAST NAME</label>
                {editable ? (
                  <input
                    type="text"
                    name="lastName"
                    value={userDetails.lastName}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  <div style={styles.cardContent}>
                    {userDetails.lastName || <span style={styles.emptyState}>N/A</span>}
                  </div>
                )}
              </div>

              <div style={styles.card}>
                <label style={styles.label}>DISPLAY NAME</label>
                {editable ? (
                  <input
                    type="text"
                    name="displayName"
                    value={userDetails.displayName}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  <div style={styles.cardContent}>
                    {userDetails.displayName || <span style={styles.emptyState}>N/A</span>}
                  </div>
                )}
              </div>

              <div style={styles.card}>
                <label style={styles.label}>EMAIL</label>
                {editable ? (
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  <div style={styles.cardContent}>
                    {userDetails.email || <span style={styles.emptyState}>N/A</span>}
                  </div>
                )}
              </div>

              <div style={styles.card}>
                <label style={styles.label}>GENDER</label>
                {editable ? (
                  <input
                    type="text"
                    name="gender"
                    value={userDetails.gender}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  <div style={styles.cardContent}>
                    {userDetails.gender || <span style={styles.emptyState}>N/A</span>}
                  </div>
                )}
              </div>

              <div style={styles.card}>
                <label style={styles.label}>PHONE NUMBER</label>
                {editable ? (
                  <input
                    type="text"
                    name="phoneNumber"
                    value={userDetails.phoneNumber || ''}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  <div style={styles.cardContent}>
                    {userDetails.phoneNumber || <span style={styles.emptyState}>N/A</span>}
                  </div>
                )}
              </div>

              <div style={styles.card}>
                <label style={styles.label}>BIRTH DATE</label>
                {editable ? (
                  <input
                    type="date"
                    name="birthDate"
                    value={userDetails.birthDate || ''}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  <div style={styles.cardContent}>
                    {userDetails.birthDate || <span style={styles.emptyState}>N/A</span>}
                  </div>
                )}
              </div>

              {editable && (
                <button
                  style={styles.saveButton}
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              )}

              <div style={styles.changePasswordLink}>
                <span onClick={() => setEditable((prev) => !prev)}>
                  {editable ? "Cancel Edit" : "Edit Details"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccountDetails;
