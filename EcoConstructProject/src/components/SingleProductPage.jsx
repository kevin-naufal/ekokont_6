import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State untuk jumlah produk

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/products/${id}`);
        console.log("API Response:", response.data);
        setProduct(response.data.product); // Sesuaikan dengan struktur API
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message || "Error fetching product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  const handleBuyNow = () => {
    const productWithQuantity = { ...product, quantity, _id: product._id }; // Tambahkan _id pada objek produk dengan quantity
    
    // Tampilkan informasi produk melalui alert
    alert(
      `Buy Now:
      Product ID: ${productWithQuantity._id}
      Product Name: ${productWithQuantity.name}
      Quantity: ${productWithQuantity.quantity}
      Total Price: Rp.${productWithQuantity.price * productWithQuantity.quantity}`
    );
    
    // Tampilkan alert untuk state yang akan dikirim ke BuyOut
    alert(
      `State being sent to BuyOut page:
      Cart Items: ${JSON.stringify([productWithQuantity])}
      Total Amount: Rp.${productWithQuantity.price * productWithQuantity.quantity}`
    );
    
    // Navigasi ke halaman buyout
    navigate("/buyout", {
      state: {
        cartItems: [productWithQuantity], // Langsung gunakan productWithQuantity
        totalAmount: productWithQuantity.price * productWithQuantity.quantity,
      },
    });
  };
  
  
  
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productWithQuantity = { ...product, quantity }; // Menambahkan jumlah produk
    cart.push(productWithQuantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const styles = {
    container: {
      backgroundColor: "#F1E4CC",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      color: "#4b5b3c",
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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    productDetails: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      maxWidth: "800px",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    productImage: {
      width: "100%",
      maxHeight: "400px",
      objectFit: "cover",
      borderRadius: "4px",
    },
    productName: {
      fontSize: "24px",
      fontWeight: "bold",
      margin: "10px 0",
    },
    productPrice: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#4b5b3c",
    },
    description: {
      marginTop: "20px",
    },
    buttonContainer: {
      marginTop: "20px",
      display: "flex",
      gap: "10px",
    },
    button: {
      padding: "10px 20px",
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
    quantityControl: {
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
      gap: "10px",
    },
    quantityButton: {
      padding: "5px 10px",
      backgroundColor: "#4b5b3c",
      color: "white",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerFooter}>
        <Header />
      </div>
      <div style={styles.content}>
        <div style={styles.productDetails}>
          <img
            src={product.image_url || "https://via.placeholder.com/400"}
            alt={product.name || "Product"}
            style={styles.productImage}
          />
          <h3 style={styles.productName}>{product.name}</h3>
          <p style={styles.productPrice}>Rp.{product.price}</p>
          <p>Type: {product.type}</p>
          <p>Status: {product.status}</p>
          <p style={styles.description}>{product.description}</p>
          <div style={styles.quantityControl}>
            <button style={styles.quantityButton} onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button style={styles.quantityButton} onClick={increaseQuantity}>+</button>
          </div>
          <div style={styles.buttonContainer}>
            <button
              style={{ ...styles.button, ...styles.buyNowButton }}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              style={{ ...styles.button, ...styles.addToCartButton }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div style={styles.headerFooter}>
        <Footer />
      </div>
    </div>
  );
};

export default SingleProductPage;
