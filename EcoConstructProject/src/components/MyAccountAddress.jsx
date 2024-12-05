import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import MyAccountSidebar from './MyAccountSidebar';

const MyAccountAddress = () => {
  const [billingAddress, setBillingAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [additionalAddresses, setAdditionalAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    title: '',
    name: '',
    telephoneNumber: '',
    address: '',
  });
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const loginData = JSON.parse(localStorage.getItem('loginData'));
  const identifier = loginData.user.username;


  const styles = {
    pageContainer: { display: 'flex', flexDirection: 'column', minHeight: '100vh' },
    container: { backgroundColor: '#F1E4CC', padding: '40px 150px', fontFamily: 'Arial, sans-serif', flex: 1 },
    headerText: { fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' },
    accountSection: { display: 'flex', gap: '40px', alignItems: 'flex-start' },
    mainContent: { flex: '3' },
    gridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
    addNewAddress: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      color: '#34A951',
      borderRadius: '8px',
      height: '145px',
      width: '100%',
      cursor: 'pointer',
      fontSize: '36px',
      fontWeight: 'bold',
      textAlign: 'center',
      border: '4px solid #34A951',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent dark background
      backdropFilter: 'blur(5px)',  // Apply blur to background
      zIndex: 999,  // Ensure this is below the modal
    },
    modalContainer: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,  // Ensure the modal stays on top of the overlay
      backgroundColor: 'white',  // Optional: modal background color
      padding: '20px',  // Optional: modal padding
      borderRadius: '8px',  // Optional: border radius for rounded corners
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // Optional: some shadow for the modal
    }
  };
  
  

  useEffect(() => {
    if (!identifier) {
      alert('No identifier found. Please log in or sign up.');
      return;
    }
  
    axios
      .get(`http://localhost:4000/addresses/${identifier}`)
      .then((response) => {
        const { addresses } = response.data;
        const billingAddr = addresses.find((addr) => addr.title === 'Billing');
        const shippingAddr = addresses.find((addr) => addr.title === 'Shipping');
        setBillingAddress(billingAddr || {});
        setShippingAddress(shippingAddr || {});
        setAdditionalAddresses(
          addresses.filter(
            (addr) => addr.title !== 'Billing' && addr.title !== 'Shipping'
          )
        );
      })
      .catch((error) => {
        console.error('Error fetching addresses:', error);
        alert('Could not fetch addresses. Please try again later.');
      });
  }, [identifier]);
  

  const handleAddAddressToggle = () => setIsAddingAddress(!isAddingAddress);

  const handleAddNewAddress = () => {
    if (newAddress.title && newAddress.name && newAddress.telephoneNumber && newAddress.address) {
      axios
        .post(`http://localhost:4000/add-address/${identifier}`, newAddress)
        .then(response => {
          const updatedAddress = response.data.address;
          setAdditionalAddresses([...additionalAddresses, updatedAddress]);
          setNewAddress({ title: '', name: '', telephoneNumber: '', address: '' });
          setIsAddingAddress(false);
          alert('Address added successfully!');
        })
        .catch(error => {
          console.error('Error adding address:', error);
          alert('Failed to add address. Please try again.');
        });
    } else {
      alert('Please fill out all fields before saving.');
    }
  };

  const handleEditAddress = (index) => {
    setAdditionalAddresses((prevAddresses) =>
      prevAddresses.map((addr, idx) =>
        idx === index ? { ...addr, isEditing: !addr.isEditing } : addr
      )
    );
  };

  const handleChangeAddressField = (index, field, value) => {
    setAdditionalAddresses((prevAddresses) =>
      prevAddresses.map((addr, idx) =>
        idx === index ? { ...addr, [field]: value } : addr
      )
    );
  };

  const handleSaveAddress = (index) => {
    const addressToSave = additionalAddresses[index];

    axios
      .put(`http://localhost:4000/update-address/${addressToSave._id}`, addressToSave)
      .then(() => {
        alert("Address updated successfully!");
        setAdditionalAddresses((prevAddresses) =>
          prevAddresses.map((addr, idx) =>
            idx === index ? { ...addr, isEditing: false } : addr
          )
        );
      })
      .catch((error) => {
        console.error("Error updating address:", error);
        alert("Failed to update address. Please try again.");
      });
  };

  const handleDeleteAddress = (index) => {
    const addressToDelete = additionalAddresses[index];
    alert(`Are you sure you want to delete the address with ID: ${addressToDelete._id}?`);
    axios
      .delete(`http://localhost:4000/delete-address/${addressToDelete._id}`)
      .then(() => {
        setAdditionalAddresses((prevAddresses) =>
          prevAddresses.filter((_, idx) => idx !== index)
        );
        alert("Address deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
        alert("Failed to delete address. Please try again.");
      });
  };

  return (
    <div style={styles.pageContainer}>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.headerText}>My Account</h1>
        <div style={styles.accountSection}>
          <MyAccountSidebar />
          <div style={styles.mainContent}>
            <h2>Address</h2>
            <div style={styles.gridContainer}>
              {billingAddress.title && <AddressCard address={billingAddress} />}
              {shippingAddress.title && <AddressCard address={shippingAddress} />}
              {additionalAddresses.map((addr, index) => (
                <AddressCard
                  key={index}
                  address={addr}
                  isEditable
                  onEdit={() => handleEditAddress(index)}
                  onChange={(field, value) => handleChangeAddressField(index, field, value)}
                  onSave={() => handleSaveAddress(index)}
                  onDelete={() => handleDeleteAddress(index)}
                />
              ))}
              <div
                style={styles.addNewAddress}
                onClick={handleAddAddressToggle}
                title="Add a new address"
                aria-label="Add a new address"
              >
                +
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAddingAddress && (
  <>
    <div style={styles.overlay}></div>  {/* This is the blurred background */}
    <div style={styles.modalContainer}>
      <AddAddressModal
        newAddress={newAddress}
        onChange={setNewAddress}
        onSave={handleAddNewAddress}
        onCancel={handleAddAddressToggle}
      />
    </div>
  </>
)}

      <Footer />
    </div>
  );
};

