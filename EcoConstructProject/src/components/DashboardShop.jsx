import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

function DashboardShop() {
  const [activePage, setActivePage] = useState('Marketplace');
  const [orderNotifications, setOrderNotifications] = useState(5); // Jumlah notifikasi di Orders
  const [messageNotifications, setMessageNotifications] = useState(3); // Jumlah notifikasi di Messages

  const renderContent = () => {
    switch (activePage) {
      case 'Marketplace':
        return (
          <div>
            <h2>Marketplace</h2>
            <p>Daftar produk yang dijual di toko Anda akan muncul di sini.</p>
            {/* Tambahkan daftar produk, tombol tambah produk, dll. */}
          </div>
        );
      case 'Orders':
        return (
          <div>
            <h2>Your Orders</h2>
            <p>Notifikasi penjualan terbaru akan muncul di sini.</p>
            {/* Tambahkan daftar pesanan yang diterima */}
          </div>
        );
      case 'Messages':
        return (
          <div>
            <h2>Messages</h2>
            <p>Fitur chat antar penjual.</p>
            {/* Tambahkan daftar pesan atau implementasi chat */}
          </div>
        );
      case 'Settings':
        return (
          <div>
            <h2>Settings</h2>
            <p>Ubah informasi toko Anda di sini.</p>
            {/* Tambahkan form untuk mengubah nama toko, deskripsi, dll. */}
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
      {/* Header */}
      <Header />

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
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
          {/* Profile Section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            {/* Dummy Profile Picture */}
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#CBD5E0',
                marginBottom: '10px',
              }}
            ></div>
            {/* Nama dan Motto */}
            <h3 style={{ margin: 0, fontSize: '18px', textAlign: 'center' }}>Nama Toko</h3>
            <p style={{ fontSize: '14px', textAlign: 'center', color: '#A0AEC0' }}>Motto Toko</p>
          </div>

          {/* Garis Pembatas */}
          <div
            style={{
              borderBottom: '1px solid #4A5568',
              marginBottom: '20px',
            }}
          ></div>

          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Dashboard</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              { label: 'Marketplace', notifications: 0 },
              { label: 'Orders', notifications: orderNotifications },
              { label: 'Messages', notifications: messageNotifications },
              { label: 'Settings', notifications: 0 },
            ].map(({ label, notifications }) => (
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
        </div>

        {/* Content */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DashboardShop;
