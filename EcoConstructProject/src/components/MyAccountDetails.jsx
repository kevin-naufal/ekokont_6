import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import Header from './Header'; // Adjust the path if necessary
import Footer from './Footer'; // Adjust the path if necessary
import MyAccountSidebar from './MyAccountSidebar'; // Import the sidebar component

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
  // Retrieve login data from local storage
  const storedLoginData = JSON.parse(localStorage.getItem("loginData"));
  const identifier = storedLoginData?.user?.username || ""; // Use username as the identifier

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/get-user/${identifier}`
        );

        // Update the state with user details
        if (response.status === 200) {
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        alert("Failed to fetch user details.");
      } finally {
      }
    };

    fetchUserDetails();
  }, [identifier]);

  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f4f0eb', // Set background color for the entire page
    },
    container: {
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
      backgroundColor: '#f4f0eb', // Set background color for the main content as well
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
          {/* Sidebar */}
          <MyAccountSidebar />

          {/* Main Content */}
          <div style={styles.mainContent}>
            <h2>Account Details</h2>
            <div style={styles.formContainer}>
              <div style={styles.card}>
                <label style={styles.label}>FIRST NAME</label>
                <div style={styles.cardContent}>{userDetails.firstName || <span style={styles.emptyState}>N/A</span>}</div>
              </div>

              <div style={styles.card}>
                <label style={styles.label}>LAST NAME</label>
                <div style={styles.cardContent}>{userDetails.lastName || <span style={styles.emptyState}>N/A</span>}</div>
              </div>

              <div style={styles.card}>
                <label style={styles.label}>DISPLAY NAME</label>
                <div style={styles.cardContent}>{userDetails.displayName || <span style={styles.emptyState}>N/A</span>}</div>
              </div>

              <div style={styles.card}>
                <label style={styles.label}>EMAIL</label>
                <div style={styles.cardContent}>{userDetails.email || <span style={styles.emptyState}>N/A</span>}</div>
              </div>

              <div style={styles.card}>
                <label style={styles.label}>GENDER</label>
                <div style={styles.cardContent}>{userDetails.gender || <span style={styles.emptyState}>N/A</span>}</div>
              </div>

              <div style={styles.card}>
                <label style={styles.label}>PHONE NUMBER</label>
                <div style={styles.cardContent}>{userDetails.phoneNumber || <span style={styles.emptyState}>N/A</span>}</div>
              </div>

              <div style={styles.card}>
                <label style={styles.label}>BIRTH DATE</label>
                <div style={styles.cardContent}>{userDetails.birthDate || <span style={styles.emptyState}>N/A</span>}</div>
              </div>

              <div style={styles.changePasswordLink}>
                <span onClick={() => setShowPasswordOverlay(true)}>
                  Change Password?
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
