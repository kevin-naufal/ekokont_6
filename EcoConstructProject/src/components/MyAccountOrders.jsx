// MyAccountOrders.jsx
import React from 'react';
import Header from './Header'; // Adjust the path if necessary
import Footer from './Footer'; // Adjust the path if necessary
import MyAccountSidebar from './MyAccountSidebar'; // Import the sidebar component

const MyAccountOrders = () => {
  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    container: {
      backgroundColor: '#F1E4CC',
      padding: '40px 150px',
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
    ordersTable: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#f4f0eb',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
      marginTop: '20px',
    },
    tableHeader: {
      backgroundColor: '#333',
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    tableRow: {
      borderBottom: '1px solid #ccc',
    },
    tableData: {
      padding: '15px',
      textAlign: 'center',
      fontSize: '16px',
    },
  };

  const orderData = [
    { id: '#3456_768', date: 'October 17, 2023', status: 'Delivered', price: '$1234.00' },
    { id: '#3456_980', date: 'October 11, 2023', status: 'Delivered', price: '$345.00' },
    { id: '#3456_120', date: 'August 24, 2023', status: 'Delivered', price: '$2345.00' },
    { id: '#3456_030', date: 'August 12, 2023', status: 'Delivered', price: '$845.00' },
  ];

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
            <h2>Orders History</h2>
            <table style={styles.ordersTable}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.tableData}>Number ID</th>
                  <th style={styles.tableData}>Dates</th>
                  <th style={styles.tableData}>Status</th>
                  <th style={styles.tableData}>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={styles.tableData}>{order.id}</td>
                    <td style={styles.tableData}>{order.date}</td>
                    <td style={styles.tableData}>{order.status}</td>
                    <td style={styles.tableData}>{order.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccountOrders;
