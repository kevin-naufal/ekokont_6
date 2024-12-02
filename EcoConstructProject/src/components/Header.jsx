import React from 'react';
import storeIcon from '../../Images/store.png';
import searchIcon from '../../Images/search 02.png';
import cartIcon from '../../Images/shopping bag.png';
import profileIcon from '../../Images/user-circle.png';
import customerServiceIcon from '../../Images/customer-service.png'; // Import Customer Service icon

function Header() {
  const styles = {
    header: {
      backgroundColor: '#4b5b3c',
      padding: '15px 120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#fff',
      cursor: 'pointer',
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '14px',
      cursor: 'pointer',
    },
    iconGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '30px',
    },
    icon: {
      width: '25px',
      height: '25px',
      cursor: 'pointer',
      filter: 'invert(1)',
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
    if (page === 'products') {
      window.location.href = '/product-display'; // Navigates to Product Page
    } else if (page === 'about') {
      window.location.href = '/about-us';
    } else if (page === 'customer-service') {
      window.location.href = '/customer-service';
    } else {
      alert('Navigating to ' + page);
    }
  };

  const redirectToProfile = () => {
    window.location.href = '/account-details';
  };

  const redirectToCreateShop = () => {
    window.location.href = '/login-shop';
  };

  const redirectToCart = () => {
    window.location.href = '/cart'; // Navigate to the Cart page
  };

  return (
    <div style={styles.header}>
      <div style={styles.logo} onClick={() => navigateTo('products')}>EcoConstruct</div>
      <div style={styles.iconGroup}>
        <img 
          src={profileIcon} 
          style={styles.icon} 
          alt="Profile" 
          onClick={redirectToProfile} 
        />
        <img 
          src={storeIcon} 
          style={styles.icon} 
          alt="Store" 
          onClick={redirectToCreateShop} 
        />
        <img 
          src={searchIcon}
          style={styles.icon} 
          alt="Search" 
        />
        <img 
          src={customerServiceIcon} 
          style={styles.icon} 
          alt="Customer Service" 
          onClick={() => navigateTo('customer-service')} 
        />
        <div style={styles.cartIcon}>
          <img 
            src={cartIcon} 
            style={styles.icon} 
            alt="Cart" 
            onClick={redirectToCart} 
          /> {/* Redirects to Cart.jsx */}
        </div>
      </div>
    </div>
  );
}

export default Header;