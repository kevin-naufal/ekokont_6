import React, { useState, useEffect } from 'react';
import storeIcon from '../../Images/store.png';
import searchIcon from '../../Images/search 02.png';
import cartIcon from '../../Images/shopping bag.png';
import profileIcon from '../../Images/user-circle.png';
import customerServiceIcon from '../../Images/customer-service.png';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState([]); // To store all products from the server
  const [filteredProducts, setFilteredProducts] = useState([]); // To store the filtered products
  const [showDropdown, setShowDropdown] = useState(false); // To control dropdown visibility

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
    searchBarContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    },
    searchInputContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: '5px',
      padding: '5px 10px',
      gap: '10px',
    },
    searchInput: {
      border: 'none',
      color: 'black',
      outline: 'none',
      fontSize: '14px',
      flexGrow: 1,
    },
    searchButton: {
      backgroundColor: '#4b5b3c',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '5px 10px',
      cursor: 'pointer',
    },
    searchResults: {
      position: 'absolute',
      top: '50px',
      backgroundColor: 'white',
      color: 'black',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '5px',
      width: '100%',
      maxHeight: '200px',
      overflowY: 'auto',
      zIndex: 10,
    },
    resultItem: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
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

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/products');
      const data = await response.json();
      setAllProducts(data.products || []); // Store all products
      setFilteredProducts(data.products || []); // Initially, show all products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = () => {
    // Filter products locally based on the search term
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  useEffect(() => {
    handleSearch(); // Update filtered products whenever the search term changes
  }, [searchTerm]);

  const navigateToProduct = (productId) => {
    window.location.href = `/product-display/${productId}`;
  };

  const handleStoreClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check if logged in
    if (isLoggedIn) {
      window.location.href = '/dashboard-shop';
    } else {
      window.location.href = '/login-shop';
    }
  };

  return (
    <div style={styles.header}>
      <div style={styles.logo} onClick={() => (window.location.href = '/')}>
        EcoConstruct
      </div>
      <div style={styles.searchBarContainer}>
        <div style={styles.searchInputContainer}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowDropdown(true)} // Show dropdown on focus
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Hide dropdown after a delay on blur
            style={styles.searchInput}
          />
          <button style={styles.searchButton}>
            <img src={searchIcon} alt="Search" style={styles.icon} />
          </button>
        </div>
        {showDropdown && filteredProducts.length > 0 && (
          <div style={styles.searchResults}>
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                style={styles.resultItem}
                onClick={() => navigateToProduct(product._id)}
              >
                {product.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={styles.iconGroup}>
        <img
          src={profileIcon}
          style={styles.icon}
          alt="Profile"
          onClick={() => (window.location.href = '/account-details')}
        />
        <img
          src={storeIcon}
          style={styles.icon}
          alt="Store"
          onClick={handleStoreClick} // Add logic here
        />
        <img
          src={customerServiceIcon}
          style={styles.icon}
          alt="Customer Service"
          onClick={() => (window.location.href = '/customer-service')}
        />
        <div style={styles.cartIcon}>
          <img
            src={cartIcon}
            style={styles.icon}
            alt="Cart"
            onClick={() => (window.location.href = '/cart')}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
