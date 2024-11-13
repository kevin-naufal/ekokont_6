import React from 'react';

function Footer() {
  const styles = {
    footer: {
      backgroundColor: '#333',
      color: '#fff',
      textAlign: 'center',
      padding: '20px 10px', // Reduced padding
      fontFamily: 'Arial, sans-serif',
    },
    logo: {
      fontSize: '20px', // Reduced font size
      fontWeight: 'bold',
      marginBottom: '5px', // Reduced margin
    },
    socialIcons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px', // Reduced gap between icons
      fontSize: '20px', // Reduced icon font size
      marginTop: '10px', // Reduced margin-top
    },
    socialLink: {
      color: '#fff',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    socialIcon: {
      width: '24px', // Reduced icon size
      height: '24px',
      filter: 'invert(1)',
    },
    copyright: {
      marginTop: '10px', // Reduced margin-top
      fontSize: '12px', // Reduced font size
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.logo}>Ecoconstruct.com</div>
      <div style={styles.socialIcons}>
        <a href="#" aria-label="Instagram" style={styles.socialLink}>
          <img
            src="https://github.com/kevin-naufal/TugasKelompokSBD/blob/main/3legant%20E-Commerce%20UI%20Design%20Template%20(Community)%20(2)/social/outline/instagram.png?raw=true"
            alt="Instagram"
            style={styles.socialIcon}
          />
        </a>
        <a href="#" aria-label="Facebook" style={styles.socialLink}>
          <img
            src="https://github.com/kevin-naufal/TugasKelompokSBD/blob/main/3legant%20E-Commerce%20UI%20Design%20Template%20(Community)%20(2)/social/outline/facebook.png?raw=true"
            alt="Facebook"
            style={styles.socialIcon}
          />
        </a>
        <a href="#" aria-label="YouTube" style={styles.socialLink}>
          <img
            src="https://github.com/kevin-naufal/TugasKelompokSBD/blob/main/3legant%20E-Commerce%20UI%20Design%20Template%20(Community)%20(2)/social/outline/youtube.png?raw=true"
            alt="YouTube"
            style={styles.socialIcon}
          />
        </a>
      </div>
      <div style={styles.copyright}>
        <p>Copyright © 2024 Eco-Construct. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
