import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Import Header component
import Footer from "./Footer"; // Import Footer component

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product

  const navigate = useNavigate();

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/products");
      setProducts(response.data.products); // Assuming API response contains a 'products' key
      setLoading(false);
    } catch (err) {
      setError(err.message || "Error fetching products");
      setLoading(false);
    }
  };


  // Function to navigate to product details
  const goToProductDetails = (product) => {
    navigate(`/product-display/${product._id}`);
  };

  // Handle Buy Now action (directly adds the item to the Payment page)
  const handleBuyNow = (product) => {
    const cart = [product]; // Adding the selected product directly to the cart
    navigate("/buyout", { state: { cartItems: cart, totalAmount: product.price } });
  };

  // Handle Add to Cart action
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Reset the selected product
  };

  // UseEffect to fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const styles = {
    container: {
      backgroundColor: "#F1E4CC",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    headerFooter: {
      width: "100%",
      backgroundColor: "#4b5b3c",
      color: "white",
      textAlign: "center",
      padding: "10px 0",
    },
    content: {
      flex: 1,
      padding: "20px",
      color: "#4b5b3c",
    },
    productGrid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "16px",
      justifyContent: "center",
    },
    productCard: {
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      width: "200px",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    productCardHover: {
      transform: "scale(1.05)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    productImage: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      borderRadius: "4px",
    },
    productName: {
      fontSize: "18px",
      fontWeight: "bold",
      margin: "10px 0",
    },
    productPrice: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#4b5b3c",
    },
    button: {
      margin: "10px 5px",
      padding: "8px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    buyNowButton: {
      background: "#4b5b3c",
      color: "white",
    },
    addToCartButton: {
      background: "#f0ad4e",
      color: "white",
    },
    modal: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "1000",
    },
    modalContent: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "800px",
      width: "80%",
      position: "relative",
    },
    modalImage: {
      width: "100%",
      height: "400px",
      objectFit: "cover",
      borderRadius: "4px",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "transparent",
      border: "none",
      color: "#4b5b3c",
      fontSize: "24px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      {/* Full-Width Header */}
      <div style={styles.headerFooter}>
        <Header />
      </div>
      <div style={styles.content}>
        <div style={styles.productGrid}>
          {products.map((product) => (
            <div
              key={product._id}
              style={styles.productCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = styles.productCardHover.transform;
                e.currentTarget.style.boxShadow = styles.productCardHover.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
              onClick={() => goToProductDetails(product)} // Navigate to product details
            >
              <img
                src={product.image_url}
                alt={product.name}
                style={styles.productImage}
              />
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.productPrice}>Rp.{product.price}</p>
            </div>
          ))}
        </div>
      </div>
  
      {/* Modal for enlarged product details */}
      {isModalOpen && selectedProduct && (
        <div style={styles.modal} onClick={closeModal}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <button style={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <div style={{ display: "flex", gap: "20px" }}>
              {/* Product Image */}
              <img
                src={selectedProduct.image_url}
                alt={selectedProduct.name}
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              {/* Product Details */}
              <div>
                <h3 style={{ ...styles.productName, marginBottom: "10px" }}>
                  {selectedProduct.name}
                </h3>
                <p style={{ ...styles.productPrice, marginBottom: "10px" }}>
                  Rp.{selectedProduct.price}
                </p>
                <p style={{ marginBottom: "5px" }}>Type: {selectedProduct.type}</p>
                <p style={{ marginBottom: "5px" }}>Status: {selectedProduct.status}</p>
  
                {/* Quantity Adjustment */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "20px" }}>
                  <button
                    style={{
                      ...styles.button,
                      backgroundColor: "#d9534f",
                      color: "white",
                    }}
                    onClick={() => {
                      if (selectedProduct.quantity > 1) {
                        setSelectedProduct((prev) => ({
                          ...prev,
                          quantity: prev.quantity - 1,
                        }));
                      }
                    }}
                  >
                    -
                  </button>
                  <span>{selectedProduct.quantity || 1}</span>
                  <button
                    style={{
                      ...styles.button,
                      backgroundColor: "#5cb85c",
                      color: "white",
                    }}
                    onClick={() => {
                      setSelectedProduct((prev) => ({
                        ...prev,
                        quantity: (prev.quantity || 1) + 1,
                      }));
                    }}
                  >
                    +
                  </button>
                </div>
  
                <button
                  style={{
                    ...styles.button,
                    ...styles.buyNowButton,
                    marginTop: "20px",
                  }}
                  onClick={() => handleBuyNow(selectedProduct)}
                >
                  Buy Now
                </button>
                <button
                  style={{
                    ...styles.button,
                    ...styles.addToCartButton,
                    marginLeft: "10px",
                  }}
                  onClick={() => handleAddToCart(selectedProduct)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            {/* Product Description */}
            <div style={{ marginTop: "20px" }}>
              <p>{selectedProduct.description}</p>
            </div>
          </div>
        </div>
      )}
  
      {/* Full-Width Footer */}
      <div style={styles.headerFooter}>
        <Footer />
      </div>
    </div>
  );
  
};

export default ProductDisplay;
