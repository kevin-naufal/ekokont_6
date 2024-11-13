import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import MyAccountSidebar from './MyAccountSidebar';

const MyAccountAddress = () => {
  const [billingAddress, setBillingAddress] = useState({
    title: 'Billing Address',
    name: 'Sofia Havertz',
    phone: '(+1) 234 567 890',
    address: '345 Long Island, New York, United States',
  });
  const [shippingAddress, setShippingAddress] = useState({
    title: 'Shipping Address',
    name: 'Sofia Havertz',
    phone: '(+1) 234 567 890',
    address: '345 Long Island, New York, United States',
  });
  const [additionalAddresses, setAdditionalAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    title: '',
    name: '',
    phone: '',
    address: '',
  });
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const styles = {
    pageContainer: { display: 'flex', flexDirection: 'column', minHeight: '100vh' },
    container: { backgroundColor: '#F1E4CC', padding: '40px 150px', fontFamily: 'Arial, sans-serif', flex: 1 },
    headerText: { fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' },
    accountSection: { display: 'flex', gap: '40px', alignItems: 'flex-start' },
    mainContent: { flex: '3' },
    addressContainer: { display: 'flex', flexDirection: 'column', gap: '20px' },
    addressCard: { backgroundColor: '#f4f0eb', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' },
    editLink: { float: 'right', fontSize: '14px', color: '#6c757d', cursor: 'pointer' },
    addressTitle: { fontWeight: 'bold', marginBottom: '10px' },
    addressText: { color: '#333' },
    input: { width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' },
    saveButton: { backgroundColor: '#4CAF50', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    addButton: { backgroundColor: '#007BFF', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' },
  };

  const handleEditToggle = (type, index = null) => {
    if (type === 'billing') setIsEditingBilling(!isEditingBilling);
    else if (type === 'shipping') setIsEditingShipping(!isEditingShipping);
    else {
      const updatedAddresses = [...additionalAddresses];
      updatedAddresses[index].isEditing = !updatedAddresses[index].isEditing;
      setAdditionalAddresses(updatedAddresses);
    }
  };

  const handleSave = (type, index = null) => {
    if (type === 'billing') setIsEditingBilling(false);
    else if (type === 'shipping') setIsEditingShipping(false);
    else {
      const updatedAddresses = [...additionalAddresses];
      updatedAddresses[index].isEditing = false;
      setAdditionalAddresses(updatedAddresses);
    }
  };

  const handleChange = (e, type, field, index = null) => {
    if (type === 'billing') setBillingAddress({ ...billingAddress, [field]: e.target.value });
    else if (type === 'shipping') setShippingAddress({ ...shippingAddress, [field]: e.target.value });
    else if (type === 'additional') {
      const updatedAddresses = [...additionalAddresses];
      updatedAddresses[index][field] = e.target.value;
      setAdditionalAddresses(updatedAddresses);
    } else if (type === 'new') {
      setNewAddress({ ...newAddress, [field]: e.target.value });
    }
  };

  const handleAddAddressToggle = () => setIsAddingAddress(!isAddingAddress);

  const handleAddNewAddress = () => {
    setAdditionalAddresses([...additionalAddresses, { ...newAddress, isEditing: false }]);
    setNewAddress({ title: '', name: '', phone: '', address: '' });
    setIsAddingAddress(false);
  };

  const handleDelete = (type, index = null) => {
    if (type === 'billing') setBillingAddress(null);
    else if (type === 'shipping') setShippingAddress(null);
    else {
      const updatedAddresses = additionalAddresses.filter((_, addrIndex) => addrIndex !== index);
      setAdditionalAddresses(updatedAddresses);
    }
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
            <div style={styles.addressContainer}>
              {billingAddress && (
                <AddressCard
                  address={billingAddress}
                  isEditing={isEditingBilling}
                  onEditToggle={() => handleEditToggle('billing')}
                  onSave={() => handleSave('billing')}
                  onChange={(e, field) => handleChange(e, 'billing', field)}
                  onDelete={() => handleDelete('billing')}
                />
              )}
              {shippingAddress && (
                <AddressCard
                  address={shippingAddress}
                  isEditing={isEditingShipping}
                  onEditToggle={() => handleEditToggle('shipping')}
                  onSave={() => handleSave('shipping')}
                  onChange={(e, field) => handleChange(e, 'shipping', field)}
                  onDelete={() => handleDelete('shipping')}
                />
              )}
              {additionalAddresses.map((addr, index) => (
                <AddressCard
                  key={index}
                  address={addr}
                  isEditing={addr.isEditing}
                  onEditToggle={() => handleEditToggle('additional', index)}
                  onSave={() => handleSave('additional', index)}
                  onChange={(e, field) => handleChange(e, 'additional', field, index)}
                  onDelete={() => handleDelete('additional', index)}
                />
              ))}
              {isAddingAddress && (
                <div style={styles.addressCard}>
                  <input
                    style={styles.input}
                    placeholder="Address Title"
                    value={newAddress.title}
                    onChange={(e) => handleChange(e, 'new', 'title')}
                  />
                  <input
                    style={styles.input}
                    placeholder="Name"
                    value={newAddress.name}
                    onChange={(e) => handleChange(e, 'new', 'name')}
                  />
                  <input
                    style={styles.input}
                    placeholder="Phone"
                    value={newAddress.phone}
                    onChange={(e) => handleChange(e, 'new', 'phone')}
                  />
                  <input
                    style={styles.input}
                    placeholder="Address"
                    value={newAddress.address}
                    onChange={(e) => handleChange(e, 'new', 'address')}
                  />
                  <button style={styles.saveButton} onClick={handleAddNewAddress}>
                    Save
                  </button>
                </div>
              )}
              <button style={styles.addButton} onClick={handleAddAddressToggle}>
                {isAddingAddress ? 'Cancel' : 'Add New Address'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const AddressCard = ({ address, isEditing, onEditToggle, onSave, onChange, onDelete }) => {
  const styles = {
    addressCard: { backgroundColor: '#f4f0eb', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' },
    editLink: { float: 'right', fontSize: '14px', color: '#6c757d', cursor: 'pointer' },
    addressTitle: { fontWeight: 'bold', marginBottom: '10px' },
    addressText: { color: '#333' },
    input: { width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' },
    saveButton: { backgroundColor: '#4CAF50', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    deleteButton: { backgroundColor: '#FF6347', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' },
  };

  return (
    <div style={styles.addressCard}>
      <span style={styles.editLink} onClick={onEditToggle}>{isEditing ? 'Cancel' : 'Edit'}</span>
      {isEditing ? (
        <>
          <input style={styles.input} value={address.title} onChange={(e) => onChange(e, 'title')} />
          <input style={styles.input} value={address.name} onChange={(e) => onChange(e, 'name')} />
          <input style={styles.input} value={address.phone} onChange={(e) => onChange(e, 'phone')} />
          <input style={styles.input} value={address.address} onChange={(e) => onChange(e, 'address')} />
          <button style={styles.saveButton} onClick={onSave}>Save</button>
        </>
      ) : (
        <>
          <div style={styles.addressTitle}>{address.title}</div>
          <div style={styles.addressText}>
            {address.name} <br />
            {address.phone} <br />
            {address.address}
          </div>
          {/* Show Delete button only if not in editing mode */}
          <button style={styles.deleteButton} onClick={onDelete}>Delete</button>
        </>
      )}
    </div>
  );
};


export default MyAccountAddress;