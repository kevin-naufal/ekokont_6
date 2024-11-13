// MyAccount.jsx
import React from 'react';
import Header from './Header'; // Adjust the path if necessary
import Footer from './Footer'; // Adjust the path if necessary
import MyAccountSidebar from './MyAccountSidebar';

const MyAccountAddress = () => {
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
    addressContainer: {
      display: 'flex',
      gap: '20px',
    },
    addressCard: {
      backgroundColor: '#f4f0eb',
      padding: '20px',
      borderRadius: '8px',
      flex: '1',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    editLink: {
      float: 'right',
      fontSize: '14px',
      color: '#6c757d',
      cursor: 'pointer',
    },
    addressTitle: {
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    addressText: {
      color: '#333',
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
            <h2>Address</h2>
            <div style={styles.addressContainer}>
              <div style={styles.addressCard}>
                <span style={styles.editLink}>Edit</span>
                <div style={styles.addressTitle}>Billing Address</div>
                <div style={styles.addressText}>
                  Sofia Havertz <br />
                  (+1) 234 567 890 <br />
                  345 Long Island, New York, United States
                </div>
              </div>
              <div style={styles.addressCard}>
                <span style={styles.editLink}>Edit</span>
                <div style={styles.addressTitle}>Shipping Address</div>
                <div style={styles.addressText}>
                  Sofia Havertz <br />
                  (+1) 234 567 890 <br />
                  345 Long Island, New York, United States
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccountAddress;
