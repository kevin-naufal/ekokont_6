import React, { useState, useEffect } from 'react';
import Header from './Header'; // Assuming you have a Header component
import Header2 from './Header2'; // Assuming you have a Header component
import Footer from './Footer'; // Assuming you have a Footer component

function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    { src: 'https://images2.imgbox.com/27/25/hl8seSni_o.png', 
      caption: 'From mycelium floors to fruit peel lamps: The sustainable materials shaping eco-friendly design',
      link: 'https://www.tatlerasia.com/homes/architecture-design/innovative-sustainable-materials-for-eco-friendly-design'
    },
    { src: 'https://images2.imgbox.com/22/64/Bu5CO3uh_o.png', 
      caption: 'Building Hong Kong’s sustainable homes: greener, healthier and more liveable spaces for the modern urban dweller, from eco-furniture to energy-saving devices and smart appliances Two',
      link: 'https://www.scmp.com/magazines/style/article/3271630/building-hong-kongs-sustainable-homes-greener-healthier-and-more-liveable-spaces-modern-urban'
    },
    { src: 'https://images2.imgbox.com/37/30/ax5gnXRk_o.png', 
      caption: '5 Sustainable Home Designs That Are Trending in 2024 Three',
      link: 'https://realestate.usnews.com/real-estate/articles/sustainable-home-designs-that-are-trending-in-2024'
    },
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
      marginTop: '80px',
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
    captionBox: {
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
      color: 'white',
      padding: '10px 40px', // Reduce vertical padding and increase horizontal padding
      borderRadius: '8px',
      fontFamily: "'Futura', sans-serif",
      fontSize: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
      zIndex: 1, // Ensure it's above the image
      width: '70%', // Set a percentage width for responsiveness
      maxWidth: '600px', // Optional: Limit the maximum width
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
      <Header2 />

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


      <h2 style={{ ...styles.sectionHeader, textAlign: 'center' }}>Catch Up!</h2>
      {/* Slideshow Container */}
      <div className="slideshow-container max-w-[1000px] relative mx-auto mt-8">
  {slides.map((slide, index) => (
    <div key={index} className={`mySlides fade ${index === slideIndex ? 'block' : 'hidden'}`}>
      <a href={slide.link} target="_blank" rel="noopener noreferrer"> {/* Link wrapper */}
        <img src={slide.src} alt={`Slide ${index + 1}`} style={{ width: '100%' }} />
      </a>
      <div style={styles.captionBox}>{slide.caption}</div>
    </div>
  ))}

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
      <div style={{ textAlign: 'center' }} className="mt-4">
        {slides.map((_, index) => (
          <span key={index} className={`dot ${index === slideIndex ? 'active' : ''}`} onClick={() => showSlide(index)}></span>
        ))}
      </div>

      <h2 style={{ ...styles.sectionHeader, textAlign: 'center' }}>Featured Products</h2>
      <div style={styles.categoryGrid}>
  {Array.from({ length: 6 }).map((_, idx) => (
    <div
      key={idx}
      style={styles.category}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = styles.productCardHover.transform;
        e.currentTarget.style.boxShadow = styles.productCardHover.boxShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <img
        src="https://via.placeholder.com/200"
        alt={`Featured Product ${idx + 1}`}
        style={styles.categoryImage}
      />
      <h3>Product {idx + 1}</h3>
      <p>${(idx + 1) * 10 + 20}</p>
      <button
        style={styles.ctaButton}
        onClick={() => (window.location.href = '/login')}
      >
        Add to Cart
      </button>
    </div>
  ))}
</div>



      <br />
      <br />
      <br />

      <Footer style={styles.footer} />
    </div>
  );
}

export default HomePage;