import React from 'react';

function Header() {
  const styles = {
    header: {
      backgroundColor: '#4b5b3c',
      padding: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#fff',
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '18px',
    },
    iconGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    icon: {
      fontSize: '24px',
      color: '#fff',
      cursor: 'pointer',
    },
    cartIcon: {
      position: 'relative',
    },
    cartCount: {
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      backgroundColor: '#f44336',
      color: '#fff',
      borderRadius: '50%',
      padding: '3px 7px',
      fontSize: '14px',
    },
  };

  const navigateTo = (page) => {
    alert('Navigating to ' + page);
    // Implement actual navigation logic here
  };

  const search = () => {
    alert('Search button clicked');
    // Implement search functionality here
  };

  const profile = () => {
    alert('Profile button clicked');
    // Implement profile-related actions here
  };

  const viewCart = () => {
    alert('Viewing cart');
    // Implement cart view functionality here
  };

  return (
    <div style={styles.header}>
      <div style={styles.logo}>Logo</div>
      <div style={styles.navLinks}>
        <a href="#" style={styles.navLink} onClick={() => navigateTo('home')}>Home</a>
        <a href="#" style={styles.navLink} onClick={() => navigateTo('products')}>Products</a>
        <a href="#" style={styles.navLink} onClick={() => navigateTo('about')}>About us</a>
      </div>
      <div style={styles.iconGroup}>
        <span style={styles.icon} onClick={search}>&#128269;</span> {/* Search icon */}
        <span style={styles.icon} onClick={profile}>&#128100;</span> {/* User icon */}
        <div style={styles.cartIcon} onClick={viewCart}>
          &#128722; {/* Cart icon */}
          <span style={styles.cartCount}>2</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
