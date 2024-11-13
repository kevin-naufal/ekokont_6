import React from 'react';
import Header2 from './Header2'; // Assuming you have a Header component
import Footer from './Footer'; // Assuming you have a Footer component

function HomePage() {
  const styles = {
    container: {
      backgroundColor: '#f8f8f8',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '0',
    },
    hero: {
      backgroundImage: 'url(https://via.placeholder.com/1200x600)', // Replace with your image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
    },
    heroTitle: {
      fontSize: '48px',
      margin: '0',
      color: 'black',
    },
    heroSubtitle: {
      fontSize: '24px',
      margin: '10px 0',
      color: 'black',
    },
    ctaButton: {
      backgroundColor: '#e60000',
      color: 'white',
      padding: '15px 30px',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      textDecoration: 'none',
      borderRadius: '5px',
    },
    section: {
      padding: '40px 20px',
      textAlign: 'center',
    },
    sectionHeader: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#4b5b3c',
    },
    categoryGrid: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '20px',
    },
    category: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      width: '200px',
      textAlign: 'center',
    },
    categoryImage: {
      maxWidth: '100%',
      borderRadius: '5px',
    },
    promoBanner: {
      backgroundColor: '#e60000',
      color: 'white',
      padding: '20px',
    },
    newsletter: {
      marginTop: '20px',
    },
    newsletterInput: {
      padding: '10px',
      width: '250px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      margin: '10px 0',
    },
    footer: {
      marginTop: 'auto',
    },
  };

  return (
    <div style={styles.container}>
      <Header2 />

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>LifeWear: Simple Made Better</h1>
        <p style={styles.heroSubtitle}>Discover our latest collection</p>
        <a href="#" style={styles.ctaButton}>Shop Now</a>
      </div>

      <div className="featured-products" style={styles.section}>
        <h2 style={styles.sectionHeader}>Featured Products</h2>
        <div style={styles.categoryGrid}>
          <div style={styles.category}>
          <img src="https://via.placeholder.com/200" alt="Featured Product 1" style={styles.categoryImage} />
            <h3>Product 1</h3>
            <p>$29.99</p>
            <button style={styles.ctaButton}>Add to Cart</button>
          </div>
          <div style={styles.category}>
            <img src="https://via.placeholder.com/200" alt="Featured Product 2" style={styles.categoryImage} />
            <h3>Product 2</h3>
            <p>$39.99</p>
            <button style={styles.ctaButton}>Add to Cart</button>
          </div>
          <div style={styles.category}>
            <img src="https://via.placeholder.com/200" alt="Featured Product 3" style={styles.categoryImage} />
            <h3>Product 3</h3>
            <p>$49.99</p>
            <button style={styles.ctaButton}>Add to Cart</button>
          </div>
          <div style={styles.category}>
            <img src="https://via.placeholder.com/200" alt="Featured Product 4" style={styles.categoryImage} />
            <h3>Product 4</h3>
            <p>$59.99</p>
            <button style={styles.ctaButton}>Add to Cart</button>
          </div>
        </div>
      </div>
      

      <div className="promo-banner" style={styles.promoBanner}>
        <h2>30% Off Selected Items</h2>
      </div>

      <div className="newsletter" style={styles.section}>
        <h2 style={styles.sectionHeader}>Stay Updated</h2>
        <p>Subscribe to our newsletter for exclusive offers and updates.</p>
        <input type="email" placeholder="Enter your email" style={styles.newsletterInput} />
        <button style={styles.ctaButton}>Subscribe</button>
      </div>

      <Footer style={styles.footer} />
    </div>
  );
}

export default HomePage;