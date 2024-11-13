import React from 'react';
import Header2 from './Header2';
import Footer from './Footer';

function AboutUs() {
  const styles = {
    container: {
      backgroundColor: '#F1E4CC',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '0', // Remove padding from the container
    },
    mainContent: {
      flexGrow: 1,
      marginTop: '0', // Remove margin top for seamless transition
      padding: '20px', // Add padding for inner content
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontSize: '36px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '20px',
      color: '#4b5b3c', // Matches the eco-friendly color theme
    },
    sectionHeader: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#4b5b3c',
    },
    paragraph: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#4B5563',
      textAlign: 'justify', // Justifies the paragraph text
    },
    section: {
      marginBottom: '40px',
      maxWidth: '800px',
      width: '100%', // Make it responsive
    },
    footer: {
      marginTop: '0', // Remove margin top for footer
    }
  };

  return (
    <div className="about-us-container" style={styles.container}>
      <Header2 /> {/* Header component */}

      <div style={styles.mainContent}>
        <h1 style={styles.header}>About Us</h1>

        {/* Company Overview Section */}
        <section className="company-overview" style={styles.section}>
          <h2 style={styles.sectionHeader}>Company Overview</h2>
          <p style={styles.paragraph}>
            Eco-Construct is a forward-thinking platform designed to meet the growing demand for eco-friendly building materials.
            We recognize the environmental challenges of the modern construction industry, including excessive energy use, high carbon emissions, and raw material depletion.
            Eco-Construct exists to address these issues by providing accessible, sustainable building solutions to create a greener future.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mission-section" style={styles.section}>
          <h2 style={styles.sectionHeader}>Our Mission</h2>
          <p style={styles.paragraph}>
            Our mission is to drive sustainable change in the construction industry. By eliminating the barriers to eco-friendly construction materials,
            Eco-Construct aims to increase the percentage of environmentally sustainable buildings globally.
            We believe that making eco-conscious building materials more accessible will encourage both individuals and companies to make more sustainable choices.
          </p>
        </section>

        {/* Goals Section */}
        <section className="goals-section" style={styles.section}>
          <h2 style={styles.sectionHeader}>Our Goals</h2>
          <p style={styles.paragraph}>
            Eco-Construct seeks to increase the adoption of eco-friendly building practices by offering sustainable materials without the hassle and extra costs.
            Our marketplace provides eco-friendly options, ensuring each material meets strict quality control standards.
            By raising awareness and offering incentives, we strive to elevate the percentage of sustainable buildings in the market.
          </p>
        </section>

        {/* Strategies Section */}
        <section className="strategies-section" style={styles.section}>
          <h2 style={styles.sectionHeader}>Our Strategies</h2>
          <p style={styles.paragraph}>
            To promote eco-friendly building materials, Eco-Construct educates users on the benefits of sustainable choices.
            Through blogs, webinars, and case studies, we aim to inspire eco-conscious construction.
            Our incentive programs, including discounts and loyalty points, further encourage the transition to green materials.
          </p>
        </section>
      </div>

      <Footer style={styles.footer} /> {/* Footer component */}
    </div>
  );
}

export default AboutUs;