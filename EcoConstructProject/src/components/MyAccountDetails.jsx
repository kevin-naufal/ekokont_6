import React, { useState } from 'react';
import Header from './Header'; // Adjust the path if necessary
import Footer from './Footer'; // Adjust the path if necessary
import MyAccountSidebar from './MyAccountSidebar'; // Import the sidebar component

const MyAccountDetails = () => {
  const [showPasswordOverlay, setShowPasswordOverlay] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');

   // Retrieve login data from local storage
   const storedLoginData = JSON.parse(localStorage.getItem("loginData"));
   const identifier = storedLoginData?.user?.username || ""; // Use username as the identifier

 
   const handleSave = async () => {
     // Ensure all fields are filled
     if (!firstName || !lastName || !displayName) {
       alert("All fields are required.");
       return;
     }
 
     try {
       // Make a PUT request to update the user
       const response = await axios.put(
         `http://localhost:4000/update-user/${identifier}`,
         {
           firstName,
           lastName,
           displayName,
         }
       );
 
       // Handle success response
       if (response.status === 200) {
         alert("User details updated successfully!");
         console.log("Updated user:", response.data.user);
       }
     } catch (error) {
       // Handle error response
       console.error("Error updating user:", error);
       alert("Failed to update user details.");
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
      padding: '40px 150px',
      fontFamily: 'Arial, sans-serif',
      flex: 1,
      position: 'relative', // Ensure the overlay positions correctly over this container
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
    changePasswordLink: {
      color: '#007bff',
      cursor: 'pointer',
      textDecoration: 'underline',
      marginLeft: '15px',
      display: 'inline-block',
    },
    overlayWrapper: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '1000',
      backdropFilter: 'blur(5px)', // Apply blur to the background
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
    },
    overlayBox: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
      width: '400px',
      zIndex: '1001', // Ensure the box is above the blur effect
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '15px',
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
                <input
                  type="text"
                  style={styles.input}
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>LAST NAME *</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>DISPLAY NAME</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <small>This will be how your name will be displayed in the account section and in reviews</small>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>EMAIL *</label>
                <input
                   type="email"
                   style={styles.input}
                   placeholder="Email"
                   disabled // Disable the input field
                />
              </div>
              <div style={styles.buttonContainer}>
                <button style={styles.saveButton} onClick={handleSave}>
                  Save Changes
                </button>
                <span
                  style={styles.changePasswordLink}
                  onClick={() => setShowPasswordOverlay(true)}
                >
                  Change Password?
                </span>
              </div>
              {showPasswordOverlay && (
                <div style={styles.overlayWrapper} onClick={() => setShowPasswordOverlay(false)}>
                  <div
                    style={styles.overlayBox}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the box
                  >
                    <h3>Change Password</h3>
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
                    <button style={styles.saveButton} onClick={() => setShowPasswordOverlay(false)}>
                      Save changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccountDetails;
