import React from 'react';
import storeIcon from '../../Images/store.png';
import searchIcon from '../../Images/search 02.png';
import cartIcon from '../../Images/shopping bag.png';
import profileIcon from '../../Images/user-circle.png';

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
    if (page === 'home') {
      window.location.href = '/';
    } else if (page === 'about') {
      window.location.href = '/about-us';
    } else {
      alert('Navigating to ' + page);
    }
  };

  const redirectToProfile = () => {
    window.location.href = '/account/details';
  };

  const redirectToLogin = () => {
    window.location.href = '/login';
  };

  const redirectToCreateShop = () => {
    window.location.href = '/create-shop';
  };

  return (
    <div style={styles.header}>
      <div style={styles.logo} onClick={() => navigateTo('home')}>EcoConstruct</div>
      <div style={styles.navLinks}>
        <a href="#" style={styles.navLink} onClick={() => navigateTo('home')}>Home</a>
        <a href="#" style={styles.navLink} onClick={() => navigateTo('about')}>About us</a>
      </div>
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
          onClick={redirectToCreateShop} // Redirects to /create-shop
        />
        <img 
          src={searchIcon}
          style={styles.icon} 
          alt="Search" 
          onClick={redirectToLogin} 
        />
        <div style={styles.cartIcon} onClick={redirectToLogin}>
          <img 
            src={cartIcon} 
            style={styles.icon} 
            alt="Cart" 
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
