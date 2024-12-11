import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Marketplace from './MarketPlace.jsx';
import OrdersShop from './OrdersShop.jsx';
import ProfilePictureShop from './ProfilePictureShop.jsx'; // Import ProfilePictureShop

function DashboardShop() {
  const [activePage, setActivePage] = useState('Marketplace');
  const [orderNotifications, setOrderNotifications] = useState(0);
  const [messageNotifications, setMessageNotifications] = useState(3);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchOrderNotifications = async () => {
      const shopId = localStorage.getItem('shopId');
      if (!shopId) {
        console.error('Shop ID not found in localStorage');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:4000/get-status-shop/${shopId}`);
        const orders = response.data;

        // Filter pesanan yang membutuhkan perhatian
        const relevantOrders = orders.filter(
          (order) =>
            order.description !== 'The order has arrived at its destination.' &&
            order.description !== 'Payment Rejected'
        );

        setOrderNotifications(relevantOrders.length); // Perbarui jumlah notifikasi order
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrderNotifications();
  }, []);

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false'); // Set login status ke false
    window.location.href = '/'; // Redirect ke halaman utama
  };

    // This function is passed down to ProfilePictureShop
  const handleSaveProfilePicture = (newPicture) => {
    setProfilePicture(newPicture); // Save the new profile picture
  };
  

  const renderContent = () => {
    switch (activePage) {
      case 'Marketplace':
        return <Marketplace />;
      case 'Orders':
        return <OrdersShop />;
      case 'Messages':
        return (
          <div>
            <h2>Messages</h2>
            <p>Fitur chat antar penjual.</p>
          </div>
        );
      case 'Settings':
        return (
          <div>
            <h2>Settings</h2>
            <p>Ubah informasi toko Anda di sini.</p>
          </div>
        );
      default:
        return (
          <div>
            <h2>Marketplace</h2>
            <p>Daftar produk yang dijual di toko Anda akan muncul di sini.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <div
          className="sidebar"
          style={{
            width: '250px',
            backgroundColor: '#2D3748',
            color: '#FFFFFF',
            padding: '20px',
            borderRadius: '20px',
            margin: '20px',
            marginLeft: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            {/* Ganti dengan komponen ProfilePictureShop */}
            <ProfilePictureShop
              profilePicture={profilePicture} 
              setProfilePicture={handleSaveProfilePicture}
            />
            <h3 style={{ margin: 0, fontSize: '18px', textAlign: 'center' }}>Nama Toko</h3>
            <p style={{ fontSize: '14px', textAlign: 'center', color: '#A0AEC0' }}>Motto Toko</p>
          </div>
          <div
            style={{
              borderBottom: '1px solid #4A5568',
              marginBottom: '20px',
            }}
          ></div>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Dashboard</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[{ label: 'Marketplace', notifications: 0 },
              { label: 'Orders', notifications: orderNotifications },
              { label: 'Messages', notifications: messageNotifications },
              { label: 'Settings', notifications: 0 }]
              .map(({ label, notifications }) => (
                <li
                  key={label}
                  onClick={() => setActivePage(label)}
                  style={{
                    position: 'relative',
                    padding: '10px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    backgroundColor: activePage === label ? '#4A5568' : 'transparent',
                    borderRadius: '5px',
                  }}
                >
                  {label}
                  {notifications > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px',
                        backgroundColor: '#E53E3E',
                        color: '#FFFFFF',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '12px',
                      }}
                    >
                      {notifications}
                    </span>
                  )}
                </li>
              ))}
          </ul>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '20px',
              padding: '10px',
              backgroundColor: '#E53E3E',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Logout
          </button>
        </div>
        <div
          className="content"
          style={{
            flexGrow: 1,
            padding: '20px',
            backgroundColor: '#F7FAFC',
          }}
        >
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardShop;