const AddressCard = ({ address, isEditable, onEdit, onChange, onSave, onDelete }) => {
  const styles = {
    card: {
      backgroundColor: '#f4f0eb',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    },
    title: { fontWeight: 'bold', marginBottom: '10px' },
    text: { color: '#333', marginBottom: '10px' },
    input: { width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' },
    button: {
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      marginRight: '5px',
      background: 'transparent',  // Remove background
      color: '#388E3C',  // Set text color to green
      border: 'none',  // Remove border
      fontWeight: 'bold',  // Make button text bold
    },
    editButton: { color: '#388E3C' },  // Green color for text button
    deleteButton: { color: '#388E3C' },  // Green color for text button
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'transparent',
      color: '#333',
      fontSize: '16px',
      border: 'none',
      cursor: 'pointer',
    },
    closeButtonWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.card}>
      {address.isEditing ? (
        <>
          <div style={styles.closeButtonWrapper}>
            <button
              style={styles.closeButton}
              onClick={() => onEdit()}
              title="Cancel Editing"
              aria-label="Cancel Editing"
            >
              ✕
            </button>
          </div>
          <input
            style={styles.input}
            value={address.title}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="Address Title"
          />
          <input
            style={styles.input}
            value={address.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Name"
          />
          <input
            style={styles.input}
            value={address.telephoneNumber}
            onChange={(e) => onChange('telephoneNumber', e.target.value)}
            placeholder="Phone"
          />
          <input
            style={styles.input}
            value={address.address}
            onChange={(e) => onChange('address', e.target.value)}
            placeholder="Address"
          />
          <button style={{ ...styles.button, ...styles.saveButton }} onClick={onSave}>
            Save
          </button>
        </>
      ) : (
        <>
          <div style={styles.title}>{address.title}</div>
          <div style={styles.text}>Name: {address.name}</div>
          <div style={styles.text}>Phone: {address.telephoneNumber}</div>
          <div style={styles.text}>Address: {address.address}</div>
          {isEditable && (
            <>
              <button style={{ ...styles.button, ...styles.editButton }} onClick={onEdit}>
                Edit
              </button>
              <button style={{ ...styles.button, ...styles.deleteButton }} onClick={onDelete}>
                Delete
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};


const AddAddressModal = ({ newAddress, onChange, onSave, onCancel }) => {
  const styles = {
    modal: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      width: '300px',
    },
    input: { width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' },
    buttonContainer: { display: 'flex', justifyContent: 'space-between', marginTop: '10px' },
    button: {
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      border: 'none',
    },
    saveButton: { backgroundColor: '#007BFF', color: 'white' },
    cancelButton: { backgroundColor: '#ccc', color: '#333' },
  };

  return (
    <div style={styles.modal}>
      <h2>Add New Address</h2>
      <input
        style={styles.input}
        value={newAddress.title}
        onChange={(e) => onChange({ ...newAddress, title: e.target.value })}
        placeholder="Title"
      />
      <input
        style={styles.input}
        value={newAddress.name}
        onChange={(e) => onChange({ ...newAddress, name: e.target.value })}
        placeholder="Name"
      />
      <input
        style={styles.input}
        value={newAddress.telephoneNumber}
        onChange={(e) => onChange({ ...newAddress, telephoneNumber: e.target.value })}
        placeholder="Phone Number"
      />
      <input
        style={styles.input}
        value={newAddress.address}
        onChange={(e) => onChange({ ...newAddress, address: e.target.value })}
        placeholder="Address"
      />
      <div style={styles.buttonContainer}>
        <button style={{ ...styles.button, ...styles.saveButton }} onClick={onSave}>
          Save
        </button>
        <button style={{ ...styles.button, ...styles.cancelButton }} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MyAccountAddress;
