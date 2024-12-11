import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Import Header component
import Footer from "./Footer"; // Import Footer component

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
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
      <Header />
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
              <div style={styles.productPrice}>{formatPrice(product.price)}</div>
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
            <div>
              <h3 style={styles.productName}>{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductDisplay;
