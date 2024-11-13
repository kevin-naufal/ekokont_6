// MyAccountDetails.jsx
import React from 'react';
import Header from './Header'; // Adjust the path if necessary
import Footer from './Footer'; // Adjust the path if necessary
import MyAccountSidebar from './MyAccountSidebar'; // Import the sidebar component

const MyAccountDetails = () => {
  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    container: {
      backgroundColor: '#F1E4CC',
      padding: '40px 40px',
      fontFamily: 'Arial, sans-serif',
      flex: 1,
    },
    headerText: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    accountSection: {
      display: 'flex',
      gap: '40px',
      alignItems: 'flex-start',
    },
    mainContent: {
      flex: '3',
    },
    formContainer: {
      backgroundColor: '#f4f0eb',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    saveButton: {
      backgroundColor: '#333',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '16px',
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
              <div style={styles.formGroup}>
                <label style={styles.label}>FIRST NAME *</label>
                <input type="text" style={styles.input} placeholder="First name" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>LAST NAME *</label>
                <input type="text" style={styles.input} placeholder="Last name" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>DISPLAY NAME</label>
                <input type="text" style={styles.input} placeholder="Display name" />
                <small>This will be how your name will be displayed in the account section and in reviews</small>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>EMAIL *</label>
                <input type="email" style={styles.input} placeholder="Email" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>OLD PASSWORD</label>
                <input type="password" style={styles.input} placeholder="Old password" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>NEW PASSWORD</label>
                <input type="password" style={styles.input} placeholder="New password" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>REPEAT NEW PASSWORD</label>
                <input type="password" style={styles.input} placeholder="Repeat new password" />
              </div>
              <button style={styles.saveButton}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccountDetails;
