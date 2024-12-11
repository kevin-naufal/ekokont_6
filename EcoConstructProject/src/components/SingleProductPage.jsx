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
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/products/${id}`);
        setProduct(response.data.product);
        setLoading(false);
      } catch (err) {
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
    const productWithQuantity = { ...product, quantity };
    navigate("/buyout", {
      state: {
        cartItems: [productWithQuantity],
        totalAmount: productWithQuantity.price * productWithQuantity.quantity,
      },
    });
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productWithQuantity = { ...product, quantity };
    cart.push(productWithQuantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const styles = {
    container: {
      backgroundColor: "#F1E4CC",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      color: "#4b5b3c",
    },
    content: {
      flex: 1,
      padding: "20px 120px",
      display: "flex",
      gap: "20px",
      justifyContent: "center",
    },
    largeContainer: {
      flex: 2,
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    smallContainer: {
      flex: 1,
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      maxHeight: "300px",
      maxWidth: "300px",
      overflow: "auto",
    },
    topContainer: {
      display: "flex",
      gap: "20px",
    },
    imageContainer: {
      flex: 1,
    },
    detailsContainer: {
      flex: 1,
    },
    productImage: {
      width: "100%",
      borderRadius: "4px",
      objectFit: "cover",
    },
    productName: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    productPrice: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#4b5b3c",
      marginBottom: "10px",
    },
    descriptionContainer: {
      marginTop: "20px",
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
      width: "100%",
    },
    addToCartButton: {
      background: "#f0ad4e",
      color: "white",
      width: "100%",
    },
    quantityControl: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
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
      <Header />
      <div style={styles.content}>
        <div style={styles.largeContainer}>
          <div style={styles.topContainer}>
            <div style={styles.imageContainer}>
              <img
                src={product.image_url || "https://via.placeholder.com/400"}
                alt={product.name || "Product"}
                style={styles.productImage}
              />
            </div>
            <div style={styles.detailsContainer}>
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.productPrice}>{formatPrice(product.price)}</p>
              <p>Type: {product.type}</p>
              <p>Status: {product.status}</p>
              <p>Store: {product.shop_id?.storeName || "Unknown"}</p>
            </div>
          </div>
          <div style={styles.descriptionContainer}>
            <h4>Description</h4>
            <p>{product.description}</p>
          </div>
        </div>

        <div style={styles.smallContainer}>
          <h4>Quantity</h4>
          <div style={styles.quantityControl}>
            <button style={styles.quantityButton} onClick={decreaseQuantity}>
              -
            </button>
            <span>{quantity}</span>
            <button style={styles.quantityButton} onClick={increaseQuantity}>
              +
            </button>
          </div>
          <h4>Total: {formatPrice(product.price * quantity)}</h4>
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
      <Footer />
    </div>
  );
};

export default SingleProductPage;
