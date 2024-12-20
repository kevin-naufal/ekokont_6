import React from 'react';
import profileIcon from '../../Images/user-circle.png';
import searchIcon from '../../Images/search 02.png';
import cartIcon from '../../Images/shopping bag.png';

function Header2() {
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
      display: 'block', // Ensures the hover area is only the image
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
      window.location.href = '/home';
    } else if (page === 'about') {
      window.location.href = '/about-us';
    } else {
      alert('Navigating to ' + page);
    }
  };

  const redirectToLogin = () => {
    window.location.href = '/login';
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
          onClick={redirectToLogin} 
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

export default Header2;
