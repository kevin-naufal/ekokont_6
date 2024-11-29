import React, { useState, useEffect } from 'react';
import Header2 from './Header2'; // Assuming you have a Header2 component
import Header from './Header'; // Assuming you have a Header component
import Footer from './Footer'; // Assuming you have a Footer component

function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);

  // Check if user is logged in from localStorage
  // Retrieve loginData from localStorage
const storedLoginData = JSON.parse(localStorage.getItem('loginData'));

// Check if the user is logged in
const isLoggedIn = storedLoginData && storedLoginData.user && storedLoginData.user.loggedIn;


  const slides = [
    { src: 'https://i.pinimg.com/originals/5e/cf/72/5ecf7275ff7307bbb4061937585f023e.jpg', caption: 'Caption Text' },
    { src: 'https://wallpapers.com/images/hd/1920-x-1080-nature-desktop-7uzi3zf1qeoosb63.jpg', caption: 'Caption Two' },
    { src: 'https://i.pinimg.com/originals/12/f9/eb/12f9eb376e3f34a1f5429a2d4cacc03c.jpg', caption: 'Caption Three' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const showSlide = (index) => {
    setSlideIndex(index);
  };

  const styles = {
    container: {
      backgroundColor: '#F1E4CC',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '0',
    },
    slideshowContainer: {
      position: 'relative',
      overflow: 'hidden',
      width: '80%',
      height: '400px',
      marginTop: '20px',
      margin: '0 auto', // Center horizontally
      alignItems: 'center', // Center vertically
      justifyContent: 'center', // Optional, ensures content inside is also centered
    },
    hero: {
      backgroundImage: 'url(https://images2.imgbox.com/7e/1e/RWP44Zuw_o.png)', // Replace with your image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
      position: 'relative', // Required for absolute positioning of the blur overlay
    },
    heroBlur: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'inherit', // Inherit background image from hero
      filter: 'blur(8px)', // Apply blur
      zIndex: -1, // Make sure it's behind the content
    },
    heroTitle: {
      fontSize: '48px',
      margin: '0',
      color: '#4b5b3c',
      fontWeight: 'bold',
      position: 'relative',
      zIndex: 1, // Ensure it's above the background
      padding: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.4)', // Transparent box background
      borderRadius: '10px',
    },
    heroSubtitle: {
      fontSize: '24px',
      margin: '10px 0',
      color: '#4b5b3c',
      fontWeight: 'bold',
      position: 'relative',
      zIndex: 1, // Ensure it's above the background
      padding: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.4)', // Transparent box background
      borderRadius: '10px',
    },
    ctaButton: {
      backgroundColor: '#4b5b3c',
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
      justifyContent: 'center', // Center the grid items horizontally
      alignItems: 'center', // Center the grid items vertically if needed
      flexWrap: 'wrap',
      gap: '20px',
      maxWidth: '800px', // Optional: to control the width of the grid
      margin: '0 auto', // Center the grid container itself
    },
    category: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      width: '200px',
      textAlign: 'center',
    },

    productCardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    
    categoryImage: {
      maxWidth: '100%',
      borderRadius: '5px',
    },
    promoBanner: {
      backgroundColor: '#4b5b3c',
      color: 'white',
      padding: '20px',
    },
    slidesWrapper: {
      display: 'flex',
      transition: 'transform 0.5s ease-in-out',
      transform: `translateX(-${slideIndex * 100}%)`,
    },
    slide: {
      minWidth: '100%',
      position: 'relative',
    },
    captionBox: {
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      textAlign: 'center',
      zIndex: 1, // Ensure it's above the image
    },

    arrowButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '24px',
      color: '#4b5b3c',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '10px',
      borderRadius: '50%',
      cursor: 'pointer',
      zIndex: 2,
      textDecoration: 'none',
    },
    prevArrow: {
      left: '10px', // Place to the left of the image
    },
    nextArrow: {
      right: '10px', // Place to the right of the image
    },

    footer: {
      marginTop: 'auto',
    },
  };

  return (
    <div style={styles.container}>
      {/* Conditionally render Header or Header2 based on login status */}
      {isLoggedIn ? <Header /> : <Header2 />}

      <div style={styles.hero}>
        {/* Apply the blur effect */}
        <div style={styles.heroBlur}></div>
        <h1 style={styles.heroTitle}>ECO-CONSTRUCT</h1>
        <p style={styles.heroSubtitle}>PIONEERING A GREENER MARKETPLACE FOR BUILDING MATERIALS</p>
        <a
          href="#"
          style={styles.ctaButton}
          onClick={() => window.location.href = '/login'}
        >
          Shop Now
        </a>
      </div>

      {/* Slideshow Container */}
      <div style={styles.slideshowContainer}>
        <div style={styles.slidesWrapper}>
          {slides.map((slide, index) => (
            <div key={index} style={styles.slide}>
              <img src={slide.src} alt={`Slide ${index + 1}`} style={{ width: '100%' }} />
              <div style={styles.captionBox}>{slide.caption}</div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <a
          style={{ ...styles.arrowButton, ...styles.prevArrow }}
          onClick={() => showSlide((slideIndex - 1 + slides.length) % slides.length)}
        >
          &#10094;
        </a>
        <a
          style={{ ...styles.arrowButton, ...styles.nextArrow }}
          onClick={() => showSlide((slideIndex + 1) % slides.length)}
        >
          &#10095;
        </a>
      </div>

      {/* Dots for Navigation */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {slides.map((_, index) => (
          <span
            key={index}
            style={{
              cursor: 'pointer',
              height: '12px',
              width: '12px',
              margin: '0 5px',
              backgroundColor: index === slideIndex ? '#4b5b3c' : '#bbb',
              borderRadius: '50%',
              display: 'inline-block',
            }}
            onClick={() => showSlide(index)}
          ></span>
        ))}
      </div>

      <h2 style={{ ...styles.sectionHeader, textAlign: 'center' }}>Featured Products</h2>
      <div style={styles.categoryGrid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} style={styles.category}>
            <img
              src="https://via.placeholder.com/200"
              alt={`Category ${index + 1}`}
              style={styles.categoryImage}
            />
            <p>Product Category {index + 1}</p>
          </div>
        ))}
      </div>

      {/* Promo Banner */}
      <div style={styles.promoBanner}>
        <h3>Special Offer</h3>
        <p>Get 10% off on your first purchase! Use code: ECO10</p>
      </div>

      <div style={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
