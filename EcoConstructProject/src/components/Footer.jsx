import React from 'react';

function Footer() {
  const styles = {
    footer: {
      backgroundColor: '#333',
      color: '#fff',
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    socialIcons: {
      margin: '0 10px',
      fontSize: '24px',
      textDecoration: 'none',
    },
    copyright: {
      marginTop: '10px',
      fontSize: '14px',
    },
    socialLink: {
      color: '#fff',
      textDecoration: 'none',
    },
    socialLinkHover: {
      color: '#ccc',
    },
  };

  return (
    <footer style={styles.footer}>
      <p>Ecoconstruct.com</p>
      <div className="social-icons">
        <a href="#" aria-label="Instagram" style={styles.socialLink}>📷</a>
        <a href="#" aria-label="Facebook" style={styles.socialLink}>📘</a>
        <a href="#" aria-label="YouTube" style={styles.socialLink}>▶️</a>
      </div>
      <div style={styles.copyright}>
        <p>Copyright © 2024 Eco-Construct. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
