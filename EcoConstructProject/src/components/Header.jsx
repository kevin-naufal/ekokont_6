import React from 'react';

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
      cursor: 'pointer', // Make the logo clickable
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
      width: 'auto',
      height: 'auto',
      cursor: 'pointer',
      filter: 'invert(1)', // Applies white color to image
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
    } else {
      alert('Navigating to ' + page);
    }
  };

  const search = () => {
    alert('Search button clicked');
  };

  const profile = () => {
    window.location.href = '/account/details';
  };

  const viewCart = () => {
    alert('Viewing cart');
  };

  return (
    <div style={styles.header}>
      <div style={styles.logo} onClick={() => navigateTo('home')}>EcoConstruct</div>
      <div style={styles.navLinks}>
        <a href="#" style={styles.navLink} onClick={() => navigateTo('home')}>Home</a>
        <a href="#" style={styles.navLink} onClick={() => navigateTo('products')}>Products</a>
        <a href="#" style={styles.navLink} onClick={() => navigateTo('about')}>About us</a>
      </div>
      <div style={styles.iconGroup}>
        <img 
          src="https://raw.githubusercontent.com/kevin-naufal/TugasKelompokSBD/main/3legant%20E-Commerce%20UI%20Design%20Template%20(Community)%20(2)/interface/outline/user-circle.png" 
          style={styles.icon} 
          alt="Profile" 
          onClick={profile} 
        />
        <img 
          src="https://raw.githubusercontent.com/kevin-naufal/TugasKelompokSBD/main/3legant%20E-Commerce%20UI%20Design%20Template%20(Community)%20(2)/interface/outline/search%2002.png" 
          style={styles.icon} 
          alt="Search" 
          onClick={search} 
        />
        <div style={styles.cartIcon} onClick={viewCart}>
          <img 
            src="https://raw.githubusercontent.com/kevin-naufal/TugasKelompokSBD/refs/heads/main/shopping%20bag.png" 
            style={styles.icon} 
            alt="Cart" 
          />
          <span style={styles.cartCount}>2</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
